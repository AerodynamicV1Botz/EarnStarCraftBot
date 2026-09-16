/*CMD
  command: SERVICE_SUPPORT
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
  command: SERVICE_SUPPORT
  need_reply: false
  folder: SERVICES
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 10 — SERVICE_SUPPORT
// STEP 2.1.4 — CUSTOMER SUPPORT BOT
//
// CLIENT FLOW:
// MAIN_MENU → MENU_SERVICES → SERVICE_SUPPORT
//
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Safe Language Detection
// ✅ User Activity Save
// ✅ Same Message Edit
// ✅ Delete + Send Fallback
// ✅ Existing Buttons Preserved
//
// CONNECTED COMMANDS:
// MENU_DEMO
// MENU_BUILD
// MENU_PRICING
// MENU_SERVICES
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
var userKey = "USER_" + userId

var userData = Bot.getProperty(userKey)

if (
  !userData ||
  typeof userData !== "object"
) {
  userData = {}
}


// =====================================================
// 🌐 LANGUAGE VALIDATION
// =====================================================

var language = "hinglish"

if (
  userData.language == "hinglish" ||
  userData.language == "english" ||
  userData.language == "gujarati"
) {
  language = userData.language
}


// =====================================================
// 💾 SAVE USER ACTIVITY
// =====================================================

userData.userId = userId
userData.lastCommand = "SERVICE_SUPPORT"
userData.lastVisitedAt = new Date().toISOString()

Bot.setProperty(
  userKey,
  userData,
  "json"
)


// =====================================================
// 🆔 CHAT AND MESSAGE INFORMATION
// =====================================================

var chatId = userId
var messageId = null

if (
  typeof request !== "undefined" &&
  request &&
  request.message
) {

  if (
    request.message.chat &&
    request.message.chat.id
  ) {
    chatId = String(request.message.chat.id)
  }

  if (request.message.message_id) {
    messageId = request.message.message_id
  }

}


// =====================================================
// 💬 TEXT AND BUTTONS
// =====================================================

var text = ""
var buttons = []


// =====================================================
// 🇮🇳 HINGLISH
// =====================================================

if (language == "hinglish") {

  text =
    "💬 <b>Customer Support Bots</b>\n\n" +
    "Customers ke common questions aur enquiries ko " +
    "automatically handle karo — fast aur organized way mein.\n\n" +
    "✨ <b>Support Features:</b>\n" +
    "• 🤖 Automatic Replies\n" +
    "• ❓ Interactive FAQ System\n" +
    "• 📝 Customer Enquiry Forms\n" +
    "• 📩 Lead Collection\n" +
    "• 🔔 Admin Notifications\n" +
    "• 👨‍💼 Human Support Handoff\n" +
    "• 🗂️ Customer Information\n" +
    "• 🌐 Multi-language Support\n" +
    "• 🔘 Smart Menus & Buttons\n" +
    "• ⚡ 24/7 Automated Responses\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "💰 <b>Starting from ₹999</b>\n\n" +
    "📌 Final price required features aur complexity ke according decide hota hai.\n\n" +
    "🚀 <b>Faster replies. Better customer experience. Less manual work.</b>"

  buttons = [
    [
      {
        text: "🎬 View Demo",
        callback_data: "MENU_DEMO"
      }
    ],
    [
      {
        text: "🚀 Build Support Bot",
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

else if (language == "english") {

  text =
    "💬 <b>Customer Support Bots</b>\n\n" +
    "Automatically handle common customer questions and enquiries " +
    "in a fast and organized way.\n\n" +
    "✨ <b>Support Features:</b>\n" +
    "• 🤖 Automatic Replies\n" +
    "• ❓ Interactive FAQ System\n" +
    "• 📝 Customer Enquiry Forms\n" +
    "• 📩 Lead Collection\n" +
    "• 🔔 Admin Notifications\n" +
    "• 👨‍💼 Human Support Handoff\n" +
    "• 🗂️ Customer Information\n" +
    "• 🌐 Multi-language Support\n" +
    "• 🔘 Smart Menus & Buttons\n" +
    "• ⚡ 24/7 Automated Responses\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "💰 <b>Starting from ₹999</b>\n\n" +
    "📌 Final pricing depends on the required features and complexity.\n\n" +
    "🚀 <b>Faster replies. Better customer experience. Less manual work.</b>"

  buttons = [
    [
      {
        text: "🎬 View Demo",
        callback_data: "MENU_DEMO"
      }
    ],
    [
      {
        text: "🚀 Build Support Bot",
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

else if (language == "gujarati") {

  text =
    "💬 <b>Customer Support Bots</b>\n\n" +
    "Customers ના common questions અને enquiries ને " +
    "Automatic અને organized રીતે handle કરો.\n\n" +
    "✨ <b>Support Features:</b>\n" +
    "• 🤖 Automatic Replies\n" +
    "• ❓ Interactive FAQ System\n" +
    "• 📝 Customer Enquiry Forms\n" +
    "• 📩 Lead Collection\n" +
    "• 🔔 Admin Notifications\n" +
    "• 👨‍💼 Human Support Handoff\n" +
    "• 🗂️ Customer Information\n" +
    "• 🌐 Multi-language Support\n" +
    "• 🔘 Smart Menus & Buttons\n" +
    "• ⚡ 24/7 Automated Responses\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "💰 <b>₹999 થી શરૂઆત</b>\n\n" +
    "📌 Final price તમારી required features અને complexity પર આધારિત રહેશે.\n\n" +
    "🚀 <b>ઝડપી Replies. Better Customer Experience. ઓછું Manual Work.</b>"

  buttons = [
    [
      {
        text: "🎬 Demo જુઓ",
        callback_data: "MENU_DEMO"
      }
    ],
    [
      {
        text: "🚀 Support Bot બનાવો",
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
// 🔄 EDIT SAME MESSAGE
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

    // =================================================
    // 🧹 EDIT FAILED → DELETE OLD MESSAGE
    // =================================================

    try {

      Api.deleteMessage({
        chat_id: chatId,
        message_id: messageId
      })

    } catch (deleteError) {
      // Ignore delete error
    }

    // =================================================
    // 📤 SEND NEW MESSAGE
    // =================================================

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
// 📤 DIRECT COMMAND → SEND NEW MESSAGE
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
