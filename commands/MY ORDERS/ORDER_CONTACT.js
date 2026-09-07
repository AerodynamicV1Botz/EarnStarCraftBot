/*CMD
  command: ORDER_CONTACT
  help: 
  need_reply: false
  auto_retry_time: 
  folder: MY ORDERS

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
// 🆔 GET ORDER ID
// ==========================================

var orderId = params

if (!orderId) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "⚠️ Order ID missing"
  })
  return
}

// ==========================================
// 📦 GET ORDER
// ==========================================

var order = Bot.getProperty(
  "ORDER_" + orderId
)

if (!order) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ Order not found"
  })
  return
}

// ==========================================
// 👤 CLIENT ID
// ==========================================

var clientId = order.userId

if (!clientId) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ Client ID not found"
  })
  return
}

// ==========================================
// 👤 GET CLIENT DATA
// ==========================================

var clientData = Bot.getProperty(
  "USER_" + clientId
) || {}

// ==========================================
// 📞 CLIENT INFO
// ==========================================

var clientName =
  order.name ||
  clientData.name ||
  "User"

var username =
  clientData.username ||
  "Not available"

var contact =
  order.contact ||
  "Not provided"

// ==========================================
// ✅ CALLBACK
// ==========================================

Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "📞 Client details opened"
})

// ==========================================
// 📩 SEND CLIENT DETAILS
// ==========================================

Api.sendMessage({

  chat_id: uid,

  text:
    "📞 <b>CLIENT CONTACT</b>\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "📦 <b>Order ID:</b>\n" +
    "<code>" + orderId + "</code>\n\n" +

    "👤 <b>Name:</b>\n" +
    clientName + "\n\n" +

    "🆔 <b>Telegram ID:</b>\n" +
    "<code>" + clientId + "</code>\n\n" +

    "👤 <b>Username:</b>\n" +
    username + "\n\n" +

    "📞 <b>Contact:</b>\n" +
    contact + "\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "📌 You can contact the client using the button below.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [

      [
        {
          text: "💬 Open Client Chat",
          url: "tg://user?id=" + clientId
        }
      ],

      [
        {
          text: "📦 View Order",
          callback_data:
            "ADMIN_ORDER " + orderId
        }
      ],

      [
        {
          text: "📜 Order History",
          callback_data:
            "ADMIN_ORDER_HISTORY " + orderId
        }
      ],

      [
        {
          text: "📦 All Orders",
          callback_data:
            "ADMIN_ORDERS"
        }
      ],

      [
        {
          text: "👑 Admin Panel",
          callback_data:
            "ADMIN_PANEL"
        }
      ]

    ]
  }

})
