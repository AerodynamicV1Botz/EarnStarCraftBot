/*CMD
  command: ORDER_STARTER
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
  command: ORDER_STARTER
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 15 — ORDER_STARTER
// STEP 2.2.1.1 — STARTER PACKAGE ORDER
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
// 📝 USER ACTIVITY
// =====================================================

var now = new Date().toISOString();

userData.lastCommand = "ORDER_STARTER";
userData.lastVisitedAt = now;
userData.updatedAt = now;

Bot.setProperty("USER_" + uid, userData, "json");


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
// 📦 CREATE STARTER ORDER DRAFT
// =====================================================

var draft = {
  id: "",
  orderId: "",

  userId: uid,

  orderSource: "PACKAGE",
  source: "PACKAGE",

  packageType: "starter",
  packageName: "Starter Package",
  packageStep: "2.2.1.1",
  packagePrice: "499",

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

draft.directOrderKey = "DIRECT_ORDER_STARTER_" + uid;
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
Bot.setProperty("STARTER_MODE_" + uid, "", "string");


// =====================================================
// ➡️ NEXT STEP
// =====================================================

Bot.runCommand("ORDER_CONTACT_MENU");
