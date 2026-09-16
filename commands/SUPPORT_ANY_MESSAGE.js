/*CMD
  command: SUPPORT_ANY_MESSAGE
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

// CMD: SUPPORT_ANY_MESSAGE

if (user.telegramid != 7897324623) {
  return;
}

var replyMode = Bot.getProperty(
  "SUPPORT_REPLY_MODE_" + user.telegramid
);

if (replyMode != "waiting") {
  return;
}

var refId = Bot.getProperty(
  "SUPPORT_REPLY_REF_" + user.telegramid
);

if (!refId) {
  Bot.sendMessage("❌ Request reference missing.");
  return;
}

var requestData = Bot.getProperty(
  "SUPPORT_REQUEST_" + refId
);

if (!requestData) {
  Bot.sendMessage("❌ Request not found.");
  return;
}

var targetUserId =
  requestData.user_id ||
  requestData.telegramid ||
  requestData.user_telegramid;

if (!targetUserId) {
  Bot.sendMessage("❌ Original user ID not found.");
  return;
}

var replyText = "";

if (request && request.text) {
  replyText = request.text;
} else if (typeof message !== "undefined" && message) {
  replyText = message;
} else if (typeof messageText !== "undefined" && messageText) {
  replyText = messageText;
}

replyText = String(replyText || "").trim();

if (!replyText) {
  return;
}

if (replyText.length > 4000) {
  Bot.sendMessage("❌ Message maximum 4000 characters ka ho sakta hai.");
  return;
}

function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

var userMessage =
  "📩 <b>Support Team ka Reply</b>\n\n" +
  "🆔 <b>Reference:</b> <code>" + escapeHtml(refId) + "</code>\n\n" +
  "💬 <b>Message:</b>\n" +
  escapeHtml(replyText) +
  "\n\n" +
  "Agar aur help chahiye toh support se contact karein.";

try {
  Api.sendMessage({
    chat_id: targetUserId,
    text: userMessage,
    parse_mode: "HTML"
  });
} catch (error) {
  Bot.sendMessage(
    "❌ User ko message send nahi ho saka.\n\n" +
    "User ne bot block kiya ho sakta hai."
  );
  return;
}

requestData.admin_reply = replyText;
requestData.admin_reply_by = user.telegramid;
requestData.admin_reply_at = new Date().toISOString();
requestData.updated_at = new Date().toISOString();

Bot.setProperty(
  "SUPPORT_REQUEST_" + refId,
  requestData,
  "json"
);

Bot.setProperty(
  "SUPPORT_REPLY_MODE_" + user.telegramid,
  "idle",
  "string"
);

Bot.setProperty(
  "SUPPORT_REPLY_REF_" + user.telegramid,
  "",
  "string"
);

Api.sendMessage({
  chat_id: user.telegramid,
  text:
    "✅ <b>Reply Sent Successfully</b>\n\n" +
    "🆔 Reference: <code>" + escapeHtml(refId) + "</code>\n\n" +
    "💬 <b>Message:</b>\n" +
    escapeHtml(replyText),
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📄 View Request",
          callback_data: "SUPPORT_ADMIN_REQUEST_DETAILS " + refId
        }
      ],
      [
        {
          text: "⬅️ Back to Requests",
          callback_data: "SUPPORT_ADMIN_REQUESTS ALL PAGE=1"
        }
      ]
    ]
  }
});
