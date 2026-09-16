/*CMD
  command: ADMIN_VERIFY_REMAINING_PAYMENT
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
  command: ADMIN_VERIFY_REMAINING_PAYMENT
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT — ADMIN_VERIFY_REMAINING_PAYMENT
//
// ADMIN → VERIFY REMAINING PAYMENT
//
// Callback:
// ADMIN_VERIFY_REMAINING_PAYMENT <orderId>
//
// Connected with:
// ORDER_REMAINING_PAYMENT_PROOF_SAVE
//
// Next:
// ADMIN_DELIVER_ORDER
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
      text: "🔍 Remaining payment verify ho raha hai...",
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
// 👤 ADMIN ID
// =====================================================

var uid = String(user.telegramid);


// =====================================================
// 🔐 ADMIN AUTHORIZATION
// =====================================================

var OWNER_ID = "7897324623";

var adminList =
  Bot.getProperty("EARNSTAR_ADMINS") || [];

if (!Array.isArray(adminList)) {
  adminList = [];
}

var isAdmin =
  uid === OWNER_ID;

if (!isAdmin) {
  for (var i = 0; i < adminList.length; i++) {
    var item = adminList[i];
    var savedAdminId = "";

    if (
      typeof item === "object" &&
      item !== null
    ) {
      savedAdminId = String(
        item.id ||
        item.telegramId ||
        item.userId ||
        ""
      );
    } else {
      savedAdminId = String(item || "");
    }

    if (savedAdminId === uid) {
      isAdmin = true;
      break;
    }
  }
}

if (!isAdmin) {
  Api.sendMessage({
    chat_id: uid,
    text: "⛔ You are not authorized."
  });
  return;
}


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
    /^ADMIN_VERIFY_REMAINING_PAYMENT[\s|]*/i,
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
    order.clientId || ""
  );
}

if (!clientId) {
  clientId = String(
    Bot.getProperty("ORDER_USER_" + orderId) || ""
  );
}

if (!clientId) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ Client ID not found for this order."
  });
  return;
}


// =====================================================
// 🛑 ALREADY VERIFIED CHECK
// =====================================================

if (
  order.paymentStatus === "remaining_paid" ||
  order.paymentStatus === "fully_paid" ||
  order.paymentStatus === "delivered"
) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>Remaining payment already verified hai.</b>\n\n" +
      "📌 <b>Current status:</b> " +
      safeText(order.paymentStatus),
    parse_mode: "HTML"
  });
  return;
}


// =====================================================
// 💳 PROOF STATUS CHECK
// =====================================================

if (
  order.paymentStatus !== "remaining_proof_submitted"
) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>Remaining payment proof verification ke liye pending nahi hai.</b>\n\n" +
      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>\n" +
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
      "❌ Remaining amount valid nahi hai. Order verify nahi kiya gaya."
  });
  return;
}


// =====================================================
// 🕐 UPDATE ORDER
// =====================================================

var now = new Date().toISOString();

order.paymentStatus =
  "remaining_paid";

order.paymentVerificationStatus =
  "verified";

order.remainingPaymentVerificationStatus =
  "verified";

order.remainingPaymentVerifiedBy =
  uid;

order.remainingPaymentVerifiedAt =
  now;

order.remainingPaidAt =
  now;

order.stage =
  "ready_for_delivery";

order.packageStep =
  "remaining_payment_verified";

order.requestStatus =
  "accepted";

order.orderStatus =
  "completed";

order.workStatus =
  "completed";

order.progress =
  100;

order.progressTitle =
  "Remaining Payment Verified";

order.progressUpdate =
  "Remaining payment verified successfully. Order ready for final delivery.";

order.updatedAt =
  now;

order.adminId =
  uid;

order.userId =
  clientId;


// =====================================================
// 💾 SAVE MAIN ORDER
// =====================================================

Bot.setProperty(
  "ORDER_" + orderId,
  order,
  "json"
);


// =====================================================
// 💾 SAVE ORDER MAPPING
// =====================================================

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
  action: "remaining_payment_verified",
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
// 🧹 CLEAR WAITING PROOF STATE
// =====================================================

Bot.setProperty(
  "REMAINING_PAYMENT_PROOF_WAITING_" + clientId,
  "",
  "string"
);


// =====================================================
// 📩 CLIENT NOTIFICATION
// =====================================================

var clientMessage =
  "✅ <b>Remaining Payment Verified</b>\n\n" +

  "🆔 <b>Order ID:</b> <code>" +
  safeText(orderId) +
  "</code>\n" +

  "💰 <b>Remaining Amount:</b> ₹" +
  money(remainingAmount) +
  "\n\n" +

  "🎉 Remaining payment successfully verify ho gaya hai.\n" +
  "Aapka order ab final delivery ke liye ready hai.\n\n" +

  "Admin completed work jaldi deliver karega.";

try {
  Api.sendMessage({
    chat_id: clientId,
    text: clientMessage,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📦 Track Order",
            callback_data:
              "ORDER_TRACK " + orderId
          }
        ],
        [
          {
            text: "💬 Contact Admin",
            callback_data:
              "ORDER_CONTACT_ADMIN " + orderId
          }
        ]
      ]
    }
  });
} catch (clientError) {
  Bot.setProperty(
    "CLIENT_NOTIFY_ERROR_" + orderId,
    {
      orderId: orderId,
      clientId: clientId,
      type: "remaining_payment_verified",
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
    "✅ <b>Remaining Payment Verified</b>\n\n" +

    "🆔 <b>Order ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n" +

    "👤 <b>Client ID:</b> <code>" +
    safeText(clientId) +
    "</code>\n" +

    "💰 <b>Amount:</b> ₹" +
    money(remainingAmount) +
    "\n\n" +

    "📦 Order final delivery ke liye ready hai.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📤 Deliver Order",
          callback_data:
            "ADMIN_DELIVER_ORDER " + orderId
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
          text: "🔧 Admin Panel",
          callback_data: "ADMIN_PANEL"
        }
      ]
    ]
  }
});
