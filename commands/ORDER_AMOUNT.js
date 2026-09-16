/*CMD
  command: ORDER_AMOUNT
  help: 
  need_reply: true
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
// 📦 CHECK ORDER
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
// 💾 SAVE PENDING ORDER ID
// ==========================================

Bot.setProperty(
  "PENDING_ORDER_AMOUNT_" + uid,
  orderId,
  "string"
)

// ==========================================
// ✏️ ASK AMOUNT
// ==========================================

var currentAmount = order.amount

var currentText = "Not set"

if (
  currentAmount !== undefined &&
  currentAmount !== null &&
  String(currentAmount).trim() !== ""
) {
  currentText = "₹" + currentAmount
}

// ==========================================
// 📩 MESSAGE
// ==========================================

Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "💰 Enter order amount"
})

Api.sendMessage({

  chat_id: uid,

  text:
    "💰 <b>SET ORDER AMOUNT</b>\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "📦 <b>Order ID:</b>\n" +
    "<code>" + orderId + "</code>\n\n" +

    "💰 <b>Current Amount:</b> " +
    currentText +
    "\n\n" +

    "✏️ <b>Enter the new amount in ₹</b>\n\n" +

    "Example:\n" +
    "<code>1499</code>\n\n" +

    "⚠️ Enter numbers only.",

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
