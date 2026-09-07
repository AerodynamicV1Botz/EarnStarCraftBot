/*CMD
  command: LANG_INFO_EN
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
// 🇬🇧 ENGLISH INFO
// ==========================================

Api.sendMessage({
  chat_id: uid,

  text:
    "🇬🇧 <b>ENGLISH</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🟢 <b>Status:</b> Enabled\n" +
    "📝 <b>Type:</b> English\n" +
    "👥 <b>Available:</b> All users\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "English is currently available as a user language option.",

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
