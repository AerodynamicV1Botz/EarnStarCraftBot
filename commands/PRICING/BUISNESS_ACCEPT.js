/*CMD
  command: BUISNESS_ACCEPT
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
// SCRIPT 33 — UPDATED VERSION
// COMMAND NAME: BUSINESS_ACCEPT
// STEP 4.2.2.1.2.2 — ACCEPT BUSINESS REQUEST
// 📁 MAIN MENU → 📁 PRICING → BUSINESS PACKAGE → ADMIN REQUESTS → VIEW REQUEST
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
    callback_query_id: request.id,
    text: "Processing..."
  })
}

// ==========================================
// 🔐 ADMIN CHECK
// ==========================================

var ownerId = "7897324623"
var staffAdmins = Bot.getProperty("STAFF_ADMINS") || []

var isAdmin =
  String(user.telegramid) === String(ownerId)

if (Array.isArray(staffAdmins)) {
  for (var i = 0; i < staffAdmins.length; i++) {
    if (
      String(staffAdmins[i]) ===
      String(user.telegramid)
    ) {
      isAdmin = true
      break
    }
  }
}

if (!isAdmin) {
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "❌ Access denied."
  })
  return
}

// ==========================================
// 🆔 GET REQUEST ID
// ==========================================

var requestId = params

if (!requestId) {
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "❌ Invalid business request ID."
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
  if (
    typeof request !== "undefined" &&
    request &&
    request.id
  ) {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "❌ Request not found.",
      show_alert: true
    })
  }

  Api.sendMessage({
    chat_id: user.telegramid,
    text: "❌ Business request not found."
  })

  return
}

// ==========================================
// ⏳ STATUS CHECK
// ==========================================

if (businessRequest.status !== "pending") {
  if (
    typeof request !== "undefined" &&
    request &&
    request.id
  ) {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "⚠️ Request is already processed.",
      show_alert: true
    })
  }

  Api.sendMessage({
    chat_id: user.telegramid,
    text:
      "⚠️ This request cannot be accepted now.\n\n" +
      "Current Status: " +
      businessRequest.status
  })

  return
}

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

// ==========================================
// ✅ ACCEPT BUSINESS REQUEST
// ==========================================

businessRequest.status = "accepted"

businessRequest.acceptedAt =
  new Date().toISOString()

businessRequest.acceptedBy =
  user.telegramid

Bot.setProperty(
  "BUSINESS_REQUEST_" + requestId,
  businessRequest,
  "json"
)

// ==========================================
// 🆔 REQUEST DETAILS
// ==========================================

var targetUserId =
  businessRequest.userId || ""

var targetName =
  businessRequest.fullName || "User"

var packageName =
  businessRequest.package || "Business"

var serviceName =
  businessRequest.service || "Custom Business Bot"

var price =
  businessRequest.price || "₹1,499+"

var safeRequestId =
  escapeHTML(requestId)

var safeTargetUserId =
  escapeHTML(targetUserId)

var safeTargetName =
  escapeHTML(targetName)

var safePackageName =
  escapeHTML(packageName)

var safeServiceName =
  escapeHTML(serviceName)

var safePrice =
  escapeHTML(price)

var safeAcceptedAt =
  escapeHTML(businessRequest.acceptedAt)

// ==========================================
// 🌐 ADMIN LANGUAGE
// ==========================================

var adminData = Bot.getProperty(
  "USER_" + user.telegramid
)

var language =
  adminData &&
  adminData.language
    ? adminData.language
    : "hinglish"

// ==========================================
// 📩 ADMIN CONFIRMATION TEXT
// ==========================================

var adminText = ""

if (language === "english") {
  adminText =
    "✅ <b>Business Request Accepted</b>\n\n" +
    "🆔 Request ID: <code>" +
    safeRequestId +
    "</code>\n" +
    "👤 User ID: <code>" +
    safeTargetUserId +
    "</code>\n" +
    "📦 Package: <b>" +
    safePackageName +
    "</b>\n" +
    "🛠️ Service: " +
    safeServiceName +
    "\n" +
    "💰 Price: <b>" +
    safePrice +
    "</b>\n" +
    "⏰ Accepted At: <code>" +
    safeAcceptedAt +
    "</code>"

} else if (language === "gujarati") {
  adminText =
    "✅ <b>બિઝનેસ રિક્વેસ્ટ સ્વીકારવામાં આવી</b>\n\n" +
    "🆔 રિક્વેસ્ટ ID: <code>" +
    safeRequestId +
    "</code>\n" +
    "👤 યુઝર ID: <code>" +
    safeTargetUserId +
    "</code>\n" +
    "📦 પેકેજ: <b>" +
    safePackageName +
    "</b>\n" +
    "🛠️ સર્વિસ: " +
    safeServiceName +
    "\n" +
    "💰 કિંમત: <b>" +
    safePrice +
    "</b>\n" +
    "⏰ સ્વીકારવાનો સમય: <code>" +
    safeAcceptedAt +
    "</code>"

} else {
  adminText =
    "✅ <b>Business Request Accepted</b>\n\n" +
    "🆔 Request ID: <code>" +
    safeRequestId +
    "</code>\n" +
    "👤 User ID: <code>" +
    safeTargetUserId +
    "</code>\n" +
    "📦 Package: <b>" +
    safePackageName +
    "</b>\n" +
    "🛠️ Service: " +
    safeServiceName +
    "\n" +
    "💰 Price: <b>" +
    safePrice +
    "</b>\n" +
    "⏰ Accepted At: <code>" +
    safeAcceptedAt +
    "</code>"
}

// ==========================================
// 🔘 ADMIN BUTTONS
// ==========================================

var adminButtons = [
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
      text: "📋 All Business Requests",
      callback_data: "ADMIN_BUSINESS_REQUESTS"
    }
  ],
  [
    {
      text: "🛠️ Admin Panel",
      callback_data: "ADMIN_PANEL"
    }
  ]
]

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
      chat_id: user.telegramid,
      message_id: messageId,
      text: adminText,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: adminButtons
      }
    })
  } catch (error) {
    try {
      Api.deleteMessage({
        chat_id: user.telegramid,
        message_id: messageId
      })
    } catch (deleteError) {}

    Api.sendMessage({
      chat_id: user.telegramid,
      text: adminText,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: adminButtons
      }
    })
  }
} else {
  Api.sendMessage({
    chat_id: user.telegramid,
    text: adminText,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: adminButtons
    }
  })
}

// ==========================================
// 📩 USER NOTIFICATION
// ==========================================

var userData = Bot.getProperty(
  "USER_" + targetUserId
)

var userLanguage =
  userData &&
  userData.language
    ? userData.language
    : "hinglish"

var userText = ""

if (userLanguage === "english") {
  userText =
    "🎉 <b>Your Business Bot Request Has Been Accepted!</b>\n\n" +
    "🆔 Request ID: <code>" +
    safeRequestId +
    "</code>\n" +
    "📦 Package: <b>" +
    safePackageName +
    "</b>\n" +
    "🛠️ Service: " +
    safeServiceName +
    "\n\n" +
    "Our team will contact you shortly for the next steps."

} else if (userLanguage === "gujarati") {
  userText =
    "🎉 <b>તમારી બિઝનેસ બોટ રિક્વેસ્ટ સ્વીકારવામાં આવી છે!</b>\n\n" +
    "🆔 રિક્વેસ્ટ ID: <code>" +
    safeRequestId +
    "</code>\n" +
    "📦 પેકેજ: <b>" +
    safePackageName +
    "</b>\n" +
    "🛠️ સર્વિસ: " +
    safeServiceName +
    "\n\n" +
    "આગળની પ્રક્રિયા માટે અમારી ટીમ ટૂંક સમયમાં તમારો સંપર્ક કરશે."

} else {
  userText =
    "🎉 <b>Your Business Bot Request Has Been Accepted!</b>\n\n" +
    "🆔 Request ID: <code>" +
    safeRequestId +
    "</code>\n" +
    "📦 Package: <b>" +
    safePackageName +
    "</b>\n" +
    "🛠️ Service: " +
    safeServiceName +
    "\n\n" +
    "Hamari team next steps ke liye jaldi hi aapse contact karegi."
}

Api.sendMessage({
  chat_id: targetUserId,
  text: userText,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📋 My Business Requests",
          callback_data: "MY_BUSINESS_REQUESTS"
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

// ==========================================
// 📢 CALLBACK SUCCESS
// ==========================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "✅ Business request accepted."
  })
}
