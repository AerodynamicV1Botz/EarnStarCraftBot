/*CMD
  command: BUISNESS_REJECT
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
// SCRIPT 34 — UPDATED VERSION
// COMMAND NAME: BUSINESS_REJECT
// STEP 4.2.2.1.2.2.1 — REJECT BUSINESS REQUEST
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
      "⚠️ This request cannot be rejected now.\n\n" +
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
// ❌ REJECT BUSINESS REQUEST
// ==========================================

businessRequest.status = "rejected"

businessRequest.rejectedAt =
  new Date().toISOString()

businessRequest.rejectedBy =
  user.telegramid

Bot.setProperty(
  "BUSINESS_REQUEST_" + requestId,
  businessRequest,
  "json"
)

// ==========================================
// 🧹 CLEAR ACTIVE REQUEST MODE
// ==========================================

Bot.setProperty(
  "BUSINESS_MODE_" + businessRequest.userId,
  "",
  "string"
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

var safeRejectedAt =
  escapeHTML(businessRequest.rejectedAt)

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
    "❌ <b>Business Request Rejected</b>\n\n" +
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
    "⏰ Rejected At: <code>" +
    safeRejectedAt +
    "</code>"

} else if (language === "gujarati") {
  adminText =
    "❌ <b>બિઝનેસ રિક્વેસ્ટ નકારવામાં આવી</b>\n\n" +
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
    "⏰ નકારવાનો સમય: <code>" +
    safeRejectedAt +
    "</code>"

} else {
  adminText =
    "❌ <b>Business Request Rejected</b>\n\n" +
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
    "⏰ Rejected At: <code>" +
    safeRejectedAt +
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
    "❌ <b>Your Business Bot Request Was Rejected</b>\n\n" +
    "🆔 Request ID: <code>" +
    safeRequestId +
    "</code>\n" +
    "📦 Package: <b>" +
    safePackageName +
    "</b>\n\n" +
    "You can contact our team for more information."

} else if (userLanguage === "gujarati") {
  userText =
    "❌ <b>તમારી બિઝનેસ બોટ રિક્વેસ્ટ નકારવામાં આવી છે</b>\n\n" +
    "🆔 રિક્વેસ્ટ ID: <code>" +
    safeRequestId +
    "</code>\n" +
    "📦 પેકેજ: <b>" +
    safePackageName +
    "</b>\n\n" +
    "વધુ માહિતી માટે તમે અમારી ટીમનો સંપર્ક કરી શકો છો."

} else {
  userText =
    "❌ <b>Your Business Bot Request Was Rejected</b>\n\n" +
    "🆔 Request ID: <code>" +
    safeRequestId +
    "</code>\n" +
    "📦 Package: <b>" +
    safePackageName +
    "</b>\n\n" +
    "Aap zyada information ke liye hamari team se contact kar sakte hain."
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
    text: "❌ Business request rejected."
  })
}
