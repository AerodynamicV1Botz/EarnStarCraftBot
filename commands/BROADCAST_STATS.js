/*CMD
  command: BROADCAST_STATS
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
  command: BROADCAST_STATS
  need_reply: false
  folder: ADMIN / BROADCAST
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// BROADCAST_STATS
// ADMIN → LAST BROADCAST STATISTICS
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
// 📊 GET LAST BROADCAST STATS
// =====================================================

var stats = Bot.getProperty(
  "LAST_BROADCAST_STATS"
);


// =====================================================
// 📭 NO BROADCAST YET
// =====================================================

if (
  !stats ||
  typeof stats !== "object"
) {
  if (request && request.id) {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "No broadcast statistics yet"
    });
  }

  Api.sendMessage({
    chat_id: uid,

    text:
      "📊 <b>BROADCAST STATISTICS</b>\n\n" +
      "━━━━━━━━━━━━━━━━━━\n\n" +
      "📭 No broadcast has been sent yet.\n\n" +
      "Create your first broadcast from the Broadcast Center.",

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
// 📊 NORMALIZE VALUES
// =====================================================

var total = Number(stats.total) || 0;
var sent = Number(stats.sent) || 0;
var failed = Number(stats.failed) || 0;
var skipped = Number(stats.skipped) || 0;

var time = String(
  stats.time || "Not available"
);


// =====================================================
// 📈 SUCCESS RATE
// =====================================================

var successRate = 0;

if (total > 0) {
  successRate = Math.round(
    (sent / total) * 100
  );
}


// =====================================================
// 📊 DISPLAY STATISTICS
// =====================================================

Api.sendMessage({
  chat_id: uid,

  text:
    "📊 <b>BROADCAST STATISTICS</b>\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "👥 <b>Total Users:</b> " +
    total + "\n\n" +

    "📨 <b>Successfully Sent:</b> " +
    sent + "\n\n" +

    "🚫 <b>Blocked/Skipped:</b> " +
    skipped + "\n\n" +

    "⚠️ <b>Failed:</b> " +
    failed + "\n\n" +

    "📈 <b>Success Rate:</b> " +
    successRate + "%\n\n" +

    "🕐 <b>Last Broadcast:</b>\n" +
    time +

    "\n\n━━━━━━━━━━━━━━━━━━",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🔄 Refresh",
          callback_data: "BROADCAST_STATS"
        }
      ],
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
        },
        {
          text: "👑 Admin Panel",
          callback_data: "ADMIN_PANEL"
        }
      ]
    ]
  }
});
