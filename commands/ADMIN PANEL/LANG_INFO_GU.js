/*CMD
  command: LANG_INFO_GU
  help: 
  need_reply: false
  auto_retry_time: 
  folder: ADMIN PANEL

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var uid = user.telegramid

// ==========================================
// 👑 ADMIN CHECK
// ==========================================

if (String(uid) !== "7897324623") {
  return
}

// ==========================================
// 🇬🇺 GUJARATI INFO
// ==========================================

Api.sendMessage({
  chat_id: uid,

  text:
    "🇬🇺 <b>GUJARATI</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🟢 <b>Status:</b> Enabled\n" +
    "📝 <b>Type:</b> Gujarati\n" +
    "👥 <b>Available:</b> All users\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Gujarati is currently available as a user language option.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🌐 Languages",
          callback_data: "BOT_LANGUAGES"
        }
      ],
      [
        {
          text: "⚙️ Settings",
          callback_data: "ADMIN_SETTINGS"
        },
        {
          text: "👑 Admin Panel",
          callback_data: "ADMIN_PANEL"
        }
      ]
    ]
  }
})
