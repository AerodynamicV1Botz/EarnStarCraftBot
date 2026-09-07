/*CMD
  command: BUSINESS_CONTACT
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
// SCRIPT 32 — UPDATED VERSION
// COMMAND NAME: BUSINESS_CONTACT
// STEP 4.2.2.1.2.1 — CONTACT BUSINESS USER
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
    callback_query_id: request.id
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
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "❌ Business request not found."
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
// 👤 USER DETAILS
// ==========================================

var targetUserId =
  businessRequest.userId || ""

var targetName =
  businessRequest.fullName || "Unknown User"

var targetUsername =
  businessRequest.username || ""

var targetUsernameText =
  targetUsername
    ? "@" + escapeHTML(targetUsername)
    : "Not available"

var packageName =
  businessRequest.package || "Business"

var status =
  businessRequest.status || "pending"

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
// 📝 CONTACT TEXT
// ==========================================

var text = ""

if (language === "english") {
  text =
    "📩 <b>Business Request Contact</b>\n\n" +
    "🆔 Request ID: <code>" +
    escapeHTML(requestId) +
    "</code>\n" +
    "📦 Package: <b>" +
    escapeHTML(packageName) +
    "</b>\n" +
    "📊 Status: <b>" +
    escapeHTML(status.toUpperCase()) +
    "</b>\n\n" +

    "👤 <b>User Information</b>\n" +
    "Name: " +
    escapeHTML(targetName) +
    "\n" +
    "Username: " +
    targetUsernameText +
    "\n" +
    "User ID: <code>" +
    escapeHTML(targetUserId) +
    "</code>\n\n" +

    "Use the button below to contact the user."

} else if (language === "gujarati") {
  text =
    "📩 <b>બિઝનેસ રિક્વેસ્ટ સંપર્ક</b>\n\n" +
    "🆔 રિક્વેસ્ટ ID: <code>" +
    escapeHTML(requestId) +
    "</code>\n" +
    "📦 પેકેજ: <b>" +
    escapeHTML(packageName) +
    "</b>\n" +
    "📊 સ્ટેટસ: <b>" +
    escapeHTML(status.toUpperCase()) +
    "</b>\n\n" +

    "👤 <b>યુઝર માહિતી</b>\n" +
    "નામ: " +
    escapeHTML(targetName) +
    "\n" +
    "યુઝરનેમ: " +
    targetUsernameText +
    "\n" +
    "યુઝર ID: <code>" +
    escapeHTML(targetUserId) +
    "</code>\n\n" +

    "યુઝરનો સંપર્ક કરવા માટે નીચેનું બટન વાપરો."

} else {
  text =
    "📩 <b>Business Request Contact</b>\n\n" +
    "🆔 Request ID: <code>" +
    escapeHTML(requestId) +
    "</code>\n" +
    "📦 Package: <b>" +
    escapeHTML(packageName) +
    "</b>\n" +
    "📊 Status: <b>" +
    escapeHTML(status.toUpperCase()) +
    "</b>\n\n" +

    "👤 <b>User Information</b>\n" +
    "Name: " +
    escapeHTML(targetName) +
    "\n" +
    "Username: " +
    targetUsernameText +
    "\n" +
    "User ID: <code>" +
    escapeHTML(targetUserId) +
    "</code>\n\n" +

    "User ko contact karne ke liye neeche button use karein."
}

// ==========================================
// 🔘 BUTTONS
// ==========================================

var buttons = [
  [
    {
      text: "💬 Contact User",
      url: "tg://user?id=" + targetUserId
    }
  ],
  [
    {
      text: "👁️ View Request",
      callback_data:
        "BUSINESS_ADMIN_VIEW " + requestId
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
      text: text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: buttons
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
      text: text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: buttons
      }
    })
  }
} else {
  Api.sendMessage({
    chat_id: user.telegramid,
    text: text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons
    }
  })
}
