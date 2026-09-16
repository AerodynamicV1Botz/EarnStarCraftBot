/*CMD
  command: ORDER_CONTACT_WHATSAPP_SAVE
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
  command: ORDER_CONTACT_WHATSAPP_SAVE
  need_reply: true
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 24 — ORDER_CONTACT_WHATSAPP_SAVE
// WHATSAPP NUMBER VALIDATION + SAVE
// =====================================================


// =====================================================
// 👤 USER ID
// =====================================================

var uid =
  String(user.telegramid);

var rawInput =
  String(message || "").trim();


// =====================================================
// 🔀 ACTIVE CONTACT FLOW
// =====================================================

var activeContactFlow =
  User.getProperty("ACTIVE_CONTACT_FLOW");

if (
  activeContactFlow !== "BUILD" &&
  activeContactFlow !== "ORDER"
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

var userData =
  Bot.getProperty("USER_" + uid);

if (
  !userData ||
  typeof userData !== "object"
) {
  userData = {};
}

var language =
  String(userData.language || "hinglish").toLowerCase();

if (
  language !== "hinglish" &&
  language !== "english" &&
  language !== "gujarati"
) {
  language = "hinglish";
}


// =====================================================
// 📦 LOAD DRAFT
// =====================================================

var draft =
  Bot.getProperty(activeDraftKey);

if (
  !draft ||
  typeof draft !== "object"
) {
  User.setProperty(
    "WAITING_WHATSAPP",
    "no",
    "string"
  );

  Api.sendMessage({
    chat_id: uid,
    text:
      language === "english"
        ? "❌ Contact draft not found. Please start again."
        : language === "gujarati"
          ? "❌ Contact draft મળ્યો નથી. કૃપા કરીને ફરીથી શરૂ કરો."
          : "❌ Contact draft nahi mila. Please dobara start karein."
  });

  return;
}


// =====================================================
// 🧹 DELETE INPUT / OLD PROMPT
// =====================================================

var oldPromptId =
  User.getProperty("WHATSAPP_INPUT_MESSAGE_ID");

if (oldPromptId) {
  try {
    Api.deleteMessage({
      chat_id: uid,
      message_id: oldPromptId
    });
  } catch (error) {}
}

try {
  if (
    typeof request !== "undefined" &&
    request &&
    request.message &&
    request.message.message_id
  ) {
    Api.deleteMessage({
      chat_id: uid,
      message_id: request.message.message_id
    });
  }
} catch (error) {}


// =====================================================
// 🧼 CLEAN NUMBER
// =====================================================

var cleanNumber =
  rawInput.replace(
    /[\s\-\(\)]/g,
    ""
  );


// =====================================================
// 🔢 NUMBER NORMALIZATION
// India-first logic
// =====================================================

var normalizedNumber = "";

if (
  cleanNumber.charAt(0) === "+"
) {
  normalizedNumber =
    cleanNumber;

} else if (
  cleanNumber.indexOf("00") === 0
) {
  normalizedNumber =
    "+" + cleanNumber.substring(2);

} else if (
  cleanNumber.indexOf("91") === 0 &&
  cleanNumber.length === 12
) {
  normalizedNumber =
    "+" + cleanNumber;

} else if (
  cleanNumber.length === 10 &&
  /^[6-9][0-9]{9}$/.test(cleanNumber)
) {
  normalizedNumber =
    "+91" + cleanNumber;

} else {
  normalizedNumber =
    "+" + cleanNumber;
}


// =====================================================
// ✅ VALIDATION
// =====================================================

var validNumber = true;

if (
  !normalizedNumber ||
  normalizedNumber.charAt(0) !== "+"
) {
  validNumber = false;
}

var digits =
  normalizedNumber.substring(1);

if (
  digits.length < 10 ||
  digits.length > 15
) {
  validNumber = false;
}

if (
  !/^[0-9]+$/.test(digits)
) {
  validNumber = false;
}

// Reject invalid Indian mobile number
if (
  digits.length === 12 &&
  digits.indexOf("91") === 0 &&
  !/^[6-9][0-9]{9}$/.test(
    digits.substring(2)
  )
) {
  validNumber = false;
}


// =====================================================
// ❌ INVALID NUMBER
// =====================================================

if (!validNumber) {

  var invalidText = "";

  if (language === "english") {

    invalidText =
      "❌ Invalid WhatsApp number.\n\n" +
      "Enter a valid number with country code.\n\n" +
      "Example: +919876543210";

  } else if (language === "gujarati") {

    invalidText =
      "❌ WhatsApp number ખોટો છે.\n\n" +
      "Country code સાથે valid number enter કરો.\n\n" +
      "Example: +919876543210";

  } else {

    invalidText =
      "❌ WhatsApp number galat hai.\n\n" +
      "Country code ke saath valid number enter karo.\n\n" +
      "Example: +919876543210";

  }

  var invalidMessage =
    Api.sendMessage({
      chat_id: uid,
      text: invalidText,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🔁 Try Again",
              callback_data: "ORDER_CONTACT_WHATSAPP"
            }
          ],
          [
            {
              text: language === "gujarati"
                ? "🔙 પાછા"
                : "🔙 Back",
              callback_data:
                activeContactFlow === "BUILD"
                  ? "BUILD_CONTACT_MENU"
                  : "ORDER_CONTACT_MENU"
            }
          ]
        ]
      }
    });

  if (
    invalidMessage &&
    invalidMessage.result &&
    invalidMessage.result.message_id
  ) {
    User.setProperty(
      "INVALID_WHATSAPP_MESSAGE_ID",
      String(invalidMessage.result.message_id),
      "string"
    );
  }

  return;
}


// =====================================================
// 📞 SAVE TO DRAFT
// =====================================================

if (
  !draft.contacts ||
  typeof draft.contacts !== "object"
) {
  draft.contacts = {};
}

draft.contacts.whatsapp =
  normalizedNumber;

draft.stage =
  "contact_menu";


// IMPORTANT:
// Existing packageStep is preserved.
// Do not overwrite package hierarchy.

if (!draft.userId) {
  draft.userId = uid;
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
// 💾 SAVE PERMANENT CONTACT
// =====================================================

var savedContactKey =
  "USER_CONTACTS_" + uid;

var savedContacts =
  Bot.getProperty(savedContactKey);

if (
  !savedContacts ||
  typeof savedContacts !== "object"
) {
  savedContacts = {};
}

savedContacts.whatsapp =
  normalizedNumber;

Bot.setProperty(
  savedContactKey,
  savedContacts,
  "json"
);


// =====================================================
// 🔗 WHATSAPP LINK
// =====================================================

var whatsappLink =
  "https://wa.me/" +
  normalizedNumber.substring(1);


// =====================================================
// 🧹 CLEAR STATES
// =====================================================

User.setProperty(
  "WAITING_WHATSAPP",
  "no",
  "string"
);

User.setProperty(
  "WHATSAPP_INPUT_MESSAGE_ID",
  "",
  "string"
);

User.setProperty(
  "INVALID_WHATSAPP_MESSAGE_ID",
  "",
  "string"
);


// =====================================================
// ✅ SUCCESS MESSAGE — NO BUTTON
// =====================================================

var successText = "";

if (language === "english") {

  successText =
    "✅ WhatsApp number saved successfully.\n\n" +
    "📞 Number: <code>" +
    normalizedNumber +
    "</code>\n\n" +
    "🔗 WhatsApp link:\n" +
    "<code>" +
    whatsappLink +
    "</code>";

} else if (language === "gujarati") {

  successText =
    "✅ WhatsApp number save થઈ ગયો.\n\n" +
    "📞 Number: <code>" +
    normalizedNumber +
    "</code>\n\n" +
    "🔗 WhatsApp link:\n" +
    "<code>" +
    whatsappLink +
    "</code>";

} else {

  successText =
    "✅ WhatsApp number save ho gaya.\n\n" +
    "📞 Number: <code>" +
    normalizedNumber +
    "</code>\n\n" +
    "🔗 WhatsApp link:\n" +
    "<code>" +
    whatsappLink +
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

if (activeContactFlow === "BUILD") {

  Bot.runCommand(
    "BUILD_CONTACT_MENU"
  );

} else {

  Bot.runCommand(
    "ORDER_CONTACT_MENU"
  );

}
