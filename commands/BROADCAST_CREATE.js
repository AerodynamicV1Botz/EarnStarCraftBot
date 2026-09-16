/*CMD
  command: BROADCAST_CREATE
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER
📢 <b>Create Broadcast</b>

📝 Apna announcement message bhejo.

Example:
🎉 New update is live!

Users ko ye message exactly broadcast kiya jayega.
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/*CMD
  command: BROADCAST_CREATE
  need_reply: true
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// BROADCAST_CREATE
// ADMIN → RECEIVE BROADCAST MESSAGE → PREVIEW
// =====================================================


// =====================================================
// 👤 CURRENT ADMIN ID
// =====================================================

var uid = String(user.telegramid);


// =====================================================
// 🔐 HTML SAFE TEXT
// =====================================================

function safeText(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


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

for (var a = 0; a < adminList.length; a++) {

  var adminItem = adminList[a];
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
// 📨 RECEIVE MESSAGE
// =====================================================

var broadcastText = String(message || "").trim();

if (!broadcastText) {

  Bot.sendMessage(
    "⚠️ Please send a broadcast message."
  );

  return;
}


// =====================================================
// 💾 SAVE PENDING BROADCAST
// =====================================================

Bot.setProperty(
  "PENDING_BROADCAST_" + uid,
  broadcastText,
  "string"
);


// =====================================================
// 👥 GET SAVED USERS
// =====================================================

var users =
  Bot.getProperty("BroadcastUsers") || [];

if (!Array.isArray(users)) {
  users = [];
}


// =====================================================
// 📊 COUNT UNIQUE ACTIVE / BLOCKED USERS
// =====================================================

var uniqueUsers = {};
var activeUsers = 0;
var blockedUsers = 0;

for (var i = 0; i < users.length; i++) {

  var savedUser = users[i];
  var targetUserId = "";

  if (
    typeof savedUser === "object" &&
    savedUser !== null
  ) {
    targetUserId =
      savedUser.userId ||
      savedUser.telegramId ||
      savedUser.telegramid ||
      savedUser.id ||
      "";
  } else {
    targetUserId = savedUser;
  }

  targetUserId =
    String(targetUserId || "").trim();

  if (
    !targetUserId ||
    uniqueUsers[targetUserId]
  ) {
    continue;
  }

  uniqueUsers[targetUserId] = true;

  var userData = Bot.getProperty(
    "USER_" + targetUserId
  ) || {};

  if (userData.blocked === true) {
    blockedUsers++;
  } else {
    activeUsers++;
  }
}


// =====================================================
// 👀 PREVIEW
// =====================================================

var previewText =
  "👀 <b>BROADCAST PREVIEW</b>\n\n" +

  "━━━━━━━━━━━━━━━━━━\n\n" +

  "<b>Message:</b>\n\n" +
  safeText(broadcastText) +

  "\n\n━━━━━━━━━━━━━━━━━━\n\n" +

  "👥 <b>Active Recipients:</b> " +
  activeUsers + "\n" +

  "🚫 <b>Blocked Users:</b> " +
  blockedUsers + "\n\n" +

  "━━━━━━━━━━━━━━━━━━\n\n" +

  "⚠️ <b>Ready to send?</b>";


// =====================================================
// 🔘 BUTTONS
// =====================================================

var buttons = [

  [
    {
      text: "✅ Send Broadcast",
      callback_data: "BROADCAST_SEND"
    }
  ],

  [
    {
      text: "❌ Cancel",
      callback_data: "BROADCAST_CANCEL"
    }
  ],

  [
    {
      text: "📢 Broadcast Center",
      callback_data: "ADMIN_BROADCAST"
    }
  ]

];


// =====================================================
// 📤 SEND PREVIEW
// =====================================================

Api.sendMessage({
  chat_id: uid,
  text: previewText,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
});
