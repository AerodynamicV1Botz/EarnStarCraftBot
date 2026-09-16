/*CMD
  command: FAQ_PRICING
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
// SCRIPT 223 — UPDATED VERSION
// COMMAND NAME: FAQ_PRICING
// STEP 8.2
// 📁 FAQ_PRICING
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
    "💰 <b>PRICING KAISE DECIDE HOTA HAI?</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "Bot ki price uske features, complexity aur requirements ke according decide hoti hai.\n\n" +

    "🟢 <b>Starter</b> — ₹499+\n" +
    "Basic bot aur simple business flows.\n\n" +

    "🔵 <b>Business</b> — ₹1,499+\n" +
    "Advanced features, user management aur automation.\n\n" +

    "🟣 <b>Professional</b> — ₹2,999+\n" +
    "Advanced automation, workflows, statistics aur custom logic.\n\n" +

    "✨ <b>Custom</b>\n" +
    "Complex requirements ke liye custom quotation.\n\n" +

    "📌 Final price requirements discuss karne ke baad confirm ki jaati hai."

  buttons = [
    [
      {
        text: "💰 View Full Pricing",
        callback_data: "MENU_PRICING"
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
    "💰 <b>HOW IS PRICING DECIDED?</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "Pricing depends on the features, complexity and requirements of your bot.\n\n" +

    "🟢 <b>Starter</b> — ₹499+\n" +
    "Basic bot and simple business flows.\n\n" +

    "🔵 <b>Business</b> — ₹1,499+\n" +
    "Advanced features, user management and automation.\n\n" +

    "🟣 <b>Professional</b> — ₹2,999+\n" +
    "Advanced automation, workflows, statistics and custom logic.\n\n" +

    "✨ <b>Custom</b>\n" +
    "Custom quotation for complex requirements.\n\n" +

    "📌 Final pricing is confirmed after discussing your requirements."

  buttons = [
    [
      {
        text: "💰 View Full Pricing",
        callback_data: "MENU_PRICING"
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
    "💰 <b>PRICING કેવી રીતે નક્કી થાય છે?</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "Bot ની price તેના features, complexity અને requirements પ્રમાણે નક્કી થાય છે.\n\n" +

    "🟢 <b>Starter</b> — ₹499+\n" +
    "Basic bot અને simple business flows.\n\n" +

    "🔵 <b>Business</b> — ₹1,499+\n" +
    "Advanced features, user management અને automation.\n\n" +

    "🟣 <b>Professional</b> — ₹2,999+\n" +
    "Advanced automation, workflows, statistics અને custom logic.\n\n" +

    "✨ <b>Custom</b>\n" +
    "Complex requirements માટે custom quotation.\n\n" +

    "📌 Final price requirements discuss કર્યા પછી confirm થાય છે."

  buttons = [
    [
      {
        text: "💰 Full Pricing જુઓ",
        callback_data: "MENU_PRICING"
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
    "💰 <b>BOT PRICING</b>\n\n" +
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
// 🚀 SHOW FAQ PRICING
// ==========================================

showMenu(text, buttons)
