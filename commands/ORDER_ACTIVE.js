/*CMD
  command: ORDER_ACTIVE
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

if (currentStatus === "active") {

  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "⚠️ Order is already active"
  })

  return
}

if (currentStatus === "completed") {

  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ Completed order cannot be activated"
  })

  return
}

if (currentStatus === "cancelled") {

  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ Cancelled order cannot be activated"
  })

  return
}

// ==========================================
// 🔵 ACTIVATE ORDER
// ==========================================

var now = new Date().toISOString()

order.status = "active"
order.activeAt = now

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
  status: "active",
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

clientData.orderStatus = "active"

Bot.setProperty(
  "USER_" + order.userId,
  clientData,
  "json"
)

// ==========================================
// ✅ ADMIN CALLBACK
// ==========================================

Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "🔵 Order is now ACTIVE"
})

// ==========================================
// 👑 ADMIN CONFIRMATION
// ==========================================

Api.sendMessage({

  chat_id: uid,

  text:
    "🔵 <b>ORDER ACTIVATED</b>\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🆔 <b>Order ID:</b>\n" +
    "<code>" + orderId + "</code>\n\n" +

    "📊 <b>Status:</b> 🔵 ACTIVE\n\n" +

    "🕐 <b>Activated:</b>\n" +
    new Date().toLocaleString("en-IN") +
    "\n\n" +

    "✅ The client has been notified.",

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
    "🔵 <b>YOUR ORDER IS NOW ACTIVE!</b>\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🆔 <b>Order ID:</b>\n" +
    "<code>" + orderId + "</code>\n\n" +

    "📊 <b>Status:</b> 🔵 ACTIVE\n\n" +

    "🚀 <b>Your project is now active.</b>\n\n" +

    "Our team can now begin working on your project based on the requirements you submitted.\n\n" +

    "📌 You can check your latest order status and history anytime from <b>My Order</b>.",

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

})// 🔵 UPDATE ORDER STATUS
// ==========================================

order.status = "active"
order.activeAt = new Date().toISOString()

Bot.setProperty(
  "ORDER_" + orderId,
  order,
  "json"
)

// ==========================================
// 📜 UPDATE ORDER HISTORY
// ==========================================

var history =
  Bot.getProperty(
    "ORDER_HISTORY_" + orderId
  ) || []

history.push({
  status: "active",
  time: new Date().toISOString()
})

Bot.setProperty(
  "ORDER_HISTORY_" + orderId,
  history,
  "json"
)

// ==========================================
// 👤 UPDATE CLIENT DATA
// ==========================================

var clientData = Bot.getProperty(
  "USER_" + order.userId
) || {}

clientData.orderStatus = "active"

Bot.setProperty(
  "USER_" + order.userId,
  clientData,
  "json"
)

// ==========================================
// 👑 ADMIN CONFIRMATION
// ==========================================

Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "🔵 Order is now ACTIVE"
})

Api.sendMessage({

  chat_id: uid,

  text:
    "🔵 <b>ORDER ACTIVATED</b>\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🆔 <b>Order ID:</b>\n" +
    "<code>" + orderId + "</code>\n\n" +

    "📊 <b>Status:</b> 🔵 ACTIVE\n\n" +

    "🕐 <b>Activated:</b>\n" +
    new Date().toLocaleString("en-IN") +
    "\n\n" +

    "✅ The client has been notified.",

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
    "🔵 <b>YOUR ORDER IS NOW ACTIVE!</b>\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🆔 <b>Order ID:</b>\n" +
    "<code>" + orderId + "</code>\n\n" +

    "📊 <b>Status:</b> 🔵 ACTIVE\n\n" +

    "🚀 <b>Your project is now active.</b>\n\n" +

    "Our team can now begin working on your project based on the requirements you submitted.\n\n" +

    "📌 You can check your latest order status and history anytime from <b>My Order</b>.",

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
          url:
            "https://t.me/TeamEarnStar"
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
Bot.setProperty(
  "USER_" + order.userId,
  clientData,
  "json"
)

// ==========================================
// 👑 ADMIN CONFIRMATION
// ==========================================

Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "🔵 Order is now ACTIVE"
})

Api.sendMessage({

  chat_id: uid,

  text:
    "🔵 <b>ORDER ACTIVATED</b>\n\n" +

    "🆔 <b>Order ID:</b>\n" +
    "<code>" + orderId + "</code>\n\n" +

    "📊 <b>Status:</b> ACTIVE\n\n" +

    "The client has been notified.",

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
    "🔵 <b>YOUR ORDER IS NOW ACTIVE!</b>\n\n" +

    "🆔 <b>Order ID:</b>\n" +
    "<code>" + orderId + "</code>\n\n" +

    "🟢 <b>Status:</b> ACTIVE\n\n" +

    "🎯 Your project is now being processed by our team.\n\n" +

    "You can check your latest order status anytime.",

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
          text: "📞 Contact Team",
          url:
            "https://t.me/TeamEarnStar"
        }
      ],
      [
        {
          text: "🏠 Main Menu",
          callback_data:
            "BACK_MAIN_MENU"
        }
      ]
    ]
  }

})
