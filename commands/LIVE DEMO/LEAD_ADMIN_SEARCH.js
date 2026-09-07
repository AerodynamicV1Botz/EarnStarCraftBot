/*CMD
  command: LEAD_ADMIN_SEARCH
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
// SCRIPT 169 — UPDATED VERSION
// COMMAND NAME: LEAD_ADMIN_SEARCH
// STEP 5.4.1.23 — SEARCH LEADS
// 📁 Lead Management / Admin Search
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

// ---------- LANGUAGE ----------
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// ---------- TEXT ----------
var title = ""
var description = ""
var cancelText = ""
var backText = ""
var panelText = ""

if (lang == "english") {
  title = "🔎 <b>SEARCH LEADS</b>"
  description =
    "Send Lead ID, customer name or mobile number to search."
  cancelText = "❌ Cancel"
  backText = "⬅️ Lead Filters"
  panelText = "🏠 Admin Panel"
} else if (lang == "gujarati") {
  title = "🔎 <b>લીડ શોધો</b>"
  description =
    "શોધવા માટે Lead ID, ગ્રાહકનું નામ અથવા મોબાઇલ નંબર મોકલો."
  cancelText = "❌ રદ કરો"
  backText = "⬅️ લીડ ફિલ્ટર્સ"
  panelText = "🏠 એડમિન પેનલ"
} else {
  title = "🔎 <b>SEARCH LEADS</b>"
  description =
    "Lead ID, customer name ya mobile number bhejo."
  cancelText = "❌ Cancel"
  backText = "⬅️ Lead Filters"
  panelText = "🏠 Admin Panel"
}

// ---------- SAVE SEARCH SESSION ----------
Bot.setProperty(
  "LEAD_SEARCH_" + uid,
  {
    step: "WAITING_QUERY",
    language: lang,
    created_at: Date.now()
  },
  "json"
)

// ---------- SAME MESSAGE EDIT ----------
function showSearch(text, buttons) {
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

// ---------- SEARCH SCREEN ----------
showSearch(
  title +
    "\n\n━━━━━━━━━━━━━━━━━━━━\n" +
    "ℹ️ " +
    description +
    "\n\n" +
    "Example:\n" +
    "<code>LEAD-1234567890-123456789</code>\n" +
    "<code>Rahul</code>\n" +
    "<code>9876543210</code>\n" +
    "━━━━━━━━━━━━━━━━━━━━",
  [
    [
      {
        text: cancelText,
        callback_data: "LEAD_SEARCH_CANCEL"
      }
    ],
    [
      {
        text: backText,
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
)
