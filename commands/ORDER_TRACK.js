/*CMD
  command: ORDER_TRACK
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
  command: ORDER_TRACK
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 35 — ORDER_TRACK
//
// STEP: 2.2.1.3.7.9
// CLIENT → TRACK ORDER
//
// Callback formats:
// ORDER_TRACK orderId
// ORDER_TRACK|orderId
//
// Compatible with:
// ADMIN_VERIFY_PAYMENT
// ADMIN_START_WORK
// ADMIN_VERIFY_REMAINING_PAYMENT
// ADMIN_DELIVER_ORDER
// ADMIN_DELIVER_ORDER_SAVE
// =====================================================


// =====================================================
// 👤 USER ID
// =====================================================

var uid =
  String(user.telegramid || "");

if (!uid) {
  return;
}


// =====================================================
// 🧹 SAFE HTML
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
// 🔘 CALLBACK DATA
// =====================================================

var callbackData = "";

try {
  if (
    typeof request !== "undefined" &&
    request
  ) {
    callbackData = String(
      request.data ||
      request.callback_data ||
      ""
    );
  }
} catch (e) {
  callbackData = "";
}


// =====================================================
// 🆔 READ ORDER ID
// =====================================================

var orderId = "";

try {
  if (
    typeof params !== "undefined" &&
    params !== null
  ) {
    orderId =
      String(params).trim();
  }
} catch (e) {
  orderId = "";
}

if (!orderId && callbackData) {
  orderId =
    callbackData
      .replace(
        /^ORDER_TRACK[\s|:]*/i,
        ""
      )
      .trim();
}

if (orderId.indexOf("|") !== -1) {
  var callbackParts =
    orderId.split("|");

  orderId =
    String(
      callbackParts[callbackParts.length - 1] || ""
    ).trim();
}

if (orderId.indexOf(" ") !== -1) {
  orderId =
    orderId.split(/\s+/)[0];
}


// =====================================================
// 📦 LOAD ORDER
// =====================================================

var order = null;

if (orderId) {
  order =
    Bot.getProperty(
      "ORDER_" + orderId
    );
}


// =====================================================
// ❌ ORDER NOT FOUND
// =====================================================

if (
  !order ||
  typeof order !== "object"
) {
  Api.sendMessage({
    chat_id: uid,

    text:
      "📦 <b>No Order Found</b>\n\n" +
      "Aapka order nahi mila. Please valid order tracking button use karein.",

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🛒 Create New Order",
            callback_data: "MENU_PRICING"
          }
        ],
        [
          {
            text: "🏠 Main Menu",
            callback_data: "MAIN_MENU"
          }
        ]
      ]
    }
  });

  return;
}


// =====================================================
// 🆔 FINAL ORDER ID
// =====================================================

var finalOrderId = String(
  order.orderId ||
  order.id ||
  orderId ||
  ""
).trim();

if (!finalOrderId) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ Invalid order ID."
  });

  return;
}


// =====================================================
// 👤 CLIENT ID
// =====================================================

var mappedClientId =
  String(
    Bot.getProperty(
      "ORDER_USER_" + finalOrderId
    ) || ""
  ).trim();

var clientId = String(
  order.userId ||
  order.telegramId ||
  (
    order.telegramProfile &&
    (
      order.telegramProfile.telegramId ||
      order.telegramProfile.userId ||
      order.telegramProfile.id
    )
  ) ||
  mappedClientId ||
  ""
).trim();


// =====================================================
// 🔐 CLIENT ACCESS CHECK
// =====================================================

