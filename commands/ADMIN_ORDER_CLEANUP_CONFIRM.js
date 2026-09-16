/*CMD
  command: ADMIN_ORDER_CLEANUP_CONFIRM
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
  command: ADMIN_ORDER_CLEANUP_CONFIRM
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 31 — ADMIN_ORDER_CLEANUP_CONFIRM
// ADMIN → PERMANENT ORDER CLEANUP
// =====================================================


// =====================================================
// 🔐 SAFE HTML
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
// 👤 CURRENT ADMIN
// =====================================================

var adminId = String(user.telegramid);


// =====================================================
// 🔑 ADMIN LIST
// =====================================================

var ownerId = "7897324623";
var adminIds = [ownerId];

var configuredAdmins =
  Bot.getProperty("EARNSTAR_ADMINS", []);

if (!Array.isArray(configuredAdmins)) {
  configuredAdmins = [];
}

var configuredOwner =
  Bot.getProperty("OWNER_ID", "");

if (configuredOwner) {
  configuredAdmins.push(configuredOwner);
}

for (var i = 0; i < configuredAdmins.length; i++) {
  var item = configuredAdmins[i];
  var extractedId = "";

  if (typeof item === "object" && item !== null) {
    extractedId =
      item.id ||
      item.telegramId ||
      item.userId ||
      "";
  } else {
    extractedId = item;
  }

  extractedId = String(extractedId || "").trim();

  if (
    extractedId &&
    adminIds.indexOf(extractedId) === -1
  ) {
    adminIds.push(extractedId);
  }
}

if (adminIds.indexOf(adminId) === -1) {
  Bot.sendMessage("❌ Unauthorized access.");
  return;
}


// =====================================================
// 🧩 ORDER ID PARSING
// =====================================================

var rawParams = String(params || "").trim();

if (!rawParams) {
  Bot.sendMessage("❌ Order ID missing.");
  return;
}

var orderId = rawParams
  .replace(/^ADMIN_ORDER_CLEANUP_CONFIRM[\s|:]*/i, "")
  .trim();

if (!orderId) {
  Bot.sendMessage("❌ Invalid order ID.");
  return;
}


// =====================================================
// 📦 LOAD FINAL ORDER
// =====================================================

var orderKey = "ORDER_" + orderId;
var order = Bot.getProperty(orderKey);

if (!order || typeof order !== "object") {
  Bot.sendMessage(
    "❌ Order not found.\n\n" +
    "Order ID: <code>" + safeText(orderId) + "</code>",
    { parse_mode: "HTML" }
  );
  return;
}


// =====================================================
// 👤 CLIENT ID FINDER
// =====================================================

var clientId = "";

if (order.userId) {
  clientId = String(order.userId);
}

if (!clientId && order.telegramId) {
  clientId = String(order.telegramId);
}

if (
  !clientId &&
  order.telegramProfile &&
  typeof order.telegramProfile === "object"
) {
  clientId =
    String(
      order.telegramProfile.telegramId ||
      order.telegramProfile.userId ||
      ""
    );
}

if (!clientId && order.clientId) {
  clientId = String(order.clientId);
}


// =====================================================
// 🧾 ORDER DETAILS
// =====================================================

var packageName =
  order.packageName ||
  order.packageType ||
  order.package ||
  "Custom Order";

var clientName =
  order.clientName ||
  order.name ||
  "Client";

var currentStatus =
  order.orderStatus ||
  order.stage ||
  order.requestStatus ||
  "unknown";


// =====================================================
// 📝 SAVE MINIMAL CLEANUP AUDIT
// =====================================================

var cleanupLog = {
  orderId: orderId,
  clientId: clientId,
  packageName: packageName,
  clientName: clientName,
  previousStatus: currentStatus,
  cleanedBy: adminId,
  cleanedAt: new Date().toISOString(),
  action: "PERMANENT_ORDER_CLEANUP"
};

Bot.setProperty(
  "ADMIN_CLEANUP_LOG_" + orderId,
  cleanupLog,
  "json"
);


// =====================================================
// 👤 CLIENT NOTIFICATION BEFORE DELETION
// =====================================================

