/*CMD
  command: SUPPORT_USER_STATUS_UPDATE
  help: 
  need_reply: false
  auto_retry_time: 
  folder: LIVE DEMO

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 108 — UPDATED VERSION
// COMMAND NAME: SUPPORT_USER_STATUS_UPDATE
// STEP 5.2.3.1.1.3.1.18
// 📁 Support → User Status Update
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

// ---------- ADMIN CHECK ----------
var uid = user.telegramid;

if (String(uid) != "7897324623") {
  return;
}

// ---------- CALLBACK ANSWER ----------
if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  try {
    Api.answerCallbackQuery({
      callback_query_id: request.id
    });
  } catch (error) {}
}

// ---------- HTML ESCAPE ----------
function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ---------- GET PARAMETERS ----------
// Format:
// SUPPORT_USER_STATUS_UPDATE REF_ID STATUS

var rawParams = String(params || "").trim();
var parts = rawParams.split(/\s+/);

var refId = String(parts[0] || "").trim();
var newStatus = String(parts[1] || "")
  .toLowerCase()
  .trim();

if (!refId) {
  Bot.sendMessage(
    "❌ <b>Reference ID missing.</b>",
    {
      parse_mode: "HTML"
    }
  );
  return;
}

// ---------- VALID STATUSES ----------
var allowedStatuses = [
  "accepted",
  "approved",
  "rejected",
  "pending",
  "processing",
  "resolved",
  "closed",
  "cancelled"
];

if (allowedStatuses.indexOf(newStatus) == -1) {
  Bot.sendMessage(
    "❌ <b>Invalid status.</b>\n\n" +
    "Allowed statuses:\n" +
    "accepted, approved, rejected, pending,\n" +
    "processing, resolved, closed, cancelled",
    {
      parse_mode: "HTML"
    }
  );
  return;
}

// ---------- GET SUPPORT REQUEST ----------
var supportRequest = Bot.getProperty(
  "SUPPORT_REQUEST_" + refId
);

if (!supportRequest) {
  Bot.sendMessage(
    "❌ <b>Support request not found.</b>\n\n" +
    "Reference: <code>" +
    escapeHtml(refId) +
    "</code>",
    {
      parse_mode: "HTML"
    }
  );
  return;
}

// ---------- FIND USER ID ----------
var targetUserId =
  supportRequest.user_id ||
  supportRequest.userId ||
  supportRequest.telegramid ||
  supportRequest.user_telegramid ||
  supportRequest.targetUserId;

if (!targetUserId) {
  Bot.sendMessage(
    "❌ <b>Original user ID not found.</b>",
    {
      parse_mode: "HTML"
    }
  );
  return;
}

// ---------- OLD STATUS ----------
var oldStatus = String(
  supportRequest.status || "new"
).toLowerCase();

var now = new Date().toISOString();

// ---------- UPDATE REQUEST ----------
supportRequest.status = newStatus;
supportRequest.updated_at = now;
supportRequest.updatedBy = uid;
supportRequest.last_action = "status_update";

if (
  newStatus == "accepted" ||
  newStatus == "approved"
) {
  supportRequest.acceptedAt = now;
  supportRequest.acceptedBy = uid;
}

if (newStatus == "rejected") {
  supportRequest.rejectedAt = now;
  supportRequest.rejectedBy = uid;
}

if (newStatus == "closed") {
  supportRequest.closedAt = now;
  supportRequest.closedBy = uid;
}

if (newStatus == "resolved") {
  supportRequest.resolvedAt = now;
  supportRequest.resolvedBy = uid;
}

if (newStatus == "cancelled") {
  supportRequest.cancelledAt = now;
  supportRequest.cancelledBy = uid;
}

Bot.setProperty(
  "SUPPORT_REQUEST_" + refId,
  supportRequest,
  "json"
);

// ---------- SAVE HISTORY ----------
var history = Bot.getProperty(
  "SUPPORT_HISTORY_" + refId
) || [];

if (!Array.isArray(history)) {
  history = [];
}

history.push({
  action: "status_update",
  oldStatus: oldStatus,
  status: newStatus,
  time: now,
  updatedBy: uid
});

Bot.setProperty(
  "SUPPORT_HISTORY_" + refId,
  history,
  "json"
);

// ---------- UPDATE USER DATA ----------
var userData = Bot.getProperty(
  "USER_" + targetUserId
) || {};

userData.supportRequestRef = refId;
userData.supportRequestStatus = newStatus;
userData.supportRequestUpdatedAt = now;

Bot.setProperty(
  "USER_" + targetUserId,
  userData,
  "json"
);

// ---------- STATUS DISPLAY ----------
var statusEmoji = "📌";
var statusMessage = "";

if (
  newStatus == "accepted" ||
  newStatus == "approved"
) {
  statusEmoji = "✅";
  statusMessage =
    "Your support request has been accepted.\n\n" +
    "Our team will contact you regarding the next steps.";
} else if (newStatus == "rejected") {
  statusEmoji = "❌";
  statusMessage =
    "Your support request was not approved.\n\n" +
    "Please contact our team if you need further assistance.";
} else if (newStatus == "pending") {
  statusEmoji = "⏳";
  statusMessage =
    "Your support request is currently pending.\n\n" +
    "Our team will review it soon.";
} else if (newStatus == "processing") {
  statusEmoji = "⚙️";
  statusMessage =
    "Your support request is currently being processed.";
} else if (newStatus == "resolved") {
  statusEmoji = "✅";
  statusMessage =
    "Your support request has been resolved.\n\n" +
    "Please contact our team if you need further assistance.";
} else if (newStatus == "closed") {
  statusEmoji = "🔒";
  statusMessage =
    "Your support request has been closed.";
} else if (newStatus == "cancelled") {
  statusEmoji = "🚫";
  statusMessage =
    "Your support request has been cancelled.";
} else {
  statusMessage =
    "Your support request status has been updated.";
}

// ---------- USER MESSAGE ----------
var userText =
  statusEmoji +
  " <b>SUPPORT REQUEST UPDATE</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "🆔 <b>Reference ID:</b>\n" +
  "<code>" +
  escapeHtml(refId) +
  "</code>\n\n" +
  "📦 <b>Order ID:</b>\n" +
  "<code>" +
  escapeHtml(supportRequest.orderId || "N/A") +
  "</code>\n\n" +
  statusEmoji +
  " <b>Status:</b> " +
  escapeHtml(newStatus.toUpperCase()) +
  "\n\n" +
  escapeHtml(statusMessage);

// ---------- USER BUTTONS ----------
var userButtons = [
  [
    {
      text: "📋 View Request",
      callback_data:
        "MY_SUPPORT_REQUEST " + refId
    }
  ],
  [
    {
      text: "📜 History",
      callback_data:
        "SUPPORT_REQUEST_HISTORY " + refId
    }
  ],
  [
    {
      text: "📞 Contact Team",
      callback_data: "CONTACT_TEAM"
    }
  ],
  [
    {
      text: "🏠 Main Menu",
      callback_data: "BACK_MAIN_MENU"
    }
  ]
];

// ---------- SEND USER NOTIFICATION ----------
var userNotified = false;

try {
  Api.sendMessage({
    chat_id: targetUserId,
    text: userText,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: userButtons
    }
  });

  userNotified = true;
} catch (error) {
  userNotified = false;
}

// ---------- ADMIN TEXT ----------
var adminText =
  "✅ <b>SUPPORT STATUS UPDATED</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "🆔 <b>Reference ID:</b>\n" +
  "<code>" +
  escapeHtml(refId) +
  "</code>\n\n" +
  "📦 <b>Order ID:</b>\n" +
  "<code>" +
  escapeHtml(supportRequest.orderId || "N/A") +
  "</code>\n\n" +
  "📌 <b>Old Status:</b> " +
  escapeHtml(oldStatus.toUpperCase()) +
  "\n" +
  "🟢 <b>New Status:</b> " +
  escapeHtml(newStatus.toUpperCase()) +
  "\n\n";

if (userNotified) {
  adminText +=
    "📩 User ko notification send ho gaya.";
} else {
  adminText +=
    "⚠️ User ko notification send nahi ho saka.\n" +
    "User ne bot block kiya ho sakta hai.";
}

// ---------- ADMIN BUTTONS ----------
var adminButtons = [
  [
    {
      text: "👁 View Request",
      callback_data:
        "SUPPORT_ADMIN_REQUEST " + refId
    }
  ],
  [
    {
      text: "📜 History",
      callback_data:
        "SUPPORT_ADMIN_REQUEST_HISTORY " + refId
    }
  ],
  [
    {
      text: "📋 All Support Requests",
      callback_data:
        "SUPPORT_ADMIN_REQUESTS ALL"
    }
  ],
  [
    {
      text: "👑 Admin Panel",
      callback_data: "ADMIN_PANEL"
    }
  ]
];

// ---------- SAME MESSAGE EDIT + DELETE FALLBACK ----------
function showAdminMenu(text, buttons) {
  if (
    typeof request !== "undefined" &&
    request &&
    request.message &&
    request.message.message_id
  ) {
    try {
      Api.editMessageText({
        chat_id: uid,
        message_id: request.message.message_id,
        text: text,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: buttons
        }
      });

      return;
    } catch (error) {
      try {
        Api.deleteMessage({
          chat_id: uid,
          message_id:
            request.message.message_id
        });
      } catch (deleteError) {}
    }
  }

  Api.sendMessage({
    chat_id: uid,
    text: text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons
    }
  });
}

// ---------- SHOW ADMIN RESULT ----------
showAdminMenu(
  adminText,
  adminButtons
);
