/*CMD
  command: LEAD_ACCEPTT
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
// SCRIPT 156 — UPDATED VERSION
// COMMAND NAME: LEAD_ACCEPT
// STEP 5.4.1.10 — ACCEPT LEAD
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
var leadId = callbackData.replace("LEAD_ACCEPT_", "").trim()

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

// ---------- ALREADY ACCEPTED ----------
if (String(leadData.status).toLowerCase() == "accepted") {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "ℹ️ Lead already accepted."
  })

  Api.sendMessage({
    chat_id: uid,
    text:
      "ℹ️ <b>LEAD ALREADY ACCEPTED</b>\n\n" +
      "🆔 <b>Lead ID:</b> <code>" + leadId + "</code>\n\n" +
      "This lead has already been accepted.",
    parse_mode: "HTML"
  })

  return
}

// ---------- UPDATE LEAD STATUS ----------
leadData.status = "accepted"
leadData.accepted_at = new Date().toISOString()
leadData.accepted_by = String(uid)

Bot.setProperty(
  "LEAD_" + leadId,
  leadData,
  "json"
)

// ---------- UPDATE USER DATA ----------
var clientData = Bot.getProperty(
  "USER_" + leadData.user_id
) || {}

clientData.leadStatus = "accepted"
clientData.lastLeadId = leadId

Bot.setProperty(
  "USER_" + leadData.user_id,
  clientData,
  "json"
)

// ---------- ADMIN CONFIRMATION ----------
Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "✅ Lead accepted"
})

// ---------- ADMIN MESSAGE ----------
var adminText =
  "✅ <b>LEAD ACCEPTED</b>\n\n" +
  "🆔 <b>Lead ID:</b> <code>" + leadId + "</code>\n" +
  "👤 <b>Name:</b> " + leadData.name + "\n" +
  "📱 <b>Contact:</b> " + leadData.contact + "\n" +
  "🎯 <b>Service:</b> " + leadData.service + "\n" +
  "📊 <b>Status:</b> ACCEPTED\n\n" +
  "👤 <b>User ID:</b> <code>" + leadData.user_id + "</code>\n" +
  "🕒 <b>Accepted At:</b> " + leadData.accepted_at

var adminButtons = [
  [
    {
      text: "📋 View Lead",
      callback_data: "LEAD_VIEW_" + leadId
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
function showAdminMessage(messageText, replyButtons) {
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

showAdminMessage(adminText, adminButtons)

// ---------- CLIENT NOTIFICATION ----------
var clientText =
  "🎉 <b>YOUR LEAD HAS BEEN ACCEPTED!</b>\n\n" +
  "🆔 <b>Lead ID:</b>\n" +
  "<code>" + leadId + "</code>\n\n" +
  "🟢 <b>Status:</b> ACCEPTED\n\n" +
  "Your enquiry has been reviewed and accepted by our team.\n\n" +
  "Our team will contact you regarding the next steps."

Api.sendMessage({
  chat_id: leadData.user_id,
  text: clientText,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📋 My Lead",
          callback_data: "LEAD_VIEW_USER_" + leadId
        }
      ],
      [
        {
          text: "🏠 Main Menu",
          callback_data: "BACK_MAIN_MENU"
        }
      ]
    ]
  }
})
