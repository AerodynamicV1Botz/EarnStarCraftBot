/*CMD
  command: ADMIN_CLEANUP_ALL_ENQUIRIES
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
  command: ADMIN_CLEANUP_ALL_ENQUIRIES
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// ADMIN CLEANUP ALL ENQUIRIES
// ADMIN → CONFIRMATION PAGE
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
// 📊 COUNT ENQUIRIES
// =====================================================

var keys = Bot.getProperty("BUILD_ENQUIRY_KEYS", []);

if (!Array.isArray(keys)) {
  keys = [];
}

var validCount = 0;

for (var k = 0; k < keys.length; k++) {
  var enquiryId = String(keys[k] || "").trim();

  if (!enquiryId) {
    continue;
  }

  var enquiry = Bot.getProperty("BUILD_ENQUIRY_" + enquiryId);

  if (enquiry && typeof enquiry === "object") {
    validCount++;
  }
}


// =====================================================
// ⚠️ CONFIRMATION MESSAGE
// =====================================================

var text =
  "⚠️ <b>Cleanup All Enquiries</b>\n\n" +
  "Aap total <b>" + validCount + "</b> build enquiries delete karne wale ho.\n\n" +
  "Is action ke baad:\n" +
  "• Build enquiry records remove honge\n" +
  "• Enquiry user mappings remove honge\n" +
  "• Enquiry keys reset hongi\n" +
  "• Direct orders safe rahenge\n" +
  "• Final client orders safe rahenge\n\n" +
  "⚠️ <b>Ye action undo nahi ho sakta.</b>\n\n" +
  "Kya aap continue karna chahte ho?";

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🗑️ YES, DELETE ALL",
          callback_data: "ADMIN_CLEANUP_ALL_ENQUIRIES_CONFIRM"
        }
      ],
      [
        {
          text: "❌ Cancel",
          callback_data: "ADMIN_ENQUIRIES"
        }
      ]
    ]
  }
});
