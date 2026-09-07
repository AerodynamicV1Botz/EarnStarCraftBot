/*CMD
  command: SUPPORT_REQUEST_VIEW
  help: 
  need_reply: false
  auto_retry_time: 
  folder: PORTFOLIO

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// CMD: SUPPORT_REQUEST_VIEW

var requestId = params;
var uid = user.telegramid;

if (!requestId) {
  Api.sendMessage({
    text: "❌ Invalid support request.",
    parse_mode: "HTML"
  });
  return;
}

var request = Bot.getProperty("SUPPORT_REQUEST_" + requestId);

if (!request) {
  Api.sendMessage({
    text: "❌ Yeh support request nahi mili ya delete ho chuki hai.",
    parse_mode: "HTML"
  });
  return;
}

if (String(request.userId) !== String(uid)) {
  Api.sendMessage({
    text: "🚫 Aapko is request ko dekhne ki permission nahi hai.",
    parse_mode: "HTML"
  });
  return;
}

var statusText = "⏳ Pending";

if (request.status === "accepted") {
  statusText = "✅ Accepted";
} else if (request.status === "rejected") {
  statusText = "❌ Rejected";
} else if (request.status === "contacted") {
  statusText = "💬 Contacted";
} else if (request.status === "cancelled") {
  statusText = "🚫 Cancelled";
}

var text =
  "📂 <b>Support Request Details</b>\n\n" +
  "🆔 <b>Request ID:</b> " + request.requestId +
  "\n🛠️ <b>Service:</b> " + request.service +
  "\n📊 <b>Status:</b> " + statusText +
  "\n🕒 <b>Created:</b> " + request.createdAt +
  "\n\n📝 <b>Your Requirements:</b>\n" +
  request.requirements;

var buttons = [];

if (request.status === "pending") {
  buttons.push([
    {
      text: "🚫 Cancel Request",
      callback_data: "SUPPORT_CANCEL " + request.requestId
    }
  ]);
}

buttons.push([
  {
    text: "🔙 My Requests",
    callback_data: "MY_SUPPORT_REQUESTS"
  }
]);

buttons.push([
  {
    text: "🏠 Main Menu",
    callback_data: "MAIN_MENU"
  }
]);

Api.sendMessage({
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
});
