/*CMD
  command: SUPPORT_CREATE_CANCEL
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

// CMD: SUPPORT_CREATE_CANCEL

var userId = user.telegramid;

Bot.setProperty(
  "SUPPORT_CREATE_MODE_" + userId,
  "idle",
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
    "❌ <b>Request Creation Cancelled</b>\n\n" +
    "New support request banana cancel kar diya gaya hai.",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🆕 New Request",
          callback_data: "SUPPORT_CREATE"
        }
      ],
      [
        {
          text: "📂 My Requests",
          callback_data: "SUPPORT_USER_REQUESTS"
        }
      ],
      [
        {
          text: "🏠 Main Menu",
          callback_data: "MAIN_MENU"
        }
      ]
    ]
  }
});
