/*CMD
  command: LEAD_CONTACT_HANDLER
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
// SCRIPT 150 — UPDATED VERSION
// COMMAND NAME: LEAD_CONTACT_HANDLER
// STEP 5.4.1.4 — SAVE CONTACT DETAILS
// 📁 Lead Collection → Contact Handler
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================

var uid = user.telegramid
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// ---------- GET MESSAGE ----------
var contactText = ""

if (
  typeof message !== "undefined" &&
  message &&
  message.text
) {
  contactText = message.text
} else if (
  typeof request !== "undefined" &&
  request.message &&
  request.message.text
) {
  contactText = request.message.text
}

contactText = String(contactText || "").trim()

// ---------- VALIDATION ----------
if (!contactText || contactText.length < 3) {
  var errorText = ""

  if (lang == "english") {
    errorText = "❌ Please enter valid contact details."
  } else if (lang == "gujarati") {
    errorText = "❌ કૃપા કરીને માન્ય સંપર્ક વિગતો દાખલ કરો."
  } else {
    errorText = "❌ Valid contact details enter karo."
  }

  Api.sendMessage({
    chat_id: uid,
    text: errorText
  })

  return
}

// ---------- SAVE CONTACT ----------
userData.lead_contact = contactText
userData.lead_step = "SERVICE"

Bot.setProperty(
  "USER_" + uid,
  userData,
  "json"
)

Bot.setProperty(
  "LEAD_STEP_" + uid,
  "SERVICE",
  "string"
)

// ---------- NEXT TEXT ----------
var text = ""

if (lang == "english") {
  text =
    "✅ Contact details saved successfully.\n\n" +
    "🎯 Now select the service you are interested in."
} else if (lang == "gujarati") {
  text =
    "✅ સંપર્ક વિગતો સફળતાપૂર્વક સેવ થઈ ગઈ.\n\n" +
    "🎯 હવે તમને જરૂરી સર્વિસ પસંદ કરો."
} else {
  text =
    "✅ Contact details successfully save ho gayi.\n\n" +
    "🎯 Ab jis service mein interest hai, woh select karo."
}

// ---------- BUTTON TEXT ----------
var buttonText = {
  hinglish: {
    bot: "🤖 Bot Development",
    ecommerce: "🛒 E-Commerce",
    automation: "⚙️ Automation",
    support: "💬 Support Bot",
    other: "📦 Other Service",
    cancel: "❌ Cancel"
  },

  english: {
    bot: "🤖 Bot Development",
    ecommerce: "🛒 E-Commerce",
    automation: "⚙️ Automation",
    support: "💬 Support Bot",
    other: "📦 Other Service",
    cancel: "❌ Cancel"
  },

  gujarati: {
    bot: "🤖 બોટ ડેવલપમેન્ટ",
    ecommerce: "🛒 ઈ-કોમર્સ",
    automation: "⚙️ ઓટોમેશન",
    support: "💬 સપોર્ટ બોટ",
    other: "📦 અન્ય સર્વિસ",
    cancel: "❌ રદ કરો"
  }
}

var t = buttonText[lang] || buttonText.hinglish

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: t.bot,
      callback_data: "LEAD_SERVICE_BOT"
    }
  ],
  [
    {
      text: t.ecommerce,
      callback_data: "LEAD_SERVICE_ECOM"
    }
  ],
  [
    {
      text: t.automation,
      callback_data: "LEAD_SERVICE_AUTO"
    }
  ],
  [
    {
      text: t.support,
      callback_data: "LEAD_SERVICE_SUPPORT"
    }
  ],
  [
    {
      text: t.other,
      callback_data: "LEAD_SERVICE_OTHER"
    }
  ],
  [
    {
      text: t.cancel,
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
