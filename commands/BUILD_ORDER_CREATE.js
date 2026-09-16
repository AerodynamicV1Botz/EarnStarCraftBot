/*CMD
  command: BUILD_ORDER_CREATE
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
  command: BUILD_ORDER_CREATE
  need_reply: false
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 212 — BUILD_ORDER_CREATE
//
// CLIENT → CREATE ORDER FROM ACCEPTED BUILD ENQUIRY
//
// FLOW:
// BUILD_ORDER_CONFIRMATION
//        ↓
// BUILD_ORDER_CREATE
//        ↓
// EXISTING ORDER SYSTEM
//
// IMPORTANT:
// - Client only
// - No payment request here
// - No payment proof here
// - Creates ONE order only
// - Prevents duplicate order creation
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
      "Please try again.",

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
  !enquiryClientId ||
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
// 🔒 DUPLICATE ORDER PROTECTION
// =====================================================

var existingOrderId =
  String(
    enquiry.orderId ||
    ""
  ).trim();


if (existingOrderId) {

  Api.sendMessage({

    chat_id:
      clientId,

    text:

      "✅ <b>Order Already Created</b>\n\n" +

      "Your project has already been converted into an order.\n\n" +

      "🆔 <b>Order ID:</b> " +
      safeText(existingOrderId),

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
      "This project is already in the order process.",

    parse_mode:
      "HTML"

  });

  return;
}


if (status !== "quote_agreed") {

  Api.sendMessage({

    chat_id:
      clientId,

    text:
      "⚠️ <b>Order Cannot Be Created</b>\n\n" +
      "The project quote must be accepted before creating the order.",

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
      "❌ <b>Invalid Order Price</b>\n\n" +
      "The accepted quote does not contain a valid total price.",

    parse_mode:
      "HTML"

  });

  return;
}


// =====================================================
// 🆔 GENERATE ORDER ID
// =====================================================

var timestamp =
  new Date().getTime();


var randomPart =
  Math.floor(
    100 +
    Math.random() * 900
  );


var orderId =

  "BO-" +
  String(timestamp).slice(-10) +
  "-" +
  String(clientId).slice(-4) +
  "-" +
  String(randomPart);


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


// =====================================================
// 📞 CONTACTS
// =====================================================

if (!enquiry.contacts) {

  enquiry.contacts = {

    telegram: "",
    otherNumber: "",
    instagram: "",
    whatsapp: "",
    email: ""

  };

}


// =====================================================
// 🕐 TIMESTAMP
// =====================================================

var now =
  new Date().toISOString();


// =====================================================
// 📦 CREATE EXISTING ORDER OBJECT
// =====================================================

var order = {

  orderId:
    orderId,

  id:
    orderId,

  userId:
    clientId,

  userName:
    enquiry.userName ||
    user.first_name ||
    "Client",

  username:
    enquiry.username ||
    user.username ||
    "",

  packageType:
    "custom_bot",

  name:
    "Custom Bot / Automation",

  price:
    totalPrice,

  totalPrice:
    totalPrice,

  advanceAmount:
    advanceAmount,

  remainingAmount:
    remainingAmount,

  advancePercentage:
    50,

  remainingPercentage:
    50,

  telegramProfile:
    enquiry.contacts.telegram ||
    "",

  clientInfo:
    enquiry.userName ||
    "",

  contacts:
    enquiry.contacts,

  requirements:
    requirements,

  budget:
    enquiry.budget ||
    "",

  extraDetails:
    enquiry.extraDetails ||
    "",

  stage:
    "order_created",

  requestStatus:
    "accepted",

  orderStatus:
    "accepted",

  paymentStatus:
    "pending",

  progress:
    0,

  progressTitle:
    "Order Created",

  progressUpdate:
    "Order created after client accepted the project quote.",

  buildEnquiryId:
    enquiryId,

  source:
    "BUILD_ENQUIRY",

  createdAt:
    now,

  updatedAt:
    now

};


// =====================================================
// 💾 SAVE ORDER
// =====================================================

Bot.setProperty(

  "ORDER_" +
  orderId,

  order,

  "json"

);


// =====================================================
// 💾 USER → ORDER MAPPING
// =====================================================

Bot.setProperty(

  "ORDER_USER_" +
  orderId,

  clientId,

  "string"

);


// =====================================================
// 📚 ORDER KEYS
// =====================================================

var orderKeys =
  Bot.getProperty(
    "ORDER_KEYS"
  );


if (
  !Array.isArray(orderKeys)
) {

  orderKeys = [];

}


if (
  orderKeys.indexOf(orderId) === -1
) {

  orderKeys.push(
    orderId
  );

}


Bot.setProperty(

  "ORDER_KEYS",

  orderKeys,

  "json"

);


// =====================================================
// 📚 ORDER HISTORY
// =====================================================

var history = [

  {

    action:
      "order_created",

    userId:
      clientId,

    timestamp:
      now,

    source:
      "BUILD_ENQUIRY",

    buildEnquiryId:
      enquiryId,

    note:
      "Order created after client accepted the project quote."

  }

];


Bot.setProperty(

  "ORDER_HISTORY_" +
  orderId,

  history,

  "json"

);


// =====================================================
// 🔄 UPDATE BUILD ENQUIRY
// =====================================================

enquiry.orderId =
  orderId;

enquiry.status =
  "order_created";

enquiry.stage =
  "order_created";

enquiry.packageStep =
  "order_created";

enquiry.progress =
  25;

enquiry.progressTitle =
  "Order Created";

enquiry.progressUpdate =
  "Your project quote was accepted and the order has been created.";

enquiry.orderCreatedAt =
  now;

enquiry.updatedAt =
  now;


// =====================================================
// 📚 BUILD ENQUIRY HISTORY
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
    "order_created",

  orderId:
    orderId,

  clientId:
    clientId,

  timestamp:
    now,

  note:
    "Build enquiry converted into order."

});


// =====================================================
// 💾 SAVE UPDATED ENQUIRY
// =====================================================

Bot.setProperty(

  "BUILD_ENQUIRY_" +
  enquiryId,

  enquiry,

  "json"

);


Bot.setProperty(

  "BUILD_ENQUIRY_" +
  clientId,

  enquiry,

  "json"

);


// =====================================================
// 🌐 CLIENT LANGUAGE
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
// 💬 CLIENT CONFIRMATION
// =====================================================

var clientText =
  "";


if (language === "english") {

  clientText =

    "✅ <b>Order Created Successfully!</b>\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🆔 <b>Order ID:</b> " +
    safeText(orderId) +

    "\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(enquiryId) +

    "\n\n" +

    "💰 <b>Total:</b> ₹" +
    safeText(totalPrice) +

    "\n" +

    "💵 <b>Advance:</b> ₹" +
    safeText(advanceAmount) +

    "\n" +

    "💳 <b>Remaining:</b> ₹" +
    safeText(remainingAmount) +

    "\n\n" +

    "📌 Your order has been created successfully.\n\n" +

    "The EarnStar Team will review the order and prepare the next payment step.\n\n" +

    "⚠️ <b>Payment has NOT been requested yet.</b>";

} else if (language === "gujarati") {

  clientText =

    "✅ <b>Order સફળતાપૂર્વક બનાવવામાં આવ્યો!</b>\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🆔 <b>Order ID:</b> " +
    safeText(orderId) +

    "\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(enquiryId) +

    "\n\n" +

    "💰 <b>કુલ:</b> ₹" +
    safeText(totalPrice) +

    "\n" +

    "💵 <b>Advance:</b> ₹" +
    safeText(advanceAmount) +

    "\n" +

    "💳 <b>બાકી:</b> ₹" +
    safeText(remainingAmount) +

    "\n\n" +

    "📌 તમારો order સફળતાપૂર્વક બનાવવામાં આવ્યો છે.\n\n" +

    "EarnStar Team હવે આગળનું payment step તૈયાર કરશે.\n\n" +

    "⚠️ <b>હજુ payment માંગવામાં આવી નથી.</b>";

} else {

  clientText =

    "✅ <b>Order Successfully Created!</b>\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🆔 <b>Order ID:</b> " +
    safeText(orderId) +

    "\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(enquiryId) +

    "\n\n" +

    "💰 <b>Total:</b> ₹" +
    safeText(totalPrice) +

    "\n" +

    "💵 <b>Advance:</b> ₹" +
    safeText(advanceAmount) +

    "\n" +

    "💳 <b>Remaining:</b> ₹" +
    safeText(remainingAmount) +

    "\n\n" +

    "📌 Aapka order successfully create ho gaya hai.\n\n" +

    "EarnStar Team order review karke next payment step prepare karegi.\n\n" +

    "⚠️ <b>Abhi payment request nahi ki gayi hai.</b>";

}


// =====================================================
// 📤 CLIENT MESSAGE
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
// 📢 ADMIN NOTIFICATION
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
// 📢 ADMIN TEXT
// =====================================================

var adminText =

  "🆕 <b>NEW BUILD ORDER CREATED</b>\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +

  "🆔 <b>Order ID:</b> " +
  safeText(orderId) +

  "\n" +

  "🆔 <b>Enquiry ID:</b> " +
  safeText(enquiryId) +

  "\n\n" +

  "👤 <b>Client:</b> " +
  safeText(
    enquiry.userName ||
    "Client"
  ) +

  "\n" +

  "🆔 <b>Client ID:</b> " +
  safeText(clientId) +

  "\n\n" +

  "💰 <b>Total:</b> ₹" +
  safeText(totalPrice) +

  "\n" +

  "💵 <b>Advance:</b> ₹" +
  safeText(advanceAmount) +

  "\n" +

  "💳 <b>Remaining:</b> ₹" +
  safeText(remainingAmount) +

  "\n\n" +

  "📊 <b>Status:</b> Order Created\n" +

  "💳 <b>Payment:</b> Pending\n" +

  "📈 <b>Progress:</b> 0%\n\n" +

  "➡️ Next: Admin review and advance payment request.";


// =====================================================
// 🔘 ADMIN BUTTON
// =====================================================

var adminButtons = {

  inline_keyboard: [

    [

      {
        text:
          "📋 View Order",

        callback_data:
          "ADMIN_VIEW_ORDER " +
          orderId
      }

    ],

    [

      {
        text:
          "💳 Request Advance Payment",

        callback_data:
          "ADMIN_REQUEST_PAYMENT " +
          orderId
      }

    ]

  ]

};


// =====================================================
// 📤 ADMIN NOTIFICATIONS
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

      reply_markup:
        adminButtons

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
      "✅ Order created successfully."

  });

} catch (error) {

  // Ignore callback answer failure.

}


// =====================================================
// ✅ END SCRIPT 212
// =====================================================
