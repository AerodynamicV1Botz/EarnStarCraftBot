/*CMD
  command: BROADCAST_SEND
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
// 📢 GET PENDING BROADCAST
// ==========================================

var pending = Bot.getProperty(
  "PENDING_BROADCAST_" + uid
)

// ==========================================
// 🛡️ SAFETY CHECK
// ==========================================

if (!pending || String(pending).trim() === "") {

  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "⚠️ No pending broadcast"
  })

  Api.sendMessage({
    chat_id: uid,

    text:
      "⚠️ <b>NO PENDING BROADCAST</b>\n\n" +
      "There is no message waiting to be sent.\n\n" +
      "Create a new broadcast from the Broadcast Center.",

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
// 👥 GET USERS
// ==========================================

var users =
  Bot.getProperty("BroadcastUsers") || []

if (users.length === 0) {

  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "⚠️ No users found"
  })

  Api.sendMessage({
    chat_id: uid,

    text:
      "⚠️ <b>NO RECIPIENTS</b>\n\n" +
      "There are currently no saved users for broadcast.",

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: [
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
// 📊 COUNTERS
// ==========================================

var sent = 0
var failed = 0
var skipped = 0

// ==========================================
// 📤 SEND
// ==========================================

for (var i = 0; i < users.length; i++) {

  var targetId = users[i]

  var userData = Bot.getProperty(
    "USER_" + targetId
  )

  // 🚫 Blocked users
  if (
    userData &&
    userData.blocked === true
  ) {
    skipped++
    continue
  }

  try {

    Api.sendMessage({
      chat_id: targetId,
      text: pending
    })

    sent++

  } catch (error) {

    failed++
  }
}

// ==========================================
// 💾 SAVE STATS
// ==========================================

Bot.setProperty(
  "LAST_BROADCAST_STATS",
  {
    total: users.length,
    sent: sent,
    failed: failed,
    skipped: skipped,
    time: new Date().toISOString()
  },
  "json"
)

// ==========================================
// 🧹 CLEAR PENDING
// ==========================================

Bot.setProperty(
  "PENDING_BROADCAST_" + uid,
  "",
  "string"
)

// ==========================================
// ✅ COMPLETE
// ==========================================

Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "Broadcast completed"
})

Api.sendMessage({
  chat_id: uid,

  text:
    "✅ <b>BROADCAST COMPLETED</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "👥 Total Users: <b>" +
    users.length + "</b>\n" +

    "📨 Sent: <b>" +
    sent + "</b>\n" +

    "🚫 Skipped: <b>" +
    skipped + "</b>\n" +

    "⚠️ Failed: <b>" +
    failed + "</b>\n\n" +

    "━━━━━━━━━━━━━━━━━━",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📊 Broadcast Stats",
          callback_data: "BROADCAST_STATS"
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
