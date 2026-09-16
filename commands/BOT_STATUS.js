/*CMD
  command: BOT_STATUS
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
// 🤖 BOT STATUS
// ==========================================

Api.sendMessage({
  chat_id: uid,

  text:
    "🤖 <b>BOT STATUS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🟢 <b>Status:</b> Active\n" +
    "🤖 <b>Bot:</b> EarnStar 🤖 BOTCRAFT\n" +
    "🌐 <b>Languages:</b> Hinglish • English • Gujarati\n" +
    "📋 <b>Enquiries:</b> Active\n" +
    "📢 <b>Broadcast:</b> Active\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "✅ Your bot is currently running normally.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🔄 Refresh",
          callback_data: "BOT_STATUS"
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
