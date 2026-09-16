/*CMD
  command: ADMIN_SEARCH_ORDER_SAVE
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
  command: ADMIN_SEARCH_ORDER_SAVE
  need_reply: true
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// ADMIN_SEARCH_ORDER_SAVE
// ADMIN → SEARCH FINAL ORDERS
// =====================================================


// =====================================================
// 👤 CURRENT USER
// =====================================================

var uid = String(user.telegramid);


// =====================================================
// 🛡️ ADMIN AUTHENTICATION
// =====================================================

var OWNER_ID = "7897324623";
var isAdmin = uid === OWNER_ID;

var adminList = Bot.getProperty("EARNSTAR_ADMINS");

if (!isAdmin && Array.isArray(adminList)) {
  for (var a = 0; a < adminList.length; a++) {
    var item = adminList[a];
    var adminId = "";

    if (
      typeof item === "string" ||
      typeof item === "number"
    ) {
      adminId = String(item);
    } else if (
      item &&
      typeof item === "object"
    ) {
      adminId = String(
        item.id ||
        item.telegramId ||
        item.telegramid ||
        item.userId ||
        ""
      );
    }

    if (adminId === uid) {
      isAdmin = true;
      break;
    }
  }
}

if (!isAdmin) {
  return;
}


// =====================================================
// 🔐 SAFE TEXT
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
// 🔎 GET SEARCH QUERY
// =====================================================

var query = String(message || "").trim();

if (!query) {
  Bot.runCommand("ADMIN_SEARCH_ORDER");
  return;
}

if (query.toLowerCase() === "/cancel") {
  Bot.runCommand("ADMIN_ORDERS");
  return;
}

var searchQuery = query.toLowerCase();


// =====================================================
// 📦 GET ORDER KEYS
// =====================================================

var storedKeys = Bot.getProperty("ORDER_KEYS") || [];

if (!Array.isArray(storedKeys)) {
  storedKeys = [];
}


// =====================================================
// 🔎 SEARCH FINAL ORDERS
// =====================================================

var results = [];
var seenOrderIds = {};

for (var i = 0; i < storedKeys.length; i++) {
  var rawOrderId = storedKeys[i];

  if (
    rawOrderId === null ||
    rawOrderId === undefined
  ) {
    continue;
  }

  var orderId = String(rawOrderId).trim();

  if (!orderId || seenOrderIds[orderId]) {
    continue;
  }

  seenOrderIds[orderId] = true;

  // Draft records ko ignore karo
  if (
    orderId.indexOf("ORDER_") === 0 ||
    orderId.indexOf("BUILD_") === 0
  ) {
    continue;
  }

  var order = Bot.getProperty(
    "ORDER_" + orderId
  );

  if (
    !order ||
    typeof order !== "object"
  ) {
    continue;
  }

  var clientName =
    order.name ||
    order.fullName ||
    order.clientName ||
    "";

  var packageName =
    order.packageName ||
    order.packageType ||
    order.package ||
    "";

  var telegramProfile =
    order.telegramProfile ||
    order.username ||
    order.telegramUsername ||
    "";

  var orderUserId =
    order.userId ||
    order.telegramId ||
    order.telegramid ||
    "";

  var status =
    order.stage ||
    order.orderStatus ||
    order.requestStatus ||
    order.paymentStatus ||
    "";

  var enquiryId =
    order.enquiryId ||
    order.enquiryRef ||
    "";

  var email =
    order.email ||
    "";

  var searchableText = [
    orderId,
    clientName,
    packageName,
    telegramProfile,
    orderUserId,
    status,
    enquiryId,
    email
  ].join(" ").toLowerCase();

  if (
    searchableText.indexOf(searchQuery) !== -1
  ) {
    results.push({
      id: orderId,
      data: order
    });
  }
}


// =====================================================
// ❌ NO RESULTS
// =====================================================

if (results.length === 0) {
  Api.sendMessage({
    chat_id: uid,

    text:
      "🔎 <b>ORDER SEARCH</b>\n\n" +
      "Search: <code>" +
      safeText(query) +
      "</code>\n\n" +
      "❌ No final order found.\n\n" +
      "Try Order ID, client name, Telegram ID, package name ya status.",

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🔎 Search Again",
            callback_data: "ADMIN_SEARCH_ORDER"
          }
        ],
        [
          {
            text: "📦 All Orders",
            callback_data: "ADMIN_ORDERS"
          }
        ],
        [
          {
            text: "👑 Admin Panel",
            callback_data: "ADMIN_PANEL"
          }
        ]
      ]
    }
  });

  return;
}


// =====================================================
// 📋 BUILD RESULT MESSAGE
// =====================================================

var text =
  "🔎 <b>ORDER SEARCH RESULTS</b>\n\n" +
  "Search: <code>" +
  safeText(query) +
  "</code>\n" +
  "Found: <b>" +
  results.length +
  "</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n";

var buttons = [];


// =====================================================
// 📦 SHOW RESULTS
// =====================================================

for (var j = 0; j < results.length && j < 20; j++) {
  var result = results[j];
  var currentOrderId = result.id;
  var currentOrder = result.data;

  var currentClientName =
    currentOrder.name ||
    currentOrder.fullName ||
    currentOrder.clientName ||
    "User";

  var currentPackage =
    currentOrder.packageName ||
    currentOrder.packageType ||
    currentOrder.package ||
    "Custom Order";

  var currentStatus =
    currentOrder.stage ||
    currentOrder.orderStatus ||
    currentOrder.requestStatus ||
    currentOrder.paymentStatus ||
    "unknown";

  text +=
    "👤 <b>" +
    safeText(currentClientName) +
    "</b>\n" +

    "🆔 <code>" +
    safeText(currentOrderId) +
    "</code>\n" +

    "📦 " +
    safeText(currentPackage) +
    "\n" +

    "📊 " +
    safeText(
      String(currentStatus)
        .replace(/_/g, " ")
        .toUpperCase()
    ) +
    "\n\n";

  buttons.push([
    {
      text: "👁 View " + currentOrderId,
      callback_data: "ADMIN_ORDER " + currentOrderId
    }
  ]);
}


// =====================================================
// 🔄 NAVIGATION
// =====================================================

buttons.push([
  {
    text: "🔎 Search Again",
    callback_data: "ADMIN_SEARCH_ORDER"
  },
  {
    text: "📦 All Orders",
    callback_data: "ADMIN_ORDERS"
  }
]);

buttons.push([
  {
    text: "👑 Admin Panel",
    callback_data: "ADMIN_PANEL"
  }
]);


// =====================================================
// 📩 SEND SEARCH RESULTS
// =====================================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
});
