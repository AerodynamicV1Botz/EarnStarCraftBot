/*CMD
  command: ADMIN_REQUEST_REMAINING_PAYMENT
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
  command: ADMIN_REQUEST_REMAINING_PAYMENT
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 41 — ADMIN_REQUEST_REMAINING_PAYMENT
//
// ADMIN → CLIENT REMAINING PAYMENT REQUEST
//
// CONNECTED WITH:
// ADMIN_MARK_COMPLETE
// ORDER_REMAINING_PAYMENT_PROOF
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
      text: "💳 Payment request prepare ho rahi hai..."
    });
  } catch (e) {}
}


// =====================================================
// 🔐 HTML SAFE TEXT
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
  var amount = Number(value);

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
    var savedId = "";

    if (
      typeof item === "object" &&
      item !== null
    ) {
      savedId = String(
        item.id ||
        item.telegramId ||
        item.userId ||
        ""
      );
    } else {
      savedId = String(item || "");
    }

    if (savedId === uid) {
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

var rawData = "";

if (
  typeof params !== "undefined" &&
  params
) {
  rawData = String(params).trim();
}

if (!rawData) {
  if (
    typeof request !== "undefined" &&
    request
  ) {
    rawData = String(
      request.data ||
      request.callback_data ||
      ""
    ).trim();
  }
}

rawData = rawData
  .replace(
    /^ADMIN_REQUEST_REMAINING_PAYMENT[\s|]*/i,
    ""
  )
  .trim();

var orderId = rawData;

if (orderId.indexOf("|") !== -1) {
  var parts = orderId.split("|");

  orderId = String(
    parts[parts.length - 1] || ""
  ).trim();
}

if (orderId.indexOf(" ") !== -1) {
  orderId = orderId.split(/\s+/)[0];
}

if (!orderId) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ Invalid order ID."
  });

  return;
}


// =====================================================
// 📦 LOAD FINAL ORDER
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
    chat_id: uid,

    text:
      "❌ <b>Order Not Found</b>\n\n" +
      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 👤 CLIENT ID
// =====================================================

var clientId = String(
  order.userId ||
  (
    order.telegramProfile &&
    (
      order.telegramProfile.telegramId ||
      order.telegramProfile.userId
    )
  ) ||
  order.telegramId ||
  Bot.getProperty("ORDER_USER_" + orderId) ||
  ""
).trim();

if (!clientId) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>Client ID not found.</b>\n\n" +
      "🆔 Order ID: <code>" +
      safeText(orderId) +
      "</code>",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 🛑 ORDER STATUS CHECK
// =====================================================

