/*CMD
  command: ADMIN_REPLY_CLIENT_SAVE
  help: 
  need_reply: true
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
  command: ADMIN_REPLY_CLIENT_SAVE
  need_reply: true
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 41 — ADMIN_REPLY_CLIENT_SAVE
//
// STEP: 2.2.1.3.7.10.2.1
// ADMIN → SEND REPLY TO CLIENT
//
// Connected with:
// ADMIN_REPLY_CLIENT
//
// Callback formats:
// ORDER_TRACK orderId
// ORDER_CONTACT_ADMIN orderId
// =====================================================


// =====================================================
// 👤 ADMIN USER ID
// =====================================================

var adminId =
  String(user.telegramid);


// =====================================================
// 🔐 HTML SAFE TEXT
// =====================================================

function safeText(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


// =====================================================
// 👑 ADMIN AUTHENTICATION
// =====================================================

var adminIds = [];

function addAdmin(value) {

  if (
    value === null ||
    typeof value === "undefined"
  ) {
    return;
  }

  if (
    typeof value === "object"
  ) {
    value =
      value.id ||
      value.telegramId ||
      value.userId ||
      "";
  }

  value =
    String(value || "").trim();

  if (
    value &&
    adminIds.indexOf(value) === -1
  ) {
    adminIds.push(value);
  }
}

// Permanent owner fallback
addAdmin("7897324623");

// Configured owner
addAdmin(
  Bot.getProperty("OWNER_ID")
);

// Current admin system
var earnstarAdmins =
  Bot.getProperty("EARNSTAR_ADMINS");

if (Array.isArray(earnstarAdmins)) {

  for (
    var i = 0;
    i < earnstarAdmins.length;
    i++
  ) {
    addAdmin(earnstarAdmins[i]);
  }

} else {
  addAdmin(earnstarAdmins);
}

var isAdmin =
  adminIds.indexOf(adminId) !== -1;

if (!isAdmin) {

  Api.sendMessage({
    chat_id: adminId,

    text:
      "❌ <b>You are not authorized.</b>",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 🌐 ADMIN LANGUAGE
// =====================================================

var adminProfile =
  Bot.getProperty("USER_" + adminId) || {};

var adminLanguage =
  String(
    adminProfile.language || "hinglish"
  ).toLowerCase();

if (
  adminLanguage !== "english" &&
  adminLanguage !== "gujarati" &&
  adminLanguage !== "hinglish"
) {
  adminLanguage = "hinglish";
}


// =====================================================
// 📝 READ INCOMING REPLY
// =====================================================

var replyText = "";

if (
  typeof message !== "undefined" &&
  message
) {

  if (typeof message === "string") {

    replyText =
      message.trim();

  } else if (message.text) {

    replyText =
      String(message.text).trim();

  } else if (message.caption) {

    replyText =
      String(message.caption).trim();
  }
}

if (
  !replyText &&
  typeof request !== "undefined" &&
  request &&
  request.text
) {
  replyText =
    String(request.text).trim();
}

if (
  !replyText &&
  typeof params !== "undefined" &&
  params
) {
  replyText =
    String(params).trim();
}


// =====================================================
// 📦 LOAD WAITING ORDER
// =====================================================

var waitingOrder =
  Bot.getProperty(
    "ADMIN_REPLY_CLIENT_WAITING_" + adminId
  );

var orderId = "";

if (
  typeof waitingOrder === "string" ||
  typeof waitingOrder === "number"
) {

  orderId =
    String(waitingOrder).trim();

} else if (
  waitingOrder &&
  typeof waitingOrder === "object"
) {

  orderId =
    String(
      waitingOrder.orderId ||
      waitingOrder.id ||
      ""
    ).trim();
}


// =====================================================
// ❌ NO WAITING ORDER
// =====================================================

if (!orderId) {

  Api.sendMessage({
    chat_id: adminId,

    text:
      "⚠️ <b>No pending client reply request found.</b>\n\n" +
      "Please select <b>Reply to Client</b> again.",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 🛑 CANCEL
// =====================================================

if (
  replyText.toLowerCase() === "/cancel"
) {

  Bot.setProperty(
    "ADMIN_REPLY_CLIENT_WAITING_" + adminId,
    "",
    "string"
  );

  Api.sendMessage({
    chat_id: adminId,

    text:
      "❌ <b>Reply cancelled.</b>",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 📝 MESSAGE VALIDATION
// =====================================================

if (!replyText) {

  Api.sendMessage({
    chat_id: adminId,

    text:
      "❌ <b>Please type a reply message.</b>\n\n" +
      "Cancel karne ke liye /cancel bhejein.",

    parse_mode: "HTML"
  });

  return;
}

if (replyText.length > 2000) {

  Api.sendMessage({
    chat_id: adminId,

    text:
      "❌ <b>Reply is too long.</b>\n\n" +
      "Please keep it under 2000 characters.",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 📦 LOAD FINAL ORDER
// =====================================================

var order =
  Bot.getProperty(
    "ORDER_" + orderId
  );

if (
  !order ||
  typeof order !== "object"
) {

  Bot.setProperty(
    "ADMIN_REPLY_CLIENT_WAITING_" + adminId,
    "",
    "string"
  );

  Api.sendMessage({
    chat_id: adminId,

    text:
      "❌ <b>Order not found.</b>",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 👤 FIND CLIENT ID
// =====================================================

var mappedClientId =
  String(
    Bot.getProperty(
      "ORDER_USER_" + orderId
    ) || ""
  ).trim();

var clientId = "";

if (order.userId) {
  clientId =
    String(order.userId).trim();
}

if (!clientId && order.telegramId) {
  clientId =
    String(order.telegramId).trim();
}

if (
  !clientId &&
  order.telegramProfile &&
  order.telegramProfile.telegramId
) {
  clientId =
    String(
      order.telegramProfile.telegramId
    ).trim();
}

if (
  !clientId &&
  order.telegramProfile &&
  order.telegramProfile.userId
) {
  clientId =
    String(
      order.telegramProfile.userId
    ).trim();
}

if (!clientId) {
  clientId =
    mappedClientId;
}


// =====================================================
// ❌ CLIENT ID NOT FOUND
// =====================================================

if (!clientId) {

  Bot.setProperty(
    "ADMIN_REPLY_CLIENT_WAITING_" + adminId,
    "",
    "string"
  );

  Api.sendMessage({
    chat_id: adminId,

    text:
      "❌ <b>Client ID not found.</b>",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 👤 CLIENT PROFILE
// =====================================================

var clientProfile =
  Bot.getProperty(
    "USER_" + clientId
  ) || {};

if (
  !clientProfile ||
  typeof clientProfile !== "object"
) {
  clientProfile = {};
}

var clientLanguage =
  String(
    clientProfile.language || "hinglish"
  ).toLowerCase();

if (
  clientLanguage !== "english" &&
  clientLanguage !== "gujarati" &&
  clientLanguage !== "hinglish"
) {
  clientLanguage = "hinglish";
}

var clientName =
  (
    order.telegramProfile &&
    order.telegramProfile.fullName
  ) ||
  order.userName ||
  clientProfile.fullName ||
  "Client";


// =====================================================
// 🕒 TIMESTAMP
// =====================================================

var now =
  new Date().toISOString();


// =====================================================
// 💾 UPDATE FINAL ORDER ONLY
// =====================================================

order.lastClientReply =
  replyText;

order.lastClientReplyAt =
  now;

order.lastRepliedBy =
  adminId;

order.lastAdminAction =
  "reply_sent_to_client";

order.lastAdminActionAt =
  now;

order.updatedAt =
  now;

order.userId =
  clientId;

Bot.setProperty(
  "ORDER_" + orderId,
  order,
  "json"
);

Bot.setProperty(
  "ORDER_USER_" + orderId,
  clientId,
  "string"
);


// =====================================================
// 🧾 UPDATE ORDER HISTORY
// =====================================================

var history =
  Bot.getProperty(
    "ORDER_HISTORY_" + orderId
  ) || [];

if (!Array.isArray(history)) {
  history = [];
}

history.push({
  action: "admin_reply_sent",
  adminId: adminId,
  clientId: clientId,
  message: replyText,
  timestamp: now
});

Bot.setProperty(
  "ORDER_HISTORY_" + orderId,
  history,
  "json"
);


// =====================================================
// 🌐 CLIENT REPLY TEXT
// =====================================================

var replyTitle =
  clientLanguage === "english"
    ? "💬 <b>Admin Reply</b>"
    : clientLanguage === "gujarati"
      ? "💬 <b>એડમિનનો જવાબ</b>"
      : "💬 <b>Admin Reply</b>";

var trackText =
  clientLanguage === "english"
    ? "📦 Track Order"
    : clientLanguage === "gujarati"
      ? "📦 ઓર્ડર ટ્રેક કરો"
      : "📦 Track Order";

var contactText =
  clientLanguage === "english"
    ? "💬 Reply to Admin"
    : clientLanguage === "gujarati"
      ? "💬 એડમિનને જવાબ આપો"
      : "💬 Admin ko Reply";

var clientMessage =
  replyTitle +
  "\n\n" +

  "🆔 <b>Order ID:</b> <code>" +
  safeText(orderId) +
  "</code>\n\n" +

  safeText(replyText);


// =====================================================
// 🔘 CLIENT BUTTONS
// =====================================================

var clientButtons = [
  [
    {
      text: trackText,
      callback_data:
        "ORDER_TRACK " + orderId
    }
  ],
  [
    {
      text: contactText,
      callback_data:
        "ORDER_CONTACT_ADMIN " + orderId
    }
  ]
];


// =====================================================
// 📩 SEND REPLY TO CLIENT
// =====================================================

var clientMessageSent = false;

try {

  Api.sendMessage({
    chat_id: clientId,

    text: clientMessage,

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard:
        clientButtons
    }
  });

  clientMessageSent = true;

} catch (error) {

  clientMessageSent = false;

  Bot.setProperty(
    "CLIENT_NOTIFY_ERROR_" + orderId,
    {
      type: "admin_reply_client",
      adminId: adminId,
      clientId: clientId,
      error: String(error),
      timestamp: now
    },
    "json"
  );
}


// =====================================================
// 🛑 DELIVERY FAILED
// =====================================================

if (!clientMessageSent) {

  Api.sendMessage({
    chat_id: adminId,

    text:
      "❌ <b>Reply could not be delivered.</b>\n\n" +
      "Client may have blocked the bot or the account may be unavailable.",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 💾 CLEAR WAITING STATE
// =====================================================

Bot.setProperty(
  "ADMIN_REPLY_CLIENT_WAITING_" + adminId,
  "",
  "string"
);


// =====================================================
// 📩 ADMIN CONFIRMATION
// =====================================================

Api.sendMessage({
  chat_id: adminId,

  text:
    "✅ <b>Reply sent successfully.</b>\n\n" +

    "🆔 <b>Order ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n" +

    "👤 <b>Client ID:</b> <code>" +
    safeText(clientId) +
    "</code>",

  parse_mode: "HTML"
});
