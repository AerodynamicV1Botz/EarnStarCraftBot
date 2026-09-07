/*CMD
  command: SUPPORT_FAQ_PAYMENT
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
// SCRIPT 68 — UPDATED VERSION
// COMMAND NAME: SUPPORT_FAQ_PAYMENT
// STEP 5.2.1.2 — PAYMENT FAQ
// 📁 MAIN MENU → 📁 LIVE DEMOS → 📁 SUPPORT → 📁 FAQ → 📁 PAYMENT
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
    "💳 <b>PAYMENT FAQ</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "💰 <b>Available Payment Methods</b>\n\n" +
    "A business bot can display the payment methods supported by your business.\n\n" +

    "🧾 <b>Payment Confirmation</b>\n" +
    "After a payment is received, the order status can be updated by the authorized admin or payment system.\n\n" +

    "🔔 <b>Payment Updates</b>\n" +
    "Customers can receive notifications about payment or order status.\n\n" +

    "🔐 <b>Secure Handling</b>\n" +
    "Payment processing should use a suitable payment provider and secure verification system.\n\n" +

    "💡 Payment methods and workflows can be customized according to your business requirements."

} else if (lang === "gujarati") {

  text =
    "💳 <b>PAYMENT FAQ</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "💰 <b>Available Payment Methods</b>\n\n" +
    "Business bot તમારા business દ્વારા supported payment methods બતાવી શકે છે.\n\n" +

    "🧾 <b>Payment Confirmation</b>\n" +
    "Payment receive થયા પછી authorized admin અથવા payment system દ્વારા order status update કરી શકાય છે.\n\n" +

    "🔔 <b>Payment Updates</b>\n" +
    "Customer ને payment અથવા order status ના updates મળી શકે છે.\n\n" +

    "🔐 <b>Secure Handling</b>\n" +
    "Payment processing માટે suitable payment provider અને secure verification system ઉપયોગ કરવો જોઈએ.\n\n" +

    "💡 Payment methods અને workflows business requirements પ્રમાણે customize કરી શકાય છે."

} else {

  text =
    "💳 <b>PAYMENT FAQ</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "💰 <b>Available Payment Methods</b>\n\n" +
    "Business bot aapke business mein supported payment methods display kar sakta hai.\n\n" +

    "🧾 <b>Payment Confirmation</b>\n" +
    "Payment receive hone ke baad authorized admin ya payment system order status update kar sakta hai.\n\n" +

    "🔔 <b>Payment Updates</b>\n" +
    "Customer ko payment ya order status ke updates mil sakte hain.\n\n" +

    "🔐 <b>Secure Handling</b>\n" +
    "Payment processing ke liye suitable payment provider aur secure verification system use karna chahiye.\n\n" +

    "💡 Payment methods aur workflows aapke business requirements ke according customize kiye ja sakte hain."
}

var buttons = [

  [
    {
      text: "🚚 Delivery",
      callback_data: "SUPPORT_FAQ_DELIVERY"
    },
    {
      text: "📦 Orders",
      callback_data: "SUPPORT_FAQ_ORDER"
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
