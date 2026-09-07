/*CMD
  command: LEAD_ADMIN_DELETE_CANCEL
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
// SCRIPT 176 — UPDATED VERSION
// COMMAND NAME: LEAD_ADMIN_DELETE_CANCEL
// STEP 5.4.1.30 — CANCEL LEAD DELETE
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
var prefix = "LEAD_ADMIN_DELETE_CANCEL_"
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
var description = ""
var backText = ""
var deleteText = ""
var replyText = ""
var statusText = ""
var allText = ""
var panelText = ""

if (lang == "english") {
  title = "👁️ <b>LEAD DETAILS</b>"
  description = "Delete action cancelled. Lead is safe."
  backText = "⬅️ All Leads"
  deleteText = "🗑️ Delete Lead"
  replyText = "💬 Reply"
  statusText = "📌 Update Status"
  allText = "📋 All Leads"
  panelText = "🏠 Admin Panel"
} else if (lang == "gujarati") {
  title = "👁️ <b>લીડ વિગતો</b>"
  description = "ડિલીટ કરવાની ક્રિયા રદ થઈ. લીડ સુરક્ષિત છે."
  backText = "⬅️ બધી લીડ્સ"
  deleteText = "🗑️ લીડ ડિલીટ કરો"
  replyText = "💬 જવાબ આપો"
  statusText = "📌 સ્ટેટસ અપડેટ"
  allText = "📋 બધી લીડ્સ"
  panelText = "🏠 એડમિન પેનલ"
} else {
  title = "👁️ <b>LEAD DETAILS</b>"
  description = "Delete cancel kar diya gaya. Lead safe hai."
  backText = "⬅️ All Leads"
  deleteText = "🗑️ Delete Lead"
  replyText = "💬 Reply"
  statusText = "📌 Update Status"
  allText = "📋 All Leads"
  panelText = "🏠 Admin Panel"
}

// ---------- LEAD DETAILS ----------
var name = lead.name || lead.full_name || "Unknown User"

var contact =
  lead.contact ||
  lead.mobile ||
  lead.phone ||
  "Not provided"

var service = lead.service || "Not selected"

var requirement =
  lead.requirement ||
  lead.lead_requirement ||
  "Not provided"

var status = lead.status || "New"

var createdAt = lead.created_at || "Not available"

// ---------- SAME MESSAGE EDIT ----------
function showLeadDetails(text, buttons) {
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

// ---------- DETAILS TEXT ----------
var text =
  title +
  "\n\n" +
  "━━━━━━━━━━━━━━━━━━━━\n" +
  "✅ " +
  description +
  "\n" +
  "━━━━━━━━━━━━━━━━━━━━\n\n" +
  "🆔 <b>Lead ID:</b> <code>" +
  leadId +
  "</code>\n" +
  "👤 <b>Name:</b> " +
  name +
  "\n" +
  "📱 <b>Contact:</b> " +
  contact +
  "\n" +
  "🛠️ <b>Service:</b> " +
  service +
  "\n" +
  "📝 <b>Requirement:</b> " +
  requirement +
  "\n" +
  "📌 <b>Status:</b> " +
  status +
  "\n" +
  "🕒 <b>Created:</b> " +
  createdAt +
  "\n\n" +
  "━━━━━━━━━━━━━━━━━━━━"

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: replyText,
      callback_data: "LEAD_REPLY_" + leadId
    },
    {
      text: statusText,
      callback_data: "LEAD_STATUS_" + leadId
    }
  ],
  [
    {
      text: deleteText,
      callback_data: "LEAD_ADMIN_DELETE_" + leadId
    }
  ],
  [
    {
      text: backText,
      callback_data: "LEAD_ADMIN"
    }
  ],
  [
    {
      text: allText,
      callback_data: "LEAD_ADMIN_ALL"
    }
  ],
  [
    {
      text: panelText,
      callback_data: "ADMIN_PANEL"
    }
  ]
]

// ---------- SHOW ----------
showLeadDetails(text, buttons)
