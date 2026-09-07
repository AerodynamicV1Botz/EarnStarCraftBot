/*CMD
  command: CUSTOM_REQUEST_TEXT
  help: 
  need_reply: true
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
// SCRIPT 49 — UPDATED VERSION
// COMMAND NAME: CUSTOM_REQUEST_TEXT
// STEP 4.4.1.1 — CUSTOM REQUEST SUBMISSION
// 📁 MAIN MENU → 📁 PRICING → CUSTOM PACKAGE → ORDER → REQUIREMENTS
// 🌐 Language support included
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================

// ---------- USER DATA ----------
var uid = user.telegramid
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// ---------- CHECK CUSTOM MODE ----------
var mode = Bot.getProperty("CUSTOM_MODE_" + uid)

if (mode != "waiting") {
  return
}

// ---------- REQUIREMENTS ----------
var requirements = message

if (
  typeof requirements === "undefined" ||
  requirements === null ||
  String(requirements).trim() == ""
) {
  if (lang == "english") {
    Bot.sendMessage(
      "⚠️ Please send your complete bot idea and requirements."
    )
  } else if (lang == "gujarati") {
    Bot.sendMessage(
      "⚠️ કૃપા કરીને તમારી complete bot idea અને requirements મોકલો."
    )
  } else {
    Bot.sendMessage(
      "⚠️ Apni complete bot idea aur requirements bhejo."
    )
  }

  return
}

requirements = String(requirements)

// ---------- REQUEST ID ----------
var requestId = "CUSTOM" + Date.now()

// ---------- REQUEST DATA ----------
var customRequest = {
  requestId: requestId,
  userId: uid,
  fullName: userData.fullName || user.first_name || "Unknown User",
  username: userData.username || user.username || "",
  language: lang,
  service: "Custom Bot",
  package: "Custom",
  price: "Custom Quote",
  requirements: requirements,
  status: "pending",
  createdAt: new Date().toISOString()
}

// ---------- SAVE REQUEST ----------
Bot.setProperty(
  "CUSTOM_REQUEST_" + requestId,
  customRequest,
  "json"
)

// ---------- SAVE REQUEST KEY ----------
var keys = Bot.getProperty("CUSTOM_REQUEST_KEYS", [])

if (!Array.isArray(keys)) {
  keys = []
}

keys.push(requestId)

Bot.setProperty(
  "CUSTOM_REQUEST_KEYS",
  keys,
  "json"
)

// ---------- CLEAR MODE ----------
Bot.setProperty(
  "CUSTOM_MODE_" + uid,
  "",
  "string"
)

// ---------- ADMIN LIST ----------
var ownerId = "7897324623"
var staffAdmins = Bot.getProperty("STAFF_ADMINS") || []

if (!Array.isArray(staffAdmins)) {
  staffAdmins = []
}

var adminIds = [ownerId]

for (var i = 0; i < staffAdmins.length; i++) {
  var staffId = String(staffAdmins[i])

  if (adminIds.indexOf(staffId) == -1) {
    adminIds.push(staffId)
  }
}

// ---------- ADMIN MESSAGE ----------
var adminText =
  "💎 <b>New Custom Bot Request</b>\n\n" +
  "🆔 Request ID: <code>" + requestId + "</code>\n" +
  "👤 User ID: <code>" + uid + "</code>\n" +
  "👤 Name: " + (customRequest.fullName || "Unknown") + "\n" +
  "🌐 Language: " + lang + "\n\n" +
  "📝 <b>Requirements:</b>\n" +
  requirements

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
        text: "✅ Accept",
        callback_data: "CUSTOM_ACCEPT " + requestId
      },
      {
        text: "❌ Reject",
        callback_data: "CUSTOM_REJECT " + requestId
      }
    ],
    [
      {
        text: "💬 Contact User",
        callback_data: "CUSTOM_CONTACT " + requestId
      }
    ]
  ]
}

// ---------- SEND TO OWNER AND STAFF ----------
for (var j = 0; j < adminIds.length; j++) {
  Api.sendMessage({
    chat_id: adminIds[j],
    text: adminText,
    parse_mode: "HTML",
    reply_markup: adminKeyboard
  })
}

// ---------- USER CONFIRMATION ----------
var userText = ""

if (lang == "english") {
  userText =
    "✅ <b>Your Custom Bot request has been submitted!</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>\n\n" +
    "Our team will review your idea and contact you shortly."
} else if (lang == "gujarati") {
  userText =
    "✅ <b>તમારી Custom Bot request submit થઈ ગઈ છે!</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>\n\n" +
    "અમારી ટીમ તમારી idea review કરશે અને જલ્દી તમારો સંપર્ક કરશે."
} else {
  userText =
    "✅ <b>Apki Custom Bot request submit ho gayi hai!</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>\n\n" +
    "Hamari team aapki idea review karegi aur jaldi contact karegi."
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
          ? "💎 Custom Package"
          : lang == "gujarati"
          ? "💎 Custom Package"
          : "💎 Custom Package",
        callback_data: "PRICE_CUSTOM"
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

// ---------- SEND CONFIRMATION ----------
Api.sendMessage({
  chat_id: uid,
  text: userText,
  parse_mode: "HTML",
  reply_markup: userKeyboard
})
