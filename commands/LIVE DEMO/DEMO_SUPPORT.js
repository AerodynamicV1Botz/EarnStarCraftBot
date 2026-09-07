/*CMD
  command: DEMO_SUPPORT
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
// SCRIPT 65 — UPDATED VERSION
// COMMAND NAME: DEMO_SUPPORT
// STEP 5.2 — CUSTOMER SUPPORT BOT DEMO
// 📁 MAIN MENU → 📁 LIVE DEMOS
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
    "🛟 <b>CUSTOMER SUPPORT BOT DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "✨ A support bot can handle common customer questions and route important requests to the right team.\n\n" +

    "❓ <b>FAQ System</b>\n" +
    "Frequently asked questions can be answered automatically.\n\n" +

    "💬 <b>Contact Support</b>\n" +
    "Customers can send their questions directly through the bot.\n\n" +

    "🎫 <b>Support Requests</b>\n" +
    "Requests can be collected and organized for the support team.\n\n" +

    "🔔 <b>Notifications</b>\n" +
    "Customers can receive updates about their requests.\n\n" +

    "👑 <b>Admin Management</b>\n" +
    "Admins can review requests and manage support workflows.\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +
    "👇 <b>Explore the support demo:</b>"

} else if (lang === "gujarati") {

  text =
    "🛟 <b>CUSTOMER SUPPORT BOT DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "✨ Support bot common customer questions handle કરી શકે છે અને important requests યોગ્ય team સુધી પહોંચાડી શકે છે.\n\n" +

    "❓ <b>FAQ System</b>\n" +
    "Frequently asked questions automatically answer કરી શકાય છે.\n\n" +

    "💬 <b>Contact Support</b>\n" +
    "Customers bot દ્વારા સીધા questions મોકલી શકે છે.\n\n" +

    "🎫 <b>Support Requests</b>\n" +
    "Requests collect અને organize કરી શકાય છે.\n\n" +

    "🔔 <b>Notifications</b>\n" +
    "Customers ને requests ના updates મળી શકે છે.\n\n" +

    "👑 <b>Admin Management</b>\n" +
    "Admins support requests review અને manage કરી શકે છે.\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +
    "👇 <b>Support demo explore કરો:</b>"

} else {

  text =
    "🛟 <b>CUSTOMER SUPPORT BOT DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "✨ Support bot common customer questions handle kar sakta hai aur important requests ko right team tak route kar sakta hai.\n\n" +

    "❓ <b>FAQ System</b>\n" +
    "Frequently asked questions automatically answer kiye ja sakte hain.\n\n" +

    "💬 <b>Contact Support</b>\n" +
    "Customers bot ke through directly questions bhej sakte hain.\n\n" +

    "🎫 <b>Support Requests</b>\n" +
    "Requests collect aur organize ki ja sakti hain.\n\n" +

    "🔔 <b>Notifications</b>\n" +
    "Customers ko unki requests ke updates mil sakte hain.\n\n" +

    "👑 <b>Admin Management</b>\n" +
    "Admins support requests ko review aur manage kar sakte hain.\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +
    "👇 <b>Support demo explore karein:</b>"
}

var buttons = [

  [
    {
      text: lang === "english"
        ? "❓ FAQ Demo"
        : lang === "gujarati"
        ? "❓ FAQ ડેમો"
        : "❓ FAQ Demo",
      callback_data: "SUPPORT_FAQ"
    }
  ],

  [
    {
      text: lang === "english"
        ? "💬 Contact Support"
        : lang === "gujarati"
        ? "💬 સપોર્ટ સંપર્ક"
        : "💬 Contact Support",
      callback_data: "SUPPORT_CONTACT"
    },
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
        ? "🔔 Notifications"
        : lang === "gujarati"
        ? "🔔 નોટિફિકેશન"
        : "🔔 Notifications",
      callback_data: "SUPPORT_NOTIFICATIONS"
    },
    {
      text: lang === "english"
        ? "👑 Admin Features"
        : lang === "gujarati"
        ? "👑 એડમિન ફીચર્સ"
        : "👑 Admin Features",
      callback_data: "SUPPORT_ADMIN"
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
        ? "💰 View Pricing"
        : lang === "gujarati"
        ? "💰 કિંમત જુઓ"
        : "💰 View Pricing",
      callback_data: "MENU_PRICING"
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

function showSupportMenu() {

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

showSupportMenu()
