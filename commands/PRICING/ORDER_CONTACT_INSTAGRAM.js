/*CMD
  command: ORDER_CONTACT_INSTAGRAM
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
  command: ORDER_CONTACT_INSTAGRAM
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 21 — ORDER_CONTACT_INSTAGRAM
// CLIENT → INSTAGRAM INPUT MENU
// DIRECT PACKAGE + CUSTOM BUILD SUPPORT
// =====================================================

var uid = String(user.telegramid);

// =====================================================
// CALLBACK RESPONSE
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
  } catch (e) {}
}

// =====================================================
// SAFE DELETE
// =====================================================

function safeDeleteMessage(messageId) {
  if (!messageId) {
    return;
  }

  try {
    Api.deleteMessage({
      chat_id: uid,
      message_id: Number(messageId)
    });
  } catch (e) {
    // Ignore Telegram delete errors
  }
}

// =====================================================
// ACTIVE FLOW
// =====================================================

var activeContactFlow = String(
  User.getProperty("ACTIVE_CONTACT_FLOW") || "ORDER"
).toUpperCase();

if (
  activeContactFlow !== "ORDER" &&
  activeContactFlow !== "BUILD"
) {
  activeContactFlow = "ORDER";
}

// =====================================================
// CORRECT DRAFT KEY
// =====================================================

var activeDraftKey = activeContactFlow === "BUILD"
  ? "BUILD_ORDER_DRAFT_" + uid
  : "ORDER_" + uid;

// =====================================================
// LANGUAGE
// =====================================================

var userData = Bot.getProperty("USER_" + uid);

if (
  !userData ||
  typeof userData !== "object" ||
  Array.isArray(userData)
) {
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
// LOAD DRAFT
// =====================================================

var draft = Bot.getProperty(activeDraftKey);

if (
  !draft ||
  typeof draft !== "object" ||
  Array.isArray(draft)
) {
  User.setProperty("WAITING_INSTAGRAM", "", "string");

  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>Active request draft nahi mila.</b>\n\n" +
      "Please dobara start karein.",
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
// DELETE OLD BOT MESSAGES
// =====================================================

safeDeleteMessage(
  User.getProperty("INSTAGRAM_INPUT_MESSAGE_ID")
);

safeDeleteMessage(
  User.getProperty("INVALID_INSTAGRAM_MESSAGE_ID")
);

User.setProperty(
  "INSTAGRAM_INPUT_MESSAGE_ID",
  "",
  "string"
);

User.setProperty(
  "INVALID_INSTAGRAM_MESSAGE_ID",
  "",
  "string"
);

// =====================================================
// CONTACT OBJECT
// =====================================================

if (
  !draft.contacts ||
  typeof draft.contacts !== "object" ||
  Array.isArray(draft.contacts)
) {
  draft.contacts = {};
}

var savedContacts = Bot.getProperty(
  "USER_CONTACTS_" + uid
);

if (
  !savedContacts ||
  typeof savedContacts !== "object" ||
  Array.isArray(savedContacts)
) {
  savedContacts = {};
}

draft.contacts.telegram =
  String(
    draft.contacts.telegram ||
    savedContacts.telegram ||
    ""
  );

draft.contacts.otherNumber =
  String(
    draft.contacts.otherNumber ||
    savedContacts.otherNumber ||
    ""
  );

draft.contacts.instagram =
  String(
    draft.contacts.instagram ||
    savedContacts.instagram ||
    ""
  );

draft.contacts.whatsapp =
  String(
    draft.contacts.whatsapp ||
    savedContacts.whatsapp ||
    ""
  );

draft.contacts.email =
  String(
    draft.contacts.email ||
    savedContacts.email ||
    ""
  );

// =====================================================
// SAVE STAGE
// =====================================================

draft.userId = String(draft.userId || uid);
draft.stage = "instagram_contact";
draft.updatedAt = new Date().toISOString();

if (activeContactFlow === "ORDER") {
  draft.requestStatus =
    draft.requestStatus || "draft";

  draft.orderStatus =
    draft.orderStatus || "pending_review";

  draft.paymentStatus =
    draft.paymentStatus || "not_requested";
}

if (activeContactFlow === "BUILD") {
  draft.status = draft.status || "draft";
}

Bot.setProperty(
  activeDraftKey,
  draft,
  "json"
);

// =====================================================
// WAITING STATE
// =====================================================

User.setProperty(
  "WAITING_INSTAGRAM",
  "yes",
  "string"
);

// =====================================================
// TEXT
// =====================================================

var askText = "";
var backText = "🔙 Back";

if (language === "english") {
  askText =
    "📸 <b>Submit Instagram</b>\n\n" +
    "Send your Instagram username or profile link.\n\n" +
    "Examples:\n" +
    "<code>@veer123</code>\n" +
    "<code>veer123</code>\n" +
    "<code>https://instagram.com/veer123</code>\n\n" +
    "Spaces and invalid symbols are not accepted.";
} else if (language === "gujarati") {
  askText =
    "📸 <b>Instagram Submit કરો</b>\n\n" +
    "તમારું Instagram username અથવા profile link મોકલો.\n\n" +
    "ઉદાહરણ:\n" +
    "<code>@veer123</code>\n" +
    "<code>veer123</code>\n" +
    "<code>https://instagram.com/veer123</code>\n\n" +
    "Spaces અને invalid symbols accepted નથી.";
} else {
  askText =
    "📸 <b>Instagram Submit Karein</b>\n\n" +
    "Apna Instagram username ya profile link bhejo.\n\n" +
    "Examples:\n" +
    "<code>@veer123</code>\n" +
    "<code>veer123</code>\n" +
    "<code>https://instagram.com/veer123</code>\n\n" +
    "Spaces aur invalid symbols accepted nahi hain.";
}

// =====================================================
// BACK COMMAND
// =====================================================

var backCommand = activeContactFlow === "BUILD"
  ? "BUILD_CONTACT_MENU"
  : "ORDER_CONTACT_MENU";

// =====================================================
// SEND PROMPT
// =====================================================

var sent = null;

try {
  sent = Api.sendMessage({
    chat_id: uid,
    text: askText,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: backText,
            callback_data: backCommand
          }
        ]
      ]
    }
  });
} catch (e) {
  sent = null;
}

// =====================================================
// SAVE MESSAGE ID
// =====================================================

if (sent && sent.message_id) {
  User.setProperty(
    "INSTAGRAM_INPUT_MESSAGE_ID",
    String(sent.message_id),
    "string"
  );
}

// =====================================================
// WAIT FOR INPUT
// =====================================================

Bot.runCommand("ORDER_CONTACT_INSTAGRAM_SAVE");
