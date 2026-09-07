/*CMD
  command: LEAD_CONTACT
  help: 
  need_reply: false
  auto_retry_time: 
  folder: CONTACT

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var uid = user.telegramid

// ADMIN CHECK
if (String(uid) !== "7897324623") {
  return
}

var refId = params

if (!refId) {
  Bot.sendMessage("⚠️ Reference ID not found.")
  return
}

var enquiry = Bot.getProperty("ENQUIRY_" + refId)

if (!enquiry) {
  Bot.sendMessage("❌ Enquiry not found.")
  return
}

Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "💬 Contact option ready!"
})

Api.sendMessage({
  chat_id: uid,
  text:
    "💬 <b>CONTACT CLIENT</b>\n\n" +
    "🆔 Reference: <code>" + refId + "</code>\n" +
    "👤 Name: " + enquiry.name + "\n" +
    "📋 Status: " + (enquiry.status || "new") + "\n\n" +
    "👇 Click below to open the client's Telegram chat.",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "💬 Open Client Chat",
          url: "tg://user?id=" + enquiry.userId
        }
      ]
    ]
  }
})
