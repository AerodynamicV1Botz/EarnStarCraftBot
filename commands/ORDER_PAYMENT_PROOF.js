/*CMD
  command: ORDER_PAYMENT_PROOF
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
  command: ORDER_PAYMENT_PROOF
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 32 — ORDER_PAYMENT_PROOF
// CLIENT → START ADVANCE PAYMENT PROOF SUBMISSION
//
// NEXT:
// ORDER_PAYMENT_PROOF_SAVE
// =====================================================


// =====================================================
// 👤 CLIENT DATA
// =====================================================

var clientId =
  String(user.telegramid || "").trim();

var profileKey =
  "USER_" + clientId;

var profile =
  Bot.getProperty(profileKey) || {};

var language =
  String(
    profile.language || "hinglish"
  ).toLowerCase();


// =====================================================
// 🌐 MULTILINGUAL TEXT
// =====================================================

var text = {

  hinglish: {
    invalidOrder: "❌ Invalid order ID.",
    notFound: "❌ Order not found.",
    notOwner: "⛔ Yeh order aapka nahi hai.",
    notRequired: "⚠️ Abhi payment proof ki zarurat nahi hai.",
    alreadySubmitted:
      "⚠️ Is order ka payment proof already submit ho chuka hai.",
    amountError:
      "⚠️ Payment amount configure nahi hai.\n\nPlease admin se contact karein.",
    title: "📤 <b>PAYMENT SCREENSHOT REQUIRED</b>",
    prompt:
      "Payment karne ke baad uska clear screenshot bhejein.",
    visible:
      "Screenshot mein ye details visible honi chahiye:",
    amount: "• Payment amount",
    date: "• Date and time",
    transaction: "• Transaction ID",
    warning: "❌ Fake ya edited screenshot submit na karein.",
    send: "📸 Ab screenshot bhejein.",
    cancel: "❌ Cancel"
  },

  english: {
    invalidOrder: "❌ Invalid order ID.",
    notFound: "❌ Order not found.",
    notOwner: "⛔ This order does not belong to you.",
    notRequired:
      "⚠️ Payment proof is not required at this stage.",
    alreadySubmitted:
      "⚠️ Payment proof has already been submitted for this order.",
    amountError:
      "⚠️ Payment amount is not configured.\n\nPlease contact admin.",
    title: "📤 <b>PAYMENT SCREENSHOT REQUIRED</b>",
    prompt:
      "After making the payment, send a clear screenshot.",
    visible:
      "The screenshot must clearly show:",
    amount: "• Payment amount",
    date: "• Date and time",
    transaction: "• Transaction ID",
    warning: "❌ Do not submit fake or edited screenshots.",
    send: "📸 Send the screenshot now.",
    cancel: "❌ Cancel"
  },

  gujarati: {
    invalidOrder: "❌ અમાન્ય ઓર્ડર ID.",
    notFound: "❌ ઓર્ડર મળ્યો નથી.",
    notOwner: "⛔ આ ઓર્ડર તમારો નથી.",
    notRequired: "⚠️ અત્યારે પેમેન્ટ પ્રૂફની જરૂર નથી.",
    alreadySubmitted:
      "⚠️ આ ઓર્ડરનું પેમેન્ટ પ્રૂફ પહેલેથી જ સબમિટ થઈ ગયું છે.",
    amountError:
      "⚠️ પેમેન્ટની રકમ સેટ નથી.\n\nકૃપા કરીને એડમિનનો સંપર્ક કરો.",
    title: "📤 <b>પેમેન્ટ સ્ક્રીનશોટ જરૂરી છે</b>",
    prompt:
      "પેમેન્ટ કર્યા પછી તેનો સ્પષ્ટ સ્ક્રીનશોટ મોકલો.",
    visible:
      "સ્ક્રીનશોટમાં આ વિગતો દેખાવી જોઈએ:",
    amount: "• પેમેન્ટની રકમ",
    date: "• તારીખ અને સમય",
    transaction: "• ટ્રાન્ઝેક્શન ID",
    warning:
      "❌ નકલી અથવા એડિટ કરેલો સ્ક્રીનશોટ મોકલશો નહીં.",
    send: "📸 હવે સ્ક્રીનશોટ મોકલો.",
    cancel: "❌ Cancel"
  }

};

var langText =
  text[language] || text.hinglish;


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
// 🔘 CALLBACK ANSWER
// =====================================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {

  try {

    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "Payment proof upload karein.",
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

if (!rawData) {

  if (
    typeof message !== "undefined" &&
    message !== null
  ) {

    rawData =
      typeof message === "object"
        ? message.text || message.caption || ""
        : String(message);

  }

}

rawData =
  String(rawData || "")
    .replace(/^ORDER_PAYMENT_PROOF(?:\s+|$)/i, "")
    .trim();

var orderId =
  rawData;


// =====================================================
// ❌ VALIDATE ORDER ID
// =====================================================

if (!orderId) {

  Api.sendMessage({
    chat_id: clientId,
    text: langText.invalidOrder,
    parse_mode: "HTML"
  });

  return;

}


// =====================================================
// 📦 LOAD ORDER
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
    chat_id: clientId,
    text:
      langText.notFound +
      "\n\n🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>",
    parse_mode: "HTML"
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
  orderUserId !== clientId
) {

  Api.sendMessage({
    chat_id: clientId,
    text: langText.notOwner,
    parse_mode: "HTML"
  });

  return;

}


// =====================================================
// 🛑 ORDER STATUS CHECK
// =====================================================

var orderStatus =
  String(order.orderStatus || "").toLowerCase();

var requestStatus =
  String(order.requestStatus || "").toLowerCase();

if (
  orderStatus === "rejected" ||
  orderStatus === "cancelled" ||
  orderStatus === "completed" ||
  requestStatus === "rejected" ||
  requestStatus === "cancelled"
) {

  Api.sendMessage({
    chat_id: clientId,
    text: langText.notRequired,
    parse_mode: "HTML"
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

  Api.sendMessage({
    chat_id: clientId,
    text: langText.alreadySubmitted,
    parse_mode: "HTML"
  });

  return;

}

if (
  paymentStatus !== "advance_requested"
) {

  Api.sendMessage({
    chat_id: clientId,
    text: langText.notRequired,
    parse_mode: "HTML"
  });

  return;

}


// =====================================================
// 💰 AMOUNT VALIDATION
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
    chat_id: clientId,
    text: langText.amountError,
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
// 💾 SAVE WAITING STATE
// =====================================================

Bot.setProperty(
  "PAYMENT_PROOF_WAITING_" + clientId,
  orderId,
  "string"
);


// =====================================================
// 💾 UPDATE ORDER
// =====================================================

var now =
  new Date().toISOString();

order.stage =
  "payment_proof_input";

order.packageStep =
  "payment_proof_input";

order.paymentStatus =
  "proof_upload_pending";

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

order.paymentProofRequestedAt =
  order.paymentProofRequestedAt || now;

order.progress =
  35;

order.progressTitle =
  "Waiting for Payment Proof";

order.progressUpdate =
  "Client is uploading advance payment proof.";

order.updatedAt =
  now;

Bot.setProperty(
  orderKey,
  order,
  "json"
);


// =====================================================
// 👤 USER ACTIVITY
// =====================================================

profile.lastCommand =
  "ORDER_PAYMENT_PROOF";

profile.lastOrderId =
  orderId;

profile.lastVisitedAt =
  now;

Bot.setProperty(
  profileKey,
  profile,
  "json"
);


// =====================================================
// 📩 PROMPT
// =====================================================

var proofMessage =

  langText.title +
  "\n\n" +

  "🆔 <b>Order ID:</b> <code>" +
  safeText(orderId) +
  "</code>\n\n" +

  "💰 <b>Advance Amount:</b> ₹" +
  money(advanceAmount) +
  "\n\n" +

  langText.prompt +
  "\n\n" +

  langText.visible +
  "\n" +

  langText.amount +
  "\n" +

  langText.date +
  "\n" +

  langText.transaction +
  "\n\n" +

  langText.warning +
  "\n\n" +

  langText.send;


// =====================================================
// 🔘 CANCEL KEYBOARD
// =====================================================

var cancelKeyboard = {

  keyboard: [
    [
      {
        text: langText.cancel
      }
    ]
  ],

  resize_keyboard: true,
  one_time_keyboard: true

};


// =====================================================
// 📤 SEND PROMPT
// =====================================================

Api.sendMessage({

  chat_id: clientId,
  text: proofMessage,
  parse_mode: "HTML",
  reply_markup: cancelKeyboard

});


// =====================================================
// ⏳ NEXT COMMAND
// =====================================================

Bot.runCommand(
  "ORDER_PAYMENT_PROOF_SAVE"
);
