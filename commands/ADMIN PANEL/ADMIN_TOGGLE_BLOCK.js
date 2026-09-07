/*CMD
  command: ADMIN_TOGGLE_BLOCK
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
// 🆔 TARGET USER
// ==========================================

var targetId = params

if (!targetId) {
  Bot.sendMessage("⚠️ User ID not found.")
  return
}

// ==========================================
// 👤 GET USER DATA
// ==========================================

var userData = Bot.getProperty(
  "USER_" + targetId
)

if (!userData) {
  Bot.sendMessage("❌ User not found.")
  return
}

// ==========================================
// 🔄 TOGGLE BLOCK STATUS
// ==========================================

var currentStatus = userData.blocked || false

userData.blocked = !currentStatus

Bot.setProperty(
  "USER_" + targetId,
  userData,
  "json"
)

// ==========================================
// 📢 RESULT
// ==========================================

var statusText = userData.blocked
  ? "🚫 User Blocked"
  : "🔓 User Unblocked"

Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: statusText
})

// ==========================================
// 👤 OPEN USER DETAILS AGAIN
// ==========================================

Bot.runCommand(
  "ADMIN_USER " + targetId
)
