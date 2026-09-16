/*CMD
  command: MY_ORDERS
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
  command: MY_ORDERS
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 93 — MY_ORDERS
// USER → VIEW ALL OWN ORDERS
// Supports multilingual text and space callbacks
// =====================================================


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
      callback_query_id: request.id
    });
  } catch (error) {}
}


// =====================================================
// 🔐 HTML SAFE TEXT
// =====================================================

function safeText(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


// =====================================================
// 👤 USER DATA
// =====================================================

var uid = String(user.telegramid);

var userData =
  Bot.getProperty("USER_" + uid) || {};

var lang =
  userData.language || "hinglish";


// =====================================================
// 📦 GET ALL OWN ORDERS
// =====================================================

var keys =
  Bot.getProperty("ORDER_KEYS") || [];

if (!Array.isArray(keys)) {
  keys = [];
}

var orders = [];
var usedOrderIds = {};

for (
  var i = keys.length - 1;
  i >= 0;
  i--
) {
  var currentKey =
    String(keys[i] || "").trim();

  if (!currentKey) {
    continue;
  }

  var order =
    Bot.getProperty("ORDER_" + currentKey);

  if (
    !order ||
    typeof order !== "object"
  ) {
    continue;
  }

  var actualOrderId = String(
    order.orderId ||
    order.id ||
    currentKey
  ).trim();

  if (
    usedOrderIds[actualOrderId]
  ) {
    continue;
  }

  var orderUserId = String(
    order.userId ||
    order.telegramId ||
    (
      order.telegramProfile &&
      (
        order.telegramProfile.telegramId ||
        order.telegramProfile.userId
      )
    ) ||
    ""
  ).trim();

  if (
    orderUserId !== uid
  ) {
    continue;
  }

  usedOrderIds[actualOrderId] = true;

  order.orderId =
    order.orderId || actualOrderId;

  orders.push(order);
}


// =====================================================
// 📝 TEXT AND BUTTONS
// =====================================================

var text = "";
var buttons = [];


// =====================================================
// ❌ NO ORDERS
// =====================================================

if (orders.length === 0) {

  if (lang === "gujarati") {

    text =
      "📦 <b>મારા ઓર્ડર્સ</b>\n\n" +
      "તમારો હજુ કોઈ ઓર્ડર નથી.\n\n" +
      "🚀 અમારી સાથે તમારો પહેલો પ્રોજેક્ટ શરૂ કરો!";

    buttons = [
      [
        {
          text: "🚀 નવો પ્રોજેક્ટ",
          callback_data: "MENU_SERVICES"
        }
      ],
      [
        {
          text: "🏠 મુખ્ય મેનુ",
          callback_data: "MAIN_MENU"
        }
      ]
    ];

  } else if (lang === "english") {

    text =
      "📦 <b>MY ORDERS</b>\n\n" +
      "You don't have any orders yet.\n\n" +
      "🚀 Start your first project with us!";

    buttons = [
      [
        {
          text: "🚀 New Project",
          callback_data: "MENU_SERVICES"
        }
      ],
      [
        {
          text: "🏠 Main Menu",
          callback_data: "MAIN_MENU"
        }
      ]
    ];

  } else {

    text =
      "📦 <b>MERE ORDERS</b>\n\n" +
      "Aapka abhi koi order nahi hai.\n\n" +
      "🚀 Hamare saath apna pehla project start karo!";

    buttons = [
      [
        {
          text: "🚀 Naya Project",
          callback_data: "MENU_SERVICES"
        }
      ],
      [
        {
          text: "🏠 Main Menu",
          callback_data: "MAIN_MENU"
        }
      ]
    ];
  }


// =====================================================
// 📦 ORDERS AVAILABLE
// =====================================================

} else {

  if (lang === "gujarati") {

    text =
      "📦 <b>મારા ઓર્ડર્સ</b>\n\n" +
      "કુલ ઓર્ડર્સ: <b>" +
      orders.length +
      "</b>\n\n";

  } else if (lang === "english") {

    text =
      "📦 <b>MY ORDERS</b>\n\n" +
      "Total orders: <b>" +
      orders.length +
      "</b>\n\n";

  } else {

    text =
      "📦 <b>MERE ORDERS</b>\n\n" +
      "Total orders: <b>" +
      orders.length +
      "</b>\n\n";
  }

  text +=
    "━━━━━━━━━━━━━━━━━━\n\n";

  var maxOrders = 10;

  for (
    var j = 0;
    j < orders.length && j < maxOrders;
    j++
  ) {

    var order = orders[j];

    var orderId = String(
      order.orderId ||
      order.id ||
      "N/A"
    );

    var status =
      String(
        order.orderStatus ||
        order.requestStatus ||
        order.status ||
        order.stage ||
        "pending"
      ).toLowerCase();

    var paymentStatus =
      String(
        order.paymentStatus ||
        ""
      ).toLowerCase();

    var statusIcon = "🟡";
    var statusText = "PENDING";

    if (
      status === "accepted" ||
      status === "amount_ready"
    ) {
      statusIcon = "🔵";
      statusText = "ACCEPTED";
    }

    if (
      paymentStatus === "advance_requested" ||
      paymentStatus === "advance_pending"
    ) {
      statusIcon = "💳";
      statusText = "ADVANCE PAYMENT PENDING";
    }

    if (
      paymentStatus === "proof_submitted" ||
      paymentStatus === "remaining_proof_submitted"
    ) {
      statusIcon = "🟠";
      statusText = "PAYMENT VERIFICATION";
    }

    if (
      status === "in_progress" ||
      status === "work_in_progress" ||
      paymentStatus === "work_started"
    ) {
      statusIcon = "🔵";
      statusText = "WORK IN PROGRESS";
    }

    if (
      paymentStatus === "remaining_payment_requested" ||
      paymentStatus === "remaining_payment_pending"
    ) {
      statusIcon = "💳";
      statusText = "REMAINING PAYMENT PENDING";
    }

    if (
      paymentStatus === "remaining_payment_requested" &&
      order.stage === "remaining_payment_verification"
    ) {
      statusIcon = "🟠";
      statusText = "REMAINING PAYMENT VERIFICATION";
    }

    if (
      status === "completed" &&
      paymentStatus !== "fully_paid" &&
      paymentStatus !== "remaining_paid"
    ) {
      statusIcon = "🟢";
      statusText = "WORK COMPLETED";
    }

    if (
      paymentStatus === "remaining_paid"
    ) {
      statusIcon = "🟢";
      statusText = "PAYMENT VERIFIED";
    }

    if (
      paymentStatus === "fully_paid" ||
      order.stage === "delivered" ||
      order.deliveryStatus === "delivered"
    ) {
      statusIcon = "✅";
      statusText = "DELIVERED";
    }

    if (
      status === "rejected"
    ) {
      statusIcon = "🔴";
      statusText = "REJECTED";
    }

    if (
      status === "cancelled"
    ) {
      statusIcon = "⚫";
      statusText = "CANCELLED";
    }

    var displayPackage =
      order.packageName ||
      order.packageType ||
      order.type ||
      "Order";

    var displayProgress = Number(
      order.progress || 0
    );

    if (
      !isFinite(displayProgress) ||
      displayProgress < 0
    ) {
      displayProgress = 0;
    }

    if (displayProgress > 100) {
      displayProgress = 100;
    }

    text +=
      statusIcon +
      " <b>" +
      safeText(statusText) +
      "</b>\n" +

      "📦 " +
      safeText(displayPackage) +
      "\n" +

      "🆔 <code>" +
      safeText(orderId) +
      "</code>\n" +

      "📊 Progress: <b>" +
      displayProgress +
      "%</b>\n\n";

    buttons.push([
      {
        text:
          "📦 View " +
          orderId,

        callback_data:
          "ORDER_TRACK " + orderId
      }
    ]);
  }

  if (orders.length > maxOrders) {

    var remainingOrders =
      orders.length - maxOrders;

    if (lang === "gujarati") {

      text +=
        "ℹ️ વધુ " +
        remainingOrders +
        " ઓર્ડર્સ છે. દરેક ઓર્ડર જોવા માટે refresh અથવા track વિકલ્પ વાપરો.\n\n";

    } else if (lang === "english") {

      text +=
        "ℹ️ " +
        remainingOrders +
        " more orders are available.\n\n";

    } else {

      text +=
        "ℹ️ " +
        remainingOrders +
        " aur orders available hain.\n\n";
    }
  }

  buttons.push([
    {
      text: "🔄 Refresh",
      callback_data: "MY_ORDERS"
    }
  ]);

  buttons.push([
    {
      text: "🚀 New Project",
      callback_data: "MENU_SERVICES"
    },
    {
      text: "🏠 Main Menu",
      callback_data: "MAIN_MENU"
    }
  ]);
}


// =====================================================
// 🖥️ DISPLAY FUNCTION
// =====================================================

function showOrders() {

  if (
    typeof request !== "undefined" &&
    request &&
    request.message &&
    request.message.message_id
  ) {

    try {

      Api.editMessageText({
        chat_id: uid,
        message_id:
          request.message.message_id,

        text: text,

        parse_mode: "HTML",

        reply_markup: {
          inline_keyboard: buttons
        }
      });

      return;

    } catch (error) {

      try {
        Api.deleteMessage({
          chat_id: uid,
          message_id:
            request.message.message_id
        });
      } catch (deleteError) {}
    }
  }

  Api.sendMessage({
    chat_id: uid,
    text: text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons
    }
  });
}

showOrders();
