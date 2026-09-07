/*CMD
  command: LEAD_BACK
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
// SCRIPT 163 — UPDATED VERSION
// COMMAND NAME: LEAD_BACK
// STEP 5.4.1.17 — BACK TO LEAD DETAILS
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

// ---------- GET CALLBACK DATA ----------
var callbackData = ""

if (
  typeof request !== "undefined" &&
  request &&
  request.data
) {
  callbackData = request.data
}

// ---------- GET LEAD ID ----------
var leadId = callbackData.replace("LEAD_BACK_", "").trim()

if (!leadId) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ Lead ID not found."
  })
  return
}

// ---------- GET LEAD ----------
var leadData = Bot.getProperty("LEAD_" + leadId)

if (!leadData) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ Lead not found."
  })
  return
}

// ---------- LEAD DETAILS ----------
var leadText =
  "📋 <b>LEAD DETAILS</b>\n\n" +
  "🆔 <b>Lead ID:</b> <code>" + leadData.lead_id + "</code>\n" +
  "👤 <b>Name:</b> " + leadData.name + "\n" +
  "📱 <b>Contact:</b> " + leadData.contact + "\n" +
  "🎯 <b>Service:</b> " + leadData.service + "\n" +
  "💬 <b>Requirement:</b> " + leadData.requirement + "\n" +
  "🌐 <b>Language:</b> " + leadData.language + "\n" +
  "📊 <b>Status:</b> " + leadData.status + "\n" +
  "🕒 <b>Created:</b> " + leadData.created_at + "\n" +
  "👤 <b>User ID:</b> <code>" + leadData.user_id + "</code>"

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: "✅ Accept Lead",
      callback_data: "LEAD_ACCEPT_" + leadId
    },
    {
      text: "❌ Reject Lead",
      callback_data: "LEAD_REJECT_" + leadId
    }
  ],
  [
    {
      text: "💬 Reply to User",
      callback_data: "LEAD_REPLY_" + leadId
    }
  ],
  [
    {
      text: "🔄 Update Status",
      callback_data: "LEAD_STATUS_" + leadId
    }
  ],
  [
    {
      text: "🔙 Back to Lead",
      callback_data: "LEAD_BACK_" + leadId
    }
  ]
]

// ---------- SAME MESSAGE EDIT ----------
function showLeadDetails(messageText, replyButtons) {
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

showLeadDetails(leadText, buttons)
