/*CMD
  command: SUPPORT_UPDATE_STATUS
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
// SCRIPT 102 — UPDATED VERSION
// COMMAND NAME: SUPPORT_UPDATE_STATUS
// STEP 5.2.3.1.1.2.1.8
// 📁 Admin Support Request Status Update
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
    text: "⏳ Updating status..."
  })
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
    missing: "⚠️ Reference ID ya status missing hai.",
    notFound: "❌ Support request nahi mili.",
    invalid: "⚠️ Invalid status.",
    success: "✅ Support request status update ho gaya.",
    userAccepted: "🟢 Aapki support request accept kar li gayi hai.",
    userRejected: "🔴 Aapki support request reject kar di gayi hai.",
    userCancelled: "⚪ Aapki support request cancel kar di gayi hai.",
    userClosed: "⚫ Aapki support request close kar di gayi hai.",
    userReopened: "🔄 Aapki support request dobara open kar di gayi hai.",
    status: "Status",
    reference: "Reference"
  },

  english: {
    missing: "⚠️ Reference ID or status is missing.",
    notFound: "❌ Support request not found.",
    invalid: "⚠️ Invalid status.",
    success: "✅ Support request status updated.",
    userAccepted: "🟢 Your support request has been accepted.",
    userRejected: "🔴 Your support request has been rejected.",
    userCancelled: "⚪ Your support request has been cancelled.",
    userClosed: "⚫ Your support request has been closed.",
    userReopened: "🔄 Your support request has been reopened.",
    status: "Status",
    reference: "Reference"
  },

  gujarati: {
    missing: "⚠️ રેફરન્સ ID અથવા સ્ટેટસ મળ્યો નથી.",
    notFound: "❌ સપોર્ટ રિક્વેસ્ટ મળી નથી.",
    invalid: "⚠️ અમાન્ય સ્ટેટસ.",
    success: "✅ સપોર્ટ રિક્વેસ્ટ સ્ટેટસ અપડેટ થઈ ગયો.",
    userAccepted: "🟢 તમારી સપોર્ટ રિક્વેસ્ટ સ્વીકારવામાં આવી છે.",
    userRejected: "🔴 તમારી સપોર્ટ રિક્વેસ્ટ નામંજૂર કરવામાં આવી છે.",
    userCancelled: "⚪ તમારી સપોર્ટ રિક્વેસ્ટ રદ કરવામાં આવી છે.",
    userClosed: "⚫ તમારી સપોર્ટ રિક્વેસ્ટ બંધ કરવામાં આવી છે.",
    userReopened: "🔄 તમારી સપોર્ટ રિક્વેસ્ટ ફરીથી ખોલવામાં આવી છે.",
    status: "સ્થિતિ",
    reference: "રેફરન્સ"
  }

}

var t = langText[lang] || langText.hinglish

// ==========================================
// 📦 GET PARAMETERS
// ==========================================

var rawParams = String(
  params || ""
).trim()

var parts = rawParams.split(/\s+/)

var refId = String(
  parts[0] || ""
).trim()

var newStatus = String(
  parts[1] || ""
).trim().toLowerCase()

// ==========================================
// ⚠️ VALIDATE PARAMETERS
// ==========================================

if (!refId || !newStatus) {

  Api.sendMessage({
    chat_id: uid,
    text: t.missing
  })

  return
}

var allowedStatuses = [
  "new",
  "accepted",
  "rejected",
  "cancelled",
  "closed"
]

if (
  allowedStatuses.indexOf(newStatus) === -1
) {

  Api.sendMessage({
    chat_id: uid,
    text: t.invalid
  })

  return
}

// ==========================================
// 📦 GET SUPPORT REQUEST
// ==========================================

var requestData = Bot.getProperty(
  "SUPPORT_REQUEST_" + refId
)

if (!requestData) {

  Api.sendMessage({
    chat_id: uid,
    text: t.notFound
  })

  return
}

// ==========================================
// 🕒 UPDATED TIME
// ==========================================

var now = new Date()

var updatedAt =
  now.getDate() +
  "/" +
  (now.getMonth() + 1) +
  "/" +
  now.getFullYear() +
  " " +
  now.getHours() +
  ":" +
  (
    now.getMinutes() < 10
      ? "0" + now.getMinutes()
      : now.getMinutes()
  )

// ==========================================
// 💾 UPDATE REQUEST DATA
// ==========================================

requestData.status = newStatus
requestData.updated_at = updatedAt
requestData.updatedAt = updatedAt
requestData.updated_by = uid

Bot.setProperty(
  "SUPPORT_REQUEST_" + refId,
  requestData,
  "json"
)

// ==========================================
// 📝 SAVE HISTORY
// ==========================================

var historyKey =
  "SUPPORT_HISTORY_" + refId

var history =
  Bot.getProperty(historyKey) || []

if (!Array.isArray(history)) {
  history = []
}

history.push({
  action: "status_update",
  status: newStatus,
  admin_id: uid,
  time: updatedAt
})

Bot.setProperty(
  historyKey,
  history,
  "json"
)

// ==========================================
// 👤 TARGET USER ID
// ==========================================

var targetUserId =
  requestData.userId ||
  requestData.user_id ||
  requestData.telegramid ||
  requestData.user_telegramid ||
  requestData.userId

// ==========================================
// 🌐 USER LANGUAGE
// ==========================================

var userLang = "hinglish"

if (targetUserId) {

  var targetUserData = Bot.getProperty(
    "USER_" + targetUserId
  ) || {}

  userLang =
    targetUserData.language ||
    "hinglish"
}

// ==========================================
// 👤 USER MESSAGE
// ==========================================

var userMessages = {

  hinglish: {
    accepted: "🟢 Aapki support request accept kar li gayi hai.",
    rejected: "🔴 Aapki support request reject kar di gayi hai.",
    cancelled: "⚪ Aapki support request cancel kar di gayi hai.",
    closed: "⚫ Aapki support request close kar di gayi hai.",
    new: "🔄 Aapki support request dobara open kar di gayi hai.",
    reference: "Reference"
  },

  english: {
    accepted: "🟢 Your support request has been accepted.",
    rejected: "🔴 Your support request has been rejected.",
    cancelled: "⚪ Your support request has been cancelled.",
    closed: "⚫ Your support request has been closed.",
    new: "🔄 Your support request has been reopened.",
    reference: "Reference"
  },

  gujarati: {
    accepted: "🟢 તમારી સપોર્ટ રિક્વેસ્ટ સ્વીકારવામાં આવી છે.",
    rejected: "🔴 તમારી સપોર્ટ રિક્વેસ્ટ નામંજૂર કરવામાં આવી છે.",
    cancelled: "⚪ તમારી સપોર્ટ રિક્વેસ્ટ રદ કરવામાં આવી છે.",
    closed: "⚫ તમારી સપોર્ટ રિક્વેસ્ટ બંધ કરવામાં આવી છે.",
    new: "🔄 તમારી સપોર્ટ રિક્વેસ્ટ ફરીથી ખોલવામાં આવી છે.",
    reference: "રેફરન્સ"
  }

}

var ut = userMessages[userLang] || userMessages.hinglish

// ==========================================
// 📤 NOTIFY USER
// ==========================================

if (targetUserId) {

  Api.sendMessage({
    chat_id: targetUserId,
    text:
      ut[newStatus] +
      "\n\n🆔 <b>" +
      ut.reference +
      ":</b> <code>" +
      refId +
      "</code>",
    parse_mode: "HTML"
  })

}

// ==========================================
// 📄 ADMIN SUCCESS MESSAGE
// ==========================================

Api.sendMessage({
  chat_id: uid,
  text:
    t.success +
    "\n\n🆔 <b>" +
    t.reference +
    ":</b> <code>" +
    refId +
    "</code>\n" +
    "📌 <b>" +
    t.status +
    ":</b> " +
    newStatus,
  parse_mode: "HTML"
})
