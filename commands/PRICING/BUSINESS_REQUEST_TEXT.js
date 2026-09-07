/*CMD
  command: BUSINESS_REQUEST_TEXT
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
// SCRIPT 27 — UPDATED VERSION
// COMMAND NAME: BUSINESS_REQUEST_TEXT
// STEP 4.2.1.1 — BUSINESS REQUEST SUBMISSION
// 📁 MAIN MENU → 📁 PRICING → BUSINESS PACKAGE → BUILD MY BOT
// 🌐 Language support included
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================


// ==========================================
// 👤 USER DETAILS
// ==========================================

var uid = user.telegramid

var userData = Bot.getProperty("USER_" + uid) || {}

var lang = userData.language || "hinglish"

var firstName = user.first_name || ""

var lastName = user.last_name || ""

var username = user.username
  ? "@" + user.username
  : "Not available"

var fullName = (
  firstName + " " + lastName
).trim()

if (!fullName) {
  fullName = "Unknown User"
}


// ==========================================
// 🔍 CHECK BUSINESS REQUEST MODE
// ==========================================

var mode = Bot.getProperty(
  "BUSINESS_MODE_" + uid
)

if (mode !== "waiting") {

  var modeError = ""

  if (lang === "english") {
    modeError =
      "❌ Please start the Business Bot request first."
  }

  else if (lang === "gujarati") {
    modeError =
      "❌ પહેલા Business Bot request શરૂ કરો."
  }

  else {
    modeError =
      "❌ Pehle Business Bot request start karo."
  }

  Api.sendMessage({
    chat_id: uid,
    text: modeError
  })

  return
}


// ==========================================
// 📝 GET REQUIREMENTS
// ==========================================

var requirements = message

if (
  !requirements ||
  String(requirements).trim() === ""
) {

  var requirementError = ""

  if (lang === "english") {
    requirementError =
      "❌ Please write and send your requirements."
  }

  else if (lang === "gujarati") {
    requirementError =
      "❌ કૃપા કરીને તમારી requirements લખીને મોકલો."
  }

  else {
    requirementError =
      "❌ Please apni requirements likhkar bhejo."
  }

  Api.sendMessage({
    chat_id: uid,
    text: requirementError
  })

  return
}

requirements = String(requirements).trim()


// ==========================================
// 🛡️ SAFE HTML ESCAPE
// ==========================================

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

var safeRequirements = escapeHTML(requirements)

var safeFullName = escapeHTML(fullName)

var safeUsername = escapeHTML(username)


// ==========================================
// 🆔 CREATE REQUEST ID
// ==========================================

var requestId =
  "BUS" +
  Date.now().toString().slice(-8)


// ==========================================
// 📦 REQUEST OBJECT
// ==========================================

var businessRequest = {
  requestId: requestId,
  userId: uid,
  fullName: fullName,
  username: username,
  service: "Business Bot",
  package: "Business Package",
  price: "₹1,499+",
  requirements: requirements,
  status: "pending",
  createdAt: new Date().toISOString()
}


// ==========================================
// 💾 SAVE BUSINESS REQUEST
// ==========================================

Bot.setProperty(
  "BUSINESS_REQUEST_" + requestId,
  businessRequest,
  "json"
)


// ==========================================
// 🗂️ SAVE REQUEST ID LIST
// ==========================================

var keys =
  Bot.getProperty("BUSINESS_REQUEST_KEYS") || []

if (!Array.isArray(keys)) {
  keys = []
}

if (!keys.includes(requestId)) {
  keys.push(requestId)
}

Bot.setProperty(
  "BUSINESS_REQUEST_KEYS",
  keys,
  "json"
)


// ==========================================
// 🧹 CLEAR REQUEST MODE
// ==========================================

Bot.setProperty(
  "BUSINESS_MODE_" + uid,
  "",
  "string"
)


// ==========================================
// 📩 ADMIN NOTIFICATION TEXT
// ==========================================

var adminText =
  "🔵 <b>NEW BUSINESS BOT REQUEST</b>\n\n" +
  "🆔 <b>Request ID:</b> <code>" + requestId + "</code>\n" +
  "👤 <b>Name:</b> " + safeFullName + "\n" +
  "🔗 <b>Username:</b> " + safeUsername + "\n" +
  "🆔 <b>User ID:</b> <code>" + uid + "</code>\n" +
  "🛠 <b>Service:</b> Business Bot\n" +
  "💰 <b>Package:</b> Business Package\n" +
  "💵 <b>Starting Price:</b> ₹1,499+\n\n" +
  "📝 <b>Requirements:</b>\n" +
  safeRequirements


// ==========================================
// 📩 ADMIN NOTIFICATION
// ==========================================

Api.sendMessage({
  chat_id: 7897324623,

  text: adminText,

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "👁️ View Request",
          callback_data:
            "BUSINESS_ADMIN_VIEW " + requestId
        }
      ],
      [
        {
          text: "✅ Accept",
          callback_data:
            "BUSINESS_ACCEPT " + requestId
        },
        {
          text: "❌ Reject",
          callback_data:
            "BUSINESS_REJECT " + requestId
        }
      ],
      [
        {
          text: "💬 Contact User",
          callback_data:
            "BUSINESS_CONTACT " + requestId
        }
      ]
    ]
  }
})


// ==========================================
// 🌐 USER CONFIRMATION TEXT
// ==========================================

var confirmationText = ""

if (lang === "english") {

  confirmationText =
    "✅ <b>REQUEST SUBMITTED</b>\n\n" +
    "🔵 Your Business Bot request has been received.\n\n" +
    "🆔 <b>Request ID:</b> <code>" + requestId + "</code>\n" +
    "📌 <b>Status:</b> 🟡 Pending\n\n" +
    "Our team will review your requirements soon."


} else if (lang === "gujarati") {

  confirmationText =
    "✅ <b>રિક્વેસ્ટ સબમિટ થઈ ગઈ</b>\n\n" +
    "🔵 તમારી Business Bot request મળી ગઈ છે.\n\n" +
    "🆔 <b>રિક્વેસ્ટ ID:</b> <code>" + requestId + "</code>\n" +
    "📌 <b>સ્ટેટસ:</b> 🟡 Pending\n\n" +
    "અમારી ટીમ ટૂંક સમયમાં તમારી requirements review કરશે."


} else {

  confirmationText =
    "✅ <b>REQUEST SUBMITTED</b>\n\n" +
    "🔵 Aapki Business Bot request receive ho gayi hai.\n\n" +
    "🆔 <b>Request ID:</b> <code>" + requestId + "</code>\n" +
    "📌 <b>Status:</b> 🟡 Pending\n\n" +
    "Hamari team jaldi aapki requirements review karegi."

}


// ==========================================
// 🔘 USER BUTTONS
// ==========================================

var userButtons = [
  [
    {
      text: "📋 My Business Requests",
      callback_data: "MY_BUSINESS_REQUESTS"
    }
  ],
  [
    {
      text: "🏠 Main Menu",
      callback_data: "BACK_MAIN_MENU"
    }
  ]
]


// ==========================================
// ✅ SEND USER CONFIRMATION
// ==========================================

Api.sendMessage({
  chat_id: uid,

  text: confirmationText,

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: userButtons
  }
})
