/*CMD
  command: MY_ORDER_HISTORY
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 95 — UPDATED VERSION
// COMMAND NAME: MY_ORDER_HISTORY
// STEP 5.2.3.1.1.3.1.12 — ORDER HISTORY
// 📁 MAIN MENU → 📁 SERVICES → 📁 SUPPORT
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var orderId = String(params || "").trim()

if (typeof request !== "undefined" && request && request.id) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

function showOrderHistory(text, buttons) {
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

if (!orderId) {
  showOrderHistory(
    lang === "gujarati"
      ? "⚠️ ઓર્ડર ID મળ્યો નથી."
      : lang === "english"
        ? "⚠️ Order ID missing."
        : "⚠️ Order ID nahi mila.",
    [
      [
        {
          text: "📦 My Orders",
          callback_data: "MY_ORDERS"
        }
      ],
      [
        {
          text: "🏠 Main Menu",
          callback_data: "BACK_MAIN_MENU"
        }
      ]
    ]
  )
  return
}

var order = Bot.getProperty("ORDER_" + orderId)

if (!order) {
  showOrderHistory(
    lang === "gujarati"
      ? "❌ ઓર્ડર મળ્યો નથી."
      : lang === "english"
        ? "❌ Order not found."
        : "❌ Order nahi mila.",
    [
      [
        {
          text: "📦 My Orders",
          callback_data: "MY_ORDERS"
        }
      ],
      [
        {
          text: "🏠 Main Menu",
          callback_data: "BACK_MAIN_MENU"
        }
      ]
    ]
  )
  return
}

// 🔐 SECURITY CHECK
if (String(order.userId) !== String(uid)) {
  showOrderHistory(
    lang === "gujarati"
      ? "❌ આ ઓર્ડર તમારો નથી."
      : lang === "english"
        ? "❌ This is not your order."
        : "❌ Yeh order aapka nahi hai.",
    [
      [
        {
          text: "📦 My Orders",
          callback_data: "MY_ORDERS"
        }
      ],
      [
        {
          text: "🏠 Main Menu",
          callback_data: "BACK_MAIN_MENU"
        }
      ]
    ]
  )
  return
}

var history = Bot.getProperty("ORDER_HISTORY_" + orderId) || []

var title = "📜 <b>ORDER HISTORY</b>"
var noHistory = "ℹ️ No history available yet."

if (lang === "gujarati") {
  title = "📜 <b>ઓર્ડર હિસ્ટરી</b>"
  noHistory = "ℹ️ હજુ સુધી કોઈ હિસ્ટરી ઉપલબ્ધ નથી."
}

if (lang === "hinglish") {
  title = "📜 <b>ORDER HISTORY</b>"
  noHistory = "ℹ️ Abhi tak koi history available nahi hai."
}

var text =
  title + "\n\n" +
  "📦 Order: <code>" + orderId + "</code>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n"

if (history.length === 0) {
  text += noHistory
} else {
  for (var i = history.length - 1; i >= 0; i--) {
    var item = history[i]
    var status = String(item.status || "pending").toLowerCase()
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
      "🕐 " +
      (
        item.time
          ? new Date(item.time).toLocaleString("en-IN")
          : "Unknown"
      ) +
      "\n\n"
  }
}

showOrderHistory(text, [
  [
    {
      text: "📦 Back to My Order",
      callback_data: "MY_ORDER " + orderId
    }
  ],
  [
    {
      text: "📦 My Orders",
      callback_data: "MY_ORDERS"
    },
    {
      text: "🏠 Main Menu",
      callback_data: "BACK_MAIN_MENU"
    }
  ]
])
