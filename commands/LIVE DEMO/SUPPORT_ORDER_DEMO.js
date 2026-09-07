/*CMD
  command: SUPPORT_ORDER_DEMO
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
// SCRIPT 76 — UPDATED VERSION
// COMMAND NAME: SUPPORT_ORDER_DEMO
// STEP 5.2.3.1.1.1 — ORDER TRACKING DEMO
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
    "📦 <b>ORDER TRACKING DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🆔 <b>Order ID:</b>\n" +
    "<code>ESORD12345678</code>\n\n" +
    "👤 <b>Customer:</b> Demo Customer\n\n" +
    "📦 <b>Product:</b> Premium Smartphone\n" +
    "🔢 <b>Quantity:</b> 1\n\n" +
    "💰 <b>Total:</b> ₹24,999\n\n" +
    "🔵 <b>Status:</b> PROCESSING\n\n" +
    "📍 <b>Tracking Timeline</b>\n\n" +
    "✅ Order Received\n" +
    "   └─ Your order has been confirmed.\n\n" +
    "✅ Order Accepted\n" +
    "   └─ Business team accepted the order.\n\n" +
    "🔵 Processing\n" +
    "   └─ Your order is currently being processed.\n\n" +
    "⚪ Completed\n" +
    "   └─ Waiting for completion.\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🔔 Customers can automatically receive status updates."

  buttons = [
    [
      {
        text: "🔄 Refresh Tracking",
        callback_data: "SUPPORT_ORDER_DEMO"
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
        text: "🎫 Support Request",
        callback_data: "SUPPORT_REQUEST"
      }
    ],
    [
      {
        text: "⬅️ Back",
        callback_data: "SUPPORT_ORDER_TRACK"
      },
      {
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]

} else if (lang === "gujarati") {

  text =
    "📦 <b>ORDER TRACKING DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🆔 <b>Order ID:</b>\n" +
    "<code>ESORD12345678</code>\n\n" +
    "👤 <b>Customer:</b> Demo Customer\n\n" +
    "📦 <b>Product:</b> Premium Smartphone\n" +
    "🔢 <b>Quantity:</b> 1\n\n" +
    "💰 <b>Total:</b> ₹24,999\n\n" +
    "🔵 <b>Status:</b> PROCESSING\n\n" +
    "📍 <b>Tracking Timeline</b>\n\n" +
    "✅ Order Received\n" +
    "   └─ તમારો order confirm થયો છે.\n\n" +
    "✅ Order Accepted\n" +
    "   └─ Business team એ order accept કર્યો છે.\n\n" +
    "🔵 Processing\n" +
    "   └─ તમારો order હાલમાં process થઈ રહ્યો છે.\n\n" +
    "⚪ Completed\n" +
    "   └─ Completion માટે waiting.\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🔔 Customer ને status updates automatically મોકલી શકાય છે."

  buttons = [
    [
      {
        text: "🔄 Tracking Refresh",
        callback_data: "SUPPORT_ORDER_DEMO"
      }
    ],
    [
      {
        text: "⏳ Order મોડો છે",
        callback_data: "SUPPORT_ORDER_DELAY"
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
        callback_data: "SUPPORT_ORDER_TRACK"
      },
      {
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]

} else {

  text =
    "📦 <b>ORDER TRACKING DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🆔 <b>Order ID:</b>\n" +
    "<code>ESORD12345678</code>\n\n" +
    "👤 <b>Customer:</b> Demo Customer\n\n" +
    "📦 <b>Product:</b> Premium Smartphone\n" +
    "🔢 <b>Quantity:</b> 1\n\n" +
    "💰 <b>Total:</b> ₹24,999\n\n" +
    "🔵 <b>Status:</b> PROCESSING\n\n" +
    "📍 <b>Tracking Timeline</b>\n\n" +
    "✅ Order Received\n" +
    "   └─ Aapka order confirm ho gaya hai.\n\n" +
    "✅ Order Accepted\n" +
    "   └─ Business team ne order accept kar liya hai.\n\n" +
    "🔵 Processing\n" +
    "   └─ Aapka order currently process ho raha hai.\n\n" +
    "⚪ Completed\n" +
    "   └─ Completion ke liye waiting.\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🔔 Customer ko status updates automatically bheje ja sakte hain."

  buttons = [
    [
      {
        text: "🔄 Refresh Tracking",
        callback_data: "SUPPORT_ORDER_DEMO"
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
        text: "🎫 Support Request",
        callback_data: "SUPPORT_REQUEST"
      }
    ],
    [
      {
        text: "⬅️ Back",
        callback_data: "SUPPORT_ORDER_TRACK"
      },
      {
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]
}

function showOrderDemo(text, buttons) {

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

showOrderDemo(text, buttons)
