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

/*CMD
  command: DEMO_COMMUNITY
  need_reply: false
  folder: DEMOS
*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 127 — UPDATED VERSION
// COMMAND NAME: DEMO_COMMUNITY
// STEP 5.4 — COMMUNITY MANAGEMENT DEMO
// 📁 Live Demos → Community Demo
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ One-Page Demo
// ✅ Same Message Edit + Delete Fallback
// ==========================================


// ==========================================
// 👤 USER DATA
// ==========================================

var uid = String(user.telegramid)

var userData =
  Bot.getProperty("USER_" + uid) || {}

var lang =
  userData.language || "hinglish"


// ==========================================
// CALLBACK ANSWER
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
// TEXT
// ==========================================

var text = ""

if (lang == "english") {

  text =
    "👥 <b>COMMUNITY MANAGEMENT BOT DEMO</b>\n\n" +

    "🤖 A Telegram bot designed to help communities manage members, information and common tasks from one place.\n\n" +

    "✨ <b>Demo Features</b>\n" +
    "• 👋 Welcome system for new members\n" +
    "• 📋 Community rules and important information\n" +
    "• 👤 Member information and basic management\n" +
    "• 📢 Announcements and broadcast messages\n" +
    "• ❓ FAQ and frequently asked questions\n" +
    "• 📝 Member requests and submissions\n" +
    "• 🛡️ Admin controls and moderation tools\n" +
    "• 🔔 Important alerts and notifications\n\n" +

    "💡 <b>Best For</b>\n" +
    "Communities • Clubs • Creator Groups • Business Groups • Online Networks\n\n" +

    "🎯 <b>Customization</b>\n" +
    "This is a showcase demo. Welcome messages, rules, member requests, announcements, admin controls and other workflows can be customized according to your community.\n\n" +

    "🚀 <b>Want a similar bot?</b>\n" +
    "You can request a custom community management bot for your own group or community."

} else if (lang == "gujarati") {

  text =
    "👥 <b>COMMUNITY MANAGEMENT BOT DEMO</b>\n\n" +

    "🤖 Community ના members, information અને common tasks એક જ જગ્યાએ manage કરવા માટે Telegram bot.\n\n" +

    "✨ <b>Demo Features</b>\n" +
    "• 👋 નવા members માટે Welcome system\n" +
    "• 📋 Community rules અને important information\n" +
    "• 👤 Member information અને basic management\n" +
    "• 📢 Announcements અને broadcast messages\n" +
    "• ❓ FAQ અને frequently asked questions\n" +
    "• 📝 Member requests અને submissions\n" +
    "• 🛡️ Admin controls અને moderation tools\n" +
    "• 🔔 Important alerts અને notifications\n\n" +

    "💡 <b>Best For</b>\n" +
    "Communities • Clubs • Creator Groups • Business Groups • Online Networks\n\n" +

    "🎯 <b>Customization</b>\n" +
    "આ showcase demo છે. Welcome messages, rules, member requests, announcements, admin controls અને અન્ય workflows તમારી community પ્રમાણે customize કરી શકાય છે.\n\n" +

    "🚀 <b>Similar bot જોઈએ છે?</b>\n" +
    "તમારા group અથવા community માટે custom community management bot બનાવી શકાય છે."

} else {

  text =
    "👥 <b>COMMUNITY MANAGEMENT BOT DEMO</b>\n\n" +

    "🤖 Community ke members, information aur common tasks ek hi jagah manage karne ke liye Telegram bot.\n\n" +

    "✨ <b>Demo Features</b>\n" +
    "• 👋 New members ke liye Welcome system\n" +
    "• 📋 Community rules aur important information\n" +
    "• 👤 Member information aur basic management\n" +
    "• 📢 Announcements aur broadcast messages\n" +
    "• ❓ FAQ aur frequently asked questions\n" +
    "• 📝 Member requests aur submissions\n" +
    "• 🛡️ Admin controls aur moderation tools\n" +
    "• 🔔 Important alerts aur notifications\n\n" +

    "💡 <b>Best For</b>\n" +
    "Communities • Clubs • Creator Groups • Business Groups • Online Networks\n\n" +

    "🎯 <b>Customization</b>\n" +
    "Ye showcase demo hai. Welcome messages, rules, member requests, announcements, admin controls aur other workflows aapki community ke according customize kiye ja sakte hain.\n\n" +

    "🚀 <b>Similar bot chahiye?</b>\n" +
    "Aapke group ya community ke liye custom community management bot banaya ja sakta hai."
}


// ==========================================
// BUTTONS
// ==========================================
// Inner feature buttons removed.
// All information is now shown on one page.

var buttons = [
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


// ==========================================
// SAME MESSAGE EDIT
// ==========================================

function showCommunityDemo(text, buttons) {

  if (
    typeof request !== "undefined" &&
    request &&
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


// ==========================================
// SHOW COMMUNITY DEMO
// ==========================================

showCommunityDemo(text, buttons)
