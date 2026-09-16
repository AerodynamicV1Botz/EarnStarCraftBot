/*CMD
  command: SERVICE_CUSTOM
  help: 
  need_reply: false
  auto_retry_time: 
  folder: SERVICES

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/*CMD
  command: SERVICE_CUSTOM
  need_reply: false
  folder: SERVICES
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 12 — SERVICE_CUSTOM
// STEP 2.1.6 — CUSTOM SOLUTION
// PURPOSE: Show custom bot and automation service details
// CONNECTIONS: MENU_SERVICES → SERVICE_CUSTOM
// NEXT: MENU_BUILD / MENU_DEMO / MENU_CONTACT / MENU_SERVICES
// =====================================================


// =====================================================
// ⚡ INSTANT CALLBACK RESPONSE
// =====================================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  try {
    Api.answerCallbackQuery({
      callback_query_id: request.id
    })
  } catch (error) {
    // Ignore callback response errors
  }
}


// =====================================================
// 👤 USER DATA
// =====================================================

var userId = String(user.telegramid)

var userData = Bot.getProperty("USER_" + userId)

if (
  !userData ||
  typeof userData !== "object"
) {
  userData = {}
}


// =====================================================
// 🌐 LANGUAGE
// =====================================================

var language = userData.language

if (
  language !== "hinglish" &&
  language !== "english" &&
  language !== "gujarati"
) {
  language = "hinglish"
}


// =====================================================
// 📝 USER ACTIVITY UPDATE
// =====================================================

userData.lastCommand = "SERVICE_CUSTOM"
userData.lastVisitedAt = new Date().toISOString()

Bot.setProperty(
  "USER_" + userId,
  userData,
  "json"
)


// =====================================================
// 💬 CHAT ID + MESSAGE ID
// =====================================================

var chatId = userId
var messageId = null

if (
  typeof request !== "undefined" &&
  request &&
  request.message &&
  request.message.chat &&
  request.message.chat.id
) {
  chatId = request.message.chat.id
}

if (
  typeof request !== "undefined" &&
  request &&
  request.message &&
  request.message.message_id
) {
  messageId = request.message.message_id
}


// =====================================================
// 📝 TEXT + BUTTONS
// =====================================================

var text = ""
var buttons = []


// =====================================================
// 🇮🇳 HINGLISH
// =====================================================

if (language === "hinglish") {

  text =
    "🎯 <b>Custom Bot Solution</b>\n\n" +
    "Agar aapko ek unique bot ya automation system chahiye " +
    "jo normal packages mein available nahi hai, " +
    "toh hum aapki requirement ke according custom solution design kar sakte hain.\n\n" +
    "💡 <b>Examples:</b>\n" +
    "• 🏢 Business Management Bot\n" +
    "• 🛒 Product / Order Bot\n" +
    "• 🎓 Course / Community Bot\n" +
    "• 🎫 Support & Ticket System\n" +
    "• 🔐 Membership System\n" +
    "• 📋 Lead Management System\n" +
    "• 🔗 API / Webhook Integration\n" +
    "• 🤖 AI-powered Features\n" +
    "• ⚙️ Custom Automation\n" +
    "• 💻 Other Custom Projects\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "💰 <b>Custom Pricing</b>\n\n" +
    "Price aapki requirements, features aur project complexity " +
    "ke according decide hoga.\n\n" +
    "🚀 <b>Have an idea? Let's turn it into a working solution.</b>"

  buttons = [
    [
      {
        text: "🚀 Build My Custom Bot",
        callback_data: "MENU_BUILD"
      }
    ],
    [
      {
        text: "🎬 View Demo",
        callback_data: "MENU_DEMO"
      }
    ],
    [
      {
        text: "📞 Contact Us",
        callback_data: "MENU_CONTACT"
      }
    ],
    [
      {
        text: "⬅️ Services",
        callback_data: "MENU_SERVICES"
      }
    ]
  ]

}


// =====================================================
// 🇬🇧 ENGLISH
// =====================================================

else if (language === "english") {

  text =
    "🎯 <b>Custom Bot Solution</b>\n\n" +
    "Need a unique bot or automation system that does not fit " +
    "our standard packages? We can design a custom solution based on your requirements.\n\n" +
    "💡 <b>Examples:</b>\n" +
    "• 🏢 Business Management Bot\n" +
    "• 🛒 Product / Order Bot\n" +
    "• 🎓 Course / Community Bot\n" +
    "• 🎫 Support & Ticket System\n" +
    "• 🔐 Membership System\n" +
    "• 📋 Lead Management System\n" +
    "• 🔗 API / Webhook Integration\n" +
    "• 🤖 AI-powered Features\n" +
    "• ⚙️ Custom Automation\n" +
    "• 💻 Other Custom Projects\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "💰 <b>Custom Pricing</b>\n\n" +
    "Pricing depends on your requirements, features and project complexity.\n\n" +
    "🚀 <b>Have an idea? Let's turn it into a working solution.</b>"

  buttons = [
    [
      {
        text: "🚀 Build My Custom Bot",
        callback_data: "MENU_BUILD"
      }
    ],
    [
      {
        text: "🎬 View Demo",
        callback_data: "MENU_DEMO"
      }
    ],
    [
      {
        text: "📞 Contact Us",
        callback_data: "MENU_CONTACT"
      }
    ],
    [
      {
        text: "⬅️ Services",
        callback_data: "MENU_SERVICES"
      }
    ]
  ]

}


// =====================================================
// 🇬🇺 GUJARATI
// =====================================================

else if (language === "gujarati") {

  text =
    "🎯 <b>Custom Bot Solution</b>\n\n" +
    "જો તમને એવો Unique Bot અથવા Automation System જોઈએ " +
    "જે અમારા Standard Packages માં ઉપલબ્ધ નથી, " +
    "તો અમે તમારી Requirement પ્રમાણે Custom Solution બનાવી શકીએ છીએ.\n\n" +
    "💡 <b>Examples:</b>\n" +
    "• 🏢 Business Management Bot\n" +
    "• 🛒 Product / Order Bot\n" +
    "• 🎓 Course / Community Bot\n" +
    "• 🎫 Support & Ticket System\n" +
    "• 🔐 Membership System\n" +
    "• 📋 Lead Management System\n" +
    "• 🔗 API / Webhook Integration\n" +
    "• 🤖 AI-powered Features\n" +
    "• ⚙️ Custom Automation\n" +
    "• 💻 Other Custom Projects\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "💰 <b>Custom Pricing</b>\n\n" +
    "Pricing તમારી requirements, features અને project complexity પર આધારિત રહેશે.\n\n" +
    "🚀 <b>તમારો Idea છે? તેને Working Solution માં Convert કરીએ.</b>"

  buttons = [
    [
      {
        text: "🚀 મારું Custom Bot બનાવો",
        callback_data: "MENU_BUILD"
      }
    ],
    [
      {
        text: "🎬 View Demo",
        callback_data: "MENU_DEMO"
      }
    ],
    [
      {
        text: "📞 Contact Us",
        callback_data: "MENU_CONTACT"
      }
    ],
    [
      {
        text: "⬅️ Services",
        callback_data: "MENU_SERVICES"
      }
    ]
  ]

}


// =====================================================
// 🔄 SAME MESSAGE EDIT SYSTEM
// =====================================================

if (messageId) {

  try {

    Api.editMessageText({
      chat_id: chatId,
      message_id: messageId,
      text: text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: buttons
      }
    })

  } catch (error) {

    try {

      Api.deleteMessage({
        chat_id: chatId,
        message_id: messageId
      })

    } catch (deleteError) {
      // Ignore delete errors
    }

    Api.sendMessage({
      chat_id: chatId,
      text: text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: buttons
      }
    })

  }

}


// =====================================================
// 📩 DIRECT COMMAND MESSAGE
// =====================================================

else {

  Api.sendMessage({
    chat_id: chatId,
    text: text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons
    }
  })

}
