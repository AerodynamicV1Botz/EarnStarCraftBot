/*CMD
  command: ADMIN_MARK_COMPLETE
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
  command: ADMIN_MARK_COMPLETE
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 40 — ADMIN_MARK_COMPLETE
// STEP 2.2.1.3.7.8
//
// ADMIN → MARK WORK COMPLETE
//
// NEXT:
// ADMIN_REQUEST_REMAINING_PAYMENT
// ADMIN_DELIVER_ORDER
// ORDER_TRACK
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
      text: "✅ Work complete mark kar rahe hain..."
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

function safeNumber(value) {
  var number = Number(value);

  if (
    isNaN(number) ||
    !isFinite(number) ||
    number < 0
  ) {
    return 0;
  }

  return number;
}

function formatMoney(value) {
  return safeNumber(value).toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}


// =====================================================
// 👑 ADMIN CHECK
// =====================================================

var OWNER_ID = "7897324623";
var adminId = String(user.telegramid);

var adminList =
  Bot.getProperty("EARNSTAR_ADMINS") || [];

if (!Array.isArray(adminList)) {
  adminList = [];
}

var isAuthorized =
  adminId === OWNER_ID;

if (!isAuthorized) {
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

    if (savedAdminId === adminId) {
      isAuthorized = true;
      break;
    }
  }
}

if (!isAuthorized) {
  Api.sendMessage({
    chat_id: adminId,
    text: "⛔ You are not authorized."
  });

  return;
}


// =====================================================
// 🆔 READ ORDER ID
// =====================================================

var rawData = "";
var orderId = "";

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
  .replace(/^ADMIN_MARK_COMPLETE[\s|]*/i, "")
  .trim();

if (rawData.indexOf("|") !== -1) {
  var orderParts =
    rawData.split("|");

  orderId = String(
    orderParts[orderParts.length - 1] || ""
  ).trim();
} else {
  orderId = rawData;
}

if (!orderId) {
  Api.sendMessage({
    chat_id: adminId,
    text: "❌ Invalid order ID."
  });

  return;
}


// =====================================================
// 📦 LOAD FINAL ORDER
// =====================================================

var orderKey =
  "ORDER_" + orderId;

var draft =
  Bot.getProperty(orderKey);

