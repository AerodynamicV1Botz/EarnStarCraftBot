/*CMD
  command: LEAD_ADMIN_DELETE_CONFIRM
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
// SCRIPT 175 — UPDATED VERSION
// COMMAND NAME: LEAD_ADMIN_DELETE_CONFIRM
// STEP 5.4.1.29 — CONFIRM LEAD DELETE
// 📁 Lead Management / Admin Delete
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

// ---------- ADMIN CHECK ----------
var ADMIN_ID = "7897324623"
var uid = user.telegramid

if (String(uid) !== ADMIN_ID) {
  Api.sendMessage({
    chat_id: uid,
    text: "⛔ <b>Admin access only.</b>",
    parse_mode: "HTML"
  })
  return
}

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

// ---------- CALLBACK DATA ----------
var callbackData = ""

if (
  typeof request !== "undefined" &&
  request &&
  request.data
) {
  callbackData = String(request.data)
}

// ---------- LEAD ID ----------
var prefix = "LEAD_ADMIN_DELETE_CONFIRM_"
var leadId = callbackData.replace(prefix, "")

if (!leadId || leadId == callbackData) {
  Api.sendMessage({
    chat_id: uid,
    text: "⚠️ <b>Invalid Lead ID.</b>",
    parse_mode: "HTML"
  })
  return
}

// ---------- LOAD LEAD ----------
var lead = Bot.getProperty("LEAD_" + leadId)

if (!lead) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ <b>Lead not found.</b>",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "⬅️ All Leads",
            callback_data: "LEAD_ADMIN"
          }
        ],
        [
          {
            text: "🏠 Admin Panel",
            callback_data: "ADMIN_PANEL"
          }
        ]
      ]
    }
  })
  return
}

// ---------- LANGUAGE ----------
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// ---------- TEXT ----------
var title = ""
var successText = ""
var failedText = ""
var allText = ""
var statsText = ""
var panelText = ""

if (lang == "english") {
  title = "🗑️ <b>LEAD DELETED</b>"
  successText = "The lead has been permanently deleted."
  failedText = "Lead deletion failed."
  allText = "📋 All Leads"
  statsText = "📊 Statistics"
  panelText = "🏠 Admin Panel"
} else if (lang == "gujarati") {
  title = "🗑️ <b>લીડ ડિલીટ થઈ ગઈ</b>"
  successText = "લીડ કાયમ માટે ડિલીટ કરવામાં આવી છે."
  failedText = "લીડ ડિલીટ થઈ શકી નથી."
  allText = "📋 બધી લીડ્સ"
  statsText = "📊 આંકડા"
  panelText = "🏠 એડમિન પેનલ"
} else {
  title = "🗑️ <b>LEAD DELETED</b>"
  successText = "Lead permanently delete ho gayi hai."
  failedText = "Lead delete nahi ho saki."
  allText = "📋 All Leads"
  statsText = "📊 Statistics"
  panelText = "🏠 Admin Panel"
}

// ---------- REMOVE FROM INDEX ----------
var leadIndex = Bot.getProperty("LEAD_INDEX") || []

if (!Array.isArray(leadIndex)) {
  leadIndex = []
}

var newLeadIndex = []

for (var i = 0; i < leadIndex.length; i++) {
  if (String(leadIndex[i]) !== String(leadId)) {
    newLeadIndex.push(leadIndex[i])
  }
}

// ---------- SAVE UPDATED INDEX ----------
Bot.setProperty(
  "LEAD_INDEX",
  newLeadIndex,
  "json"
)

// ---------- DELETE LEAD DATA ----------
Bot.setProperty(
  "LEAD_" + leadId,
  null,
  "json"
)

// ---------- DELETE USER LEAD STATUS ----------
var clientId =
  lead.user_id ||
  lead.userid ||
  lead.telegramid ||
  lead.userId

if (clientId) {
  var clientData =
    Bot.getProperty("USER_" + clientId) || {}

  clientData.leadStatus = "deleted"

  Bot.setProperty(
    "USER_" + clientId,
    clientData,
    "json"
  )
}

// ---------- SAME MESSAGE EDIT ----------
function showDeleted(text, buttons) {
  if (
    typeof request !== "undefined" &&
    request.message &&
    request.message.message_id
  ) {
    try {
      Api.editMessageText({
        chat_id: uid,
        message_id: request.message.message_id,
        text: text,
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
    text: text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons
    }
  })
}

// ---------- SUCCESS SCREEN ----------
showDeleted(
  title +
    "\n\n━━━━━━━━━━━━━━━━━━━━\n" +
    "✅ " +
    successText +
    "\n\n" +
    "🆔 <b>Lead ID:</b> <code>" +
    leadId +
    "</code>\n" +
    "━━━━━━━━━━━━━━━━━━━━",
  [
    [
      {
        text: allText,
        callback_data: "LEAD_ADMIN"
      },
      {
        text: statsText,
        callback_data: "LEAD_ADMIN_STATS"
      }
    ],
    [
      {
        text: panelText,
        callback_data: "ADMIN_PANEL"
      }
    ]
  ]
)
