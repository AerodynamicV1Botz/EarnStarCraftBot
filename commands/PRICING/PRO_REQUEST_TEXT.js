/*CMD
  command: PRO_REQUEST_TEXT
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
// SCRIPT 38 — UPDATED VERSION
// COMMAND NAME: PRO_REQUEST_TEXT
// STEP 4.3.1.1 — PROFESSIONAL REQUEST SUBMISSION
// 📁 MAIN MENU → 📁 PRICING → PROFESSIONAL PACKAGE → ORDER → REQUIREMENTS
// 🌐 Language support included
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================


// ---------- USER DATA ----------
var uid = user.telegramid

var userData = Bot.getProperty("USER_" + uid) || {}

var lang = userData.language || "hinglish"

var fullName =
  user.first_name +
  (user.last_name ? " " + user.last_name : "")

var username = user.username
  ? "@" + user.username
  : "Not available"


// ---------- CHECK REQUEST MODE ----------
var mode = Bot.getProperty("PRO_MODE_" + uid)

if (mode != "waiting") {
  return
}


// ---------- REQUIREMENTS ----------
var requirements = message

if (
  typeof requirements == "undefined" ||
  requirements == null ||
  String(requirements).trim() == ""
) {
  Bot.sendMessage(
    lang == "english"
      ? "❌ Please send your requirements in a text message."
      : lang == "gujarati"
        ? "❌ કૃપા કરીને તમારી requirements text message માં મોકલો."
        : "❌ Please apni requirements text message mein bhejo."
  )

  return
}

requirements = String(requirements).trim()


// ---------- REQUEST ID ----------
var requestId = "PRO" + Date.now()


// ---------- REQUEST DATA ----------
var requestData = {
  requestId: requestId,
  userId: uid,
  fullName: fullName,
  username: username,
  service: "Professional Bot",
  package: "Professional",
  price: "₹2,999+",
  requirements: requirements,
  status: "pending",
  createdAt: new Date().toISOString()
}


// ---------- SAVE REQUEST ----------
Bot.setProperty(
  "PRO_REQUEST_" + requestId,
  requestData,
  "json"
)


// ---------- SAVE REQUEST KEY ----------
var keys = Bot.getProperty("PRO_REQUEST_KEYS", [])

if (!Array.isArray(keys)) {
  keys = []
}

keys.push(requestId)

Bot.setProperty(
  "PRO_REQUEST_KEYS",
  keys,
  "json"
)


// ---------- CLEAR REQUEST MODE ----------
Bot.setProperty(
  "PRO_MODE_" + uid,
  "",
  "string"
)


// ---------- ADMIN / STAFF LIST ----------
var ownerId = "7897324623"

var staffAdmins = Bot.getProperty("STAFF_ADMINS") || []

if (!Array.isArray(staffAdmins)) {
  staffAdmins = []
}


// ---------- ADMIN NOTIFICATION ----------
var adminText =
  "🟣 <b>New Professional Bot Request</b>\n\n" +
  "🆔 Request ID: <code>" + requestId + "</code>\n" +
  "👤 Name: " + fullName + "\n" +
  "🔗 Username: " + username + "\n" +
  "🆔 User ID: <code>" + uid + "</code>\n" +
  "📦 Package: <b>Professional</b>\n" +
  "💰 Starting Price: <b>₹2,999+</b>\n" +
  "📅 Created: <code>" + requestData.createdAt + "</code>\n\n" +
  "📝 <b>Requirements:</b>\n" +
  requirements


var adminKeyboard = {
  inline_keyboard: [
    [
      {
        text: "👁 View Request",
        callback_data: "PRO_ADMIN_VIEW " + requestId
      }
    ],
    [
      {
        text: "✅ Accept",
        callback_data: "PRO_ACCEPT " + requestId
      },
      {
        text: "❌ Reject",
        callback_data: "PRO_REJECT " + requestId
      }
    ],
    [
      {
        text: "💬 Contact User",
        callback_data: "PRO_CONTACT " + requestId
      }
    ]
  ]
}


// ---------- SEND TO OWNER ----------
Api.sendMessage({
  chat_id: ownerId,
  text: adminText,
  parse_mode: "HTML",
  reply_markup: adminKeyboard
})


// ---------- SEND TO STAFF ----------
for (var i = 0; i < staffAdmins.length; i++) {

  var staffId = String(staffAdmins[i])

  if (staffId == ownerId) {
    continue
  }

  Api.sendMessage({
    chat_id: staffId,
    text: adminText,
    parse_mode: "HTML",
    reply_markup: adminKeyboard
  })

}


// ---------- USER CONFIRMATION ----------
var confirmationText = ""

if (lang == "english") {

  confirmationText =
    "✅ <b>Your Professional Bot request has been submitted!</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>\n" +
    "📦 Package: <b>Professional</b>\n" +
    "💰 Starting Price: <b>₹2,999+</b>\n\n" +
    "Our team will review your requirements and contact you shortly."

} else if (lang == "gujarati") {

  confirmationText =
    "✅ <b>તમારી Professional Bot request submit થઈ ગઈ છે!</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>\n" +
    "📦 Package: <b>Professional</b>\n" +
    "💰 Starting Price: <b>₹2,999+</b>\n\n" +
    "અમારી team તમારી requirements review કરીને જલ્દી સંપર્ક કરશે."

} else {

  confirmationText =
    "✅ <b>Apki Professional Bot request submit ho gayi hai!</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>\n" +
    "📦 Package: <b>Professional</b>\n" +
    "💰 Starting Price: <b>₹2,999+</b>\n\n" +
    "Hamari team apki requirements review karke jaldi contact karegi."

}


// ---------- USER BUTTONS ----------
Bot.sendMessage(confirmationText, {
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📋 My Professional Requests",
          callback_data: "MY_PRO_REQUESTS"
        }
      ],
      [
        {
          text: "🟣 Professional Package",
          callback_data: "PRICE_PRO"
        },
        {
          text: "🏠 Main Menu",
          callback_data: "MAIN_MENU"
        }
      ]
    ]
  }
})