if (
  !draft ||
  typeof draft !== "object"
) {
  Api.sendMessage({
    chat_id: adminId,

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
  draft.userId ||
  (
    draft.telegramProfile &&
    (
      draft.telegramProfile.telegramId ||
      draft.telegramProfile.userId
    )
  ) ||
  draft.telegramId ||
  Bot.getProperty("ORDER_USER_" + orderId) ||
  ""
).trim();

if (!clientId) {
  Api.sendMessage({
    chat_id: adminId,

    text:
      "❌ <b>Client ID not found.</b>\n\n" +
      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 🛑 DUPLICATE COMPLETION CHECK
// =====================================================

if (
  draft.stage === "remaining_payment" ||
  draft.stage === "delivery_ready" ||
  draft.stage === "delivered" ||
  draft.stage === "completed" ||
  draft.orderStatus === "completed" ||
  draft.orderStatus === "remaining_payment" ||
  draft.orderStatus === "delivery_ready" ||
  draft.orderStatus === "delivered" ||
  draft.completedAt ||
  draft.workCompletedAt
) {
  Api.sendMessage({
    chat_id: adminId,

    text:
      "⚠️ <b>Work Already Marked Complete</b>\n\n" +

      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>\n\n" +

      "📌 <b>Current Stage:</b> " +
      safeText(draft.stage || "unknown") +
      "\n" +

      "📊 <b>Progress:</b> " +
      safeText(String(
        draft.progress == null
          ? 100
          : draft.progress
      )) +
      "%",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 🛑 ORDER STATUS CHECK
// =====================================================

if (
  draft.stage !== "work_in_progress" ||
  draft.orderStatus !== "in_progress"
) {
  Api.sendMessage({
    chat_id: adminId,

    text:
      "⚠️ <b>Cannot Mark Complete</b>\n\n" +

      "Sirf work-in-progress order ko complete mark kar sakte hain.\n\n" +

      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>\n" +

      "📌 <b>Current Status:</b> " +
      safeText(draft.orderStatus || "unknown") +
      "\n" +

      "📍 <b>Current Stage:</b> " +
      safeText(draft.stage || "unknown"),

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 🛑 PAYMENT STATUS CHECK
// =====================================================

if (
  draft.paymentStatus !== "work_started" &&
  draft.paymentStatus !== "advance_paid"
) {
  Api.sendMessage({
    chat_id: adminId,

    text:
      "⚠️ <b>Advance Payment Not Verified</b>\n\n" +
      "Is order ka advance payment verified nahi hai.",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 💰 AMOUNT CALCULATION
// =====================================================

var packagePrice =
  safeNumber(
    draft.totalAmount ||
    draft.packagePrice ||
    draft.price
  );

var advanceAmount =
  safeNumber(draft.advanceAmount);

var remainingAmount =
  safeNumber(draft.remainingAmount);

if (remainingAmount <= 0) {
  remainingAmount =
    Math.max(
      0,
      packagePrice - advanceAmount
    );
}

if (remainingAmount < 0) {
  remainingAmount = 0;
}


// =====================================================
// 🕐 TIMESTAMP
// =====================================================

var now =
  new Date().toISOString();


// =====================================================
// 📊 PROGRESS HISTORY
// =====================================================

if (!Array.isArray(draft.progressHistory)) {
  draft.progressHistory = [];
}

draft.progressHistory.push({
  progress: 100,
  message:
    "Work 100% complete ho gaya hai.",
  updatedBy: adminId,
  updatedAt: now,
  type: "work_completed"
});

if (draft.progressHistory.length > 50) {
  draft.progressHistory =
    draft.progressHistory.slice(-50);
}


// =====================================================
// 💾 UPDATE ORDER
// =====================================================

draft.userId =
  clientId;

draft.stage =
  remainingAmount > 0
    ? "remaining_payment"
    : "delivery_ready";

draft.packageStep =
  remainingAmount > 0
    ? "remaining_payment_pending"
    : "work_completed";

draft.requestStatus =
  "accepted";

// Important:
// Remaining payment pending hone par order completed nahi hai.
draft.orderStatus =
  remainingAmount > 0
    ? "remaining_payment"
    : "delivery_ready";

draft.workStatus =
  "completed";

draft.paymentStatus =
  remainingAmount > 0
    ? "remaining_payment_pending"
    : "advance_paid";

draft.paymentVerificationStatus =
  "verified";

draft.progress =
  100;

draft.progressTitle =
  "Work Completed";

draft.progressUpdate =
  "Work 100% complete ho gaya hai.";

draft.packagePrice =
  packagePrice;

draft.totalAmount =
  packagePrice;

draft.advanceAmount =
  advanceAmount;

draft.remainingAmount =
  remainingAmount;

draft.completedAt =
  now;

draft.workCompletedAt =
  now;

draft.completedBy =
  adminId;

draft.adminId =
  adminId;

draft.updatedAt =
  now;


// =====================================================
// 💾 SAVE FINAL ORDER ONLY
// =====================================================

Bot.setProperty(
  orderKey,
  draft,
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
  draft,
  "json"
);


// =====================================================
// 📩 CLIENT COMPLETION MESSAGE
// =====================================================

var userText =
  "🎉 <b>Work Completed</b>\n\n" +

  "🆔 <b>Order ID:</b> <code>" +
  safeText(orderId) +
  "</code>\n\n" +

  "📦 <b>Package:</b> " +
  safeText(
    draft.packageName ||
    "Custom Order"
  ) +
  "\n\n" +

  "✅ Aapka work 100% complete ho gaya hai.\n\n" +

  "💵 <b>Remaining Amount:</b> ₹" +
  formatMoney(remainingAmount) +
  "\n\n";

if (remainingAmount > 0) {
  userText +=
    "📌 Final delivery se pehle remaining payment complete karein.";
} else {
  userText +=
    "✅ Payment complete hai. Final delivery process start hoga.";
}

try {
  Api.sendMessage({
    chat_id: clientId,
    text: userText,
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
}


// =====================================================
// 📩 ADMIN BUTTONS
// =====================================================

var adminButtons = [];

if (remainingAmount > 0) {
  adminButtons.push([
    {
      text: "💳 Request Remaining Payment",
      callback_data:
        "ADMIN_REQUEST_REMAINING_PAYMENT " + orderId
    }
  ]);
} else {
  adminButtons.push([
    {
      text: "📦 Deliver Final Work",
      callback_data:
        "ADMIN_DELIVER_ORDER " + orderId
    }
  ]);
}

adminButtons.push([
  {
    text: "📋 View Order",
    callback_data:
      "ADMIN_VIEW_ORDER " + orderId
  }
]);


// =====================================================
// 📩 ADMIN CONFIRMATION
// =====================================================

Api.sendMessage({
  chat_id: adminId,

  text:
    "✅ <b>Work Marked Complete</b>\n\n" +

    "🆔 <b>Order ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n\n" +

    "📊 <b>Progress:</b> 100%\n" +

    "💰 <b>Total Amount:</b> ₹" +
    formatMoney(packagePrice) +
    "\n" +

    "💵 <b>Advance Paid:</b> ₹" +
    formatMoney(advanceAmount) +
    "\n" +

    "💳 <b>Remaining Amount:</b> ₹" +
    formatMoney(remainingAmount) +
    "\n\n" +

    "📌 <b>Stage:</b> " +
    safeText(draft.stage) +
    "\n" +

    "📍 <b>Status:</b> " +
    safeText(draft.orderStatus),

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: adminButtons
  }
});
