/*CMD
  command: ADMIN_USER_ENQUIRIES
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
  command: ADMIN_USER_ENQUIRIES
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// ADMIN_USER_ENQUIRIES
// ADMIN → VIEW ALL ENQUIRIES OF ONE USER
// =====================================================


// =====================================================
// 👤 CURRENT ADMIN ID
// =====================================================

var uid = String(user.telegramid);


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
// 👑 ADMIN AUTHENTICATION
// =====================================================

var ownerId = "7897324623";
var isAdmin = uid === ownerId;


// Optional configured owner
var configuredOwner = Bot.getProperty("OWNER_ID");

if (
  !isAdmin &&
  configuredOwner &&
  String(configuredOwner) === uid
) {
  isAdmin = true;
}


// Multi-admin support
var adminList = Bot.getProperty("EARNSTAR_ADMINS") || [];

if (!Array.isArray(adminList)) {
  adminList = [];
}

for (var a = 0; a < adminList.length; a++) {

  var adminItem = adminList[a];
  var adminId = "";

  if (
    typeof adminItem === "object" &&
    adminItem !== null
  ) {
    adminId =
      adminItem.id ||
      adminItem.telegramId ||
      adminItem.telegramid ||
      adminItem.userId ||
      "";
  } else {
    adminId = adminItem;
  }

  if (String(adminId) === uid) {
    isAdmin = true;
    break;
  }
}

if (!isAdmin) {
  return;
}


// =====================================================
// 🆔 TARGET USER ID
// =====================================================

var targetId = String(params || "").trim();

if (!targetId) {

  Api.sendMessage({
    chat_id: uid,
    text: "⚠️ <b>User ID not found.</b>",
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 👤 CHECK USER
// =====================================================

var targetUser = Bot.getProperty(
  "USER_" + targetId
);

if (!targetUser) {

  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>User not found.</b>\n\n" +
      "🆔 <code>" + safeText(targetId) + "</code>",
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 📋 GET BUILD ENQUIRY KEYS
// =====================================================

var enquiryKeys =
  Bot.getProperty("BUILD_ENQUIRY_KEYS") || [];

if (!Array.isArray(enquiryKeys)) {
  enquiryKeys = [];
}


// =====================================================
// 📝 HEADER
// =====================================================

var displayName =
  targetUser.name ||
  targetUser.firstName ||
  targetUser.first_name ||
  targetUser.username ||
  "Telegram User";

var text =
  "📋 <b>USER ENQUIRIES</b>\n\n" +

  "👤 <b>User:</b> " +
  safeText(displayName) + "\n" +

  "🆔 <b>User ID:</b> " +
  "<code>" + safeText(targetId) + "</code>\n\n" +

  "━━━━━━━━━━━━━━━━━━\n\n";

var buttons = [];
var count = 0;
var countedIds = {};


// =====================================================
// 🔎 FILTER USER ENQUIRIES
// =====================================================

for (
  var i = enquiryKeys.length - 1;
  i >= 0;
  i--
) {

  var enquiryId =
    String(enquiryKeys[i] || "").trim();

  // Skip empty / duplicate IDs
  if (
    !enquiryId ||
    countedIds[enquiryId]
  ) {
    continue;
  }

  countedIds[enquiryId] = true;


  // -----------------------------------------------
  // GET BUILD ENQUIRY
  // -----------------------------------------------

  var enquiry = Bot.getProperty(
    "BUILD_ENQUIRY_" + enquiryId
  );

  if (!enquiry) {
    continue;
  }


  // -----------------------------------------------
  // MATCH USER
  // -----------------------------------------------

  var enquiryUserId =
    enquiry.userId ||
    enquiry.telegramId ||
    enquiry.telegramid ||
    "";

  if (
    String(enquiryUserId) !== targetId
  ) {
    continue;
  }


  count++;


  // -----------------------------------------------
  // PROJECT / ENQUIRY TYPE
  // -----------------------------------------------

  var projectType =
    enquiry.enquiryType ||
    enquiry.projectType ||
    enquiry.type ||
    "Custom Project";


  // -----------------------------------------------
  // STATUS
  // -----------------------------------------------

  var status =
    enquiry.status ||
    enquiry.requestStatus ||
    "submitted";


  // -----------------------------------------------
  // DATE
  // -----------------------------------------------

  var createdAt =
    enquiry.submittedAt ||
    enquiry.createdAt ||
    enquiry.updatedAt ||
    "Not available";


  // -----------------------------------------------
  // REQUIREMENTS
  // -----------------------------------------------

  var requirements = "";

  if (
    enquiry.requirements &&
    typeof enquiry.requirements === "object"
  ) {

    requirements =
      enquiry.requirements.description ||
      enquiry.requirements.fullMessage ||
      enquiry.requirements.text ||
      enquiry.requirements.message ||
      "";

  } else {

    requirements =
      enquiry.requirements ||
      enquiry.message ||
      enquiry.description ||
      "";
  }

  if (!requirements) {
    requirements = "No requirements";
  }


  // -----------------------------------------------
  // ADMIN FINAL REQUIREMENTS
  // -----------------------------------------------

  var finalRequirements =
    enquiry.adminFinalRequirements ||
    enquiry.finalRequirements ||
    "";


  // -----------------------------------------------
  // USER AGREEMENT
  // -----------------------------------------------

  var agreement =
    enquiry.userAgreement === true
      ? "✅ Agreed"
      : "⏳ Pending";


  // -----------------------------------------------
  // DISPLAY
  // -----------------------------------------------

  text +=
    "📩 <b>Enquiry #" +
    count +
    "</b>\n\n" +

    "🆔 <b>Ref:</b> " +
    "<code>" +
    safeText(enquiryId) +
    "</code>\n" +

    "🛠️ <b>Project:</b> " +
    safeText(projectType) +
    "\n" +

    "📌 <b>Status:</b> " +
    safeText(status) +
    "\n" +

    "📅 <b>Date:</b> " +
    safeText(createdAt) +
    "\n" +

    "🤝 <b>Agreement:</b> " +
    safeText(agreement) +
    "\n" +

    "📝 <b>Requirements:</b>\n" +
    safeText(requirements);


  // Show admin final requirements only if present
  if (finalRequirements) {

    text +=
      "\n\n" +
      "📋 <b>Final Requirements:</b>\n" +
      safeText(finalRequirements);
  }


  text +=
    "\n\n━━━━━━━━━━━━━━━━━━\n\n";


  // -----------------------------------------------
  // VIEW BUTTON
  // -----------------------------------------------

  buttons.push([
    {
      text:
        "📩 View Enquiry #" + count,
      callback_data:
        "ADMIN_ENQUIRY " + enquiryId
    }
  ]);
}


// =====================================================
// 📊 NO ENQUIRIES
// =====================================================

if (count === 0) {

  text +=
    "ℹ️ <b>Is user ki koi enquiry nahi mili.</b>\n\n" +
    "Possible reason:\n" +
    "• User ne abhi enquiry submit nahi ki\n" +
    "• Enquiry kisi different user ID se saved hai\n" +
    "• Enquiry keys incomplete hain.";
}


// =====================================================
// 📊 TOTAL
// =====================================================

if (count > 0) {

  text +=
    "📊 <b>Total Enquiries:</b> " +
    count;
}


// =====================================================
// 🔘 NAVIGATION
// =====================================================

buttons.push([
  {
    text: "👤 Back to User",
    callback_data:
      "ADMIN_USER " + targetId
  }
]);


buttons.push([
  {
    text: "👥 Users",
    callback_data:
      "ADMIN_USERS"
  },
  {
    text: "📋 All Enquiries",
    callback_data:
      "ADMIN_ENQUIRIES"
  }
]);


buttons.push([
  {
    text: "👑 Admin Panel",
    callback_data:
      "ADMIN_PANEL"
  }
]);


// =====================================================
// 📤 SEND
// =====================================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
});
