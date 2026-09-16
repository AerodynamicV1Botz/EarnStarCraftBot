/*CMD
  command: SUPPORT_USER_FOLLOWUP_TEXT
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

// CMD: SUPPORT_USER_FOLLOWUP_TEXT

var userId = user.telegramid;

var followupMode = Bot.getProperty(
  "SUPPORT_FOLLOWUP_MODE_" + userId
);

if (followupMode != "waiting") {
  return;
}

var refId = Bot.getProperty(
  "SUPPORT_FOLLOWUP_REF_" + userId
);

if (!refId) {
  Bot.sendMessage("❌ Request reference missing.");
  return;
}

var requestData = Bot.getProperty(
  "SUPPORT_REQUEST_" + refId
);

if (!requestData) {
  Bot.sendMessage("❌ Support request nahi mili.");
  return;
}

var requestUserId =
  requestData.user_id ||
  requestData.telegramid ||
  requestData.user_telegramid;

if (String(requestUserId) != String(userId)) {
  Bot.sendMessage("❌ Yeh request aapki nahi hai.");
  return;
}

var status = String(
  requestData.status || "new"
).toLowerCase();

if (status == "closed" || status == "cancelled") {
  Bot.sendMessage(
    "❌ Is request par follow-up allowed nahi hai.\n\n" +
    "🆔 Reference: " + refId
  );
  return;
}

var followupText = "";

if (request && request.text) {
  followupText = request.text;
} else if (
  typeof message !== "undefined" &&
  message
) {
  followupText = message;
} else if (
  typeof messageText !== "undefined" &&
  messageText
) {
  followupText = messageText;
}

followupText = String(followupText || "").trim();

if (!followupText) {
  return;
}

if (followupText == "/cancel") {
  Bot.setProperty(
    "SUPPORT_FOLLOWUP_MODE_" + userId,
    "idle",
    "string"
  );

  Bot.setProperty(
    "SUPPORT_FOLLOWUP_REF_" + userId,
    "",
    "string"
  );

  Bot.sendMessage("❌ Follow-up cancelled.");
  return;
}

if (followupText.length > 4000) {
  Bot.sendMessage(
    "❌ Message maximum 4000 characters ka ho sakta hai."
  );
  return;
}

function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

var fullName =
  user.first_name +
  (user.last_name ? " " + user.last_name : "");

var adminText =
  "💬 <b>Support Follow-up</b>\n\n" +
  "🆔 <b>Reference:</b> <code>" +
  escapeHtml(refId) +
  "</code>\n" +
  "👤 <b>User:</b> " +
  escapeHtml(fullName) +
  "\n" +
  "🆔 <b>User ID:</b> <code>" +
  userId +
  "</code>\n\n" +
  "📝 <b>Follow-up Message:</b>\n" +
  escapeHtml(followupText);

try {
  Api.sendMessage({
    chat_id: 7897324623,
    text: adminText,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📄 View Follow-up",
            callback_data:
              "SUPPORT_ADMIN_FOLLOWUP_DETAILS " + refId
          }
        ],
        [
          {
            text: "💬 Reply User",
            callback_data:
              "SUPPORT_REPLY " + refId
          }
        ]
      ]
    }
  });
} catch (error) {
  Bot.sendMessage(
    "❌ Follow-up admin ko send nahi ho saka."
  );
  return;
}

requestData.last_followup = followupText;
requestData.last_followup_by = userId;
requestData.last_followup_at = new Date().toISOString();
requestData.updated_at = new Date().toISOString();

Bot.setProperty(
  "SUPPORT_REQUEST_" + refId,
  requestData,
  "json"
);

Bot.setProperty(
  "SUPPORT_FOLLOWUP_MODE_" + userId,
  "idle",
  "string"
);

Bot.setProperty(
  "SUPPORT_FOLLOWUP_REF_" + userId,
  "",
  "string"
);

Api.sendMessage({
  chat_id: userId,
  text:
    "✅ <b>Follow-up Sent</b>\n\n" +
    "🆔 Reference: <code>" +
    escapeHtml(refId) +
    "</code>\n\n" +
    "Aapka message support team ko bhej diya gaya hai.",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📄 View Request",
          callback_data:
            "SUPPORT_USER_REQUEST_DETAILS " + refId
        }
      ],
      [
        {
          text: "⬅️ My Requests",
          callback_data: "SUPPORT_USER_REQUESTS"
        }
      ]
    ]
  }
});
