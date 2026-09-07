/*CMD
  command: SUPPORT_FOLLOWUP_RESTORE
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
// SCRIPT 121 — UPDATED VERSION
// COMMAND NAME: SUPPORT_FOLLOWUP_RESTORE
// STEP 5.2.3.1.1.2.1.12
// 📁 Admin Follow-up History Restore
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var adminId = "7897324623"

// ==========================================
// 🔐 ADMIN ACCESS
// ==========================================

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
      text: "♻️ Restore process started"
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
    title: "♻️ <b>Restore Follow-up History</b>",
    missing: "❌ Support request ID missing hai.",
    notFound: "❌ Support request nahi mili.",
    noBackup: "❌ Is request ka koi backup available nahi hai.",
    success: "✅ Follow-up history successfully restore ho gayi.",
    request: "Request ID",
    user: "User",
    view: "📄 View Request",
    all: "📋 All Requests"
  },
  english: {
    title: "♻️ <b>Restore Follow-up History</b>",
    missing: "❌ Support request ID is missing.",
    notFound: "❌ Support request not found.",
    noBackup: "❌ No backup is available for this request.",
    success: "✅ Follow-up history has been restored successfully.",
    request: "Request ID",
    user: "User",
    view: "📄 View Request",
    all: "📋 All Requests"
  },
  gujarati: {
    title: "♻️ <b>ફોલોઅપ હિસ્ટ્રી રિસ્ટોર</b>",
    missing: "❌ સપોર્ટ રિક્વેસ્ટ ID ઉપલબ્ધ નથી.",
    notFound: "❌ સપોર્ટ રિક્વેસ્ટ મળી નથી.",
    noBackup: "❌ આ રિક્વેસ્ટનો કોઈ બેકઅપ ઉપલબ્ધ નથી.",
    success: "✅ ફોલોઅપ હિસ્ટ્રી સફળતાપૂર્વક રિસ્ટોર થઈ ગઈ.",
    request: "રિક્વેસ્ટ ID",
    user: "યુઝર",
    view: "📄 રિક્વેસ્ટ જુઓ",
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
// 📦 GET REQUEST
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
// ♻️ GET BACKUP
// ==========================================

var backupKey =
  "SUPPORT_FOLLOWUP_BACKUP_" + refId

var backupData = Bot.getProperty(backupKey)

if (!backupData) {
  Bot.sendMessage(
    t.noBackup +
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
// ♻️ RESTORE FOLLOW-UP DATA
// ==========================================

if (backupData.followup_history) {
  requestData.followup_history =
    backupData.followup_history
}

if (backupData.followupHistory) {
  requestData.followupHistory =
    backupData.followupHistory
}

if (backupData.followup_message) {
  requestData.followup_message =
    backupData.followup_message
}

if (backupData.followup_text) {
  requestData.followup_text =
    backupData.followup_text
}

if (backupData.user_followup) {
  requestData.user_followup =
    backupData.user_followup
}

if (backupData.followup) {
  requestData.followup =
    backupData.followup
}

if (backupData.last_followup) {
  requestData.last_followup =
    backupData.last_followup
}

if (backupData.lastFollowup) {
  requestData.lastFollowup =
    backupData.lastFollowup
}

requestData.followup_deleted = false
requestData.followup_restored = true
requestData.followup_restored_at =
  new Date().toISOString()
requestData.followup_restored_by = uid

// ==========================================
// 💾 SAVE RESTORED REQUEST
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
  type: "followup_history_restored",
  action: "restore",
  adminId: uid,
  timestamp: new Date().toISOString(),
  message: "Follow-up history restored by admin"
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
