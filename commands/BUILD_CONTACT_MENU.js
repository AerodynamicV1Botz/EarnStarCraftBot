/*CMD
  command: BUILD_CONTACT_MENU
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
  command: BUILD_CONTACT_MENU
  need_reply: false
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 197 — BUILD_CONTACT_MENU
// BUILD ENQUIRY → CONTACT DETAILS MENU
//
// ORDER CONTACT MENU JESA SAME LAYOUT
// Difference:
// - Custom Bot Enquiry header
// - Requirements shown inside blockquote
// - BUILD_CONTACT_CONTINUE
// - BUILD_DRAFT_CANCEL
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
// 👤 USER DATA
// =====================================================

var uid =
  String(user.telegramid);

var firstName =
  String(user.first_name || "");

var lastName =
  String(user.last_name || "");

var fullName =
  firstName +
  (lastName ? " " + lastName : "");


// =====================================================
// 🔐 ACTIVE CONTACT FLOW
// =====================================================

User.setProperty(
  "ACTIVE_CONTACT_FLOW",
  "BUILD",
  "string"
);


// =====================================================
// 🌐 LANGUAGE
// =====================================================

var userData =
  Bot.getProperty("USER_" + uid);

if (
  !userData ||
  typeof userData !== "object"
) {
  userData = {};
}

var language =
  String(
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
// 🛡️ HTML SAFE TEXT
// =====================================================

function safeText(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


// =====================================================
// 📦 LOAD BUILD ENQUIRY
// =====================================================

var enquiryKey =
  "BUILD_ENQUIRY_" + uid;

var enquiry =
  Bot.getProperty(enquiryKey);


// =====================================================
// ⛔ ENQUIRY NOT FOUND
// =====================================================

if (
  !enquiry ||
  typeof enquiry !== "object"
) {
  var noEnquiryText = "";

  if (language === "english") {
    noEnquiryText =
      "❌ <b>Enquiry not found.</b>\n\n" +
      "Please start your Build Enquiry again.";
  } else if (language === "gujarati") {
    noEnquiryText =
      "❌ <b>Enquiry મળી નથી.</b>\n\n" +
      "કૃપા કરીને Build Enquiry ફરીથી શરૂ કરો.";
  } else {
    noEnquiryText =
      "❌ <b>Aapki enquiry nahi mili.</b>\n\n" +
      "Please Build Enquiry dobara start karein.";
  }

  Api.sendMessage({
    chat_id: uid,
    text: noEnquiryText,
    parse_mode: "HTML"
  });

  Bot.runCommand("MENU_BUILD");
  return;
}


// =====================================================
// 📦 NORMALIZE ENQUIRY DATA
// =====================================================

enquiry.userId =
  String(enquiry.userId || uid);

enquiry.userName =
  String(
    enquiry.userName ||
    enquiry.fullName ||
    fullName ||
    "Telegram User"
  );

enquiry.username =
  String(enquiry.username || "");

enquiry.language =
  language;

enquiry.enquiryType =
  String(
    enquiry.enquiryType ||
    "custom_bot"
  );

enquiry.packageType =
  String(
    enquiry.packageType ||
    "custom"
  );

enquiry.packageName =
  String(
    enquiry.packageName ||
    "Custom Bot"
  );

enquiry.status =
  String(
    enquiry.status ||
    "draft"
  );

enquiry.stage =
  "contact_menu";

enquiry.updatedAt =
  new Date().toISOString();


// =====================================================
// 📝 REQUIREMENTS
// =====================================================

var requirementsText = "";

if (
  enquiry.requirements &&
  typeof enquiry.requirements === "object"
) {
  requirementsText =
    String(
      enquiry.requirements.description ||
      enquiry.requirements.fullMessage ||
      ""
    ).trim();
}

if (!requirementsText) {
  requirementsText = "Not submitted";
}


// =====================================================
// 📞 ENSURE CONTACT OBJECT
// =====================================================

if (
  !enquiry.contacts ||
  typeof enquiry.contacts !== "object"
) {
  enquiry.contacts = {};
}

enquiry.contacts.telegram =
  String(
    enquiry.contacts.telegram || ""
  );

enquiry.contacts.otherNumber =
  String(
    enquiry.contacts.otherNumber || ""
  );

enquiry.contacts.instagram =
  String(
    enquiry.contacts.instagram || ""
  );

enquiry.contacts.whatsapp =
  String(
    enquiry.contacts.whatsapp || ""
  );

enquiry.contacts.email =
  String(
    enquiry.contacts.email || ""
  );


// =====================================================
// 💾 LOAD SAVED CONTACTS
// =====================================================

var permanentContactKey =
  "USER_CONTACTS_" + uid;

var savedContacts =
  Bot.getProperty(permanentContactKey);

if (
  !savedContacts ||
  typeof savedContacts !== "object"
) {
  savedContacts = {};
}

savedContacts.telegram =
  String(
    savedContacts.telegram || ""
  );

savedContacts.otherNumber =
  String(
    savedContacts.otherNumber || ""
  );

savedContacts.instagram =
  String(
    savedContacts.instagram || ""
  );

savedContacts.whatsapp =
  String(
    savedContacts.whatsapp || ""
  );

savedContacts.email =
  String(
    savedContacts.email || ""
  );


// =====================================================
// 🔄 COPY SAVED CONTACTS INTO ENQUIRY
// Existing enquiry value overwrite nahi hoga
// =====================================================

if (
  !enquiry.contacts.telegram.trim() &&
  savedContacts.telegram.trim()
) {
  enquiry.contacts.telegram =
    savedContacts.telegram;
}

if (
  !enquiry.contacts.otherNumber.trim() &&
  savedContacts.otherNumber.trim()
) {
  enquiry.contacts.otherNumber =
    savedContacts.otherNumber;
}

if (
  !enquiry.contacts.instagram.trim() &&
  savedContacts.instagram.trim()
) {
  enquiry.contacts.instagram =
    savedContacts.instagram;
}

if (
  !enquiry.contacts.whatsapp.trim() &&
  savedContacts.whatsapp.trim()
) {
  enquiry.contacts.whatsapp =
    savedContacts.whatsapp;
}

if (
  !enquiry.contacts.email.trim() &&
  savedContacts.email.trim()
) {
  enquiry.contacts.email =
    savedContacts.email;
}


// =====================================================
// 📊 COUNT MAIN CONTACTS
// Email optional hai
// =====================================================

var contactCount = 0;

if (
  enquiry.contacts.telegram.trim()
) {
  contactCount++;
}

if (
  enquiry.contacts.otherNumber.trim()
) {
  contactCount++;
}

if (
  enquiry.contacts.instagram.trim()
) {
  contactCount++;
}

if (
  enquiry.contacts.whatsapp.trim()
) {
  contactCount++;
}


// =====================================================
// 👤 CLIENT MENTION
// =====================================================

var displayName =
  String(
    enquiry.userName ||
    fullName ||
    "Telegram User"
  ).trim();

if (!displayName) {
  displayName = "Telegram User";
}

var mention =
  "<a href=\"tg://user?id=" +
  safeText(uid) +
  "\">" +
  safeText(displayName) +
  "</a>";


// =====================================================
// 📱 CONTACT DISPLAY VALUES
// =====================================================

var telegramDisplay =
  enquiry.contacts.telegram.trim()
    ? safeText(enquiry.contacts.telegram)
    : "➕ Add";

var numberDisplay =
  enquiry.contacts.otherNumber.trim()
    ? safeText(enquiry.contacts.otherNumber)
    : "➕ Add";

var instagramDisplay =
  enquiry.contacts.instagram.trim()
    ? safeText(enquiry.contacts.instagram)
    : "➕ Add";

var whatsappDisplay =
  enquiry.contacts.whatsapp.trim()
    ? safeText(enquiry.contacts.whatsapp)
    : "➕ Add";

var emailDisplay =
  enquiry.contacts.email.trim()
    ? safeText(enquiry.contacts.email)
    : "➕ Add";


// =====================================================
// 📊 CONTACT COUNT TEXT
// =====================================================

var countText = "";

if (language === "english") {
  countText =
    "📊 <b>Main Contacts:</b> " +
    contactCount +
    "/4";
} else if (language === "gujarati") {
  countText =
    "📊 <b>Main Contacts:</b> " +
    contactCount +
    "/4";
} else {
  countText =
    "📊 <b>Main Contacts:</b> " +
    contactCount +
    "/4";
}


// =====================================================
// 📄 CONTACT TITLE
// =====================================================

var contactTitle = "";

if (language === "english") {
  contactTitle =
    "📞 <b>Contact Details</b>";
} else if (language === "gujarati") {
  contactTitle =
    "📞 <b>Contact Details</b>";
} else {
  contactTitle =
    "📞 <b>Contact Details</b>";
}


// =====================================================
// 📝 REQUIREMENTS TITLE
// =====================================================

var requirementsTitle = "";

if (language === "english") {
  requirementsTitle =
    "📝 <b>Your Requirements</b>";
} else if (language === "gujarati") {
  requirementsTitle =
    "📝 <b>તમારી જરૂરિયાત</b>";
} else {
  requirementsTitle =
    "📝 <b>Aapki Requirements</b>";
}


// =====================================================
// 🛡️ SAFE REQUIREMENTS
// =====================================================

var safeRequirements =
  safeText(requirementsText);


// =====================================================
// 🛡️ SAFE PACKAGE NAME
// =====================================================

var safePackageName =
  safeText(
    enquiry.packageName ||
    "Custom Bot"
  );


// =====================================================
// 📝 FINAL BUILD CONTACT MENU TEXT
// ORDER MENU JESA LAYOUT
// =====================================================

var text =

  "🤖 <b>Custom Bot Enquiry</b>\n\n" +

  requirementsTitle +
  "\n\n" +

  "<blockquote>" +
  safeRequirements +
  "</blockquote>\n\n" +

  "👤 <b>Client:</b> " +
  mention +
  "\n\n" +

  contactTitle +
  "\n\n" +

  "📱 <b>Telegram:</b> " +
  telegramDisplay +
  "\n" +

  "☎️ <b>Other Number:</b> " +
  numberDisplay +
  "\n" +

  "📸 <b>Instagram:</b> " +
  instagramDisplay +
  "\n" +

  "🟢 <b>WhatsApp:</b> " +
  whatsappDisplay +
  "\n" +

  "📧 <b>Email:</b> " +
  emailDisplay +
  "\n\n" +

  countText;


// =====================================================
// 🔘 BUTTON TEXT
// =====================================================

var continueText = "";
var cancelText = "";

if (language === "english") {
  continueText = "➡️ Continue";
  cancelText = "❌ Cancel Enquiry";
} else if (language === "gujarati") {
  continueText = "➡️ Continue";
  cancelText = "❌ Enquiry Cancel કરો";
} else {
  continueText = "➡️ Continue";
  cancelText = "❌ Cancel Enquiry";
}


// =====================================================
// 🔘 SAME CONTACT BUTTONS AS ORDER MENU
// =====================================================

var buttons = [

  [
    {
      text: "📱 Telegram",
      callback_data: "ORDER_CONTACT_TELEGRAM"
    },
    {
      text: "☎️ Other Number",
      callback_data: "ORDER_CONTACT_NUMBER"
    }
  ],

  [
    {
      text: "📸 Instagram",
      callback_data: "ORDER_CONTACT_INSTAGRAM"
    },
    {
      text: "🟢 WhatsApp",
      callback_data: "ORDER_CONTACT_WHATSAPP"
    }
  ],

  [
    {
      text: "📧 Email",
      callback_data: "ORDER_CONTACT_EMAIL"
    }
  ],

  [
    {
      text: continueText,
      callback_data: "BUILD_ENQUIRY_SUBMIT"
    },
    {
      text: cancelText,
      callback_data: "BUILD_DRAFT_CANCEL"
    }
  ]

];


// =====================================================
// 💾 SAVE ENQUIRY
// =====================================================

Bot.setProperty(
  enquiryKey,
  enquiry,
  "json"
);


// =====================================================
// 📩 SEND CONTACT MENU
// =====================================================

var sentMessage = null;

try {
  sentMessage =
    Api.sendMessage({
      chat_id: uid,
      text: text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: buttons
      }
    });
} catch (error) {
  sentMessage = null;
}


// =====================================================
// 💾 SAVE MESSAGE ID
// =====================================================

if (
  sentMessage &&
  sentMessage.message_id
) {
  enquiry.contactMenuMessageId =
    String(
      sentMessage.message_id
    );

  enquiry.contactMenuChatId =
    uid;

  enquiry.updatedAt =
    new Date().toISOString();

  Bot.setProperty(
    enquiryKey,
    enquiry,
    "json"
  );
}
