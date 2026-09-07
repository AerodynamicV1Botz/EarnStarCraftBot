/*CMD
  command: ADMIN_BUSINESS_REQUESTS
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 35 — UPDATED VERSION
// COMMAND NAME: ADMIN_BUSINESS_REQUESTS
// STEP 4.2.2.1.2.3 — ALL BUSINESS REQUESTS
// 📁 MAIN MENU → 📁 PRICING → BUSINESS PACKAGE → ADMIN REQUESTS
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
// 📦 GET BUSINESS REQUEST KEYS
// ==========================================

var requestKeys =
  Bot.getProperty("BUSINESS_REQUEST_KEYS") || []

if (!Array.isArray(requestKeys)) {
  requestKeys = []
}

// ==========================================
// 📊 REQUEST COUNTERS
// ==========================================

var totalRequests = 0
var pendingRequests = 0
var acceptedRequests = 0
var rejectedRequests = 0
var cancelledRequests = 0
var closedRequests = 0

var requestList = []

// ==========================================
// 🔍 LOAD ALL BUSINESS REQUESTS
// ==========================================

for (var i = 0; i < requestKeys.length; i++) {
  var requestId = requestKeys[i]

  var businessRequest = Bot.getProperty(
    "BUSINESS_REQUEST_" + requestId
  )

  if (!businessRequest) {
    continue
  }

  totalRequests++

  var status =
    businessRequest.status || "pending"

  if (status === "pending") {
    pendingRequests++
  } else if (status === "accepted") {
    acceptedRequests++
  } else if (status === "rejected") {
    rejectedRequests++
  } else if (status === "cancelled") {
    cancelledRequests++
  } else if (status === "closed") {
    closedRequests++
  }

  requestList.push({
    requestId: requestId,
    userId: businessRequest.userId || "",
    fullName: businessRequest.fullName || "Unknown User",
    packageName: businessRequest.package || "Business",
    status: status,
    createdAt: businessRequest.createdAt || ""
  })
}

// ==========================================
// 🔄 LATEST REQUESTS FIRST
// ==========================================

requestList.reverse()

// ==========================================
// 📝 HEADER TEXT
// ==========================================

var text = ""

if (language === "english") {
  text =
    "🛠️ <b>All Business Requests</b>\n\n" +
    "📊 <b>Request Summary</b>\n" +
    "📦 Total: <b>" + totalRequests + "</b>\n" +
    "⏳ Pending: <b>" + pendingRequests + "</b>\n" +
    "✅ Accepted: <b>" + acceptedRequests + "</b>\n" +
    "❌ Rejected: <b>" + rejectedRequests + "</b>\n" +
    "🚫 Cancelled: <b>" + cancelledRequests + "</b>\n" +
    "🔒 Closed: <b>" + closedRequests + "</b>\n\n"

} else if (language === "gujarati") {
  text =
    "🛠️ <b>તમામ બિઝનેસ રિક્વેસ્ટ</b>\n\n" +
    "📊 <b>રિક્વેસ્ટ સારાંશ</b>\n" +
    "📦 કુલ: <b>" + totalRequests + "</b>\n" +
    "⏳ પેન્ડિંગ: <b>" + pendingRequests + "</b>\n" +
    "✅ સ્વીકારેલી: <b>" + acceptedRequests + "</b>\n" +
    "❌ નકારેલી: <b>" + rejectedRequests + "</b>\n" +
    "🚫 કેન્સલ: <b>" + cancelledRequests + "</b>\n" +
    "🔒 બંધ: <b>" + closedRequests + "</b>\n\n"

} else {
  text =
    "🛠️ <b>All Business Requests</b>\n\n" +
    "📊 <b>Request Summary</b>\n" +
    "📦 Total: <b>" + totalRequests + "</b>\n" +
    "⏳ Pending: <b>" + pendingRequests + "</b>\n" +
    "✅ Accepted: <b>" + acceptedRequests + "</b>\n" +
    "❌ Rejected: <b>" + rejectedRequests + "</b>\n" +
    "🚫 Cancelled: <b>" + cancelledRequests + "</b>\n" +
    "🔒 Closed: <b>" + closedRequests + "</b>\n\n"
}

// ==========================================
// 📋 REQUEST LIST
// ==========================================

var buttons = []

if (requestList.length === 0) {
  if (language === "english") {
    text += "📭 No business requests found."
  } else if (language === "gujarati") {
    text += "📭 કોઈ બિઝનેસ રિક્વેસ્ટ મળી નથી."
  } else {
    text += "📭 Abhi koi business request nahi mili."
  }
} else {
  var maxRequests = 10

  for (
    var j = 0;
    j < requestList.length && j < maxRequests;
    j++
  ) {
    var item = requestList[j]

    var statusIcon = "⏳"

    if (item.status === "accepted") {
      statusIcon = "✅"
    } else if (item.status === "rejected") {
      statusIcon = "❌"
    } else if (item.status === "cancelled") {
      statusIcon = "🚫"
    } else if (item.status === "closed") {
      statusIcon = "🔒"
    }

    text +=
      statusIcon +
      " <b>" +
      escapeHTML(item.requestId) +
      "</b>\n" +
      "👤 " +
      escapeHTML(item.fullName) +
      "\n" +
      "📦 " +
      escapeHTML(item.packageName) +
      "\n" +
      "📊 " +
      escapeHTML(item.status.toUpperCase()) +
      "\n\n"

    buttons.push([
      {
        text:
          statusIcon +
          " " +
          item.requestId +
          " — " +
          item.status.toUpperCase(),

        callback_data:
          "BUSINESS_ADMIN_VIEW " + item.requestId
      }
    ])
  }

  if (requestList.length > maxRequests) {
    text +=
      "\n📌 Showing latest " +
      maxRequests +
      " requests."
  }
}

// ==========================================
// 🔘 NAVIGATION BUTTONS
// ==========================================

buttons.push([
  {
    text: "🔄 Refresh",
    callback_data: "ADMIN_BUSINESS_REQUESTS"
  }
])

buttons.push([
  {
    text: "💼 Business Package",
    callback_data: "PRICE_BUSINESS"
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
