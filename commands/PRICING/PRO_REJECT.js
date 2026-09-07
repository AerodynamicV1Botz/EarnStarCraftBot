/*CMD
  command: PRO_REJECT
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
// SCRIPT 45 — UPDATED VERSION
// COMMAND NAME: PRO_REJECT
// STEP 4.3.2.1.2.2.1 — REJECT PROFESSIONAL REQUEST
// 📁 MAIN MENU → 📁 PRICING → PROFESSIONAL PACKAGE → MY REQUESTS → VIEW REQUEST → ADMIN VIEW → REJECT
// 🌐 Language support included
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================


// ---------- SAFE CALLBACK RESPONSE ----------
if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ Professional request rejected"
  })
}


// ---------- ADMIN / STAFF CHECK ----------
var ownerId = "7897324623"

var staffAdmins = Bot.getProperty("STAFF_ADMINS") || []

if (!Array.isArray(staffAdmins)) {
  staffAdmins = []
}

var currentUserId = String(user.telegramid)

var isAdmin = currentUserId == ownerId

for (var i = 0; i < staffAdmins.length; i++) {
  if (currentUserId == String(staffAdmins[i])) {
    isAdmin = true
    break
  }
}

if (!isAdmin) {
  return
}


// ---------- REQUEST ID ----------
var requestId = params

var requestData = Bot.getProperty(
  "PRO_REQUEST_" + requestId
)


// ---------- REQUEST NOT FOUND ----------
if (!requestData) {
  return Bot.sendMessage(
    "❌ <b>Professional request not found.</b>",
    {
      parse_mode: "HTML"
    }
  )
}


// ---------- STATUS CHECK ----------
if (requestData.status != "pending") {
  return Bot.sendMessage(
    "⚠️ <b>This request has already been processed.</b>\n\n" +
    "Current status: <b>" + requestData.status + "</b>",
    {
      parse_mode: "HTML"
    }
  )
}


// ---------- REJECT REQUEST ----------
requestData.status = "rejected"

requestData.rejectedAt = new Date().toISOString()

requestData.rejectedBy = user.telegramid


Bot.setProperty(
  "PRO_REQUEST_" + requestId,
  requestData,
  "json"
)


// ---------- CLEAR REQUEST MODE ----------
Bot.setProperty(
  "PRO_MODE_" + requestData.userId,
  "",
  "string"
)


// ---------- USER LANGUAGE ----------
var targetUserData = Bot.getProperty(
  "USER_" + requestData.userId
) || {}

var lang = targetUserData.language || "hinglish"


// ---------- USER NOTIFICATION ----------
var userText = ""

if (lang == "english") {

  userText =
    "❌ <b>Your Professional Bot request was rejected.</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>\n\n" +
    "You can contact our team for more information."

} else if (lang == "gujarati") {

  userText =
    "❌ <b>તમારી Professional Bot request reject થઈ ગઈ છે.</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>\n\n" +
    "વધુ માહિતી માટે તમે અમારી team નો સંપર્ક કરી શકો છો."

} else {

  userText =
    "❌ <b>Apki Professional Bot request reject ho gayi hai.</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>\n\n" +
    "Zyada information ke liye aap hamari team se contact kar sakte ho."

}


// ---------- SEND USER NOTIFICATION ----------
Api.sendMessage({
  chat_id: requestData.userId,
  text: userText,
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
          text: "💬 Contact Team",
          callback_data: "PRO_CONTACT " + requestId
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


// ---------- ADMIN CONFIRMATION ----------
Bot.sendMessage(
  "❌ <b>Professional Request Rejected</b>\n\n" +
  "🆔 Request ID: <code>" + requestId + "</code>\n" +
  "👤 User ID: <code>" + requestData.userId + "</code>\n" +
  "👤 Name: " + (requestData.fullName || "Not available"),
  {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "👁 View Request",
            callback_data: "PRO_ADMIN_VIEW " + requestId
          }
        ],
        [
          {
            text: "💬 Contact User",
            callback_data: "PRO_CONTACT " + requestId
          }
        ],
        [
          {
            text: "📋 All Professional Requests",
            callback_data: "ADMIN_PRO_REQUESTS"
          }
        ],
        [
          {
            text: "🛠 Admin Panel",
            callback_data: "ADMIN_PANEL"
          }
        ]
      ]
    }
  }
)
