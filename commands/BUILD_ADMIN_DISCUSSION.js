/*CMD
  command: BUILD_ADMIN_DISCUSSION
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
  command: BUILD_ADMIN_DISCUSSION
  need_reply: false
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 204 — BUILD_ADMIN_DISCUSSION
// ADMIN → START / CONTINUE CLIENT DISCUSSION
// =====================================================

var adminId = String(user.telegramid);
var OWNER_ID = "7897324623";

function safeText(text) {
  return String(text == null ? "" : text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isAdmin(id) {
  id = String(id);

  if (id === OWNER_ID) {
    return true;
  }

  var admins = Bot.getProperty("EARNSTAR_ADMINS");

  if (!admins) {
    return false;
  }

  if (typeof admins === "string") {
    try {
      admins = JSON.parse(admins);
    } catch (e) {
      admins = [admins];
    }
  }

  if (!Array.isArray(admins)) {
    admins = [admins];
  }

  for (var i = 0; i < admins.length; i++) {
    var item = admins[i];
    var savedId = "";

    if (typeof item === "object" && item !== null) {
      savedId = item.id || item.telegramId || item.userId || "";
    } else {
      savedId = item;
    }

    if (String(savedId) === id) {
      return true;
    }
  }

  return false;
}

if (!isAdmin(adminId)) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ Admin access required",
    show_alert: true
  });
  return;
}

var enquiryId = "";

if (typeof params !== "undefined") {
  enquiryId = String(params || "").trim();
}

if (!enquiryId) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ Enquiry ID missing",
    show_alert: true
  });
  return;
}

var enquiry = Bot.getProperty("BUILD_ENQUIRY_" + enquiryId);

if (!enquiry) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ Enquiry not found",
    show_alert: true
  });
  return;
}

var clientId = String(
  enquiry.userId ||
  enquiry.clientId ||
  enquiry.telegramId ||
  ""
);

if (!clientId) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ Client ID missing",
    show_alert: true
  });
  return;
}

var currentStatus = String(
  enquiry.status ||
  enquiry.requestStatus ||
  ""
);

if (
  currentStatus !== "accepted" &&
  currentStatus !== "discussion" &&
  currentStatus !== "proposal_sent" &&
  currentStatus !== "changes_requested"
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "⚠️ Discussion is not available now",
    show_alert: true
  });
  return;
}

User.setProperty(
  "BUILD_ADMIN_DISCUSSION_TEMP",
  {
    enquiryId: enquiryId,
    clientId: clientId,
    adminId: adminId,
    createdAt: Date.now()
  },
  "json"
);

Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "Type your message for the client"
});

var clientName = safeText(
  enquiry.name ||
  enquiry.clientName ||
  enquiry.fullName ||
  "Client"
);

var packageName = safeText(
  enquiry.packageName ||
  enquiry.packageType ||
  enquiry.service ||
  "Custom Bot"
);

Api.editMessageText({
  chat_id: adminId,
  message_id: request.message.message_id,
  text:
    "💬 <b>CLIENT DISCUSSION</b>\n\n" +
    "👤 <b>Client:</b> " + clientName + "\n" +
    "📦 <b>Package:</b> " + packageName + "\n" +
    "🆔 <b>Enquiry:</b> <code>" + safeText(enquiryId) + "</code>\n\n" +
    "✍️ Client ko bhejne wala message type karo.\n\n" +
    "Aap requirements, price, timeline ya project details discuss kar sakte ho.",
  parse_mode: "HTML"
});

Bot.runCommand("BUILD_ADMIN_DISCUSSION_SAVE");
