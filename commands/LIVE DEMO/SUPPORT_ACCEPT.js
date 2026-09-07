/*CMD
  command: SUPPORT_ACCEPT
  help: 
  need_reply: false
  auto_retry_time: 
  folder: LIVE DEMO

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 106 — UPDATED VERSION
// COMMAND NAME: SUPPORT_ACCEPT
// STEP 5.2.3.1.1.3.1.16
// 📁 Support → Admin Accept Request
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

// ---------- ADMIN CHECK ----------
var uid = user.telegramid

if (String(uid) != "7897324623") {
  if (
    typeof request !== "undefined" &&
    request &&
    request.id
  ) {
    try {
      Api.answerCallbackQuery({
        callback_query_id: request.id,
        text: "❌ Admin access required"
      })
    } catch (error) {}
  }

  return
}

// ---------- CALLBACK ANSWER ----------
if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  try {
    Api.answerCallbackQuery({
      callback_query_id: request.id
    })
  } catch (error) {}
}

// ---------- GET REFERENCE ID ----------
var refId = String(
  params || ""
).trim()

if (!refId) {
  if (
    typeof request !== "undefined" &&
    request &&
    request.id
  ) {
    try {
      Api.answerCallbackQuery({
        callback_query_id: request.id,
        text: "⚠️ Reference ID missing"
      })
    } catch (error) {}
  }

  Api.sendMessage({
    chat_id: uid,
    text: "⚠️ <b>Reference ID missing.</b>",
    parse_mode: "HTML"
  })

  return
}

// ---------- GET SUPPORT REQUEST ----------
var supportRequest = Bot.getProperty(
  "SUPPORT_REQUEST_" + refId
)

if (
  !supportRequest ||
  typeof supportRequest !== "object"
) {
  if (
    typeof request !== "undefined" &&
    request &&
    request.id
  ) {
    try {
      Api.answerCallbackQuery({
        callback_query_id: request.id,
        text: "❌ Request not found"
      })
    } catch (error) {}
  }

  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>Support request not found.</b>\n\n" +
      "🆔 <code>" + refId + "</code>",
    parse_mode: "HTML"
  })

  return
}

// ---------- CURRENT STATUS ----------
var status = String(
  supportRequest.status || "new"
).toLowerCase()

if (
  status == "accepted" ||
  status == "approved"
) {
  if (
    typeof request !== "undefined" &&
    request &&
    request.id
  ) {
    try {
      Api.answerCallbackQuery({
        callback_query_id: request.id,
        text: "⚠️ Request already accepted"
      })
    } catch (error) {}
  }

  return
}

if (
  status == "rejected" ||
  status == "closed" ||
  status == "cancelled"
) {
  if (
    typeof request !== "undefined" &&
    request &&
    request.id
  ) {
    try {
      Api.answerCallbackQuery({
        callback_query_id: request.id,
        text: "❌ This request is already closed"
      })
    } catch (error) {}
  }

  return
}

// ---------- FIND USER ID ----------
var targetUserId =
  supportRequest.user_id ||
  supportRequest.userId ||
  supportRequest.telegramid ||
  supportRequest.user_telegramid ||
  supportRequest.targetUserId

if (!targetUserId) {
  if (
    typeof request !== "undefined" &&
    request &&
    request.id
  ) {
    try {
      Api.answerCallbackQuery({
        callback_query_id: request.id,
        text: "❌ User ID missing"
      })
    } catch (error) {}
  }

  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>Original user ID not found.</b>\n\n" +
      "🆔 Request: <code>" + refId + "</code>",
    parse_mode: "HTML"
  })

  return
}

// ---------- HTML ESCAPE ----------
function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

// ---------- CURRENT TIME ----------
var now = new Date().toISOString()

// ---------- UPDATE SUPPORT REQUEST ----------
supportRequest.status = "accepted"
supportRequest.acceptedAt = now
supportRequest.acceptedBy = String(uid)
supportRequest.updated_at = now
supportRequest.last_action = "accepted"

// ---------- SAVE REQUEST ----------
Bot.setProperty(
  "SUPPORT_REQUEST_" + refId,
  supportRequest,
  "json"
)

// ---------- ADD HISTORY ----------
var history = Bot.getProperty(
  "SUPPORT_HISTORY_" + refId
) || []

if (!Array.isArray(history)) {
  history = []
}

history.push({
  status: "accepted",
  action: "accepted",
  time: now,
  updatedBy: String(uid)
})

Bot.setProperty(
  "SUPPORT_HISTORY_" + refId,
  history,
  "json"
)

// ---------- UPDATE USER DATA ----------
var userData = Bot.getProperty(
  "USER_" + targetUserId
) || {}

userData.supportRequestRef = refId
userData.supportRequestStatus = "accepted"
userData.supportRequestUpdatedAt = now

Bot.setProperty(
  "USER_" + targetUserId,
  userData,
  "json"
)

// ---------- CALLBACK CONFIRMATION ----------
if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  try {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "✅ Request accepted"
    })
  } catch (error) {}
}

// ---------- ADMIN CONFIRMATION ----------
var adminText =
  "✅ <b>SUPPORT REQUEST ACCEPTED</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "🆔 <b>Reference ID:</b>\n" +
  "<code>" + escapeHtml(refId) + "</code>\n\n" +
  "📦 <b>Order ID:</b>\n" +
  "<code>" +
  escapeHtml(supportRequest.orderId || "N/A") +
  "</code>\n\n" +
  "🟢 <b>Status:</b> ACCEPTED\n\n" +
  "The user has been notified."

var adminButtons = [
  [
    {
      text: "👁 View Request",
      callback_data:
        "SUPPORT_ADMIN_REQUEST " + refId
    }
  ],
  [
    {
      text: "📜 History",
      callback_data:
        "SUPPORT_ADMIN_REQUEST_HISTORY " + refId
    }
  ],
  [
    {
      text: "📋 All Support Requests",
      callback_data:
        "SUPPORT_ADMIN_REQUESTS ALL"
    }
  ],
  [
    {
      text: "👑 Admin Panel",
      callback_data: "ADMIN_PANEL"
    }
  ]
]

// ---------- USER NOTIFICATION ----------
var userText =
  "✅ <b>SUPPORT REQUEST ACCEPTED</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "🆔 <b>Reference ID:</b>\n" +
  "<code>" + escapeHtml(refId) + "</code>\n\n" +
  "📦 <b>Order ID:</b>\n" +
  "<code>" +
  escapeHtml(supportRequest.orderId || "N/A") +
  "</code>\n\n" +
  "🟢 <b>Status:</b> ACCEPTED\n\n" +
  "Your support request has been reviewed and accepted.\n\n" +
  "Our team will contact you regarding the next steps."

var userButtons = [
  [
    {
      text: "📋 View Request",
      callback_data:
        "MY_SUPPORT_REQUEST " + refId
    }
  ],
  [
    {
      text: "📜 History",
      callback_data:
        "SUPPORT_REQUEST_HISTORY " + refId
    }
  ],
  [
    {
      text: "📞 Contact Team",
      callback_data: "CONTACT_TEAM"
    }
  ],
  [
    {
      text: "🏠 Main Menu",
      callback_data: "BACK_MAIN_MENU"
    }
  ]
]

// ---------- SEND USER NOTIFICATION ----------
var userNotified = false

try {
  Api.sendMessage({
    chat_id: targetUserId,
    text: userText,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: userButtons
    }
  })

  userNotified = true
} catch (error) {
  userNotified = false
}

// ---------- ADMIN STATUS ----------
if (userNotified) {
  adminText +=
    "\n\n📩 User notification sent successfully."
} else {
  adminText +=
    "\n\n⚠️ User notification could not be sent.\n" +
    "User may have blocked the bot."
}

// ---------- SAME MESSAGE EDIT + DELETE FALLBACK ----------
function showAdminMenu(
  messageText,
  inlineButtons
) {
  if (
    typeof request !== "undefined" &&
    request &&
    request.message &&
    request.message.message_id
  ) {
    try {
      Api.editMessageText({
        chat_id: uid,
        message_id:
          request.message.message_id,
        text: messageText,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: inlineButtons
        }
      })

      return
    } catch (error) {
      try {
        Api.deleteMessage({
          chat_id: uid,
          message_id:
            request.message.message_id
        })
      } catch (deleteError) {}
    }
  }

  Api.sendMessage({
    chat_id: uid,
    text: messageText,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: inlineButtons
    }
  })
}

// ---------- SHOW ADMIN RESULT ----------
showAdminMenu(
  adminText,
  adminButtons
)
