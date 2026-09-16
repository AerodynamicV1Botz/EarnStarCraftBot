/*CMD
  command: BUILD_ENQUIRY_SUBMIT
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
  command: BUILD_ENQUIRY_SUBMIT
  need_reply: false
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// BUILD_ENQUIRY_SUBMIT
//
// BUILD ENQUIRY FINAL SUBMISSION
//
// FLOW:
// BUILD_ENQUIRY
//      ↓
// BUILD_ENQUIRY_SAVE
//      ↓
// BUILD_CONTACT_MENU
//      ↓
// BUILD_CONTACT_CONTINUE
//      ↓
// BUILD_ENQUIRY_SUBMIT
//      ↓
// ADMIN
// =====================================================


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
      callback_query_id: request.id,
      text: "Enquiry submitting..."
    });

  } catch (error) {}

}


// =====================================================
// 👤 USER ID
// =====================================================

var uid = String(user.telegramid);


// =====================================================
// 🔐 ACTIVE CONTACT FLOW
// =====================================================

User.setProperty(
  "ACTIVE_CONTACT_FLOW",
  "BUILD",
  "string"
);


// =====================================================
// 🔐 HTML SAFE TEXT
// =====================================================

function safeText(value) {

  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

}


// =====================================================
// 🌐 USER DATA
// =====================================================

var userData = Bot.getProperty("USER_" + uid);

if (
  !userData ||
  typeof userData !== "object"
) {
  userData = {};
}

var language = String(
  userData.language || "hinglish"
).toLowerCase();

if (
  language !== "hinglish" &&
  language !== "english" &&
  language !== "gujarati"
) {
  language = "hinglish";
}


// =====================================================
// 👤 USER NAME
// =====================================================

var fullName =
  String(user.first_name || "") +
  (
    user.last_name
      ? " " + String(user.last_name)
      : ""
  );

fullName = fullName.trim();

if (!fullName) {
  fullName = "Not available";
}


// =====================================================
// 🔗 USERNAME
// =====================================================

var username = user.username
  ? "@" + String(user.username)
  : "Not available";


// =====================================================
// 👑 OWNER + MULTI-ADMIN SETTINGS
// =====================================================

var ownerId = "7897324623";

var adminList = Bot.getProperty(
  "EARNSTAR_ADMINS"
) || [];

if (!Array.isArray(adminList)) {
  adminList = [];
}


// =====================================================
// 👑 BUILD RECIPIENT ADMIN LIST
// =====================================================

var recipientAdmins = [];

recipientAdmins.push(ownerId);

for (
  var i = 0;
  i < adminList.length;
  i++
) {

  var adminId = "";

  if (
    typeof adminList[i] === "object" &&
    adminList[i] !== null
  ) {

    adminId = String(
      adminList[i].id ||
      adminList[i].telegramId ||
      ""
    );

  } else {

    adminId = String(
      adminList[i] || ""
    );

  }

  adminId = adminId.trim();

  if (
    adminId &&
    recipientAdmins.indexOf(adminId) === -1
  ) {

    recipientAdmins.push(adminId);

  }

}


// =====================================================
// 📦 LOAD BUILD ENQUIRY
// =====================================================

var enquiryKey = "BUILD_ENQUIRY_" + uid;

var enquiry = Bot.getProperty(enquiryKey);


// =====================================================
// ⛔ ENQUIRY NOT FOUND
// =====================================================

if (
  !enquiry ||
  typeof enquiry !== "object"
) {

  var noEnquiryText = "";

  if (language === "english") {

    noEnquiryText =
      "❌ <b>Build enquiry was not found.</b>\n\n" +
      "Please start the Build Enquiry again.";

  } else if (language === "gujarati") {

    noEnquiryText =
      "❌ <b>Build enquiry મળી નથી.</b>\n\n" +
      "કૃપા કરીને Build Enquiry ફરીથી શરૂ કરો.";

  } else {

    noEnquiryText =
      "❌ <b>Aapki Build enquiry nahi mili.</b>\n\n" +
      "Please Build Enquiry dobara start karein.";

  }

  Api.sendMessage({
    chat_id: uid,
    text: noEnquiryText,
    parse_mode: "HTML"
  });

  Bot.runCommand("MENU_BUILD");

  return;
}


// =====================================================
// 🛑 PREVENT DOUBLE SUBMIT
// =====================================================

var currentStatus = String(
  enquiry.status || ""
).toLowerCase();

if (
  currentStatus === "submitted" ||
  currentStatus === "accepted" ||
  currentStatus === "rejected" ||
  currentStatus === "completed"
) {

  var alreadyText = "";

  if (language === "english") {

    alreadyText =
      "⚠️ <b>This enquiry has already been submitted.</b>\n\n" +
      "Please use your existing Enquiry ID to track it.";

  } else if (language === "gujarati") {

    alreadyText =
      "⚠️ <b>આ enquiry પહેલેથી submit થઈ ગઈ છે.</b>\n\n" +
      "તમારા existing Enquiry ID થી તેને track કરો.";

  } else {

    alreadyText =
      "⚠️ <b>Yeh enquiry pehle hi submit ho chuki hai.</b>\n\n" +
      "Apne existing Enquiry ID se enquiry track karein.";

  }

  Api.sendMessage({
    chat_id: uid,
    text: alreadyText,
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 📞 ENSURE CONTACT OBJECT
// =====================================================

if (
  !enquiry.contacts ||
  typeof enquiry.contacts !== "object"
) {
  enquiry.contacts = {};
}


// =====================================================
// 💾 LOAD PERMANENT CONTACT PROFILE
// =====================================================

var permanentContactKey = "USER_CONTACTS_" + uid;

var savedContacts = Bot.getProperty(
  permanentContactKey
);

if (
  !savedContacts ||
  typeof savedContacts !== "object"
) {
  savedContacts = {};
}


// =====================================================
// 📞 NORMALIZE SAVED CONTACTS
// =====================================================

savedContacts.telegram = String(
  savedContacts.telegram || ""
);

savedContacts.otherNumber = String(
  savedContacts.otherNumber || ""
);

savedContacts.instagram = String(
  savedContacts.instagram || ""
);

savedContacts.whatsapp = String(
  savedContacts.whatsapp || ""
);

savedContacts.email = String(
  savedContacts.email || ""
);


// =====================================================
// 🔄 PERMANENT CONTACT FALLBACK
// Existing enquiry values stay unchanged
// =====================================================

if (
  !String(enquiry.contacts.telegram || "").trim() &&
  savedContacts.telegram.trim()
) {

  enquiry.contacts.telegram =
    savedContacts.telegram;

}

if (
  !String(enquiry.contacts.otherNumber || "").trim() &&
  savedContacts.otherNumber.trim()
) {

  enquiry.contacts.otherNumber =
    savedContacts.otherNumber;

}

if (
  !String(enquiry.contacts.instagram || "").trim() &&
  savedContacts.instagram.trim()
) {

  enquiry.contacts.instagram =
    savedContacts.instagram;

}

if (
  !String(enquiry.contacts.whatsapp || "").trim() &&
  savedContacts.whatsapp.trim()
) {

  enquiry.contacts.whatsapp =
    savedContacts.whatsapp;

}

if (
  !String(enquiry.contacts.email || "").trim() &&
  savedContacts.email.trim()
) {

  enquiry.contacts.email =
    savedContacts.email;

}


// =====================================================
// 🧹 NORMALIZE ENQUIRY CONTACTS
// =====================================================

enquiry.contacts.telegram = String(
  enquiry.contacts.telegram || ""
);

enquiry.contacts.otherNumber = String(
  enquiry.contacts.otherNumber || ""
);

enquiry.contacts.instagram = String(
  enquiry.contacts.instagram || ""
);

enquiry.contacts.whatsapp = String(
  enquiry.contacts.whatsapp || ""
);

enquiry.contacts.email = String(
  enquiry.contacts.email || ""
);


// =====================================================
// 🔢 COUNT MAIN CONTACTS
// Email optional
// =====================================================

var contactCount = 0;

if (enquiry.contacts.telegram.trim()) {
  contactCount++;
}

if (enquiry.contacts.otherNumber.trim()) {
  contactCount++;
}

if (enquiry.contacts.instagram.trim()) {
  contactCount++;
}

if (enquiry.contacts.whatsapp.trim()) {
  contactCount++;
}


// =====================================================
// ❌ MINIMUM 2 CONTACT VALIDATION
// =====================================================

if (contactCount < 2) {

  var requiredText = "";

  if (language === "english") {

    requiredText =
      "❌ <b>Minimum 2 main contact details are required.</b>\n\n" +
      "Please add at least 2 contacts before submitting.";

  } else if (language === "gujarati") {

    requiredText =
      "❌ <b>ઓછામાં ઓછી 2 main contact details જરૂરી છે.</b>\n\n" +
      "Submit કરતા પહેલા ઓછામાં ઓછા 2 contacts add કરો.";

  } else {

    requiredText =
      "❌ <b>Minimum 2 main contact details required hain.</b>\n\n" +
      "Submit karne se pehle kam se kam 2 contacts add karein.";

  }

  Api.sendMessage({
    chat_id: uid,
    text: requiredText,
    parse_mode: "HTML"
  });

  Bot.runCommand("BUILD_CONTACT_MENU");

  return;
}


// =====================================================
// 💾 UPDATE PERMANENT CONTACT PROFILE
// =====================================================

savedContacts.telegram =
  enquiry.contacts.telegram;

savedContacts.otherNumber =
  enquiry.contacts.otherNumber;

savedContacts.instagram =
  enquiry.contacts.instagram;

savedContacts.whatsapp =
  enquiry.contacts.whatsapp;

savedContacts.email =
  enquiry.contacts.email;

Bot.setProperty(
  permanentContactKey,
  savedContacts,
  "json"
);


// =====================================================
// 🆔 GENERATE BUILD ENQUIRY ID
// =====================================================

var now = new Date();

var timePart = String(
  now.getTime()
).slice(-10);

var randomPart = Math.floor(
  100 + Math.random() * 900
);

var enquiryId =
  "BE-" +
  timePart +
  "-" +
  uid.slice(-4) +
  "-" +
  randomPart;

var submittedAt = now.toISOString();


// =====================================================
// 📝 REQUIREMENTS
// =====================================================

var requirements = "";

if (
  enquiry.requirements &&
  typeof enquiry.requirements === "object"
) {

  requirements =
    enquiry.requirements.description ||
    enquiry.requirements.fullMessage ||
    enquiry.requirements.text ||
    "";

} else {

  requirements =
    enquiry.requirements || "";

}

requirements = String(
  requirements || "Not submitted"
);


// =====================================================
// 🧑 CLIENT NAME
// =====================================================

var profileName = String(
  enquiry.userName ||
  fullName ||
  "Telegram User"
);


// =====================================================
// 📞 CONTACT DETAILS
// =====================================================

var telegramContact = safeText(
  enquiry.contacts.telegram ||
  "Not submitted"
);

var otherNumber = safeText(
  enquiry.contacts.otherNumber ||
  "Not submitted"
);

var instagram = safeText(
  enquiry.contacts.instagram ||
  "Not submitted"
);

var whatsapp = safeText(
  enquiry.contacts.whatsapp ||
  "Not submitted"
);

var email = safeText(
  enquiry.contacts.email ||
  "Optional / Not submitted"
);


// =====================================================
// 💾 UPDATE FINAL ENQUIRY DATA
// =====================================================

enquiry.enquiryId = enquiryId;

enquiry.id = enquiryId;

enquiry.userId = uid;

enquiry.userName = fullName;

enquiry.username = username;

enquiry.status = "submitted";

enquiry.stage = "admin_review";

enquiry.packageStep = "submitted";

enquiry.progress = 0;

enquiry.progressTitle = "Enquiry Submitted";

enquiry.progressUpdate =
  "Your Build Enquiry has been submitted and is waiting for admin review.";

enquiry.submittedAt = submittedAt;

enquiry.updatedAt = submittedAt;


// =====================================================
// 👤 USER ACTIVITY
// =====================================================

userData.lastCommand =
  "BUILD_ENQUIRY_SUBMIT";

userData.lastVisitedAt =
  submittedAt;

userData.updatedAt =
  submittedAt;

Bot.setProperty(
  "USER_" + uid,
  userData,
  "json"
);


// =====================================================
// 💾 SAVE ACTIVE BUILD ENQUIRY
// =====================================================

Bot.setProperty(
  enquiryKey,
  enquiry,
  "json"
);


// =====================================================
// 💾 SAVE BY ENQUIRY ID
// =====================================================

Bot.setProperty(
  "BUILD_ENQUIRY_" + enquiryId,
  enquiry,
  "json"
);


// =====================================================
// 🔗 ENQUIRY → USER MAPPING
// =====================================================

Bot.setProperty(
  "BUILD_ENQUIRY_USER_" + enquiryId,
  uid,
  "string"
);


// =====================================================
// 📚 SAVE ENQUIRY ID LIST
// =====================================================

var enquiryKeys = Bot.getProperty(
  "BUILD_ENQUIRY_KEYS"
) || [];

if (!Array.isArray(enquiryKeys)) {
  enquiryKeys = [];
}

if (
  enquiryKeys.indexOf(enquiryId) === -1
) {
  enquiryKeys.push(enquiryId);
}

Bot.setProperty(
  "BUILD_ENQUIRY_KEYS",
  enquiryKeys,
  "json"
);


// =====================================================
// 📩 ADMIN BUILD ENQUIRY MESSAGE
// =====================================================

var adminText =

  "🚨 <b>NEW BUILD ENQUIRY RECEIVED</b>\n\n" +

  "🆔 <b>Enquiry ID:</b> " +
  safeText(enquiryId) +
  "\n\n" +

  "👤 <b>Client Name:</b> " +

  "<a href=\"tg://user?id=" +
  safeText(uid) +
  "\">" +

  safeText(profileName) +

  "</a>" +

  "\n" +

  "🔗 <b>Username:</b> " +
  safeText(username) +
  "\n" +

  "🆔 <b>Telegram ID:</b> " +
  safeText(uid) +
  "\n\n" +

  "🤖 <b>Enquiry Type:</b> " +
  safeText(
    enquiry.enquiryType ||
    "custom_bot"
  ) +
  "\n\n" +

  "📝 <b>Requirements:</b>\n" +
  safeText(requirements) +
  "\n\n" +

  "📞 <b>Contact Details</b>\n\n" +

  "📱 <b>Telegram:</b> " +
  telegramContact +
  "\n" +

  "☎️ <b>Other Number:</b> " +
  otherNumber +
  "\n" +

  "📸 <b>Instagram:</b> " +
  instagram +
  "\n" +

  "🟢 <b>WhatsApp:</b> " +
  whatsapp +
  "\n" +

  "✉️ <b>Email:</b> " +
  email +
  "\n\n" +

  "📊 <b>Status:</b> Pending Review\n" +

  "📈 <b>Progress:</b> 0%\n\n" +

  "⏳ Please review this Build Enquiry.";


// =====================================================
// 🔘 BUILD ADMIN ACTION BUTTONS
// =====================================================

var adminButtons = [

  [

    {
      text: "✅ Accept Enquiry",
      callback_data:
        "BUILD_ADMIN_ACCEPT " +
        enquiryId
    },

    {
      text: "❌ Reject Enquiry",
      callback_data:
        "BUILD_ADMIN_REJECT " +
        enquiryId
    }

  ],

  [

    {
      text: "💬 Contact User",
      callback_data:
        "BUILD_ADMIN_CONTACT " +
        enquiryId
    }

  ],

  [

    {
      text: "🔎 View Enquiry",
      callback_data:
        "BUILD_ADMIN_VIEW " +
        enquiryId
    }

  ]

];


// =====================================================
// 📩 SEND TO OWNER + ALL ADMINS
// =====================================================

var sentCount = 0;

for (
  var a = 0;
  a < recipientAdmins.length;
  a++
) {

  var targetAdmin = String(
    recipientAdmins[a] || ""
  ).trim();

  if (!targetAdmin) {
    continue;
  }

  try {

    Api.sendMessage({

      chat_id: targetAdmin,

      text: adminText,

      parse_mode: "HTML",

      reply_markup: {
        inline_keyboard: adminButtons
      }

    });

    sentCount++;

  } catch (error) {

    // Unavailable admin skipped

  }

}


// =====================================================
// 👤 USER CONFIRMATION
// =====================================================

var userText = "";

if (sentCount > 0) {

  if (language === "english") {

    userText =
      "✅ <b>Build Enquiry Submitted Successfully</b>\n\n" +
      "🆔 <b>Enquiry ID:</b> " +
      safeText(enquiryId) +
      "\n\n" +
      "📩 Your complete enquiry has been sent to our admin team.\n" +
      "⏳ They will review your requirements and contact you soon.";

  } else if (language === "gujarati") {

    userText =
      "✅ <b>Build Enquiry Successfully Submit થઈ</b>\n\n" +
      "🆔 <b>Enquiry ID:</b> " +
      safeText(enquiryId) +
      "\n\n" +
      "📩 તમારી complete enquiry admin team ને મોકલી દેવામાં આવી છે.\n" +
      "⏳ Admin team તમારી requirements review કરીને તમને જલ્દી contact કરશે.";

  } else {

    userText =
      "✅ <b>Build Enquiry Successfully Submit Ho Gayi</b>\n\n" +
      "🆔 <b>Enquiry ID:</b> " +
      safeText(enquiryId) +
      "\n\n" +
      "📩 Aapki complete enquiry admin team ko bhej di gayi hai.\n" +
      "⏳ Admin team aapki requirements review karke aapko jaldi contact karegi.";

  }

} else {

  if (language === "english") {

    userText =
      "⚠️ <b>Enquiry Saved</b>\n\n" +
      "🆔 <b>Enquiry ID:</b> " +
      safeText(enquiryId) +
      "\n\n" +
      "Your enquiry was saved, but the admin team could not be notified.\n" +
      "Please contact support and share this Enquiry ID.";

  } else if (language === "gujarati") {

    userText =
      "⚠️ <b>Enquiry Save થઈ</b>\n\n" +
      "🆔 <b>Enquiry ID:</b> " +
      safeText(enquiryId) +
      "\n\n" +
      "તમારી enquiry save થઈ છે, પરંતુ admin team ને notify કરી શકાયું નથી.\n" +
      "Support નો સંપર્ક કરો અને આ Enquiry ID share કરો.";

  } else {

    userText =
      "⚠️ <b>Enquiry Save Ho Gayi</b>\n\n" +
      "🆔 <b>Enquiry ID:</b> " +
      safeText(enquiryId) +
      "\n\n" +
      "Aapki enquiry save ho gayi hai, lekin admin team ko notify nahi kiya ja saka.\n" +
      "Support se contact karke yeh Enquiry ID share karein.";

  }

}


// =====================================================
// 📩 SEND USER CONFIRMATION
// =====================================================

Api.sendMessage({

  chat_id: uid,

  text: userText,

  parse_mode: "HTML"

});
