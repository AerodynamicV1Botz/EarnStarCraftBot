/*CMD
  command: ADMIN_REJECT
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
  command: ADMIN_REJECT
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 30 — ADMIN_REJECT
// STEP 2.2.1.3.7.2
//
// ADMIN → REJECT INITIAL ORDER
//
// CONNECTED:
// ORDER_SUBMIT
// ADMIN_VIEW_ORDER
// ADMIN_ACCEPT
// ORDER_TRACK
// ORDER_CONTACT_ADMIN
// ADMIN_PANEL
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

var adminId =
  String(user.telegramid || "").trim();

var ownerId = "7897324623";

var authorizedAdmins = [ownerId];

function addAdmin(value) {
  if (
    value === null ||
    typeof value === "undefined"
  ) {
    return;
  }

  var savedId = "";

  if (
    typeof value === "object" &&
    value !== null
  ) {
    savedId = String(
      value.id ||
      value.telegramId ||
      value.userId ||
      ""
    );
  } else {
    savedId = String(value);
  }

  savedId = savedId.trim();

  if (
    savedId &&
    authorizedAdmins.indexOf(savedId) === -1
  ) {
    authorizedAdmins.push(savedId);
  }
}

var earnstarAdmins =
  Bot.getProperty("EARNSTAR_ADMINS") || [];

if (Array.isArray(earnstarAdmins)) {
  for (var ai = 0; ai < earnstarAdmins.length; ai++) {
    addAdmin(earnstarAdmins[ai]);
  }
}

if (
  authorizedAdmins.indexOf(adminId) === -1
) {
  answerCallback("Not authorized.", true);

  Api.sendMessage({
    chat_id: adminId,
    text:
      "❌ <b>Access Denied</b>\n\n" +
      "You are not an authorized admin.",
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 4. READ ORDER ID
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

  try {
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
  } catch (error) {}

  if (callbackData) {
    if (callbackData.indexOf("|") !== -1) {
      orderId =
        callbackData.split("|").slice(1).join("|").trim();
    } else {
      var callbackParts =
        callbackData.split(/\s+/);

      if (callbackParts.length > 1) {
        orderId =
          callbackParts.slice(1).join(" ").trim();
      }
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

  Api.sendMessage({
    chat_id: adminId,
    text:
      "❌ <b>Order not found.</b>\n\n" +
      "🆔 Order ID: <code>" +
      safeText(orderId) +
      "</code>",
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 6. PREVENT DOUBLE REJECTION
// =====================================================

var currentOrderStatus =
  String(order.orderStatus || "").toLowerCase().trim();

var currentRequestStatus =
  String(order.requestStatus || "").toLowerCase().trim();

var currentStage =
  String(order.stage || "").toLowerCase().trim();

if (
  currentOrderStatus === "rejected" ||
  currentRequestStatus === "rejected" ||
  currentStage === "rejected"
) {
  answerCallback("Order already rejected.", true);

  Api.sendMessage({
    chat_id: adminId,
    text:
      "⚠️ <b>Order Already Rejected</b>\n\n" +
      "🆔 Order ID: <code>" +
      safeText(orderId) +
      "</code>",
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 7. PREVENT REJECTION AFTER PROCESSING
// =====================================================

if (
  currentOrderStatus === "accepted" ||
  currentOrderStatus === "payment_requested" ||
  currentOrderStatus === "advance_paid" ||
  currentOrderStatus === "in_progress" ||
  currentOrderStatus === "work_completed" ||
  currentOrderStatus === "completed" ||
  currentOrderStatus === "delivered" ||

  currentRequestStatus === "accepted" ||
  currentRequestStatus === "payment_requested" ||
  currentRequestStatus === "advance_paid" ||
  currentRequestStatus === "in_progress" ||
  currentRequestStatus === "work_completed" ||
  currentRequestStatus === "completed" ||

  currentStage === "admin_total_amount_input" ||
  currentStage === "payment_requested" ||
  currentStage === "payment_verification" ||
  currentStage === "in_progress" ||
  currentStage === "work_completed" ||
  currentStage === "completed"
) {
  answerCallback("Order is already being processed.", true);

  Api.sendMessage({
    chat_id: adminId,
    text:
      "⚠️ <b>Order Cannot Be Rejected Now</b>\n\n" +
      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>\n" +
      "📊 <b>Status:</b> " +
      safeText(order.orderStatus || "Not set") +
      "\n" +
      "📌 <b>Stage:</b> " +
      safeText(order.stage || "Not set"),
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 8. CLIENT ID
// =====================================================

var clientId = String(
  order.userId ||
  order.telegramId ||
  Bot.getProperty("ORDER_USER_" + orderId) ||
  ""
).trim();

if (!clientId) {
  answerCallback("Client ID missing.", true);

  Api.sendMessage({
    chat_id: adminId,
    text:
      "❌ <b>Client ID not found.</b>\n\n" +
      "Order ID: <code>" +
      safeText(orderId) +
      "</code>",
    parse_mode: "HTML"
  });

  return;
}

order.userId = clientId;


// =====================================================
// 9. CLIENT LANGUAGE
// =====================================================

var clientProfile =
  Bot.getProperty("USER_" + clientId) || {};

if (
  !clientProfile ||
  typeof clientProfile !== "object" ||
  Array.isArray(clientProfile)
) {
  clientProfile = {};
}

var language =
  String(
    clientProfile.language ||
    order.language ||
    "hinglish"
  ).toLowerCase();


// =====================================================
// 10. UPDATE ORDER
// =====================================================

var now =
  new Date().toISOString();

order.orderId = orderId;
order.id = orderId;

order.stage = "rejected";
order.packageStep = "order_rejected";

order.requestStatus = "rejected";
order.orderStatus = "rejected";

order.paymentStatus = "not_requested";

order.progress = 0;
order.progressTitle = "Order Rejected";
order.progressUpdate = "Order rejected by admin.";

order.adminId = adminId;
order.rejectedBy = adminId;

order.adminNote =
  "Order rejected by admin.";

order.rejectedAt = now;
order.updatedAt = now;


// =====================================================
// 11. SAVE FINAL ORDER
// =====================================================

Bot.setProperty(
  "ORDER_" + orderId,
  order,
  "json"
);


// =====================================================
// 12. UPDATE ORDER HISTORY
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
// 13. PRESERVE ORDER OWNER REFERENCE
// =====================================================

Bot.setProperty(
  "ORDER_USER_" + orderId,
  clientId,
  "string"
);


// =====================================================
// 14. PACKAGE DISPLAY
// =====================================================

var packageName =
  order.packageName ||
  order.packageType ||
  "Custom Build";

var safeOrderId =
  safeText(orderId);

var safePackageName =
  safeText(packageName);


// =====================================================
// 15. USER MESSAGE
// =====================================================

var userText = "";

if (language === "english") {
  userText =
    "❌ <b>Order Rejected</b>\n\n" +
    "🆔 <b>Order ID:</b> <code>" +
    safeOrderId +
    "</code>\n\n" +
    "📦 <b>Package:</b> " +
    safePackageName +
    "\n\n" +
    "Unfortunately, our admin team could not accept this order at this time.\n\n" +
    "📩 Contact the admin team if you need more information.";
} else if (language === "gujarati") {
  userText =
    "❌ <b>ઓર્ડર રદ કરવામાં આવ્યો છે</b>\n\n" +
    "🆔 <b>ઓર્ડર ID:</b> <code>" +
    safeOrderId +
    "</code>\n\n" +
    "📦 <b>પેકેજ:</b> " +
    safePackageName +
    "\n\n" +
    "અમારી admin team આ સમયે તમારો ઓર્ડર સ્વીકારી શકી નથી.\n\n" +
    "📩 વધુ માહિતી માટે admin team નો સંપર્ક કરો.";
} else {
  userText =
    "❌ <b>Order Reject Ho Gaya</b>\n\n" +
    "🆔 <b>Order ID:</b> <code>" +
    safeOrderId +
    "</code>\n\n" +
    "📦 <b>Package:</b> " +
    safePackageName +
    "\n\n" +
    "Admin team ne is order ko accept nahi kiya.\n\n" +
    "📩 Zyada information ke liye admin team ko contact karein.";
}


// =====================================================
// 16. SEND USER NOTIFICATION
// =====================================================

try {
  Api.sendMessage({
    chat_id: clientId,
    text: userText,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [
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
} catch (userError) {
  Bot.setProperty(
    "CLIENT_NOTIFY_ERROR_" + orderId,
    String(userError),
    "string"
  );
}


// =====================================================
// 17. ADMIN CONFIRMATION
// =====================================================

try {
  Api.sendMessage({
    chat_id: adminId,
    text:
      "❌ <b>Order Rejected Successfully</b>\n\n" +
      "🆔 <b>Order ID:</b> <code>" +
      safeOrderId +
      "</code>\n\n" +
      "📦 <b>Package:</b> " +
      safePackageName +
      "\n\n" +
      "👤 <b>Client ID:</b> <code>" +
      safeText(clientId) +
      "</code>\n\n" +
      "📩 Rejection notification sent to the client.",
    parse_mode: "HTML",
    disable_web_page_preview: true,
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
} catch (adminError) {}


// =====================================================
// 18. FINAL CALLBACK
// =====================================================

answerCallback("Order rejected successfully.", false);
