/*CMD
  command: SUPPORT_FOLLOWUP_DELETE
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
// SCRIPT 120 — UPDATED VERSION
// COMMAND NAME: SUPPORT_FOLLOWUP_DELETE
// STEP 5.2.3.1.1.2.1.11
// 📁 Admin Follow-up History Delete
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Backup Before Delete
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
      callback_query_id: request.id,
      text: "🗑️ Follow-up history clear ho rahi hai..."
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
    title: "🗑️ <b>Follow-up History Delete</b>",
    missing: "❌ Support request ID missing hai.",
    notFound: "❌ Support request nahi mili.",
    noData: "ℹ️ Is request mein delete karne ke liye follow-up data nahi hai.",
    success: "✅ Follow-up history clear kar di gayi.\n♻️ Backup restore ke liye save hai.",
    request: "Request ID",
    user: "User",
    view: "📄 View Request",
    history: "📜 Follow-up History",
    all: "📋 All Requests"
  },

  english: {
    title: "🗑️ <b>Delete Follow-up History</b>",
    missing: "❌ Support request ID is missing.",
    notFound: "❌ Support request not found.",
    noData: "ℹ️ No follow-up data is available to delete.",
    success: "✅ Follow-up history has been cleared.\n♻️ Backup is saved for restore.",
    request: "Request ID",
    user: "User",
    view: "📄 View Request",
    history: "📜 Follow-up History",
    all: "📋 All Requests"
  },

  gujarati: {
    title: "🗑️ <b>ફોલોઅપ હિસ્ટ્રી ડિલીટ</b>",
    missing: "❌ સપોર્ટ રિક્વેસ્ટ ID ઉપલબ્ધ નથી.",
    notFound: "❌ સપોર્ટ રિક્વેસ્ટ મળી નથી.",
    noData: "ℹ️ ડિલીટ કરવા માટે કોઈ ફોલોઅપ ડેટા નથી.",
    success: "✅ ફોલોઅપ હિસ્ટ્રી ક્લિયર થઈ ગઈ.\n♻️ રિસ્ટોર માટે બેકઅપ સેવ છે.",
    request: "રિક્વેસ્ટ ID",
    user: "યુઝર",
    view: "📄 રિક્વેસ્ટ જુઓ",
    history: "📜 ફોલોઅપ હિસ્ટ્રી",
    all: "📋 બધી રિક્વેસ્ટ્સ"
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
// 📦 GET SUPPORT REQUEST
// ==========================================

var requestKey = "SUPPORT_REQUEST_" + refId
var requestData = Bot.getProperty(requestKey)

if (!requestData) {
  Bot.sendMessage(
    t.notFound +
    "\n\n🆔 <code>#" +
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

// ==========================================
// 📦 CHECK FOLLOW-UP DATA
// ==========================================

var hasFollowupData = false

if (
  requestData.followup_history &&
  Array.isArray(requestData.followup_history) &&
  requestData.followup_history.length > 0
) {
  hasFollowupData = true
}

if (
  requestData.followupHistory &&
  Array.isArray(requestData.followupHistory) &&
  requestData.followupHistory.length > 0
) {
  hasFollowupData = true
}

if (
  requestData.followup_message ||
  requestData.followup_text ||
  requestData.user_followup ||
  requestData.followup ||
  requestData.last_followup ||
  requestData.lastFollowup ||
  requestData.admin_reply ||
  requestData.adminReply
) {
  hasFollowupData = true
}

if (!hasFollowupData) {
  Bot.sendMessage(
    t.noData,
    {
      parse_mode: "HTML"
    }
  )
  return
}

// ==========================================
// ♻️ SAVE BACKUP BEFORE DELETE
// ==========================================

var backupKey =
  "SUPPORT_FOLLOWUP_BACKUP_" + refId

var backupData = {
  refId: refId,
  followup_history:
    requestData.followup_history || [],
  followupHistory:
    requestData.followupHistory || [],
  followup_message:
    requestData.followup_message || "",
  followup_text:
    requestData.followup_text || "",
  user_followup:
    requestData.user_followup || "",
  followup:
    requestData.followup || "",
  last_followup:
    requestData.last_followup || "",
  lastFollowup:
    requestData.lastFollowup || "",
  admin_reply:
    requestData.admin_reply || "",
  adminReply:
    requestData.adminReply || "",
  savedAt: new Date().toISOString(),
  savedBy: uid
}

Bot.setProperty(
  backupKey,
  backupData,
  "json"
)

// ==========================================
// 🗑️ CLEAR FOLLOW-UP DATA
// ==========================================

requestData.followup_history = []
requestData.followupHistory = []

requestData.followup_message = ""
requestData.followup_text = ""
requestData.user_followup = ""
requestData.followup = ""
requestData.last_followup = ""
requestData.lastFollowup = ""

requestData.admin_reply = ""
requestData.adminReply = ""

requestData.followup_deleted = true
requestData.followup_deleted_at =
  new Date().toISOString()
requestData.followup_deleted_by = uid

// ==========================================
// 💾 SAVE UPDATED REQUEST
// ==========================================

Bot.setProperty(
  requestKey,
  requestData,
  "json"
)

// ==========================================
// 📜 SAVE ADMIN HISTORY
// ==========================================

var adminHistory =
  Bot.getProperty(
    "SUPPORT_HISTORY_" + refId
  ) || []

if (!Array.isArray(adminHistory)) {
  adminHistory = []
}

adminHistory.push({
  type: "followup_history_deleted",
  action: "delete",
  adminId: uid,
  timestamp: new Date().toISOString(),
  message: "Follow-up history deleted after backup"
})

Bot.setProperty(
  "SUPPORT_HISTORY_" + refId,
  adminHistory,
  "json"
)

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
      text: t.history,
      callback_data:
        "SUPPORT_FOLLOWUP_HISTORY " + refId
    }
  ],
  [
    {
      text: t.all,
      callback_data:
        "SUPPORT_ADMIN_REQUESTS ALL"
    }
  ]
]

// ==========================================
// 📝 RESULT TEXT
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
  "━━━━━━━━━━━━━━━━━━\n\n" +
  t.success

// ==========================================
// ✏️ SAME MESSAGE EDIT
// 🗑️ DELETE FALLBACK
// ==========================================

function showResult(messageText, inlineButtons) {

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

showResult(text, buttons)
