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

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 10 — UPDATED VERSION
// COMMAND NAME: SERVICE_SUPPORT
// STEP 3.4 — CUSTOMER SUPPORT BOT
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


// ==========================================
// 🇬🇧 ENGLISH
// ==========================================

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


// ==========================================
// 🇬🇺 GUJARATI
// ==========================================

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
    "💰 <b>Starting from ₹999</b>\n\n" +
    "📌 Final price તમારી required features અને complexity પર આધારિત રહેશે.\n\n" +
    "🚀 <b>ઝડપી Replies. Better Customer Experience. ઓછું Manual Work.</b>"

  buttons = [
    [
      {
        text: "🎬 View Demo",
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
