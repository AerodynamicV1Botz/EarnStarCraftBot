/*CMD
  command: BROADCAST_SETTINGS
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
// 📢 BROADCAST SETTINGS
// ==========================================

var users = Bot.getProperty("BroadcastUsers") || []

Api.sendMessage({
  chat_id: uid,

  text:
    "📢 <b>BROADCAST SETTINGS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🟢 <b>Broadcast:</b> Enabled\n" +
    "👥 <b>Saved Users:</b> " + users.length + "\n" +
    "📨 <b>Send System:</b> Active\n" +
    "📊 <b>Statistics:</b> Enabled\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Broadcast messages can be sent to saved bot users.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📨 Broadcast Center",
          callback_data: "ADMIN_BROADCAST"
        }
      ],
      [
        {
          text: "📊 Broadcast Stats",
          callback_data: "BROADCAST_STATS"
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
