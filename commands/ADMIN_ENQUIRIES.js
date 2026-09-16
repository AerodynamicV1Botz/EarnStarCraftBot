/*CMD
  command: ADMIN_ENQUIRIES
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
  command: ADMIN_ENQUIRIES
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT — ADMIN_ENQUIRIES
// ADMIN → BUILD ENQUIRIES DASHBOARD
//
// FEATURES:
// - Shows final Build Enquiries
// - Shows latest 10 enquiries
// - Opens enquiry details
// - Search Enquiry button
// - Cleanup Enquiries button
// - Refresh button
// - Admin Panel button
//
// DATA:
// BUILD_ENQUIRY_KEYS
// BUILD_ENQUIRY_<enquiryId>
// BUILD_ENQUIRY_USER_<enquiryId>
// =====================================================


// =====================================================
// 👤 CURRENT ADMIN
// =====================================================

var uid = String(user.telegramid);


// =====================================================
// 🔐 SAFE HTML TEXT
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
// 👑 ADMIN AUTHENTICATION
// =====================================================

var OWNER_ID = "7897324623";
var adminIds = [OWNER_ID];

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

try {
  var configuredOwner = Bot.getProperty("OWNER_ID", "");
  var ownerId = extractAdminId(configuredOwner);

  if (
    ownerId &&
    adminIds.indexOf(ownerId) === -1
  ) {
    adminIds.push(ownerId);
  }
} catch (e) {}

try {
  var configuredAdmins =
    Bot.getProperty("EARNSTAR_ADMINS", []);

  if (!Array.isArray(configuredAdmins)) {
    configuredAdmins = [configuredAdmins];
  }

  for (var a = 0; a < configuredAdmins.length; a++) {
    var configuredAdminId =
      extractAdminId(configuredAdmins[a]);

    if (
      configuredAdminId &&
      adminIds.indexOf(configuredAdminId) === -1
    ) {
      adminIds.push(configuredAdminId);
    }
  }
} catch (e) {}

if (adminIds.indexOf(uid) === -1) {
  return;
}


// =====================================================
// ⚡ CALLBACK ANSWER
// =====================================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  try {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "Loading enquiries...",
      show_alert: false
    });
  } catch (e) {}
}


// =====================================================
// 📋 LOAD ENQUIRY KEYS
// =====================================================

var storedKeys =
  Bot.getProperty("BUILD_ENQUIRY_KEYS", []);

if (!Array.isArray(storedKeys)) {
  storedKeys = [];
}


// =====================================================
// 🧹 VALIDATE ENQUIRIES
// =====================================================

var validEnquiries = [];
var seenRefIds = {};

for (var i = storedKeys.length - 1; i >= 0; i--) {
  var rawRefId = storedKeys[i];

  if (
    rawRefId === null ||
    rawRefId === undefined
  ) {
    continue;
  }

  var refId = String(rawRefId).trim();

  if (!refId || seenRefIds[refId]) {
    continue;
  }

  seenRefIds[refId] = true;

  var enquiry =
    Bot.getProperty("BUILD_ENQUIRY_" + refId);

  if (
    !enquiry ||
    typeof enquiry !== "object"
  ) {
    continue;
  }

  validEnquiries.push({
    id: refId,
    data: enquiry
  });
}


// =====================================================
// 📭 EMPTY STATE
// =====================================================

if (validEnquiries.length === 0) {
  Api.sendMessage({
    chat_id: uid,

    text:
      "📋 <b>BUILD ENQUIRIES</b>\n\n" +
      "No enquiries found yet.\n\n" +
      "New Build Enquiries will appear here automatically.",

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🔎 Search Enquiry",
            callback_data: "ADMIN_SEARCH_ENQUIRY"
          }
        ],
        [
          {
            text: "🧹 Clean All Enquiries",
            callback_data: "ADMIN_CLEANUP_ALL_ENQUIRIES"
          }
        ],
        [
          {
            text: "🔄 Refresh",
            callback_data: "ADMIN_ENQUIRIES"
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
// 📋 BUILD DASHBOARD MESSAGE
// =====================================================

var text =
  "📋 <b>RECENT BUILD ENQUIRIES</b>\n\n" +
  "📦 Total Enquiries: <b>" +
  validEnquiries.length +
  "</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n";

var buttons = [];
var count = 0;


// =====================================================
// 🔄 SHOW LATEST 10 ENQUIRIES
// =====================================================

for (
  var j = 0;
  j < validEnquiries.length && count < 10;
  j++
) {
  var item = validEnquiries[j];

  var currentRefId = String(item.id);
  var enquiry = item.data;

  var status = String(
    enquiry.status ||
    enquiry.requestStatus ||
    enquiry.stage ||
    "new"
  ).trim().toLowerCase();

  var statusIcon = "🟡";

  if (
    status === "accepted" ||
    status === "approved" ||
    status === "quote_agreed" ||
    status === "order_created"
  ) {
    statusIcon = "🟢";
  }

  if (
    status === "closed" ||
    status === "rejected" ||
    status === "cancelled"
  ) {
    statusIcon = "🔴";
  }

  if (
    status === "submitted" ||
    status === "admin_review" ||
    status === "review" ||
    status === "pending"
  ) {
    statusIcon = "🟠";
  }

  var clientName =
    enquiry.clientName ||
    enquiry.userName ||
    enquiry.fullName ||
    enquiry.name ||
    "User";

  var enquiryType =
    enquiry.enquiryType ||
    enquiry.packageType ||
    enquiry.service ||
    "Custom Build";

  text +=
    statusIcon +
    " <b>" +
    safeText(clientName) +
    "</b>\n" +

    "🆔 <code>" +
    safeText(currentRefId) +
    "</code>\n" +

    "🤖 " +
    safeText(enquiryType) +
    "\n" +

    "📊 <b>" +
    safeText(
      status.replace(/_/g, " ").toUpperCase()
    ) +
    "</b>\n\n";

  buttons.push([
    {
      text: "👁 View " + currentRefId,
      callback_data: "ADMIN_ENQUIRY " + currentRefId
    }
  ]);

  count++;
}


// =====================================================
// 🔘 BOTTOM BUTTONS
// =====================================================

buttons.push([
  {
    text: "🔎 Search Enquiry",
    callback_data: "ADMIN_SEARCH_ENQUIRY"
  }
]);

buttons.push([
  {
    text: "🧹 Clean All Enquiries",
    callback_data: "ADMIN_CLEANUP_ALL_ENQUIRIES"
  }
]);

buttons.push([
  {
    text: "🔄 Refresh",
    callback_data: "ADMIN_ENQUIRIES"
  },
  {
    text: "👑 Admin Panel",
    callback_data: "ADMIN_PANEL"
  }
]);


// =====================================================
// 📤 SEND DASHBOARD
// =====================================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
});
