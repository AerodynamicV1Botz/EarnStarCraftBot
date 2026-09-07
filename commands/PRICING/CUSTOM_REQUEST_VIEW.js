/*CMD
  command: CUSTOM_REQUEST_VIEW
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
// SCRIPT 51 — UPDATED VERSION
// COMMAND NAME: CUSTOM_REQUEST_VIEW
// STEP 4.4.2.1 — VIEW CUSTOM REQUEST
// 📁 MAIN MENU → 📁 PRICING → CUSTOM PACKAGE → MY REQUESTS → VIEW
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
      ? "❌ You cannot view this request."
      : lang == "gujarati"
      ? "❌ તમે આ request જોઈ શકતા નથી."
      : "❌ Aap is request ko view nahi kar sakte."
  )
}

// ---------- STATUS ----------
var status = String(
  customRequest.status || "pending"
)

var statusText = status

if (status == "pending") {
  statusText = lang == "english"
    ? "⏳ Pending"
    : lang == "gujarati"
    ? "⏳ બાકી"
    : "⏳ Pending"
} else if (status == "accepted") {
  statusText = lang == "english"
    ? "✅ Accepted"
    : lang == "gujarati"
    ? "✅ સ્વીકારેલ"
    : "✅ Accepted"
} else if (status == "rejected") {
  statusText = lang == "english"
    ? "❌ Rejected"
    : lang == "gujarati"
    ? "❌ નકારેલ"
    : "❌ Rejected"
} else if (status == "cancelled") {
  statusText = lang == "english"
    ? "🚫 Cancelled"
    : lang == "gujarati"
    ? "🚫 રદ કરેલ"
    : "🚫 Cancelled"
}

// ---------- TEXT ----------
var text = ""

if (lang == "english") {
  text =
    "💎 <b>Custom Bot Request</b>\n\n" +
    "🆔 Request ID: <code>" + customRequest.requestId + "</code>\n" +
    "🤖 Service: <b>" + (customRequest.service || "Custom Bot") + "</b>\n" +
    "📦 Package: <b>" + (customRequest.package || "Custom") + "</b>\n" +
    "💰 Price: <b>" + (customRequest.price || "Custom Quote") + "</b>\n" +
    "📌 Status: <b>" + statusText + "</b>\n" +
    "📅 Created: " + (customRequest.createdAt || "N/A") + "\n\n" +
    "📝 <b>Your Requirements:</b>\n" +
    (customRequest.requirements || "N/A")

} else if (lang == "gujarati") {
  text =
    "💎 <b>કસ્ટમ બોટ રિક્વેસ્ટ</b>\n\n" +
    "🆔 Request ID: <code>" + customRequest.requestId + "</code>\n" +
    "🤖 Service: <b>" + (customRequest.service || "Custom Bot") + "</b>\n" +
    "📦 Package: <b>" + (customRequest.package || "Custom") + "</b>\n" +
    "💰 કિંમત: <b>" + (customRequest.price || "Custom Quote") + "</b>\n" +
    "📌 સ્થિતિ: <b>" + statusText + "</b>\n" +
    "📅 બનાવેલ: " + (customRequest.createdAt || "N/A") + "\n\n" +
    "📝 <b>તમારી Requirements:</b>\n" +
    (customRequest.requirements || "N/A")

} else {
  text =
    "💎 <b>Custom Bot Request</b>\n\n" +
    "🆔 Request ID: <code>" + customRequest.requestId + "</code>\n" +
    "🤖 Service: <b>" + (customRequest.service || "Custom Bot") + "</b>\n" +
    "📦 Package: <b>" + (customRequest.package || "Custom") + "</b>\n" +
    "💰 Price: <b>" + (customRequest.price || "Custom Quote") + "</b>\n" +
    "📌 Status: <b>" + statusText + "</b>\n" +
    "📅 Created: " + (customRequest.createdAt || "N/A") + "\n\n" +
    "📝 <b>Apki Requirements:</b>\n" +
    (customRequest.requirements || "N/A")
}

// ---------- BUTTONS ----------
var buttons = []

if (status == "pending") {
  buttons.push([
    {
      text: lang == "english"
        ? "❌ Cancel Request"
        : lang == "gujarati"
        ? "❌ Request રદ કરો"
        : "❌ Request Cancel Karo",
      callback_data: "CUSTOM_CANCEL " + requestId
    }
  ])
}

buttons.push([
  {
    text: lang == "english"
      ? "🔙 My Custom Requests"
      : lang == "gujarati"
      ? "🔙 મારી Custom Requests"
      : "🔙 Meri Custom Requests",
    callback_data: "MY_CUSTOM_REQUESTS"
  }
])

buttons.push([
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
])

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
      text: text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: buttons
      }
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
