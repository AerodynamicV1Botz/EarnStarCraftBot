/*CMD
  command: ORDER_CONTACT_ADMIN_SAVE
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
  command: ORDER_CONTACT_ADMIN_SAVE
  need_reply: true
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 39 — ORDER_CONTACT_ADMIN_SAVE
//
// STEP: 2.2.1.3.7.10.1
// CLIENT → SEND MESSAGE TO ADMIN
//
// Next command:
// ADMIN_REPLY_CLIENT
//
// Callback formats:
// ADMIN_VIEW_ORDER orderId
// ADMIN_REPLY_CLIENT orderId
// =====================================================


// =====================================================
// 👤 USER ID
// =====================================================

var uid =
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
// 🌐 LANGUAGE
// =====================================================

var profile =
  Bot.getProperty("USER_" + uid) || {};

if (
  !profile ||
  typeof profile !== "object"
) {
  profile = {};
}

var language =
  String(profile.language || "hinglish")
    .toLowerCase();

if (
  language !== "english" &&
  language !== "gujarati" &&
  language !== "hinglish"
) {
  language = "hinglish";
}


// =====================================================
// 📝 READ INCOMING MESSAGE
// =====================================================

var incomingText = "";

if (
  typeof message !== "undefined" &&
  message
) {
  if (typeof message === "string") {
    incomingText =
      message.trim();
  } else if (message.text) {
    incomingText =
      String(message.text).trim();
  } else if (message.caption) {
    incomingText =
      String(message.caption).trim();
  }
}

if (
  !incomingText &&
  typeof request !== "undefined" &&
  request
) {
  if (request.text) {
    incomingText =
      String(request.text).trim();
  }
}

if (
  !incomingText &&
  typeof params !== "undefined" &&
  params
) {
  incomingText =
    String(params).trim();
}


// =====================================================
// 🛑 CANCEL
// =====================================================

if (
  incomingText.toLowerCase() === "/cancel"
) {
  Bot.setProperty(
    "ORDER_CONTACT_ADMIN_WAITING_" + uid,
    "",
    "string"
  );

  Api.sendMessage({
    chat_id: uid,

    text:
      language === "english"
        ? "❌ Support request cancelled."
        : language === "gujarati"
          ? "❌ સપોર્ટ રિક્વેસ્ટ કૅન્સલ કરવામાં આવી."
          : "❌ Support request cancel kar di gayi.",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 📦 GET WAITING ORDER ID
// =====================================================

var waitingOrder =
  Bot.getProperty(
    "ORDER_CONTACT_ADMIN_WAITING_" + uid
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
    chat_id: uid,

    text:
      language === "english"
        ? "⚠️ No active support request found. Open your order and tap Contact Admin again."
        : language === "gujarati"
          ? "⚠️ કોઈ એક્ટિવ સપોર્ટ રિક્વેસ્ટ મળી નથી. તમારો ઓર્ડર ખોલીને ફરી Contact Admin દબાવો."
          : "⚠️ Koi active support request nahi mili. Order open karke Contact Admin dobara dabayein.",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 📝 MESSAGE VALIDATION
// =====================================================

if (!incomingText) {

  Api.sendMessage({
    chat_id: uid,

    text:
      language === "english"
        ? "❌ Please type your message. Send /cancel to cancel."
        : language === "gujarati"
          ? "❌ કૃપા કરીને તમારો મેસેજ લખો. કૅન્સલ કરવા માટે /cancel મોકલો."
          : "❌ Please apna message type karein. Cancel karne ke liye /cancel bhejein.",

    parse_mode: "HTML"
  });

  return;
}

if (incomingText.length > 2000) {

  Api.sendMessage({
    chat_id: uid,

    text:
      language === "english"
        ? "❌ Message is too long. Keep it under 2000 characters."
        : language === "gujarati"
          ? "❌ મેસેજ ખૂબ લાંબો છે. 2000 અક્ષરથી ઓછો રાખો."
          : "❌ Message bahut lamba hai. 2000 characters ke andar rakhein.",

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
    "ORDER_CONTACT_ADMIN_WAITING_" + uid,
    "",
    "string"
  );

  Api.sendMessage({
    chat_id: uid,

    text:
      language === "english"
        ? "❌ Order not found. Please open your order again."
        : language === "gujarati"
          ? "❌ ઓર્ડર મળ્યો નથી. કૃપા કરીને તમારો ઓર્ડર ફરી ખોલો."
          : "❌ Order nahi mila. Please apna order dobara open karein.",

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
// 🔐 ACCESS CHECK
// =====================================================

if (
  !clientId ||
  clientId !== uid
) {

  Api.sendMessage({
    chat_id: uid,

    text:
      language === "english"
        ? "❌ Access denied. This order does not belong to you."
        : language === "gujarati"
          ? "❌ ઍક્સેસ નકારવામાં આવ્યો. આ ઓર્ડર તમારો નથી."
          : "❌ Access denied. Yeh order aapka nahi hai.",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 👑 ADMIN LIST
// =====================================================

var ownerId =
  "7897324623";

var configuredOwner =
  Bot.getProperty("OWNER_ID");

var earnstarAdmins =
  Bot.getProperty("EARNSTAR_ADMINS");

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

addAdmin(ownerId);
addAdmin(configuredOwner);

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


// =====================================================
// ❌ NO ADMINS FOUND
// =====================================================

if (
  adminIds.length === 0
) {

  Bot.setProperty(
    "ORDER_CONTACT_ADMIN_WAITING_" + uid,
    "",
    "string"
  );

  Api.sendMessage({
    chat_id: uid,

    text:
      language === "english"
        ? "⚠️ Admin is currently unavailable. Please try again later."
        : language === "gujarati"
          ? "⚠️ હાલમાં એડમિન ઉપલબ્ધ નથી. કૃપા કરીને પછી પ્રયાસ કરો."
          : "⚠️ Abhi admin available nahi hai. Baad mein try karein.",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 🕐 TIMESTAMP
// =====================================================

var now =
  new Date().toISOString();


// =====================================================
// 💾 SAVE SUPPORT MESSAGE IN ORDER
// =====================================================

order.lastAdminMessage =
  incomingText;

order.lastAdminMessageAt =
  now;

order.updatedAt =
  now;

order.userId =
  clientId;

order.lastClientAction =
  "support_message_sent";

order.lastClientActionAt =
  now;

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
  action: "client_support_message",
  message: incomingText,
  userId: clientId,
  timestamp: now
});

Bot.setProperty(
  "ORDER_HISTORY_" + orderId,
  history,
  "json"
);


// =====================================================
// 👤 CLIENT DETAILS
// =====================================================

var fullName =
  (
    order.telegramProfile &&
    order.telegramProfile.fullName
  ) ||
  user.first_name ||
  "Client";

var username =
  (
    order.telegramProfile &&
    order.telegramProfile.username
  ) ||
  user.username ||
  "";

username =
  String(username || "")
    .replace(/^@/, "");


// =====================================================
// 📩 ADMIN MESSAGE
// =====================================================

var adminText =
  "💬 <b>New Client Support Message</b>\n\n" +

  "🆔 <b>Order ID:</b> <code>" +
  safeText(orderId) +
  "</code>\n" +

  "📦 <b>Package:</b> " +
  safeText(
    order.packageName ||
    order.package ||
    order.packageType ||
    "Custom Order"
  ) +
  "\n" +

  "👤 <b>Client:</b> " +
  safeText(fullName) +
  "\n" +

  "🆔 <b>Client ID:</b> <code>" +
  safeText(clientId) +
  "</code>\n" +

  (
    username
      ? "🔗 <b>Username:</b> @" +
        safeText(username) +
        "\n"
      : ""
  ) +

  "\n📝 <b>Message:</b>\n" +
  safeText(incomingText);


// =====================================================
// 🔘 ADMIN BUTTONS
// =====================================================

var adminButtons = [
  [
    {
      text: "📦 View Order",
      callback_data:
        "ADMIN_VIEW_ORDER " + orderId
    }
  ],
  [
    {
      text: "💬 Reply to Client",
      callback_data:
        "ADMIN_REPLY_CLIENT " + orderId
    }
  ]
];


// =====================================================
// 📩 SEND TO ADMINS
// =====================================================

var sentCount = 0;
var failedAdmins = [];

for (
  var k = 0;
  k < adminIds.length;
  k++
) {

  try {

    Api.sendMessage({
      chat_id: adminIds[k],

      text: adminText,

      parse_mode: "HTML",

      reply_markup: {
        inline_keyboard:
          adminButtons
      }
    });

    sentCount++;

  } catch (error) {

    failedAdmins.push(
      adminIds[k]
    );
  }
}


// =====================================================
// 🛑 ALL ADMIN DELIVERY FAILED
// =====================================================

if (
  sentCount === 0
) {

  Bot.setProperty(
    "ADMIN_NOTIFY_ERROR_" + orderId,
    {
      type: "client_support_message",
      failedAdmins: failedAdmins,
      message: incomingText,
      timestamp: now
    },
    "json"
  );

  Bot.setProperty(
    "ORDER_CONTACT_ADMIN_WAITING_" + uid,
    "",
    "string"
  );

  Api.sendMessage({
    chat_id: uid,

    text:
      language === "english"
        ? "❌ Message could not be delivered. Please try again later."
        : language === "gujarati"
          ? "❌ મેસેજ મોકલી શકાયો નથી. કૃપા કરીને પછી પ્રયાસ કરો."
          : "❌ Message deliver nahi ho saka. Baad mein try karein.",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// ⚠️ PARTIAL DELIVERY LOG
// =====================================================

if (
  failedAdmins.length > 0
) {

  Bot.setProperty(
    "ADMIN_NOTIFY_ERROR_" + orderId,
    {
      type: "client_support_message_partial",
      failedAdmins: failedAdmins,
      timestamp: now
    },
    "json"
  );
}


// =====================================================
// 💾 CLEAR WAITING STATE
// =====================================================

Bot.setProperty(
  "ORDER_CONTACT_ADMIN_WAITING_" + uid,
  "",
  "string"
);


// =====================================================
// 📩 USER CONFIRMATION
// =====================================================

Api.sendMessage({
  chat_id: uid,

  text:
    language === "english"
      ? "✅ <b>Message Sent to Admin</b>\n\n🆔 <b>Order ID:</b> <code>" +
        safeText(orderId) +
        "</code>\n\nYour message has been forwarded to the admin. You will receive the admin reply here."
      : language === "gujarati"
        ? "✅ <b>મેસેજ એડમિનને મોકલાયો</b>\n\n🆔 <b>ઓર્ડર ID:</b> <code>" +
          safeText(orderId) +
          "</code>\n\nતમારો મેસેજ એડમિનને મોકલવામાં આવ્યો છે. એડમિનનો જવાબ અહીં મળશે."
        : "✅ <b>Message Admin ko Sent</b>\n\n🆔 <b>Order ID:</b> <code>" +
          safeText(orderId) +
          "</code>\n\nAapka message admin ko forward kar diya gaya hai. Admin ka reply yahin milega.",

  parse_mode: "HTML"
});
