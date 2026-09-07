/*CMD
  command: ORDER_BUSINESS
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
// SCRIPT 26 — UPDATED VERSION
// COMMAND NAME: ORDER_BUSINESS
// STEP 4.2.1 — BUSINESS REQUEST START
// 📁 MAIN MENU → 📁 PRICING → BUSINESS PACKAGE → BUILD MY BOT
// 🌐 Language support included
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================


// ==========================================
// ⚡ INSTANT CALLBACK RESPONSE
// ==========================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}


// ==========================================
// 👤 USER ID & LANGUAGE
// ==========================================

var uid = user.telegramid

var userData = Bot.getProperty("USER_" + uid) || {}

var lang = userData.language || "hinglish"


// ==========================================
// 📝 BUSINESS REQUEST MODE
// ==========================================

Bot.setProperty(
  "BUSINESS_MODE_" + uid,
  "waiting",
  "string"
)


// ==========================================
// 📤 REQUEST FORM TEXT
// ==========================================

var text = ""

if (lang === "english") {

  text =
    "🔵 <b>BUSINESS BOT REQUEST</b>\n\n" +
    "💰 <b>Starting Price: ₹1,499+</b>\n\n" +
    "You are submitting a request for the Business Bot Package.\n\n" +
    "✨ <b>Includes:</b>\n" +
    "• Advanced menu & navigation\n" +
    "• User management system\n" +
    "• Broadcast & notifications\n" +
    "• Admin controls\n" +
    "• Automated forms / lead collection\n" +
    "• Custom business features\n\n" +
    "📝 <b>Send your requirements in one message:</b>\n\n" +
    "• Bot name\n" +
    "• Bot purpose\n" +
    "• Required features\n" +
    "• Language\n" +
    "• Special buttons/design\n\n" +
    "✍️ Now type and send your requirements."


} else if (lang === "gujarati") {

  text =
    "🔵 <b>બિઝનેસ બોટ રિક્વેસ્ટ</b>\n\n" +
    "💰 <b>શરૂઆતની કિંમત: ₹1,499+</b>\n\n" +
    "તમે Business Bot Package માટે request submit કરી રહ્યા છો.\n\n" +
    "✨ <b>આમાં મળશે:</b>\n" +
    "• Advanced menu અને navigation\n" +
    "• User management system\n" +
    "• Broadcast અને notifications\n" +
    "• Admin controls\n" +
    "• Automated forms / lead collection\n" +
    "• Custom business features\n\n" +
    "📝 <b>તમારી requirements એક જ message માં મોકલો:</b>\n\n" +
    "• Bot નું નામ\n" +
    "• Bot નો purpose\n" +
    "• Required features\n" +
    "• Language\n" +
    "• Special buttons/design\n\n" +
    "✍️ હવે તમારી requirements type કરીને મોકલો."


} else {

  text =
    "🔵 <b>BUSINESS BOT REQUEST</b>\n\n" +
    "💰 <b>Starting Price: ₹1,499+</b>\n\n" +
    "Aap Business Bot Package ke liye request submit kar rahe ho.\n\n" +
    "✨ <b>Includes:</b>\n" +
    "• Advanced menu & navigation\n" +
    "• User management system\n" +
    "• Broadcast & notifications\n" +
    "• Admin controls\n" +
    "• Automated forms / lead collection\n" +
    "• Custom business features\n\n" +
    "📝 <b>Apni requirements ek message mein bhejo:</b>\n\n" +
    "• Bot ka naam\n" +
    "• Bot ka purpose\n" +
    "• Required features\n" +
    "• Language\n" +
    "• Special buttons/design\n\n" +
    "✍️ Ab apna message type karke bhejo."

}


// ==========================================
// 📤 SEND REQUEST FORM
// ==========================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML"
})


// ==========================================
// ➡️ NEXT COMMAND
// ==========================================

Bot.runCommand("BUSINESS_REQUEST_TEXT")
