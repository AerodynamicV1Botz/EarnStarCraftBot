/*CMD
  command: ADMIN_SEARCH_ORDER
  help: 
  need_reply: false
  auto_retry_time: 
  folder: ADMIN PANEL

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var uid = user.telegramid

if (String(uid) !== "7897324623") {
  return
}

Api.sendMessage({
  chat_id: uid,
  text:
    "🔎 <b>SEARCH ORDER</b>\n\n" +
    "Order ID, client name, username ya contact enter karo:",
  parse_mode: "HTML"
})

Bot.runCommand("ADMIN_SEARCH_ORDER_INPUT")
