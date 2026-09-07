/*CMD
  command: SUPPORT_USER_REOPEN_NOTIFICATION
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

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 115 — UPDATED VERSION
// COMMAND NAME: SUPPORT_USER_REOPEN_NOTIFICATION
// STEP 5.2.3.1.1.3.1.25
// 📁 Support → User Reopen Notification
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

// ---------- CHECK STATUS ----------
var currentStatus = String(
  supportRequest.status || "new"
).toLowerCase();

if (currentStatus != "reopened") {
  Bot.sendMessage(
    "⚠️ <b>REQUEST IS NOT REOPENED</b>\n\n" +
    "🆔 Reference: <code>" +
    escapeHtml(refId) +
    "</code>\n\n" +
    "📌 Current Status: <b>" +
    escapeHtml(currentStatus.toUpperCase()) +
    "</b>",
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

// ---------- REOPEN REASON ----------
var reopenReason =
  supportRequest.reopenReason ||
  "Further review required";

// ---------- USER MESSAGE ----------
var userText =
  "🔄 <b>SUPPORT REQUEST REOPENED</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "🆔 <b>Reference ID:</b>\n" +
  "<code>" +
  escapeHtml(refId) +
  "</code>\n\n" +
  "📦 <b>Order ID:</b>\n" +
  "<code>" +
  escapeHtml(supportRequest.orderId || "N/A") +
  "</code>\n\n" +
  "🔄 <b>Status:</b> REOPENED\n\n" +
  "Your support request has been reopened.\n\n" +
  "📝 <b>Reason:</b>\n" +
  escapeHtml(reopenReason) +
  "\n\n" +
  "Our team will review it again and contact you if required.";

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

// ---------- SEND NOTIFICATION ----------
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

// ---------- SAVE NOTIFICATION HISTORY ----------
var history = Bot.getProperty(
  "SUPPORT_HISTORY_" + refId
) || [];

if (!Array.isArray(history)) {
  history = [];
}

history.push({
  action: "reopen_notification",
  status: "reopened",
  time: new Date().toISOString(),
  sentTo: targetUserId,
  success: userNotified
});

Bot.setProperty(
  "SUPPORT_HISTORY_" + refId,
  history,
  "json"
);

// ---------- ADMIN TEXT ----------
var adminText =
  "📩 <b>REOPEN NOTIFICATION RESULT</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "🆔 <b>Reference ID:</b>\n" +
  "<code>" +
  escapeHtml(refId) +
  "</code>\n\n" +
  "📌 <b>Status:</b> REOPENED\n\n";

if (userNotified) {
  adminText +=
    "✅ User ko reopen notification send ho gaya.";
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

// ---------- SHOW RESULT ----------
showAdminMenu(
  adminText,
  adminButtons
);
