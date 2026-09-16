/*CMD
  command: BUILD_DRAFT_CANCEL
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
  command: BUILD_DRAFT_CANCEL
  need_reply: false
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 198 — BUILD_DRAFT_CANCEL
// CANCEL BUILD FORM OR SAVED BUILD DRAFT
// =====================================================


// =====================================================
// CALLBACK RESPONSE
// =====================================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  try {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "Build enquiry cancelled"
    });
  } catch (error) {}
}


// =====================================================
// USER ID
// =====================================================

var uid = String(user.telegramid);


// =====================================================
// CLEAR TEMPORARY FORM
// =====================================================

Bot.setProperty(
  "BUILD_ENQUIRY_TEMP_" + uid,
  "",
  "string"
);


// =====================================================
// CLEAR SAVED BUILD DRAFT
// =====================================================

Bot.setProperty(
  "BUILD_ENQUIRY_" + uid,
  "",
  "string"
);


// =====================================================
// RESET ACTIVE CONTACT FLOW
// =====================================================

User.setProperty(
  "ACTIVE_CONTACT_FLOW",
  "",
  "string"
);


// =====================================================
// SEND CANCEL MESSAGE
// =====================================================

Api.editMessageText({
  chat_id: uid,
  message_id: request.message.message_id,
  text:
    "❌ <b>Build enquiry cancelled.</b>\n\n" +
    "Aapki enquiry aur draft cancel ho gaya hai.\n" +
    "Aap jab chahein nayi enquiry start kar sakte hain.",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🤖 Build My Bot",
          callback_data: "MENU_BUILD"
        }
      ],
      [
        {
          text: "🏠 Main Menu",
          callback_data: "BACK_MAIN_MENU"
        }
      ]
    ]
  }
});
