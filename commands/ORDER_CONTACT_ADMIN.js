/*CMD
  command: ORDER_CONTACT_ADMIN
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
  command: ORDER_CONTACT_ADMIN
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 38 — ORDER_CONTACT_ADMIN
//
// STEP: 2.2.1.3.7.10
// CLIENT → CONTACT ADMIN
//
// Callback formats:
// ORDER_CONTACT_ADMIN orderId
// ORDER_CONTACT_ADMIN|orderId
//
// Next Script:
// ORDER_CONTACT_ADMIN_SAVE
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
// ⚡ READ CALLBACK DATA
// =====================================================

var callbackData = "";

if (
  typeof request !== "undefined" &&
  request
) {
  callbackData = String(
    request.data ||
    request.callback_data ||
    ""
  ).trim();
}


// =====================================================
// 🆔 READ ORDER ID
// =====================================================

var orderId = "";

if (
  typeof params !== "undefined" &&
  params
) {
  orderId =
    String(params).trim();
}


// Support callback format:
// ORDER_CONTACT_ADMIN orderId
// ORDER_CONTACT_ADMIN|orderId

if (!orderId && callbackData) {

  var normalizedCallback =
    callbackData.replace(/\|/g, " ");

  var parts =
    normalizedCallback.trim().split(/\s+/);

  if (parts.length >= 2) {
    orderId =
      parts.slice(1).join(" ").trim();
  }
}


// =====================================================
// ❌ INVALID ORDER ID
// =====================================================

if (!orderId) {

  Api.sendMessage({
    chat_id: uid,

    text:
      language === "english"
        ? "❌ Invalid order ID."
        : language === "gujarati"
          ? "❌ અમાન્ય ઓર્ડર ID."
          : "❌ Invalid order ID.",

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

  Api.sendMessage({
    chat_id: uid,

    text:
      language === "english"
        ? "❌ Order not found."
        : language === "gujarati"
          ? "❌ ઓર્ડર મળ્યો નથી."
          : "❌ Order nahi mila.",

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
// 🔐 CLIENT ACCESS CHECK
// =====================================================

if (
  !clientId ||
  clientId !== uid
) {

  Api.sendMessage({
    chat_id: uid,

    text:
      language === "english"
        ? "❌ This order does not belong to you."
        : language === "gujarati"
          ? "❌ આ ઓર્ડર તમારો નથી."
          : "❌ Yeh order aapka nahi hai.",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 🛑 CHECK EXISTING WAITING STATE
// =====================================================

var waitingOrder =
  String(
    Bot.getProperty(
      "ORDER_CONTACT_ADMIN_WAITING_" + uid
    ) || ""
  ).trim();

if (waitingOrder) {

  var waitingText = "";

  if (waitingOrder === orderId) {

    waitingText =
      language === "english"
        ? "⚠️ Your message for this order is already pending. Please wait for the admin's response."
        : language === "gujarati"
          ? "⚠️ આ ઓર્ડર માટે તમારો મેસેજ પહેલેથી પેન્ડિંગ છે. કૃપા કરીને એડમિનના જવાબની રાહ જુઓ."
          : "⚠️ Is order ke liye aapka message already pending hai. Admin ke reply ka wait karein.";

  } else {

    waitingText =
      language === "english"
        ? "⚠️ You already have another message pending with the admin. Please wait for its response."
        : language === "gujarati"
          ? "⚠️ તમારો બીજો મેસેજ પહેલેથી એડમિન પાસે પેન્ડિંગ છે. કૃપા કરીને તેના જવાબની રાહ જુઓ."
          : "⚠️ Aapka ek doosra message admin ke paas pending hai. Pehle uske reply ka wait karein.";
  }

  Api.sendMessage({
    chat_id: uid,
    text: waitingText,
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 💾 SAVE WAITING STATE
// =====================================================

Bot.setProperty(
  "ORDER_CONTACT_ADMIN_WAITING_" + uid,
  orderId,
  "string"
);


// =====================================================
// 👤 UPDATE USER ACTIVITY
// =====================================================

profile.lastCommand =
  "ORDER_CONTACT_ADMIN";

profile.lastVisitedAt =
  new Date().toISOString();

profile.lastOrderContacted =
  orderId;

Bot.setProperty(
  "USER_" + uid,
  profile,
  "json"
);


// =====================================================
// 📦 UPDATE ORDER ACTIVITY
// =====================================================

var now =
  new Date().toISOString();

order.lastClientAction =
  "contact_admin";

order.lastClientActionAt =
  now;

order.updatedAt =
  now;

Bot.setProperty(
  "ORDER_" + orderId,
  order,
  "json"
);


// =====================================================
// 🌐 MULTILINGUAL TEXT
// =====================================================

var title =
  language === "english"
    ? "💬 <b>Contact Admin</b>"
    : language === "gujarati"
      ? "💬 <b>એડમિનનો સંપર્ક</b>"
      : "💬 <b>Contact Admin</b>";

var instruction =
  language === "english"
    ? "Type your message or question regarding this order."
    : language === "gujarati"
      ? "આ ઓર્ડર અંગે તમારો મેસેજ અથવા પ્રશ્ન લખો."
      : "Apne order ke regarding apna message ya question type karein.";

var deliveryText =
  language === "english"
    ? "Your message will be sent to the admin."
    : language === "gujarati"
      ? "તમારો મેસેજ એડમિનને મોકલવામાં આવશે."
      : "Aapka message admin ko bhej diya jayega.";

var cancelText =
  language === "english"
    ? "Send /cancel to cancel."
    : language === "gujarati"
      ? "કૅન્સલ કરવા માટે /cancel મોકલો."
      : "Cancel karne ke liye /cancel bhejein.";


// =====================================================
// 📩 ASK USER MESSAGE
// =====================================================

Api.sendMessage({
  chat_id: uid,

  text:
    title +
    "\n\n" +

    "🆔 <b>Order ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n\n" +

    instruction +
    "\n\n" +

    "📩 " +
    deliveryText +
    "\n\n" +

    "❌ " +
    cancelText,

  parse_mode: "HTML"
});


// =====================================================
// ▶️ NEXT SCRIPT
// =====================================================

Bot.runCommand(
  "ORDER_CONTACT_ADMIN_SAVE"
);
