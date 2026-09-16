/*CMD
  command: FAQ_CUSTOM
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 226 — UPDATED VERSION
// COMMAND NAME: FAQ_CUSTOM
// STEP 8.5
// 📁 FAQ_CUSTOM
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid

// ==========================================
// 👤 GET USER DATA
// ==========================================

var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// Support old language values
if (lang === "en") {
  lang = "english"
}

if (lang === "gu") {
  lang = "gujarati"
}

var text = ""
var buttons = []

// ==========================================
// 🇮🇳 HINGLISH
// ==========================================

if (lang === "hinglish") {

  text =
    "✨ <b>KYA CUSTOM BOT BAN SAKTA HAI?</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "Haan! Aapke business ya project ke according custom Telegram bot banaya ja sakta hai.\n\n" +

    "🛠️ <b>Custom Features:</b>\n" +
    "• Custom menus & buttons\n" +
    "• User registration & management\n" +
    "• Forms & lead collection\n" +
    "• Admin controls\n" +
    "• Notifications & broadcast\n" +
    "• Automated workflows\n" +
    "• Statistics & tracking\n" +
    "• Custom business logic\n" +
    "• API / external integrations\n\n" +

    "💡 Agar aapke mind mein koi unique idea hai, requirements share karke uska solution discuss kar sakte hain.\n\n" +

    "📌 <b>Custom projects ki pricing requirements ke according decide hoti hai.</b>"

  buttons = [
    [
      {
        text: "🚀 Start My Project",
        callback_data: "BUILD_CUSTOM"
      }
    ],
    [
      {
        text: "💰 View Pricing",
        callback_data: "MENU_PRICING"
      }
    ],
    [
      {
        text: "🎬 Live Demo",
        callback_data: "MENU_DEMO"
      }
    ],
    [
      {
        text: "❓ More FAQs",
        callback_data: "MENU_FAQ"
      }
    ],
    [
      {
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]

}

// ==========================================
// 🇬🇧 ENGLISH
// ==========================================

else if (lang === "english") {

  text =
    "✨ <b>CAN YOU BUILD A CUSTOM BOT?</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "Yes! We can build a custom Telegram bot based on your business or project requirements.\n\n" +

    "🛠️ <b>Custom Features:</b>\n" +
    "• Custom menus & buttons\n" +
    "• User registration & management\n" +
    "• Forms & lead collection\n" +
    "• Admin controls\n" +
    "• Notifications & broadcast\n" +
    "• Automated workflows\n" +
    "• Statistics & tracking\n" +
    "• Custom business logic\n" +
    "• API / external integrations\n\n" +

    "💡 Have a unique idea? Share your requirements and we can discuss a suitable solution.\n\n" +

    "📌 <b>Custom project pricing depends on the requirements.</b>"

  buttons = [
    [
      {
        text: "🚀 Start My Project",
        callback_data: "BUILD_CUSTOM"
      }
    ],
    [
      {
        text: "💰 View Pricing",
        callback_data: "MENU_PRICING"
      }
    ],
    [
      {
        text: "🎬 Live Demo",
        callback_data: "MENU_DEMO"
      }
    ],
    [
      {
        text: "❓ More FAQs",
        callback_data: "MENU_FAQ"
      }
    ],
    [
      {
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]

}

// ==========================================
// 🇮🇳 GUJARATI
// ==========================================

else if (lang === "gujarati") {

  text =
    "✨ <b>CUSTOM BOT બનાવી શકાય છે?</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "હા! તમારા business અથવા project ની requirements પ્રમાણે custom Telegram bot બનાવી શકાય છે.\n\n" +

    "🛠️ <b>Custom Features:</b>\n" +
    "• Custom menus & buttons\n" +
    "• User registration & management\n" +
    "• Forms & lead collection\n" +
    "• Admin controls\n" +
    "• Notifications & broadcast\n" +
    "• Automated workflows\n" +
    "• Statistics & tracking\n" +
    "• Custom business logic\n" +
    "• API / external integrations\n\n" +

    "💡 તમારા mind માં કોઈ unique idea હોય તો requirements share કરીને solution discuss કરી શકો છો.\n\n" +

    "📌 <b>Custom project ની pricing requirements પ્રમાણે નક્કી થાય છે.</b>"

  buttons = [
    [
      {
        text: "🚀 મારું Project શરૂ કરો",
        callback_data: "BUILD_CUSTOM"
      }
    ],
    [
      {
        text: "💰 Pricing જુઓ",
        callback_data: "MENU_PRICING"
      }
    ],
    [
      {
        text: "🎬 Live Demo",
        callback_data: "MENU_DEMO"
      }
    ],
    [
      {
        text: "❓ વધુ FAQs",
        callback_data: "MENU_FAQ"
      }
    ],
    [
      {
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]

}

// ==========================================
// 🔄 UNKNOWN LANGUAGE FALLBACK
// ==========================================

else {

  text =
    "✨ <b>CUSTOM BOT</b>\n\n" +
    "Please select your preferred language first."

  buttons = [
    [
      {
        text: "🌐 Change Language",
        callback_data: "CHANGE_LANGUAGE"
      }
    ],
    [
      {
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]

}

// ==========================================
// ✅ ANSWER CALLBACK
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
// 📤 SAME MESSAGE EDIT + DELETE FALLBACK
// ==========================================

function showMenu(messageText, keyboard) {

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
          inline_keyboard: keyboard
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
      inline_keyboard: keyboard
    }
  })

}

// ==========================================
// 🚀 SHOW FAQ CUSTOM
// ==========================================

showMenu(text, buttons)
