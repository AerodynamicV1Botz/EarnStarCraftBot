/*CMD
  command: SUPPORT_CONTACT
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
// SCRIPT 72 — UPDATED VERSION
// COMMAND NAME: SUPPORT_CONTACT
// STEP 5.2.2 — CONTACT SUPPORT
// 📁 MAIN MENU → 📁 LIVE DEMOS → 📁 SUPPORT → 📁 CONTACT SUPPORT
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
    "💬 <b>CONTACT SUPPORT DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "Need help with an order, product or service?\n\n" +
    "A support bot can give customers a simple way to reach the business team.\n\n" +

    "📩 <b>Support Request</b>\n" +
    "Customer can submit a question or issue through the bot.\n\n" +

    "👤 <b>Customer Details</b>\n" +
    "The bot can collect relevant contact information along with the request.\n\n" +

    "🎫 <b>Request Tracking</b>\n" +
    "Each request can receive a reference ID for easier follow-up.\n\n" +

    "🔔 <b>Updates</b>\n" +
    "Customers can receive notifications when their request is reviewed or updated.\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +
    "✨ This workflow can be customized for your business."

} else if (lang === "gujarati") {

  text =
    "💬 <b>CONTACT SUPPORT DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "Order, product અથવા service અંગે help જોઈએ છે?\n\n" +

    "Support bot customer ને business team સુધી સરળતાથી પહોંચવામાં મદદ કરી શકે છે.\n\n" +

    "📩 <b>Support Request</b>\n" +
    "Customer bot દ્વારા question અથવા issue submit કરી શકે છે.\n\n" +

    "👤 <b>Customer Details</b>\n" +
    "Bot request સાથે જરૂરી contact information collect કરી શકે છે.\n\n" +

    "🎫 <b>Request Tracking</b>\n" +
    "દરેક request માટે follow-up માટે reference ID બનાવી શકાય છે.\n\n" +

    "🔔 <b>Updates</b>\n" +
    "Request review અથવા update થાય ત્યારે customer ને notification મળી શકે છે.\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +
    "✨ આ workflow તમારા business પ્રમાણે customize કરી શકાય છે."

} else {

  text =
    "💬 <b>CONTACT SUPPORT DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "Order, product ya service ke regarding help chahiye?\n\n" +

    "Support bot customer ko business team tak easily reach karne ka simple way de sakta hai.\n\n" +

    "📩 <b>Support Request</b>\n" +
    "Customer bot ke through question ya issue submit kar sakta hai.\n\n" +

    "👤 <b>Customer Details</b>\n" +
    "Bot request ke saath required contact information collect kar sakta hai.\n\n" +

    "🎫 <b>Request Tracking</b>\n" +
    "Har request ko easy follow-up ke liye reference ID diya ja sakta hai.\n\n" +

    "🔔 <b>Updates</b>\n" +
    "Request review ya update hone par customer ko notification mil sakti hai.\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +
    "✨ Ye workflow aapke business ke according customize kiya ja sakta hai."
}

var buttons = [

  [
    {
      text: "🎫 Submit Support Request",
      callback_data: "SUPPORT_REQUEST"
    }
  ],

  [
    {
      text: "❓ FAQ",
      callback_data: "SUPPORT_FAQ"
    },
    {
      text: "🔔 Notifications",
      callback_data: "SUPPORT_NOTIFICATIONS"
    }
  ],

  [
    {
      text: "👑 Admin Features",
      callback_data: "SUPPORT_ADMIN"
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
