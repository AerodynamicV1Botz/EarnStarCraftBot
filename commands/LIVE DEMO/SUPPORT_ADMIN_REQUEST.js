/*CMD
  command: SUPPORT_ADMIN_REQUEST
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
// SCRIPT 98 — UPDATED VERSION
// COMMAND NAME: SUPPORT_ADMIN_REQUEST
// STEP 5.2.3.1.1.2.1.4 — ADMIN VIEW REQUEST
// 📁 MAIN MENU → 📁 SERVICES → 📁 SUPPORT
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var adminId = "7897324623"

if (String(uid) !== adminId) {
  if (typeof request !== "undefined" && request && request.id) {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "❌ Admin access required",
      show_alert: true
    })
  }
  return
}

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

var supportRequest = Bot.getProperty(
  "SUPPORT_REQUEST_" + refId
)

if (!supportRequest) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ Support request not found."
  })
  return
}

var status = String(
  supportRequest.status || "new"
).toLowerCase()

var statusIcon = "🟡"
var statusText = "NEW"

if (status === "accepted" || status === "approved") {
  statusIcon = "🟢"
  statusText = "ACCEPTED"
}

if (
  status === "rejected" ||
  status === "closed" ||
  status === "cancelled"
) {
  statusIcon = "🔴"
  statusText = status.toUpperCase()
}

var typeText = "Order Cancellation"

if (supportRequest.type === "order_delay") {
  typeText = "Order Delay"
}

var text =
  "🛠️ <b>SUPPORT REQUEST DETAILS</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "🆔 <b>Reference ID:</b>\n" +
  "<code>" + refId + "</code>\n\n" +
  "📂 <b>Type:</b>\n" +
  typeText + "\n\n" +
  "👤 <b>User ID:</b>\n" +
  "<code>" + supportRequest.userId + "</code>\n\n" +
  "📦 <b>Order ID:</b>\n" +
  "<code>" + (supportRequest.orderId || "N/A") + "</code>\n\n" +
  "📝 <b>Reason / Details:</b>\n" +
  (supportRequest.reason || supportRequest.details || "N/A") +
  "\n\n" +
  statusIcon +
  " <b>Status:</b> " +
  statusText +
  "\n\n" +
  "🕐 <b>Created:</b>\n" +
  (
    supportRequest.createdAt
      ? new Date(supportRequest.createdAt).toLocaleString("en-IN")
      : "Not available"
  ) +
  "\n\n" +
  "━━━━━━━━━━━━━━━━━━"

var buttons = [
  [
    {
      text: "👤 Contact User",
      url: "tg://user?id=" + supportRequest.userId
    }
  ],
  [
    {
      text: "📜 History",
      callback_data: "SUPPORT_ADMIN_REQUEST_HISTORY " + refId
    }
  ]
]

if (status === "new") {
  buttons.push([
    {
      text: "✅ Accept Request",
      callback_data: "SUPPORT_ACCEPT " + refId
    }
  ])

  buttons.push([
    {
      text: "❌ Reject Request",
      callback_data: "SUPPORT_REJECT " + refId
    }
  ])
}

buttons.push([
  {
    text: "🔄 Refresh",
    callback_data: "SUPPORT_ADMIN_REQUEST " + refId
  }
])

buttons.push([
  {
    text: "📋 All Support Requests",
    callback_data: "SUPPORT_ADMIN_REQUESTS"
  }
])

buttons.push([
  {
    text: "👑 Admin Panel",
    callback_data: "ADMIN_PANEL"
  }
])

function showAdminRequest() {
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

showAdminRequest()
