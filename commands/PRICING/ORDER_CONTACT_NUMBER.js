/*CMD
  command: ORDER_CONTACT_NUMBER
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
  command: ORDER_CONTACT_NUMBER
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 19 — ORDER_CONTACT_NUMBER
// STEP 2.2.1.3.2
//
// CLIENT → ASK OTHER PHONE NUMBER
//
// Supports:
// - ORDER flow
// - BUILD flow
// - Permanent contact profile
// - Existing draft preservation
// - India-first phone validation
// - International numbers with + prefix
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
// 📦 ENSURE CONTACT OBJECT
// =====================================================

if (
  !draft.contacts ||
  typeof draft.contacts !== "object"
) {
  draft.contacts = {};
}


// =====================================================
// 🔄 LOAD SAVED CONTACT DATA
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
// 💾 WAITING STATUS
// =====================================================

User.setProperty(
  "WAITING_OTHER_PHONE",
  "yes",
  "string"
);


// =====================================================
// 💾 UPDATE ACTIVE DRAFT STAGE
// IMPORTANT:
// packageStep = PACKAGE HIERARCHY
// stage       = CURRENT FLOW STEP
// =====================================================

draft.userId =
  draft.userId || uid;

draft.stage =
  "other_phone";


// =====================================================
// ❌ DO NOT CHANGE packageStep
// =====================================================


// =====================================================
// 🔐 FLOW-SPECIFIC STATUS
// =====================================================

if (activeContactFlow === "ORDER") {

  draft.requestStatus =
    draft.requestStatus || "draft";

  draft.orderStatus =
    draft.orderStatus || "pending_review";

}

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
var exampleText = "";
var backButtonText = "";

if (language === "english") {

  titleText =
    "☎️ <b>Submit Other Phone Number</b>";

  instructionText =
    "Enter a valid phone number where our team can contact you.\n\n" +
    "🇮🇳 Indian numbers can be entered as 10 digits. We will automatically add +91.";

  exampleText =
    "Examples:\n" +
    "<code>9886878787</code> → <code>+919886878787</code>\n" +
    "<code>919886878787</code> → <code>+919886878787</code>\n" +
    "<code>+919886878787</code> → <code>+919886878787</code>\n\n" +
    "🌍 International numbers must include <code>+</code>.\n" +
    "Example: <code>+14155552671</code>";

  backButtonText =
    "🔙 Back";

} else if (language === "gujarati") {

  titleText =
    "☎️ <b>અન્ય ફોન નંબર Submit કરો</b>";

  instructionText =
    "એવો માન્ય ફોન નંબર દાખલ કરો જેના પર અમારી ટીમ તમારો સંપર્ક કરી શકે.\n\n" +
    "🇮🇳 Indian number 10 digits માં નાખી શકો છો. અમે આપમેળે +91 ઉમેરીશું.";

  exampleText =
    "ઉદાહરણ:\n" +
    "<code>9886878787</code> → <code>+919886878787</code>\n" +
    "<code>919886878787</code> → <code>+919886878787</code>\n" +
    "<code>+919886878787</code> → <code>+919886878787</code>\n\n" +
    "🌍 International number માટે <code>+</code> જરૂરી છે.\n" +
    "ઉદાહરણ: <code>+14155552671</code>";

  backButtonText =
    "🔙 પાછા જાઓ";

} else {

  titleText =
    "☎️ <b>Other Phone Number Submit Karein</b>";

  instructionText =
    "Aisa valid phone number enter karein jahan hamari team aapse contact kar sake.\n\n" +
    "🇮🇳 Indian number 10 digits mein daal sakte ho. Hum automatically +91 laga denge.";

  exampleText =
    "Examples:\n" +
    "<code>9886878787</code> → <code>+919886878787</code>\n" +
    "<code>919886878787</code> → <code>+919886878787</code>\n" +
    "<code>+919886878787</code> → <code>+919886878787</code>\n\n" +
    "🌍 Other country ka number hai to <code>+</code> ke saath enter karo.\n" +
    "Example: <code>+14155552671</code>";

  backButtonText =
    "🔙 Back";

}


// =====================================================
// 📩 ASK PHONE NUMBER
// =====================================================

Api.sendMessage({

  chat_id: uid,

  text:
    titleText +
    "\n\n" +
    instructionText +
    "\n\n" +
    exampleText,

  parse_mode: "HTML",

  reply_markup: {

    inline_keyboard: [
      [
        {
          text: backButtonText,
          callback_data: "ORDER_CONTACT_MENU"
        }
      ]
    ]

  }

});


// =====================================================
// ▶️ NEXT SAVE SCRIPT
// =====================================================

Bot.runCommand("ORDER_CONTACT_NUMBER_SAVE");
