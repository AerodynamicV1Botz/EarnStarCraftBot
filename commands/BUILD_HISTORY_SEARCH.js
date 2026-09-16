/*CMD
  command: BUILD_HISTORY_SEARCH
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
// SCRIPT 219 — UPDATED VERSION
// COMMAND NAME: BUILD_HISTORY_SEARCH
// STEP 5.2.3.1.1.3.1.18
// 📁 BUILD_HISTORY_SEARCH
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
    "🔎 <b>ENQUIRY SEARCH</b>\n\n" +
    "Apni enquiry ka Reference ID bhejo.\n\n" +
    "Example: <code>ES12345678</code>",

  en:
    "🔎 <b>ENQUIRY SEARCH</b>\n\n" +
    "Send your enquiry Reference ID.\n\n" +
    "Example: <code>ES12345678</code>",

  gu:
    "🔎 <b>ENQUIRY શોધ</b>\n\n" +
    "તમારી enquiry નો Reference ID મોકલો.\n\n" +
    "ઉદાહરણ: <code>ES12345678</code>"
}

var buttons = [
  [
    {
      text: lang === "en"
        ? "🗂️ History Menu"
        : lang === "gu"
          ? "🗂️ હિસ્ટ્રી મેનુ"
          : "🗂️ History Menu",
      callback_data: "BUILD_HISTORY_MENU"
    }
  ],
  [
    {
      text: lang === "en"
        ? "🏠 Main Menu"
        : lang === "gu"
          ? "🏠 મુખ્ય મેનુ"
          : "🏠 Main Menu",
      callback_data: "BACK_MAIN_MENU"
    }
  ]
]

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

Bot.runCommand("BUILD_HISTORY_SEARCH_HANDLER")
