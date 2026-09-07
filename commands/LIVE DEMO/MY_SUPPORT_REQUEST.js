/*CMD
  command: MY_SUPPORT_REQUEST
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
// SCRIPT 91 — UPDATED VERSION
// COMMAND NAME: MY_SUPPORT_REQUEST
// STEP 5.2.3.1.1.3.1.8 — VIEW SUPPORT REQUEST
// 📁 MAIN MENU → 📁 SERVICES → 📁 SUPPORT
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var refId = String(params || "").trim()

if (typeof request !== "undefined" && request && request.id) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

if (!refId) {
  Api.sendMessage({
    chat_id: uid,
    text: "⚠️ Reference ID missing."
  })
  return
}

var supportRequest = Bot.getProperty("SUPPORT_REQUEST_" + refId)

if (!supportRequest) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ Support request not found."
  })
  return
}

// Security check
if (String(supportRequest.userId) !== String(uid)) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ This request does not belong to you."
  })
  return
}

var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

var status = String(supportRequest.status || "new").toLowerCase()

var statusIcon = "🟡"
var statusText = {
  hinglish: "UNDER REVIEW",
  english: "UNDER REVIEW",
  gujarati: "UNDER REVIEW"
}[lang]

if (status === "accepted" || status === "approved") {
  statusIcon = "🟢"
  statusText = "ACCEPTED"
}

if (status === "rejected" || status === "closed") {
  statusIcon = "🔴"
  statusText = "CLOSED"
}

if (status === "cancelled") {
  statusIcon = "🔴"
  statusText = "CANCELLED"
}

var typeText = "Order Cancellation"

if (supportRequest.type === "order_delay") {
  typeText = "Order Delay"
}

var title = "📋 <b>MY SUPPORT REQUEST</b>"
var messageText =
  "Our team will review your request and update the status when required."

if (lang === "english") {
  title = "📋 <b>MY SUPPORT REQUEST</b>"
  messageText =
    "Our team will review your request and update the status when required."
}

if (lang === "gujarati") {
  title = "📋 <b>મારી સપોર્ટ રિક્વેસ્ટ</b>"
  messageText =
    "અમારી ટીમ તમારી રિક્વેસ્ટ તપાસશે અને જરૂરી મુજબ સ્ટેટસ અપડેટ કરશે."
}

var text =
  title + "\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "🆔 <b>Reference ID:</b>\n" +
  "<code>" + refId + "</code>\n\n" +
  "📂 <b>Request Type:</b>\n" +
  typeText + "\n\n" +
  "📦 <b>Order ID:</b>\n" +
  "<code>" + (supportRequest.orderId || "Not provided") + "</code>\n\n" +
  "📝 <b>Reason / Details:</b>\n" +
  (supportRequest.reason || supportRequest.details || "Not provided") +
  "\n\n" +
  statusIcon + " <b>Status:</b> " + statusText + "\n\n" +
  "🕐 <b>Submitted:</b>\n" +
  (supportRequest.createdAt
    ? new Date(supportRequest.createdAt).toLocaleString("en-IN")
    : "Not available") +
  "\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  messageText

var buttons = [
  [
    {
      text: "🔄 Refresh",
      callback_data: "MY_SUPPORT_REQUEST " + refId
    },
    {
      text: "📜 History",
      callback_data: "SUPPORT_REQUEST_HISTORY " + refId
    }
  ],
  [
    {
      text: "📦 My Orders",
      callback_data: "MY_ORDERS"
    }
  ],
  [
    {
      text: "📞 Contact Team",
      callback_data: "CONTACT_TEAM"
    }
  ],
  [
    {
      text: "🏠 Main Menu",
      callback_data: "BACK_MAIN_MENU"
    }
  ]
]

function showSupportRequest() {
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

showSupportRequest()
