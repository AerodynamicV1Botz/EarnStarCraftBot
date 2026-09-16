/*CMD
  command: ORDER_CONTACT_EMAIL
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
  command: ORDER_CONTACT_EMAIL
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 25 — ORDER_CONTACT_EMAIL
// CLIENT → EMAIL INPUT MENU
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
    // Telegram delete failure ignored intentionally
  }
}

// =====================================================
// ACTIVE FLOW
// =====================================================

var flow = String(
  User.getProperty("ACTIVE_CONTACT_FLOW") || "ORDER"
).toUpperCase();

if (flow !== "ORDER" && flow !== "BUILD") {
  flow = "ORDER";
}

// =====================================================
// CORRECT DRAFT KEY
// =====================================================

var draftKey = "";

if (flow === "BUILD") {
  draftKey = "BUILD_ORDER_DRAFT_" + uid;
} else {
  draftKey = "ORDER_" + uid;
}

// =====================================================
// LOAD DRAFT
// =====================================================

var draft = Bot.getProperty(draftKey);

if (
  !draft ||
  typeof draft !== "object" ||
  Array.isArray(draft)
) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>Active order request nahi mila.</b>\n\n" +
      "Please contact menu dobara open karein.",
    parse_mode: "HTML"
  });

  User.setProperty("WAITING_EMAIL", "", "string");
  return;
}

// =====================================================
// DELETE OLD PROMPT ONLY
// =====================================================

safeDeleteMessage(
  User.getProperty("EMAIL_INPUT_MESSAGE_ID")
);

safeDeleteMessage(
  User.getProperty("INVALID_EMAIL_MESSAGE_ID")
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
// LANGUAGE
// =====================================================

var profile = Bot.getProperty("USER_" + uid);

if (
  !profile ||
  typeof profile !== "object" ||
  Array.isArray(profile)
) {
  profile = {};
}

var language = String(
  profile.language || "hinglish"
).toLowerCase();

if (
  language !== "hinglish" &&
  language !== "english" &&
  language !== "gujarati"
) {
  language = "hinglish";
}

// =====================================================
// PROMPT TEXT
// =====================================================

var promptText = "";
var backText = "🔙 Back";

if (language === "english") {
  promptText =
    "📧 <b>Add Email Address</b>\n\n" +
    "Please enter your email address.\n\n" +
    "Example: <code>example@gmail.com</code>\n\n" +
    "Your email will be saved for contact purposes.";
} else if (language === "gujarati") {
  promptText =
    "📧 <b>ઈમેલ એડ્રેસ ઉમેરો</b>\n\n" +
    "તમારું ઈમેલ એડ્રેસ મોકલો.\n\n" +
    "ઉદાહરણ: <code>example@gmail.com</code>\n\n" +
    "તમારું ઈમેલ માત્ર સંપર્ક માટે સેવ થશે.";
} else {
  promptText =
    "📧 <b>Email Address Add Karo</b>\n\n" +
    "Apna email address bhejo.\n\n" +
    "Example: <code>example@gmail.com</code>\n\n" +
    "Email sirf contact purpose ke liye save hoga.";
}

// =====================================================
// BACK COMMAND
// =====================================================

var backCommand = "ORDER_CONTACT_MENU";

if (flow === "BUILD") {
  backCommand = "BUILD_CONTACT_MENU";
}

// =====================================================
// SAVE STAGE
// =====================================================

draft.stage = "email_contact";
draft.updatedAt = new Date().toISOString();

Bot.setProperty(
  draftKey,
  draft,
  "json"
);

User.setProperty(
  "WAITING_EMAIL",
  "yes",
  "string"
);

// =====================================================
// SEND PROMPT
// =====================================================

var sent = null;

try {
  sent = Api.sendMessage({
    chat_id: uid,
    text: promptText,
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
// SAVE PROMPT ID
// =====================================================

if (sent && sent.message_id) {
  User.setProperty(
    "EMAIL_INPUT_MESSAGE_ID",
    String(sent.message_id),
    "string"
  );
}

// =====================================================
// WAIT FOR EMAIL
// =====================================================

Bot.runCommand("ORDER_CONTACT_EMAIL_SAVE");
