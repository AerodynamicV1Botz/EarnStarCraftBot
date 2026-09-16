/*CMD
  command: BUILD_ADMIN_QUOTE_SAVE
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
  command: BUILD_ADMIN_QUOTE_SAVE
  need_reply: true
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 204 — BUILD_ADMIN_QUOTE_SAVE
//
// ADMIN → SAVE TOTAL PROJECT QUOTE
//
// FLOW:
// BUILD_ADMIN_QUOTE
//        ↓
// ADMIN ENTERS TOTAL PRICE
//        ↓
// BUILD_ADMIN_QUOTE_SAVE
//        ↓
// 50% ADVANCE + 50% REMAINING
//        ↓
// CLIENT GETS QUOTE
//
// IMPORTANT:
// - Input command
// - need_reply = true
// - Pending enquiry ID comes from property
// - No payment request here
// - No automatic order creation here
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
// 📝 READ ADMIN INPUT
// =====================================================
// IMPORTANT:
// BotBusiness/BotScrip need_reply input
// direct `message` mein aa sakta hai.
//
// DO NOT use:
// message.text
//
// Use:
// String(message || "")
// =====================================================

var inputText =
  String(
    message ||
    ""
  ).trim();


// =====================================================
// ⛔ EMPTY INPUT
// =====================================================

if (!inputText) {

  Api.sendMessage({

    chat_id:
      adminId,

    text:
      "❌ <b>Invalid Amount</b>\n\n" +
      "Please enter the total project price.\n\n" +
      "Example: <code>8000</code>",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// 🧹 CLEAN PRICE INPUT
// =====================================================
//
// Allowed examples:
// ₹8000
// ₹ 8000
// 8,000
// 8 000
// 8000
// 8000.50
//
// Currency symbol, commas and spaces are removed.
// =====================================================

var cleanAmount =
  inputText
    .replace(/₹/g, "")
    .replace(/,/g, "")
    .replace(/\s/g, "");


// =====================================================
// ⛔ INVALID PRICE FORMAT
// =====================================================

if (
  !/^\d+(\.\d{1,2})?$/.test(
    cleanAmount
  )
) {

  Api.sendMessage({

    chat_id:
      adminId,

    text:

      "❌ <b>Invalid Price</b>\n\n" +

      "Please enter only a valid numeric total amount.\n\n" +

      "Examples:\n" +

      "• <code>8000</code>\n" +

      "• <code>8000.50</code>\n" +

      "• <code>₹8,000</code>",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// 💰 PARSE TOTAL PRICE
// =====================================================

var totalPrice =
  parseFloat(
    cleanAmount
  );


// =====================================================
// ⛔ INVALID / ZERO PRICE
// =====================================================

if (
  isNaN(totalPrice) ||
  totalPrice <= 0
) {

  Api.sendMessage({

    chat_id:
      adminId,

    text:

      "❌ <b>Invalid Amount</b>\n\n" +

      "Total project price must be greater than ₹0.",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// 🔢 ROUND TO 2 DECIMAL PLACES
// =====================================================

totalPrice =
  Math.round(
    totalPrice * 100
  ) / 100;


// =====================================================
// 💰 CALCULATE 50 / 50
// =====================================================

var advanceAmount =
  Math.round(
    (totalPrice / 2) * 100
  ) / 100;


var remainingAmount =
  Math.round(
    (totalPrice - advanceAmount) * 100
  ) / 100;


// =====================================================
// 🆔 READ PENDING ENQUIRY
// =====================================================

var pendingKey =
  "BUILD_ADMIN_QUOTE_PENDING_" +
  adminId;


var enquiryId =
  String(
    Bot.getProperty(
      pendingKey
    ) ||
    ""
  ).trim();


// =====================================================
// ⛔ NO PENDING ENQUIRY
// =====================================================

if (!enquiryId) {

  Api.sendMessage({

    chat_id:
      adminId,

    text:

      "⚠️ <b>No Pending Quote</b>\n\n" +

      "There is no enquiry waiting for a quote.\n\n" +

      "Please open an accepted enquiry and tap " +
      "<b>💰 Set Quote</b> again.",

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

      "🆔 Enquiry ID: " +
      safeText(
        enquiryId
      ) +

      "\n\n" +

      "The pending quote request has been cancelled.",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// 🔒 STATUS CHECK
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

      "⚠️ <b>Quote Not Saved</b>\n\n" +

      "Enquiry status is currently:\n" +

      "<code>" +
      safeText(
        status ||
        "unknown"
      ) +
      "</code>\n\n" +

      "Quote can only be set for an accepted enquiry.",

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

      "The enquiry does not contain a valid client ID.\n\n" +

      "Quote was not saved.",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// 🕐 TIMESTAMP
// =====================================================

var now =
  new Date().toISOString();


// =====================================================
// 💰 SAVE QUOTE DATA
// =====================================================

enquiry.totalPrice =
  totalPrice;


enquiry.price =
  totalPrice;


enquiry.quote =
  totalPrice;


enquiry.advanceAmount =
  advanceAmount;


enquiry.remainingAmount =
  remainingAmount;


enquiry.advancePercentage =
  50;


enquiry.remainingPercentage =
  50;


enquiry.quoteStatus =
  "set";


enquiry.quoteSetBy =
  adminId;


enquiry.quoteSetAt =
  now;


// =====================================================
// 📊 UPDATE ENQUIRY STATUS
// =====================================================

enquiry.status =
  "accepted";


enquiry.stage =
  "quote_set";


enquiry.packageStep =
  "quote_set";


enquiry.progress =
  15;


enquiry.progressTitle =
  "Quote Ready";


enquiry.progressUpdate =
  "Your custom bot enquiry has been quoted. Waiting for your confirmation.";


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
    "quote_set",

  adminId:
    adminId,

  timestamp:
    now,

  totalPrice:
    totalPrice,

  advanceAmount:
    advanceAmount,

  remainingAmount:
    remainingAmount,

  note:
    "Project quote set by admin. Waiting for client confirmation."

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
// 🧹 CLEAR PENDING QUOTE
// =====================================================

Bot.setProperty(

  pendingKey,

  "",

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


// =====================================================
// 🌐 NORMALIZE LANGUAGE
// =====================================================

if (
  language !== "english" &&
  language !== "gujarati" &&
  language !== "hinglish"
) {

  language =
    "hinglish";
}


// =====================================================
// 💬 CLIENT QUOTE MESSAGE
// =====================================================

var clientText =
  "";


if (
  language === "english"
) {

  clientText =

    "💰 <b>Your Project Quote Is Ready!</b>\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(
      enquiryId
    ) +

    "\n\n" +

    "💵 <b>Total Project Price:</b> ₹" +
    safeText(
      totalPrice
    ) +

    "\n\n" +

    "🔹 <b>Advance (50%):</b> ₹" +
    safeText(
      advanceAmount
    ) +

    "\n" +

    "🔹 <b>Remaining (50%):</b> ₹" +
    safeText(
      remainingAmount
    ) +

    "\n\n" +

    "Please review the quote and choose an option below.\n\n" +

    "⚠️ Payment is <b>not requested yet</b>. " +
    "Payment will be requested only after you agree to the quote and the order is confirmed.";

} else if (
  language === "gujarati"
) {

  clientText =

    "💰 <b>તમારા પ્રોજેક્ટનો કોટ તૈયાર છે!</b>\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(
      enquiryId
    ) +

    "\n\n" +

    "💵 <b>કુલ પ્રોજેક્ટ કિંમત:</b> ₹" +
    safeText(
      totalPrice
    ) +

    "\n\n" +

    "🔹 <b>Advance (50%):</b> ₹" +
    safeText(
      advanceAmount
    ) +

    "\n" +

    "🔹 <b>બાકી (50%):</b> ₹" +
    safeText(
      remainingAmount
    ) +

    "\n\n" +

    "કૃપા કરીને કોટ તપાસો અને નીચેનો વિકલ્પ પસંદ કરો.\n\n" +

    "⚠️ અત્યારે <b>payment માંગવામાં આવી નથી</b>. " +
    "તમે કોટ agree કર્યા પછી અને order confirm થયા બાદ જ payment request કરવામાં આવશે.";

} else {

  clientText =

    "💰 <b>Aapke Project ka Quote Ready Hai!</b>\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(
      enquiryId
    ) +

    "\n\n" +

    "💵 <b>Total Project Price:</b> ₹" +
    safeText(
      totalPrice
    ) +

    "\n\n" +

    "🔹 <b>Advance (50%):</b> ₹" +
    safeText(
      advanceAmount
    ) +

    "\n" +

    "🔹 <b>Remaining (50%):</b> ₹" +
    safeText(
      remainingAmount
    ) +

    "\n\n" +

    "Quote check karke neeche option select karo.\n\n" +

    "⚠️ Abhi <b>payment request nahi ki gayi hai</b>. " +
    "Aap quote agree karoge aur order confirm hoga, uske baad hi payment request ki jayegi.";

}


// =====================================================
// 🔘 CLIENT QUOTE BUTTONS
// =====================================================

var clientButtons = [

  [

    {
      text:
        "✅ Agree",

      callback_data:
        "BUILD_CLIENT_AGREE " +
        enquiryId
    },

    {
      text:
        "❌ Decline",

      callback_data:
        "BUILD_CLIENT_DECLINE " +
        enquiryId
    }

  ],

  [

    {
      text:
        "💬 Discuss",

      callback_data:
        "BUILD_CLIENT_DISCUSS " +
        enquiryId
    }

  ]

];


// =====================================================
// 📤 SEND QUOTE TO CLIENT
// =====================================================

var deliverySuccess =
  true;


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

      inline_keyboard:
        clientButtons

    }

  });

} catch (error) {

  deliverySuccess =
    false;
}


// =====================================================
// 👨‍💼 ADMIN RESULT
// =====================================================

if (
  deliverySuccess
) {

  Api.sendMessage({

    chat_id:
      adminId,

    text:

      "✅ <b>Quote Saved Successfully</b>\n" +

      "━━━━━━━━━━━━━━━━━━\n\n" +

      "🆔 <b>Enquiry:</b> " +
      safeText(
        enquiryId
      ) +

      "\n\n" +

      "💰 <b>Total:</b> ₹" +
      safeText(
        totalPrice
      ) +

      "\n" +

      "🔹 <b>Advance (50%):</b> ₹" +
      safeText(
        advanceAmount
      ) +

      "\n" +

      "🔹 <b>Remaining (50%):</b> ₹" +
      safeText(
        remainingAmount
      ) +

      "\n\n" +

      "📊 <b>Status:</b> Quote Ready\n" +

      "📈 <b>Progress:</b> 15%\n\n" +

      "👤 Client ko quote bhej diya gaya hai.\n" +

      "Client ke response ka wait karo.",

    parse_mode:
      "HTML",

    reply_markup: {

      inline_keyboard: [

        [

          {
            text:
              "💬 Contact User",

            callback_data:
              "BUILD_ADMIN_CONTACT " +
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

} else {

  Api.sendMessage({

    chat_id:
      adminId,

    text:

      "⚠️ <b>Quote Saved, But Client Delivery Failed</b>\n" +

      "━━━━━━━━━━━━━━━━━━\n\n" +

      "🆔 Enquiry: " +
      safeText(
        enquiryId
      ) +

      "\n\n" +

      "💰 <b>Total:</b> ₹" +
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

      "The quote is saved in the enquiry, but the client could not be notified automatically.",

    parse_mode:
      "HTML",

    reply_markup: {

      inline_keyboard: [

        [

          {
            text:
              "💬 Contact User",

            callback_data:
              "BUILD_ADMIN_CONTACT " +
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

}


// =====================================================
// ✅ END SCRIPT 204
// =====================================================
