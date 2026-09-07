/*CMD
  command: BUSINESS_CANCEL
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
// SCRIPT 30 — UPDATED VERSION
// COMMAND NAME: BUSINESS_CANCEL
// STEP 4.2.2.1.1 — CANCEL BUSINESS REQUEST
// 📁 MAIN MENU → 📁 PRICING → BUSINESS PACKAGE → MY REQUESTS → VIEW REQUEST
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
// 🆔 GET USER & LANGUAGE
// ==========================================

var userId = user.telegramid

var userData = Bot.getProperty(
  "USER_" + userId
)

var language =
  userData &&
  userData.language
    ? userData.language
    : "hinglish"

// ==========================================
// 🆔 GET REQUEST ID
// ==========================================

var requestId = params

if (!requestId) {
  var invalidText = {
    hinglish: "❌ Invalid request ID.",
    english: "❌ Invalid request ID.",
    gujarati: "❌ અમાન્ય રિક્વેસ્ટ ID."
  }

  Api.sendMessage({
    chat_id: userId,
    text: invalidText[language] || invalidText.hinglish
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
  var notFoundText = {
    hinglish: "❌ Business request nahi mili.",
    english: "❌ Business request not found.",
    gujarati: "❌ બિઝનેસ રિક્વેસ્ટ મળી નથી."
  }

  Api.sendMessage({
    chat_id: userId,
    text: notFoundText[language] || notFoundText.hinglish
  })

  return
}

// ==========================================
// 🔐 OWNER CHECK
// ==========================================

if (
  String(userId) !==
  String(businessRequest.userId)
) {
  var ownerText = {
    hinglish: "❌ Ye business request aapki nahi hai.",
    english: "❌ This business request does not belong to you.",
    gujarati: "❌ આ બિઝનેસ રિક્વેસ્ટ તમારી નથી."
  }

  Api.sendMessage({
    chat_id: userId,
    text: ownerText[language] || ownerText.hinglish
  })

  return
}

// ==========================================
// ⏳ STATUS CHECK
// ==========================================

if (businessRequest.status !== "pending") {
  var statusText = {
    hinglish:
      "⚠️ Ye request ab cancel nahi ho sakti.\n\n" +
      "Current Status: " +
      businessRequest.status,

    english:
      "⚠️ This request cannot be cancelled now.\n\n" +
      "Current Status: " +
      businessRequest.status,

    gujarati:
      "⚠️ આ રિક્વેસ્ટ હવે કેન્સલ કરી શકાતી નથી.\n\n" +
      "હાલનું સ્ટેટસ: " +
      businessRequest.status
  }

  Api.sendMessage({
    chat_id: userId,
    text: statusText[language] || statusText.hinglish
  })

  return
}

// ==========================================
// ❌ CANCEL BUSINESS REQUEST
// ==========================================

businessRequest.status = "cancelled"

businessRequest.cancelledAt =
  new Date().toISOString()

businessRequest.cancelledBy = userId

Bot.setProperty(
  "BUSINESS_REQUEST_" + requestId,
  businessRequest,
  "json"
)

// Clear active business request mode
Bot.setProperty(
  "BUSINESS_MODE_" + userId,
  "",
  "string"
)

// ==========================================
// 🧹 HTML ESCAPE
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

var safeRequestId = escapeHTML(requestId)

// ==========================================
// 📩 USER CONFIRMATION
// ==========================================

var userText = {
  hinglish:
    "❌ <b>Business Bot Request Cancelled</b>\n\n" +
    "🆔 Request ID: <code>" +
    safeRequestId +
    "</code>\n\n" +
    "Aapki business request successfully cancel kar di gayi hai.",

  english:
    "❌ <b>Business Bot Request Cancelled</b>\n\n" +
    "🆔 Request ID: <code>" +
    safeRequestId +
    "</code>\n\n" +
    "Your business request has been successfully cancelled.",

  gujarati:
    "❌ <b>બિઝનેસ બોટ રિક્વેસ્ટ કેન્સલ</b>\n\n" +
    "🆔 રિક્વેસ્ટ ID: <code>" +
    safeRequestId +
    "</code>\n\n" +
    "તમારી બિઝનેસ રિક્વેસ્ટ સફળતાપૂર્વક કેન્સલ કરવામાં આવી છે."
}

var buttons = {
  hinglish: [
    [
      {
        text: "📋 My Business Requests",
        callback_data: "MY_BUSINESS_REQUESTS"
      }
    ],
    [
      {
        text: "🛠️ Business Package",
        callback_data: "PRICE_BUSINESS"
      }
    ],
    [
      {
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ],

  english: [
    [
      {
        text: "📋 My Business Requests",
        callback_data: "MY_BUSINESS_REQUESTS"
      }
    ],
    [
      {
        text: "🛠️ Business Package",
        callback_data: "PRICE_BUSINESS"
      }
    ],
    [
      {
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ],

  gujarati: [
    [
      {
        text: "📋 મારી બિઝનેસ રિક્વેસ્ટ",
        callback_data: "MY_BUSINESS_REQUESTS"
      }
    ],
    [
      {
        text: "🛠️ બિઝનેસ પેકેજ",
        callback_data: "PRICE_BUSINESS"
      }
    ],
    [
      {
        text: "🏠 મુખ્ય મેનુ",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]
}

var finalText =
  userText[language] || userText.hinglish

var finalButtons =
  buttons[language] || buttons.hinglish

// ==========================================
// 🖼️ SAME MESSAGE EDIT / FALLBACK
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

if (messageId) {
  try {
    Api.editMessageText({
      chat_id: userId,
      message_id: messageId,
      text: finalText,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: finalButtons
      }
    })
  } catch (error) {
    try {
      Api.deleteMessage({
        chat_id: userId,
        message_id: messageId
      })
    } catch (deleteError) {}

    Api.sendMessage({
      chat_id: userId,
      text: finalText,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: finalButtons
      }
    })
  }
} else {
  Api.sendMessage({
    chat_id: userId,
    text: finalText,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: finalButtons
    }
  })
}

// ==========================================
// 📩 ADMIN NOTIFICATION
// ==========================================

var adminText =
  "❌ <b>Business Request Cancelled</b>\n\n" +
  "🆔 Request ID: <code>" +
  safeRequestId +
  "</code>\n" +
  "👤 User ID: <code>" +
  escapeHTML(businessRequest.userId) +
  "</code>\n" +
  "📦 Package: <b>" +
  escapeHTML(businessRequest.package || "Business") +
  "</b>\n" +
  "⏰ Cancelled At: <code>" +
  escapeHTML(businessRequest.cancelledAt) +
  "</code>"

Api.sendMessage({
  chat_id: 7897324623,
  text: adminText,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "👁️ View Request",
          callback_data:
            "BUSINESS_ADMIN_VIEW " + requestId
        }
      ],
      [
        {
          text: "📞 Contact User",
          callback_data:
            "BUSINESS_CONTACT " + requestId
        }
      ],
      [
        {
          text: "🛠️ Admin Panel",
          callback_data: "ADMIN_PANEL"
        }
      ]
    ]
  }
})
