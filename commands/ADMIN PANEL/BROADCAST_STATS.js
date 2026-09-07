/*CMD
  command: BROADCAST_STATS
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
// 📊 GET LAST BROADCAST
// ==========================================

var stats = Bot.getProperty(
  "LAST_BROADCAST_STATS"
)

// ==========================================
// 📭 NO BROADCAST YET
// ==========================================

if (!stats) {

  Api.sendMessage({
    chat_id: uid,

    text:
      "📊 <b>BROADCAST STATISTICS</b>\n\n" +
      "━━━━━━━━━━━━━━━━━━\n\n" +
      "📭 No broadcast has been sent yet.\n\n" +
      "Create your first broadcast from the Broadcast Center.",

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📨 Create Broadcast",
            callback_data: "BROADCAST_CREATE"
          }
        ],
        [
          {
            text: "📢 Broadcast Center",
            callback_data: "ADMIN_BROADCAST"
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

  return
}

// ==========================================
// 📊 VALUES
// ==========================================

var total = stats.total || 0
var sent = stats.sent || 0
var failed = stats.failed || 0
var skipped = stats.skipped || 0
var time = stats.time || "Not available"

// ==========================================
// 📈 SUCCESS RATE
// ==========================================

var successRate = 0

if (total > 0) {
  successRate = Math.round(
    (sent / total) * 100
  )
}

// ==========================================
// 📊 DISPLAY
// ==========================================

Api.sendMessage({
  chat_id: uid,

  text:
    "📊 <b>BROADCAST STATISTICS</b>\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "👥 <b>Total Users:</b> " +
    total + "\n\n" +

    "📨 <b>Successfully Sent:</b> " +
    sent + "\n\n" +

    "🚫 <b>Blocked/Skipped:</b> " +
    skipped + "\n\n" +

    "⚠️ <b>Failed:</b> " +
    failed + "\n\n" +

    "📈 <b>Success Rate:</b> " +
    successRate + "%\n\n" +

    "🕐 <b>Last Broadcast:</b>\n" +
    time +

    "\n\n━━━━━━━━━━━━━━━━━━",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🔄 Refresh",
          callback_data: "BROADCAST_STATS"
        }
      ],
      [
        {
          text: "📨 Create Broadcast",
          callback_data: "BROADCAST_CREATE"
        }
      ],
      [
        {
          text: "📢 Broadcast Center",
          callback_data: "ADMIN_BROADCAST"
        },
        {
          text: "👑 Admin Panel",
          callback_data: "ADMIN_PANEL"
        }
      ]
    ]
  }
})
