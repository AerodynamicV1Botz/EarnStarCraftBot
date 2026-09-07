/*CMD
  command: BUILD_CONTACT
  help: 
  need_reply: true
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
// SCRIPT 197 — UPDATED VERSION
// COMMAND NAME: BUILD_CONTACT
// STEP 6.1.2 — SAVE CUSTOMER CONTACT
// 📁 Custom Build Flow
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var userData = Bot.getProperty("USER_" + uid) || {}

var lang = userData.language || "hinglish"
var contact = message ? String(message).trim() : ""

// Validate contact
if (!contact || contact.length < 3) {
  var invalidText = {
    hinglish:
      "⚠️ Please valid Telegram username bhejiye.\n\n" +
      "Example: <code>@yourusername</code>",

    en:
      "⚠️ Please enter a valid Telegram username.\n\n" +
      "Example: <code>@yourusername</code>",

    gu:
      "⚠️ કૃપા કરીને સાચું ટેલિગ્રામ યુઝરનેમ મોકલો.\n\n" +
      "ઉદાહરણ: <code>@yourusername</code>"
  }

  Bot.sendMessage({
    chat_id: uid,
    text: invalidText[lang] || invalidText.hinglish,
    parse_mode: "HTML"
  })

  Bot.runCommand("BUILD_CONTACT")
  return
}

// Save contact
userData.enquiryContact = contact
userData.enquiryStep = 3
userData.enquiryStatus = "Contact Saved"

Bot.setProperty(
  "USER_" + uid,
  userData,
  "json"
)

// Multilingual requirements message
var nextText = {
  hinglish:
    "✅ <b>Username saved!</b>\n\n" +
    "📋 <b>Step 3 of 3</b>\n\n" +
    "📝 Ab apne bot ki <b>requirements</b> bhejo.\n\n" +
    "Example:\n" +
    "<i>Customer support bot chahiye with FAQ, enquiry form aur admin notifications.</i>",

  en:
    "✅ <b>Username saved!</b>\n\n" +
    "📋 <b>Step 3 of 3</b>\n\n" +
    "📝 Now send your bot <b>requirements</b>.\n\n" +
    "Example:\n" +
    "<i>I need a customer support bot with FAQ, enquiry form and admin notifications.</i>",

  gu:
    "✅ <b>યુઝરનેમ સેવ થઈ ગયું!</b>\n\n" +
    "📋 <b>સ્ટેપ 3 માંથી 3</b>\n\n" +
    "📝 હવે તમારા બોટની <b>જરૂરિયાતો</b> મોકલો.\n\n" +
    "ઉદાહરણ:\n" +
    "<i>FAQ, enquiry form અને admin notifications સાથે customer support bot જોઈએ છે.</i>"
}

Bot.sendMessage({
  chat_id: uid,
  text: nextText[lang] || nextText.hinglish,
  parse_mode: "HTML"
})

// Start requirements step
Bot.runCommand("BUILD_REQUIREMENTS")
