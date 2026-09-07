/*CMD
  command: CUSTOM_ACCEPT
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
// SCRIPT 55 — UPDATED VERSION
// COMMAND NAME: CUSTOM_ACCEPT
// STEP 4.4.2.1.2.2 — ACCEPT CUSTOM REQUEST
// 📁 MAIN MENU → 📁 PRICING → CUSTOM PACKAGE → MY REQUESTS → VIEW → ADMIN VIEW → ACCEPT
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
    text: "✅ Custom request accepted"
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
    "❌ You are not authorized to accept requests."
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
customRequest.status = "accepted"
customRequest.acceptedAt = new Date().toISOString()
customRequest.acceptedBy = uid

Bot.setProperty(
  "CUSTOM_REQUEST_" + requestId,
  customRequest,
  "json"
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
    "🎉 <b>Your Custom Bot request has been accepted!</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>\n\n" +
    "Our team will contact you shortly to discuss your idea and quotation."

} else if (lang == "gujarati") {
  userText =
    "🎉 <b>તમારી Custom Bot request સ્વીકારવામાં આવી છે!</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>\n\n" +
    "તમારી idea અને quotation વિશે ચર્ચા કરવા અમારી ટીમ જલ્દી તમારો સંપર્ક કરશે."

} else {
  userText =
    "🎉 <b>Apki Custom Bot request accept ho gayi hai!</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>\n\n" +
    "Hamari team aapki idea aur quotation ke baare mein discuss karne ke liye jaldi contact karegi."
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
  "💎 <b>Custom Request Accepted</b>\n\n" +
  "🆔 Request ID: <code>" + requestId + "</code>\n" +
  "👤 User ID: <code>" + targetUserId + "</code>\n" +
  "👤 Name: " + (customRequest.fullName || "Unknown") + "\n" +
  "👮 Accepted By: <code>" + uid + "</code>\n" +
  "📅 Accepted At: " + customRequest.acceptedAt

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
