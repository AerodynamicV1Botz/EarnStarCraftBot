/*CMD
  command: ADMIN_ORDER
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
  command: ADMIN_ORDER
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT — ADMIN_ORDER
//
// PURPOSE:
// - Show complete final order details
// - Show current lifecycle/payment status
// - Open centralized ADMIN_ORDER_ACTION flow
// - Keep contact, history and cleanup separate
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
  var adminItem = configuredAdmins[a];

  if (typeof adminItem === "object") {
    adminItem =
      adminItem.id ||
      adminItem.telegramId ||
      adminItem.userId ||
      "";
  }

  adminItem = String(adminItem || "").trim();

  if (adminItem) {
    adminIds.push(adminItem);
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
            callback_data: "MAIN_MENU"
          }
        ]
      ]
    }
  });

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
      text: "Loading order details",
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
      "Order ID: <code>" +
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
// 📊 STATUS HELPER
// =====================================================

function getOrderStatus(order) {
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
  if (status === "active") return "🔵";
  if (status === "accepted") return "🟣";
  if (status === "completed") return "🟢";
  if (status === "cancelled") return "🔴";
  if (status === "remaining_payment") return "🟠";
  if (status === "ready_for_delivery") return "📦";

  return "🟡";
}

var status = getOrderStatus(order);
var statusIcon = getStatusIcon(status);

var statusText = status
  .replace(/_/g, " ")
  .toUpperCase();


// =====================================================
// 👤 CLIENT DETAILS
// =====================================================

var clientId = String(
  order.userId ||
  order.telegramId ||
  (
    order.telegramProfile &&
    (
      order.telegramProfile.telegramId ||
      order.telegramProfile.userId
    )
  ) ||
  Bot.getProperty("ORDER_USER_" + orderId) ||
  "Not available"
).trim();

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
// 💰 PAYMENT DETAILS
// =====================================================

function money(value) {
  if (
    value === undefined ||
    value === null ||
    String(value).trim() === ""
  ) {
    return "Not set";
  }

  return "₹" + safeText(value);
}

var totalAmount =
  order.totalAmount !== undefined
    ? order.totalAmount
    : (
        order.amount !== undefined
          ? order.amount
          : order.price
      );

var advanceAmount =
  order.advanceAmount !== undefined
    ? order.advanceAmount
    : "";

var remainingAmount =
  order.remainingAmount !== undefined
    ? order.remainingAmount
    : "";


// =====================================================
// 🕐 DATE FORMAT
// =====================================================

function formatDate(value) {
  if (!value) {
    return "Not available";
  }

  try {
    return new Date(value).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata"
    });
  } catch (error) {
    return String(value);
  }
}

var createdTime = formatDate(
  order.createdAt ||
  order.timestamp ||
  order.created
);

var updatedTime = formatDate(
  order.updatedAt ||
  order.lastUpdatedAt
);


// =====================================================
// 📞 CONTACT DETAILS
// =====================================================

var contacts = order.contacts || {};

var contactText =
  "📱 Telegram: " +
  safeText(contacts.telegram || "Not provided") +
  "\n" +

  "📞 Mobile: " +
  safeText(contacts.otherNumber || "Not provided") +
  "\n" +

  "📸 Instagram: " +
  safeText(contacts.instagram || "Not provided") +
  "\n" +

  "💬 WhatsApp: " +
  safeText(contacts.whatsapp || "Not provided") +
  "\n" +

  "📧 Email: " +
  safeText(contacts.email || "Not provided");


// =====================================================
// 📝 ORDER INFORMATION
// =====================================================

var requirements =
  order.finalRequirements ||
  order.requirements ||
  order.originalRequirements ||
  "Not provided";

var budget =
  order.budget ||
  "Not provided";

var extraDetails =
  order.extraDetails ||
  "Not provided";


// =====================================================
// 📄 DETAILS MESSAGE
// =====================================================

var text =
  "📦 <b>ORDER DETAILS</b>\n\n" +

  "━━━━━━━━━━━━━━━━━━\n\n" +

  "🆔 <b>Order ID:</b>\n" +
  "<code>" +
  safeText(orderId) +
  "</code>\n\n" +

  "📦 <b>Package:</b>\n" +
  safeText(packageName) +
  "\n\n" +

  "📋 <b>Enquiry:</b>\n" +
  "<code>" +
  safeText(
    order.enquiryRef ||
    order.enquiryId ||
    "Not applicable"
  ) +
  "</code>\n\n" +

  "👤 <b>Client:</b>\n" +
  safeText(clientName) +
  "\n\n" +

  "🆔 <b>Telegram ID:</b>\n" +
  "<code>" +
  safeText(clientId) +
  "</code>\n\n" +

  "💰 <b>Total Amount:</b> " +
  money(totalAmount) +
  "\n" +

  "💵 <b>Advance:</b> " +
  money(advanceAmount) +
  "\n" +

  "💳 <b>Remaining:</b> " +
  money(remainingAmount) +
  "\n\n" +

  statusIcon +
  " <b>Status:</b> " +
  safeText(statusText) +
  "\n\n" +

  "🕐 <b>Created:</b>\n" +
  safeText(createdTime) +
  "\n\n" +

  "🔄 <b>Updated:</b>\n" +
  safeText(updatedTime) +
  "\n\n" +

  "📞 <b>Contact Details:</b>\n" +
  contactText +
  "\n\n" +

  "📝 <b>Requirements:</b>\n" +
  safeText(requirements) +
  "\n\n" +

  "💰 <b>Budget:</b>\n" +
  safeText(budget) +
  "\n\n" +

  "📌 <b>Extra Details:</b>\n" +
  safeText(extraDetails) +
  "\n\n" +

  "━━━━━━━━━━━━━━━━━━";


// =====================================================
// 🔘 BUTTONS
// =====================================================

var buttons = [];


// =====================================================
// ⚙️ CENTRAL ACTIONS
// =====================================================

buttons.push([
  {
    text: "⚙️ Order Actions",
    callback_data: "ADMIN_ORDER_ACTION " + orderId
  }
]);


// =====================================================
// 📞 CONTACT CLIENT
// =====================================================

buttons.push([
  {
    text: "📞 Contact Client",
    callback_data: "ADMIN_REPLY_CLIENT " + orderId
  }
]);


// =====================================================
// 📜 HISTORY
// =====================================================

buttons.push([
  {
    text: "📜 Order History",
    callback_data: "ADMIN_ORDER_HISTORY " + orderId
  }
]);


// =====================================================
// 🧹 CLEANUP
// =====================================================

buttons.push([
  {
    text: "🧹 Cancel / Cleanup",
    callback_data: "ADMIN_ORDER_CLEANUP " + orderId
  }
]);


// =====================================================
// 🔄 NAVIGATION
// =====================================================

buttons.push([
  {
    text: "🔄 Refresh",
    callback_data: "ADMIN_ORDER " + orderId
  }
]);

buttons.push([
  {
    text: "📦 All Orders",
    callback_data: "ADMIN_ORDERS"
  },
  {
    text: "👑 Admin Panel",
    callback_data: "ADMIN_PANEL"
  }
]);


// =====================================================
// 📩 SEND DETAILS
// =====================================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
});
