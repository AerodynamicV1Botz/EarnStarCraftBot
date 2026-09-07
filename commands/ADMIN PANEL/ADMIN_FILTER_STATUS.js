/*CMD
  command: ADMIN_FILTER_STATUS
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
// 📊 GET STATUS
// ==========================================

var filterStatus = String(params || "")
  .trim()
  .toLowerCase()

if (
  filterStatus !== "pending" &&
  filterStatus !== "active" &&
  filterStatus !== "completed" &&
  filterStatus !== "cancelled"
) {

  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "⚠️ Invalid status"
  })

  return
}

// ==========================================
// 📦 GET ORDERS
// ==========================================

var keys = Bot.getProperty("ORDER_KEYS") || []

var results = []

for (var i = keys.length - 1; i >= 0; i--) {

  var orderId = keys[i]

  var order = Bot.getProperty(
    "ORDER_" + orderId
  )

  if (!order) continue

  var status =
    String(order.status || "pending")
      .toLowerCase()

  if (status === filterStatus) {
    results.push(order)
  }
}

// ==========================================
// 🎨 STATUS INFO
// ==========================================

var icon = "🟡"
var title = "PENDING"

if (filterStatus === "active") {
  icon = "🔵"
  title = "ACTIVE"
}

if (filterStatus === "completed") {
  icon = "🟢"
  title = "COMPLETED"
}

if (filterStatus === "cancelled") {
  icon = "🔴"
  title = "CANCELLED"
}

// ==========================================
// ❌ NO ORDERS
// ==========================================

if (results.length === 0) {

  Api.sendMessage({

    chat_id: uid,

    text:
      "📊 <b>" +
      icon +
      " " +
      title +
      " ORDERS</b>\n\n" +
      "━━━━━━━━━━━━━━━━━━\n\n" +
      "❌ No orders found with this status.",

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: [

        [
          {
            text: "📊 Change Filter",
            callback_data:
              "ADMIN_FILTER_ORDERS"
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

  return
}

// ==========================================
// 📋 RESULTS
// ==========================================

var text =
  "📊 <b>" +
  icon +
  " " +
  title +
  " ORDERS</b>\n\n" +

  "━━━━━━━━━━━━━━━━━━\n\n" +

  "📦 Total: <b>" +
  results.length +
  "</b>\n\n"

var buttons = []

// ==========================================
// 👁 SHOW ORDERS
// ==========================================

var maxResults = 10

for (
  var j = 0;
  j < results.length && j < maxResults;
  j++
) {

  var order = results[j]

  text +=
    icon +
    " <b>" +
    (order.name || "User") +
    "</b>\n" +

    "🆔 <code>" +
    (order.orderId || "-") +
    "</code>\n" +

    "📊 <b>" +
    title +
    "</b>\n\n"

  buttons.push([
    {
      text:
        "👁 View " +
        (order.orderId || "Order"),

      callback_data:
        "/ADMIN_ORDER " +
        order.orderId
    }
  ])
}

// ==========================================
// 🔘 NAVIGATION
// ==========================================

buttons.push([
  {
    text: "📊 Change Filter",
    callback_data:
      "ADMIN_FILTER_ORDERS"
  }
])

buttons.push([
  {
    text: "🔎 Search Order",
    callback_data:
      "ADMIN_SEARCH_ORDER"
  },

  {
    text: "📦 All Orders",
    callback_data:
      "ADMIN_ORDERS"
  }
])

buttons.push([
  {
    text: "👑 Admin Panel",
    callback_data:
      "ADMIN_PANEL"
  }
])

// ==========================================
// 📩 SEND RESULTS
// ==========================================

Api.sendMessage({

  chat_id: uid,

  text: text,

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: buttons
  }

})
