/*CMD
  command: /SET_ADMIN
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
  command: SET_ADMIN
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SET OWNER ADMIN
// =====================================================

var ownerId = "7897324623";

Bot.setProperty(
  "EARNSTAR_ADMINS",
  [ownerId],
  "json"
);

Bot.sendMessage(
  "✅ Admin set successfully.\n\nAdmin ID: " + ownerId
);
