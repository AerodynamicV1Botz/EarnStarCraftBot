/*CMD
  command: STARTER_ACCEPT
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
// SCRIPT 22 — UPDATED VERSION
// COMMAND NAME: STARTER_ACCEPT
// STEP 4.1.2.1.2.2 — ACCEPT STARTER REQUEST
// 📁 MAIN MENU → 📁 PRICING → STARTER PACKAGE → ADMIN VIEW
// 🌐 Language support included
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================

// ==========================================
// ⚡ INSTANT CALLBACK RESPONSE
// ==========================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "Request accepting..."
  })
}

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
// 👑 ADMIN ACCESS CHECK
// ==========================================

var uid = String(user.telegramid)

var OWNER_ID = "7897324623"

var staffAdmins =
  Bot.getProperty("STAFF_ADMINS") || []

var isAdmin = uid === OWNER_ID

if (!isAdmin && Array.isArray(staffAdmins)) {

  for (var a = 0; a < staffAdmins.length; a++) {

    if (
      String(staffAdmins[a]) === uid
    ) {
      isAdmin = true
      break
    }

  }

}

if (!isAdmin) {

  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>Access Denied</b>\n\n" +
      "Sirf admin request accept kar sakta hai.",
    parse_mode: "HTML"
  })

  return
}

// ==========================================
// 📌 GET REQUEST ID
// ==========================================

var requestId = String(params || "").trim()

if (!requestId) {

  Api.sendMessage({
    chat_id: uid,
    text: "❌ <b>Request ID missing.</b>",
    parse_mode: "HTML"
  })

  return
}

// ==========================================
// 📦 GET REQUEST DATA
// ==========================================

var starterRequest = Bot.getProperty(
  "STARTER_REQUEST_" + requestId
)

if (!starterRequest) {

  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>Starter request nahi mili.</b>\n\n" +
      "🆔 Request ID: <code>" +
      escapeHTML(requestId) +
      "</code>",
    parse_mode: "HTML"
  })

  return
}

// ==========================================
// 🚫 STATUS CHECK
// ==========================================

var currentStatus = String(
  starterRequest.status || "pending"
).toLowerCase()

if (currentStatus !== "pending") {

  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>Request Already Processed</b>\n\n" +
      "🆔 Request ID: <code>" +
      escapeHTML(requestId) +
      "</code>\n" +
      "📌 Current Status: <b>" +
      escapeHTML(currentStatus.toUpperCase()) +
      "</b>",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📦 View Request",
            callback_data:
              "STARTER_ADMIN_VIEW " + requestId
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

  return
}

// ==========================================
// 👤 USER DETAILS
// ==========================================

var userId = String(
  starterRequest.userId || ""
)

if (!userId) {

  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>User ID missing.</b>\n\n" +
      "Is request ke saath user ID saved nahi hai.",
    parse_mode: "HTML"
  })

  return
}

var requestUser = Bot.getProperty(
  "USER_" + userId
)

var firstName =
  starterRequest.firstName ||
  starterRequest.userName ||
  (requestUser && requestUser.firstName) ||
  "User"

var lastName =
  starterRequest.lastName ||
  (requestUser && requestUser.lastName) ||
  ""

var fullName =
  String(firstName) +
  (lastName ? " " + String(lastName) : "")

var mention =
  "<a href='tg://user?id=" +
  escapeHTML(userId) +
  "'>" +
  escapeHTML(fullName) +
  "</a>"

// ==========================================
// ✅ ACCEPT REQUEST
// ==========================================

var acceptedAt =
  new Date().toISOString()

starterRequest.status = "accepted"
starterRequest.acceptedAt = acceptedAt
starterRequest.acceptedBy = uid

Bot.setProperty(
  "STARTER_REQUEST_" + requestId,
  starterRequest,
  "json"
)

// ==========================================
// 🌐 USER LANGUAGE
// ==========================================

var userLanguage =
  requestUser && requestUser.language
    ? requestUser.language
    : "hinglish"

var userTitle = ""
var userMessage = ""
var userMyRequests = ""
var userMainMenu = ""

if (userLanguage === "english") {

  userTitle =
    "✅ <b>STARTER REQUEST ACCEPTED</b>"

  userMessage =
    "Your Starter Bot request has been accepted.\n\n" +
    "💬 Our team will contact you soon."

  userMyRequests = "📋 My Requests"
  userMainMenu = "🏠 Main Menu"

} else if (userLanguage === "gujarati") {

  userTitle =
    "✅ <b>સ્ટાર્ટર રિક્વેસ્ટ સ્વીકારાઈ</b>"

  userMessage =
    "તમારી Starter Bot request સ્વીકારવામાં આવી છે.\n\n" +
    "💬 અમારી ટીમ જલ્દીથી તમારો સંપર્ક કરશે."

  userMyRequests = "📋 મારી Requests"
  userMainMenu = "🏠 મુખ્ય મેનુ"

} else {

  userTitle =
    "✅ <b>STARTER REQUEST ACCEPTED</b>"

  userMessage =
    "Aapki Starter Bot request accept ho gayi hai.\n\n" +
    "💬 Hamari team aapse jaldi contact karegi."

  userMyRequests = "📋 My Requests"
  userMainMenu = "🏠 Main Menu"

}

// ==========================================
// 👤 USER NOTIFICATION
// ==========================================

Api.sendMessage({
  chat_id: userId,

  text:
    userTitle +
    "\n\n" +
    "🆔 Request ID: <code>" +
    escapeHTML(requestId) +
    "</code>\n\n" +
    userMessage,

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: userMyRequests,
          callback_data: "MY_STARTER_REQUESTS"
        }
      ],
      [
        {
          text: userMainMenu,
          callback_data: "BACK_MAIN_MENU"
        }
      ]
    ]
  }
})

// ==========================================
// 👑 ADMIN CONFIRMATION
// ==========================================

var adminText =
  "✅ <b>STARTER REQUEST ACCEPTED</b>\n\n" +
  "🆔 Request ID: <code>" +
  escapeHTML(requestId) +
  "</code>\n" +
  "👤 User: " +
  mention +
  "\n" +
  "🆔 User ID: <code>" +
  escapeHTML(userId) +
  "</code>\n" +
  "📌 Status: <b>ACCEPTED</b>\n" +
  "📅 Accepted: " +
  escapeHTML(acceptedAt)

var adminButtons = [
  [
    {
      text: "📋 View Request",
      callback_data:
        "STARTER_ADMIN_VIEW " + requestId
    }
  ],
  [
    {
      text: "💬 Contact User",
      callback_data:
        "STARTER_CONTACT " + requestId
    }
  ],
  [
    {
      text: "🏠 Admin Panel",
      callback_data: "ADMIN_PANEL"
    }
  ]
]

// ==========================================
// 📌 MESSAGE ID DETECTION
// ==========================================

var messageId = null

if (
  typeof request !== "undefined" &&
  request &&
  request.message &&
  request.message.message_id
) {
  messageId = request.message.message_id
}

// ==========================================
// ✏️ EDIT OR SEND ADMIN CONFIRMATION
// ==========================================

if (messageId) {

  try {

    Api.editMessageText({
      chat_id: uid,
      message_id: messageId,
      text: adminText,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: adminButtons
      }
    })

  } catch (error) {

    try {
      Api.deleteMessage({
        chat_id: uid,
        message_id: messageId
      })
    } catch (deleteError) {}

    Api.sendMessage({
      chat_id: uid,
      text: adminText,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: adminButtons
      }
    })

  }

} else {

  Api.sendMessage({
    chat_id: uid,
    text: adminText,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: adminButtons
    }
  })

}
