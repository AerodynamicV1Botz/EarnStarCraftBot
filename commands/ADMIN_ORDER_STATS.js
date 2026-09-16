/*CMD
  command: ADMIN_ORDER_STATS
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
// 📦 GET ORDERS
// ==========================================

var keys = Bot.getProperty("ORDER_KEYS") || []

var total = 0
var pending = 0
var active = 0
var completed = 0
var cancelled = 0

// ==========================================
// 📊 COUNT ORDERS
// ==========================================

for (var i = 0; i < keys.length; i++) {

  var order = Bot.getProperty(
    "ORDER_" + keys[i]
  )

  if (!order) continue

  total++

  var status = order.status || "pending"

  if (status === "pending") {
    pending++
  }

  if (status === "active") {
    active++
  }

  if (status === "completed") {
    completed++
  }

  if (status === "cancelled") {
    cancelled++
  }
}

// ==========================================
// 📈 COMPLETION RATE
// ==========================================

var completionRate = 0

if (total > 0) {
  completionRate =
    ((completed / total) * 100).toFixed(1)
}

// ==========================================
// 📋 STATISTICS
// ==========================================

var text =
  "📊 <b>ORDER STATISTICS</b>\n\n" +

  "━━━━━━━━━━━━━━━━━━\n\n" +

  "📦 <b>Total Orders:</b> " +
  total + "\n\n" +

  "🟡 <b>Pending:</b> " +
  pending + "\n\n" +

  "🔵 <b>Active:</b> " +
  active + "\n\n" +

  "🟢 <b>Completed:</b> " +
  completed + "\n\n" +

  "🔴 <b>Cancelled:</b> " +
  cancelled + "\n\n" +

  "━━━━━━━━━━━━━━━━━━\n\n" +

  "📈 <b>Completion Rate:</b> " +
  completionRate + "%"

// ==========================================
// 🔘 BUTTONS
// ==========================================

var buttons = [

  [
    {
      text: "📦 All Orders",
      callback_data: "ADMIN_ORDERS"
    }
  ],

  [
    {
      text: "🔄 Refresh",
      callback_data: "ADMIN_ORDER_STATS"
    }
  ],

  [
    {
      text: "👑 Admin Panel",
      callback_data: "ADMIN_PANEL"
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
