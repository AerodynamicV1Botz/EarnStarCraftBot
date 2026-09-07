/*CMD
  command: SUPPORT_REQUEST_HISTORY
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
// SCRIPT 92 — UPDATED VERSION
// COMMAND NAME: SUPPORT_REQUEST_HISTORY
// STEP 5.2.3.1.1.3.1.9 — SUPPORT REQUEST HISTORY
// 📁 MAIN MENU → 📁 SERVICES → 📁 SUPPORT
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var refId = String(params || "").trim()

if (typeof request !== "undefined" && request && request.id) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

if (!refId) {
  Api.sendMessage({
    chat_id: uid,
    text: "⚠️ Reference ID missing."
  })
  return
}

var supportRequest = Bot.getProperty("SUPPORT_REQUEST_" + refId)

if (!supportRequest) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ Support request not found."
  })
  return
}

// Security check
if (String(supportRequest.userId) !== String(uid)) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ This request does not belong to you."
  })
  return
}

var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

var history = Bot.getProperty("SUPPORT_HISTORY_" + refId) || []

var title = "📜 <b>SUPPORT REQUEST HISTORY</b>"
var noHistory = "ℹ️ No history available yet."

if (lang === "hinglish") {
  title = "📜 <b>SUPPORT REQUEST HISTORY</b>"
  noHistory = "ℹ️ Abhi tak koi history available nahi hai."
}

if (lang === "gujarati") {
  title = "📜 <b>સપોર્ટ રિક્વેસ્ટ હિસ્ટરી</b>"
  noHistory = "ℹ️ હજુ સુધી કોઈ હિસ્ટરી ઉપલબ્ધ નથી."
}

var text =
  title + "\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "🆔 <b>Reference ID:</b>\n" +
  "<code>" + refId + "</code>\n\n" +
  "📦 <b>Order ID:</b>\n" +
  "<code>" + (supportRequest.orderId || "N/A") + "</code>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n"

if (history.length === 0) {
  text += noHistory
} else {
  for (var i = history.length - 1; i >= 0; i--) {
    var item = history[i]

    var status = String(item.status || "new").toLowerCase()
    var icon = "🟡"

    if (status === "accepted" || status === "approved") {
      icon = "🟢"
    }

    if (
      status === "rejected" ||
      status === "closed" ||
      status === "cancelled"
    ) {
      icon = "🔴"
    }

    text +=
      icon +
      " <b>" +
      status.toUpperCase() +
      "</b>\n" +
      "🕐 " +
      (
        item.time
          ? new Date(item.time).toLocaleString("en-IN")
          : "Unknown"
      ) +
      "\n\n"
  }
}

var buttons = [
  [
    {
      text: "📋 Back to Request",
      callback_data: "MY_SUPPORT_REQUEST " + refId
    }
  ],
  [
    {
      text: "🔄 Refresh",
      callback_data: "SUPPORT_REQUEST_HISTORY " + refId
    }
  ],
  [
    {
      text: "📦 My Orders",
      callback_data: "MY_ORDERS"
    },
    {
      text: "🏠 Main Menu",
      callback_data: "BACK_MAIN_MENU"
    }
  ]
]

function showHistory() {
  if (
    typeof request !== "undefined" &&
    request.message &&
    request.message.message_id
  ) {
    try {
      Api.editMessageText({
        chat_id: uid,
        message_id: request.message.message_id,
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
          message_id: request.message.message_id
        })
      } catch (deleteError) {}
    }
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

showHistory()
