/*CMD
  command: AUTO_NOTIFICATION
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
// SCRIPT 184 — UPDATED VERSION
// COMMAND NAME: AUTO_NOTIFICATION
// STEP 5.6.3 — NOTIFICATION DEMO
// 📁 Live Demos → Automation → Notifications
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
    "🔔 <b>AUTOMATIC NOTIFICATION BOT DEMO</b>\n\n" +
    "🤖 A smart notification system that keeps users and admins updated automatically.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 📢 New announcement alerts\n" +
    "• 🛒 Order status notifications\n" +
    "• 💳 Payment updates\n" +
    "• 📦 Delivery updates\n" +
    "• 👤 User activity alerts\n" +
    "• 🛡️ Admin notifications\n" +
    "• ⏰ Scheduled reminders\n\n" +
    "💡 <b>Example:</b>\n" +
    "Order received → Processing → Shipped → Delivered\n\n" +
    "🎯 This is a showcase demo. Notifications can be customized according to your requirements."
} else if (lang == "gujarati") {
  text =
    "🔔 <b>AUTOMATIC NOTIFICATION BOT DEMO</b>\n\n" +
    "🤖 Users અને admins ને automatic updates આપવા માટે smart notification system.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 📢 New announcement alerts\n" +
    "• 🛒 Order status notifications\n" +
    "• 💳 Payment updates\n" +
    "• 📦 Delivery updates\n" +
    "• 👤 User activity alerts\n" +
    "• 🛡️ Admin notifications\n" +
    "• ⏰ Scheduled reminders\n\n" +
    "💡 <b>Example:</b>\n" +
    "Order received → Processing → Shipped → Delivered\n\n" +
    "🎯 આ showcase demo છે. Notifications તમારી requirements પ્રમાણે customize કરી શકાય છે."
} else {
  text =
    "🔔 <b>AUTOMATIC NOTIFICATION BOT DEMO</b>\n\n" +
    "🤖 Users aur admins ko automatic updates dene ke liye smart notification system.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 📢 New announcement alerts\n" +
    "• 🛒 Order status notifications\n" +
    "• 💳 Payment updates\n" +
    "• 📦 Delivery updates\n" +
    "• 👤 User activity alerts\n" +
    "• 🛡️ Admin notifications\n" +
    "• ⏰ Scheduled reminders\n\n" +
    "💡 <b>Example:</b>\n" +
    "Order received → Processing → Shipped → Delivered\n\n" +
    "🎯 Ye showcase demo hai. Notifications aapki requirements ke according customize ki ja sakti hain."
}

// ==========================================
// 🔘 BUTTON TEXT
// ==========================================

var backAutomation = "⚙️ Automation Menu"
var nextWorkflow = "🔄 Workflow Demo"
var buildBot = "🚀 Build Similar Bot"
var allDemos = "🎬 All Demos"
var mainMenu = "🏠 Main Menu"

if (lang == "english") {
  backAutomation = "⚙️ Automation Menu"
  nextWorkflow = "🔄 Workflow Demo"
  buildBot = "🚀 Build Similar Bot"
  allDemos = "🎬 All Demos"
  mainMenu = "🏠 Main Menu"
} else if (lang == "gujarati") {
  backAutomation = "⚙️ ઓટોમેશન મેનુ"
  nextWorkflow = "🔄 વર્કફ્લો ડેમો"
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
      text: nextWorkflow,
      callback_data: "AUTO_WORKFLOW"
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

function showAutoNotificationMenu(messageText, inlineButtons) {
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
// 🚀 SHOW NOTIFICATION DEMO
// ==========================================

showAutoNotificationMenu(text, buttons)
