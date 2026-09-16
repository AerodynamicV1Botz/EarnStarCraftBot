/*CMD
  command: ADMIN_SEARCH_ENQUIRY
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
  command: ADMIN_SEARCH_ENQUIRY
  need_reply: true
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// ADMIN SEARCH ENQUIRY
// ADMIN → SEARCH BUILD ENQUIRY
// =====================================================


// =====================================================
// 🔐 ADMIN AUTHENTICATION
// =====================================================

var uid = String(user.telegramid);

function getAdminIds() {
  var ids = ["7897324623"];

  try {
    var ownerId = Bot.getProperty("OWNER_ID");
    if (ownerId) {
      ids.push(String(ownerId));
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
          ids.push(String(adminId));
        }
      }
    }
  } catch (e) {}

  var unique = [];

  for (var j = 0; j < ids.length; j++) {
    if (unique.indexOf(ids[j]) === -1) {
      unique.push(ids[j]);
    }
  }

  return unique;
}

if (getAdminIds().indexOf(uid) === -1) {
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
// 📝 SEARCH INPUT
// =====================================================

var message =
  "🔎 <b>Search Enquiry</b>\n\n" +
  "Enquiry ID, client name, username, Telegram ID ya phone number enter karein.\n\n" +
  "Example:\n" +
  "<code>ES-ABC123</code>\n" +
  "<code>Veer</code>\n" +
  "<code>7897324623</code>";

Bot.sendMessage(message, {
  parse_mode: "HTML",
  reply_markup: {
    force_reply: true
  }
});

Bot.runCommand("ADMIN_SEARCH_ENQUIRY_SAVE");
