/*CMD
  command: ADMIN_UPDATE_PROGRESS_MESSAGE
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
  command: ADMIN_UPDATE_PROGRESS_MESSAGE
  need_reply: true
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 39 — ADMIN_UPDATE_PROGRESS_MESSAGE
// STEP 2.2.1.3.7.7.2
//
// ADMIN → SAVE PROGRESS UPDATE
//
// CONNECTED WITH:
// SCRIPT 37 → ADMIN_UPDATE_PROGRESS
// SCRIPT 38 → ADMIN_UPDATE_PROGRESS_PERCENT
//
// NEXT:
// ADMIN_UPDATE_PROGRESS
// ADMIN_MARK_COMPLETE
// ORDER_TRACK
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
// 🧹 CLEAR TEMPORARY DATA FUNCTION
// =====================================================

function clearProgressTemp() {
  Bot.setProperty(
    "PROGRESS_UPDATE_WAITING_" + adminId,
    "",
    "string"
  );

  Bot.setProperty(
    "PROGRESS_PERCENT_" + adminId,
    "",
    "string"
  );

  Bot.setProperty(
    "PROGRESS_UPDATE_ORDER_" + adminId,
    "",
    "string"
  );
}


// =====================================================
// 🆔 READ WAITING ORDER
// =====================================================

var orderId =
  Bot.getProperty(
    "PROGRESS_UPDATE_WAITING_" + adminId
  );

if (!orderId) {
  Api.sendMessage({
    chat_id: adminId,
    text:
      "⚠️ Koi progress update request active nahi hai."
  });

  return;
}

orderId = String(orderId).trim();


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
  clearProgressTemp();

  Api.sendMessage({
    chat_id: adminId,

    text:
      "❌ <b>Order Not Found</b>\n\n" +
      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>",

    parse_mode: "HTML",

    reply_markup: {
      remove_keyboard: true
    }
  });

  return;
}


// =====================================================
// 📝 READ MESSAGE TEXT
// =====================================================

var messageText = "";

if (
  typeof message !== "undefined" &&
  message
) {
  if (typeof message === "string") {
    messageText = message;
  } else if (message.text) {
    messageText = String(message.text);
  } else if (message.caption) {
    messageText = String(message.caption);
  }
}

messageText = messageText.trim();

var lowerMessage =
  messageText.toLowerCase();


// =====================================================
// ❌ CANCEL HANDLER
// =====================================================

if (
  messageText === "❌ Cancel" ||
  lowerMessage === "/cancel"
) {
  clearProgressTemp();

  Api.sendMessage({
    chat_id: adminId,

    text:
      "❌ Progress update cancel kar diya gaya.",

    reply_markup: {
      remove_keyboard: true
    }
  });

  return;
}


// =====================================================
// 🛑 ORDER STATUS CHECK
// =====================================================

if (
  draft.stage !== "work_in_progress" ||
  draft.orderStatus !== "in_progress" ||
  draft.paymentStatus !== "work_started"
) {
  clearProgressTemp();

  Api.sendMessage({
    chat_id: adminId,

    text:
      "⚠️ <b>Progress Update Not Allowed</b>\n\n" +
      "Ye order abhi work-in-progress status mein nahi hai.\n\n" +

      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>\n" +

      "📌 <b>Status:</b> " +
      safeText(draft.orderStatus || "unknown"),

    parse_mode: "HTML",

    reply_markup: {
      remove_keyboard: true
    }
  });

  return;
}


// =====================================================
// 📝 VALIDATE UPDATE MESSAGE
// =====================================================

var updateText = messageText;

if (!updateText) {
  Api.sendMessage({
    chat_id: adminId,

    text:
      "❌ Update message empty nahi ho sakta.\n" +
      "Please progress update text bhejein."
  });

  return;
}

if (updateText.length > 1000) {
  Api.sendMessage({
    chat_id: adminId,

    text:
      "❌ Update message maximum 1000 characters ka ho sakta hai."
  });

  return;
}


// =====================================================
// 🔢 READ SAVED PERCENTAGE
// =====================================================

var savedProgress =
  Bot.getProperty(
    "PROGRESS_PERCENT_" + adminId
  );

var progress =
  Number(savedProgress);

if (
  savedProgress === null ||
  savedProgress === undefined ||
  String(savedProgress).trim() === "" ||
  isNaN(progress) ||
  !isFinite(progress) ||
  progress < 0 ||
  progress > 100 ||
  Math.floor(progress) !== progress
) {
  Api.sendMessage({
    chat_id: adminId,

    text:
      "❌ Progress percentage missing ya invalid hai.\n" +
      "Dobara progress update karein."
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
  !isFinite(currentProgress) ||
  currentProgress < 0
) {
  currentProgress = 60;
}

if (currentProgress > 100) {
  currentProgress = 100;
}


// =====================================================
// 🛑 PREVENT PROGRESS REVERSAL
// =====================================================

if (progress < currentProgress) {
  Api.sendMessage({
    chat_id: adminId,

    text:
      "⚠️ <b>Progress Kam Nahi Kar Sakte</b>\n\n" +

      "Current progress: <b>" +
      safeText(String(currentProgress)) +
      "%</b>\n" +

      "Aapne bheja: <b>" +
      safeText(String(progress)) +
      "%</b>\n\n" +

      "Equal ya higher percentage bhejein.",

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
  clearProgressTemp();

  Api.sendMessage({
    chat_id: adminId,

    text:
      "❌ <b>Client ID not found.</b>\n\n" +
      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>",

    parse_mode: "HTML",

    reply_markup: {
      remove_keyboard: true
    }
  });

  return;
}


// =====================================================
// 🕐 TIMESTAMP
// =====================================================

var now =
  new Date().toISOString();


// =====================================================
// 📊 PROGRESS HISTORY
// =====================================================

if (!Array.isArray(draft.progressHistory)) {
  draft.progressHistory = [];
}

draft.progressHistory.push({
  progress: progress,
  message: updateText,
  updatedBy: adminId,
  updatedAt: now
});

if (draft.progressHistory.length > 50) {
  draft.progressHistory =
    draft.progressHistory.slice(-50);
}


// =====================================================
// 💾 UPDATE FINAL ORDER
// =====================================================

// 100% does not automatically complete the order.
// ADMIN_MARK_COMPLETE handles final completion.

draft.userId = clientId;

draft.stage = "work_in_progress";
draft.packageStep = "progress_updated";

draft.requestStatus = "accepted";
draft.orderStatus = "in_progress";

draft.paymentStatus = "work_started";
draft.workStatus = "in_progress";

draft.progress = progress;

draft.progressTitle =
  progress >= 100
    ? "Work Ready for Completion"
    : "Work In Progress";

draft.progressUpdate = updateText;
draft.progressUpdatedAt = now;
draft.lastProgressUpdatedBy = adminId;

draft.updatedAt = now;
draft.adminId = adminId;


// =====================================================
// 💾 SAVE FINAL ORDER
// =====================================================

Bot.setProperty(
  orderKey,
  draft,
  "json"
);

Bot.setProperty(
  "ORDER_USER_" + orderId,
  clientId,
  "string"
);

Bot.setProperty(
  "ORDER_HISTORY_" + orderId,
  draft,
  "json"
);


// =====================================================
// 🧹 CLEAR TEMPORARY DATA
// =====================================================

clearProgressTemp();


// =====================================================
// 📩 CLIENT PROGRESS UPDATE
// =====================================================

var clientMessage =
  "📈 <b>Order Progress Updated</b>\n\n" +

  "🆔 <b>Order ID:</b> <code>" +
  safeText(orderId) +
  "</code>\n\n" +

  "📦 <b>Package:</b> " +
  safeText(
    draft.packageName || "Custom Order"
  ) +
  "\n\n" +

  "📊 <b>Progress:</b> " +
  safeText(String(progress)) +
  "%\n" +

  "📌 <b>Status:</b> " +
  safeText(draft.progressTitle) +
  "\n\n" +

  "📝 <b>Update:</b>\n" +
  safeText(updateText);

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

var adminButtons = [
  [
    {
      text: "📈 Update Progress",
      callback_data:
        "ADMIN_UPDATE_PROGRESS " + orderId
    }
  ]
];

if (progress >= 100) {
  adminButtons.push([
    {
      text: "✅ Mark Work Complete",
      callback_data:
        "ADMIN_MARK_COMPLETE " + orderId
    }
  ]);
}

adminButtons.push([
  {
    text: "📋 View Order",
    callback_data:
      "ADMIN_VIEW_ORDER " + orderId
  }
]);

Api.sendMessage({
  chat_id: adminId,

  text:
    "✅ <b>Progress Updated Successfully</b>\n\n" +

    "🆔 <b>Order ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n\n" +

    "📊 <b>Progress:</b> " +
    safeText(String(progress)) +
    "%\n\n" +

    "📝 <b>Update:</b>\n" +
    safeText(updateText) +
    "\n\n" +

    "📌 <b>Status:</b> " +
    safeText(draft.progressTitle),

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: adminButtons
  }
});
