/*CMD
  command: SUPPORT_REPLY
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
// SCRIPT 103 — UPDATED VERSION
// COMMAND NAME: SUPPORT_REPLY
// STEP 5.2.3.1.1.2.1.9
// 📁 Admin Reply User Mode
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
    text: "💬 Reply mode activated"
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
    missing: "⚠️ Reference ID missing hai.",
    notFound: "❌ Support request nahi mili.",
    mode: "💬 <b>Reply Mode Activated</b>",
    instruction: "Ab apna reply message bhejo.",
    cancel: "🚫 Cancel Reply",
    reference: "Reference",
    user: "User",
    subject: "Subject"
  },

  english: {
    missing: "⚠️ Reference ID is missing.",
    notFound: "❌ Support request not found.",
    mode: "💬 <b>Reply Mode Activated</b>",
    instruction: "Now send your reply message.",
    cancel: "🚫 Cancel Reply",
    reference: "Reference",
    user: "User",
    subject: "Subject"
  },

  gujarati: {
    missing: "⚠️ રેફરન્સ ID મળ્યો નથી.",
    notFound: "❌ સપોર્ટ રિક્વેસ્ટ મળી નથી.",
    mode: "💬 <b>જવાબ મોડ ચાલુ થયો</b>",
    instruction: "હવે તમારો જવાબ મેસેજ મોકલો.",
    cancel: "🚫 જવાબ રદ કરો",
    reference: "રેફરન્સ",
    user: "યુઝર",
    subject: "વિષય"
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

  Api.sendMessage({
    chat_id: uid,
    text: t.missing
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

  Api.sendMessage({
    chat_id: uid,
    text: t.notFound
  })

  return
}

// ==========================================
// 👤 TARGET USER ID
// ==========================================

var targetUserId =
  requestData.userId ||
  requestData.user_id ||
  requestData.telegramid ||
  requestData.user_telegramid ||
  requestData.userId

if (!targetUserId) {

  Api.sendMessage({
    chat_id: uid,
    text: "❌ User ID request mein available nahi hai."
  })

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
    startedAt: new Date().toISOString()
  },
  "json"
)

// ==========================================
// 🛡️ HTML ESCAPE
// ==========================================

function escapeHtml(value) {

  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

// ==========================================
// 📄 REQUEST PREVIEW
// ==========================================

var subject =
  requestData.subject ||
  requestData.title ||
  "Support Request"

var fullName =
  requestData.name ||
  requestData.full_name ||
  requestData.fullName ||
  "Unknown User"

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
  ]
]

// ==========================================
// 💬 REPLY MODE MESSAGE
// ==========================================

var replyText =
  t.mode +
  "\n\n" +
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
  "📝 <b>" +
  t.subject +
  ":</b> " +
  escapeHtml(subject) +
  "\n\n" +
  "📨 " +
  t.instruction

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
  replyText,
  buttons
)
