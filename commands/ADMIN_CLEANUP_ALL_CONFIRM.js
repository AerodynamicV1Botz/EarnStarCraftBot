/*CMD
  command: ADMIN_CLEANUP_ALL_CONFIRM
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
  command: ADMIN_CLEANUP_ALL_CONFIRM
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 33 — ADMIN_CLEANUP_ALL_CONFIRM
// ADMIN → PERMANENTLY DELETE ALL FINAL ORDERS
// =====================================================

function safeText(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

var uid = String(user.telegramid);
var OWNER_ID = "7897324623";
var adminIds = [OWNER_ID];

var configuredOwner = Bot.getProperty("OWNER_ID", "");
var configuredAdmins = Bot.getProperty("EARNSTAR_ADMINS", []);

if (!Array.isArray(configuredAdmins)) {
  configuredAdmins = [configuredAdmins];
}

function extractId(item) {
  if (item && typeof item === "object") {
    return String(
      item.id ||
      item.telegramId ||
      item.userId ||
      ""
    ).trim();
  }

  return String(item || "").trim();
}

var ownerFromProperty = extractId(configuredOwner);

if (
  ownerFromProperty &&
  adminIds.indexOf(ownerFromProperty) === -1
) {
  adminIds.push(ownerFromProperty);
}

for (var i = 0; i < configuredAdmins.length; i++) {
  var adminId = extractId(configuredAdmins[i]);

  if (
    adminId &&
    adminIds.indexOf(adminId) === -1
  ) {
    adminIds.push(adminId);
  }
}

if (adminIds.indexOf(uid) === -1) {
  return;
}

var waitingKey =
  "ADMIN_CLEANUP_ALL_WAITING_" + uid;

var waiting =
  Bot.getProperty(waitingKey);

if (
  !waiting ||
  !Array.isArray(waiting.orderIds)
) {
  Bot.sendMessage(
    "❌ Cleanup session expired. Please open All Orders again.",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "📋 All Orders",
              callback_data: "ADMIN_ORDERS"
            }
          ]
        ]
      }
    }
  );

  return;
}

var orderIds = waiting.orderIds;
var deletedCount = 0;
var failedCount = 0;

for (var j = 0; j < orderIds.length; j++) {
  var orderId = String(orderIds[j] || "").trim();

  if (!orderId) {
    continue;
  }

  try {
    var order =
      Bot.getProperty("ORDER_" + orderId);

    var clientId = "";

    if (order && typeof order === "object") {
      clientId =
        String(
          order.userId ||
          order.telegramId ||
          order.clientId ||
          (
            order.telegramProfile &&
            (
              order.telegramProfile.telegramId ||
              order.telegramProfile.userId
            )
          ) ||
          ""
        );
    }

    Bot.setProperty(
      "ADMIN_CLEANUP_LOG_" + orderId,
      {
        orderId: orderId,
        clientId: clientId,
        cleanedBy: uid,
        cleanedAt: new Date().toISOString(),
        action: "PERMANENT_ALL_ORDER_CLEANUP"
      },
      "json"
    );

    Bot.setProperty(
      "ORDER_" + orderId,
      "",
      "json"
    );

    Bot.setProperty(
      "ORDER_USER_" + orderId,
      "",
      "string"
    );

    Bot.setProperty(
      "ORDER_HISTORY_" + orderId,
      "",
      "json"
    );

    if (clientId) {
      Bot.setProperty(
        "ORDER_PAYMENT_PROOF_WAITING_" + clientId,
        "",
        "string"
      );

      Bot.setProperty(
        "REMAINING_PAYMENT_PROOF_WAITING_" + clientId,
        "",
        "string"
      );

      Bot.setProperty(
        "ORDER_CONTACT_ADMIN_WAITING_" + clientId,
        "",
        "string"
      );
    }

    for (var a = 0; a < adminIds.length; a++) {
      var activeKey =
        "ADMIN_ACTIVE_ORDER_" + adminIds[a];

      var activeOrder =
        Bot.getProperty(activeKey, "");

      if (String(activeOrder) === orderId) {
        Bot.setProperty(
          activeKey,
          "",
          "string"
        );
      }
    }

    deletedCount++;

  } catch (error) {
    failedCount++;

    Bot.setProperty(
      "ADMIN_CLEANUP_ERROR_" + orderId,
      {
        orderId: orderId,
        error: String(error),
        adminId: uid,
        createdAt: new Date().toISOString()
      },
      "json"
    );
  }
}


// =====================================================
// 🧹 CLEAN ORDER_KEYS
// =====================================================

Bot.setProperty(
  "ORDER_KEYS",
  [],
  "json"
);


// =====================================================
// 🧹 CLEAR WAITING SESSION
// =====================================================

Bot.setProperty(
  waitingKey,
  "",
  "json"
);


// =====================================================
// ✅ RESULT
// =====================================================

Bot.sendMessage(
  "✅ <b>All Orders Cleanup Completed</b>\n\n" +
  "🗑️ Deleted: <b>" + deletedCount + "</b>\n" +
  "⚠️ Failed: <b>" + failedCount + "</b>\n\n" +
  "All final order records, history, mappings and order references have been removed.\n\n" +
  "📝 Minimal cleanup logs are preserved.",
  {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📋 All Orders",
            callback_data: "ADMIN_ORDERS"
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
  }
);
