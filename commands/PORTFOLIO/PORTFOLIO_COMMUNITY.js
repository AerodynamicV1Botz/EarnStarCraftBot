/*CMD
  command: PORTFOLIO_COMMUNITY
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
// SCRIPT 192 — UPDATED VERSION
// COMMAND NAME: PORTFOLIO_COMMUNITY
// STEP 6.5 — COMMUNITY MANAGEMENT SYSTEMS
// 📁 Portfolio → Community
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
    "👥 <b>COMMUNITY MANAGEMENT SYSTEMS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Custom management bots can help make Telegram communities more organized and easier to manage.\n\n" +
    "✨ <b>Example Features:</b>\n" +
    "• Member registration\n" +
    "• Welcome system\n" +
    "• Rules & information menu\n" +
    "• Admin controls\n" +
    "• Member management\n" +
    "• Notifications\n" +
    "• Broadcast tools\n" +
    "• FAQ system\n" +
    "• Custom workflows\n" +
    "• Basic statistics\n\n" +
    "🎯 <b>Best For:</b>\n" +
    "Communities, groups, creators, clubs and online organizations.\n\n" +
    "💡 Repetitive community tasks can be automated to simplify management.\n\n" +
    "🚀 <b>Need a community bot?</b>\n" +
    "Share your requirements and start your project."
} else if (lang == "gujarati") {
  text =
    "👥 <b>COMMUNITY MANAGEMENT SYSTEMS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Telegram communities ને organized અને સરળતાથી manage કરવા માટે custom management bots બનાવી શકાય છે.\n\n" +
    "✨ <b>Example Features:</b>\n" +
    "• Member registration\n" +
    "• Welcome system\n" +
    "• Rules & information menu\n" +
    "• Admin controls\n" +
    "• Member management\n" +
    "• Notifications\n" +
    "• Broadcast tools\n" +
    "• FAQ system\n" +
    "• Custom workflows\n" +
    "• Basic statistics\n\n" +
    "🎯 <b>Best For:</b>\n" +
    "Communities, groups, creators, clubs અને online organizations.\n\n" +
    "💡 Repetitive community tasks ને automate કરીને management સરળ બનાવી શકાય છે.\n\n" +
    "🚀 <b>Community bot જોઈએ છે?</b>\n" +
    "તમારી requirements share કરો અને project શરૂ કરો."
} else {
  text =
    "👥 <b>COMMUNITY MANAGEMENT SYSTEMS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Telegram communities ko organized aur easier-to-manage banane ke liye custom management bots develop kiye ja sakte hain.\n\n" +
    "✨ <b>Example Features:</b>\n" +
    "• Member registration\n" +
    "• Welcome system\n" +
    "• Rules & information menu\n" +
    "• Admin controls\n" +
    "• Member management\n" +
    "• Notifications\n" +
    "• Broadcast tools\n" +
    "• FAQ system\n" +
    "• Custom workflows\n" +
    "• Basic statistics\n\n" +
    "🎯 <b>Best For:</b>\n" +
    "Communities, groups, creators, clubs aur online organizations.\n\n" +
    "💡 Repetitive community tasks ko automate karke management ko simpler banaya ja sakta hai.\n\n" +
    "🚀 <b>Need a community bot?</b>\n" +
    "Apni requirements share karein aur project start karein."
}

// ==========================================
// 🔘 BUTTON TEXT
// ==========================================

var buildCommunity = "🚀 Build Community Bot"
var viewDemos = "🎬 View Demos"
var pricing = "💰 Pricing"
var portfolio = "📁 Portfolio"
var mainMenu = "🏠 Main Menu"

if (lang == "gujarati") {
  buildCommunity = "🚀 Community Bot બનાવો"
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
      text: buildCommunity,
      callback_data: "BUILD_COMMUNITY"
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

function showCommunityPortfolio(messageText, inlineButtons) {
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
// 🚀 SHOW COMMUNITY PORTFOLIO
// ==========================================

showCommunityPortfolio(text, buttons)
