/*CMD
  command: LEAD_ADMIN_RESTORE_CONFIRM
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
// SCRIPT 180 — UPDATED VERSION
// COMMAND NAME: LEAD_ADMIN_RESTORE_CONFIRM
// STEP 5.4.1.34 — RESTORE CONFIRMATION
// 📁 Lead Management / Restore Confirmation
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
var prefix = "LEAD_ADMIN_RESTORE_CONFIRM_"
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
            text: "⬅️ Rejected Leads",
            callback_data: "LEAD_ADMIN_REJECTED"
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

// ---------- STATUS CHECK ----------
var status = String(lead.status || "").toLowerCase()

if (status != "rejected") {
  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>Ye lead rejected status mein nahi hai.</b>\n\n" +
      "🆔 Lead ID: <code>" +
      leadId +
      "</code>\n" +
      "📌 Current Status: " +
      (lead.status || "New"),
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "👁️ View Lead",
            callback_data: "LEAD_VIEW_" + leadId
          }
        ],
        [
          {
            text: "⬅️ Rejected Leads",
            callback_data: "LEAD_ADMIN_REJECTED"
          }
        ]
      ]
    }
  })
  return
}

// ---------- LANGUAGE ----------
var adminData = Bot.getProperty("USER_" + uid) || {}
var lang = adminData.language || "hinglish"

// ---------- TEXT ----------
var title = ""
var question = ""
var confirmText = ""
var cancelText = ""
var rejectedText = ""
var panelText = ""

if (lang == "english") {
  title = "♻️ <b>RESTORE LEAD</b>"
  question = "Do you want to restore this rejected lead?"
  confirmText = "✅ Yes, Restore"
  cancelText = "❌ Cancel"
  rejectedText = "⬅️ Rejected Leads"
  panelText = "🏠 Admin Panel"
} else if (lang == "gujarati") {
  title = "♻️ <b>લીડ પુનઃસ્થાપિત કરો</b>"
  question = "શું તમે આ રિજેક્ટ થયેલી લીડને પુનઃસ્થાપિત કરવા માંગો છો?"
  confirmText = "✅ હા, પુનઃસ્થાપિત કરો"
  cancelText = "❌ રદ કરો"
  rejectedText = "⬅️ રિજેક્ટ થયેલી લીડ્સ"
  panelText = "🏠 એડમિન પેનલ"
} else {
  title = "♻️ <b>RESTORE LEAD</b>"
  question = "Kya aap is rejected lead ko restore karna chahte ho?"
  confirmText = "✅ Yes, Restore"
  cancelText = "❌ Cancel"
  rejectedText = "⬅️ Rejected Leads"
  panelText = "🏠 Admin Panel"
}

// ---------- SAME MESSAGE EDIT ----------
function showRestoreConfirm(text, buttons) {
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
  "🆔 <b>Lead ID:</b> <code>" +
  leadId +
  "</code>\n" +
  "👤 <b>Name:</b> " +
  (lead.name || lead.full_name || "Unknown") +
  "\n" +
  "📌 <b>Current Status:</b> Rejected\n\n" +
  "⚠️ " +
  question +
  "\n" +
  "━━━━━━━━━━━━━━━━━━━━"

var buttons = [
  [
    {
      text: confirmText,
      callback_data: "LEAD_ADMIN_RESTORE_" + leadId
    }
  ],
  [
    {
      text: cancelText,
      callback_data: "LEAD_REJECTED_VIEW_" + leadId
    }
  ],
  [
    {
      text: rejectedText,
      callback_data: "LEAD_ADMIN_REJECTED"
    },
    {
      text: panelText,
      callback_data: "ADMIN_PANEL"
    }
  ]
]

// ---------- SHOW ----------
showRestoreConfirm(text, buttons)
