/*CMD
  command: BOT_LANGUAGES
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

var uid = user.telegramid

// ==========================================
// 👑 ADMIN CHECK
// ==========================================

if (String(uid) !== "7897324623") {
  return
}

// ==========================================
// 🌐 LANGUAGE SETTINGS
// ==========================================

Api.sendMessage({
  chat_id: uid,

  text:
    "🌐 <b>LANGUAGE SETTINGS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🇮🇳 <b>Hinglish:</b> 🟢 Enabled\n" +
    "🇬🇧 <b>English:</b> 🟢 Enabled\n" +
    "🇬🇺 <b>Gujarati:</b> 🟢 Enabled\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Currently, all 3 languages are available to users.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🇮🇳 Hinglish",
          callback_data: "LANG_INFO_HL"
        },
        {
          text: "🇬🇧 English",
          callback_data: "LANG_INFO_EN"
        }
      ],
      [
        {
          text: "🇬🇺 Gujarati",
          callback_data: "LANG_INFO_GU"
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
