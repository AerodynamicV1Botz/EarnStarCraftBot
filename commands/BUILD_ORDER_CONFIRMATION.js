/*CMD
  command: BUILD_ORDER_CONFIRMATION
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
  command: BUILD_ORDER_CONFIRMATION
  need_reply: false
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 211 — BUILD_ORDER_CONFIRMATION
//
// CLIENT → FINAL ORDER CONFIRMATION
//
// FLOW:
// BUILD_CLIENT_AGREE
//        ↓
// BUILD_ORDER_CONFIRMATION
//        ↓
// CLIENT CONFIRMS
//        ↓
// BUILD_ORDER_CREATE
//
// IMPORTANT:
// - Client only
// - No payment request
// - No payment proof
// - No order creation here
// - Order is created only after Confirm button
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

  return String(
    value === undefined ||
    value === null
      ? ""
      : value
  )
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


if (
  !enquiry ||
  typeof enquiry !== "object"
) {

  Api.sendMessage({

    chat_id:
      clientId,

    text:
      "❌ <b>Enquiry Not Found</b>\n\n" +
      "Please open your quote again.",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// 🔒 CLIENT OWNERSHIP
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
  enquiryClientId !== clientId
) {

  Api.sendMessage({

    chat_id:
      clientId,

    text:
      "⛔ <b>Access Denied</b>\n\n" +
      "This enquiry does not belong to your account.",

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
  status === "order_created" ||
  status === "accepted_order"
) {

  Api.sendMessage({

    chat_id:
      clientId,

    text:
      "✅ <b>Order Already Created</b>\n\n" +
      "This project has already been converted into an order.\n\n" +
      "🆔 <b>Enquiry:</b> " +
      safeText(enquiryId),

    parse_mode:
      "HTML"

  });

  return;
}


if (
  status !== "quote_agreed"
) {

  Api.sendMessage({

    chat_id:
      clientId,

    text:
      "⚠️ <b>Order Confirmation Unavailable</b>\n\n" +
      "Please accept the project quote first.",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// 💰 QUOTE DATA
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


if (totalPrice <= 0) {

  Api.sendMessage({

    chat_id:
      clientId,

    text:
      "⚠️ <b>Invalid Project Price</b>\n\n" +
      "The project quote is not available correctly.\n\n" +
      "Please contact the EarnStar Team.",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// 📋 REQUIREMENTS
// =====================================================

var requirements =
  "";


if (
  enquiry.requirements &&
  typeof enquiry.requirements === "object"
) {

  requirements =
    String(
      enquiry.requirements.description ||
      enquiry.requirements.fullMessage ||
      enquiry.requirements.text ||
      ""
    ).trim();

} else {

  requirements =
    String(
      enquiry.requirements ||
      ""
    ).trim();

}


if (!requirements) {

  requirements =
    "Project requirements available in enquiry.";

}


// =====================================================
// 🌐 LANGUAGE
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
// 💬 CONFIRMATION TEXT
// =====================================================

var text =
  "";


if (language === "english") {

  text =

    "📋 <b>FINAL ORDER CONFIRMATION</b>\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(enquiryId) +

    "\n\n" +

    "🤖 <b>Project:</b> Custom Bot / Automation\n\n" +

    "📝 <b>Requirements:</b>\n" +
    safeText(requirements) +

    "\n\n" +

    "💰 <b>Total Project Price:</b> ₹" +
    safeText(totalPrice) +

    "\n" +

    "💵 <b>Advance (50%):</b> ₹" +
    safeText(advanceAmount) +

    "\n" +

    "💳 <b>Remaining (50%):</b> ₹" +
    safeText(remainingAmount) +

    "\n\n" +

    "📌 <b>Next Step:</b>\n" +
    "After you confirm the order, the EarnStar Team will prepare the order and payment process.\n\n" +

    "⚠️ <b>No payment is requested on this screen.</b>\n\n" +

    "Please confirm if you want to proceed.";

} else if (language === "gujarati") {

  text =

    "📋 <b>FINAL ORDER CONFIRMATION</b>\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(enquiryId) +

    "\n\n" +

    "🤖 <b>Project:</b> Custom Bot / Automation\n\n" +

    "📝 <b>Requirements:</b>\n" +
    safeText(requirements) +

    "\n\n" +

    "💰 <b>કુલ પ્રોજેક્ટ કિંમત:</b> ₹" +
    safeText(totalPrice) +

    "\n" +

    "💵 <b>Advance (50%):</b> ₹" +
    safeText(advanceAmount) +

    "\n" +

    "💳 <b>બાકી (50%):</b> ₹" +
    safeText(remainingAmount) +

    "\n\n" +

    "📌 <b>આગલું પગલું:</b>\n" +
    "Confirm કર્યા પછી EarnStar Team order અને payment process તૈયાર કરશે.\n\n" +

    "⚠️ <b>આ screen પર કોઈ payment માંગવામાં આવી નથી.</b>\n\n" +

    "Proceed કરવા માટે confirm કરો.";

} else {

  text =

    "📋 <b>FINAL ORDER CONFIRMATION</b>\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(enquiryId) +

    "\n\n" +

    "🤖 <b>Project:</b> Custom Bot / Automation\n\n" +

    "📝 <b>Requirements:</b>\n" +
    safeText(requirements) +

    "\n\n" +

    "💰 <b>Total Project Price:</b> ₹" +
    safeText(totalPrice) +

    "\n" +

    "💵 <b>Advance (50%):</b> ₹" +
    safeText(advanceAmount) +

    "\n" +

    "💳 <b>Remaining (50%):</b> ₹" +
    safeText(remainingAmount) +

    "\n\n" +

    "📌 <b>Next Step:</b>\n" +
    "Confirm karne ke baad EarnStar Team order aur payment process prepare karegi.\n\n" +

    "⚠️ <b>Is screen par abhi koi payment request nahi hai.</b>\n\n" +

    "Proceed karna hai to Confirm Order dabao.";

}


// =====================================================
// 🔘 BUTTONS
// =====================================================

var buttons = {

  inline_keyboard: [

    [

      {
        text:
          "✅ Confirm Order",

        callback_data:
          "BUILD_ORDER_CREATE " +
          enquiryId
      }

    ],

    [

      {
        text:
          "💬 Discuss Again",

        callback_data:
          "BUILD_CLIENT_DISCUSS " +
          enquiryId
      }

    ]

  ]

};


// =====================================================
// 📤 SEND CONFIRMATION
// =====================================================

Api.sendMessage({

  chat_id:
    clientId,

  text:
    text,

  parse_mode:
    "HTML",

  disable_web_page_preview:
    true,

  reply_markup:
    buttons

});


// =====================================================
// 🔔 CALLBACK ANSWER
// =====================================================

try {

  Api.answerCallbackQuery({

    callback_query_id:
      request.id,

    text:
      "📋 Order confirmation ready."

  });

} catch (error) {

  // Ignore callback answer failure.

}


// =====================================================
// ✅ END SCRIPT 211
// =====================================================
