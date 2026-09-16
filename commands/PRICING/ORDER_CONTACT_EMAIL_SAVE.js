/*CMD
  command: ORDER_CONTACT_EMAIL_SAVE
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
  command: ORDER_CONTACT_EMAIL_SAVE
  need_reply: true
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 26 — ORDER_CONTACT_EMAIL_SAVE
// CLIENT → SAVE EMAIL ADDRESS
// ORDER + BUILD COMPATIBLE
// =====================================================

var uid = String(user.telegramid);

// =====================================================
// 📩 READ EMAIL CORRECTLY
// =====================================================

var email = "";

if (
  typeof message !== "undefined" &&
  message &&
  typeof message === "object" &&
  message.text
) {
  email = String(message.text).trim().toLowerCase();
} else if (
  typeof request !== "undefined" &&
  request &&
  request.message &&
  request.message.text
) {
  email = String(request.message.text).trim().toLowerCase();
} else if (
  typeof message !== "undefined" &&
  typeof message === "string"
) {
  email = String(message).trim().toLowerCase();
}

// =====================================================
// 🔀 ACTIVE FLOW
// =====================================================

var flow = String(
  User.getProperty("ACTIVE_CONTACT_FLOW") || "ORDER"
).toUpperCase();

if (flow !== "BUILD" && flow !== "ORDER") {
  flow = "ORDER";
}

var isBuild = flow === "BUILD";

var draftKey = isBuild
  ? "BUILD_ENQUIRY_" + uid
  : "ORDER_" + uid;

// =====================================================
// 📦 LOAD ACTIVE DRAFT
// =====================================================

var draft = Bot.getProperty(draftKey);

if (!draft || typeof draft !== "object") {
  User.setProperty("WAITING_EMAIL", "", "string");
  User.setProperty("EMAIL_INPUT_MESSAGE_ID", "", "string");

  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>Active request nahi mila.</b>\n\n" +
      "Please contact menu dobara open karo.",
    parse_mode: "HTML"
  });

  if (isBuild) {
    Bot.runCommand("MENU_BUILD");
  } else {
    Bot.runCommand("MAIN_MENU");
  }

  return;
}

// =====================================================
// 🧹 SAFE DELETE
// =====================================================

function deleteMessageSafe(chatId, messageId) {
  if (!messageId) {
    return;
  }

  try {
    Api.deleteMessage({
      chat_id: chatId,
      message_id: Number(messageId)
    });
  } catch (e) {}
}

if (
  typeof request !== "undefined" &&
  request &&
  request.message &&
  request.message.message_id
) {
  deleteMessageSafe(
    uid,
    request.message.message_id
  );
}

deleteMessageSafe(
  uid,
  User.getProperty("EMAIL_INPUT_MESSAGE_ID")
);

deleteMessageSafe(
  uid,
  User.getProperty("INVALID_EMAIL_MESSAGE_ID")
);

// =====================================================
// 🌐 LANGUAGE
// =====================================================

var profile = Bot.getProperty("USER_" + uid) || {};

var language = String(
  profile.language || "hinglish"
).toLowerCase();

if (
  language !== "english" &&
  language !== "gujarati" &&
  language !== "hinglish"
) {
  language = "hinglish";
}

// =====================================================
// 📧 EMAIL VALIDATION
// =====================================================

var isValidEmail = true;

if (!email) {
  isValidEmail = false;
}

if (
  email.length < 6 ||
  email.length > 254
) {
  isValidEmail = false;
}

if (email.indexOf(" ") !== -1) {
  isValidEmail = false;
}

var atCount = 0;
var i;

for (i = 0; i < email.length; i++) {
  if (email.charAt(i) === "@") {
    atCount++;
  }
}

if (atCount !== 1) {
  isValidEmail = false;
}

var parts = email.split("@");

var localPart = "";
var domainPart = "";

if (parts.length === 2) {
  localPart = parts[0];
  domainPart = parts[1];
}

if (!localPart || !domainPart) {
  isValidEmail = false;
}

if (localPart.length > 64) {
  isValidEmail = false;
}

if (
  localPart.charAt(0) === "." ||
  localPart.charAt(localPart.length - 1) === "."
) {
  isValidEmail = false;
}

if (
  domainPart.charAt(0) === "." ||
  domainPart.charAt(domainPart.length - 1) === "."
) {
  isValidEmail = false;
}

if (email.indexOf("..") !== -1) {
  isValidEmail = false;
}

var emailPattern =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+$/;

if (!emailPattern.test(email)) {
  isValidEmail = false;
}

// =====================================================
// ❌ INVALID EMAIL
// =====================================================

if (!isValidEmail) {
  var retryText = "";

  if (language === "english") {
    retryText =
      "❌ <b>Invalid email address</b>\n\n" +
      "Please enter a valid email.\n\n" +
      "Example: <code>example@gmail.com</code>";
  } else if (language === "gujarati") {
    retryText =
      "❌ <b>ઈમેલ ખોટું છે</b>\n\n" +
      "કૃપા કરીને સાચું ઈમેલ એડ્રેસ મોકલો.\n\n" +
      "ઉદાહરણ: <code>example@gmail.com</code>";
  } else {
    retryText =
      "❌ <b>Invalid email address</b>\n\n" +
      "Please valid email bhejo.\n\n" +
      "Example: <code>example@gmail.com</code>";
  }

  var retryMessage = Api.sendMessage({
    chat_id: uid,
    text: retryText,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🔁 Try Again",
            callback_data: "ORDER_CONTACT_EMAIL"
          }
        ],
        [
          {
            text: "🔙 Back",
            callback_data: isBuild
              ? "BUILD_CONTACT_MENU"
              : "ORDER_CONTACT_MENU"
          }
        ]
      ]
    }
  });

  if (
    retryMessage &&
    retryMessage.message_id
  ) {
    User.setProperty(
      "INVALID_EMAIL_MESSAGE_ID",
      String(retryMessage.message_id),
      "string"
    );
  }

  User.setProperty(
    "WAITING_EMAIL",
    "",
    "string"
  );

  return;
}

// =====================================================
// 📞 CONTACT OBJECT
// =====================================================

if (
  !draft.contacts ||
  typeof draft.contacts !== "object"
) {
  draft.contacts = {};
}

draft.contacts.telegram =
  draft.contacts.telegram || "";

draft.contacts.otherNumber =
  draft.contacts.otherNumber || "";

draft.contacts.instagram =
  draft.contacts.instagram || "";

draft.contacts.whatsapp =
  draft.contacts.whatsapp || "";

draft.contacts.email = email;

// =====================================================
// 👤 TELEGRAM PROFILE
// =====================================================

if (
  !draft.telegramProfile ||
  typeof draft.telegramProfile !== "object"
) {
  draft.telegramProfile = {};
}

draft.telegramProfile.id = uid;

if (user.username) {
  draft.telegramProfile.username =
    String(user.username);
}

if (user.first_name) {
  draft.telegramProfile.firstName =
    String(user.first_name);
}

draft.userId = draft.userId || uid;
draft.stage = "contact_menu";
draft.updatedAt = new Date().toISOString();

// =====================================================
// 💾 SAVE ACTIVE DRAFT
// =====================================================

Bot.setProperty(
  draftKey,
  draft,
  "json"
);

// =====================================================
// 💾 SAVE PERMANENT CONTACT
// =====================================================

var contactKey = "USER_CONTACTS_" + uid;

var savedContacts =
  Bot.getProperty(contactKey) || {};

if (
  !savedContacts ||
  typeof savedContacts !== "object"
) {
  savedContacts = {};
}

savedContacts.telegram =
  savedContacts.telegram || "";

savedContacts.otherNumber =
  savedContacts.otherNumber || "";

savedContacts.instagram =
  savedContacts.instagram || "";

savedContacts.whatsapp =
  savedContacts.whatsapp || "";

savedContacts.email = email;

Bot.setProperty(
  contactKey,
  savedContacts,
  "json"
);

// =====================================================
// 🧹 CLEAR STATES
// =====================================================

User.setProperty(
  "WAITING_EMAIL",
  "",
  "string"
);

User.setProperty(
  "EMAIL_INPUT_MESSAGE_ID",
  "",
  "string"
);

User.setProperty(
  "INVALID_EMAIL_MESSAGE_ID",
  "",
  "string"
);

// =====================================================
// ✅ SUCCESS MESSAGE
// =====================================================

var successText = "";

if (language === "english") {
  successText =
    "✅ <b>Email saved successfully.</b>\n\n" +
    "📧 Email: <code>" +
    email +
    "</code>";
} else if (language === "gujarati") {
  successText =
    "✅ <b>ઈમેલ સફળતાપૂર્વક સેવ થઈ ગયું.</b>\n\n" +
    "📧 ઈમેલ: <code>" +
    email +
    "</code>";
} else {
  successText =
    "✅ <b>Email save ho gaya.</b>\n\n" +
    "📧 Email: <code>" +
    email +
    "</code>";
}

Api.sendMessage({
  chat_id: uid,
  text: successText,
  parse_mode: "HTML"
});

// =====================================================
// 🔙 RETURN TO CONTACT MENU
// =====================================================

if (isBuild) {
  Bot.runCommand("BUILD_CONTACT_MENU");
} else {
  Bot.runCommand("ORDER_CONTACT_MENU");
}
