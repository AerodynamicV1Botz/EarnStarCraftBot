/*CMD
  command: ADMIN_AMOUNT_INPUT
  help: 
  need_reply: true
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
  command: ADMIN_AMOUNT_INPUT
  need_reply: true
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 31 — ADMIN_AMOUNT_INPUT
// STEP 2.2.1.3.7.3
//
// ADMIN → ENTER TOTAL PROJECT AMOUNT
//        ↓
// ADMIN_REQUEST_PAYMENT <orderId>
//
// CONNECTED:
// ADMIN_ACCEPT
// ADMIN_REQUEST_PAYMENT
// ADMIN_VIEW_ORDER
// =====================================================


// =====================================================
// 1. HTML SAFE TEXT
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
// 2. ADMIN AUTHENTICATION
// =====================================================

var OWNER_ID = "7897324623";

var currentAdminId =
  String(user.telegramid || "").trim();

var adminList =
  Bot.getProperty("EARNSTAR_ADMINS") || [];

var isAdmin =
  currentAdminId === OWNER_ID;

if (!isAdmin && Array.isArray(adminList)) {
  for (var ai = 0; ai < adminList.length; ai++) {
    var adminItem = adminList[ai];
    var savedAdminId = "";

    if (
      typeof adminItem === "object" &&
      adminItem !== null
    ) {
      savedAdminId = String(
        adminItem.id ||
        adminItem.telegramId ||
        adminItem.userId ||
        ""
      ).trim();
    } else {
      savedAdminId =
        String(adminItem || "").trim();
    }

    if (savedAdminId === currentAdminId) {
      isAdmin = true;
      break;
    }
  }
}

if (!isAdmin) {
  Bot.sendMessage(
    "⛔ <b>You are not authorized.</b>",
    {
      parse_mode: "HTML"
    }
  );

  return;
}


// =====================================================
// 3. ACTIVE ORDER ID
// =====================================================

var activeOrderKey =
  "ADMIN_ACTIVE_ORDER_" + currentAdminId;

var orderId =
  Bot.getProperty(activeOrderKey);

orderId =
  String(orderId || "").trim();

if (!orderId) {
  Bot.sendMessage(
    "⚠️ <b>No active order found.</b>\n\n" +
    "Please accept an order first.",
    {
      parse_mode: "HTML"
    }
  );

  return;
}


// =====================================================
// 4. LOAD FINAL ORDER
// =====================================================

var orderKey =
  "ORDER_" + orderId;

var order =
  Bot.getProperty(orderKey);

if (
  !order ||
  typeof order !== "object" ||
  Array.isArray(order)
) {
  Bot.sendMessage(
    "❌ <b>Order data not found.</b>\n\n" +
    "🆔 Order ID: <code>" +
    safeText(orderId) +
    "</code>",
    {
      parse_mode: "HTML"
    }
  );

  Bot.setProperty(
    activeOrderKey,
    "",
    "string"
  );

  return;
}


// =====================================================
// 5. VALIDATE CURRENT STAGE
// =====================================================

if (
  String(order.stage || "").trim() !==
  "admin_total_amount_input"
) {
  Bot.sendMessage(
    "⚠️ <b>This order is not waiting for total amount.</b>\n\n" +
    "🆔 <b>Order ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n" +
    "📌 <b>Current Stage:</b> <code>" +
    safeText(order.stage || "unknown") +
    "</code>",
    {
      parse_mode: "HTML"
    }
  );

  return;
}


// =====================================================
// 6. READ ADMIN MESSAGE
// =====================================================

var inputAmount = "";

if (
  typeof message === "object" &&
  message !== null
) {
  inputAmount =
    message.text ||
    message.caption ||
    "";
} else {
  inputAmount =
    String(message || "");
}

inputAmount =
  String(inputAmount || "").trim();

if (!inputAmount) {
  Bot.sendMessage(
    "❌ <b>Please enter the total project amount.</b>\n\n" +
    "Example: <code>5000</code>",
    {
      parse_mode: "HTML"
    }
  );

  Bot.runCommand("ADMIN_AMOUNT_INPUT");

  return;
}


// =====================================================
// 7. CLEAN AMOUNT
// =====================================================

var cleanAmount =
  inputAmount
    .replace(/₹/g, "")
    .replace(/INR/gi, "")
    .replace(/,/g, "")
    .replace(/\s/g, "")
    .trim();


// =====================================================
// 8. VALIDATE AMOUNT FORMAT
// =====================================================

if (!/^\d+(\.\d{1,2})?$/.test(cleanAmount)) {
  Bot.sendMessage(
    "❌ <b>Invalid amount.</b>\n\n" +
    "Please enter only numbers.\n\n" +
    "Examples:\n" +
    "<code>5000</code>\n" +
    "<code>5000.50</code>\n" +
    "<code>₹5,000</code>",
    {
      parse_mode: "HTML"
    }
  );

  Bot.runCommand("ADMIN_AMOUNT_INPUT");

  return;
}

var totalAmount =
  Number(cleanAmount);

if (
  !isFinite(totalAmount) ||
  totalAmount <= 0
) {
  Bot.sendMessage(
    "❌ <b>Amount must be greater than ₹0.</b>\n\n" +
    "Please enter a valid total amount.",
    {
      parse_mode: "HTML"
    }
  );

  Bot.runCommand("ADMIN_AMOUNT_INPUT");

  return;
}


// =====================================================
// 9. ROUND TOTAL AMOUNT
// =====================================================

totalAmount =
  Math.round(totalAmount * 100) / 100;


// =====================================================
// 10. CALCULATE 50% PAYMENT SPLIT
// =====================================================

var advanceAmount =
  Math.round((totalAmount / 2) * 100) / 100;

var remainingAmount =
  Math.round(
    (totalAmount - advanceAmount) * 100
  ) / 100;


// =====================================================
// 11. UPDATE FINAL ORDER
// =====================================================

var now =
  new Date().toISOString();

order.totalAmount =
  totalAmount;

order.price =
  totalAmount;

order.packagePrice =
  totalAmount;

order.advancePercentage =
  50;

order.remainingPercentage =
  50;

order.advanceAmount =
  advanceAmount;

order.remainingAmount =
  remainingAmount;

order.stage =
  "amount_ready";

order.packageStep =
  "amount_ready";

order.requestStatus =
  "accepted";

order.orderStatus =
  "accepted";

order.paymentStatus =
  "advance_pending";

order.acceptedBy =
  order.acceptedBy || currentAdminId;

order.acceptedAt =
  order.acceptedAt || now;

order.amountEnteredBy =
  currentAdminId;

order.amountEnteredAt =
  now;

order.progress =
  20;

order.progressTitle =
  "Order Accepted";

order.progressUpdate =
  "Advance payment is pending.";

order.updatedAt =
  now;


// =====================================================
// 12. SAVE FINAL ORDER ONLY
// =====================================================

Bot.setProperty(
  orderKey,
  order,
  "json"
);


// =====================================================
// 13. UPDATE ORDER HISTORY
// =====================================================

var orderHistory =
  Bot.getProperty("ORDER_HISTORY_" + orderId) || [];

if (!Array.isArray(orderHistory)) {
  orderHistory = [];
}

orderHistory.push(order);

Bot.setProperty(
  "ORDER_HISTORY_" + orderId,
  orderHistory,
  "json"
);


// =====================================================
// 14. PRESERVE ORDER USER REFERENCE
// =====================================================

var orderUserId =
  String(
    order.userId ||
    order.telegramId ||
    Bot.getProperty("ORDER_USER_" + orderId) ||
    ""
  ).trim();

if (orderUserId) {
  Bot.setProperty(
    "ORDER_USER_" + orderId,
    orderUserId,
    "string"
  );
}


// =====================================================
// 15. CLEAR ACTIVE ADMIN ORDER
// =====================================================

Bot.setProperty(
  activeOrderKey,
  "",
  "string"
);


// =====================================================
// 16. MONEY FORMAT
// =====================================================

function money(amount) {
  return "₹" +
    Number(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
}


// =====================================================
// 17. RESULT MESSAGE
// =====================================================

var resultMessage =
  "✅ <b>ORDER AMOUNT SAVED</b>\n\n" +

  "🆔 <b>Order ID:</b> <code>" +
  safeText(orderId) +
  "</code>\n" +

  "📦 <b>Package:</b> " +
  safeText(order.packageName || order.packageType || "Custom Build") +
  "\n\n" +

  "💰 <b>Total Amount:</b> " +
  money(totalAmount) +
  "\n" +

  "🟢 <b>Advance 50%:</b> " +
  money(advanceAmount) +
  "\n" +

  "🟡 <b>Remaining 50%:</b> " +
  money(remainingAmount) +
  "\n\n" +

  "📌 <b>Status:</b> Advance Pending\n" +
  "📍 <b>Stage:</b> Amount Ready";


// =====================================================
// 18. ADMIN ACTION BUTTONS
// =====================================================

var buttons = [
  [
    {
      text: "💳 Request Advance Payment",
      callback_data:
        "ADMIN_REQUEST_PAYMENT " + orderId
    }
  ],
  [
    {
      text: "📋 View Order",
      callback_data:
        "ADMIN_VIEW_ORDER " + orderId
    }
  ],
  [
    {
      text: "⬅️ Admin Panel",
      callback_data: "ADMIN_PANEL"
    }
  ]
];


// =====================================================
// 19. SEND RESULT
// =====================================================

Bot.sendInlineKeyboard(
  buttons,
  resultMessage
);
