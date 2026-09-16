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

/*CMD
  command: PRICE_PRO
  need_reply: false
  folder: PRICING
*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 36 — PRICE_PRO
// STEP 4.3 — PROFESSIONAL PACKAGE
// PURPOSE: Show Professional package details and order options
// CONNECTIONS: MENU_PRICING → PRICE_PRO
// NEXT: ORDER_PRO / MY_ORDERS / MENU_DEMO / PRICE_CUSTOM
// ==========================================


// ==========================================
// ⚡ CALLBACK RESPONSE
// ==========================================

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
    // Ignore callback errors
  }
}


// ==========================================
// 👤 USER DATA
// ==========================================

var uid = String(user.telegramid)

var userData = Bot.getProperty(
  "USER_" + uid
)

if (
  !userData ||
  typeof userData !== "object" ||
  Array.isArray(userData)
) {
  userData = {}
}


// ==========================================
// 🌐 LANGUAGE
// ==========================================

var lang = userData.language || "hinglish"

if (
  lang !== "hinglish" &&
  lang !== "english" &&
  lang !== "gujarati"
) {
  lang = "hinglish"
}


// ==========================================
// 📝 USER ACTIVITY
// ==========================================

var now = new Date().toISOString()

userData.lastCommand = "PRICE_PRO"
userData.lastVisitedAt = now
userData.updatedAt = now

Bot.setProperty(
  "USER_" + uid,
  userData,
  "json"
)


// ==========================================
// 💬 CHAT ID + MESSAGE ID
// ==========================================

var chatId = uid
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
    chatId = request.message.chat.id
  }

  if (request.message.message_id) {
    messageId = request.message.message_id
  }
}


// ==========================================
// 📝 PACKAGE TEXT
// ==========================================

var text = ""
var buttons = []


// ==========================================
// 🇬🇧 ENGLISH
// ==========================================

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


  buttons = [
    [
      {
        text: "🚀 Build My Bot",
        callback_data: "ORDER_PRO"
      }
    ],
    [
      {
        text: "📦 My Orders",
        callback_data: "MY_ORDERS"
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

}


// ==========================================
// 🇬🇺 GUJARATI
// ==========================================

else if (lang === "gujarati") {

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


  buttons = [
    [
      {
        text: "🚀 Bot બનાવો",
        callback_data: "ORDER_PRO"
      }
    ],
    [
      {
        text: "📦 My Orders",
        callback_data: "MY_ORDERS"
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
        text: "💰 બધા Pricing",
        callback_data: "MENU_PRICING"
      }
    ]
  ]

}


// ==========================================
// 🇮🇳 HINGLISH
// ==========================================

else {

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


  buttons = [
    [
      {
        text: "🚀 Build My Bot",
        callback_data: "ORDER_PRO"
      }
    ],
    [
      {
        text: "📦 My Orders",
        callback_data: "MY_ORDERS"
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

}


// ==========================================
// ✏️ SAME MESSAGE EDIT / FALLBACK
// ==========================================

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

    try {

      Api.deleteMessage({
        chat_id: chatId,
        message_id: messageId
      })

    } catch (deleteError) {
      // Ignore delete error
    }

    Api.sendMessage({
      chat_id: chatId,
      text: text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: buttons
      }
    })

  }

} else {

  Api.sendMessage({
    chat_id: chatId,
    text: text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons
    }
  })

}
