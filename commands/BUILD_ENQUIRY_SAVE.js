/*CMD
  command: BUILD_ENQUIRY_SAVE
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
  command: BUILD_ENQUIRY_SAVE
  need_reply: true
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 196 — BUILD_ENQUIRY_SAVE
// SAVE USER REQUIREMENTS
// =====================================================

var uid = String(user.telegramid);

// =====================================================
// READ REQUIREMENTS MESSAGE
// =====================================================

var requirementsText = "";

// Method 1: message.text
if (
  typeof message !== "undefined" &&
  message &&
  message.text
) {
  requirementsText =
    String(message.text).trim();
}

// Method 2: request.message.text
if (
  !requirementsText &&
  typeof request !== "undefined" &&
  request &&
  request.message &&
  request.message.text
) {
  requirementsText =
    String(request.message.text).trim();
}

// Method 3: params
if (
  !requirementsText &&
  typeof params !== "undefined" &&
  params
) {
  requirementsText =
    String(params).trim();
}

// =====================================================
// EMPTY VALIDATION
// =====================================================

if (!requirementsText) {

  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ Please apni bot requirements normal text message mein bhejo.\n\n" +
      "Example:\n" +
      "Mujhe ek business automation bot chahiye."
  });

  // Important:
  // Yahan BUILD_ENQUIRY dobara run nahi karna.
  // Isse prompt loop nahi banega.
  return;
}

// =====================================================
// LENGTH VALIDATION
// =====================================================

if (requirementsText.length > 10000) {

  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ Requirements bahut long hain.\n\n" +
      "Please 10,000 characters ke andar requirements bhejo."
  });

  return;
}

// =====================================================
// TEMPORARY SESSION
// =====================================================

var tempKey =
  "BUILD_ENQUIRY_TEMP_" + uid;

var tempData =
  Bot.getProperty(tempKey);

// =====================================================
// SESSION CHECK
// =====================================================

if (!tempData) {

  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ Requirements session expire ho gaya.\n\n" +
      "Please Build My Bot dobara open karo."
  });

  Bot.runCommand("MENU_BUILD");
  return;
}

// =====================================================
// CREATE ENQUIRY DATA
// =====================================================

var now =
  new Date().toISOString();

var enquiryData = {

  userId: uid,

  fullName:
    tempData.fullName || "",

  username:
    tempData.username || "",

  language:
    tempData.language || "hinglish",

  enquiryType: "custom_bot",
  packageType: "custom",
  packageName: "Custom Bot",
  source: "build_enquiry",

  status: "draft",
  stage: "contact_details",

  requirements: {
    description: requirementsText,
    fullMessage: requirementsText,
    submittedBy: uid,
    submittedAt: now
  },

  contacts: {},

  history: [
    {
      action: "requirements_submitted",
      by: uid,
      message: requirementsText,
      timestamp: now
    }
  ],

  createdAt: now,
  updatedAt: now
};

// =====================================================
// SAVE ENQUIRY
// =====================================================

Bot.setProperty(
  "BUILD_ENQUIRY_" + uid,
  enquiryData,
  "json"
);

// =====================================================
// CLEAR TEMP SESSION
// =====================================================

Bot.setProperty(
  tempKey,
  "",
  "string"
);

// =====================================================
// CLEAR OLD CONTACT STATES
// =====================================================

User.setProperty("WAITING_EMAIL", "", "string");
User.setProperty("WAITING_NUMBER", "", "string");
User.setProperty("WAITING_INSTAGRAM", "", "string");
User.setProperty("WAITING_WHATSAPP", "", "string");
User.setProperty("WAITING_TELEGRAM", "", "string");

User.setProperty("EMAIL_INPUT_MESSAGE_ID", "", "string");
User.setProperty("INVALID_EMAIL_MESSAGE_ID", "", "string");

// =====================================================
// SUCCESS MESSAGE
// =====================================================

Api.sendMessage({
  chat_id: uid,
  text:
    "✅ <b>Requirements saved successfully!</b>\n\n" +
    "Ab apna contact detail add karo, taaki hum aapse discuss kar sakein.",
  parse_mode: "HTML"
});

// =====================================================
// NEXT STEP
// =====================================================

Bot.runCommand("BUILD_CONTACT_MENU");
