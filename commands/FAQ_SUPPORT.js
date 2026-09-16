/*CMD
  command: FAQ_SUPPORT
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
// SCRIPT 225 — UPDATED VERSION
// COMMAND NAME: FAQ_SUPPORT
// STEP 8.4
// 📁 FAQ_SUPPORT
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
    "🛟 <b>PROJECT KE BAAD SUPPORT MILEGA?</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "Haan! Project delivery ke baad bhi agar bot ke regarding help chahiye ho, aap hamari team se contact kar sakte hain.\n\n" +

    "🔧 <b>Support mein:</b>\n" +
    "• Basic troubleshooting\n" +
    "• Bot configuration help\n" +
    "• Feature-related guidance\n" +
    "• Minor fixes / revisions\n" +
    "• Project-related assistance\n\n" +

    "📌 Support aur additional changes project/package ke scope ke according ho sakte hain.\n\n" +

    "💬 <b>Need help?</b>\n" +
    "Hamari team se contact karein aur apni requirement share karein."

  buttons = [
    [
      {
        text: "📞 Contact Team",
        callback_data: "CONTACT_TEAM"
      }
    ],
    [
      {
        text: "🚀 Build My Bot",
        callback_data: "BUILD_CUSTOM"
      }
    ],
    [
      {
        text: "💰 Pricing",
        callback_data: "MENU_PRICING"
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
    "🛟 <b>DO YOU PROVIDE SUPPORT AFTER DELIVERY?</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "Yes! You can contact our team if you need help with your bot after delivery.\n\n" +

    "🔧 <b>Support may include:</b>\n" +
    "• Basic troubleshooting\n" +
    "• Bot configuration help\n" +
    "• Feature-related guidance\n" +
    "• Minor fixes / revisions\n" +
    "• Project-related assistance\n\n" +

    "📌 Support and additional changes may depend on the project or package scope.\n\n" +

    "💬 <b>Need help?</b>\n" +
    "Contact our team and share your requirements."

  buttons = [
    [
      {
        text: "📞 Contact Team",
        callback_data: "CONTACT_TEAM"
      }
    ],
    [
      {
        text: "🚀 Build My Bot",
        callback_data: "BUILD_CUSTOM"
      }
    ],
    [
      {
        text: "💰 Pricing",
        callback_data: "MENU_PRICING"
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
    "🛟 <b>DELIVERY પછી SUPPORT મળશે?</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "હા! Bot delivery પછી પણ જો તમને help જોઈએ તો અમારી team નો contact કરી શકો છો.\n\n" +

    "🔧 <b>Support માં:</b>\n" +
    "• Basic troubleshooting\n" +
    "• Bot configuration help\n" +
    "• Feature-related guidance\n" +
    "• Minor fixes / revisions\n" +
    "• Project-related assistance\n\n" +

    "📌 Support અને additional changes project/package ના scope પ્રમાણે હોઈ શકે છે.\n\n" +

    "💬 <b>Help જોઈએ છે?</b>\n" +
    "અમારી team ને contact કરો અને તમારી requirement share કરો."

  buttons = [
    [
      {
        text: "📞 Contact Team",
        callback_data: "CONTACT_TEAM"
      }
    ],
    [
      {
        text: "🚀 મારું Bot બનાવો",
        callback_data: "BUILD_CUSTOM"
      }
    ],
    [
      {
        text: "💰 Pricing",
        callback_data: "MENU_PRICING"
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
    "🛟 <b>PROJECT SUPPORT</b>\n\n" +
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
// 🚀 SHOW FAQ SUPPORT
// ==========================================

showMenu(text, buttons)
