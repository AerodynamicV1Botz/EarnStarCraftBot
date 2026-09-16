/*CMD
  command: BUILD_CLIENT_DECLINE
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
  command: BUILD_CLIENT_DECLINE
  need_reply: false
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 206 — BUILD_CLIENT_DECLINE
//
// CLIENT → DECLINE PROJECT QUOTE
//
// FLOW:
// BUILD_ADMIN_QUOTE_SAVE
//        ↓
// CLIENT GETS QUOTE
//        ↓
// BUILD_CLIENT_DECLINE
//        ↓
// QUOTE DECLINED
//        ↓
// ENQUIRY CLOSED
//
// IMPORTANT:
// - Client only
// - Callback command
// - No payment request
// - No order creation
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
// 🆔 READ ENQUIRY ID
// =====================================================

var enquiryId =
  String(
    params ||
    ""
  ).trim();


// =====================================================
// ⛔ MISSING ENQUIRY ID
// =====================================================

if (!enquiryId) {

  Api.sendMessage({

    chat_id:
      clientId,

    text:

      "❌ <b>Invalid Request</b>\n\n" +

      "Enquiry ID is missing.",

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

      "🆔 Enquiry ID: " +
      safeText(
        enquiryId
      ) +

      "\n\n" +

      "This enquiry could not be found.",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// 🔒 CLIENT OWNERSHIP CHECK
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

      "This quote does not belong to your account.",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// 🔒 CURRENT STATUS
// =====================================================

var status =
  String(
    enquiry.status ||
    ""
  ).toLowerCase();


// =====================================================
// ⛔ ALREADY DECLINED
// =====================================================

if (
  status === "quote_declined"
) {

  Api.sendMessage({

    chat_id:
      clientId,

    text:

      "ℹ️ <b>Quote Already Declined</b>\n\n" +

      "You have already declined this project quote.\n\n" +

      "🆔 <b>Enquiry:</b> " +
      safeText(
        enquiryId
      ),

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// ⛔ ALREADY AGREED
// =====================================================

if (
  status === "quote_agreed" ||
  status === "order_created" ||
  status === "accepted_order"
) {

  Api.sendMessage({

    chat_id:
      clientId,

    text:

      "⚠️ <b>Quote Already Accepted</b>\n\n" +

      "This quote has already been accepted and cannot be declined now.\n\n" +

      "🆔 <b>Enquiry:</b> " +
      safeText(
        enquiryId
      ),

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// ⛔ CLOSED / REJECTED
// =====================================================

if (
  status === "rejected" ||
  status === "closed" ||
  status === "completed"
) {

  Api.sendMessage({

    chat_id:
      clientId,

    text:

      "⚠️ <b>Enquiry Closed</b>\n\n" +

      "This enquiry is already closed.\n\n" +

      "🆔 <b>Enquiry:</b> " +
      safeText(
        enquiryId
      ),

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// 💰 QUOTE CHECK
// =====================================================

var totalPrice =
  Number(
    enquiry.totalPrice ||
    enquiry.price ||
    enquiry.quote ||
    0
  );


var advanceAmount =
  Number(
    enquiry.advanceAmount ||
    0
  );


var remainingAmount =
  Number(
    enquiry.remainingAmount ||
    0
  );


// =====================================================
// 🕐 TIMESTAMP
// =====================================================

var now =
  new Date().toISOString();


// =====================================================
// 💾 UPDATE DECLINE STATUS
// =====================================================

enquiry.status =
  "quote_declined";


enquiry.stage =
  "closed";


enquiry.packageStep =
  "quote_declined";


enquiry.quoteStatus =
  "declined";


enquiry.quoteDeclinedBy =
  clientId;


enquiry.quoteDeclinedAt =
  now;


enquiry.progress =
  0;


enquiry.progressTitle =
  "Quote Declined";


enquiry.progressUpdate =
  "The client declined the project quote. This enquiry has been closed.";


enquiry.updatedAt =
  now;


// =====================================================
// 📚 HISTORY
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
    "quote_declined",

  clientId:
    clientId,

  timestamp:
    now,

  totalPrice:
    totalPrice,

  advanceAmount:
    advanceAmount,

  remainingAmount:
    remainingAmount,

  note:
    "Client declined the project quote. Enquiry closed."

});


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
// 👤 LOAD CLIENT LANGUAGE
// =====================================================

var clientUser =
  Bot.getProperty(
    "USER_" +
    clientId
  ) || {};


var language =
  String(
    clientUser.language ||
    enquiry.language ||
    "hinglish"
  ).toLowerCase();


if (
  language !== "english" &&
  language !== "gujarati" &&
  language !== "hinglish"
) {

  language =
    "hinglish";
}


// =====================================================
// 💬 CLIENT MESSAGE
// =====================================================

var clientText =
  "";


if (
  language === "english"
) {

  clientText =

    "❌ <b>Quote Declined</b>\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(
      enquiryId
    ) +

    "\n\n" +

    "Your project quote has been declined and this enquiry is now closed.\n\n" +

    "No payment has been requested.\n\n" +

    "If you want to discuss a different requirement or budget later, you can contact the EarnStar Team.";

} else if (
  language === "gujarati"
) {

  clientText =

    "❌ <b>કોટ નકારવામાં આવ્યો</b>\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(
      enquiryId
    ) +

    "\n\n" +

    "તમારો પ્રોજેક્ટ કોટ નકારવામાં આવ્યો છે અને આ enquiry હવે બંધ કરવામાં આવી છે.\n\n" +

    "હજુ કોઈ payment માંગવામાં આવી નથી.\n\n" +

    "જો ભવિષ્યમાં અલગ requirement અથવા budget વિશે ચર્ચા કરવી હોય તો EarnStar Team નો સંપર્ક કરી શકો છો.";

} else {

  clientText =

    "❌ <b>Quote Decline Kar Diya Gaya</b>\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(
      enquiryId
    ) +

    "\n\n" +

    "Aapne project quote decline kar diya hai aur ye enquiry ab close ho gayi hai.\n\n" +

    "Abhi koi payment request nahi ki gayi hai.\n\n" +

    "Future mein different requirement ya budget discuss karna ho to EarnStar Team se contact kar sakte ho.";

}


// =====================================================
// 📤 SEND CLIENT CONFIRMATION
// =====================================================

Api.sendMessage({

  chat_id:
    clientId,

  text:
    clientText,

  parse_mode:
    "HTML",

  disable_web_page_preview:
    true

});


// =====================================================
// 👥 LOAD ADMINS
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
// 👥 ADMIN RECIPIENTS
// =====================================================

var recipients =
  [ownerId];


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
        adminList[i] ||
        ""
      );
  }


  if (
    allowedId &&
    recipients.indexOf(
      allowedId
    ) === -1
  ) {

    recipients.push(
      allowedId
    );

  }
}


// =====================================================
// 📢 ADMIN NOTIFICATION
// =====================================================

var adminText =

  "❌ <b>CLIENT DECLINED QUOTE</b>\n" +

  "━━━━━━━━━━━━━━━━━━\n\n" +

  "🆔 <b>Enquiry:</b> " +
  safeText(
    enquiryId
  ) +

  "\n\n" +

  "👤 <b>Client:</b> " +
  safeText(
    enquiry.userName ||
    "Client"
  ) +

  "\n" +

  "🆔 <b>Client ID:</b> " +
  safeText(
    clientId
  ) +

  "\n\n" +

  "💰 <b>Total Quote:</b> ₹" +
  safeText(
    totalPrice
  ) +

  "\n" +

  "🔹 <b>Advance:</b> ₹" +
  safeText(
    advanceAmount
  ) +

  "\n" +

  "🔹 <b>Remaining:</b> ₹" +
  safeText(
    remainingAmount
  ) +

  "\n\n" +

  "📊 <b>Status:</b> Quote Declined\n" +

  "📈 <b>Progress:</b> 0%\n\n" +

  "⚠️ Client declined the quote.\n" +

  "No payment should be requested.\n" +

  "The enquiry has been closed.";

  
// =====================================================
// 🔘 ADMIN BUTTONS
// =====================================================

var adminButtons = [

  [

    {
      text:
        "🔎 View Enquiry",

      callback_data:
        "BUILD_ADMIN_VIEW " +
        enquiryId
    }

  ]

];


// =====================================================
// 📤 SEND ADMIN NOTIFICATIONS
// =====================================================

for (
  var j = 0;
  j < recipients.length;
  j++
) {

  try {

    Api.sendMessage({

      chat_id:
        recipients[j],

      text:
        adminText,

      parse_mode:
        "HTML",

      disable_web_page_preview:
        true,

      reply_markup: {

        inline_keyboard:
          adminButtons

      }

    });

  } catch (error) {

    // Continue if one admin notification fails.

  }
}


// =====================================================
// 🔔 CALLBACK ANSWER
// =====================================================

try {

  Api.answerCallbackQuery({

    callback_query_id:
      request.id,

    text:
      "❌ Quote declined."

  });

} catch (error) {

  // Ignore callback answer failure.

}


// =====================================================
// ✅ END SCRIPT 206
// =====================================================
