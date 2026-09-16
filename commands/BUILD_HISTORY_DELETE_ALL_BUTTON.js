/*CMD
  command: BUILD_HISTORY_DELETE_ALL_BUTTON
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
// SCRIPT 215 — UPDATED VERSION
// COMMAND NAME: BUILD_HISTORY_DELETE_ALL_BUTTON
// STEP 5.3.10 — CLEAR ALL HISTORY BUTTON
// 📁 Enquiry History Clear Button
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// ---------- CALLBACK ANSWER ----------
if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

// ---------- LANGUAGE TEXT ----------
var text = {
  hinglish: {
    title: "🗑️ <b>History Management</b>",
    body: "Aap apni enquiry history manage kar sakte hain.",
    clear: "🗑️ Clear All History",
    history: "📋 Enquiry History",
    build: "🛠️ New Enquiry",
    menu: "🏠 Main Menu"
  },

  en: {
    title: "🗑️ <b>History Management</b>",
    body: "You can manage your enquiry history here.",
    clear: "🗑️ Clear All History",
    history: "📋 Enquiry History",
    build: "🛠️ New Enquiry",
    menu: "🏠 Main Menu"
  },

  gu: {
    title: "🗑️ <b>ઇતિહાસ મેનેજમેન્ટ</b>",
    body: "તમે અહીં તમારો પૂછપરછનો ઇતિહાસ મેનેજ કરી શકો છો.",
    clear: "🗑️ બધો ઇતિહાસ સાફ કરો",
    history: "📋 પૂછપરછનો ઇતિહાસ",
    build: "🛠️ નવી પૂછપરછ",
    menu: "🏠 મુખ્ય મેનુ"
  }
}

var t = text[lang] || text.hinglish

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: t.clear,
      callback_data: "BUILD_HISTORY_DELETE_ALL"
    }
  ],
  [
    {
      text: t.history,
      callback_data: "BUILD_HISTORY"
    }
  ],
  [
    {
      text: t.build,
      callback_data: "MENU_BUILD"
    }
  ],
  [
    {
      text: t.menu,
      callback_data: "BACK_MAIN_MENU"
    }
  ]
]

// ---------- SAME MESSAGE EDIT + FALLBACK ----------
function showMenu(text, buttons) {
  if (
    typeof request !== "undefined" &&
    request.message &&
    request.message.message_id
  ) {
    try {
      Api.editMessageText({
        chat_id: uid,
        message_id: request.message.message_id,
        text: text,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: buttons
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
    text: text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons
    }
  })
}

// ---------- SHOW MANAGEMENT ----------
showMenu(
  t.title + "\n\n" + t.body,
  buttons
)
