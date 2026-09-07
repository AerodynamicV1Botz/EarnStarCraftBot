/*CMD
  command: LEAD_ACCEPT
  help: 
  need_reply: false
  auto_retry_time: 
  folder: CONTACT

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var uid = user.telegramid

// ==========================================
// 👑 ADMIN CHECK
// ==========================================

if (String(uid) !== "7897324623") {
  return
}

// ==========================================
// 🆔 GET REFERENCE ID
// ==========================================

var refId = params

if (!refId) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "⚠️ Reference ID missing"
  })
  return
}

// ==========================================
// 📋 GET ENQUIRY
// ==========================================

var enquiry = Bot.getProperty("ENQUIRY_" + refId)

if (!enquiry) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ Enquiry not found"
  })
  return
}

// ==========================================
// 🟢 UPDATE STATUS
// ==========================================

enquiry.status = "accepted"
enquiry.acceptedAt = new Date().toISOString()

Bot.setProperty("ENQUIRY_" + refId, enquiry, "json")

// ==========================================
// 👤 UPDATE USER
// ==========================================

var clientData = Bot.getProperty("USER_" + enquiry.userId) || {}

clientData.enquiryStatus = "accepted"

Bot.setProperty("USER_" + enquiry.userId, clientData, "json")

// ==========================================
// ✅ ADMIN CONFIRMATION
// ==========================================

Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "✅ Enquiry accepted"
})

Api.sendMessage({
  chat_id: uid,

  text:
    "✅ <b>ENQUIRY ACCEPTED</b>\n\n" +
    "🆔 Reference: <code>" +
    refId +
    "</code>\n\n" +
    "The client has been notified.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📋 View Enquiry",
          callback_data: "ADMIN_ENQUIRY " + refId
        }
      ],
      [
        {
          text: "📦 Create Order",
          callback_data: "CREATE_ORDER " + refId
        }
      ],
      [
        {
          text: "📋 All Enquiries",
          callback_data: "ADMIN_ENQUIRIES"
        },
        {
          text: "👑 Admin Panel",
          callback_data: "ADMIN_PANEL"
        }
      ]
    ]
  }
})

// ==========================================
// 📩 CLIENT NOTIFICATION
// ==========================================

Api.sendMessage({
  chat_id: enquiry.userId,

  text:
    "🎉 <b>YOUR ENQUIRY HAS BEEN ACCEPTED!</b>\n\n" +
    "🆔 <b>Reference ID:</b>\n" +
    "<code>" +
    refId +
    "</code>\n\n" +
    "🟢 <b>Status:</b> ACCEPTED\n\n" +
    "Great! Your project enquiry has been reviewed and accepted.\n\n" +
    "Our team will contact you regarding the next steps.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📋 My Enquiry",
          callback_data: "MY_ENQUIRY"
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

