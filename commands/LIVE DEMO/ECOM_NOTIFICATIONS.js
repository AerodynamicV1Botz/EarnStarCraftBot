/*CMD
  command: ECOM_NOTIFICATIONS
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
// SCRIPT 63 — UPDATED VERSION
// COMMAND NAME: ECOM_NOTIFICATIONS
// STEP 5.1.4 — NOTIFICATION SYSTEM DEMO
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
    "🔔 <b>NOTIFICATION SYSTEM DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "A business bot can automatically send important updates to customers and admins.\n\n" +

    "👤 <b>Customer Notifications</b>\n" +
    "• Order received\n" +
    "• Order status updated\n" +
    "• Important announcements\n" +
    "• Support updates\n\n" +

    "👑 <b>Admin Notifications</b>\n" +
    "• New order received\n" +
    "• New customer enquiry\n" +
    "• New lead received\n" +
    "• Important system events\n\n" +

    "⚡ <b>Automation</b>\n" +
    "Notifications can be triggered automatically when specific events happen.\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +
    "✨ Message content, triggers and notification rules can be customized for your business."

} else if (lang === "gujarati") {

  text =
    "🔔 <b>NOTIFICATION SYSTEM DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "Business bot customers અને admins ને important updates automatically મોકલી શકે છે.\n\n" +

    "👤 <b>Customer Notifications</b>\n" +
    "• Order received\n" +
    "• Order status update\n" +
    "• Important announcements\n" +
    "• Support updates\n\n" +

    "👑 <b>Admin Notifications</b>\n" +
    "• New order received\n" +
    "• New customer enquiry\n" +
    "• New lead received\n" +
    "• Important system events\n\n" +

    "⚡ <b>Automation</b>\n" +
    "Specific event થાય ત્યારે notification automatically મોકલી શકાય છે.\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +
    "✨ Messages, triggers અને notification rules business પ્રમાણે customize કરી શકાય છે."

} else {

  text =
    "🔔 <b>NOTIFICATION SYSTEM DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "Business bot customers aur admins ko important updates automatically send kar sakta hai.\n\n" +

    "👤 <b>Customer Notifications</b>\n" +
    "• Order received\n" +
    "• Order status updated\n" +
    "• Important announcements\n" +
    "• Support updates\n\n" +

    "👑 <b>Admin Notifications</b>\n" +
    "• New order received\n" +
    "• New customer enquiry\n" +
    "• New lead received\n" +
    "• Important system events\n\n" +

    "⚡ <b>Automation</b>\n" +
    "Specific event hone par notifications automatically trigger ho sakti hain.\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +
    "✨ Message content, triggers aur notification rules aapke business ke according customize kiye ja sakte hain."
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
        ? "👤 Customer"
        : lang === "gujarati"
        ? "👤 ગ્રાહક"
        : "👤 Customer",
      callback_data: "ECOM_CUSTOMER"
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

function showNotificationMenu() {

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

showNotificationMenu()
