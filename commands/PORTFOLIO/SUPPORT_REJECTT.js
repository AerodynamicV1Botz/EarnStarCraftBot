/*CMD
  command: SUPPORT_REJECTT
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

// CMD: SUPPORT_REJECTT

if (user.telegramid != 7897324623) {
  return
}

var requestId = params
var request = Bot.getProperty("SUPPORT_REQUEST_" + requestId)

if (!request) {
  return Bot.sendMessage("❌ Request not found.")
}

request.status = "rejected"
request.rejectedAt = new Date().toISOString()

Bot.setProperty(
  "SUPPORT_REQUEST_" + requestId,
  request,
  "json"
)

Api.answerCallbackQuery({
  callback_query_id: requestId,
  text: "❌ Support request rejected"
})

Api.sendMessage({
  chat_id: request.userId,
  text:
    "❌ <b>Your Support Bot request was rejected.</b>\n\n" +
    "🆔 Request ID: <code>" + requestId + "</code>\n\n" +
    "You can contact our team for more information.",
  parse_mode: "HTML"
})

Bot.sendMessage(
  "❌ <b>Support Request Rejected</b>\n\n" +
  "🆔 Request ID: <code>" + requestId + "</code>\n" +
  "👤 User ID: <code>" + request.userId + "</code>",
  { parse_mode: "HTML" }
)
