/*CMD
  command: SUPPORT_FAQ_RETURN
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
// SCRIPT 70 — UPDATED VERSION
// COMMAND NAME: SUPPORT_FAQ_RETURN
// STEP 5.2.1.4 — RETURNS & REFUNDS FAQ
// 📁 MAIN MENU → 📁 LIVE DEMOS → 📁 SUPPORT → 📁 FAQ → 📁 RETURNS
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
    "🔄 <b>RETURNS & REFUNDS FAQ</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "📦 <b>Can I request a return?</b>\n" +
    "A business can define its own return eligibility and conditions. Customers can submit a return request through the bot.\n\n" +

    "📝 <b>How can I submit a request?</b>\n" +
    "The bot can collect the order ID, reason and other required information.\n\n" +

    "⏳ <b>How is the request handled?</b>\n" +
    "The request can be forwarded to the authorized team for review and status updates.\n\n" +

    "💰 <b>How are refunds handled?</b>\n" +
    "Refund rules can be configured according to the business policy and supported payment provider.\n\n" +

    "🔔 <b>Will I receive updates?</b>\n" +
    "Customers can receive notifications when their request status changes.\n\n" +

    "💡 Return and refund workflows can be customized for each business."

} else if (lang === "gujarati") {

  text =
    "🔄 <b>RETURNS & REFUNDS FAQ</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "📦 <b>Return request કરી શકાય?</b>\n" +
    "Business પોતાની return policy અને conditions નક્કી કરી શકે છે. Customer bot દ્વારા return request submit કરી શકે છે.\n\n" +

    "📝 <b>Request કેવી રીતે submit કરવી?</b>\n" +
    "Bot order ID, reason અને જરૂરી information collect કરી શકે છે.\n\n" +

    "⏳ <b>Request કેવી રીતે handle થશે?</b>\n" +
    "Request authorized team સુધી review અને status update માટે મોકલી શકાય છે.\n\n" +

    "💰 <b>Refund કેવી રીતે handle થશે?</b>\n" +
    "Refund rules business policy અને supported payment provider પ્રમાણે configure કરી શકાય છે.\n\n" +

    "🔔 <b>Updates મળશે?</b>\n" +
    "Request status change થાય ત્યારે customer ને notification મળી શકે છે.\n\n" +

    "💡 Return અને refund workflow business પ્રમાણે customize કરી શકાય છે."

} else {

  text =
    "🔄 <b>RETURNS & REFUNDS FAQ</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "📦 <b>Return request kar sakte hain?</b>\n" +
    "Business apni return policy aur conditions define kar sakta hai. Customer bot ke through return request submit kar sakta hai.\n\n" +

    "📝 <b>Request kaise submit karein?</b>\n" +
    "Bot order ID, reason aur required information collect kar sakta hai.\n\n" +

    "⏳ <b>Request kaise handle hogi?</b>\n" +
    "Request authorized team ko review aur status updates ke liye forward ki ja sakti hai.\n\n" +

    "💰 <b>Refund kaise handle hoga?</b>\n" +
    "Refund rules business policy aur supported payment provider ke according configure kiye ja sakte hain.\n\n" +

    "🔔 <b>Updates milenge?</b>\n" +
    "Request status change hone par customer ko notification mil sakti hai.\n\n" +

    "💡 Return aur refund workflows har business ke according customize kiye ja sakte hain."
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
      text: "📦 Orders",
      callback_data: "SUPPORT_FAQ_ORDER"
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
