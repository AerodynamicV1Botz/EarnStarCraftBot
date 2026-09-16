/*CMD
  command: BUILD_USER_DISCUSSION
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

/*CMD
  command: BUILD_USER_DISCUSSION
  need_reply: false
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 206 — BUILD_USER_DISCUSSION
// CLIENT → START / CONTINUE DISCUSSION
// =====================================================

var uid = String(user.telegramid);

function safeText(text) {
  return String(text == null ? "" : text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

var enquiryId = "";

if (typeof params !== "undefined") {
  enquiryId = String(params || "").trim();
}

if (!enquiryId) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ Enquiry ID missing",
    show_alert: true
  });
  return;
}

var enquiry = Bot.getProperty("BUILD_ENQUIRY_" + enquiryId);

if (!enquiry) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ Enquiry not found",
    show_alert: true
  });
  return;
}

var clientId = String(
  enquiry.userId ||
  enquiry.clientId ||
  enquiry.telegramId ||
  ""
);

if (clientId !== uid) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ This enquiry does not belong to you",
    show_alert: true
  });
  return;
}

var status = String(
  enquiry.status ||
  enquiry.requestStatus ||
  ""
);

if (
  status !== "accepted" &&
  status !== "discussion" &&
  status !== "proposal_sent" &&
  status !== "changes_requested"
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "⚠️ Discussion is not available now",
    show_alert: true
  });
  return;
}

User.setProperty(
  "BUILD_USER_DISCUSSION_TEMP",
  {
    enquiryId: enquiryId,
    clientId: uid,
    createdAt: Date.now()
  },
  "json"
);

Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "Type your message for admin"
});

Api.editMessageText({
  chat_id: uid,
  message_id: request.message.message_id,
  text:
    "💬 <b>CONTINUE DISCUSSION</b>\n\n" +
    "🆔 <b>Enquiry:</b> <code>" + safeText(enquiryId) + "</code>\n\n" +
    "✍️ Admin ko bhejne wala message type karo.\n\n" +
    "Aap requirements, changes, budget, timeline ya project details discuss kar sakte ho.",
  parse_mode: "HTML"
});

Bot.runCommand("BUILD_USER_DISCUSSION_SAVE");
