/*CMD
  command: SUPPORT_FAQ_TECH
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
// SCRIPT 71 — UPDATED VERSION
// COMMAND NAME: SUPPORT_FAQ_TECH
// STEP 5.2.1.5 — TECHNICAL HELP FAQ
// 📁 MAIN MENU → 📁 LIVE DEMOS → 📁 SUPPORT → 📁 FAQ → 📁 TECHNICAL HELP
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
    "🛠️ <b>TECHNICAL HELP FAQ</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "⚠️ <b>Bot is not responding?</b>\n" +
    "Try opening the bot again or use the available support option to contact the team.\n\n" +

    "🔘 <b>A button is not working?</b>\n" +
    "Some features may depend on the business configuration or available services. Support can review the issue.\n\n" +

    "📱 <b>Can the bot work on mobile?</b>\n" +
    "Yes. Telegram bots are designed to be accessible through Telegram on supported devices.\n\n" +

    "⚙️ <b>Can features be customized?</b>\n" +
    "Yes. Menus, workflows, forms, notifications and admin features can be customized according to the project.\n\n" +

    "📞 <b>Still need help?</b>\n" +
    "Contact the support team and share the issue so it can be reviewed.\n\n" +

    "💡 Technical support workflows can also be built into a custom bot."

} else if (lang === "gujarati") {

  text =
    "🛠️ <b>TECHNICAL HELP FAQ</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "⚠️ <b>Bot response નથી આપતો?</b>\n" +
    "Bot ફરીથી open કરો અથવા support option દ્વારા team નો contact કરો.\n\n" +

    "🔘 <b>Button કામ નથી કરતું?</b>\n" +
    "કેટલાક features business configuration અથવા available services પર આધારિત હોઈ શકે છે. Support team issue review કરી શકે છે.\n\n" +

    "📱 <b>Bot mobile પર કામ કરે છે?</b>\n" +
    "હા. Supported devices પર Telegram દ્વારા bots use કરી શકાય છે.\n\n" +

    "⚙️ <b>Features customize કરી શકાય?</b>\n" +
    "હા. Menus, workflows, forms, notifications અને admin features project પ્રમાણે customize કરી શકાય છે.\n\n" +

    "📞 <b>હજુ help જોઈએ?</b>\n" +
    "Support team ને contact કરીને issue share કરો.\n\n" +

    "💡 Custom bot માં technical support workflows પણ બનાવી શકાય છે."

} else {

  text =
    "🛠️ <b>TECHNICAL HELP FAQ</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "⚠️ <b>Bot response nahi de raha?</b>\n" +
    "Bot ko dobara open karein ya support option se team ko contact karein.\n\n" +

    "🔘 <b>Button kaam nahi kar raha?</b>\n" +
    "Kuch features business configuration ya available services par depend kar sakte hain. Support team issue review kar sakti hai.\n\n" +

    "📱 <b>Bot mobile par work karega?</b>\n" +
    "Haan. Supported devices par Telegram ke through bots use kiye ja sakte hain.\n\n" +

    "⚙️ <b>Features customize ho sakte hain?</b>\n" +
    "Haan. Menus, workflows, forms, notifications aur admin features project ke according customize kiye ja sakte hain.\n\n" +

    "📞 <b>Still help chahiye?</b>\n" +
    "Support team ko contact karke issue share karein.\n\n" +

    "💡 Custom bot mein technical support workflows bhi build kiye ja sakte hain."
}

var buttons = [

  [
    {
      text: "📞 Contact Support",
      callback_data: "SUPPORT_CONTACT"
    }
  ],

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
      text: "🔄 Returns",
      callback_data: "SUPPORT_FAQ_RETURN"
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
