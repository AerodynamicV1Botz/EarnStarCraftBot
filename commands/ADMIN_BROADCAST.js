/*CMD
  command: ADMIN_BROADCAST
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
  command: ADMIN_BROADCAST
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// ADMIN_BROADCAST
// ADMIN → BROADCAST CENTER
// =====================================================


// =====================================================
// 👤 CURRENT ADMIN ID
// =====================================================

var uid = String(user.telegramid);


// =====================================================
// 👑 ADMIN AUTHENTICATION
// =====================================================

var ownerId = "7897324623";
var isAdmin = uid === ownerId;


// Optional configured owner
var configuredOwner = Bot.getProperty("OWNER_ID");

if (
  !isAdmin &&
  configuredOwner &&
  String(configuredOwner) === uid
) {
  isAdmin = true;
}


// Multi-admin support
var adminList = Bot.getProperty("EARNSTAR_ADMINS") || [];

if (!Array.isArray(adminList)) {
  adminList = [];
}

for (var i = 0; i < adminList.length; i++) {

  var adminItem = adminList[i];
  var adminId = "";

  if (
    typeof adminItem === "object" &&
    adminItem !== null
  ) {
    adminId =
      adminItem.id ||
      adminItem.telegramId ||
      adminItem.telegramid ||
      adminItem.userId ||
      "";
  } else {
    adminId = adminItem;
  }

  if (String(adminId) === uid) {
    isAdmin = true;
    break;
  }
}

if (!isAdmin) {
  return;
}


// =====================================================
// 👥 SAVED USER COUNT
// =====================================================

var savedUsers =
  Bot.getProperty("BroadcastUsers") || [];

if (!Array.isArray(savedUsers)) {
  savedUsers = [];
}


// Count only unique valid IDs
var uniqueUsers = {};
var userCount = 0;

for (var j = 0; j < savedUsers.length; j++) {

  var savedUser = savedUsers[j];
  var savedUserId = "";

  if (
    typeof savedUser === "object" &&
    savedUser !== null
  ) {
    savedUserId =
      savedUser.userId ||
      savedUser.telegramId ||
      savedUser.telegramid ||
      savedUser.id ||
      "";
  } else {
    savedUserId = savedUser;
  }

  savedUserId = String(savedUserId || "").trim();

  if (
    savedUserId &&
    !uniqueUsers[savedUserId]
  ) {
    uniqueUsers[savedUserId] = true;
    userCount++;
  }
}


// =====================================================
// 📢 BROADCAST CENTER TEXT
// =====================================================

var text =
  "📢 <b>BROADCAST CENTER</b>\n\n" +

  "Send an announcement to your saved users.\n\n" +

  "👥 <b>Saved Users:</b> " +
  userCount + "\n\n" +

  "⚠️ Broadcast sirf un users ko jayega jinhone " +
  "bot start kiya hai aur jinka Telegram ID saved hai.\n\n" +

  "👇 <b>Choose an option:</b>";


// =====================================================
// 🔘 BUTTONS
// =====================================================

var buttons = [

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

];


// =====================================================
// 📤 SEND
// =====================================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
});
