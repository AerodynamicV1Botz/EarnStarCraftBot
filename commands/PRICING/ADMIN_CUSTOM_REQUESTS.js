/*CMD
  command: ADMIN_CUSTOM_REQUESTS
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
// SCRIPT 57 — UPDATED VERSION
// COMMAND NAME: ADMIN_CUSTOM_REQUESTS
// STEP 4.4.2.1.2.3 — ADMIN CUSTOM REQUESTS
// 📁 MAIN MENU → 📁 PRICING → CUSTOM PACKAGE → ADMIN REQUESTS
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

// ---------- ADMIN CHECK ----------
var uid = String(user.telegramid)
var ownerId = "7897324623"
var staffAdmins = Bot.getProperty("STAFF_ADMINS") || []

if (!Array.isArray(staffAdmins)) {
  staffAdmins = []
}

var isAdmin = uid == ownerId

for (var i = 0; i < staffAdmins.length; i++) {
  if (uid == String(staffAdmins[i])) {
    isAdmin = true
    break
  }
}

if (!isAdmin) {
  return Bot.sendMessage(
    "❌ You are not authorized to view requests."
  )
}

// ---------- REQUEST KEYS ----------
var keys = Bot.getProperty("CUSTOM_REQUEST_KEYS", [])
var allRequests = []

if (!Array.isArray(keys)) {
  keys = []
}

// ---------- GET ALL REQUESTS ----------
for (var j = 0; j < keys.length; j++) {
  var item = Bot.getProperty(
    "CUSTOM_REQUEST_" + keys[j]
  )

  if (item) {
    allRequests.push(item)
  }
}

// ---------- EMPTY LIST ----------
if (allRequests.length == 0) {
  return Api.sendMessage({
    chat_id: uid,
    text:
      "📭 <b>No Custom Bot requests found.</b>\n\n" +
      "Abhi tak koi Custom request submit nahi hui.",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🔄 Refresh",
            callback_data: "ADMIN_CUSTOM_REQUESTS"
          }
        ],
        [
          {
            text: "🔙 Admin Panel",
            callback_data: "ADMIN_PANEL"
          }
        ]
      ]
    }
  })
}

// ---------- SORT LATEST FIRST ----------
allRequests.sort(function(a, b) {
  return new Date(b.createdAt) - new Date(a.createdAt)
})

// ---------- STATUS COUNTS ----------
var pendingCount = 0
var acceptedCount = 0
var rejectedCount = 0
var cancelledCount = 0

for (var k = 0; k < allRequests.length; k++) {
  var currentStatus = String(
    allRequests[k].status || "pending"
  )

  if (currentStatus == "pending") {
    pendingCount++
  } else if (currentStatus == "accepted") {
    acceptedCount++
  } else if (currentStatus == "rejected") {
    rejectedCount++
  } else if (currentStatus == "cancelled") {
    cancelledCount++
  }
}

// ---------- HEADER ----------
var text =
  "💎 <b>All Custom Bot Requests</b>\n\n" +
  "📊 <b>Request Summary</b>\n" +
  "📋 Total: <b>" + allRequests.length + "</b>\n" +
  "⏳ Pending: <b>" + pendingCount + "</b>\n" +
  "✅ Accepted: <b>" + acceptedCount + "</b>\n" +
  "❌ Rejected: <b>" + rejectedCount + "</b>\n" +
  "🚫 Cancelled: <b>" + cancelledCount + "</b>\n\n"

// ---------- SHOW LATEST 10 ----------
var visibleRequests = allRequests.slice(0, 10)
var buttons = []

for (var m = 0; m < visibleRequests.length; m++) {
  var item = visibleRequests[m]
  var status = String(item.status || "pending")

  var statusIcon = "⏳"

  if (status == "accepted") {
    statusIcon = "✅"
  } else if (status == "rejected") {
    statusIcon = "❌"
  } else if (status == "cancelled") {
    statusIcon = "🚫"
  }

  text +=
    statusIcon + " <b>" +
    (item.requestId || "Unknown") +
    "</b>\n" +
    "👤 " + (item.fullName || "Unknown User") + "\n" +
    "👤 ID: <code>" + item.userId + "</code>\n" +
    "📌 Status: <b>" + status + "</b>\n" +
    "📅 " + (item.createdAt || "N/A") + "\n\n"

  buttons.push([
    {
      text: "👁 View " + (item.requestId || "Request"),
      callback_data: "CUSTOM_ADMIN_VIEW " + item.requestId
    }
  ])
}

// ---------- FOOTER ----------
if (allRequests.length > 10) {
  text +=
    "ℹ️ Showing latest 10 requests out of " +
    allRequests.length + ".\n\n"
}

text += "👇 Select a request to view details."

// ---------- ACTION BUTTONS ----------
buttons.push([
  {
    text: "🔄 Refresh",
    callback_data: "ADMIN_CUSTOM_REQUESTS"
  },
  {
    text: "💎 Custom Package",
    callback_data: "PRICE_CUSTOM"
  }
])

buttons.push([
  {
    text: "🔙 Admin Panel",
    callback_data: "ADMIN_PANEL"
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
