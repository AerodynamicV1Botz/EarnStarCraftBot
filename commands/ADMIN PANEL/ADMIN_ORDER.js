/*CMD
  command: ADMIN_ORDER
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

// CMD: ADMIN_ORDER

var uid = user.telegramid

// ==========================================
// 👑 ADMIN CHECK
// ==========================================

if (String(uid) !== "7897324623") {
  Api.sendMessage({
    chat_id: uid,
    text:
      "🔒 <b>Admin Access Required</b>\n\n" +
      "⚠️ Yeh section sirf authorized admin ke liye available hai.",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🏠 Main Menu",
            callback_data: "BACK_MAIN_MENU"
          }
        ]
      ]
    }
  })

  return
}

// ==========================================
// 🆔 ORDER ID
// ==========================================

var orderId = params

if (!orderId) {
  Api.sendMessage({
    chat_id: uid,
    text: "⚠️ Order ID missing.",
    parse_mode: "HTML"
  })

  return
}

// ==========================================
// 📦 GET ORDER
// ==========================================

var order = Bot.getProperty("ORDER_" + orderId)

if (!order) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ Order not found.",
    parse_mode: "HTML"
  })

  return
}

// ==========================================
// 📊 STATUS
// ==========================================

var status = String(order.status || "pending").toLowerCase()

var statusIcon = "🟡"
var statusText = "PENDING"

if (status === "active") {
  statusIcon = "🔵"
  statusText = "ACTIVE"
}

if (status === "completed") {
  statusIcon = "🟢"
  statusText = "COMPLETED"
}

if (status === "cancelled") {
  statusIcon = "🔴"
  statusText = "CANCELLED"
}

// ==========================================
// 💰 AMOUNT
// ==========================================

var amount = order.amount

var amountText = "Not set"

if (amount !== undefined && amount !== null && String(amount).trim() !== "") {
  amountText = "₹" + amount
}

// ==========================================
// 🕐 CREATED
// ==========================================

var createdTime = "Not available"

if (order.createdAt) {
  try {
    createdTime = new Date(order.createdAt).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata"
    })
  } catch (e) {
    createdTime = String(order.createdAt)
  }
}

// ==========================================
// 📝 ORDER DETAILS
// ==========================================

var text =
  "📦 <b>ORDER DETAILS</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "🆔 <b>Order ID:</b>\n" +
  "<code>" +
  orderId +
  "</code>\n\n" +
  "📋 <b>Enquiry:</b>\n" +
  "<code>" +
  String(order.enquiryRef || "Not available") +
  "</code>\n\n" +
  "👤 <b>Client:</b>\n" +
  String(order.name || "User") +
  "\n\n" +
  "🆔 <b>Telegram ID:</b>\n" +
  "<code>" +
  String(order.userId || "Not available") +
  "</code>\n\n" +
  "💰 <b>Order Amount:</b>\n" +
  amountText +
  "\n\n" +
  statusIcon +
  " <b>Status:</b> " +
  statusText +
  "\n\n" +
  "🕐 <b>Created:</b>\n" +
  createdTime +
  "\n\n" +
  "📝 <b>Requirements:</b>\n" +
  String(order.requirements || "Not provided") +
  "\n\n" +
  "━━━━━━━━━━━━━━━━━━"

// ==========================================
// 🔘 BUTTONS
// ==========================================

var buttons = []

// ==========================================
// 📊 STATUS ACTIONS
// ==========================================

if (status === "pending") {
  buttons.push([
    {
      text: "🔵 Set Active",
      callback_data: "ORDER_ACTIVE " + orderId
    },
    {
      text: "🔴 Cancel Order",
      callback_data: "ORDER_CANCEL " + orderId
    }
  ])
}

if (status === "active") {
  buttons.push([
    {
      text: "🟢 Complete Order",
      callback_data: "ORDER_COMPLETE " + orderId
    },
    {
      text: "🔴 Cancel Order",
      callback_data: "ORDER_CANCEL " + orderId
    }
  ])
}

// ==========================================
// 💰 PAYMENT
// ==========================================

buttons.push([
  {
    text: "💰 Manage Amount",
    callback_data: "ORDER_AMOUNT " + orderId
  }
])

// ==========================================
// 📞 CONTACT
// ==========================================

buttons.push([
  {
    text: "📞 Contact Client",
    callback_data: "ORDER_CONTACT " + orderId
  }
])

// ==========================================
// 📜 HISTORY
// ==========================================

buttons.push([
  {
    text: "📜 Order History",
    callback_data: "ADMIN_ORDER_HISTORY " + orderId
  }
])

// ==========================================
// 🔄 REFRESH
// ==========================================

buttons.push([
  {
    text: "🔄 Refresh",
    callback_data: "ADMIN_ORDER " + orderId
  }
])

// ==========================================
// 📦 NAVIGATION
// ==========================================

buttons.push([
  {
    text: "📦 All Orders",
    callback_data: "ADMIN_ORDERS"
  },
  {
    text: "👑 Admin Panel",
    callback_data: "ADMIN_PANEL"
  }
])

// ==========================================
// 📩 SEND ONLY ONCE
// ==========================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
})

