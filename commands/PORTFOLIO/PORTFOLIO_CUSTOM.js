/*CMD
  command: PORTFOLIO_CUSTOM
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
// SCRIPT 188 — UPDATED VERSION
// COMMAND NAME: PORTFOLIO_CUSTOM
// STEP 6.1 — CUSTOM TELEGRAM BOTS
// 📁 Portfolio → Custom Bots
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
    "🤖 <b>CUSTOM TELEGRAM BOTS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "EarnStar BOTCRAFT can build custom Telegram bots based on specific business requirements.\n\n" +
    "✨ <b>Example Features:</b>\n" +
    "• Custom menus & buttons\n" +
    "• User registration\n" +
    "• Admin panel\n" +
    "• User management\n" +
    "• Forms & data collection\n" +
    "• Notifications\n" +
    "• Broadcast system\n" +
    "• Automated workflows\n" +
    "• Statistics & tracking\n\n" +
    "🎯 <b>Best For:</b>\n" +
    "Businesses, communities, creators and service-based projects.\n\n" +
    "🚀 <b>Want something similar?</b>\n" +
    "Send your requirements and discuss a custom solution."
} else if (lang == "gujarati") {
  text =
    "🤖 <b>CUSTOM TELEGRAM BOTS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "EarnStar BOTCRAFT business requirements પ્રમાણે custom Telegram bots બનાવી શકે છે.\n\n" +
    "✨ <b>Example Features:</b>\n" +
    "• Custom menus & buttons\n" +
    "• User registration\n" +
    "• Admin panel\n" +
    "• User management\n" +
    "• Forms & data collection\n" +
    "• Notifications\n" +
    "• Broadcast system\n" +
    "• Automated workflows\n" +
    "• Statistics & tracking\n\n" +
    "🎯 <b>Best For:</b>\n" +
    "Businesses, communities, creators અને service-based projects.\n\n" +
    "🚀 <b>આવું Bot જોઈએ છે?</b>\n" +
    "તમારી requirements મોકલો અને custom solution discuss કરો."
} else {
  text =
    "🤖 <b>CUSTOM TELEGRAM BOTS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "EarnStar BOTCRAFT mein custom Telegram bots ko business requirements ke according design kiya ja sakta hai.\n\n" +
    "✨ <b>Example Features:</b>\n" +
    "• Custom menus & buttons\n" +
    "• User registration\n" +
    "• Admin panel\n" +
    "• User management\n" +
    "• Forms & data collection\n" +
    "• Notifications\n" +
    "• Broadcast system\n" +
    "• Automated workflows\n" +
    "• Statistics & tracking\n\n" +
    "🎯 <b>Best For:</b>\n" +
    "Businesses, communities, creators aur service-based projects.\n\n" +
    "🚀 <b>Want something similar?</b>\n" +
    "Apni requirements bhejiye aur custom solution discuss kijiye."
}

// ==========================================
// 🔘 BUTTON TEXT
// ==========================================

var buildBot = "🚀 Build Similar Bot"
var viewDemos = "🎬 View Demos"
var pricing = "💰 Pricing"
var portfolio = "📁 Portfolio"
var mainMenu = "🏠 Main Menu"

if (lang == "gujarati") {
  buildBot = "🚀 Similar Bot બનાવો"
  viewDemos = "🎬 Demos જુઓ"
  pricing = "💰 Pricing"
  portfolio = "📁 Portfolio"
  mainMenu = "🏠 Main Menu"
}

// ==========================================
// 🔘 INLINE BUTTONS
// ==========================================

var buttons = [
  [
    {
      text: buildBot,
      callback_data: "BUILD_CUSTOM"
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

function showCustomPortfolio(messageText, inlineButtons) {
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
// 🚀 SHOW CUSTOM BOTS PORTFOLIO
// ==========================================

showCustomPortfolio(text, buttons)
