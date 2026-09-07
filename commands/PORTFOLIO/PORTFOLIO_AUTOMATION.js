/*CMD
  command: PORTFOLIO_AUTOMATION
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
// SCRIPT 189 — UPDATED VERSION
// COMMAND NAME: PORTFOLIO_AUTOMATION
// STEP 6.2 — BUSINESS AUTOMATION SYSTEMS
// 📁 Portfolio → Automation
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
    "⚙️ <b>BUSINESS AUTOMATION SYSTEMS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Repetitive business tasks can be automated through a Telegram bot.\n\n" +
    "✨ <b>Example Features:</b>\n" +
    "• Automated workflows\n" +
    "• User registration\n" +
    "• Lead collection\n" +
    "• Automatic notifications\n" +
    "• Broadcast management\n" +
    "• Admin controls\n" +
    "• User data management\n" +
    "• Status tracking\n" +
    "• Custom business logic\n\n" +
    "🎯 <b>Useful For:</b>\n" +
    "Businesses, service providers, communities and online projects.\n\n" +
    "💡 Reduce repetitive manual work and organize important processes through automation.\n\n" +
    "🚀 <b>Want a similar system?</b>\n" +
    "Share your requirements and start your project."
} else if (lang == "gujarati") {
  text =
    "⚙️ <b>BUSINESS AUTOMATION SYSTEMS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Business ના repetitive tasks Telegram bot દ્વારા automate કરી શકાય છે.\n\n" +
    "✨ <b>Example Features:</b>\n" +
    "• Automated workflows\n" +
    "• User registration\n" +
    "• Lead collection\n" +
    "• Automatic notifications\n" +
    "• Broadcast management\n" +
    "• Admin controls\n" +
    "• User data management\n" +
    "• Status tracking\n" +
    "• Custom business logic\n\n" +
    "🎯 <b>Useful For:</b>\n" +
    "Businesses, service providers, communities અને online projects.\n\n" +
    "💡 Repetitive manual work ઓછું કરીને important processes ને automation દ્વારા manage કરી શકાય છે.\n\n" +
    "🚀 <b>આવું system જોઈએ છે?</b>\n" +
    "તમારી requirements share કરીને project શરૂ કરો."
} else {
  text =
    "⚙️ <b>BUSINESS AUTOMATION SYSTEMS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Business ke repetitive tasks Telegram bot ke through automate kiye ja sakte hain.\n\n" +
    "✨ <b>Example Features:</b>\n" +
    "• Automated workflows\n" +
    "• User registration\n" +
    "• Lead collection\n" +
    "• Automatic notifications\n" +
    "• Broadcast management\n" +
    "• Admin controls\n" +
    "• User data management\n" +
    "• Status tracking\n" +
    "• Custom business logic\n\n" +
    "🎯 <b>Useful For:</b>\n" +
    "Businesses, service providers, communities aur online projects.\n\n" +
    "💡 Manual work kam karke important processes ko automation ke through manage kiya ja sakta hai.\n\n" +
    "🚀 <b>Want a similar system?</b>\n" +
    "Apni requirements share karke project start karein."
}

// ==========================================
// 🔘 BUTTON TEXT
// ==========================================

var buildAutomation = "🚀 Build Automation"
var viewDemos = "🎬 View Demos"
var pricing = "💰 Pricing"
var portfolio = "📁 Portfolio"
var mainMenu = "🏠 Main Menu"

if (lang == "gujarati") {
  buildAutomation = "🚀 Automation બનાવો"
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
      text: buildAutomation,
      callback_data: "BUILD_AUTOMATION"
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

function showAutomationPortfolio(messageText, inlineButtons) {
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
// 🚀 SHOW AUTOMATION PORTFOLIO
// ==========================================

showAutomationPortfolio(text, buttons)
