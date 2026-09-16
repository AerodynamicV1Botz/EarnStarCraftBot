/*CMD
  command: BROADCAST_CANCEL
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
  command: BROADCAST_CANCEL
  need_reply: false
  folder: ADMIN / BROADCAST
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT — BROADCAST_CANCEL
// ADMIN → CANCEL PENDING BROADCAST
// =====================================================


// =====================================================
// 👤 CURRENT USER
// =====================================================

var uid = String(user.telegramid);


// =====================================================
// 🛡️ ADMIN AUTHENTICATION
// =====================================================

var OWNER_ID = "7897324623";
var isAdmin = uid === OWNER_ID;

var adminList = Bot.getProperty("EARNSTAR_ADMINS");

if (!isAdmin && Array.isArray(adminList)) {
  for (var i = 0; i < adminList.length; i++) {
    var item = adminList[i];
    var adminId = "";

    if (typeof item === "string" || typeof item === "number") {
      adminId = String(item);
    } else if (item && typeof item === "object") {
      adminId = String(
        item.id ||
        item.telegramId ||
        item.telegramid ||
        item.userId ||
        ""
      );
    }

    if (adminId === uid) {
      isAdmin = true;
      break;
    }
  }
}

if (!isAdmin) {
  return;
}


// =====================================================
// 🧹 CLEAR PENDING BROADCAST
// =====================================================

Bot.setProperty(
  "PENDING_BROADCAST_" + uid,
  "",
  "string"
);


// =====================================================
// 📲 CALLBACK ANSWER
// =====================================================

if (request && request.id) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "Broadcast cancelled"
  });
}


// =====================================================
// 📤 SEND RESULT
// =====================================================

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
});
