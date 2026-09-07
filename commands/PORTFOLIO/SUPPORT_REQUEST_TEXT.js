/*CMD
  command: SUPPORT_REQUEST_TEXT
  help: 
  need_reply: true
  auto_retry_time: 
  folder: PORTFOLIO

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// CMD: SUPPORT_REQUEST_TEXT

var uid = user.telegramid
var mode = Bot.getProperty("SUPPORT_MODE_" + uid)

if (mode != "waiting") {
  return
}

var requirements = message
var requestId = "SUPPORT" + Date.now()

var request = {
  requestId: requestId,
  userId: uid,
  service: "Customer Support Bot",
  requirements: requirements,
  status: "pending",
  createdAt: new Date().toISOString()
}

Bot.setProperty(
  "SUPPORT_REQUEST_" + requestId,
  request,
  "json"
)

var keys = Bot.getProperty("SUPPORT_REQUEST_KEYS", [])

if (!Array.isArray(keys)) {
  keys = []
}

keys.push(requestId)

Bot.setProperty(
  "SUPPORT_REQUEST_KEYS",
  keys,
  "json"
)

Bot.setProperty("SUPPORT_MODE_" + uid, "", "string")

Api.sendMessage({
  chat_id: 7897324623,
  text:
    "🛟 <b>New Support Bot Request</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>\n" +
    "👤 User ID: <code>" + uid + "</code>\n\n" +
    "📝 <b>Requirements:</b>\n" +
    requirements,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "✅ Accept",
          callback_data: "SUPPORT_ACCEPTT " + requestId
        },
        {
          text: "❌ Reject",
          callback_data: "SUPPORT_REJECTT " + requestId
        }
      ],
      [
        {
          text: "💬 Contact User",
          callback_data: "SUPPORT_CONTACTT " + requestId
        }
      ]
    ]
  }
})

Bot.sendMessage(
  "✅ <b>Your Support Bot request has been submitted!</b>\n\n" +
  "🆔 Request ID: <code>" + requestId + "</code>\n\n" +
  "Our team will review your requirements and contact you shortly.",
  { parse_mode: "HTML" }
)
