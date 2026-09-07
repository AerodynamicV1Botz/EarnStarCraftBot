/*CMD
  command: BUSINESS_ADMIN_VIEW
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
// SCRIPT 31 — BUSINESS ADMIN VIEW
// COMMAND NAME: BUSINESS_ADMIN_VIEW
// STEP 4.2.2.1.2 — VIEW BUSINESS REQUEST
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

var serviceName =
  businessRequest.service || "Custom Business Bot"

var price =
  businessRequest.price || "₹1,499+"

var requirements =
  businessRequest.requirements || "Not provided"

var status =
  businessRequest.status || "pending"

var createdAt =
  businessRequest.createdAt || "Not available"

var cancelledAt =
  businessRequest.cancelledAt || ""

var acceptedAt =
  businessRequest.acceptedAt || ""

var rejectedAt =
  businessRequest.rejectedAt || ""

// ==========================================
// 📊 STATUS ICON
// ==========================================

var statusIcon = "⏳"

if (status === "accepted") {
  statusIcon = "✅"
} else if (status === "rejected") {
  statusIcon = "❌"
} else if (status === "cancelled") {
  statusIcon = "🚫"
} else if (status === "closed") {
  statusIcon = "🔒"
}

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
// 📝 REQUEST TEXT
// ==========================================

var text = ""

if (language === "english") {
  text =
    "🛠️ <b>Business Request Details</b>\n\n" +
    "🆔 Request ID: <code>" +
    escapeHTML(requestId) +
    "</code>\n\n" +

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

    "📦 <b>Package Information</b>\n" +
    "Package: <b>" +
    escapeHTML(packageName) +
    "</b>\n" +
    "Service: " +
    escapeHTML(serviceName) +
    "\n" +
    "Price: <b>" +
    escapeHTML(price) +
    "</b>\n\n" +

    "📋 <b>Requirements</b>\n" +
    escapeHTML(requirements) +
    "\n\n" +

    statusIcon +
    " Status: <b>" +
    escapeHTML(status.toUpperCase()) +
    "</b>\n" +
    "🕒 Created At: <code>" +
    escapeHTML(createdAt) +
    "</code>"

} else if (language === "gujarati") {
  text =
    "🛠️ <b>બિઝનેસ રિક્વેસ્ટ વિગતો</b>\n\n" +
    "🆔 રિક્વેસ્ટ ID: <code>" +
    escapeHTML(requestId) +
    "</code>\n\n" +

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

    "📦 <b>પેકેજ માહિતી</b>\n" +
    "પેકેજ: <b>" +
    escapeHTML(packageName) +
    "</b>\n" +
    "સર્વિસ: " +
    escapeHTML(serviceName) +
    "\n" +
    "કિંમત: <b>" +
    escapeHTML(price) +
    "</b>\n\n" +

    "📋 <b>જરૂરિયાતો</b>\n" +
    escapeHTML(requirements) +
    "\n\n" +

    statusIcon +
    " સ્ટેટસ: <b>" +
    escapeHTML(status.toUpperCase()) +
    "</b>\n" +
    "🕒 બનાવ્યાનો સમય: <code>" +
    escapeHTML(createdAt) +
    "</code>"

} else {
  text =
    "🛠️ <b>Business Request Details</b>\n\n" +
    "🆔 Request ID: <code>" +
    escapeHTML(requestId) +
    "</code>\n\n" +

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

    "📦 <b>Package Information</b>\n" +
    "Package: <b>" +
    escapeHTML(packageName) +
    "</b>\n" +
    "Service: " +
    escapeHTML(serviceName) +
    "\n" +
    "Price: <b>" +
    escapeHTML(price) +
    "</b>\n\n" +

    "📋 <b>Requirements</b>\n" +
    escapeHTML(requirements) +
    "\n\n" +

    statusIcon +
    " Status: <b>" +
    escapeHTML(status.toUpperCase()) +
    "</b>\n" +
    "🕒 Created At: <code>" +
    escapeHTML(createdAt) +
    "</code>"
}

// ==========================================
// 📅 EXTRA STATUS DETAILS
// ==========================================

if (acceptedAt) {
  text +=
    "\n✅ Accepted At: <code>" +
    escapeHTML(acceptedAt) +
    "</code>"
}

if (rejectedAt) {
  text +=
    "\n❌ Rejected At: <code>" +
    escapeHTML(rejectedAt) +
    "</code>"
}

if (cancelledAt) {
  text +=
    "\n🚫 Cancelled At: <code>" +
    escapeHTML(cancelledAt) +
    "</code>"
}

// ==========================================
// 🔘 BUTTONS
// ==========================================

var buttons = []

if (status === "pending") {
  buttons.push([
    {
      text: "✅ Accept",
      callback_data:
        "BUSINESS_ACCEPT " + requestId
    },
    {
      text: "❌ Reject",
      callback_data:
        "BUSINESS_REJECT " + requestId
    }
  ])
}

buttons.push([
  {
    text: "📞 Contact User",
    callback_data:
      "BUSINESS_CONTACT " + requestId
  }
])

buttons.push([
  {
    text: "📋 All Business Requests",
    callback_data: "ADMIN_BUSINESS_REQUESTS"
  }
])

buttons.push([
  {
    text: "🛠️ Admin Panel",
    callback_data: "ADMIN_PANEL"
  }
])

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
