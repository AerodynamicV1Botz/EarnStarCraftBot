/*CMD
  command: SUPPORT_REOPEN_REASON
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
// SCRIPT 112 — UPDATED VERSION
// COMMAND NAME: SUPPORT_REOPEN_REASON
// STEP 5.2.3.1.1.3.1.22
// 📁 Support → Reopen Reason Selection
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

// ---------- REASON TEXT ----------
var reasonText =
  "📝 <b>SELECT REOPEN REASON</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "🆔 <b>Reference ID:</b>\n" +
  "<code>" +
  escapeHtml(refId) +
  "</code>\n\n" +
  "📦 <b>Order ID:</b>\n" +
  "<code>" +
  escapeHtml(supportRequest.orderId || "N/A") +
  "</code>\n\n" +
  "Request ko reopen karne ka reason select karo:";

// ---------- REASON BUTTONS ----------
var reasonButtons = [
  [
    {
      text: "🔁 User Follow-up",
      callback_data:
        "SUPPORT_REOPEN_REASON_HANDLER " +
        refId +
        " USER_FOLLOWUP"
    }
  ],
  [
    {
      text: "📦 Order Issue",
      callback_data:
        "SUPPORT_REOPEN_REASON_HANDLER " +
        refId +
        " ORDER_ISSUE"
    }
  ],
  [
    {
      text: "💳 Payment Issue",
      callback_data:
        "SUPPORT_REOPEN_REASON_HANDLER " +
        refId +
        " PAYMENT_ISSUE"
    }
  ],
  [
    {
      text: "⏳ Further Review Required",
      callback_data:
        "SUPPORT_REOPEN_REASON_HANDLER " +
        refId +
        " FURTHER_REVIEW"
    }
  ],
  [
    {
      text: "🛠 Technical Issue",
      callback_data:
        "SUPPORT_REOPEN_REASON_HANDLER " +
        refId +
        " TECHNICAL_ISSUE"
    }
  ],
  [
    {
      text: "📝 Other Reason",
      callback_data:
        "SUPPORT_REOPEN_REASON_HANDLER " +
        refId +
        " OTHER"
    }
  ],
  [
    {
      text: "❌ Cancel",
      callback_data:
        "SUPPORT_ADMIN_REQUEST " + refId
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

// ---------- SHOW REASON MENU ----------
showAdminMenu(
  reasonText,
  reasonButtons
);
