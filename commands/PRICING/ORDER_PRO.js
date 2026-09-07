/*CMD
  command: ORDER_PRO
  help: 
  need_reply: false
  auto_retry_time: 
  folder: PRICING

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 37 — UPDATED VERSION
// COMMAND NAME: ORDER_PRO
// STEP 4.3.1 — PROFESSIONAL ORDER REQUEST
// 📁 MAIN MENU → 📁 PRICING → PROFESSIONAL PACKAGE → ORDER
// 🌐 Language support included
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================


// ---------- SAFE CALLBACK RESPONSE ----------
if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}


// ---------- USER DATA ----------
var uid = user.telegramid

var userData = Bot.getProperty("USER_" + uid) || {}

var lang = userData.language || "hinglish"


// ---------- SAVE PRO REQUEST MODE ----------
Bot.setProperty(
  "PRO_MODE_" + uid,
  "waiting",
  "string"
)


// ---------- MESSAGE TEXT ----------
var text = ""

if (lang == "english") {

  text =
    "🟣 <b>Professional Bot Request</b>\n\n" +
    "Please send your requirements in one message.\n\n" +
    "📝 <b>Tell us:</b>\n" +
    "• What type of bot do you need?\n" +
    "• Which features do you want?\n" +
    "• Any custom automation or integrations?\n" +
    "• Your budget, if decided\n\n" +
    "💡 You can also send a complete project description.\n\n" +
    "📩 <b>Send your requirements now.</b>"

} else if (lang == "gujarati") {

  text =
    "🟣 <b>પ્રોફેશનલ બોટ રિક્વેસ્ટ</b>\n\n" +
    "તમારી requirements એક જ મેસેજમાં મોકલો.\n\n" +
    "📝 <b>જણાવો:</b>\n" +
    "• કયા પ્રકારનો બોટ જોઈએ છે?\n" +
    "• કયા features જોઈએ છે?\n" +
    "• કોઈ custom automation અથવા integrations?\n" +
    "• Budget નક્કી હોય તો જણાવો\n\n" +
    "💡 તમે complete project description પણ મોકલી શકો છો.\n\n" +
    "📩 <b>હવે તમારી requirements મોકલો.</b>"

} else {

  text =
    "🟣 <b>Professional Bot Request</b>\n\n" +
    "Apni requirements ek hi message mein bhejo.\n\n" +
    "📝 <b>Batao:</b>\n" +
    "• Kis type ka bot chahiye?\n" +
    "• Kaunse features chahiye?\n" +
    "• Koi custom automation ya integrations?\n" +
    "• Budget decide hai toh batao\n\n" +
    "💡 Complete project description bhi bhej sakte ho.\n\n" +
    "📩 <b>Ab apni requirements bhejo.</b>"

}


// ---------- SEND MESSAGE ----------
Bot.sendMessage(text, {
  parse_mode: "HTML"
})


// ---------- NEXT STEP ----------
Bot.runCommand("PRO_REQUEST_TEXT")
