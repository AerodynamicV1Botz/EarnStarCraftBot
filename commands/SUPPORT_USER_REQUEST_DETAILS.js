/*CMD
  command: SUPPORT_USER_REQUEST_DETAILS
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

// CMD: SUPPORT_USER_REQUEST_DETAILS

var userId = user.telegramid;
var refId = params;

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

var subject =
  requestData.subject ||
  requestData.title ||
  "Support Request";

var messageText =
  requestData.message ||
  requestData.text ||
  requestData.description ||
  "No message available.";

var createdAt =
  requestData.created_at ||
  requestData.createdAt ||
  "Not available";

var updatedAt =
  requestData.updated_at ||
  requestData.updatedAt ||
  "Not available";

var adminReply =
  requestData.admin_reply ||
  requestData.adminReply ||
  "";

var text =
  "📄 <b>Support Request Details</b>\n\n" +
  "🆔 <b>Reference:</b> <code>" +
  escapeHtml(refId) +
  "</code>\n\n" +
  "📝 <b>Subject:</b>\n" +
  escapeHtml(subject) +
  "\n\n" +
  "💬 <b>Your Message:</b>\n" +
  escapeHtml(messageText) +
  "\n\n" +
  "📌 <b>Status:</b> " +
  getStatusText(requestData.status) +
  "\n\n" +
  "🕒 <b>Created:</b> " +
  escapeHtml(createdAt) +
  "\n" +
  "🔄 <b>Updated:</b> " +
  escapeHtml(updatedAt);

if (adminReply) {
  text +=
    "\n\n━━━━━━━━━━━━━━\n" +
    "👨‍💻 <b>Admin Reply:</b>\n" +
    escapeHtml(adminReply);
}

var buttons = [];

if (
  String(requestData.status || "new").toLowerCase() != "closed" &&
  String(requestData.status || "new").toLowerCase() != "cancelled"
) {
  buttons.push([
    {
      text: "💬 Send Follow-up",
      callback_data: "SUPPORT_USER_FOLLOWUP " + refId
    }
  ]);
}

buttons.push([
  {
    text: "⬅️ My Requests",
    callback_data: "SUPPORT_USER_REQUESTS"
  }
]);

buttons.push([
  {
    text: "🏠 Main Menu",
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
