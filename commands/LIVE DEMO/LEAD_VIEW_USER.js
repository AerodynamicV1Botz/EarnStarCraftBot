/*CMD
  command: LEAD_VIEW_USER
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
// SCRIPT 178 — UPDATED VERSION
// COMMAND NAME: LEAD_VIEW_USER
// STEP 5.4.1.32 — USER LEAD DETAILS
// 📁 Lead Management / User View
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

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

// ---------- USER ID ----------
var uid = user.telegramid

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
var prefix = "LEAD_VIEW_USER_"
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
            text: "🏠 Main Menu",
            callback_data: "BACK_MAIN_MENU"
          }
        ]
      ]
    }
  })
  return
}

// ---------- OWNERSHIP CHECK ----------
var leadUserId =
  lead.user_id ||
  lead.userid ||
  lead.telegramid ||
  lead.userId

if (
  leadUserId &&
  String(leadUserId) !== String(uid)
) {
  Api.sendMessage({
    chat_id: uid,
    text: "⛔ <b>You cannot view this lead.</b>",
    parse_mode: "HTML"
  })
  return
}

// ---------- LANGUAGE ----------
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// ---------- TEXT ----------
var title = ""
var statusLabel = ""
var backText = ""
var menuText = ""
var supportText = ""

if (lang == "english") {
  title = "📄 <b>MY LEAD DETAILS</b>"
  statusLabel = "Current Status"
  backText = "⬅️ Back"
  menuText = "🏠 Main Menu"
  supportText = "💬 Contact Team"
} else if (lang == "gujarati") {
  title = "📄 <b>મારી લીડ વિગતો</b>"
  statusLabel = "હાલનો સ્ટેટસ"
  backText = "⬅️ પાછા"
  menuText = "🏠 મુખ્ય મેનુ"
  supportText = "💬 ટીમનો સંપર્ક કરો"
} else {
  title = "📄 <b>MY LEAD DETAILS</b>"
  statusLabel = "Current Status"
  backText = "⬅️ Back"
  menuText = "🏠 Main Menu"
  supportText = "💬 Contact Team"
}

// ---------- LEAD DETAILS ----------
var name = lead.name || lead.full_name || "Not provided"

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

// ---------- STATUS MESSAGE ----------
var statusMessage = ""

if (
  String(status).toLowerCase() == "new"
) {
  statusMessage = "🟢 Your request is newly received."
} else if (
  String(status).toLowerCase() == "pending"
) {
  statusMessage = "🟡 Your request is waiting for review."
} else if (
  String(status).toLowerCase() == "accepted"
) {
  statusMessage = "✅ Your request has been accepted."
} else if (
  String(status).toLowerCase() == "in progress" ||
  String(status).toLowerCase() == "in_progress"
) {
  statusMessage = "🔵 Your request is currently in progress."
} else if (
  String(status).toLowerCase() == "completed"
) {
  statusMessage = "🏆 Your request has been completed."
} else if (
  String(status).toLowerCase() == "rejected"
) {
  statusMessage = "❌ Your request was rejected."
} else {
  statusMessage = "📌 Your request status has been updated."
}

// ---------- SAME MESSAGE EDIT ----------
function showUserLead(text, buttons) {
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
  "📌 <b>" +
  statusLabel +
  ":</b> " +
  status +
  "\n" +
  "🕒 <b>Created:</b> " +
  createdAt +
  "\n\n" +
  "ℹ️ " +
  statusMessage +
  "\n" +
  "━━━━━━━━━━━━━━━━━━━━"

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: backText,
      callback_data: "LEAD_START"
    },
    {
      text: menuText,
      callback_data: "BACK_MAIN_MENU"
    }
  ],
  [
    {
      text: supportText,
      callback_data: "CONTACT_TEAM"
    }
  ]
]

// ---------- SHOW ----------
showUserLead(text, buttons)
