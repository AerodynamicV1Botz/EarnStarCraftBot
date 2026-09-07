/*CMD
  command: SUPPORT_FOLLOWUP_HISTORY
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
// SCRIPT 119 — UPDATED VERSION
// COMMAND NAME: SUPPORT_FOLLOWUP_HISTORY
// STEP 5.2.3.1.1.2.1.10
// 📁 Admin Follow-up History
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var adminId = "7897324623"

if (String(uid) !== adminId) {
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
  try {
    Api.answerCallbackQuery({
      callback_query_id: request.id
    })
  } catch (error) {}
}

// ==========================================
// 🌐 LANGUAGE
// ==========================================

var adminData = Bot.getProperty("USER_" + uid) || {}
var lang = adminData.language || "hinglish"

var langText = {
  hinglish: {
    title: "📜 <b>Follow-up History</b>",
    missing: "❌ Support request ID missing hai.",
    notFound: "❌ Support request nahi mili.",
    noHistory: "ℹ️ Is request ki follow-up history available nahi hai.",
    request: "Request ID",
    user: "User",
    all: "📋 All Requests",
    view: "📄 View Request",
    back: "🔙 Back"
  },
  english: {
    title: "📜 <b>Follow-up History</b>",
    missing: "❌ Support request ID is missing.",
    notFound: "❌ Support request not found.",
    noHistory: "ℹ️ No follow-up history is available.",
    request: "Request ID",
    user: "User",
    all: "📋 All Requests",
    view: "📄 View Request",
    back: "🔙 Back"
  },
  gujarati: {
    title: "📜 <b>ફોલોઅપ હિસ્ટ્રી</b>",
    missing: "❌ સપોર્ટ રિક્વેસ્ટ ID ઉપલબ્ધ નથી.",
    notFound: "❌ સપોર્ટ રિક્વેસ્ટ મળી નથી.",
    noHistory: "ℹ️ ફોલોઅપ હિસ્ટ્રી ઉપલબ્ધ નથી.",
    request: "રિક્વેસ્ટ ID",
    user: "યુઝર",
    all: "📋 બધી રિક્વેસ્ટ્સ",
    view: "📄 રિક્વેસ્ટ જુઓ",
    back: "🔙 પાછા"
  }
}

var t = langText[lang] || langText.hinglish

// ==========================================
// 🛡️ HTML ESCAPE
// ==========================================

function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

// ==========================================
// 🆔 GET REQUEST ID
// ==========================================

var refId = ""

if (
  typeof params !== "undefined" &&
  params
) {
  refId = String(params).trim()
}

if (!refId) {
  Bot.sendMessage(t.missing)
  return
}

// ==========================================
// 📦 GET REQUEST
// ==========================================

var requestData = Bot.getProperty(
  "SUPPORT_REQUEST_" + refId
)

if (!requestData) {
  Bot.sendMessage(
    t.notFound +
    "\n\n🆔 <code>" +
    escapeHtml(refId) +
    "</code>",
    {
      parse_mode: "HTML"
    }
  )
  return
}

// ==========================================
// 👤 USER DETAILS
// ==========================================

var userName =
  requestData.full_name ||
  requestData.name ||
  requestData.username ||
  "Unknown User"

var targetUserId =
  requestData.targetUserId ||
  requestData.userId ||
  requestData.user_id ||
  requestData.telegramid ||
  requestData.user_telegramid ||
  "Unknown"

// ==========================================
// 📜 HISTORY SOURCES
// ==========================================

var history =
  requestData.followup_history ||
  requestData.followupHistory ||
  requestData.history ||
  []

if (!Array.isArray(history)) {
  history = []
}

// ==========================================
// 💬 BUILD HISTORY TEXT
// ==========================================

var historyText = ""

if (history.length > 0) {

  for (var i = 0; i < history.length; i++) {

    var item = history[i] || {}

    var sender =
      item.sender ||
      item.from ||
      item.type ||
      "Message"

    var message =
      item.message ||
      item.text ||
      item.reply ||
      item.content ||
      ""

    var time =
      item.timestamp ||
      item.createdAt ||
      item.date ||
      ""

    historyText +=
      "\n<b>" +
      (i + 1) +
      ". " +
      escapeHtml(sender) +
      "</b>\n"

    if (time) {
      historyText +=
        "🕒 " +
        escapeHtml(time) +
        "\n"
    }

    historyText +=
      "💬 " +
      escapeHtml(message) +
      "\n"

  }

} else {

  var latestFollowup =
    requestData.followup_message ||
    requestData.followup_text ||
    requestData.user_followup ||
    requestData.followup ||
    ""

  var adminReply =
    requestData.admin_reply ||
    requestData.adminReply ||
    ""

  if (latestFollowup) {
    historyText +=
      "\n<b>1. User Follow-up</b>\n💬 " +
      escapeHtml(latestFollowup) +
      "\n"
  }

  if (adminReply) {
    historyText +=
      "\n<b>2. Admin Reply</b>\n💬 " +
      escapeHtml(adminReply) +
      "\n"
  }

}

// ==========================================
// 🚫 NO HISTORY
// ==========================================

if (!historyText) {
  Bot.sendMessage(t.noHistory)
  return
}

// ==========================================
// 📝 FINAL TEXT
// ==========================================

var text =
  t.title +
  "\n\n" +
  "━━━━━━━━━━━━━━━━━━\n" +
  "🆔 <b>" +
  t.request +
  ":</b> <code>#" +
  escapeHtml(refId) +
  "</code>\n" +
  "👤 <b>" +
  t.user +
  ":</b> " +
  escapeHtml(userName) +
  "\n" +
  "🆔 <b>User ID:</b> <code>" +
  escapeHtml(targetUserId) +
  "</code>\n" +
  "━━━━━━━━━━━━━━━━━━\n" +
  historyText

// ==========================================
// 🔘 BUTTONS
// ==========================================

var buttons = [
  [
    {
      text: t.view,
      callback_data:
        "SUPPORT_ADMIN_REQUEST " + refId
    }
  ],
  [
    {
      text: t.all,
      callback_data:
        "SUPPORT_ADMIN_REQUESTS ALL"
    }
  ],
  [
    {
      text: t.back,
      callback_data:
        "SUPPORT_ADMIN_REQUEST " + refId
    }
  ]
]

// ==========================================
// ✏️ SAME MESSAGE EDIT
// 🗑️ DELETE FALLBACK
// ==========================================

function showHistory(messageText, inlineButtons) {

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
          inline_keyboard:
            inlineButtons
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
      inline_keyboard:
        inlineButtons
    }
  })

}

// ==========================================
// 🚀 SHOW HISTORY
// ==========================================

showHistory(text, buttons)
