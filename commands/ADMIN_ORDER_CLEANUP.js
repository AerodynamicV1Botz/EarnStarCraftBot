/*CMD
  command: ADMIN_ORDER_CLEANUP
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
  command: ADMIN_ORDER_CLEANUP
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// ADMIN_ORDER_CLEANUP
//
// PURPOSE:
// - Permanent order deletion confirmation
// - Cancellation se separate
// - Final order, history aur mapping cleanup
// =====================================================


// =====================================================
// 👑 ADMIN AUTH
// =====================================================

var uid = String(user.telegramid);

var OWNER_ID = "7897324623";
var adminIds = [OWNER_ID];

var configuredOwner = Bot.getProperty("OWNER_ID");

if (configuredOwner) {
  if (typeof configuredOwner === "object") {
    configuredOwner =
      configuredOwner.id ||
      configuredOwner.telegramId ||
      configuredOwner.userId ||
      "";
  }

  configuredOwner = String(configuredOwner || "").trim();

  if (configuredOwner) {
    adminIds.push(configuredOwner);
  }
}

var configuredAdmins = Bot.getProperty("EARNSTAR_ADMINS") || [];

if (!Array.isArray(configuredAdmins)) {
  configuredAdmins = [configuredAdmins];
}

for (var a = 0; a < configuredAdmins.length; a++) {
  var item = configuredAdmins[a];

  if (typeof item === "object") {
    item =
      item.id ||
      item.telegramId ||
      item.userId ||
      "";
  }

  item = String(item || "").trim();

  if (item) {
    adminIds.push(item);
  }
}

var isAdmin = false;

for (var b = 0; b < adminIds.length; b++) {
  if (adminIds[b] === uid) {
    isAdmin = true;
    break;
  }
}

if (!isAdmin) {
  return;
}


// =====================================================
// ⚡ CALLBACK RESPONSE
// =====================================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  try {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "Opening cleanup confirmation",
      show_alert: false
    });
  } catch (error) {}
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
// 🆔 ORDER ID
// =====================================================

var orderId = String(
  typeof params !== "undefined" && params !== null
    ? params
    : ""
).trim();

if (orderId.indexOf("|") !== -1) {
  orderId = orderId.split("|")[0].trim();
}

if (orderId.indexOf(" ") !== -1) {
  orderId = orderId.split(/\s+/)[0].trim();
}

if (!orderId) {
  Api.sendMessage({
    chat_id: uid,
    text: "⚠️ <b>Order ID missing.</b>",
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 📦 LOAD ORDER
// =====================================================

var order = Bot.getProperty("ORDER_" + orderId);

if (!order || typeof order !== "object") {
  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>Order not found.</b>\n\n" +
      "<code>" +
      safeText(orderId) +
      "</code>",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📦 All Orders",
            callback_data: "ADMIN_ORDERS"
          }
        ]
      ]
    }
  });

  return;
}


// =====================================================
// 👤 ORDER INFO
// =====================================================

var clientName =
  order.name ||
  order.fullName ||
  order.clientName ||
  "User";

var packageName =
  order.packageName ||
  order.packageType ||
  order.package ||
  "Custom Order";

var status =
  order.orderStatus ||
  order.stage ||
  order.requestStatus ||
  "unknown";


// =====================================================
// ⚠️ CONFIRMATION
// =====================================================

var text =
  "🧹 <b>PERMANENT CLEANUP</b>\n\n" +

  "⚠️ <b>Warning:</b> Yeh action order ka saved data permanently remove karega.\n\n" +

  "🆔 <b>Order ID:</b>\n" +
  "<code>" +
  safeText(orderId) +
  "</code>\n\n" +

  "👤 <b>Client:</b> " +
  safeText(clientName) +
  "\n" +

  "📦 <b>Package:</b> " +
  safeText(packageName) +
  "\n" +

  "📊 <b>Status:</b> " +
  safeText(String(status).replace(/_/g, " ")) +
  "\n\n" +

  "Delete hone wale records:\n" +
  "• Final order\n" +
  "• Order history\n" +
  "• Order-user mapping\n" +
  "• Active admin order reference\n\n" +

  "⚠️ Is action ko undo nahi kiya ja sakta.\n\n" +

  "Kya aap permanently cleanup karna chahte ho?";


// =====================================================
// 🔘 BUTTONS
// =====================================================

var buttons = [
  [
    {
      text: "🗑️ Yes, Delete Permanently",
      callback_data: "ADMIN_ORDER_CLEANUP_CONFIRM " + orderId
    }
  ],
  [
    {
      text: "📄 Back to Order",
      callback_data: "ADMIN_ORDER " + orderId
    }
  ],
  [
    {
      text: "⚙️ Order Actions",
      callback_data: "ADMIN_ORDER_ACTION " + orderId
    }
  ]
];


// =====================================================
// 📩 SEND
// =====================================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
});
