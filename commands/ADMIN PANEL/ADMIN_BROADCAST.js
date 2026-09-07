/*CMD
  command: ADMIN_BROADCAST
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

// ADMIN CHECK
if (String(uid) !== "7897324623") {
  return
}

Api.sendMessage({
  chat_id: uid,
  text:
    "📢 <b>BROADCAST CENTER</b>\n\n" +
    "Send an announcement to your saved users.\n\n" +
    "⚠️ Broadcast only to users who have started the bot.\n\n" +
    "👇 Choose an option:",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📨 Create Broadcast",
          callback_data: "BROADCAST_CREATE"
        }
      ],
      [
        {
          text: "📊 Broadcast Stats",
          callback_data: "BROADCAST_STATS"
        }
      ],
      [
        {
          text: "👑 Admin Panel",
          callback_data: "ADMIN_PANEL"
        }
      ]
    ]
  }
})

