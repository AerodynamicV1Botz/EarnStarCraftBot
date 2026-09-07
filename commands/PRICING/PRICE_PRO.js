/*CMD
  command: PRICE_PRO
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
// SCRIPT 36 — UPDATED VERSION
// COMMAND NAME: PRICE_PRO
// STEP 4.3 — PROFESSIONAL PACKAGE
// 📁 MAIN MENU → 📁 PRICING → PROFESSIONAL PACKAGE
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
// 🆔 GET USER & LANGUAGE
// ==========================================

var uid = user.telegramid

var userData = Bot.getProperty(
  "USER_" + uid
) || {}

var lang =
  userData.language || "hinglish"

// ==========================================
// 📝 PACKAGE TEXT
// ==========================================

var text = ""

if (lang === "english") {
  text =
    "🟣 <b>PROFESSIONAL PACKAGE</b>\n\n" +
    "💰 <b>Starting Price: ₹2,999+</b>\n\n" +
    "🚀 A complete professional Telegram bot solution for serious businesses, creators and communities.\n\n" +
    "✨ <b>Includes:</b>\n" +
    "• Everything in Business Package\n" +
    "• 🧠 Advanced automation\n" +
    "• 👤 Advanced user management\n" +
    "• 📊 Advanced statistics & tracking\n" +
    "• 📢 Smart broadcast system\n" +
    "• 📝 Custom forms & lead collection\n" +
    "• 🔔 Automated admin notifications\n" +
    "• 🔐 Admin & permission controls\n" +
    "• ⚙️ Custom workflows\n" +
    "• 🗂️ Data & user management\n" +
    "• 🎨 Professional custom bot flow\n" +
    "• 🛠️ Custom features based on requirements\n\n" +
    "⏱️ <b>Delivery:</b> Depends on project requirements\n" +
    "🔄 <b>Revision:</b> 3 minor revisions\n\n" +
    "⚠️ API integrations, external services or highly advanced features may have additional charges.\n\n" +
    "💎 Need a fully customized solution?\n" +
    "Tap <b>Build My Bot</b> and tell us your requirements."

} else if (lang === "gujarati") {
  text =
    "🟣 <b>પ્રોફેશનલ પેકેજ</b>\n\n" +
    "💰 <b>શરૂઆતની કિંમત: ₹2,999+</b>\n\n" +
    "🚀 Serious businesses, creators અને communities માટે complete professional Telegram bot solution.\n\n" +
    "✨ <b>આમાં મળશે:</b>\n" +
    "• Business Package ની બધી સુવિધાઓ\n" +
    "• 🧠 Advanced automation\n" +
    "• 👤 Advanced user management\n" +
    "• 📊 Advanced statistics અને tracking\n" +
    "• 📢 Smart broadcast system\n" +
    "• 📝 Custom forms અને lead collection\n" +
    "• 🔔 Automated admin notifications\n" +
    "• 🔐 Admin અને permission controls\n" +
    "• ⚙️ Custom workflows\n" +
    "• 🗂️ Data અને user management\n" +
    "• 🎨 Professional custom bot flow\n" +
    "• 🛠️ Requirements મુજબ custom features\n\n" +
    "⏱️ <b>Delivery:</b> Project requirements પર આધારિત\n" +
    "🔄 <b>Revision:</b> 3 minor revisions\n\n" +
    "⚠️ API integrations, external services અથવા highly advanced features માટે extra charges થઈ શકે છે.\n\n" +
    "💎 Fully customized solution જોઈએ છે?\n" +
    "<b>Build My Bot</b> પર tap કરીને requirements મોકલો."

} else {
  text =
    "🟣 <b>PROFESSIONAL PACKAGE</b>\n\n" +
    "💰 <b>Starting Price: ₹2,999+</b>\n\n" +
    "🚀 Serious businesses, creators aur communities ke liye complete professional Telegram bot solution.\n\n" +
    "✨ <b>Isme milega:</b>\n" +
    "• Business Package ki saari features\n" +
    "• 🧠 Advanced automation\n" +
    "• 👤 Advanced user management\n" +
    "• 📊 Advanced statistics & tracking\n" +
    "• 📢 Smart broadcast system\n" +
    "• 📝 Custom forms & lead collection\n" +
    "• 🔔 Automated admin notifications\n" +
    "• 🔐 Admin & permission controls\n" +
    "• ⚙️ Custom workflows\n" +
    "• 🗂️ Data & user management\n" +
    "• 🎨 Professional custom bot flow\n" +
    "• 🛠️ Requirements ke according custom features\n\n" +
    "⏱️ <b>Delivery:</b> Project requirements par depend\n" +
    "🔄 <b>Revision:</b> 3 minor revisions\n\n" +
    "⚠️ API integrations, external services ya highly advanced features ke liye extra charges ho sakte hain.\n\n" +
    "💎 Fully customized solution chahiye?\n" +
    "<b>Build My Bot</b> par tap karke apni requirements bhejo."
}

// ==========================================
// 🔘 BUTTONS
// ==========================================

var buttons = [
  [
    {
      text: "🚀 Build My Bot",
      callback_data: "ORDER_PRO"
    }
  ],
  [
    {
      text: "📋 My Professional Requests",
      callback_data: "MY_PRO_REQUESTS"
    }
  ],
  [
    {
      text: "🎬 Live Demo",
      callback_data: "MENU_DEMO"
    },
    {
      text: "💎 Custom Package",
      callback_data: "PRICE_CUSTOM"
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
// 🖼️ SAME MESSAGE EDIT / FALLBACK
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
    } catch (deleteError) {}

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
