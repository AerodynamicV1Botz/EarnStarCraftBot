/*CMD
  command: ORDER_CANCEL_DRAFT
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
  command: ORDER_CANCEL_DRAFT
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT — ORDER_CANCEL_DRAFT
// CLIENT → CANCEL ACTIVE ORDER DRAFT
//
// - Clears only temporary ORDER_<uid> draft
// - Does not create final order
// - Does not generate Order ID
// - Does not modify ORDER_KEYS
// - Does not modify existing final ORDER_<orderId>
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
      callback_query_id: request.id,
      text: "Order draft cancelled",
      show_alert: false
    });
  } catch (error) {}
}


// =====================================================
// 👤 USER
// =====================================================

var uid = String(user.telegramid);
var orderKey = "ORDER_" + uid;


// =====================================================
// 📦 LOAD ACTIVE DRAFT
// =====================================================

var order = Bot.getProperty(orderKey);


// =====================================================
// ⛔ NO ACTIVE DRAFT
// =====================================================

if (
  !order ||
  typeof order !== "object"
) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>No active order draft found.</b>\n\n" +
      "Aap kabhi bhi fresh order start kar sakte hain.",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🛒 View Services",
            callback_data: "MENU_SERVICES"
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

  return;
}


// =====================================================
// 🔒 PRE-SUBMISSION DRAFT CHECK
// =====================================================

var requestStatus = String(
  order.requestStatus || ""
).toLowerCase();

var orderStatus = String(
  order.orderStatus || ""
).toLowerCase();

var orderId = String(
  order.orderId ||
  order.id ||
  ""
).trim();

var finalOrderExists = false;

if (orderId) {
  finalOrderExists = true;
}

if (
  requestStatus === "accepted" ||
  requestStatus === "rejected" ||
  requestStatus === "completed" ||
  requestStatus === "cancelled" ||
  requestStatus === "in_progress" ||
  requestStatus === "delivered" ||
  orderStatus === "accepted" ||
  orderStatus === "rejected" ||
  orderStatus === "completed" ||
  orderStatus === "cancelled" ||
  orderStatus === "in_progress" ||
  orderStatus === "delivered" ||
  orderStatus === "remaining_payment" ||
  finalOrderExists
) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>This order cannot be cancelled from the draft menu.</b>\n\n" +
      "Ye order already submitted ya processing stage mein hai.\n" +
      "Please <b>My Orders</b> se order manage karein.",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📦 My Orders",
            callback_data: "MY_ORDERS"
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

  return;
}


// =====================================================
// 🧹 CLEAR TEMPORARY USER STATES
// =====================================================

var clearKeys = [
  "ACTIVE_CONTACT_FLOW",

  "ORDER_CONTACT_WAITING_" + uid,
  "ORDER_REQUIREMENT_WAITING_" + uid,
  "ORDER_BUDGET_WAITING_" + uid,
  "ORDER_EXTRA_DETAILS_WAITING_" + uid,

  "WAITING_TELEGRAM_" + uid,
  "WAITING_OTHER_NUMBER_" + uid,
  "WAITING_INSTAGRAM_" + uid,
  "WAITING_WHATSAPP_" + uid,
  "WAITING_EMAIL_" + uid,

  "ORDER_CONTACT_ADMIN_WAITING_" + uid,
  "ADMIN_REPLY_CLIENT_WAITING_" + uid,

  "PAYMENT_PROOF_WAITING_" + uid,
  "REMAINING_PAYMENT_PROOF_WAITING_" + uid,

  "ORDER_MODE_" + uid,
  "ORDER_PACKAGE_" + uid,

  "STARTER_MODE_" + uid,
  "BUSINESS_MODE_" + uid,
  "PRO_MODE_" + uid,

  "BUILD_ENQUIRY_WAITING_" + uid,
  "BUILD_REQUIREMENT_WAITING_" + uid,
  "BUILD_BUDGET_WAITING_" + uid
];

for (var i = 0; i < clearKeys.length; i++) {
  Bot.setProperty(clearKeys[i], "", "string");
}


// =====================================================
// 🧹 CLEAR USER MESSAGE REFERENCES
// =====================================================

User.setProperty(
  "ORDER_CONTACT_MENU_MESSAGE_ID",
  "",
  "string"
);

User.setProperty(
  "ORDER_FINAL_REVIEW_MESSAGE_ID",
  "",
  "string"
);

User.setProperty(
  "ORDER_LAST_MESSAGE_ID",
  "",
  "string"
);


// =====================================================
// 🗑️ CLEAR ONLY ACTIVE DRAFT
// =====================================================
//
// Do not create cancelled order object.
// Do not generate Order ID.
// Do not touch ORDER_KEYS.
// Do not touch ORDER_<orderId>.
// Do not touch direct-order lock unless this draft
// was never submitted.
//

Bot.setProperty(
  orderKey,
  "",
  "string"
);


// =====================================================
// ✅ CONFIRMATION
// =====================================================

Api.sendMessage({
  chat_id: uid,
  text:
    "❌ <b>Order Draft Cancelled</b>\n\n" +

    "Aapka active order draft cancel kar diya gaya hai.\n\n" +

    "🆔 <b>Order ID:</b> Not generated\n\n" +

    "Koi final order create nahi hua hai.\n" +
    "Aap jab chahein fresh order start kar sakte hain.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🛒 View Services",
          callback_data: "MENU_SERVICES"
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
