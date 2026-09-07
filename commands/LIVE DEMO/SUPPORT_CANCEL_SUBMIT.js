/*CMD
  command: SUPPORT_CANCEL_SUBMIT
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
// SCRIPT 90 — UPDATED VERSION
// COMMAND NAME: SUPPORT_CANCEL_SUBMIT
// STEP 5.2.3.1.1.3.1.7 — SUBMIT CANCELLATION
// 📁 MAIN MENU → 📁 SERVICES → 📁 SUPPORT → 📁 ORDER REQUEST → 📁 CANCEL ORDER
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Callback Answer + Duplicate Protection
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

if (!cancelData || !cancelData.orderId || !cancelData.reason) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>CANCELLATION DETAILS INCOMPLETE</b>\n\n" +
      "Please select an order and cancellation reason first.",
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

// Prevent duplicate submission
if (cancelData.status === "submitted" || cancelData.refId) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>REQUEST ALREADY SUBMITTED</b>\n\n" +
      "🆔 Reference ID: <code>" +
      (cancelData.refId || "N/A") +
      "</code>\n\n" +
      "Your cancellation request is already under review.",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📋 View Request",
            callback_data: "MY_SUPPORT_REQUEST " + cancelData.refId
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

var refId = "ESCAN" + Date.now().toString().slice(-8)
var now = new Date().toISOString()

var requestData = {
  refId: refId,
  type: "order_cancellation",
  userId: uid,
  orderId: cancelData.orderId,
  reason: cancelData.reason,
  reasonCode: cancelData.reasonCode || "other",
  status: "new",
  createdAt: now
}

// Save support request
Bot.setProperty(
  "SUPPORT_REQUEST_" + refId,
  requestData,
  "json"
)

// Save request key
var requestKeys = Bot.getProperty("SUPPORT_REQUEST_KEYS") || []

if (requestKeys.indexOf(refId) === -1) {
  requestKeys.push(refId)
}

Bot.setProperty(
  "SUPPORT_REQUEST_KEYS",
  requestKeys,
  "json"
)

// Create initial history
var history = [
  {
    status: "new",
    time: now,
    updatedBy: uid
  }
]

Bot.setProperty(
  "SUPPORT_HISTORY_" + refId,
  history,
  "json"
)

// Update pending cancellation
cancelData.refId = refId
cancelData.status = "submitted"
cancelData.submittedAt = now

Bot.setProperty(
  "SUPPORT_CANCEL_" + uid,
  cancelData,
  "json"
)

// Update user data
var userData = Bot.getProperty("USER_" + uid) || {}

userData.supportRequestRef = refId
userData.supportRequestStatus = "new"

Bot.setProperty(
  "USER_" + uid,
  userData,
  "json"
)

// Notify admin
Api.sendMessage({
  chat_id: 7897324623,
  text:
    "📩 <b>NEW ORDER CANCELLATION REQUEST</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🆔 <b>Reference ID:</b>\n" +
    "<code>" + refId + "</code>\n\n" +
    "👤 <b>User ID:</b> <code>" + uid + "</code>\n" +
    "📦 <b>Order ID:</b> <code>" + cancelData.orderId + "</code>\n\n" +
    "📝 <b>Reason:</b>\n" +
    cancelData.reason +
    "\n\n📊 <b>Status:</b> NEW",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "👤 Contact User",
          url: "tg://user?id=" + uid
        }
      ],
      [
        {
          text: "👁 View Request",
          callback_data: "SUPPORT_ADMIN_REQUEST " + refId
        }
      ],
      [
        {
          text: "👑 Admin Panel",
          callback_data: "ADMIN_PANEL"
        }
      ]
    ]
  }
})

// Confirm to user
Api.sendMessage({
  chat_id: uid,
  text:
    "✅ <b>CANCELLATION REQUEST SUBMITTED</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🆔 <b>Reference ID:</b>\n" +
    "<code>" + refId + "</code>\n\n" +
    "📦 <b>Order ID:</b>\n" +
    "<code>" + cancelData.orderId + "</code>\n\n" +
    "📝 <b>Reason:</b>\n" +
    cancelData.reason +
    "\n\n" +
    "🟡 <b>Status:</b> UNDER REVIEW\n\n" +
    "Our team will review your request according to the order status and business policy.",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📋 View Request",
          callback_data: "MY_SUPPORT_REQUEST " + refId
        }
      ],
      [
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
          text: "🏠 Main Menu",
          callback_data: "BACK_MAIN_MENU"
        }
      ]
    ]
  }
})
