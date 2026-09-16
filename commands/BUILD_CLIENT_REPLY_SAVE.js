/*CMD
  command: BUILD_CLIENT_REPLY_SAVE
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
  command: BUILD_CLIENT_REPLY_SAVE
  need_reply: true
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 206 — BUILD_CLIENT_REPLY_SAVE
//
// CLIENT → REPLY TO EARNSTAR TEAM
//
// FLOW:
// BUILD_CLIENT_REPLY
//        ↓
// WAIT FOR CLIENT MESSAGE
//        ↓
// BUILD_CLIENT_REPLY_SAVE
//        ↓
// SAVE CLIENT MESSAGE
//        ↓
// NOTIFY ADMIN
//        ↓
// ADMIN CAN REPLY
//
// IMPORTANT:
// - INPUT COMMAND = need_reply:true
// - Reads actual client message from `message`
// - Enquiry ID comes from pending property
// - Client ownership is verified
// - Only accepted enquiries can continue discussion
// =====================================================


// =====================================================
// 👤 CLIENT ID
// =====================================================

var clientId =
  String(user.telegramid);


// =====================================================
// 👑 OWNER
// =====================================================

var ownerId =
  "7897324623";


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
// 👤 BUILD ADMIN RECIPIENT LIST
// =====================================================

var adminIds = [];


// Owner
adminIds.push(
  ownerId
);


// Multi-admins
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
      ).trim();

  } else {

    allowedId =
      String(
        adminList[i] ||
        ""
      ).trim();
  }


  if (
    allowedId &&
    adminIds.indexOf(allowedId) === -1
  ) {

    adminIds.push(
      allowedId
    );
  }
}


// =====================================================
// 🆔 GET PENDING ENQUIRY
// =====================================================

var pendingKey =
  "BUILD_CLIENT_REPLY_PENDING_" +
  clientId;


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
// 📝 READ CLIENT MESSAGE
// =====================================================
//
// In need_reply:true command,
// `message` contains the actual client input.
// =====================================================

var clientMessage =
  String(
    message ||
    ""
  ).trim();


// =====================================================
// ⛔ EMPTY MESSAGE
// =====================================================

if (!clientMessage) {

  return;
}


// =====================================================
// 📏 MESSAGE LENGTH
// =====================================================

if (
  clientMessage.length > 3000
) {

  Api.sendMessage({

    chat_id:
      clientId,

    text:

      "❌ <b>Message Too Long</b>\n\n" +

      "Please keep your message within 3000 characters.",

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

  Bot.setProperty(

    pendingKey,

    "",

    "string"

  );


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

  Bot.setProperty(

    pendingKey,

    "",

    "string"

  );


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
// 📚 SAVE CLIENT MESSAGE
// =====================================================

enquiry.history.push({

  action:
    "client_message",

  clientId:
    clientId,

  timestamp:
    timestamp,

  message:
    clientMessage

});


// =====================================================
// 📝 UPDATE DISCUSSION DATA
// =====================================================

enquiry.stage =
  "discussion";


enquiry.packageStep =
  "discussion";


enquiry.lastClientMessage =
  clientMessage;


enquiry.lastClientMessageAt =
  timestamp;


enquiry.lastClientMessageBy =
  clientId;


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
// 👤 CLIENT NAME
// =====================================================

var clientName =
  String(
    enquiry.userName ||
    clientData.firstName ||
    user.first_name ||
    "Telegram User"
  );


// =====================================================
// 👤 CLIENT USERNAME
// =====================================================

var clientUsername =
  String(
    enquiry.username ||
    clientData.username ||
    user.username ||
    ""
  );


// =====================================================
// 📩 BUILD ADMIN MESSAGE
// =====================================================

var adminText =

  "💬 <b>New Client Reply</b>\n\n" +

  "🆔 <b>Enquiry ID:</b> " +
  safeText(
    enquiryId
  ) +

  "\n\n" +

  "👤 <b>Client:</b> " +
  safeText(
    clientName
  ) +

  "\n" +

  "🆔 <b>Telegram ID:</b> " +
  safeText(
    clientId
  );


if (
  clientUsername
) {

  adminText +=

    "\n" +

    "🔗 <b>Username:</b> @" +
    safeText(
      clientUsername.replace(/^@/, "")
    );
}


adminText +=

  "\n\n" +

  "💬 <b>Client Message:</b>\n" +

  safeText(
    clientMessage
  ) +

  "\n\n" +

  "━━━━━━━━━━━━━━━━━━\n\n" +

  "Client is waiting for your response.";


// =====================================================
// 📩 SEND TO OWNER + ADMINS
// =====================================================

var adminDeliveryCount =
  0;


for (
  var j = 0;
  j < adminIds.length;
  j++
) {

  try {

    Api.sendMessage({

      chat_id:
        adminIds[j],

      text:
        adminText,

      parse_mode:
        "HTML",

      disable_web_page_preview:
        true,

      reply_markup: {

        inline_keyboard: [

          [

            {
              text:
                "💬 Reply to Client",

              callback_data:
                "BUILD_ADMIN_CONTACT " +
                enquiryId
            }

          ],

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

          ]

        ]

      }

    });


    adminDeliveryCount++;

  } catch (error) {

    // Continue sending to other admins.

  }
}


// =====================================================
// 🧹 CLEAR PENDING REPLY
// =====================================================

Bot.setProperty(

  pendingKey,

  "",

  "string"

);


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
// ✅ CLIENT CONFIRMATION
// =====================================================

var confirmation =
  "";


if (
  language === "english"
) {

  confirmation =

    "✅ <b>Message Sent</b>\n\n" +

    "Your message has been sent to the EarnStar Team.\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(
      enquiryId
    ) +

    "\n\n" +

    "They will review your message and reply here.";

} else if (
  language === "gujarati"
) {

  confirmation =

    "✅ <b>Message મોકલાયો</b>\n\n" +

    "તમારો message EarnStar Team ને મોકલવામાં આવ્યો છે.\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(
      enquiryId
    ) +

    "\n\n" +

    "Team તમારો message જોઈને અહીં reply કરશે.";

} else {

  confirmation =

    "✅ <b>Message Sent</b>\n\n" +

    "Aapka message EarnStar Team ko bhej diya gaya hai.\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(
      enquiryId
    ) +

    "\n\n" +

    "Team aapka message review karke yahin reply karegi.";

}


// =====================================================
// 📩 SEND CLIENT CONFIRMATION
// =====================================================

Api.sendMessage({

  chat_id:
    clientId,

  text:
    confirmation,

  parse_mode:
    "HTML",

  reply_markup: {

    inline_keyboard: [

      [

        {
          text:
            "💬 Send Another Reply",

          callback_data:
            "BUILD_CLIENT_REPLY " +
            enquiryId
        }

      ]

    ]

  }

});


// =====================================================
// ⚠️ ADMIN DELIVERY WARNING
// =====================================================

if (
  adminDeliveryCount === 0
) {

  // Message is already saved in enquiry history.
  // Client confirmation remains successful.

}


// =====================================================
// ✅ END SCRIPT 206
// =====================================================
