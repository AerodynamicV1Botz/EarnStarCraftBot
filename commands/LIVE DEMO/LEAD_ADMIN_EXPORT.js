/*CMD
  command: LEAD_ADMIN_EXPORT
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
// SCRIPT 173 — UPDATED VERSION
// COMMAND NAME: LEAD_ADMIN_EXPORT
// STEP 5.4.1.27 — EXPORT LEADS DATA
// 📁 Lead Management / Admin Export
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
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
var emptyText = ""
var backText = ""
var statsText = ""
var panelText = ""

if (lang == "english") {
  title = "📤 <b>EXPORT LEADS</b>"
  description = "Lead data is ready in CSV format."
  emptyText = "No leads available for export."
  backText = "⬅️ Lead Management"
  statsText = "📊 Statistics"
  panelText = "🏠 Admin Panel"
} else if (lang == "gujarati") {
  title = "📤 <b>લીડ એક્સપોર્ટ</b>"
  description = "લીડ ડેટા CSV ફોર્મેટમાં તૈયાર છે."
  emptyText = "એક્સપોર્ટ કરવા માટે કોઈ લીડ ઉપલબ્ધ નથી."
  backText = "⬅️ લીડ મેનેજમેન્ટ"
  statsText = "📊 આંકડા"
  panelText = "🏠 એડમિન પેનલ"
} else {
  title = "📤 <b>EXPORT LEADS</b>"
  description = "Lead data CSV format mein ready hai."
  emptyText = "Export karne ke liye koi lead available nahi hai."
  backText = "⬅️ Lead Management"
  statsText = "📊 Statistics"
  panelText = "🏠 Admin Panel"
}

// ---------- LOAD INDEX ----------
var leadIndex = Bot.getProperty("LEAD_INDEX") || []

if (!Array.isArray(leadIndex)) {
  leadIndex = []
}

// ---------- CSV HEADER ----------
var csv =
  "Lead ID,Name,Contact,Service,Requirement,Status,Created At\n"

// ---------- COUNT ----------
var exportCount = 0

// ---------- CSV ESCAPE ----------
function csvEscape(value) {
  value = String(value || "")
  value = value.replace(/"/g, '""')
  return '"' + value + '"'
}

// ---------- BUILD CSV ----------
for (var i = 0; i < leadIndex.length; i++) {
  var leadId = leadIndex[i]
  var lead = Bot.getProperty("LEAD_" + leadId)

  if (!lead) {
    continue
  }

  var itemLeadId = lead.lead_id || lead.leadId || leadId
  var itemName = lead.name || lead.full_name || ""
  var itemContact =
    lead.contact ||
    lead.mobile ||
    lead.phone ||
    ""
  var itemService = lead.service || ""
  var itemRequirement =
    lead.requirement ||
    lead.lead_requirement ||
    ""
  var itemStatus = lead.status || "New"
  var itemCreated = lead.created_at || ""

  csv +=
    csvEscape(itemLeadId) +
    "," +
    csvEscape(itemName) +
    "," +
    csvEscape(itemContact) +
    "," +
    csvEscape(itemService) +
    "," +
    csvEscape(itemRequirement) +
    "," +
    csvEscape(itemStatus) +
    "," +
    csvEscape(itemCreated) +
    "\n"

  exportCount++
}

// ---------- EMPTY STATE ----------
if (exportCount == 0) {
  Api.sendMessage({
    chat_id: uid,
    text:
      title +
      "\n\n━━━━━━━━━━━━━━━━━━━━\n" +
      "ℹ️ " +
      emptyText +
      "\n━━━━━━━━━━━━━━━━━━━━",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
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
    }
  })

  return
}

// ---------- CSV MESSAGE LIMIT ----------
var maxLength = 3800
var csvParts = []

for (var start = 0; start < csv.length; start += maxLength) {
  csvParts.push(
    csv.substring(start, start + maxLength)
  )
}

// ---------- SEND EXPORT INFO ----------
Api.sendMessage({
  chat_id: uid,
  text:
    title +
    "\n\n━━━━━━━━━━━━━━━━━━━━\n" +
    "✅ <b>" +
    exportCount +
    "</b> leads exported.\n\n" +
    "📌 " +
    description +
    "\n" +
    "📄 Neeche CSV data diya gaya hai.\n" +
    "━━━━━━━━━━━━━━━━━━━━",
  parse_mode: "HTML"
})

// ---------- SEND CSV PARTS ----------
for (var j = 0; j < csvParts.length; j++) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "<code>" +
      csvParts[j]
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;") +
      "</code>",
    parse_mode: "HTML"
  })
}

// ---------- FOOTER ----------
Api.sendMessage({
  chat_id: uid,
  text: "📤 <b>Export completed.</b>",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: backText,
          callback_data: "LEAD_ADMIN_ALL"
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
  }
})
