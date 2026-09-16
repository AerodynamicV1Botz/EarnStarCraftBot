/*CMD
  command: BUILD_USER_AGREE
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
  command: BUILD_USER_AGREE
  need_reply: false
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 208 — BUILD_USER_AGREE
// USER ACCEPTS FINAL PROPOSAL
// BUILD ENQUIRY → DIRECT ORDER SUBMIT
// =====================================================

var uid = String(user.telegramid);

function safeText(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function answer(text) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: text,
    show_alert: true
  });
}

var enquiryId = String(params || "").trim();

if (!enquiryId) {
  answer("❌ Enquiry ID missing");
  return;
}

var enquiry = Bot.getProperty("BUILD_ENQUIRY_" + enquiryId);

if (!enquiry || typeof enquiry !== "object") {
  answer("❌ Enquiry not found");
  return;
}

var clientId = String(
  enquiry.userId ||
  Bot.getProperty("BUILD_ENQUIRY_USER_" + enquiryId) ||
  ""
).trim();

if (!clientId || clientId !== uid) {
  answer("❌ This enquiry does not belong to you");
  return;
}

var status = String(enquiry.status || "").toLowerCase();

if (
  status !== "proposal_sent" &&
  status !== "discussion"
) {
  answer("⚠️ This proposal cannot be accepted now");
  return;
}

var finalRequirements = String(
  enquiry.adminFinalRequirements || ""
).trim();

if (!finalRequirements) {
  answer("❌ Final requirements missing");
  return;
}

Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "Proposal accepted successfully"
});

var now = new Date().toISOString();

if (!Array.isArray(enquiry.history)) {
  enquiry.history = [];
}

if (!Array.isArray(enquiry.discussionHistory)) {
  enquiry.discussionHistory = [];
}

enquiry.status = "agreed";
enquiry.requestStatus = "agreed";
enquiry.stage = "order_submit";
enquiry.packageStep = "order_submit";
enquiry.userAgreement = true;
enquiry.agreedAt = now;
enquiry.agreedBy = uid;
enquiry.progress = 40;
enquiry.progressTitle = "Proposal Accepted";

enquiry.progressUpdate =
  "The client accepted the final proposal. Order submission is ready.";

enquiry.updatedAt = now;

enquiry.history.push({
  action: "proposal_accepted",
  userId: uid,
  timestamp: now,
  note: "Client accepted the final proposed requirements."
});

enquiry.discussionHistory.push({
  action: "proposal_accepted",
  userId: uid,
  timestamp: now,
  message: "Client agreed to the final proposal."
});

Bot.setProperty(
  "BUILD_ENQUIRY_" + enquiryId,
  enquiry,
  "json"
);

Bot.setProperty(
  "BUILD_ENQUIRY_USER_" + enquiryId,
  clientId,
  "string"
);

// =====================================================
// EXISTING CONTACT DETAILS PRESERVE KARO
// =====================================================

var oldContacts = enquiry.contacts || {};

var orderDraft = {
  id: "",
  orderId: "",

  enquiryId: enquiryId,
  sourceEnquiryId: enquiryId,

  userId: uid,

  source: "BUILD_ENQUIRY",
  orderSource: "BUILD_ENQUIRY",
  orderType: "CUSTOM_BOT",

  packageType:
    enquiry.packageType ||
    "custom",

  packageName:
    enquiry.packageName ||
    "Custom Bot",

  packageDetails: "",

  originalRequirements:
    enquiry.userRequirements ||
    enquiry.originalRequirements ||
    "",

  finalRequirements: finalRequirements,
  requirements: finalRequirements,

  clientName:
    enquiry.name ||
    enquiry.clientName ||
    "",

  language:
    enquiry.language ||
    "hinglish",

  status: "draft",
  submissionStatus: "draft",

  requestStatus: "draft",
  orderStatus: "draft",
  paymentStatus: "not_requested",

  contacts: {
    telegram: String(
      oldContacts.telegram ||
      enquiry.telegram ||
      ""
    ),

    otherNumber: String(
      oldContacts.otherNumber ||
      enquiry.otherNumber ||
      ""
    ),

    instagram: String(
      oldContacts.instagram ||
      enquiry.instagram ||
      ""
    ),

    whatsapp: String(
      oldContacts.whatsapp ||
      enquiry.whatsapp ||
      ""
    ),

    email: String(
      oldContacts.email ||
      enquiry.email ||
      ""
    )
  },

  createdAt: now,
  updatedAt: now
};

Bot.setProperty(
  "BUILD_ORDER_DRAFT_" + uid,
  orderDraft,
  "json"
);

Bot.setProperty(
  "ORDER_ACTIVE_SOURCE_" + uid,
  "BUILD_ENQUIRY",
  "string"
);

// =====================================================
// FINAL BUTTON — DIRECT ORDER_SUBMIT
// =====================================================

Api.editMessageText({
  chat_id: uid,

  message_id: request.message.message_id,

  text:
    "✅ <b>Proposal Accepted Successfully</b>\n\n" +

    "🆔 <b>Enquiry ID:</b> <code>" +
    safeText(enquiryId) +
    "</code>\n\n" +

    "🎉 Thank you for confirming the final proposal.\n\n" +

    "Your final requirements and saved contact details are ready.\n\n" +

    "Tap below to submit your order directly.\n\n" +

    "⚠️ <b>No payment has been requested.</b>\n" +

    "Payment will be requested only after admin review and order acceptance.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📝 Submit Order Details",
          callback_data: "ORDER_SUBMIT " + enquiryId
        }
      ],
      [
        {
          text: "💬 Continue Discussion",
          callback_data: "BUILD_USER_DISCUSSION " + enquiryId
        }
      ]
    ]
  }
});
