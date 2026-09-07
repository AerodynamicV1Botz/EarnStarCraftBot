/*CMD
  command: LEAD_NAME_HANDLER
  help: 
  need_reply: false
  auto_retry_time: 
  folder: LIVE DEMO

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 148 — UPDATED VERSION
// COMMAND NAME: LEAD_NAME_HANDLER
// STEP 5.4.1.2 — SAVE CUSTOMER NAME
// 📁 Lead Collection → Name Handler
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================

var uid = user.telegramid
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// ---------- GET MESSAGE ----------
var messageText = ""

if (
  typeof message !== "undefined" &&
  message &&
  message.text
) {
  messageText = message.text
} else if (
  typeof request !== "undefined" &&
  request.message &&
  request.message.text
) {
  messageText = request.message.text
}

messageText = String(messageText || "").trim()

// ---------- VALIDATION ----------
if (!messageText || messageText.length < 2) {
  var errorText = ""

  if (lang == "english") {
    errorText = "❌ Please enter a valid name."
  } else if (lang == "gujarati") {
    errorText = "❌ કૃપા કરીને માન્ય નામ દાખલ કરો."
  } else {
    errorText = "❌ Valid naam enter karo."
  }

  Api.sendMessage({
    chat_id: uid,
    text: errorText
  })

  return
}

// ---------- SAVE NAME ----------
userData.lead_name = messageText
userData.lead_step = "CONTACT"

Bot.setProperty(
  "USER_" + uid,
  userData,
  "json"
)

Bot.setProperty(
  "LEAD_STEP_" + uid,
  "CONTACT",
  "string"
)

// ---------- NEXT TEXT ----------
var text = ""

if (lang == "english") {
  text =
    "✅ Name saved successfully.\n\n" +
    "📱 Now enter your contact number or contact details.\n\n" +
    "Example: 9876543210"
} else if (lang == "gujarati") {
  text =
    "✅ નામ સફળતાપૂર્વક સેવ થઈ ગયું.\n\n" +
    "📱 હવે તમારો સંપર્ક નંબર અથવા સંપર્ક વિગતો દાખલ કરો.\n\n" +
    "ઉદાહરણ: 9876543210"
} else {
  text =
    "✅ Naam successfully save ho gaya.\n\n" +
    "📱 Ab apna contact number ya contact details enter karo.\n\n" +
    "Example: 9876543210"
}

// ---------- BUTTON TEXT ----------
var cancelText = "❌ Cancel"

if (lang == "gujarati") {
  cancelText = "❌ રદ કરો"
}

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: cancelText,
      callback_data: "DEMO_LEAD"
    }
  ]
]

// ---------- SEND NEXT STEP ----------
Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
})
