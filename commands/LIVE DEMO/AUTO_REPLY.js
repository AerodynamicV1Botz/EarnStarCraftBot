/*CMD
  command: AUTO_REPLY
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
// SCRIPT 182 — UPDATED VERSION
// COMMAND NAME: AUTO_REPLY
// STEP 5.6.1 — AUTO REPLY DEMO
// 📁 Live Demos → Automation → Auto Reply
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
    "⚡ <b>AUTO REPLY BOT DEMO</b>\n\n" +
    "🤖 A smart system that automatically replies to common customer messages.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 👋 Welcome messages\n" +
    "• 💬 Keyword-based replies\n" +
    "• 📋 FAQ auto responses\n" +
    "• 🕒 Away messages\n" +
    "• 🛒 Order-related replies\n\n" +
    "💡 <b>Example:</b>\n" +
    "Customer: Hello\n" +
    "Bot: Hi! How can we help you today?\n\n" +
    "🎯 This is a showcase demo. Replies can be customized for your business."
} else if (lang == "gujarati") {
  text =
    "⚡ <b>AUTO REPLY BOT DEMO</b>\n\n" +
    "🤖 Common customer messages ના automatic replies આપતી smart system.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 👋 Welcome messages\n" +
    "• 💬 Keyword-based replies\n" +
    "• 📋 FAQ auto responses\n" +
    "• 🕒 Away messages\n" +
    "• 🛒 Order-related replies\n\n" +
    "💡 <b>Example:</b>\n" +
    "Customer: Hello\n" +
    "Bot: Hi! આજે અમે તમને કેવી રીતે મદદ કરી શકીએ?\n\n" +
    "🎯 આ showcase demo છે. Replies તમારી business requirements પ્રમાણે customize કરી શકાય છે."
} else {
  text =
    "⚡ <b>AUTO REPLY BOT DEMO</b>\n\n" +
    "🤖 Common customer messages ka automatic reply dene wali smart system.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 👋 Welcome messages\n" +
    "• 💬 Keyword-based replies\n" +
    "• 📋 FAQ auto responses\n" +
    "• 🕒 Away messages\n" +
    "• 🛒 Order-related replies\n\n" +
    "💡 <b>Example:</b>\n" +
    "Customer: Hello\n" +
    "Bot: Hi! Aaj hum aapki kaise help kar sakte hain?\n\n" +
    "🎯 Ye showcase demo hai. Replies aapke business ke according customize ki ja sakti hain."
}

// ==========================================
// 🔘 BUTTON TEXT
// ==========================================

var backAutomation = "⚙️ Automation Menu"
var buildBot = "🚀 Build Similar Bot"
var allDemos = "🎬 All Demos"
var mainMenu = "🏠 Main Menu"

if (lang == "english") {
  backAutomation = "⚙️ Automation Menu"
  buildBot = "🚀 Build Similar Bot"
  allDemos = "🎬 All Demos"
  mainMenu = "🏠 Main Menu"
} else if (lang == "gujarati") {
  backAutomation = "⚙️ ઓટોમેશન મેનુ"
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

function showAutoReplyMenu(messageText, inlineButtons) {
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
// 🚀 SHOW AUTO REPLY DEMO
// ==========================================

showAutoReplyMenu(text, buttons)
