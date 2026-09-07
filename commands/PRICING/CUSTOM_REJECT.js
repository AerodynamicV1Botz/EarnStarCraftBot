/*CMD
  command: CUSTOM_REJECT
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
// SCRIPT 56 — UPDATED VERSION
// COMMAND NAME: CUSTOM_REJECT
// STEP 4.4.2.1.2.2.1 — REJECT CUSTOM REQUEST
// 📁 MAIN MENU → 📁 PRICING → CUSTOM PACKAGE → MY REQUESTS → VIEW → ADMIN VIEW → REJECT
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
    callback_query_id: request.id,
    text: "❌ Custom request rejected"
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
    "❌ You are not authorized to reject requests."
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

// ---------- STATUS CHECK ----------
if (
  String(customRequest.status) != "pending"
) {
  return Bot.sendMessage(
    "⚠️ This request is already " +
    String(customRequest.status || "processed") +
    "."
  )
}

// ---------- UPDATE REQUEST ----------
customRequest.status = "rejected"
customRequest.rejectedAt = new Date().toISOString()
customRequest.rejectedBy = uid

Bot.setProperty(
  "CUSTOM_REQUEST_" + requestId,
  customRequest,
  "json"
)

// ---------- CLEAR MODE ----------
Bot.setProperty(
  "CUSTOM_MODE_" + customRequest.userId,
  "",
  "string"
)

// ---------- USER DATA ----------
var targetUserId = customRequest.userId
var targetUserData = Bot.getProperty(
  "USER_" + targetUserId
) || {}

var lang = targetUserData.language || "hinglish"

// ---------- USER TEXT ----------
var userText = ""

if (lang == "english") {
  userText =
    "❌ <b>Your Custom Bot request was rejected.</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>\n\n" +
    "You can contact our team for more information."

} else if (lang == "gujarati") {
  userText =
    "❌ <b>તમારી Custom Bot request નકારવામાં આવી છે.</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>\n\n" +
    "વધુ માહિતી માટે તમે અમારી ટીમનો સંપર્ક કરી શકો છો."

} else {
  userText =
    "❌ <b>Apki Custom Bot request reject ho gayi hai.</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>\n\n" +
    "Zyada information ke liye aap hamari team se contact kar sakte ho."
}

// ---------- USER BUTTONS ----------
var userKeyboard = {
  inline_keyboard: [
    [
      {
        text: lang == "english"
          ? "📋 My Custom Requests"
          : lang == "gujarati"
          ? "📋 મારી Custom Requests"
          : "📋 Meri Custom Requests",
        callback_data: "MY_CUSTOM_REQUESTS"
      }
    ],
    [
      {
        text: lang == "english"
          ? "💬 Contact Support"
          : lang == "gujarati"
          ? "💬 સપોર્ટનો સંપર્ક"
          : "💬 Support Se Contact",
        callback_data: "MENU_CONTACT"
      }
    ],
    [
      {
        text: lang == "english"
          ? "🏠 Main Menu"
          : lang == "gujarati"
          ? "🏠 મુખ્ય મેનુ"
          : "🏠 Main Menu",
        callback_data: "MAIN_MENU"
      }
    ]
  ]
}

// ---------- SEND USER NOTIFICATION ----------
Api.sendMessage({
  chat_id: targetUserId,
  text: userText,
  parse_mode: "HTML",
  reply_markup: userKeyboard
})

// ---------- ADMIN CONFIRMATION ----------
var adminText =
  "❌ <b>Custom Request Rejected</b>\n\n" +
  "🆔 Request ID: <code>" + requestId + "</code>\n" +
  "👤 User ID: <code>" + targetUserId + "</code>\n" +
  "👤 Name: " + (customRequest.fullName || "Unknown") + "\n" +
  "👮 Rejected By: <code>" + uid + "</code>\n" +
  "📅 Rejected At: " + customRequest.rejectedAt

var adminKeyboard = {
  inline_keyboard: [
    [
      {
        text: "👁 View Request",
        callback_data: "CUSTOM_ADMIN_VIEW " + requestId
      }
    ],
    [
      {
        text: "💬 Contact User",
        callback_data: "CUSTOM_CONTACT " + requestId
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
}

Api.sendMessage({
  chat_id: uid,
  text: adminText,
  parse_mode: "HTML",
  reply_markup: adminKeyboard
})
