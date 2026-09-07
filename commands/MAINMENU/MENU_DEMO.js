/*CMD
  command: MENU_DEMO
  help: 
  need_reply: false
  auto_retry_time: 
  folder: MAINMENU

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

 // ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 58 — UPDATED VERSION
// COMMAND NAME: MENU_DEMO
// STEP 5 — LIVE DEMOS
// 📁 MAIN MENU → 📁 LIVE DEMOS
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

function showDemoMenu(text, buttons) {

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
      text: "🛒 E-Commerce",
      callback_data: "DEMO_ECOMMERCE"
    },
    {
      text: "🛟 Support",
      callback_data: "DEMO_SUPPORT"
    }
  ],
  [
    {
      text: "📢 Broadcast",
      callback_data: "DEMO_BROADCAST"
    },
    {
      text: "👥 Community",
      callback_data: "DEMO_COMMUNITY"
    }
  ],
  [
    {
      text: "🎯 Lead Collection",
      callback_data: "DEMO_LEAD"
    },
    {
      text: "⚙️ Automation",
      callback_data: "DEMO_AUTOMATION"
    }
  ],
  [
    {
      text: "🚀 Build My Bot",
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
      text: "📁 Portfolio",
      callback_data: "MENU_PORTFOLIO"
    }
  ],
  [
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
    "🎬 <b>EARNSTAR LIVE DEMOS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "Yahan aap different types ke Telegram bot systems ke demo flows explore kar sakte hain.\n\n" +

    "🛒 <b>E-Commerce Bot</b>\n" +
    "Products, orders aur customer interaction ke liye.\n\n" +

    "🛟 <b>Support Bot</b>\n" +
    "FAQ, customer support aur assistance ke liye.\n\n" +

    "📢 <b>Broadcast Bot</b>\n" +
    "Announcements aur notifications ke liye.\n\n" +

    "👥 <b>Community Bot</b>\n" +
    "Members aur community workflows manage karne ke liye.\n\n" +

    "🎯 <b>Lead Bot</b>\n" +
    "Customer enquiries aur lead collection ke liye.\n\n" +

    "⚙️ <b>Automation Bot</b>\n" +
    "Business workflows automate karne ke liye.\n\n" +

    "👇 <b>Demo category select karein:</b>"

  showDemoMenu(text, demoButtons)
  return
}

// ==========================================
// 🇬🇧 ENGLISH
// ==========================================

if (lang === "english") {

  var text =
    "🎬 <b>EARNSTAR LIVE DEMOS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "Explore demo flows for different types of Telegram bot systems.\n\n" +

    "🛒 <b>E-Commerce Bot</b>\n" +
    "For products, orders and customer interaction.\n\n" +

    "🛟 <b>Support Bot</b>\n" +
    "For FAQs, customer support and assistance.\n\n" +

    "📢 <b>Broadcast Bot</b>\n" +
    "For announcements and notifications.\n\n" +

    "👥 <b>Community Bot</b>\n" +
    "For member and community workflows.\n\n" +

    "🎯 <b>Lead Bot</b>\n" +
    "For customer enquiries and lead collection.\n\n" +

    "⚙️ <b>Automation Bot</b>\n" +
    "For automating business workflows.\n\n" +

    "👇 <b>Select a demo category:</b>"

  showDemoMenu(text, demoButtons)
  return
}

// ==========================================
// 🇬🇺 GUJARATI
// ==========================================

if (lang === "gujarati") {

  var gujaratiButtons = [
    [
      {
        text: "🛒 E-Commerce",
        callback_data: "DEMO_ECOMMERCE"
      },
      {
        text: "🛟 Support",
        callback_data: "DEMO_SUPPORT"
      }
    ],
    [
      {
        text: "📢 Broadcast",
        callback_data: "DEMO_BROADCAST"
      },
      {
        text: "👥 Community",
        callback_data: "DEMO_COMMUNITY"
      }
    ],
    [
      {
        text: "🎯 Lead Collection",
        callback_data: "DEMO_LEAD"
      },
      {
        text: "⚙️ Automation",
        callback_data: "DEMO_AUTOMATION"
      }
    ],
    [
      {
        text: "🚀 મારું Bot બનાવો",
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
        text: "📁 Portfolio",
        callback_data: "MENU_PORTFOLIO"
      }
    ],
    [
      {
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]

  var text =
    "🎬 <b>EARNSTAR LIVE DEMOS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "અહીં તમે અલગ અલગ પ્રકારના Telegram bot systems ના demo flows જોઈ શકો છો.\n\n" +

    "🛒 <b>E-Commerce Bot</b>\n" +
    "Products, orders અને customer interaction માટે.\n\n" +

    "🛟 <b>Support Bot</b>\n" +
    "FAQ, customer support અને assistance માટે.\n\n" +

    "📢 <b>Broadcast Bot</b>\n" +
    "Announcements અને notifications માટે.\n\n" +

    "👥 <b>Community Bot</b>\n" +
    "Members અને community workflows માટે.\n\n" +

    "🎯 <b>Lead Bot</b>\n" +
    "Customer enquiries અને lead collection માટે.\n\n" +

    "⚙️ <b>Automation Bot</b>\n" +
    "Business workflows automate કરવા માટે.\n\n" +

    "👇 <b>Demo category પસંદ કરો:</b>"

  showDemoMenu(text, gujaratiButtons)
  return
}
