/*CMD
  command: PRO_CANCEL
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
// SCRIPT 41 — UPDATED VERSION
// COMMAND NAME: PRO_CANCEL
// STEP 4.3.2.1.1 — CANCEL PROFESSIONAL REQUEST
// 📁 MAIN MENU → 📁 PRICING → PROFESSIONAL PACKAGE → MY REQUESTS → VIEW REQUEST → CANCEL
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
    callback_query_id: request.id
  })
}


// ---------- USER DATA ----------
var uid = user.telegramid

var userData = Bot.getProperty("USER_" + uid) || {}

var lang = userData.language || "hinglish"


// ---------- REQUEST ID ----------
var requestId = params

var requestData = Bot.getProperty(
  "PRO_REQUEST_" + requestId
)


// ---------- REQUEST NOT FOUND ----------
if (!requestData) {

  var notFoundText = ""

  if (lang == "english") {
    notFoundText = "❌ <b>Request not found.</b>"
  } else if (lang == "gujarati") {
    notFoundText = "❌ <b>Request મળી નથી.</b>"
  } else {
    notFoundText = "❌ <b>Request nahi mili.</b>"
  }

  return Bot.sendMessage(notFoundText, {
    parse_mode: "HTML"
  })

}


// ---------- OWNER CHECK ----------
if (
  String(requestData.userId) != String(uid)
) {
  return
}


// ---------- STATUS CHECK ----------
if (requestData.status != "pending") {

  var cannotCancelText = ""

  if (lang == "english") {
    cannotCancelText =
      "⚠️ <b>This request cannot be cancelled now.</b>"
  } else if (lang == "gujarati") {
    cannotCancelText =
      "⚠️ <b>આ request હવે cancel કરી શકાતી નથી.</b>"
  } else {
    cannotCancelText =
      "⚠️ <b>Yeh request ab cancel nahi ho sakti.</b>"
  }

  return Bot.sendMessage(cannotCancelText, {
    parse_mode: "HTML"
  })

}


// ---------- CANCEL REQUEST ----------
requestData.status = "cancelled"

requestData.cancelledAt = new Date().toISOString()

requestData.cancelledBy = uid


Bot.setProperty(
  "PRO_REQUEST_" + requestId,
  requestData,
  "json"
)


// ---------- CLEAR REQUEST MODE ----------
Bot.setProperty(
  "PRO_MODE_" + uid,
  "",
  "string"
)


// ---------- USER CONFIRMATION ----------
var confirmationText = ""

if (lang == "english") {

  confirmationText =
    "❌ <b>Professional Bot request cancelled.</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>"

} else if (lang == "gujarati") {

  confirmationText =
    "❌ <b>Professional Bot request cancel થઈ ગઈ છે.</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>"

} else {

  confirmationText =
    "❌ <b>Professional Bot request cancel ho gayi hai.</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>"

}


// ---------- SEND USER CONFIRMATION ----------
Bot.sendMessage(confirmationText, {
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


// ---------- ADMIN NOTIFICATION ----------
Api.sendMessage({
  chat_id: 7897324623,
  text:
    "❌ <b>Professional Request Cancelled</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>\n" +
    "👤 User ID: <code>" + requestData.userId + "</code>\n" +
    "👤 Name: " + (requestData.fullName || "Not available") + "\n" +
    "🔗 Username: " + (requestData.username || "Not available"),
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
})
