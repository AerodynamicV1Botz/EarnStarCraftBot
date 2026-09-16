/*CMD
  command: MENU_SERVICES
  help: 
  need_reply: false
  auto_retry_time: 
  folder: MAINMENU

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/*CMD
  command: MENU_SERVICES
  need_reply: false
  folder: MAIN_MENU
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 6 — MENU_SERVICES
// STEP 2.1 — SERVICES MENU
// CLIENT → MAIN MENU → SERVICES
//
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit
// ✅ Delete + Send Fallback
// ✅ Safe Language Detection
// ✅ Existing Service Buttons Preserved
//
// CONNECTED COMMANDS:
// SERVICE_CUSTOM_BOT
// SERVICE_AUTOMATION
// SERVICE_ADMIN
// SERVICE_SUPPORT
// SERVICE_BROADCAST
// SERVICE_CUSTOM
// BACK_MAIN_MENU
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
// 👤 USER INFORMATION
// =====================================================

var userId = String(user.telegramid)
var userKey = "USER_" + userId

var userData = Bot.getProperty(userKey)

var language = "hinglish"

if (
  userData &&
  userData.language &&
  (
    userData.language == "hinglish" ||
    userData.language == "english" ||
    userData.language == "gujarati"
  )
) {
  language = userData.language
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
    "🛠️ <b>Our Services</b>\n\n" +
    "Hum businesses, creators aur communities ke liye " +
    "professional Telegram solutions banate hain.\n\n" +
    "👇 <b>Service choose karo:</b>"

  buttons = [
    [
      {
        text: "🤖 Custom Telegram Bots",
        callback_data: "SERVICE_CUSTOM_BOT"
      }
    ],
    [
      {
        text: "⚡ Business Automation",
        callback_data: "SERVICE_AUTOMATION"
      }
    ],
    [
      {
        text: "📊 Admin & Management",
        callback_data: "SERVICE_ADMIN"
      }
    ],
    [
      {
        text: "💬 Customer Support Bot",
        callback_data: "SERVICE_SUPPORT"
      }
    ],
    [
      {
        text: "📢 Broadcast System",
        callback_data: "SERVICE_BROADCAST"
      }
    ],
    [
      {
        text: "🎯 Custom Solution",
        callback_data: "SERVICE_CUSTOM"
      }
    ],
    [
      {
        text: "⬅️ Main Menu",
        callback_data: "MAIN_MENU"
      }
    ]
  ]

}


// =====================================================
// 🇬🇧 ENGLISH
// =====================================================

else if (language == "english") {

  text =
    "🛠️ <b>Our Services</b>\n\n" +
    "We build professional Telegram solutions for " +
    "businesses, creators and communities.\n\n" +
    "👇 <b>Select a service:</b>"

  buttons = [
    [
      {
        text: "🤖 Custom Telegram Bots",
        callback_data: "SERVICE_CUSTOM_BOT"
      }
    ],
    [
      {
        text: "⚡ Business Automation",
        callback_data: "SERVICE_AUTOMATION"
      }
    ],
    [
      {
        text: "📊 Admin & Management",
        callback_data: "SERVICE_ADMIN"
      }
    ],
    [
      {
        text: "💬 Customer Support Bot",
        callback_data: "SERVICE_SUPPORT"
      }
    ],
    [
      {
        text: "📢 Broadcast System",
        callback_data: "SERVICE_BROADCAST"
      }
    ],
    [
      {
        text: "🎯 Custom Solution",
        callback_data: "SERVICE_CUSTOM"
      }
    ],
    [
      {
        text: "⬅️ Main Menu",
        callback_data: "MAIN_MENU"
      }
    ]
  ]

}


// =====================================================
// 🇬🇺 GUJARATI
// =====================================================

else if (language == "gujarati") {

  text =
    "🛠️ <b>અમારી Services</b>\n\n" +
    "અમે Business, Creators અને Communities માટે " +
    "Professional Telegram Solutions બનાવીએ છીએ.\n\n" +
    "👇 <b>Service પસંદ કરો:</b>"

  buttons = [
    [
      {
        text: "🤖 Custom Telegram Bots",
        callback_data: "SERVICE_CUSTOM_BOT"
      }
    ],
    [
      {
        text: "⚡ Business Automation",
        callback_data: "SERVICE_AUTOMATION"
      }
    ],
    [
      {
        text: "📊 Admin & Management",
        callback_data: "SERVICE_ADMIN"
      }
    ],
    [
      {
        text: "💬 Customer Support Bot",
        callback_data: "SERVICE_SUPPORT"
      }
    ],
    [
      {
        text: "📢 Broadcast System",
        callback_data: "SERVICE_BROADCAST"
      }
    ],
    [
      {
        text: "🎯 Custom Solution",
        callback_data: "SERVICE_CUSTOM"
      }
    ],
    [
      {
        text: "⬅️ Main Menu",
        callback_data: "MAIN_MENU"
      }
    ]
  ]

}


// =====================================================
// 🆔 MESSAGE INFORMATION
// =====================================================

var messageId = null
var chatId = userId

if (
  typeof request !== "undefined" &&
  request &&
  request.message
) {

  if (request.message.message_id) {
    messageId = request.message.message_id
  }

  if (
    request.message.chat &&
    request.message.chat.id
  ) {
    chatId = String(request.message.chat.id)
  }

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
      // Ignore if message is already deleted
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
