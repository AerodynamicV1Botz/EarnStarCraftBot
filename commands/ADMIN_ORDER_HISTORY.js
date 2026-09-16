/*CMD
  command: ADMIN_ORDER_HISTORY
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
  command: ADMIN_ORDER_HISTORY
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// ADMIN_ORDER_HISTORY
//
// PURPOSE:
// - Show complete order history
// - Display status/payment/work timeline
// - Preserve final order and history keys
// =====================================================


// =====================================================
// 👑 ADMIN AUTH
// =====================================================

var uid = String(user.telegramid);

var OWNER_ID = "7897324623";
var adminIds = [OWNER_ID];

var configuredOwner = Bot.getProperty("OWNER_ID");

if (configuredOwner) {
  if (typeof configuredOwner === "object") {
    configuredOwner =
      configuredOwner.id ||
      configuredOwner.telegramId ||
      configuredOwner.userId ||
      "";
  }

  configuredOwner = String(configuredOwner || "").trim();

  if (configuredOwner) {
    adminIds.push(configuredOwner);
  }
}

var configuredAdmins = Bot.getProperty("EARNSTAR_ADMINS") || [];

if (!Array.isArray(configuredAdmins)) {
  configuredAdmins = [configuredAdmins];
}

for (var a = 0; a < configuredAdmins.length; a++) {
  var item = configuredAdmins[a];

  if (typeof item === "object") {
    item =
      item.id ||
      item.telegramId ||
      item.userId ||
      "";
  }

  item = String(item || "").trim();

  if (item) {
    adminIds.push(item);
  }
}

var isAdmin = false;

for (var b = 0; b < adminIds.length; b++) {
  if (adminIds[b] === uid) {
    isAdmin = true;
    break;
  }
}

if (!isAdmin) {
  return;
}


// =====================================================
// ⚡ CALLBACK RESPONSE
// =====================================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  try {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "Loading order history",
      show_alert: false
    });
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
    .replace(/'/g, "&#039;");
}


// =====================================================
// 🆔 ORDER ID
// =====================================================

var orderId = String(
  typeof params !== "undefined" && params !== null
    ? params
    : ""
).trim();

if (orderId.indexOf("|") !== -1) {
  orderId = orderId.split("|")[0].trim();
}

if (orderId.indexOf(" ") !== -1) {
  orderId = orderId.split(/\s+/)[0].trim();
}

if (!orderId) {
  Api.sendMessage({
    chat_id: uid,
    text: "⚠️ <b>Order ID missing.</b>",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📦 All Orders",
            callback_data: "ADMIN_ORDERS"
          }
        ]
      ]
    }
  });

  return;
}


// =====================================================
// 📦 LOAD FINAL ORDER
// =====================================================

var order = Bot.getProperty("ORDER_" + orderId);

if (!order || typeof order !== "object") {
  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>Order not found.</b>\n\n" +
      "<code>" +
      safeText(orderId) +
      "</code>",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📦 All Orders",
            callback_data: "ADMIN_ORDERS"
          }
        ]
      ]
    }
  });

  return;
}


// =====================================================
// 📜 LOAD HISTORY
// =====================================================

var history = Bot.getProperty(
  "ORDER_HISTORY_" + orderId
);

if (!history) {
  history = [];
}

if (!Array.isArray(history)) {
  history = [history];
}


// =====================================================
// 📊 STATUS HELPERS
// =====================================================

function getCurrentStatus(order) {
  var stage = String(order.stage || "").toLowerCase();
  var orderStatus = String(order.orderStatus || "").toLowerCase();
  var requestStatus = String(order.requestStatus || "").toLowerCase();
  var paymentStatus = String(order.paymentStatus || "").toLowerCase();
  var workStatus = String(order.workStatus || "").toLowerCase();

  if (
    stage === "cancelled" ||
    orderStatus === "cancelled" ||
    requestStatus === "cancelled"
  ) {
    return "cancelled";
  }

  if (
    stage === "delivered" ||
    stage === "completed" ||
    orderStatus === "completed" ||
    orderStatus === "delivered" ||
    workStatus === "completed"
  ) {
    return "completed";
  }

  if (
    stage === "remaining_payment" ||
    orderStatus === "remaining_payment" ||
    paymentStatus === "remaining_payment_pending" ||
    paymentStatus === "remaining_proof_submitted" ||
    paymentStatus === "remaining_payment_verification"
  ) {
    return "remaining_payment";
  }

  if (
    stage === "ready_for_delivery" ||
    orderStatus === "delivery_ready"
  ) {
    return "ready_for_delivery";
  }

  if (
    stage === "in_progress" ||
    orderStatus === "in_progress" ||
    workStatus === "in_progress"
  ) {
    return "active";
  }

  if (
    stage === "work_ready" ||
    paymentStatus === "advance_paid" ||
    requestStatus === "accepted"
  ) {
    return "accepted";
  }

  if (
    requestStatus === "submitted" ||
    requestStatus === "review"
  ) {
    return "pending";
  }

  return "draft";
}

function getStatusIcon(status) {
  if (status === "pending") return "🟡";
  if (status === "accepted") return "🟣";
  if (status === "active") return "🔵";
  if (status === "remaining_payment") return "🟠";
  if (status === "ready_for_delivery") return "📦";
  if (status === "completed") return "🟢";
  if (status === "cancelled") return "🔴";

  return "⚪";
}

function formatDate(value) {
  if (!value) {
    return "Unknown";
  }

  try {
    return new Date(value).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata"
    });
  } catch (error) {
    return String(value);
  }
}

function getHistoryStatus(item) {
  return String(
    item.status ||
    item.stage ||
    item.orderStatus ||
    item.requestStatus ||
    item.paymentStatus ||
    item.workStatus ||
    "unknown"
  ).toLowerCase();
}

function getHistoryTime(item) {
  return (
    item.time ||
    item.timestamp ||
    item.createdAt ||
    item.updatedAt ||
    item.lastUpdatedAt ||
    ""
  );
}

function getHistoryNote(item) {
  return (
    item.note ||
    item.message ||
    item.action ||
    item.title ||
    item.description ||
    ""
  );
}


// =====================================================
// 📄 CURRENT ORDER DATA
// =====================================================

var currentStatus = getCurrentStatus(order);
var statusIcon = getStatusIcon(currentStatus);

var clientName =
  order.name ||
  order.fullName ||
  order.clientName ||
  "User";

var packageName =
  order.packageName ||
  order.packageType ||
  order.package ||
  "Custom Order";


// =====================================================
// 📝 HEADER
// =====================================================

var text =
  "📜 <b>ORDER HISTORY</b>\n\n" +

  "━━━━━━━━━━━━━━━━━━\n\n" +

  "📦 <b>Order ID:</b>\n" +
  "<code>" +
  safeText(orderId) +
  "</code>\n\n" +

  "👤 <b>Client:</b> " +
  safeText(clientName) +
  "\n" +

  "📦 <b>Package:</b> " +
  safeText(packageName) +
  "\n\n" +

  statusIcon +
  " <b>Current Status:</b> " +
  safeText(currentStatus.replace(/_/g, " ").toUpperCase()) +
  "\n\n" +

  "━━━━━━━━━━━━━━━━━━\n\n";


// =====================================================
// 📋 TIMELINE
// =====================================================

if (history.length === 0) {
  text +=
    "ℹ️ <b>No history available.</b>\n\n" +
    "Is order ke liye abhi koi history entry record nahi hui.";
} else {
  text += "🕐 <b>STATUS TIMELINE</b>\n\n";

  for (var i = 0; i < history.length; i++) {
    var historyItem = history[i];

    if (
      !historyItem ||
      typeof historyItem !== "object"
    ) {
      continue;
    }

    var historyStatus = getHistoryStatus(historyItem);
    var historyIcon = getStatusIcon(historyStatus);
    var historyTime = formatDate(
      getHistoryTime(historyItem)
    );

    var historyNote = getHistoryNote(historyItem);

    text +=
      historyIcon +
      " <b>" +
      safeText(
        historyStatus
          .replace(/_/g, " ")
          .toUpperCase()
      ) +
      "</b>\n" +

      "🕐 " +
      safeText(historyTime) +
      "\n";

    if (historyNote) {
      text +=
        "📝 " +
        safeText(historyNote) +
        "\n";
    }

    if (historyItem.adminId) {
      text +=
        "👑 Admin: <code>" +
        safeText(historyItem.adminId) +
        "</code>\n";
    }

    text += "\n";
  }
}


// =====================================================
// 🔘 NAVIGATION
// =====================================================

var buttons = [
  [
    {
      text: "📦 View Order",
      callback_data: "ADMIN_ORDER " + orderId
    }
  ],
  [
    {
      text: "⚙️ Order Actions",
      callback_data: "ADMIN_ORDER_ACTION " + orderId
    }
  ],
  [
    {
      text: "🔄 Refresh",
      callback_data: "ADMIN_ORDER_HISTORY " + orderId
    }
  ],
  [
    {
      text: "📦 All Orders",
      callback_data: "ADMIN_ORDERS"
    },
    {
      text: "👑 Admin Panel",
      callback_data: "ADMIN_PANEL"
    }
  ]
];


// =====================================================
// 📩 SEND HISTORY
// =====================================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
});
