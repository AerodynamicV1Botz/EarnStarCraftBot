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

/*CMD
  command: SERVICE_ADMIN
  need_reply: false
  folder: SERVICES
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 9 — SERVICE_ADMIN
// STEP 2.1.3 — ADMIN & MANAGEMENT SYSTEMS
//
// CLIENT FLOW:
// MAIN_MENU → MENU_SERVICES → SERVICE_ADMIN
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
userData.lastCommand = "SERVICE_ADMIN"
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


// =====================================================
// 🇬🇧 ENGLISH
// =====================================================

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


// =====================================================
// 🇬🇺 GUJARATI
// =====================================================

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
    "💰 <b>₹1,499 થી શરૂઆત</b>\n\n" +
    "📌 Final pricing તમારી requirements અને system complexity પર આધારિત રહેશે.\n\n" +
    "🚀 <b>વધુ Control. Better Management. ઓછું Manual Work.</b>"

  buttons = [
    [
      {
        text: "🎬 Demo જુઓ",
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
