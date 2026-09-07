/*CMD
  command: PRICE_BUSINESS
  help: 
  need_reply: false
  auto_retry_time: 
  folder: PRICING

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 25 — UPDATED VERSION
// COMMAND NAME: PRICE_BUSINESS
// STEP 4.2 — BUSINESS PACKAGE
// 📁 MAIN MENU → 📁 PRICING → BUSINESS PACKAGE
// 🌐 Language support included
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================


// ==========================================
// ⚡ INSTANT CALLBACK RESPONSE
// ==========================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}


// ==========================================
// 👤 USER LANGUAGE
// ==========================================

var uid = user.telegramid

var userData = Bot.getProperty("USER_" + uid) || {}

var lang = userData.language || "hinglish"

var text = ""

var buttons = []


// ==========================================
// 🇬🇧 ENGLISH
// ==========================================

if (lang === "english") {

  text =
    "🔵 <b>BUSINESS PACKAGE</b>\n\n" +
    "💰 <b>Starting Price: ₹1,499+</b>\n\n" +
    "🚀 A powerful Telegram bot setup for businesses, creators and communities.\n\n" +
    "✨ <b>Includes:</b>\n" +
    "• Everything in Starter Package\n" +
    "• 🧭 Advanced menu & navigation\n" +
    "• 👥 User management system\n" +
    "• 📢 Broadcast & notifications\n" +
    "• 🛡️ Admin controls\n" +
    "• 📝 Automated forms / lead collection\n" +
    "• 🔔 Admin alerts\n" +
    "• 📊 Basic user statistics\n" +
    "• ⚙️ Custom business features\n" +
    "• 📱 Mobile-friendly bot flow\n\n" +
    "⏱️ <b>Delivery:</b> Depends on requirements\n" +
    "🔄 <b>Revision:</b> 2 minor revisions\n\n" +
    "⚠️ Advanced/complex features may require additional charges.\n\n" +
    "💎 Want a professional business bot?\n" +
    "Tap <b>Build My Bot</b> to get started."


// ==========================================
// 🇬🇺 GUJARATI
// ==========================================

} else if (lang === "gujarati") {

  text =
    "🔵 <b>બિઝનેસ પેકેજ</b>\n\n" +
    "💰 <b>શરૂઆતની કિંમત: ₹1,499+</b>\n\n" +
    "🚀 Business, creators અને communities માટે powerful Telegram bot setup.\n\n" +
    "✨ <b>આમાં મળશે:</b>\n" +
    "• Starter Package ની બધી સુવિધાઓ\n" +
    "• 🧭 Advanced menu અને navigation\n" +
    "• 👥 User management system\n" +
    "• 📢 Broadcast અને notifications\n" +
    "• 🛡️ Admin controls\n" +
    "• 📝 Automated forms / lead collection\n" +
    "• 🔔 Admin alerts\n" +
    "• 📊 Basic user statistics\n" +
    "• ⚙️ Custom business features\n" +
    "• 📱 Mobile-friendly bot flow\n\n" +
    "⏱️ <b>Delivery:</b> Requirements પર આધારિત\n" +
    "🔄 <b>Revision:</b> 2 minor revisions\n\n" +
    "⚠️ Advanced અથવા complex features માટે extra charges થઈ શકે છે.\n\n" +
    "💎 Professional business bot જોઈએ છે?\n" +
    "<b>Build My Bot</b> પર tap કરો."


// ==========================================
// 🇮🇳 HINGLISH
// ==========================================

} else {

  text =
    "🔵 <b>BUSINESS PACKAGE</b>\n\n" +
    "💰 <b>Starting Price: ₹1,499+</b>\n\n" +
    "🚀 Business, creators aur communities ke liye powerful Telegram bot setup.\n\n" +
    "✨ <b>Isme milega:</b>\n" +
    "• Starter Package ki saari features\n" +
    "• 🧭 Advanced menu & navigation\n" +
    "• 👥 User management system\n" +
    "• 📢 Broadcast & notifications\n" +
    "• 🛡️ Admin controls\n" +
    "• 📝 Automated forms / lead collection\n" +
    "• 🔔 Admin alerts\n" +
    "• 📊 Basic user statistics\n" +
    "• ⚙️ Custom business features\n" +
    "• 📱 Mobile-friendly bot flow\n\n" +
    "⏱️ <b>Delivery:</b> Requirements par depend\n" +
    "🔄 <b>Revision:</b> 2 minor revisions\n\n" +
    "⚠️ Advanced/complex features ke liye extra charges ho sakte hain.\n\n" +
    "💎 Professional business bot chahiye?\n" +
    "<b>Build My Bot</b> par tap karo."

}


// ==========================================
// 🔘 BUTTONS
// ==========================================

buttons = [

  [
    {
      text: "🚀 Build My Bot",
      callback_data: "ORDER_BUSINESS"
    },
    {
      text: "🔙 My Business Requests",
      callback_data: "MY_BUSINESS_REQUESTS"
    }
  ],

  [
    {
      text: "🎬 Live Demo",
      callback_data: "MENU_DEMO"
    },
    {
      text: "🟣 Professional",
      callback_data: "PRICE_PRO"
    }
  ],

  [
    {
      text: "💰 All Pricing",
      callback_data: "MENU_PRICING"
    }
  ]

]


// ==========================================
// 🆔 MESSAGE ID
// ==========================================

var messageId = null

if (
  typeof request !== "undefined" &&
  request &&
  request.message &&
  request.message.message_id
) {
  messageId = request.message.message_id
}


// ==========================================
// ✏️ SAME MESSAGE EDIT
// ==========================================

if (messageId) {

  try {

    Api.editMessageText({
      chat_id: uid,
      message_id: messageId,
      text: text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: buttons
      }
    })

  } catch (error) {

    try {

      Api.deleteMessage({
        chat_id: uid,
        message_id: messageId
      })

    } catch (deleteError) {
      // Ignore delete error
    }

    Api.sendMessage({
      chat_id: uid,
      text: text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: buttons
      }
    })

  }

} else {

  Api.sendMessage({
    chat_id: uid,
    text: text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons
    }
  })

}
