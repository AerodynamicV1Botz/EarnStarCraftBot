/*CMD
  command: ADMIN_FILTER_STATUS
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
  command: ADMIN_FILTER_STATUS
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// ADMIN FILTER STATUS
// =====================================================


// =====================================================
// 👤 CURRENT ADMIN
// =====================================================

var uid = String(user.telegramid);


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
// 👑 ADMIN CHECK
// =====================================================

var OWNER_ID = "7897324623";
var adminIds = [OWNER_ID];

var configuredOwner =
  Bot.getProperty("OWNER_ID", "");

var configuredAdmins =
  Bot.getProperty("EARNSTAR_ADMINS", []);

if (!Array.isArray(configuredAdmins)) {
  configuredAdmins = [configuredAdmins];
}

function extractAdminId(item) {
  if (item && typeof item === "object") {
    return String(
      item.id ||
      item.telegramId ||
      item.userId ||
      ""
    ).trim();
  }

  return String(item || "").trim();
}

var ownerFromProperty =
  extractAdminId(configuredOwner);

if (
  ownerFromProperty &&
  adminIds.indexOf(ownerFromProperty) === -1
) {
  adminIds.push(ownerFromProperty);
}

for (var a = 0; a < configuredAdmins.length; a++) {
  var configuredAdminId =
    extractAdminId(configuredAdmins[a]);

  if (
    configuredAdminId &&
    adminIds.indexOf(configuredAdminId) === -1
  ) {
    adminIds.push(configuredAdminId);
  }
}

if (adminIds.indexOf(uid) === -1) {
  return;
}


// =====================================================
// ⚡ CALLBACK ANSWER
// =====================================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  try {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "Loading orders...",
      show_alert: false
    });
  } catch (error) {}
}


// =====================================================
// 📊 GET FILTER STATUS
// =====================================================

var filterStatus = String(params || "")
  .trim()
  .toLowerCase();

filterStatus = filterStatus
  .replace(/^ADMIN_FILTER_STATUS[\s|:]*/i, "")
  .trim()
  .toLowerCase();

var allowedStatuses = [
  "pending",
  "active",
  "completed",
  "cancelled",
  "remaining_payment",
  "ready_for_delivery"
];

if (allowedStatuses.indexOf(filterStatus) === -1) {
  Api.sendMessage({
    chat_id: uid,
    text: "⚠️ <b>Invalid order status.</b>",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📊 Change Filter",
            callback_data: "ADMIN_FILTER_ORDERS"
          }
        ],
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
// 📦 STATUS HELPER
// =====================================================

function getOrderStatus(order) {
  var stage = String(
    order.stage || ""
  ).toLowerCase();

  var orderStatus = String(
    order.orderStatus || ""
  ).toLowerCase();

  var requestStatus = String(
    order.requestStatus || ""
  ).toLowerCase();

  var paymentStatus = String(
    order.paymentStatus || ""
  ).toLowerCase();

  var workStatus = String(
    order.workStatus || ""
  ).toLowerCase();

  if (
    stage === "cancelled" ||
    orderStatus === "cancelled" ||
    requestStatus === "cancelled"
  ) {
    return "cancelled";
  }

  if (
    stage === "completed" ||
    stage === "delivered" ||
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
    stage === "delivery_ready" ||
    orderStatus === "delivery_ready" ||
    orderStatus === "ready_for_delivery"
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
    requestStatus === "review" ||
    stage === "pending"
  ) {
    return "pending";
  }

  return "pending";
}


// =====================================================
// 🎨 STATUS INFO
// =====================================================

var icon = "🟡";
var title = "PENDING";

if (filterStatus === "active") {
  icon = "🔵";
  title = "ACTIVE";
}

if (filterStatus === "completed") {
  icon = "🟢";
  title = "COMPLETED";
}

if (filterStatus === "cancelled") {
  icon = "🔴";
  title = "CANCELLED";
}

if (filterStatus === "remaining_payment") {
  icon = "🟠";
  title = "REMAINING PAYMENT";
}

if (filterStatus === "ready_for_delivery") {
  icon = "📦";
  title = "READY FOR DELIVERY";
}


// =====================================================
// 📦 LOAD FINAL ORDERS
// =====================================================

var storedKeys =
  Bot.getProperty("ORDER_KEYS", []);

if (!Array.isArray(storedKeys)) {
  storedKeys = [];
}

var results = [];
var seenOrderIds = {};

for (var i = storedKeys.length - 1; i >= 0; i--) {
  var rawOrderId = storedKeys[i];

  if (
    rawOrderId === null ||
    rawOrderId === undefined
  ) {
    continue;
  }

  var orderId = String(rawOrderId).trim();

  if (!orderId || seenOrderIds[orderId]) {
    continue;
  }

  seenOrderIds[orderId] = true;

  if (
    orderId.indexOf("ORDER_") === 0 ||
    orderId.indexOf("BUILD_") === 0
  ) {
    continue;
  }

  var order =
    Bot.getProperty("ORDER_" + orderId);

  if (
    !order ||
    typeof order !== "object"
  ) {
    continue;
  }

  var actualStatus =
    getOrderStatus(order);

  if (actualStatus !== filterStatus) {
    continue;
  }

  if (!order.orderId) {
    order.orderId = orderId;
  }

  results.push({
    id: orderId,
    data: order
  });
}


// =====================================================
// ❌ NO RESULTS
// =====================================================

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
            callback_data: "ADMIN_FILTER_ORDERS"
          }
        ],
        [
          {
            text: "📦 All Orders",
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
  });

  return;
}


// =====================================================
// 📋 BUILD RESULT MESSAGE
// =====================================================

var text =
  "📊 <b>" +
  icon +
  " " +
  title +
  " ORDERS</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "📦 Total: <b>" +
  results.length +
  "</b>\n\n";

var buttons = [];
var maxResults = 10;

for (
  var j = 0;
  j < results.length && j < maxResults;
  j++
) {
  var item = results[j];
  var currentOrderId = item.id;
  var currentOrder = item.data;

  var clientName =
    currentOrder.name ||
    currentOrder.fullName ||
    currentOrder.clientName ||
    "User";

  var packageName =
    currentOrder.packageName ||
    currentOrder.packageType ||
    currentOrder.package ||
    "Custom Order";

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
    safeText(title) +
    "</b>\n\n";

  buttons.push([
    {
      text: "👁 View " + currentOrderId,
      callback_data: "ADMIN_ORDER " + currentOrderId
    }
  ]);
}


// =====================================================
// 🔘 NAVIGATION
// =====================================================

buttons.push([
  {
    text: "📊 Change Filter",
    callback_data: "ADMIN_FILTER_ORDERS"
  }
]);

buttons.push([
  {
    text: "🔎 Search Order",
    callback_data: "ADMIN_SEARCH_ORDER"
  },
  {
    text: "📦 All Orders",
    callback_data: "ADMIN_ORDERS"
  }
]);

buttons.push([
  {
    text: "👑 Admin Panel",
    callback_data: "ADMIN_PANEL"
  }
]);


// =====================================================
// 📩 SEND RESULTS
// =====================================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
});
