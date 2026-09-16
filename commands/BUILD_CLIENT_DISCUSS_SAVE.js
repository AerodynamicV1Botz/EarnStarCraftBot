/*CMD
  command: BUILD_CLIENT_DISCUSS_SAVE
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
  command: BUILD_CLIENT_DISCUSS_SAVE
  need_reply: true
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 208 — BUILD_CLIENT_DISCUSS_SAVE
// CLIENT MESSAGE → SAVE + ADMIN NOTIFICATION
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
// 👑 OWNER
// =====================================================

var ownerId =
  "7897324623";


// =====================================================
// 👥 LOAD ADMIN LIST
// =====================================================

var adminList =
  Bot.getProperty(
    "EARNSTAR_ADMINS"
  );


var admins = [];


// Owner always included
admins.push(
  ownerId
);


// =====================================================
// ➕ ADD EXTRA ADMINS
// =====================================================

if (Array.isArray(adminList)) {

  for (
    var i = 0;
    i < adminList.length;
    i++
  ) {

    var item =
      adminList[i];

    var adminId =
      "";

    if (
      typeof item === "object" &&
      item !== null
    ) {

      adminId =
        String(
          item.id ||
          item.telegramId ||
          ""
        );

    } else {

      adminId =
        String(
          item ||
          ""
        );

    }


    if (
      adminId &&
      admins.indexOf(adminId) === -1
    ) {

      admins.push(
        adminId
      );

    }

  }

}


// =====================================================
// ⏳ GET PENDING ENQUIRY
// =====================================================

var pendingKey =
  "BUILD_CLIENT_DISCUSS_PENDING_" +
  clientId;


var enquiryId =
  Bot.getProperty(
    pendingKey
  );


enquiryId =
  String(
    enquiryId ||
    ""
  ).trim();


if (!enquiryId) {

  Bot.sendMessage(
    "⚠️ Discussion session expired.\n\n" +
    "Please open Quote Discussion again."
  );

  return;
}


// =====================================================
// 📨 GET ACTUAL CLIENT MESSAGE
// =====================================================
//
// Because this command has need_reply:true,
// `message` is the client's actual answer.
//

var clientMessage =
  String(
    message ||
    ""
  ).trim();


// =====================================================
// ❌ EMPTY MESSAGE
// =====================================================

if (!clientMessage) {

  Bot.sendMessage(
    "⚠️ Empty message receive hua.\n\n" +
    "Please apna message type karke send karo."
  );

  return;
}


// =====================================================
// 📏 MESSAGE LIMIT
// =====================================================

if (clientMessage.length > 3000) {

  Bot.sendMessage(
    "⚠️ Message bahut long hai.\n\n" +
    "Please maximum 3000 characters ka message send karo."
  );

  return;
}


// =====================================================
// 📦 LOAD ENQUIRY
// =====================================================

var enquiry =
  Bot.getProperty(
    "BUILD_ENQUIRY_" + enquiryId
  );


if (!enquiry) {

  Bot.sendMessage(
    "❌ Enquiry not found.\n\n" +
    "Please open your enquiry again."
  );

  Bot.setProperty(
    pendingKey,
    "",
    "string"
  );

  return;
}


// =====================================================
// 🔐 CLIENT OWNERSHIP CHECK
// =====================================================

var enquiryClientId =
  String(
    enquiry.userId ||
    ""
  );


if (!enquiryClientId) {

  var mappedClientId =
    Bot.getProperty(
      "BUILD_ENQUIRY_USER_" + enquiryId
    );

  if (mappedClientId) {

    enquiryClientId =
      String(mappedClientId);

  }

}


if (
  !enquiryClientId ||
  enquiryClientId !== clientId
) {

  Bot.sendMessage(
    "❌ Access denied.\n\n" +
    "This enquiry does not belong to you."
  );

  Bot.setProperty(
    pendingKey,
    "",
    "string"
  );

  return;
}


// =====================================================
// 🚫 STATUS CHECK
// =====================================================

var status =
  String(
    enquiry.status ||
    ""
  ).toLowerCase();


if (
  status === "rejected" ||
  status === "closed" ||
  status === "completed"
) {

  Bot.sendMessage(
    "🔒 This enquiry is no longer available for discussion."
  );

  Bot.setProperty(
    pendingKey,
    "",
    "string"
  );

  return;
}


if (
  status !== "accepted" &&
  status !== "quote_set" &&
  status !== "quote_agreed"
) {

  Bot.sendMessage(
    "⚠️ Discussion is not available for this enquiry right now."
  );

  Bot.setProperty(
    pendingKey,
    "",
    "string"
  );

  return;
}


// =====================================================
// 💬 ENSURE HISTORY
// =====================================================

if (!enquiry.history) {

  enquiry.history = [];

}


// =====================================================
// 📝 SAVE CLIENT MESSAGE
// =====================================================

enquiry.history.push({

  action:
    "client_message",

  clientId:
    clientId,

  timestamp:
    new Date().toISOString(),

  message:
    clientMessage

});


// =====================================================
// 🔄 UPDATE ENQUIRY
// =====================================================

enquiry.stage =
  "discussion";

enquiry.packageStep =
  "client_discussion";

enquiry.lastClientMessage =
  clientMessage;

enquiry.lastClientMessageAt =
  new Date().toISOString();

enquiry.updatedAt =
  new Date().toISOString();


// =====================================================
// 💾 SAVE ACTIVE ENQUIRY
// =====================================================

Bot.setProperty(
  "BUILD_ENQUIRY_" + clientId,
  enquiry,
  "json"
);


// =====================================================
// 💾 SAVE ID-BASED ENQUIRY
// =====================================================

Bot.setProperty(
  "BUILD_ENQUIRY_" + enquiryId,
  enquiry,
  "json"
);


// =====================================================
// 💾 SAVE USER MAPPING
// =====================================================

Bot.setProperty(
  "BUILD_ENQUIRY_USER_" + enquiryId,
  clientId,
  "string"
);


// =====================================================
// 👤 CLIENT INFO
// =====================================================

var clientName =
  String(
    enquiry.userName ||
    user.first_name ||
    "Client"
  );


var clientUsername =
  String(
    enquiry.username ||
    user.username ||
    ""
  );


var usernameText =
  clientUsername
    ? "@" + safeText(clientUsername)
    : "Not available";


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


// =====================================================
// 📨 ADMIN MESSAGE
// =====================================================

var adminText =

  "💬 <b>NEW CLIENT DISCUSSION MESSAGE</b>\n\n" +

  "🆔 <b>Enquiry ID:</b> " +
  safeText(enquiryId) +
  "\n\n" +

  "👤 <b>Client:</b> " +
  safeText(clientName) +
  "\n" +

  "🔗 <b>Username:</b> " +
  usernameText +
  "\n" +

  "🆔 <b>User ID:</b> " +
  safeText(clientId) +
  "\n\n" +

  "💰 <b>Total Quote:</b> ₹" +
  safeText(totalPrice) +
  "\n" +

  "💵 <b>Advance:</b> ₹" +
  safeText(advanceAmount) +
  "\n" +

  "💳 <b>Remaining:</b> ₹" +
  safeText(remainingAmount) +
  "\n\n" +

  "💬 <b>Client Message:</b>\n" +
  safeText(clientMessage);


// =====================================================
// 🔘 ADMIN INLINE KEYBOARD
// =====================================================

var adminKeyboard = {

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
          "💰 Set / Update Quote",

        callback_data:
          "BUILD_ADMIN_QUOTE " +
          enquiryId
      }
    ],

    [
      {
        text:
          "📋 View Enquiry",

        callback_data:
          "BUILD_ADMIN_VIEW " +
          enquiryId
      }
    ]

  ]

};


// =====================================================
// 📤 SEND TO ALL ADMINS
// =====================================================
//
// IMPORTANT:
// Bot.sendInlineKeyboard() cannot take adminId
// as a third argument.
//
// Therefore Api.sendMessage() is used here.
//

var deliveredAdmins =
  0;


for (
  var a = 0;
  a < admins.length;
  a++
) {

  var targetAdminId =
    String(
      admins[a] ||
      ""
    ).trim();


  if (!targetAdminId) {

    continue;

  }


  try {

    Api.sendMessage({

      chat_id:
        targetAdminId,

      text:
        adminText,

      parse_mode:
        "HTML",

      reply_markup:
        adminKeyboard

    });

    deliveredAdmins++;

  } catch (error) {

    // Individual admin delivery failure
    // should not crash the whole command.

  }

}


// =====================================================
// ⏳ CLEAR PENDING
// =====================================================

Bot.setProperty(
  pendingKey,
  "",
  "string"
);


// =====================================================
// 🌐 CLIENT LANGUAGE
// =====================================================

var userData =
  Bot.getProperty(
    "USER_" + clientId
  );


var language =
  String(
    (userData && userData.language) ||
    enquiry.language ||
    "hinglish"
  ).toLowerCase();


// =====================================================
// ✅ CLIENT CONFIRMATION
// =====================================================

var confirmation = "";


if (language === "english") {

  confirmation =
    "✅ <b>Message Sent</b>\n\n" +

    "Your message has been sent to the EarnStar Team.\n\n" +

    "They will review it and reply to you.";

} else if (language === "gujarati") {

  confirmation =
    "✅ <b>Message Sent</b>\n\n" +

    "Tamaro message EarnStar Team ne mokli devama aavyo chhe.\n\n" +

    "Team tamaro message check kari ne reply karse.";

} else {

  confirmation =
    "✅ <b>Message Sent</b>\n\n" +

    "Aapka message EarnStar Team ko bhej diya gaya hai.\n\n" +

    "Team aapka message check karke aapko reply karegi.";

}


// =====================================================
// 🔘 CLIENT BUTTON
// =====================================================

var clientButtons = [

  {
    title:
      "💬 Send Another Message",

    command:
      "BUILD_CLIENT_DISCUSS " +
      enquiryId
  }

];


// =====================================================
// 📤 SEND CONFIRMATION
// =====================================================

try {

  Bot.sendInlineKeyboard(
    clientButtons,
    confirmation
  );

} catch (error) {

  Bot.sendMessage(
    confirmation
  );

}
