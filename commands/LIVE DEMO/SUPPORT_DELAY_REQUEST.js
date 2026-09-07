/*CMD
  command: SUPPORT_DELAY_REQUEST
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
// SCRIPT 78 — UPDATED VERSION
// COMMAND NAME: SUPPORT_DELAY_REQUEST
// STEP 5.2.3.1.1.2.1 — DELAYED ORDER REQUEST
// 📁 MAIN MENU → 📁 SERVICES → 📁 SUPPORT → 📁 ORDER REQUEST → 📁 ORDER DELAYED
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
    "🎫 <b>DELAYED ORDER REQUEST</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Let's create a delayed-order support request.\n\n" +
    "📌 Please provide:\n\n" +
    "🆔 Order ID\n" +
    "📝 Reason or details about the delay\n" +
    "📞 Contact information if required\n\n" +
    "After submission, the support team can review the request and send updates.\n\n" +
    "👇 Choose how you want to continue."

  buttons = [
    [
      {
        text: "🆔 Enter Order ID",
        callback_data: "SUPPORT_DELAY_ORDER_ID"
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
        text: "⬅️ Back",
        callback_data: "SUPPORT_ORDER_DELAY"
      },
      {
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]

} else if (lang === "gujarati") {

  text =
    "🎫 <b>DELAYED ORDER REQUEST</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "ચાલો delayed-order support request બનાવીએ.\n\n" +
    "📌 કૃપા કરીને આપો:\n\n" +
    "🆔 Order ID\n" +
    "📝 Delay નું reason અથવા details\n" +
    "📞 જરૂર હોય તો contact information\n\n" +
    "Submit કર્યા પછી support team request review કરીને updates મોકલી શકે છે.\n\n" +
    "👇 આગળ વધવા માટે option પસંદ કરો."

  buttons = [
    [
      {
        text: "🆔 Order ID આપો",
        callback_data: "SUPPORT_DELAY_ORDER_ID"
      }
    ],
    [
      {
        text: "📞 Support Contact",
        callback_data: "SUPPORT_CONTACT"
      }
    ],
    [
      {
        text: "⬅️ પાછા",
        callback_data: "SUPPORT_ORDER_DELAY"
      },
      {
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]

} else {

  text =
    "🎫 <b>DELAYED ORDER REQUEST</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Chaliye delayed-order support request create karte hain.\n\n" +
    "📌 Please provide karein:\n\n" +
    "🆔 Order ID\n" +
    "📝 Delay ka reason ya details\n" +
    "📞 Zarurat ho to contact information\n\n" +
    "Submit karne ke baad support team request review karke updates bhej sakti hai.\n\n" +
    "👇 Continue karne ke liye option select karein."

  buttons = [
    [
      {
        text: "🆔 Enter Order ID",
        callback_data: "SUPPORT_DELAY_ORDER_ID"
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
        text: "⬅️ Back",
        callback_data: "SUPPORT_ORDER_DELAY"
      },
      {
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]
}

function showDelayedRequest(text, buttons) {

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

showDelayedRequest(text, buttons)
