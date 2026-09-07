/*CMD
  command: SUPPORT_FAQ
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
// SCRIPT 66 — UPDATED VERSION
// COMMAND NAME: SUPPORT_FAQ
// STEP 5.2.1 — SUPPORT FAQ DEMO
// 📁 MAIN MENU → 📁 LIVE DEMOS → 📁 CUSTOMER SUPPORT
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
    "❓ <b>SUPPORT FAQ DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Customers can quickly find answers without waiting for an agent.\n\n" +

    "📌 <b>Common FAQ Categories</b>\n\n" +
    "🚚 Delivery & Shipping\n" +
    "💳 Payments\n" +
    "📦 Orders\n" +
    "🔄 Returns & Refunds\n" +
    "🛠️ Technical Help\n" +
    "📞 Contact Support\n\n" +

    "⚡ <b>How it works</b>\n" +
    "Customer selects a question → Bot instantly shows the relevant answer → Customer can return to the FAQ menu or contact support.\n\n" +

    "💡 FAQ content can be completely customized for your business."

} else if (lang === "gujarati") {

  text =
    "❓ <b>SUPPORT FAQ DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Customers agent ની રાહ જોયા વગર common questions ના answers મેળવી શકે છે.\n\n" +

    "📌 <b>Common FAQ Categories</b>\n\n" +
    "🚚 Delivery & Shipping\n" +
    "💳 Payments\n" +
    "📦 Orders\n" +
    "🔄 Returns & Refunds\n" +
    "🛠️ Technical Help\n" +
    "📞 Contact Support\n\n" +

    "⚡ <b>How it works</b>\n" +
    "Customer question select કરે → Bot relevant answer બતાવે → Customer FAQ અથવા Support પર પાછો જઈ શકે છે.\n\n" +

    "💡 FAQ content તમારા business પ્રમાણે completely customize કરી શકાય છે."

} else {

  text =
    "❓ <b>SUPPORT FAQ DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Customers agent ka wait kiye bina common questions ke answers quickly paa sakte hain.\n\n" +

    "📌 <b>Common FAQ Categories</b>\n\n" +
    "🚚 Delivery & Shipping\n" +
    "💳 Payments\n" +
    "📦 Orders\n" +
    "🔄 Returns & Refunds\n" +
    "🛠️ Technical Help\n" +
    "📞 Contact Support\n\n" +

    "⚡ <b>How it works</b>\n" +
    "Customer question select karta hai → Bot relevant answer instantly show karta hai → Customer FAQ ya Support par wapas ja sakta hai.\n\n" +

    "💡 FAQ content aapke business ke according completely customize kiya ja sakta hai."
}

var buttons = [

  [
    {
      text: lang === "english"
        ? "🚚 Delivery"
        : lang === "gujarati"
        ? "🚚 ડિલિવરી"
        : "🚚 Delivery",
      callback_data: "SUPPORT_FAQ_DELIVERY"
    },
    {
      text: lang === "english"
        ? "💳 Payments"
        : lang === "gujarati"
        ? "💳 પેમેન્ટ્સ"
        : "💳 Payments",
      callback_data: "SUPPORT_FAQ_PAYMENT"
    }
  ],

  [
    {
      text: lang === "english"
        ? "📦 Orders"
        : lang === "gujarati"
        ? "📦 ઓર્ડર્સ"
        : "📦 Orders",
      callback_data: "SUPPORT_FAQ_ORDER"
    },
    {
      text: lang === "english"
        ? "🔄 Returns"
        : lang === "gujarati"
        ? "🔄 રિટર્ન્સ"
        : "🔄 Returns",
      callback_data: "SUPPORT_FAQ_RETURN"
    }
  ],

  [
    {
      text: lang === "english"
        ? "🛠️ Technical Help"
        : lang === "gujarati"
        ? "🛠️ ટેક્નિકલ મદદ"
        : "🛠️ Technical Help",
      callback_data: "SUPPORT_FAQ_TECH"
    },
    {
      text: lang === "english"
        ? "📞 Contact"
        : lang === "gujarati"
        ? "📞 સંપર્ક"
        : "📞 Contact",
      callback_data: "SUPPORT_CONTACT"
    }
  ],

  [
    {
      text: lang === "english"
        ? "🎫 Support Request"
        : lang === "gujarati"
        ? "🎫 સપોર્ટ રિક્વેસ્ટ"
        : "🎫 Support Request",
      callback_data: "SUPPORT_REQUEST"
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
        ? "🚀 Build Similar Bot"
        : lang === "gujarati"
        ? "🚀 આવો બોટ બનાવો"
        : "🚀 Build Similar Bot",
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

function showFaqMenu() {

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

showFaqMenu()
