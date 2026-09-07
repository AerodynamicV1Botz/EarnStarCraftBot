/*CMD
  command: MY_STARTER_REQUESTS
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
// SCRIPT 17 — UPDATED VERSION
// COMMAND NAME: MY_STARTER_REQUESTS
// STEP 4.1.2 — MY STARTER REQUESTS
// 📁 MAIN MENU → 📁 PRICING → STARTER PACKAGE
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
// 🛡️ HTML ESCAPE
// ==========================================

function escapeHTML(value) {
  return String(value || "")
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
// 📦 GET USER'S STARTER REQUESTS
// ==========================================

var keys =
  Bot.getProperty("STARTER_REQUEST_KEYS") || []

var requests = []

for (
  var i = keys.length - 1;
  i >= 0;
  i--
) {
  var requestKey = keys[i]

  var starterRequest = Bot.getProperty(
    "STARTER_REQUEST_" + requestKey
  )

  if (!starterRequest) continue

  if (
    String(starterRequest.userId) ===
    String(uid)
  ) {
    requests.push(starterRequest)
  }
}

// ==========================================
// 🌐 LANGUAGE TEXT
// ==========================================

var title = ""
var noRequests = ""
var firstRequest = ""
var newStarterRequest = ""
var mainMenu = ""
var refresh = ""
var newRequest = ""
var viewText = ""

if (language === "english") {

  title = "📦 <b>MY STARTER REQUESTS</b>"
  noRequests =
    "You don't have any Starter Bot requests yet."
  firstRequest =
    "🚀 Submit your first request!"
  newStarterRequest = "🚀 New Starter Request"
  mainMenu = "🏠 Main Menu"
  refresh = "🔄 Refresh"
  newRequest = "🚀 New Request"
  viewText = "📦 View"

} else if (language === "gujarati") {

  title = "📦 <b>મારી સ્ટાર્ટર રિક્વેસ્ટ્સ</b>"
  noRequests =
    "તમારી હાલમાં કોઈ Starter Bot request નથી."
  firstRequest =
    "🚀 તમારી પહેલી request submit કરો!"
  newStarterRequest = "🚀 નવી Starter Request"
  mainMenu = "🏠 મુખ્ય મેનુ"
  refresh = "🔄 ફરીથી જુઓ"
  newRequest = "🚀 નવી Request"
  viewText = "📦 જુઓ"

} else {

  title = "📦 <b>MY STARTER REQUESTS</b>"
  noRequests =
    "Aapki abhi koi Starter Bot request nahi hai."
  firstRequest =
    "🚀 Apni first request submit karo!"
  newStarterRequest = "🚀 New Starter Request"
  mainMenu = "🏠 Main Menu"
  refresh = "🔄 Refresh"
  newRequest = "🚀 New Request"
  viewText = "📦 View"

}

// ==========================================
// ❌ NO REQUESTS
// ==========================================

if (requests.length === 0) {

  var emptyText =
    title +
    "\n\n" +
    noRequests +
    "\n\n" +
    firstRequest

  var emptyButtons = [
    [
      {
        text: newStarterRequest,
        callback_data: "ORDER_STARTER"
      }
    ],
    [
      {
        text: mainMenu,
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]

  var emptyMessageId = null

  if (
    typeof request !== "undefined" &&
    request &&
    request.message &&
    request.message.message_id
  ) {
    emptyMessageId =
      request.message.message_id
  }

  if (emptyMessageId) {

    try {

      Api.editMessageText({
        chat_id: uid,
        message_id: emptyMessageId,
        text: emptyText,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: emptyButtons
        }
      })

    } catch (error) {

      try {
        Api.deleteMessage({
          chat_id: uid,
          message_id: emptyMessageId
        })
      } catch (deleteError) {}

      Api.sendMessage({
        chat_id: uid,
        text: emptyText,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: emptyButtons
        }
      })

    }

  } else {

    Api.sendMessage({
      chat_id: uid,
      text: emptyText,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: emptyButtons
      }
    })

  }

  return
}

// ==========================================
// 📋 REQUEST HISTORY
// ==========================================

var text =
  title +
  "\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n"

var buttons = []

for (
  var j = 0;
  j < requests.length && j < 10;
  j++
) {

  var item = requests[j]

  var status =
    item.status
      ? String(item.status).toLowerCase()
      : "pending"

  var icon = "🟡"

  if (status === "accepted") {
    icon = "🟢"
  }

  if (status === "rejected") {
    icon = "🔴"
  }

  if (status === "cancelled") {
    icon = "⚫"
  }

  var requestId = escapeHTML(
    item.requestId || "UNKNOWN"
  )

  text +=
    icon +
    " <b>" +
    escapeHTML(status.toUpperCase()) +
    "</b>\n" +
    "🆔 <code>" +
    requestId +
    "</code>\n\n"

  buttons.push([
    {
      text:
        viewText +
        " " +
        (item.requestId || "REQUEST"),

      callback_data:
        "STARTER_REQUEST_VIEW " +
        (item.requestId || "")
    }
  ])

}

// ==========================================
// 🔘 NAVIGATION
// ==========================================

buttons.push([
  {
    text: refresh,
    callback_data: "MY_STARTER_REQUESTS"
  }
])

buttons.push([
  {
    text: newRequest,
    callback_data: "ORDER_STARTER"
  },
  {
    text: mainMenu,
    callback_data: "BACK_MAIN_MENU"
  }
])

// ==========================================
// 📩 MESSAGE ID DETECTION
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
// ✏️ EDIT OR SEND REQUEST LIST
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
