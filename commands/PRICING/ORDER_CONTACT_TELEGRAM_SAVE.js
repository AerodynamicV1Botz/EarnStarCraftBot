/*CMD
  command: ORDER_CONTACT_TELEGRAM_SAVE
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
  command: ORDER_CONTACT_TELEGRAM_SAVE
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 21 — ORDER_CONTACT_TELEGRAM_SAVE
// STEP 2.2.1.3.1.1
//
// CLIENT → SAVE TELEGRAM CONTACT
//
// Supports:
// - ORDER flow
// - BUILD flow
// - Permanent contact profile
// - Own Telegram contact verification
// - Correct return menu
// =====================================================


// =====================================================
// 👤 USER INFORMATION
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
// 🌐 LANGUAGE
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

  var noDraftText = "";

  if (language === "english") {

    noDraftText =
      "❌ <b>Your request draft was not found.</b>\n\n" +
      "Please start again.";

  } else if (language === "gujarati") {

    noDraftText =
      "❌ <b>તમારો request draft મળ્યો નથી.</b>\n\n" +
      "કૃપા કરીને ફરીથી શરૂ કરો.";

  } else {

    noDraftText =
      "❌ <b>Aapka request draft nahi mila.</b>\n\n" +
      "Please dobara start karein.";

  }

  Api.sendMessage({
    chat_id: uid,
    text: noDraftText,
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
// 📱 READ TELEGRAM CONTACT
// =====================================================

var contact = null;


// Primary update source
if (
  typeof tgUpdate !== "undefined" &&
  tgUpdate &&
  tgUpdate.message &&
  tgUpdate.message.contact
) {
  contact = tgUpdate.message.contact;
}


// Fallback update source
if (
  !contact &&
  typeof message !== "undefined" &&
  message &&
  typeof message === "object" &&
  message.contact
) {
  contact = message.contact;
}


// =====================================================
// 🌐 LANGUAGE TEXT
// =====================================================

var noContactText = "";
var shareAgainText = "";
var wrongContactText = "";
var successText = "";

if (language === "english") {

  noContactText =
    "❌ <b>Telegram contact was not received.</b>";

  shareAgainText =
    "Please use the <b>Share Telegram Contact</b> button below.";

  wrongContactText =
    "❌ Please share only your own Telegram contact.";

  successText =
    "✅ <b>Telegram contact has been successfully submitted.</b>";

} else if (language === "gujarati") {

  noContactText =
    "❌ <b>Telegram contact મળ્યો નથી.</b>";

  shareAgainText =
    "કૃપા કરીને નીચે આપેલા <b>Telegram Contact Share</b> button દ્વારા તમારો contact share કરો.";

  wrongContactText =
    "❌ કૃપા કરીને ફક્ત તમારો પોતાનો Telegram contact share કરો.";

  successText =
    "✅ <b>Telegram contact સફળતાપૂર્વક submit થઈ ગયો છે.</b>";

} else {

  noContactText =
    "❌ <b>Telegram contact receive nahi hua.</b>";

  shareAgainText =
    "Please neeche diye gaye <b>Share Telegram Contact</b> button se apna contact share karein.";

  wrongContactText =
    "❌ Please sirf apna Telegram contact share karein.";

  successText =
    "✅ <b>Telegram contact successfully submit ho gaya.</b>";

}


// =====================================================
// ❌ CONTACT NOT RECEIVED
// =====================================================

if (
  !contact ||
  !contact.phone_number
) {

  Api.sendMessage({
    chat_id: uid,
    text:
      noContactText +
      "\n\n" +
      shareAgainText,
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 🔐 VERIFY CONTACT OWNER
// =====================================================

// Telegram contact.user_id kuch cases mein absent ho sakta hai.
// Agar present hai, toh current user ID se match hona chahiye.

if (
  contact.user_id &&
  String(contact.user_id) !== uid
) {

  Api.sendMessage({
    chat_id: uid,
    text: wrongContactText,
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 📞 NORMALIZE PHONE NUMBER
// =====================================================

var phone = String(
  contact.phone_number || ""
).trim();

if (!phone) {

  Api.sendMessage({
    chat_id: uid,
    text:
      noContactText +
      "\n\n" +
      shareAgainText,
    parse_mode: "HTML"
  });

  return;
}

if (phone.charAt(0) !== "+") {
  phone = "+" + phone;
}


// =====================================================
// 📦 ENSURE ACTIVE DRAFT CONTACT OBJECT
// =====================================================

if (
  !draft.contacts ||
  typeof draft.contacts !== "object"
) {
  draft.contacts = {};
}

draft.contacts.telegram =
  phone;

draft.contacts.otherNumber =
  draft.contacts.otherNumber || "";

draft.contacts.instagram =
  draft.contacts.instagram || "";

draft.contacts.whatsapp =
  draft.contacts.whatsapp || "";

draft.contacts.email =
  draft.contacts.email || "";


// =====================================================
// 💾 UPDATE ACTIVE DRAFT
// =====================================================

draft.userId =
  draft.userId || uid;

draft.stage =
  "contact_menu";

draft.packageStep =
  "telegram_contact_completed";


// Order-specific fields
if (activeContactFlow === "ORDER") {

  draft.requestStatus =
    draft.requestStatus || "draft";

  draft.orderStatus =
    draft.orderStatus || "pending_review";

}


// Build-specific field
if (activeContactFlow === "BUILD") {

  draft.status =
    draft.status || "draft";

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
  phone;

savedContacts.otherNumber =
  savedContacts.otherNumber || "";

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
// 🧹 REMOVE REPLY KEYBOARD
// =====================================================

Api.sendMessage({
  chat_id: uid,
  text: successText,
  parse_mode: "HTML",
  reply_markup: {
    remove_keyboard: true
  }
});


// =====================================================
// ➡️ RETURN TO CORRECT CONTACT MENU
// =====================================================

if (activeContactFlow === "BUILD") {

  Bot.runCommand("BUILD_CONTACT_MENU");

} else {

  Bot.runCommand("ORDER_CONTACT_MENU");

}
