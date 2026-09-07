/*CMD
  command: USER_ROUTE
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

var commandName = String(params || "");
if (!commandName) return;

// Sirf user wale commands allow honge
var allowedCommands = [
  "MAIN_MENU",
  "PROFILE",
  "PRICING",
  "SUPPORT",
  "ABOUT",
  "BACK"
];

if (allowedCommands.indexOf(commandName) === -1) {
  return;
}

if (request && request.message) {
  Api.deleteMessage({
    chat_id: String(user.telegramid),
    message_id: request.message.message_id
  });
}

Bot.runCommand(commandName);
