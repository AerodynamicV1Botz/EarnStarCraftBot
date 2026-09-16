/*CMD
  command: BUILD_CLIENT_DISCUSS
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
  command: BUILD_CLIENT_DISCUSS
  need_reply: false
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 207 — BUILD_CLIENT_DISCUSS
// CLIENT → QUOTE DISCUSSION
// =====================================================


// =====================================================
// 👤 CLIENT ID
// =====================================================

var clientId =
  String(user.telegramid);


// =====================================================
// 🔐 HTML SAFE TEXT
// =====================================================

function safeText(value) {

  return String(
    value === undefined ||
    value === null
      ? ""
      : value
  )
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


// =====================================================
// 🆔 ENQUIRY ID
// =====================================================

var enquiryId =
  String(
    params ||
    ""
  ).trim();


if (!enquiryId) {

  Bot.sendMessage(
    "❌ Enquiry ID missing.\n\n" +
    "Please open your enquiry again."
  );

  return;
}


// =====================================================
// 📦 LOAD ENQUIRY
// =====================================================

var enquiry =
  Bot.getProperty(
    "BUILD_ENQUIRY_" + enquiryId
  );


if (!enquiry) {

  Bot.sendMessage(
    "❌ Enquiry not found.\n\n" +
    "Please try again."
  );

  return;
}


// =====================================================
// 🔐 CLIENT OWNERSHIP CHECK
// =====================================================

var enquiryClientId =
  String(
    enquiry.userId ||
    ""
  );


if (!enquiryClientId) {

  var mappedClientId =
    Bot.getProperty(
      "BUILD_ENQUIRY_USER_" + enquiryId
    );

  if (mappedClientId) {

    enquiryClientId =
      String(mappedClientId);

  }

}


if (
  !enquiryClientId ||
  enquiryClientId !== clientId
) {

  Bot.sendMessage(
    "❌ Access denied.\n\n" +
    "This enquiry does not belong to you."
  );

  return;
}


// =====================================================
// 🚫 STATUS CHECK
// =====================================================

var status =
  String(
    enquiry.status ||
    ""
  ).toLowerCase();


if (status === "rejected") {

  Bot.sendMessage(
    "❌ This enquiry has been rejected."
  );

  return;
}


if (status === "closed") {

  Bot.sendMessage(
    "🔒 This enquiry is already closed."
  );

  return;
}


if (status === "completed") {

  Bot.sendMessage(
    "✅ This enquiry is already completed."
  );

  return;
}


if (
  status !== "accepted" &&
  status !== "quote_set" &&
  status !== "quote_agreed"
) {

  Bot.sendMessage(
    "⚠️ Quote discussion is not available right now.\n\n" +
    "Please wait until the enquiry is accepted and the quote is ready."
  );

  return;
}


// =====================================================
// 💬 ENSURE CONTACT OBJECT
// =====================================================

if (!enquiry.contacts) {

  enquiry.contacts = {

    telegram: "",
    otherNumber: "",
    instagram: "",
    whatsapp: "",
    email: ""

  };

}


// =====================================================
// 💬 DISCUSSION STATE
// =====================================================

enquiry.stage =
  "discussion";

enquiry.packageStep =
  "client_discussion";

enquiry.updatedAt =
  new Date().toISOString();


// =====================================================
// 📝 HISTORY
// =====================================================

if (!enquiry.history) {

  enquiry.history = [];

}


enquiry.history.push({

  action:
    "client_discussion_opened",

  clientId:
    clientId,

  timestamp:
    new Date().toISOString()

});


// =====================================================
// 💾 SAVE ACTIVE ENQUIRY
// =====================================================

Bot.setProperty(
  "BUILD_ENQUIRY_" + clientId,
  enquiry,
  "json"
);


// =====================================================
// 💾 SAVE ID-BASED ENQUIRY
// =====================================================

Bot.setProperty(
  "BUILD_ENQUIRY_" + enquiryId,
  enquiry,
  "json"
);


// =====================================================
// 💾 SAVE USER MAPPING
// =====================================================

Bot.setProperty(
  "BUILD_ENQUIRY_USER_" + enquiryId,
  clientId,
  "string"
);


// =====================================================
// ⏳ CREATE PENDING STATE
// =====================================================

var pendingKey =
  "BUILD_CLIENT_DISCUSS_PENDING_" +
  clientId;


Bot.setProperty(
  pendingKey,
  enquiryId,
  "string"
);


// =====================================================
// 🌐 USER LANGUAGE
// =====================================================

var userData =
  Bot.getProperty(
    "USER_" + clientId
  );


var language =
  String(
    (userData && userData.language) ||
    enquiry.language ||
    "hinglish"
  ).toLowerCase();


// =====================================================
// 💬 DISCUSSION PROMPT
// =====================================================

var text = "";


if (language === "english") {

  text =
    "💬 <b>Quote Discussion</b>\n\n" +

    "You can discuss the quote, requirements, " +
    "changes, questions or anything related to your project here.\n\n" +

    "✍️ Please type your message and send it.";

} else if (language === "gujarati") {

  text =
    "💬 <b>Quote Discussion</b>\n\n" +

    "Tame quote, requirements, changes, questions " +
    "athva project vishe koi pan vaat kari shako cho.\n\n" +

    "✍️ Tamaro message type kari ne send karo.";

} else {

  text =
    "💬 <b>Quote Discussion</b>\n\n" +

    "Aap quote, requirements, changes, questions " +
    "ya project se related koi bhi baat discuss kar sakte ho.\n\n" +

    "✍️ Please apna message type karke send karo.";

}


// =====================================================
// 🔘 CANCEL BUTTON
// =====================================================

var buttons = [

  {
    title:
      "❌ Cancel",

    command:
      "BUILD_CLIENT_REPLY_CANCEL"
  }

];


// =====================================================
// 📤 SEND PROMPT
// =====================================================

try {

  Bot.sendInlineKeyboard(
    buttons,
    text
  );

} catch (error) {

  Bot.sendMessage(
    text
  );

}


// =====================================================
// ▶️ START SAVE / WAIT COMMAND
// =====================================================
//
// IMPORTANT:
// 208 has need_reply:true.
// Its BJS will execute after the client's
// next message.
//

Bot.runCommand(
  "BUILD_CLIENT_DISCUSS_SAVE"
);
