/*CMD
  command: ORDER_PRO
  help: 
  need_reply: false
  auto_retry_time: 
  folder: PRICING

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/*CMD
  command: ORDER_PRO
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 37 — ORDER_PRO
// STEP 4.3.1 — PROFESSIONAL ORDER REQUEST
// =====================================================


// =====================================================
// ⚡ CALLBACK RESPONSE
// =====================================================

if (typeof request !== "undefined" && request && request.id) {
  try {
    Api.answerCallbackQuery({
      callback_query_id: request.id
    });
  } catch (error) {}
}


// =====================================================
// 👤 USER DETAILS
// =====================================================

var uid = String(user.telegramid);

var userData = Bot.getProperty("USER_" + uid);

if (!userData || typeof userData !== "object" || Array.isArray(userData)) {
  userData = {};
}


// =====================================================
// 🌐 LANGUAGE
// =====================================================

var language = userData.language || "hinglish";

if (
  language !== "hinglish" &&
  language !== "english" &&
  language !== "gujarati"
) {
  language = "hinglish";
}


// =====================================================
// 👤 TELEGRAM PROFILE
// =====================================================

var fullName = String(user.first_name || "");

if (user.last_name) {
  fullName += " " + String(user.last_name);
}

fullName = fullName.trim() || "Telegram User";

var telegramUsername = "";

if (user.username) {
  telegramUsername = "@" + String(user.username);
}

var premiumStatus = "Not Active";

if (user.is_premium === true) {
  premiumStatus = "Active";
}


// =====================================================
// 🕒 CURRENT TIMESTAMP
// =====================================================

var now = new Date().toISOString();


// =====================================================
// 📝 USER ACTIVITY
// =====================================================

userData.lastCommand = "ORDER_PRO";
userData.lastVisitedAt = now;
userData.updatedAt = now;

Bot.setProperty("USER_" + uid, userData, "json");


// =====================================================
// 📦 CREATE PROFESSIONAL ORDER DRAFT
// =====================================================

var draft = {
  id: "",
  orderId: "",

  userId: uid,

  orderSource: "PACKAGE",
  source: "PACKAGE",

  packageType: "pro",
  packageName: "Professional Package",
  packageStep: "4.3",
  packagePrice: "2999",

  packageDetails: "",

  advanceAmount: "",
  remainingAmount: "",

  telegramProfile: {
    fullName: fullName,
    telegramId: uid,
    username: telegramUsername,
    isPremium: premiumStatus
  },

  clientInfo: {
    customName: ""
  },

  contacts: {
    telegram: "",
    otherNumber: "",
    instagram: "",
    whatsapp: "",
    email: ""
  },

  requirements: "",
  budget: "",
  extraDetails: "",

  stage: "contact_menu",

  requestStatus: "draft",
  orderStatus: "pending_review",
  paymentStatus: "not_requested",
  submissionStatus: "draft",

  progress: 0,
  progressTitle: "Order Started",
  progressUpdate: "",

  adminId: "",
  adminNote: "",

  createdAt: now,
  updatedAt: now,

  acceptedAt: "",
  advanceRequestedAt: "",
  advancePaidAt: "",
  startedAt: "",
  completedAt: "",
  remainingRequestedAt: "",
  remainingPaidAt: "",
  deliveredAt: "",
  submittedAt: ""
};


// =====================================================
// 💾 SAVE ACTIVE PACKAGE DRAFT
// =====================================================

Bot.setProperty(
  "ORDER_" + uid,
  draft,
  "json"
);

draft.directOrderKey = "DIRECT_ORDER_PRO_" + uid;

// =====================================================
// 🔐 ACTIVE SOURCE
// =====================================================

Bot.setProperty(
  "ORDER_ACTIVE_SOURCE_" + uid,
  "PACKAGE",
  "string"
);


// =====================================================
// 🧹 CLEAR OLD TEMPORARY DATA
// =====================================================

Bot.setProperty("ORDER_MODE_" + uid, "", "string");
Bot.setProperty("ORDER_PACKAGE_" + uid, "", "string");
Bot.setProperty("PRO_MODE_" + uid, "", "string");


// =====================================================
// ➡️ NEXT STEP
// =====================================================

Bot.runCommand("ORDER_CONTACT_MENU");
