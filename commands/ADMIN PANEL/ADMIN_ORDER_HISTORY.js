/*CMD
  command: ADMIN_ORDER_HISTORY
  help: 
  need_reply: false
  auto_retry_time: 
  folder: ADMIN PANEL

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

var history = Bot.getProperty(
  "ORDER_HISTORY_" + orderId
) || []

// ==========================================
// 📝 HEADER
// ==========================================

var text =
  "📜 <b>ORDER HISTORY</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +

  "📦 <b>Order ID:</b>\n" +
  "<code>" + orderId + "</code>\n\n" +

  "👤 <b>Client:</b> " +
  (order.name || "User") +
  "\n\n" +

  "📊 <b>Current Status:</b> " +
  String(order.status || "pending").toUpperCase() +
  "\n\n" +

  "━━━━━━━━━━━━━━━━━━\n\n"

// ==========================================
// 📋 BUILD TIMELINE
// ==========================================

if (history.length === 0) {

  text +=
    "ℹ️ <b>No history available.</b>\n\n" +
    "This order does not have any recorded status changes yet."

} else {

  text += "🕐 <b>STATUS TIMELINE</b>\n\n"

  for (var i = 0; i < history.length; i++) {

    var item = history[i]

    var status = String(
      item.status || "unknown"
    ).toLowerCase()

    var icon = "⚪"

    if (status === "pending") {
      icon = "🟡"
    }

    if (status === "active") {
      icon = "🔵"
    }

    if (status === "completed") {
      icon = "🟢"
    }

    if (status === "cancelled") {
      icon = "🔴"
    }

    var timeText = "Unknown"

    if (item.time) {

      try {
        timeText = new Date(
          item.time
        ).toLocaleString("en-IN")
      } catch (e) {
        timeText = item.time
      }

    }

    text +=
      icon +
      " <b>" +
      status.toUpperCase() +
      "</b>\n" +

      "🕐 " +
      timeText +
      "\n\n"

  }
}

// ==========================================
// 🔘 NAVIGATION
// ==========================================

var buttons = [

  [
    {
      text: "📦 View Order",
      callback_data:
        "ADMIN_ORDER " + orderId
    }
  ],

  [
    {
      text: "🔄 Refresh",
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

// ==========================================
// 📩 SEND
// ==========================================

Api.sendMessage({

  chat_id: uid,

  text: text,

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: buttons
  }

})
