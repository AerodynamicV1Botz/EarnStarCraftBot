/*CMD
  command: LEAD_STATUS_SET
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
// SCRIPT 162 — UPDATED VERSION
// COMMAND NAME: LEAD_STATUS_SET
// STEP 5.4.1.16 — SAVE LEAD STATUS
// 📁 Lead Collection → Admin Lead Details
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var adminId = "7897324623"

// ---------- CALLBACK ANSWER ----------
if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

// ---------- ADMIN CHECK ----------
if (String(uid) != adminId) {
  return
}

// ---------- GET CALLBACK DATA ----------
var callbackData = ""

if (
  typeof request !== "undefined" &&
  request &&
  request.data
) {
  callbackData = request.data
}

// ---------- GET STATUS AND LEAD ID ----------
var statusData = callbackData.replace("LEAD_STATUS_SET_", "")
var separatorIndex = statusData.indexOf("_")

if (separatorIndex == -1) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ Status data invalid."
  })
  return
}

var newStatus = statusData.substring(0, separatorIndex)
var leadId = statusData.substring(separatorIndex + 1).trim()

if (!newStatus || !leadId) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ Status or Lead ID missing."
  })
  return
}

// ---------- GET LEAD ----------
var leadData = Bot.getProperty("LEAD_" + leadId)

if (!leadData) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ Lead not found."
  })
  return
}

// ---------- SAVE OLD STATUS ----------
var oldStatus = leadData.status || "new"

// ---------- UPDATE STATUS ----------
leadData.status = newStatus
leadData.status_updated_at = new Date().toISOString()
leadData.status_updated_by = String(uid)

Bot.setProperty(
  "LEAD_" + leadId,
  leadData,
  "json"
)

// ---------- UPDATE USER DATA ----------
var clientData = Bot.getProperty(
  "USER_" + leadData.user_id
) || {}

clientData.leadStatus = newStatus
clientData.lastLeadId = leadId

Bot.setProperty(
  "USER_" + leadData.user_id,
  clientData,
  "json"
)

// ---------- STATUS LABEL ----------
var statusLabel = newStatus.toUpperCase()

// ---------- ADMIN TEXT ----------
var adminText =
  "🔄 <b>LEAD STATUS UPDATED</b>\n\n" +
  "🆔 <b>Lead ID:</b> <code>" + leadId + "</code>\n" +
  "👤 <b>Name:</b> " + leadData.name + "\n" +
  "🎯 <b>Service:</b> " + leadData.service + "\n\n" +
  "📊 <b>Previous Status:</b> " + oldStatus.toUpperCase() + "\n" +
  "📊 <b>New Status:</b> " + statusLabel + "\n\n" +
  "🕒 <b>Updated At:</b> " + leadData.status_updated_at

var adminButtons = [
  [
    {
      text: "📋 View Lead",
      callback_data: "LEAD_VIEW_" + leadId
    }
  ],
  [
    {
      text: "🔄 Update Again",
      callback_data: "LEAD_STATUS_" + leadId
    }
  ],
  [
    {
      text: "💬 Reply to User",
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

// ---------- SAME MESSAGE EDIT ----------
function showStatusUpdated(messageText, buttons) {
  if (
    typeof request !== "undefined" &&
    request &&
    request.message &&
    request.message.message_id
  ) {
    try {
      Api.editMessageText({
        chat_id: uid,
        message_id: request.message.message_id,
        text: messageText,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: buttons
        }
      })
      return
    } catch (error) {
      try {
        Api.deleteMessage({
          chat_id: uid,
          message_id: request.message.message_id
        })
      } catch (deleteError) {}
    }
  }

  Api.sendMessage({
    chat_id: uid,
    text: messageText,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons
    }
  })
}

// ---------- SHOW ADMIN RESULT ----------
showStatusUpdated(adminText, adminButtons)

// ---------- CLIENT NOTIFICATION ----------
var clientText =
  "🔄 <b>LEAD STATUS UPDATED</b>\n\n" +
  "🆔 <b>Lead ID:</b>\n" +
  "<code>" + leadId + "</code>\n\n" +
  "📊 <b>New Status:</b> " + statusLabel + "\n\n" +
  "Your lead status has been updated by our team.\n" +
  "We will contact you regarding the next steps."

Api.sendMessage({
  chat_id: leadData.user_id,
  text: clientText,
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
