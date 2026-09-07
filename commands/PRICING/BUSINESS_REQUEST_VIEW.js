/*CMD
  command: BUSINESS_REQUEST_VIEW
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
// SCRIPT 29 — UPDATED VERSION
// COMMAND NAME: BUSINESS_REQUEST_VIEW
// STEP 4.2.2.1 — VIEW BUSINESS REQUEST
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
// 🆔 GET REQUEST ID
// ==========================================

var requestId = params

if (!requestId) {

  var invalidText = ""

  if (lang === "english") {
    invalidText = "❌ Invalid request ID."
  }

  else if (lang === "gujarati") {
    invalidText = "❌ અમાન્ય request ID."
  }

  else {
    invalidText = "❌ Invalid request ID."
  }

  Api.sendMessage({
    chat_id: uid,
    text: invalidText
  })

  return
}


// ==========================================
// 📦 GET BUSINESS REQUEST
// ==========================================

var businessRequest = Bot.getProperty(
  "BUSINESS_REQUEST_" + requestId
)

if (!businessRequest) {

  var notFoundText = ""

  if (lang === "english") {
    notFoundText = "❌ Business request not found."
  }

  else if (lang === "gujarati") {
    notFoundText = "❌ Business request મળી નથી."
  }

  else {
    notFoundText = "❌ Business request nahi mili."
  }

  Api.sendMessage({
    chat_id: uid,
    text: notFoundText
  })

  return
}


// ==========================================
// 🔐 OWNER CHECK
// ==========================================

if (
  String(uid) !==
  String(businessRequest.userId)
) {

  var ownerError = ""

  if (lang === "english") {
    ownerError = "❌ This request does not belong to you."
  }

  else if (lang === "gujarati") {
    ownerError = "❌ આ request તમારી નથી."
  }

  else {
    ownerError = "❌ Yeh request aapki nahi hai."
  }

  Api.sendMessage({
    chat_id: uid,
    text: ownerError
  })

  return
}


// ==========================================
// 🛡️ SAFE HTML ESCAPE
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
// 📋 REQUEST DATA
// ==========================================

var safeRequestId = escapeHTML(
  businessRequest.requestId || requestId
)

var safeService = escapeHTML(
  businessRequest.service || "Business Bot"
)

var rawStatus = businessRequest.status || "pending"

var safeStatus = escapeHTML(rawStatus)

var safeCreatedAt = escapeHTML(
  businessRequest.createdAt || "Unknown"
)

var safeRequirements = escapeHTML(
  businessRequest.requirements || "Not provided"
)


// ==========================================
// 🎨 STATUS ICON
// ==========================================

var statusIcon = "🟡"

if (rawStatus === "accepted") {
  statusIcon = "🟢"
}

if (rawStatus === "rejected") {
  statusIcon = "🔴"
}

if (rawStatus === "cancelled") {
  statusIcon = "⚫"
}


// ==========================================
// 📋 REQUEST DETAILS TEXT
// ==========================================

var text = ""

if (lang === "english") {

  text =
    "📋 <b>BUSINESS BOT REQUEST</b>\n\n" +
    "🆔 <b>Request ID:</b> <code>" +
    safeRequestId +
    "</code>\n" +
    "🤖 <b>Service:</b> " +
    safeService +
    "\n" +
    "📌 <b>Status:</b> " +
    statusIcon +
    " <b>" +
    safeStatus +
    "</b>\n" +
    "📅 <b>Created:</b> " +
    safeCreatedAt +
    "\n\n" +
    "📝 <b>Your Requirements:</b>\n" +
    safeRequirements


} else if (lang === "gujarati") {

  text =
    "📋 <b>બિઝનેસ બોટ રિક્વેસ્ટ</b>\n\n" +
    "🆔 <b>રિક્વેસ્ટ ID:</b> <code>" +
    safeRequestId +
    "</code>\n" +
    "🤖 <b>સર્વિસ:</b> " +
    safeService +
    "\n" +
    "📌 <b>સ્ટેટસ:</b> " +
    statusIcon +
    " <b>" +
    safeStatus +
    "</b>\n" +
    "📅 <b>બનાવેલી તારીખ:</b> " +
    safeCreatedAt +
    "\n\n" +
    "📝 <b>તમારી Requirements:</b>\n" +
    safeRequirements


} else {

  text =
    "📋 <b>BUSINESS BOT REQUEST</b>\n\n" +
    "🆔 <b>Request ID:</b> <code>" +
    safeRequestId +
    "</code>\n" +
    "🤖 <b>Service:</b> " +
    safeService +
    "\n" +
    "📌 <b>Status:</b> " +
    statusIcon +
    " <b>" +
    safeStatus +
    "</b>\n" +
    "📅 <b>Created:</b> " +
    safeCreatedAt +
    "\n\n" +
    "📝 <b>Aapki Requirements:</b>\n" +
    safeRequirements

}


// ==========================================
// 🔘 BUTTONS
// ==========================================

var buttons = []

if (rawStatus === "pending") {

  buttons.push([
    {
      text: "❌ Cancel Request",
      callback_data:
        "BUSINESS_CANCEL " + requestId
    }
  ])

}

buttons.push([
  {
    text: "🔙 My Business Requests",
    callback_data: "MY_BUSINESS_REQUESTS"
  }
])

buttons.push([
  {
    text: "🔵 Business Package",
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
