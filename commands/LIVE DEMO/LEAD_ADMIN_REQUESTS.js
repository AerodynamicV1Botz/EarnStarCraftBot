/*CMD
  command: LEAD_ADMIN_REQUESTS
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
// SCRIPT 165 — UPDATED VERSION
// COMMAND NAME: LEAD_ADMIN_REQUESTS
// STEP 5.4.1.19 — ACTIVE LEAD REQUESTS
// 📁 Admin Lead Management
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var OWNER_ID = "7897324623"

if (String(uid) !== OWNER_ID) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ <b>Access Denied</b>\n\nSirf admin is section ko access kar sakta hai.",
    parse_mode: "HTML"
  })
  return
}

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

var adminLang = "hinglish"

var adminData = Bot.getProperty("USER_" + uid) || {}
adminLang = adminData.language || "hinglish"

var leadIndex = Bot.getProperty("LEAD_INDEX") || []

if (!Array.isArray(leadIndex)) {
  leadIndex = []
}

var activeLeads = []

for (var i = 0; i < leadIndex.length; i++) {
  var leadId = leadIndex[i]
  var lead = Bot.getProperty("LEAD_" + leadId)

  if (!lead) {
    continue
  }

  var status = String(lead.status || "New").toLowerCase()

  if (
    status === "new" ||
    status === "pending" ||
    status === "in_progress" ||
    status === "in progress"
  ) {
    activeLeads.push(lead)
  }
}

activeLeads.sort(function(a, b) {
  var timeA = new Date(a.created_at || 0).getTime()
  var timeB = new Date(b.created_at || 0).getTime()

  return timeB - timeA
})

var text = ""
var buttons = []

if (adminLang === "english") {
  text =
    "📥 <b>Active Lead Requests</b>\n\n" +
    "New, pending and in-progress customer enquiries:\n\n"
} else if (adminLang === "gujarati") {
  text =
    "📥 <b>ચાલુ લીડ રિક્વેસ્ટ્સ</b>\n\n" +
    "નવી, પેન્ડિંગ અને ચાલુ ગ્રાહક પૂછપરછ:\n\n"
} else {
  text =
    "📥 <b>Active Lead Requests</b>\n\n" +
    "New, pending aur in-progress customer enquiries:\n\n"
}

if (activeLeads.length === 0) {
  if (adminLang === "english") {
    text += "✅ No active lead requests found."
  } else if (adminLang === "gujarati") {
    text += "✅ કોઈ ચાલુ લીડ રિક્વેસ્ટ મળી નથી."
  } else {
    text += "✅ Abhi koi active lead request nahi hai."
  }
} else {
  for (var j = 0; j < activeLeads.length; j++) {
    var item = activeLeads[j]

    var itemStatus = String(item.status || "New")
    var statusIcon = "🆕"

    if (itemStatus.toLowerCase() === "pending") {
      statusIcon = "⏳"
    }

    if (
      itemStatus.toLowerCase() === "in_progress" ||
      itemStatus.toLowerCase() === "in progress"
    ) {
      statusIcon = "🔄"
    }

    text +=
      statusIcon +
      " <b>" + (j + 1) + ". " +
      String(item.name || "Unknown") +
      "</b>\n" +
      "🆔 <code>" + String(item.lead_id || "N/A") + "</code>\n" +
      "📌 Status: <b>" + itemStatus + "</b>\n" +
      "🛠 Service: " + String(item.service || "N/A") + "\n\n"

    buttons.push([
      {
        text: "👁 View " + (j + 1),
        callback_data: "LEAD_VIEW_" + String(item.lead_id)
      }
    ])
  }
}

if (adminLang === "english") {
  buttons.push([
    {
      text: "🔄 Refresh",
      callback_data: "LEAD_ADMIN_REQUESTS"
    },
    {
      text: "📋 All Leads",
      callback_data: "LEAD_ADMIN"
    }
  ])

  buttons.push([
    {
      text: "🏠 Admin Panel",
      callback_data: "ADMIN_PANEL"
    }
  ])
} else if (adminLang === "gujarati") {
  buttons.push([
    {
      text: "🔄 રિફ્રેશ",
      callback_data: "LEAD_ADMIN_REQUESTS"
    },
    {
      text: "📋 બધી લીડ્સ",
      callback_data: "LEAD_ADMIN"
    }
  ])

  buttons.push([
    {
      text: "🏠 એડમિન પેનલ",
      callback_data: "ADMIN_PANEL"
    }
  ])
} else {
  buttons.push([
    {
      text: "🔄 Refresh",
      callback_data: "LEAD_ADMIN_REQUESTS"
    },
    {
      text: "📋 All Leads",
      callback_data: "LEAD_ADMIN"
    }
  ])

  buttons.push([
    {
      text: "🏠 Admin Panel",
      callback_data: "ADMIN_PANEL"
    }
  ])
}

function showLeadRequests(text, buttons) {
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

showLeadRequests(text, buttons)
