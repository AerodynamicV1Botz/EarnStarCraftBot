/*CMD
  command: SUPPORT_USER_REQUESTS
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// CMD: SUPPORT_USER_REQUESTS

var userId = user.telegramid;
var allKeys = Bot.getProperty("SUPPORT_REQUEST_KEYS") || [];

var userRequests = [];

for (var i = 0; i < allKeys.length; i++) {
  var refId = allKeys[i];

  var requestData = Bot.getProperty(
    "SUPPORT_REQUEST_" + refId
  );

  if (!requestData) {
    continue;
  }

  var requestUserId =
    requestData.user_id ||
    requestData.telegramid ||
    requestData.user_telegramid;

  if (String(requestUserId) == String(userId)) {
    userRequests.push({
      refId: refId,
      data: requestData
    });
  }
}

function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getStatusText(status) {
  status = String(status || "new").toLowerCase();

  if (status == "accepted") {
    return "🟢 Accepted";
  }

  if (status == "rejected") {
    return "🔴 Rejected";
  }

  if (status == "closed") {
    return "⚫ Closed";
  }

  if (status == "cancelled") {
    return "⚪ Cancelled";
  }

  return "🟡 New";
}

if (userRequests.length == 0) {
  Api.sendMessage({
    chat_id: userId,
    text:
      "📂 <b>My Support Requests</b>\n\n" +
      "Aapki koi support request nahi mili.",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🆕 Create New Request",
            callback_data: "SUPPORT_CREATE"
          }
        ],
        [
          {
            text: "⬅️ Back",
            callback_data: "MAIN_MENU"
          }
        ]
      ]
    }
  });

  return;
}

var text =
  "📂 <b>My Support Requests</b>\n\n" +
  "Total Requests: <b>" + userRequests.length + "</b>\n\n";

var buttons = [];

for (var j = userRequests.length - 1; j >= 0; j--) {
  var item = userRequests[j];
  var data = item.data;

  var subject =
    data.subject ||
    data.title ||
    data.message ||
    "Support Request";

  subject = String(subject).replace(/\n/g, " ");

  if (subject.length > 28) {
    subject = subject.substring(0, 28) + "...";
  }

  text +=
    "🆔 <code>" + escapeHtml(item.refId) + "</code>\n" +
    "📝 " + escapeHtml(subject) + "\n" +
    "📌 Status: <b>" +
    getStatusText(data.status) +
    "</b>\n\n";

  buttons.push([
    {
      text: "📄 View " + item.refId,
      callback_data: "SUPPORT_USER_REQUEST_DETAILS " + item.refId
    }
  ]);
}

buttons.push([
  {
    text: "🆕 Create New Request",
    callback_data: "SUPPORT_CREATE"
  }
]);

buttons.push([
  {
    text: "⬅️ Back",
    callback_data: "MAIN_MENU"
  }
]);

Api.sendMessage({
  chat_id: userId,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
});
