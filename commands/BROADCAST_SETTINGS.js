/*CMD
  command: BROADCAST_SETTINGS
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
  command: BROADCAST_SETTINGS
  need_reply: false
  folder: ADMIN / BROADCAST
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// ADMIN_BROADCAST_SETTINGS
// ADMIN → BROADCAST SETTINGS OVERVIEW
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
  for (var a = 0; a < adminList.length; a++) {
    var adminItem = adminList[a];
    var adminId = "";

    if (
      typeof adminItem === "string" ||
      typeof adminItem === "number"
    ) {
      adminId = String(adminItem);
    } else if (
      adminItem &&
      typeof adminItem === "object"
    ) {
      adminId = String(
        adminItem.id ||
        adminItem.telegramId ||
        adminItem.telegramid ||
        adminItem.userId ||
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
// 👥 COUNT VALID UNIQUE USERS
// =====================================================

var rawUsers = Bot.getProperty("BroadcastUsers") || [];

if (!Array.isArray(rawUsers)) {
  rawUsers = [];
}

var users = [];
var seenUsers = {};

for (var i = 0; i < rawUsers.length; i++) {
  var item = rawUsers[i];
  var targetId = "";

  if (
    typeof item === "string" ||
    typeof item === "number"
  ) {
    targetId = String(item).trim();
  } else if (
    item &&
    typeof item === "object"
  ) {
    targetId = String(
      item.id ||
      item.telegramId ||
      item.telegramid ||
      item.userId ||
      ""
    ).trim();
  }

  if (
    targetId !== "" &&
    /^[0-9]+$/.test(targetId) &&
    !seenUsers[targetId]
  ) {
    seenUsers[targetId] = true;
    users.push(targetId);
  }
}


// =====================================================
// 📢 BROADCAST SETTINGS
// =====================================================

Api.sendMessage({
  chat_id: uid,

  text:
    "📢 <b>BROADCAST SETTINGS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🟢 <b>Broadcast:</b> Enabled\n" +

    "👥 <b>Saved Users:</b> " +
    users.length + "\n" +

    "📨 <b>Send System:</b> Active\n" +

    "📊 <b>Statistics:</b> Enabled\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "Broadcast messages can be sent to saved bot users.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📨 Broadcast Center",
          callback_data: "ADMIN_BROADCAST"
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
          text: "📝 Enquiry Settings",
          callback_data: "ENQUIRY_SETTINGS"
        },
        {
          text: "👑 Admin Panel",
          callback_data: "ADMIN_PANEL"
        }
      ]
    ]
  }
});
