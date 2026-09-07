/*CMD
  command: CREATE_ORDER
  help: 
  need_reply: false
  auto_retry_time: 
  folder: MY ORDERS

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var uid = user.telegramid

// ==========================================
// 👑 ADMIN CHECK
// ==========================================

if (String(uid) !== "7897324623") {
  return
}

// ==========================================
// 🆔 GET ENQUIRY ID
// ==========================================

var refId = params

if (!refId) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "⚠️ Reference ID missing"
  })
  return
}

// ==========================================
// 📋 GET ENQUIRY
// ==========================================

var enquiry = Bot.getProperty(
  "ENQUIRY_" + refId
)

// 🔐 DUPLICATE ORDER PROTECTION
if (enquiry.orderId) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "⚠️ Order already exists!"
  })

  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>ORDER ALREADY EXISTS</b>\n\n" +
      "🆔 Order ID: <code>" +
      enquiry.orderId +
      "</code>\n\n" +
      "This enquiry already has an order.",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📦 View Order",
            callback_data: "ADMIN_ORDER " + enquiry.orderId
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
  })

  return
}

if (!enquiry) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ Enquiry not found"
  })
  return
}

// ==========================================
// 🟢 ONLY ACCEPTED ENQUIRY
// ==========================================

if (enquiry.status !== "accepted") {

  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "⚠️ Accept the enquiry first"
  })

  return
}

// ==========================================
// 🆔 CREATE ORDER ID
// ==========================================

var orderId =
  "ESORD" +
  Date.now().toString().slice(-8)

// ==========================================
// 📦 ORDER DATA
// ==========================================

var order = {

  orderId: orderId,

  enquiryRef: refId,

  userId: enquiry.userId,

  name: enquiry.name || "User",

  contact: enquiry.contact || "",

  requirements:
    enquiry.requirements || "",

  status: "pending",

  createdAt:
    new Date().toISOString()

}

// ==========================================
// 💾 SAVE ORDER
// ==========================================

Bot.setProperty(
  "ORDER_" + orderId,
  order,
  "json"
)

// ==========================================
// 📜 INITIAL ORDER HISTORY
// ==========================================

var history = [
  {
    status: "pending",
    time: new Date().toISOString()
  }
]

Bot.setProperty(
  "ORDER_HISTORY_" + orderId,
  history,
  "json"
)

// ==========================================
// 📚 ORDER KEYS
// ==========================================

var orderKeys =
  Bot.getProperty("ORDER_KEYS") || []

if (orderKeys.indexOf(orderId) === -1) {

  orderKeys.push(orderId)

}

Bot.setProperty(
  "ORDER_KEYS",
  orderKeys,
  "json"
)

// ==========================================
// 🔗 LINK ORDER TO ENQUIRY
// ==========================================

enquiry.orderId = orderId

Bot.setProperty(
  "ENQUIRY_" + refId,
  enquiry,
  "json"
)

// ==========================================
// 📩 CLIENT UPDATE
// ==========================================

Api.sendMessage({

  chat_id: enquiry.userId,

  text:
    "🎉 <b>YOUR PROJECT HAS MOVED TO ORDER!</b>\n\n" +

    "🆔 <b>Order ID:</b>\n" +
    "<code>" + orderId + "</code>\n\n" +

    "📋 <b>Enquiry:</b> " +
    "<code>" + refId + "</code>\n\n" +

    "🟡 <b>Status:</b> ORDER PENDING\n\n" +

    "Our team will contact you regarding the next steps.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📦 My Order",
          callback_data:
            "MY_ORDER " + orderId
        }
      ],
      [
        {
          text: "🏠 Main Menu",
          callback_data:
            "BACK_MAIN_MENU"
        }
      ]
    ]
  }

})

// ==========================================
// 👑 ADMIN CONFIRMATION
// ==========================================

Api.answerCallbackQuery({

  callback_query_id: request.id,

  text:
    "📦 Order created: " + orderId

})

Api.sendMessage({

  chat_id: uid,

  text:
    "📦 <b>ORDER CREATED</b>\n\n" +

    "🆔 <b>Order ID:</b>\n" +
    "<code>" + orderId + "</code>\n\n" +

    "📋 <b>Enquiry:</b>\n" +
    "<code>" + refId + "</code>\n\n" +

    "🟡 <b>Status:</b> PENDING",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📦 View Order",
          callback_data:
            "MY_ORDER " + orderId
        }
      ],
      [
        {
          text: "👑 Admin Panel",
          callback_data:
            "ADMIN_PANEL"
        }
      ]
    ]
  }

})
