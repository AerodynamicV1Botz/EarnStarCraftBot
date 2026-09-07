/*CMD
  command: LEAD_ADMIN_ALL
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
// SCRIPT 166 — UPDATED VERSION
// COMMAND NAME: LEAD_ADMIN_ALL
// STEP 5.4.1.20 — LEAD FILTER MENU
// 📁 Lead Management / Admin Filters
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

// ---------- USER LANGUAGE ----------
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// ---------- TEXT ----------
var title = ""
var description = ""
var allText = ""
var activeText = ""
var completedText = ""
var rejectedText = ""
var refreshText = ""
var panelText = ""

if (lang == "english") {
  title = "📊 <b>LEAD MANAGEMENT</b>"
  description = "Select the lead category you want to view."
  allText = "📋 All Leads"
  activeText = "📥 Active Requests"
  completedText = "✅ Completed Leads"
  rejectedText = "❌ Rejected Leads"
  refreshText = "🔄 Refresh"
  panelText = "🏠 Admin Panel"
} else if (lang == "gujarati") {
  title = "📊 <b>લીડ મેનેજમેન્ટ</b>"
  description = "તમે કઈ લીડ કેટેગરી જોવા માંગો છો તે પસંદ કરો."
  allText = "📋 બધી લીડ્સ"
  activeText = "📥 ચાલુ રિક્વેસ્ટ્સ"
  completedText = "✅ પૂર્ણ લીડ્સ"
  rejectedText = "❌ રિજેક્ટેડ લીડ્સ"
  refreshText = "🔄 રિફ્રેશ"
  panelText = "🏠 એડમિન પેનલ"
} else {
  title = "📊 <b>LEAD MANAGEMENT</b>"
  description = "Jis category ki leads dekhni hai, woh select karo."
  allText = "📋 All Leads"
  activeText = "📥 Active Requests"
  completedText = "✅ Completed Leads"
  rejectedText = "❌ Rejected Leads"
  refreshText = "🔄 Refresh"
  panelText = "🏠 Admin Panel"
}

// ---------- SAME MESSAGE EDIT ----------
function showLeadFilters(text, buttons) {
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

// ---------- FILTER MENU ----------
var text =
  title +
  "\n\n" +
  "━━━━━━━━━━━━━━━━━━━━\n" +
  "ℹ️ " +
  description +
  "\n" +
  "━━━━━━━━━━━━━━━━━━━━"

var buttons = [
  [
    {
      text: allText,
      callback_data: "LEAD_ADMIN"
    }
  ],
  [
    {
      text: activeText,
      callback_data: "LEAD_ADMIN_REQUESTS"
    }
  ],
  [
    {
      text: completedText,
      callback_data: "LEAD_ADMIN_COMPLETED"
    }
  ],
  [
    {
      text: rejectedText,
      callback_data: "LEAD_ADMIN_REJECTED"
    }
  ],
  [
    {
      text: refreshText,
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

// ---------- SHOW MENU ----------
showLeadFilters(text, buttons)
