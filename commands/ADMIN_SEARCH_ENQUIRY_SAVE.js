/*CMD
  command: ADMIN_SEARCH_ENQUIRY_SAVE
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
  command: ADMIN_SEARCH_ENQUIRY_SAVE
  need_reply: true
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT — ADMIN_SEARCH_ENQUIRY_SAVE
// ADMIN → SEARCH ENQUIRY RESULT
// Supports enquiry ID, Telegram ID, username, name,
// phone number, contacts and enquiry details.
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

        if (item && typeof item === "object") {
          adminId = String(
            item.id ||
            item.telegramId ||
            item.telegramid ||
            item.userId ||
            ""
          );
        } else {
          adminId = String(item || "");
        }

        if (adminId) {
          ids.push(adminId);
        }
      }
    }
  } catch (e) {}

  var uniqueIds = [];

  for (var j = 0; j < ids.length; j++) {
    var id = String(ids[j] || "").trim();

    if (id && uniqueIds.indexOf(id) === -1) {
      uniqueIds.push(id);
    }
  }

  return uniqueIds;
}

if (getAdminIds().indexOf(uid) === -1) {
  Bot.sendMessage("⛔ <b>Access Denied</b>", {
    parse_mode: "HTML"
  });

  return;
}


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


// =====================================================
// 🔎 SEARCH VALUE
// =====================================================

var searchValue = String(message || "").trim();

if (!searchValue) {
  Bot.sendMessage(
    "⚠️ <b>Search value empty hai.</b>\n\n" +
    "Enquiry ID, Telegram ID, username, name ya contact number bhejo.",
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🔎 Search Again",
              callback_data: "ADMIN_SEARCH_ENQUIRY"
            }
          ],
          [
            {
              text: "⬅️ Admin Panel",
              callback_data: "ADMIN_PANEL"
            }
          ]
        ]
      }
    }
  );

  return;
}

var searchLower = searchValue.toLowerCase();


// =====================================================
// 📦 LOAD ENQUIRY KEYS
// =====================================================

var enquiryKeys = Bot.getProperty("BUILD_ENQUIRY_KEYS", []);

if (!Array.isArray(enquiryKeys)) {
  enquiryKeys = [];
}

var results = [];
var usedEnquiryIds = {};


// =====================================================
// 🔍 SEARCH ALL ENQUIRIES
// =====================================================

for (var i = 0; i < enquiryKeys.length; i++) {
  var enquiryId = String(enquiryKeys[i] || "").trim();

  if (!enquiryId) {
    continue;
  }

  if (usedEnquiryIds[enquiryId]) {
    continue;
  }

  usedEnquiryIds[enquiryId] = true;

  var enquiry = Bot.getProperty("BUILD_ENQUIRY_" + enquiryId);

  if (!enquiry || typeof enquiry !== "object") {
    continue;
  }

  // -----------------------------------------------
  // CONTACTS
  // -----------------------------------------------

  var contacts = enquiry.contacts || {};

  if (typeof contacts !== "object") {
    contacts = {};
  }

  // -----------------------------------------------
  // REQUIREMENTS
  // -----------------------------------------------

  var requirements = enquiry.requirements || "";

  if (typeof requirements === "object") {
    requirements = [
      requirements.description,
      requirements.fullMessage,
      requirements.text,
      requirements.message,
      requirements.adminFinalRequirements,
      requirements.finalRequirements
    ].join(" ");
  }

  var finalRequirements =
    enquiry.adminFinalRequirements ||
    enquiry.finalRequirements ||
    "";

  // -----------------------------------------------
  // SEARCHABLE DATA
  // -----------------------------------------------

  var searchableText = [
    // Enquiry identifiers
    enquiryId,
    enquiry.enquiryId,
    enquiry.refId,
    enquiry.referenceId,

    // User identifiers
    enquiry.userId,
    enquiry.telegramId,
    enquiry.clientId,

    // User details
    enquiry.userName,
    enquiry.name,
    enquiry.clientName,
    enquiry.firstName,
    enquiry.lastName,
    enquiry.username,
    enquiry.telegramUsername,

    // Direct contacts
    enquiry.phone,
    enquiry.phoneNumber,
    enquiry.contact,
    enquiry.otherNumber,
    enquiry.telegram,
    enquiry.whatsapp,
    enquiry.instagram,
    enquiry.email,

    // Nested contacts
    contacts.telegram,
    contacts.telegramUsername,
    contacts.telegramId,
    contacts.phone,
    contacts.phoneNumber,
    contacts.otherNumber,
    contacts.contact,
    contacts.whatsapp,
    contacts.instagram,
    contacts.email,

    // Service details
    enquiry.service,
    enquiry.serviceName,
    enquiry.enquiryType,
    enquiry.packageType,
    enquiry.package,
    enquiry.budget,
    enquiry.status,
    enquiry.requestStatus,
    enquiry.stage,
    enquiry.orderStatus,
    enquiry.paymentStatus,

    // Requirements
    requirements,
    finalRequirements
  ].join(" ").toLowerCase();

  if (searchableText.indexOf(searchLower) !== -1) {
    results.push({
      id: enquiryId,
      data: enquiry
    });
  }
}


// =====================================================
// ❌ NO RESULT
// =====================================================

if (results.length === 0) {
  Bot.sendMessage(
    "❌ <b>No Enquiry Found</b>\n\n" +
    "Search value: <code>" +
    safeText(searchValue) +
    "</code>\n\n" +
    "Try:\n" +
    "• Enquiry ID\n" +
    "• Client name\n" +
    "• Username\n" +
    "• Telegram ID\n" +
    "• Contact number",
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🔎 Search Again",
              callback_data: "ADMIN_SEARCH_ENQUIRY"
            }
          ],
          [
            {
              text: "📋 All Enquiries",
              callback_data: "ADMIN_ENQUIRIES"
            }
          ],
          [
            {
              text: "⬅️ Admin Panel",
              callback_data: "ADMIN_PANEL"
            }
          ]
        ]
      }
    }
  );

  return;
}


// =====================================================
// 📋 SEARCH RESULT MESSAGE
// =====================================================

var resultText =
  "🔎 <b>SEARCH RESULTS</b>\n\n" +
  "Search: <code>" +
  safeText(searchValue) +
  "</code>\n" +
  "Found: <b>" +
  results.length +
  "</b> enquiry/enquiries\n\n";

var buttons = [];


// =====================================================
// 🧾 BUILD RESULT BUTTONS
// =====================================================

for (var r = 0; r < results.length && r < 20; r++) {
  var result = results[r];
  var enquiry = result.data;

  var clientName =
    enquiry.clientName ||
    enquiry.clientNameText ||
    enquiry.name ||
    enquiry.userName ||
    "Unknown Client";

  var username =
    enquiry.username ||
    enquiry.telegramUsername ||
    "";

  var status =
    enquiry.status ||
    enquiry.requestStatus ||
    enquiry.stage ||
    "pending";

  var statusLower = String(status).toLowerCase();
  var statusIcon = "🟡";

  if (
    statusLower === "accepted" ||
    statusLower === "approved" ||
    statusLower === "completed" ||
    statusLower === "in_progress" ||
    statusLower === "in progress"
  ) {
    statusIcon = "🟢";
  }

  if (
    statusLower === "rejected" ||
    statusLower === "cancelled" ||
    statusLower === "canceled"
  ) {
    statusIcon = "🔴";
  }

  resultText +=
    statusIcon +
    " <b>" +
    safeText(clientName) +
    "</b>\n" +
    "🆔 <code>" +
    safeText(result.id) +
    "</code>\n" +
    (username
      ? "👤 @" + safeText(String(username).replace(/^@/, "")) + "\n"
      : "") +
    "📌 " +
    safeText(status) +
    "\n\n";

  var buttonName = clientName;

  if (buttonName.length > 35) {
    buttonName = buttonName.substring(0, 32) + "...";
  }

  buttons.push([
    {
      text: "📄 " + buttonName,
      callback_data: "ADMIN_ENQUIRY " + result.id
    }
  ]);
}


// =====================================================
// 🔘 NAVIGATION BUTTONS
// =====================================================

buttons.push([
  {
    text: "🔎 Search Again",
    callback_data: "ADMIN_SEARCH_ENQUIRY"
  },
  {
    text: "📋 All Enquiries",
    callback_data: "ADMIN_ENQUIRIES"
  }
]);

buttons.push([
  {
    text: "⬅️ Admin Panel",
    callback_data: "ADMIN_PANEL"
  }
]);


// =====================================================
// 📤 SEND RESULTS
// =====================================================

Bot.sendMessage(resultText, {
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
});
