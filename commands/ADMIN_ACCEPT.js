/*CMD
  command: ADMIN_ACCEPT
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
  command: ADMIN_ACCEPT
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 29 — ADMIN_ACCEPT
// STEP 2.2.1.3.7.1
//
// ADMIN → ACCEPT ORDER
//        ↓
// ADMIN_AMOUNT_INPUT
//
// CONNECTED:
// ADMIN_VIEW_ORDER
// ADMIN_REJECT
// ADMIN_AMOUNT_INPUT
// ORDER_SUBMIT
// =====================================================


// =====================================================
// 1. HTML SAFE TEXT
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
// 2. CALLBACK ANSWER
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
  } catch (error) {}
}


// =====================================================
// 3. ADMIN AUTHENTICATION
// =====================================================

var adminId = String(user.telegramid || "").trim();

var ownerId = "7897324623";

var isAuthorizedAdmin = adminId === ownerId;

var configuredAdmins =
  Bot.getProperty("EARNSTAR_ADMINS") || [];

if (!Array.isArray(configuredAdmins)) {
  configuredAdmins = [];
}

for (var ai = 0; ai < configuredAdmins.length; ai++) {
  var adminItem = configuredAdmins[ai];
  var registeredAdminId = "";

  if (
    typeof adminItem === "object" &&
    adminItem !== null
  ) {
    registeredAdminId = String(
      adminItem.id ||
      adminItem.telegramId ||
      adminItem.userId ||
      ""
    ).trim();
  } else {
    registeredAdminId = String(adminItem || "").trim();
  }

  if (registeredAdminId === adminId) {
    isAuthorizedAdmin = true;
    break;
  }
}

if (!isAuthorizedAdmin) {
  answerCallback("Not authorized.", true);

  Bot.sendMessage(
    "❌ <b>Access Denied</b>\n\n" +
    "You are not an authorized admin.",
    {
      parse_mode: "HTML"
    }
  );

  return;
}


// =====================================================
// 4. GET ORDER ID
// =====================================================

var orderId = "";

if (
  typeof params !== "undefined" &&
  params !== null
) {
  orderId = String(params).trim();
}

if (!orderId) {
  answerCallback("Order ID missing.", true);

  Bot.sendMessage(
    "❌ <b>Order ID missing.</b>",
    {
      parse_mode: "HTML"
    }
  );

  return;
}


// =====================================================
// 5. LOAD FINAL ORDER
// =====================================================

var order =
  Bot.getProperty("ORDER_" + orderId);

if (
  !order ||
  typeof order !== "object" ||
  Array.isArray(order)
) {
  answerCallback("Order not found.", true);

  Bot.sendMessage(
    "❌ <b>Order not found.</b>\n\n" +
    "🆔 Order ID: <code>" +
    safeText(orderId) +
    "</code>",
    {
      parse_mode: "HTML"
    }
  );

  return;
}


// =====================================================
// 6. PREVENT DOUBLE ACCEPTANCE
// =====================================================

var currentOrderStatus =
  String(order.orderStatus || "").toLowerCase().trim();

var currentRequestStatus =
  String(order.requestStatus || "").toLowerCase().trim();

var currentStage =
  String(order.stage || "").toLowerCase().trim();

var alreadyProcessed =
  currentOrderStatus === "accepted" ||
  currentOrderStatus === "payment_requested" ||
  currentOrderStatus === "advance_paid" ||
  currentOrderStatus === "in_progress" ||
  currentOrderStatus === "work_completed" ||
  currentOrderStatus === "completed" ||
  currentOrderStatus === "rejected" ||

  currentRequestStatus === "accepted" ||
  currentRequestStatus === "payment_requested" ||
  currentRequestStatus === "advance_paid" ||
  currentRequestStatus === "in_progress" ||
  currentRequestStatus === "work_completed" ||
  currentRequestStatus === "completed" ||
  currentRequestStatus === "rejected" ||

  currentStage === "admin_total_amount_input" ||
  currentStage === "payment_requested" ||
  currentStage === "payment_verification" ||
  currentStage === "in_progress" ||
  currentStage === "work_completed" ||
  currentStage === "completed";

if (alreadyProcessed) {
  answerCallback("Order is already being processed.", true);

  Bot.sendMessage(
    "⚠️ <b>Order Already Processed</b>\n\n" +
    "🆔 <b>Order ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n" +
    "📊 <b>Order Status:</b> " +
    safeText(order.orderStatus || "Not set") +
    "\n" +
    "📌 <b>Stage:</b> " +
    safeText(order.stage || "Not set"),
    {
      parse_mode: "HTML"
    }
  );

  return;
}


// =====================================================
// 7. VALIDATE ORDER OWNER
// =====================================================

var clientId = String(
  order.userId ||
  order.telegramId ||
  Bot.getProperty("ORDER_USER_" + orderId) ||
  ""
).trim();

if (!clientId) {
  answerCallback("Client ID missing.", true);

  Bot.sendMessage(
    "❌ <b>Client ID missing</b>\n\n" +
    "Order cannot be accepted because the client ID is missing.\n\n" +
    "🆔 Order ID: <code>" +
    safeText(orderId) +
    "</code>",
    {
      parse_mode: "HTML"
    }
  );

  return;
}

order.userId = clientId;


// =====================================================
// 8. UPDATE ORDER STATUS
// =====================================================

var now = new Date().toISOString();

order.orderId = orderId;
order.id = orderId;

order.adminId = adminId;
order.acceptedBy = adminId;

order.stage =
  "admin_total_amount_input";

order.packageStep =
  "admin_acceptance_completed";

order.orderStatus =
  "accepted";

order.requestStatus =
  "accepted";

order.paymentStatus =
  "not_requested";

order.advanceAmount =
  order.advanceAmount || "";

order.remainingAmount =
  order.remainingAmount || "";

order.progress =
  0;

order.progressTitle =
  "Order Accepted";

order.progressUpdate =
  "Order accepted. Waiting for project amount.";

order.acceptedAt =
  now;

order.updatedAt =
  now;


// =====================================================
// 9. SAVE UPDATED ORDER
// =====================================================

Bot.setProperty(
  "ORDER_" + orderId,
  order,
  "json"
);


// =====================================================
// 10. UPDATE ORDER HISTORY
// =====================================================

var orderHistory =
  Bot.getProperty("ORDER_HISTORY_" + orderId) || [];

if (!Array.isArray(orderHistory)) {
  orderHistory = [];
}

orderHistory.push(order);

Bot.setProperty(
  "ORDER_HISTORY_" + orderId,
  orderHistory,
  "json"
);


// =====================================================
// 11. SAVE ORDER OWNER REFERENCE
// =====================================================

Bot.setProperty(
  "ORDER_USER_" + orderId,
  clientId,
  "string"
);


// =====================================================
// 12. SAVE ACTIVE ADMIN ORDER
// =====================================================

Bot.setProperty(
  "ADMIN_ACTIVE_ORDER_" + adminId,
  orderId,
  "string"
);


// =====================================================
// 13. CLIENT LANGUAGE
// =====================================================

var clientData =
  Bot.getProperty("USER_" + clientId) || {};

if (
  !clientData ||
  typeof clientData !== "object" ||
  Array.isArray(clientData)
) {
  clientData = {};
}

var clientLanguage =
  String(clientData.language || "hinglish")
    .toLowerCase();


// =====================================================
// 14. PACKAGE NAME
// =====================================================

var packageName =
  order.packageName ||
  order.packageType ||
  "Custom Build";


// =====================================================
// 15. CLIENT NOTIFICATION
// =====================================================

var clientText = "";

if (clientLanguage === "english") {
  clientText =
    "✅ <b>Your Order Has Been Accepted</b>\n\n" +
    "🆔 <b>Order ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n\n" +
    "Our admin team has accepted your order.\n" +
    "We are now preparing the final project amount.\n\n" +
    "⏳ You will receive the payment details shortly.";
} else if (clientLanguage === "gujarati") {
  clientText =
    "✅ <b>તમારો Order Accept થયો છે</b>\n\n" +
    "🆔 <b>Order ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n\n" +
    "અમારી admin team એ તમારો order accept કર્યો છે.\n" +
    "હવે final project amount તૈયાર કરવામાં આવી રહ્યો છે.\n\n" +
    "⏳ તમને payment details ટૂંક સમયમાં મળશે.";
} else {
  clientText =
    "✅ <b>Aapka Order Accept Ho Gaya</b>\n\n" +
    "🆔 <b>Order ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n\n" +
    "Hamari admin team ne aapka order accept kar liya hai.\n" +
    "Ab final project amount prepare kiya ja raha hai.\n\n" +
    "⏳ Aapko payment details jaldi milengi.";
}

try {
  Api.sendMessage({
    chat_id: clientId,
    text: clientText,
    parse_mode: "HTML",
    disable_web_page_preview: true
  });
} catch (clientError) {
  Bot.setProperty(
    "CLIENT_NOTIFY_ERROR_" + orderId,
    String(clientError),
    "string"
  );
}


// =====================================================
// 16. ADMIN ACCEPTED MESSAGE
// =====================================================

var adminText =
  "✅ <b>ORDER ACCEPTED</b>\n\n" +
  "🆔 <b>Order ID:</b> <code>" +
  safeText(orderId) +
  "</code>\n" +
  "📦 <b>Package:</b> " +
  safeText(packageName) +
  "\n\n" +
  "👤 <b>Client ID:</b> <code>" +
  safeText(clientId) +
  "</code>\n\n" +
  "📌 <b>Status:</b> Accepted\n" +
  "📍 <b>Stage:</b> Enter Total Project Amount\n" +
  "💳 <b>Payment:</b> Not Requested\n\n" +
  "💰 Enter the total project amount below.";


// =====================================================
// 17. SEND ADMIN AMOUNT INPUT MESSAGE
// =====================================================

Bot.sendMessage(
  adminText +
  "\n\n" +
  "Example: <code>5000</code>\n\n" +
  "Please enter only the total amount in numbers.",
  {
    parse_mode: "HTML"
  }
);


// =====================================================
// 18. START AMOUNT INPUT
// =====================================================

Bot.runCommand("ADMIN_AMOUNT_INPUT");


// =====================================================
// 19. FINAL CALLBACK
// =====================================================

answerCallback("Order accepted. Enter total amount.", false);
