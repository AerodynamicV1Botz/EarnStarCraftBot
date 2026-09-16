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

/*CMD
  command: PRICE_STARTER
  need_reply: false
  folder: PRICING
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 14 — PRICE_STARTER
// STEP 2.2.1 — STARTER PACKAGE
// PURPOSE: Show Starter package details and order options
// CONNECTIONS: MENU_PRICING → PRICE_STARTER
// NEXT: ORDER_STARTER / MY_ORDERS / MENU_DEMO / PRICE_BUSINESS
// =====================================================


// =====================================================
// ⚡ CALLBACK RESPONSE
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
    // Ignore callback errors
  }
}


// =====================================================
// 👤 USER DATA
// =====================================================

var userId = String(user.telegramid)

var userData = Bot.getProperty(
  "USER_" + userId
)

if (
  !userData ||
  typeof userData !== "object" ||
  Array.isArray(userData)
) {
  userData = {}
}


// =====================================================
// 🌐 LANGUAGE
// =====================================================

var language = userData.language || "hinglish"

if (
  language !== "hinglish" &&
  language !== "english" &&
  language !== "gujarati"
) {
  language = "hinglish"
}


// =====================================================
// 📝 USER ACTIVITY
// =====================================================

var now = new Date().toISOString()

userData.lastCommand = "PRICE_STARTER"
userData.lastVisitedAt = now
userData.updatedAt = now

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
        text: "📦 My Orders",
        callback_data: "MY_ORDERS"
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


// =====================================================
// 🇬🇧 ENGLISH
// =====================================================

else if (language === "english") {

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
        text: "📦 My Orders",
        callback_data: "MY_ORDERS"
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


// =====================================================
// 🇬🇺 GUJARATI
// =====================================================

else if (language === "gujarati") {

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
        text: "📦 My Orders",
        callback_data: "MY_ORDERS"
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
