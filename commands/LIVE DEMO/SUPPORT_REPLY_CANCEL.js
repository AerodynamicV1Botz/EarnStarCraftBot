/*CMD
  command: SUPPORT_REPLY_CANCEL
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
// SCRIPT 105 — UPDATED VERSION
// COMMAND NAME: SUPPORT_REPLY_CANCEL
// STEP 5.2.3.1.1.3.1.15
// 📁 Support → Admin Reply Cancel
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

// ---------- ADMIN CHECK ----------
if (String(user.telegramid) != "7897324623") {
  return;
}

var uid = user.telegramid;

// ---------- CALLBACK ANSWER ----------
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

// ---------- GET LANGUAGE ----------
var userData = Bot.getProperty("USER_" + uid) || {};
var lang = userData.language || "hinglish";

// ---------- LANGUAGE TEXT ----------
var text = {
  hinglish: {
    title: "❌ <b>Reply Cancelled</b>",
    message: "Aapka reply process cancel kar diya gaya hai.",
    requests: "📂 Support Requests",
    menu: "🏠 Main Menu"
  },
  en: {
    title: "❌ <b>Reply Cancelled</b>",
    message: "Your reply process has been cancelled.",
    requests: "📂 Support Requests",
    menu: "🏠 Main Menu"
  },
  gu: {
    title: "❌ <b>જવાબ રદ કરવામાં આવ્યો</b>",
    message: "તમારી જવાબ આપવાની પ્રક્રિયા રદ કરવામાં આવી છે.",
    requests: "📂 સપોર્ટ રિક્વેસ્ટ્સ",
    menu: "🏠 મુખ્ય મેનુ"
  }
};

var t = text[lang] || text.hinglish;

// ---------- GET ACTIVE REPLY MODE ----------
var replyMode = Bot.getProperty(
  "ADMIN_REPLY_MODE_" + uid
) || {};

var refId = replyMode.refId || "";

// ---------- CLEAR REPLY MODE ----------
Bot.setProperty(
  "ADMIN_REPLY_MODE_" + uid,
  {
    active: false,
    refId: "",
    targetUserId: "",
    cancelledAt: new Date().toISOString()
  },
  "json"
);

// ---------- BUTTONS ----------
var buttons = [];

if (refId) {
  buttons.push([
    {
      text: "📄 Request Details",
      callback_data: "SUPPORT_ADMIN_REQUEST_DETAILS " + refId
    }
  ]);
}

buttons.push([
  {
    text: t.requests,
    callback_data: "SUPPORT_ADMIN_REQUESTS ALL"
  }
]);

buttons.push([
  {
    text: t.menu,
    callback_data: "MAIN_MENU"
  }
]);

// ---------- SAME MESSAGE EDIT + DELETE FALLBACK ----------
function showMenu(messageText, keyboard) {
  if (
    typeof request !== "undefined" &&
    request &&
    request.message &&
    request.message.message_id
  ) {
    try {
      Api.editMessageText({
        chat_id: uid,
        message_id: request.message.message_id,
        text: messageText,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: keyboard
        }
      });

      return;
    } catch (error) {
      try {
        Api.deleteMessage({
          chat_id: uid,
          message_id: request.message.message_id
        });
      } catch (deleteError) {}
    }
  }

  Api.sendMessage({
    chat_id: uid,
    text: messageText,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: keyboard
    }
  });
}

// ---------- SHOW CONFIRMATION ----------
showMenu(
  t.title + "\n\n" + t.message,
  buttons
);
