/*CMD
  command: SUPPORT_CREATE_TEXT
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

// CMD: SUPPORT_CREATE_TEXT

var userId = user.telegramid;

var createMode = Bot.getProperty(
  "SUPPORT_CREATE_MODE_" + userId
);

if (
  createMode != "waiting_subject" &&
  createMode != "waiting_message"
) {
  return;
}

var inputText = "";

if (request && request.text) {
  inputText = request.text;
} else if (
  typeof message !== "undefined" &&
  message
) {
  inputText = message;
} else if (
  typeof messageText !== "undefined" &&
  messageText
) {
  inputText = messageText;
}

inputText = String(inputText || "").trim();

if (!inputText) {
  return;
}

if (inputText == "/cancel") {
  Bot.setProperty(
    "SUPPORT_CREATE_MODE_" + userId,
    "idle",
    "string"
  );

  Bot.setProperty(
    "SUPPORT_CREATE_SUBJECT_" + userId,
    "",
    "string"
  );

  Bot.setProperty(
    "SUPPORT_CREATE_MESSAGE_" + userId,
    "",
    "string"
  );

  Bot.sendMessage("❌ Support request cancelled.");
  return;
}

if (inputText.length > 4000) {
  Bot.sendMessage(
    "❌ Message maximum 4000 characters ka ho sakta hai."
  );
  return;
}

function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

if (createMode == "waiting_subject") {
  if (inputText.length > 100) {
    Bot.sendMessage(
      "❌ Subject maximum 100 characters ka ho sakta hai."
    );
    return;
  }

  Bot.setProperty(
    "SUPPORT_CREATE_SUBJECT_" + userId,
    inputText,
    "string"
  );

  Bot.setProperty(
    "SUPPORT_CREATE_MODE_" + userId,
    "waiting_message",
    "string"
  );

  Api.sendMessage({
    chat_id: userId,
    text:
      "💬 <b>Request Details</b>\n\n" +
      "Ab apni problem ya request detail mein bhejiye.\n\n" +
      "❌ Cancel karne ke liye /cancel likhiye.",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "❌ Cancel",
            callback_data: "SUPPORT_CREATE_CANCEL"
          }
        ]
      ]
    }
  });

  return;
}

var subject = Bot.getProperty(
  "SUPPORT_CREATE_SUBJECT_" + userId
);

if (!subject) {
  Bot.sendMessage(
    "❌ Subject missing hai. Dobara request create karein."
  );
  return;
}

var refId =
  "ES-" +
  new Date().getTime().toString().slice(-8);

var fullName =
  user.first_name +
  (user.last_name ? " " + user.last_name : "");

var requestData = {
  id: refId,
  ref_id: refId,
  user_id: userId,
  telegramid: userId,
  user_telegramid: userId,
  name: fullName,
  full_name: fullName,
  username: user.username || "",
  subject: subject,
  title: subject,
  message: inputText,
  text: inputText,
  status: "new",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

var requestKeys =
  Bot.getProperty("SUPPORT_REQUEST_KEYS") || [];

if (requestKeys.indexOf(refId) == -1) {
  requestKeys.push(refId);
}

Bot.setProperty(
  "SUPPORT_REQUEST_KEYS",
  requestKeys,
  "json"
);

Bot.setProperty(
  "SUPPORT_REQUEST_" + refId,
  requestData,
  "json"
);

Bot.setProperty(
  "SUPPORT_CREATE_MODE_" + userId,
  "idle",
  "string"
);

Bot.setProperty(
  "SUPPORT_CREATE_SUBJECT_" + userId,
  "",
  "string"
);

Bot.setProperty(
  "SUPPORT_CREATE_MESSAGE_" + userId,
  "",
  "string"
);

var adminText =
  "🆕 <b>New Support Request</b>\n\n" +
  "🆔 <b>Reference:</b> <code>" +
  escapeHtml(refId) +
  "</code>\n" +
  "👤 <b>User:</b> " +
  escapeHtml(fullName) +
  "\n" +
  "🆔 <b>User ID:</b> <code>" +
  userId +
  "</code>\n\n" +
  "📝 <b>Subject:</b>\n" +
  escapeHtml(subject) +
  "\n\n" +
  "💬 <b>Message:</b>\n" +
  escapeHtml(inputText) +
  "\n\n" +
  "📌 <b>Status:</b> 🟡 New";

try {
  Api.sendMessage({
    chat_id: 7897324623,
    text: adminText,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📄 View Request",
            callback_data:
              "SUPPORT_ADMIN_REQUEST_DETAILS " + refId
          }
        ],
        [
          {
            text: "💬 Reply User",
            callback_data:
              "SUPPORT_REPLY " + refId
          }
        ]
      ]
    }
  });
} catch (error) {
  // Admin notification fail hone par request phir bhi save rahegi.
}

Api.sendMessage({
  chat_id: userId,
  text:
    "✅ <b>Support Request Created</b>\n\n" +
    "🆔 <b>Reference:</b> <code>" +
    escapeHtml(refId) +
    "</code>\n\n" +
    "📌 <b>Status:</b> 🟡 New\n\n" +
    "Aapki request support team ko bhej di gayi hai.",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📄 View Request",
          callback_data:
            "SUPPORT_USER_REQUEST_DETAILS " + refId
        }
      ],
      [
        {
          text: "📂 My Requests",
          callback_data: "SUPPORT_USER_REQUESTS"
        }
      ]
    ]
  }
});
