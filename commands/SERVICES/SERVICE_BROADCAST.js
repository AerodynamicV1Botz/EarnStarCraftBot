/*CMD
  command: SERVICE_BROADCAST
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
  command: SERVICE_BROADCAST
  need_reply: false
  folder: SERVICES
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 11 — SERVICE_BROADCAST
// STEP 2.1.5 — BROADCAST & NOTIFICATION SYSTEM
// PURPOSE: Show Broadcast & Notification service details
// CONNECTIONS: MENU_SERVICES → SERVICE_BROADCAST
// NEXT: MENU_DEMO / MENU_BUILD / MENU_PRICING / MENU_SERVICES
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

userData.lastCommand = "SERVICE_BROADCAST"
userData.lastVisitedAt = new Date().toISOString()

Bot.setProperty(
  "USER_" + userId,
  userData,
  "json"
)


// =====================================================
// 💬 CHAT ID
// =====================================================

var chatId = userId

if (
  typeof request !== "undefined" &&
  request &&
  request.message &&
  request.message.chat &&
  request.message.chat.id
) {
  chatId = request.message.chat.id
}


// =====================================================
// 🆔 MESSAGE ID
// =====================================================

var messageId = null

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
    "📢 <b>Broadcast & Notification System</b>\n\n" +
    "Apne users, customers ya community members ko " +
    "important updates efficiently aur organized way mein send karo.\n\n" +
    "✨ <b>Features:</b>\n" +
    "• 📢 Bulk Announcements\n" +
    "• 🔔 Automatic Notifications\n" +
    "• 📝 Custom Broadcast Messages\n" +
    "• 🕐 Scheduled Updates\n" +
    "• 👥 Audience Management\n" +
    "• 📊 Delivery Tracking\n" +
    "• 🧹 Blocked Users Handling\n" +
    "• 🔄 Batch Processing\n" +
    "• 🛡️ Error Handling\n" +
    "• ⚙️ Admin Controls\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "💰 <b>Starting from ₹999</b>\n\n" +
    "📌 Final pricing required features aur bot complexity ke according decide hota hai.\n\n" +
    "🚀 <b>One message. Organized communication.</b>"

  buttons = [
    [
      {
        text: "🎬 View Demo",
        callback_data: "MENU_DEMO"
      }
    ],
    [
      {
        text: "🚀 Build Broadcast System",
        callback_data: "MENU_BUILD"
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
    "📢 <b>Broadcast & Notification System</b>\n\n" +
    "Send important updates to your users, customers, or community " +
    "members efficiently and in an organized way.\n\n" +
    "✨ <b>Features:</b>\n" +
    "• 📢 Bulk Announcements\n" +
    "• 🔔 Automatic Notifications\n" +
    "• 📝 Custom Broadcast Messages\n" +
    "• 🕐 Scheduled Updates\n" +
    "• 👥 Audience Management\n" +
    "• 📊 Delivery Tracking\n" +
    "• 🧹 Blocked Users Handling\n" +
    "• 🔄 Batch Processing\n" +
    "• 🛡️ Error Handling\n" +
    "• ⚙️ Admin Controls\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "💰 <b>Starting from ₹999</b>\n\n" +
    "📌 Final pricing depends on the required features and bot complexity.\n\n" +
    "🚀 <b>One message. Organized communication.</b>"

  buttons = [
    [
      {
        text: "🎬 View Demo",
        callback_data: "MENU_DEMO"
      }
    ],
    [
      {
        text: "🚀 Build Broadcast System",
        callback_data: "MENU_BUILD"
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
    "📢 <b>Broadcast & Notification System</b>\n\n" +
    "તમારા Users, Customers અથવા Community Members ને " +
    "Important Updates efficiently અને organized રીતે મોકલો.\n\n" +
    "✨ <b>Features:</b>\n" +
    "• 📢 Bulk Announcements\n" +
    "• 🔔 Automatic Notifications\n" +
    "• 📝 Custom Broadcast Messages\n" +
    "• 🕐 Scheduled Updates\n" +
    "• 👥 Audience Management\n" +
    "• 📊 Delivery Tracking\n" +
    "• 🧹 Blocked Users Handling\n" +
    "• 🔄 Batch Processing\n" +
    "• 🛡️ Error Handling\n" +
    "• ⚙️ Admin Controls\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "💰 <b>Starting from ₹999</b>\n\n" +
    "📌 Final pricing તમારી required features અને bot complexity પર આધારિત રહેશે.\n\n" +
    "🚀 <b>એક Message. Organized Communication.</b>"

  buttons = [
    [
      {
        text: "🎬 View Demo",
        callback_data: "MENU_DEMO"
      }
    ],
    [
      {
        text: "🚀 Broadcast System બનાવો",
        callback_data: "MENU_BUILD"
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
