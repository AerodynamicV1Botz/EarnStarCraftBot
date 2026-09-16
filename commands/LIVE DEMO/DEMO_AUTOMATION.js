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

/*CMD
  command: DEMO_AUTOMATION
  need_reply: false
  folder: DEMOS
*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 181 — UPDATED VERSION
// COMMAND NAME: DEMO_AUTOMATION
// STEP 5.6 — BUSINESS AUTOMATION DEMO
// 📁 Live Demos → Automation
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

    "✨ <b>Demo Features</b>\n" +
    "• ⚡ Automated responses\n" +
    "• 📝 Automated forms\n" +
    "• 👤 User data collection\n" +
    "• 🔔 Automatic notifications\n" +
    "• 📢 Scheduled announcements\n" +
    "• 🔄 Multi-step workflows\n" +
    "• 🛡️ Admin controls\n" +
    "• 📊 Basic activity tracking\n\n" +

    "🔄 <b>Example Workflow</b>\n" +
    "User starts the bot → selects an option → submits information → system processes the request → user and admin receive updates.\n\n" +

    "💡 <b>Best For</b>\n" +
    "Businesses • Agencies • Creators • Communities • Service Providers\n\n" +

    "🚀 <b>Business Benefit</b>\n" +
    "Automate repetitive tasks, reduce manual work and keep your business workflow organized.\n\n" +

    "🎯 This is a showcase demo. The automation, forms, notifications and workflows can be customized according to your requirements."

} else if (lang == "gujarati") {

  text =
    "⚙️ <b>BUSINESS AUTOMATION BOT DEMO</b>\n\n" +

    "🤖 Repetitive business tasks automate કરવા અને સમય બચાવવા માટે smart Telegram workflow.\n\n" +

    "✨ <b>ડેમો ફીચર્સ</b>\n" +
    "• ⚡ Automated responses\n" +
    "• 📝 Automated forms\n" +
    "• 👤 User data collection\n" +
    "• 🔔 Automatic notifications\n" +
    "• 📢 Scheduled announcements\n" +
    "• 🔄 Multi-step workflows\n" +
    "• 🛡️ Admin controls\n" +
    "• 📊 Basic activity tracking\n\n" +

    "🔄 <b>Example Workflow</b>\n" +
    "User bot શરૂ કરે → option પસંદ કરે → information submit કરે → system request process કરે → user અને admin ને updates મળે.\n\n" +

    "💡 <b>કયા માટે ઉપયોગી</b>\n" +
    "Businesses • Agencies • Creators • Communities • Service Providers\n\n" +

    "🚀 <b>Business Benefit</b>\n" +
    "Repetitive tasks automate કરવા, manual work ઘટાડવા અને business workflow organized રાખવામાં મદદ કરે છે.\n\n" +

    "🎯 આ showcase demo છે. Automation, forms, notifications અને workflows તમારી requirements પ્રમાણે customize કરી શકાય છે."

} else {

  text =
    "⚙️ <b>BUSINESS AUTOMATION BOT DEMO</b>\n\n" +

    "🤖 Repetitive business tasks automate karne aur time save karne ke liye smart Telegram workflow.\n\n" +

    "✨ <b>Demo Features</b>\n" +
    "• ⚡ Automated responses\n" +
    "• 📝 Automated forms\n" +
    "• 👤 User data collection\n" +
    "• 🔔 Automatic notifications\n" +
    "• 📢 Scheduled announcements\n" +
    "• 🔄 Multi-step workflows\n" +
    "• 🛡️ Admin controls\n" +
    "• 📊 Basic activity tracking\n\n" +

    "🔄 <b>Example Workflow</b>\n" +
    "User bot start karta hai → option select karta hai → information submit karta hai → system request process karta hai → user aur admin ko updates milte hain.\n\n" +

    "💡 <b>Best For</b>\n" +
    "Businesses • Agencies • Creators • Communities • Service Providers\n\n" +

    "🚀 <b>Business Benefit</b>\n" +
    "Repetitive tasks automate karo, manual work kam karo aur apna business workflow organized rakho.\n\n" +

    "🎯 Ye showcase demo hai. Automation, forms, notifications aur workflows aapki requirements ke according customize kiye ja sakte hain."
}


// ==========================================
// 🔘 BUTTON TEXT
// ==========================================

var allDemos = "🎬 All Demos"
var mainMenu = "🏠 Main Menu"

if (lang == "gujarati") {
  allDemos = "🎬 બધા ડેમો"
  mainMenu = "🏠 મુખ્ય મેનુ"
}


// ==========================================
// 🔘 INLINE BUTTONS
// ==========================================
// Inner feature buttons removed.
// All automation details are shown on one page.

var buttons = [
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
    request &&
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
