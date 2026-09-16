/*CMD
  command: ORDER_CONTACT_TELEGRAM
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
  command: ORDER_CONTACT_TELEGRAM
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 20 — ORDER_CONTACT_TELEGRAM
// STEP 2.2.1.3.1
//
// CLIENT → REQUEST TELEGRAM CONTACT
//
// Supports:
// - ORDER flow
// - BUILD flow
// - Permanent contact profile
// - Correct active draft
// - Correct return menu
// =====================================================


// =====================================================
// ⚡ CALLBACK RESPONSE
// =====================================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {

  try {

    Api.answerCallbackQuery({
      callback_query_id: request.id
    });

  } catch (error) {}

}


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
// 📦 ENSURE ACTIVE DRAFT CONTACT OBJECT
// =====================================================

if (
  !draft.contacts ||
  typeof draft.contacts !== "object"
) {
  draft.contacts = {};
}


// =====================================================
// 🔄 LOAD SAVED CONTACT INTO ACTIVE DRAFT
// =====================================================

draft.contacts.telegram =
  draft.contacts.telegram ||
  savedContacts.telegram ||
  "";

draft.contacts.otherNumber =
  draft.contacts.otherNumber ||
  savedContacts.otherNumber ||
  "";

draft.contacts.instagram =
  draft.contacts.instagram ||
  savedContacts.instagram ||
  "";

draft.contacts.whatsapp =
  draft.contacts.whatsapp ||
  savedContacts.whatsapp ||
  "";

draft.contacts.email =
  draft.contacts.email ||
  savedContacts.email ||
  "";


// =====================================================
// 💾 UPDATE ACTIVE DRAFT STAGE
// =====================================================

draft.userId =
  draft.userId || uid;

draft.stage =
  "telegram_contact";

draft.packageStep =
  "telegram_contact";


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
// 🌐 MULTI-LANGUAGE TEXT
// =====================================================

var titleText = "";
var instructionText = "";
var warningText = "";
var shareButtonText = "";
var backButtonText = "";
var cancelButtonText = "";

if (language === "english") {

  titleText =
    "📱 <b>Submit Telegram Contact</b>";

  instructionText =
    "Tap the button below to share your Telegram contact.";

  warningText =
    "⚠️ Please share only your own contact.";

  shareButtonText =
    "📱 Share Telegram Contact";

  backButtonText =
    "⬅️ Back";

  cancelButtonText =
    "❌ Cancel Order";

} else if (language === "gujarati") {

  titleText =
    "📱 <b>Telegram Contact Submit કરો</b>";

  instructionText =
    "તમારો Telegram contact share કરવા માટે નીચે આપેલા button પર tap કરો.";

  warningText =
    "⚠️ કૃપા કરીને ફક્ત તમારો પોતાનો contact share કરો.";

  shareButtonText =
    "📱 Telegram Contact Share કરો";

  backButtonText =
    "⬅️ Back";

  cancelButtonText =
    "❌ Order Cancel કરો";

} else {

  titleText =
    "📱 <b>Telegram Contact Submit Karein</b>";

  instructionText =
    "Neeche diye gaye button par tap karke apna Telegram contact share karein.";

  warningText =
    "⚠️ Sirf apna contact share karein.";

  shareButtonText =
    "📱 Share Telegram Contact";

  backButtonText =
    "⬅️ Back";

  cancelButtonText =
    "❌ Cancel Order";

}


// =====================================================
// 📱 SEND CONTACT REQUEST KEYBOARD
// =====================================================

Api.sendMessage({

  chat_id: uid,

  text:
    titleText +
    "\n\n" +
    instructionText +
    "\n\n" +
    warningText,

  parse_mode: "HTML",

  reply_markup: {

    keyboard: [

      [
        {
          text: shareButtonText,
          request_contact: true
        }
      ],

      [
        {
          text: backButtonText
        },
        {
          text: cancelButtonText
        }
      ]

    ],

    resize_keyboard: true,

    one_time_keyboard: true

  }

});


// =====================================================
// ➡️ WAIT FOR CONTACT SAVE COMMAND
// =====================================================

Bot.runCommand("ORDER_CONTACT_TELEGRAM_SAVE");
