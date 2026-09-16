/*CMD
  command: ADMIN_REJECT_PAYMENT
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
  command: ADMIN_REJECT_PAYMENT
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 35 — ADMIN_REJECT_PAYMENT
// ADMIN → REJECT ADVANCE PAYMENT PROOF
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
      text: "Payment proof rejected.",
      show_alert: false
    });
  } catch (error) {}
}


// =====================================================
// 👑 ADMIN CHECK
// =====================================================

var adminId = String(user.telegramid);
var ownerId = "7897324623";

var adminList =
  Bot.getProperty("EARNSTAR_ADMINS") || [];

if (!Array.isArray(adminList)) {
  adminList = [];
}

var isAuthorized = adminId === ownerId;

if (!isAuthorized) {
  for (var i = 0; i < adminList.length; i++) {
    var savedAdminId = "";

    if (
      typeof adminList[i] === "object" &&
      adminList[i] !== null
    ) {
      savedAdminId = String(
        adminList[i].id ||
        adminList[i].telegramId ||
        adminList[i].userId ||
        ""
      );
    } else {
      savedAdminId = String(adminList[i] || "");
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
    text: "❌ You are not authorized."
  });

  return;
}


// =====================================================
// 🆔 READ ORDER ID
// Supports:
// ADMIN_REJECT_PAYMENT orderId
// ADMIN_REJECT_PAYMENT|orderId
// params
// =====================================================

var callbackData = "";

if (
  typeof request !== "undefined" &&
  request
) {
  callbackData = String(
    request.data ||
    request.callback_data ||
    ""
  );
}

var orderId = "";

if (
  typeof params !== "undefined" &&
  params
) {
  orderId = String(params).trim();
}

if (!orderId && callbackData) {
  if (callbackData.indexOf("|") !== -1) {
    orderId = callbackData.split("|").slice(1).join("|");
  } else {
    var callbackParts =
      callbackData.trim().split(/\s+/);

    if (callbackParts.length > 1) {
      orderId = callbackParts.slice(1).join(" ");
    }
  }
}

if (
  !orderId &&
  typeof message !== "undefined" &&
  message
) {
  var messageText = "";

  if (typeof message === "string") {
    messageText = message;
  } else if (message.text) {
    messageText = String(message.text);
  } else if (message.caption) {
    messageText = String(message.caption);
  }

  messageText = messageText.trim();

  if (messageText.indexOf("|") !== -1) {
    orderId = messageText.split("|").slice(1).join("|");
  } else {
    var messageParts =
      messageText.split(/\s+/);

    if (messageParts.length > 1) {
      orderId = messageParts.slice(1).join(" ");
    }
  }
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

var draft =
  Bot.getProperty("ORDER_" + orderId);

if (
  !draft ||
  typeof draft !== "object"
) {
  Api.sendMessage({
    chat_id: adminId,
    text: "❌ Order not found."
  });

  return;
}


// =====================================================
// 👤 CLIENT ID
// =====================================================

var clientId = String(
  draft.userId ||
  draft.telegramId ||
  (
    draft.telegramProfile &&
    (
      draft.telegramProfile.telegramId ||
      draft.telegramProfile.userId
    )
  ) ||
  Bot.getProperty("ORDER_USER_" + orderId) ||
  ""
).trim();

if (!clientId) {
  Api.sendMessage({
    chat_id: adminId,
    text: "❌ Client ID not found."
  });

  return;
}


// =====================================================
// 🛑 STATUS CHECK
// =====================================================

if (
  draft.paymentStatus !== "proof_submitted"
) {
  Api.sendMessage({
    chat_id: adminId,
    text:
      "⚠️ Is order ka advance payment proof pending nahi hai."
  });

  return;
}


// =====================================================
// 🧹 CLEAR OLD PROOF WAITING STATE
// =====================================================

Bot.setProperty(
  "PAYMENT_PROOF_WAITING_" + clientId,
  "",
  "string"
);


// =====================================================
// 💾 UPDATE FINAL ORDER
// =====================================================

var now = new Date().toISOString();

draft.stage = "advance_payment";
draft.packageStep = "advance_payment";

draft.requestStatus = "accepted";
draft.orderStatus = "accepted";

draft.paymentStatus = "advance_requested";
draft.paymentVerificationStatus = "rejected";

draft.paymentProofRejected = true;
draft.paymentProofRejectedBy = adminId;
draft.paymentProofRejectedAt = now;

draft.paymentProofFileId = "";
draft.paymentProofType = "";
draft.paymentProofSubmittedAt = "";

draft.progress = 30;
draft.progressTitle = "Payment Proof Rejected";
draft.progressUpdate =
  "Payment proof rejected. Client must submit a valid proof again.";

draft.updatedAt = now;
draft.adminId = adminId;


// =====================================================
// 💾 SAVE FINAL ORDER ONLY
// =====================================================

Bot.setProperty(
  "ORDER_" + orderId,
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
// 📩 CLIENT REJECTION MESSAGE
// =====================================================

var advanceAmount = Number(
  draft.advanceAmount || 0
);

if (isNaN(advanceAmount)) {
  advanceAmount = 0;
}

Api.sendMessage({
  chat_id: clientId,

  text:
    "❌ <b>Payment Proof Rejected</b>\n\n" +

    "🆔 <b>Order ID:</b> " +
    safeText(orderId) +
    "\n\n" +

    "Aapka advance payment screenshot verify nahi ho saka.\n" +
    "Please clear aur correct payment screenshot dobara submit karein.\n\n" +

    "💰 <b>Advance Amount:</b> ₹" +
    advanceAmount.toFixed(2) +
    "\n\n" +

    "📌 Screenshot mein payment amount, date aur transaction details clearly visible honi chahiye.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📤 Submit Payment Proof Again",
          callback_data:
            "ORDER_PAYMENT_PROOF " + orderId
        }
      ],
      [
        {
          text: "💬 Contact Admin",
          callback_data:
            "ORDER_CONTACT_ADMIN " + orderId
        }
      ],
      [
        {
          text: "📦 Track Order",
          callback_data:
            "ORDER_TRACK " + orderId
        }
      ]
    ]
  }
});


// =====================================================
// 📩 ADMIN CONFIRMATION
// =====================================================

Api.sendMessage({
  chat_id: adminId,

  text:
    "❌ <b>Payment Proof Rejected</b>\n\n" +

    "🆔 <b>Order ID:</b> " +
    safeText(orderId) +
    "\n\n" +

    "👤 <b>Client ID:</b> " +
    safeText(clientId) +
    "\n\n" +

    "Payment proof reject kar diya gaya hai.\n" +
    "Client ko dobara valid proof submit karne ka option de diya gaya hai.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "👁 View Order",
          callback_data:
            "ADMIN_VIEW_ORDER " + orderId
        }
      ],
      [
        {
          text: "📊 Admin Panel",
          callback_data: "ADMIN_PANEL"
        }
      ]
    ]
  }
});
