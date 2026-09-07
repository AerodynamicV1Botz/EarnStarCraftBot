/*CMD
  command: SUPPORT_CANCEL
  help: 
  need_reply: false
  auto_retry_time: 
  folder: PORTFOLIO

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// CMD: SUPPORT_CANCEL

var requestId = params
var request = Bot.getProperty("SUPPORT_REQUEST_" + requestId)

if (!request) {
  return Bot.sendMessage("❌ Request not found.")
}

if (user.telegramid != request.userId) {
  return
}

if (request.status != "pending") {
  return Bot.sendMessage("⚠️ This request cannot be cancelled now.")
}

request.status = "cancelled"
request.cancelledAt = new Date().toISOString()

Bot.setProperty(
  "SUPPORT_REQUEST_" + requestId,
  request,
  "json"
)

Bot.sendMessage(
  "❌ <b>Support Bot request cancelled.</b>\n\n" +
  "🆔 Request ID: <code>" + requestId + "</code>",
  { parse_mode: "HTML" }
)

Api.sendMessage({
  chat_id: 7897324623,
  text:
    "❌ <b>Support Request Cancelled</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>\n" +
    "👤 User ID: <code>" + request.userId + "</code>",
  parse_mode: "HTML"
})
