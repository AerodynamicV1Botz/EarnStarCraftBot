/*CMD
  command: MY_SUPPORT_REQUESTS
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

// CMD: MY_SUPPORT_REQUESTS

var uid = user.telegramid;
var keys = Bot.getProperty("SUPPORT_REQUEST_KEYS", []);
var myRequests = [];

if (!Array.isArray(keys)) {
  keys = [];
}

for (var i = 0; i < keys.length; i++) {
  var request = Bot.getProperty("SUPPORT_REQUEST_" + keys[i]);

  if (
    request &&
    String(request.userId) === String(uid)
  ) {
    myRequests.push(request);
  }
}

if (myRequests.length === 0) {
  Api.sendMessage({
    text:
      "📂 <b>My Support Requests</b>\n\n" +
      "Aapne abhi tak koi support request submit nahi ki hai.",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🛠️ Create New Request",
            callback_data: "BUILD_SUPPORT"
          }
        ],
        [
          {
            text: "🔙 Back",
            callback_data: "PORTFOLIO_SUPPORT"
          }
        ]
      ]
    }
  });

  return;
}

var text = "📂 <b>My Support Requests</b>\n\n";
var buttons = [];

for (var j = 0; j < myRequests.length; j++) {
  var r = myRequests[j];

  var statusText = "⏳ Pending";

  if (r.status === "accepted") {
    statusText = "✅ Accepted";
  } else if (r.status === "rejected") {
    statusText = "❌ Rejected";
  } else if (r.status === "contacted") {
    statusText = "💬 Contacted";
  } else if (r.status === "cancelled") {
    statusText = "🚫 Cancelled";
  }

  var requestId = String(r.requestId || "Unknown");
  var service = String(r.service || "Customer Support Bot");
  var requirements = String(
    r.requirements || "No requirements provided"
  );

  var shortRequirements = requirements.substring(0, 80);

  if (requirements.length > 80) {
    shortRequirements += "...";
  }

  text +=
    "🆔 <b>Request:</b> " + requestId +
    "\n📌 <b>Service:</b> " + service +
    "\n📊 <b>Status:</b> " + statusText +
    "\n📝 <b>Details:</b> " + shortRequirements +
    "\n\n";

  buttons.push([
    {
      text: "👁️ View Request " + requestId,
      callback_data: "SUPPORT_REQUEST_VIEW " + requestId
    }
  ]);
}

buttons.push([
  {
    text: "🛠️ Create New Request",
    callback_data: "BUILD_SUPPORT"
  }
]);

buttons.push([
  {
    text: "🔙 Back",
    callback_data: "PORTFOLIO_SUPPORT"
  }
]);

Api.sendMessage({
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
});
