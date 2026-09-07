/*CMD
  command: LEAD_ADMIN
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
// SCRIPT 164 — UPDATED VERSION
// COMMAND NAME: LEAD_ADMIN
// STEP 5.4.1.18 — ALL LEADS
// 📁 Lead Collection → Admin Lead Details
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var adminId = "7897324623"

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

// ---------- ADMIN CHECK ----------
if (String(uid) != adminId) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ Access denied."
  })
  return
}

// ---------- GET ALL LEADS ----------
var allLeads = []

// Lead IDs ko ek separate property mein save karna zaroori hai
var leadIndex = Bot.getProperty("LEAD_INDEX") || []

if (!Array.isArray(leadIndex)) {
  leadIndex = []
}

for (var i = 0; i < leadIndex.length; i++) {
  var leadId = leadIndex[i]
  var leadData = Bot.getProperty("LEAD_" + leadId)

  if (leadData) {
    allLeads.push(leadData)
  }
}

// ---------- EMPTY CHECK ----------
if (allLeads.length == 0) {
  var emptyText =
    "📋 <b>ALL LEADS</b>\n\n" +
    "📭 Abhi koi lead available nahi hai."

  var emptyButtons = [
    [
      {
        text: "🔄 Refresh",
        callback_data: "LEAD_ADMIN"
      }
    ],
    [
      {
        text: "👑 Admin Panel",
        callback_data: "ADMIN_PANEL"
      }
    ]
  ]

  function showEmptyScreen(text, buttons) {
    if (
      typeof request !== "undefined" &&
      request &&
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

  showEmptyScreen(emptyText, emptyButtons)
  return
}

// ---------- LEAD LIST ----------
var listText =
  "📋 <b>ALL LEADS</b>\n\n" +
  "📊 <b>Total Leads:</b> " + allLeads.length + "\n\n"

var buttons = []

for (var j = 0; j < allLeads.length; j++) {
  var currentLead = allLeads[j]

  var currentLeadId = currentLead.lead_id || "UNKNOWN"
  var currentName = currentLead.name || "Unknown"
  var currentStatus = currentLead.status || "new"

  listText +=
    "🆔 <code>" + currentLeadId + "</code>\n" +
    "👤 " + currentName + "\n" +
    "📊 " + currentStatus.toUpperCase() + "\n\n"

  buttons.push([
    {
      text:
        "📋 " +
        currentName +
        " • " +
        currentStatus.toUpperCase(),

      callback_data: "LEAD_VIEW_" + currentLeadId
    }
  ])
}

// ---------- NAVIGATION ----------
buttons.push([
  {
    text: "🔄 Refresh",
    callback_data: "LEAD_ADMIN"
  }
])

buttons.push([
  {
    text: "👑 Admin Panel",
    callback_data: "ADMIN_PANEL"
  }
])

// ---------- SAME MESSAGE EDIT ----------
function showLeadList(messageText, replyButtons) {
  if (
    typeof request !== "undefined" &&
    request &&
    request.message &&
    request.message.message_id
  ) {
    try {
      Api.editMessageText({
        chat_id: uid,
        message_id: request.message.message_id,
        text: messageText,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: replyButtons
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
    text: messageText,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: replyButtons
    }
  })
}

showLeadList(listText, buttons)
