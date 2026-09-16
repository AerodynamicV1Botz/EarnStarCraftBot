/*CMD
  command: ADMIN_SEARCH_ORDER
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
  command: ADMIN_SEARCH_ORDER
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// ADMIN_SEARCH_ORDER
// ADMIN → ASK SEARCH QUERY
// =====================================================

var uid = String(user.telegramid);

// =====================================================
// 🛡️ ADMIN AUTH
// =====================================================

var OWNER_ID = "7897324623";
var isAdmin = uid === OWNER_ID;

var adminList = Bot.getProperty("EARNSTAR_ADMINS");

if (!isAdmin && Array.isArray(adminList)) {
  for (var i = 0; i < adminList.length; i++) {
    var item = adminList[i];
    var adminId = "";

    if (
      typeof item === "string" ||
      typeof item === "number"
    ) {
      adminId = String(item);
    } else if (
      item &&
      typeof item === "object"
    ) {
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
// 📲 ASK SEARCH TEXT
// =====================================================

Api.sendMessage({
  chat_id: uid,

  text:
    "🔎 <b>SEARCH ORDER</b>\n\n" +
    "Order ID, client name, Telegram ID, package name ya status type karo.\n\n" +
    "Example:\n" +
    "<code>Starter</code>\n" +
    "<code>accepted</code>\n" +
    "<code>ES-123456</code>\n\n" +
    "Cancel karne ke liye /cancel bhejo.",

  parse_mode: "HTML"
});

Bot.runCommand("ADMIN_SEARCH_ORDER_SAVE");
