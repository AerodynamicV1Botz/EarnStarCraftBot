/*CMD
  command: LEAD_REJECTED_VIEW
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
// SCRIPT 179 — UPDATED VERSION
// COMMAND NAME: LEAD_REJECTED_VIEW
// STEP 5.4.1.33 — REJECTED LEAD DETAILS
// 📁 Lead Management / Admin Rejected Details
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
var prefix = "LEAD_REJECTED_VIEW_"
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

// ---------- LANGUAGE ----------
var adminData = Bot.getProperty("USER_" + uid) || {}
var lang = adminData.language || "hinglish"

// ---------- TEXT ----------
var title = ""
var restoreText = ""
var allText = ""
var rejectedText = ""
var panelText = ""

if (lang == "english") {
  title = "❌ <b>REJECTED LEAD DETAILS</b>"
  restoreText = "♻️ Restore Lead"
  allText = "📋 All Leads"
  rejectedText = "⬅️ Rejected Leads"
  panelText = "🏠 Admin Panel"
} else if (lang == "gujarati") {
  title = "❌ <b>રિજેક્ટ થયેલી લીડની વિગતો</b>"
  restoreText = "♻️ લીડ પુનઃસ્થાપિત કરો"
  allText = "📋 બધી લીડ્સ"
  rejectedText = "⬅️ રિજેક્ટ થયેલી લીડ્સ"
  panelText = "🏠 એડમિન પેનલ"
} else {
  title = "❌ <b>REJECTED LEAD DETAILS</b>"
  restoreText = "♻️ Restore Lead"
  allText = "📋 All Leads"
  rejectedText = "⬅️ Rejected Leads"
  panelText = "🏠 Admin Panel"
}

// ---------- DETAILS ----------
var name =
  lead.name ||
  lead.full_name ||
  lead.lead_name ||
  "Not provided"

var contact =
  lead.contact ||
  lead.mobile ||
  lead.phone ||
  "Not provided"

var service =
  lead.service ||
  lead.lead_service ||
  "Not selected"

var requirement =
  lead.requirement ||
  lead.lead_requirement ||
  "Not provided"

var status = lead.status || "Rejected"

var rejectedBy = lead.rejected_by || "Admin"
var rejectedAt = lead.rejected_at || "Not available"

// ---------- SAME MESSAGE EDIT ----------
function showRejectedDetails(text, buttons) {
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
  "\n\n━━━━━━━━━━━━━━━━━━━━\n" +
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
  "👮 <b>Rejected By:</b> " +
  rejectedBy +
  "\n" +
  "🕒 <b>Rejected At:</b> " +
  rejectedAt +
  "\n━━━━━━━━━━━━━━━━━━━━"

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: restoreText,
      callback_data: "LEAD_ADMIN_RESTORE_" + leadId
    }
  ],
  [
    {
      text: rejectedText,
      callback_data: "LEAD_ADMIN_REJECTED"
    },
    {
      text: allText,
      callback_data: "LEAD_ADMIN"
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
showRejectedDetails(text, buttons)
