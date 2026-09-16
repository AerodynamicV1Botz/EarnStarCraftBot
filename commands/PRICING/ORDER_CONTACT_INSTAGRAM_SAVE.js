/*CMD
  command: ORDER_CONTACT_INSTAGRAM_SAVE
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
  command: ORDER_CONTACT_INSTAGRAM_SAVE
  need_reply: true
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 22 — ORDER_CONTACT_INSTAGRAM_SAVE
// CLIENT → SAVE INSTAGRAM CONTACT
// ORDER + BUILD COMPATIBLE
// =====================================================

var uid = String(user.telegramid);

// =====================================================
// 📩 CORRECT MESSAGE TEXT
// =====================================================

var inputText = "";

if (
  typeof message !== "undefined" &&
  message &&
  typeof message === "object" &&
  message.text
) {
  inputText = String(message.text).trim();
} else if (
  typeof request !== "undefined" &&
  request &&
  request.message &&
  request.message.text
) {
  inputText = String(request.message.text).trim();
} else if (
  typeof message !== "undefined" &&
  typeof message === "string"
) {
  inputText = String(message).trim();
}

// =====================================================
// 🔀 ACTIVE FLOW
// =====================================================

var flow = String(
  User.getProperty("ACTIVE_CONTACT_FLOW") || "ORDER"
).toUpperCase();

var isBuild = flow === "BUILD";

var draftKey = isBuild
  ? "BUILD_ENQUIRY_" + uid
  : "ORDER_" + uid;

// =====================================================
// 📦 LOAD DRAFT
// =====================================================

var draft = Bot.getProperty(draftKey);

if (!draft || typeof draft !== "object") {
  User.setProperty("WAITING_INSTAGRAM", "", "string");

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

deleteMessageSafe(
  uid,
  User.getProperty("INSTAGRAM_INPUT_MESSAGE_ID")
);

deleteMessageSafe(
  uid,
  User.getProperty("INVALID_INSTAGRAM_MESSAGE_ID")
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
// ❌ EMPTY INPUT
// =====================================================

if (!inputText) {
  var emptyText = "";

  if (language === "english") {
    emptyText =
      "⚠️ Please enter your Instagram username or profile link.";
  } else if (language === "gujarati") {
    emptyText =
      "⚠️ કૃપા કરીને Instagram username અથવા profile link મોકલો.";
  } else {
    emptyText =
      "⚠️ Instagram username ya profile link bhejo.";
  }

  var emptyMessage = Api.sendMessage({
    chat_id: uid,
    text: emptyText,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🔁 Try Again",
            callback_data: "ORDER_CONTACT_INSTAGRAM"
          }
        ],
        [
          {
            text: isBuild ? "🔙 Back" : "🔙 Back",
            callback_data: isBuild
              ? "BUILD_CONTACT_MENU"
              : "ORDER_CONTACT_MENU"
          }
        ]
      ]
    }
  });

  if (emptyMessage && emptyMessage.message_id) {
    User.setProperty(
      "INVALID_INSTAGRAM_MESSAGE_ID",
      String(emptyMessage.message_id),
      "string"
    );
  }

  User.setProperty("WAITING_INSTAGRAM", "", "string");
  return;
}

// =====================================================
// 🔍 INPUT VALIDATION
// =====================================================

var rawInput = inputText;
var lowerInput = rawInput.toLowerCase();

var savedInstagram = "";
var isInstagramLink = false;

// =====================================================
// 🔗 INSTAGRAM LINK
// =====================================================

if (
  lowerInput.indexOf("https://instagram.com/") === 0 ||
  lowerInput.indexOf("https://www.instagram.com/") === 0 ||
  lowerInput.indexOf("http://instagram.com/") === 0 ||
  lowerInput.indexOf("http://www.instagram.com/") === 0 ||
  lowerInput.indexOf("instagram.com/") === 0 ||
  lowerInput.indexOf("www.instagram.com/") === 0
) {
  isInstagramLink = true;

  var linkInput = rawInput;

  if (
    linkInput.indexOf("https://") !== 0 &&
    linkInput.indexOf("http://") !== 0
  ) {
    linkInput = "https://" + linkInput;
  }

  linkInput = linkInput.replace(
    /^http:\/\//i,
    "https://"
  );

  linkInput = linkInput.replace(
    /^https:\/\/www\.instagram\.com\//i,
    "https://instagram.com/"
  );

  var linkForValidation = linkInput.replace(
    /\/+$/,
    ""
  );

  var usernameFromLink = linkForValidation.replace(
    /^https:\/\/instagram\.com\//i,
    ""
  );

  if (
    !usernameFromLink ||
    usernameFromLink.length > 30 ||
    !/^[A-Za-z0-9._]+$/.test(usernameFromLink) ||
    usernameFromLink.charAt(0) === "." ||
    usernameFromLink.charAt(usernameFromLink.length - 1) === "." ||
    usernameFromLink.indexOf("..") !== -1
  ) {
    var invalidLinkMessage = Api.sendMessage({
      chat_id: uid,
      text:
        "❌ <b>Invalid Instagram link.</b>\n\n" +
        "Example:\n" +
        "<code>https://instagram.com/veer123</code>",
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🔁 Try Again",
              callback_data: "ORDER_CONTACT_INSTAGRAM"
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

    if (invalidLinkMessage && invalidLinkMessage.message_id) {
      User.setProperty(
        "INVALID_INSTAGRAM_MESSAGE_ID",
        String(invalidLinkMessage.message_id),
        "string"
      );
    }

    User.setProperty("WAITING_INSTAGRAM", "", "string");
    return;
  }

  savedInstagram = linkInput;
}

// =====================================================
// 👤 INSTAGRAM USERNAME
// =====================================================

else {
  var usernameInput = rawInput.replace(/^@+/, "");

  if (
    !usernameInput ||
    usernameInput.length > 30 ||
    !/^[A-Za-z0-9._]+$/.test(usernameInput) ||
    usernameInput.charAt(0) === "." ||
    usernameInput.charAt(usernameInput.length - 1) === "." ||
    usernameInput.indexOf("..") !== -1
  ) {
    var invalidUsernameMessage = Api.sendMessage({
      chat_id: uid,
      text:
        "❌ <b>Invalid Instagram username.</b>\n\n" +
        "Valid examples:\n" +
        "• <code>veer123</code>\n" +
        "• <code>@veer123</code>\n" +
        "• <code>veer.123</code>",
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🔁 Try Again",
              callback_data: "ORDER_CONTACT_INSTAGRAM"
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
      invalidUsernameMessage &&
      invalidUsernameMessage.message_id
    ) {
      User.setProperty(
        "INVALID_INSTAGRAM_MESSAGE_ID",
        String(invalidUsernameMessage.message_id),
        "string"
      );
    }

    User.setProperty("WAITING_INSTAGRAM", "", "string");
    return;
  }

  savedInstagram = "@" + usernameInput;
}

// =====================================================
// 💾 SAVE DRAFT CONTACT
// =====================================================

if (!draft.contacts || typeof draft.contacts !== "object") {
  draft.contacts = {};
}

draft.contacts.instagram = savedInstagram;

// =====================================================
// 👤 SAVE TELEGRAM PROFILE
// =====================================================

if (!draft.telegramProfile) {
  draft.telegramProfile = {};
}

draft.telegramProfile.id = uid;

if (user.username) {
  draft.telegramProfile.username = String(user.username);
}

if (user.first_name) {
  draft.telegramProfile.firstName = String(user.first_name);
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
var savedContacts = Bot.getProperty(contactKey) || {};

if (!savedContacts || typeof savedContacts !== "object") {
  savedContacts = {};
}

savedContacts.instagram = savedInstagram;

Bot.setProperty(
  contactKey,
  savedContacts,
  "json"
);

// =====================================================
// 🧹 CLEAR STATES
// =====================================================

User.setProperty(
  "WAITING_INSTAGRAM",
  "",
  "string"
);

User.setProperty(
  "WAITING_INSTAGRAM_" + uid,
  "",
  "string"
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
// ✅ SUCCESS
// =====================================================

var successText = "";

if (language === "english") {
  successText =
    "✅ <b>Instagram contact saved successfully.</b>\n\n" +
    "📸 Instagram: <code>" +
    savedInstagram +
    "</code>";
} else if (language === "gujarati") {
  successText =
    "✅ <b>Instagram contact successfully save થયું.</b>\n\n" +
    "📸 Instagram: <code>" +
    savedInstagram +
    "</code>";
} else {
  successText =
    "✅ <b>Instagram contact save ho gaya.</b>\n\n" +
    "📸 Instagram: <code>" +
    savedInstagram +
    "</code>";
}

Api.sendMessage({
  chat_id: uid,
  text: successText,
  parse_mode: "HTML"
});

// =====================================================
// 🔙 RETURN CONTACT MENU
// =====================================================

if (isBuild) {
  Bot.runCommand("BUILD_CONTACT_MENU");
} else {
  Bot.runCommand("ORDER_CONTACT_MENU");
}
