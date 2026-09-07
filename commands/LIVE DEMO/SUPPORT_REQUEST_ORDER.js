/*CMD
  command: SUPPORT_REQUEST_ORDER
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
// SCRIPT 74 — UPDATED VERSION
// COMMAND NAME: SUPPORT_REQUEST_ORDER
// STEP 5.2.3.1 — ORDER SUPPORT
// 📁 MAIN MENU → 📁 LIVE DEMOS → 📁 SUPPORT → 📁 SUPPORT REQUEST → 📁 ORDER
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
    "📦 <b>ORDER SUPPORT</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "What help do you need with your order?\n\n" +
    "Select an option below 👇"

} else if (lang === "gujarati") {

  text =
    "📦 <b>ORDER SUPPORT</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "તમારા order અંગે કઈ મદદ જોઈએ છે?\n\n" +
    "નીચે એક option select કરો 👇"

} else {

  text =
    "📦 <b>ORDER SUPPORT</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Aapko apne order ke regarding kya help chahiye?\n\n" +
    "Neeche ek option select karein 👇"
}

var buttons = [

  [
    {
      text: "🔎 Track Order",
      callback_data: "SUPPORT_ORDER_TRACK"
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
      text: "🎫 Create Support Request",
      callback_data: "SUPPORT_REQUEST_OTHER"
    }
  ],

  [
    {
      text: "⬅️ Back",
      callback_data: "SUPPORT_REQUEST"
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
