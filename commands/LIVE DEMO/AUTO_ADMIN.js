/*CMD
  command: AUTO_ADMIN
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
// SCRIPT 186 — UPDATED VERSION
// COMMAND NAME: AUTO_ADMIN
// STEP 5.6.5 — ADMIN CONTROLS DEMO
// 📁 Live Demos → Automation → Admin Controls
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
    "🛡️ <b>ADMIN CONTROLS BOT DEMO</b>\n\n" +
    "🤖 A secure admin panel for managing users, requests, notifications, and business activity.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 👥 User management\n" +
    "• 📋 Request management\n" +
    "• 📢 Broadcast control\n" +
    "• 🔔 Notification management\n" +
    "• 📊 Activity overview\n" +
    "• ⚙️ Workflow control\n" +
    "• 🛡️ Admin-only access\n\n" +
    "💡 <b>Example:</b>\n" +
    "New Request → Admin Review → Status Update → Completed\n\n" +
    "🎯 This is a showcase demo. Admin controls can be customized according to your requirements."
} else if (lang == "gujarati") {
  text =
    "🛡️ <b>ADMIN CONTROLS BOT DEMO</b>\n\n" +
    "🤖 Users, requests, notifications અને business activity manage કરવા માટે secure admin panel.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 👥 User management\n" +
    "• 📋 Request management\n" +
    "• 📢 Broadcast control\n" +
    "• 🔔 Notification management\n" +
    "• 📊 Activity overview\n" +
    "• ⚙️ Workflow control\n" +
    "• 🛡️ Admin-only access\n\n" +
    "💡 <b>Example:</b>\n" +
    "New Request → Admin Review → Status Update → Completed\n\n" +
    "🎯 આ showcase demo છે. Admin controls તમારી requirements પ્રમાણે customize કરી શકાય છે."
} else {
  text =
    "🛡️ <b>ADMIN CONTROLS BOT DEMO</b>\n\n" +
    "🤖 Users, requests, notifications aur business activity manage karne ke liye secure admin panel.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 👥 User management\n" +
    "• 📋 Request management\n" +
    "• 📢 Broadcast control\n" +
    "• 🔔 Notification management\n" +
    "• 📊 Activity overview\n" +
    "• ⚙️ Workflow control\n" +
    "• 🛡️ Admin-only access\n\n" +
    "💡 <b>Example:</b>\n" +
    "New Request → Admin Review → Status Update → Completed\n\n" +
    "🎯 Ye showcase demo hai. Admin controls aapki requirements ke according customize kiye ja sakte hain."
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

function showAutoAdminMenu(messageText, inlineButtons) {
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
// 🚀 SHOW ADMIN CONTROLS DEMO
// ==========================================

showAutoAdminMenu(text, buttons)
