/*CMD
  command: ADMIN_START_WORK
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
  command: ADMIN_START_WORK
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 36 — ADMIN_START_WORK
// STEP 2.2.1.3.7.6
//
// ADMIN → START ORDER WORK
//
// CONNECTED WITH:
// SCRIPT 34 → ADMIN_VERIFY_PAYMENT
//
// NEXT:
// ADMIN_UPDATE_PROGRESS <orderId>
// ADMIN_MARK_COMPLETE <orderId>
// ORDER_TRACK <orderId>
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
// 💰 MONEY FORMAT
// =====================================================

function money(value) {
  var amount = Number(value || 0);

  if (isNaN(amount)) {
    amount = 0;
  }

  return amount.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
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
      text: "🚀 Work start kar rahe hain...",
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
  .replace(/^ADMIN_START_WORK[\s|]*/i, "")
  .trim();

if (rawData.indexOf("|") !== -1) {
  var parts = rawData.split("|");

  orderId = String(
    parts[parts.length - 1] || ""
  ).trim();
} else {
  orderId = rawData;
}

orderId = String(orderId || "").trim();

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

var draft = Bot.getProperty(orderKey);

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
// 🛑 PAYMENT VERIFICATION CHECK
// =====================================================

if (
  draft.paymentStatus !== "advance_paid"
) {
  Api.sendMessage({
    chat_id: adminId,

    text:
      "❌ <b>Work Cannot Be Started</b>\n\n" +
      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>\n\n" +
      "Advance payment verified nahi hai.\n" +
      "Pehle payment verify karein.",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 🛑 DUPLICATE WORK START CHECK
// =====================================================

if (
  draft.stage === "work_in_progress" ||
  draft.stage === "in_progress" ||
  draft.orderStatus === "in_progress" ||
  draft.paymentStatus === "work_started" ||
  draft.workStatus === "in_progress" ||
  draft.startedAt ||
  draft.workStartedAt
) {
  Api.sendMessage({
    chat_id: adminId,

    text:
      "⚠️ <b>Work Already Started</b>\n\n" +
      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>\n\n" +
      "📊 <b>Progress:</b> " +
      safeText(String(draft.progress || 60)) +
      "%\n" +
      "📌 <b>Status:</b> Work in Progress",

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📈 Update Progress",
            callback_data:
              "ADMIN_UPDATE_PROGRESS " + orderId
          }
        ],
        [
          {
            text: "✅ Mark Work Complete",
            callback_data:
              "ADMIN_MARK_COMPLETE " + orderId
          }
        ]
      ]
    }
  });

  return;
}


// =====================================================
// 🛑 ORDER STAGE CHECK
// =====================================================

if (
  draft.stage !== "work_ready" &&
  draft.stage !== "advance_payment" &&
  draft.stage !== "amount_ready"
) {
  Api.sendMessage({
    chat_id: adminId,

    text:
      "⚠️ <b>Order is not ready to start.</b>\n\n" +
      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>\n\n" +
      "📌 <b>Current Stage:</b> <code>" +
      safeText(draft.stage || "unknown") +
      "</code>",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 🕐 TIMESTAMP
// =====================================================

var now = new Date().toISOString();


// =====================================================
// 💾 UPDATE FINAL ORDER
// =====================================================

draft.userId = clientId;

draft.stage = "work_in_progress";
draft.packageStep = "work_started";

draft.requestStatus = "accepted";
draft.orderStatus = "in_progress";

draft.paymentStatus = "work_started";
draft.workStatus = "in_progress";

draft.startedBy = adminId;
draft.adminId = adminId;

draft.startedAt = now;
draft.workStartedAt = now;

draft.progress = 60;
draft.progressTitle = "Work Started";
draft.progressUpdate =
  "Aapke order par work officially start ho gaya hai.";

draft.updatedAt = now;


// =====================================================
// 💾 SAVE FINAL ORDER
// =====================================================

Bot.setProperty(
  orderKey,
  draft,
  "json"
);


// =====================================================
// 💾 SAVE ORDER → CLIENT MAPPING
// =====================================================

Bot.setProperty(
  "ORDER_USER_" + orderId,
  clientId,
  "string"
);


// =====================================================
// 💾 SAVE ORDER HISTORY
// =====================================================

Bot.setProperty(
  "ORDER_HISTORY_" + orderId,
  draft,
  "json"
);


// =====================================================
// 📩 CLIENT NOTIFICATION
// =====================================================

var clientMessage =
  "🚀 <b>Work Started</b>\n\n" +

  "🆔 <b>Order ID:</b> <code>" +
  safeText(orderId) +
  "</code>\n\n" +

  "📦 <b>Package:</b> " +
  safeText(
    draft.packageName || "Custom Order"
  ) +
  "\n\n" +

  "💰 <b>Advance Payment:</b> Verified ✅\n\n" +

  "🛠️ Aapke order par work officially start ho gaya hai.\n\n" +

  "📊 <b>Current Progress:</b> 60%\n" +

  "📌 <b>Status:</b> Work in Progress\n\n" +

  "Aapko work ke dauran progress updates milte rahenge.";

try {
  Api.sendMessage({
    chat_id: clientId,
    text: clientMessage,
    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📊 Track Order",
            callback_data:
              "ORDER_TRACK " + orderId
          }
        ]
      ]
    }
  });
} catch (clientError) {
  Bot.setProperty(
    "CLIENT_NOTIFY_ERROR_" + orderId,
    String(clientError),
    "string"
  );
}


// =====================================================
// 📩 ADMIN CONFIRMATION
// =====================================================

Api.sendMessage({
  chat_id: adminId,

  text:
    "🚀 <b>WORK STARTED SUCCESSFULLY</b>\n\n" +

    "🆔 <b>Order ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n\n" +

    "👤 <b>Client ID:</b> <code>" +
    safeText(clientId) +
    "</code>\n\n" +

    "📦 <b>Package:</b> " +
    safeText(
      draft.packageName || "Custom Order"
    ) +
    "\n\n" +

    "💰 <b>Advance Payment:</b> Verified ✅\n" +

    "📊 <b>Progress:</b> 60%\n" +

    "📌 <b>Status:</b> Work in Progress\n\n" +

    "🕐 <b>Started:</b> " +
    safeText(now),

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📈 Update Progress",
          callback_data:
            "ADMIN_UPDATE_PROGRESS " + orderId
        }
      ],
      [
        {
          text: "✅ Mark Work Complete",
          callback_data:
            "ADMIN_MARK_COMPLETE " + orderId
        }
      ],
      [
        {
          text: "📋 View Order",
          callback_data:
            "ADMIN_VIEW_ORDER " + orderId
        }
      ]
    ]
  }
});
