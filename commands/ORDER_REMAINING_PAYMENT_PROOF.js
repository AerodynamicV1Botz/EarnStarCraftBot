/*CMD
  command: ORDER_REMAINING_PAYMENT_PROOF
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
  command: ORDER_REMAINING_PAYMENT_PROOF
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT — ORDER_REMAINING_PAYMENT_PROOF
//
// CLIENT → START REMAINING PAYMENT PROOF SUBMISSION
//
// Callback:
// ORDER_REMAINING_PAYMENT_PROOF <orderId>
//
// Next:
// ORDER_REMAINING_PAYMENT_PROOF_SAVE
// =====================================================


// =====================================================
// 🔘 CALLBACK RESPONSE
// =====================================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  try {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "📤 Payment proof upload mode open ho raha hai...",
      show_alert: false
    });
  } catch (e) {}
}


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


// =====================================================
// 👤 USER ID
// =====================================================

var uid = String(user.telegramid);


// =====================================================
// 🆔 GET ORDER ID
// =====================================================

var callbackData = "";
var orderId = "";

if (
  typeof params !== "undefined" &&
  params !== null
) {
  orderId = String(params).trim();
}

if (
  typeof request !== "undefined" &&
  request
) {
  callbackData = String(
    request.data ||
    request.callback_data ||
    ""
  ).trim();
}

if (!orderId) {
  orderId = callbackData;
}

orderId = orderId
  .replace(
    /^ORDER_REMAINING_PAYMENT_PROOF[\s|]*/i,
    ""
  )
  .trim();

if (orderId.indexOf("|") !== -1) {
  var callbackParts = orderId.split("|");

  orderId = String(
    callbackParts[callbackParts.length - 1] || ""
  ).trim();
}

if (!orderId) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ Invalid order ID."
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
  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>Order not found.</b>\n\n" +
      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>",
    parse_mode: "HTML"
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

if (!clientId) {
  clientId = String(
    order.clientId || ""
  );
}

if (
  !clientId ||
  clientId !== uid
) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>This order does not belong to you.</b>",
    parse_mode: "HTML"
  });
  return;
}


// =====================================================
// 🛑 DUPLICATE / ALREADY SUBMITTED CHECK
// =====================================================

if (
  order.paymentStatus === "remaining_proof_submitted" ||
  order.paymentStatus === "remaining_payment_verification" ||
  order.paymentStatus === "remaining_paid" ||
  order.paymentStatus === "delivered" ||
  order.paymentStatus === "fully_paid"
) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>Remaining payment proof already submitted hai.</b>\n\n" +
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
  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>Remaining payment proof is not available now.</b>\n\n" +
      "📌 <b>Current status:</b> " +
      safeText(order.paymentStatus || "unknown"),
    parse_mode: "HTML"
  });
  return;
}


// =====================================================
// 💰 REMAINING AMOUNT CHECK
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
// 🧹 CLEAR OLD WAITING STATE
// =====================================================

Bot.setProperty(
  "REMAINING_PAYMENT_PROOF_WAITING_" + uid,
  "",
  "string"
);


// =====================================================
// ⏳ SAVE WAITING ORDER
// =====================================================

Bot.setProperty(
  "REMAINING_PAYMENT_PROOF_WAITING_" + uid,
  orderId,
  "string"
);


// =====================================================
// 🕐 UPDATE ORDER STATE
// =====================================================

var now = new Date().toISOString();

order.stage =
  "remaining_payment_proof_input";

order.packageStep =
  "remaining_payment_proof_input";

// Important: completed nahi hoga.
// Payment proof abhi upload nahi hua hai.
order.orderStatus =
  "remaining_payment";

order.paymentStatus =
  "remaining_payment_requested";

order.remainingProofInputStartedAt =
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
  action: "remaining_payment_proof_input_started",
  by: uid,
  timestamp: now,
  paymentStatus: order.paymentStatus,
  orderStatus: order.orderStatus
});

Bot.setProperty(
  historyKey,
  history,
  "json"
);


// =====================================================
// 📩 CLIENT PROMPT
// =====================================================

Api.sendMessage({
  chat_id: uid,

  text:
    "📤 <b>Submit Remaining Payment Proof</b>\n\n" +

    "🆔 <b>Order ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n" +

    "💰 <b>Amount:</b> ₹" +
    remainingAmount.toFixed(2) +
    "\n\n" +

    "Please payment ka clear screenshot/photo bhejein.\n" +
    "Screenshot mein amount aur payment status clearly visible hona chahiye.\n\n" +

    "❌ Cancel karne ke liye /cancel bhejein.",

  parse_mode: "HTML",

  reply_markup: {
    force_reply: true,
    input_field_placeholder: "Payment screenshot bhejein..."
  }
});


// =====================================================
// ▶️ NEXT COMMAND
// =====================================================

Bot.runCommand(
  "ORDER_REMAINING_PAYMENT_PROOF_SAVE"
);