if (clientId) {
  try {
    Bot.sendMessageToChatWithId(
      clientId,
      "🗑️ <b>Order Record Removed</b>\n\n" +
      "Your order record has been permanently removed from our active system by the admin.\n\n" +
      "Order ID: <code>" + safeText(orderId) + "</code>\n\n" +
      "If you still need help, please contact @TeamEarnStar.",
      {
        parse_mode: "HTML"
      }
    );
  } catch (notifyError) {
    Bot.setProperty(
      "CLIENT_NOTIFY_ERROR_" + orderId,
      {
        orderId: orderId,
        clientId: clientId,
        error: String(notifyError),
        createdAt: new Date().toISOString()
      },
      "json"
    );
  }
}


// =====================================================
// 🧹 REMOVE ORDER FROM ORDER_KEYS
// =====================================================

var orderKeys =
  Bot.getProperty("ORDER_KEYS", []);

if (Array.isArray(orderKeys)) {
  var filteredOrderKeys = [];

  for (var k = 0; k < orderKeys.length; k++) {
    var existingId = String(orderKeys[k]);

    if (existingId !== orderId) {
      filteredOrderKeys.push(orderKeys[k]);
    }
  }

  Bot.setProperty(
    "ORDER_KEYS",
    filteredOrderKeys,
    "json"
  );
}


// =====================================================
// 🧹 REMOVE FINAL ORDER DATA
// =====================================================

Bot.setProperty(
  "ORDER_" + orderId,
  "",
  "json"
);

Bot.setProperty(
  "ORDER_USER_" + orderId,
  "",
  "string"
);

Bot.setProperty(
  "ORDER_HISTORY_" + orderId,
  "",
  "json"
);


// =====================================================
// 🧹 REMOVE ACTIVE ADMIN REFERENCES
// =====================================================

for (var a = 0; a < adminIds.length; a++) {
  var activeAdminId = adminIds[a];

  var activeOrder =
    Bot.getProperty(
      "ADMIN_ACTIVE_ORDER_" + activeAdminId,
      ""
    );

  if (String(activeOrder) === String(orderId)) {
    Bot.setProperty(
      "ADMIN_ACTIVE_ORDER_" + activeAdminId,
      "",
      "string"
    );
  }
}


// =====================================================
// 🧹 REMOVE CLIENT WAITING STATES
// =====================================================

if (clientId) {
  Bot.setProperty(
    "ORDER_PAYMENT_PROOF_WAITING_" + clientId,
    "",
    "string"
  );

  Bot.setProperty(
    "REMAINING_PAYMENT_PROOF_WAITING_" + clientId,
    "",
    "string"
  );

  Bot.setProperty(
    "ORDER_CONTACT_ADMIN_WAITING_" + clientId,
    "",
    "string"
  );

  Bot.setProperty(
    "ORDER_CLIENT_NAME_WAITING_" + clientId,
    "",
    "string"
  );

  Bot.setProperty(
    "ORDER_CONTACT_WAITING_" + clientId,
    "",
    "string"
  );

  Bot.setProperty(
    "ORDER_REQUIREMENTS_WAITING_" + clientId,
    "",
    "string"
  );
}


// =====================================================
// ⚠️ DIRECT ORDER LOCK
// =====================================================
// Direct order lock ko blindly delete nahi kar rahe,
// kyunki package key unknown ho sakti hai.
// Sirf explicit key available ho toh clear hoga.

var directOrderKey =
  order.directOrderKey ||
  order.directOrderProperty ||
  "";

if (directOrderKey) {
  Bot.setProperty(
    String(directOrderKey),
    "",
    "json"
  );
}


// =====================================================
// ✅ ADMIN SUCCESS MESSAGE
// =====================================================

Bot.sendMessage(
  "✅ <b>Order Permanently Cleaned</b>\n\n" +
  "🆔 Order ID: <code>" + safeText(orderId) + "</code>\n" +
  "👤 Client: " + safeText(clientName) + "\n" +
  "📦 Package: " + safeText(packageName) + "\n\n" +
  "Removed:\n" +
  "• Final order record\n" +
  "• User-order mapping\n" +
  "• Order history\n" +
  "• Order list reference\n" +
  "• Active admin reference\n" +
  "• Temporary waiting states\n\n" +
  "📝 Minimal cleanup audit log preserved.",
  {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📋 All Orders",
            callback_data: "ADMIN_ORDERS"
          },
          {
            text: "⚙️ Admin Panel",
            callback_data: "ADMIN_PANEL"
          }
        ]
      ]
    }
  }
);
