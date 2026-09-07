/*CMD
  command: SUPPORT_REOPEN
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
// SCRIPT 110 — UPDATED VERSION
// COMMAND NAME: SUPPORT_REOPEN
// STEP 5.2.3.1.1.3.1.20
// 📁 Support → Admin Reopen Request
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
var currentStatus = String(
  supportRequest.status || "new"
).toLowerCase();

if (currentStatus != "closed") {
  var activeText =
    "⚠️ <b>REQUEST IS NOT CLOSED</b>\n\n" +
    "🆔 Reference: <code>" +
    escapeHtml(refId) +
    "</code>\n\n" +
    "📌 Current Status: <b>" +
    escapeHtml(currentStatus.toUpperCase()) +
    "</b>\n\n" +
    "Sirf closed request ko reopen kiya ja sakta hai.";

  var activeButtons = [
    [
      {
        text: "👁 View Request",
        callback_data:
          "SUPPORT_ADMIN_REQUEST " + refId
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

  showAdminMenu(activeText, activeButtons);
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

// ---------- REOPEN CONFIRMATION TEXT ----------
var confirmText =
  "🔄 <b>REOPEN SUPPORT REQUEST</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "🆔 <b>Reference ID:</b>\n" +
  "<code>" +
  escapeHtml(refId) +
  "</code>\n\n" +
  "📦 <b>Order ID:</b>\n" +
  "<code>" +
  escapeHtml(supportRequest.orderId || "N/A") +
  "</code>\n\n" +
  "📌 <b>Current Status:</b> CLOSED\n" +
  "🔄 <b>New Status:</b> REOPENED\n\n" +
  "Kya aap is support request ko dobara open karna chahte ho?\n\n" +
  "Reopen karne ke baad user ko notification bheja jayega.";

// ---------- CONFIRMATION BUTTONS ----------
var confirmButtons = [
  [
    {
      text: "✅ Yes, Reopen",
      callback_data:
        "SUPPORT_REOPEN_CONFIRM " + refId
    }
  ],
  [
    {
      text: "❌ Cancel",
      callback_data:
        "SUPPORT_ADMIN_REQUEST " + refId
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

// ---------- SHOW REOPEN CONFIRMATION ----------
showAdminMenu(
  confirmText,
  confirmButtons
);
