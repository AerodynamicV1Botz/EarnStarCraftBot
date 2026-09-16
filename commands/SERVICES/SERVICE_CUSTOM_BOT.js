/*CMD
  command: SERVICE_CUSTOM_BOT
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
  command: SERVICE_CUSTOM_BOT
  need_reply: false
  folder: SERVICES
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 7 — SERVICE_CUSTOM_BOT
// STEP 2.1.1 — CUSTOM TELEGRAM BOTS
//
// CLIENT FLOW:
// MAIN_MENU → MENU_SERVICES → SERVICE_CUSTOM_BOT
//
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Safe Language Detection
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
// 🌐 LANGUAGE
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
// 💾 UPDATE USER LAST VISITED PAGE
// =====================================================

userData.userId = userId
userData.lastCommand = "SERVICE_CUSTOM_BOT"
userData.lastVisitedAt = new Date().toISOString()

Bot.setProperty(
  userKey,
  userData,
  "json"
)


// =====================================================
// 🆔 CHAT INFORMATION
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
// 💬 MENU VARIABLES
// =====================================================

var text = ""
var buttons = []


// =====================================================
// 🇮🇳 HINGLISH
// =====================================================

if (language == "hinglish") {

  text =
    "🤖 <b>Custom Telegram Bots</b>\n\n" +
    "Aapke business, community ya personal project ke liye " +
    "fully customized Telegram bot banaya jata hai.\n\n" +
    "✨ <b>Possible Features:</b>\n" +
    "• 👋 Smart Welcome System\n" +
    "• 🔘 Custom Buttons & Menus\n" +
    "• 👤 User Management\n" +
    "• 📢 Broadcast System\n" +
    "• 📝 Automated Forms\n" +
    "• 🔔 Notifications\n" +
    "• 💬 Auto Replies\n" +
    "• 🎯 Referral System\n" +
    "• 🔐 Membership / Access System\n" +
    "• 📊 Admin Controls\n" +
    "• ⚙️ Custom Automation\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "💰 <b>Starting from ₹499</b>\n\n" +
    "📌 Final price features aur complexity ke according decide hota hai.\n\n" +
    "🚀 <b>Apna idea batao — hum usse bot mein convert karenge.</b>"

  buttons = [
    [
      {
        text: "🎬 View Demo",
        callback_data: "MENU_DEMO"
      }
    ],
    [
      {
        text: "🚀 Build My Bot",
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
    "🤖 <b>Custom Telegram Bots</b>\n\n" +
    "We build fully customized Telegram bots for your business, " +
    "community or personal project.\n\n" +
    "✨ <b>Possible Features:</b>\n" +
    "• 👋 Smart Welcome System\n" +
    "• 🔘 Custom Buttons & Menus\n" +
    "• 👤 User Management\n" +
    "• 📢 Broadcast System\n" +
    "• 📝 Automated Forms\n" +
    "• 🔔 Notifications\n" +
    "• 💬 Auto Replies\n" +
    "• 🎯 Referral System\n" +
    "• 🔐 Membership / Access System\n" +
    "• 📊 Admin Controls\n" +
    "• ⚙️ Custom Automation\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "💰 <b>Starting from ₹499</b>\n\n" +
    "📌 Final pricing depends on the required features and complexity.\n\n" +
    "🚀 <b>Tell us your idea — we'll turn it into a bot.</b>"

  buttons = [
    [
      {
        text: "🎬 View Demo",
        callback_data: "MENU_DEMO"
      }
    ],
    [
      {
        text: "🚀 Build My Bot",
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
    "🤖 <b>Custom Telegram Bots</b>\n\n" +
    "તમારા Business, Community અથવા Personal Project માટે " +
    "અમે Fully Customized Telegram Bot બનાવીએ છીએ.\n\n" +
    "✨ <b>Possible Features:</b>\n" +
    "• 👋 Smart Welcome System\n" +
    "• 🔘 Custom Buttons & Menus\n" +
    "• 👤 User Management\n" +
    "• 📢 Broadcast System\n" +
    "• 📝 Automated Forms\n" +
    "• 🔔 Notifications\n" +
    "• 💬 Auto Replies\n" +
    "• 🎯 Referral System\n" +
    "• 🔐 Membership / Access System\n" +
    "• 📊 Admin Controls\n" +
    "• ⚙️ Custom Automation\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "💰 <b>₹499 થી શરૂઆત</b>\n\n" +
    "📌 Final price required features અને complexity પ્રમાણે નક્કી થશે.\n\n" +
    "🚀 <b>તમારો Idea જણાવો — અમે તેને Bot માં convert કરીશું.</b>"

  buttons = [
    [
      {
        text: "🎬 Demo જુઓ",
        callback_data: "MENU_DEMO"
      }
    ],
    [
      {
        text: "🚀 મારું Bot બનાવો",
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
