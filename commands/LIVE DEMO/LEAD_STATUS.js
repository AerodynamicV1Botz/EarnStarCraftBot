/*CMD
  command: LEAD_STATUS
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
// SCRIPT 161 — UPDATED VERSION
// COMMAND NAME: LEAD_STATUS
// STEP 5.4.1.15 — UPDATE LEAD STATUS
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

var leadId = callbackData.replace("LEAD_STATUS_", "").trim()

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

// ---------- STATUS SCREEN ----------
var statusText =
  "🔄 <b>UPDATE LEAD STATUS</b>\n\n" +
  "🆔 <b>Lead ID:</b> <code>" + leadId + "</code>\n" +
  "👤 <b>Name:</b> " + leadData.name + "\n" +
  "📊 <b>Current Status:</b> " + leadData.status + "\n\n" +
  "👇 <b>Select new status:</b>"

var statusButtons = [
  [
    {
      text: "🟡 Pending",
      callback_data: "LEAD_STATUS_SET_pending_" + leadId
    },
    {
      text: "🔵 In Progress",
      callback_data: "LEAD_STATUS_SET_in_progress_" + leadId
    }
  ],
  [
    {
      text: "🟢 Completed",
      callback_data: "LEAD_STATUS_SET_completed_" + leadId
    },
    {
      text: "🔴 Rejected",
      callback_data: "LEAD_STATUS_SET_rejected_" + leadId
    }
  ],
  [
    {
      text: "⚪ New",
      callback_data: "LEAD_STATUS_SET_new_" + leadId
    }
  ],
  [
    {
      text: "🔙 Back to Lead",
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
function showStatusScreen(messageText, buttons) {
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

showStatusScreen(statusText, statusButtons)
