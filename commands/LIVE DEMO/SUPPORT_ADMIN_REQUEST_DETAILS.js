/*CMD
  command: SUPPORT_ADMIN_REQUEST_DETAILS
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
// SCRIPT 101 — UPDATED VERSION
// COMMAND NAME: SUPPORT_ADMIN_REQUEST_DETAILS
// STEP 5.2.3.1.1.2.1.7
// 📁 Admin Support Request Details
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
      text: "📄 Details opened"
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
    title: "📄 <b>Support Request Details</b>",
    reference: "Reference",
    user: "User",
    username: "Username",
    userId: "User ID",
    subject: "Subject",
    message: "Message",
    status: "Status",
    created: "Created",
    updated: "Updated",
    latestFollowup: "Latest Follow-up",
    adminReply: "Admin Reply",
    notAvailable: "Not available",
    noMessage: "No message available.",
    unknown: "Unknown User",
    accept: "✅ Accept",
    reject: "❌ Reject",
    cancel: "🚫 Cancel",
    close: "🔒 Close",
    reopen: "🔄 Reopen",
    reply: "💬 Reply User",
    viewFollowup: "💬 View Follow-up",
    back: "⬅️ Back to Requests"
  },

  english: {
    title: "📄 <b>Support Request Details</b>",
    reference: "Reference",
    user: "User",
    username: "Username",
    userId: "User ID",
    subject: "Subject",
    message: "Message",
    status: "Status",
    created: "Created",
    updated: "Updated",
    latestFollowup: "Latest Follow-up",
    adminReply: "Admin Reply",
    notAvailable: "Not available",
    noMessage: "No message available.",
    unknown: "Unknown User",
    accept: "✅ Accept",
    reject: "❌ Reject",
    cancel: "🚫 Cancel",
    close: "🔒 Close",
    reopen: "🔄 Reopen",
    reply: "💬 Reply User",
    viewFollowup: "💬 View Follow-up",
    back: "⬅️ Back to Requests"
  },

  gujarati: {
    title: "📄 <b>સપોર્ટ રિક્વેસ્ટ વિગતો</b>",
    reference: "રેફરન્સ",
    user: "યુઝર",
    username: "યુઝરનેમ",
    userId: "યુઝર ID",
    subject: "વિષય",
    message: "મેસેજ",
    status: "સ્થિતિ",
    created: "બનાવેલ",
    updated: "અપડેટ",
    latestFollowup: "છેલ્લો ફોલોઅપ",
    adminReply: "એડમિન જવાબ",
    notAvailable: "માહિતી ઉપલબ્ધ નથી",
    noMessage: "કોઈ મેસેજ ઉપલબ્ધ નથી.",
    unknown: "અજાણ્યો યુઝર",
    accept: "✅ સ્વીકારો",
    reject: "❌ નામંજૂર",
    cancel: "🚫 રદ કરો",
    close: "🔒 બંધ કરો",
    reopen: "🔄 ફરીથી ખોલો",
    reply: "💬 યુઝરને જવાબ",
    viewFollowup: "💬 ફોલોઅપ જુઓ",
    back: "⬅️ રિક્વેસ્ટ્સ પર પાછા"
  }

}

var t = langText[lang] || langText.hinglish

// ==========================================
// 🆔 REFERENCE ID
// ==========================================

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

// ==========================================
// 📦 GET REQUEST DATA
// ==========================================

var requestData = Bot.getProperty(
  "SUPPORT_REQUEST_" + refId
)

if (!requestData) {

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
    text: "❌ <b>Support request not found.</b>",
    parse_mode: "HTML"
  })

  return
}

// ==========================================
// 🛡️ HTML ESCAPE
// ==========================================

function escapeHtml(value) {

  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

// ==========================================
// 📌 STATUS TEXT
// ==========================================

function getStatusText(status) {

  status = String(
    status || "new"
  ).toLowerCase()

  if (status === "accepted") {
    return "🟢 Accepted"
  }

  if (status === "rejected") {
    return "🔴 Rejected"
  }

  if (status === "closed") {
    return "⚫ Closed"
  }

  if (status === "cancelled") {
    return "⚪ Cancelled"
  }

  if (status === "reopened") {
    return "🔄 Reopened"
  }

  return "🟡 New"
}

// ==========================================
// 📄 REQUEST DETAILS
// ==========================================

var status = String(
  requestData.status || "new"
).toLowerCase()

var subject =
  requestData.subject ||
  requestData.title ||
  "Support Request"

var messageText =
  requestData.message ||
  requestData.text ||
  requestData.description ||
  t.noMessage

var fullName =
  requestData.name ||
  requestData.full_name ||
  requestData.fullName ||
  t.unknown

var username =
  requestData.username ||
  requestData.user_username ||
  ""

var targetUserId =
  requestData.targetUserId ||
  requestData.userId ||
  requestData.user_id ||
  requestData.telegramid ||
  requestData.user_telegramid ||
  t.notAvailable

var createdAt =
  requestData.created_at ||
  requestData.createdAt ||
  requestData.date ||
  t.notAvailable

var updatedAt =
  requestData.updated_at ||
  requestData.updatedAt ||
  requestData.last_updated ||
  t.notAvailable

var adminReply =
  requestData.admin_reply ||
  requestData.adminReply ||
  ""

var lastFollowup =
  requestData.last_followup ||
  requestData.lastFollowup ||
  requestData.followup ||
  ""

// ==========================================
// 📝 BUILD TEXT
// ==========================================

var text =
  t.title + "\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "🆔 <b>" +
  t.reference +
  ":</b> <code>" +
  escapeHtml(refId) +
  "</code>\n" +
  "👤 <b>" +
  t.user +
  ":</b> " +
  escapeHtml(fullName) +
  "\n" +
  "🔗 <b>" +
  t.username +
  ":</b> " +
  (
    username
      ? "@" + escapeHtml(username)
      : t.notAvailable
  ) +
  "\n" +
  "🆔 <b>" +
  t.userId +
  ":</b> <code>" +
  escapeHtml(targetUserId) +
  "</code>\n\n" +
  "📝 <b>" +
  t.subject +
  ":</b>\n" +
  escapeHtml(subject) +
  "\n\n" +
  "💬 <b>" +
  t.message +
  ":</b>\n" +
  escapeHtml(messageText) +
  "\n\n" +
  "📌 <b>" +
  t.status +
  ":</b> " +
  getStatusText(status) +
  "\n" +
  "🕒 <b>" +
  t.created +
  ":</b> " +
  escapeHtml(createdAt) +
  "\n" +
  "🔄 <b>" +
  t.updated +
  ":</b> " +
  escapeHtml(updatedAt)

// ==========================================
// 💬 FOLLOW-UP DETAILS
// ==========================================

if (lastFollowup) {

  text +=
    "\n\n━━━━━━━━━━━━━━━━━━\n" +
    "💬 <b>" +
    t.latestFollowup +
    ":</b>\n" +
    escapeHtml(lastFollowup)

}

// ==========================================
// 👨‍💻 ADMIN REPLY DETAILS
// ==========================================

if (adminReply) {

  text +=
    "\n\n━━━━━━━━━━━━━━━━━━\n" +
    "👨‍💻 <b>" +
    t.adminReply +
    ":</b>\n" +
    escapeHtml(adminReply)

}

// ==========================================
// 🔘 BUTTONS
// ==========================================

var buttons = []

// ==========================================
// 🟡 NEW REQUEST BUTTONS
// ==========================================

if (status === "new") {

  buttons.push([
    {
      text: t.accept,
      callback_data:
        "SUPPORT_UPDATE_STATUS " +
        refId +
        " accepted"
    },
    {
      text: t.reject,
      callback_data:
        "SUPPORT_UPDATE_STATUS " +
        refId +
        " rejected"
    }
  ])

  buttons.push([
    {
      text: t.cancel,
      callback_data:
        "SUPPORT_UPDATE_STATUS " +
        refId +
        " cancelled"
    }
  ])

}

// ==========================================
// 🟢 ACCEPTED REQUEST BUTTONS
// ==========================================

if (status === "accepted") {

  buttons.push([
    {
      text: t.close,
      callback_data:
        "SUPPORT_UPDATE_STATUS " +
        refId +
        " closed"
    },
    {
      text: t.cancel,
      callback_data:
        "SUPPORT_UPDATE_STATUS " +
        refId +
        " cancelled"
    }
  ])

}

// ==========================================
// 🔴 REJECTED / CANCELLED BUTTONS
// ==========================================

if (
  status === "rejected" ||
  status === "cancelled"
) {

  buttons.push([
    {
      text: t.reopen,
      callback_data:
        "SUPPORT_REOPEN " + refId
    },
    {
      text: t.close,
      callback_data:
        "SUPPORT_UPDATE_STATUS " +
        refId +
        " closed"
    }
  ])

}

// ==========================================
// ⚫ CLOSED REQUEST BUTTONS
// ==========================================

if (status === "closed") {

  buttons.push([
    {
      text: t.reopen,
      callback_data:
        "SUPPORT_REOPEN " + refId
    }
  ])

}

// ==========================================
// 🔄 REOPENED REQUEST BUTTONS
// ==========================================

if (status === "reopened") {

  buttons.push([
    {
      text: t.close,
      callback_data:
        "SUPPORT_UPDATE_STATUS " +
        refId +
        " closed"
    }
  ])

}

// ==========================================
// 💬 REPLY USER BUTTON
// ==========================================

buttons.push([
  {
    text: t.reply,
    callback_data:
      "SUPPORT_REPLY " + refId
  }
])

// ==========================================
// 💬 FOLLOW-UP BUTTON
// ==========================================

if (lastFollowup) {

  buttons.push([
    {
      text: t.viewFollowup,
      callback_data:
        "SUPPORT_ADMIN_FOLLOWUP_DETAILS " +
        refId
    }
  ])

}

// ==========================================
// ⬅️ BACK BUTTON
// ==========================================

buttons.push([
  {
    text: t.back,
    callback_data:
      "SUPPORT_ADMIN_REQUESTS ALL"
  }
])

// ==========================================
// ✏️ SAME MESSAGE EDIT
// 🗑️ DELETE FALLBACK
// ==========================================

function showDetails(
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
// 🚀 SHOW DETAILS
// ==========================================

showDetails(
  text,
  buttons
)
