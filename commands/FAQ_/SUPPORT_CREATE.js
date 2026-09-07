/*CMD
  command: SUPPORT_CREATE
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

// CMD: SUPPORT_CREATE

var userId = user.telegramid;

Bot.setProperty(
  "SUPPORT_CREATE_MODE_" + userId,
  "waiting_subject",
  "string"
);

Bot.setProperty(
  "SUPPORT_CREATE_SUBJECT_" + userId,
  "",
  "string"
);

Bot.setProperty(
  "SUPPORT_CREATE_MESSAGE_" + userId,
  "",
  "string"
);

Api.sendMessage({
  chat_id: userId,
  text:
    "🆕 <b>New Support Request</b>\n\n" +
    "Sabse pehle apni request ka subject bhejiye.\n\n" +
    "Example: <i>Payment pending</i>\n\n" +
    "❌ Cancel karne ke liye /cancel likhiye.",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "❌ Cancel",
          callback_data: "SUPPORT_CREATE_CANCEL"
        }
      ]
    ]
  }
});
