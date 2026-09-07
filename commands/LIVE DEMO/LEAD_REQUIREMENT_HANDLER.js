/*CMD
  command: LEAD_REQUIREMENT_HANDLER
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
// SCRIPT 153 — UPDATED VERSION
// COMMAND NAME: LEAD_REQUIREMENT_HANDLER
// STEP 5.4.1.7 — SAVE REQUIREMENT
// 📁 Lead Collection → Requirement Handler
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================

var uid = user.telegramid
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// ---------- GET MESSAGE ----------
var requirementText = ""

if (
  typeof message !== "undefined" &&
  message &&
  message.text
) {
  requirementText = message.text
} else if (
  typeof request !== "undefined" &&
  request.message &&
  request.message.text
) {
  requirementText = request.message.text
}

requirementText = String(requirementText || "").trim()

// ---------- VALIDATION ----------
if (!requirementText || requirementText.length < 5) {
  var errorText = ""

  if (lang == "english") {
    errorText = "❌ Please enter a detailed requirement."
  } else if (lang == "gujarati") {
    errorText = "❌ કૃપા કરીને તમારી જરૂરિયાત વિગતવાર લખો."
  } else {
    errorText = "❌ Apni requirement thodi detail mein likho."
  }

  Api.sendMessage({
    chat_id: uid,
    text: errorText
  })

  return
}

// ---------- SAVE REQUIREMENT ----------
userData.lead_requirement = requirementText
userData.lead_step = "SUMMARY"

Bot.setProperty(
  "USER_" + uid,
  userData,
  "json"
)

Bot.setProperty(
  "LEAD_STEP_" + uid,
  "SUMMARY",
  "string"
)

// ---------- GET SAVED DATA ----------
var leadName = userData.lead_name || "Not provided"
var leadContact = userData.lead_contact || "Not provided"
var leadService = userData.lead_service || "Not provided"

// ---------- SUMMARY TEXT ----------
var text = ""

if (lang == "english") {
  text =
    "✅ <b>Requirement Saved Successfully</b>\n\n" +
    "📋 <b>Your Lead Summary</b>\n\n" +
    "👤 <b>Name:</b> " + leadName + "\n" +
    "📱 <b>Contact:</b> " + leadContact + "\n" +
    "🎯 <b>Service:</b> " + leadService + "\n" +
    "💬 <b>Requirement:</b> " + requirementText + "\n\n" +
    "👇 Please review your details and submit the enquiry."
} else if (lang == "gujarati") {
  text =
    "✅ <b>જરૂરિયાત સફળતાપૂર્વક સેવ થઈ ગઈ</b>\n\n" +
    "📋 <b>તમારી લીડ સમરી</b>\n\n" +
    "👤 <b>નામ:</b> " + leadName + "\n" +
    "📱 <b>સંપર્ક:</b> " + leadContact + "\n" +
    "🎯 <b>સર્વિસ:</b> " + leadService + "\n" +
    "💬 <b>જરૂરિયાત:</b> " + requirementText + "\n\n" +
    "👇 વિગતો ચેક કરીને enquiry submit કરો."
} else {
  text =
    "✅ <b>Requirement Successfully Save Ho Gayi</b>\n\n" +
    "📋 <b>Aapki Lead Summary</b>\n\n" +
    "👤 <b>Name:</b> " + leadName + "\n" +
    "📱 <b>Contact:</b> " + leadContact + "\n" +
    "🎯 <b>Service:</b> " + leadService + "\n" +
    "💬 <b>Requirement:</b> " + requirementText + "\n\n" +
    "👇 Details check karke enquiry submit karo."
}

// ---------- BUTTON TEXT ----------
var buttonText = {
  hinglish: {
    submit: "📨 Submit Enquiry",
    edit: "✏️ Edit Requirement",
    cancel: "❌ Cancel"
  },

  english: {
    submit: "📨 Submit Enquiry",
    edit: "✏️ Edit Requirement",
    cancel: "❌ Cancel"
  },

  gujarati: {
    submit: "📨 Enquiry મોકલો",
    edit: "✏️ જરૂરિયાત બદલો",
    cancel: "❌ રદ કરો"
  }
}

var t = buttonText[lang] || buttonText.hinglish

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: t.submit,
      callback_data: "LEAD_SUBMIT"
    }
  ],
  [
    {
      text: t.edit,
      callback_data: "LEAD_REQUIREMENT"
    }
  ],
  [
    {
      text: t.cancel,
      callback_data: "DEMO_LEAD"
    }
  ]
]

// ---------- SEND SUMMARY ----------
Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
})
