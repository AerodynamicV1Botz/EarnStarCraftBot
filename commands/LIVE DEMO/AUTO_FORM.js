/*CMD
  command: AUTO_FORM
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
// SCRIPT 183 — UPDATED VERSION
// COMMAND NAME: AUTO_FORM
// STEP 5.6.2 — AUTOMATED FORM DEMO
// 📁 Live Demos → Automation → Form
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
    "📝 <b>AUTOMATED FORM BOT DEMO</b>\n\n" +
    "🤖 A smart Telegram form system for collecting customer details in an organized way.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 👤 Name collection\n" +
    "• 📱 Contact details\n" +
    "• 🛒 Service or product selection\n" +
    "• 📋 Requirement collection\n" +
    "• 💾 Organized data storage\n" +
    "• 🔔 Admin notifications\n\n" +
    "💡 <b>Example:</b>\n" +
    "Name → Contact → Service → Requirement\n\n" +
    "🎯 This is a showcase demo. Forms can be customized according to your requirements."
} else if (lang == "gujarati") {
  text =
    "📝 <b>AUTOMATED FORM BOT DEMO</b>\n\n" +
    "🤖 Customer details organized રીતે collect કરવા માટે smart Telegram form system.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 👤 Name collection\n" +
    "• 📱 Contact details\n" +
    "• 🛒 Service અથવા product selection\n" +
    "• 📋 Requirement collection\n" +
    "• 💾 Organized data storage\n" +
    "• 🔔 Admin notifications\n\n" +
    "💡 <b>Example:</b>\n" +
    "Name → Contact → Service → Requirement\n\n" +
    "🎯 આ showcase demo છે. Forms તમારી requirements પ્રમાણે customize કરી શકાય છે."
} else {
  text =
    "📝 <b>AUTOMATED FORM BOT DEMO</b>\n\n" +
    "🤖 Customer details ko organized way mein collect karne ke liye smart Telegram form system.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 👤 Name collection\n" +
    "• 📱 Contact details\n" +
    "• 🛒 Service ya product selection\n" +
    "• 📋 Requirement collection\n" +
    "• 💾 Organized data storage\n" +
    "• 🔔 Admin notifications\n\n" +
    "💡 <b>Example:</b>\n" +
    "Name → Contact → Service → Requirement\n\n" +
    "🎯 Ye showcase demo hai. Forms aapki requirements ke according customize kiye ja sakte hain."
}

// ==========================================
// 🔘 BUTTON TEXT
// ==========================================

var backAutomation = "⚙️ Automation Menu"
var nextNotification = "🔔 Notification Demo"
var buildBot = "🚀 Build Similar Bot"
var allDemos = "🎬 All Demos"
var mainMenu = "🏠 Main Menu"

if (lang == "english") {
  backAutomation = "⚙️ Automation Menu"
  nextNotification = "🔔 Notification Demo"
  buildBot = "🚀 Build Similar Bot"
  allDemos = "🎬 All Demos"
  mainMenu = "🏠 Main Menu"
} else if (lang == "gujarati") {
  backAutomation = "⚙️ ઓટોમેશન મેનુ"
  nextNotification = "🔔 નોટિફિકેશન ડેમો"
  buildBot = "🚀 આવો બોટ બનાવો"
  allDemos = "🎬 બધા ડેમો"
  mainMenu = "🏠 મુખ્ય મેનુ"
}

// ==========================================
// 🔘 INLINE BUTTONS
// ==========================================

var buttons = [
  [
    {
      text: backAutomation,
      callback_data: "DEMO_AUTOMATION"
    },
    {
      text: nextNotification,
      callback_data: "AUTO_NOTIFICATION"
    }
  ],
  [
    {
      text: buildBot,
      callback_data: "ORDER_CUSTOM"
    }
  ],
  [
    {
      text: allDemos,
      callback_data: "MENU_DEMO"
    },
    {
      text: mainMenu,
      callback_data: "BACK_MAIN_MENU"
    }
  ]
]

// ==========================================
// ✏️ SAME MESSAGE EDIT + DELETE FALLBACK
// ==========================================

function showAutoFormMenu(messageText, inlineButtons) {
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
// 🚀 SHOW AUTO FORM DEMO
// ==========================================

showAutoFormMenu(text, buttons)
