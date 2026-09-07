/*CMD
  command: BROADCAST_CANCEL
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

// ==========================================
// 👑 ADMIN CHECK
// ==========================================

if (String(uid) !== "7897324623") {
  return
}

// ==========================================
// 🧹 CLEAR PENDING BROADCAST
// ==========================================

Bot.setProperty(
  "PENDING_BROADCAST_" + uid,
  "",
  "string"
)

// ==========================================
// 📢 CANCELLED
// ==========================================

Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "Broadcast cancelled"
})

// ==========================================
// 📤 SEND RESULT
// ==========================================

Api.sendMessage({
  chat_id: uid,

  text:
    "❌ <b>BROADCAST CANCELLED</b>\n\n" +
    "The pending broadcast has been cancelled successfully.\n\n" +
    "No users were contacted.",

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
          text: "📢 Broadcast Center",
          callback_data: "ADMIN_BROADCAST"
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
