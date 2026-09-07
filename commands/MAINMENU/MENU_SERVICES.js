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

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 6 — UPDATED VERSION
// COMMAND: MENU_SERVICES
// STEP 3 — SERVICES
// 📁 MAIN MENU FOLDER
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
// ---------- USER INFO ----------
// ==========================================

let userId = user.telegramid
let userKey = "USER_" + userId

let userData = Bot.getProperty(userKey)

let language = "hinglish"

if (userData && userData.language) {
  language = userData.language
}

// ==========================================
// ---------- MENU VARIABLES ----------
// ==========================================

let text = ""
let buttons = []

// ==========================================
// 🇮🇳 HINGLISH
// ==========================================

if (language == "hinglish") {

  text =
    "🛠️ <b>Our Services</b>\n\n" +
    "Hum businesses, creators aur communities ke liye professional Telegram solutions banate hain.\n\n" +
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
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]

}

// ==========================================
// 🇬🇧 ENGLISH
// ==========================================

else if (language == "english") {

  text =
    "🛠️ <b>Our Services</b>\n\n" +
    "We build professional Telegram solutions for businesses, creators and communities.\n\n" +
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
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]

}

// ==========================================
// 🇬🇺 GUJARATI
// ==========================================

else if (language == "gujarati") {

  text =
    "🛠️ <b>અમારી Services</b>\n\n" +
    "અમે Business, Creators અને Communities માટે Professional Telegram Solutions બનાવીએ છીએ.\n\n" +
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
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]

}

// ==========================================
// ✏️ MESSAGE HANDLING
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
    // 🧹 EDIT FAIL → DELETE OLD MESSAGE
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
// 📤 DIRECT COMMAND → NEW MESSAGE
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
