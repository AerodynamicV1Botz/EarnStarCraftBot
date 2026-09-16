/*CMD
  command: BUILD_USER_DISCUSSION_SAVE
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
  command: BUILD_USER_DISCUSSION_SAVE
  need_reply: true
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 207 — BUILD_USER_DISCUSSION_SAVE
// CLIENT MESSAGE → ADMIN
// CONTINUE DISCUSSION BUTTON INCLUDED
// =====================================================

var clientId = String(user.telegramid);
var OWNER_ID = "7897324623";

function safeText(text) {
  return String(text == null ? "" : text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getAdmins() {
  var result = [OWNER_ID];
  var admins = Bot.getProperty("EARNSTAR_ADMINS");

  if (!admins) {
    return result;
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

    savedId = String(savedId || "");

    if (savedId && result.indexOf(savedId) === -1) {
      result.push(savedId);
    }
  }

  return result;
}

// =====================================================
// READ CLIENT MESSAGE
// =====================================================

var clientMessage = "";

if (typeof message === "string") {
  clientMessage = message;
} else if (typeof message === "object" && message !== null) {
  if (typeof message.text === "string") {
    clientMessage = message.text;
  } else if (typeof message.message === "string") {
    clientMessage = message.message;
  }
}

if (!clientMessage && typeof request !== "undefined") {
  if (typeof request === "string") {
    clientMessage = request;
  } else if (request && typeof request === "object") {
    if (typeof request.text === "string") {
      clientMessage = request.text;
    } else if (
      request.message &&
      typeof request.message.text === "string"
    ) {
      clientMessage = request.message.text;
    }
  }
}

clientMessage = String(clientMessage || "").trim();

if (!clientMessage) {
  Bot.sendMessage(
    "❌ Message empty hai.\n\nPlease admin ko bhejne wala message type karo."
  );
  return;
}

// =====================================================
// LOAD TEMP DATA
// =====================================================

var temp = User.getProperty("BUILD_USER_DISCUSSION_TEMP");

if (!temp || !temp.enquiryId) {
  Bot.sendMessage(
    "⚠️ Discussion session expired.\n\nPlease Continue Discussion button dobara press karo."
  );
  return;
}

var enquiryId = String(temp.enquiryId);
var enquiryKey = "BUILD_ENQUIRY_" + enquiryId;
var enquiry = Bot.getProperty(enquiryKey);

if (!enquiry) {
  Bot.sendMessage("❌ Enquiry data not found.");
  return;
}

var savedClientId = String(
  enquiry.userId ||
  enquiry.clientId ||
  enquiry.telegramId ||
  ""
);

if (savedClientId !== clientId) {
  Bot.sendMessage("❌ You are not allowed to reply to this enquiry.");
  return;
}

// =====================================================
// SAVE DISCUSSION HISTORY
// =====================================================

if (!Array.isArray(enquiry.discussionHistory)) {
  enquiry.discussionHistory = [];
}

if (!Array.isArray(enquiry.history)) {
  enquiry.history = [];
}

var now = Date.now();

enquiry.discussionHistory.push({
  sender: "client",
  senderId: clientId,
  message: clientMessage,
  timestamp: now
});

enquiry.history.push({
  action: "client_message_sent",
  sender: "client",
  senderId: clientId,
  message: clientMessage,
  timestamp: now
});

enquiry.status = "discussion";
enquiry.requestStatus = "discussion";
enquiry.stage = "discussion";
enquiry.packageStep = "discussion";
enquiry.updatedAt = now;

if (!enquiry.progress) {
  enquiry.progress = 30;
}

Bot.setProperty(
  enquiryKey,
  enquiry,
  "json"
);

Bot.setProperty(
  "BUILD_ENQUIRY_" + clientId,
  enquiry,
  "json"
);

// =====================================================
// USER CONFIRMATION WITH CONTINUE BUTTON
// =====================================================

Bot.sendInlineKeyboard(
  [
    [
      {
        title: "💬 Continue Discussion",
        command: "BUILD_USER_DISCUSSION " + enquiryId
      }
    ],
    [
      {
        title: "✏️ Request Changes",
        command: "BUILD_USER_REQUEST_CHANGES " + enquiryId
      }
    ]
  ],
  "✅ <b>Aapka message admin ko successfully bhej diya gaya.</b>\n\n" +
  "🆔 Enquiry: <code>" + safeText(enquiryId) + "</code>\n\n" +
  "Aap neeche button se admin ko dusra message bhi bhej sakte hain.",
  {
    parse_mode: "HTML"
  }
);

// =====================================================
// SEND MESSAGE TO ADMINS
// =====================================================

var admins = getAdmins();

var adminText =
  "💬 <b>New Client Discussion Message</b>\n\n" +
  "👤 <b>Client ID:</b> <code>" + safeText(clientId) + "</code>\n" +
  "🆔 <b>Enquiry:</b> <code>" + safeText(enquiryId) + "</code>\n\n" +
  "<b>Client Message:</b>\n" +
  safeText(clientMessage);

for (var i = 0; i < admins.length; i++) {
  var targetAdmin = String(admins[i]);

  try {
    Api.sendMessage({
      chat_id: targetAdmin,
      text: adminText,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "💬 Reply to Client",
              callback_data: "BUILD_ADMIN_DISCUSSION " + enquiryId
            }
          ]
        ]
      }
    });
  } catch (e) {
    // Continue for remaining admins
  }
}

User.setProperty(
  "BUILD_USER_DISCUSSION_TEMP",
  "",
  "json"
);
