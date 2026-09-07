/*CMD
  command: STARTER_REQUEST_TEXT
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
// SCRIPT 16 — UPDATED VERSION
// COMMAND NAME: STARTER_REQUEST_TEXT
// STEP 4.1.1.1 — SAVE STARTER REQUEST
// 📁 MAIN MENU → 📁 PRICING → STARTER PACKAGE → ORDER
// 🌐 Language support included
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================

// ==========================================
// 🛡️ SAFE HTML ESCAPE
// ==========================================

function escapeHTML(value) {
  if (value === null || value === undefined) {
    return ""
  }

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

// ==========================================
// 👤 USER DETAILS
// ==========================================

var uid = user.telegramid

var firstName = user.first_name || ""
var lastName = user.last_name || ""
var username = user.username || ""

var fullName =
  firstName +
  (lastName ? " " + lastName : "")

if (!fullName) {
  fullName = "User"
}

// ==========================================
// 📝 GET USER REQUIREMENTS
// ==========================================

var requirements = message

if (!requirements || !String(requirements).trim()) {

  Bot.sendMessage(
    "❌ Requirements empty hain.\n\n" +
    "Please apni bot requirements detail mein bhejo."
  )

  Bot.runCommand("STARTER_REQUEST_TEXT")
  return
}

requirements = String(requirements).trim()

// ==========================================
// 🆔 CREATE REQUEST ID
// ==========================================

var requestId =
  "ST" +
  Date.now().toString().slice(-8)

// ==========================================
// 📦 REQUEST OBJECT
// ==========================================

var starterRequest = {

  requestId: requestId,

  userId: uid,

  firstName: firstName,
  lastName: lastName,
  username: username,
  fullName: fullName,

  service: "Starter Bot",

  requirements: requirements,

  status: "pending",

  createdAt: new Date().toISOString()

}

// ==========================================
// 💾 SAVE REQUEST
// ==========================================

Bot.setProperty(
  "STARTER_REQUEST_" + requestId,
  starterRequest,
  "json"
)

// ==========================================
// 📚 SAVE REQUEST ID IN USER HISTORY
// ==========================================

var keys =
  Bot.getProperty("STARTER_REQUEST_KEYS") || []

if (!Array.isArray(keys)) {
  keys = []
}

keys.push(requestId)

Bot.setProperty(
  "STARTER_REQUEST_KEYS",
  keys,
  "json"
)

// ==========================================
// 🧹 CLEAR STARTER MODE
// ==========================================

Bot.setProperty(
  "STARTER_MODE_" + uid,
  "",
  "string"
)

// ==========================================
// 👤 USER MENTION
// ==========================================

var mention =
  "<a href='tg://user?id=" +
  escapeHTML(uid) +
  "'>" +
  escapeHTML(fullName) +
  "</a>"

// ==========================================
// 👑 ADMIN ID
// ==========================================

var ADMIN_ID = 7897324623

// ==========================================
// 👑 ADMIN NOTIFICATION
// ==========================================

Api.sendMessage({

  chat_id: ADMIN_ID,

  text:
    "🆕 <b>NEW STARTER REQUEST</b>\n\n" +
    "🆔 Request ID: <code>" +
    escapeHTML(requestId) +
    "</code>\n" +
    "👤 User: " +
    mention +
    "\n" +
    "🆔 User ID: <code>" +
    escapeHTML(uid) +
    "</code>\n" +
    "👨‍💻 Username: @" +
    escapeHTML(username || "Not available") +
    "\n" +
    "📦 Service: <b>Starter Bot</b>\n" +
    "📌 Status: <b>PENDING</b>\n\n" +
    "📝 <b>Requirements:</b>\n" +
    escapeHTML(requirements),

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📋 View Request",
          callback_data:
            "STARTER_ADMIN_VIEW " + requestId
        }
      ],
      [
        {
          text: "✅ Accept",
          callback_data:
            "STARTER_ACCEPT " + requestId
        },
        {
          text: "❌ Reject",
          callback_data:
            "STARTER_REJECT " + requestId
        }
      ],
      [
        {
          text: "💬 Contact User",
          callback_data:
            "STARTER_CONTACT " + requestId
        }
      ]
    ]
  }

})

// ==========================================
// 📤 USER CONFIRMATION
// ==========================================

Api.sendMessage({

  chat_id: uid,

  text:
    "✅ <b>STARTER REQUEST SUBMITTED</b>\n\n" +
    "🆔 Request ID: <code>" +
    escapeHTML(requestId) +
    "</code>\n" +
    "📦 Service: <b>Starter Bot</b>\n" +
    "📌 Status: <b>PENDING</b>\n\n" +
    "Aapki request successfully submit ho gayi hai.\n" +
    "💬 Hamari team review karke aapse contact karegi.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📋 My Requests",
          callback_data: "MY_STARTER_REQUESTS"
        }
      ],
      [
        {
          text: "🏠 Main Menu",
          callback_data: "BACK_MAIN_MENU"
        }
      ]
    ]
  }

})
