/*CMD
  command: LEAD_ACCEPT_ROUTE
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

if (String(uid) !== "7897324623") {
  return
}

var data = params

if (!data) {
  Bot.sendMessage("⚠️ Reference ID missing.")
  return
}

// Reference ID ke liye prefix remove karo
var refId = data.replace("LEAD_ACCEPT_", "")

Bot.runCommand("LEAD_ACCEPT", {
  params: refId
})
