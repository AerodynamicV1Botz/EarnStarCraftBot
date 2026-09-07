/*CMD
  command: ADMIN_USERS
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

// CMD: ADMIN_USERS

var uid = String(user.telegramid);

// ==========================================
// 👑 ADMIN CHECK
// ==========================================

if (uid !== "7897324623") {
  return;
}

// ==========================================
// 👥 GET USERS
// ==========================================

var users = Bot.getProperty("BroadcastUsers") || [];

if (!Array.isArray(users)) {
  users = [];
}

// ==========================================
// 📊 EMPTY USER LIST
// ==========================================

if (users.length === 0) {

  Api.sendMessage({
    chat_id: uid,
    text:
      "👥 <b>USER MANAGEMENT</b>\n\n" +
      "No users found yet.",
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

// ==========================================
// 📋 USER LIST
// ==========================================

var text =
  "👥 <b>USER MANAGEMENT</b>\n\n" +
  "Total Saved Users: <b>" + users.length + "</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n";

var buttons = [];
var count = 0;
var shownIds = [];

// ==========================================
// 👤 RECENT 10 USERS
// ==========================================

for (
  var i = users.length - 1;
  i >= 0 && count < 10;
  i--
) {

  var rawUser = users[i];
  var userId = "";

  // Direct Telegram ID
  if (
    typeof rawUser === "string" ||
    typeof rawUser === "number"
  ) {
    userId = String(rawUser);
  }

  // Object format support
  else if (rawUser && typeof rawUser === "object") {
    userId = String(
      rawUser.userId ||
      rawUser.telegramid ||
      rawUser.telegramId ||
      rawUser.id ||
      ""
    );
  }

  // Invalid ID skip
  if (
    !userId ||
    userId === "undefined" ||
    userId === "null" ||
    userId === "[object Object]"
  ) {
    continue;
  }

  // Duplicate user skip
  if (shownIds.indexOf(userId) !== -1) {
    continue;
  }

  var userData = Bot.getProperty("USER_" + userId) || {};

  var name = String(
    userData.name ||
    userData.firstName ||
    "User"
  );

  var language = String(
    userData.language ||
    "Not selected"
  );

  var langIcon = "🌐";

  if (language.toLowerCase() === "hinglish") {
    langIcon = "🇮🇳";
  }

  if (language.toLowerCase() === "english") {
    langIcon = "🇬🇧";
  }

  if (language.toLowerCase() === "gujarati") {
    langIcon = "🇮🇳";
  }

  text +=
    "👤 <b>" + name + "</b>\n" +
    "🆔 <code>" + userId + "</code>\n" +
    langIcon + " " + language + "\n\n";

  buttons.push([
    {
      text: "👁 View " + name,
      callback_data: "ADMIN_USER " + userId
    }
  ]);

  shownIds.push(userId);
  count++;
}

// ==========================================
// ⚠️ NO VALID USERS
// ==========================================

if (buttons.length === 0) {

  Api.sendMessage({
    chat_id: uid,
    text:
      "👥 <b>USER MANAGEMENT</b>\n\n" +
      "Saved users mile, lekin valid Telegram ID nahi mili.",
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

// ==========================================
// 🔘 NAVIGATION BUTTONS
// ==========================================

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

// ==========================================
// 📤 SEND USER LIST
// ==========================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
});
