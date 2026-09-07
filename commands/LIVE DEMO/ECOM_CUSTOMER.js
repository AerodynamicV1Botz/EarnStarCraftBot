/*CMD
  command: ECOM_CUSTOMER
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
// SCRIPT 62 — UPDATED VERSION
// COMMAND NAME: ECOM_CUSTOMER
// STEP 5.1.3 — CUSTOMER SYSTEM DEMO
// 📁 MAIN MENU → 📁 LIVE DEMOS → 📁 E-COMMERCE
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
    "👤 <b>CUSTOMER SYSTEM DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "A Telegram shop bot can maintain a simple customer profile and collect the information required for an order.\n\n" +

    "📝 <b>Customer Information</b>\n" +
    "• Name\n" +
    "• Contact number\n" +
    "• Telegram ID\n" +
    "• Order history\n" +
    "• Enquiry details\n\n" +

    "📦 <b>Order Tracking</b>\n" +
    "Customers can view their order status and related information.\n\n" +

    "💬 <b>Support</b>\n" +
    "Customers can contact the business directly through the bot.\n\n" +

    "🔐 <b>Data Management</b>\n" +
    "Customer data can be organized and managed through an admin system.\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +
    "✨ Customer fields and workflows can be customized according to your business."

} else if (lang === "gujarati") {

  text =
    "👤 <b>CUSTOMER SYSTEM DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "Telegram shop bot customer profile બનાવી શકે છે અને order માટે જરૂરી information collect કરી શકે છે.\n\n" +

    "📝 <b>Customer Information</b>\n" +
    "• Name\n" +
    "• Contact number\n" +
    "• Telegram ID\n" +
    "• Order history\n" +
    "• Enquiry details\n\n" +

    "📦 <b>Order Tracking</b>\n" +
    "Customer પોતાના order નો status જોઈ શકે છે.\n\n" +

    "💬 <b>Support</b>\n" +
    "Customer bot દ્વારા business સાથે contact કરી શકે છે.\n\n" +

    "🔐 <b>Data Management</b>\n" +
    "Customer data admin system દ્વારા manage કરી શકાય છે.\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +
    "✨ Customer fields અને workflows business પ્રમાણે customize કરી શકાય છે."

} else {

  text =
    "👤 <b>CUSTOMER SYSTEM DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "Telegram shop bot simple customer profile maintain kar sakta hai aur order ke liye required information collect kar sakta hai.\n\n" +

    "📝 <b>Customer Information</b>\n" +
    "• Name\n" +
    "• Contact number\n" +
    "• Telegram ID\n" +
    "• Order history\n" +
    "• Enquiry details\n\n" +

    "📦 <b>Order Tracking</b>\n" +
    "Customer apne order ka status aur related information dekh sakta hai.\n\n" +

    "💬 <b>Support</b>\n" +
    "Customer bot ke through business se directly contact kar sakta hai.\n\n" +

    "🔐 <b>Data Management</b>\n" +
    "Customer data ko admin system ke through organize aur manage kiya ja sakta hai.\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "✨ Customer fields aur workflows aapke business ke according customize kiye ja sakte hain."
}

var buttons = [

  [
    {
      text: lang === "english"
        ? "📦 Order Flow"
        : lang === "gujarati"
        ? "📦 ઓર્ડર ફ્લો"
        : "📦 Order Flow",
      callback_data: "ECOM_ORDER_FLOW"
    },
    {
      text: lang === "english"
        ? "🔔 Notifications"
        : lang === "gujarati"
        ? "🔔 નોટિફિકેશન"
        : "🔔 Notifications",
      callback_data: "ECOM_NOTIFICATIONS"
    }
  ],

  [
    {
      text: lang === "english"
        ? "👑 Admin Features"
        : lang === "gujarati"
        ? "👑 એડમિન ફીચર્સ"
        : "👑 Admin Features",
      callback_data: "ECOM_ADMIN"
    }
  ],

  [
    {
      text: lang === "english"
        ? "🚀 Build Similar Bot"
        : lang === "gujarati"
        ? "🚀 આવો બોટ બનાવો"
        : "🚀 Build Similar Bot",
      callback_data: "BUILD_CUSTOM"
    }
  ],

  [
    {
      text: lang === "english"
        ? "🛒 Products"
        : lang === "gujarati"
        ? "🛒 પ્રોડક્ટ્સ"
        : "🛒 Products",
      callback_data: "ECOM_PRODUCTS"
    },
    {
      text: lang === "english"
        ? "🎬 E-Commerce Demo"
        : lang === "gujarati"
        ? "🎬 ઈ-કોમર્સ ડેમો"
        : "🎬 E-Commerce Demo",
      callback_data: "DEMO_ECOMMERCE"
    }
  ],

  [
    {
      text: lang === "english"
        ? "🎬 All Demos"
        : lang === "gujarati"
        ? "🎬 બધા ડેમો"
        : "🎬 All Demos",
      callback_data: "MENU_DEMO"
    },
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

function showCustomerMenu() {

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

showCustomerMenu()
