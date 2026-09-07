/*CMD
  command: ORDER_STARTER
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
// SCRIPT 15 — UPDATED VERSION
// COMMAND NAME: ORDER_STARTER
// STEP 4.1.1 — STARTER ORDER REQUEST
// 📁 MAIN MENU → 📁 PRICING → STARTER PACKAGE
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
// 👤 USER DATA
// ==========================================

let uid = user.telegramid

let userData = Bot.getProperty("USER_" + uid)

let language =
  userData && userData.language
    ? userData.language
    : "hinglish"

// ==========================================
// 🔄 STARTER REQUEST MODE
// ==========================================

Bot.setProperty(
  "STARTER_MODE_" + uid,
  "waiting",
  "string"
)

// ==========================================
// 📝 REQUEST MESSAGE
// ==========================================

let text = ""

// ==========================================
// 🇮🇳 HINGLISH
// ==========================================

if (language == "hinglish") {

  text =
    "🚀 <b>STARTER BOT REQUEST</b>\n\n" +
    "Aap Starter Bot request submit kar rahe ho.\n\n" +
    "📝 Apni requirements ek message mein bhejo:\n\n" +
    "• Bot ka naam\n" +
    "• Bot ka purpose\n" +
    "• Required features\n" +
    "• Language\n" +
    "• Special buttons/design\n\n" +
    "✍️ Ab apna message type karke bhejo."

}

// ==========================================
// 🇬🇧 ENGLISH
// ==========================================

else if (language == "english") {

  text =
    "🚀 <b>STARTER BOT REQUEST</b>\n\n" +
    "You are submitting a Starter Bot request.\n\n" +
    "📝 Send your requirements in one message:\n\n" +
    "• Bot name\n" +
    "• Bot purpose\n" +
    "• Required features\n" +
    "• Language\n" +
    "• Special buttons/design\n\n" +
    "✍️ Now type and send your requirements."

}

// ==========================================
// 🇬🇺 GUJARATI
// ==========================================

else if (language == "gujarati") {

  text =
    "🚀 <b>STARTER BOT REQUEST</b>\n\n" +
    "તમે Starter Bot ની request submit કરી રહ્યા છો.\n\n" +
    "📝 તમારી requirements એક message માં મોકલો:\n\n" +
    "• Bot નું નામ\n" +
    "• Bot નો purpose\n" +
    "• Required features\n" +
    "• Language\n" +
    "• Special buttons/design\n\n" +
    "✍️ હવે તમારી requirements type કરીને મોકલો."

}

// ==========================================
// 📤 SEND REQUEST MESSAGE
// ==========================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML"
})

// ==========================================
// ➡️ NEXT COMMAND
// ==========================================

Bot.runCommand("STARTER_REQUEST_TEXT")
