/*CMD
  command: LEAD_REPLY_CANCEL
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
// SCRIPT 160 — UPDATED VERSION
// COMMAND NAME: LEAD_REPLY_CANCEL
// STEP 5.4.1.14 — CANCEL LEAD REPLY
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
    callback_query_id: request.id,
    text: "❌ Reply cancelled"
  })
}

// ---------- ADMIN CHECK ----------
if (String(uid) != adminId) {
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

var leadId = callbackData.replace("LEAD_REPLY_CANCEL_", "").trim()

if (!leadId) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ Lead ID not found."
  })
  return
}

// ---------- CLEAR REPLY SESSION ----------
Bot.setProperty(
  "LEAD_REPLY_" + uid,
  null
)

// ---------- GET LEAD ----------
var leadData = Bot.getProperty("LEAD_" + leadId)

if (!leadData) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ Lead not found."
  })
  return
}

// ---------- SCREEN TEXT ----------
var cancelText =
  "❌ <b>REPLY CANCELLED</b>\n\n" +
  "🆔 <b>Lead ID:</b> <code>" + leadId + "</code>\n" +
  "👤 <b>Name:</b> " + leadData.name + "\n" +
  "🎯 <b>Service:</b> " + leadData.service + "\n" +
  "📊 <b>Status:</b> " + leadData.status + "\n\n" +
  "You can reply again whenever needed."

var cancelButtons = [
  [
    {
      text: "📋 View Lead",
      callback_data: "LEAD_VIEW_" + leadId
    }
  ],
  [
    {
      text: "💬 Reply Again",
      callback_data: "LEAD_REPLY_" + leadId
    }
  ],
  [
    {
      text: "📋 All Leads",
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

// ---------- SAME MESSAGE EDIT ----------
function showCancelScreen(messageText, buttons) {
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
    text: messageText,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons
    }
  })
}

showCancelScreen(cancelText, cancelButtons)
