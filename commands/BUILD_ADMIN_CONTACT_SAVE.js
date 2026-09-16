/*CMD
  command: BUILD_ADMIN_CONTACT_SAVE
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
  command: BUILD_ADMIN_CONTACT_SAVE
  need_reply: true
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 201 — BUILD_ADMIN_CONTACT_SAVE
//
// ADMIN → SEND MESSAGE TO BUILD ENQUIRY CLIENT
//
// FLOW:
// BUILD_ADMIN_CONTACT
//        ↓
// SAVE PENDING ENQUIRY
//        ↓
// WAIT FOR ADMIN REPLY
//        ↓
// BUILD_ADMIN_CONTACT_SAVE
//        ↓
// CLIENT RECEIVES MESSAGE
//        ↓
// 💬 REPLY TO EARNSTAR TEAM
//        ↓
// BUILD_CLIENT_REPLY <enquiryId>
//
// IMPORTANT:
// - INPUT COMMAND = need_reply:true
// - Reads enquiryId from pending property
// - Owner + EARNSTAR_ADMINS authorized
// - Saves message in enquiry history
// - Does NOT change payment/order
// =====================================================


// =====================================================
// 👤 ADMIN ID
// =====================================================

var adminId =
  String(user.telegramid);


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
      "You are not authorized to contact Build Enquiry clients.",

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
// 🆔 GET PENDING ENQUIRY ID
// =====================================================

var pendingKey =
  "BUILD_ADMIN_CONTACT_PENDING_" +
  adminId;


var enquiryId =
  String(
    Bot.getProperty(
      pendingKey
    ) || ""
  ).trim();


// =====================================================
// ⛔ NO PENDING ENQUIRY
// =====================================================

if (!enquiryId) {

  return;
}


// =====================================================
// 📝 READ ADMIN MESSAGE
// =====================================================
//
// In a need_reply:true command,
// this is the admin's actual reply.
// =====================================================

var adminMessage =
  String(
    message ||
    ""
  ).trim();


// =====================================================
// ⛔ EMPTY MESSAGE
// =====================================================
//
// Do NOT send "Message Required" here.
// If this command somehow executes without
// an actual reply, simply stop.
// =====================================================

if (!adminMessage) {

  return;
}


// =====================================================
// 📏 MESSAGE LENGTH
// =====================================================

if (
  adminMessage.length > 3000
) {

  Api.sendMessage({

    chat_id:
      adminId,

    text:

      "❌ <b>Message Too Long</b>\n\n" +

      "Please keep the message within 3000 characters.",

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

  Bot.setProperty(

    pendingKey,

    "",

    "string"

  );


  Api.sendMessage({

    chat_id:
      adminId,

    text:

      "❌ <b>Enquiry Not Found</b>\n\n" +

      "🆔 <b>Enquiry ID:</b> " +
      safeText(
        enquiryId
      ) +

      "\n\n" +

      "Please open the enquiry again.",

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

  Bot.setProperty(

    pendingKey,

    "",

    "string"

  );


  Api.sendMessage({

    chat_id:
      adminId,

    text:

      "⚠️ <b>Cannot Contact Client</b>\n\n" +

      "🆔 <b>Enquiry ID:</b> " +
      safeText(
        enquiryId
      ) +

      "\n\n" +

      "Current Status: " +
      safeText(
        enquiry.status ||
        "unknown"
      ) +

      "\n\n" +

      "Only accepted enquiries can be contacted.",

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
// ⛔ CLIENT ID MISSING
// =====================================================

if (!clientId) {

  Bot.setProperty(

    pendingKey,

    "",

    "string"

  );


  Api.sendMessage({

    chat_id:
      adminId,

    text:

      "❌ <b>Client ID Missing</b>\n\n" +

      "The enquiry exists, but the client's Telegram ID could not be found.",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// 🕐 TIMESTAMP
// =====================================================

var timestamp =
  new Date().toISOString();


// =====================================================
// 📚 ENSURE HISTORY
// =====================================================

if (
  !Array.isArray(
    enquiry.history
  )
) {

  enquiry.history = [];
}


// =====================================================
// 📚 SAVE ADMIN MESSAGE
// =====================================================

enquiry.history.push({

  action:
    "admin_message",

  adminId:
    adminId,

  timestamp:
    timestamp,

  message:
    adminMessage

});


// =====================================================
// 📝 UPDATE DISCUSSION DATA
// =====================================================

enquiry.stage =
  "discussion";


enquiry.packageStep =
  "discussion";


enquiry.lastAdminMessage =
  adminMessage;


enquiry.lastAdminMessageAt =
  timestamp;


enquiry.lastAdminMessageBy =
  adminId;


enquiry.updatedAt =
  timestamp;


// =====================================================
// 💾 SAVE ACTIVE ENQUIRY
// =====================================================

Bot.setProperty(

  "BUILD_ENQUIRY_" +
  clientId,

  enquiry,

  "json"

);


// =====================================================
// 💾 SAVE ID-BASED ENQUIRY
// =====================================================

Bot.setProperty(

  "BUILD_ENQUIRY_" +
  enquiryId,

  enquiry,

  "json"

);


// =====================================================
// 💾 SAVE USER MAPPING
// =====================================================

Bot.setProperty(

  "BUILD_ENQUIRY_USER_" +
  enquiryId,

  clientId,

  "string"

);


// =====================================================
// 👤 LOAD CLIENT DATA
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


// =====================================================
// 🌐 CLIENT LANGUAGE
// =====================================================

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
// 📩 BUILD CLIENT MESSAGE
// =====================================================

var clientText =
  "";


if (
  language === "english"
) {

  clientText =

    "💬 <b>Message from EarnStar Team</b>\n\n" +

    safeText(
      adminMessage
    ) +

    "\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(
      enquiryId
    ) +

    "\n\n" +

    "👇 <b>Reply to continue the discussion.</b>";

} else if (
  language === "gujarati"
) {

  clientText =

    "💬 <b>EarnStar Team તરફથી Message</b>\n\n" +

    safeText(
      adminMessage
    ) +

    "\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(
      enquiryId
    ) +

    "\n\n" +

    "👇 <b>Discussion continue કરવા માટે reply કરો.</b>";

} else {

  clientText =

    "💬 <b>EarnStar Team ka Message</b>\n\n" +

    safeText(
      adminMessage
    ) +

    "\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(
      enquiryId
    ) +

    "\n\n" +

    "👇 <b>Discussion continue karne ke liye reply karein.</b>";

}


// =====================================================
// 📩 SEND MESSAGE TO CLIENT
// =====================================================

var messageSent =
  false;


try {

  Api.sendMessage({

    chat_id:
      clientId,

    text:
      clientText,

    parse_mode:
      "HTML",

    disable_web_page_preview:
      true,

    reply_markup: {

      inline_keyboard: [

        [

          {
            text:
              "💬 Reply to EarnStar Team",

            callback_data:
              "BUILD_CLIENT_REPLY " +
              enquiryId
          }

        ]

      ]

    }

  });


  messageSent =
    true;

} catch (error) {

  messageSent =
    false;
}


// =====================================================
// 🧹 CLEAR PENDING CONTACT
// =====================================================

Bot.setProperty(

  pendingKey,

  "",

  "string"

);


// =====================================================
// 📩 ADMIN RESULT
// =====================================================

if (
  messageSent
) {

  Api.sendMessage({

    chat_id:
      adminId,

    text:

      "✅ <b>Message Sent Successfully</b>\n\n" +

      "🆔 <b>Enquiry ID:</b> " +
      safeText(
        enquiryId
      ) +

      "\n" +

      "👤 <b>Client:</b> " +
      safeText(
        enquiry.userName ||
        "Telegram User"
      ) +

      "\n\n" +

      "💬 Your message has been delivered to the client.",

    parse_mode:
      "HTML",

    reply_markup: {

      inline_keyboard: [

        [

          {
            text:
              "💰 Set Quote",

            callback_data:
              "BUILD_ADMIN_QUOTE " +
              enquiryId
          },

          {
            text:
              "🔎 View Enquiry",

            callback_data:
              "BUILD_ADMIN_VIEW " +
              enquiryId
          }

        ],

        [

          {
            text:
              "💬 Send Another Message",

            callback_data:
              "BUILD_ADMIN_CONTACT " +
              enquiryId
          }

        ]

      ]

    }

  });

} else {

  Api.sendMessage({

    chat_id:
      adminId,

    text:

      "⚠️ <b>Message Delivery Failed</b>\n\n" +

      "🆔 <b>Enquiry ID:</b> " +
      safeText(
        enquiryId
      ) +

      "\n\n" +

      "The message was saved in enquiry history, but Telegram could not deliver it to the client.",

    parse_mode:
      "HTML",

    reply_markup: {

      inline_keyboard: [

        [

          {
            text:
              "💬 Try Again",

            callback_data:
              "BUILD_ADMIN_CONTACT " +
              enquiryId
          }

        ],

        [

          {
            text:
              "🔎 View Enquiry",

            callback_data:
              "BUILD_ADMIN_VIEW " +
              enquiryId
          }

        ]

      ]

    }

  });

}


// =====================================================
// ✅ END SCRIPT 201
// =====================================================
