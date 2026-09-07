/*CMD
  command: SUPPORT_ADMIN_FOLLOWUP_DETAILS
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
// SCRIPT 116 — UPDATED VERSION
// COMMAND NAME: SUPPORT_ADMIN_FOLLOWUP_DETAILS
// STEP 5.2.3.1.1.2.1.8
// 📁 Admin Support Follow-up Details
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var adminId = "7897324623"
var uid = user.telegramid

// ==========================================
// 🔐 ADMIN ACCESS
// ==========================================

if (String(uid) !== adminId) {

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
      callback_query_id: request.id,
      text: "💬 Follow-up opened"
    })
  } catch (error) {}
}

// ==========================================
// 🌐 LANGUAGE
// ==========================================

var adminData = Bot.getProperty(
  "USER_" + uid
) || {}

var lang = adminData.language || "hinglish"

var langText = {

  hinglish: {
    title: "🔁 <b>User Follow-up Details</b>",
    requestId: "Request ID",
    user: "User",
    userId: "User ID",
    message: "Follow-up Message",
    missingId: "❌ Support request ID missing hai.",
    notFound: "❌ Support request nahi mili.",
    noFollowup: "ℹ️ Is request mein abhi koi follow-up message nahi hai.",
    unknown: "Unknown User",
    viewRequest: "📄 View Request",
    replyUser: "💬 Reply User",
    allRequests: "📋 All Requests",
    back: "⬅️ Back"
  },

  english: {
    title: "🔁 <b>User Follow-up Details</b>",
    requestId: "Request ID",
    user: "User",
    userId: "User ID",
    message: "Follow-up Message",
    missingId: "❌ Support request ID is missing.",
    notFound: "❌ Support request not found.",
    noFollowup: "ℹ️ This request has no follow-up message.",
    unknown: "Unknown User",
    viewRequest: "📄 View Request",
    replyUser: "💬 Reply User",
    allRequests: "📋 All Requests",
    back: "⬅️ Back"
  },

  gujarati: {
    title: "🔁 <b>યુઝર ફોલોઅપ વિગતો</b>",
    requestId: "રિક્વેસ્ટ ID",
    user: "યુઝર",
    userId: "યુઝર ID",
    message: "ફોલોઅપ મેસેજ",
    missingId: "❌ સપોર્ટ રિક્વેસ્ટ ID ઉપલબ્ધ નથી.",
    notFound: "❌ સપોર્ટ રિક્વેસ્ટ મળી નથી.",
    noFollowup: "ℹ️ આ રિક્વેસ્ટમાં કોઈ ફોલોઅપ મેસેજ નથી.",
    unknown: "અજાણ્યો યુઝર",
    viewRequest: "📄 રિક્વેસ્ટ જુઓ",
    replyUser: "💬 યુઝરને જવાબ",
    allRequests: "📋 બધી રિક્વેસ્ટ્સ",
    back: "⬅️ પાછા"
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
// 🆔 REFERENCE ID
// ==========================================

var refId = ""

if (
  typeof params !== "undefined" &&
  params
) {
  refId = String(params).trim()
}

if (!refId) {

  Bot.sendMessage(
    t.missingId,
    {
      parse_mode: "HTML"
    }
  )

  return
}

// ==========================================
// 📦 GET SUPPORT REQUEST
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
// 💬 GET FOLLOW-UP MESSAGE
// ==========================================

var followupText =
  requestData.followup_message ||
  requestData.followup_text ||
  requestData.user_followup ||
  requestData.followup ||
  requestData.last_followup ||
  requestData.lastFollowup ||
  ""

if (!followupText) {

  Bot.sendMessage(
    t.noFollowup,
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
  requestData.fullName ||
  requestData.name ||
  requestData.username ||
  t.unknown

var targetUserId =
  requestData.targetUserId ||
  requestData.userId ||
  requestData.user_id ||
  requestData.telegramid ||
  requestData.user_telegramid ||
  "Unknown"

var username =
  requestData.username ||
  requestData.user_username ||
  ""

var status =
  requestData.status ||
  "new"

var createdAt =
  requestData.created_at ||
  requestData.createdAt ||
  requestData.date ||
  "N/A"

var updatedAt =
  requestData.updated_at ||
  requestData.updatedAt ||
  requestData.last_updated ||
  "N/A"

// ==========================================
// 📝 BUILD TEXT
// ==========================================

var text =
  t.title + "\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "🆔 <b>" +
  t.requestId +
  ":</b> <code>#" +
  escapeHtml(refId) +
  "</code>\n" +
  "👤 <b>" +
  t.user +
  ":</b> " +
  escapeHtml(userName) +
  "\n" +
  "🔗 <b>Username:</b> " +
  (
    username
      ? "@" + escapeHtml(username)
      : "N/A"
  ) +
  "\n" +
  "🆔 <b>" +
  t.userId +
  ":</b> <code>" +
  escapeHtml(targetUserId) +
  "</code>\n" +
  "📌 <b>Status:</b> " +
  escapeHtml(status) +
  "\n" +
  "🕒 <b>Created:</b> " +
  escapeHtml(createdAt) +
  "\n" +
  "🔄 <b>Updated:</b> " +
  escapeHtml(updatedAt) +
  "\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "💬 <b>" +
  t.message +
  ":</b>\n" +
  escapeHtml(followupText)

// ==========================================
// 🔘 BUTTONS
// ==========================================

var buttons = [
  [
    {
      text: t.viewRequest,
      callback_data:
        "SUPPORT_ADMIN_REQUEST " + refId
    }
  ],
  [
    {
      text: t.replyUser,
      callback_data:
        "SUPPORT_REPLY " + refId
    }
  ],
  [
    {
      text: t.allRequests,
      callback_data:
        "SUPPORT_ADMIN_REQUESTS ALL"
    }
  ],
  [
    {
      text: t.back,
      callback_data:
        "SUPPORT_ADMIN_REQUESTS ALL"
    }
  ]
]

// ==========================================
// ✏️ SAME MESSAGE EDIT
// 🗑️ DELETE FALLBACK
// ==========================================

function showFollowup(
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

  // ========================================
  // 📤 SEND NEW MESSAGE FALLBACK
  // ========================================

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
// 🚀 SHOW FOLLOW-UP DETAILS
// ==========================================

showFollowup(
  text,
  buttons
)
