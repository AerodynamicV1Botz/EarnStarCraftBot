/*CMD
  command: ORDER_HISTORY
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
// 📜 GET HISTORY
// ==========================================

var history =
  Bot.getProperty(
    "ORDER_HISTORY_" + orderId
  ) || []

// ==========================================
// 📋 BUILD HISTORY
// ==========================================

var text =
  "📜 <b>ORDER HISTORY</b>\n\n" +
  "📦 Order: <code>" +
  orderId +
  "</code>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n"

if (history.length === 0) {

  text +=
    "ℹ️ No status history recorded yet.\n\n" +
    "Current Status: <b>" +
    (order.status || "PENDING").toUpperCase() +
    "</b>"

} else {

  for (
    var i = history.length - 1;
    i >= 0;
    i--
  ) {

    var item = history[i]

    var icon = "🟡"

    if (item.status === "active") {
      icon = "🔵"
    }

    if (item.status === "completed") {
      icon = "🟢"
    }

    if (item.status === "cancelled") {
      icon = "🔴"
    }

    text +=
      icon + " <b>" +
      (item.status || "").toUpperCase() +
      "</b>\n" +

      "🕐 " +
      (item.time || "Unknown") +
      "\n\n"
  }
}

// ==========================================
// 🔘 BUTTONS
// ==========================================

Api.sendMessage({

  chat_id: uid,

  text: text,

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [

      [
        {
          text: "📦 Back to Order",
          callback_data:
            "ADMIN_ORDER " + orderId
        }
      ],

      [
        {
          text: "📦 All Orders",
          callback_data:
            "ADMIN_ORDERS"
        },
        {
          text: "👑 Admin Panel",
          callback_data:
            "ADMIN_PANEL"
        }
      ]

    ]
  }

})
