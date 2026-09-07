/*CMD
  command: ECOM_PRODUCTS
  help: 
  need_reply: false
  auto_retry_time: 
  folder: LIVE DEMO

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 60 — UPDATED VERSION
// COMMAND NAME: ECOM_PRODUCTS
// STEP 5.1.1 — PRODUCT SHOWCASE
// 📁 MAIN MENU → 📁 LIVE DEMOS → 📁 E-COMMERCE → 📁 PRODUCTS
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid

var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// ==========================================
// ⚡ INSTANT CALLBACK RESPONSE
// ==========================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

// ==========================================
// 🔧 EDIT CURRENT MENU MESSAGE
// ==========================================

function showProductMenu(text, buttons) {

  if (
    typeof request !== "undefined" &&
    request.message &&
    request.message.message_id
  ) {

    try {

      Api.editMessageText({
        chat_id: uid,
        message_id: request.message.message_id,
        text: text,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: buttons
        }
      })

      return

    } catch (error) {

      try {
        Api.deleteMessage({
          chat_id: uid,
          message_id: request.message.message_id
        })
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
  })
}

// ==========================================
// 🎛️ COMMON BUTTONS
// ==========================================

var buttons = [
  [
    {
      text: "🛒 Select Product",
      callback_data: "ECOM_ORDER_FLOW"
    }
  ],
  [
    {
      text: "👤 Customer Flow",
      callback_data: "ECOM_CUSTOMER"
    },
    {
      text: "🔔 Notifications",
      callback_data: "ECOM_NOTIFICATIONS"
    }
  ],
  [
    {
      text: "👑 Admin Features",
      callback_data: "ECOM_ADMIN"
    }
  ],
  [
    {
      text: "🚀 Build Similar Bot",
      callback_data: "BUILD_CUSTOM"
    }
  ],
  [
    {
      text: "🎬 Back to E-Commerce Demo",
      callback_data: "DEMO_ECOMMERCE"
    }
  ],
  [
    {
      text: "🎬 All Demos",
      callback_data: "MENU_DEMO"
    },
    {
      text: "🏠 Main Menu",
      callback_data: "BACK_MAIN_MENU"
    }
  ]
]

// ==========================================
// 🇮🇳 HINGLISH
// ==========================================

if (lang === "hinglish") {

  var text =
    "🛍️ <b>PRODUCT SHOWCASE</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "✨ Telegram shop bot mein products kaise show kiye ja sakte hain uska example.\n\n" +

    "📱 <b>Premium Smartphone</b>\n" +
    "💰 Price: ₹24,999\n" +
    "⭐ Rating: 4.8/5\n\n" +

    "🎧 <b>Wireless Headphones</b>\n" +
    "💰 Price: ₹2,499\n" +
    "⭐ Rating: 4.7/5\n\n" +

    "⌚ <b>Smart Watch</b>\n" +
    "💰 Price: ₹3,999\n" +
    "⭐ Rating: 4.6/5\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "💡 Products, prices, images aur categories aapke business ke according customize kiye ja sakte hain."

  showProductMenu(text, buttons)
  return
}

// ==========================================
// 🇬🇧 ENGLISH
// ==========================================

if (lang === "english") {

  var text =
    "🛍️ <b>PRODUCT SHOWCASE</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "✨ This is an example of how products can be displayed inside a Telegram shop bot.\n\n" +

    "📱 <b>Premium Smartphone</b>\n" +
    "💰 Price: ₹24,999\n" +
    "⭐ Rating: 4.8/5\n\n" +

    "🎧 <b>Wireless Headphones</b>\n" +
    "💰 Price: ₹2,499\n" +
    "⭐ Rating: 4.7/5\n\n" +

    "⌚ <b>Smart Watch</b>\n" +
    "💰 Price: ₹3,999\n" +
    "⭐ Rating: 4.6/5\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "💡 Products, prices, images and categories can be customized for your business."

  showProductMenu(text, buttons)
  return
}

// ==========================================
// 🇬🇺 GUJARATI
// ==========================================

if (lang === "gujarati") {

  var gujaratiButtons = [
    [
      {
        text: "🛒 Product પસંદ કરો",
        callback_data: "ECOM_ORDER_FLOW"
      }
    ],
    [
      {
        text: "👤 Customer Flow",
        callback_data: "ECOM_CUSTOMER"
      },
      {
        text: "🔔 Notifications",
        callback_data: "ECOM_NOTIFICATIONS"
      }
    ],
    [
      {
        text: "👑 Admin Features",
        callback_data: "ECOM_ADMIN"
      }
    ],
    [
      {
        text: "🚀 આવું Bot બનાવો",
        callback_data: "BUILD_CUSTOM"
      }
    ],
    [
      {
        text: "🎬 E-Commerce Demo પર પાછા",
        callback_data: "DEMO_ECOMMERCE"
      }
    ],
    [
      {
        text: "🎬 બધા Demos",
        callback_data: "MENU_DEMO"
      },
      {
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]

  var text =
    "🛍️ <b>PRODUCT SHOWCASE</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "✨ Telegram shop bot માં products કેવી રીતે બતાવી શકાય તેનું example.\n\n" +

    "📱 <b>Premium Smartphone</b>\n" +
    "💰 કિંમત: ₹24,999\n" +
    "⭐ Rating: 4.8/5\n\n" +

    "🎧 <b>Wireless Headphones</b>\n" +
    "💰 કિંમત: ₹2,499\n" +
    "⭐ Rating: 4.7/5\n\n" +

    "⌚ <b>Smart Watch</b>\n" +
    "💰 કિંમત: ₹3,999\n" +
    "⭐ Rating: 4.6/5\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "💡 Products, prices, images અને categories તમારા business પ્રમાણે customize કરી શકાય છે."

  showProductMenu(text, gujaratiButtons)
  return
}
