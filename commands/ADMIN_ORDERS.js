/*CMD
  command: ADMIN_ORDERS
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

/*CMD
  command: ADMIN_ORDERS
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// ADMIN ORDERS DASHBOARD
//
// PURPOSE:
// - Show valid final orders
// - Show latest 10 orders
// - Open full order view
// - Keep destructive cleanup separate
//
// IMPORTANT:
// - Does not delete orders
// - Does not cancel orders
// - Does not modify order history
// - Does not show ORDER_<uid> drafts
// =====================================================

// =====================================================
// 👤 ADMIN ID
// =====================================================

var uid = String(user.telegramid)

// =====================================================
// 👑 ADMIN CHECK
// =====================================================

var OWNER_ID = "7897324623"

var adminIds = [OWNER_ID]

var configuredOwner = Bot.getProperty("OWNER_ID")

if (configuredOwner) {
  if (typeof configuredOwner === "object") {
    configuredOwner =
      configuredOwner.id ||
      configuredOwner.telegramId ||
      configuredOwner.userId ||
      ""
  }

  if (String(configuredOwner).trim()) {
    adminIds.push(String(configuredOwner).trim())
  }
}

var configuredAdmins = Bot.getProperty("EARNSTAR_ADMINS") || []

if (!Array.isArray(configuredAdmins)) {
  configuredAdmins = [configuredAdmins]
}

for (var a = 0; a < configuredAdmins.length; a++) {
  var adminItem = configuredAdmins[a]

  if (typeof adminItem === "object") {
    adminItem = adminItem.id || adminItem.telegramId || adminItem.userId || ""
  }

  adminItem = String(adminItem || "").trim()

  if (adminItem) {
    adminIds.push(adminItem)
  }
}

var isAdmin = false

for (var x = 0; x < adminIds.length; x++) {
  if (adminIds[x] === uid) {
    isAdmin = true
    break
  }
}

if (!isAdmin) {
  return
}

// =====================================================
// ⚡ CALLBACK RESPONSE
// =====================================================

if (typeof request !== "undefined" && request && request.id) {
  try {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "Orders refreshed",
      show_alert: false
    })
  } catch (error) {}
}

// =====================================================
// 🔐 SAFE TEXT
// =====================================================

function safeText(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

// =====================================================
// 📦 GET ORDER KEYS
// =====================================================

var storedKeys = Bot.getProperty("ORDER_KEYS") || []

if (!Array.isArray(storedKeys)) {
  storedKeys = []
}

// =====================================================
// 🧹 VALIDATE FINAL ORDERS
// =====================================================

var validOrders = []
var seenOrderIds = {}

for (var i = 0; i < storedKeys.length; i++) {
  var rawOrderId = storedKeys[i]

  if (rawOrderId === null || rawOrderId === undefined) {
    continue
  }

  var orderId = String(rawOrderId).trim()

  if (!orderId) {
    continue
  }

  // Avoid duplicate order IDs.
  if (seenOrderIds[orderId]) {
    continue
  }

  seenOrderIds[orderId] = true

  // Never treat user draft keys as final orders.
  if (orderId.indexOf("ORDER_") === 0 || orderId.indexOf("BUILD_") === 0) {
    continue
  }

  var order = Bot.getProperty("ORDER_" + orderId)

  if (!order || typeof order !== "object") {
    continue
  }

  // Final orders must have a usable order ID.
  if (!order.orderId && !order.id) {
    order.orderId = orderId
  }

  validOrders.push({
    id: orderId,
    data: order
  })
}

// =====================================================
// 📊 STATUS HELPER
// =====================================================

function getOrderStatus(order) {
  var stage = String(order.stage || "").toLowerCase()

  var orderStatus = String(order.orderStatus || "").toLowerCase()

  var requestStatus = String(order.requestStatus || "").toLowerCase()

  var paymentStatus = String(order.paymentStatus || "").toLowerCase()

  var workStatus = String(order.workStatus || "").toLowerCase()

  if (
    stage === "cancelled" ||
    orderStatus === "cancelled" ||
    requestStatus === "cancelled"
  ) {
    return "cancelled"
  }

  if (
    stage === "completed" ||
    stage === "delivered" ||
    orderStatus === "completed" ||
    orderStatus === "delivered" ||
    workStatus === "completed"
  ) {
    return "completed"
  }

  if (
    stage === "in_progress" ||
    orderStatus === "in_progress" ||
    workStatus === "in_progress"
  ) {
    return "active"
  }

  if (
    stage === "remaining_payment" ||
    orderStatus === "remaining_payment" ||
    paymentStatus === "remaining_payment_pending" ||
    paymentStatus === "remaining_proof_submitted"
  ) {
    return "remaining_payment"
  }

  if (stage === "ready_for_delivery" || orderStatus === "delivery_ready") {
    return "ready_for_delivery"
  }

  if (
    stage === "work_ready" ||
    paymentStatus === "advance_paid" ||
    requestStatus === "accepted"
  ) {
    return "accepted"
  }

  if (requestStatus === "submitted" || requestStatus === "review") {
    return "pending"
  }

  return "draft"
}

function getStatusIcon(status) {
  if (status === "active") {
    return "🔵"
  }

  if (status === "accepted") {
    return "🟣"
  }

  if (status === "completed") {
    return "🟢"
  }

  if (status === "cancelled") {
    return "🔴"
  }

  if (status === "remaining_payment") {
    return "🟠"
  }

  if (status === "ready_for_delivery") {
    return "📦"
  }

  return "🟡"
}

// =====================================================
// ❌ NO VALID ORDERS
// =====================================================

if (validOrders.length === 0) {
  Api.sendMessage({
    chat_id: uid,

    text:
      "📦 <b>ORDER MANAGEMENT</b>\n\n" +
      "No final orders have been created yet.\n\n" +
      "Draft orders aur cancelled draft records yahan show nahi hote.",

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
            text: "🧹 Clean All Orders",
            callback_data: "ADMIN_CLEANUP_ALL"
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

// =====================================================
// 📊 DASHBOARD HEADER
// =====================================================

var text =
  "📦 <b>ORDER MANAGEMENT</b>\n\n" +
  "📊 Total Final Orders: <b>" +
  validOrders.length +
  "</b>\n" +
  "🧹 Cleanup: Separate section\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n"

var buttons = []

// =====================================================
// 📋 SHOW LATEST 10 ORDERS
// =====================================================

var count = 0

for (var j = validOrders.length - 1; j >= 0 && count < 10; j--) {
  var item = validOrders[j]
  var currentOrderId = item.id
  var currentOrder = item.data

  var status = getOrderStatus(currentOrder)
  var icon = getStatusIcon(status)

  var clientName =
    currentOrder.name ||
    currentOrder.fullName ||
    currentOrder.clientName ||
    "User"

  var packageName =
    currentOrder.packageName ||
    currentOrder.packageType ||
    currentOrder.package ||
    "Custom Order"

  text +=
    icon +
    " <b>" +
    safeText(clientName) +
    "</b>\n" +
    "🆔 <code>" +
    safeText(currentOrderId) +
    "</code>\n" +
    "📦 " +
    safeText(packageName) +
    "\n" +
    "📊 <b>" +
    safeText(status.replace(/_/g, " ").toUpperCase()) +
    "</b>\n\n"

  buttons.push([
    {
      text: "👁 View " + currentOrderId,
      callback_data: "ADMIN_ORDER " + currentOrderId
    }
  ])

  count++
}

// =====================================================
// 🔎 SEARCH
// =====================================================

buttons.push([
  {
    text: "🔎 Search Order",
    callback_data: "ADMIN_SEARCH_ORDER"
  }
])

// =====================================================
// 📊 FILTER
// =====================================================

buttons.push([
  {
    text: "📊 Filter by Status",
    callback_data: "ADMIN_FILTER_ORDERS"
  }
])

// =====================================================
// 📈 STATISTICS + CLEANUP
// =====================================================

buttons.push([
  {
    text: "📊 Statistics",
    callback_data: "ADMIN_ORDER_STATS"
  },
  {
    text: "🧹 Clean All Orders",
    callback_data: "ADMIN_CLEANUP_ALL"
  }
])

// =====================================================
// 🔄 REFRESH + ADMIN PANEL
// =====================================================

buttons.push([
  {
    text: "🔄 Refresh",
    callback_data: "ADMIN_ORDERS"
  },
  {
    text: "👑 Admin Panel",
    callback_data: "ADMIN_PANEL"
  }
])

// =====================================================
// 📩 SEND DASHBOARD
// =====================================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
})

