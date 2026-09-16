/*CMD
  command: ORDER_CONTACT_NUMBER_SAVE
  help: 
  need_reply: true
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
  command: ORDER_CONTACT_NUMBER_SAVE
  need_reply: true
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 20 — ORDER_CONTACT_NUMBER_SAVE
// STEP 2.2.1.3.2.1
//
// CLIENT → SAVE OTHER PHONE NUMBER
//
// Supports:
// - ORDER flow
// - BUILD flow
// - Permanent contact profile
// - Strict phone validation
// - India-first normalization
// - International numbers
// - Correct active draft
// - Correct return menu
// =====================================================


// =====================================================
// 👤 USER ID
// =====================================================

var uid = String(user.telegramid);


// =====================================================
// 🔀 ACTIVE CONTACT FLOW
// =====================================================

var activeContactFlow =
  String(
    User.getProperty("ACTIVE_CONTACT_FLOW") || "ORDER"
  ).toUpperCase();

if (
  activeContactFlow !== "ORDER" &&
  activeContactFlow !== "BUILD"
) {
  activeContactFlow = "ORDER";
}


// =====================================================
// 📦 ACTIVE DRAFT KEY
// =====================================================

var activeDraftKey =
  activeContactFlow === "BUILD"
    ? "BUILD_ENQUIRY_" + uid
    : "ORDER_" + uid;


// =====================================================
// 🌐 LOAD USER LANGUAGE
// =====================================================

var userData = Bot.getProperty("USER_" + uid);

if (!userData || typeof userData !== "object") {
  userData = {};
}

var language = String(
  userData.language || "hinglish"
).toLowerCase();

if (
  language !== "hinglish" &&
  language !== "english" &&
  language !== "gujarati"
) {
  language = "hinglish";
}


// =====================================================
// 📦 LOAD ACTIVE DRAFT
// =====================================================

var draft = Bot.getProperty(activeDraftKey);

if (!draft || typeof draft !== "object") {

  var missingDraftText = "";

  if (language === "english") {

    missingDraftText =
      "❌ <b>Your request draft was not found.</b>\n\n" +
      "Please start again.";

  } else if (language === "gujarati") {

    missingDraftText =
      "❌ <b>તમારો request draft મળ્યો નથી.</b>\n\n" +
      "કૃપા કરીને ફરીથી શરૂ કરો.";

  } else {

    missingDraftText =
      "❌ <b>Aapka request draft nahi mila.</b>\n\n" +
      "Please dobara start karein.";

  }

  Api.sendMessage({
    chat_id: uid,
    text: missingDraftText,
    parse_mode: "HTML"
  });

  if (activeContactFlow === "BUILD") {
    Bot.runCommand("MENU_BUILD");
  } else {
    Bot.runCommand("MAIN_MENU");
  }

  return;
}


// =====================================================
// 📩 GET USER INPUT
// =====================================================

var phoneInput = String(
  message || ""
).trim();


// =====================================================
// 🧹 REMOVE NORMAL USER SPACES
//
// Allows:
// +91 9886878787
// +91-9886878787 is NOT accepted
// =====================================================

phoneInput =
  phoneInput.replace(/\s+/g, "");


// =====================================================
// ❌ EMPTY CHECK
// =====================================================

if (phoneInput === "") {

  var emptyText = "";

  if (language === "english") {

    emptyText =
      "❌ <b>Phone number is required.</b>\n\n" +
      "Please enter a valid number.";

  } else if (language === "gujarati") {

    emptyText =
      "❌ <b>Phone number જરૂરી છે.</b>\n\n" +
      "કૃપા કરીને valid number દાખલ કરો.";

  } else {

    emptyText =
      "❌ <b>Phone number dena zaroori hai.</b>\n\n" +
      "Please valid number enter karo.";

  }

  Api.sendMessage({
    chat_id: uid,
    text: emptyText,
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 🔐 NORMALIZE + VALIDATE
//
// INDIA:
// 9886878787
// → +919886878787
//
// 919886878787
// → +919886878787
//
// +919886878787
// → +919886878787
//
// INTERNATIONAL:
// +14155552671
// → +14155552671
//
// No alphabet.
// No -, (, ), /, etc.
// =====================================================

var normalizedPhone = "";
var numberPart = "";
var isValid = true;
var errorType = "";


// =====================================================
// 🇮🇳 CASE 1 — 10 DIGIT INDIAN MOBILE
// =====================================================

if (/^[6-9][0-9]{9}$/.test(phoneInput)) {

  normalizedPhone =
    "+91" + phoneInput;

}


// =====================================================
// 🇮🇳 CASE 2 — INDIA WITH 91 PREFIX
// Example: 919886878787
// =====================================================

else if (/^91[6-9][0-9]{9}$/.test(phoneInput)) {

  normalizedPhone =
    "+" + phoneInput;

}


// =====================================================
// 🌍 CASE 3 — INTERNATIONAL NUMBER
// + MUST BE PRESENT
// =====================================================

else if (phoneInput.charAt(0) === "+") {

  numberPart =
    phoneInput.substring(1);

  // Only digits after +
  if (!/^[0-9]+$/.test(numberPart)) {

    isValid = false;
    errorType = "characters";

  }

  // E.164-style maximum 15 digits
  else if (
    numberPart.length < 8 ||
    numberPart.length > 15
  ) {

    isValid = false;
    errorType = "length";

  }

  else {

    normalizedPhone =
      "+" + numberPart;

  }

}


// =====================================================
// ❌ CASE 4 — EVERYTHING ELSE
// =====================================================

else {

  isValid = false;
  errorType = "format";

}


// =====================================================
// 🇮🇳 EXTRA INDIA CHECK
//
// If user writes +91XXXXXXXXXX,
// it must still be a valid Indian mobile.
// =====================================================

if (
  isValid &&
  normalizedPhone.indexOf("+91") === 0
) {

  var indiaNumber =
    normalizedPhone.substring(3);

  if (
    !/^[6-9][0-9]{9}$/.test(indiaNumber)
  ) {

    isValid = false;
    errorType = "india";

  }

}


// =====================================================
// ❌ INVALID NUMBER
// =====================================================

if (!isValid) {

  var invalidText = "";

  if (language === "english") {

    invalidText =
      "❌ <b>Invalid phone number.</b>\n\n" +
      "Please enter a real-looking valid number using only digits.\n\n" +
      "🇮🇳 Indian:\n" +
      "<code>9886878787</code>\n" +
      "or\n" +
      "<code>+919886878787</code>\n\n" +
      "🌍 International:\n" +
      "<code>+14155552671</code>\n\n" +
      "Letters, symbols and invalid lengths are not accepted.";

  } else if (language === "gujarati") {

    invalidText =
      "❌ <b>Phone number ખોટો છે.</b>\n\n" +
      "ફક્ત valid digits વાળો number દાખલ કરો.\n\n" +
      "🇮🇳 Indian:\n" +
      "<code>9886878787</code>\n" +
      "અથવા\n" +
      "<code>+919886878787</code>\n\n" +
      "🌍 International:\n" +
      "<code>+14155552671</code>\n\n" +
      "Letters, invalid symbols અને ખોટી length allowed નથી.";

  } else {

    invalidText =
      "❌ <b>Phone number galat hai.</b>\n\n" +
      "Valid digits wala number enter karo.\n\n" +
      "🇮🇳 India ke liye:\n" +
      "<code>9886878787</code>\n" +
      "→ hum khud <code>+91</code> laga denge.\n\n" +
      "Ya:\n" +
      "<code>919886878787</code>\n" +
      "→ <code>+919886878787</code>\n\n" +
      "🌍 Other country:\n" +
      "<code>+14155552671</code>\n\n" +
      "Letters, invalid symbols aur wrong length allowed nahi hai.";

  }

  Api.sendMessage({
    chat_id: uid,
    text: invalidText,
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 📞 ENSURE ACTIVE CONTACT OBJECT
// =====================================================

if (
  !draft.contacts ||
  typeof draft.contacts !== "object"
) {

  draft.contacts = {};

}


// =====================================================
// 📦 ENSURE ALL CONTACT FIELDS
// =====================================================

if (
  typeof draft.contacts.telegram !== "string"
) {
  draft.contacts.telegram = "";
}

if (
  typeof draft.contacts.otherNumber !== "string"
) {
  draft.contacts.otherNumber = "";
}

if (
  typeof draft.contacts.instagram !== "string"
) {
  draft.contacts.instagram = "";
}

if (
  typeof draft.contacts.whatsapp !== "string"
) {
  draft.contacts.whatsapp = "";
}

if (
  typeof draft.contacts.email !== "string"
) {
  draft.contacts.email = "";
}


// =====================================================
// 💾 SAVE NORMALIZED NUMBER TO ACTIVE DRAFT
// =====================================================

draft.contacts.otherNumber =
  normalizedPhone;


// =====================================================
// 👤 PRESERVE USER PROFILE DETAILS
// =====================================================

draft.userId =
  draft.userId || uid;

if (!draft.telegramProfile) {
  draft.telegramProfile = {};
}

draft.telegramProfile.telegramId =
  uid;

if (user.first_name) {
  draft.telegramProfile.firstName =
    user.first_name;
}

if (user.last_name) {
  draft.telegramProfile.lastName =
    user.last_name;
}

if (user.username) {
  draft.telegramProfile.username =
    user.username;
}


// =====================================================
// 🔄 UPDATE ACTIVE DRAFT PROGRESS
// IMPORTANT:
// packageStep MUST remain package hierarchy
// =====================================================

draft.stage =
  "contact_menu";


// =====================================================
// ❌ DO NOT CHANGE packageStep
// =====================================================


// =====================================================
// 🔐 FLOW-SPECIFIC STATUS
// =====================================================

if (activeContactFlow === "ORDER") {

  if (!draft.requestStatus) {
    draft.requestStatus = "draft";
  }

  if (!draft.orderStatus) {
    draft.orderStatus = "pending_review";
  }

  if (!draft.paymentStatus) {
    draft.paymentStatus = "not_requested";
  }

}


if (activeContactFlow === "BUILD") {

  if (!draft.status) {
    draft.status = "draft";
  }

}


draft.updatedAt =
  new Date().toISOString();


// =====================================================
// 💾 SAVE ACTIVE DRAFT
// =====================================================

Bot.setProperty(
  activeDraftKey,
  draft,
  "json"
);


// =====================================================
// 👤 LOAD PERMANENT CONTACT PROFILE
// =====================================================

var contactProfileKey =
  "USER_CONTACTS_" + uid;

var savedContacts =
  Bot.getProperty(contactProfileKey);

if (
  !savedContacts ||
  typeof savedContacts !== "object"
) {
  savedContacts = {};
}


// =====================================================
// 📦 ENSURE PERMANENT CONTACT FIELDS
// =====================================================

savedContacts.telegram =
  savedContacts.telegram || "";

savedContacts.otherNumber =
  normalizedPhone;

savedContacts.instagram =
  savedContacts.instagram || "";

savedContacts.whatsapp =
  savedContacts.whatsapp || "";

savedContacts.email =
  savedContacts.email || "";


// =====================================================
// 💾 SAVE PERMANENT CONTACT PROFILE
// =====================================================

Bot.setProperty(
  contactProfileKey,
  savedContacts,
  "json"
);


// =====================================================
// 🧹 CLEAR WAITING STATUS
// =====================================================

User.setProperty(
  "WAITING_OTHER_PHONE",
  "no",
  "string"
);


// =====================================================
// 🔎 SUCCESS MESSAGE
// SHOW EXACTLY WHAT WAS NORMALIZED + SAVED
// =====================================================

var successText = "";

if (language === "english") {

  successText =
    "✅ <b>Other phone number saved successfully.</b>\n\n" +
    "📞 Saved Number: <code>" +
    normalizedPhone +
    "</code>";

} else if (language === "gujarati") {

  successText =
    "✅ <b>Other phone number successfully save થઈ ગયો.</b>\n\n" +
    "📞 Saved Number: <code>" +
    normalizedPhone +
    "</code>";

} else {

  successText =
    "✅ <b>Other phone number successfully save ho gaya.</b>\n\n" +
    "📞 Saved Number: <code>" +
    normalizedPhone +
    "</code>";

}


Api.sendMessage({

  chat_id: uid,

  text: successText,

  parse_mode: "HTML"

});


// =====================================================
// ➡️ RETURN TO CORRECT CONTACT MENU
// =====================================================

if (activeContactFlow === "BUILD") {

  Bot.runCommand("BUILD_CONTACT_MENU");

} else {

  Bot.runCommand("ORDER_CONTACT_MENU");

}
