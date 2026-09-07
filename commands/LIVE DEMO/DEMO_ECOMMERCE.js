/*CMD
  command: DEMO_ECOMMERCE
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
// SCRIPT 59 — UPDATED VERSION
// COMMAND NAME: DEMO_ECOMMERCE
// STEP 5.1 — E-COMMERCE BOT DEMO
// 📁 MAIN MENU → 📁 LIVE DEMOS → 📁 E-COMMERCE
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

function showEcommerceMenu(text, buttons) {

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

var demoButtons = [
  [
    {
      text: "🛍️ Browse Products",
      callback_data: "ECOM_PRODUCTS"
    }
  ],
  [
    {
      text: "📦 Order Flow",
      callback_data: "ECOM_ORDER_FLOW"
    },
    {
      text: "👤 Customer Flow",
      callback_data: "ECOM_CUSTOMER"
    }
  ],
  [
    {
      text: "🔔 Notifications",
      callback_data: "ECOM_NOTIFICATIONS"
    },
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
      text: "💰 View Pricing",
      callback_data: "MENU_PRICING"
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
    "🛒 <b>E-COMMERCE BOT DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "✨ Ye demo dikhata hai ki aapka Telegram store bot kaise work kar sakta hai.\n\n" +

    "📦 <b>Products</b>\n" +
    "Customers products browse kar sakte hain.\n\n" +

    "🛍️ <b>Orders</b>\n" +
    "Product selection aur order flow manage kiya ja sakta hai.\n\n" +

    "👤 <b>Customer System</b>\n" +
    "Customer information aur enquiries collect ki ja sakti hain.\n\n" +

    "🔔 <b>Notifications</b>\n" +
    "Order aur important updates automatically send kiye ja sakte hain.\n\n" +

    "👑 <b>Admin Control</b>\n" +
    "Admin products, orders aur customers manage kar sakta hai.\n\n" +

    "👇 <b>Demo feature select karein:</b>"

  showEcommerceMenu(text, demoButtons)
  return
}

// ==========================================
// 🇬🇧 ENGLISH
// ==========================================

if (lang === "english") {

  var text =
    "🛒 <b>E-COMMERCE BOT DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "✨ Explore how a Telegram store bot can work.\n\n" +

    "📦 <b>Products</b>\n" +
    "Customers can browse products directly inside Telegram.\n\n" +

    "🛍️ <b>Orders</b>\n" +
    "Product selection and order workflows can be managed.\n\n" +

    "👤 <b>Customer System</b>\n" +
    "Customer information and enquiries can be collected.\n\n" +

    "🔔 <b>Notifications</b>\n" +
    "Order and important updates can be sent automatically.\n\n" +

    "👑 <b>Admin Control</b>\n" +
    "Admins can manage products, orders and customers.\n\n" +

    "👇 <b>Select a demo feature:</b>"

  showEcommerceMenu(text, demoButtons)
  return
}

// ==========================================
// 🇬🇺 GUJARATI
// ==========================================

if (lang === "gujarati") {

  var gujaratiButtons = [
    [
      {
        text: "🛍️ Products જુઓ",
        callback_data: "ECOM_PRODUCTS"
      }
    ],
    [
      {
        text: "📦 Order Flow",
        callback_data: "ECOM_ORDER_FLOW"
      },
      {
        text: "👤 Customer Flow",
        callback_data: "ECOM_CUSTOMER"
      }
    ],
    [
      {
        text: "🔔 Notifications",
        callback_data: "ECOM_NOTIFICATIONS"
      },
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
        text: "💰 Pricing",
        callback_data: "MENU_PRICING"
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
    "🛒 <b>E-COMMERCE BOT DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "✨ Telegram store bot કેવી રીતે કામ કરી શકે તેનું demo જુઓ.\n\n" +

    "📦 <b>Products</b>\n" +
    "Customers Telegram માં products browse કરી શકે છે.\n\n" +

    "🛍️ <b>Orders</b>\n" +
    "Product selection અને order workflow manage કરી શકાય છે.\n\n" +

    "👤 <b>Customer System</b>\n" +
    "Customer information અને enquiries collect કરી શકાય છે.\n\n" +

    "🔔 <b>Notifications</b>\n" +
    "Order અને important updates automatically મોકલી શકાય છે.\n\n" +

    "👑 <b>Admin Control</b>\n" +
    "Admin products, orders અને customers manage કરી શકે છે.\n\n" +

    "👇 <b>Demo feature પસંદ કરો:</b>"

  showEcommerceMenu(text, gujaratiButtons)
  return
}
