/*CMD
  command: ADMIN_REPLY_CLIENT
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
  command: ADMIN_REPLY_CLIENT
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 40 — ADMIN_REPLY_CLIENT
//
// STEP: 2.2.1.3.7.10.2
// ADMIN → REPLY TO CLIENT
//
// Callback formats:
// ADMIN_REPLY_CLIENT orderId
// ADMIN_REPLY_CLIENT|orderId
//
// Next command:
// ADMIN_REPLY_CLIENT_SAVE
// =====================================================


// =====================================================
// 👤 ADMIN USER ID
// =====================================================

var adminId =
  String(user.telegramid);


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
// 👑 ADMIN AUTHENTICATION
// =====================================================

var adminIds = [];

function addAdmin(value) {

  if (
    value === null ||
    typeof value === "undefined"
  ) {
    return;
  }

  if (
    typeof value === "object"
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
    adminIds.indexOf(value) === -1
  ) {
    adminIds.push(value);
  }
}

// Permanent owner fallback
addAdmin("7897324623");

// Configured owner
addAdmin(
  Bot.getProperty("OWNER_ID")
);

// Current admin list
var earnstarAdmins =
  Bot.getProperty("EARNSTAR_ADMINS");

if (Array.isArray(earnstarAdmins)) {

  for (
    var i = 0;
    i < earnstarAdmins.length;
    i++
  ) {
    addAdmin(earnstarAdmins[i]);
  }

} else {
  addAdmin(earnstarAdmins);
}

var isAdmin =
  adminIds.indexOf(adminId) !== -1;

if (!isAdmin) {

  Api.sendMessage({
    chat_id: adminId,

    text:
      "❌ <b>You are not authorized.</b>",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// ⚡ READ CALLBACK DATA
// =====================================================

var callbackData = "";

if (
  typeof request !== "undefined" &&
  request
) {
  callbackData =
    String(
      request.data ||
      request.callback_data ||
      ""
    ).trim();
}


// =====================================================
// 🆔 READ ORDER ID
// =====================================================

var orderId = "";

if (
  typeof params !== "undefined" &&
  params
) {
  orderId =
    String(params).trim();
}

// Supports:
// ADMIN_REPLY_CLIENT orderId
// ADMIN_REPLY_CLIENT|orderId

if (!orderId && callbackData) {

  var normalizedCallback =
    callbackData.replace(/\|/g, " ");

  var parts =
    normalizedCallback.trim().split(/\s+/);

  if (parts.length >= 2) {
    orderId =
      parts.slice(1).join(" ").trim();
  }
}


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

var order =
  Bot.getProperty(
    "ORDER_" + orderId
  );

if (
  !order ||
  typeof order !== "object"
) {

  Api.sendMessage({
    chat_id: adminId,

    text:
      "❌ <b>Order not found.</b>",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 👤 FIND CLIENT ID
// =====================================================

var mappedClientId =
  String(
    Bot.getProperty(
      "ORDER_USER_" + orderId
    ) || ""
  ).trim();

var clientId = "";

if (order.userId) {
  clientId =
    String(order.userId).trim();
}

if (!clientId && order.telegramId) {
  clientId =
    String(order.telegramId).trim();
}

if (
  !clientId &&
  order.telegramProfile &&
  order.telegramProfile.telegramId
) {
  clientId =
    String(
      order.telegramProfile.telegramId
    ).trim();
}

if (
  !clientId &&
  order.telegramProfile &&
  order.telegramProfile.userId
) {
  clientId =
    String(
      order.telegramProfile.userId
    ).trim();
}

if (!clientId) {
  clientId =
    mappedClientId;
}


// =====================================================
// ❌ CLIENT ID NOT FOUND
// =====================================================

if (!clientId) {

  Api.sendMessage({
    chat_id: adminId,

    text:
      "❌ <b>Client ID not found.</b>",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 🛑 CHECK EXISTING WAITING REPLY
// =====================================================

var waitingOrder =
  String(
    Bot.getProperty(
      "ADMIN_REPLY_CLIENT_WAITING_" + adminId
    ) || ""
  ).trim();

if (waitingOrder) {

  Api.sendMessage({
    chat_id: adminId,

    text:
      "⚠️ <b>Reply Already Pending</b>\n\n" +

      "Aapka ek client reply already pending hai.\n" +
      "Pehle us reply ko send ya cancel karein.",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 💾 SAVE WAITING STATE
// =====================================================

Bot.setProperty(
  "ADMIN_REPLY_CLIENT_WAITING_" + adminId,
  orderId,
  "string"
);


// =====================================================
// 🕒 SAVE ADMIN ACTIVITY
// =====================================================

var now =
  new Date().toISOString();

order.lastAdminAction =
  "reply_client_started";

order.lastAdminActionAt =
  now;

order.replyStartedBy =
  adminId;

order.updatedAt =
  now;

Bot.setProperty(
  "ORDER_" + orderId,
  order,
  "json"
);


// =====================================================
// 📦 ORDER DETAILS
// =====================================================

var packageName =
  order.packageName ||
  order.packageType ||
  order.package ||
  "Custom Order";

var clientName =
  (
    order.telegramProfile &&
    order.telegramProfile.fullName
  ) ||
  order.userName ||
  "Client";


// =====================================================
// 📩 ASK ADMIN REPLY
// =====================================================

Api.sendMessage({
  chat_id: adminId,

  text:
    "💬 <b>Reply to Client</b>\n\n" +

    "🆔 <b>Order ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n" +

    "📦 <b>Package:</b> " +
    safeText(packageName) +
    "\n" +

    "👤 <b>Client:</b> " +
    safeText(clientName) +
    "\n" +

    "🆔 <b>Client ID:</b> <code>" +
    safeText(clientId) +
    "</code>\n\n" +

    "📝 Ab client ko bhejne wala reply type karein.\n\n" +

    "❌ Cancel karne ke liye /cancel bhejein.",

  parse_mode: "HTML"
});


// =====================================================
// ▶️ NEXT SCRIPT
// =====================================================

Bot.runCommand(
  "ADMIN_REPLY_CLIENT_SAVE"
);
