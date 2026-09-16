/*CMD
  command: MENU_PORTFOLIO
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
// SCRIPT 187 — UPDATED VERSION
// COMMAND NAME: MENU_PORTFOLIO
// STEP 6 — PORTFOLIO
// 📁 Main Menu → Portfolio
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// ==========================================
// 🔔 CALLBACK ANSWER
// ==========================================

if (typeof request !== "undefined" && request && request.id) {
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
    "📁 <b>EARNSTAR PORTFOLIO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Explore examples of different Telegram bots and automation systems.\n\n" +
    "🤖 <b>Custom Bots</b>\n" +
    "Custom Telegram bots designed around business requirements.\n\n" +
    "⚙️ <b>Automation Systems</b>\n" +
    "Solutions for automating repetitive business tasks and workflows.\n\n" +
    "🛟 <b>Support Systems</b>\n" +
    "Customer support, FAQs and support-request management.\n\n" +
    "📢 <b>Broadcast Systems</b>\n" +
    "Updates, announcements and notification management.\n\n" +
    "👥 <b>Community Systems</b>\n" +
    "Community management and member workflows.\n\n" +
    "🎯 <b>Lead Systems</b>\n" +
    "Lead collection, enquiries and follow-up workflows.\n\n" +
    "👇 <b>Select a category to explore details.</b>"
} else if (lang == "gujarati") {
  text =
    "📁 <b>EARNSTAR PORTFOLIO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "અહીં તમે અલગ અલગ પ્રકારના Telegram bots અને automation systems ના examples જોઈ શકો છો.\n\n" +
    "🤖 <b>Custom Bots</b>\n" +
    "Business requirements પ્રમાણે custom Telegram bots.\n\n" +
    "⚙️ <b>Automation Systems</b>\n" +
    "Repetitive business tasks અને workflows automate કરવાના solutions.\n\n" +
    "🛟 <b>Support Systems</b>\n" +
    "Customer support, FAQs અને support-request management.\n\n" +
    "📢 <b>Broadcast Systems</b>\n" +
    "Updates, announcements અને notification management.\n\n" +
    "👥 <b>Community Systems</b>\n" +
    "Community management અને member workflows.\n\n" +
    "🎯 <b>Lead Systems</b>\n" +
    "Lead collection, enquiries અને follow-up workflows.\n\n" +
    "👇 <b>Category પસંદ કરીને details જુઓ.</b>"
} else {
  text =
    "📁 <b>EARNSTAR PORTFOLIO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Yahan aap different types ke Telegram bots aur automation systems ke examples explore kar sakte hain.\n\n" +
    "🤖 <b>Custom Bots</b>\n" +
    "Business requirements ke according custom Telegram bots.\n\n" +
    "⚙️ <b>Automation Systems</b>\n" +
    "Repetitive business tasks aur workflows ko automate karne ke solutions.\n\n" +
    "🛟 <b>Support Systems</b>\n" +
    "Customer support, FAQs aur support-request management.\n\n" +
    "📢 <b>Broadcast Systems</b>\n" +
    "Updates, announcements aur notification management.\n\n" +
    "👥 <b>Community Systems</b>\n" +
    "Community management aur member workflows.\n\n" +
    "🎯 <b>Lead Systems</b>\n" +
    "Lead collection, enquiries aur follow-up workflows.\n\n" +
    "👇 <b>Category select karke details dekhein.</b>"
}

// ==========================================
// 🔘 BUTTON TEXT
// ==========================================

var customBots = "🤖 Custom Bots"
var automation = "⚙️ Automation"
var support = "🛟 Support"
var broadcast = "📢 Broadcast"
var community = "👥 Community"
var lead = "🎯 Lead System"
var liveDemos = "🎬 Live Demos"
var buildBot = "🚀 Build My Bot"
var mainMenu = "🏠 Main Menu"

if (lang == "english") {
  customBots = "🤖 Custom Bots"
  automation = "⚙️ Automation"
  support = "🛟 Support"
  broadcast = "📢 Broadcast"
  community = "👥 Community"
  lead = "🎯 Lead System"
  liveDemos = "🎬 Live Demos"
  buildBot = "🚀 Build My Bot"
  mainMenu = "🏠 Main Menu"
} else if (lang == "gujarati") {
  customBots = "🤖 કસ્ટમ બોટ્સ"
  automation = "⚙️ ઓટોમેશન"
  support = "🛟 સપોર્ટ"
  broadcast = "📢 બ્રોડકાસ્ટ"
  community = "👥 કમ્યુનિટી"
  lead = "🎯 લીડ સિસ્ટમ"
  liveDemos = "🎬 લાઇવ ડેમો"
  buildBot = "🚀 મારું Bot બનાવો"
  mainMenu = "🏠 મુખ્ય મેનુ"
}

// ==========================================
// 🔘 INLINE BUTTONS
// ==========================================

var buttons = [
  [
    {
      text: customBots,
      callback_data: "PORTFOLIO_CUSTOM"
    },
    {
      text: automation,
      callback_data: "PORTFOLIO_AUTOMATION"
    }
  ],
  [
    {
      text: support,
      callback_data: "PORTFOLIO_SUPPORT"
    },
    {
      text: broadcast,
      callback_data: "PORTFOLIO_BROADCAST"
    }
  ],
  [
    {
      text: community,
      callback_data: "PORTFOLIO_COMMUNITY"
    },
    {
      text: lead,
      callback_data: "PORTFOLIO_LEAD"
    }
  ],
  [
    {
      text: buildBot,
      callback_data: "MENU_BUILD"
    }
  ],
  [
    {
      text: mainMenu,
      callback_data: "MAIN_MENU"
    }
  ]
]

// ==========================================
// ✏️ SAME MESSAGE EDIT + DELETE FALLBACK
// ==========================================

function showPortfolioMenu(messageText, inlineButtons) {
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
// 🚀 SHOW PORTFOLIO MENU
// ==========================================

showPortfolioMenu(text, buttons)

