/*CMD
  command: CUSTOM_ADMIN_VIEW
  help: 
  need_reply: false
  auto_retry_time: 
  folder: PRICING

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 53 — UPDATED VERSION
// COMMAND NAME: CUSTOM_ADMIN_VIEW
// STEP 4.4.2.1.2 — ADMIN CUSTOM REQUEST VIEW
// 📁 MAIN MENU → 📁 PRICING → CUSTOM PACKAGE → MY REQUESTS → VIEW → ADMIN VIEW
// 🌐 Language support included
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================

// ---------- CALLBACK RESPONSE ----------
if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

// ---------- ADMIN CHECK ----------
var uid = String(user.telegramid)
var ownerId = "7897324623"
var staffAdmins = Bot.getProperty("STAFF_ADMINS") || []

if (!Array.isArray(staffAdmins)) {
  staffAdmins = []
}

var isAdmin = uid == ownerId

for (var i = 0; i < staffAdmins.length; i++) {
  if (uid == String(staffAdmins[i])) {
    isAdmin = true
    break
  }
}

if (!isAdmin) {
  return Bot.sendMessage(
    "❌ You are not authorized to access this request."
  )
}

// ---------- REQUEST ID ----------
var requestId = params

if (
  typeof requestId === "undefined" ||
  requestId === null ||
  String(requestId).trim() == ""
) {
  return Bot.sendMessage("❌ Request ID is missing.")
}

requestId = String(requestId).trim()

// ---------- GET REQUEST ----------
var customRequest = Bot.getProperty(
  "CUSTOM_REQUEST_" + requestId
)

if (!customRequest) {
  return Bot.sendMessage("❌ Request not found.")
}

// ---------- REQUEST DATA ----------
var status = String(
  customRequest.status || "pending"
)

var statusText = status

if (status == "pending") {
  statusText = "⏳ Pending"
} else if (status == "accepted") {
  statusText = "✅ Accepted"
} else if (status == "rejected") {
  statusText = "❌ Rejected"
} else if (status == "cancelled") {
  statusText = "🚫 Cancelled"
}

// ---------- ADMIN TEXT ----------
var text =
  "💎 <b>Custom Bot Request — Admin View</b>\n\n" +
  "🆔 Request ID: <code>" + (customRequest.requestId || requestId) + "</code>\n" +
  "👤 User ID: <code>" + customRequest.userId + "</code>\n" +
  "👤 Name: " + (customRequest.fullName || "Unknown") + "\n" +
  "🔗 Username: " + (customRequest.username ? "@" + customRequest.username : "Not available") + "\n" +
  "🌐 Language: " + (customRequest.language || "hinglish") + "\n" +
  "🤖 Service: <b>" + (customRequest.service || "Custom Bot") + "</b>\n" +
  "📦 Package: <b>" + (customRequest.package || "Custom") + "</b>\n" +
  "💰 Price: <b>" + (customRequest.price || "Custom Quote") + "</b>\n" +
  "📌 Status: <b>" + statusText + "</b>\n" +
  "📅 Created: " + (customRequest.createdAt || "N/A") + "\n\n" +
  "📝 <b>Requirements:</b>\n" +
  (customRequest.requirements || "N/A")

// ---------- BUTTONS ----------
var buttons = []

if (status == "pending") {
  buttons.push([
    {
      text: "✅ Accept",
      callback_data: "CUSTOM_ACCEPT " + requestId
    },
    {
      text: "❌ Reject",
      callback_data: "CUSTOM_REJECT " + requestId
    }
  ])
}

buttons.push([
  {
    text: "💬 Contact User",
    callback_data: "CUSTOM_CONTACT " + requestId
  }
])

buttons.push([
  {
    text: "📋 All Custom Requests",
    callback_data: "ADMIN_CUSTOM_REQUESTS"
  }
])

buttons.push([
  {
    text: "🔙 Admin Panel",
    callback_data: "ADMIN_PANEL"
  }
])

// ---------- MESSAGE ID ----------
var messageId = null

if (
  typeof request !== "undefined" &&
  request &&
  request.message &&
  request.message.message_id
) {
  messageId = request.message.message_id
}

// ---------- EDIT OR SEND ----------
if (messageId) {
  try {
    Api.editMessageText({
      chat_id: uid,
      message_id: messageId,
      text: text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: buttons
      }
    })
  } catch (e) {
    try {
      Api.deleteMessage({
        chat_id: uid,
        message_id: messageId
      })
    } catch (deleteError) {}

    Api.sendMessage({
      chat_id: uid,
      text: text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: buttons
      }
    })
  }
} else {
  Api.sendMessage({
    chat_id: uid,
    text: text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons
    }
  })
}
