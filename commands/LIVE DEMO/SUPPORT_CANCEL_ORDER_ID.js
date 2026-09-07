/*CMD
  command: SUPPORT_CANCEL_ORDER_ID
  help: 
  need_reply: true
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
// SCRIPT 83 — UPDATED VERSION
// COMMAND NAME: SUPPORT_CANCEL_ORDER_ID
// STEP 5.2.3.1.1.3.1 — ENTER CANCEL ORDER ID
// 📁 MAIN MENU → 📁 SERVICES → 📁 SUPPORT → 📁 ORDER REQUEST → 📁 CANCEL ORDER
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
var buttons = []

if (lang === "english") {

  text =
    "🆔 <b>ENTER ORDER ID</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Please send the Order ID you want to cancel.\n\n" +
    "📦 Example:\n" +
    "<code>ESORD12345678</code>\n\n" +
    "After receiving the Order ID, the bot will check the cancellation request flow."

  buttons = [
    [
      {
        text: "❌ Back",
        callback_data: "SUPPORT_ORDER_CANCEL"
      }
    ],
    [
      {
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]

} else if (lang === "gujarati") {

  text =
    "🆔 <b>ORDER ID ENTER કરો</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "જે Order cancel કરવો છે તેનો Order ID મોકલો.\n\n" +
    "📦 Example:\n" +
    "<code>ESORD12345678</code>\n\n" +
    "Order ID મળ્યા પછી bot cancellation request flow આગળ વધારશે."

  buttons = [
    [
      {
        text: "❌ પાછા",
        callback_data: "SUPPORT_ORDER_CANCEL"
      }
    ],
    [
      {
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]

} else {

  text =
    "🆔 <b>ORDER ID ENTER KAREIN</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Jis Order ko cancel karna hai uska Order ID bhejein.\n\n" +
    "📦 Example:\n" +
    "<code>ESORD12345678</code>\n\n" +
    "Order ID milne ke baad bot cancellation request flow continue karega."

  buttons = [
    [
      {
        text: "❌ Back",
        callback_data: "SUPPORT_ORDER_CANCEL"
      }
    ],
    [
      {
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]
}

Bot.setProperty(
  "SUPPORT_CANCEL_STEP_" + uid,
  "waiting_order_id",
  "string"
)

function showCancelOrderId(text, buttons) {

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

showCancelOrderId(text, buttons)
