/*CMD
  command: ADMIN_SEARCH_USER
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
  command: ADMIN_SEARCH_USER
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// ADMIN SEARCH USER
// ADMIN_USERS → SEARCH INPUT
// =====================================================

// =====================================================
// 🔐 ADMIN AUTH
// =====================================================

var uid = String(user.telegramid)

var OWNER_ID = "7897324623"
var isAdmin = uid === OWNER_ID

if (!isAdmin) {
  var admins = Bot.getProperty("EARNSTAR_ADMINS", [])

  if (!Array.isArray(admins)) {
    admins = []
  }

  for (var i = 0; i < admins.length; i++) {
    var item = admins[i]
    var adminId = ""

    if (typeof item === "string" || typeof item === "number") {
      adminId = String(item)
    } else if (item && typeof item === "object") {
      adminId = String(
        item.id || item.telegramId || item.telegramid || item.userId || ""
      )
    }

    if (adminId === uid) {
      isAdmin = true
      break
    }
  }
}

if (!isAdmin) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ Access denied",
    show_alert: true
  })

  return
}

// =====================================================
// 🔎 SEARCH PROMPT
// =====================================================

Api.sendMessage({
  chat_id: uid,
  text:
    "🔎 <b>SEARCH USER</b>\n\n" +
    "User ka Telegram ID, username ya name bhejo.\n\n" +
    "Example:\n" +
    "<code>7897324623</code>\n" +
    "<code>@username</code>\n" +
    "<code>Veer</code>",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "❌ Cancel",
          callback_data: "ADMIN_USERS"
        }
      ]
    ]
  }
})

Bot.runCommand("ADMIN_SEARCH_USER_SAVE")

