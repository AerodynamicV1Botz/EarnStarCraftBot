/*CMD
  command: LANG_GUJARATI
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
// 🇬🇺 EARNSTAR BOTCRAFT
// SCRIPT 4 — UPDATED VERSION
// COMMAND: LANG_GUJARATI
// STEP: 1.3
// 🌐 GUJARATI LANGUAGE SELECTION
// ==========================================

// ==========================================
// ⚡ INSTANT CALLBACK RESPONSE
// ==========================================

if (typeof request !== "undefined" && request && request.id) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "🇬🇺 ગુજરાતી પસંદ કરવામાં આવી!"
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
    language: "gujarati"
  }
} else {
  // Existing details update
  userData.id = userId
  userData.name = fullName
  userData.username = username
  userData.language = "gujarati"
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
      "🇬🇺 <b>ભાષા પસંદ થઈ ગઈ!</b>\n\n" +
      "<b>EarnStar 🤖 BOTCRAFT</b> માં આપનું સ્વાગત છે! 🚀\n\n" +
      "હવે અમે તમને અમારી services અને options ગુજરાતી ભાષામાં બતાવીશું.\n\n" +
      "🏠 <b>Main Menu ખોલાઈ રહ્યું છે...</b>",
    parse_mode: "HTML"
  })
}

// ==========================================
// ---------- OPEN MAIN MENU ----------
// ==========================================

Bot.runCommand("MAIN_MENU")
