/*CMD
  command: BUILD_CLIENT_REPLY
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
  command: BUILD_CLIENT_REPLY
  need_reply: false
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 205 — BUILD_CLIENT_REPLY
//
// CLIENT → REPLY TO ADMIN
//
// FLOW:
// ADMIN SENDS MESSAGE
//        ↓
// CLIENT RECEIVES MESSAGE
//        ↓
// 💬 REPLY TO EARNSTAR TEAM
//        ↓
// BUILD_CLIENT_REPLY
//        ↓
// SAVE PENDING ENQUIRY
//        ↓
// WAIT FOR CLIENT MESSAGE
//        ↓
// BUILD_CLIENT_REPLY_SAVE
//
// IMPORTANT:
// - CALLBACK COMMAND = need_reply:false
// - Actual client message handled by SCRIPT 206
// - Only client linked to enquiry can reply
// - Accepted enquiries only
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

  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


// =====================================================
// 🆔 GET ENQUIRY ID FROM CALLBACK PARAMS
// =====================================================

var enquiryId =
  String(
    params ||
    ""
  ).trim();


// =====================================================
// ⛔ ENQUIRY ID MISSING
// =====================================================

if (!enquiryId) {

  Api.sendMessage({

    chat_id:
      clientId,

    text:

      "❌ <b>Enquiry ID Missing</b>\n\n" +

      "This reply button is invalid or expired.",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// 📦 LOAD ENQUIRY
// =====================================================

var enquiry =
  Bot.getProperty(
    "BUILD_ENQUIRY_" +
    enquiryId
  );


// =====================================================
// ⛔ ENQUIRY NOT FOUND
// =====================================================

if (
  !enquiry ||
  typeof enquiry !== "object"
) {

  Api.sendMessage({

    chat_id:
      clientId,

    text:

      "❌ <b>Enquiry Not Found</b>\n\n" +

      "🆔 <b>Enquiry ID:</b> " +
      safeText(
        enquiryId
      ) +

      "\n\n" +

      "Please open your Build Enquiry again.",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// 🔐 CLIENT OWNERSHIP CHECK
// =====================================================

var enquiryClientId =
  String(
    enquiry.userId ||
    Bot.getProperty(
      "BUILD_ENQUIRY_USER_" +
      enquiryId
    ) ||
    ""
  ).trim();


if (
  !enquiryClientId ||
  enquiryClientId !== clientId
) {

  Api.sendMessage({

    chat_id:
      clientId,

    text:

      "⛔ <b>Access Denied</b>\n\n" +

      "You are not authorized to reply to this enquiry.",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// 🛑 STATUS CHECK
// =====================================================

var status =
  String(
    enquiry.status ||
    ""
  ).toLowerCase();


if (
  status !== "accepted"
) {

  Api.sendMessage({

    chat_id:
      clientId,

    text:

      "⚠️ <b>Reply Not Available</b>\n\n" +

      "🆔 <b>Enquiry ID:</b> " +
      safeText(
        enquiryId
      ) +

      "\n\n" +

      "This enquiry is currently not open for discussion.",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// 💾 SAVE PENDING CLIENT REPLY
// =====================================================

var pendingKey =
  "BUILD_CLIENT_REPLY_PENDING_" +
  clientId;


Bot.setProperty(

  pendingKey,

  enquiryId,

  "string"

);


// =====================================================
// 📝 UPDATE ENQUIRY STAGE
// =====================================================

enquiry.stage =
  "discussion";


enquiry.packageStep =
  "client_reply";


enquiry.updatedAt =
  new Date().toISOString();


// =====================================================
// 💾 SAVE ENQUIRY
// =====================================================

Bot.setProperty(

  "BUILD_ENQUIRY_" +
  clientId,

  enquiry,

  "json"

);


Bot.setProperty(

  "BUILD_ENQUIRY_" +
  enquiryId,

  enquiry,

  "json"

);


Bot.setProperty(

  "BUILD_ENQUIRY_USER_" +
  enquiryId,

  clientId,

  "string"

);


// =====================================================
// 🌐 CLIENT LANGUAGE
// =====================================================

var clientData =
  Bot.getProperty(
    "USER_" +
    clientId
  );


if (
  !clientData ||
  typeof clientData !== "object"
) {

  clientData = {};
}


var language =
  String(
    clientData.language ||
    enquiry.language ||
    "hinglish"
  ).toLowerCase();


if (
  language !== "hinglish" &&
  language !== "english" &&
  language !== "gujarati"
) {

  language =
    "hinglish";
}


// =====================================================
// 💬 CLIENT INPUT PROMPT
// =====================================================

var replyText =
  "";


if (
  language === "english"
) {

  replyText =

    "💬 <b>Reply to EarnStar Team</b>\n\n" +

    "Please type your message below.\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(
      enquiryId
    ) +

    "\n\n" +

    "Your message will be sent to the EarnStar Team.";

} else if (
  language === "gujarati"
) {

  replyText =

    "💬 <b>EarnStar Team ને Reply કરો</b>\n\n" +

    "કૃપા કરીને તમારો message નીચે type કરો.\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(
      enquiryId
    ) +

    "\n\n" +

    "તમારો message EarnStar Team ને મોકલવામાં આવશે.";

} else {

  replyText =

    "💬 <b>EarnStar Team ko Reply karein</b>\n\n" +

    "Neeche apna message type karein.\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(
      enquiryId
    ) +

    "\n\n" +

    "Aapka message EarnStar Team ko bheja jayega.";

}


// =====================================================
// ⌨️ SEND INPUT PROMPT
// =====================================================

Api.sendMessage({

  chat_id:
    clientId,

  text:
    replyText,

  parse_mode:
    "HTML",

  reply_markup: {

    inline_keyboard: [

      [

        {
          text:
            "❌ Cancel Reply",

          callback_data:
            "BUILD_CLIENT_REPLY_CANCEL"
        }

      ]

    ]

  }

});


// =====================================================
// ▶️ WAIT FOR CLIENT MESSAGE
// =====================================================
//
// SCRIPT 206 handles the actual client message.
// =====================================================

Bot.runCommand(
  "BUILD_CLIENT_REPLY_SAVE"
);


// =====================================================
// ✅ END SCRIPT 205
// =====================================================
