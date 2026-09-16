/*CMD
  command: ADMIN_DELIVER_ORDER
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
  command: ADMIN_DELIVER_ORDER
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT — ADMIN_DELIVER_ORDER
//
// ADMIN → START FINAL DELIVERY INPUT
//
// Callback:
// ADMIN_DELIVER_ORDER <orderId>
//
// Connected with:
// ADMIN_VERIFY_REMAINING_PAYMENT
//
// Next:
// ADMIN_DELIVER_ORDER_SAVE
// =====================================================


// =====================================================
// 🔘 CALLBACK RESPONSE
// =====================================================

function answerCallback(text) {
  try {
    if (
      typeof request !== "undefined" &&
      request &&
      request.id
    ) {
      Api.answerCallbackQuery({
        callback_query_id: request.id,
        text: text || "",
        show_alert: false
      });
    }
  } catch (e) {}
}

answerCallback("📤 Delivery mode open ho raha hai...");


// =====================================================
// 🧹 SAFE HTML TEXT
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
// 👤 ADMIN ID
// =====================================================

var uid = String(user.telegramid || "");

if (!uid) {
  return;
}


// =====================================================
// 🔐 ADMIN AUTHORIZATION
// =====================================================

var OWNER_ID = "7897324623";

var adminList =
  Bot.getProperty("EARNSTAR_ADMINS") || [];

if (!Array.isArray(adminList)) {
  adminList = [];
}

var isAdmin =
  uid === OWNER_ID;

if (!isAdmin) {
  for (var i = 0; i < adminList.length; i++) {
    var item = adminList[i];
    var savedAdminId = "";

    if (
      typeof item === "object" &&
      item !== null
    ) {
      savedAdminId = String(
        item.id ||
        item.telegramId ||
        item.userId ||
        ""
      );
    } else {
      savedAdminId = String(item || "");
    }

    if (savedAdminId === uid) {
      isAdmin = true;
      break;
    }
  }
}

if (!isAdmin) {
  Api.sendMessage({
    chat_id: uid,
    text: "⛔ You are not authorized."
  });
  return;
}


// =====================================================
// 🆔 GET ORDER ID
// =====================================================

var callbackData = "";
var orderId = "";

try {
  if (
    typeof request !== "undefined" &&
    request
  ) {
    callbackData = String(
      request.data ||
      request.callback_data ||
      ""
    );
  }
} catch (e) {}

try {
  if (
    typeof params !== "undefined" &&
    params !== null
  ) {
    orderId = String(params).trim();
  }
} catch (e) {}

if (!orderId) {
  orderId = callbackData;
}

orderId = String(orderId || "")
  .replace(
    /^ADMIN_DELIVER_ORDER[\s|:]*/i,
    ""
  )
  .trim();

if (orderId.indexOf("|") !== -1) {
  var orderParts =
    orderId.split("|");

  orderId = String(
    orderParts[orderParts.length - 1] || ""
  ).trim();
}

if (!orderId) {
  answerCallback("❌ Invalid order ID.");

  Api.sendMessage({
    chat_id: uid,
    text: "❌ Invalid order ID."
  });

  return;
}


// =====================================================
// 📦 LOAD FINAL ORDER
// =====================================================

var order =
  Bot.getProperty("ORDER_" + orderId);

if (
  !order ||
  typeof order !== "object"
) {
  answerCallback("❌ Order not found.");

  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>Order not found.</b>\n\n" +
      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>",
    parse_mode: "HTML"
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
      order.telegramProfile.userId ||
      order.telegramProfile.id
    )
  ) ||
  Bot.getProperty("ORDER_USER_" + orderId) ||
  ""
).trim();

