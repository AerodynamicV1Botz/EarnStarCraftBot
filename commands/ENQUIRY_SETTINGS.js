/*CMD
  command: ENQUIRY_SETTINGS
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
  command: ENQUIRY_SETTINGS
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// ADMIN_ENQUIRY_SETTINGS
// ADMIN → ENQUIRY SYSTEM OVERVIEW
// =====================================================


// =====================================================
// 👤 CURRENT ADMIN ID
// =====================================================

var uid = String(user.telegramid);


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

for (var i = 0; i < adminList.length; i++) {

  var adminItem = adminList[i];
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
// 📋 ENQUIRY DATA
// =====================================================

var keys =
  Bot.getProperty("BUILD_ENQUIRY_KEYS") || [];

if (!Array.isArray(keys)) {
  keys = [];
}


// Remove duplicate and empty IDs
var uniqueKeys = [];
var seenKeys = {};

for (var j = 0; j < keys.length; j++) {

  var enquiryId =
    String(keys[j] || "").trim();

  if (
    enquiryId &&
    !seenKeys[enquiryId]
  ) {
    seenKeys[enquiryId] = true;
    uniqueKeys.push(enquiryId);
  }
}


// =====================================================
// 📊 COUNT ENQUIRIES BY STATUS
// =====================================================

var submittedCount = 0;
var proposalCount = 0;
var discussionCount = 0;
var agreedCount = 0;
var rejectedCount = 0;
var completedCount = 0;

for (var k = 0; k < uniqueKeys.length; k++) {

  var enquiry = Bot.getProperty(
    "BUILD_ENQUIRY_" + uniqueKeys[k]
  );

  if (!enquiry) {
    continue;
  }

  var status = String(
    enquiry.status || "submitted"
  ).toLowerCase();

  if (
    status === "submitted" ||
    status === "new" ||
    status === "pending"
  ) {
    submittedCount++;

  } else if (
    status === "proposal_sent" ||
    status === "quoted"
  ) {
    proposalCount++;

  } else if (
    status === "discussion" ||
    status === "in_discussion"
  ) {
    discussionCount++;

  } else if (
    status === "agreed" ||
    status === "accepted"
  ) {
    agreedCount++;

  } else if (
    status === "rejected" ||
    status === "cancelled" ||
    status === "canceled"
  ) {
    rejectedCount++;

  } else if (
    status === "completed" ||
    status === "closed"
  ) {
    completedCount++;
  }
}


// =====================================================
// 📋 ENQUIRY SETTINGS TEXT
// =====================================================

var text =
  "📋 <b>ENQUIRY SYSTEM</b>\n\n" +

  "━━━━━━━━━━━━━━━━━━\n\n" +

  "🟢 <b>System:</b> Active\n" +

  "📝 <b>Total Enquiries:</b> " +
  uniqueKeys.length + "\n" +

  "⏳ <b>Submitted:</b> " +
  submittedCount + "\n" +

  "💬 <b>Proposal Sent:</b> " +
  proposalCount + "\n" +

  "🗣️ <b>Discussion:</b> " +
  discussionCount + "\n" +

  "🤝 <b>Agreed:</b> " +
  agreedCount + "\n" +

  "🚫 <b>Rejected/Cancelled:</b> " +
  rejectedCount + "\n" +

  "✅ <b>Completed:</b> " +
  completedCount + "\n\n" +

  "👑 <b>Admin Review:</b> Enabled\n" +

  "🔔 <b>Lead Notifications:</b> Enabled\n" +

  "📊 <b>Status Tracking:</b> Enabled\n\n" +

  "━━━━━━━━━━━━━━━━━━\n\n" +

  "Users can submit project requirements through " +
  "the <b>Build My Bot</b> system.";


// =====================================================
// 🔘 BUTTONS
// =====================================================

var buttons = [

  [
    {
      text: "📋 View Enquiries",
      callback_data: "ADMIN_ENQUIRIES"
    }
  ],

  [
    {
      text: "📊 Enquiry Statistics",
      callback_data: "ADMIN_STATS"
    }
  ],

  [
    {
      text: "👑 Admin Panel",
      callback_data: "ADMIN_PANEL"
    }
  ]

];


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
