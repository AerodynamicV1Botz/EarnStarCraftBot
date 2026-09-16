/*CMD
  command: ADMIN_CLEANUP_ALL_ENQUIRIES_CONFIRM
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
  command: ADMIN_CLEANUP_ALL_ENQUIRIES_CONFIRM
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// ADMIN CLEANUP ALL ENQUIRIES CONFIRM
// ADMIN → DELETE ALL BUILD ENQUIRIES
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
    for (var i = 0; i < admins.length; i++) {
      var item = admins[i];
      var adminId = "";

      if (typeof item === "object" && item !== null) {
        adminId =
          item.id ||
          item.telegramId ||
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

for (var j = 0; j < adminIds.length; j++) {
  if (adminIds[j] === uid) {
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
// 🧹 DELETE ALL BUILD ENQUIRIES
// =====================================================

var keys = Bot.getProperty("BUILD_ENQUIRY_KEYS", []);

if (!Array.isArray(keys)) {
  keys = [];
}

var deletedCount = 0;
var mappingCount = 0;

for (var k = 0; k < keys.length; k++) {
  var enquiryId = String(keys[k] || "").trim();

  if (!enquiryId) {
    continue;
  }

  var enquiryKey = "BUILD_ENQUIRY_" + enquiryId;
  var mappingKey = "BUILD_ENQUIRY_USER_" + enquiryId;

  var enquiry = Bot.getProperty(enquiryKey);

  if (enquiry && typeof enquiry === "object") {
    deletedCount++;
  }

  Bot.setProperty(enquiryKey, "", "string");
  Bot.setProperty(mappingKey, "", "string");

  mappingCount++;
}


// =====================================================
// 🧹 CLEAR ENQUIRY KEY LIST
// =====================================================

Bot.setProperty("BUILD_ENQUIRY_KEYS", [], "json");


// =====================================================
// 🧹 CLEAR CURRENT ADMIN SEARCH STATE
// =====================================================

Bot.setProperty("ADMIN_ENQUIRY_SEARCH_" + uid, "", "string");


// =====================================================
// ✅ SUCCESS MESSAGE
// =====================================================

var text =
  "✅ <b>All Build Enquiries Cleaned</b>\n\n" +
  "🗑️ Deleted enquiries: <b>" + deletedCount + "</b>\n" +
  "🔗 Removed mappings: <b>" + mappingCount + "</b>\n\n" +
  "Direct orders aur final orders safe hain.";

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📋 Enquiries",
          callback_data: "ADMIN_ENQUIRIES"
        },
        {
          text: "⬅️ Admin Panel",
          callback_data: "ADMIN_PANEL"
        }
      ]
    ]
  }
});
