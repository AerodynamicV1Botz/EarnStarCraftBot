/*CMD
  command: ADMIN_ORDERS
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
// 📦 GET ORDER KEYS
// ==========================================

var keys = Bot.getProperty("ORDER_KEYS") || []

// ==========================================
// ❌ NO ORDERS
// ==========================================

if (keys.length === 0) {

  Api.sendMessage({
    chat_id: uid,

    text:
      "📦 <b>ORDERS</b>\n\n" +
      "No orders have been created yet.",

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: [

        [
          {
            text: "🔎 Search Order",
            callback_data: "ADMIN_SEARCH_ORDER"
          }
        ],

        [
          {
            text: "📊 Filter by Status",
            callback_data: "ADMIN_FILTER_ORDERS"
          }
        ],

        [
          {
            text: "🔄 Refresh",
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
// 📊 BUILD ORDER DASHBOARD
// ==========================================

var text =
  "📦 <b>ORDER MANAGEMENT</b>\n\n" +

  "📊 Total Orders: <b>" +
  keys.length +
  "</b>\n\n" +

  "━━━━━━━━━━━━━━━━━━\n\n"

var buttons = []

var count = 0

// ==========================================
// 📋 SHOW LATEST 10 ORDERS
// ==========================================

for (
  var i = keys.length - 1;
  i >= 0 && count < 10;
  i--
) {

  var orderId = keys[i]

  var order = Bot.getProperty(
    "ORDER_" + orderId
  )

  if (!order) {
    continue
  }

  // ========================================
  // 📊 STATUS
  // ========================================

  var status = String(
    order.status || "pending"
  ).toLowerCase()

  var icon = "🟡"

  if (status === "active") {
    icon = "🔵"
  }

  if (status === "completed") {
    icon = "🟢"
  }

  if (status === "cancelled") {
    icon = "🔴"
  }

  // ========================================
  // 📝 ORDER INFO
  // ========================================

  text +=
    icon +
    " <b>" +
    (order.name || "User") +
    "</b>\n" +

    "🆔 <code>" +
    orderId +
    "</code>\n" +

    "📊 <b>" +
    status.toUpperCase() +
    "</b>\n\n"

  // ========================================
  // 👁 VIEW ORDER
  // ========================================

  buttons.push([
    {
      text: "👁 View " + orderId,

      callback_data:
        "ADMIN_ORDER " + orderId
    }
  ])

  count++
}

// ==========================================
// 🔎 SEARCH ORDER
// ==========================================

buttons.push([
  {
    text: "🔎 Search Order",

    callback_data:
      "ADMIN_SEARCH_ORDER"
  }
])

// ==========================================
// 📊 FILTER BY STATUS
// ==========================================

buttons.push([
  {
    text: "📊 Filter by Status",

    callback_data:
      "ADMIN_FILTER_ORDERS"
  }
])

// ==========================================
// 📊 STATISTICS + REFRESH
// ==========================================

buttons.push([
  {
    text: "📊 Statistics",

    callback_data:
      "ADMIN_ORDER_STATS"
  },

  {
    text: "🔄 Refresh",

    callback_data:
      "ADMIN_ORDERS"
  }
])

// ==========================================
// 👑 ADMIN PANEL
// ==========================================

buttons.push([
  {
    text: "👑 Admin Panel",

    callback_data:
      "ADMIN_PANEL"
  }
])

// ==========================================
// 📩 SEND DASHBOARD
// ==========================================

Api.sendMessage({

  chat_id: uid,

  text: text,

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: buttons
  }

})
