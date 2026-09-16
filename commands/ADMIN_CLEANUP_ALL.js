/*CMD
  command: ADMIN_CLEANUP_ALL
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
  command: ADMIN_CLEANUP_ALL
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 32 — ADMIN_CLEANUP_ALL
// ADMIN → SHOW ALL-ORDER CLEANUP CONFIRMATION
// =====================================================

function safeText(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

var uid = String(user.telegramid)
var OWNER_ID = "7897324623"
var adminIds = [OWNER_ID]

var configuredOwner = Bot.getProperty("OWNER_ID", "")
var configuredAdmins = Bot.getProperty("EARNSTAR_ADMINS", [])

if (!Array.isArray(configuredAdmins)) {
  configuredAdmins = [configuredAdmins]
}

function extractId(item) {
  if (item && typeof item === "object") {
    return String(item.id || item.telegramId || item.userId || "").trim()
  }

  return String(item || "").trim()
}

var ownerFromProperty = extractId(configuredOwner)

if (ownerFromProperty && adminIds.indexOf(ownerFromProperty) === -1) {
  adminIds.push(ownerFromProperty)
}

for (var i = 0; i < configuredAdmins.length; i++) {
  var adminId = extractId(configuredAdmins[i])

  if (adminId && adminIds.indexOf(adminId) === -1) {
    adminIds.push(adminId)
  }
}

if (adminIds.indexOf(uid) === -1) {
  return
}

var orderKeys = Bot.getProperty("ORDER_KEYS", [])

if (!Array.isArray(orderKeys)) {
  orderKeys = []
}

var validOrderIds = []
var seen = {}

for (var j = 0; j < orderKeys.length; j++) {
  var orderId = String(orderKeys[j] || "").trim()

  if (!orderId || seen[orderId]) {
    continue
  }

  seen[orderId] = true

  if (orderId.indexOf("ORDER_") === 0 || orderId.indexOf("BUILD_") === 0) {
    continue
  }

  var order = Bot.getProperty("ORDER_" + orderId)

  if (order && typeof order === "object") {
    validOrderIds.push(orderId)
  }
}

if (validOrderIds.length === 0) {
  Bot.sendMessage("📦 <b>No final orders found.</b>", {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📋 All Orders",
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

Bot.setProperty(
  "ADMIN_CLEANUP_ALL_WAITING_" + uid,
  {
    adminId: uid,
    count: validOrderIds.length,
    orderIds: validOrderIds,
    createdAt: new Date().toISOString()
  },
  "json"
)

Api.sendMessage({
  chat_id: uid,

  text:
    "⚠️ <b>DELETE ALL FINAL ORDERS?</b>\n\n" +
    "This action will permanently remove:\n" +
    "• All final order records\n" +
    "• Order history\n" +
    "• User-order mappings\n" +
    "• Order list references\n" +
    "• Active admin order references\n\n" +
    "🗑️ Total orders: <b>" +
    validOrderIds.length +
    "</b>\n\n" +
    "<b>This action cannot be undone.</b>",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "⚠️ YES, DELETE ALL",
          callback_data: "ADMIN_CLEANUP_ALL_CONFIRM"
        }
      ],
      [
        {
          text: "❌ Cancel",
          callback_data: "ADMIN_ORDERS"
        }
      ]
    ]
  }
})

