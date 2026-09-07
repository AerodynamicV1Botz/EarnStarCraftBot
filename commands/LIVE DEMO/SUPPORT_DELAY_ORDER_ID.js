/*CMD
  command: SUPPORT_DELAY_ORDER_ID
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
// SCRIPT 79 — UPDATED VERSION
// COMMAND NAME: SUPPORT_DELAY_ORDER_ID
// STEP 5.2.3.1.1.2.1.1 — ENTER ORDER ID
// 📁 MAIN MENU → 📁 SERVICES → 📁 SUPPORT → 📁 ORDER REQUEST → 📁 ORDER DELAYED → 📁 DELAYED REQUEST
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid

Bot.setProperty(
  "SUPPORT_DELAY_STEP_" + uid,
  "waiting_order_id",
  "string"
)

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
    "Please send your Order ID.\n\n" +
    "📦 Example:\n" +
    "<code>ESORD12345678</code>\n\n" +
    "After receiving the Order ID, the bot will continue the delayed-order request process."

  buttons = [
    [
      {
        text: "❌ Cancel",
        callback_data: "SUPPORT_ORDER_DELAY"
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
    "કૃપા કરીને તમારો Order ID મોકલો.\n\n" +
    "📦 Example:\n" +
    "<code>ESORD12345678</code>\n\n" +
    "Order ID મળ્યા પછી bot delayed-order request process આગળ વધારશે."

  buttons = [
    [
      {
        text: "❌ Cancel",
        callback_data: "SUPPORT_ORDER_DELAY"
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
    "Please apna Order ID bhejein.\n\n" +
    "📦 Example:\n" +
    "<code>ESORD12345678</code>\n\n" +
    "Order ID receive hone ke baad bot delayed-order request process continue karega."

  buttons = [
    [
      {
        text: "❌ Cancel",
        callback_data: "SUPPORT_ORDER_DELAY"
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

function showDelayOrderId(text, buttons) {

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

showDelayOrderId(text, buttons)
