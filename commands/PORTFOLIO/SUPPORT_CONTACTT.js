/*CMD
  command: SUPPORT_CONTACTT
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

// CMD: SUPPORT_CONTACTT

if (user.telegramid != 7897324623) {
  return
}

var requestId = params
var request = Bot.getProperty("SUPPORT_REQUEST_" + requestId)

if (!request) {
  return Bot.sendMessage("❌ Request not found.")
}

Bot.sendMessage(
  "📩 <b>Support Request Contact</b>\n\n" +
  "🆔 Request ID: <code>" + requestId + "</code>\n" +
  "👤 User ID: <code>" + request.userId + "</code>\n\n" +
  "User ko contact karne ke liye neeche button use karein.",
  {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "💬 Contact User",
            url: "tg://user?id=" + request.userId
          }
        ]
      ]
    }
  }
)
