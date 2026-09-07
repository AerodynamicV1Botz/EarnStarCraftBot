/*CMD
  command: SUPPORT_CANCEL_ORDER_ID_SAVE
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
// SCRIPT 84 — UPDATED VERSION
// COMMAND NAME: SUPPORT_CANCEL_ORDER_ID_SAVE
// STEP 5.2.3.1.1.3.1.1 — SELECT CANCELLATION REASON
// 📁 MAIN MENU → 📁 SERVICES → 📁 SUPPORT → 📁 ORDER REQUEST → 📁 CANCEL ORDER
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
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
      "Please check the Order ID and try again.",
    parse_mode: "HTML"
  })
  return
}

var pending = Bot.getProperty("SUPPORT_CANCEL_" + uid) || {}

pending.orderId = orderId
pending.userId = uid
pending.createdAt = pending.createdAt || new Date().toISOString()

Bot.setProperty(
  "SUPPORT_CANCEL_" + uid,
  pending,
  "json"
)

Bot.setProperty(
  "SUPPORT_CANCEL_STEP_" + uid,
  "waiting_reason",
  "string"
)

var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

var text = ""
var buttons = []

if (lang === "english") {

  text =
    "📦 <b>ORDER ID RECEIVED</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🆔 Order ID:\n" +
    "<code>" + orderId + "</code>\n\n" +
    "Why do you want to cancel this order?\n\n" +
    "👇 Select a reason below."

  buttons = [
    [
      {
        text: "🔄 Changed My Mind",
        callback_data: "SUPPORT_CANCEL_REASON_CHANGED"
      }
    ],
    [
      {
        text: "💰 Price / Payment Issue",
        callback_data: "SUPPORT_CANCEL_REASON_PAYMENT"
      }
    ],
    [
      {
        text: "⏳ Delivery Delay",
        callback_data: "SUPPORT_CANCEL_REASON_DELAY"
      }
    ],
    [
      {
        text: "📦 Ordered by Mistake",
        callback_data: "SUPPORT_CANCEL_REASON_MISTAKE"
      }
    ],
    [
      {
        text: "📋 Other Reason",
        callback_data: "SUPPORT_CANCEL_REASON_OTHER"
      }
    ],
    [
      {
        text: "⬅️ Back",
        callback_data: "SUPPORT_ORDER_CANCEL"
      },
      {
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]

} else if (lang === "gujarati") {

  text =
    "📦 <b>ORDER ID RECEIVED</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🆔 Order ID:\n" +
    "<code>" + orderId + "</code>\n\n" +
    "આ order cancel કરવાનું કારણ શું છે?\n\n" +
    "👇 નીચે reason select કરો."

  buttons = [
    [
      {
        text: "🔄 મન બદલાઈ ગયું",
        callback_data: "SUPPORT_CANCEL_REASON_CHANGED"
      }
    ],
    [
      {
        text: "💰 Price / Payment સમસ્યા",
        callback_data: "SUPPORT_CANCEL_REASON_PAYMENT"
      }
    ],
    [
      {
        text: "⏳ Delivery મોડું છે",
        callback_data: "SUPPORT_CANCEL_REASON_DELAY"
      }
    ],
    [
      {
        text: "📦 ભૂલથી Order કર્યો",
        callback_data: "SUPPORT_CANCEL_REASON_MISTAKE"
      }
    ],
    [
      {
        text: "📋 અન્ય કારણ",
        callback_data: "SUPPORT_CANCEL_REASON_OTHER"
      }
    ],
    [
      {
        text: "⬅️ પાછા",
        callback_data: "SUPPORT_ORDER_CANCEL"
      },
      {
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]

} else {

  text =
    "📦 <b>ORDER ID MIL GAYA</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🆔 Order ID:\n" +
    "<code>" + orderId + "</code>\n\n" +
    "Aap order cancel kyun karna chahte hain?\n\n" +
    "👇 Neeche reason select karein."

  buttons = [
    [
      {
        text: "🔄 Mind Change Ho Gaya",
        callback_data: "SUPPORT_CANCEL_REASON_CHANGED"
      }
    ],
    [
      {
        text: "💰 Price / Payment Issue",
        callback_data: "SUPPORT_CANCEL_REASON_PAYMENT"
      }
    ],
    [
      {
        text: "⏳ Delivery Delay",
        callback_data: "SUPPORT_CANCEL_REASON_DELAY"
      }
    ],
    [
      {
        text: "📦 Galti Se Order Kiya",
        callback_data: "SUPPORT_CANCEL_REASON_MISTAKE"
      }
    ],
    [
      {
        text: "📋 Other Reason",
        callback_data: "SUPPORT_CANCEL_REASON_OTHER"
      }
    ],
    [
      {
        text: "⬅️ Back",
        callback_data: "SUPPORT_ORDER_CANCEL"
      },
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
