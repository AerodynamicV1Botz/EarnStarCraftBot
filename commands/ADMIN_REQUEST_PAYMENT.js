/*CMD
  command: ADMIN_REQUEST_PAYMENT
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
  command: ADMIN_REQUEST_PAYMENT
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 31 — ADMIN_REQUEST_PAYMENT
// STEP 2.2.1.3.7.3
//
// ADMIN → REQUEST ADVANCE PAYMENT FROM CLIENT
//
// NEXT:
// ORDER_PAYMENT_PROOF <orderId>
// ORDER_CONTACT_ADMIN <orderId>
// =====================================================


// =====================================================
// 👤 ADMIN ID
// =====================================================

var adminId =
  String(user.telegramid || "").trim();


// =====================================================
// 🔐 HTML SAFE TEXT
// =====================================================

function safeText(value) {

  return String(
    value === null || typeof value === "undefined"
      ? ""
      : value
  )
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


function money(value) {

  var amount = Number(value);

  if (!isFinite(amount)) {
    amount = 0;
  }

  return amount.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });

}


// =====================================================
// 🔐 ADMIN AUTHORIZATION
// OWNER + EARNSTAR_ADMINS
// =====================================================

var OWNER_ID =
  String(
    Bot.getProperty("OWNER_ID") ||
    "7897324623"
  ).trim();

var adminIds = [];

function addAdmin(value) {

  if (
    value === null ||
    typeof value === "undefined"
  ) {
    return;
  }

  if (
    typeof value === "object" &&
    value !== null
  ) {

    value =
      value.id ||
      value.telegramId ||
      value.userId ||
      "";

  }

  value =
    String(value || "").trim();

  if (
    value &&
    value !== "undefined" &&
    value !== "null" &&
    value !== "[object Object]" &&
    adminIds.indexOf(value) === -1
  ) {

    adminIds.push(value);

  }

}

addAdmin(OWNER_ID);

var savedAdmins =
  Bot.getProperty("EARNSTAR_ADMINS");

if (Array.isArray(savedAdmins)) {

  for (
    var i = 0;
    i < savedAdmins.length;
    i++
  ) {

    addAdmin(savedAdmins[i]);

  }

}

else {

  addAdmin(savedAdmins);

}


if (
  adminIds.indexOf(adminId) === -1
) {

  Api.sendMessage({

    chat_id: adminId,

    text:
      "⛔ <b>You are not authorized.</b>",

    parse_mode: "HTML"

  });

  return;

}


// =====================================================
// 🔘 CALLBACK ANSWER
// =====================================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {

  try {

    Api.answerCallbackQuery({

      callback_query_id: request.id,

      text: "Payment request processing...",

      show_alert: false

    });

  }

  catch (e) {}

}


// =====================================================
// 🆔 SAFE ORDER ID PARSING
// =====================================================

var rawData = "";

if (
  typeof params !== "undefined" &&
  params !== null
) {

  if (typeof params === "object") {

    rawData =
      params.orderId ||
      params.id ||
      params.text ||
      "";

  }

  else {

    rawData =
      String(params);

  }

}

if (!rawData) {

  if (
    typeof request !== "undefined" &&
    request
  ) {

    rawData =
      request.data ||
      request.callback_data ||
      "";

  }

}

if (!rawData) {

  if (
    typeof message !== "undefined" &&
    message !== null
  ) {

    if (typeof message === "object") {

      rawData =
        message.text ||
        message.caption ||
        "";

    }

    else {

      rawData =
        String(message);

    }

  }

}

rawData =
  String(rawData || "")
    .trim();

rawData =
  rawData.replace(
    /^ADMIN_REQUEST_PAYMENT(?:\s+|$)/i,
    ""
  ).trim();

var orderId =
  String(rawData || "").trim();


// =====================================================
// ❌ INVALID ORDER ID
// =====================================================

if (!orderId) {

  Api.sendMessage({

    chat_id: adminId,

    text:
      "❌ <b>Invalid order ID.</b>\n\n" +
      "Payment request could not be processed.",

    parse_mode: "HTML"

  });

  return;

}


// =====================================================
// 📦 LOAD ORDER
// =====================================================

var orderKey =
  "ORDER_" + orderId;

var order =
  Bot.getProperty(orderKey);

if (
  !order ||
  typeof order !== "object"
) {

  Api.sendMessage({

    chat_id: adminId,

    text:
      "❌ <b>Order not found.</b>\n\n" +
      "🆔 Order ID: <code>" +
      safeText(orderId) +
      "</code>",

    parse_mode: "HTML"

  });

  return;

}


// =====================================================
// 👤 CLIENT ID
// =====================================================

var profile =
  order.telegramProfile || {};

var clientId =
  String(
    order.userId ||
    order.telegramId ||
    profile.telegramId ||
    Bot.getProperty("ORDER_USER_" + orderId) ||
    ""
  ).trim();

if (!clientId) {

  Api.sendMessage({

    chat_id: adminId,

    text:
      "❌ <b>Client Telegram ID not found.</b>\n\n" +
      "🆔 Order ID: <code>" +
      safeText(orderId) +
      "</code>",

    parse_mode: "HTML"

  });

  return;

}


// =====================================================
// 🛑 ORDER STATUS VALIDATION
// =====================================================

var closedStatuses = [
  "rejected",
  "completed",
  "delivered",
  "cancelled"
];

var orderStatus =
  String(order.orderStatus || "").toLowerCase();

var requestStatus =
  String(order.requestStatus || "").toLowerCase();

if (
  closedStatuses.indexOf(orderStatus) !== -1 ||
  closedStatuses.indexOf(requestStatus) !== -1
) {

  Api.sendMessage({

    chat_id: adminId,

    text:
      "⚠️ <b>Payment request is not available.</b>\n\n" +
      "This order is already closed.\n\n" +
      "🆔 Order ID: <code>" +
      safeText(orderId) +
      "</code>",

    parse_mode: "HTML"

  });

  return;

}


// =====================================================
// 🛑 DUPLICATE PAYMENT REQUEST PROTECTION
// =====================================================

var currentPaymentStatus =
  String(order.paymentStatus || "").toLowerCase();

if (
  currentPaymentStatus === "advance_requested" ||
  currentPaymentStatus === "advance_paid" ||
  currentPaymentStatus === "proof_submitted" ||
  currentPaymentStatus === "payment_verification" ||
  currentPaymentStatus === "remaining_payment_requested" ||
  currentPaymentStatus === "remaining_paid" ||
  currentPaymentStatus === "fully_paid" ||
  currentPaymentStatus === "completed"
) {

  Api.sendMessage({

    chat_id: adminId,

    text:
      "⚠️ <b>Advance payment request already exists.</b>\n\n" +
      "💳 <b>Current Status:</b> " +
      safeText(order.paymentStatus) +
      "\n\n" +
      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>",

    parse_mode: "HTML"

  });

  return;

}


// =====================================================
// 💰 READ TOTAL AMOUNT
// =====================================================

var totalAmount =
  Number(
    order.totalAmount ||
    order.totalPrice ||
    order.price ||
    order.packagePrice ||
    0
  );

if (
  !isFinite(totalAmount) ||
  totalAmount <= 0
) {

  Api.sendMessage({

    chat_id: adminId,

    text:
      "⚠️ <b>Total amount is not set.</b>\n\n" +
      "Please set the final quote first using ADMIN_AMOUNT_INPUT.",

    parse_mode: "HTML"

  });

  return;

}

totalAmount =
  Math.round(totalAmount * 100) / 100;


// =====================================================
// 💰 CALCULATE ADVANCE AND REMAINING
// =====================================================

var advanceAmount =
  Number(order.advanceAmount || 0);

if (
  !isFinite(advanceAmount) ||
  advanceAmount <= 0
) {

  advanceAmount =
    totalAmount / 2;

}

advanceAmount =
  Math.round(advanceAmount * 100) / 100;

if (advanceAmount > totalAmount) {

  advanceAmount =
    totalAmount;

}

var remainingAmount =
  Math.round(
    (totalAmount - advanceAmount) * 100
  ) / 100;

if (remainingAmount < 0) {

  remainingAmount = 0;

}


// =====================================================
// 💳 PAYMENT SETTINGS
// =====================================================

var upiId =
  String(
    Bot.getProperty("EARNSTAR_UPI_ID") || ""
  ).trim();

var paymentName =
  String(
    Bot.getProperty("EARNSTAR_PAYMENT_NAME") ||
    "EarnStar"
  ).trim();

var paymentNote =
  String(
    Bot.getProperty("EARNSTAR_PAYMENT_NOTE") ||
    "Payment karne ke baad screenshot admin ko bhejein."
  ).trim();

var qrImage =
  String(
    Bot.getProperty("EARNSTAR_QR_IMAGE") || ""
  ).trim();


// =====================================================
// 📝 PAYMENT MESSAGE
// =====================================================

var paymentText =

  "💳 <b>ADVANCE PAYMENT REQUIRED</b>\n\n" +

  "🆔 <b>Order ID:</b> <code>" +
  safeText(orderId) +
  "</code>\n\n" +

  "📦 <b>Package:</b> " +
  safeText(
    order.packageName ||
    order.packageType ||
    "Custom Order"
  ) +
  "\n\n" +

  "💰 <b>Total Amount:</b> ₹" +
  money(totalAmount) +
  "\n" +

  "🟢 <b>Advance Amount:</b> ₹" +
  money(advanceAmount) +
  "\n" +

  "🟡 <b>Remaining Amount:</b> ₹" +
  money(remainingAmount) +
  "\n\n" +

  "🏦 <b>Payment Name:</b> " +
  safeText(paymentName) +
  "\n" +

  "📲 <b>UPI ID:</b> " +
  safeText(
    upiId ||
    "Payment details ke liye admin se contact karein."
  ) +
  "\n\n" +

  "📝 <b>Instructions:</b>\n" +
  safeText(paymentNote) +
  "\n\n" +

  "📩 Payment karne ke baad payment proof submit karein.";


// =====================================================
// 🔘 CLIENT BUTTONS
// =====================================================

var userButtons = [];

if (upiId) {

  userButtons.push([

    {
      text: "💳 Pay Advance",

      url:
        "upi://pay?pa=" +
        encodeURIComponent(upiId) +
        "&pn=" +
        encodeURIComponent(paymentName) +
        "&am=" +
        encodeURIComponent(
          advanceAmount.toFixed(2)
        ) +
        "&cu=INR"
    }

  ]);

}

userButtons.push([

  {
    text: "📤 Submit Payment Proof",

    callback_data:
      "ORDER_PAYMENT_PROOF " + orderId
  }

]);

userButtons.push([

  {
    text: "💬 Contact Admin",

    callback_data:
      "ORDER_CONTACT_ADMIN " + orderId
  }

]);


// =====================================================
// 📤 SEND PAYMENT REQUEST TO CLIENT
// =====================================================

var sendSucceeded = false;

try {

  if (qrImage) {

    Api.sendPhoto({

      chat_id: clientId,

      photo: qrImage,

      caption: paymentText,

      parse_mode: "HTML",

      reply_markup: {
        inline_keyboard: userButtons
      }

    });

  }

  else {

    Api.sendMessage({

      chat_id: clientId,

      text: paymentText,

      parse_mode: "HTML",

      reply_markup: {
        inline_keyboard: userButtons
      }

    });

  }

  sendSucceeded = true;

}

catch (sendError) {

  sendSucceeded = false;

}


// =====================================================
// ❌ DELIVERY FAILURE
// =====================================================

if (!sendSucceeded) {

  Bot.setProperty(
    "ADMIN_NOTIFY_ERROR_" +
    orderId +
    "_" +
    adminId,
    String(new Date().toISOString()),
    "string"
  );

  Api.sendMessage({

    chat_id: adminId,

    text:
      "❌ <b>Payment request could not be sent.</b>\n\n" +
      "Possible reason: client blocked the bot or Telegram delivery failed.\n\n" +
      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>",

    parse_mode: "HTML"

  });

  return;

}


// =====================================================
// 💾 UPDATE ORDER
// =====================================================

var now =
  new Date().toISOString();

order.totalAmount =
  totalAmount;

order.totalPrice =
  totalAmount;

order.price =
  totalAmount;

order.packagePrice =
  totalAmount;

order.advanceAmount =
  advanceAmount;

order.remainingAmount =
  remainingAmount;

order.advancePercentage =
  Math.round(
    (advanceAmount / totalAmount) * 100
  );

order.remainingPercentage =
  Math.round(
    (remainingAmount / totalAmount) * 100
  );

order.stage =
  "advance_payment";

order.packageStep =
  "advance_payment";

order.requestStatus =
  "accepted";

order.orderStatus =
  "accepted";

order.paymentStatus =
  "advance_requested";

order.advanceRequestedBy =
  adminId;

order.advanceRequestedAt =
  now;

order.adminId =
  adminId;

order.updatedAt =
  now;

order.progress =
  30;

order.progressTitle =
  "Advance Payment Requested";

order.progressUpdate =
  "Advance payment details sent to client.";


// =====================================================
// 💾 PRIMARY ORDER STORAGE
// =====================================================

Bot.setProperty(
  orderKey,
  order,
  "json"
);


// =====================================================
// 💾 ORDER → USER MAPPING
// =====================================================

Bot.setProperty(
  "ORDER_USER_" + orderId,
  clientId,
  "string"
);


// =====================================================
// 💾 ORDER HISTORY
// =====================================================

Bot.setProperty(
  "ORDER_HISTORY_" + orderId,
  order,
  "json"
);


// =====================================================
// 📩 ADMIN CONFIRMATION
// =====================================================

Api.sendMessage({

  chat_id: adminId,

  text:

    "✅ <b>ADVANCE PAYMENT REQUEST SENT</b>\n\n" +

    "🆔 <b>Order ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n\n" +

    "💰 <b>Total:</b> ₹" +
    money(totalAmount) +
    "\n" +

    "🟢 <b>Advance:</b> ₹" +
    money(advanceAmount) +
    "\n" +

    "🟡 <b>Remaining:</b> ₹" +
    money(remainingAmount) +
    "\n\n" +

    "📌 <b>Status:</b> Advance Requested\n" +

    "👤 <b>Client ID:</b> <code>" +
    safeText(clientId) +
    "</code>",

  parse_mode: "HTML",

  reply_markup: {

    inline_keyboard: [

      [
        {
          text: "👁 View Order",

          callback_data:
            "ADMIN_VIEW_ORDER " + orderId
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

});
