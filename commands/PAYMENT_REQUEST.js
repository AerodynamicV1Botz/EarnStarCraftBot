/*CMD
  command: PAYMENT_REQUEST
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
// 💰 CHECK AMOUNT
// ==========================================

if (
  order.amount === undefined ||
  order.amount === null ||
  Number(order.amount) <= 0
) {

  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "⚠️ Set order amount first"
  })

  Api.sendMessage({
    chat_id: uid,

    text:
      "💰 <b>AMOUNT REQUIRED</b>\n\n" +
      "Order <code>" + orderId + "</code> does not have a valid amount yet.\n\n" +
      "Please set the amount before sending a payment request.",

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "💰 Manage Amount",
            callback_data:
              "ORDER_AMOUNT " + orderId
          }
        ],
        [
          {
            text: "📦 View Order",
            callback_data:
              "ADMIN_ORDER " + orderId
          }
        ]
      ]
    }
  })

  return
}

// ==========================================
// 🔐 CHECK CLIENT
// ==========================================

if (!order.userId) {

  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ Client ID missing"
  })

  return
}

// ==========================================
// 💳 PAYMENT REQUEST DATA
// ==========================================

var paymentId =
  "ESPAY" +
  Date.now().toString().slice(-8)

var payment = {
  paymentId: paymentId,
  orderId: orderId,
  userId: order.userId,
  amount: Number(order.amount),
  status: "pending",
  createdAt: new Date().toISOString(),
  createdBy: uid
}

// ==========================================
// 💾 SAVE PAYMENT
// ==========================================

Bot.setProperty(
  "PAYMENT_" + paymentId,
  payment,
  "json"
)

// ==========================================
// 📋 PAYMENT KEY LIST
// ==========================================

var paymentKeys =
  Bot.getProperty("PAYMENT_KEYS") || []

if (
  paymentKeys.indexOf(paymentId) === -1
) {

  paymentKeys.push(paymentId)

  Bot.setProperty(
    "PAYMENT_KEYS",
    paymentKeys,
    "json"
  )
}

// ==========================================
// 🔗 LINK PAYMENT TO ORDER
// ==========================================

order.paymentId = paymentId
order.paymentStatus = "pending"

Bot.setProperty(
  "ORDER_" + orderId,
  order,
  "json"
)

// ==========================================
// 💰 FORMAT AMOUNT
// ==========================================

var amountText =
  Number(order.amount).toFixed(2)

// ==========================================
// ✅ ADMIN CALLBACK
// ==========================================

Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "💳 Payment request created"
})

// ==========================================
// 👑 ADMIN CONFIRMATION
// ==========================================

Api.sendMessage({

  chat_id: uid,

  text:
    "💳 <b>PAYMENT REQUEST CREATED</b>\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "📦 <b>Order ID:</b>\n" +
    "<code>" + orderId + "</code>\n\n" +

    "💳 <b>Payment ID:</b>\n" +
    "<code>" + paymentId + "</code>\n\n" +

    "💰 <b>Amount:</b>\n" +
    "₹" + amountText + "\n\n" +

    "📊 <b>Status:</b> 🟡 PENDING\n\n" +

    "📩 Payment request has been sent to the client.",

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
          text: "💳 Payment Details",
          callback_data:
            "ADMIN_PAYMENT " + paymentId
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
// 📩 CLIENT PAYMENT REQUEST
// ==========================================

Api.sendMessage({

  chat_id: order.userId,

  text:
    "💳 <b>PAYMENT REQUEST</b>\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "📦 <b>Order ID:</b>\n" +
    "<code>" + orderId + "</code>\n\n" +

    "💰 <b>Amount Due:</b>\n" +
    "₹" + amountText + "\n\n" +

    "💳 <b>Payment ID:</b>\n" +
    "<code>" + paymentId + "</code>\n\n" +

    "📊 <b>Status:</b> 🟡 PAYMENT PENDING\n\n" +

    "Your order has a payment request from our team.\n\n" +

    "⚠️ Please make payment only through the official payment method provided by our team.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [

      [
        {
          text: "💳 Payment Instructions",
          callback_data:
            "PAYMENT_INFO " + paymentId
        }
      ],

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
          text: "🏠 Main Menu",
          callback_data:
            "BACK_MAIN_MENU"
        }
      ]

    ]
  }

})
