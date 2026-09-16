/*CMD
  command: ADMIN_USERS
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
  command: ADMIN_USERS
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// ADMIN_USERS
// ADMIN → USER MANAGEMENT
// =====================================================


// =====================================================
// 🔐 ADMIN AUTHENTICATION
// =====================================================

var uid = String(user.telegramid);
var allowed = false;

var adminIds = ["7897324623"];

try {
  var ownerId = Bot.getProperty("OWNER_ID");

  if (ownerId) {
    adminIds.push(String(ownerId));
  }
} catch (e) {}

try {
  var admins = Bot.getProperty("EARNSTAR_ADMINS", []);

  if (Array.isArray(admins)) {
    for (var a = 0; a < admins.length; a++) {
      var item = admins[a];
      var adminId = "";

      if (typeof item === "object" && item !== null) {
        adminId =
          item.id ||
          item.telegramId ||
          item.telegramid ||
          item.userId ||
          "";
      } else {
        adminId = item;
      }

      if (adminId) {
        adminIds.push(String(adminId));
      }
    }
  }
} catch (e) {}

for (var b = 0; b < adminIds.length; b++) {
  if (adminIds[b] === uid) {
    allowed = true;
    break;
  }
}

if (!allowed) {
  Bot.sendMessage("⛔ <b>Access Denied</b>", {
    parse_mode: "HTML"
  });
  return;
}


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
// 👥 GET SAVED USERS
// =====================================================

var users = Bot.getProperty("BroadcastUsers") || [];

if (!Array.isArray(users)) {
  users = [];
}


// =====================================================
// 🧹 NORMALIZE + REMOVE DUPLICATE USERS
// =====================================================

var uniqueUsers = [];
var uniqueIds = {};

for (var i = 0; i < users.length; i++) {
  var rawUser = users[i];
  var userId = "";

  if (
    typeof rawUser === "string" ||
    typeof rawUser === "number"
  ) {
    userId = String(rawUser);
  } else if (
    rawUser &&
    typeof rawUser === "object"
  ) {
    userId = String(
      rawUser.userId ||
      rawUser.telegramid ||
      rawUser.telegramId ||
      rawUser.id ||
      ""
    );
  }

  userId = userId.trim();

  if (
    !userId ||
    userId === "undefined" ||
    userId === "null" ||
    userId === "[object Object]"
  ) {
    continue;
  }

  if (uniqueIds[userId]) {
    continue;
  }

  uniqueIds[userId] = true;
  uniqueUsers.push(userId);
}


// =====================================================
// 📊 EMPTY USER LIST
// =====================================================

if (uniqueUsers.length === 0) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "👥 <b>USER MANAGEMENT</b>\n\n" +
      "No valid users found yet.",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🔄 Refresh",
            callback_data: "ADMIN_USERS"
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

  return;
}


// =====================================================
// 📋 USER LIST
// =====================================================

var text =
  "👥 <b>USER MANAGEMENT</b>\n\n" +
  "Total Saved Users: <b>" +
  uniqueUsers.length +
  "</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n";

var buttons = [];
var count = 0;


// =====================================================
// 👤 RECENT 10 USERS
// =====================================================

for (
  var j = uniqueUsers.length - 1;
  j >= 0 && count < 10;
  j--
) {
  var userId = uniqueUsers[j];

  var userData = Bot.getProperty("USER_" + userId) || {};

  var name = String(
    userData.name ||
    userData.firstName ||
    userData.first_name ||
    userData.username ||
    "Telegram User"
  );

  var language = String(
    userData.language ||
    "Not selected"
  );

  var langIcon = "🌐";
  var lowerLanguage = language.toLowerCase();

  if (lowerLanguage === "hinglish") {
    langIcon = "🇮🇳";
  } else if (lowerLanguage === "english") {
    langIcon = "🇬🇧";
  } else if (lowerLanguage === "gujarati") {
    langIcon = "🇮🇳";
  }

  text +=
    "👤 <b>" + safeText(name) + "</b>\n" +
    "🆔 <code>" + safeText(userId) + "</code>\n" +
    langIcon + " " + safeText(language) + "\n\n";

  buttons.push([
    {
      text: "👁 View " + name.substring(0, 25),
      callback_data: "ADMIN_USER " + userId
    }
  ]);

  count++;
}


// =====================================================
// 🔘 NAVIGATION BUTTONS
// =====================================================

buttons.push([
  {
    text: "🔎 Search User",
    callback_data: "ADMIN_SEARCH_USER"
  }
]);

buttons.push([
  {
    text: "🔄 Refresh",
    callback_data: "ADMIN_USERS"
  }
]);

buttons.push([
  {
    text: "👑 Admin Panel",
    callback_data: "ADMIN_PANEL"
  }
]);


// =====================================================
// 📤 SEND USER LIST
// =====================================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
});
