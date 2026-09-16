/*CMD
  command: SERVICE_AUTOMATION
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
  command: SERVICE_AUTOMATION
  need_reply: false
  folder: SERVICES
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 8 — SERVICE_AUTOMATION
// STEP 2.1.2 — BUSINESS AUTOMATION
//
// CLIENT FLOW:
// MAIN_MENU → MENU_SERVICES → SERVICE_AUTOMATION
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
userData.lastCommand = "SERVICE_AUTOMATION"
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
    "⚡ <b>Business Automation</b>\n\n" +
    "Repeated manual kaam ko smart automation mein convert karo.\n\n" +
    "✨ <b>Automation Solutions:</b>\n" +
    "• 📨 Automatic Customer Replies\n" +
    "• 👋 Welcome & Onboarding\n" +
    "• 🔔 Automatic Notifications\n" +
    "• 📝 Lead / Enquiry Collection\n" +
    "• 📢 Scheduled Messages\n" +
    "• 👤 Customer Management\n" +
    "• 🔄 Automated Workflows\n" +
    "• 📊 Basic Business Tracking\n" +
    "• 🔗 API / Webhook Integration\n" +
    "• 🤖 AI-assisted Automation\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "💰 <b>Starting from ₹999</b>\n\n" +
    "📌 Price automation ki requirements aur complexity par depend karega.\n\n" +
    "🚀 <b>Aapka repetitive kaam → smart automated workflow.</b>"

  buttons = [
    [
      {
        text: "🎬 View Demo",
        callback_data: "MENU_DEMO"
      }
    ],
    [
      {
        text: "🚀 Automate My Business",
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
    "⚡ <b>Business Automation</b>\n\n" +
    "Turn repetitive manual work into smart automated workflows.\n\n" +
    "✨ <b>Automation Solutions:</b>\n" +
    "• 📨 Automatic Customer Replies\n" +
    "• 👋 Welcome & Onboarding\n" +
    "• 🔔 Automatic Notifications\n" +
    "• 📝 Lead / Enquiry Collection\n" +
    "• 📢 Scheduled Messages\n" +
    "• 👤 Customer Management\n" +
    "• 🔄 Automated Workflows\n" +
    "• 📊 Basic Business Tracking\n" +
    "• 🔗 API / Webhook Integration\n" +
    "• 🤖 AI-assisted Automation\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "💰 <b>Starting from ₹999</b>\n\n" +
    "📌 Pricing depends on your requirements and automation complexity.\n\n" +
    "🚀 <b>Your repetitive work → a smart automated workflow.</b>"

  buttons = [
    [
      {
        text: "🎬 View Demo",
        callback_data: "MENU_DEMO"
      }
    ],
    [
      {
        text: "🚀 Automate My Business",
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
    "⚡ <b>Business Automation</b>\n\n" +
    "વારંવાર થતા Manual કામને Smart Automation માં convert કરો.\n\n" +
    "✨ <b>Automation Solutions:</b>\n" +
    "• 📨 Automatic Customer Replies\n" +
    "• 👋 Welcome & Onboarding\n" +
    "• 🔔 Automatic Notifications\n" +
    "• 📝 Lead / Enquiry Collection\n" +
    "• 📢 Scheduled Messages\n" +
    "• 👤 Customer Management\n" +
    "• 🔄 Automated Workflows\n" +
    "• 📊 Basic Business Tracking\n" +
    "• 🔗 API / Webhook Integration\n" +
    "• 🤖 AI-assisted Automation\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "💰 <b>₹999 થી શરૂઆત</b>\n\n" +
    "📌 Price તમારી requirements અને automation ની complexity પર આધારિત રહેશે.\n\n" +
    "🚀 <b>તમારું Repetitive કામ → Smart Automated Workflow.</b>"

  buttons = [
    [
      {
        text: "🎬 Demo જુઓ",
        callback_data: "MENU_DEMO"
      }
    ],
    [
      {
        text: "🚀 Business Automate કરો",
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
