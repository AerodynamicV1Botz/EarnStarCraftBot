/*CMD
  command: ORDER_REMAINING_PAYMENT_PROOF_SAVE
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
  command: ORDER_REMAINING_PAYMENT_PROOF_SAVE
  need_reply: true
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT — ORDER_REMAINING_PAYMENT_PROOF_SAVE
//
// CLIENT → SUBMIT REMAINING PAYMENT SCREENSHOT
//
// Connected with:
// ADMIN_REQUEST_REMAINING_PAYMENT
// ORDER_REMAINING_PAYMENT_PROOF
//
// Next:
// ADMIN_VERIFY_REMAINING_PAYMENT
// ADMIN_REJECT_REMAINING_PAYMENT
// =====================================================


// =====================================================
// 👤 USER ID
// =====================================================

var uid = String(user.telegramid);


// =====================================================
// 🧹 SAFE HTML TEXT
// =====================================================

function safeText(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function money(value) {
  var amount = Number(value || 0);

  if (
    isNaN(amount) ||
    !isFinite(amount) ||
    amount < 0
  ) {
    amount = 0;
  }

  return amount.toFixed(2);
}

function clearWaitingState() {
  Bot.setProperty(
    "REMAINING_PAYMENT_PROOF_WAITING_" + uid,
    "",
    "string"
  );
}


// =====================================================
// ⏳ LOAD WAITING ORDER
// =====================================================

var waitingOrderId = Bot.getProperty(
  "REMAINING_PAYMENT_PROOF_WAITING_" + uid
);

if (!waitingOrderId) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>No pending remaining payment proof request found.</b>\n\n" +
      "Please open your order and try again.",
    parse_mode: "HTML"
  });
  return;
}

var orderId = String(
  waitingOrderId
).trim();


// =====================================================
// 📨 READ INCOMING MESSAGE
// =====================================================

var incomingText = "";

if (
  typeof message !== "undefined" &&
  message
) {
  if (message.text) {
    incomingText = String(message.text).trim();
  } else if (message.caption) {
    incomingText = String(message.caption).trim();
  }
}

if (
  !incomingText &&
  typeof request !== "undefined" &&
  request
) {
  if (request.text) {
    incomingText = String(request.text).trim();
  }
}


// =====================================================
// ❌ CANCEL
// =====================================================

if (
  incomingText === "/cancel" ||
  incomingText === "❌ Cancel" ||
  incomingText === "❌ Cancel Proof"
) {
  clearWaitingState();

  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ Remaining payment proof submission cancelled."
  });
  return;
}


// =====================================================
// 📦 LOAD ORDER
// =====================================================

var order = Bot.getProperty(
  "ORDER_" + orderId
);

if (
  !order ||
  typeof order !== "object"
) {
  clearWaitingState();

  Api.sendMessage({
    chat_id: uid,
    text: "❌ Order not found."
  });
  return;
}


// =====================================================
// 👤 CLIENT ID RESOLUTION
// =====================================================

var clientId = "";

if (order.userId) {
  clientId = String(order.userId);
}

if (
  !clientId &&
  order.telegramId
) {
  clientId = String(order.telegramId);
}

if (
  !clientId &&
  order.telegramProfile
) {
  clientId = String(
    order.telegramProfile.telegramId ||
    order.telegramProfile.userId ||
    ""
  );
}

if (!clientId) {
  clientId = String(
    Bot.getProperty("ORDER_USER_" + orderId) || ""
  );
}

if (
  !clientId &&
  order.clientId
) {
  clientId = String(order.clientId);
}

if (
  !clientId ||
  clientId !== uid
) {
  clearWaitingState();

  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>This order does not belong to you.</b>",
    parse_mode: "HTML"
  });
  return;
}


// =====================================================
// 🛑 DUPLICATE PROOF CHECK
// =====================================================

if (
  order.paymentStatus === "remaining_proof_submitted" ||
  order.paymentStatus === "remaining_payment_verification" ||
  order.paymentStatus === "remaining_paid" ||
  order.paymentStatus === "delivered" ||
  order.paymentStatus === "fully_paid"
) {
  clearWaitingState();

  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>Remaining payment proof already submitted.</b>\n\n" +
      "Please admin verification ka wait karein.",
    parse_mode: "HTML"
  });
  return;
}


// =====================================================
// 💳 PAYMENT STATUS CHECK
// =====================================================

if (
  order.paymentStatus !== "remaining_payment_requested" &&
  order.paymentStatus !== "remaining_payment_pending"
) {
  clearWaitingState();

  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>Remaining payment proof cannot be submitted now.</b>\n\n" +
      "📌 <b>Current status:</b> " +
      safeText(order.paymentStatus || "unknown"),
    parse_mode: "HTML"
  });
  return;
}


// =====================================================
// 📷 PHOTO CHECK
// =====================================================

var incomingMessage =
  typeof message !== "undefined" &&
  message
    ? message
    : {};

var photoList =
  incomingMessage.photo || [];

if (
  !Array.isArray(photoList) ||
  photoList.length === 0
) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>Please send the payment screenshot as a photo.</b>\n\n" +
      "Text ya document nahi, clear screenshot photo bhejein.",
    parse_mode: "HTML"
  });
  return;
}


// =====================================================
// 🖼️ HIGHEST QUALITY PHOTO
// =====================================================

var highestPhoto =
  photoList[photoList.length - 1];

var fileId =
  highestPhoto &&
  highestPhoto.file_id
    ? String(highestPhoto.file_id)
    : "";

if (!fileId) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ Screenshot file detect nahi ho paayi. Please dobara try karein."
  });
  return;
}


// =====================================================
// 💰 REMAINING AMOUNT
// =====================================================

var remainingAmount = Number(
  order.remainingAmount || 0
);

if (
  isNaN(remainingAmount) ||
  !isFinite(remainingAmount) ||
  remainingAmount <= 0
) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ Remaining amount valid nahi hai. Please admin se contact karein."
  });
  return;
}


// =====================================================
// 👑 ADMIN LIST
// =====================================================

var OWNER_ID = "7897324623";

var adminList =
  Bot.getProperty("EARNSTAR_ADMINS") || [];

if (!Array.isArray(adminList)) {
  adminList = [];
}

var adminIds = [
  OWNER_ID
];

for (var i = 0; i < adminList.length; i++) {
  var item = adminList[i];
  var adminId = "";

  if (
    typeof item === "object" &&
    item !== null
  ) {
    adminId = String(
      item.id ||
      item.telegramId ||
      item.userId ||
      ""
    );
  } else {
    adminId = String(item || "");
  }

  if (
    adminId &&
    adminIds.indexOf(adminId) === -1
  ) {
    adminIds.push(adminId);
  }
}


// =====================================================
// 🕐 PREPARE PROOF DATA
// =====================================================

var now = new Date().toISOString();

var adminCaption =
  "💳 <b>Remaining Payment Proof Received</b>\n\n" +

  "🆔 <b>Order ID:</b> <code>" +
  safeText(orderId) +
  "</code>\n" +

  "👤 <b>Client ID:</b> <code>" +
  safeText(clientId) +
  "</code>\n" +

  "📦 <b>Package:</b> " +
  safeText(
    order.packageName ||
    order.packageType ||
    "Custom Order"
  ) +
  "\n" +

  "💰 <b>Remaining Amount:</b> ₹" +
  money(remainingAmount) +
  "\n\n" +

  "⚠️ Please verify the remaining payment screenshot.";

var adminButtons = [
  [
    {
      text: "✅ Verify Remaining Payment",
      callback_data:
        "ADMIN_VERIFY_REMAINING_PAYMENT " +
        orderId
    }
  ],
  [
    {
      text: "❌ Reject Proof",
      callback_data:
        "ADMIN_REJECT_REMAINING_PAYMENT " +
        orderId
    }
  ],
  [
    {
      text: "📋 View Order",
      callback_data:
        "ADMIN_VIEW_ORDER " +
        orderId
    }
  ]
];


// =====================================================
// 📤 SEND PROOF TO ADMINS
// =====================================================

var sentToAdminCount = 0;
var failedAdminIds = [];

for (var j = 0; j < adminIds.length; j++) {
  try {
    Api.sendPhoto({
      chat_id: adminIds[j],
      photo: fileId,
      caption: adminCaption,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: adminButtons
      }
    });

    sentToAdminCount++;

  } catch (adminError) {
    failedAdminIds.push(adminIds[j]);
  }
}


// =====================================================
// ❌ ADMIN SEND FAILURE
// =====================================================

if (sentToAdminCount === 0) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ Payment proof admin ko send nahi ho paaya.\n\n" +
      "Aapka proof status update nahi kiya gaya. Please dobara try karein."
  });
  return;
}

if (failedAdminIds.length > 0) {
  Bot.setProperty(
    "ADMIN_NOTIFY_ERROR_" + orderId,
    {
      orderId: orderId,
      failedAdminIds: failedAdminIds,
      timestamp: now,
      type: "remaining_payment_proof"
    },
    "json"
  );
}


// =====================================================
// 🕐 UPDATE ORDER AFTER ADMIN SEND
// =====================================================

order.paymentProofFileId =
  fileId;

order.remainingPaymentProofFileId =
  fileId;

order.paymentProofType =
  "remaining_payment";

order.remainingPaymentProofType =
  "photo";

order.paymentStatus =
  "remaining_proof_submitted";

order.paymentVerificationStatus =
  "pending";

order.stage =
  "remaining_payment_verification";

order.packageStep =
  "remaining_payment_proof_submitted";

// Important: completed nahi hoga.
// Admin verification ke baad completed/delivered hoga.
order.orderStatus =
  "remaining_payment";

order.remainingProofSubmittedBy =
  uid;

order.remainingProofSubmittedAt =
  now;

order.updatedAt =
  now;

order.userId =
  clientId;


// =====================================================
// 💾 SAVE ORDER
// =====================================================

Bot.setProperty(
  "ORDER_" + orderId,
  order,
  "json"
);

Bot.setProperty(
  "ORDER_USER_" + orderId,
  clientId,
  "string"
);


// =====================================================
// 📜 UPDATE HISTORY
// =====================================================

var historyKey =
  "ORDER_HISTORY_" + orderId;

var history =
  Bot.getProperty(historyKey) || [];

if (!Array.isArray(history)) {
  history = [];
}

history.push({
  action: "remaining_payment_proof_submitted",
  by: uid,
  timestamp: now,
  paymentStatus: order.paymentStatus,
  orderStatus: order.orderStatus,
  amount: remainingAmount,
  proofType: "photo"
});

Bot.setProperty(
  historyKey,
  history,
  "json"
);


// =====================================================
// 🧹 CLEAR WAITING STATE
// =====================================================

clearWaitingState();


// =====================================================
// 📩 CLIENT CONFIRMATION
// =====================================================

Api.sendMessage({
  chat_id: uid,

  text:
    "✅ <b>Remaining Payment Proof Submitted</b>\n\n" +

    "🆔 <b>Order ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n" +

    "💰 <b>Amount:</b> ₹" +
    money(remainingAmount) +
    "\n\n" +

    "Your payment screenshot has been sent to the admin.\n" +
    "Verification ke baad final delivery complete ki jayegi.",

  parse_mode: "HTML"
});
