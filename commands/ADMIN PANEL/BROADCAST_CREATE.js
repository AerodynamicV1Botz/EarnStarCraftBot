/*CMD
  command: BROADCAST_CREATE
  help: 
  need_reply: true
  auto_retry_time: 
  folder: ADMIN PANEL

  <<ANSWER
📢 <b>Create Broadcast</b>

📝 Apna announcement message bhejo.

Example:
🎉 New update is live!

Users ko ye message exactly broadcast kiya jayega.
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
// 📨 RECEIVE BROADCAST MESSAGE
// ==========================================

var broadcastText = message

if (!broadcastText) {
  Bot.sendMessage(
    "⚠️ Please send a broadcast message."
  )
  return
}

// ==========================================
// 💾 SAVE PENDING BROADCAST
// ==========================================

Bot.setProperty(
  "PENDING_BROADCAST_" + uid,
  broadcastText,
  "string"
)

// ==========================================
// 👥 USER COUNT
// ==========================================

var users =
  Bot.getProperty("BroadcastUsers") || []

var activeUsers = 0
var blockedUsers = 0

for (var i = 0; i < users.length; i++) {

  var userData = Bot.getProperty(
    "USER_" + users[i]
  )

  if (
    userData &&
    userData.blocked === true
  ) {
    blockedUsers++
  } else {
    activeUsers++
  }
}

// ==========================================
// 👀 PREVIEW
// ==========================================

Api.sendMessage({
  chat_id: uid,

  text:
    "👀 <b>BROADCAST PREVIEW</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "<b>Message:</b>\n\n" +
    broadcastText +
    "\n\n━━━━━━━━━━━━━━━━━━\n\n" +

    "👥 <b>Active Recipients:</b> " +
    activeUsers + "\n" +

    "🚫 <b>Blocked:</b> " +
    blockedUsers + "\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "⚠️ <b>Ready to send?</b>",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "✅ Send Broadcast",
          callback_data: "BROADCAST_SEND"
        }
      ],
      [
        {
          text: "❌ Cancel",
          callback_data: "BROADCAST_CANCEL"
        }
      ],
      [
        {
          text: "📢 Broadcast Center",
          callback_data: "ADMIN_BROADCAST"
        }
      ]
    ]
  }
})
