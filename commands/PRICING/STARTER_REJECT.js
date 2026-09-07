/*CMD
  command: STARTER_REJECT
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
// SCRIPT 23 — UPDATED VERSION
// COMMAND NAME: STARTER_REJECT
// STEP 4.1.2.1.2.3 — REJECT STARTER REQUEST
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
    text: "Processing..."
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
// 👤 ADMIN ACCESS CHECK
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
      "Sirf admin request reject kar sakta hai.",
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
  starterRequest.fullName ||
  (
    String(firstName) +
    (lastName ? " " + String(lastName) : "")
  )

var mention =
  "<a href='tg://user?id=" +
  escapeHTML(userId) +
  "'>" +
  escapeHTML(fullName) +
  "</a>"

// ==========================================
// 🔗 DIRECT USER PROFILE LINK
// ==========================================

var userProfileUrl =
  "tg://user?id=" + userId

// ==========================================
// 📌 CURRENT STATUS
// ==========================================

var currentStatus = String(
  starterRequest.status || "pending"
).toLowerCase()

var statusIcon = "🟡"

if (currentStatus === "accepted") {
  statusIcon = "🟢"
}

if (currentStatus === "rejected") {
  statusIcon = "🔴"
}

if (currentStatus === "cancelled") {
  statusIcon = "⚫"
}

if (currentStatus === "completed") {
  statusIcon = "✅"
}

// ==========================================
// 🚫 ALREADY PROCESSED
// ==========================================

if (currentStatus !== "pending") {

  Api.sendMessage({
    chat_id: uid,

    text:
      "⚠️ <b>REQUEST ALREADY PROCESSED</b>\n\n" +
      "🆔 Request ID: <code>" +
      escapeHTML(requestId) +
      "</code>\n" +
      "👤 User: " +
      mention +
      "\n" +
      "🆔 User ID: <code>" +
      escapeHTML(userId) +
      "</code>\n" +
      "📌 Current Status: <b>" +
      statusIcon + " " +
      escapeHTML(currentStatus.toUpperCase()) +
      "</b>",

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
            text: "💬 Contact User",
            url: userProfileUrl
          }
        ],
        [
          {
            text: "🏠 Admin Panel",
            callback_data: "ADMIN_PANEL"
          }
        ]
      ]
    }
  })

  return
}

// ==========================================
// ❌ REJECT REQUEST
// ==========================================

var rejectedAt =
  new Date().toISOString()

starterRequest.status = "rejected"
starterRequest.rejectedAt = rejectedAt
starterRequest.rejectedBy = uid

Bot.setProperty(
  "STARTER_REQUEST_" + requestId,
  starterRequest,
  "json"
)

// ==========================================
// 🧹 CLEAR STARTER MODE
// ==========================================

Bot.setProperty(
  "STARTER_MODE_" + userId,
  "",
  "string"
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
var newStarterRequest = ""
var myRequests = ""
var contactAdmin = ""
var mainMenu = ""

if (userLanguage === "english") {

  userTitle =
    "❌ <b>STARTER REQUEST REJECTED</b>"

  userMessage =
    "Your Starter Bot request could not be accepted this time.\n" +
    "You can submit your requirements again or contact the admin."

  newStarterRequest = "🚀 New Starter Request"
  myRequests = "📋 My Requests"
  contactAdmin = "💬 Contact Admin"
  mainMenu = "🏠 Main Menu"

} else if (userLanguage === "gujarati") {

  userTitle =
    "❌ <b>સ્ટાર્ટર રિક્વેસ્ટ નામંજૂર</b>"

  userMessage =
    "તમારી Starter Bot request આ વખતે સ્વીકારી શકાઈ નથી.\n" +
    "તમે ફરીથી requirements submit કરી શકો છો અથવા admin નો સંપર્ક કરી શકો છો."

  newStarterRequest = "🚀 નવી Starter Request"
  myRequests = "📋 મારી Requests"
  contactAdmin = "💬 એડમિનનો સંપર્ક કરો"
  mainMenu = "🏠 મુખ્ય મેનુ"

} else {

  userTitle =
    "❌ <b>STARTER REQUEST REJECTED</b>"

  userMessage =
    "Aapki Starter Bot request is baar accept nahi ho paayi.\n" +
    "Aap dobara requirements submit kar sakte ho ya admin se contact kar sakte ho."

  newStarterRequest = "🚀 New Starter Request"
  myRequests = "📋 My Requests"
  contactAdmin = "💬 Contact Admin"
  mainMenu = "🏠 Main Menu"

}

// ==========================================
// 📩 USER NOTIFICATION
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
          text: newStarterRequest,
          callback_data: "ORDER_STARTER"
        }
      ],
      [
        {
          text: myRequests,
          callback_data: "MY_STARTER_REQUESTS"
        }
      ],
      [
        {
          text: contactAdmin,
          callback_data: "MENU_CONTACT"
        }
      ],
      [
        {
          text: mainMenu,
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
  "❌ <b>STARTER REQUEST REJECTED</b>\n\n" +
  "🆔 Request ID: <code>" +
  escapeHTML(requestId) +
  "</code>\n" +
  "👤 User: " +
  mention +
  "\n" +
  "🆔 User ID: <code>" +
  escapeHTML(userId) +
  "</code>\n" +
  "📌 Status: <b>🔴 REJECTED</b>\n" +
  "📅 Rejected: " +
  escapeHTML(rejectedAt)

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
      url: userProfileUrl
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
