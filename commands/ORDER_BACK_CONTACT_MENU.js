/*CMD
  command: ORDER_BACK_CONTACT_MENU
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
  command: ORDER_BACK_CONTACT_MENU
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT — ORDER_BACK_CONTACT_MENU
// USER → BACK TO CONTACT MENU
// =====================================================


// =====================================================
// 👤 USER
// =====================================================

var uid = String(user.telegramid);
var orderKey = "ORDER_" + uid;


// =====================================================
// 🔐 SAFE TEXT
// =====================================================

function safeText(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


// =====================================================
// 📦 LOAD ACTIVE ORDER DRAFT
// =====================================================

var draft = Bot.getProperty(orderKey);

if (!draft || typeof draft !== "object") {
  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>Active order nahi mila.</b>\n\n" +
      "Please package dobara select karein.",
    parse_mode: "HTML"
  });

  Bot.runCommand("MAIN_MENU");
  return;
}


// =====================================================
// ✅ ALLOWED STATUS CHECK
// =====================================================

var allowedStatus =
  draft.requestStatus === "draft" ||
  draft.requestStatus === "review" ||
  draft.requestStatus === "submitted" ||
  draft.requestStatus === "contact_menu" ||
  draft.requestStatus === "requirements";

if (!allowedStatus) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>Contact details change nahi ki ja sakti.</b>\n\n" +
      "Ye order ab active editing stage mein nahi hai.",
    parse_mode: "HTML"
  });

  Bot.runCommand("ORDER_TRACK");
  return;
}


// =====================================================
// 🧹 RESET CONTACT DETAILS
// =====================================================

draft.contacts = draft.contacts || {};

draft.contacts.telegram = "";
draft.contacts.otherNumber = "";
draft.contacts.instagram = "";
draft.contacts.whatsapp = "";
draft.contacts.email = "";

draft.requirements = "";
draft.originalRequirements = "";
draft.finalRequirements = "";
draft.budget = "";
draft.extraDetails = "";

draft.stage = "contact_menu";
draft.requestStatus = "draft";
draft.updatedAt = new Date().toISOString();


// =====================================================
// 💾 SAVE DRAFT
// =====================================================

Bot.setProperty(orderKey, draft, "json");


// =====================================================
// 🧹 CLEAR OLD WAITING STATES
// =====================================================

Bot.setProperty(
  "ORDER_CONTACT_WAITING_" + uid,
  "",
  "string"
);

Bot.setProperty(
  "ORDER_REQUIREMENT_WAITING_" + uid,
  "",
  "string"
);

Bot.setProperty(
  "ORDER_BUDGET_WAITING_" + uid,
  "",
  "string"
);

Bot.setProperty(
  "ORDER_EXTRA_DETAILS_WAITING_" + uid,
  "",
  "string"
);


// =====================================================
// 📞 OPEN CONTACT MENU
// =====================================================

Api.sendMessage({
  chat_id: uid,
  text:
    "📞 <b>Contact Details</b>\n\n" +
    "Client se contact karne ke liye kam se kam " +
    "<b>2 contact options</b> add karein.\n\n" +
    "📱 Telegram, mobile number, Instagram ya WhatsApp " +
    "mein se options select karein.\n\n" +
    "📧 Email optional hai.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📱 Telegram",
          callback_data: "ORDER_CONTACT_TELEGRAM"
        },
        {
          text: "📞 Mobile Number",
          callback_data: "ORDER_CONTACT_NUMBER"
        }
      ],
      [
        {
          text: "📸 Instagram",
          callback_data: "ORDER_CONTACT_INSTAGRAM"
        },
        {
          text: "💬 WhatsApp",
          callback_data: "ORDER_CONTACT_WHATSAPP"
        }
      ],
      [
        {
          text: "📧 Email",
          callback_data: "ORDER_CONTACT_EMAIL"
        }
      ],
      [
        {
          text: "➡️ Continue",
          callback_data: "ORDER_CONTACT_CONTINUE"
        }
      ],
      [
        {
          text: "⬅️ Back",
          callback_data: "ORDER_BACK_CLIENT_NAME"
        },
        {
          text: "❌ Cancel",
          callback_data: "ORDER_CANCEL_DRAFT"
        }
      ]
    ]
  }
});
