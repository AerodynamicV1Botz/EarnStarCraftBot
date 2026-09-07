/*CMD
  command: ADMIN_USER_ORDERS
  help: 
  need_reply: false
  auto_retry_time: 
  folder: ADMIN PANEL

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// CMD: ADMIN_USER_ORDERS

var uid = String(user.telegramid);

// ==========================================
// 👑 ADMIN CHECK
// ==========================================

if (uid !== "7897324623") {
  return;
}

// ==========================================
// 🆔 GET TARGET USER
// ==========================================

var targetId = String(params || "");

if (!targetId) {
  Api.sendMessage({
    chat_id: uid,
    text: "⚠️ User ID not found."
  });
  return;
}

// ==========================================
// 📦 GET ORDER KEYS
// ==========================================

var orderKeys = Bot.getProperty("ORDER_KEYS") || [];

if (!Array.isArray(orderKeys)) {
  orderKeys = [];
}

var text =
  "📦 <b>USER ORDERS</b>\n\n" +
  "🆔 User ID: <code>" + targetId + "</code>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n";

var buttons = [];
var count = 0;

// ==========================================
// 🔎 FILTER USER ORDERS
// ==========================================

for (var i = orderKeys.length - 1; i >= 0; i--) {

  var orderId = orderKeys[i];

  var order = Bot.getProperty(
    "ORDER_" + orderId
  );

  if (!order) {
    continue;
  }

  if (
    String(order.userId) !== String(targetId)
  ) {
    continue;
  }

  count++;

  var product = String(
    order.product ||
    order.productName ||
    order.item ||
    "Not provided"
  );

  var amount = String(
    order.amount ||
    order.price ||
    order.total ||
    "Not provided"
  );

  var status = String(
    order.status || "Pending"
  );

  var createdAt = String(
    order.createdAt ||
    order.orderDate ||
    "Not available"
  );

  text +=
    "📦 <b>Order #" + count + "</b>\n\n" +
    "🛍️ <b>Product:</b> " + product + "\n" +
    "💰 <b>Amount:</b> " + amount + "\n" +
    "📌 <b>Status:</b> " + status + "\n" +
    "📅 <b>Date:</b> " + createdAt + "\n\n" +
    "🆔 <code>" + orderId + "</code>\n" +
    "━━━━━━━━━━━━━━━━━━\n\n";

  buttons.push([
    {
      text: "📦 View Order #" + count,
      callback_data: "ADMIN_ORDER " + orderId
    }
  ]);
}

// ==========================================
// 📊 NO ORDERS
// ==========================================

if (count === 0) {
  text += "ℹ️ Is user ka koi order nahi mila.\n\n";
}

// ==========================================
// 🔘 NAVIGATION
// ==========================================

buttons.push([
  {
    text: "👤 Back to User",
    callback_data: "ADMIN_USER " + targetId
  }
]);

buttons.push([
  {
    text: "👥 Users",
    callback_data: "ADMIN_USERS"
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

// ==========================================
// 📤 SEND
// ==========================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
});
