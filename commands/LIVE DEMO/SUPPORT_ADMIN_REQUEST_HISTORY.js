/*CMD
  command: SUPPORT_ADMIN_REQUEST_HISTORY
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
// SCRIPT 99 — UPDATED VERSION
// COMMAND NAME: SUPPORT_ADMIN_REQUEST_HISTORY
// STEP 5.2.3.1.1.2.1.5
// 📁 Admin Support Request History
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid

// ==========================================
// 🔐 ADMIN ACCESS
// ==========================================

if (String(uid) !== "7897324623") {

  if (
    typeof request !== "undefined" &&
    request &&
    request.id
  ) {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "❌ Admin access required"
    })
  }

  return
}

// ==========================================
// 📌 CALLBACK ANSWER
// ==========================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "📜 History opened"
  })
}

// ==========================================
// 🆔 REFERENCE ID
// ==========================================

var refId = String(params || "").trim()

if (!refId) {

  if (
    typeof request !== "undefined" &&
    request &&
    request.id
  ) {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "⚠️ Reference ID missing"
    })
  }

  return
}

// ==========================================
// 📦 GET SUPPORT REQUEST
// ==========================================

var supportRequest = Bot.getProperty(
  "SUPPORT_REQUEST_" + refId
)

if (!supportRequest) {

  if (
    typeof request !== "undefined" &&
    request &&
    request.id
  ) {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "❌ Request not found"
    })
  }

  return
}

// ==========================================
// 📜 GET HISTORY
// ==========================================

var history = Bot.getProperty(
  "SUPPORT_HISTORY_" + refId
) || []

// ==========================================
// 📝 HEADER
// ==========================================

var text =
  "📜 <b>SUPPORT REQUEST HISTORY</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "🆔 <b>Reference ID:</b>\n" +
  "<code>" + refId + "</code>\n\n" +
  "👤 <b>User ID:</b>\n" +
  "<code>" + supportRequest.userId + "</code>\n\n" +
  "📦 <b>Order ID:</b>\n" +
  "<code>" +
  (supportRequest.orderId || "N/A") +
  "</code>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n"

// ==========================================
// 📜 HISTORY DISPLAY
// ==========================================

if (history.length === 0) {

  text +=
    "ℹ️ <b>No history available yet.</b>"

} else {

  for (var i = history.length - 1; i >= 0; i--) {

    var item = history[i] || {}

    var status = String(
      item.status || "new"
    ).toLowerCase()

    var icon = "🟡"

    if (
      status === "accepted" ||
      status === "approved"
    ) {
      icon = "🟢"
    }

    if (
      status === "rejected" ||
      status === "closed" ||
      status === "cancelled"
    ) {
      icon = "🔴"
    }

    var timeText = "Unknown"

    if (item.time) {

      try {
        timeText =
          new Date(item.time).toLocaleString("en-IN")
      } catch (error) {
        timeText = String(item.time)
      }

    }

    text +=
      icon +
      " <b>" +
      status.toUpperCase() +
      "</b>\n" +
      "🕐 " +
      timeText +
      "\n\n"
  }
}

// ==========================================
// 🔘 BUTTONS
// ==========================================

var buttons = [
  [
    {
      text: "📋 Back to Request",
      callback_data:
        "SUPPORT_ADMIN_REQUEST " + refId
    }
  ],
  [
    {
      text: "🔄 Refresh",
      callback_data:
        "SUPPORT_ADMIN_REQUEST_HISTORY " + refId
    }
  ],
  [
    {
      text: "📋 All Support Requests",
      callback_data:
        "SUPPORT_ADMIN_REQUESTS"
    }
  ],
  [
    {
      text: "👑 Admin Panel",
      callback_data:
        "ADMIN_PANEL"
    }
  ]
]

// ==========================================
// ✏️ SAME MESSAGE EDIT
// 🗑️ DELETE FALLBACK
// ==========================================

function showHistory(text, buttons) {

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
        text: text,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: buttons
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

  // ========================================
  // 📤 SEND NEW MESSAGE FALLBACK
  // ========================================

  Api.sendMessage({
    chat_id: uid,
    text: text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons
    }
  })
}

// ==========================================
// 🚀 SHOW HISTORY
// ==========================================

showHistory(
  text,
  buttons
)
