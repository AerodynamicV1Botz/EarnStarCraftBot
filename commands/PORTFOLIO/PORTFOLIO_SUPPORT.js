/*CMD
  command: PORTFOLIO_SUPPORT
  help: 
  need_reply: false
  auto_retry_time: 
  folder: PORTFOLIO

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 190 — UPDATED VERSION
// COMMAND NAME: PORTFOLIO_SUPPORT
// STEP 6.3 — CUSTOMER SUPPORT SYSTEMS
// 📁 Portfolio → Support
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid

var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// ==========================================
// 🔔 CALLBACK ANSWER
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
// 📝 LANGUAGE TEXT
// ==========================================

var text = ""

if (lang == "english") {
  text =
    "🛟 <b>CUSTOMER SUPPORT SYSTEMS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "A Telegram support bot can help organize customer questions and support requests in one structured workflow.\n\n" +
    "✨ <b>Example Features:</b>\n" +
    "• FAQ & instant answers\n" +
    "• Support request collection\n" +
    "• User information collection\n" +
    "• Admin notifications\n" +
    "• Customer-to-admin communication\n" +
    "• Ticket-style workflows\n" +
    "• Status updates\n" +
    "• User management\n" +
    "• Custom support menus\n\n" +
    "🎯 <b>Best For:</b>\n" +
    "Online businesses, service providers, communities and customer-facing projects.\n\n" +
    "💡 Structured support workflows can make customer communication easier to manage.\n\n" +
    "🚀 <b>Need a support bot?</b>\n" +
    "Share your requirements and start your project."
} else if (lang == "gujarati") {
  text =
    "🛟 <b>CUSTOMER SUPPORT SYSTEMS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Telegram પર customers ના questions અને support requests ને organized રીતે manage કરવા માટે support bot બનાવી શકાય છે.\n\n" +
    "✨ <b>Example Features:</b>\n" +
    "• FAQ & instant answers\n" +
    "• Support request collection\n" +
    "• User information collection\n" +
    "• Admin notifications\n" +
    "• Customer-to-admin communication\n" +
    "• Ticket-style workflows\n" +
    "• Status updates\n" +
    "• User management\n" +
    "• Custom support menus\n\n" +
    "🎯 <b>Best For:</b>\n" +
    "Online businesses, service providers, communities અને customer-facing projects.\n\n" +
    "💡 Support requests ને structured workflow માં manage કરીને customer communication સરળ બનાવી શકાય છે.\n\n" +
    "🚀 <b>Support bot જોઈએ છે?</b>\n" +
    "તમારી requirements share કરો અને project શરૂ કરો."
} else {
  text =
    "🛟 <b>CUSTOMER SUPPORT SYSTEMS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Telegram par customers ke questions aur support requests ko organized way mein handle karne ke liye support bot banaya ja sakta hai.\n\n" +
    "✨ <b>Example Features:</b>\n" +
    "• FAQ & instant answers\n" +
    "• Support request collection\n" +
    "• User information collection\n" +
    "• Admin notifications\n" +
    "• Customer-to-admin communication\n" +
    "• Ticket-style workflows\n" +
    "• Status updates\n" +
    "• User management\n" +
    "• Custom support menus\n\n" +
    "🎯 <b>Best For:</b>\n" +
    "Online businesses, service providers, communities aur customer-facing projects.\n\n" +
    "💡 Support requests ko structured workflow mein manage karke customer communication easier banaya ja sakta hai.\n\n" +
    "🚀 <b>Need a support bot?</b>\n" +
    "Apni requirements share karein aur project start karein."
}

// ==========================================
// 🔘 BUTTON TEXT
// ==========================================

var buildSupport = "🚀 Build Support Bot"
var myRequests = "📂 My Support Requests"
var viewDemos = "🎬 View Demos"
var pricing = "💰 Pricing"
var portfolio = "📁 Portfolio"
var mainMenu = "🏠 Main Menu"

if (lang == "gujarati") {
  buildSupport = "🚀 Support Bot બનાવો"
  myRequests = "📂 મારી Support Requests"
  viewDemos = "🎬 Demos જુઓ"
  pricing = "💰 Pricing"
  portfolio = "📁 Portfolio"
  mainMenu = "🏠 મુખ્ય મેનુ"
}

// ==========================================
// 🔘 INLINE BUTTONS
// ==========================================

var buttons = [
  [
    {
      text: buildSupport,
      callback_data: "BUILD_SUPPORT"
    }
  ],
  [
    {
      text: myRequests,
      callback_data: "MY_SUPPORT_REQUESTS"
    }
  ],
  [
    {
      text: viewDemos,
      callback_data: "MENU_DEMO"
    }
  ],
  [
    {
      text: pricing,
      callback_data: "MENU_PRICING"
    }
  ],
  [
    {
      text: portfolio,
      callback_data: "MENU_PORTFOLIO"
    }
  ],
  [
    {
      text: mainMenu,
      callback_data: "BACK_MAIN_MENU"
    }
  ]
]

// ==========================================
// ✏️ SAME MESSAGE EDIT + DELETE FALLBACK
// ==========================================

function showSupportPortfolio(messageText, inlineButtons) {
  if (
    typeof request !== "undefined" &&
    request.message &&
    request.message.message_id
  ) {
    try {
      Api.editMessageText({
        chat_id: uid,
        message_id: request.message.message_id,
        text: messageText,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: inlineButtons
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
    text: messageText,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: inlineButtons
    }
  })
}

// ==========================================
// 🚀 SHOW SUPPORT PORTFOLIO
// ==========================================

showSupportPortfolio(text, buttons)