if (!clientId) {
  answerCallback("❌ Client ID missing.");

  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>Client ID not found.</b>\n\n" +
      "Order ko deliver karne se pehle client mapping fix karein.\n\n" +
      "🆔 <code>" +
      safeText(orderId) +
      "</code>",
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 🛑 ALREADY DELIVERED CHECK
// =====================================================

if (
  order.stage === "delivered" ||
  order.deliveryStatus === "delivered" ||
  order.paymentStatus === "delivered" ||
  order.orderStatus === "delivered"
) {
  answerCallback("⚠️ Order already delivered.");

  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>Order already delivered hai.</b>\n\n" +
      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>",
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 💳 PAYMENT VERIFICATION CHECK
// =====================================================

if (
  order.paymentStatus !== "remaining_paid"
) {
  answerCallback("⚠️ Remaining payment verify nahi hua.");

  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>Order cannot be delivered yet.</b>\n\n" +
      "Remaining payment pehle verify hona chahiye.\n\n" +
      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>\n" +
      "📌 <b>Payment Status:</b> " +
      safeText(order.paymentStatus || "unknown") +
      "\n" +
      "📌 <b>Stage:</b> " +
      safeText(order.stage || "unknown"),
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 📌 STAGE CHECK
// =====================================================

if (
  order.stage !== "ready_for_delivery" &&
  order.stage !== "delivery_input"
) {
  answerCallback("⚠️ Order delivery stage mein nahi hai.");

  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>Delivery allowed nahi hai.</b>\n\n" +
      "Order abhi delivery-ready stage mein nahi hai.\n\n" +
      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>\n" +
      "📌 <b>Current Stage:</b> " +
      safeText(order.stage || "unknown"),
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 🛑 DUPLICATE DELIVERY INPUT CHECK
// =====================================================

var existingWaiting =
  Bot.getProperty(
    "DELIVERY_WAITING_" + uid
  );

if (
  existingWaiting &&
  String(existingWaiting).trim() &&
  String(existingWaiting) !== String(orderId)
) {
  answerCallback("⚠️ Aapki ek delivery already pending hai.");

  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>Aapke paas already ek delivery pending hai.</b>\n\n" +
      "Pehle current delivery complete ya cancel karein.\n\n" +
      "🆔 <b>Pending Order:</b> <code>" +
      safeText(existingWaiting) +
      "</code>",
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// ⏳ SAVE DELIVERY WAITING STATE
// =====================================================

Bot.setProperty(
  "DELIVERY_WAITING_" + uid,
  orderId,
  "string"
);

Bot.setProperty(
  "DELIVERY_ORDER_" + uid,
  orderId,
  "string"
);


// =====================================================
// 🕐 UPDATE ORDER DELIVERY INPUT STATE
// =====================================================

var now =
  new Date().toISOString();

order.stage =
  "delivery_input";

order.packageStep =
  "delivery_input";

order.orderStatus =
  "completed";

order.paymentStatus =
  "remaining_paid";

order.deliveryStatus =
  "pending";

order.deliveryInputStartedBy =
  uid;

order.deliveryInputStartedAt =
  now;

order.updatedAt =
  now;

order.adminId =
  uid;

order.userId =
  clientId;


// =====================================================
// 💾 SAVE FINAL ORDER ONLY
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


// =====================================================
// 🧾 UPDATE ORDER HISTORY
// =====================================================

var historyKey =
  "ORDER_HISTORY_" + orderId;

var history =
  Bot.getProperty(historyKey) || [];

if (!Array.isArray(history)) {
  history = [];
}

history.push({
  action: "delivery_input_started",
  stage: "delivery_input",
  orderStatus: "completed",
  paymentStatus: "remaining_paid",
  adminId: uid,
  timestamp: now
});

Bot.setProperty(
  historyKey,
  history,
  "json"
);


// =====================================================
// 📩 ASK ADMIN FOR DELIVERY MATERIAL
// =====================================================

Api.sendMessage({
  chat_id: uid,

  text:
    "📤 <b>Send Final Delivery</b>\n\n" +

    "🆔 <b>Order ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n" +

    "👤 <b>Client ID:</b> <code>" +
    safeText(clientId) +
    "</code>\n\n" +

    "✅ Remaining payment verified hai.\n" +
    "Ab completed work client ko deliver karne ke liye material bhejein.\n\n" +

    "Aap send kar sakte hain:\n" +
    "• Document / file\n" +
    "• Photo\n" +
    "• Video\n" +
    "• Text instructions\n" +
    "• Required delivery material\n\n" +

    "❌ Cancel karne ke liye /cancel bhejein.",

  parse_mode: "HTML",

  reply_markup: {
    force_reply: true,
    input_field_placeholder:
      "Final delivery material bhejein..."
  }
});


// =====================================================
// ▶️ NEXT COMMAND
// =====================================================

Bot.runCommand(
  "ADMIN_DELIVER_ORDER_SAVE"
);
