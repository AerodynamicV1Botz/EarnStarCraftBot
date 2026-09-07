/*CMD
  command: SUPPORT_REPLY_MESSAGE_HANDLER
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
// SCRIPT 104 — UPDATED VERSION
// COMMAND NAME: SUPPORT_REPLY_MESSAGE_HANDLER
// STEP 5.2.3.1.1.3.1.14
// 📁 Support → Admin Reply Message Handler
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Safe Message Reading + Reply History
// ==========================================

// ==========================================
// 🔐 ADMIN CHECK
// ==========================================

var adminId = user.telegramid

if (String(adminId) !== "7897324623") {
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
// 🌐 ADMIN LANGUAGE
// ==========================================

var adminData = Bot.getProperty(
  "USER_" + adminId
) || {}

var lang = adminData.language || "hinglish"

var langText = {

  hinglish: {
    missingMode: "❌ Reply mode active nahi hai.",
    missingRef: "❌ Request reference missing hai.",
    notFound: "❌ Support request nahi mili.",
    missingUser: "❌ Original user ID nahi mila.",
    empty: "⚠️ Reply message empty hai.",
    tooLong: "❌ Message 4000 characters se zyada nahi ho sakta.",
    sent: "✅ Reply successfully user ko bhej diya gaya.",
    failed: "❌ User ko reply send nahi ho saka.",
    blocked: "User ne bot block kiya ho sakta hai.",
    unavailable: "User account unavailable ho sakta hai.",
    telegramError: "Telegram delivery error ho sakta hai.",
    reference: "Reference",
    userId: "User ID",
    reply: "Your Reply",
    status: "Status"
  },

  english: {
    missingMode: "❌ Reply mode is not active.",
    missingRef: "❌ Request reference is missing.",
    notFound: "❌ Support request not found.",
    missingUser: "❌ Original user ID not found.",
    empty: "⚠️ Reply message is empty.",
    tooLong: "❌ Message cannot be longer than 4000 characters.",
    sent: "✅ Reply sent successfully to the user.",
    failed: "❌ Reply could not be sent to the user.",
    blocked: "The user may have blocked the bot.",
    unavailable: "The user account may be unavailable.",
    telegramError: "There may be a Telegram delivery error.",
    reference: "Reference",
    userId: "User ID",
    reply: "Your Reply",
    status: "Status"
  },

  gujarati: {
    missingMode: "❌ રિપ્લાય મોડ ચાલુ નથી.",
    missingRef: "❌ રિક્વેસ્ટ રેફરન્સ મળ્યો નથી.",
    notFound: "❌ સપોર્ટ રિક્વેસ્ટ મળી નથી.",
    missingUser: "❌ મૂળ યુઝર ID મળી નથી.",
    empty: "⚠️ રિપ્લાય મેસેજ ખાલી છે.",
    tooLong: "❌ મેસેજ 4000 અક્ષરથી વધારે ન હોઈ શકે.",
    sent: "✅ રિપ્લાય યુઝરને સફળતાપૂર્વક મોકલવામાં આવ્યો.",
    failed: "❌ યુઝરને રિપ્લાય મોકલી શકાયો નથી.",
    blocked: "યુઝરે બોટ બ્લોક કર્યો હોઈ શકે છે.",
    unavailable: "યુઝરનું એકાઉન્ટ ઉપલબ્ધ ન હોઈ શકે.",
    telegramError: "Telegram delivery error હોઈ શકે છે.",
    reference: "રેફરન્સ",
    userId: "યુઝર ID",
    reply: "તમારો જવાબ",
    status: "સ્થિતિ"
  }

}

var t = langText[lang] || langText.hinglish

// ==========================================
// 💾 GET REPLY MODE
// ==========================================

var replyMode = Bot.getProperty(
  "ADMIN_REPLY_MODE_" + adminId
)

// ==========================================
// ⚠️ CHECK REPLY MODE
// ==========================================

if (
  !replyMode ||
  replyMode.active !== true
) {

  Bot.sendMessage(
    t.missingMode
  )

  return
}

// ==========================================
// 🆔 GET REFERENCE ID
// ==========================================

var refId = String(
  replyMode.refId || ""
).trim()

if (!refId) {

  Bot.sendMessage(
    t.missingRef
  )

  return
}

// ==========================================
// 📦 GET REQUEST DATA
// ==========================================

var requestData = Bot.getProperty(
  "SUPPORT_REQUEST_" + refId
)

if (!requestData) {

  Bot.sendMessage(
    t.notFound +
    "\n\n" +
    t.reference +
    ": " +
    refId
  )

  return
}

// ==========================================
// 👤 FIND ORIGINAL USER
// ==========================================

var targetUserId =
  replyMode.targetUserId ||
  requestData.userId ||
  requestData.user_id ||
  requestData.telegramid ||
  requestData.user_telegramid

if (!targetUserId) {

  Bot.sendMessage(
    t.missingUser
  )

  return
}

// ==========================================
// 📨 SAFE MESSAGE READING
// ==========================================

var replyText = ""

// Normal incoming message
if (
  typeof message !== "undefined" &&
  message
) {

  if (
    typeof message === "string"
  ) {

    replyText = message

  } else if (
    message.text
  ) {

    replyText = message.text

  } else if (
    message.caption
  ) {

    replyText = message.caption

  }

}

// Fallback: messageText
if (
  !replyText &&
  typeof messageText !== "undefined" &&
  messageText
) {

  replyText = messageText

}

// Fallback: request text
if (
  !replyText &&
  typeof request !== "undefined" &&
  request &&
  request.text
) {

  replyText = request.text

}

replyText = String(
  replyText || ""
).trim()

// ==========================================
// ⚠️ EMPTY MESSAGE CHECK
// ==========================================

if (!replyText) {

  Bot.sendMessage(
    t.empty
  )

  return
}

// ==========================================
// 📏 CHARACTER LIMIT
// ==========================================

if (
  replyText.length > 4000
) {

  Bot.sendMessage(
    t.tooLong
  )

  return
}

// ==========================================
// 🕒 CURRENT TIME
// ==========================================

var now = new Date().toISOString()

// ==========================================
// 🌐 USER LANGUAGE
// ==========================================

var targetUserData = Bot.getProperty(
  "USER_" + targetUserId
) || {}

var userLang =
  targetUserData.language ||
  "hinglish"

// ==========================================
// 👤 USER MESSAGE TEXT
// ==========================================

var userMessages = {

  hinglish:
    "📩 <b>Support Team ka Reply</b>\n\n" +
    "🆔 <b>Reference:</b> <code>" +
    escapeHtml(refId) +
    "</code>\n\n" +
    "💬 <b>Message:</b>\n" +
    escapeHtml(replyText) +
    "\n\n" +
    "Agar aur help chahiye toh support se contact karein.",

  english:
    "📩 <b>Reply from Support Team</b>\n\n" +
    "🆔 <b>Reference:</b> <code>" +
    escapeHtml(refId) +
    "</code>\n\n" +
    "💬 <b>Message:</b>\n" +
    escapeHtml(replyText) +
    "\n\n" +
    "Contact support if you need more help.",

  gujarati:
    "📩 <b>સપોર્ટ ટીમનો જવાબ</b>\n\n" +
    "🆔 <b>રેફરન્સ:</b> <code>" +
    escapeHtml(refId) +
    "</code>\n\n" +
    "💬 <b>મેસેજ:</b>\n" +
    escapeHtml(replyText) +
    "\n\n" +
    "વધુ મદદ માટે સપોર્ટનો સંપર્ક કરો."

}

var userMessage =
  userMessages[userLang] ||
  userMessages.hinglish

// ==========================================
// 📤 SEND REPLY TO USER
// ==========================================

try {

  Api.sendMessage({
    chat_id: targetUserId,
    text: userMessage,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📄 View My Request",
            callback_data:
              "MY_SUPPORT_REQUEST " + refId
          }
        ],
        [
          {
            text: "🆘 Contact Support",
            callback_data:
              "SUPPORT_CONTACT"
          }
        ]
      ]
    }
  })

} catch (error) {

  Bot.sendMessage(
    t.failed +
    "\n\n" +
    "• " + t.blocked +
    "\n" +
    "• " + t.unavailable +
    "\n" +
    "• " + t.telegramError
  )

  return
}

// ==========================================
// 💾 SAVE ADMIN REPLY
// ==========================================

requestData.admin_reply = replyText
requestData.adminReply = replyText
requestData.admin_reply_by = adminId
requestData.admin_reply_at = now
requestData.updated_at = now
requestData.updatedAt = now
requestData.last_action = "admin_reply"

// ==========================================
// 📝 ADD REPLY TO HISTORY
// ==========================================

var historyKey =
  "SUPPORT_HISTORY_" + refId

var history =
  Bot.getProperty(historyKey) || []

if (!Array.isArray(history)) {
  history = []
}

history.push({
  action: "admin_reply",
  status: requestData.status || "new",
  message: replyText,
  by: adminId,
  at: now
})

Bot.setProperty(
  historyKey,
  history,
  "json"
)

// ==========================================
// 💾 SAVE UPDATED REQUEST
// ==========================================

Bot.setProperty(
  "SUPPORT_REQUEST_" + refId,
  requestData,
  "json"
)

// ==========================================
// 🧹 CLEAR ADMIN REPLY MODE
// ==========================================

Bot.setProperty(
  "ADMIN_REPLY_MODE_" + adminId,
  {
    active: false
  },
  "json"
)

// ==========================================
// 📤 ADMIN CONFIRMATION
// ==========================================

Api.sendMessage({
  chat_id: adminId,
  text:
    t.sent +
    "\n\n" +
    "🆔 <b>" +
    t.reference +
    ":</b> <code>" +
    escapeHtml(refId) +
    "</code>\n\n" +
    "👤 <b>" +
    t.userId +
    ":</b> <code>" +
    escapeHtml(targetUserId) +
    "</code>\n\n" +
    "💬 <b>" +
    t.reply +
    ":</b>\n" +
    escapeHtml(replyText) +
    "\n\n" +
    "📌 <b>" +
    t.status +
    ":</b> " +
    escapeHtml(requestData.status || "new"),
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📄 View Request",
          callback_data:
            "SUPPORT_ADMIN_REQUEST_DETAILS " + refId
        }
      ],
      [
        {
          text: "📜 Request History",
          callback_data:
            "SUPPORT_ADMIN_REQUEST_HISTORY " + refId
        }
      ],
      [
        {
          text: "⬅️ Back to Requests",
          callback_data:
            "SUPPORT_ADMIN_REQUESTS ALL"
        }
      ],
      [
        {
          text: "🏠 Admin Panel",
          callback_data:
            "ADMIN_PANEL"
        }
      ]
    ]
  }
})
