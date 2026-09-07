/*CMD
  command: MY_BUSINESS_REQUESTS
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
// SCRIPT 28 — UPDATED VERSION
// COMMAND NAME: MY_BUSINESS_REQUESTS
// STEP 4.2.2 — MY BUSINESS REQUESTS
// 📁 MAIN MENU → 📁 PRICING → BUSINESS PACKAGE → MY REQUESTS
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
// 👤 USER ID & LANGUAGE
// ==========================================

var uid = user.telegramid

var userData = Bot.getProperty("USER_" + uid) || {}

var lang = userData.language || "hinglish"


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


// ==========================================
// 🗂️ GET ALL BUSINESS REQUEST KEYS
// ==========================================

var keys = Bot.getProperty(
  "BUSINESS_REQUEST_KEYS"
) || []

if (!Array.isArray(keys)) {
  keys = []
}

var myRequests = []


// ==========================================
// 🔍 FILTER USER REQUESTS
// ==========================================

for (var i = 0; i < keys.length; i++) {

  var requestData = Bot.getProperty(
    "BUSINESS_REQUEST_" + keys[i]
  )

  if (
    requestData &&
    String(requestData.userId) === String(uid)
  ) {
    myRequests.push(requestData)
  }

}


// ==========================================
// 🔄 LATEST REQUESTS FIRST
// ==========================================

myRequests.reverse()


// ==========================================
// 📭 NO REQUESTS
// ==========================================

if (myRequests.length === 0) {

  var emptyText = ""

  if (lang === "english") {
    emptyText =
      "📭 <b>My Business Bot Requests</b>\n\n" +
      "You do not have any Business Bot requests yet."
  }

  else if (lang === "gujarati") {
    emptyText =
      "📭 <b>મારી બિઝનેસ બોટ રિક્વેસ્ટ્સ</b>\n\n" +
      "તમારી પાસે હજુ કોઈ Business Bot request નથી."
  }

  else {
    emptyText =
      "📭 <b>My Business Bot Requests</b>\n\n" +
      "Aapki abhi koi Business Bot request nahi hai."
  }

  var emptyButtons = [
    [
      {
        text: "🚀 Build My Bot",
        callback_data: "ORDER_BUSINESS"
      }
    ],
    [
      {
        text: "🔙 Business Package",
        callback_data: "PRICE_BUSINESS"
      }
    ],
    [
      {
        text: "🏠 Main Menu",
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
    emptyMessageId = request.message.message_id
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
// 📋 REQUEST LIST HEADER
// ==========================================

var text = ""

if (lang === "english") {

  text =
    "📋 <b>MY BUSINESS BOT REQUESTS</b>\n\n" +
    "👇 Select a request to view details:"

}

else if (lang === "gujarati") {

  text =
    "📋 <b>મારી બિઝનેસ બોટ રિક્વેસ્ટ્સ</b>\n\n" +
    "👇 વિગતો જોવા માટે request પસંદ કરો:"

}

else {

  text =
    "📋 <b>MY BUSINESS BOT REQUESTS</b>\n\n" +
    "👇 Details dekhne ke liye request select karo:"

}


// ==========================================
// 🔘 REQUEST BUTTONS
// ==========================================

var buttons = []

var displayLimit = Math.min(myRequests.length, 10)

for (var j = 0; j < displayLimit; j++) {

  var item = myRequests[j]

  var requestId = item.requestId || keys[j]

  var status = item.status || "pending"

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

  var safeRequestId = escapeHTML(requestId)

  var safeStatus = escapeHTML(status)

  text +=
    "\n" +
    statusIcon +
    " <b>" + safeRequestId + "</b>\n" +
    "📌 Status: <b>" + safeStatus + "</b>\n"

  buttons.push([
    {
      text: statusIcon + " View " + requestId,
      callback_data:
        "BUSINESS_REQUEST_VIEW " + requestId
    }
  ])

}


// ==========================================
// 🔘 CONTROL BUTTONS
// ==========================================

buttons.push([
  {
    text: "🔄 Refresh",
    callback_data: "MY_BUSINESS_REQUESTS"
  }
])

buttons.push([
  {
    text: "🚀 New Business Request",
    callback_data: "ORDER_BUSINESS"
  }
])

buttons.push([
  {
    text: "🔙 Business Package",
    callback_data: "PRICE_BUSINESS"
  }
])

buttons.push([
  {
    text: "🏠 Main Menu",
    callback_data: "BACK_MAIN_MENU"
  }
])


// ==========================================
// 🆔 MESSAGE ID
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
// ✏️ SAME MESSAGE EDIT
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

    } catch (deleteError) {
      // Ignore delete error
    }

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
