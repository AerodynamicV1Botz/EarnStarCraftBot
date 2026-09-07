/*CMD
  command: DEMO_AUTOMATION
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
// SCRIPT 181 — UPDATED VERSION
// COMMAND NAME: DEMO_AUTOMATION
// STEP 5.6 — BUSINESS AUTOMATION DEMO
// 📁 Live Demos → Automation
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
    "⚙️ <b>BUSINESS AUTOMATION BOT DEMO</b>\n\n" +
    "🤖 A smart Telegram workflow designed to automate repetitive business tasks and save time.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• ⚡ Automated responses\n" +
    "• 📝 Automated forms\n" +
    "• 👤 User data collection\n" +
    "• 🔔 Automatic notifications\n" +
    "• 📢 Scheduled announcements\n" +
    "• 🔄 Multi-step workflows\n" +
    "• 🛡️ Admin controls\n" +
    "• 📊 Basic activity tracking\n\n" +
    "💡 <b>Best for:</b>\n" +
    "Businesses • Agencies • Creators • Communities\n\n" +
    "🚀 Automate repetitive tasks and keep your workflow organized.\n\n" +
    "🎯 This is a showcase demo. The automation can be customized according to your requirements."
} else if (lang == "gujarati") {
  text =
    "⚙️ <b>BUSINESS AUTOMATION BOT DEMO</b>\n\n" +
    "🤖 Repetitive business tasks automate કરવા અને સમય બચાવવા માટે smart Telegram workflow.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• ⚡ Automated responses\n" +
    "• 📝 Automated forms\n" +
    "• 👤 User data collection\n" +
    "• 🔔 Automatic notifications\n" +
    "• 📢 Scheduled announcements\n" +
    "• 🔄 Multi-step workflows\n" +
    "• 🛡️ Admin controls\n" +
    "• 📊 Basic activity tracking\n\n" +
    "💡 <b>Best for:</b>\n" +
    "Businesses • Agencies • Creators • Communities\n\n" +
    "🚀 Repetitive tasks automate કરીને workflow organized રાખો.\n\n" +
    "🎯 આ showcase demo છે. Requirements પ્રમાણે automation customize કરી શકાય છે."
} else {
  text =
    "⚙️ <b>BUSINESS AUTOMATION BOT DEMO</b>\n\n" +
    "🤖 Repetitive business tasks automate karne aur time save karne ke liye smart Telegram workflow.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• ⚡ Automated responses\n" +
    "• 📝 Automated forms\n" +
    "• 👤 User data collection\n" +
    "• 🔔 Automatic notifications\n" +
    "• 📢 Scheduled announcements\n" +
    "• 🔄 Multi-step workflows\n" +
    "• 🛡️ Admin controls\n" +
    "• 📊 Basic activity tracking\n\n" +
    "💡 <b>Best for:</b>\n" +
    "Businesses • Agencies • Creators • Communities\n\n" +
    "🚀 Repetitive tasks automate karo aur apna workflow organized rakho.\n\n" +
    "🎯 Ye showcase demo hai. Automation requirements ke according customize ki ja sakti hai."
}

// ==========================================
// 🔘 BUTTON TEXT
// ==========================================

var autoReply = "⚡ Auto Reply Demo"
var autoForm = "📝 Form Demo"
var autoNotification = "🔔 Notification Demo"
var autoWorkflow = "🔄 Workflow Demo"
var autoAdmin = "🛡️ Admin Controls"
var buildBot = "🚀 Build Similar Bot"
var allDemos = "🎬 All Demos"
var mainMenu = "🏠 Main Menu"

if (lang == "english") {
  autoReply = "⚡ Auto Reply Demo"
  autoForm = "📝 Form Demo"
  autoNotification = "🔔 Notification Demo"
  autoWorkflow = "🔄 Workflow Demo"
  autoAdmin = "🛡️ Admin Controls"
  buildBot = "🚀 Build Similar Bot"
  allDemos = "🎬 All Demos"
  mainMenu = "🏠 Main Menu"
} else if (lang == "gujarati") {
  autoReply = "⚡ ઓટો રિપ્લાય ડેમો"
  autoForm = "📝 ફોર્મ ડેમો"
  autoNotification = "🔔 નોટિફિકેશન ડેમો"
  autoWorkflow = "🔄 વર્કફ્લો ડેમો"
  autoAdmin = "🛡️ એડમિન કંટ્રોલ્સ"
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
      text: autoReply,
      callback_data: "AUTO_REPLY"
    },
    {
      text: autoForm,
      callback_data: "AUTO_FORM"
    }
  ],
  [
    {
      text: autoNotification,
      callback_data: "AUTO_NOTIFICATION"
    },
    {
      text: autoWorkflow,
      callback_data: "AUTO_WORKFLOW"
    }
  ],
  [
    {
      text: autoAdmin,
      callback_data: "AUTO_ADMIN"
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

function showAutomationMenu(messageText, inlineButtons) {
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
// 🚀 SHOW AUTOMATION DEMO
// ==========================================

showAutomationMenu(text, buttons)
