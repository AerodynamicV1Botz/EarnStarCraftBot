/*CMD
  command: ADMIN_UPDATE_PROGRESS_PERCENT
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
  command: ADMIN_UPDATE_PROGRESS_PERCENT
  need_reply: true
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 38 — ADMIN_UPDATE_PROGRESS_PERCENT
// STEP 2.2.1.3.7.7.1
//
// ADMIN → SAVE PROGRESS PERCENTAGE
//
// CONNECTED WITH:
// SCRIPT 37 → ADMIN_UPDATE_PROGRESS
//
// NEXT:
// ADMIN_UPDATE_PROGRESS_MESSAGE
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
// 🆔 READ WAITING ORDER
// =====================================================

var waitingKey =
  "PROGRESS_UPDATE_WAITING_" + adminId;

var orderId =
  Bot.getProperty(waitingKey);

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
  Bot.setProperty(
    waitingKey,
    "",
    "string"
  );

  Bot.setProperty(
    "PROGRESS_UPDATE_ORDER_" + adminId,
    "",
    "string"
  );

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
  Bot.setProperty(
    waitingKey,
    "",
    "string"
  );

  Bot.setProperty(
    "PROGRESS_UPDATE_ORDER_" + adminId,
    "",
    "string"
  );

  Bot.setProperty(
    "PROGRESS_PERCENT_" + adminId,
    "",
    "integer"
  );

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
  Bot.setProperty(
    waitingKey,
    "",
    "string"
  );

  Bot.setProperty(
    "PROGRESS_UPDATE_ORDER_" + adminId,
    "",
    "string"
  );

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
// 🔢 VALIDATE PERCENTAGE
// =====================================================

var percentText = messageText;

var validWholeNumber =
  /^[0-9]+$/.test(percentText);

var progress =
  Number(percentText);

if (
  !validWholeNumber ||
  !isFinite(progress) ||
  progress < 0 ||
  progress > 100
) {
  Api.sendMessage({
    chat_id: adminId,

    text:
      "❌ <b>Invalid Percentage</b>\n\n" +
      "0 se 100 ke beech whole number bhejein.\n" +
      "Example: <code>70</code>\n\n" +
      "Decimal ya text allowed nahi hai.",

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
      "%</b>\n\n" +

      "Aapne bheja: <b>" +
      safeText(String(progress)) +
      "%</b>\n\n" +

      "Current progress se equal ya higher percentage bhejein.",

    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 💾 SAVE TEMPORARY PERCENTAGE
// =====================================================

Bot.setProperty(
  "PROGRESS_PERCENT_" + adminId,
  progress,
  "integer"
);

Bot.setProperty(
  "PROGRESS_UPDATE_ORDER_" + adminId,
  orderId,
  "string"
);


// =====================================================
// 📩 ASK PROGRESS UPDATE MESSAGE
// =====================================================

Api.sendMessage({
  chat_id: adminId,

  text:
    "✅ <b>Progress Percentage Saved</b>\n\n" +

    "🆔 <b>Order ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n\n" +

    "📊 <b>New Progress:</b> " +
    safeText(String(progress)) +
    "%\n\n" +

    "Ab client ke liye progress update message bhejein.\n" +
    "Example:\n" +
    "<code>Website ka homepage complete ho gaya hai.</code>\n\n" +

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
  "ADMIN_UPDATE_PROGRESS_MESSAGE"
);
