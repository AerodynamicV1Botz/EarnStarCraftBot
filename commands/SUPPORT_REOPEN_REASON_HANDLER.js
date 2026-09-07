/*CMD
  command: SUPPORT_REOPEN_REASON_HANDLER
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
// SCRIPT 113 — UPDATED VERSION
// COMMAND NAME: SUPPORT_REOPEN_REASON_HANDLER
// STEP 5.2.3.1.1.3.1.23
// 📁 Support → Reopen Reason Handler
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

// ---------- GET PARAMETERS ----------
// Format:
// SUPPORT_REOPEN_REASON_HANDLER REF_ID REASON

var rawParams = String(params || "").trim();
var parts = rawParams.split(/\s+/);

var refId = String(parts[0] || "").trim();
var reasonCode = String(parts[1] || "")
  .toUpperCase()
  .trim();

if (!refId || !reasonCode) {
  Bot.sendMessage(
    "❌ <b>Reference ID or reason missing.</b>",
    {
      parse_mode: "HTML"
    }
  );
  return;
}

// ---------- REASON DISPLAY ----------
var reasonText = "";

if (reasonCode == "USER_FOLLOWUP") {
  reasonText = "🔁 User Follow-up";
} else if (reasonCode == "ORDER_ISSUE") {
  reasonText = "📦 Order Issue";
} else if (reasonCode == "PAYMENT_ISSUE") {
  reasonText = "💳 Payment Issue";
} else if (reasonCode == "FURTHER_REVIEW") {
  reasonText = "⏳ Further Review Required";
} else if (reasonCode == "TECHNICAL_ISSUE") {
  reasonText = "🛠 Technical Issue";
} else if (reasonCode == "OTHER") {
  reasonText = "📝 Other Reason";
} else {
  reasonText = "📝 Other Reason";
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

if (currentStatus != "closed") {
  var statusText =
    "⚠️ <b>REQUEST IS NOT CLOSED</b>\n\n" +
    "🆔 Reference: <code>" +
    escapeHtml(refId) +
    "</code>\n\n" +
    "📌 Current Status: <b>" +
    escapeHtml(currentStatus.toUpperCase()) +
    "</b>";

  var statusButtons = [
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

  showAdminMenu(statusText, statusButtons);
  return;
}

// ---------- SAVE SELECTED REASON ----------
supportRequest.reopenReasonCode = reasonCode;
supportRequest.reopenReason = reasonText;
supportRequest.reopenReasonSelectedAt =
  new Date().toISOString();
supportRequest.reopenReasonSelectedBy = uid;

Bot.setProperty(
  "SUPPORT_REQUEST_" + refId,
  supportRequest,
  "json"
);

// ---------- CONFIRMATION TEXT ----------
var confirmText =
  "🔄 <b>CONFIRM REOPEN REQUEST</b>\n\n" +
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
  "📝 <b>Reason:</b>\n" +
  escapeHtml(reasonText) +
  "\n\n" +
  "Kya aap is request ko reopen karna chahte ho?";

// ---------- CONFIRMATION BUTTONS ----------
var confirmButtons = [
  [
    {
      text: "✅ Confirm Reopen",
      callback_data:
        "SUPPORT_REOPEN_SUBMIT " + refId
    }
  ],
  [
    {
      text: "🔙 Change Reason",
      callback_data:
        "SUPPORT_REOPEN_REASON " + refId
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

// ---------- SHOW CONFIRMATION ----------
showAdminMenu(
  confirmText,
  confirmButtons
);
