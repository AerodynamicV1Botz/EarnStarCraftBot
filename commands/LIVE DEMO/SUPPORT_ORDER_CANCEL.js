/*CMD
  command: SUPPORT_ORDER_CANCEL
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
// SCRIPT 82 — UPDATED VERSION
// COMMAND NAME: SUPPORT_ORDER_CANCEL
// STEP 5.2.3.1.1.3 — CANCEL ORDER
// 📁 MAIN MENU → 📁 SERVICES → 📁 SUPPORT → 📁 ORDER REQUEST
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
    "❌ <b>CANCEL ORDER</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Need to cancel an order?\n\n" +
    "Please note that cancellation depends on the order status and your business cancellation policy.\n\n" +
    "📌 <b>Typical process:</b>\n" +
    "1️⃣ Provide Order ID\n" +
    "2️⃣ Select cancellation reason\n" +
    "3️⃣ Support team reviews the request\n" +
    "4️⃣ Customer receives the status update\n\n" +
    "👇 Choose an option below."

  buttons = [
    [
      {
        text: "🆔 Enter Order ID",
        callback_data: "SUPPORT_CANCEL_ORDER_ID"
      }
    ],
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
        text: "🔄 Change Order",
        callback_data: "SUPPORT_ORDER_CHANGE"
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

} else if (lang === "gujarati") {

  text =
    "❌ <b>CANCEL ORDER</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Order cancel કરવો છે?\n\n" +
    "Cancellation order status અને business cancellation policy પર depend કરે છે.\n\n" +
    "📌 <b>Typical process:</b>\n" +
    "1️⃣ Order ID આપો\n" +
    "2️⃣ Cancellation reason select કરો\n" +
    "3️⃣ Support team request review કરશે\n" +
    "4️⃣ Customer ને status update મળશે\n\n" +
    "👇 નીચે option select કરો."

  buttons = [
    [
      {
        text: "🆔 Order ID આપો",
        callback_data: "SUPPORT_CANCEL_ORDER_ID"
      }
    ],
    [
      {
        text: "🔎 Order Track",
        callback_data: "SUPPORT_ORDER_TRACK"
      }
    ],
    [
      {
        text: "⏳ Order મોડો છે",
        callback_data: "SUPPORT_ORDER_DELAY"
      },
      {
        text: "🔄 Order બદલો",
        callback_data: "SUPPORT_ORDER_CHANGE"
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
        text: "⬅️ પાછા",
        callback_data: "SUPPORT_REQUEST_ORDER"
      },
      {
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]

} else {

  text =
    "❌ <b>CANCEL ORDER</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Order cancel karna hai?\n\n" +
    "Cancellation order status aur business ki cancellation policy par depend karega.\n\n" +
    "📌 <b>Typical process:</b>\n" +
    "1️⃣ Order ID provide karein\n" +
    "2️⃣ Cancellation reason select karein\n" +
    "3️⃣ Support team request review karegi\n" +
    "4️⃣ Customer ko status update milega\n\n" +
    "👇 Neeche option select karein."

  buttons = [
    [
      {
        text: "🆔 Enter Order ID",
        callback_data: "SUPPORT_CANCEL_ORDER_ID"
      }
    ],
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
        text: "🔄 Change Order",
        callback_data: "SUPPORT_ORDER_CHANGE"
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
}

function showCancelOrder(text, buttons) {

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

showCancelOrder(text, buttons)
