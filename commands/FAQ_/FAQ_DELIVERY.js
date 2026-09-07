/*CMD
  command: FAQ_DELIVERY
  help: 
  need_reply: false
  auto_retry_time: 
  folder: FAQ?

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 224 — UPDATED VERSION
// COMMAND NAME: FAQ_DELIVERY
// STEP 8.3
// 📁 FAQ_DELIVERY
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
    "⏱️ <b>BOT DELIVERY KITNE TIME MEIN HOTI HAI?</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "Delivery time project ki complexity aur requirements par depend karta hai.\n\n" +

    "🟢 <b>Simple Bot</b>\n" +
    "Usually basic features ke liye shorter development time.\n\n" +

    "🔵 <b>Business Bot</b>\n" +
    "Advanced features aur automation ke according time vary karta hai.\n\n" +

    "🟣 <b>Professional / Custom Bot</b>\n" +
    "Complex workflows, integrations aur custom systems ke liye additional development time lag sakta hai.\n\n" +

    "📋 <b>Process:</b>\n" +
    "1️⃣ Requirements discuss\n" +
    "2️⃣ Features confirm\n" +
    "3️⃣ Development\n" +
    "4️⃣ Testing\n" +
    "5️⃣ Final delivery\n\n" +

    "📌 Exact delivery timeline project confirm hone ke baad batayi jaati hai."

  buttons = [
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
    "⏱️ <b>HOW LONG DOES DELIVERY TAKE?</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "Delivery time depends on the project's complexity and requirements.\n\n" +

    "🟢 <b>Simple Bot</b>\n" +
    "Basic projects usually require less development time.\n\n" +

    "🔵 <b>Business Bot</b>\n" +
    "Timeline depends on the requested features and automation.\n\n" +

    "🟣 <b>Professional / Custom Bot</b>\n" +
    "Complex workflows, integrations and custom systems may require additional development time.\n\n" +

    "📋 <b>Process:</b>\n" +
    "1️⃣ Requirements discussion\n" +
    "2️⃣ Feature confirmation\n" +
    "3️⃣ Development\n" +
    "4️⃣ Testing\n" +
    "5️⃣ Final delivery\n\n" +

    "📌 An exact timeline is provided after the project requirements are confirmed."

  buttons = [
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
    "⏱️ <b>BOT DELIVERY કેટલા સમયમાં થાય છે?</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "Delivery time project ની complexity અને requirements પર depend કરે છે.\n\n" +

    "🟢 <b>Simple Bot</b>\n" +
    "Basic project માટે સામાન્ય રીતે ઓછો development time લાગે છે.\n\n" +

    "🔵 <b>Business Bot</b>\n" +
    "Features અને automation પ્રમાણે સમય બદલાઈ શકે છે.\n\n" +

    "🟣 <b>Professional / Custom Bot</b>\n" +
    "Complex workflows, integrations અને custom systems માટે વધારે development time લાગી શકે છે.\n\n" +

    "📋 <b>Process:</b>\n" +
    "1️⃣ Requirements discuss\n" +
    "2️⃣ Features confirm\n" +
    "3️⃣ Development\n" +
    "4️⃣ Testing\n" +
    "5️⃣ Final delivery\n\n" +

    "📌 Exact delivery timeline project confirm થયા પછી જણાવવામાં આવે છે."

  buttons = [
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
    "⏱️ <b>BOT DELIVERY</b>\n\n" +
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
// 🚀 SHOW FAQ DELIVERY
// ==========================================

showMenu(text, buttons)
