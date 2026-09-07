/*CMD
  command: PRO_REQUEST_VIEW
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
// SCRIPT 40 — UPDATED VERSION
// COMMAND NAME: PRO_REQUEST_VIEW
// STEP 4.3.2.1 — PROFESSIONAL REQUEST DETAILS
// 📁 MAIN MENU → 📁 PRICING → PROFESSIONAL PACKAGE → MY REQUESTS → VIEW REQUEST
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


// ---------- REQUEST ID ----------
var requestId = params

var requestData = Bot.getProperty(
  "PRO_REQUEST_" + requestId
)


// ---------- USER DATA ----------
var uid = user.telegramid

var userData = Bot.getProperty("USER_" + uid) || {}

var lang = userData.language || "hinglish"


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


// ---------- STATUS ----------
var status = String(
  requestData.status || "pending"
)

var statusText = status

if (status == "pending") {
  statusText = "⏳ Pending"
} else if (status == "accepted") {
  statusText = "✅ Accepted"
} else if (status == "rejected") {
  statusText = "❌ Rejected"
} else if (status == "cancelled") {
  statusText = "🚫 Cancelled"
}


// ---------- REQUEST TEXT ----------
var text = ""

if (lang == "english") {

  text =
    "🟣 <b>Professional Bot Request</b>\n\n" +
    "🆔 Request ID: <code>" + requestData.requestId + "</code>\n" +
    "🤖 Service: <b>" + requestData.service + "</b>\n" +
    "📦 Package: <b>" + (requestData.package || "Professional") + "</b>\n" +
    "💰 Starting Price: <b>" + (requestData.price || "₹2,999+") + "</b>\n" +
    "📌 Status: <b>" + statusText + "</b>\n" +
    "📅 Created: " + requestData.createdAt + "\n\n" +
    "📝 <b>Your Requirements:</b>\n" +
    requestData.requirements

} else if (lang == "gujarati") {

  text =
    "🟣 <b>Professional Bot Request</b>\n\n" +
    "🆔 Request ID: <code>" + requestData.requestId + "</code>\n" +
    "🤖 Service: <b>" + requestData.service + "</b>\n" +
    "📦 Package: <b>" + (requestData.package || "Professional") + "</b>\n" +
    "💰 Starting Price: <b>" + (requestData.price || "₹2,999+") + "</b>\n" +
    "📌 Status: <b>" + statusText + "</b>\n" +
    "📅 Created: " + requestData.createdAt + "\n\n" +
    "📝 <b>તમારી Requirements:</b>\n" +
    requestData.requirements

} else {

  text =
    "🟣 <b>Professional Bot Request</b>\n\n" +
    "🆔 Request ID: <code>" + requestData.requestId + "</code>\n" +
    "🤖 Service: <b>" + requestData.service + "</b>\n" +
    "📦 Package: <b>" + (requestData.package || "Professional") + "</b>\n" +
    "💰 Starting Price: <b>" + (requestData.price || "₹2,999+") + "</b>\n" +
    "📌 Status: <b>" + statusText + "</b>\n" +
    "📅 Created: " + requestData.createdAt + "\n\n" +
    "📝 <b>Apki Requirements:</b>\n" +
    requestData.requirements

}


// ---------- BUTTONS ----------
var buttons = []

if (status == "pending") {

  buttons.push([
    {
      text: "❌ Cancel Request",
      callback_data: "PRO_CANCEL " + requestId
    }
  ])

}

buttons.push([
  {
    text: "🔙 My Professional Requests",
    callback_data: "MY_PRO_REQUESTS"
  }
])

buttons.push([
  {
    text: "🟣 Professional Package",
    callback_data: "PRICE_PRO"
  },
  {
    text: "🏠 Main Menu",
    callback_data: "MAIN_MENU"
  }
])


// ---------- SEND DETAILS ----------
Bot.sendMessage(text, {
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
})
