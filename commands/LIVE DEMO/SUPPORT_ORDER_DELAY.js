/*CMD
  command: SUPPORT_ORDER_DELAY
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
// SCRIPT 77 — UPDATED VERSION
// COMMAND NAME: SUPPORT_ORDER_DELAY
// STEP 5.2.3.1.1.2 — ORDER DELAYED
// 📁 MAIN MENU → 📁 SERVICES → 📁 SUPPORT → 📁 ORDER REQUEST → 📁 TRACK ORDER
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
    "⏳ <b>ORDER DELAYED</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Is your order taking longer than expected?\n\n" +
    "The support system can help customers report a delayed order.\n\n" +
    "📌 <b>What can be collected:</b>\n" +
    "🆔 Order ID\n" +
    "📝 Delay details\n" +
    "📞 Contact information\n\n" +
    "🔔 After submission, the customer can receive a reference ID and status updates.\n\n" +
    "✨ The complete workflow can be customized for your business."

  buttons = [
    [
      {
        text: "🎫 Report Delayed Order",
        callback_data: "SUPPORT_DELAY_REQUEST"
      }
    ],
    [
      {
        text: "🔎 Track Order",
        callback_data: "SUPPORT_ORDER_TRACK"
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

} else if (lang === "gujarati") {

  text =
    "⏳ <b>ORDER DELAYED</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "તમારો order expected સમય કરતાં વધારે સમય લઈ રહ્યો છે?\n\n" +
    "Support system દ્વારા customer delayed order report કરી શકે છે.\n\n" +
    "📌 <b>Collect કરી શકાય:</b>\n" +
    "🆔 Order ID\n" +
    "📝 Delay details\n" +
    "📞 Contact information\n\n" +
    "🔔 Submit કર્યા પછી customer ને reference ID અને status updates મળી શકે છે.\n\n" +
    "✨ Complete workflow તમારા business પ્રમાણે customize કરી શકાય છે."

  buttons = [
    [
      {
        text: "🎫 Delayed Order Report",
        callback_data: "SUPPORT_DELAY_REQUEST"
      }
    ],
    [
      {
        text: "🔎 Order Track",
        callback_data: "SUPPORT_ORDER_TRACK"
      },
      {
        text: "❌ Order Cancel",
        callback_data: "SUPPORT_ORDER_CANCEL"
      }
    ],
    [
      {
        text: "🔄 Order બદલો",
        callback_data: "SUPPORT_ORDER_CHANGE"
      },
      {
        text: "📋 અન્ય સમસ્યા",
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
    "⏳ <b>ORDER DELAYED</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Kya aapka order expected time se zyada late ho raha hai?\n\n" +
    "Support system customer ko delayed order report karne ki facility de sakta hai.\n\n" +
    "📌 <b>Collect kiya ja sakta hai:</b>\n" +
    "🆔 Order ID\n" +
    "📝 Delay details\n" +
    "📞 Contact information\n\n" +
    "🔔 Submit karne ke baad customer ko reference ID aur status updates mil sakte hain.\n\n" +
    "✨ Complete workflow aapke business ke according customize kiya ja sakta hai."

  buttons = [
    [
      {
        text: "🎫 Report Delayed Order",
        callback_data: "SUPPORT_DELAY_REQUEST"
      }
    ],
    [
      {
        text: "🔎 Track Order",
        callback_data: "SUPPORT_ORDER_TRACK"
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
}

function showDelayedOrder(text, buttons) {

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

showDelayedOrder(text, buttons)
