/*CMD
  command: LANG_HINGLISH
  help: 
  need_reply: false
  auto_retry_time: 
  folder: MAINMENU

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🇮🇳 EARNSTAR BOTCRAFT
// SCRIPT 2 — UPDATED VERSION
// COMMAND: LANG_HINGLISH
// STEP: 1.1
// 🌐 HINGLISH LANGUAGE SELECTION
// ==========================================

// ==========================================
// ⚡ INSTANT CALLBACK RESPONSE
// ==========================================

if (typeof request !== "undefined" && request && request.id) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "🇮🇳 Hinglish selected!"
  })
}

// ==========================================
// ---------- USER INFO ----------
// ==========================================

let userId = user.telegramid
let userKey = "USER_" + userId

let fullName =
  user.first_name +
  (user.last_name ? " " + user.last_name : "")

let username = user.username
  ? "@" + user.username
  : "Not set"

// ==========================================
// ---------- GET USER DATA ----------
// ==========================================

let userData = Bot.getProperty(userKey)

// Agar profile pehle se saved nahi hai
if (!userData) {
  userData = {
    id: userId,
    name: fullName,
    username: username,
    language: "hinglish"
  }
} else {
  // Existing details update
  userData.id = userId
  userData.name = fullName
  userData.username = username
  userData.language = "hinglish"
}

// ==========================================
// ---------- SAVE USER DATA ----------
// ==========================================

Bot.setProperty(
  userKey,
  userData,
  "json"
)

// ==========================================
// ---------- EDIT CURRENT MESSAGE ----------
// ==========================================

if (
  typeof request !== "undefined" &&
  request &&
  request.message &&
  request.message.message_id
) {
  Api.editMessageCaption({
    chat_id: userId,
    message_id: request.message.message_id,
    caption:
      "🇮🇳 <b>Hinglish selected!</b>\n\n" +
      "Welcome to <b>EarnStar 🤖 BOTCRAFT</b>!\n\n" +
      "Ab hum aapko Hinglish mein services aur options show karenge. 🚀\n\n" +
      "🏠 <b>Main Menu open ho raha hai...</b>",
    parse_mode: "HTML"
  })
}

// ==========================================
// ---------- OPEN MAIN MENU ----------
// ==========================================

Bot.runCommand("MAIN_MENU")
