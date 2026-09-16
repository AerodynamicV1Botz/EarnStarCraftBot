/*CMD
  command: ADMIN_SETTINGS
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
// ⚙️ SETTINGS MENU
// ==========================================

Api.sendMessage({
  chat_id: uid,

  text:
    "⚙️ <b>BOT SETTINGS</b>\n\n" +
    "Manage your EarnStar BOTCRAFT settings from here.\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🤖 <b>Bot Status:</b> 🟢 Active\n" +
    "🌐 <b>Languages:</b> 3\n" +
    "📢 <b>Broadcast:</b> Enabled\n" +
    "📋 <b>Enquiries:</b> Enabled\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Select a setting below:",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🤖 Bot Status",
          callback_data: "BOT_STATUS"
        }
      ],
      [
        {
          text: "🌐 Languages",
          callback_data: "BOT_LANGUAGES"
        }
      ],
      [
        {
          text: "📢 Broadcast Settings",
          callback_data: "BROADCAST_SETTINGS"
        }
      ],
      [
        {
          text: "📋 Enquiry Settings",
          callback_data: "ENQUIRY_SETTINGS"
        }
      ],
      [
        {
          text: "👑 Admin Panel",
          callback_data: "ADMIN_PANEL"
        }
      ]
    ]
  }
}) 
