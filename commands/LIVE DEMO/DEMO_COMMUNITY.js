/*CMD
  command: DEMO_COMMUNITY
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
// SCRIPT 127 — UPDATED VERSION
// COMMAND NAME: DEMO_COMMUNITY
// STEP 5.4 — COMMUNITY MANAGEMENT DEMO
// 📁 Live Demos → Community Demo
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// ---------- CALLBACK ANSWER ----------
if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

// ---------- TEXT ----------
var text = ""

if (lang == "english") {
  text =
    "👥 <b>COMMUNITY MANAGEMENT BOT DEMO</b>\n\n" +
    "🤖 A Telegram bot designed to help communities manage members, information and common tasks from one place.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 👋 Welcome system\n" +
    "• 📋 Community rules & information\n" +
    "• 👤 Member information\n" +
    "• 📢 Announcements\n" +
    "• ❓ FAQ system\n" +
    "• 📝 Member requests\n" +
    "• 🛡️ Admin controls\n" +
    "• 🔔 Important notifications\n\n" +
    "💡 <b>Best for:</b>\n" +
    "Communities • Clubs • Creator groups • Business groups\n\n" +
    "🎯 This is a showcase demo. Features and workflows can be customized."

} else if (lang == "gujarati") {
  text =
    "👥 <b>COMMUNITY MANAGEMENT BOT DEMO</b>\n\n" +
    "🤖 Community ના members, information અને common tasks manage કરવા માટે Telegram bot.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 👋 Welcome system\n" +
    "• 📋 Community rules અને information\n" +
    "• 👤 Member information\n" +
    "• 📢 Announcements\n" +
    "• ❓ FAQ system\n" +
    "• 📝 Member requests\n" +
    "• 🛡️ Admin controls\n" +
    "• 🔔 Important notifications\n\n" +
    "💡 <b>Best for:</b>\n" +
    "Communities • Clubs • Creator groups • Business groups\n\n" +
    "🎯 આ showcase demo છે. Features અને workflows customize કરી શકાય છે."

} else {
  text =
    "👥 <b>COMMUNITY MANAGEMENT BOT DEMO</b>\n\n" +
    "🤖 Community ke members, information aur common tasks manage karne ke liye Telegram bot.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 👋 Welcome system\n" +
    "• 📋 Community rules & information\n" +
    "• 👤 Member information\n" +
    "• 📢 Announcements\n" +
    "• ❓ FAQ system\n" +
    "• 📝 Member requests\n" +
    "• 🛡️ Admin controls\n" +
    "• 🔔 Important notifications\n\n" +
    "💡 <b>Best for:</b>\n" +
    "Communities • Clubs • Creator groups • Business groups\n\n" +
    "🎯 Ye showcase demo hai. Features aur workflows customize kiye ja sakte hain."
}

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: "👋 Welcome Demo",
      callback_data: "COMMUNITY_WELCOME"
    },
    {
      text: "📋 Rules & Info",
      callback_data: "COMMUNITY_RULES"
    }
  ],
  [
    {
      text: "📝 Member Request",
      callback_data: "COMMUNITY_REQUEST"
    },
    {
      text: "📢 Announcements",
      callback_data: "COMMUNITY_ANNOUNCE"
    }
  ],
  [
    {
      text: "🛡️ Admin Features",
      callback_data: "COMMUNITY_ADMIN"
    }
  ],
  [
    {
      text: "🚀 Build Similar Bot",
      callback_data: "ORDER_CUSTOM"
    }
  ],
  [
    {
      text: "🎬 All Demos",
      callback_data: "MENU_DEMO"
    },
    {
      text: "🏠 Main Menu",
      callback_data: "BACK_MAIN_MENU"
    }
  ]
]

// ---------- SAME MESSAGE EDIT ----------
function showCommunityDemo(text, buttons) {
  if (
    typeof request !== "undefined" &&
    request.message &&
    request.message.message_id
  ) {
    try {
      Api.editMessageText({
        chat_id: uid,
        message_id: request.message.message_id,
        text: text,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: buttons
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
    text: text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons
    }
  })
}

// ---------- SHOW COMMUNITY DEMO ----------
showCommunityDemo(text, buttons)
