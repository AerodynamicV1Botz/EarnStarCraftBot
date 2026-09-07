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

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 8 — UPDATED VERSION
// COMMAND NAME: SERVICE_AUTOMATION
// STEP 3.2 — BUSINESS AUTOMATION
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


// ==========================================
// 🇬🇧 ENGLISH
// ==========================================

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


// ==========================================
// 🇬🇺 GUJARATI
// ==========================================

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
    "💰 <b>Starting from ₹999</b>\n\n" +
    "📌 Price તમારી requirements અને automation ની complexity પર આધારિત રહેશે.\n\n" +
    "🚀 <b>તમારું Repetitive કામ → Smart Automated Workflow.</b>"

  buttons = [
    [
      {
        text: "🎬 View Demo",
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
