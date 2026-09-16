/*CMD
  command: ADMIN_ENQUIRY
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
  command: ADMIN_ENQUIRY
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// ADMIN ENQUIRY DETAILS
// ADMIN → VIEW BUILD ENQUIRY
// COMPATIBLE WITH BUILD_ENQUIRY_SUBMIT
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
// 🆔 GET ENQUIRY ID
// =====================================================

var refId = String(params || "").trim();

if (!refId) {
  Bot.sendMessage("⚠️ <b>Enquiry ID not found.</b>", {
    parse_mode: "HTML"
  });
  return;
}


// =====================================================
// 📋 LOAD ENQUIRY BY FINAL ID
// =====================================================

var enquiry = Bot.getProperty("BUILD_ENQUIRY_" + refId);

if (!enquiry || typeof enquiry !== "object") {
  Bot.sendMessage(
    "❌ <b>Enquiry not found.</b>\n\n" +
    "ID: <code>" + safeText(refId) + "</code>",
    {
      parse_mode: "HTML"
    }
  );
  return;
}


// =====================================================
// 📊 STATUS
// =====================================================

var status = String(
  enquiry.status ||
  enquiry.requestStatus ||
  "new"
).toLowerCase();

var statusIcon = "🟡";

if (
  status === "accepted" ||
  status === "approved" ||
  status === "quoted" ||
  status === "proposal_sent" ||
  status === "discussion" ||
  status === "agreed"
) {
  statusIcon = "🟢";
}

if (
  status === "rejected" ||
  status === "closed" ||
  status === "cancelled"
) {
  statusIcon = "🔴";
}


// =====================================================
// 👤 CLIENT DETAILS
// =====================================================

var clientName =
  enquiry.userName ||
  enquiry.clientName ||
  enquiry.name ||
  "Not available";

var username =
  enquiry.username ||
  enquiry.telegramUsername ||
  enquiry.contact ||
  "Not available";

var clientId =
  enquiry.userId ||
  enquiry.clientId ||
  enquiry.telegramId ||
  Bot.getProperty("BUILD_ENQUIRY_USER_" + refId) ||
  "";

var enquiryType =
  enquiry.enquiryType ||
  enquiry.service ||
  enquiry.serviceName ||
  "custom_bot";

var packageName =
  enquiry.packageName ||
  enquiry.packageType ||
  "Custom Build";


// =====================================================
// 📝 ORIGINAL USER REQUIREMENTS
// =====================================================

var originalRequirements = "";

if (
  enquiry.requirements &&
  typeof enquiry.requirements === "object"
) {
  originalRequirements =
    enquiry.requirements.description ||
    enquiry.requirements.fullMessage ||
    enquiry.requirements.text ||
    enquiry.requirements.message ||
    "";
} else {
  originalRequirements =
    enquiry.requirements ||
    enquiry.description ||
    enquiry.userRequirements ||
    "";
}

originalRequirements = String(
  originalRequirements || "Not submitted"
);


// =====================================================
// ✅ FINAL ADMIN REQUIREMENTS
// =====================================================

var finalRequirements = String(
  enquiry.adminFinalRequirements ||
  enquiry.finalRequirements ||
  ""
).trim();


// =====================================================
// 💰 BUDGET
// =====================================================

var budget =
  enquiry.budget ||
  enquiry.clientBudget ||
  "Not provided";


// =====================================================
// 📌 EXTRA DETAILS
// =====================================================

var extraDetails =
  enquiry.extraDetails ||
  enquiry.additionalDetails ||
  "Not provided";


// =====================================================
// 📞 CONTACT DETAILS
// =====================================================

var contacts = enquiry.contacts || {};

var telegramContact =
  contacts.telegram ||
  "Not submitted";

var otherNumber =
  contacts.otherNumber ||
  "Not submitted";

var instagram =
  contacts.instagram ||
  "Not submitted";

var whatsapp =
  contacts.whatsapp ||
  "Not submitted";

var email =
  contacts.email ||
  "Optional / Not submitted";


// =====================================================
// 🕒 DATES
// =====================================================

var createdAt =
  enquiry.createdAt ||
  enquiry.created_at ||
  enquiry.timestamp ||
  "Not available";

var submittedAt =
  enquiry.submittedAt ||
  "Not available";

var proposalSentAt =
  enquiry.proposalSentAt ||
  enquiry.adminProposalAt ||
  "";

var agreedAt =
  enquiry.agreedAt ||
  "";


// =====================================================
// 🤝 AGREEMENT STATUS
// =====================================================

var agreementText = "Not agreed";

if (
  enquiry.userAgreement === true ||
  status === "agreed"
) {
  agreementText = "Agreed by client";
}


// =====================================================
// 📝 DETAILS MESSAGE
// =====================================================

var text =
  "📋 <b>BUILD ENQUIRY DETAILS</b>\n\n" +

  "🆔 <b>Enquiry ID:</b>\n" +
  "<code>" + safeText(refId) + "</code>\n\n" +

  "👤 <b>Client Name:</b>\n" +
  safeText(clientName) + "\n\n" +

  "📱 <b>Username:</b>\n" +
  safeText(username) + "\n\n" +

  (
    clientId
      ? "🆔 <b>Telegram ID:</b>\n" +
        "<code>" + safeText(clientId) + "</code>\n\n"
      : ""
  ) +

  "🤖 <b>Enquiry Type:</b>\n" +
  safeText(enquiryType) + "\n\n" +

  "📦 <b>Package:</b>\n" +
  safeText(packageName) + "\n\n" +

  "📊 <b>Status:</b> " +
  statusIcon + " " +
  safeText(status.toUpperCase()) + "\n\n" +

  "📝 <b>Original User Requirements:</b>\n" +
  safeText(originalRequirements) + "\n\n" +

  (
    finalRequirements
      ? "✅ <b>Final Admin Requirements:</b>\n" +
        safeText(finalRequirements) + "\n\n"
      : "⚠️ <b>Final Admin Requirements:</b>\n" +
        "Not prepared yet\n\n"
  ) +

  "🤝 <b>Agreement:</b>\n" +
  safeText(agreementText) + "\n\n" +

  "💰 <b>Budget:</b>\n" +
  safeText(budget) + "\n\n" +

  "📌 <b>Extra Details:</b>\n" +
  safeText(extraDetails) + "\n\n" +

  "📞 <b>Contact Details:</b>\n\n" +

  "📱 <b>Telegram:</b> " +
  safeText(telegramContact) + "\n" +

  "☎️ <b>Other Number:</b> " +
  safeText(otherNumber) + "\n" +

  "📸 <b>Instagram:</b> " +
  safeText(instagram) + "\n" +

  "🟢 <b>WhatsApp:</b> " +
  safeText(whatsapp) + "\n" +

  "✉️ <b>Email:</b> " +
  safeText(email) + "\n\n" +

  "🕒 <b>Created:</b>\n" +
  safeText(createdAt) + "\n\n" +

  "📨 <b>Submitted:</b>\n" +
  safeText(submittedAt) + "\n\n" +

  (
    proposalSentAt
      ? "📤 <b>Proposal Sent:</b>\n" +
        safeText(proposalSentAt) + "\n\n"
      : ""
  ) +

  (
    agreedAt
      ? "🤝 <b>Agreed At:</b>\n" +
        safeText(agreedAt) + "\n\n"
      : ""
  ) +

  "━━━━━━━━━━━━━━━━━━";


// =====================================================
// 🔘 ACTION BUTTONS
// =====================================================

var buttons = [];

buttons.push([
  {
    text: "✅ Accept",
    callback_data: "BUILD_ADMIN_ACCEPT " + refId
  },
  {
    text: "❌ Reject",
    callback_data: "BUILD_ADMIN_REJECT " + refId
  }
]);

buttons.push([
  {
    text: "💬 Contact Client",
    callback_data: "BUILD_ADMIN_CONTACT " + refId
  }
]);

buttons.push([
  {
    text: "👁️ View Again",
    callback_data: "BUILD_ADMIN_VIEW " + refId
  }
]);

buttons.push([
  {
    text: "📋 All Enquiries",
    callback_data: "ADMIN_ENQUIRIES"
  }
]);

buttons.push([
  {
    text: "👑 Admin Panel",
    callback_data: "ADMIN_PANEL"
  }
]);


// =====================================================
// 📤 SEND DETAILS
// =====================================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
});
