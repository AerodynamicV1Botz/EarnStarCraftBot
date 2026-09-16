/*CMD
  command: BUILD_CLIENT_AGREE
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
  command: BUILD_CLIENT_AGREE
  need_reply: false
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 209 — BUILD_CLIENT_AGREE
//
// CLIENT → AGREE TO PROJECT QUOTE
//
// FLOW:
// BUILD_ADMIN_QUOTE_SAVE
//        ↓
// CLIENT GETS QUOTE
//        ↓
// BUILD_CLIENT_AGREE
//        ↓
// QUOTE ACCEPTED
//        ↓
// BUILD_ORDER_CONFIRMATION
//        ↓
// BUILD_ORDER_CREATE
//
// IMPORTANT:
// - Client only
// - Callback command
// - No payment request here
// - No automatic payment here
// - No duplicate order creation
// - After accepting quote, client gets Order Confirmation button
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
      "Enquiry ID is missing.\n\n" +
      "Please open your quote again.",

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
// 🔒 STATUS
// =====================================================

var status =
  String(
    enquiry.status ||
    ""
  ).toLowerCase();


// =====================================================
// 🔒 ALREADY AGREED
// =====================================================

if (
  status === "quote_agreed"
) {

  Api.sendMessage({

    chat_id:
      clientId,

    text:

      "✅ <b>Quote Already Accepted</b>\n\n" +

      "You have already agreed to this project quote.\n\n" +

      "🆔 <b>Enquiry:</b> " +
      safeText(
        enquiryId
      ) +

      "\n\n" +

      "Your order confirmation is ready.\n" +

      "Please continue to confirm your project order.",

    parse_mode:
      "HTML",

    reply_markup: {

      inline_keyboard: [

        [

          {
            text:
              "📋 Continue to Order Confirmation",

            callback_data:
              "BUILD_ORDER_CONFIRMATION " +
              enquiryId
          }

        ]

      ]

    }

  });

  return;
}


// =====================================================
// 🔒 ALREADY CONVERTED
// =====================================================

if (
  status === "order_created" ||
  status === "accepted_order"
) {

  Api.sendMessage({

    chat_id:
      clientId,

    text:

      "✅ <b>Quote Already Confirmed</b>\n\n" +

      "Your project has already moved to the order process.\n\n" +

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
// ⛔ REJECTED / CLOSED
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

      "⚠️ <b>Quote Cannot Be Accepted</b>\n\n" +

      "This enquiry is currently closed.\n\n" +

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
// ⛔ QUOTE NOT SET
// =====================================================

if (
  totalPrice <= 0
) {

  Api.sendMessage({

    chat_id:
      clientId,

    text:

      "⚠️ <b>Quote Not Available</b>\n\n" +

      "The project price has not been set yet.\n\n" +

      "Please wait for the EarnStar Team to provide the quote.",

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
// 💾 SAVE QUOTE ACCEPTANCE
// =====================================================

enquiry.status =
  "quote_agreed";


enquiry.stage =
  "order_confirmation";


enquiry.packageStep =
  "quote_agreed";


enquiry.quoteStatus =
  "accepted";


enquiry.quoteAcceptedBy =
  clientId;


enquiry.quoteAcceptedAt =
  now;


enquiry.progress =
  20;


enquiry.progressTitle =
  "Quote Accepted";


enquiry.progressUpdate =
  "You agreed to the project quote. Your order confirmation is ready.";


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
    "quote_agreed",

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
    "Client agreed to the project quote. Order confirmation is ready."

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
// 👤 LOAD USER LANGUAGE
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
// 💬 CLIENT CONFIRMATION
// =====================================================

var clientText =
  "";


if (
  language === "english"
) {

  clientText =

    "✅ <b>Quote Accepted Successfully!</b>\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(
      enquiryId
    ) +

    "\n\n" +

    "💰 <b>Total Project Price:</b> ₹" +
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

    "🎯 Your quote has been accepted.\n\n" +

    "📋 Your order confirmation is now ready.\n\n" +

    "Click the button below to review and confirm your order.\n\n" +

    "⚠️ <b>No payment has been requested yet.</b>";

} else if (
  language === "gujarati"
) {

  clientText =

    "✅ <b>કોટ સફળતાપૂર્વક સ્વીકાર્યો!</b>\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(
      enquiryId
    ) +

    "\n\n" +

    "💰 <b>કુલ પ્રોજેક્ટ કિંમત:</b> ₹" +
    safeText(
      totalPrice
    ) +

    "\n" +

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

    "🎯 તમારો કોટ સ્વીકારવામાં આવ્યો છે.\n\n" +

    "📋 હવે order confirmation તૈયાર છે.\n\n" +

    "નીચેનું button દબાવીને order review અને confirm કરો.\n\n" +

    "⚠️ <b>હજુ payment માંગવામાં આવી નથી.</b>";

} else {

  clientText =

    "✅ <b>Quote Successfully Accept Ho Gaya!</b>\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(
      enquiryId
    ) +

    "\n\n" +

    "💰 <b>Total Project Price:</b> ₹" +
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

    "🎯 Aapne quote accept kar diya hai.\n\n" +

    "📋 Ab <b>Order Confirmation</b> ready hai.\n\n" +

    "Neeche button dabakar order review karke confirm karo.\n\n" +

    "⚠️ <b>Abhi koi payment request nahi ki gayi hai.</b>";

}


// =====================================================
// 🔘 CLIENT NEXT-STEP BUTTON
// =====================================================

var clientButtons = [

  [

    {

      text:
        "📋 Confirm & Create Order",

      callback_data:
        "BUILD_ORDER_CONFIRMATION " +
        enquiryId

    }

  ]

];


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
    true,

  reply_markup: {

    inline_keyboard:
      clientButtons

  }

});


// =====================================================
// 👑 ADMIN NOTIFICATION
// =====================================================

var ownerId =
  "7897324623";


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
// 👥 BUILD ADMIN RECIPIENT LIST
// =====================================================

var recipients =
  [ownerId];


for (
  var j = 0;
  j < adminList.length;
  j++
) {

  var allowedAdminId =
    "";


  if (
    typeof adminList[j] === "object" &&
    adminList[j] !== null
  ) {

    allowedAdminId =
      String(
        adminList[j].id ||
        adminList[j].telegramId ||
        ""
      );

  } else {

    allowedAdminId =
      String(
        adminList[j] ||
        ""
      );

  }


  if (
    allowedAdminId &&
    recipients.indexOf(
      allowedAdminId
    ) === -1
  ) {

    recipients.push(
      allowedAdminId
    );

  }

}


// =====================================================
// 📢 ADMIN MESSAGE
// =====================================================

var adminText =

  "✅ <b>CLIENT ACCEPTED QUOTE</b>\n" +

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

  "📊 <b>Status:</b> Quote Accepted\n" +

  "📈 <b>Progress:</b> 20%\n\n" +

  "🎯 Client has agreed to the quote.\n" +

  "➡️ Next step: Client must confirm the project order.\n\n" +

  "⚠️ Do not request payment until the order is confirmed.";


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
  var k = 0;
  k < recipients.length;
  k++
) {

  try {

    Api.sendMessage({

      chat_id:
        recipients[k],

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
      "✅ Quote accepted. Order confirmation is ready."

  });

} catch (error) {

  // Ignore callback answer failure.

}


// =====================================================
// ✅ END SCRIPT 209
// =====================================================
