/*CMD
  command: SUPPORT_ORDER_TRACK
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
// SCRIPT 75 — UPDATED VERSION
// COMMAND NAME: SUPPORT_ORDER_TRACK
// STEP 5.2.3.1.1 — TRACK ORDER
// 📁 MAIN MENU → 📁 LIVE DEMOS → 📁 SUPPORT → 📁 SUPPORT REQUEST → 📁 ORDER → 📁 TRACK ORDER
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
    "🔎 <b>TRACK ORDER</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Enter or select an Order ID to check its current status.\n\n" +
    "📦 <b>Example:</b>\n" +
    "<code>ESORD12345678</code>\n\n" +
    "The bot can show:\n" +
    "🟡 Pending\n" +
    "🔵 Active / Processing\n" +
    "🟢 Completed\n" +
    "🔴 Cancelled\n\n" +
    "✨ Order tracking can be connected to your business order system."

} else if (lang === "gujarati") {

  text =
    "🔎 <b>TRACK ORDER</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Current order status check કરવા માટે Order ID enter અથવા select કરો.\n\n" +
    "📦 <b>Example:</b>\n" +
    "<code>ESORD12345678</code>\n\n" +
    "Bot બતાવી શકે છે:\n" +
    "🟡 Pending\n" +
    "🔵 Active / Processing\n" +
    "🟢 Completed\n" +
    "🔴 Cancelled\n\n" +
    "✨ Order tracking તમારા business order system સાથે connect કરી શકાય છે."

} else {

  text =
    "🔎 <b>TRACK ORDER</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Current order status check karne ke liye Order ID enter ya select karein.\n\n" +
    "📦 <b>Example:</b>\n" +
    "<code>ESORD12345678</code>\n\n" +
    "Bot dikha sakta hai:\n" +
    "🟡 Pending\n" +
    "🔵 Active / Processing\n" +
    "🟢 Completed\n" +
    "🔴 Cancelled\n\n" +
    "✨ Order tracking aapke business order system ke saath connect ki ja sakti hai."
}

var buttons = [

  [
    {
      text: "📦 View Demo Order",
      callback_data: "SUPPORT_ORDER_DEMO"
    }
  ],

  [
    {
      text: "⏳ Order Delayed",
      callback_data: "SUPPORT_ORDER_DELAY"
    },
    {
      text: "❌ Cancel Order",
      callback_data: "SUPPORT_ORDER_CANCEL"
    }
  ],

  [
    {
      text: "🔄 Change Order",
      callback_data: "SUPPORT_ORDER_CHANGE"
    },
    {
      text: "📋 Other Issue",
      callback_data: "SUPPORT_ORDER_OTHER"
    }
  ],

  [
    {
      text: "🎫 Support Request",
      callback_data: "SUPPORT_REQUEST"
    }
  ],

  [
    {
      text: "⬅️ Back",
      callback_data: "SUPPORT_REQUEST_ORDER"
    },
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
