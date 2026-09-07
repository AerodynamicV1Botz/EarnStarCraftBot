/*CMD
  command: SUPPORT_FOLLOWUP_CLOSE
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
// SCRIPT 118 — UPDATED VERSION
// COMMAND NAME: SUPPORT_FOLLOWUP_CLOSE
// STEP 5.2.3.1.1.2.1.10
// 📁 Admin Support Follow-up Close
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
      text: "🔒 Closing request..."
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
    title: "🔒 <b>Close Support Request</b>",
    requestId: "Request ID",
    status: "Status",
    success: "✅ Support request successfully close ho gayi.",
    alreadyClosed: "ℹ️ Ye request already closed hai.",
    notFound: "❌ Support request nahi mili.",
    missingId: "❌ Support request ID missing hai.",
    viewRequest: "📄 View Request",
    allRequests: "📋 All Requests",
    back: "⬅️ Back"
  },

  english: {
    title: "🔒 <b>Close Support Request</b>",
    requestId: "Request ID",
    status: "Status",
    success: "✅ Support request has been closed successfully.",
    alreadyClosed: "ℹ️ This request is already closed.",
    notFound: "❌ Support request not found.",
    missingId: "❌ Support request ID is missing.",
    viewRequest: "📄 View Request",
    allRequests: "📋 All Requests",
    back: "⬅️ Back"
  },

  gujarati: {
    title: "🔒 <b>સપોર્ટ રિક્વેસ્ટ બંધ કરો</b>",
    requestId: "રિક્વેસ્ટ ID",
    status: "સ્થિતિ",
    success: "✅ સપોર્ટ રિક્વેસ્ટ સફળતાપૂર્વક બંધ થઈ ગઈ.",
    alreadyClosed: "ℹ️ આ રિક્વેસ્ટ પહેલેથી બંધ છે.",
    notFound: "❌ સપોર્ટ રિક્વેસ્ટ મળી નથી.",
    missingId: "❌ સપોર્ટ રિક્વેસ્ટ ID ઉપલબ્ધ નથી.",
    viewRequest: "📄 રિક્વેસ્ટ જુઓ",
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

  Api.sendMessage({
    chat_id: uid,
    text: t.missingId,
    parse_mode: "HTML"
  })

  return
}

// ==========================================
// 📦 GET REQUEST
// ==========================================

var requestData = Bot.getProperty(
  "SUPPORT_REQUEST_" + refId
)

if (!requestData) {

  Api.sendMessage({
    chat_id: uid,
    text:
      t.notFound +
      "\n\n🆔 <code>" +
      escapeHtml(refId) +
      "</code>",
    parse_mode: "HTML"
  })

  return
}

// ==========================================
// 📌 CHECK STATUS
// ==========================================

var currentStatus = String(
  requestData.status || "new"
).toLowerCase()

if (currentStatus === "closed") {

  Api.sendMessage({
    chat_id: uid,
    text:
      t.alreadyClosed +
      "\n\n🆔 <code>" +
      escapeHtml(refId) +
      "</code>",
    parse_mode: "HTML"
  })

  return
}

// ==========================================
// 🔒 UPDATE REQUEST
// ==========================================

var now = new Date().toISOString()

requestData.status = "closed"
requestData.closedAt = now
requestData.closed_at = now
requestData.updatedAt = now
requestData.updated_at = now
requestData.closedBy = uid

Bot.setProperty(
  "SUPPORT_REQUEST_" + refId,
  requestData,
  "json"
)

// ==========================================
// 📜 UPDATE HISTORY
// ==========================================

var history = Bot.getProperty(
  "SUPPORT_HISTORY_" + refId
) || []

if (!Array.isArray(history)) {
  history = []
}

history.push({
  action: "followup_closed",
  status: "closed",
  adminId: uid,
  time: now
})

Bot.setProperty(
  "SUPPORT_HISTORY_" + refId,
  history,
  "json"
)

// ==========================================
// 👤 FIND USER ID
// ==========================================

var targetUserId =
  requestData.targetUserId ||
  requestData.userId ||
  requestData.user_id ||
  requestData.telegramid ||
  requestData.user_telegramid

// ==========================================
// 📩 USER NOTIFICATION
// ==========================================

if (targetUserId) {

  try {

    Api.sendMessage({
      chat_id: targetUserId,
      text:
        "🔒 <b>Support Request Closed</b>\n\n" +
        "🆔 <b>Reference ID:</b> <code>" +
        escapeHtml(refId) +
        "</code>\n\n" +
        "Your support request has been closed by our team.\n\n" +
        "If you still need help, you can create a new support request.",
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "📋 My Support Requests",
              callback_data: "MY_SUPPORT_REQUEST"
            }
          ],
          [
            {
              text: "📞 Contact Team",
              callback_data: "CONTACT_TEAM"
            }
          ]
        ]
      }
    })

  } catch (error) {}

}

// ==========================================
// 🔘 ADMIN BUTTONS
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
// 📝 RESULT TEXT
// ==========================================

var text =
  t.title + "\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "🆔 <b>" +
  t.requestId +
  ":</b> <code>" +
  escapeHtml(refId) +
  "</code>\n" +
  "📌 <b>" +
  t.status +
  ":</b> 🔒 CLOSED\n\n" +
  t.success

// ==========================================
// ✏️ SAME MESSAGE EDIT
// 🗑️ DELETE FALLBACK
// ==========================================

function showResult(
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
// 🚀 SHOW RESULT
// ==========================================

showResult(
  text,
  buttons
)
