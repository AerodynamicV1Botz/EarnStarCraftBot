/*CMD
  command: SUPPORT_USER_FOLLOWUP
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

// CMD: SUPPORT_USER_FOLLOWUP

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

Bot.setProperty(
  "SUPPORT_FOLLOWUP_REF_" + userId,
  refId,
  "string"
);

Bot.setProperty(
  "SUPPORT_FOLLOWUP_MODE_" + userId,
  "waiting",
  "string"
);

Api.sendMessage({
  chat_id: userId,
  text:
    "💬 <b>Follow-up Message</b>\n\n" +
    "🆔 Reference: <code>" + refId + "</code>\n\n" +
    "Apna follow-up message type karke bhejiye.\n" +
    "❌ Cancel karne ke liye /cancel likhiye.",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "❌ Cancel",
          callback_data: "SUPPORT_USER_FOLLOWUP_CANCEL"
        }
      ]
    ]
  }
});
