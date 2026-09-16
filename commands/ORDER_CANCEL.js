/*CMD
  command: ORDER_CANCEL
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

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
// 🔐 STATUS PROTECTION
// ==========================================

var currentStatus = String(
  order.status || "pending"
).toLowerCase()

if (currentStatus === "cancelled") {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "⚠️ Order is already cancelled"
  })
  return
}

if (currentStatus === "completed") {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ Completed order cannot be cancelled"
  })
  return
}

// ==========================================
// 🔴 CANCEL ORDER
// ==========================================

var now = new Date().toISOString()

order.status = "cancelled"
order.cancelledAt = now

Bot.setProperty(
  "ORDER_" + orderId,
  order,
  "json"
)

// ==========================================
// 📜 ORDER HISTORY
// ==========================================

var history = Bot.getProperty(
  "ORDER_HISTORY_" + orderId
) || []

history.push({
  status: "cancelled",
  time: now
})

Bot.setProperty(
  "ORDER_HISTORY_" + orderId,
  history,
  "json"
)

// ==========================================
// 👤 UPDATE USER STATUS
// ==========================================

var clientData = Bot.getProperty(
  "USER_" + order.userId
) || {}

clientData.orderStatus = "cancelled"

Bot.setProperty(
  "USER_" + order.userId,
  clientData,
  "json"
)

// ==========================================
// ✅ CALLBACK
// ==========================================

Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "🔴 Order cancelled"
})

// ==========================================
// 👑 ADMIN CONFIRMATION
// ==========================================

Api.sendMessage({
  chat_id: uid,

  text:
    "🔴 <b>ORDER CANCELLED</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🆔 <b>Order ID:</b>\n" +
    "<code>" + orderId + "</code>\n\n" +
    "📊 <b>Status:</b> 🔴 CANCELLED\n\n" +
    "🕐 <b>Cancelled:</b>\n" +
    new Date().toLocaleString("en-IN") +
    "\n\n" +
    "📩 The client has been notified.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
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
          text: "👑 Admin Panel",
          callback_data:
            "ADMIN_PANEL"
        }
      ]
    ]
  }
})

// ==========================================
// 📩 CLIENT NOTIFICATION
// ==========================================

Api.sendMessage({
  chat_id: order.userId,

  text:
    "🔴 <b>YOUR ORDER HAS BEEN CANCELLED</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🆔 <b>Order ID:</b>\n" +
    "<code>" + orderId + "</code>\n\n" +
    "📊 <b>Status:</b> 🔴 CANCELLED\n\n" +
    "Your order has been marked as cancelled by our team.\n\n" +
    "📞 If you believe this was unexpected or you want to discuss the project, please contact our team.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📦 My Order",
          callback_data:
            "MY_ORDER " + orderId
        }
      ],
      [
        {
          text: "📜 Order History",
          callback_data:
            "MY_ORDER_HISTORY " + orderId
        }
      ],
      [
        {
          text: "📞 Contact Team",
          url: "https://t.me/TeamEarnStar"
        }
      ],
      [
        {
          text: "📦 My Orders",
          callback_data:
            "MY_ORDERS"
        },
        {
          text: "🏠 Main Menu",
          callback_data:
            "BACK_MAIN_MENU"
        }
      ]
    ]
  }
})
