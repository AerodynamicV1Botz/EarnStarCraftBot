/*CMD
  command: BUILD_ADMIN_REJECT
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
  command: BUILD_ADMIN_REJECT
  need_reply: false
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 199 — BUILD_ADMIN_REJECT
//
// ADMIN → REJECT BUILD ENQUIRY
//
// CALLBACK:
// BUILD_ADMIN_REJECT <enquiryId>
//
// FLOW:
// BUILD_ENQUIRY_SUBMIT
//        ↓
// BUILD_ADMIN_REJECT
//        ↓
// status = rejected
// stage = rejected
//        ↓
// USER NOTIFIED
//
// IMPORTANT:
// - Owner + EARNSTAR_ADMINS authorized
// - enquiryId read from params
// - Duplicate reject protected
// - Accepted enquiry cannot be rejected from this button
// - No payment/order action
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

      callback_query_id:
        request.id,

      text:
        "Rejecting enquiry..."

    });

  } catch (error) {}
}


// =====================================================
// 👤 ADMIN ID
// =====================================================

var adminId =
  String(user.telegramid);


// =====================================================
// 🆔 READ ENQUIRY ID FROM PARAMS
// =====================================================

var enquiryId =
  String(params || "").trim();


if (!enquiryId) {

  Api.sendMessage({

    chat_id:
      adminId,

    text:
      "❌ <b>Invalid Enquiry ID.</b>\n\n" +
      "Please open the enquiry again.",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// 👑 OWNER
// =====================================================

var ownerId =
  "7897324623";


// =====================================================
// 👑 LOAD MULTI-ADMIN LIST
// =====================================================

var adminList =
  Bot.getProperty(
    "EARNSTAR_ADMINS"
  ) || [];


if (
  !Array.isArray(adminList)
) {

  adminList = [];
}


// =====================================================
// 🔐 ADMIN AUTHORIZATION
// =====================================================

var isAuthorized =
  adminId === ownerId;


if (!isAuthorized) {

  for (
    var i = 0;
    i < adminList.length;
    i++
  ) {

    var allowedId =
      "";


    if (
      typeof adminList[i] === "object" &&
      adminList[i] !== null
    ) {

      allowedId =
        String(
          adminList[i].id ||
          adminList[i].telegramId ||
          ""
        );

    } else {

      allowedId =
        String(
          adminList[i] || ""
        );
    }


    if (
      allowedId === adminId
    ) {

      isAuthorized =
        true;

      break;
    }
  }
}


// =====================================================
// ⛔ ACCESS DENIED
// =====================================================

if (!isAuthorized) {

  Api.sendMessage({

    chat_id:
      adminId,

    text:
      "⛔ <b>Access Denied</b>\n\n" +
      "You are not authorized to reject Build Enquiries.",

    parse_mode:
      "HTML"

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
// 📦 LOAD ENQUIRY
// =====================================================

var enquiryKey =
  "BUILD_ENQUIRY_" +
  enquiryId;


var enquiry =
  Bot.getProperty(
    enquiryKey
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
      adminId,

    text:
      "❌ <b>Enquiry Not Found</b>\n\n" +
      "🆔 Enquiry ID: " +
      safeText(enquiryId) +
      "\n\n" +
      "This enquiry may no longer exist.",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// 👤 CLIENT ID
// =====================================================

var clientId =
  String(
    enquiry.userId ||
    Bot.getProperty(
      "BUILD_ENQUIRY_USER_" +
      enquiryId
    ) ||
    ""
  ).trim();


// =====================================================
// ⛔ CLIENT ID CHECK
// =====================================================

if (!clientId) {

  Api.sendMessage({

    chat_id:
      adminId,

    text:
      "❌ <b>Client ID Missing</b>\n\n" +
      "The enquiry exists, but the client Telegram ID could not be found.",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// 🛑 CURRENT STATUS
// =====================================================

var currentStatus =
  String(
    enquiry.status || ""
  ).toLowerCase();


// =====================================================
// ⚠️ ALREADY REJECTED
// =====================================================

if (
  currentStatus === "rejected"
) {

  Api.sendMessage({

    chat_id:
      adminId,

    text:
      "⚠️ <b>Already Rejected</b>\n\n" +
      "🆔 Enquiry ID: " +
      safeText(enquiryId) +
      "\n\n" +
      "This enquiry has already been rejected.",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// ⛔ ACCEPTED ENQUIRY PROTECTION
// =====================================================

if (
  currentStatus === "accepted"
) {

  Api.sendMessage({

    chat_id:
      adminId,

    text:
      "⛔ <b>Cannot Reject Accepted Enquiry</b>\n\n" +
      "This enquiry has already been accepted.\n\n" +
      "Please use the appropriate discussion/quote flow instead.",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// ⛔ COMPLETED PROTECTION
// =====================================================

if (
  currentStatus === "completed"
) {

  Api.sendMessage({

    chat_id:
      adminId,

    text:
      "⚠️ <b>Enquiry Already Completed</b>\n\n" +
      "A completed enquiry cannot be rejected.",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// 🔒 ONLY SUBMITTED ENQUIRY CAN BE REJECTED
// =====================================================

if (
  currentStatus !== "submitted"
) {

  Api.sendMessage({

    chat_id:
      adminId,

    text:
      "⚠️ <b>Invalid Enquiry Status</b>\n\n" +
      "🆔 Enquiry ID: " +
      safeText(enquiryId) +
      "\n\n" +

      "Current Status: " +
      safeText(
        enquiry.status ||
        "unknown"
      ) +

      "\n\n" +

      "Only submitted enquiries can be rejected.",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// 🕐 TIMESTAMP
// =====================================================

var now =
  new Date();


var updatedAt =
  now.toISOString();


// =====================================================
// ❌ UPDATE ENQUIRY STATUS
// =====================================================

enquiry.status =
  "rejected";

enquiry.stage =
  "rejected";

enquiry.packageStep =
  "rejected";

enquiry.progress =
  0;

enquiry.progressTitle =
  "Enquiry Rejected";

enquiry.progressUpdate =
  "Your Build Enquiry has been reviewed and was not accepted at this time.";

enquiry.rejectedAt =
  updatedAt;

enquiry.updatedAt =
  updatedAt;

enquiry.rejectedBy =
  adminId;


// =====================================================
// 📝 OPTIONAL ADMIN NOTE
// =====================================================
//
// Reason system intentionally not added here.
// We can add a proper rejection-reason step later
// if required.
// =====================================================

if (
  !Array.isArray(
    enquiry.history
  )
) {

  enquiry.history = [];
}


enquiry.history.push({

  action:
    "rejected",

  adminId:
    adminId,

  timestamp:
    updatedAt,

  note:
    "Build Enquiry rejected by admin."

});


// =====================================================
// 💾 SAVE ACTIVE USER ENQUIRY
// =====================================================

Bot.setProperty(

  "BUILD_ENQUIRY_" +
  clientId,

  enquiry,

  "json"

);


// =====================================================
// 💾 SAVE ENQUIRY BY ID
// =====================================================

Bot.setProperty(

  "BUILD_ENQUIRY_" +
  enquiryId,

  enquiry,

  "json"

);


// =====================================================
// 👤 USER → ENQUIRY MAPPING
// =====================================================

Bot.setProperty(

  "BUILD_ENQUIRY_USER_" +
  enquiryId,

  clientId,

  "string"

);


// =====================================================
// 📩 ADMIN RESULT
// =====================================================

Api.sendMessage({

  chat_id:
    adminId,

  text:

    "❌ <b>BUILD ENQUIRY REJECTED</b>\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(enquiryId) +
    "\n\n" +

    "👤 <b>Client:</b> " +
    safeText(
      enquiry.userName ||
      "Telegram User"
    ) +
    "\n" +

    "🆔 <b>Telegram ID:</b> " +
    safeText(clientId) +
    "\n\n" +

    "━━━━━━━━━━━━━━━━━━\n" +

    "🔴 <b>Status:</b> Rejected\n" +

    "📈 <b>Progress:</b> 0%\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "The client has been notified.",

  parse_mode:
    "HTML"

});


// =====================================================
// 👤 LOAD CLIENT LANGUAGE
// =====================================================

var clientUserData =
  Bot.getProperty(
    "USER_" +
    clientId
  );


if (
  !clientUserData ||
  typeof clientUserData !== "object"
) {

  clientUserData = {};
}


var language =
  String(
    clientUserData.language ||
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
// 👤 USER REJECTION MESSAGE
// =====================================================

var userText =
  "";


if (
  language === "english"
) {

  userText =

    "📩 <b>Build Enquiry Update</b>\n\n" +

    "Your Build Enquiry has been reviewed by our admin team.\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(enquiryId) +
    "\n\n" +

    "🔴 <b>Status:</b> Rejected\n\n" +

    "Unfortunately, we are unable to proceed with this enquiry at this time.\n\n" +

    "Thank you for contacting 🤖 EarnStar BOTCRAFT.";

} else if (
  language === "gujarati"
) {

  userText =

    "📩 <b>Build Enquiry Update</b>\n\n" +

    "તમારી Build Enquiry અમારી admin team દ્વારા review કરવામાં આવી છે.\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(enquiryId) +
    "\n\n" +

    "🔴 <b>Status:</b> Rejected\n\n" +

    "દુઃખ સાથે જણાવવાનું કે હાલમાં અમે આ enquiry સાથે આગળ વધી શકતા નથી.\n\n" +

    "🤖 EarnStar BOTCRAFT નો સંપર્ક કરવા બદલ આભાર.";

} else {

  userText =

    "📩 <b>Build Enquiry Update</b>\n\n" +

    "Aapki Build Enquiry admin team ne review ki hai.\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(enquiryId) +
    "\n\n" +

    "🔴 <b>Status:</b> Rejected\n\n" +

    "Unfortunately, hum is enquiry ke saath abhi proceed nahi kar pa rahe hain.\n\n" +

    "🤖 EarnStar BOTCRAFT se contact karne ke liye thank you.";

}


// =====================================================
// 📩 SEND USER NOTIFICATION
// =====================================================

try {

  Api.sendMessage({

    chat_id:
      clientId,

    text:
      userText,

    parse_mode:
      "HTML"

  });

} catch (error) {

  // Client notification failed

}


// =====================================================
// ✅ END
// =====================================================
