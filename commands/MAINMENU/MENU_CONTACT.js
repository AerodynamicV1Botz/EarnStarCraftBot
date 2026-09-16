/*CMD
  command: MENU_CONTACT
  help: 
  need_reply: false
  auto_retry_time: 
  folder: MAINMENU

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 227 — UPDATED VERSION
// COMMAND NAME: MENU_CONTACT
// STEP 8.6
// 📁 MENU_CONTACT
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var userKey = "USER_" + uid

// ==========================================
// 👤 GET USER DATA
// ==========================================

var userData = Bot.getProperty(userKey) || {}
var language = userData.language || "hinglish"

// Support old language values
if (language === "en") {
  language = "english"
}

if (language === "gu") {
  language = "gujarati"
}

var text = ""
var buttons = []

// ==========================================
// 🇬🇧 ENGLISH
// ==========================================

if (language === "english") {

  text =
    "📞 <b>CONTACT EARNSTAR BOTCRAFT</b>\n\n" +

    "Need a custom Telegram bot or automation system?\n\n" +

    "👨‍💻 <b>Our team can help you with:</b>\n" +
    "• Custom Telegram bots\n" +
    "• Business automation\n" +
    "• Referral and reward systems\n" +
    "• Admin panels\n" +
    "• Payment and order systems\n\n" +

    "💬 Contact our team for requirements, pricing, and discussion.\n\n" +
    "👇 <b>Choose an option below:</b>"

  buttons = [
    [
      {
        text: "💬 Contact Team",
        url: "https://t.me/TeamEarnStar"
      }
    ],
    [
      {
        text: "🚀 Build My Bot",
        callback_data: "MENU_BUILD"
      }
    ],
    [
      {
        text: "🏠 Main Menu",
        callback_data: "MAIN_MENU"
      }
    ]
  ]

}

// ==========================================
// 🇬🇺 GUJARATI
// ==========================================

else if (language === "gujarati") {

  text =
    "📞 <b>EarnStar BOTCRAFT નો સંપર્ક</b>\n\n" +

    "તમારે Custom Telegram Bot અથવા Automation System જોઈએ છે?\n\n" +

    "👨‍💻 <b>અમારી Team તમને મદદ કરી શકે છે:</b>\n" +
    "• Custom Telegram Bots\n" +
    "• Business Automation\n" +
    "• Referral અને Reward Systems\n" +
    "• Admin Panels\n" +
    "• Payment અને Order Systems\n\n" +

    "💬 Requirements અને Pricing માટે અમારી Team નો સંપર્ક કરો.\n\n" +
    "👇 <b>નીચેનો option પસંદ કરો:</b>"

  buttons = [
    [
      {
        text: "💬 Team નો સંપર્ક કરો",
        url: "https://t.me/TeamEarnStar"
      }
    ],
    [
      {
        text: "🚀 મારું Bot બનાવો",
        callback_data: "MENU_BUILD"
      }
    ],
    [
      {
        text: "🏠 Main Menu",
        callback_data: "MAIN_MENU"
      }
    ]
  ]

}

// ==========================================
// 🇮🇳 HINGLISH
// ==========================================

else {

  text =
    "📞 <b>EARNSTAR BOTCRAFT SE CONTACT</b>\n\n" +

    "Aapko custom Telegram bot ya automation system chahiye?\n\n" +

    "👨‍💻 <b>Hamari team aapki help kar sakti hai:</b>\n" +
    "• Custom Telegram Bots\n" +
    "• Business Automation\n" +
    "• Referral aur Reward Systems\n" +
    "• Admin Panels\n" +
    "• Payment aur Order Systems\n\n" +

    "💬 Requirements aur pricing discuss karne ke liye team se contact karein.\n\n" +
    "👇 <b>Neeche option choose karein:</b>"

  buttons = [
    [
      {
        text: "💬 Team se Contact",
        url: "https://t.me/TeamEarnStar"
      }
    ],
    [
      {
        text: "🚀 Apna Bot Banaye",
        callback_data: "MENU_BUILD"
      }
    ],
    [
      {
        text: "🏠 Main Menu",
        callback_data: "MAIN_MENU"
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

  var replyMarkup = {
    inline_keyboard: keyboard
  }

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
        reply_markup: replyMarkup
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
    reply_markup: replyMarkup
  })

}

// ==========================================
// 🚀 SHOW CONTACT MENU
// ==========================================

showMenu(text, buttons)
