/*CMD
  command: BUILD_ADMIN_ACCEPT
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
  command: BUILD_ADMIN_ACCEPT
  need_reply: false
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 198 — BUILD_ADMIN_ACCEPT
// ADMIN → ACCEPT BUILD ENQUIRY
// =====================================================


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
      text: "Accepting enquiry..."
    });
  } catch (error) {}
}


// =====================================================
// 👤 ADMIN ID
// =====================================================

var adminId = String(user.telegramid || "");


// =====================================================
// 🆔 READ ENQUIRY ID
// =====================================================

var enquiryId = String(params || "").trim();

if (!enquiryId) {
  Api.sendMessage({
    chat_id: adminId,
    text:
      "❌ <b>Invalid Enquiry ID</b>\n\n" +
      "Please open the enquiry again.",
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 👑 OWNER + ADMIN LIST
// =====================================================

var ownerId = "7897324623";

var adminList =
  Bot.getProperty("EARNSTAR_ADMINS") || [];

if (!Array.isArray(adminList)) {
  adminList = [];
}


// =====================================================
// 🔐 ADMIN AUTHORIZATION
// =====================================================

var isAuthorized =
  adminId === ownerId;

if (!isAuthorized) {
  for (var i = 0; i < adminList.length; i++) {
    var allowedId = "";

    if (
      typeof adminList[i] === "object" &&
      adminList[i] !== null
    ) {
      allowedId = String(
        adminList[i].id ||
        adminList[i].telegramId ||
        ""
      );
    } else {
      allowedId = String(
        adminList[i] || ""
      );
    }

    if (allowedId === adminId) {
      isAuthorized = true;
      break;
    }
  }
}

if (!isAuthorized) {
  Api.sendMessage({
    chat_id: adminId,
    text:
      "⛔ <b>Access Denied</b>\n\n" +
      "You are not authorized to accept Build Enquiries.",
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 🔐 HTML SAFE TEXT
// =====================================================

function safeText(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


// =====================================================
// 📋 EXTRACT ORIGINAL REQUIREMENTS
// IMPORTANT: OBJECT KO DIRECT STRING NAHI BANANA
// =====================================================

function extractRequirements(value) {
  if (
    value === null ||
    typeof value === "undefined"
  ) {
    return "";
  }

  if (typeof value === "string") {
    return value.trim();
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    var arrayText = [];

    for (var a = 0; a < value.length; a++) {
      var arrayItem =
        extractRequirements(value[a]);

      if (arrayItem) {
        arrayText.push(arrayItem);
      }
    }

    return arrayText.join("\n").trim();
  }

  if (typeof value === "object") {
    var objectFields = [
      "description",
      "fullMessage",
      "text",
      "message",
      "requirements",
      "requirement",
      "details",
      "content",
      "value"
    ];

    for (var b = 0; b < objectFields.length; b++) {
      var objectValue =
        value[objectFields[b]];

      var extracted =
        extractRequirements(objectValue);

      if (extracted) {
        return extracted;
      }
    }

    return "";
  }

  return "";
}


// =====================================================
// 📦 LOAD ENQUIRY
// =====================================================

var enquiryKey =
  "BUILD_ENQUIRY_" + enquiryId;

var enquiry =
  Bot.getProperty(enquiryKey);

if (
  !enquiry ||
  typeof enquiry !== "object"
) {
  Api.sendMessage({
    chat_id: adminId,
    text:
      "❌ <b>Enquiry Not Found</b>\n\n" +
      "🆔 <b>Enquiry ID:</b> " +
      safeText(enquiryId),
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 👤 CLIENT ID
// =====================================================

var clientId = String(
  enquiry.userId ||
  Bot.getProperty(
    "BUILD_ENQUIRY_USER_" + enquiryId
  ) ||
  ""
).trim();

if (!clientId) {
  Api.sendMessage({
    chat_id: adminId,
    text:
      "❌ <b>Client ID Missing</b>\n\n" +
      "The client Telegram ID could not be found.",
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 🛑 STATUS CHECK
// =====================================================

var currentStatus =
  String(enquiry.status || "").toLowerCase();

if (currentStatus === "accepted") {
  Api.sendMessage({
    chat_id: adminId,
    text:
      "⚠️ <b>Already Accepted</b>\n\n" +
      "This enquiry is already in discussion stage.",
    parse_mode: "HTML"
  });

  return;
}

if (currentStatus === "rejected") {
  Api.sendMessage({
    chat_id: adminId,
    text:
      "⚠️ <b>Enquiry Already Rejected</b>\n\n" +
      "A rejected enquiry cannot be accepted.",
    parse_mode: "HTML"
  });

  return;
}

if (currentStatus === "completed") {
  Api.sendMessage({
    chat_id: adminId,
    text:
      "⚠️ <b>Enquiry Already Completed</b>\n\n" +
      "This enquiry is already completed.",
    parse_mode: "HTML"
  });

  return;
}

if (currentStatus !== "submitted") {
  Api.sendMessage({
    chat_id: adminId,
    text:
      "⚠️ <b>Invalid Enquiry Status</b>\n\n" +
      "🆔 <b>Enquiry ID:</b> " +
      safeText(enquiryId) +
      "\n\n" +
      "Current Status: " +
      safeText(enquiry.status || "unknown") +
      "\n\n" +
      "Only submitted enquiries can be accepted.",
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 🕐 TIMESTAMP
// =====================================================

var updatedAt =
  new Date().toISOString();


// =====================================================
// 📋 GET ORIGINAL USER REQUIREMENTS
// =====================================================

var originalRequirements = "";

var requirementSources = [
  enquiry.userRequirements,
  enquiry.requirements,
  enquiry.originalRequirements,
  enquiry.requirement,
  enquiry.requirementText,
  enquiry.requirementsText,
  enquiry.buildRequirements,
  enquiry.projectRequirements,
  enquiry.customRequirements,
  enquiry.details,
  enquiry.description,
  enquiry.message,
  enquiry.userMessage
];

for (var r = 0; r < requirementSources.length; r++) {
  var extractedRequirements =
    extractRequirements(
      requirementSources[r]
    );

  if (extractedRequirements) {
    originalRequirements =
      extractedRequirements;

    break;
  }
}

if (!originalRequirements) {
  originalRequirements =
    "Not available";
}


// =====================================================
// 🧱 INITIALIZE DISCUSSION DATA
// =====================================================

// Original requirements ko text format mein save karo.
// Isse [object Object] problem dobara nahi hogi.

enquiry.userRequirements =
  originalRequirements;

if (
  typeof enquiry.adminFinalRequirements !== "string"
) {
  enquiry.adminFinalRequirements = "";
}

if (
  typeof enquiry.adminDiscussion !== "string"
) {
  enquiry.adminDiscussion = "";
}

enquiry.userAgreement = false;

if (
  !Array.isArray(enquiry.additionalRequirements)
) {
  enquiry.additionalRequirements = [];
}

if (
  !Array.isArray(enquiry.discussionHistory)
) {
  enquiry.discussionHistory = [];
}

if (
  !Array.isArray(enquiry.history)
) {
  enquiry.history = [];
}


// =====================================================
// 🟢 UPDATE ENQUIRY
// =====================================================

enquiry.status = "accepted";
enquiry.stage = "discussion";
enquiry.packageStep = "discussion";
enquiry.progress = 10;

enquiry.progressTitle =
  "Enquiry Accepted";

enquiry.progressUpdate =
  "Your Build Enquiry has been accepted. " +
  "The admin will discuss your requirements and " +
  "prepare a final proposal.";

enquiry.acceptedAt = updatedAt;
enquiry.acceptedBy = adminId;
enquiry.updatedAt = updatedAt;


// =====================================================
// 📝 SAVE HISTORY
// =====================================================

enquiry.history.push({
  action: "accepted",
  adminId: adminId,
  timestamp: updatedAt,
  note:
    "Build Enquiry accepted. Discussion stage started."
});

enquiry.discussionHistory.push({
  action: "enquiry_accepted",
  adminId: adminId,
  timestamp: updatedAt,
  note:
    "Admin accepted the enquiry. Final requirements and proposal discussion can begin."
});


// =====================================================
// 💾 SAVE ENQUIRY
// =====================================================

Bot.setProperty(
  "BUILD_ENQUIRY_" + clientId,
  enquiry,
  "json"
);

Bot.setProperty(
  "BUILD_ENQUIRY_" + enquiryId,
  enquiry,
  "json"
);

Bot.setProperty(
  "BUILD_ENQUIRY_USER_" + enquiryId,
  clientId,
  "string"
);


// =====================================================
// 🔘 ADMIN BUTTONS
// =====================================================

var adminButtons = [
  [
    {
      text: "📝 Update Final Requirements",
      callback_data:
        "BUILD_ADMIN_UPDATE_REQUIREMENTS " +
        enquiryId
    }
  ],
  [
    {
      text: "📤 Send Proposal to User",
      callback_data:
        "BUILD_ADMIN_SEND_PROPOSAL " +
        enquiryId
    }
  ],
  [
    {
      text: "🔎 View Enquiry",
      callback_data:
        "BUILD_ADMIN_VIEW " +
        enquiryId
    }
  ],
  [
    {
      text: "❌ Reject Enquiry",
      callback_data:
        "BUILD_ADMIN_REJECT " +
        enquiryId
    }
  ]
];


// =====================================================
// 👤 CLIENT NAME
// =====================================================

var clientDisplayName = String(
  enquiry.userName ||
  enquiry.fullName ||
  "Telegram User"
);


// =====================================================
// 📩 ADMIN MESSAGE
// =====================================================

var adminText =
  "✅ <b>BUILD ENQUIRY ACCEPTED</b>\n\n" +

  "🆔 <b>Enquiry ID:</b> " +
  safeText(enquiryId) +
  "\n\n" +

  "👤 <b>Client:</b> " +
  '<a href="tg://user?id=' +
  safeText(clientId) +
  '">' +
  safeText(clientDisplayName) +
  "</a>\n" +

  "🆔 <b>Telegram ID:</b> " +
  safeText(clientId) +
  "\n\n" +

  "━━━━━━━━━━━━━━━━━━\n" +

  "🟢 <b>Status:</b> Accepted\n" +
  "💬 <b>Stage:</b> Discussion\n" +
  "📈 <b>Progress:</b> 10%\n" +

  "━━━━━━━━━━━━━━━━━━\n\n" +

  "📋 <b>Original User Requirements</b>\n" +
  "<blockquote>" +
  safeText(originalRequirements) +
  "</blockquote>\n\n" +

  "💬 <b>Next Step</b>\n" +
  "Discuss the requirements with the client, " +
  "update your final/proposed requirements, and " +
  "send the proposal to the user.\n\n" +

  "⚠️ <b>Important:</b>\n" +
  "The enquiry will convert into an order only " +
  "after the client agrees to the final proposal.";


// =====================================================
// 📩 SEND ADMIN PANEL
// =====================================================

Api.sendMessage({
  chat_id: adminId,
  text: adminText,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: adminButtons
  }
});


// =====================================================
// 👤 USER LANGUAGE
// =====================================================

var clientUserData =
  Bot.getProperty("USER_" + clientId);

if (
  !clientUserData ||
  typeof clientUserData !== "object"
) {
  clientUserData = {};
}

var language = String(
  clientUserData.language ||
  enquiry.language ||
  "hinglish"
).toLowerCase();

if (
  language !== "hinglish" &&
  language !== "english" &&
  language !== "gujarati"
) {
  language = "hinglish";
}


// =====================================================
// 👤 USER NOTIFICATION
// =====================================================

var userText = "";

if (language === "english") {
  userText =
    "🎉 <b>Good News!</b>\n\n" +
    "Your Custom Bot Enquiry has been accepted " +
    "by our admin team.\n\n" +
    "🆔 <b>Enquiry ID:</b> " +
    safeText(enquiryId) +
    "\n\n" +
    "🟢 <b>Status:</b> Accepted\n" +
    "💬 <b>Stage:</b> Discussion\n\n" +
    "Our admin will discuss your requirements, " +
    "prepare the final proposed requirements, and " +
    "share the project price with you.\n\n" +
    "You can request changes during the discussion. " +
    "Once you agree to the final proposal, your " +
    "enquiry will be converted into an order.\n\n" +
    "⚠️ <b>Order has not been created yet.</b>\n\n" +
    "⏳ Please wait for the admin team to contact you.";

} else if (language === "gujarati") {
  userText =
    "🎉 <b>સારા સમાચાર!</b>\n\n" +
    "તમારી Custom Bot Enquiry અમારી admin team " +
    "દ્વારા accept કરવામાં આવી છે.\n\n" +
    "🆔 <b>Enquiry ID:</b> " +
    safeText(enquiryId) +
    "\n\n" +
    "🟢 <b>Status:</b> Accepted\n" +
    "💬 <b>Stage:</b> Discussion\n\n" +
    "અમારી admin team તમારી requirements discuss " +
    "કરશે, final proposed requirements તૈયાર કરશે " +
    "અને project price જણાવશે.\n\n" +
    "Discussion દરમિયાન તમે changes request કરી શકો છો. " +
    "તમે final proposal સાથે agree કરશો પછી જ " +
    "તમારી enquiry order માં convert થશે.\n\n" +
    "⚠️ <b>હજુ order બનાવવામાં આવ્યો નથી.</b>\n\n" +
    "⏳ કૃપા કરીને admin team ના contact ની રાહ જુઓ.";

} else {
  userText =
    "🎉 <b>Good News!</b>\n\n" +
    "Aapki Custom Bot Enquiry admin team ne " +
    "accept kar li hai.\n\n" +
    "🆔 <b>Enquiry ID:</b> " +
    safeText(enquiryId) +
    "\n\n" +
    "🟢 <b>Status:</b> Accepted\n" +
    "💬 <b>Stage:</b> Discussion\n\n" +
    "Ab admin aapse requirements par baat karega, " +
    "apna final proposed requirement prepare karega " +
    "aur project price bhi batayega.\n\n" +
    "Discussion ke dauran aap changes request kar " +
    "sakte ho. Jab aap final proposal se agree karoge, " +
    "tabhi enquiry order mein convert hogi.\n\n" +
    "⚠️ <b>Abhi order create nahi hua hai.</b>\n\n" +
    "⏳ Admin team ke contact ka wait karein.";
}


// =====================================================
// 📩 SEND USER NOTIFICATION
// =====================================================

try {
  Api.sendMessage({
    chat_id: clientId,
    text: userText,
    parse_mode: "HTML"
  });
} catch (error) {
  // User notification failed
}


// =====================================================
// ✅ END
// =====================================================
