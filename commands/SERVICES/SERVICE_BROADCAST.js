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

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 11 — UPDATED VERSION
// COMMAND NAME: SERVICE_BROADCAST
// STEP 3.5 — BROADCAST & NOTIFICATION SYSTEM
// 📁 MAIN MENU → 📁 SERVICES
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================


// ==========================================
// ⚡ INSTANT CALLBACK RESPONSE
// ==========================================

if (typeof request !== "undefined" && request && request.id) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}


// ==========================================
// 👤 USER DATA
// ==========================================

let userId = user.telegramid
let userData = Bot.getProperty("USER_" + userId)

let language = userData && userData.language
  ? userData.language
  : "hinglish"

let text = ""
let buttons = []


// ==========================================
// 🇮🇳 HINGLISH
// ==========================================

if (language == "hinglish") {

  text =
    "📢 <b>Broadcast & Notification System</b>\n\n" +
    "Apne users, customers ya community members ko " +
    "important updates efficiently send karo.\n\n" +
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


// ==========================================
// 🇬🇧 ENGLISH
// ==========================================

else if (language == "english") {

  text =
    "📢 <b>Broadcast & Notification System</b>\n\n" +
    "Send important updates to your users, customers or community " +
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


// ==========================================
// 🇬🇺 GUJARATI
// ==========================================

else if (language == "gujarati") {

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


// ==========================================
// ✏️ MESSAGE ID
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
// 🔄 SAME MESSAGE EDIT SYSTEM
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

    } catch (deleteError) {
      // Old message already deleted ho toh ignore
    }

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
