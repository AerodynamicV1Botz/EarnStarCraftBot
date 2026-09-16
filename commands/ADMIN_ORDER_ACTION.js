/*CMD
  command: ADMIN_ORDER_ACTION
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
  command: ADMIN_ORDER_ACTION
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// ADMIN_ORDER_ACTION
//
// PURPOSE:
// Selected order ke liye admin actions show karna.
// Destructive actions alag confirmation flow se honge.
// =====================================================


// =====================================================
// 👑 ADMIN CHECK
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

  if (String(configuredOwner).trim()) {
    adminIds.push(String(configuredOwner).trim());
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
      text: "Loading order actions",
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

if (!orderId) {
  Api.sendMessage({
    chat_id: uid,
    text: "⚠️ <b>Order ID missing.</b>",
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 📦 LOAD FINAL ORDER
// =====================================================

var order = Bot.getProperty("ORDER_" + orderId);

if (
  !order ||
  typeof order !== "object"
) {
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
// 📊 STATUS
// =====================================================

function getStatus(order) {
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
    paymentStatus === "remaining_proof_submitted"
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

var status = getStatus(order);


// =====================================================
// 📦 ORDER SUMMARY
// =====================================================

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

var progress = Number(order.progress);

if (isNaN(progress)) {
  progress = 0;
}

var text =
  "🛠️ <b>ORDER ACTIONS</b>\n\n" +

  "━━━━━━━━━━━━━━━━━━\n\n" +

  "🆔 <b>Order ID:</b>\n" +
  "<code>" +
  safeText(orderId) +
  "</code>\n\n" +

  "👤 <b>Client:</b> " +
  safeText(clientName) +
  "\n" +

  "📦 <b>Package:</b> " +
  safeText(packageName) +
  "\n" +

  "📊 <b>Status:</b> " +
  safeText(status.replace(/_/g, " ").toUpperCase()) +
  "\n" +

  "📈 <b>Progress:</b> " +
  progress +
  "%\n\n" +

  "Select an action below:";


// =====================================================
// 🔘 BUTTONS
// =====================================================

var buttons = [];


// =====================================================
// ⏳ PENDING ORDER
// =====================================================

if (status === "pending") {
  buttons.push([
    {
      text: "✅ Accept Order",
      callback_data: "ADMIN_ACCEPT " + orderId
    },
    {
      text: "❌ Reject Order",
      callback_data: "ADMIN_REJECT " + orderId
    }
  ]);
}


// =====================================================
// 💰 AMOUNT
// =====================================================

if (
  status === "pending" ||
  status === "accepted"
) {
  buttons.push([
    {
      text: "💰 Set Order Amount",
      callback_data: "ADMIN_AMOUNT_INPUT " + orderId
    }
  ]);
}


// =====================================================
// 💳 ADVANCE PAYMENT
// =====================================================

if (
  order.paymentStatus === "payment_pending" ||
  order.paymentStatus === "proof_submitted" ||
  order.paymentStatus === "payment_verification"
) {
  buttons.push([
    {
      text: "✅ Verify Advance Payment",
      callback_data: "ADMIN_VERIFY_PAYMENT " + orderId
    },
    {
      text: "❌ Reject Advance Payment",
      callback_data: "ADMIN_REJECT_PAYMENT " + orderId
    }
  ]);
}


// =====================================================
// 🚀 START WORK
// =====================================================

if (
  order.paymentStatus === "advance_paid" &&
  order.stage === "work_ready"
) {
  buttons.push([
    {
      text: "🚀 Start Work",
      callback_data: "ADMIN_START_WORK " + orderId
    }
  ]);
}


// =====================================================
// 📈 UPDATE PROGRESS
// =====================================================

if (
  order.stage === "in_progress" ||
  order.workStatus === "in_progress"
) {
  buttons.push([
    {
      text: "📈 Update Progress",
      callback_data: "ADMIN_UPDATE_PROGRESS " + orderId
    }
  ]);
}


// =====================================================
// ✅ MARK COMPLETE
// =====================================================

if (
  progress >= 100 &&
  order.stage === "in_progress"
) {
  buttons.push([
    {
      text: "✅ Mark Work Complete",
      callback_data: "ADMIN_MARK_COMPLETE " + orderId
    }
  ]);
}


// =====================================================
// 💳 REMAINING PAYMENT
// =====================================================

if (
  status === "remaining_payment"
) {
  buttons.push([
    {
      text: "💳 Request Remaining Payment",
      callback_data: "ADMIN_REQUEST_REMAINING_PAYMENT " + orderId
    }
  ]);

  if (
    order.paymentStatus === "remaining_proof_submitted" ||
    order.paymentStatus === "remaining_payment_verification"
  ) {
    buttons.push([
      {
        text: "✅ Verify Remaining Payment",
        callback_data: "ADMIN_VERIFY_REMAINING_PAYMENT " + orderId
      },
      {
        text: "❌ Reject Remaining Payment",
        callback_data: "ADMIN_REJECT_REMAINING_PAYMENT " + orderId
      }
    ]);
  }
}


// =====================================================
// 📦 DELIVERY
// =====================================================

if (
  status === "ready_for_delivery"
) {
  buttons.push([
    {
      text: "📦 Deliver Order",
      callback_data: "ADMIN_DELIVER_ORDER " + orderId
    }
  ]);
}


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
// 🧹 CANCEL / CLEANUP
// =====================================================

if (
  status !== "completed" &&
  status !== "cancelled"
) {
  buttons.push([
    {
      text: "🛑 Stop / Cancel Order",
      callback_data: "ADMIN_CANCEL_ORDER " + orderId
    }
  ]);
}

buttons.push([
  {
    text: "🧹 Cleanup / Delete",
    callback_data: "ADMIN_ORDER_CLEANUP " + orderId
  }
]);


// =====================================================
// 🔄 NAVIGATION
// =====================================================

buttons.push([
  {
    text: "🔄 Refresh",
    callback_data: "ADMIN_ORDER_ACTION " + orderId
  }
]);

buttons.push([
  {
    text: "📄 Order Details",
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
// 📩 SEND ACTION PANEL
// =====================================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
});
