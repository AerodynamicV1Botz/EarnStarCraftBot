/*CMD
  command: SUPPORT_FOLLOWUP_REPLY
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
// SCRIPT 117 — UPDATED VERSION
// COMMAND NAME: SUPPORT_FOLLOWUP_REPLY
// STEP 5.2.3.1.1.2.1.9
// 📁 Admin Support Follow-up Reply
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var adminId = "7897324623"

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
      text: "💬 Reply mode opened"
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
    title: "💬 <b>Reply to User Follow-up</b>",
    requestId: "Request ID",
    instruction: "Apna reply message bhejo.",
    cancel: "🚫 Cancel Reply",
    viewRequest: "📄 View Request",
    allRequests: "📋 All Requests",
    missingId: "❌ Support request ID missing hai.",
    notFound: "❌ Support request nahi mili.",
    noFollowup: "ℹ️ Is request mein follow-up message nahi hai."
  },

  english: {
    title: "💬 <b>Reply to User Follow-up</b>",
    requestId: "Request ID",
    instruction: "Please send your reply message.",
    cancel: "🚫 Cancel Reply",
    viewRequest: "📄 View Request",
    allRequests: "📋 All Requests",
    missingId: "❌ Support request ID is missing.",
    notFound: "❌ Support request not found.",
    noFollowup: "ℹ️ This request has no follow-up message."
  },

  gujarati: {
    title: "💬 <b>યુઝર ફોલોઅપનો જવાબ</b>",
    requestId: "રિક્વેસ્ટ ID",
    instruction: "તમારો જવાબ મેસેજ મોકલો.",
    cancel: "🚫 જવાબ રદ કરો",
    viewRequest: "📄 રિક્વેસ્ટ જુઓ",
    allRequests: "📋 બધી રિક્વેસ્ટ્સ",
    missingId: "❌ સપોર્ટ રિક્વેસ્ટ ID ઉપલબ્ધ નથી.",
    notFound: "❌ સપોર્ટ રિક્વેસ્ટ મળી નથી.",
    noFollowup: "ℹ️ આ રિક્વેસ્ટમાં ફોલોઅપ મેસેજ નથી."
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
// 💬 CHECK FOLLOW-UP
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
// 👤 FIND TARGET USER
// ==========================================

var targetUserId =
  requestData.targetUserId ||
  requestData.userId ||
  requestData.user_id ||
  requestData.telegramid ||
  requestData.user_telegramid ||
  ""

if (!targetUserId) {

  Bot.sendMessage(
    "❌ <b>Original user ID not found.</b>",
    {
      parse_mode: "HTML"
    }
  )

  return
}

// ==========================================
// 💾 SAVE ADMIN REPLY MODE
// ==========================================

Bot.setProperty(
  "ADMIN_REPLY_MODE_" + uid,
  {
    active: true,
    refId: refId,
    targetUserId: targetUserId,
    replyType: "followup",
    startedAt: new Date().toISOString()
  },
  "json"
)

// ==========================================
// 🔘 BUTTONS
// ==========================================

var buttons = [
  [
    {
      text: t.cancel,
      callback_data:
        "SUPPORT_REPLY_CANCEL " + refId
    }
  ],
  [
    {
      text: t.viewRequest,
      callback_data:
        "SUPPORT_ADMIN_REQUEST " + refId
    }
  ],
  [
    {
      text: t.allRequests,
      callback_data:
        "SUPPORT_ADMIN_REQUESTS ALL"
    }
  ]
]

// ==========================================
// 📝 ADMIN TEXT
// ==========================================

var text =
  t.title + "\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "🆔 <b>" +
  t.requestId +
  ":</b> <code>" +
  escapeHtml(refId) +
  "</code>\n\n" +
  "💬 <b>User Follow-up:</b>\n" +
  escapeHtml(followupText) +
  "\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "✍️ <b>" +
  t.instruction +
  "</b>\n\n" +
  "Reply bhejne ke liye apna message type karke send karo."

// ==========================================
// ✏️ SAME MESSAGE EDIT
// 🗑️ DELETE FALLBACK
// ==========================================

function showReplyMode(
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
// 🚀 SHOW REPLY MODE
// ==========================================

showReplyMode(
  text,
  buttons
)
