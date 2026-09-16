/*CMD
  command: BUILD_ADMIN_QUOTE
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
  command: BUILD_ADMIN_QUOTE
  need_reply: false
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 203 — BUILD_ADMIN_QUOTE
//
// ADMIN → SET QUOTE / TOTAL PRICE
//
// CALLBACK:
// BUILD_ADMIN_QUOTE <enquiryId>
//
// IMPORTANT:
// - Button/callback command
// - need_reply = false
// - Input is handled by SCRIPT 204
// - No price is saved in this script
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
      "You are not authorized to set enquiry quotes.",

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
// 🆔 READ ENQUIRY ID FROM PARAMS
// =====================================================

var enquiryId =
  String(params || "").trim();


// =====================================================
// ⛔ INVALID ENQUIRY ID
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
        "Opening quote input..."

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

      "🆔 <b>Enquiry ID:</b> " +
      safeText(
        enquiryId
      ) +

      "\n\n" +

      "The enquiry may not exist or the ID is incorrect.",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// 🔒 ONLY ACCEPTED ENQUIRY CAN GET QUOTE
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

      "⚠️ <b>Quote Cannot Be Set</b>\n\n" +

      "🆔 Enquiry: " +
      safeText(
        enquiryId
      ) +

      "\n" +

      "📊 Current Status: " +
      safeText(
        status ||
        "unknown"
      ) +

      "\n\n" +

      "Quote can only be set after the enquiry is accepted.",

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
// ⛔ CLIENT ID CHECK
// =====================================================

if (!clientId) {

  Api.sendMessage({

    chat_id:
      adminId,

    text:

      "❌ <b>Client ID Missing</b>\n\n" +

      "This enquiry does not contain a valid client ID.\n" +

      "Quote input was not started.",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// 💾 SAVE PENDING QUOTE INPUT
// =====================================================
//
// Key format:
// BUILD_ADMIN_QUOTE_PENDING_<adminId>
//
// Value:
// enquiryId
//
// SCRIPT 204 will read this value.
// =====================================================

Bot.setProperty(

  "BUILD_ADMIN_QUOTE_PENDING_" +
  adminId,

  enquiryId,

  "string"

);


// =====================================================
// 📝 ADMIN INPUT PROMPT
// =====================================================

var currentPrice =
  enquiry.totalPrice;


if (
  currentPrice === undefined ||
  currentPrice === null ||
  currentPrice === ""
) {

  currentPrice =
    enquiry.price;
}


var promptText =

  "💰 <b>SET ENQUIRY QUOTE</b>\n" +

  "━━━━━━━━━━━━━━━━━━\n\n" +

  "🆔 <b>Enquiry ID:</b> " +
  safeText(
    enquiryId
  ) +

  "\n\n" +

  "👤 <b>Client:</b> " +
  safeText(
    enquiry.userName ||
    "Telegram User"
  ) +

  "\n\n";


if (
  currentPrice !== undefined &&
  currentPrice !== null &&
  currentPrice !== ""
) {

  promptText +=

    "💵 <b>Current Quote:</b> ₹" +
    safeText(
      currentPrice
    ) +

    "\n\n";
}


promptText +=

  "✏️ <b>Enter the total project price.</b>\n\n" +

  "Example:\n" +

  "<code>8000</code>\n\n" +

  "The bot will automatically calculate:\n" +

  "• Advance = 50%\n" +

  "• Remaining = 50%\n\n" +

  "⚠️ Do not enter the advance amount separately.\n" +

  "Enter only the <b>total project price</b>.";


// =====================================================
// 📤 SEND INPUT PROMPT
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
// ▶️ TRIGGER INPUT HANDLER
// =====================================================
//
// IMPORTANT:
// This command itself has need_reply:false.
// The actual typed input is handled by SCRIPT 204.
// =====================================================

Bot.runCommand(
  "BUILD_ADMIN_QUOTE_SAVE"
);


// =====================================================
// ✅ END SCRIPT 203
// =====================================================
