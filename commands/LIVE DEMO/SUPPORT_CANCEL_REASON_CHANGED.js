/*CMD
  command: SUPPORT_CANCEL_REASON_CHANGED
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
// SCRIPT 85 — UPDATED VERSION
// COMMAND NAME: SUPPORT_CANCEL_REASON_CHANGED
// STEP 5.2.3.1.1.3.1.2 — CANCELLATION REASON
// 📁 MAIN MENU → 📁 SERVICES → 📁 SUPPORT → 📁 ORDER REQUEST → 📁 CANCEL ORDER
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

var pending = Bot.getProperty("SUPPORT_CANCEL_" + uid) || {}
var orderId = pending.orderId || ""

if (!orderId) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>Request expired</b>\n\n" +
      "Please start the cancellation request again.",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "❌ Cancel Order",
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
  })
  return
}

pending.reason = "Changed my mind"
pending.reasonCode = "changed_mind"

Bot.setProperty(
  "SUPPORT_CANCEL_" + uid,
  pending,
  "json"
)

var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

var text = ""
var buttons = []

if (lang === "english") {

  text =
    "❌ <b>CANCELLATION REQUEST</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "📦 <b>Order ID:</b>\n" +
    "<code>" + orderId + "</code>\n\n" +
    "📝 <b>Reason:</b>\n" +
    "Changed my mind\n\n" +
    "Please review the details before submitting your cancellation request.\n\n" +
    "👇 Submit the request below."

  buttons = [
    [
      {
        text: "✅ Submit Cancellation Request",
        callback_data: "SUPPORT_CANCEL_SUBMIT"
      }
    ],
    [
      {
        text: "🔄 Change Reason",
        callback_data: "SUPPORT_CANCEL_ORDER_ID"
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
    "❌ <b>CANCELLATION REQUEST</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "📦 <b>Order ID:</b>\n" +
    "<code>" + orderId + "</code>\n\n" +
    "📝 <b>Reason:</b>\n" +
    "મારો વિચાર બદલાઈ ગયો\n\n" +
    "Cancellation request submit કરતા પહેલા details check કરો.\n\n" +
    "👇 નીચે request submit કરો."

  buttons = [
    [
      {
        text: "✅ Cancellation Request મોકલો",
        callback_data: "SUPPORT_CANCEL_SUBMIT"
      }
    ],
    [
      {
        text: "🔄 Reason બદલો",
        callback_data: "SUPPORT_CANCEL_ORDER_ID"
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
    "❌ <b>CANCELLATION REQUEST</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "📦 <b>Order ID:</b>\n" +
    "<code>" + orderId + "</code>\n\n" +
    "📝 <b>Reason:</b>\n" +
    "Mera mind change ho gaya\n\n" +
    "Cancellation request submit karne se pehle details check karein.\n\n" +
    "👇 Neeche request submit karein."

  buttons = [
    [
      {
        text: "✅ Cancellation Request Submit Karein",
        callback_data: "SUPPORT_CANCEL_SUBMIT"
      }
    ],
    [
      {
        text: "🔄 Reason Change Karein",
        callback_data: "SUPPORT_CANCEL_ORDER_ID"
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

function showCancellationReason(text, buttons) {
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

showCancellationReason(text, buttons)
