/*CMD
  command: ORDER_CONTACT_CONFIRM
  help: 
  need_reply: false
  auto_retry_time: 
  folder: LIVE DEMO

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 29 — ORDER_CONTACT_CONFIRM
// Confirm Contact Details
// ==========================================

/*CMD
  command: ORDER_CONTACT_CONFIRM
  need_reply: false
  folder: ORDERS
*/

// ==========================================
// ⚡ CALLBACK RESPONSE
// ==========================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {

  try {

    Api.answerCallbackQuery({
      callback_query_id: request.id
    });

  } catch (error) {}

}

// ==========================================
// 👤 USER ID & LANGUAGE
// ==========================================

var uid = String(user.telegramid);

var userData = Bot.getProperty("USER_" + uid);

if (!userData || typeof userData !== "object") {
  userData = {};
}

var language = userData.language || "hinglish";

// ==========================================
// 📦 LOAD ORDER DRAFT
// ==========================================

var draftKey = "ORDER_DRAFT_" + uid;
var draft = Bot.getProperty(draftKey);

if (!draft || typeof draft !== "object") {

  Bot.sendMessage(
    "❌ Aapka order draft nahi mila."
  );

  return;
}

// ==========================================
// 📞 LOAD CONTACTS
// ==========================================

var contacts = {};

if (
  draft.contact &&
  typeof draft.contact === "object"
) {

  contacts = draft.contact;

}

else if (
  draft.contacts &&
  typeof draft.contacts === "object"
) {

  contacts = draft.contacts;

}

// ==========================================
// 🔢 COUNT MAIN CONTACTS
// ==========================================

var contactCount = 0;

if (contacts.telegram) contactCount++;
if (contacts.otherNumber) contactCount++;
if (contacts.instagram) contactCount++;
if (contacts.whatsapp) contactCount++;

// ==========================================
// ❌ MINIMUM CHECK
// ==========================================

if (contactCount < 2) {

  var errorText = "";

  if (
    language == "en" ||
    language == "english"
  ) {

    errorText =
      "❌ <b>Minimum 2 Main Contacts Required</b>\n\n" +
      "Please add at least 2 contact methods.";

  }

  else if (
    language == "gu" ||
    language == "gujarati"
  ) {

    errorText =
      "❌ <b>ઓછામાં ઓછી 2 સંપર્ક વિગતો જરૂરી છે</b>\n\n" +
      "ઓછામાં ઓછી 2 contact details add કરો.";

  }

  else {

    errorText =
      "❌ <b>Minimum 2 Main Contacts Required</b>\n\n" +
      "Kam se kam 2 contact details add karo.";

  }

  Bot.sendMessage(errorText);

  return;

}

// ==========================================
// 💾 UPDATE ORDER STAGE
// ==========================================

draft.stage = "contact_confirm";
draft.updatedAt = new Date().getTime();

Bot.setProperty(
  draftKey,
  draft,
  "json"
);

// ==========================================
// 📋 CONTACT SUMMARY
// ==========================================

var summary = "";

if (contacts.telegram) {
  summary += "📱 Telegram: " + contacts.telegram + "\n";
}

if (contacts.otherNumber) {
  summary += "☎️ Number: " + contacts.otherNumber + "\n";
}

if (contacts.instagram) {
  summary += "📸 Instagram: " + contacts.instagram + "\n";
}

if (contacts.whatsapp) {
  summary += "🟢 WhatsApp: " + contacts.whatsapp + "\n";
}

if (contacts.email) {
  summary += "📧 Email: " + contacts.email + "\n";
}

// ==========================================
// 🌐 LANGUAGE TEXT
// ==========================================

var text = "";

if (
  language == "en" ||
  language == "english"
) {

  text =
    "📋 <b>Confirm Contact Details</b>\n\n" +
    summary +
    "\nPlease confirm that these details are correct.";

}

else if (
  language == "gu" ||
  language == "gujarati"
) {

  text =
    "📋 <b>સંપર્ક વિગતો કન્ફર્મ કરો</b>\n\n" +
    summary +
    "\nઆ વિગતો સાચી છે કે નહીં તે કન્ફર્મ કરો.";

}

else {

  text =
    "📋 <b>Confirm Contact Details</b>\n\n" +
    summary +
    "\nAa details sachi che to confirm karo.";

}

// ==========================================
// 🔘 BUTTONS
// ==========================================

var buttons = [

  [
    {
      text: "✅ Confirm",
      callback_data: "ORDER_CONTACT_CONFIRMED"
    }
  ],

  [
    {
      text: "✏️ Edit Contacts",
      callback_data: "ORDER_CONTACT_MENU"
    }
  ],

  [
    {
      text: "⬅️ Back",
      callback_data: "ORDER_CONTACT_MENU"
    }
  ],

  [
    {
      text: "❌ Cancel Order",
      callback_data: "ORDER_CANCEL_DRAFT"
    }
  ]

];

// ==========================================
// 📤 SEND / EDIT MESSAGE
// ==========================================

if (
  typeof request !== "undefined" &&
  request &&
  request.message &&
  request.message.message_id
) {

  Api.editMessageText({
    chat_id: uid,
    message_id: request.message.message_id,
    text: text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons
    }
  });

}

else {

  Api.sendMessage({
    chat_id: uid,
    text: text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons
    }
  });

}
