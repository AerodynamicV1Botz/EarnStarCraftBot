/*CMD
  command: ADMIN_VIEW_ORDER
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
  command: ADMIN_VIEW_ORDER
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// ADMIN_VIEW_ORDER
//
// ADMIN → VIEW COMPLETE ORDER DETAILS
//
// Supports:
// 1. Direct Package Order
// 2. Custom Build Order
//
// Callback:
// ADMIN_VIEW_ORDER <orderId>
// =====================================================


// =====================================================
// 👤 ADMIN ID
// =====================================================

var adminId = String(user.telegramid);


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


// =====================================================
// ⚡ CALLBACK ANSWER
// =====================================================

function answerCallback(text, showAlert) {
  try {
    if (
      typeof request !== "undefined" &&
      request &&
      request.id
    ) {
      Api.answerCallbackQuery({
        callback_query_id: request.id,
        text: String(text || ""),
        show_alert: showAlert === true
      });
    }
  } catch (e) {}
}


// =====================================================
// 👑 ADMIN AUTHENTICATION
// OWNER + EARNSTAR_ADMINS
// =====================================================

var OWNER_ID = String(
  Bot.getProperty("OWNER_ID") || "7897324623"
);

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

  value = String(value || "").trim();

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

var savedAdmins = Bot.getProperty("EARNSTAR_ADMINS");

if (Array.isArray(savedAdmins)) {
  for (
    var ai = 0;
    ai < savedAdmins.length;
    ai++
  ) {
    addAdmin(savedAdmins[ai]);
  }
} else {
  addAdmin(savedAdmins);
}


// =====================================================
// 🔒 ACCESS CHECK
// =====================================================

if (adminIds.indexOf(adminId) === -1) {
  answerCallback("You are not authorized.", true);

  Api.sendMessage({
    chat_id: adminId,
    text:
      "❌ <b>You are not authorized to view orders.</b>",
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 🆔 READ ORDER ID
// =====================================================

var orderId = "";

if (
  typeof params !== "undefined" &&
  params !== null
) {
  orderId = String(params).trim();
}

if (!orderId) {
  var callbackData = "";

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

  if (callbackData) {
    var callbackParts =
      callbackData.split(/\s+/);

    if (callbackParts.length >= 2) {
      orderId = callbackParts
        .slice(1)
        .join(" ")
        .trim();
    }
  }
}

if (!orderId) {
  answerCallback("Order ID missing.", true);

  Api.sendMessage({
    chat_id: adminId,
    text: "❌ <b>Order ID missing.</b>",
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 📦 LOAD FINAL ORDER
// =====================================================

var order = Bot.getProperty(
  "ORDER_" + orderId
);

if (
  !order ||
  typeof order !== "object" ||
  Array.isArray(order)
) {
  answerCallback("Order not found.", true);

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
// 👤 CLIENT DETAILS
// =====================================================

var clientId = String(
  order.userId ||
  order.telegramId ||
  Bot.getProperty("ORDER_USER_" + orderId) ||
  ""
).trim();

if (!clientId) {
  clientId = "Not provided";
}

var clientName = String(
  order.clientName ||
  order.fullName ||
  order.userName ||
  "Telegram User"
).trim();

var username = String(
  order.username ||
  ""
).trim();

if (!username) {
  username = "Not provided";
} else if (
  username.charAt(0) !== "@"
) {
  username = "@" + username;
}

var clientMention = "";

if (clientId !== "Not provided") {
  clientMention =
    '<a href="tg://user?id=' +
    safeText(clientId) +
    '">' +
    safeText(clientName) +
    "</a>";
} else {
  clientMention = safeText(clientName);
}


// =====================================================
// 📦 ORDER TYPE + PACKAGE
// =====================================================

var orderType = String(
  order.orderType || ""
).toLowerCase();

var isBuildOrder =
  orderType === "custom_build" ||
  String(order.packageType || "").toLowerCase() === "custom" ||
  String(order.source || "").toUpperCase() ===
    "BUILD_ENQUIRY" ||
  !!order.enquiryId;

var packageType = String(
  order.packageType ||
  (isBuildOrder ? "custom" : "unknown")
);

var packageName = String(
  order.packageName ||
  order.package ||
  (isBuildOrder
    ? "Custom Bot Build"
    : "Package Order")
);


// =====================================================
// 🆔 ENQUIRY ID
// =====================================================

var enquiryId = String(
  order.enquiryId ||
  order.sourceEnquiryId ||
  ""
).trim();


// =====================================================
// 💰 PRICE DETAILS
// =====================================================

function numberValue(value) {
  var number = Number(value);

  if (isNaN(number)) {
    return 0;
  }

  return number;
}

var totalPrice = numberValue(
  order.totalAmount ||
  order.totalPrice ||
  order.price ||
  order.packagePrice ||
  0
);

var advanceAmount = numberValue(
  order.advanceAmount || 0
);

var remainingAmount = numberValue(
  order.remainingAmount || 0
);


// =====================================================
// 📞 CONTACT DETAILS
// =====================================================

var contacts = order.contacts;

if (
  !contacts ||
  typeof contacts !== "object" ||
  Array.isArray(contacts)
) {
  contacts = {};
}

function contactValue(key) {
  return safeText(
    contacts[key] ||
    "Not provided"
  );
}


// =====================================================
// 📋 REQUIREMENTS
// =====================================================

var originalRequirements = String(
  order.originalRequirements ||
  order.userRequirements ||
  ""
).trim();

var finalRequirements = String(
  order.finalRequirements ||
  order.adminFinalRequirements ||
  ""
).trim();

var requirements = String(
  order.requirements ||
  ""
).trim();

var budget = String(
  order.budget ||
  order.priceRange ||
  ""
).trim();

var extraDetails = String(
  order.extraDetails ||
  order.extra ||
  order.note ||
  ""
).trim();


// =====================================================
// 📊 ORDER STATUS
// =====================================================

var requestStatus = String(
  order.requestStatus ||
  "pending_review"
);

var orderStatus = String(
  order.orderStatus ||
  "pending_review"
);

var paymentStatus = String(
  order.paymentStatus ||
  "not_requested"
);

var stage = String(
  order.stage ||
  "admin_review"
);

var workStatus = String(
  order.workStatus ||
  "not_started"
);

var deliveryStatus = String(
  order.deliveryStatus ||
  "not_delivered"
);

var progress = numberValue(
  order.progress || 0
);

if (progress < 0) {
  progress = 0;
}

if (progress > 100) {
  progress = 100;
}

var progressTitle = String(
  order.progressTitle ||
  "Order Received"
);

var progressUpdate = String(
  order.progressUpdate ||
  "Your order is waiting for admin review."
);


// =====================================================
// 📊 PROGRESS BAR
// =====================================================

var filledBlocks = Math.floor(
  progress / 10
);

var emptyBlocks = 10 - filledBlocks;

var progressBar = "";

for (
  var pb = 0;
  pb < filledBlocks;
  pb++
) {
  progressBar += "🟩";
}

for (
  var eb = 0;
  eb < emptyBlocks;
  eb++
) {
  progressBar += "⬜";
}


// =====================================================
// 💳 PAYMENT PROOF STATUS
// =====================================================

var advanceProofStatus =
  order.paymentProofFileId ||
  order.advancePaymentProofFileId ||
  order.advanceProofFileId
    ? "Submitted"
    : "Not submitted";

var remainingProofStatus =
  order.remainingPaymentProofFileId ||
  order.remainingProofFileId ||
  order.remainingProofSubmittedAt
    ? "Submitted"
    : "Not submitted";

var advanceVerificationStatus = String(
  order.paymentVerificationStatus ||
  order.advancePaymentVerificationStatus ||
  "Not verified"
);

var remainingVerificationStatus = String(
  order.remainingPaymentVerificationStatus ||
  "Not verified"
);


// =====================================================
// 🧾 CONTACT BLOCK
// =====================================================

var contactBlock =
  "<b>📞 CONTACT DETAILS</b>\n\n" +
  "Telegram: " +
  contactValue("telegram") +
  "\n" +
  "Other Number: " +
  contactValue("otherNumber") +
  "\n" +
  "Instagram: " +
  contactValue("instagram") +
  "\n" +
  "WhatsApp: " +
  contactValue("whatsapp") +
  "\n" +
  "Email: " +
  contactValue("email");


// =====================================================
// 📝 REQUIREMENTS BLOCK
// =====================================================

var requirementsBlock = "";

if (isBuildOrder) {
  requirementsBlock =
    "<b>📋 ORIGINAL REQUIREMENTS</b>\n" +
    safeText(
      originalRequirements ||
      "Not provided"
    ) +
    "\n\n" +

    "<b>🛠 ADMIN FINAL REQUIREMENTS</b>\n" +
    safeText(
      finalRequirements ||
      "Not provided"
    );
} else {
  requirementsBlock =
    "<b>📋 PACKAGE REQUIREMENTS</b>\n" +
    safeText(
      requirements ||
      "Not provided"
    );
}


// =====================================================
// 💰 PACKAGE DETAILS
// =====================================================

var packageDetails = String(
  order.packageDetails ||
  order.packageDescription ||
  order.packageInfo ||
  ""
).trim();

var packageDetailsBlock = "";

if (packageDetails) {
  packageDetailsBlock =
    "\n\n<b>📦 PACKAGE DETAILS</b>\n" +
    packageDetails;
}


// =====================================================
// 📩 COMPLETE ADMIN ORDER MESSAGE
// =====================================================

var orderText =
  "<b>📦 ADMIN ORDER DETAILS</b>\n\n" +

  "<b>🆔 Order ID:</b> <code>" +
  safeText(orderId) +
  "</code>\n" +

  (
    enquiryId
      ? "<b>🆔 Previous Enquiry ID:</b> <code>" +
        safeText(enquiryId) +
        "</code>\n"
      : ""
  ) +

  "<b>📦 Package Name:</b> " +
  safeText(packageName) +
  "\n" +

  "<b>🏷 Package Type:</b> " +
  safeText(packageType) +
  "\n" +

  "<b>📌 Order Type:</b> " +
  safeText(
    isBuildOrder
      ? "Custom Build"
      : "Direct Package"
  ) +

  packageDetailsBlock +

  "\n\n" +

  "<b>👤 CLIENT DETAILS</b>\n" +

  "Client Name: " +
  clientMention +
  "\n" +

  "Username: " +
  safeText(username) +
  "\n" +

  "Telegram ID: <code>" +
  safeText(clientId) +
  "</code>\n\n" +

  contactBlock +

  "\n\n" +

  requirementsBlock +

  "\n\n" +

  "<b>💰 BUDGET</b>\n" +
  safeText(budget || "Not provided") +

  "\n\n" +

  "<b>📝 EXTRA DETAILS</b>\n" +
  safeText(extraDetails || "Not provided") +

  "\n\n" +

  "<b>💳 PAYMENT DETAILS</b>\n" +
  "Total Price: ₹" +
  totalPrice.toFixed(2) +
  "\n" +
  "Advance: ₹" +
  advanceAmount.toFixed(2) +
  "\n" +
  "Remaining: ₹" +
  remainingAmount.toFixed(2) +
  "\n" +
  "Payment Status: " +
  safeText(paymentStatus) +
  "\n" +
  "Advance Proof: " +
  safeText(advanceProofStatus) +
  "\n" +
  "Advance Verification: " +
  safeText(advanceVerificationStatus) +
  "\n" +
  "Remaining Proof: " +
  safeText(remainingProofStatus) +
  "\n" +
  "Remaining Verification: " +
  safeText(remainingVerificationStatus) +

  "\n\n" +

  "<b>📊 ORDER PROGRESS</b>\n" +
  "Request Status: " +
  safeText(requestStatus) +
  "\n" +
  "Order Status: " +
  safeText(orderStatus) +
  "\n" +
  "Stage: " +
  safeText(stage) +
  "\n" +
  "Work Status: " +
  safeText(workStatus) +
  "\n" +
  "Delivery Status: " +
  safeText(deliveryStatus) +
  "\n" +
  "Progress: " +
  progress +
  "%\n" +
  progressBar +
  "\n" +
  "Progress Title: " +
  safeText(progressTitle) +
  "\n" +
  "Latest Update: " +
  safeText(progressUpdate) +

  "\n\n" +

  "<b>🕒 Created:</b> " +
  safeText(order.createdAt || "Not available") +
  "\n" +

  "<b>🔄 Updated:</b> " +
  safeText(order.updatedAt || "Not available");


// =====================================================
// 🔘 ADMIN ACTION BUTTONS
// =====================================================

var buttons = [];


// -----------------------------------------------------
// ACCEPT / REJECT ONLY FOR PENDING REVIEW
// -----------------------------------------------------

if (
  requestStatus === "pending" ||
  requestStatus === "pending_review" ||
  orderStatus === "pending" ||
  orderStatus === "pending_review"
) {
  buttons.push([
    {
      text: "✅ Accept Order",
      callback_data:
        "ADMIN_ACCEPT " + orderId
    },
    {
      text: "❌ Reject Order",
      callback_data:
        "ADMIN_REJECT " + orderId
    }
  ]);
}


// -----------------------------------------------------
// PAYMENT REQUEST AFTER ACCEPTANCE
// -----------------------------------------------------

if (
  orderStatus === "accepted" ||
  orderStatus === "approved"
) {
  buttons.push([
    {
      text: "💳 Request Payment",
      callback_data:
        "ADMIN_REQUEST_PAYMENT " + orderId
    }
  ]);
}


// -----------------------------------------------------
// START WORK AFTER ADVANCE PAYMENT
// -----------------------------------------------------

if (
  paymentStatus === "advance_paid" ||
  paymentStatus === "advance_verified" ||
  order.advancePaymentVerified === true
) {
  buttons.push([
    {
      text: "🚀 Start Work",
      callback_data:
        "ADMIN_START_WORK " + orderId
    }
  ]);
}


// -----------------------------------------------------
// IN-PROGRESS ACTIONS
// -----------------------------------------------------

if (
  orderStatus === "in_progress" ||
  stage === "in_progress" ||
  workStatus === "in_progress"
) {
  buttons.push([
    {
      text: "📊 Update Progress",
      callback_data:
        "ADMIN_UPDATE_PROGRESS " + orderId
    },
    {
      text: "✅ Mark Complete",
      callback_data:
        "ADMIN_MARK_COMPLETE " + orderId
    }
  ]);
}


// -----------------------------------------------------
// REMAINING PAYMENT
// -----------------------------------------------------

if (
  orderStatus === "work_completed" ||
  orderStatus === "completed_work" ||
  stage === "remaining_payment" ||
  workStatus === "completed"
) {
  buttons.push([
    {
      text: "💰 Request Remaining",
      callback_data:
        "ADMIN_REQUEST_REMAINING_PAYMENT " +
        orderId
    }
  ]);
}


// -----------------------------------------------------
// DELIVERY
// -----------------------------------------------------

if (
  paymentStatus === "remaining_paid" ||
  paymentStatus === "fully_paid" ||
  order.remainingPaymentVerified === true
) {
  buttons.push([
    {
      text: "📤 Deliver Order",
      callback_data:
        "ADMIN_DELIVER_ORDER " + orderId
    }
  ]);
}


// -----------------------------------------------------
// REPLY CLIENT
// -----------------------------------------------------

buttons.push([
  {
    text: "💬 Reply to Client",
    callback_data:
      "ADMIN_REPLY_CLIENT " + orderId
  }
]);


// -----------------------------------------------------
// REFRESH + ADMIN PANEL
// -----------------------------------------------------

buttons.push([
  {
    text: "🔄 Refresh",
    callback_data:
      "ADMIN_VIEW_ORDER " + orderId
  },
  {
    text: "👑 Admin Panel",
    callback_data: "ADMIN_PANEL"
  }
]);


// =====================================================
// ⚡ CALLBACK ANSWER
// =====================================================

answerCallback("Order details loaded.", false);


// =====================================================
// 📩 SEND COMPLETE ORDER DETAILS
// =====================================================

Api.sendMessage({
  chat_id: adminId,
  text: orderText,
  parse_mode: "HTML",
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: buttons
  }
});
