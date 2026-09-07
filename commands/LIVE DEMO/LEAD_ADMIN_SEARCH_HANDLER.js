/*CMD
  command: LEAD_ADMIN_SEARCH_HANDLER
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
// SCRIPT 170 — UPDATED VERSION
// COMMAND NAME: LEAD_ADMIN_SEARCH_HANDLER
// STEP 5.4.1.24 — SEARCH RESULT HANDLER
// 📁 Lead Management / Admin Search
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Search by Lead ID + Name + Mobile
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

// ---------- READ MESSAGE ----------
var searchText = ""

if (
  typeof message !== "undefined" &&
  message &&
  message.text
) {
  searchText = message.text
}

if (
  !searchText &&
  typeof request !== "undefined" &&
  request.message &&
  request.message.text
) {
  searchText = request.message.text
}

searchText = String(searchText || "").trim()

// ---------- SEARCH SESSION ----------
var session = Bot.getProperty("LEAD_SEARCH_" + uid)

if (
  !session ||
  session.step != "WAITING_QUERY"
) {
  Api.sendMessage({
    chat_id: uid,
    text: "⚠️ <b>Search session expired.</b>\n\nSearch button dobara open karo.",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🔎 Search Again",
            callback_data: "LEAD_ADMIN_SEARCH"
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

// ---------- EMPTY QUERY ----------
if (!searchText) {
  Api.sendMessage({
    chat_id: uid,
    text: "⚠️ <b>Search query empty hai.</b>\n\nLead ID, name ya mobile number bhejo.",
    parse_mode: "HTML"
  })
  return
}

// ---------- LANGUAGE ----------
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || session.language || "hinglish"

// ---------- TEXT ----------
var title = ""
var noResult = ""
var resultTitle = ""
var searchAgain = ""
var filterText = ""
var panelText = ""

if (lang == "english") {
  title = "🔎 <b>LEAD SEARCH</b>"
  noResult = "No matching lead found."
  resultTitle = "Matching leads:"
  searchAgain = "🔎 Search Again"
  filterText = "📊 Lead Filters"
  panelText = "🏠 Admin Panel"
} else if (lang == "gujarati") {
  title = "🔎 <b>લીડ શોધ</b>"
  noResult = "કોઈ મળતી લીડ મળી નથી."
  resultTitle = "મળેલી લીડ્સ:"
  searchAgain = "🔎 ફરી શોધો"
  filterText = "📊 લીડ ફિલ્ટર્સ"
  panelText = "🏠 એડમિન પેનલ"
} else {
  title = "🔎 <b>LEAD SEARCH</b>"
  noResult = "Koi matching lead nahi mili."
  resultTitle = "Matching leads:"
  searchAgain = "🔎 Search Again"
  filterText = "📊 Lead Filters"
  panelText = "🏠 Admin Panel"
}

// ---------- NORMALIZE SEARCH ----------
var query = searchText.toLowerCase()

// ---------- LOAD INDEX ----------
var leadIndex = Bot.getProperty("LEAD_INDEX") || []

if (!Array.isArray(leadIndex)) {
  leadIndex = []
}

// ---------- SEARCH LEADS ----------
var matches = []

for (var i = 0; i < leadIndex.length; i++) {
  var leadId = leadIndex[i]
  var lead = Bot.getProperty("LEAD_" + leadId)

  if (!lead) {
    continue
  }

  var storedLeadId = String(
    lead.lead_id || lead.leadId || leadId
  ).toLowerCase()

  var storedName = String(
    lead.name || lead.full_name || ""
  ).toLowerCase()

  var storedContact = String(
    lead.contact || lead.mobile || lead.phone || ""
  ).toLowerCase()

  var storedUsername = String(
    lead.username || ""
  ).toLowerCase()

  if (
    storedLeadId.indexOf(query) !== -1 ||
    storedName.indexOf(query) !== -1 ||
    storedContact.indexOf(query) !== -1 ||
    storedUsername.indexOf(query) !== -1
  ) {
    matches.push(lead)
  }
}

// ---------- CLEAR SESSION ----------
Bot.setProperty(
  "LEAD_SEARCH_" + uid,
  {
    step: "RESULT",
    query: searchText,
    result_count: matches.length,
    updated_at: Date.now()
  },
  "json"
)

// ---------- EMPTY RESULT ----------
if (matches.length == 0) {
  Api.sendMessage({
    chat_id: uid,
    text:
      title +
      "\n\n━━━━━━━━━━━━━━━━━━━━\n" +
      "🔍 <b>Search:</b> " +
      searchText +
      "\n\n❌ " +
      noResult +
      "\n━━━━━━━━━━━━━━━━━━━━",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: searchAgain,
            callback_data: "LEAD_ADMIN_SEARCH"
          }
        ],
        [
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
    }
  })

  return
}

// ---------- BUILD RESULT ----------
var text =
  title +
  "\n\n━━━━━━━━━━━━━━━━━━━━\n" +
  "🔍 <b>Search:</b> " +
  searchText +
  "\n" +
  "📌 <b>" +
  resultTitle +
  "</b>\n" +
  "━━━━━━━━━━━━━━━━━━━━\n"

var buttons = []

for (var j = 0; j < matches.length; j++) {
  var item = matches[j]

  var itemLeadId = item.lead_id || item.leadId || "Unknown"
  var itemName = item.name || item.full_name || "Unknown User"
  var itemService = item.service || "Not selected"
  var itemStatus = item.status || "New"

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
    "📌 <b>Status:</b> " +
    itemStatus +
    "\n" +
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
    text: searchAgain,
    callback_data: "LEAD_ADMIN_SEARCH"
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

// ---------- SEND RESULT ----------
Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
})
