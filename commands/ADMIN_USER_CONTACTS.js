/*CMD
  command: ADMIN_USER_CONTACTS
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
  command: ADMIN_USER_CONTACTS
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT — ADMIN_USER_CONTACTS
// ADMIN → USER CONTACT DETAILS
//
// CONTACT SOURCE:
// USER_CONTACTS_<userId>
// USER_<userId>
// ORDER_<userId>.contacts
// ORDER_<orderId>.contacts
// =====================================================


// =====================================================
// 🔐 ADMIN AUTHENTICATION
// =====================================================

var uid = String(user.telegramid);

var ownerId = "7897324623";

var admins = Bot.getProperty("EARNSTAR_ADMINS", []);

if (!Array.isArray(admins)) {
  admins = [];
}

var isAdmin = uid === ownerId;

for (var i = 0; i < admins.length; i++) {
  var adminItem = admins[i];
  var adminId = "";

  if (typeof adminItem === "object" && adminItem !== null) {
    adminId =
      adminItem.id ||
      adminItem.telegramId ||
      adminItem.telegram_id ||
      "";
  } else {
    adminId = String(adminItem);
  }

  if (String(adminId) === uid) {
    isAdmin = true;
    break;
  }
}

if (!isAdmin) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ Access denied",
    show_alert: true
  });

  return;
}


// =====================================================
// 🎯 TARGET USER ID
// =====================================================

var targetId = String(params || "").trim();

if (!targetId) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ User ID missing",
    show_alert: true
  });

  return;
}


// =====================================================
// 🛡️ HELPER FUNCTIONS
// =====================================================

function clean(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

function safeText(value) {
  return clean(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function firstValue() {
  for (var i = 0; i < arguments.length; i++) {
    var value = clean(arguments[i]);

    if (value !== "") {
      return value;
    }
  }

  return "";
}

function showValue(value) {
  return value ? safeText(value) : "Not provided";
}

function validObject(value) {
  return (
    value &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
}


// =====================================================
// 👤 LOAD USER DATA
// =====================================================

var userData = Bot.getProperty("USER_" + targetId);

if (!validObject(userData)) {
  userData = {};
}


// =====================================================
// 📞 LOAD PERMANENT CONTACT DATA
// =====================================================

var savedContacts =
  Bot.getProperty("USER_CONTACTS_" + targetId);

if (!validObject(savedContacts)) {
  savedContacts =
    Bot.getProperty("CONTACTS_" + targetId);
}

if (!validObject(savedContacts)) {
  savedContacts = {};
}


// =====================================================
// 📦 LOAD DIRECT ORDER DATA
// =====================================================

var directOrder =
  Bot.getProperty("ORDER_" + targetId);

if (!validObject(directOrder)) {
  directOrder = {};
}

var orderContacts = directOrder.contacts;

if (!validObject(orderContacts)) {
  orderContacts = {};
}


// =====================================================
// 📞 CONTACT DATA
// =====================================================

// Telegram contact is saved from ORDER_CONTACT_MENU
// inside draft.contacts.telegram

var telegramContact = firstValue(
  orderContacts.telegram,
  savedContacts.telegram,
  savedContacts.telegramUsername,
  savedContacts.username,
  userData.telegram,
  userData.telegramUsername,
  userData.username
);


// Other Number is saved from ORDER_CONTACT_MENU
// inside draft.contacts.otherNumber

var otherNumber = firstValue(
  orderContacts.otherNumber,
  savedContacts.otherNumber,
  savedContacts.other,
  userData.otherNumber,
  userData.other
);


var whatsappNumber = firstValue(
  orderContacts.whatsapp,
  savedContacts.whatsapp,
  savedContacts.whatsappNumber,
  userData.whatsapp,
  userData.whatsappNumber
);


var instagramUsername = firstValue(
  orderContacts.instagram,
  savedContacts.instagram,
  savedContacts.instagramUsername,
  userData.instagram,
  userData.instagramUsername
);


var emailAddress = firstValue(
  orderContacts.email,
  savedContacts.email,
  savedContacts.emailAddress,
  userData.email,
  userData.emailAddress
);


// =====================================================
// 👤 PROFILE DATA
// =====================================================

var firstName = firstValue(
  userData.first_name,
  userData.firstName
);

var lastName = firstValue(
  userData.last_name,
  userData.lastName
);

var fullName = firstValue(
  userData.name,
  userData.fullName,
  (firstName + " " + lastName).trim()
);

if (!fullName) {
  fullName = "Telegram User";
}

var username = firstValue(
  userData.username,
  userData.telegramUsername,
  savedContacts.username,
  savedContacts.telegramUsername
);

var language = firstValue(
  userData.language
);

var registeredAt = firstValue(
  userData.createdAt,
  userData.registeredAt,
  userData.joinedAt
);


// =====================================================
// 🧾 DISPLAY TEXT
// =====================================================

var text =
  "📞 <b>USER CONTACT DETAILS</b>\n\n" +

  "👤 <b>User ID:</b> <code>" +
  safeText(targetId) +
  "</code>\n" +

  "🧑 <b>Name:</b> " +
  showValue(fullName) +
  "\n" +

  "🔗 <b>Username:</b> " +
  (
    username
      ? "@" + safeText(username.replace(/^@/, ""))
      : "Not provided"
  ) +
  "\n" +

  "🌐 <b>Language:</b> " +
  showValue(language) +
  "\n\n" +

  "📱 <b>Telegram Contact:</b>\n" +
  showValue(telegramContact) +
  "\n\n" +

  "☎️ <b>Other Number:</b>\n" +
  showValue(otherNumber) +
  "\n\n" +

  "🟢 <b>WhatsApp:</b>\n" +
  showValue(whatsappNumber) +
  "\n\n" +

  "📸 <b>Instagram:</b>\n" +
  showValue(instagramUsername) +
  "\n\n" +

  "✉️ <b>Email:</b>\n" +
  showValue(emailAddress) +
  "\n\n" +

  "🗓️ <b>Registered:</b>\n" +
  showValue(registeredAt);


// =====================================================
// 🔘 BUTTONS
// =====================================================

var buttons = [];


// Telegram profile
buttons.push([
  {
    text: "👤 Open Telegram Profile",
    url: "tg://user?id=" + encodeURIComponent(targetId)
  }
]);


// WhatsApp
var whatsappValue = firstValue(
  whatsappNumber,
  otherNumber
);

if (whatsappValue) {
  var whatsappClean = whatsappValue
    .replace(/[^\d+]/g, "")
    .replace("+", "");

  if (whatsappClean) {
    buttons.push([
      {
        text: "💬 Open WhatsApp",
        url: "https://wa.me/" +
          encodeURIComponent(whatsappClean)
      }
    ]);
  }
}


// Instagram
if (instagramUsername) {
  var instagramClean = instagramUsername
    .replace(/^@/, "")
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
    .replace(/\/.*$/, "");

  if (instagramClean) {
    buttons.push([
      {
        text: "📸 Open Instagram",
        url: "https://instagram.com/" +
          encodeURIComponent(instagramClean)
      }
    ]);
  }
}


// Back to ADMIN_USER
buttons.push([
  {
    text: "⬅️ Back to User",
    callback_data: "ADMIN_USER " + targetId
  }
]);


// =====================================================
// 📤 UPDATE MESSAGE
// =====================================================

Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "Contact details opened"
});

Api.editMessageText({
  chat_id: chat.chatid,
  message_id: request.message.message_id,
  text: text,
  parse_mode: "HTML",
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: buttons
  }
});
