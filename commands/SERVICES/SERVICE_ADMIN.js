/*CMD
  command: SERVICE_ADMIN
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
// SCRIPT 9 — UPDATED VERSION
// COMMAND NAME: SERVICE_ADMIN
// STEP 3.3 — ADMIN & MANAGEMENT SYSTEMS
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


// ==========================================
// 📝 TEXT + BUTTONS
// ==========================================

let text = ""
let buttons = []


// ==========================================
// 🇮🇳 HINGLISH
// ==========================================

if (language == "hinglish") {

  text =
    "📊 <b>Admin & Management Systems</b>\n\n" +
    "Apne Telegram bot aur community ko ek organized " +
    "admin system ke through manage karo.\n\n" +
    "✨ <b>Management Features:</b>\n" +
    "• 👤 User Management\n" +
    "• 📈 User Statistics\n" +
    "• 🆕 New User Notifications\n" +
    "• 📢 Broadcast Management\n" +
    "• 🚫 Block / Restrict Controls\n" +
    "• 🔐 Admin Permissions\n" +
    "• 📋 User Information\n" +
    "• 📨 Lead Notifications\n" +
    "• 📊 Basic Reports\n" +
    "• ⚙️ Custom Admin Controls\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "💰 <b>Starting from ₹1,499</b>\n\n" +
    "📌 Final pricing required features aur system complexity ke according decide hoti hai.\n\n" +
    "🚀 <b>More control. Better management. Less manual work.</b>"

  buttons = [
    [
      {
        text: "🎬 View Demo",
        callback_data: "MENU_DEMO"
      }
    ],
    [
      {
        text: "🚀 Build My Admin System",
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
    "📊 <b>Admin & Management Systems</b>\n\n" +
    "Manage your Telegram bot and community with an organized " +
    "administration system.\n\n" +
    "✨ <b>Management Features:</b>\n" +
    "• 👤 User Management\n" +
    "• 📈 User Statistics\n" +
    "• 🆕 New User Notifications\n" +
    "• 📢 Broadcast Management\n" +
    "• 🚫 Block / Restrict Controls\n" +
    "• 🔐 Admin Permissions\n" +
    "• 📋 User Information\n" +
    "• 📨 Lead Notifications\n" +
    "• 📊 Basic Reports\n" +
    "• ⚙️ Custom Admin Controls\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "💰 <b>Starting from ₹1,499</b>\n\n" +
    "📌 Final pricing depends on the required features and system complexity.\n\n" +
    "🚀 <b>More control. Better management. Less manual work.</b>"

  buttons = [
    [
      {
        text: "🎬 View Demo",
        callback_data: "MENU_DEMO"
      }
    ],
    [
      {
        text: "🚀 Build My Admin System",
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
    "📊 <b>Admin & Management Systems</b>\n\n" +
    "તમારા Telegram Bot અને Community ને organized " +
    "Admin System દ્વારા સરળતાથી manage કરો.\n\n" +
    "✨ <b>Management Features:</b>\n" +
    "• 👤 User Management\n" +
    "• 📈 User Statistics\n" +
    "• 🆕 New User Notifications\n" +
    "• 📢 Broadcast Management\n" +
    "• 🚫 Block / Restrict Controls\n" +
    "• 🔐 Admin Permissions\n" +
    "• 📋 User Information\n" +
    "• 📨 Lead Notifications\n" +
    "• 📊 Basic Reports\n" +
    "• ⚙️ Custom Admin Controls\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "💰 <b>Starting from ₹1,499</b>\n\n" +
    "📌 Final pricing તમારી requirements અને system complexity પર આધારિત રહેશે.\n\n" +
    "🚀 <b>વધુ Control. Better Management. ઓછું Manual Work.</b>"

  buttons = [
    [
      {
        text: "🎬 View Demo",
        callback_data: "MENU_DEMO"
      }
    ],
    [
      {
        text: "🚀 Admin System બનાવો",
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
