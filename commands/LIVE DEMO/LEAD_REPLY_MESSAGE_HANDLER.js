/*CMD
  command: LEAD_REPLY_MESSAGE_HANDLER
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
// SCRIPT 159 — UPDATED VERSION
// COMMAND NAME: LEAD_REPLY_MESSAGE_HANDLER
// STEP 5.4.1.13 — SEND ADMIN REPLY
// 📁 Lead Collection → Admin Lead Details
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var adminId = "7897324623"

// ==========================================
// 👑 ADMIN CHECK
// ==========================================

if (String(uid) != adminId) {
  return
}

// ==========================================
// 📩 GET ADMIN MESSAGE
// ==========================================

var adminMessage = ""

if (
  typeof message !== "undefined" &&
  message &&
  message.text
) {
  adminMessage = message.text
}

if (
  !adminMessage &&
  typeof request !== "undefined" &&
  request &&
  request.message &&
  request.message.text
) {
  adminMessage = request.message.text
}

if (!adminMessage) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ Message empty hai. Please dobara type karo."
  })
  return
}

// ==========================================
// 📋 GET REPLY SESSION
// ==========================================

var replySession = Bot.getProperty("LEAD_REPLY_" + uid)

if (!replySession || !replySession.lead_id) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ Reply session expired. Please Lead View se dobara Reply karo."
  })
  return
}

var leadId = replySession.lead_id
var clientId = replySession.user_id

// ==========================================
// 📋 GET LEAD
// ==========================================

var leadData = Bot.getProperty("LEAD_" + leadId)

if (!leadData) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ Lead not found."
  })
  return
}

// ==========================================
// 📤 SEND MESSAGE TO CLIENT
// ==========================================

Api.sendMessage({
  chat_id: clientId,

  text:
    "💬 <b>MESSAGE FROM EARNSTAR BOTCRAFT</b>\n\n" +
    "🆔 <b>Lead ID:</b> <code>" + leadId + "</code>\n\n" +
    "👑 <b>Admin Message:</b>\n" +
    adminMessage,

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📋 My Lead",
          callback_data: "LEAD_VIEW_USER_" + leadId
        }
      ],
      [
        {
          text: "🏠 Main Menu",
          callback_data: "BACK_MAIN_MENU"
        }
      ]
    ]
  }
})

// ==========================================
// 💾 SAVE LAST REPLY
// ==========================================

leadData.last_reply = adminMessage
leadData.last_reply_at = new Date().toISOString()
leadData.last_reply_by = String(uid)

Bot.setProperty(
  "LEAD_" + leadId,
  leadData,
  "json"
)

// ==========================================
// 🧹 CLEAR REPLY SESSION
// ==========================================

Bot.setProperty(
  "LEAD_REPLY_" + uid,
  null
)

// ==========================================
// ✅ ADMIN CONFIRMATION
// ==========================================

Api.sendMessage({
  chat_id: uid,

  text:
    "✅ <b>MESSAGE SENT</b>\n\n" +
    "🆔 <b>Lead ID:</b> <code>" + leadId + "</code>\n" +
    "👤 <b>User ID:</b> <code>" + clientId + "</code>\n\n" +
    "💬 Your message has been delivered to the client.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📋 View Lead",
          callback_data: "LEAD_VIEW_" + leadId
        }
      ],
      [
        {
          text: "💬 Reply Again",
          callback_data: "LEAD_REPLY_" + leadId
        }
      ],
      [
        {
          text: "📋 All Leads",
          callback_data: "LEAD_ADMIN"
        }
      ],
      [
        {
          text: "👑 Admin Panel",
          callback_data: "ADMIN_PANEL"
        }
      ]
    ]
  }
})
