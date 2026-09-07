/*CMD
  command: ECOM_ORDER_FLOW
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
// SCRIPT 61 — UPDATED VERSION
// COMMAND NAME: ECOM_ORDER_FLOW
// STEP 5.1.2 — ORDER FLOW DEMO
// 📁 MAIN MENU → 📁 LIVE DEMOS → 📁 E-COMMERCE → 📁 ORDER FLOW
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

function showOrderMenu(text, buttons) {

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
      text: "🛒 Products",
      callback_data: "ECOM_PRODUCTS"
    },
    {
      text: "🎬 E-Commerce Demo",
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
    "📦 <b>ORDER FLOW DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🛒 <b>Step 1 — Product Select</b>\n" +
    "Customer catalogue mein se product select karta hai.\n\n" +

    "🔢 <b>Step 2 — Quantity</b>\n" +
    "Customer required quantity choose karta hai.\n\n" +

    "📋 <b>Step 3 — Order Summary</b>\n" +
    "Bot automatically order summary prepare karta hai.\n\n" +

    "👤 <b>Step 4 — Customer Details</b>\n" +
    "Name aur contact details collect ki ja sakti hain.\n\n" +

    "🔔 <b>Step 5 — Confirmation</b>\n" +
    "Customer aur admin ko order notifications mil sakti hain.\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "✨ <b>Example Order</b>\n\n" +
    "📱 Premium Smartphone\n" +
    "🔢 Quantity: 1\n" +
    "💰 Total: ₹24,999\n\n" +

    "Ye complete flow aapke business ke according customize kiya ja sakta hai."

  showOrderMenu(text, buttons)
  return
}

// ==========================================
// 🇬🇧 ENGLISH
// ==========================================

if (lang === "english") {

  var text =
    "📦 <b>ORDER FLOW DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🛒 <b>Step 1 — Select Product</b>\n" +
    "Customer selects a product from the catalogue.\n\n" +

    "🔢 <b>Step 2 — Choose Quantity</b>\n" +
    "Customer selects the required quantity.\n\n" +

    "📋 <b>Step 3 — Order Summary</b>\n" +
    "The bot automatically prepares the order summary.\n\n" +

    "👤 <b>Step 4 — Customer Details</b>\n" +
    "Name and contact details can be collected.\n\n" +

    "🔔 <b>Step 5 — Confirmation</b>\n" +
    "Customer and admin can receive order notifications.\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "✨ <b>Example Order</b>\n\n" +
    "📱 Premium Smartphone\n" +
    "🔢 Quantity: 1\n" +
    "💰 Total: ₹24,999\n\n" +

    "This flow can be customized for your business."

  showOrderMenu(text, buttons)
  return
}

// ==========================================
// 🇬🇺 GUJARATI
// ==========================================

if (lang === "gujarati") {

  var gujaratiButtons = [
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
        text: "🛒 Products",
        callback_data: "ECOM_PRODUCTS"
      },
      {
        text: "🎬 E-Commerce Demo",
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
    "📦 <b>ORDER FLOW DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🛒 <b>Step 1 — Product પસંદ કરો</b>\n" +
    "Customer catalogue માંથી product પસંદ કરે છે.\n\n" +

    "🔢 <b>Step 2 — Quantity પસંદ કરો</b>\n" +
    "Customer જરૂરી quantity પસંદ કરે છે.\n\n" +

    "📋 <b>Step 3 — Order Summary</b>\n" +
    "Bot automatically order summary તૈયાર કરે છે.\n\n" +

    "👤 <b>Step 4 — Customer Details</b>\n" +
    "Name અને contact details collect કરી શકાય છે.\n\n" +

    "🔔 <b>Step 5 — Confirmation</b>\n" +
    "Customer અને admin ને order notification મળી શકે છે.\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "✨ <b>Example Order</b>\n\n" +
    "📱 Premium Smartphone\n" +
    "🔢 Quantity: 1\n" +
    "💰 Total: ₹24,999\n\n" +

    "આ flow તમારા business પ્રમાણે customize કરી શકાય છે."

  showOrderMenu(text, gujaratiButtons)
  return
}
