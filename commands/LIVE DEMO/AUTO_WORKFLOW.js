/*CMD
  command: AUTO_WORKFLOW
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
// SCRIPT 185 — UPDATED VERSION
// COMMAND NAME: AUTO_WORKFLOW
// STEP 5.6.4 — WORKFLOW DEMO
// 📁 Live Demos → Automation → Workflow
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
    "🔄 <b>AUTOMATED WORKFLOW BOT DEMO</b>\n\n" +
    "🤖 A smart workflow system that connects multiple business steps into one organized process.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 📝 Form submission\n" +
    "• 👤 Data collection\n" +
    "• 🔔 Automatic notifications\n" +
    "• 🛡️ Admin review\n" +
    "• 📊 Status updates\n" +
    "• ✅ Task completion\n\n" +
    "💡 <b>Example Workflow:</b>\n" +
    "Customer Request → Admin Review → Processing → Completed\n\n" +
    "🎯 This is a showcase demo. Workflows can be customized according to your requirements."
} else if (lang == "gujarati") {
  text =
    "🔄 <b>AUTOMATED WORKFLOW BOT DEMO</b>\n\n" +
    "🤖 Business ના અલગ-અલગ steps ને એક organized process માં જોડતી smart workflow system.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 📝 Form submission\n" +
    "• 👤 Data collection\n" +
    "• 🔔 Automatic notifications\n" +
    "• 🛡️ Admin review\n" +
    "• 📊 Status updates\n" +
    "• ✅ Task completion\n\n" +
    "💡 <b>Example Workflow:</b>\n" +
    "Customer Request → Admin Review → Processing → Completed\n\n" +
    "🎯 આ showcase demo છે. Workflows તમારી requirements પ્રમાણે customize કરી શકાય છે."
} else {
  text =
    "🔄 <b>AUTOMATED WORKFLOW BOT DEMO</b>\n\n" +
    "🤖 Business ke alag-alag steps ko ek organized process mein connect karne wali smart workflow system.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 📝 Form submission\n" +
    "• 👤 Data collection\n" +
    "• 🔔 Automatic notifications\n" +
    "• 🛡️ Admin review\n" +
    "• 📊 Status updates\n" +
    "• ✅ Task completion\n\n" +
    "💡 <b>Example Workflow:</b>\n" +
    "Customer Request → Admin Review → Processing → Completed\n\n" +
    "🎯 Ye showcase demo hai. Workflows aapki requirements ke according customize kiye ja sakte hain."
}

// ==========================================
// 🔘 BUTTON TEXT
// ==========================================

var backAutomation = "⚙️ Automation Menu"
var nextAdmin = "🛡️ Admin Controls"
var buildBot = "🚀 Build Similar Bot"
var allDemos = "🎬 All Demos"
var mainMenu = "🏠 Main Menu"

if (lang == "english") {
  backAutomation = "⚙️ Automation Menu"
  nextAdmin = "🛡️ Admin Controls"
  buildBot = "🚀 Build Similar Bot"
  allDemos = "🎬 All Demos"
  mainMenu = "🏠 Main Menu"
} else if (lang == "gujarati") {
  backAutomation = "⚙️ ઓટોમેશન મેનુ"
  nextAdmin = "🛡️ એડમિન કંટ્રોલ્સ"
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
      text: nextAdmin,
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

function showAutoWorkflowMenu(messageText, inlineButtons) {
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
// 🚀 SHOW WORKFLOW DEMO
// ==========================================

showAutoWorkflowMenu(text, buttons)
