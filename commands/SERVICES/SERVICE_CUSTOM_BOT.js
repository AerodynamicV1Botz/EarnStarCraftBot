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

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 7 — UPDATED VERSION
// COMMAND: SERVICE_CUSTOM_BOT
// STEP 3.1 — CUSTOM TELEGRAM BOTS
// 📁 MAIN MENU → 📁 SERVICES → CUSTOM TELEGRAM BOTS
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
let userKey = "USER_" + userId

let userData = Bot.getProperty(userKey)

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


// ==========================================
// 🇬🇧 ENGLISH
// ==========================================

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


// ==========================================
// 🇬🇺 GUJARATI
// ==========================================

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
    "💰 <b>Starting from ₹499</b>\n\n" +
    "📌 Final pricing required features અને complexity પ્રમાણે નક્કી થશે.\n\n" +
    "🚀 <b>તમારો Idea જણાવો — અમે તેને Bot માં convert કરીશું.</b>"

  buttons = [
    [
      {
        text: "🎬 View Demo",
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
// 🔄 EDIT SAME MESSAGE
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

    // ==========================================
    // 🧹 EDIT FAILED → DELETE OLD MESSAGE
    // ==========================================

    try {

      Api.deleteMessage({
        chat_id: userId,
        message_id: messageId
      })

    } catch (deleteError) {
      // Old message already deleted ho toh ignore
    }

    // ==========================================
    // 📤 SEND NEW MESSAGE
    // ==========================================

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
// 📤 DIRECT COMMAND → NEW MESSAGE
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
