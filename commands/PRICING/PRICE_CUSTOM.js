/*CMD
  command: PRICE_CUSTOM
  help: 
  need_reply: false
  auto_retry_time: 
  folder: PRICING

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 47 — UPDATED VERSION
// COMMAND NAME: PRICE_CUSTOM
// STEP 4.4 — CUSTOM PACKAGE
// 📁 MAIN MENU → 📁 PRICING → CUSTOM PACKAGE
// 🌐 Language support included
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================


// ---------- SAFE CALLBACK RESPONSE ----------
if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}


// ---------- USER DATA ----------
var uid = user.telegramid

var userData = Bot.getProperty("USER_" + uid) || {}

var lang = userData.language || "hinglish"


// ---------- PACKAGE TEXT ----------
var text = ""

if (lang == "english") {

  text =
    "💎 <b>CUSTOM PACKAGE</b>\n\n" +
    "💰 <b>Price: Custom Quote</b>\n\n" +
    "🚀 Have a unique idea? We can build a Telegram bot around your exact requirements.\n\n" +
    "✨ <b>Possible Features:</b>\n" +
    "• 🤖 Custom bot system\n" +
    "• 🧠 Advanced automation\n" +
    "• 👥 User management\n" +
    "• 📊 Custom dashboard & statistics\n" +
    "• 📢 Broadcast system\n" +
    "• 📝 Custom forms & workflows\n" +
    "• 🔔 Automated notifications\n" +
    "• 🔐 Admin & permission system\n" +
    "• 🔗 API / external service integrations\n" +
    "• 🎨 Fully customized user experience\n" +
    "• ⚙️ Custom features & logic\n\n" +
    "💡 <b>How pricing works:</b>\n" +
    "The final price depends on the features, complexity and integrations required.\n\n" +
    "📩 Tell us your idea and we'll discuss the requirements and quote."

} else if (lang == "gujarati") {

  text =
    "💎 <b>કસ્ટમ પેકેજ</b>\n\n" +
    "💰 <b>કિંમત: Custom Quote</b>\n\n" +
    "🚀 તમારી unique idea છે? અમે તમારી exact requirements પ્રમાણે Telegram bot બનાવી શકીએ છીએ.\n\n" +
    "✨ <b>Possible Features:</b>\n" +
    "• 🤖 Custom bot system\n" +
    "• 🧠 Advanced automation\n" +
    "• 👥 User management\n" +
    "• 📊 Custom dashboard અને statistics\n" +
    "• 📢 Broadcast system\n" +
    "• 📝 Custom forms અને workflows\n" +
    "• 🔔 Automated notifications\n" +
    "• 🔐 Admin અને permission system\n" +
    "• 🔗 API / external service integrations\n" +
    "• 🎨 Fully customized user experience\n" +
    "• ⚙️ Custom features અને logic\n\n" +
    "💡 <b>Pricing કેવી રીતે નક્કી થશે:</b>\n" +
    "Final price features, complexity અને required integrations પર આધારિત રહેશે.\n\n" +
    "📩 તમારી idea મોકલો અને અમે requirements અને quote વિશે વાત કરીશું."

} else {

  text =
    "💎 <b>CUSTOM PACKAGE</b>\n\n" +
    "💰 <b>Price: Custom Quote</b>\n\n" +
    "🚀 Aapki unique idea hai? Hum aapki exact requirements ke according Telegram bot bana sakte hain.\n\n" +
    "✨ <b>Possible Features:</b>\n" +
    "• 🤖 Custom bot system\n" +
    "• 🧠 Advanced automation\n" +
    "• 👥 User management\n" +
    "• 📊 Custom dashboard & statistics\n" +
    "• 📢 Broadcast system\n" +
    "• 📝 Custom forms & workflows\n" +
    "• 🔔 Automated notifications\n" +
    "• 🔐 Admin & permission system\n" +
    "• 🔗 API / external service integrations\n" +
    "• 🎨 Fully customized user experience\n" +
    "• ⚙️ Custom features & logic\n\n" +
    "💡 <b>Pricing kaise decide hoga:</b>\n" +
    "Final price features, complexity aur required integrations par depend karega.\n\n" +
    "📩 Apni idea bhejo aur hum requirements aur quote discuss karenge."

}


// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: "🚀 Build My Custom Bot",
      callback_data: "ORDER_CUSTOM"
    }
  ],
  [
    {
      text: "📋 My Custom Requests",
      callback_data: "MY_CUSTOM_REQUESTS"
    }
  ],
  [
    {
      text: "🎬 Live Demo",
      callback_data: "MENU_DEMO"
    },
    {
      text: "🛠️ Services",
      callback_data: "MENU_SERVICES"
    }
  ],
  [
    {
      text: "💰 All Pricing",
      callback_data: "MENU_PRICING"
    },
    {
      text: "📞 Contact",
      callback_data: "MENU_CONTACT"
    }
  ],
  [
    {
      text: "🏠 Main Menu",
      callback_data: "MAIN_MENU"
    }
  ]
]


// ---------- MESSAGE ID ----------
var messageId = null

if (
  typeof request !== "undefined" &&
  request &&
  request.message &&
  request.message.message_id
) {
  messageId = request.message.message_id
}


// ---------- EDIT EXISTING MESSAGE ----------
if (messageId) {

  try {

    Api.editMessageText({
      chat_id: uid,
      message_id: messageId,
      text: text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: buttons
      }
    })

  } catch (error) {

    Bot.sendMessage(text, {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: buttons
      }
    })

  }

} else {

  Bot.sendMessage(text, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons
    }
  })

}
