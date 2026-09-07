/*CMD
  command: LEAD_ADMIN_REJECTED
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
// SCRIPT 168 — UPDATED VERSION
// COMMAND NAME: LEAD_ADMIN_REJECTED
// STEP 5.4.1.22 — REJECTED LEADS
// 📁 Lead Management / Admin Rejected Leads
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
var adminData = Bot.getProperty("USER_" + uid) || {}
var lang = adminData.language || "hinglish"

// ---------- TEXT ----------
var title = ""
var emptyText = ""
var viewText = ""
var restoreText = ""
var allText = ""
var backText = ""
var panelText = ""

if (lang == "english") {
  title = "❌ <b>REJECTED LEADS</b>"
  emptyText = "No rejected leads found."
  viewText = "👁️ View"
  restoreText = "♻️ Restore"
  allText = "📋 All Leads"
  backText = "⬅️ Back"
  panelText = "🏠 Admin Panel"
} else if (lang == "gujarati") {
  title = "❌ <b>રિજેક્ટ થયેલી લીડ્સ</b>"
  emptyText = "કોઈ રિજેક્ટ થયેલી લીડ મળી નથી."
  viewText = "👁️ જુઓ"
  restoreText = "♻️ પુનઃસ્થાપિત"
  allText = "📋 બધી લીડ્સ"
  backText = "⬅️ પાછા"
  panelText = "🏠 એડમિન પેનલ"
} else {
  title = "❌ <b>REJECTED LEADS</b>"
  emptyText = "Koi rejected lead nahi mili."
  viewText = "👁️ View"
  restoreText = "♻️ Restore"
  allText = "📋 All Leads"
  backText = "⬅️ Back"
  panelText = "🏠 Admin Panel"
}

// ---------- LOAD INDEX ----------
var leadIndex = Bot.getProperty("LEAD_INDEX") || []

if (!Array.isArray(leadIndex)) {
  leadIndex = []
}

// ---------- SAME MESSAGE EDIT ----------
function showRejected(text, buttons) {
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

// ---------- FIND REJECTED LEADS ----------
var rejectedLeads = []

for (var i = 0; i < leadIndex.length; i++) {
  var leadId = leadIndex[i]
  var lead = Bot.getProperty("LEAD_" + leadId)

  if (!lead) {
    continue
  }

  var status = String(lead.status || "").toLowerCase()

  if (status == "rejected") {
    rejectedLeads.push({
      id: leadId,
      data: lead
    })
  }
}

// ---------- EMPTY ----------
if (rejectedLeads.length == 0) {
  showRejected(
    title +
      "\n\n━━━━━━━━━━━━━━━━━━━━\n" +
      "ℹ️ " +
      emptyText +
      "\n━━━━━━━━━━━━━━━━━━━━",
    [
      [
        {
          text: allText,
          callback_data: "LEAD_ADMIN"
        }
      ],
      [
        {
          text: backText,
          callback_data: "LEAD_ADMIN_ALL"
        },
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
  "\n\n━━━━━━━━━━━━━━━━━━━━\n" +
  "📊 <b>Total:</b> " +
  rejectedLeads.length +
  "\n━━━━━━━━━━━━━━━━━━━━"

var buttons = []

for (var j = 0; j < rejectedLeads.length; j++) {
  var item = rejectedLeads[j]
  var data = item.data

  var leadName =
    data.name ||
    data.full_name ||
    data.lead_name ||
    "Unknown User"

  var service =
    data.service ||
    data.lead_service ||
    "Service not selected"

  buttons.push([
    {
      text: viewText + " " + leadName,
      callback_data: "LEAD_REJECTED_VIEW_" + item.id
    }
  ])

  buttons.push([
    {
      text: restoreText,
      callback_data: "LEAD_ADMIN_RESTORE_" + item.id
    }
  ])

  text +=
    "\n\n❌ <b>" +
    leadName +
    "</b>" +
    "\n🆔 <code>" +
    item.id +
    "</code>" +
    "\n🛠️ " +
    service
}

buttons.push([
  {
    text: allText,
    callback_data: "LEAD_ADMIN"
  }
])

buttons.push([
  {
    text: backText,
    callback_data: "LEAD_ADMIN_ALL"
  },
  {
    text: panelText,
    callback_data: "ADMIN_PANEL"
  }
])

// ---------- SHOW ----------
showRejected(text, buttons)
