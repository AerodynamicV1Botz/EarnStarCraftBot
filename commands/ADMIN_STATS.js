/*CMD
  command: ADMIN_STATS
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
  command: ADMIN_STATS
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// ADMIN STATISTICS
// COMPATIBLE WITH CURRENT BUILD ENQUIRY SYSTEM
// =====================================================


// =====================================================
// 🔐 ADMIN CHECK
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
// 👥 USERS
// =====================================================

var users = Bot.getProperty("BroadcastUsers") || [];

if (!Array.isArray(users)) {
  users = [];
}

var totalUsers = users.length;


// =====================================================
// 📋 BUILD ENQUIRIES
// =====================================================

var enquiryKeys = Bot.getProperty("BUILD_ENQUIRY_KEYS") || [];

if (!Array.isArray(enquiryKeys)) {
  enquiryKeys = [];
}


// =====================================================
// 🔢 COUNTERS
// =====================================================

var totalEnquiries = 0;

var submittedEnquiries = 0;
var proposalSentEnquiries = 0;
var discussionEnquiries = 0;
var agreedEnquiries = 0;
var rejectedEnquiries = 0;
var completedEnquiries = 0;

var pendingReviewEnquiries = 0;


// =====================================================
// 🔍 READ ENQUIRIES
// =====================================================

var countedIds = {};

for (var k = 0; k < enquiryKeys.length; k++) {
  var refId = String(enquiryKeys[k] || "").trim();

  if (!refId) {
    continue;
  }

  // Prevent duplicate IDs in the key list
  if (countedIds[refId]) {
    continue;
  }

  countedIds[refId] = true;

  var enquiry = Bot.getProperty("BUILD_ENQUIRY_" + refId);

  if (!enquiry || typeof enquiry !== "object") {
    continue;
  }

  totalEnquiries++;

  var status = String(
    enquiry.status ||
    enquiry.requestStatus ||
    "new"
  ).toLowerCase().trim();

  if (
    status === "submitted" ||
    status === "new"
  ) {
    submittedEnquiries++;
    pendingReviewEnquiries++;
  }

  if (
    status === "proposal_sent" ||
    status === "quoted"
  ) {
    proposalSentEnquiries++;
  }

  if (status === "discussion") {
    discussionEnquiries++;
  }

  if (status === "agreed") {
    agreedEnquiries++;
  }

  if (
    status === "rejected" ||
    status === "cancelled"
  ) {
    rejectedEnquiries++;
  }

  if (
    status === "completed" ||
    status === "closed"
  ) {
    completedEnquiries++;
  }
}


// =====================================================
// 📊 STATISTICS MESSAGE
// =====================================================

var text =
  "📊 <b>EARNSTAR BOTCRAFT — STATISTICS</b>\n\n" +

  "👥 <b>Users</b>\n" +
  "Total Users: <b>" + totalUsers + "</b>\n\n" +

  "📋 <b>Build Enquiries</b>\n" +
  "Total: <b>" + totalEnquiries + "</b>\n" +
  "🟡 Pending Review: <b>" + pendingReviewEnquiries + "</b>\n" +
  "📨 Submitted: <b>" + submittedEnquiries + "</b>\n" +
  "📤 Proposal Sent: <b>" + proposalSentEnquiries + "</b>\n" +
  "💬 Discussion: <b>" + discussionEnquiries + "</b>\n" +
  "🤝 Agreed: <b>" + agreedEnquiries + "</b>\n" +
  "❌ Rejected: <b>" + rejectedEnquiries + "</b>\n" +
  "✅ Completed: <b>" + completedEnquiries + "</b>\n\n" +

  "━━━━━━━━━━━━━━━━━━\n\n" +

  "📈 <b>System Status:</b> 🟢 Online";


// =====================================================
// 📤 SEND STATISTICS
// =====================================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🔄 Refresh",
          callback_data: "ADMIN_STATS"
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
