/*CMD
  command: ORDER_NEXT_STEP
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

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 31 — ORDER_NEXT_STEP
// Contact Confirmed → Order Summary
// ==========================================

/*CMD
  command: ORDER_NEXT_STEP
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
// 💾 UPDATE ORDER STAGE
// ==========================================

draft.stage = "order_summary";
draft.updatedAt = new Date().getTime();

Bot.setProperty(
  draftKey,
  draft,
  "json"
);

// ==========================================
// 🌐 LANGUAGE TEXT
// ==========================================

var text = "";

if (
  language == "en" ||
  language == "english"
) {

  text =
    "📋 <b>Order Summary</b>\n\n" +
    "Your contact details are confirmed.\n\n" +
    "Now review your complete order information.";

}

else if (
  language == "gu" ||
  language == "gujarati"
) {

  text =
    "📋 <b>ઓર્ડર સારાંશ</b>\n\n" +
    "તમારી સંપર્ક વિગતો કન્ફર્મ થઈ ગઈ છે.\n\n" +
    "હવે તમારી સંપૂર્ણ ઓર્ડર માહિતી ચેક કરો.";

}

else {

  text =
    "📋 <b>Order Summary</b>\n\n" +
    "Tamari contact details confirm thai gayi che.\n\n" +
    "Have tamari complete order information check karo.";

}

// ==========================================
// 🔘 BUTTONS
// ==========================================

var buttons = [

  [
    {
      text: "📋 View Full Order",
      callback_data: "ORDER_FULL_SUMMARY"
    }
  ],

  [
    {
      text: "✏️ Edit Order",
      callback_data: "ORDER_EDIT"
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
// 📤 SEND MESSAGE
// ==========================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
});
