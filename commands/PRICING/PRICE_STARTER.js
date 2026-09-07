/*CMD
  command: PRICE_STARTER
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
// SCRIPT 14 — UPDATED VERSION
// COMMAND NAME: PRICE_STARTER
// STEP 4.1 — STARTER PACKAGE
// 📁 MAIN MENU → 📁 PRICING
// 🌐 Language support included
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit Ready
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
// 👤 USER LANGUAGE
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
    "🟢 <b>STARTER PACKAGE</b>\n\n" +
    "💰 <b>Starting Price: ₹499</b>\n\n" +
    "Perfect for basic Telegram automation aur simple business/community bots.\n\n" +
    "✨ <b>Included:</b>\n" +
    "• 👋 Professional Welcome System\n" +
    "• 🔘 Custom Inline Buttons\n" +
    "• 🏠 Main Menu\n" +
    "• 📄 Information Pages\n" +
    "• 💬 Basic Auto Replies\n" +
    "• 📞 Contact Section\n" +
    "• ℹ️ About / FAQ Section\n" +
    "• 📱 Mobile-friendly Bot Flow\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "⏱️ <b>Delivery:</b> Requirement ke according\n" +
    "🔧 <b>Revisions:</b> 1 minor revision\n" +
    "💳 <b>Price:</b> ₹499 starting\n\n" +
    "📌 Complex features additional cost par ho sakte hain.\n\n" +
    "🚀 <b>Ready to build your bot?</b>"

  buttons = [
    [
      {
        text: "🚀 Order Starter",
        callback_data: "ORDER_STARTER"
      },
      {
        text: "🔙 My Requests",
        callback_data: "MY_STARTER_REQUESTS"
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
        text: "🔵 Business Package",
        callback_data: "PRICE_BUSINESS"
      }
    ],
    [
      {
        text: "⬅️ Pricing",
        callback_data: "MENU_PRICING"
      }
    ]
  ]

}

// ==========================================
// 🇬🇧 ENGLISH
// ==========================================

else if (language == "english") {

  text =
    "🟢 <b>STARTER PACKAGE</b>\n\n" +
    "💰 <b>Starting Price: ₹499</b>\n\n" +
    "Perfect for basic Telegram automation and simple business/community bots.\n\n" +
    "✨ <b>Included:</b>\n" +
    "• 👋 Professional Welcome System\n" +
    "• 🔘 Custom Inline Buttons\n" +
    "• 🏠 Main Menu\n" +
    "• 📄 Information Pages\n" +
    "• 💬 Basic Auto Replies\n" +
    "• 📞 Contact Section\n" +
    "• ℹ️ About / FAQ Section\n" +
    "• 📱 Mobile-friendly Bot Flow\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "⏱️ <b>Delivery:</b> Based on requirements\n" +
    "🔧 <b>Revisions:</b> 1 minor revision\n" +
    "💳 <b>Price:</b> ₹499 starting\n\n" +
    "📌 Complex features may require additional charges.\n\n" +
    "🚀 <b>Ready to build your bot?</b>"

  buttons = [
    [
      {
        text: "🚀 Order Starter",
        callback_data: "ORDER_STARTER"
      },
      {
        text: "🔙 My Requests",
        callback_data: "MY_STARTER_REQUESTS"
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
        text: "🔵 Business Package",
        callback_data: "PRICE_BUSINESS"
      }
    ],
    [
      {
        text: "⬅️ Pricing",
        callback_data: "MENU_PRICING"
      }
    ]
  ]

}

// ==========================================
// 🇬🇺 GUJARATI
// ==========================================

else if (language == "gujarati") {

  text =
    "🟢 <b>STARTER PACKAGE</b>\n\n" +
    "💰 <b>Starting Price: ₹499</b>\n\n" +
    "Basic Telegram Automation અને Simple Business/Community Bot માટે perfect package.\n\n" +
    "✨ <b>Included:</b>\n" +
    "• 👋 Professional Welcome System\n" +
    "• 🔘 Custom Inline Buttons\n" +
    "• 🏠 Main Menu\n" +
    "• 📄 Information Pages\n" +
    "• 💬 Basic Auto Replies\n" +
    "• 📞 Contact Section\n" +
    "• ℹ️ About / FAQ Section\n" +
    "• 📱 Mobile-friendly Bot Flow\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "⏱️ <b>Delivery:</b> Requirement પ્રમાણે\n" +
    "🔧 <b>Revisions:</b> 1 minor revision\n" +
    "💳 <b>Price:</b> ₹499 starting\n\n" +
    "📌 Complex features માટે additional charges થઈ શકે છે.\n\n" +
    "🚀 <b>તમારું Bot બનાવવું છે?</b>"

  buttons = [
    [
      {
        text: "🚀 Starter Order કરો",
        callback_data: "ORDER_STARTER"
      },
      {
        text: "🔙 My Requests",
        callback_data: "MY_STARTER_REQUESTS"
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
        text: "🔵 Business Package",
        callback_data: "PRICE_BUSINESS"
      }
    ],
    [
      {
        text: "⬅️ Pricing",
        callback_data: "MENU_PRICING"
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
      chat_id: userId,
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
    chat_id: userId,
    text: text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons
    }
  })

}
