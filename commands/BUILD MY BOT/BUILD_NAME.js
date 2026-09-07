/*CMD
  command: BUILD_NAME
  help: 
  need_reply: true
  auto_retry_time: 
  folder: BUILD MY BOT

  <<ANSWER
👤 Please send your full name.

Example:
Rahul Sharma
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 196 — UPDATED VERSION
// COMMAND NAME: BUILD_NAME
// STEP 6.1.1 — SAVE CUSTOMER NAME
// 📁 Custom Build Flow
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var userData = Bot.getProperty("USER_" + uid) || {}

var lang = userData.language || "hinglish"
var name = message ? String(message).trim() : ""

// Validate name
if (!name || name.length < 2) {
  var invalidText = {
    hinglish: "⚠️ Please apna valid full name bhejiye.",
    en: "⚠️ Please send a valid full name.",
    gu: "⚠️ કૃપા કરીને તમારું સાચું પૂરું નામ મોકલો."
  }

  Bot.sendMessage(
    invalidText[lang] || invalidText.hinglish
  )

  Bot.runCommand("BUILD_NAME")
  return
}

// Save name
userData.enquiryName = name
userData.enquiryStep = 2
userData.enquiryStatus = "Name Saved"

Bot.setProperty(
  "USER_" + uid,
  userData,
  "json"
)

// Multilingual next-step message
var nextText = {
  hinglish:
    "✅ <b>Name saved!</b>\n\n" +
    "📋 <b>Step 2 of 3</b>\n\n" +
    "📞 Ab apna <b>Telegram username</b> bhejiye.\n\n" +
    "Example: <code>@username</code>\n\n" +
    "Agar username nahi hai, toh apna Telegram contact number bhej sakte hain.",

  en:
    "✅ <b>Name saved!</b>\n\n" +
    "📋 <b>Step 2 of 3</b>\n\n" +
    "📞 Now send your <b>Telegram username</b>.\n\n" +
    "Example: <code>@username</code>\n\n" +
    "If you do not have a username, you can send your Telegram contact number.",

  gu:
    "✅ <b>નામ સેવ થઈ ગયું!</b>\n\n" +
    "📋 <b>સ્ટેપ 2 માંથી 3</b>\n\n" +
    "📞 હવે તમારું <b>ટેલિગ્રામ યુઝરનેમ</b> મોકલો.\n\n" +
    "ઉદાહરણ: <code>@username</code>\n\n" +
    "જો યુઝરનેમ નથી, તો તમારો ટેલિગ્રામ કોન્ટેક્ટ નંબર મોકલી શકો છો."
}

Bot.sendMessage({
  chat_id: uid,
  text: nextText[lang] || nextText.hinglish,
  parse_mode: "HTML"
})

// Start contact step
Bot.runCommand("BUILD_CONTACT")
