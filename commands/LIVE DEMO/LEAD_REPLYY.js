/*CMD
  command: LEAD_REPLYY
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
// SCRIPT 158 — UPDATED VERSION
// COMMAND NAME: LEAD_REPLY
// STEP 5.4.1.12 — REPLY TO LEAD USER
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

var leadId = callbackData.replace("LEAD_REPLY_", "").trim()

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

// ---------- SAVE REPLY SESSION ----------
Bot.setProperty(
  "LEAD_REPLY_" + uid,
  {
    lead_id: leadId,
    user_id: leadData.user_id,
    step: "WAITING_MESSAGE"
  },
  "json"
)

// ---------- CALLBACK CONFIRMATION ----------
Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "💬 Reply mode opened"
})

// ---------- REPLY SCREEN ----------
var replyText =
  "💬 <b>REPLY TO LEAD USER</b>\n\n" +
  "🆔 <b>Lead ID:</b> <code>" + leadId + "</code>\n" +
  "👤 <b>Name:</b> " + leadData.name + "\n" +
  "📱 <b>Contact:</b> " + leadData.contact + "\n" +
  "🎯 <b>Service:</b> " + leadData.service + "\n\n" +
  "✍️ <b>Apna message type karo:</b>\n" +
  "Message user ko directly bheja jayega."

var replyButtons = [
  [
    {
      text: "❌ Cancel Reply",
      callback_data: "LEAD_REPLY_CANCEL_" + leadId
    }
  ],
  [
    {
      text: "📋 View Lead",
      callback_data: "LEAD_VIEW_" + leadId
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
function showReplyScreen(messageText, buttons) {
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

showReplyScreen(replyText, replyButtons)
