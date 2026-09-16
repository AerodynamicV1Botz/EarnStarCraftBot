/*CMD
  command: ORDER_CONTACT_RECEIVE
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/*CMD
command: ORDER_CONTACT_RECEIVE
need_reply: false
folder: ORDERS
*/

var uid = String(user.telegramid)

if (
  typeof message === "undefined" ||
  !message ||
  !message.contact ||
  !message.contact.phone_number
) {
  return
}

var draft = Bot.getProperty("ORDER_DRAFT_" + uid)

if (!draft) {
  Bot.sendMessage("❌ Order draft nahi mila.")
  return
}

if (!draft.contacts) {
  draft.contacts = {}
}

draft.contacts.telegram = String(message.contact.phone_number)

Bot.setProperty(
  "ORDER_DRAFT_" + uid,
  draft,
  "json"
)

Api.sendMessage({
  chat_id: uid,
  text:
    "✅ <b>Telegram contact saved</b>\n\n" +
    "📱 " + draft.contacts.telegram,
  parse_mode: "HTML",
  reply_markup: {
    remove_keyboard: true
  }
})

Bot.runCommand("ORDER_CONTACT_MENU")
