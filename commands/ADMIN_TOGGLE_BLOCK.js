/*CMD
  command: ADMIN_TOGGLE_BLOCK
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
  command: ADMIN_TOGGLE_BLOCK
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// ADMIN → TOGGLE USER BLOCK STATUS
// =====================================================


// =====================================================
// 👤 CURRENT ADMIN
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
// 🆔 TARGET USER ID
// =====================================================

var targetId = String(params || "").trim();

if (!targetId) {
  Bot.sendMessage("⚠️ User ID not found.");
  return;
}


// =====================================================
// 👤 GET USER DATA
// =====================================================

var userKey = "USER_" + targetId;
var userData = Bot.getProperty(userKey);

if (!userData || typeof userData !== "object") {
  Bot.sendMessage("❌ User not found.");
  return;
}


// =====================================================
// 🛡️ PREVENT BLOCKING OWNER
// =====================================================

if (targetId === ownerId) {
  Bot.sendMessage(
    "⚠️ Owner ko block nahi kiya ja sakta."
  );
  return;
}


// =====================================================
// 🔄 TOGGLE BLOCK STATUS
// =====================================================

var currentStatus = userData.blocked === true;

userData.blocked = !currentStatus;
userData.updatedAt = new Date().toISOString();

Bot.setProperty(
  userKey,
  userData,
  "json"
);


// =====================================================
// 📢 RESULT
// =====================================================

var statusText = userData.blocked
  ? "🚫 User Blocked"
  : "🔓 User Unblocked";

if (
  typeof request !== "undefined" &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: statusText
  });
}


// =====================================================
// 👤 OPEN USER DETAILS AGAIN
// =====================================================

Bot.runCommand(
  "ADMIN_USER " + targetId
);
