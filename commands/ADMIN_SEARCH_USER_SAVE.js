/*CMD
  command: ADMIN_SEARCH_USER_SAVE
  help: 
  need_reply: true
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
  command: ADMIN_SEARCH_USER_SAVE
  need_reply: true
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// ADMIN SEARCH USER SAVE
// ADMIN_SEARCH_USER → SEARCH RESULT
// =====================================================


// =====================================================
// 🔐 ADMIN AUTH
// =====================================================

var uid = String(user.telegramid);
var OWNER_ID = "7897324623";
var isAdmin = uid === OWNER_ID;

if (!isAdmin) {
  var admins = Bot.getProperty("EARNSTAR_ADMINS", []);

  if (!Array.isArray(admins)) {
    admins = [];
  }

  for (var i = 0; i < admins.length; i++) {
    var item = admins[i];
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
// 🔎 SEARCH TEXT
// =====================================================

var searchText = String(message || "").trim();

if (!searchText) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ Search text empty hai. Dobara user ID, username ya name bhejo.",
    parse_mode: "HTML"
  });

  return;
}

var searchLower = searchText.toLowerCase();


// =====================================================
// 👥 READ USERS
// =====================================================

var users = Bot.getProperty("BroadcastUsers", []);

if (!Array.isArray(users)) {
  users = [];
}

var results = [];
var usedIds = {};

for (var j = 0; j < users.length; j++) {
  var entry = users[j];
  var userId = "";
  var username = "";
  var firstName = "";
  var lastName = "";

  if (typeof entry === "string" || typeof entry === "number") {
    userId = String(entry);
  } else if (entry && typeof entry === "object") {
    userId = String(
      entry.id ||
      entry.telegramId ||
      entry.telegramid ||
      entry.userId ||
      ""
    );

    username = String(
      entry.username ||
      entry.userName ||
      ""
    );

    firstName = String(
      entry.first_name ||
      entry.firstName ||
      entry.name ||
      ""
    );

    lastName = String(
      entry.last_name ||
      entry.lastName ||
      ""
    );
  }

  if (!userId || usedIds[userId]) {
    continue;
  }

  usedIds[userId] = true;

  var fullName = (firstName + " " + lastName).trim();

  var idMatch = userId.toLowerCase().indexOf(searchLower) !== -1;
  var usernameMatch = username.toLowerCase().indexOf(searchLower) !== -1;
  var nameMatch = fullName.toLowerCase().indexOf(searchLower) !== -1;

  if (idMatch || usernameMatch || nameMatch) {
    results.push({
      id: userId,
      username: username,
      name: fullName
    });
  }

  if (results.length >= 10) {
    break;
  }
}


// =====================================================
// ❌ NO RESULT
// =====================================================

if (results.length === 0) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>User nahi mila</b>\n\n" +
      "Search: <code>" +
      safeText(searchText) +
      "</code>",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🔎 Search Again",
            callback_data: "ADMIN_SEARCH_USER"
          }
        ],
        [
          {
            text: "👥 Users",
            callback_data: "ADMIN_USERS"
          }
        ]
      ]
    }
  });

  return;
}


// =====================================================
// 🧾 RESULT BUTTONS
// =====================================================

var keyboard = [];

for (var k = 0; k < results.length; k++) {
  var result = results[k];

  var label = result.name || "User";

  if (result.username) {
    label += " @" + result.username.replace(/^@/, "");
  }

  label += " — " + result.id;

  if (label.length > 60) {
    label = label.substring(0, 57) + "...";
  }

  keyboard.push([
    {
      text: "👤 " + label,
      callback_data: "ADMIN_USER " + result.id
    }
  ]);
}

keyboard.push([
  {
    text: "🔎 Search Again",
    callback_data: "ADMIN_SEARCH_USER"
  }
]);

keyboard.push([
  {
    text: "👥 Users",
    callback_data: "ADMIN_USERS"
  }
]);

Api.sendMessage({
  chat_id: uid,
  text:
    "🔎 <b>SEARCH RESULTS</b>\n\n" +
    "Search: <code>" +
    safeText(searchText) +
    "</code>\n" +
    "Found: <b>" +
    results.length +
    "</b> user(s)\n\n" +
    "User select karo:",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: keyboard
  }
});


// =====================================================
// 🛡️ HTML SAFE TEXT
// =====================================================

function safeText(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
