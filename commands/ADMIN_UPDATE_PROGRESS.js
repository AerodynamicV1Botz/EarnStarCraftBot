/*CMD
  command: ADMIN_UPDATE_PROGRESS
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
  command: ADMIN_UPDATE_PROGRESS
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 37 — ADMIN_UPDATE_PROGRESS
// STEP 2.2.1.3.7.7
//
// ADMIN → UPDATE ORDER PROGRESS
//
// CONNECTED WITH:
// SCRIPT 36 → ADMIN_START_WORK
//
// NEXT:
// ADMIN_UPDATE_PROGRESS_PERCENT
// =====================================================


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
// ⚡ CALLBACK RESPONSE
// =====================================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  try {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "📈 Progress update karein.",
      show_alert: false
    });
  } catch (e) {}
}


// =====================================================
// 👑 ADMIN CHECK
// =====================================================

var OWNER_ID = "7897324623";
var adminId = String(user.telegramid);

var adminList =
  Bot.getProperty("EARNSTAR_ADMINS") || [];

if (!Array.isArray(adminList)) {
  adminList = [];
}

var isAuthorized = adminId === OWNER_ID;

if (!isAuthorized) {
  for (var i = 0; i < adminList.length; i++) {
    var item = adminList[i];
    var savedAdminId = "";

    if (
      typeof item === "object" &&
      item !== null
    ) {
      savedAdminId = String(
        item.id ||
        item.telegramId ||
        item.userId ||
        ""
      );
    } else {
      savedAdminId = String(item || "");
    }

    if (savedAdminId === adminId) {
      isAuthorized = true;
      break;
    }
  }
}

if (!isAuthorized) {
  Api.sendMessage({
    chat_id: adminId,
    text: "⛔ You are not authorized."
  });

  return;
}


// =====================================================
// 🆔 READ ORDER ID
// =====================================================

var rawData = "";
var orderId = "";

if (
  typeof params !== "undefined" &&
  params
) {
  rawData = String(params).trim();
}

if (!rawData) {
  if (
    typeof request !== "undefined" &&
    request
  ) {
    rawData = String(
      request.data ||
      request.callback_data ||
      ""
    ).trim();
  }
}

if (!rawData) {
  if (
    typeof message !== "undefined" &&
    message
  ) {
    if (typeof message === "string") {
      rawData = message.trim();
    } else if (message.text) {
      rawData = String(message.text).trim();
    } else if (message.caption) {
      rawData = String(message.caption).trim();
    }
  }
}

rawData = rawData
  .replace(/^ADMIN_UPDATE_PROGRESS[\s|]*/i, "")
  .trim();

if (rawData.indexOf("|") !== -1) {
  var dataParts = rawData.split("|");

  orderId = String(
    dataParts[dataParts.length - 1] || ""
  ).trim();
} else {
  orderId = rawData;
}

if (!orderId) {
  Api.sendMessage({
    chat_id: adminId,
    text: "❌ Invalid order ID."
  });

  return;
}


// =====================================================
// 📦 LOAD FINAL ORDER
// =====================================================

var orderKey = "ORDER_" + orderId;

var draft =
  Bot.getProperty(orderKey);

if (
  !draft ||
  typeof draft !== "object"
) {
  Api.sendMessage({
    chat_id: adminId,

    text:
      "❌ <b>Order Not Found</b>\n\n" +
      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 👤 CLIENT ID
// =====================================================

var clientId = String(
  draft.userId ||
  (
    draft.telegramProfile &&
    (
      draft.telegramProfile.telegramId ||
      draft.telegramProfile.userId
    )
  ) ||
  draft.telegramId ||
  Bot.getProperty("ORDER_USER_" + orderId) ||
  ""
).trim();

if (!clientId) {
  Api.sendMessage({
    chat_id: adminId,

    text:
      "❌ <b>Client ID not found.</b>\n\n" +
      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 🛑 ORDER STATUS CHECK
// =====================================================

if (
  draft.orderStatus !== "in_progress" ||
  draft.stage !== "work_in_progress"
) {
  Api.sendMessage({
    chat_id: adminId,

    text:
      "⚠️ <b>Progress Update Not Allowed</b>\n\n" +
      "Sirf work-in-progress order ka progress update kar sakte hain.\n\n" +

      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>\n" +

      "📌 <b>Current Status:</b> " +
      safeText(draft.orderStatus || "unknown") +
      "\n" +

      "📍 <b>Current Stage:</b> " +
      safeText(draft.stage || "unknown"),

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 🛑 PAYMENT STATUS CHECK
// =====================================================

if (
  draft.paymentStatus !== "work_started"
) {
  Api.sendMessage({
    chat_id: adminId,

    text:
      "⚠️ <b>Payment Status Error</b>\n\n" +
      "Work-started payment status required hai.\n\n" +
      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 📊 CURRENT PROGRESS
// =====================================================

var currentProgress =
  Number(draft.progress);

if (
  isNaN(currentProgress) ||
  currentProgress < 0
) {
  currentProgress = 60;
}

if (currentProgress > 100) {
  currentProgress = 100;
}


// =====================================================
// 🧹 CLEAR PREVIOUS WAITING STATE
// =====================================================

Bot.setProperty(
  "PROGRESS_UPDATE_WAITING_" + adminId,
  "",
  "string"
);

Bot.setProperty(
  "PROGRESS_UPDATE_ADMIN_" + orderId,
  "",
  "string"
);


// =====================================================
// 💾 SAVE WAITING STATE
// =====================================================

Bot.setProperty(
  "PROGRESS_UPDATE_WAITING_" + adminId,
  orderId,
  "string"
);

Bot.setProperty(
  "PROGRESS_UPDATE_ADMIN_" + orderId,
  adminId,
  "string"
);


// =====================================================
// 📩 ADMIN PROMPT
// =====================================================

Api.sendMessage({
  chat_id: adminId,

  text:
    "📈 <b>Update Order Progress</b>\n\n" +

    "🆔 <b>Order ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n\n" +

    "📊 <b>Current Progress:</b> " +
    safeText(String(currentProgress)) +
    "%\n\n" +

    "Pehle naya progress percentage bhejein.\n" +
    "Example: <code>70</code>\n\n" +

    "⚠️ Percentage 0 se 100 ke beech hona chahiye.\n\n" +

    "❌ Cancel karne ke liye /cancel bhejein.",

  parse_mode: "HTML",

  reply_markup: {
    keyboard: [
      [
        {
          text: "❌ Cancel"
        }
      ]
    ],
    resize_keyboard: true,
    one_time_keyboard: true
  }
});


// =====================================================
// 📝 NEXT STEP
// =====================================================

Bot.runCommand(
  "ADMIN_UPDATE_PROGRESS_PERCENT"
);