if (
  !clientId ||
  clientId !== uid
) {
  Api.sendMessage({
    chat_id: uid,

    text:
      "❌ <b>This order does not belong to you.</b>\n\n" +
      "Aap sirf apne orders track kar sakte hain.",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 🌐 LANGUAGE
// =====================================================

var profile =
  Bot.getProperty("USER_" + uid) || {};

var language =
  String(profile.language || "hinglish")
    .toLowerCase();

if (
  language !== "english" &&
  language !== "gujarati" &&
  language !== "hinglish"
) {
  language = "hinglish";
}


// =====================================================
// 📦 ORDER DETAILS
// =====================================================

var packageName =
  order.packageName ||
  order.packageType ||
  "Custom Order";

var packagePrice =
  Number(
    order.totalAmount ||
    order.packagePrice ||
    order.price ||
    0
  );

if (isNaN(packagePrice)) {
  packagePrice = 0;
}

var advanceAmount =
  Number(order.advanceAmount || 0);

if (isNaN(advanceAmount)) {
  advanceAmount = 0;
}

var remainingAmount =
  Number(order.remainingAmount || 0);

if (isNaN(remainingAmount)) {
  remainingAmount = 0;
}

var progress =
  Number(order.progress || 0);

if (isNaN(progress)) {
  progress = 0;
}

if (progress < 0) {
  progress = 0;
}

if (progress > 100) {
  progress = 100;
}

var orderStatus =
  String(
    order.orderStatus ||
    "pending_review"
  );

var paymentStatus =
  String(
    order.paymentStatus ||
    "not_requested"
  );

var stage =
  String(
    order.stage ||
    "client_name_input"
  );

var progressTitle =
  String(
    order.progressTitle ||
    "Order Started"
  );

var progressUpdate =
  String(
    order.progressUpdate ||
    "No update available yet."
  );

var createdAt =
  String(
    order.createdAt ||
    "Not available"
  );

var updatedAt =
  String(
    order.updatedAt ||
    "Not available"
  );


// =====================================================
// 📌 ORDER STATUS LABELS
// =====================================================

var orderStatusText = {
  pending_review: "⏳ Pending Admin Review",
  accepted: "✅ Accepted",
  in_progress: "🛠 Work In Progress",
  remaining_payment: "💳 Remaining Payment Pending",
  delivery_input: "📤 Delivery Being Prepared",
  completed: "🎉 Completed",
  delivered: "📦 Delivered",
  rejected: "❌ Rejected"
};


// =====================================================
// 💳 PAYMENT STATUS LABELS
// =====================================================

var paymentStatusText = {
  not_requested: "Not Requested",
  advance_requested: "Advance Payment Requested",
  proof_upload_pending: "Advance Proof Upload Pending",
  proof_submitted: "Advance Proof Submitted",
  payment_verification: "Payment Verification Pending",
  advance_paid: "Advance Payment Verified",
  work_started: "Work Started",
  remaining_payment_pending: "Remaining Payment Pending",
  remaining_payment_requested: "Remaining Payment Requested",
  remaining_proof_submitted: "Remaining Proof Submitted",
  remaining_payment_verification: "Remaining Payment Verification",
  remaining_paid: "Remaining Payment Verified",
  fully_paid: "💰 Fully Paid"
};


// =====================================================
// 🛠 STAGE LABELS
// =====================================================

var stageText = {
  client_name_input: "Client Details",
  client_name_completed: "Client Details Completed",
  contact_menu: "Contact Details",
  telegram_contact: "Telegram Contact",
  other_phone: "Other Phone",
  instagram_contact: "Instagram Contact",
  whatsapp_contact: "WhatsApp Contact",
  email_contact: "Email Contact",
  final_review: "Final Review",
  submitted: "Submitted",
  admin_review: "Admin Review",
  admin_total_amount_input: "Admin Amount Confirmation",
  amount_ready: "Amount Ready",
  advance_payment: "Advance Payment",
  payment_proof_input: "Payment Proof Upload",
  payment_verification: "Payment Verification",
  work_ready: "Ready To Start",
  work_in_progress: "🛠 Work In Progress",
  work_complete: "Work Completed",
  progress_updated: "Progress Updated",
  remaining_payment: "Remaining Payment",
  remaining_payment_proof_input: "Remaining Payment Proof Upload",
  remaining_payment_verification: "Remaining Payment Verification",
  ready_for_delivery: "Ready For Delivery",
  delivery_input: "Delivery Being Prepared",
  delivered: "📦 Delivered",
  rejected: "Rejected"
};

var shownOrderStatus =
  orderStatusText[orderStatus] ||
  orderStatus;

var shownPaymentStatus =
  paymentStatusText[paymentStatus] ||
  paymentStatus;

var shownStage =
  stageText[stage] ||
  stage;


// =====================================================
// 📊 PROGRESS BAR
// =====================================================

var filled =
  Math.floor(progress / 10);

var empty =
  10 - filled;

var progressBar = "";

for (var i = 0; i < filled; i++) {
  progressBar += "🟩";
}

for (var j = 0; j < empty; j++) {
  progressBar += "⬜";
}


// =====================================================
// 🌐 LANGUAGE TEXT
// =====================================================

var heading = {
  hinglish: "📦 <b>ORDER TRACKING</b>",
  english: "📦 <b>ORDER TRACKING</b>",
  gujarati: "📦 <b>ઓર્ડર ટ્રેકિંગ</b>"
};

var totalText = {
  hinglish: "Total Price",
  english: "Total Price",
  gujarati: "કુલ કિંમત"
};

var progressText = {
  hinglish: "Progress",
  english: "Progress",
  gujarati: "પ્રગતિ"
};

var orderStatusLabel = {
  hinglish: "Order Status",
  english: "Order Status",
  gujarati: "ઓર્ડર સ્ટેટસ"
};

var stageLabel = {
  hinglish: "Current Stage",
  english: "Current Stage",
  gujarati: "હાલનો સ્ટેજ"
};

var paymentLabel = {
  hinglish: "Payment Status",
  english: "Payment Status",
  gujarati: "પેમેન્ટ સ્ટેટસ"
};

var paymentSummary = {
  hinglish: "Payment Summary",
  english: "Payment Summary",
  gujarati: "પેમેન્ટ સમરી"
};

var advanceLabel = {
  hinglish: "Advance",
  english: "Advance",
  gujarati: "એડવાન્સ"
};

var remainingLabel = {
  hinglish: "Remaining",
  english: "Remaining",
  gujarati: "બાકી"
};

var latestUpdate = {
  hinglish: "Latest Update",
  english: "Latest Update",
  gujarati: "છેલ્લું અપડેટ"
};

var createdLabel = {
  hinglish: "Created",
  english: "Created",
  gujarati: "બનાવેલ"
};

var updatedLabel = {
  hinglish: "Last Updated",
  english: "Last Updated",
  gujarati: "છેલ્લું અપડેટ"
};

var refreshText = {
  hinglish: "🔄 Refresh Status",
  english: "🔄 Refresh Status",
  gujarati: "🔄 સ્ટેટસ રિફ્રેશ"
};

var contactText = {
  hinglish: "💬 Contact Admin",
  english: "💬 Contact Admin",
  gujarati: "💬 એડમિનનો સંપર્ક"
};

var payAdvanceText = {
  hinglish: "💳 Pay Advance",
  english: "💳 Pay Advance",
  gujarati: "💳 એડવાન્સ પેમેન્ટ"
};

var remainingProofText = {
  hinglish: "📤 Submit Remaining Proof",
  english: "📤 Submit Remaining Proof",
  gujarati: "📤 બાકી પેમેન્ટ પ્રૂફ"
};


// =====================================================
// 📊 TRACKING MESSAGE
// =====================================================

var trackingText =
  heading[language] +
  "\n\n" +

  "🆔 <b>Order ID:</b> <code>" +
  safeText(finalOrderId) +
  "</code>\n" +

  "📦 <b>Package:</b> " +
  safeText(packageName) +
  "\n" +

  "💰 <b>" +
  totalText[language] +
  ":</b> ₹" +
  packagePrice.toFixed(2) +
  "\n\n" +

  "📊 <b>" +
  progressText[language] +
  "</b>\n" +

  progressBar +
  " <b>" +
  progress +
  "%</b>\n" +

  "🔹 " +
  safeText(progressTitle) +
  "\n\n" +

  "📌 <b>" +
  orderStatusLabel[language] +
  ":</b> " +
  safeText(shownOrderStatus) +
  "\n" +

  "🛠 <b>" +
  stageLabel[language] +
  ":</b> " +
  safeText(shownStage) +
  "\n" +

  "💳 <b>" +
  paymentLabel[language] +
  ":</b> " +
  safeText(shownPaymentStatus) +
  "\n\n" +

  "💰 <b>" +
  paymentSummary[language] +
  "</b>\n" +

  advanceLabel[language] +
  ": ₹" +
  advanceAmount.toFixed(2) +
  "\n" +

  remainingLabel[language] +
  ": ₹" +
  remainingAmount.toFixed(2) +
  "\n\n" +

  "📝 <b>" +
  latestUpdate[language] +
  "</b>\n" +

  safeText(progressUpdate) +
  "\n\n" +

  "🕒 <b>" +
  createdLabel[language] +
  ":</b> " +
  safeText(createdAt) +
  "\n" +

  "🔄 <b>" +
  updatedLabel[language] +
  ":</b> " +
  safeText(updatedAt);


// =====================================================
// 🔘 ACTION BUTTONS
// =====================================================

var buttons = [];


// ---------- ADVANCE PAYMENT ----------

if (
  paymentStatus === "advance_requested" ||
  paymentStatus === "proof_upload_pending"
) {
  buttons.push([
    {
      text: payAdvanceText[language],
      callback_data:
        "ORDER_PAYMENT_PROOF " +
        finalOrderId
    }
  ]);
}


// ---------- REMAINING PAYMENT ----------

if (
  paymentStatus === "remaining_payment_requested" ||
  paymentStatus === "remaining_payment_pending"
) {
  buttons.push([
    {
      text: remainingProofText[language],
      callback_data:
        "ORDER_REMAINING_PAYMENT_PROOF " +
        finalOrderId
    }
  ]);
}


// ---------- PAYMENT VERIFICATION PENDING ----------

if (
  paymentStatus === "proof_submitted" ||
  paymentStatus === "remaining_proof_submitted"
) {
  buttons.push([
    {
      text: "⏳ Payment Verification Pending",
      callback_data:
        "ORDER_TRACK " +
        finalOrderId
    }
  ]);
}


// ---------- DELIVERED ----------

if (
  stage === "delivered" ||
  order.deliveryStatus === "delivered"
) {
  buttons.push([
    {
      text: "📦 Delivered Successfully",
      callback_data:
        "ORDER_TRACK " +
        finalOrderId
    }
  ]);
}


// ---------- REFRESH ----------

buttons.push([
  {
    text: refreshText[language],
    callback_data:
      "ORDER_TRACK " +
      finalOrderId
  }
]);


// ---------- CONTACT ADMIN ----------

buttons.push([
  {
    text: contactText[language],
    callback_data:
      "ORDER_CONTACT_ADMIN " +
      finalOrderId
  }
]);


// ---------- MAIN MENU ----------

buttons.push([
  {
    text: "🏠 Main Menu",
    callback_data: "MAIN_MENU"
  }
]);


// =====================================================
// 📩 SEND TRACKING
// =====================================================

Api.sendMessage({
  chat_id: uid,

  text: trackingText,

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: buttons
  }
});
