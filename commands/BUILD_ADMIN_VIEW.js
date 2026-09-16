/*CMD
  command: BUILD_ADMIN_VIEW
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
  command: BUILD_ADMIN_VIEW
  need_reply: false
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 202 — BUILD_ADMIN_VIEW
//
// ADMIN → VIEW BUILD ENQUIRY
//
// CALLBACK:
// BUILD_ADMIN_VIEW <enquiryId>
//
// SHOWS:
// - Enquiry ID
// - Client information
// - Requirements
// - Contacts
// - Status
// - Stage
// - Progress
// - Quote / Price if available
// - Timeline
// - Admin information
// - History count
//
// IMPORTANT:
// - Button/callback command
// - need_reply = false
// - No data modification
// - No payment action
// - No order creation
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
      "You are not authorized to view Build Enquiries.",

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
        "Opening enquiry..."

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
// 👤 CLIENT NAME
// =====================================================

var clientName =
  String(
    enquiry.userName ||
    enquiry.name ||
    "Telegram User"
  );


// =====================================================
// 👤 USERNAME
// =====================================================

var username =
  String(
    enquiry.username ||
    ""
  ).trim();


// =====================================================
// 📝 REQUIREMENTS
// =====================================================

var requirements =
  enquiry.requirements;


var requirementsText =
  "";


if (
  typeof requirements === "object" &&
  requirements !== null
) {

  requirementsText =
    String(
      requirements.description ||
      requirements.fullMessage ||
      requirements.text ||
      requirements.message ||
      ""
    ).trim();

} else {

  requirementsText =
    String(
      requirements ||
      ""
    ).trim();
}


// =====================================================
// 📝 REQUIREMENTS FALLBACK
// =====================================================

if (!requirementsText) {

  requirementsText =
    String(
      enquiry.description ||
      enquiry.fullMessage ||
      enquiry.message ||
      enquiry.text ||
      "No requirements recorded."
    ).trim();
}


// =====================================================
// 📱 CONTACT OBJECT
// =====================================================

var contacts =
  enquiry.contacts || {};


var telegram =
  String(
    contacts.telegram ||
    enquiry.telegramProfile ||
    ""
  ).trim();


var otherNumber =
  String(
    contacts.otherNumber ||
    ""
  ).trim();


var instagram =
  String(
    contacts.instagram ||
    ""
  ).trim();


var whatsapp =
  String(
    contacts.whatsapp ||
    ""
  ).trim();


var email =
  String(
    contacts.email ||
    ""
  ).trim();


// =====================================================
// 📊 STATUS
// =====================================================

var status =
  String(
    enquiry.status ||
    "unknown"
  );


// =====================================================
// 📍 STAGE
// =====================================================

var stage =
  String(
    enquiry.stage ||
    "unknown"
  );


// =====================================================
// 📌 PACKAGE STEP
// =====================================================

var packageStep =
  String(
    enquiry.packageStep ||
    "unknown"
  );


// =====================================================
// 📈 PROGRESS
// =====================================================

var progress =
  Number(
    enquiry.progress
  );


if (
  isNaN(progress)
) {

  progress =
    0;
}


if (
  progress < 0
) {

  progress =
    0;
}


if (
  progress > 100
) {

  progress =
    100;
}


var progressTitle =
  String(
    enquiry.progressTitle ||
    "Not Started"
  );


var progressUpdate =
  String(
    enquiry.progressUpdate ||
    ""
  );


// =====================================================
// 💰 QUOTE
// =====================================================

var totalPrice =
  enquiry.totalPrice;


if (
  totalPrice === undefined ||
  totalPrice === null ||
  totalPrice === ""
) {

  totalPrice =
    enquiry.price;
}


if (
  totalPrice === undefined ||
  totalPrice === null ||
  totalPrice === ""
) {

  totalPrice =
    enquiry.quote;
}


var advanceAmount =
  enquiry.advanceAmount;


var remainingAmount =
  enquiry.remainingAmount;


// =====================================================
// 💰 PRICE FORMAT
// =====================================================

function priceText(value) {

  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {

    return "Not set";
  }


  return "₹" +
    safeText(
      value
    );
}


// =====================================================
// 💳 PAYMENT STATUS
// =====================================================

var paymentStatus =
  String(
    enquiry.paymentStatus ||
    "not_started"
  );


// =====================================================
// 📦 ORDER ID IF CONVERTED
// =====================================================

var orderId =
  String(
    enquiry.orderId ||
    ""
  ).trim();


// =====================================================
// 🕐 TIMELINE
// =====================================================

var createdAt =
  String(
    enquiry.createdAt ||
    "Not available"
  );


var submittedAt =
  String(
    enquiry.submittedAt ||
    "Not submitted"
  );


var acceptedAt =
  String(
    enquiry.acceptedAt ||
    "Not accepted"
  );


var rejectedAt =
  String(
    enquiry.rejectedAt ||
    ""
  );


var quoteSetAt =
  String(
    enquiry.quoteSetAt ||
    ""
  );


var updatedAt =
  String(
    enquiry.updatedAt ||
    "Not available"
  );


// =====================================================
// 👨‍💼 ADMIN INFO
// =====================================================

var acceptedBy =
  String(
    enquiry.acceptedBy ||
    ""
  );


var rejectedBy =
  String(
    enquiry.rejectedBy ||
    ""
  );


var quoteSetBy =
  String(
    enquiry.quoteSetBy ||
    ""
  );


// =====================================================
// 📚 HISTORY
// =====================================================

var historyCount =
  0;


if (
  Array.isArray(
    enquiry.history
  )
) {

  historyCount =
    enquiry.history.length;
}


// =====================================================
// 📋 BUILD ADMIN VIEW
// =====================================================

var viewText =

  "🔎 <b>BUILD ENQUIRY DETAILS</b>\n" +

  "━━━━━━━━━━━━━━━━━━\n\n" +

  "🆔 <b>Enquiry ID</b>\n" +

  safeText(
    enquiryId
  ) +

  "\n\n" +

  "👤 <b>CLIENT</b>\n" +

  "Name: " +
  safeText(
    clientName
  ) +

  "\n" +

  "Telegram ID: " +
  safeText(
    clientId ||
    "Not available"
  ) +

  "\n";


if (
  username
) {

  viewText +=

    "Username: @" +
    safeText(
      username.replace(
        /^@/,
        ""
      )
    ) +

    "\n";
}


viewText +=

  "\n" +

  "📊 <b>STATUS</b>\n" +

  "Status: " +
  safeText(
    status
  ) +

  "\n" +

  "Stage: " +
  safeText(
    stage
  ) +

  "\n" +

  "Step: " +
  safeText(
    packageStep
  ) +

  "\n" +

  "Payment: " +
  safeText(
    paymentStatus
  ) +

  "\n";


if (
  orderId
) {

  viewText +=

    "Order ID: " +
    safeText(
      orderId
    ) +

    "\n";
}


viewText +=

  "\n" +

  "📈 <b>PROGRESS</b>\n" +

  progress +
  "% — " +
  safeText(
    progressTitle
  ) +

  "\n";


if (
  progressUpdate
) {

  viewText +=

    safeText(
      progressUpdate
    ) +

    "\n";
}


viewText +=

  "\n" +

  "📝 <b>REQUIREMENTS</b>\n" +

  safeText(
    requirementsText
  ) +

  "\n\n" +

  "📱 <b>CONTACTS</b>\n" +

  "Telegram: " +
  safeText(
    telegram ||
    "Not provided"
  ) +

  "\n" +

  "Other Number: " +
  safeText(
    otherNumber ||
    "Not provided"
  ) +

  "\n" +

  "Instagram: " +
  safeText(
    instagram ||
    "Not provided"
  ) +

  "\n" +

  "WhatsApp: " +
  safeText(
    whatsapp ||
    "Not provided"
  ) +

  "\n" +

  "Email: " +
  safeText(
    email ||
    "Not provided"
  ) +

  "\n\n" +

  "💰 <b>QUOTE / PRICE</b>\n" +

  "Total: " +
  priceText(
    totalPrice
  ) +

  "\n" +

  "Advance (50%): " +
  priceText(
    advanceAmount
  ) +

  "\n" +

  "Remaining (50%): " +
  priceText(
    remainingAmount
  ) +

  "\n";


if (
  quoteSetAt
) {

  viewText +=

    "Quote Set At: " +
    safeText(
      quoteSetAt
    ) +

    "\n";
}


viewText +=

  "\n" +

  "🕐 <b>TIMELINE</b>\n" +

  "Created: " +
  safeText(
    createdAt
  ) +

  "\n" +

  "Submitted: " +
  safeText(
    submittedAt
  ) +

  "\n" +

  "Accepted: " +
  safeText(
    acceptedAt
  ) +

  "\n";


if (
  rejectedAt
) {

  viewText +=

    "Rejected: " +
    safeText(
      rejectedAt
    ) +

    "\n";
}


viewText +=

  "Updated: " +
  safeText(
    updatedAt
  ) +

  "\n\n" +

  "👨‍💼 <b>ADMIN INFO</b>\n";


if (
  acceptedBy
) {

  viewText +=

    "Accepted By: " +
    safeText(
      acceptedBy
    ) +

    "\n";
}


if (
  rejectedBy
) {

  viewText +=

    "Rejected By: " +
    safeText(
      rejectedBy
    ) +

    "\n";
}


if (
  quoteSetBy
) {

  viewText +=

    "Quote Set By: " +
    safeText(
      quoteSetBy
    ) +

    "\n";
}


viewText +=

  "\n" +

  "📚 <b>History Entries:</b> " +
  historyCount;


// =====================================================
// 🔘 ADMIN BUTTONS
// =====================================================

var buttons = [];


// =====================================================
// 🟡 SUBMITTED
// =====================================================

if (
  status === "submitted"
) {

  buttons.push([

    {
      text:
        "✅ Accept",

      callback_data:
        "BUILD_ADMIN_ACCEPT " +
        enquiryId
    },

    {
      text:
        "❌ Reject",

      callback_data:
        "BUILD_ADMIN_REJECT " +
        enquiryId
    }

  ]);

}


// =====================================================
// 🟢 ACCEPTED
// =====================================================

if (
  status === "accepted"
) {

  buttons.push([

    {
      text:
        "💬 Contact User",

      callback_data:
        "BUILD_ADMIN_CONTACT " +
        enquiryId
    },

    {
      text:
        "💰 Set Quote",

      callback_data:
        "BUILD_ADMIN_QUOTE " +
        enquiryId
    }

  ]);

}


// =====================================================
// 🔄 REFRESH
// =====================================================

buttons.push([

  {
    text:
      "🔄 Refresh",

    callback_data:
      "BUILD_ADMIN_VIEW " +
      enquiryId
  }

]);


// =====================================================
// 📩 SEND VIEW
// =====================================================

Api.sendMessage({

  chat_id:
    adminId,

  text:
    viewText,

  parse_mode:
    "HTML",

  disable_web_page_preview:
    true,

  reply_markup: {

    inline_keyboard:
      buttons

  }

});


// =====================================================
// ✅ END SCRIPT 202
// =====================================================
