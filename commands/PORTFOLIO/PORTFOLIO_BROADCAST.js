/*CMD
  command: PORTFOLIO_BROADCAST
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
// SCRIPT 191 — UPDATED VERSION
// COMMAND NAME: PORTFOLIO_BROADCAST
// STEP 6.4 — BROADCAST & NOTIFICATION SYSTEMS
// 📁 Portfolio → Broadcast
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
    "📢 <b>BROADCAST & NOTIFICATION SYSTEMS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "A Telegram bot can help send important updates and notifications to users efficiently.\n\n" +
    "✨ <b>Example Features:</b>\n" +
    "• User broadcasts\n" +
    "• Important announcements\n" +
    "• Notification system\n" +
    "• Active user management\n" +
    "• Blocked-user handling\n" +
    "• Delivery statistics\n" +
    "• Admin controls\n" +
    "• Saved broadcast statistics\n" +
    "• Custom notification workflows\n\n" +
    "🎯 <b>Best For:</b>\n" +
    "Businesses, communities, creators and online services.\n\n" +
    "💡 Helps organize regular communication with a large user base.\n\n" +
    "🚀 <b>Need a broadcast system?</b>\n" +
    "Share your requirements and start your project."
} else if (lang == "gujarati") {
  text =
    "📢 <b>BROADCAST & NOTIFICATION SYSTEMS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Telegram bot દ્વારા users ને important updates અને notifications efficiently મોકલી શકાય છે.\n\n" +
    "✨ <b>Example Features:</b>\n" +
    "• User broadcast\n" +
    "• Important announcements\n" +
    "• Notification system\n" +
    "• Active user management\n" +
    "• Blocked-user handling\n" +
    "• Delivery statistics\n" +
    "• Admin controls\n" +
    "• Saved broadcast statistics\n" +
    "• Custom notification workflows\n\n" +
    "🎯 <b>Best For:</b>\n" +
    "Businesses, communities, creators અને online services.\n\n" +
    "💡 Large user groups સાથે regular communication ને organized બનાવવામાં મદદ કરે છે.\n\n" +
    "🚀 <b>Broadcast system જોઈએ છે?</b>\n" +
    "તમારી requirements share કરો અને project શરૂ કરો."
} else {
  text =
    "📢 <b>BROADCAST & NOTIFICATION SYSTEMS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Telegram bot ke through users ko important updates aur notifications efficiently send ki ja sakti hain.\n\n" +
    "✨ <b>Example Features:</b>\n" +
    "• User broadcast\n" +
    "• Important announcements\n" +
    "• Notification system\n" +
    "• Active user management\n" +
    "• Blocked-user handling\n" +
    "• Delivery statistics\n" +
    "• Admin controls\n" +
    "• Saved broadcast statistics\n" +
    "• Custom notification workflows\n\n" +
    "🎯 <b>Best For:</b>\n" +
    "Businesses, communities, creators aur online services.\n\n" +
    "💡 Large user groups ke saath regular communication ko organized banane mein help karta hai.\n\n" +
    "🚀 <b>Need a broadcast system?</b>\n" +
    "Apni requirements share karein aur project start karein."
}

// ==========================================
// 🔘 BUTTON TEXT
// ==========================================

var buildBroadcast = "🚀 Build Broadcast Bot"
var viewDemos = "🎬 View Demos"
var pricing = "💰 Pricing"
var portfolio = "📁 Portfolio"
var mainMenu = "🏠 Main Menu"

if (lang == "gujarati") {
  buildBroadcast = "🚀 Broadcast Bot બનાવો"
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
      text: buildBroadcast,
      callback_data: "BUILD_BROADCAST"
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

function showBroadcastPortfolio(messageText, inlineButtons) {
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
// 🚀 SHOW BROADCAST PORTFOLIO
// ==========================================

showBroadcastPortfolio(text, buttons)
