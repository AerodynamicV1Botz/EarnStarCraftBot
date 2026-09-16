/*CMD
  command: ADMIN_USER_ORDERS
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
  command: ADMIN_USER_ORDERS
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// ADMIN_USER_ORDERS
// ADMIN → VIEW ALL ORDERS OF ONE USER
// =====================================================


// =====================================================
// 👤 CURRENT ADMIN ID
// =====================================================

var uid = String(user.telegramid);


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

var ownerId = "7897324623";
var isAdmin = uid === ownerId;


// Optional configured owner
var configuredOwner = Bot.getProperty("OWNER_ID");

if (
  !isAdmin &&
  configuredOwner &&
  String(configuredOwner) === uid
) {
  isAdmin = true;
}


// Multi-admin support
var adminList = Bot.getProperty("EARNSTAR_ADMINS") || [];

if (!Array.isArray(adminList)) {
  adminList = [];
}

for (var a = 0; a < adminList.length; a++) {

  var adminItem = adminList[a];
  var adminId = "";

  if (
    typeof adminItem === "object" &&
    adminItem !== null
  ) {
    adminId =
      adminItem.id ||
      adminItem.telegramId ||
      adminItem.telegramid ||
      adminItem.userId ||
      "";
  } else {
    adminId = adminItem;
  }

  if (String(adminId) === uid) {
    isAdmin = true;
    break;
  }
}

if (!isAdmin) {
  return;
}


// =====================================================
// 🆔 TARGET USER ID
// =====================================================

var targetId = String(params || "").trim();

if (!targetId) {

  Api.sendMessage({
    chat_id: uid,
    text: "⚠️ <b>User ID not found.</b>",
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 👤 CHECK USER
// =====================================================

var targetUser = Bot.getProperty(
  "USER_" + targetId
);

if (!targetUser) {

  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>User not found.</b>\n\n" +
      "🆔 <code>" + safeText(targetId) + "</code>",
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 📦 GET ORDER KEYS
// =====================================================

var orderKeys = Bot.getProperty("ORDER_KEYS") || [];

if (!Array.isArray(orderKeys)) {
  orderKeys = [];
}


// =====================================================
// 📝 HEADER
// =====================================================

var displayName =
  targetUser.name ||
  targetUser.firstName ||
  targetUser.first_name ||
  targetUser.username ||
  "Telegram User";

var text =
  "📦 <b>USER ORDERS</b>\n\n" +

  "👤 <b>User:</b> " +
  safeText(displayName) + "\n" +

  "🆔 <b>User ID:</b> " +
  "<code>" + safeText(targetId) + "</code>\n\n" +

  "━━━━━━━━━━━━━━━━━━\n\n";

var buttons = [];
var count = 0;
var countedOrders = {};


// =====================================================
// 🔎 FILTER USER ORDERS
// =====================================================

for (
  var i = orderKeys.length - 1;
  i >= 0;
  i--
) {

  var orderId =
    String(orderKeys[i] || "").trim();

  // Skip empty / duplicate order IDs
  if (
    !orderId ||
    countedOrders[orderId]
  ) {
    continue;
  }

  countedOrders[orderId] = true;


  // -----------------------------------------------
  // GET ORDER
  // -----------------------------------------------

  var order = Bot.getProperty(
    "ORDER_" + orderId
  );

  if (!order) {
    continue;
  }


  // -----------------------------------------------
  // MATCH USER
  // -----------------------------------------------

  var orderUserId =
    order.userId ||
    order.telegramId ||
    order.telegramid ||
    "";

  if (
    String(orderUserId) !== targetId
  ) {
    continue;
  }

  count++;


  // -----------------------------------------------
  // PACKAGE / PRODUCT
  // -----------------------------------------------

  var product =
    order.packageType ||
    order.product ||
    order.productName ||
    order.item ||
    "Not provided";


  // -----------------------------------------------
  // ORDER AMOUNT
  // -----------------------------------------------

  var amount =
    order.price ||
    order.amount ||
    order.total ||
    "Not provided";


  // -----------------------------------------------
  // PAYMENT DETAILS
  // -----------------------------------------------

  var advanceAmount =
    order.advanceAmount ||
    "";

  var remainingAmount =
    order.remainingAmount ||
    "";

  var paymentStatus =
    order.paymentStatus ||
    "Pending";


  // -----------------------------------------------
  // STATUS
  // -----------------------------------------------

  var status =
    order.orderStatus ||
    order.status ||
    order.requestStatus ||
    "Pending";


  // -----------------------------------------------
  // PROGRESS
  // -----------------------------------------------

  var progress =
    order.progress == null
      ? ""
      : String(order.progress);


  var progressTitle =
    order.progressTitle ||
    "";


  // -----------------------------------------------
  // DATE
  // -----------------------------------------------

  var createdAt =
    order.createdAt ||
    order.orderDate ||
    order.submittedAt ||
    order.updatedAt ||
    "Not available";


  // -----------------------------------------------
  // DISPLAY ORDER
  // -----------------------------------------------

  text +=
    "📦 <b>Order #" +
    count +
    "</b>\n\n" +

    "🆔 <b>Order ID:</b> " +
    "<code>" +
    safeText(orderId) +
    "</code>\n" +

    "🛠️ <b>Package:</b> " +
    safeText(product) +
    "\n" +

    "💰 <b>Total Amount:</b> " +
    safeText(amount) +
    "\n" +

    "📌 <b>Status:</b> " +
    safeText(status) +
    "\n" +

    "💳 <b>Payment:</b> " +
    safeText(paymentStatus);


  if (advanceAmount !== "") {

    text +=
      "\n💵 <b>Advance:</b> " +
      safeText(advanceAmount);
  }


  if (remainingAmount !== "") {

    text +=
      "\n💰 <b>Remaining:</b> " +
      safeText(remainingAmount);
  }


  if (progress !== "") {

    text +=
      "\n📊 <b>Progress:</b> " +
      safeText(progress) + "%";
  }


  if (progressTitle !== "") {

    text +=
      "\n🔧 <b>Current Step:</b> " +
      safeText(progressTitle);
  }


  text +=
    "\n📅 <b>Date:</b> " +
    safeText(createdAt) +

    "\n\n━━━━━━━━━━━━━━━━━━\n\n";


  // -----------------------------------------------
  // VIEW ORDER BUTTON
  // -----------------------------------------------

  buttons.push([
    {
      text:
        "📦 View Order #" + count,
      callback_data:
        "ADMIN_ORDER " + orderId
    }
  ]);
}


// =====================================================
// 📊 NO ORDERS
// =====================================================

if (count === 0) {

  text +=
    "ℹ️ <b>Is user ka koi order nahi mila.</b>\n\n" +
    "Possible reason:\n" +
    "• User ne abhi order submit nahi kiya\n" +
    "• Order kisi different user ID se saved hai\n" +
    "• ORDER_KEYS incomplete hai.";
}


// =====================================================
// 📊 TOTAL ORDERS
// =====================================================

if (count > 0) {

  text +=
    "📊 <b>Total Orders:</b> " +
    count;
}


// =====================================================
// 🔘 NAVIGATION
// =====================================================

buttons.push([
  {
    text: "👤 Back to User",
    callback_data:
      "ADMIN_USER " + targetId
  }
]);


buttons.push([
  {
    text: "👥 Users",
    callback_data:
      "ADMIN_USERS"
  },
  {
    text: "📦 All Orders",
    callback_data:
      "ADMIN_ORDERS"
  }
]);


buttons.push([
  {
    text: "👑 Admin Panel",
    callback_data:
      "ADMIN_PANEL"
  }
]);


// =====================================================
// 📤 SEND
// =====================================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
});
