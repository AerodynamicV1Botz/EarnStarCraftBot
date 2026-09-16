/*CMD
  command: BROADCAST_SEND
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
  command: BROADCAST_SEND
  need_reply: false
  folder: ADMIN / BROADCAST
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// BROADCAST_SEND
// ADMIN → SEND PENDING BROADCAST
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
// 📢 GET PENDING BROADCAST
// =====================================================

var pending = Bot.getProperty(
  "PENDING_BROADCAST_" + uid
);

if (
  pending === null ||
  pending === undefined ||
  String(pending).trim() === ""
) {
  if (request && request.id) {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "⚠️ No pending broadcast"
    });
  }

  Api.sendMessage({
    chat_id: uid,

    text:
      "⚠️ <b>NO PENDING BROADCAST</b>\n\n" +
      "There is no message waiting to be sent.\n\n" +
      "Create a new broadcast from the Broadcast Center.",

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

  return;
}


// =====================================================
// 👥 GET AND NORMALIZE USERS
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
// ⚠️ NO VALID RECIPIENTS
// =====================================================

if (users.length === 0) {
  if (request && request.id) {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "⚠️ No users found"
    });
  }

  Api.sendMessage({
    chat_id: uid,

    text:
      "⚠️ <b>NO RECIPIENTS</b>\n\n" +
      "There are currently no valid saved users for broadcast.",

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: [
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

  return;
}


// =====================================================
// 📊 COUNTERS
// =====================================================

var sent = 0;
var failed = 0;
var skipped = 0;


// =====================================================
// 📤 SEND BROADCAST
// =====================================================

for (var u = 0; u < users.length; u++) {
  var targetId = users[u];

  var userData = Bot.getProperty(
    "USER_" + targetId
  );

  // 🚫 Skip blocked users
  if (
    userData &&
    userData.blocked === true
  ) {
    skipped++;
    continue;
  }

  try {
    Api.sendMessage({
      chat_id: targetId,
      text: String(pending)
    });

    sent++;

  } catch (error) {
    failed++;
  }
}


// =====================================================
// 💾 SAVE LAST BROADCAST STATS
// =====================================================

Bot.setProperty(
  "LAST_BROADCAST_STATS",
  {
    total: users.length,
    sent: sent,
    failed: failed,
    skipped: skipped,
    time: new Date().toISOString(),
    adminId: uid
  },
  "json"
);


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
    text: "Broadcast completed"
  });
}


// =====================================================
// ✅ SEND RESULT TO ADMIN
// =====================================================

Api.sendMessage({
  chat_id: uid,

  text:
    "✅ <b>BROADCAST COMPLETED</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "👥 Total Users: <b>" +
    users.length +
    "</b>\n" +

    "📨 Sent: <b>" +
    sent +
    "</b>\n" +

    "🚫 Skipped: <b>" +
    skipped +
    "</b>\n" +

    "⚠️ Failed: <b>" +
    failed +
    "</b>\n\n" +

    "━━━━━━━━━━━━━━━━━━",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📊 Broadcast Stats",
          callback_data: "BROADCAST_STATS"
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
