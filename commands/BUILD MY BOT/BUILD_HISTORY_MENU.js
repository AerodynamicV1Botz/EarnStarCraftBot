/*CMD
  command: BUILD_HISTORY_MENU
  help: 
  need_reply: false
  auto_retry_time: 
  folder: BUILD MY BOT

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 216 — UPDATED VERSION
// COMMAND NAME: BUILD_HISTORY_MENU
// STEP 5.2.3.1.1.3.1.15
// 📁 BUILD_HISTORY_MENU
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

if (typeof request !== "undefined" && request && request.id) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

var text = {
  hinglish:
    "🗂️ <b>BUILD HISTORY MENU</b>\n\n" +
    "Apni enquiries aur build requests manage karo.\n\n" +
    "Neeche se option select karo:",

  en:
    "🗂️ <b>BUILD HISTORY MENU</b>\n\n" +
    "Manage your enquiries and build requests.\n\n" +
    "Select an option below:",

  gu:
    "🗂️ <b>બિલ્ડ હિસ્ટ્રી મેનુ</b>\n\n" +
    "તમારી enquiries અને build requests મેનેજ કરો.\n\n" +
    "નીચેનો વિકલ્પ પસંદ કરો:"
}

var buttons = []

if (lang === "en") {
  buttons = [
    [
      { text: "📋 View History", callback_data: "BUILD_HISTORY" },
      { text: "🧾 Current Enquiry", callback_data: "MY_ENQUIRY" }
    ],
    [
      {
        text: "📄 Export Summary",
        callback_data: "BUILD_HISTORY_EXPORT"
      }
    ],
    [
      {
        text: "🗑️ Delete Selected",
        callback_data: "BUILD_HISTORY_DELETE_SELECTED"
      }
    ],
    [
      {
        text: "🧹 Delete All History",
        callback_data: "BUILD_HISTORY_DELETE_ALL"
      }
    ],
    [
      { text: "🛠️ New Build", callback_data: "MENU_BUILD" }
    ],
    [
      { text: "🏠 Main Menu", callback_data: "BACK_MAIN_MENU" }
    ]
  ]
} else if (lang === "gu") {
  buttons = [
    [
      { text: "📋 હિસ્ટ્રી જુઓ", callback_data: "BUILD_HISTORY" },
      { text: "🧾 હાલની enquiry", callback_data: "MY_ENQUIRY" }
    ],
    [
      {
        text: "📄 સારાંશ જુઓ",
        callback_data: "BUILD_HISTORY_EXPORT"
      }
    ],
    [
      {
        text: "🗑️ પસંદ કરેલી ડિલીટ",
        callback_data: "BUILD_HISTORY_DELETE_SELECTED"
      }
    ],
    [
      {
        text: "🧹 બધી હિસ્ટ્રી ડિલીટ",
        callback_data: "BUILD_HISTORY_DELETE_ALL"
      }
    ],
    [
      { text: "🛠️ નવું બિલ્ડ", callback_data: "MENU_BUILD" }
    ],
    [
      { text: "🏠 મુખ્ય મેનુ", callback_data: "BACK_MAIN_MENU" }
    ]
  ]
} else {
  buttons = [
    [
      { text: "📋 History Dekho", callback_data: "BUILD_HISTORY" },
      { text: "🧾 Current Enquiry", callback_data: "MY_ENQUIRY" }
    ],
    [
      {
        text: "📄 Export Summary",
        callback_data: "BUILD_HISTORY_EXPORT"
      }
    ],
    [
      {
        text: "🗑️ Selected Delete",
        callback_data: "BUILD_HISTORY_DELETE_SELECTED"
      }
    ],
    [
      {
        text: "🧹 Puri History Delete",
        callback_data: "BUILD_HISTORY_DELETE_ALL"
      }
    ],
    [
      { text: "🛠️ New Build", callback_data: "MENU_BUILD" }
    ],
    [
      { text: "🏠 Main Menu", callback_data: "BACK_MAIN_MENU" }
    ]
  ]
}

function showMenu(messageText, keyboard) {
  if (
    typeof request !== "undefined" &&
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
      })
      return
    } catch (error) {
      try {
        Api.deleteMessage({
          chat_id: uid,
          message_id: request.message.message_id
        })
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
  })
}

showMenu(text[lang] || text.hinglish, buttons)
