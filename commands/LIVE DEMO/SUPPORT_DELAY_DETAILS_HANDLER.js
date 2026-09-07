/*CMD
  command: SUPPORT_DELAY_DETAILS_HANDLER
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
// SCRIPT 81 — UPDATED VERSION
// COMMAND NAME: SUPPORT_DELAY_DETAILS_HANDLER
// STEP 5.2.3.1.1.2.1.3 — SAVE DELAY DETAILS
// 📁 MAIN MENU → 📁 SERVICES → 📁 SUPPORT → 📁 ORDER REQUEST → 📁 ORDER DELAYED
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================

var uid = user.telegramid

var details = String(message || "").trim()

if (!details) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>Please enter your delay details.</b>\n\n" +
      "Example:\n" +
      "<i>Mera order abhi tak nahi aaya.</i>",
    parse_mode: "HTML"
  })
  return
}

if (details.length < 5 || details.length > 1000) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>Invalid Details</b>\n\n" +
      "Please enter details between 5 and 1000 characters.",
    parse_mode: "HTML"
  })
  return
}

var pending = Bot.getProperty("SUPPORT_DELAY_" + uid) || {}

if (!pending.orderId) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>Order ID not found.</b>\n\n" +
      "Please start the delayed-order request again.",
    parse_mode: "HTML"
  })
  return
}

pending.delayDetails = details
pending.status = "pending"
pending.updatedAt = new Date().toISOString()

var referenceId =
  "ESDLY" +
  String(uid).slice(-4) +
  String(new Date().getTime()).slice(-6)

pending.referenceId = referenceId

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

var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

var text = ""

if (lang === "english") {

  text =
    "✅ <b>DELAY REQUEST SUBMITTED</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🆔 <b>Reference ID:</b>\n" +
    "<code>" + referenceId + "</code>\n\n" +
    "📦 <b>Order ID:</b>\n" +
    "<code>" + pending.orderId + "</code>\n\n" +
    "📝 <b>Delay Details:</b>\n" +
    details + "\n\n" +
    "🔵 <b>Status:</b> Pending Review\n\n" +
    "Our support team can review your request and send updates.\n\n" +
    "🙏 Thank you for contacting support."

} else if (lang === "gujarati") {

  text =
    "✅ <b>DELAY REQUEST SUBMITTED</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🆔 <b>Reference ID:</b>\n" +
    "<code>" + referenceId + "</code>\n\n" +
    "📦 <b>Order ID:</b>\n" +
    "<code>" + pending.orderId + "</code>\n\n" +
    "📝 <b>Delay Details:</b>\n" +
    details + "\n\n" +
    "🔵 <b>Status:</b> Pending Review\n\n" +
    "Support team તમારી request review કરીને updates મોકલી શકે છે.\n\n" +
    "🙏 Support નો સંપર્ક કરવા બદલ આભાર."

} else {

  text =
    "✅ <b>DELAY REQUEST SUBMITTED</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "🆔 <b>Reference ID:</b>\n" +
    "<code>" + referenceId + "</code>\n\n" +
    "📦 <b>Order ID:</b>\n" +
    "<code>" + pending.orderId + "</code>\n\n" +
    "📝 <b>Delay Details:</b>\n" +
    details + "\n\n" +
    "🔵 <b>Status:</b> Pending Review\n\n" +
    "Support team aapki request review karke updates bhej sakti hai.\n\n" +
    "🙏 Support se contact karne ke liye thank you."
}

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📦 Track Order",
          callback_data: "SUPPORT_ORDER_TRACK"
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
          text: "🏠 Main Menu",
          callback_data: "BACK_MAIN_MENU"
        }
      ]
    ]
  }
})
