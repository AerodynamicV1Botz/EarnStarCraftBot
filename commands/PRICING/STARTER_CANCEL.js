/*CMD
  command: STARTER_CANCEL
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
// SCRIPT 19 — UPDATED VERSION
// COMMAND NAME: STARTER_CANCEL
// STEP 4.1.2.1.1 — CANCEL STARTER REQUEST
// 📁 MAIN MENU → 📁 PRICING → STARTER PACKAGE → MY REQUESTS → VIEW
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
    callback_query_id: request.id
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
// 👤 USER DETAILS
// ==========================================

var uid = user.telegramid

var userData = Bot.getProperty("USER_" + uid)

var language =
  userData && userData.language
    ? userData.language
    : "hinglish"

// ==========================================
// 📌 GET REQUEST ID
// ==========================================

var requestId = String(params || "").trim()

if (!requestId) {

  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>Request ID missing.</b>\n\n" +
      "Please My Requests se request select karo.",
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

  return
}

// ==========================================
// 🔐 OWNER CHECK
// ==========================================

if (
  String(starterRequest.userId) !==
  String(uid)
) {

  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>Access Denied</b>\n\n" +
      "Yeh request aapki nahi hai.",
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

  return
}

// ==========================================
// 🚫 STATUS CHECK
// ==========================================

var currentStatus = String(
  starterRequest.status || "pending"
).toLowerCase()

if (
  currentStatus === "cancelled" ||
  currentStatus === "rejected" ||
  currentStatus === "accepted" ||
  currentStatus === "completed"
) {

  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>Request Already Closed</b>\n\n" +
      "Ye request ab cancel nahi ki ja sakti.\n\n" +
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
              "STARTER_REQUEST_VIEW " + requestId
          }
        ],
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

  return
}

// ==========================================
// ❌ CANCEL REQUEST
// ==========================================

starterRequest.status = "cancelled"

starterRequest.cancelledAt =
  new Date().toISOString()

Bot.setProperty(
  "STARTER_REQUEST_" + requestId,
  starterRequest,
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
// 🌐 LANGUAGE TEXT
// ==========================================

var title = ""
var confirmation = ""
var newStarterRequest = ""
var myRequests = ""
var mainMenu = ""

if (language === "english") {

  title = "❌ <b>STARTER REQUEST CANCELLED</b>"
  confirmation =
    "Your request has been successfully cancelled."
  newStarterRequest = "🚀 New Starter Request"
  myRequests = "📋 My Requests"
  mainMenu = "🏠 Main Menu"

} else if (language === "gujarati") {

  title = "❌ <b>સ્ટાર્ટર રિક્વેસ્ટ રદ થઈ</b>"
  confirmation =
    "તમારી request સફળતાપૂર્વક રદ કરવામાં આવી છે."
  newStarterRequest = "🚀 નવી Starter Request"
  myRequests = "📋 મારી Requests"
  mainMenu = "🏠 મુખ્ય મેનુ"

} else {

  title = "❌ <b>STARTER REQUEST CANCELLED</b>"
  confirmation =
    "Aapki request successfully cancel kar di gayi hai."
  newStarterRequest = "🚀 New Starter Request"
  myRequests = "📋 My Requests"
  mainMenu = "🏠 Main Menu"

}

// ==========================================
// 📤 USER CONFIRMATION
// ==========================================

var text =
  title +
  "\n\n" +
  "🆔 Request ID: <code>" +
  escapeHTML(requestId) +
  "</code>\n\n" +
  confirmation

var buttons = [
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
      text: mainMenu,
      callback_data: "BACK_MAIN_MENU"
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
// ✏️ EDIT OR SEND CONFIRMATION
// ==========================================

if (messageId) {

  try {

    Api.editMessageText({
      chat_id: uid,
      message_id: messageId,
      text: text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: buttons
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
      text: text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: buttons
      }
    })

  }

} else {

  Api.sendMessage({
    chat_id: uid,
    text: text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons
    }
  })

}

// ==========================================
// 👑 ADMIN NOTIFICATION
// ==========================================

var adminId = "7897324623"

Api.sendMessage({
  chat_id: adminId,

  text:
    "❌ <b>STARTER REQUEST CANCELLED</b>\n\n" +
    "🆔 Request ID: <code>" +
    escapeHTML(requestId) +
    "</code>\n" +
    "👤 User ID: <code>" +
    escapeHTML(uid) +
    "</code>\n" +
    "📌 Status: <b>CANCELLED</b>\n" +
    "📅 Cancelled At: " +
    escapeHTML(starterRequest.cancelledAt),

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📦 View Request",
          callback_data:
            "STARTER_ADMIN_VIEW " + requestId
        }
      ]
    ]
  }
})
