/*CMD
  command: LANG_INFO_HL
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
// 🇮🇳 HINGLISH INFO
// ==========================================

Api.sendMessage({
  chat_id: uid,

  text:
    "🇮🇳 <b>HINGLISH</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🟢 <b>Status:</b> Enabled\n" +
    "📝 <b>Type:</b> Hindi + English\n" +
    "👥 <b>Available:</b> All users\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Hinglish is currently available as a user language option.",

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
