/*CMD
  command: MY_ORDERS
  help: 
  need_reply: false
  auto_retry_time: 
  folder: MY ORDERS

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 93 — UPDATED VERSION
// COMMAND NAME: MY_ORDERS
// STEP 5.2.3.1.1.3.1.10 — MY ORDERS
// 📁 MAIN MENU → 📁 SERVICES → 📁 SUPPORT
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid

if (typeof request !== "undefined" && request && request.id) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

var keys = Bot.getProperty("ORDER_KEYS") || []
var orders = []

for (var i = keys.length - 1; i >= 0; i--) {
  var order = Bot.getProperty("ORDER_" + keys[i])

  if (!order) continue

  if (String(order.userId) === String(uid)) {
    orders.push(order)
  }
}

var buttons = []
var text = ""

if (orders.length === 0) {
  if (lang === "gujarati") {
    text =
      "📦 <b>મારા ઓર્ડર્સ</b>\n\n" +
      "તમારો હજુ કોઈ ઓર્ડર નથી.\n\n" +
      "🚀 અમારી સાથે તમારો પહેલો પ્રોજેક્ટ શરૂ કરો!"

    buttons = [
      [
        {
          text: "🚀 મારો બોટ બનાવો",
          callback_data: "BUILD_CUSTOM"
        }
      ],
      [
        {
          text: "🏠 મુખ્ય મેનુ",
          callback_data: "BACK_MAIN_MENU"
        }
      ]
    ]
  } else if (lang === "english") {
    text =
      "📦 <b>MY ORDERS</b>\n\n" +
      "You don't have any orders yet.\n\n" +
      "🚀 Start your first project with us!"

    buttons = [
      [
        {
          text: "🚀 Build My Bot",
          callback_data: "BUILD_CUSTOM"
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
      "📦 <b>MERE ORDERS</b>\n\n" +
      "Aapka abhi koi order nahi hai.\n\n" +
      "🚀 Hamare saath apna pehla project start karo!"

    buttons = [
      [
        {
          text: "🚀 Mera Bot Banao",
          callback_data: "BUILD_CUSTOM"
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
} else {
  if (lang === "gujarati") {
    text =
      "📦 <b>મારા ઓર્ડર્સ</b>\n\n" +
      "━━━━━━━━━━━━━━━━━━\n\n"
  } else if (lang === "english") {
    text =
      "📦 <b>MY ORDERS</b>\n\n" +
      "━━━━━━━━━━━━━━━━━━\n\n"
  } else {
    text =
      "📦 <b>MERE ORDERS</b>\n\n" +
      "━━━━━━━━━━━━━━━━━━\n\n"
  }

  var maxOrders = 10

  for (
    var j = 0;
    j < orders.length && j < maxOrders;
    j++
  ) {
    var order = orders[j]
    var status = String(order.status || "pending").toLowerCase()
    var icon = "🟡"

    if (status === "active") {
      icon = "🔵"
    }

    if (status === "completed") {
      icon = "🟢"
    }

    if (status === "cancelled") {
      icon = "🔴"
    }

    text +=
      icon +
      " <b>" +
      status.toUpperCase() +
      "</b>\n" +
      "🆔 <code>" +
      (order.orderId || "N/A") +
      "</code>\n\n"

    buttons.push([
      {
        text: "📦 View " + (order.orderId || "Order"),
        callback_data: "MY_ORDER " + (order.orderId || "")
      }
    ])
  }

  buttons.push([
    {
      text: "🔄 Refresh",
      callback_data: "MY_ORDERS"
    }
  ])

  buttons.push([
    {
      text: "🚀 New Project",
      callback_data: "BUILD_CUSTOM"
    },
    {
      text: "🏠 Main Menu",
      callback_data: "BACK_MAIN_MENU"
    }
  ])
}

function showOrders() {
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

showOrders()
