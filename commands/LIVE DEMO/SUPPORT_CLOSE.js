/*CMD
  command: SUPPORT_CLOSE
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
// SCRIPT 109 — UPDATED VERSION
// COMMAND NAME: SUPPORT_CLOSE
// STEP 5.2.3.1.1.3.1.19
// 📁 Support → Admin Close Request
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

// ---------- ADMIN CHECK ----------
var uid = user.telegramid;

if (String(uid) != "7897324623") {
  if (
    typeof request !== "undefined" &&
    request &&
    request.id
  ) {
    try {
      Api.answerCallbackQuery({
        callback_query_id: request.id,
        text: "❌ Admin access required"
      });
    } catch (error) {}
  }

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

// ---------- GET REFERENCE ID ----------
var refId = String(params || "").trim();

if (!refId) {
  Bot.sendMessage(
    "❌ <b>Reference ID missing.</b>",
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

// ---------- CURRENT STATUS ----------
var oldStatus = String(
  supportRequest.status || "new"
).toLowerCase();

if (oldStatus == "closed") {
  if (
    typeof request !== "undefined" &&
    request &&
    request.id
  ) {
    try {
      Api.answerCallbackQuery({
        callback_query_id: request.id,
        text: "⚠️ Request already closed"
      });
    } catch (error) {}
  }

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

// ---------- CURRENT TIME ----------
var now = new Date().toISOString();

// ---------- UPDATE REQUEST ----------
supportRequest.status = "closed";
supportRequest.closedAt = now;
supportRequest.closedBy = uid;
supportRequest.updated_at = now;
supportRequest.last_action = "closed";

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
  action: "closed",
  oldStatus: oldStatus,
  status: "closed",
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
userData.supportRequestStatus = "closed";
userData.supportRequestUpdatedAt = now;

Bot.setProperty(
  "USER_" + targetUserId,
  userData,
  "json"
);

// ---------- USER MESSAGE ----------
var userText =
  "🔒 <b>SUPPORT REQUEST CLOSED</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "🆔 <b>Reference ID:</b>\n" +
  "<code>" +
  escapeHtml(refId) +
  "</code>\n\n" +
  "📦 <b>Order ID:</b>\n" +
  "<code>" +
  escapeHtml(supportRequest.orderId || "N/A") +
  "</code>\n\n" +
  "🔒 <b>Status:</b> CLOSED\n\n" +
  "Your support request has been closed.\n\n" +
  "If you need further assistance, please contact our team.";

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
  "🔒 <b>SUPPORT REQUEST CLOSED</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "🆔 <b>Reference ID:</b>\n" +
  "<code>" +
  escapeHtml(refId) +
  "</code>\n\n" +
  "📦 <b>Order ID:</b>\n" +
  "<code>" +
  escapeHtml(supportRequest.orderId || "N/A") +
  "</code>\n\n" +
  "🔒 <b>Status:</b> CLOSED\n\n";

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
