/*CMD
  command: ADMIN_REJECT_REMAINING_PAYMENT
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
  command: ADMIN_REJECT_REMAINING_PAYMENT
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT — ADMIN_REJECT_REMAINING_PAYMENT
//
// ADMIN → REJECT REMAINING PAYMENT PROOF
//
// Callback:
// ADMIN_REJECT_REMAINING_PAYMENT <orderId>
//
// Connected with:
// ORDER_REMAINING_PAYMENT_PROOF_SAVE
// =====================================================


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
      text: "Remaining payment proof rejected.",
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


// =====================================================
// 👑 ADMIN AUTHORIZATION
// =====================================================

var uid = String(user.telegramid);
var OWNER_ID = "7897324623";

var adminIds = [
  OWNER_ID
];

function addAdminId(value) {
  if (
    value === null ||
    typeof value === "undefined"
  ) {
    return;
  }

  var id = "";

  if (
    typeof value === "object" &&
    value !== null
  ) {
    id = String(
      value.id ||
      value.telegramId ||
      value.userId ||
      ""
    );
  } else {
    id = String(value);
  }

  id = id.trim();

  if (
    id &&
    adminIds.indexOf(id) === -1
  ) {
    adminIds.push(id);
  }
}

var earnstarAdmins =
  Bot.getProperty("EARNSTAR_ADMINS") || [];

if (Array.isArray(earnstarAdmins)) {
  for (var i = 0; i < earnstarAdmins.length; i++) {
    addAdminId(earnstarAdmins[i]);
  }
}

var isAdmin =
  adminIds.indexOf(uid) !== -1;

if (!isAdmin) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ You are not authorized to perform this action."
  });
  return;
}


// =====================================================
// 🆔 READ ORDER ID
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
    /^ADMIN_REJECT_REMAINING_PAYMENT[\s|]*/i,
    ""
  )
  .trim();

if (orderId.indexOf("|") !== -1) {
  var parts = orderId.split("|");

  orderId = String(
    parts[parts.length - 1] || ""
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
      "❌ <b>Order not found.</b>",
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

if (
  !clientId &&
  order.clientId
) {
  clientId = String(order.clientId);
}

if (!clientId) {
  clientId = String(
    Bot.getProperty("ORDER_USER_" + orderId) || ""
  );
}

if (!clientId) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ Client ID not found."
  });
  return;
}


// =====================================================
// 💳 STATUS CHECK
// =====================================================

if (
  order.paymentStatus === "remaining_paid" ||
  order.paymentStatus === "fully_paid" ||
  order.paymentStatus === "delivered"
) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ Remaining payment already verified hai.\n\n" +
      "📌 <b>Current status:</b> " +
      safeText(order.paymentStatus),
    parse_mode: "HTML"
  });
  return;
}

if (
  order.paymentStatus !== "remaining_proof_submitted"
) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>Remaining payment proof verification ke liye pending nahi hai.</b>\n\n" +
      "📌 <b>Current status:</b> " +
      safeText(order.paymentStatus || "unknown"),
    parse_mode: "HTML"
  });
  return;
}


// =====================================================
// 💰 AMOUNT CHECK
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
      "❌ Remaining payment amount is invalid."
  });
  return;
}


// =====================================================
// 🕐 UPDATE ORDER
// =====================================================

var now = new Date().toISOString();

order.paymentStatus =
  "remaining_payment_requested";

order.paymentVerificationStatus =
  "pending";

order.remainingPaymentVerificationStatus =
  "rejected";

order.stage =
  "remaining_payment";

order.packageStep =
  "remaining_payment_requested";

order.requestStatus =
  "accepted";

// Important: order completed nahi hai.
// Client ko proof dobara submit karna hai.
order.orderStatus =
  "remaining_payment";

order.workStatus =
  "completed";

order.progress =
  100;

order.progressTitle =
  "Remaining Payment Proof Rejected";

order.progressUpdate =
  "Remaining payment proof rejected. Client must submit a valid proof again.";

order.remainingPaymentProofRejected =
  true;

order.remainingPaymentProofRejectedBy =
  uid;

order.remainingPaymentProofRejectedAt =
  now;

order.remainingProofRejectedAt =
  now;

order.remainingPaymentProofFileId =
  "";

order.remainingPaymentProofType =
  "";

order.paymentProofFileId =
  "";

order.paymentProofType =
  "";

order.updatedAt =
  now;

order.adminId =
  uid;

order.userId =
  clientId;


// =====================================================
// 💾 SAVE MAIN ORDER ONLY
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
// 📜 UPDATE ORDER HISTORY
// =====================================================

var historyKey =
  "ORDER_HISTORY_" + orderId;

var history =
  Bot.getProperty(historyKey) || [];

if (!Array.isArray(history)) {
  history = [];
}

history.push({
  action: "remaining_payment_proof_rejected",
  by: uid,
  timestamp: now,
  amount: remainingAmount,
  paymentStatus: order.paymentStatus,
  orderStatus: order.orderStatus,
  stage: order.stage
});

Bot.setProperty(
  historyKey,
  history,
  "json"
);


// =====================================================
// 🧹 CLEAR WAITING STATE
// =====================================================

Bot.setProperty(
  "REMAINING_PAYMENT_PROOF_WAITING_" + clientId,
  "",
  "string"
);


// =====================================================
// 📩 CLIENT NOTIFICATION
// =====================================================

var sentToClient = false;

try {
  Api.sendMessage({
    chat_id: clientId,

    text:
      "❌ <b>Remaining Payment Proof Rejected</b>\n\n" +

      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>\n\n" +

      "💰 <b>Remaining Amount:</b> ₹" +
      money(remainingAmount) +
      "\n\n" +

      "Aapka remaining payment screenshot verify nahi ho saka.\n" +
      "Please successful payment ka clear screenshot dobara submit karein.\n\n" +

      "Screenshot mein payment amount, date aur transaction details clearly visible honi chahiye.",

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📤 Submit Proof Again",
            callback_data:
              "ORDER_REMAINING_PAYMENT_PROOF " + orderId
          }
        ],
        [
          {
            text: "💬 Contact Admin",
            callback_data:
              "ORDER_CONTACT_ADMIN " + orderId
          }
        ],
        [
          {
            text: "📦 Track Order",
            callback_data:
              "ORDER_TRACK " + orderId
          }
        ]
      ]
    }
  });

  sentToClient = true;

} catch (clientError) {
  Bot.setProperty(
    "CLIENT_NOTIFY_ERROR_" + orderId,
    {
      orderId: orderId,
      clientId: clientId,
      type: "remaining_payment_proof_rejected",
      timestamp: now,
      error: String(clientError)
    },
    "json"
  );
}


// =====================================================
// 📩 ADMIN CONFIRMATION
// =====================================================

Api.sendMessage({
  chat_id: uid,

  text:
    "❌ <b>Remaining Payment Proof Rejected</b>\n\n" +

    "🆔 <b>Order ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n\n" +

    "👤 <b>Client ID:</b> <code>" +
    safeText(clientId) +
    "</code>\n\n" +

    (
      sentToClient
        ? "Client ko dobara valid remaining payment proof submit karne ka option de diya gaya hai."
        : "⚠️ Client ko notification send nahi ho saka."
    ),

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
          text: "📊 Admin Panel",
          callback_data: "ADMIN_PANEL"
        }
      ]
    ]
  }
});
