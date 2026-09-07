/*CMD
  command: ADMIN_SEARCH_ORDER_INPUT
  help: 
  need_reply: true
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
// 🔎 GET SEARCH QUERY
// ==========================================

var query = String(message || "")
  .trim()
  .toLowerCase()

if (!query) {
  Bot.runCommand("ADMIN_SEARCH_ORDER")
  return
}

// ==========================================
// 📦 GET ORDER KEYS
// ==========================================

var keys = Bot.getProperty("ORDER_KEYS") || []

var results = []
var maxResults = 10

// ==========================================
// 🔎 SEARCH ORDERS
// ==========================================

for (
  var i = keys.length - 1;
  i >= 0 && results.length < maxResults;
  i--
) {

  var orderId = keys[i]

  var order = Bot.getProperty(
    "ORDER_" + orderId
  )

  if (!order) continue

  var searchableText =
    String(order.orderId || "") + " " +
    String(order.name || "") + " " +
    String(order.contact || "") + " " +
    String(order.userId || "") + " " +
    String(order.enquiryRef || "") + " " +
    String(order.status || "")

  searchableText =
    searchableText.toLowerCase()

  if (
    searchableText.indexOf(query) !== -1
  ) {
    results.push(order)
  }
}

// ==========================================
// ❌ NO RESULTS
// ==========================================

if (results.length === 0) {

  Api.sendMessage({

    chat_id: uid,

    text:
      "🔎 <b>ORDER SEARCH</b>\n\n" +
      "━━━━━━━━━━━━━━━━━━\n\n" +
      "❌ <b>No matching order found.</b>\n\n" +

      "You can search using:\n" +
      "🆔 Order ID\n" +
      "👤 Client Name\n" +
      "📞 Contact\n" +
      "🆔 Telegram ID\n" +
      "📋 Enquiry ID\n" +
      "📊 Order Status",

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: [

        [
          {
            text: "🔎 Search Again",
            callback_data:
              "ADMIN_SEARCH_ORDER"
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
            text: "📊 Order Statistics",
            callback_data:
              "ADMIN_ORDER_STATS"
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
// 📋 SEARCH RESULTS
// ==========================================

var text =
  "🔎 <b>ORDER SEARCH RESULTS</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "🔍 Query: <code>" +
  query +
  "</code>\n" +
  "📊 Results: <b>" +
  results.length +
  "</b>\n\n"

var buttons = []

// ==========================================
// 📦 DISPLAY RESULTS
// ==========================================

for (
  var j = 0;
  j < results.length;
  j++
) {

  var order = results[j]

  var status =
    order.status || "pending"

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

  text +=
    icon +
    " <b>" +
    (order.name || "User") +
    "</b>\n" +

    "🆔 <code>" +
    (order.orderId || "-") +
    "</code>\n" +

    "📊 <b>" +
    status.toUpperCase() +
    "</b>\n\n"

  buttons.push([
    {
      text:
        "👁 View " +
        (order.orderId || "Order"),

      callback_data:
        "ADMIN_ORDER " +
        order.orderId
    }
  ])
}

// ==========================================
// 🔘 NAVIGATION
// ==========================================

buttons.push([
  {
    text: "🔎 Search Again",
    callback_data:
      "ADMIN_SEARCH_ORDER"
  }
])

buttons.push([
  {
   
