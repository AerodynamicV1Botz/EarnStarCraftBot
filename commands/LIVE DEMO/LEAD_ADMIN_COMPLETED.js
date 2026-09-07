/*CMD
  command: LEAD_ADMIN_COMPLETED
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
// SCRIPT 167 — UPDATED VERSION
// COMMAND NAME: LEAD_ADMIN_COMPLETED
// STEP 5.4.1.21 — COMPLETED LEADS
// 📁 Lead Management / Completed Requests
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
var emptyText = ""
var refreshText = ""
var allText = ""
var filterText = ""
var panelText = ""

if (lang == "english") {
  title = "✅ <b>COMPLETED LEADS</b>"
  emptyText = "No completed leads found."
  refreshText = "🔄 Refresh"
  allText = "📋 All Leads"
  filterText = "📊 Lead Filters"
  panelText = "🏠 Admin Panel"
} else if (lang == "gujarati") {
  title = "✅ <b>પૂર્ણ થયેલી લીડ્સ</b>"
  emptyText = "કોઈ પૂર્ણ થયેલી લીડ મળી નથી."
  refreshText = "🔄 રિફ્રેશ"
  allText = "📋 બધી લીડ્સ"
  filterText = "📊 લીડ ફિલ્ટર્સ"
  panelText = "🏠 એડમિન પેનલ"
} else {
  title = "✅ <b>COMPLETED LEADS</b>"
  emptyText = "Abhi koi completed lead nahi mili."
  refreshText = "🔄 Refresh"
  allText = "📋 All Leads"
  filterText = "📊 Lead Filters"
  panelText = "🏠 Admin Panel"
}

// ---------- SAME MESSAGE EDIT ----------
function showCompleted(text, buttons) {
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

// ---------- LOAD INDEX ----------
var leadIndex = Bot.getProperty("LEAD_INDEX") || []

if (!Array.isArray(leadIndex)) {
  leadIndex = []
}

// ---------- FIND COMPLETED LEADS ----------
var completedLeads = []

for (var i = 0; i < leadIndex.length; i++) {
  var leadId = leadIndex[i]
  var lead = Bot.getProperty("LEAD_" + leadId)

  if (!lead) {
    continue
  }

  var status = String(lead.status || "").toLowerCase()

  if (status == "completed") {
    completedLeads.push(lead)
  }
}

// ---------- EMPTY STATE ----------
if (completedLeads.length == 0) {
  showCompleted(
    title +
      "\n\n━━━━━━━━━━━━━━━━━━━━\n" +
      "ℹ️ " +
      emptyText +
      "\n━━━━━━━━━━━━━━━━━━━━",
    [
      [
        {
          text: refreshText,
          callback_data: "LEAD_ADMIN_COMPLETED"
        }
      ],
      [
        {
          text: allText,
          callback_data: "LEAD_ADMIN"
        },
        {
          text: filterText,
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

  return
}

// ---------- BUILD LIST ----------
var text =
  title +
  "\n\n━━━━━━━━━━━━━━━━━━━━\n"

var buttons = []

for (var j = 0; j < completedLeads.length; j++) {
  var item = completedLeads[j]

  var itemLeadId = item.lead_id || item.leadId || "Unknown"
  var itemName = item.name || "Unknown User"
  var itemService = item.service || "Service not selected"

  text +=
    "👤 <b>" +
    itemName +
    "</b>\n" +
    "🆔 <code>" +
    itemLeadId +
    "</code>\n" +
    "🛠️ " +
    itemService +
    "\n" +
    "📌 <b>Status:</b> Completed\n" +
    "━━━━━━━━━━━━━━━━━━━━\n"

  buttons.push([
    {
      text: "👁️ " + itemName,
      callback_data: "LEAD_VIEW_" + itemLeadId
    }
  ])
}

// ---------- FOOTER ----------
buttons.push([
  {
    text: refreshText,
    callback_data: "LEAD_ADMIN_COMPLETED"
  },
  {
    text: allText,
    callback_data: "LEAD_ADMIN"
  }
])

buttons.push([
  {
    text: filterText,
    callback_data: "LEAD_ADMIN_ALL"
  }
])

buttons.push([
  {
    text: panelText,
    callback_data: "ADMIN_PANEL"
  }
])

// ---------- SHOW ----------
showCompleted(text, buttons)