if (
  order.stage !== "remaining_payment" &&
  order.stage !== "delivery_ready"
) {
  Api.sendMessage({
    chat_id: uid,

    text:
      "⚠️ <b>Remaining Payment Request Not Allowed</b>\n\n" +
      "Ye order abhi remaining-payment stage mein nahi hai.\n\n" +

      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>\n" +

      "📍 <b>Stage:</b> " +
      safeText(order.stage || "unknown"),

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 🛑 PAYMENT STATUS CHECK
// =====================================================

if (
  order.paymentStatus !== "remaining_payment_pending" &&
  order.paymentStatus !== "remaining_payment_requested"
) {
  Api.sendMessage({
    chat_id: uid,

    text:
      "⚠️ <b>Remaining payment request cannot be sent.</b>\n\n" +
      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>\n" +

      "📌 <b>Current payment status:</b> " +
      safeText(order.paymentStatus || "unknown"),

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 💰 REMAINING AMOUNT
// =====================================================

var remainingAmount =
  Number(order.remainingAmount);

if (
  isNaN(remainingAmount) ||
  !isFinite(remainingAmount) ||
  remainingAmount <= 0
) {
  Api.sendMessage({
    chat_id: uid,

    text:
      "✅ Is order ka remaining payment pending nahi hai."
  });

  return;
}


// =====================================================
// 🏦 PAYMENT SETTINGS
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
    ("Remaining payment for order " + orderId)
  ).trim();

var qrImage =
  String(
    Bot.getProperty("EARNSTAR_QR_IMAGE") || ""
  ).trim();


// =====================================================
// 🔗 UPI PAYMENT LINK
// =====================================================

var upiLink = "";

if (upiId) {
  upiLink =
    "upi://pay?pa=" +
    encodeURIComponent(upiId) +
    "&pn=" +
    encodeURIComponent(paymentName) +
    "&am=" +
    remainingAmount.toFixed(2) +
    "&cu=INR&tn=" +
    encodeURIComponent(paymentNote);
}


// =====================================================
// 📩 PAYMENT MESSAGE
// =====================================================

var paymentText =
  "💳 <b>Remaining Payment Required</b>\n\n" +

  "🆔 <b>Order ID:</b> <code>" +
  safeText(orderId) +
  "</code>\n" +

  "📦 <b>Package:</b> " +
  safeText(
    order.packageName || "Custom Order"
  ) +
  "\n\n" +

  "💰 <b>Remaining Amount:</b> ₹" +
  money(remainingAmount) +
  "\n\n" +

  "🏦 <b>Payment Details</b>\n" +

  "UPI ID: <code>" +
  safeText(upiId || "Not configured") +
  "</code>\n" +

  "Name: " +
  safeText(paymentName) +
  "\n" +

  "Note: " +
  safeText(paymentNote) +
  "\n\n" +

  "📌 Payment karne ke baad screenshot submit karein.\n" +
  "Screenshot verify hone ke baad final delivery di jayegi.\n\n" +

  "⚠️ Please pay only the exact remaining amount.";

var paymentButtons = [];

if (upiLink) {
  paymentButtons.push([
    {
      text:
        "💳 Pay Remaining ₹" +
        money(remainingAmount),

      url: upiLink
    }
  ]);
}

paymentButtons.push([
  {
    text: "📤 Submit Payment Proof",

    callback_data:
      "ORDER_REMAINING_PAYMENT_PROOF " + orderId
  }
]);

paymentButtons.push([
  {
    text: "💬 Contact Admin",

    callback_data:
      "ORDER_CONTACT_ADMIN " + orderId
  }
]);


// =====================================================
// 📤 SEND PAYMENT DETAILS
// =====================================================

var sentSuccessfully = false;
var sendError = "";

try {
  if (qrImage) {
    Api.sendPhoto({
      chat_id: clientId,
      photo: qrImage,
      caption: paymentText,
      parse_mode: "HTML",

      reply_markup: {
        inline_keyboard: paymentButtons
      }
    });
  } else {
    Api.sendMessage({
      chat_id: clientId,
      text: paymentText,
      parse_mode: "HTML",

      reply_markup: {
        inline_keyboard: paymentButtons
      }
    });
  }

  sentSuccessfully = true;

} catch (error) {
  sentSuccessfully = false;
  sendError = String(error);
}


// =====================================================
// ❌ SEND FAILURE
// =====================================================

if (!sentSuccessfully) {
  Bot.setProperty(
    "CLIENT_NOTIFY_ERROR_" + orderId,
    sendError,
    "string"
  );

  Api.sendMessage({
    chat_id: uid,

    text:
      "❌ Client ko payment details send nahi ho paaye.\n\n" +
      "Order status update nahi kiya gaya.\n" +
      "Please dobara try karein."
  });

  return;
}


// =====================================================
// 🕐 UPDATE ORDER
// =====================================================

var now =
  new Date().toISOString();

order.stage =
  "remaining_payment";

order.packageStep =
  "remaining_payment_requested";

order.requestStatus =
  "accepted";

// Important:
// Remaining payment pending hone par completed nahi hoga.
order.orderStatus =
  "remaining_payment";

order.paymentStatus =
  "remaining_payment_requested";

order.remainingAmount =
  remainingAmount;

order.remainingRequestedBy =
  uid;

order.remainingRequestedAt =
  now;

order.updatedAt =
  now;

order.adminId =
  uid;

order.userId =
  clientId;


// =====================================================
// 💾 SAVE FINAL ORDER ONLY
// =====================================================

Bot.setProperty(
  orderKey,
  order,
  "json"
);


// =====================================================
// 💾 SAVE ORDER → CLIENT MAPPING
// =====================================================

Bot.setProperty(
  "ORDER_USER_" + orderId,
  clientId,
  "string"
);


// =====================================================
// 💾 SAVE ORDER HISTORY
// =====================================================

Bot.setProperty(
  "ORDER_HISTORY_" + orderId,
  order,
  "json"
);


// =====================================================
// ⏳ WAITING PROOF ORDER
// =====================================================

Bot.setProperty(
  "REMAINING_PAYMENT_PROOF_WAITING_" + clientId,
  orderId,
  "string"
);


// =====================================================
// 📩 ADMIN CONFIRMATION
// =====================================================

Api.sendMessage({
  chat_id: uid,

  text:
    "✅ <b>Remaining Payment Request Sent</b>\n\n" +

    "🆔 <b>Order ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n\n" +

    "👤 <b>Client ID:</b> <code>" +
    safeText(clientId) +
    "</code>\n\n" +

    "💰 <b>Amount:</b> ₹" +
    money(remainingAmount) +
    "\n\n" +

    "📌 <b>Payment Status:</b> Remaining Payment Requested",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
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

          callback_data:
            "ADMIN_PANEL"
        }
      ]
    ]
  }
});
