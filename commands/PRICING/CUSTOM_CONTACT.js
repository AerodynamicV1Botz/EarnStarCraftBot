/*CMD
  command: CUSTOM_CONTACT
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
// SCRIPT 54 — UPDATED VERSION
// COMMAND NAME: CUSTOM_CONTACT
// STEP 4.4.2.1.2.1 — CONTACT CUSTOM REQUEST USER
// 📁 MAIN MENU → 📁 PRICING → CUSTOM PACKAGE → MY REQUESTS → VIEW → ADMIN VIEW → CONTACT
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
    "❌ You are not authorized to contact users."
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

// ---------- TARGET USER ----------
var targetUserId = customRequest.userId

if (
  typeof targetUserId === "undefined" ||
  targetUserId === null ||
  String(targetUserId).trim() == ""
) {
  return Bot.sendMessage("❌ User information not found.")
}

// ---------- LANGUAGE ----------
var targetUserData = Bot.getProperty(
  "USER_" + targetUserId
) || {}

var lang = targetUserData.language || "hinglish"

// ---------- CONTACT TEXT ----------
var text = ""

if (lang == "english") {
  text =
    "📩 <b>Custom Request Contact</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>\n" +
    "👤 User ID: <code>" + targetUserId + "</code>\n\n" +
    "Use the button below to open the user's Telegram profile."

} else if (lang == "gujarati") {
  text =
    "📩 <b>કસ્ટમ રિક્વેસ્ટ સંપર્ક</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>\n" +
    "👤 User ID: <code>" + targetUserId + "</code>\n\n" +
    "યુઝરની Telegram profile ખોલવા માટે નીચેનું બટન દબાવો."

} else {
  text =
    "📩 <b>Custom Request Contact</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>\n" +
    "👤 User ID: <code>" + targetUserId + "</code>\n\n" +
    "User ko contact karne ke liye neeche button use karein."
}

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: "💬 Contact User",
      url: "tg://user?id=" + targetUserId
    }
  ],
  [
    {
      text: "👁 View Request",
      callback_data: "CUSTOM_ADMIN_VIEW " + requestId
    }
  ],
  [
    {
      text: "📋 All Custom Requests",
      callback_data: "ADMIN_CUSTOM_REQUESTS"
    }
  ],
  [
    {
      text: "🔙 Admin Panel",
      callback_data: "ADMIN_PANEL"
    }
  ]
]

// ---------- SEND MESSAGE ----------
Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
})
