/*CMD
  command: SUPPORT_DELAY_DETAILS_SAVE
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
// SCRIPT 97 — UPDATED VERSION
// COMMAND NAME: SUPPORT_DELAY_DETAILS_SAVE
// STEP 5.2.3.1.1.2.1.3 — SUBMIT DELAY REQUEST
// 📁 MAIN MENU → 📁 SERVICES → 📁 SUPPORT
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================

var uid = user.telegramid
var details = String(message || "").trim()

if (!details) {
  Api.sendMessage({
    chat_id: uid,
    text: "⚠️ <b>Please provide some details about the delay.</b>",
    parse_mode: "HTML"
  })
  return
}

if (details.length > 1000) {
  details = details.substring(0, 1000)
}

var pending = Bot.getProperty("SUPPORT_DELAY_" + uid) || {}
var orderId = pending.orderId || ""

if (!orderId) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>Request expired</b>\n\n" +
      "Please start the delayed-order request again.",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "⏳ Start Again",
            callback_data: "SUPPORT_ORDER_DELAY"
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

var refId = "ESSUP" + Date.now().toString().slice(-8)

var supportRequest = {
  refId: refId,
  userId: uid,
  type: "order_delay",
  orderId: orderId,
  details: details,
  status: "new",
  createdAt: new Date().toISOString()
}

Bot.setProperty(
  "SUPPORT_REQUEST_" + refId,
  supportRequest,
  "json"
)

var supportKeys = Bot.getProperty("SUPPORT_REQUEST_KEYS") || []

if (supportKeys.indexOf(refId) === -1) {
  supportKeys.push(refId)
}

Bot.setProperty(
  "SUPPORT_REQUEST_KEYS",
  supportKeys,
  "json"
)

pending.refId = refId
pending.details = details
pending.status = "new"

Bot.setProperty(
  "SUPPORT_DELAY_" + uid,
  pending,
  "json"
)

Bot.setProperty(
  "SUPPORT_DELAY_STEP_" + uid,
  "completed",
  "string"
)

var adminId = "7897324623"

var adminText =
  "🆘 <b>NEW SUPPORT REQUEST</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "🎫 <b>Reference:</b>\n" +
  "<code>" + refId + "</code>\n\n" +
  "📌 <b>Type:</b> Order Delay\n\n" +
  "📦 <b>Order ID:</b>\n" +
  "<code>" + orderId + "</code>\n\n" +
  "👤 <b>User ID:</b>\n" +
  "<code>" + uid + "</code>\n\n" +
  "📝 <b>Details:</b>\n" +
  details + "\n\n" +
  "📊 <b>Status:</b> NEW"

Api.sendMessage({
  chat_id: adminId,
  text: adminText,
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
      ]
    ]
  }
})

var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

var userText = ""

if (lang === "english") {
  userText =
    "✅ <b>SUPPORT REQUEST SUBMITTED</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🎫 <b>Reference ID:</b>\n" +
    "<code>" + refId + "</code>\n\n" +
    "📦 <b>Order ID:</b>\n" +
    "<code>" + orderId + "</code>\n\n" +
    "📊 <b>Status:</b> 🟡 NEW\n\n" +
    "Your delayed-order request has been sent to the support team.\n\n" +
    "You can use the reference ID for future follow-up."
} else if (lang === "gujarati") {
  userText =
    "✅ <b>SUPPORT REQUEST SUBMITTED</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🎫 <b>Reference ID:</b>\n" +
    "<code>" + refId + "</code>\n\n" +
    "📦 <b>Order ID:</b>\n" +
    "<code>" + orderId + "</code>\n\n" +
    "📊 <b>Status:</b> 🟡 NEW\n\n" +
    "તમારી delayed-order request support team ને મોકલી દેવામાં આવી છે.\n\n" +
    "Future follow-up માટે Reference ID સાચવી રાખો."
} else {
  userText =
    "✅ <b>SUPPORT REQUEST SUBMITTED</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🎫 <b>Reference ID:</b>\n" +
    "<code>" + refId + "</code>\n\n" +
    "📦 <b>Order ID:</b>\n" +
    "<code>" + orderId + "</code>\n\n" +
    "📊 <b>Status:</b> 🟡 NEW\n\n" +
    "Aapki delayed-order request support team ko bhej di gayi hai.\n\n" +
    "Future follow-up ke liye Reference ID save karke rakhein."
}

Api.sendMessage({
  chat_id: uid,
  text: userText,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🔎 Track Order",
          callback_data: "SUPPORT_ORDER_TRACK"
        }
      ],
      [
        {
          text: "📞 Contact Support",
          callback_data: "SUPPORT_CONTACT"
        }
      ],
      [
        {
          text: "🛟 Support Demo",
          callback_data: "DEMO_SUPPORT"
        },
        {
          text: "🏠 Main Menu",
          callback_data: "BACK_MAIN_MENU"
        }
      ]
    ]
  }
})
