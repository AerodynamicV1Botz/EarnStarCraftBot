/*CMD
  command: MY_ORDER
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
// SCRIPT 94 — UPDATED VERSION
// COMMAND NAME: MY_ORDER
// STEP 5.2.3.1.1.3.1.11 — VIEW ORDER
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

function sendOrderMessage(text, buttons) {
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
  var missingText =
    lang === "gujarati"
      ? "📦 <b>મારો ઓર્ડર</b>\n\n⚠️ ઓર્ડર ID મળ્યો નથી.\n\nકૃપા કરીને પહેલા પૂછપરછ બનાવો."
      : lang === "english"
        ? "📦 <b>MY ORDER</b>\n\n⚠️ No Order ID found.\n\nPlease create an enquiry first."
        : "📦 <b>MERA ORDER</b>\n\n⚠️ Order ID nahi mila.\n\nPehle enquiry create karo."

  sendOrderMessage(missingText, [
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
  ])

  return
}

var order = Bot.getProperty("ORDER_" + orderId)

if (!order) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ Order not found."
  })
  return
}

// 🔐 USER SECURITY CHECK
if (String(order.userId) !== String(uid)) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ This order does not belong to you."
  })
  return
}

var status = String(order.status || "pending").toLowerCase()

var statusIcon = "🟡"
var statusText = "PENDING"

if (status === "active") {
  statusIcon = "🔵"
  statusText = "ACTIVE"
}

if (status === "completed") {
  statusIcon = "🟢"
  statusText = "COMPLETED"
}

if (status === "cancelled") {
  statusIcon = "🔴"
  statusText = "CANCELLED"
}

var createdTime = order.createdAt || "Not available"

var title = "📦 <b>MY ORDER</b>"
var helpText = "📞 <b>Need help?</b>\nContact our team anytime."

if (lang === "gujarati") {
  title = "📦 <b>મારો ઓર્ડર</b>"
  helpText = "📞 <b>મદદ જોઈએ છે?</b>\nકોઈપણ સમયે અમારી ટીમનો સંપર્ક કરો."
}

if (lang === "english") {
  title = "📦 <b>MY ORDER</b>"
  helpText = "📞 <b>Need help?</b>\nContact our team anytime."
}

var text =
  title + "\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "🆔 <b>Order ID:</b>\n" +
  "<code>" + (order.orderId || orderId) + "</code>\n\n" +
  "📋 <b>Enquiry:</b>\n" +
  "<code>" + (order.enquiryRef || "Not available") + "</code>\n\n" +
  "👤 <b>Name:</b> " +
  (order.name || "User") +
  "\n\n" +
  statusIcon +
  " <b>Status:</b> " +
  statusText +
  "\n\n" +
  "🕐 <b>Created:</b>\n" +
  createdTime +
  "\n\n" +
  "📝 <b>Project Requirements:</b>\n" +
  (order.requirements || "Not provided") +
  "\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  helpText

var buttons = [
  [
    {
      text: "🔄 Refresh",
      callback_data: "MY_ORDER " + orderId
    }
  ],
  [
    {
      text: "📜 Order History",
      callback_data: "MY_ORDER_HISTORY " + orderId
    }
  ],
  [
    {
      text: "📞 Contact Team",
      url: "https://t.me/TeamEarnStar"
    }
  ],
  [
    {
      text: "📋 My Enquiry",
      callback_data: "MY_ENQUIRY"
    },
    {
      text: "🏠 Main Menu",
      callback_data: "BACK_MAIN_MENU"
    }
  ]
]

sendOrderMessage(text, buttons)
