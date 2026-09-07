/*CMD
  command: SUPPORT_FAQ_ORDER
  help: 
  need_reply: false
  auto_retry_time: 
  folder: LIVE DEMO

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 69 — UPDATED VERSION
// COMMAND NAME: SUPPORT_FAQ_ORDER
// STEP 5.2.1.3 — ORDER FAQ
// 📁 MAIN MENU → 📁 LIVE DEMOS → 📁 SUPPORT → 📁 FAQ → 📁 ORDER
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid

var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

var text = ""

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

if (lang === "english") {

  text =
    "📦 <b>ORDER FAQ</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🛒 <b>How can I place an order?</b>\n" +
    "Customers can select a product, choose the required quantity and submit their details through the bot.\n\n" +

    "📊 <b>How can I check my order?</b>\n" +
    "A bot can provide an order-status section where customers can view available updates.\n\n" +

    "🔔 <b>Will I receive order updates?</b>\n" +
    "Yes. The bot can send notifications when the order status changes.\n\n" +

    "👤 <b>Need help with an order?</b>\n" +
    "Customers can contact the support team through the bot.\n\n" +

    "💡 Order flow and status options can be customized for your business."

} else if (lang === "gujarati") {

  text =
    "📦 <b>ORDER FAQ</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🛒 <b>Order કેવી રીતે કરવો?</b>\n" +
    "Customer product select કરીને, quantity પસંદ કરીને અને પોતાની details submit કરી શકે છે.\n\n" +

    "📊 <b>Order કેવી રીતે check કરવો?</b>\n" +
    "Bot માં order-status section બનાવી શકાય છે જ્યાં customer available updates જોઈ શકે છે.\n\n" +

    "🔔 <b>Order updates મળશે?</b>\n" +
    "હા. Order status change થાય ત્યારે bot notification મોકલી શકે છે.\n\n" +

    "👤 <b>Order માટે help જોઈએ?</b>\n" +
    "Customer bot દ્વારા support team સાથે contact કરી શકે છે.\n\n" +

    "💡 Order flow અને status options business પ્રમાણે customize કરી શકાય છે."

} else {

  text =
    "📦 <b>ORDER FAQ</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🛒 <b>Order kaise place karein?</b>\n" +
    "Customer product select karke, quantity choose karke aur apni details submit kar sakta hai.\n\n" +

    "📊 <b>Order kaise check karein?</b>\n" +
    "Bot mein order-status section diya ja sakta hai jahan customer available updates dekh sakta hai.\n\n" +

    "🔔 <b>Order updates milenge?</b>\n" +
    "Haan. Order status change hone par bot notification send kar sakta hai.\n\n" +

    "👤 <b>Order mein help chahiye?</b>\n" +
    "Customer bot ke through support team se contact kar sakta hai.\n\n" +

    "💡 Order flow aur status options aapke business ke according customize kiye ja sakte hain."
}

var buttons = [

  [
    {
      text: "🚚 Delivery",
      callback_data: "SUPPORT_FAQ_DELIVERY"
    },
    {
      text: "💳 Payments",
      callback_data: "SUPPORT_FAQ_PAYMENT"
    }
  ],

  [
    {
      text: "🔄 Returns",
      callback_data: "SUPPORT_FAQ_RETURN"
    },
    {
      text: "🛠️ Technical Help",
      callback_data: "SUPPORT_FAQ_TECH"
    }
  ],

  [
    {
      text: "❓ FAQ Menu",
      callback_data: "SUPPORT_FAQ"
    }
  ],

  [
    {
      text: "🛟 Support Demo",
      callback_data: "DEMO_SUPPORT"
    },
    {
      text: "🎬 All Demos",
      callback_data: "MENU_DEMO"
    }
  ],

  [
    {
      text: "🚀 Build Support Bot",
      callback_data: "BUILD_SUPPORT"
    }
  ],

  [
    {
      text: "🏠 Main Menu",
      callback_data: "BACK_MAIN_MENU"
    }
  ]

]

if (
  typeof request !== "undefined" &&
  request.message &&
  request.message.message_id
) {

  try {

    Api.editMessageText({
      chat_id: uid,
      message_id: request.message.message_id,
      text: text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: buttons
      }
    })

    return

  } catch (error) {

    try {

      Api.deleteMessage({
        chat_id: uid,
        message_id: request.message.message_id
      })

    } catch (deleteError) {}

  }
}

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
})
