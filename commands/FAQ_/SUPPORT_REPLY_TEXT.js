/*CMD
  command: SUPPORT_REPLY_TEXT
  help: 
  need_reply: false
  auto_retry_time: 
  folder: FAQ?

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// CMD: SUPPORT_REPLY_TEXT

var adminId = 7897324623;
var adminKey = String(adminId);

if (user.telegramid != adminId) {
  return;
}

var replyMode = Bot.getProperty("SUPPORT_REPLY_MODE_" + adminKey);

if (replyMode != "waiting") {
  return Bot.sendMessage("⚠️ Koi active reply request nahi hai.");
}

var refId = Bot.getProperty("SUPPORT_REPLY_REF_" + adminKey);

if (!refId) {
  Bot.setProperty("SUPPORT_REPLY_MODE_" + adminKey, "idle", "string");
  return Bot.sendMessage("❌ Request reference missing hai.");
}

var requestKey = "SUPPORT_REQUEST_" + refId;
var request = Bot.getProperty(requestKey);

if (!request) {
  Bot.setProperty("SUPPORT_REPLY_MODE_" + adminKey, "idle", "string");
  Bot.setProperty("SUPPORT_REPLY_REF_" + adminKey, "", "string");

  return Bot.sendMessage("❌ Ye support request ab available nahi hai.");
}

// User ke typed message ko different BotBusiness formats se read karo
var replyText = "";

if (typeof message != "undefined" && message) {
  replyText = message;
}

if (
  typeof request != "undefined" &&
  typeof messageText != "undefined" &&
  messageText
) {
  replyText = messageText;
}

if (!replyText && typeof params != "undefined" && params) {
  replyText = params;
}

replyText = String(replyText || "").trim();

// Cancel support reply
if (replyText.toLowerCase() == "/cancel") {
  Bot.setProperty("SUPPORT_REPLY_MODE_" + adminKey, "idle", "string");
  Bot.setProperty("SUPPORT_REPLY_REF_" + adminKey, "", "string");

  return Bot.sendMessage(
    "❌ Reply cancel kar diya gaya.\n\n" +
    "Support request: #" + refId
  );
}

if (!replyText) {
  return Bot.sendMessage(
    "⚠️ Reply text empty hai.\n\n" +
    "Please admin reply dobara type karo."
  );
}

if (replyText.length > 4000) {
  return Bot.sendMessage(
    "⚠️ Reply 4000 characters se zyada nahi hona chahiye."
  );
}

// Target user ID
var targetUserId =
  request.user_id ||
  request.telegramid ||
  request.user_telegramid ||
  request.from_id;

if (!targetUserId) {
  return Bot.sendMessage(
    "❌ Is request ka user ID nahi mila.\n\n" +
    "Reply mode active rakha gaya hai."
  );
}

// HTML escape
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

var safeReply = escapeHtml(replyText);

var userMessage =
  "📩 <b>Support Team ka Reply</b>\n\n" +
  "🆔 <b>Request ID:</b> #" + escapeHtml(refId) + "\n\n" +
  "💬 <b>Admin Reply:</b>\n" +
  safeReply +
  "\n\n" +
  "Agar aapko aur help chahiye, isi support request mein follow-up bhej sakte ho.";

try {
  Api.sendMessage({
    chat_id: targetUserId,
    text: userMessage,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📩 View My Requests",
            callback_data: "SUPPORT_USER_REQUESTS"
          }
        ],
        [
          {
            text: "➕ Send Follow-up",
            callback_data: "SUPPORT_USER_FOLLOWUP " + refId
          }
        ]
      ]
    }
  });
} catch (error) {
  return Bot.sendMessage(
    "❌ User ko reply send nahi ho saka.\n\n" +
    "Reply mode active rakha gaya hai. Dobara try karo."
  );
}

// Request update
request.admin_reply = replyText;
request.admin_reply_by = adminId;
request.admin_reply_at = new Date().toISOString();
request.updated_at = new Date().toISOString();

Bot.setProperty(requestKey, request, "json");

// Reply mode clear
Bot.setProperty("SUPPORT_REPLY_MODE_" + adminKey, "idle", "string");
Bot.setProperty("SUPPORT_REPLY_REF_" + adminKey, "", "string");

// Admin confirmation
Api.sendMessage({
  chat_id: adminId,
  text:
    "✅ <b>Reply successfully sent</b>\n\n" +
    "🆔 Request ID: <code>#" + escapeHtml(refId) + "</code>\n" +
    "👤 User ID: <code>" + escapeHtml(targetUserId) + "</code>\n\n" +
    "💬 <b>Reply:</b>\n" + safeReply,
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
          text: "📋 All Requests",
          callback_data: "SUPPORT_ADMIN_REQUESTS ALL PAGE=1"
        }
      ]
    ]
  }
});
