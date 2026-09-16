/*CMD
  command: ORDER_PAYMENT_PROOF_SAVE
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
  command: ORDER_PAYMENT_PROOF_SAVE
  need_reply: true
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 33 — ORDER_PAYMENT_PROOF_SAVE
// CLIENT → PAYMENT PROOF → ADMIN VERIFICATION
//
// NEXT:
// ADMIN_VERIFY_PAYMENT <orderId>
// ADMIN_REJECT_PAYMENT <orderId>
// =====================================================


// =====================================================
// 👤 USER ID
// =====================================================

var userId =
  String(user.telegramid || "").trim();


// =====================================================
// 🔐 HELPERS
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
// 📦 WAITING ORDER
// =====================================================

var waitingKey =
  "PAYMENT_PROOF_WAITING_" + userId;

var waitingOrderId =
  Bot.getProperty(waitingKey);

if (!waitingOrderId) {

  Api.sendMessage({
    chat_id: userId,
    text:
      "⚠️ Koi payment proof request active nahi hai."
  });

  return;

}

var orderId =
  String(waitingOrderId).trim();

var orderKey =
  "ORDER_" + orderId;

var order =
  Bot.getProperty(orderKey);

if (
  !order ||
  typeof order !== "object"
) {

  Bot.setProperty(
    waitingKey,
    "",
    "string"
  );

  Api.sendMessage({
    chat_id: userId,
    text:
      "❌ Order details nahi mili."
  });

  return;

}


// =====================================================
// 📝 READ MESSAGE TEXT
// =====================================================

var messageText = "";

if (
  typeof message !== "undefined" &&
  message !== null
) {

  if (typeof message === "object") {

    messageText =
      String(
        message.text ||
        message.caption ||
        ""
      ).trim();

  } else {

    messageText =
      String(message).trim();

  }

}

var lowerMessage =
  messageText.toLowerCase();


// =====================================================
// ❌ CANCEL HANDLER
// =====================================================

if (
  messageText === "❌ Cancel" ||
  messageText === "❌ कैंसल" ||
  messageText === "❌ કેન્સલ" ||
  lowerMessage === "/cancel"
) {

  Bot.setProperty(
    waitingKey,
    "",
    "string"
  );

  order.stage =
    "advance_payment";

  order.packageStep =
    "advance_payment";

  order.paymentStatus =
    "advance_requested";

  order.progress =
    30;

  order.progressTitle =
    "Advance Payment Requested";

  order.progressUpdate =
    "Client cancelled payment proof upload.";

  order.updatedAt =
    new Date().toISOString();

  Bot.setProperty(
    orderKey,
    order,
    "json"
  );

  Api.sendMessage({
    chat_id: userId,
    text:
      "❌ Payment proof submission cancel kar di gayi.",
    reply_markup: {
      remove_keyboard: true
    }
  });

  return;

}


// =====================================================
// 👤 OWNERSHIP CHECK
// =====================================================

var profileData =
  order.telegramProfile || {};

var orderUserId =
  String(
    order.userId ||
    order.telegramId ||
    profileData.telegramId ||
    Bot.getProperty("ORDER_USER_" + orderId) ||
    ""
  ).trim();

if (
  orderUserId &&
  orderUserId !== userId
) {

  Bot.setProperty(
    waitingKey,
    "",
    "string"
  );

  Api.sendMessage({
    chat_id: userId,
    text:
      "⛔ Yeh order aapka nahi hai.",
    reply_markup: {
      remove_keyboard: true
    }
  });

  return;

}


// =====================================================
// 🛑 PAYMENT STATUS CHECK
// =====================================================

var paymentStatus =
  String(order.paymentStatus || "").toLowerCase();

if (
  paymentStatus === "proof_submitted" ||
  paymentStatus === "payment_review" ||
  paymentStatus === "advance_paid" ||
  paymentStatus === "remaining_payment_requested" ||
  paymentStatus === "remaining_paid" ||
  paymentStatus === "fully_paid"
) {

  Bot.setProperty(
    waitingKey,
    "",
    "string"
  );

  Api.sendMessage({
    chat_id: userId,
    text:
      "⚠️ Is order ka payment proof already submit ho chuka hai.",
    reply_markup: {
      remove_keyboard: true
    }
  });

  return;

}

if (
  paymentStatus !== "proof_upload_pending" &&
  paymentStatus !== "advance_requested"
) {

  Api.sendMessage({
    chat_id: userId,
    text:
      "⚠️ Abhi payment proof submit nahi kiya ja sakta."
  });

  return;

}


// =====================================================
// 🖼️ EXTRACT PHOTO
// =====================================================

var photoList = null;

if (
  typeof message !== "undefined" &&
  message &&
  Array.isArray(message.photo)
) {

  photoList =
    message.photo;

}

if (
  !photoList &&
  typeof request !== "undefined" &&
  request &&
  Array.isArray(request.photo)
) {

  photoList =
    request.photo;

}


// =====================================================
// 📄 EXTRACT DOCUMENT
// =====================================================

var documentFileId = "";

if (
  typeof message !== "undefined" &&
  message &&
  message.document &&
  message.document.file_id
) {

  documentFileId =
    String(message.document.file_id);

}

if (
  !documentFileId &&
  typeof request !== "undefined" &&
  request &&
  request.document &&
  request.document.file_id
) {

  documentFileId =
    String(request.document.file_id);

}


// =====================================================
// 🖼️ SELECT HIGHEST QUALITY FILE
// =====================================================

var fileId = "";
var proofType = "";

if (
  photoList &&
  photoList.length > 0
) {

  var lastPhoto =
    photoList[photoList.length - 1];

  fileId =
    String(lastPhoto.file_id || "");

  proofType =
    "photo";

}

if (
  !fileId &&
  documentFileId
) {

  fileId =
    documentFileId;

  proofType =
    "document";

}

if (!fileId) {

  Api.sendMessage({
    chat_id: userId,
    text:
      "❌ Please payment ka clear screenshot/photo bhejein.\n\n" +
      "Sirf image ya payment screenshot document accepted hai."
  });

  return;

}


// =====================================================
// 👤 CLIENT DETAILS
// =====================================================

var fullName =
  String(user.first_name || "") +
  (
    user.last_name
      ? " " + String(user.last_name)
      : ""
  );

if (!fullName.trim()) {
  fullName = "Not provided";
}

var username =
  user.username
    ? "@" + String(user.username)
    : "Not set";


// =====================================================
// 💰 AMOUNT DATA
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

if (!isFinite(totalAmount)) {
  totalAmount = 0;
}

if (!isFinite(advanceAmount)) {
  advanceAmount = 0;
}

if (!isFinite(remainingAmount)) {
  remainingAmount = 0;
}


// =====================================================
// 👑 ADMIN RECIPIENTS
// =====================================================

var recipients = [];

function addRecipient(value) {

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
    recipients.indexOf(value) === -1
  ) {

    recipients.push(value);

  }

}

addRecipient("7897324623");

var savedAdmins =
  Bot.getProperty("EARNSTAR_ADMINS") || [];

if (Array.isArray(savedAdmins)) {

  for (
    var i = 0;
    i < savedAdmins.length;
    i++
  ) {

    addRecipient(savedAdmins[i]);

  }

} else {

  addRecipient(savedAdmins);

}


// =====================================================
// 📝 ADMIN CAPTION
// =====================================================

var adminCaption =

  "💳 <b>PAYMENT PROOF RECEIVED</b>\n\n" +

  "🆔 <b>Order ID:</b> <code>" +
  safeText(orderId) +
  "</code>\n\n" +

  "👤 <b>Client:</b> " +
  safeText(fullName) +
  "\n" +

  "🆔 <b>Telegram ID:</b> <code>" +
  safeText(userId) +
  "</code>\n" +

  "🔗 <b>Username:</b> " +
  safeText(username) +
  "\n\n" +

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

  "⚠️ Please verify the payment before accepting.";


// =====================================================
// 🔘 ADMIN BUTTONS
// =====================================================

var adminButtons = [

  [
    {
      text: "✅ Verify Payment",
      callback_data:
        "ADMIN_VERIFY_PAYMENT " + orderId
    }
  ],

  [
    {
      text: "❌ Reject Payment Proof",
      callback_data:
        "ADMIN_REJECT_PAYMENT " + orderId
    }
  ],

  [
    {
      text: "👁 View Order",
      callback_data:
        "ADMIN_VIEW_ORDER " + orderId
    }
  ]

];


// =====================================================
// 📤 SEND PROOF TO ADMINS
// =====================================================

var proofForwarded =
  false;

for (
  var j = 0;
  j < recipients.length;
  j++
) {

  var recipientId =
    recipients[j];

  try {

    if (proofType === "photo") {

      Api.sendPhoto({

        chat_id: recipientId,
        photo: fileId,
        caption: adminCaption,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: adminButtons
        }

      });

    } else {

      Api.sendDocument({

        chat_id: recipientId,
        document: fileId,
        caption: adminCaption,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: adminButtons
        }

      });

    }

    proofForwarded =
      true;

  } catch (error) {

    Bot.setProperty(
      "PAYMENT_PROOF_FORWARD_ERROR_" +
      orderId +
      "_" +
      recipientId,
      String(error),
      "string"
    );

  }

}


// =====================================================
// ❌ FORWARD FAILED
// =====================================================

if (!proofForwarded) {

  Api.sendMessage({

    chat_id: userId,

    text:
      "⚠️ Payment proof receive hua, lekin admin ko forward nahi ho saka.\n\n" +
      "Please dobara try karein ya admin se contact karein.",

    reply_markup: {
      remove_keyboard: true
    }

  });

  return;

}


// =====================================================
// 💾 UPDATE FINAL ORDER
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

order.paymentStatus =
  "proof_submitted";

order.stage =
  "payment_verification";

order.packageStep =
  "payment_verification";

order.requestStatus =
  order.requestStatus || "accepted";

order.orderStatus =
  order.orderStatus || "accepted";

order.paymentProofFileId =
  fileId;

order.paymentProofType =
  proofType;

order.paymentProofSubmittedBy =
  userId;

order.paymentProofSubmittedAt =
  now;

order.paymentVerificationStatus =
  "pending";

order.progress =
  40;

order.progressTitle =
  "Payment Proof Submitted";

order.progressUpdate =
  "Payment proof admin verification ke liye submit kiya gaya.";

order.updatedAt =
  now;


// =====================================================
// 💾 SAVE FINAL ORDER ONLY
// =====================================================

Bot.setProperty(
  orderKey,
  order,
  "json"
);

Bot.setProperty(
  "ORDER_USER_" + orderId,
  userId,
  "string"
);

Bot.setProperty(
  "ORDER_HISTORY_" + orderId,
  order,
  "json"
);


// =====================================================
// 🧹 CLEAR WAITING STATE
// =====================================================

Bot.setProperty(
  waitingKey,
  "",
  "string"
);


// =====================================================
// 📩 CLIENT CONFIRMATION
// =====================================================

Api.sendMessage({

  chat_id: userId,

  text:

    "✅ <b>Payment Proof Submitted</b>\n\n" +

    "🆔 <b>Order ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n\n" +

    "Aapka payment screenshot admin ko bhej diya gaya hai.\n" +
    "Verification complete hone ke baad aapko confirmation milega.",

  parse_mode: "HTML",

  reply_markup: {
    remove_keyboard: true
  }

});
