/*CMD
  command: ORDER_AMOUNT_SAVE
  help: 
  need_reply: true
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
// 📦 GET PENDING ORDER
// ==========================================

var orderId = Bot.getProperty(
  "PENDING_ORDER_AMOUNT_" + uid
)

if (!orderId) {

  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>ORDER AMOUNT SESSION EXPIRED</b>\n\n" +
      "Please open the order again and select 💰 Manage Amount.",

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📦 All Orders",
            callback_data: "ADMIN_ORDERS"
          }
        ],
        [
          {
            text: "👑 Admin Panel",
            callback_data: "ADMIN_PANEL"
          }
        ]
      ]
    }
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

  Bot.setProperty(
    "PENDING_ORDER_AMOUNT_" + uid,
    "",
    "string"
  )

  Api.sendMessage({
    chat_id: uid,
    text: "❌ Order not found."
  })

  return
}

// ==========================================
// 💰 GET ENTERED AMOUNT
// ==========================================

var rawAmount = String(
  message || ""
).trim()

// ==========================================
// 🧹 REMOVE ₹ / COMMAS
// ==========================================

rawAmount = rawAmount
  .replace(/₹/g, "")
  .replace(/,/g, "")
  .trim()

// ==========================================
// 🔐 VALIDATE NUMBER
// ==========================================

if (!/^\d+(\.\d{1,2})?$/.test(rawAmount)) {

  Api.sendMessage({
    chat_id: uid,

    text:
      "❌ <b>INVALID AMOUNT</b>\n\n" +

      "Please enter a valid amount using numbers only.\n\n" +

      "Example:\n" +
      "<code>1499</code>\n" +
      "<code>2999</code>\n" +
      "<code>1499.50</code>",

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "❌ Cancel",
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
// 💰 CONVERT AMOUNT
// ==========================================

var amount = Number(rawAmount)

// ==========================================
// 🔐 RANGE CHECK
// ==========================================

if (!isFinite(amount) || amount <= 0) {

  Api.sendMessage({
    chat_id: uid,

    text:
      "❌ <b>INVALID AMOUNT</b>\n\n" +
      "Amount must be greater than ₹0.\n\n" +
      "Please enter a valid amount.",

    parse_mode: "HTML"
  })

  return
}

// ==========================================
// 💾 SAVE AMOUNT
// ==========================================

order.amount = amount
order.amountUpdatedAt =
  new Date().toISOString()
order.amountUpdatedBy = uid

Bot.setProperty(
  "ORDER_" + orderId,
  order,
  "json"
)

// ==========================================
// 🧹 CLEAR PENDING SESSION
// ==========================================

Bot.setProperty(
  "PENDING_ORDER_AMOUNT_" + uid,
  "",
  "string"
)

// ==========================================
// ✅ CALLBACK / CONFIRMATION
// ==========================================

Api.sendMessage({

  chat_id: uid,

  text:
    "💰 <b>ORDER AMOUNT UPDATED</b>\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "📦 <b>Order ID:</b>\n" +
    "<code>" + orderId + "</code>\n\n" +

    "💰 <b>Amount:</b>\n" +
    "₹" + amount.toFixed(2) +
    "\n\n" +

    "🕐 <b>Updated:</b>\n" +
    new Date().toLocaleString("en-IN") +
    "\n\n" +

    "✅ Amount has been saved successfully.",

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
