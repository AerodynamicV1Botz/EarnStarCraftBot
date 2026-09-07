/*CMD
  command: STARTER_REQUEST_VIEW
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
// SCRIPT 18 — UPDATED VERSION
// COMMAND NAME: STARTER_REQUEST_VIEW
// STEP 4.1.2.1 — VIEW STARTER REQUEST
// 📁 MAIN MENU → 📁 PRICING → STARTER PACKAGE → MY REQUESTS
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
      "Please My Starter Requests se request select karo.",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📦 My Requests",
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
            text: "📦 My Requests",
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
            text: "📦 My Requests",
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
// 📌 STATUS
// ==========================================

var status = String(
  starterRequest.status || "pending"
).toLowerCase()

var statusIcon = "🟡"

if (status === "accepted") {
  statusIcon = "🟢"
}

if (status === "rejected") {
  statusIcon = "🔴"
}

if (status === "cancelled") {
  statusIcon = "⚫"
}

if (status === "completed") {
  statusIcon = "✅"
}

var displayStatus =
  statusIcon + " " + status.toUpperCase()

// ==========================================
// 🌐 LANGUAGE TEXT
// ==========================================

var title = ""
var serviceLabel = ""
var statusLabel = ""
var createdLabel = ""
var requirementsLabel = ""
var cancelButton = ""
var myRequestsButton = ""
var mainMenuButton = ""

if (language === "english") {

  title = "📋 <b>STARTER BOT REQUEST</b>"
  serviceLabel = "🤖 Service"
  statusLabel = "📌 Status"
  createdLabel = "📅 Created"
  requirementsLabel = "📝 <b>Your Requirements:</b>"
  cancelButton = "❌ Cancel Request"
  myRequestsButton = "🔙 My Requests"
  mainMenuButton = "🏠 Main Menu"

} else if (language === "gujarati") {

  title = "📋 <b>સ્ટાર્ટર બોટ રિક્વેસ્ટ</b>"
  serviceLabel = "🤖 સર્વિસ"
  statusLabel = "📌 સ્થિતિ"
  createdLabel = "📅 બનાવેલ"
  requirementsLabel = "📝 <b>તમારી જરૂરિયાત:</b>"
  cancelButton = "❌ Request રદ કરો"
  myRequestsButton = "🔙 મારી Requests"
  mainMenuButton = "🏠 મુખ્ય મેનુ"

} else {

  title = "📋 <b>STARTER BOT REQUEST</b>"
  serviceLabel = "🤖 Service"
  statusLabel = "📌 Status"
  createdLabel = "📅 Created"
  requirementsLabel = "📝 <b>Your Requirements:</b>"
  cancelButton = "❌ Cancel Request"
  myRequestsButton = "🔙 My Requests"
  mainMenuButton = "🏠 Main Menu"

}

// ==========================================
// 📝 REQUEST DETAILS
// ==========================================

var text =
  title +
  "\n\n" +
  "🆔 <b>Request ID:</b> <code>" +
  escapeHTML(
    starterRequest.requestId || requestId
  ) +
  "</code>\n" +
  serviceLabel +
  ": <b>" +
  escapeHTML(
    starterRequest.service || "Starter Bot"
  ) +
  "</b>\n" +
  statusLabel +
  ": <b>" +
  escapeHTML(displayStatus) +
  "</b>\n" +
  createdLabel +
  ": " +
  escapeHTML(
    starterRequest.createdAt || "N/A"
  ) +
  "\n\n" +
  requirementsLabel +
  "\n" +
  escapeHTML(
    starterRequest.requirements || "Not provided"
  )

// ==========================================
// 🔘 BUTTONS
// ==========================================

var buttons = []

// Cancel command will check whether
// this request is still cancellable.

if (
  status !== "cancelled" &&
  status !== "rejected" &&
  status !== "completed"
) {
  buttons.push([
    {
      text: cancelButton,
      callback_data:
        "STARTER_CANCEL " + requestId
    }
  ])
}

buttons.push([
  {
    text: myRequestsButton,
    callback_data: "MY_STARTER_REQUESTS"
  }
])

buttons.push([
  {
    text: mainMenuButton,
    callback_data: "BACK_MAIN_MENU"
  }
])

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
// ✏️ EDIT OR SEND REQUEST DETAILS
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
