/*CMD
  command: LEAD_ADMIN_DELETE
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
// SCRIPT 174 — UPDATED VERSION
// COMMAND NAME: LEAD_ADMIN_DELETE
// STEP 5.4.1.28 — DELETE LEAD CONFIRMATION
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
var leadId = callbackData.replace("LEAD_ADMIN_DELETE_", "")

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
var warning = ""
var confirmText = ""
var cancelText = ""
var backText = ""
var panelText = ""

if (lang == "english") {
  title = "🗑️ <b>DELETE LEAD</b>"
  warning = "Are you sure you want to permanently delete this lead?"
  confirmText = "✅ Yes, Delete"
  cancelText = "❌ Cancel"
  backText = "⬅️ Back to Lead"
  panelText = "🏠 Admin Panel"
} else if (lang == "gujarati") {
  title = "🗑️ <b>લીડ ડિલીટ કરો</b>"
  warning = "શું તમે આ લીડ કાયમ માટે ડિલીટ કરવા માંગો છો?"
  confirmText = "✅ હા, ડિલીટ કરો"
  cancelText = "❌ રદ કરો"
  backText = "⬅️ લીડ પર પાછા"
  panelText = "🏠 એડમિન પેનલ"
} else {
  title = "🗑️ <b>DELETE LEAD</b>"
  warning = "Kya aap is lead ko permanently delete karna chahte ho?"
  confirmText = "✅ Yes, Delete"
  cancelText = "❌ Cancel"
  backText = "⬅️ Back to Lead"
  panelText = "🏠 Admin Panel"
}

// ---------- LEAD DETAILS ----------
var name = lead.name || lead.full_name || "Unknown User"
var service = lead.service || "Not selected"
var status = lead.status || "New"

// ---------- SAME MESSAGE EDIT ----------
function showDeleteConfirm(text, buttons) {
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

// ---------- CONFIRMATION SCREEN ----------
var text =
  title +
  "\n\n━━━━━━━━━━━━━━━━━━━━\n" +
  "⚠️ <b>" +
  warning +
  "</b>\n\n" +
  "👤 <b>Name:</b> " +
  name +
  "\n" +
  "🆔 <b>Lead ID:</b> <code>" +
  leadId +
  "</code>\n" +
  "🛠️ <b>Service:</b> " +
  service +
  "\n" +
  "📌 <b>Status:</b> " +
  status +
  "\n\n" +
  "⚠️ <i>This action cannot be undone.</i>\n" +
  "━━━━━━━━━━━━━━━━━━━━"

var buttons = [
  [
    {
      text: confirmText,
      callback_data: "LEAD_ADMIN_DELETE_CONFIRM_" + leadId
    }
  ],
  [
    {
      text: cancelText,
      callback_data: "LEAD_VIEW_" + leadId
    }
  ],
  [
    {
      text: backText,
      callback_data: "LEAD_VIEW_" + leadId
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
showDeleteConfirm(text, buttons)
