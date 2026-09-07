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

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 12 — UPDATED VERSION
// COMMAND NAME: SERVICE_CUSTOM
// STEP 3.6 — CUSTOM SOLUTION
// 📁 MAIN MENU → 📁 SERVICES
// 🌐 Language support included
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================

// ==========================================
// ⚡ INSTANT CALLBACK RESPONSE
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
// 👤 USER DATA & LANGUAGE
// ==========================================

let userId = user.telegramid

let userData = Bot.getProperty("USER_" + userId)

let language =
  userData && userData.language
    ? userData.language
    : "hinglish"

let text = ""
let buttons = []

// ==========================================
// 🇮🇳 HINGLISH
// ==========================================

if (language == "hinglish") {
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

// ==========================================
// 🇬🇧 ENGLISH
// ==========================================

else if (language == "english") {
  text =
    "🎯 <b>Custom Bot Solution</b>\n\n" +
    "Need a unique bot or automation system that doesn't fit " +
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

// ==========================================
// 🇬🇺 GUJARATI
// ==========================================

else if (language == "gujarati") {
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

// ==========================================
// 📨 MESSAGE ID DETECTION
// ==========================================

let messageId = null

if (
  typeof request !== "undefined" &&
  request &&
  request.message &&
  request.message.message_id
) {
  messageId = request.message.message_id
}

// ==========================================
// ✏️ SAME MESSAGE EDIT SYSTEM
// ==========================================

if (messageId) {
  try {
    Api.editMessageText({
      chat_id: userId,
      message_id: messageId,
      text: text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: buttons
      }
    })
  } catch (error) {

    // ======================================
    // 🧹 DELETE OLD MESSAGE
    // ======================================

    try {
      Api.deleteMessage({
        chat_id: userId,
        message_id: messageId
      })
    } catch (deleteError) {}

    // ======================================
    // 📩 SEND NEW MESSAGE
    // ======================================

    Api.sendMessage({
      text: text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: buttons
      }
    })
  }
}

// ==========================================
// 📩 DIRECT COMMAND MESSAGE
// ==========================================

else {
  Api.sendMessage({
    text: text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons
    }
  })
}
