/*CMD
  command: BUILD_ADMIN_CONTACT
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
  command: BUILD_ADMIN_CONTACT
  need_reply: false
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 200 — BUILD_ADMIN_CONTACT
//
// ADMIN → CONTACT BUILD ENQUIRY CLIENT
//
// CALLBACK:
// BUILD_ADMIN_CONTACT <enquiryId>
//
// FLOW:
// BUTTON
//   ↓
// BUILD_ADMIN_CONTACT
//   ↓
// SAVE PENDING ENQUIRY
//   ↓
// BUILD_ADMIN_CONTACT_SAVE
//   ↓
// WAIT FOR ADMIN MESSAGE
//
// IMPORTANT:
// - BUTTON COMMAND = need_reply:false
// - INPUT COMMAND = BUILD_ADMIN_CONTACT_SAVE
// - BUILD_ADMIN_CONTACT_SAVE = need_reply:true
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
// 👑 LOAD MULTI ADMIN
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
// 🔐 ADMIN AUTH
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
          "Access denied."

      });

    } catch (error) {}
  }


  Api.sendMessage({

    chat_id:
      adminId,

    text:
      "⛔ <b>Access Denied</b>\n\n" +
      "You are not authorized to contact clients.",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// 🔐 SAFE TEXT
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
// 🆔 READ ENQUIRY ID
// =====================================================

var enquiryId =
  String(params || "").trim();


// =====================================================
// ⛔ INVALID ID
// =====================================================

if (!enquiryId) {

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
          "Invalid enquiry ID."

      });

    } catch (error) {}
  }


  Api.sendMessage({

    chat_id:
      adminId,

    text:
      "❌ <b>Invalid Enquiry ID</b>\n\n" +
      "Please open the enquiry again.",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// ⚡ CALLBACK ANSWER
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
        "Contact mode opened."

    });

  } catch (error) {}
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
// ⛔ NOT FOUND
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

      "🆔 " +
      safeText(
        enquiryId
      ),

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// 🔒 ONLY ACCEPTED
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
      adminId,

    text:

      "⚠️ <b>Client Contact Not Available</b>\n\n" +

      "Current enquiry status: " +

      "<code>" +
      safeText(
        status ||
        "unknown"
      ) +
      "</code>\n\n" +

      "Client contact is available only after the enquiry is accepted.",

    parse_mode:
      "HTML",

    reply_markup: {

      inline_keyboard: [

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

  Api.sendMessage({

    chat_id:
      adminId,

    text:

      "❌ <b>Client ID Missing</b>\n\n" +
      "This enquiry does not contain a valid Telegram user ID.",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// 💾 SAVE PENDING CONTACT
// =====================================================
//
// SCRIPT 201 will read this.
// =====================================================

Bot.setProperty(

  "BUILD_ADMIN_CONTACT_PENDING_" +
  adminId,

  enquiryId,

  "string"

);


// =====================================================
// 📝 PROMPT
// =====================================================

var promptText =

  "💬 <b>CONTACT BUILD ENQUIRY CLIENT</b>\n" +

  "━━━━━━━━━━━━━━━━━━\n\n" +

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

  "✏️ <b>Type the message you want to send to the client.</b>\n\n" +

  "📌 Maximum: <b>3000 characters</b>\n\n" +

  "Example:\n" +

  "<code>Hello! We reviewed your requirements. Let's discuss the project details and pricing.</code>";


// =====================================================
// 📤 SEND PROMPT
// =====================================================

Api.sendMessage({

  chat_id:
    adminId,

  text:
    promptText,

  parse_mode:
    "HTML",

  disable_web_page_preview:
    true,

  reply_markup: {

    inline_keyboard: [

      [

        {
          text:
            "❌ Cancel",

          callback_data:
            "BUILD_ADMIN_VIEW " +
            enquiryId
        }

      ]

    ]

  }

});


// =====================================================
// ▶️ START INPUT WAIT
// =====================================================
//
// IMPORTANT:
// This is intentionally here.
// The target command MUST have:
// need_reply: true
//
// It should NOT process the message immediately.
// Bots.Business will execute the SAVE command
// when the admin sends the next answer.
// =====================================================

Bot.runCommand(
  "BUILD_ADMIN_CONTACT_SAVE"
);


// =====================================================
// ✅ END SCRIPT 200
// =====================================================
