/*CMD
  command: ADMIN_VERIFY_PAYMENT
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
  command: ADMIN_VERIFY_PAYMENT
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 34 — ADMIN_VERIFY_PAYMENT
// STEP 2.2.1.3.7.5
//
// ADMIN → VERIFY ADVANCE PAYMENT
//
// NEXT:
// ADMIN_START_WORK <orderId>
// ORDER_TRACK <orderId>
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
// 🔐 OWNER + MULTI-ADMIN AUTHORIZATION
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

} else {

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

      text: "Payment verifying...",

      show_alert: false

    });

  } catch (e) {}

}


// =====================================================
// 🆔 READ ORDER ID
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

  } else {

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

rawData =
  String(rawData || "")
    .trim()
    .replace(/^ADMIN_VERIFY_PAYMENT(?:\s+|$)/i, "")
    .trim();

var orderId =
  rawData;


// =====================================================
// ❌ INVALID ORDER ID
// =====================================================

if (!orderId) {

  Api.sendMessage({

    chat_id: adminId,

    text:
      "❌ <b>Invalid order ID.</b>",

    parse_mode: "HTML"

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

    chat_id: adminId,

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
      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>",

    parse_mode: "HTML"

  });

  return;

}


// =====================================================
// 🛑 DUPLICATE VERIFICATION CHECK
// =====================================================

var currentPaymentStatus =
  String(order.paymentStatus || "").toLowerCase();

if (
  currentPaymentStatus === "advance_paid" ||
  currentPaymentStatus === "work_started" ||
  currentPaymentStatus === "work_in_progress" ||
  currentPaymentStatus === "completed" ||
  currentPaymentStatus === "remaining_payment_requested" ||
  currentPaymentStatus === "remaining_paid" ||
  currentPaymentStatus === "fully_paid"
) {

  Api.sendMessage({

    chat_id: adminId,

    text:
      "⚠️ <b>Advance payment is already verified.</b>\n\n" +
      "💳 <b>Current Status:</b> " +
      safeText(order.paymentStatus),

    parse_mode: "HTML"

  });

  return;

}


// =====================================================
// 🛑 PAYMENT PROOF VALIDATION
// =====================================================

if (
  currentPaymentStatus !== "proof_submitted"
) {

  Api.sendMessage({

    chat_id: adminId,

    text:
      "⚠️ <b>Payment proof is not pending verification.</b>\n\n" +
      "💳 <b>Current Status:</b> " +
      safeText(
        order.paymentStatus || "unknown"
      ),

    parse_mode: "HTML"

  });

  return;

}


// =====================================================
// 💰 PAYMENT DATA
// =====================================================

var totalAmount =
  Number(
    order.totalAmount ||
    order.totalPrice ||
    order.price ||
    order.packagePrice ||
    0
  );

var advanceAmount =
  Number(order.advanceAmount || 0);

var remainingAmount =
  Number(order.remainingAmount || 0);

if (
  !isFinite(totalAmount) ||
  totalAmount <= 0 ||
  !isFinite(advanceAmount) ||
  advanceAmount <= 0
) {

  Api.sendMessage({

    chat_id: adminId,

    text:
      "❌ <b>Invalid payment amount data.</b>\n\n" +
      "Please check the order amount before verifying payment.",

    parse_mode: "HTML"

  });

  return;

}

if (
  !isFinite(remainingAmount) ||
  remainingAmount < 0
) {

  remainingAmount =
    Math.max(0, totalAmount - advanceAmount);

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

order.stage =
  "work_ready";

order.packageStep =
  "advance_payment_verified";

order.requestStatus =
  "accepted";

order.orderStatus =
  "accepted";

order.paymentStatus =
  "advance_paid";

order.paymentVerificationStatus =
  "verified";

order.paymentVerifiedBy =
  adminId;

order.paymentVerifiedAt =
  now;

order.advancePaidAt =
  order.advancePaidAt || now;

order.adminId =
  adminId;

order.progress =
  50;

order.progressTitle =
  "Advance Payment Verified";

order.progressUpdate =
  "Advance payment verified. Work is ready to start.";

order.updatedAt =
  now;


// =====================================================
// 💾 SAVE FINAL ORDER
// =====================================================

Bot.setProperty(
  orderKey,
  order,
  "json"
);

Bot.setProperty(
  "ORDER_USER_" + orderId,
  clientId,
  "string"
);

Bot.setProperty(
  "ORDER_HISTORY_" + orderId,
  order,
  "json"
);


// =====================================================
// 👤 CLIENT LANGUAGE
// =====================================================

var clientProfile =
  Bot.getProperty("USER_" + clientId) || {};

var clientLanguage =
  String(
    clientProfile.language || "hinglish"
  ).toLowerCase();


// =====================================================
// 📩 CLIENT MESSAGE
// =====================================================

var clientMessage = "";

if (clientLanguage === "english") {

  clientMessage =

    "✅ <b>Advance Payment Verified</b>\n\n" +

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

    "💰 <b>Advance Payment:</b> ₹" +
    money(advanceAmount) +
    " — Verified ✅\n\n" +

    "🚀 Your order is ready for work to start.\n" +
    "The admin will start your work shortly.\n\n" +

    "📊 <b>Current Progress:</b> 50%";

} else if (clientLanguage === "gujarati") {

  clientMessage =

    "✅ <b>એડવાન્સ પેમેન્ટ વેરિફાઈ થયું</b>\n\n" +

    "🆔 <b>ઓર્ડર ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n\n" +

    "📦 <b>પેકેજ:</b> " +
    safeText(
      order.packageName ||
      order.packageType ||
      "Custom Order"
    ) +
    "\n\n" +

    "💰 <b>એડવાન્સ પેમેન્ટ:</b> ₹" +
    money(advanceAmount) +
    " — વેરિફાઈ થયું ✅\n\n" +

    "🚀 તમારો ઓર્ડર હવે કામ શરૂ કરવા માટે તૈયાર છે.\n" +
    "એડમિન ટૂંક સમયમાં તમારું કામ શરૂ કરશે.\n\n" +

    "📊 <b>હાલની પ્રગતિ:</b> 50%";

} else {

  clientMessage =

    "✅ <b>Advance Payment Verified</b>\n\n" +

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

    "💰 <b>Advance Payment:</b> ₹" +
    money(advanceAmount) +
    " — Verified ✅\n\n" +

    "🚀 Aapka order ab work-start stage mein hai.\n" +
    "Admin jald hi aapka work start karega.\n\n" +

    "📊 <b>Current Progress:</b> 50%";

}


// =====================================================
// 📩 CLIENT NOTIFICATION
// =====================================================

try {

  Api.sendMessage({

    chat_id: clientId,

    text: clientMessage,

    parse_mode: "HTML",

    reply_markup: {

      inline_keyboard: [

        [

          {
            text: "📊 Track Order",

            callback_data:
              "ORDER_TRACK " + orderId
          }

        ]

      ]

    }

  });

} catch (clientError) {

  Bot.setProperty(
    "CLIENT_NOTIFY_ERROR_" + orderId,
    String(clientError),
    "string"
  );

  Api.sendMessage({

    chat_id: adminId,

    text:
      "⚠️ Payment verified, but client notification failed.\n\n" +
      "👤 <b>Client ID:</b> <code>" +
      safeText(clientId) +
      "</code>",

    parse_mode: "HTML"

  });

}


// =====================================================
// 📩 ADMIN CONFIRMATION
// =====================================================

Api.sendMessage({

  chat_id: adminId,

  text:

    "✅ <b>ADVANCE PAYMENT VERIFIED</b>\n\n" +

    "🆔 <b>Order ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n\n" +

    "👤 <b>Client ID:</b> <code>" +
    safeText(clientId) +
    "</code>\n\n" +

    "💰 <b>Advance:</b> ₹" +
    money(advanceAmount) +
    "\n" +

    "🟡 <b>Remaining:</b> ₹" +
    money(remainingAmount) +
    "\n\n" +

    "📌 <b>Status:</b> Work Ready\n" +
    "📊 <b>Progress:</b> 50%",

  parse_mode: "HTML",

  reply_markup: {

    inline_keyboard: [

      [

        {
          text: "🚀 Start Work",

          callback_data:
            "ADMIN_START_WORK " + orderId
        }

      ],

      [

        {
          text: "📋 View Order",

          callback_data:
            "ADMIN_VIEW_ORDER " + orderId
        }

      ]

    ]

  }

});
