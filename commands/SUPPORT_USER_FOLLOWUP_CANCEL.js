/*CMD
  command: SUPPORT_USER_FOLLOWUP_CANCEL
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

// CMD: SUPPORT_USER_FOLLOWUP_CANCEL

var userId = user.telegramid;

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
  text: "❌ <b>Follow-up Cancelled</b>\n\nAapka follow-up cancel kar diya gaya hai.",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
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
