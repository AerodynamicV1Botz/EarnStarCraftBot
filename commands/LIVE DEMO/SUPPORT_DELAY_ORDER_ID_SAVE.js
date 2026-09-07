/*CMD
  command: SUPPORT_DELAY_ORDER_ID_SAVE
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
// SCRIPT 80 — UPDATED VERSION
// COMMAND NAME: SUPPORT_DELAY_ORDER_ID_SAVE
// STEP 5.2.3.1.1.2.1.2 — DELAY DETAILS
// 📁 MAIN MENU → 📁 SERVICES → 📁 SUPPORT → 📁 ORDER REQUEST → 📁 ORDER DELAYED
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================

var uid = user.telegramid

var orderId = String(message || "").trim()

if (!orderId) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>Please enter a valid Order ID.</b>\n\n" +
      "Example:\n<code>ESORD12345678</code>",
    parse_mode: "HTML"
  })
  return
}

orderId = orderId.toUpperCase()

if (orderId.length < 5 || orderId.length > 50) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>Invalid Order ID</b>\n\n" +
      "Please check your Order ID and try again.",
    parse_mode: "HTML"
  })
  return
}

var pending = Bot.getProperty("SUPPORT_DELAY_" + uid) || {}

pending.orderId = orderId
pending.userId = uid
pending.createdAt = pending.createdAt || new Date().toISOString()

Bot.setProperty(
  "SUPPORT_DELAY_" + uid,
  pending,
  "json"
)

Bot.setProperty(
  "SUPPORT_DELAY_STEP_" + uid,
  "waiting_delay_details",
  "string"
)

var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

var text = ""
var buttons = []

if (lang === "english") {

  text =
    "📝 <b>DELAY DETAILS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Order ID received:\n" +
    "🆔 <code>" + orderId + "</code>\n\n" +
    "Now tell us what happened with your order.\n\n" +
    "Example:\n" +
    "<i>My order has not arrived yet and the expected delivery date has passed.</i>"

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
    "📝 <b>DELAY DETAILS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Order ID મળ્યો:\n" +
    "🆔 <code>" + orderId + "</code>\n\n" +
    "હવે તમારા order સાથે શું થયું તે જણાવો.\n\n" +
    "Example:\n" +
    "<i>મારો order હજુ આવ્યો નથી અને expected delivery date પસાર થઈ ગઈ છે.</i>"

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
    "📝 <b>DELAY DETAILS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Order ID mil gaya:\n" +
    "🆔 <code>" + orderId + "</code>\n\n" +
    "Ab batayein ki order ke saath kya problem hui.\n\n" +
    "Example:\n" +
    "<i>Mera order abhi tak nahi aaya aur expected delivery date bhi pass ho gayi hai.</i>"

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

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
})
