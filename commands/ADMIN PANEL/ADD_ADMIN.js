/*CMD
  command: ADD_ADMIN
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

 // ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 231 — FINAL VERSION
// COMMAND NAME: ADD_ADMIN
// STEP 9.3 — ADD NEW ADMIN
// 📁 Prompt + Next Command System
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================

var uid = String(user.telegramid)
var ownerId = "7897324623"

// ==========================================
// 👑 OWNER CHECK
// ==========================================

if (uid !== ownerId) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "🔒 <b>Access Denied</b>\n\n" +
      "Sirf owner admin add kar sakta hai.",
    parse_mode: "HTML"
  })
  return
}

// ==========================================
// 📩 SAVE WAITING STATE
// ==========================================

Bot.setProperty(
  "ADMIN_ACTION_" + uid,
  {
    action: "add_admin",
    step: "waiting_id"
  },
  "json"
)

// ==========================================
// 📤 SEND PROMPT
// ==========================================

Api.sendMessage({
  chat_id: uid,
  text:
    "➕ <b>Add New Admin</b>\n\n" +
    "Naye admin ka Telegram ID bhejo.\n\n" +
    "Example: <code>123456789</code>\n\n" +
    "⚠️ Sirf numeric Telegram ID bhejna.",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "❌ Cancel",
          callback_data: "ADMIN_MANAGEMENT"
        }
      ]
    ]
  }
})

// ==========================================
// ▶️ TRIGGER NEXT COMMAND
// ==========================================

Bot.runCommand("ADD_ADMIN_ID_HANDLER")

return
