/*CMD
  command: LEAD_ADMIN_STATS
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
// SCRIPT 172 — UPDATED VERSION
// COMMAND NAME: LEAD_ADMIN_STATS
// STEP 5.4.1.26 — LEAD STATISTICS
// 📁 Lead Management / Admin Statistics
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
var refreshText = ""
var filtersText = ""
var allText = ""
var panelText = ""

if (lang == "english") {
  title = "📊 <b>LEAD STATISTICS</b>"
  description = "Current lead management overview"
  refreshText = "🔄 Refresh"
  filtersText = "📊 Lead Filters"
  allText = "📋 All Leads"
  panelText = "🏠 Admin Panel"
} else if (lang == "gujarati") {
  title = "📊 <b>લીડ આંકડા</b>"
  description = "હાલના લીડ મેનેજમેન્ટનો સારાંશ"
  refreshText = "🔄 રિફ્રેશ"
  filtersText = "📊 લીડ ફિલ્ટર્સ"
  allText = "📋 બધી લીડ્સ"
  panelText = "🏠 એડમિન પેનલ"
} else {
  title = "📊 <b>LEAD STATISTICS</b>"
  description = "Current lead management overview"
  refreshText = "🔄 Refresh"
  filtersText = "📊 Lead Filters"
  allText = "📋 All Leads"
  panelText = "🏠 Admin Panel"
}

// ---------- LOAD INDEX ----------
var leadIndex = Bot.getProperty("LEAD_INDEX") || []

if (!Array.isArray(leadIndex)) {
  leadIndex = []
}

// ---------- COUNTS ----------
var totalCount = 0
var newCount = 0
var pendingCount = 0
var inProgressCount = 0
var acceptedCount = 0
var completedCount = 0
var rejectedCount = 0

for (var i = 0; i < leadIndex.length; i++) {
  var leadId = leadIndex[i]
  var lead = Bot.getProperty("LEAD_" + leadId)

  if (!lead) {
    continue
  }

  totalCount++

  var status = String(lead.status || "New").toLowerCase()

  if (status == "new") {
    newCount++
  } else if (status == "pending") {
    pendingCount++
  } else if (
    status == "in progress" ||
    status == "in_progress"
  ) {
    inProgressCount++
  } else if (status == "accepted") {
    acceptedCount++
  } else if (status == "completed") {
    completedCount++
  } else if (status == "rejected") {
    rejectedCount++
  }
}

// ---------- ACTIVE COUNT ----------
var activeCount =
  newCount +
  pendingCount +
  inProgressCount +
  acceptedCount

// ---------- SAME MESSAGE EDIT ----------
function showStats(text, buttons) {
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

// ---------- STATS TEXT ----------
var text =
  title +
  "\n\n" +
  "━━━━━━━━━━━━━━━━━━━━\n" +
  "ℹ️ " +
  description +
  "\n" +
  "━━━━━━━━━━━━━━━━━━━━\n\n" +
  "📋 <b>Total Leads:</b> " +
  totalCount +
  "\n\n" +
  "🟢 <b>New Leads:</b> " +
  newCount +
  "\n" +
  "🟡 <b>Pending Leads:</b> " +
  pendingCount +
  "\n" +
  "🔵 <b>In Progress:</b> " +
  inProgressCount +
  "\n" +
  "✅ <b>Accepted Leads:</b> " +
  acceptedCount +
  "\n" +
  "📥 <b>Active Leads:</b> " +
  activeCount +
  "\n" +
  "🏆 <b>Completed Leads:</b> " +
  completedCount +
  "\n" +
  "❌ <b>Rejected Leads:</b> " +
  rejectedCount +
  "\n\n" +
  "━━━━━━━━━━━━━━━━━━━━"

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: refreshText,
      callback_data: "LEAD_ADMIN_STATS"
    }
  ],
  [
    {
      text: filtersText,
      callback_data: "LEAD_ADMIN_ALL"
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
showStats(text, buttons)
