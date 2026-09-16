/*CMD
  command: BUILD_ADMIN_DISCUSSION_SAVE
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
  command: BUILD_ADMIN_DISCUSSION_SAVE
  need_reply: true
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 205 — BUILD_ADMIN_DISCUSSION_SAVE
// ADMIN MESSAGE → CLIENT
// WITH CONTINUE DISCUSSION BUTTONS
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
  Bot.sendMessage("❌ Admin access required.");
  return;
}

// =====================================================
// READ ADMIN MESSAGE
// =====================================================

var adminMessage = "";

if (typeof message === "string") {
  adminMessage = message;
} else if (typeof message === "object" && message !== null) {
  if (typeof message.text === "string") {
    adminMessage = message.text;
  } else if (typeof message.message === "string") {
    adminMessage = message.message;
  }
}

if (!adminMessage && typeof request !== "undefined") {
  if (typeof request === "string") {
    adminMessage = request;
  } else if (request && typeof request === "object") {
    if (typeof request.text === "string") {
      adminMessage = request.text;
    } else if (
      request.message &&
      typeof request.message.text === "string"
    ) {
      adminMessage = request.message.text;
    }
  }
}

adminMessage = String(adminMessage || "").trim();

if (!adminMessage) {
  Bot.sendMessage(
    "❌ Message empty hai.\n\nClient ko bhejne wala message type karo."
  );
  return;
}

// =====================================================
// LOAD TEMP DATA
// =====================================================

var temp = User.getProperty("BUILD_ADMIN_DISCUSSION_TEMP");

if (!temp || !temp.enquiryId || !temp.clientId) {
  Bot.sendMessage(
    "⚠️ Discussion session expired.\n\nEnquiry open karke dobara Discussion button press karo."
  );
  return;
}

var enquiryId = String(temp.enquiryId);
var clientId = String(temp.clientId);

var enquiryKey = "BUILD_ENQUIRY_" + enquiryId;
var enquiry = Bot.getProperty(enquiryKey);

if (!enquiry) {
  Bot.sendMessage("❌ Enquiry data not found.");
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
  sender: "admin",
  senderId: adminId,
  message: adminMessage,
  timestamp: now
});

enquiry.history.push({
  action: "admin_message_sent",
  sender: "admin",
  senderId: adminId,
  message: adminMessage,
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
// CLIENT MESSAGE WITH BUTTONS
// =====================================================

var clientText =
  "💬 <b>Message from EarnStar BOTCRAFT Admin</b>\n\n" +
  safeText(adminMessage) +
  "\n\n" +
  "🆔 Enquiry: <code>" + safeText(enquiryId) + "</code>\n\n" +
  "Aap neeche button se admin ke saath discussion continue kar sakte hain.";

var sentSuccessfully = false;

try {
  Api.sendMessage({
    chat_id: clientId,
    text: clientText,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "💬 Continue Discussion",
            callback_data: "BUILD_USER_DISCUSSION " + enquiryId
          }
        ],
        [
          {
            text: "✏️ Request Changes",
            callback_data: "BUILD_USER_REQUEST_CHANGES " + enquiryId
          }
        ]
      ]
    }
  });

  sentSuccessfully = true;
} catch (e) {
  sentSuccessfully = false;
}

// =====================================================
// ADMIN SUCCESS MESSAGE WITH REPLY BUTTON
// =====================================================

if (sentSuccessfully) {
  Api.sendMessage({
    chat_id: adminId,
    text:
      "✅ <b>Message successfully client ko bhej diya gaya.</b>\n\n" +
      "🆔 Enquiry: <code>" + safeText(enquiryId) + "</code>\n\n" +
      "Aap client ko dobara message bhej sakte hain.",
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
} else {
  Bot.sendMessage(
    "⚠️ Message history mein save ho gaya, lekin client ko send nahi ho paya.\n\n" +
    "Client ID: " + clientId
  );
}

User.setProperty(
  "BUILD_ADMIN_DISCUSSION_TEMP",
  "",
  "json"
);
