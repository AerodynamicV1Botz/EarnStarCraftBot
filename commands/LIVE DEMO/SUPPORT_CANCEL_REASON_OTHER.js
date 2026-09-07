/*CMD
  command: SUPPORT_CANCEL_REASON_OTHER
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
// SCRIPT 89 — UPDATED VERSION
// COMMAND NAME: SUPPORT_CANCEL_REASON_OTHER
// STEP 5.2.3.1.1.3.1.6 — CANCELLATION REASON
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

var cancelData = Bot.getProperty("SUPPORT_CANCEL_" + uid)

if (!cancelData || !cancelData.orderId) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>CANCELLATION DATA NOT FOUND</b>\n\n" +
      "Please start the cancellation request again.",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🔄 Start Again",
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

cancelData.reason = "Other Reason"
cancelData.reasonCode = "other"
cancelData.reasonUpdatedAt = new Date().toISOString()

Bot.setProperty(
  "SUPPORT_CANCEL_" + uid,
  cancelData,
  "json"
)

var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

var text = ""

if (lang === "english") {

  text =
    "📦 <b>CANCEL ORDER</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🆔 <b>Order ID:</b>\n" +
    "<code>" + cancelData.orderId + "</code>\n\n" +
    "📝 <b>Reason:</b>\n" +
    "Other Reason\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "⚠️ You can submit this cancellation request now.\n\n" +
    "The request will be reviewed according to the order status and business policy."

} else if (lang === "gujarati") {

  text =
    "📦 <b>ઓર્ડર કેન્સલ</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🆔 <b>ઓર્ડર ID:</b>\n" +
    "<code>" + cancelData.orderId + "</code>\n\n" +
    "📝 <b>કારણ:</b>\n" +
    "અન્ય કારણ\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "⚠️ હવે તમે cancellation request submit કરી શકો છો.\n\n" +
    "Request ઓર્ડરની સ્થિતિ અને business policy પ્રમાણે review કરવામાં આવશે."

} else {

  text =
    "📦 <b>CANCEL ORDER</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🆔 <b>Order ID:</b>\n" +
    "<code>" + cancelData.orderId + "</code>\n\n" +
    "📝 <b>Reason:</b>\n" +
    "Other Reason\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "⚠️ Ab aap cancellation request submit kar sakte ho.\n\n" +
    "Request order status aur business policy ke according review hoga."
}

var buttons = [
  [
    {
      text: "✅ Submit Cancellation",
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
      text: "🔙 Back",
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
