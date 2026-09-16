/*CMD
  command: BUILD_ENQUIRY
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
  command: BUILD_ENQUIRY
  need_reply: false
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 195 — BUILD_ENQUIRY
// BUILD MY BOT → REQUIREMENTS INPUT
// =====================================================

var uid = String(user.telegramid);

// =====================================================
// CALLBACK ANSWER
// =====================================================

if (request && request.id) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "Requirements form opened"
  });
}

// =====================================================
// CLEAR OLD WAITING STATES
// =====================================================

User.setProperty("WAITING_EMAIL", "", "string");
User.setProperty("WAITING_NUMBER", "", "string");
User.setProperty("WAITING_INSTAGRAM", "", "string");
User.setProperty("WAITING_WHATSAPP", "", "string");
User.setProperty("WAITING_TELEGRAM", "", "string");

User.setProperty("EMAIL_INPUT_MESSAGE_ID", "", "string");
User.setProperty("INVALID_EMAIL_MESSAGE_ID", "", "string");

// =====================================================
// USER DATA
// =====================================================

var fullName =
  String(user.first_name || "") +
  (user.last_name
    ? " " + String(user.last_name)
    : "");

var username =
  user.username
    ? "@" + String(user.username)
    : "";

// =====================================================
// LANGUAGE
// =====================================================

var userData =
  Bot.getProperty("USER_" + uid) || {};

var lang =
  userData.language || "hinglish";

// =====================================================
// ACTIVITY UPDATE
// =====================================================

userData.lastActivity =
  new Date().toISOString();

Bot.setProperty(
  "USER_" + uid,
  userData,
  "json"
);

// =====================================================
// TEMPORARY SESSION
// =====================================================

var tempBuildData = {
  userId: uid,
  fullName: fullName,
  username: username,
  language: lang,

  enquiryType: "custom_bot",
  packageType: "custom",
  packageName: "Custom Bot",
  source: "build_enquiry",

  stage: "waiting_for_requirements",
  status: "temporary",

  createdAt: new Date().toISOString()
};

Bot.setProperty(
  "BUILD_ENQUIRY_TEMP_" + uid,
  tempBuildData,
  "json"
);

// =====================================================
// PROMPT TEXT
// =====================================================

var text = "";

if (lang === "english") {

  text =
    "🤖 <b>Build My Bot</b>\n\n" +
    "Please describe your bot requirements in detail.\n\n" +
    "You can include:\n" +
    "• Bot purpose\n" +
    "• Required features\n" +
    "• Admin panel needs\n" +
    "• Payment or order system\n" +
    "• Automation requirements\n" +
    "• Any special instructions\n\n" +
    "✍️ Send your requirements in one message.";

} else if (lang === "gujarati") {

  text =
    "🤖 <b>તમારો બોટ બનાવો</b>\n\n" +
    "તમારા બોટની જરૂરિયાતો વિગતવાર લખો.\n\n" +
    "તમે આ માહિતી આપી શકો છો:\n" +
    "• બોટનો હેતુ\n" +
    "• જરૂરી ફીચર્સ\n" +
    "• એડમિન પેનલ\n" +
    "• પેમેન્ટ અથવા ઓર્ડર સિસ્ટમ\n" +
    "• ઓટોમેશન જરૂરિયાતો\n" +
    "• અન્ય ખાસ સૂચનાઓ\n\n" +
    "✍️ તમારી જરૂરિયાતો એક મેસેજમાં મોકલો.";

} else {

  text =
    "🤖 <b>Build My Bot</b>\n\n" +
    "Apne bot ki requirements detail mein likho.\n\n" +
    "Aap ye details include kar sakte ho:\n" +
    "• Bot ka purpose\n" +
    "• Required features\n" +
    "• Admin panel ki need\n" +
    "• Payment ya order system\n" +
    "• Automation requirements\n" +
    "• Koi special instruction\n\n" +
    "✍️ Apni requirements ek message mein bhejo.";
}

// =====================================================
// BUTTONS
// =====================================================

var buttons = [
  [
    {
      text: "❌ Cancel Draft",
      callback_data: "BUILD_DRAFT_CANCEL"
    }
  ]
];

// =====================================================
// SEND PROMPT
// =====================================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
});

// =====================================================
// IMPORTANT
// USER'S NEXT MESSAGE WILL GO TO SCRIPT 196
// =====================================================

Bot.runCommand("BUILD_ENQUIRY_SAVE");
