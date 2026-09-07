/*CMD
  command: SUPPORT_FAQ_DELIVERY
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
// SCRIPT 67 — UPDATED VERSION
// COMMAND NAME: SUPPORT_FAQ_DELIVERY
// STEP 5.2.1.1 — DELIVERY FAQ
// 📁 MAIN MENU → 📁 LIVE DEMOS → 📁 CUSTOMER SUPPORT → 📁 FAQ
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid

var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

var text = ""

if (lang === "english") {

  text =
    "🚚 <b>DELIVERY FAQ</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "📦 <b>How does delivery work?</b>\n\n" +
    "Delivery information can be displayed directly inside the bot. Customers can see the available delivery options and relevant order updates.\n\n" +

    "⏱️ <b>Delivery Time</b>\n" +
    "Estimated delivery time can be shown according to the customer's location and business rules.\n\n" +

    "🔔 <b>Delivery Updates</b>\n" +
    "Customers can receive notifications when their order status changes.\n\n" +

    "📞 <b>Need Help?</b>\n" +
    "Customers can contact the support team directly through the bot.\n\n" +

    "💡 All delivery information and workflows can be customized for your business."

} else if (lang === "gujarati") {

  text =
    "🚚 <b>DELIVERY FAQ</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "📦 <b>Delivery કેવી રીતે કામ કરે છે?</b>\n\n" +
    "Delivery information bot માં directly બતાવી શકાય છે. Customer available delivery options અને order updates જોઈ શકે છે.\n\n" +

    "⏱️ <b>Delivery Time</b>\n" +
    "Customer location અને business rules પ્રમાણે estimated delivery time બતાવી શકાય છે.\n\n" +

    "🔔 <b>Delivery Updates</b>\n" +
    "Order status change થાય ત્યારે customer ને notification મળી શકે છે.\n\n" +

    "📞 <b>Help જોઈએ?</b>\n" +
    "Customer bot દ્વારા support team સાથે contact કરી શકે છે.\n\n" +

    "💡 Delivery information અને workflows business પ્રમાણે customize કરી શકાય છે."

} else {

  text =
    "🚚 <b>DELIVERY FAQ</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "📦 <b>Delivery kaise work karti hai?</b>\n\n" +
    "Delivery information bot ke andar directly show ki ja sakti hai. Customer available delivery options aur order updates dekh sakta hai.\n\n" +

    "⏱️ <b>Delivery Time</b>\n" +
    "Customer location aur business rules ke according estimated delivery time show kiya ja sakta hai.\n\n" +

    "🔔 <b>Delivery Updates</b>\n" +
    "Order status change hone par customer ko notification mil sakti hai.\n\n" +

    "📞 <b>Help chahiye?</b>\n" +
    "Customer bot ke through support team se directly contact kar sakta hai.\n\n" +

    "💡 Delivery information aur workflows aapke business ke according customize kiye ja sakte hain."
}

var buttons = [

  [
    {
      text: lang === "english"
        ? "💳 Payments"
        : lang === "gujarati"
        ? "💳 પેમેન્ટ્સ"
        : "💳 Payments",
      callback_data: "SUPPORT_FAQ_PAYMENT"
    },
    {
      text: lang === "english"
        ? "📦 Orders"
        : lang === "gujarati"
        ? "📦 ઓર્ડર્સ"
        : "📦 Orders",
      callback_data: "SUPPORT_FAQ_ORDER"
    }
  ],

  [
    {
      text: lang === "english"
        ? "🔄 Returns"
        : lang === "gujarati"
        ? "🔄 રિટર્ન્સ"
        : "🔄 Returns",
      callback_data: "SUPPORT_FAQ_RETURN"
    },
    {
      text: lang === "english"
        ? "🛠️ Technical Help"
        : lang === "gujarati"
        ? "🛠️ ટેક્નિકલ મદદ"
        : "🛠️ Technical Help",
      callback_data: "SUPPORT_FAQ_TECH"
    }
  ],

  [
    {
      text: lang === "english"
        ? "❓ FAQ Menu"
        : lang === "gujarati"
        ? "❓ FAQ મેનુ"
        : "❓ FAQ Menu",
      callback_data: "SUPPORT_FAQ"
    }
  ],

  [
    {
      text: lang === "english"
        ? "🛟 Support Demo"
        : lang === "gujarati"
        ? "🛟 સપોર્ટ ડેમો"
        : "🛟 Support Demo",
      callback_data: "DEMO_SUPPORT"
    },
    {
      text: lang === "english"
        ? "🎬 All Demos"
        : lang === "gujarati"
        ? "🎬 બધા ડેમો"
        : "🎬 All Demos",
      callback_data: "MENU_DEMO"
    }
  ],

  [
    {
      text: lang === "english"
        ? "🚀 Build Support Bot"
        : lang === "gujarati"
        ? "🚀 સપોર્ટ બોટ બનાવો"
        : "🚀 Build Support Bot",
      callback_data: "BUILD_SUPPORT"
    }
  ],

  [
    {
      text: lang === "english"
        ? "🏠 Main Menu"
        : lang === "gujarati"
        ? "🏠 મુખ્ય મેનુ"
        : "🏠 Main Menu",
      callback_data: "BACK_MAIN_MENU"
    }
  ]

]

function showDeliveryFaq() {

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

}

showDeliveryFaq()
