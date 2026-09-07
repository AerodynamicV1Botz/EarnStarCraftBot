/*CMD
  command: ENQUIRY_SETTINGS
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
// 📋 ENQUIRY SETTINGS
// ==========================================

var keys = Bot.getProperty("ENQUIRY_KEYS") || []

Api.sendMessage({
  chat_id: uid,

  text:
    "📋 <b>ENQUIRY SETTINGS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🟢 <b>Enquiry System:</b> Active\n" +
    "📝 <b>Total Enquiries:</b> " + keys.length + "\n" +
    "👑 <b>Admin Review:</b> Enabled\n" +
    "🔔 <b>Lead Notifications:</b> Enabled\n" +
    "📊 <b>Status Tracking:</b> Enabled\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Users can submit project requirements through " +
    "the <b>Build My Bot</b> system.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📋 View Enquiries",
          callback_data: "ADMIN_ENQUIRIES"
        }
      ],
      [
        {
          text: "📊 Enquiry Statistics",
          callback_data: "ADMIN_STATS"
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
