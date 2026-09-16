/*CMD
  command: ADMIN_FILTER_ORDERS
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
  command: ADMIN_FILTER_ORDERS
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// ADMIN FILTER ORDERS MENU
// =====================================================


// =====================================================
// 👤 CURRENT ADMIN
// =====================================================

var uid = String(user.telegramid);


// =====================================================
// 👑 ADMIN CHECK
// =====================================================

var OWNER_ID = "7897324623";
var adminIds = [OWNER_ID];

var configuredOwner =
  Bot.getProperty("OWNER_ID", "");

var configuredAdmins =
  Bot.getProperty("EARNSTAR_ADMINS", []);

if (!Array.isArray(configuredAdmins)) {
  configuredAdmins = [configuredAdmins];
}

function extractAdminId(item) {
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

var ownerFromProperty =
  extractAdminId(configuredOwner);

if (
  ownerFromProperty &&
  adminIds.indexOf(ownerFromProperty) === -1
) {
  adminIds.push(ownerFromProperty);
}

for (var i = 0; i < configuredAdmins.length; i++) {
  var currentAdminId =
    extractAdminId(configuredAdmins[i]);

  if (
    currentAdminId &&
    adminIds.indexOf(currentAdminId) === -1
  ) {
    adminIds.push(currentAdminId);
  }
}

if (adminIds.indexOf(uid) === -1) {
  return;
}


// =====================================================
// 📊 FILTER MENU
// =====================================================

Api.sendMessage({
  chat_id: uid,

  text:
    "📊 <b>ORDER FILTER</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Select an order status to view:",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🟡 Pending",
          callback_data: "ADMIN_FILTER_STATUS pending"
        }
      ],
      [
        {
          text: "🔵 Active",
          callback_data: "ADMIN_FILTER_STATUS active"
        }
      ],
      [
        {
          text: "🟢 Completed",
          callback_data: "ADMIN_FILTER_STATUS completed"
        }
      ],
      [
        {
          text: "🔴 Cancelled",
          callback_data: "ADMIN_FILTER_STATUS cancelled"
        }
      ],
      [
        {
          text: "🟠 Remaining Payment",
          callback_data: "ADMIN_FILTER_STATUS remaining_payment"
        }
      ],
      [
        {
          text: "📦 Ready for Delivery",
          callback_data: "ADMIN_FILTER_STATUS ready_for_delivery"
        }
      ],
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
});
