/*CMD
  command: ADMIN_CANCEL_ORDER_CONFIRM
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
  command: ADMIN_CANCEL_ORDER_CONFIRM
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// ADMIN_CANCEL_ORDER_CONFIRM
//
// PURPOSE:
// - Final order cancellation
// - Order record preserve rahega
// - Client ko notification jayega
// - Permanent deletion nahi hogi
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
      text: "Cancelling order",
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
// 📦 LOAD FINAL ORDER
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
// 🚫 PREVENT INVALID CANCELLATION
// =====================================================

var stage = String(order.stage || "").toLowerCase();
var orderStatus = String(order.orderStatus || "").toLowerCase();

if (
  stage === "cancelled" ||
  orderStatus === "cancelled"
) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "ℹ️ <b>Order already cancelled.</b>\n\n" +
      "<code>" +
      safeText(orderId) +
      "</code>",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📄 Order Details",
            callback_data: "ADMIN_ORDER " + orderId
          }
        ]
      ]
    }
  });

  return;
}

if (
  stage === "completed" ||
  stage === "delivered" ||
  orderStatus === "completed" ||
  orderStatus === "delivered"
) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>Completed/delivered order cancel nahi kiya ja sakta.</b>",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📄 Order Details",
            callback_data: "ADMIN_ORDER " + orderId
          }
        ]
      ]
    }
  });

  return;
}


// =====================================================
// 👤 CLIENT ID
// =====================================================

var clientId = String(
  order.userId ||
  order.telegramId ||
  (
    order.telegramProfile &&
    (
      order.telegramProfile.telegramId ||
      order.telegramProfile.userId
    )
  ) ||
  Bot.getProperty("ORDER_USER_" + orderId) ||
  ""
).trim();


// =====================================================
// 📝 UPDATE ORDER
// =====================================================

var now = new Date().toISOString();

order.stage = "cancelled";
order.orderStatus = "cancelled";
order.requestStatus = "cancelled";
order.workStatus = "cancelled";

order.cancelled = true;
order.cancelledBy = uid;
order.cancelledAt = now;
order.updatedAt = now;
order.lastUpdatedAt = now;

order.lastAdminAction = "Order cancelled by admin";
order.lastAdminActionAt = now;


// =====================================================
// 💾 SAVE FINAL ORDER
// =====================================================

Bot.setProperty(
  "ORDER_" + orderId,
  order,
  "json"
);

Bot.setProperty(
  "ORDER_USER_" + orderId,
  clientId,
  "string"
);

Bot.setProperty(
  "ORDER_HISTORY_" + orderId,
  order,
  "json"
);


// =====================================================
// 🧹 CLEAR ACTIVE ADMIN ORDER
// =====================================================

Bot.setProperty(
  "ADMIN_ACTIVE_ORDER_" + uid,
  "",
  "string"
);


// =====================================================
// 📩 CLIENT NOTIFICATION
// =====================================================

var clientNotified = false;

if (clientId) {
  try {
    Api.sendMessage({
      chat_id: clientId,
      text:
        "⚠️ <b>Order Cancelled</b>\n\n" +

        "Aapka order admin ke dwara cancel kar diya gaya hai.\n\n" +

        "🆔 <b>Order ID:</b>\n" +
        "<code>" +
        safeText(orderId) +
        "</code>\n\n" +

        "Agar aapko lagta hai ki yeh galti se hua hai, toh " +
        "support se contact karein.",
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "📞 Contact Support",
              callback_data: "MENU_CONTACT"
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

    clientNotified = true;
  } catch (error) {
    Bot.setProperty(
      "CLIENT_NOTIFY_ERROR_" + orderId,
      String(error),
      "string"
    );
  }
}


// =====================================================
// ✅ ADMIN CONFIRMATION
// =====================================================

Api.sendMessage({
  chat_id: uid,
  text:
    "✅ <b>Order Cancelled Successfully</b>\n\n" +

    "🆔 <b>Order ID:</b>\n" +
    "<code>" +
    safeText(orderId) +
    "</code>\n\n" +

    "📌 Order record preserve hai.\n" +
    "🧹 Permanent deletion nahi hui.\n\n" +

    (
      clientNotified
        ? "📩 Client notification sent."
        : "⚠️ Client notification send nahi ho paayi."
    ),
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📄 Order Details",
          callback_data: "ADMIN_ORDER " + orderId
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
