/*CMD
  command: CUSTOM_CANCEL
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
// SCRIPT 52 — UPDATED VERSION
// COMMAND NAME: CUSTOM_CANCEL
// STEP 4.4.2.1.1 — CANCEL CUSTOM REQUEST
// 📁 MAIN MENU → 📁 PRICING → CUSTOM PACKAGE → MY REQUESTS → VIEW → CANCEL
// 🌐 Language support included
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================

// ---------- CALLBACK RESPONSE ----------
if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

// ---------- USER DATA ----------
var uid = user.telegramid
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// ---------- REQUEST ID ----------
var requestId = params

if (
  typeof requestId === "undefined" ||
  requestId === null ||
  String(requestId).trim() == ""
) {
  return Bot.sendMessage(
    lang == "english"
      ? "❌ Request ID is missing."
      : lang == "gujarati"
      ? "❌ Request ID મળ્યો નથી."
      : "❌ Request ID missing hai."
  )
}

requestId = String(requestId).trim()

// ---------- GET REQUEST ----------
var customRequest = Bot.getProperty(
  "CUSTOM_REQUEST_" + requestId
)

if (!customRequest) {
  return Bot.sendMessage(
    lang == "english"
      ? "❌ Request not found."
      : lang == "gujarati"
      ? "❌ Request મળી નથી."
      : "❌ Request nahi mili."
  )
}

// ---------- OWNER CHECK ----------
if (
  String(customRequest.userId) != String(uid)
) {
  return Bot.sendMessage(
    lang == "english"
      ? "❌ You cannot cancel this request."
      : lang == "gujarati"
      ? "❌ તમે આ request રદ કરી શકતા નથી."
      : "❌ Aap is request ko cancel nahi kar sakte."
  )
}

// ---------- STATUS CHECK ----------
if (
  String(customRequest.status) != "pending"
) {
  return Bot.sendMessage(
    lang == "english"
      ? "⚠️ This request cannot be cancelled now."
      : lang == "gujarati"
      ? "⚠️ આ request હવે રદ કરી શકાતી નથી."
      : "⚠️ Ye request ab cancel nahi ho sakti."
  )
}

// ---------- UPDATE REQUEST ----------
customRequest.status = "cancelled"
customRequest.cancelledAt = new Date().toISOString()
customRequest.cancelledBy = uid

Bot.setProperty(
  "CUSTOM_REQUEST_" + requestId,
  customRequest,
  "json"
)

// ---------- CLEAR MODE ----------
Bot.setProperty(
  "CUSTOM_MODE_" + uid,
  "",
  "string"
)

// ---------- USER TEXT ----------
var userText = ""

if (lang == "english") {
  userText =
    "❌ <b>Custom Bot request cancelled.</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>"
} else if (lang == "gujarati") {
  userText =
    "❌ <b>Custom Bot request રદ થઈ ગઈ છે.</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>"
} else {
  userText =
    "❌ <b>Custom Bot request cancel ho gayi hai.</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>"
}

// ---------- USER BUTTONS ----------
var userKeyboard = {
  inline_keyboard: [
    [
      {
        text: lang == "english"
          ? "📋 My Custom Requests"
          : lang == "gujarati"
          ? "📋 મારી Custom Requests"
          : "📋 Meri Custom Requests",
        callback_data: "MY_CUSTOM_REQUESTS"
      }
    ],
    [
      {
        text: lang == "english"
          ? "💎 Custom Package"
          : lang == "gujarati"
          ? "💎 Custom Package"
          : "💎 Custom Package",
        callback_data: "PRICE_CUSTOM"
      },
      {
        text: lang == "english"
          ? "🏠 Main Menu"
          : lang == "gujarati"
          ? "🏠 મુખ્ય મેનુ"
          : "🏠 Main Menu",
        callback_data: "MAIN_MENU"
      }
    ]
  ]
}

// ---------- MESSAGE ID ----------
var messageId = null

if (
  typeof request !== "undefined" &&
  request &&
  request.message &&
  request.message.message_id
) {
  messageId = request.message.message_id
}

// ---------- EDIT OR SEND ----------
if (messageId) {
  try {
    Api.editMessageText({
      chat_id: uid,
      message_id: messageId,
      text: userText,
      parse_mode: "HTML",
      reply_markup: userKeyboard
    })
  } catch (e) {
    try {
      Api.deleteMessage({
        chat_id: uid,
        message_id: messageId
      })
    } catch (deleteError) {}

    Api.sendMessage({
      chat_id: uid,
      text: userText,
      parse_mode: "HTML",
      reply_markup: userKeyboard
    })
  }
} else {
  Api.sendMessage({
    chat_id: uid,
    text: userText,
    parse_mode: "HTML",
    reply_markup: userKeyboard
  })
}

// ---------- ADMIN NOTIFICATION ----------
var ownerId = "7897324623"
var staffAdmins = Bot.getProperty("STAFF_ADMINS") || []

if (!Array.isArray(staffAdmins)) {
  staffAdmins = []
}

var adminIds = [ownerId]

for (var i = 0; i < staffAdmins.length; i++) {
  var staffId = String(staffAdmins[i])

  if (adminIds.indexOf(staffId) == -1) {
    adminIds.push(staffId)
  }
}

var adminText =
  "❌ <b>Custom Request Cancelled</b>\n\n" +
  "🆔 Request ID: <code>" + requestId + "</code>\n" +
  "👤 User ID: <code>" + customRequest.userId + "</code>\n" +
  "👤 Name: " + (customRequest.fullName || "Unknown") + "\n" +
  "📅 Cancelled: " + customRequest.cancelledAt

var adminKeyboard = {
  inline_keyboard: [
    [
      {
        text: "👁 View Request",
        callback_data: "CUSTOM_ADMIN_VIEW " + requestId
      }
    ],
    [
      {
        text: "📋 All Custom Requests",
        callback_data: "ADMIN_CUSTOM_REQUESTS"
      }
    ]
  ]
}

for (var j = 0; j < adminIds.length; j++) {
  Api.sendMessage({
    chat_id: adminIds[j],
    text: adminText,
    parse_mode: "HTML",
    reply_markup: adminKeyboard
  })
}
