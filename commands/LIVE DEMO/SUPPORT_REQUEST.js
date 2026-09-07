/*CMD
  command: SUPPORT_REQUEST
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
// SCRIPT 73 — UPDATED VERSION
// COMMAND NAME: SUPPORT_REQUEST
// STEP 5.2.3 — SUPPORT REQUEST
// 📁 MAIN MENU → 📁 LIVE DEMOS → 📁 SUPPORT → 📁 SUPPORT REQUEST
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
    "🎫 <b>SUPPORT REQUEST</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "You can create a support request for your question or issue.\n\n" +
    "📌 <b>How it works:</b>\n\n" +
    "1️⃣ Select your issue\n" +
    "2️⃣ Submit your request\n" +
    "3️⃣ Receive a reference ID\n" +
    "4️⃣ Support team reviews it\n" +
    "5️⃣ Get updates through the bot\n\n" +
    "✨ This complete support workflow can be customized for your business."

} else if (lang === "gujarati") {

  text =
    "🎫 <b>SUPPORT REQUEST</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "તમારા question અથવા issue માટે support request બનાવી શકો છો.\n\n" +
    "📌 <b>કેવી રીતે કામ કરે છે:</b>\n\n" +
    "1️⃣ તમારો issue select કરો\n" +
    "2️⃣ Request submit કરો\n" +
    "3️⃣ Reference ID મેળવો\n" +
    "4️⃣ Support team review કરશે\n" +
    "5️⃣ Bot દ્વારા updates મેળવો\n\n" +
    "✨ આ complete support workflow તમારા business પ્રમાણે customize કરી શકાય છે."

} else {

  text =
    "🎫 <b>SUPPORT REQUEST</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Aap apne question ya issue ke liye support request create kar sakte hain.\n\n" +
    "📌 <b>Kaise kaam karega:</b>\n\n" +
    "1️⃣ Apna issue select karein\n" +
    "2️⃣ Request submit karein\n" +
    "3️⃣ Reference ID milegi\n" +
    "4️⃣ Support team review karegi\n" +
    "5️⃣ Bot ke through updates milenge\n\n" +
    "✨ Ye complete support workflow aapke business ke according customize kiya ja sakta hai."
}

var buttons = [

  [
    {
      text: "📦 Order Issue",
      callback_data: "SUPPORT_REQUEST_ORDER"
    },
    {
      text: "💳 Payment Issue",
      callback_data: "SUPPORT_REQUEST_PAYMENT"
    }
  ],

  [
    {
      text: "🛠️ Technical Issue",
      callback_data: "SUPPORT_REQUEST_TECH"
    },
    {
      text: "❓ Other",
      callback_data: "SUPPORT_REQUEST_OTHER"
    }
  ],

  [
    {
      text: "📞 Contact Support",
      callback_data: "SUPPORT_CONTACT"
    }
  ],

  [
    {
      text: "❓ FAQ",
      callback_data: "SUPPORT_FAQ"
    },
    {
      text: "🛟 Support Demo",
      callback_data: "DEMO_SUPPORT"
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
