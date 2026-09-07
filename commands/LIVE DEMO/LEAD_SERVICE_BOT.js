/*CMD
  command: LEAD_SERVICE_BOT
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
// SCRIPT 151 — UPDATED VERSION
// COMMAND NAME: LEAD_SERVICE_BOT
// STEP 5.4.1.5 — BOT DEVELOPMENT SERVICE
// 📁 Lead Collection → Service Selection
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// ---------- CALLBACK ANSWER ----------
if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

// ---------- SAVE SERVICE ----------
userData.lead_service = "Bot Development"
userData.lead_step = "REQUIREMENT"

Bot.setProperty(
  "USER_" + uid,
  userData,
  "json"
)

Bot.setProperty(
  "LEAD_STEP_" + uid,
  "REQUIREMENT",
  "string"
)

// ---------- TEXT ----------
var text = ""

if (lang == "english") {
  text =
    "🤖 <b>Bot Development Selected</b>\n\n" +
    "You selected Bot Development.\n\n" +
    "Now tell us what type of bot you want to build.\n\n" +
    "👇 You can mention your required features, budget, or any special requirements."
} else if (lang == "gujarati") {
  text =
    "🤖 <b>બોટ ડેવલપમેન્ટ પસંદ કર્યું</b>\n\n" +
    "તમે Bot Development પસંદ કર્યું છે.\n\n" +
    "હવે તમે કયા પ્રકારનો બોટ બનાવવા માંગો છો તે જણાવો.\n\n" +
    "👇 જરૂરી ફીચર્સ, બજેટ અથવા ખાસ જરૂરિયાત લખી શકો છો."
} else {
  text =
    "🤖 <b>Bot Development Selected</b>\n\n" +
    "Aapne Bot Development select kiya hai.\n\n" +
    "Ab batao aap kis type ka bot banana chahte ho.\n\n" +
    "👇 Required features, budget ya koi special requirement likh sakte ho."
}

// ---------- BUTTON TEXT ----------
var buttonText = {
  hinglish: {
    requirement: "💬 Enter Requirement",
    back: "🔙 Service Selection",
    cancel: "❌ Cancel"
  },

  english: {
    requirement: "💬 Enter Requirement",
    back: "🔙 Service Selection",
    cancel: "❌ Cancel"
  },

  gujarati: {
    requirement: "💬 જરૂરિયાત લખો",
    back: "🔙 સર્વિસ પસંદગી",
    cancel: "❌ રદ કરો"
  }
}

var t = buttonText[lang] || buttonText.hinglish

// ---------- SAME MESSAGE EDIT ----------
function showBotService(messageText, buttons) {
  if (
    typeof request !== "undefined" &&
    request.message &&
    request.message.message_id
  ) {
    try {
      Api.editMessageText({
        chat_id: uid,
        message_id: request.message.message_id,
        text: messageText,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: buttons
        }
      })
      return
    } catch (error) {
      try {
        Api.deleteMessage({
          chat_id: uid,
          message_id: request.message.message_id
        })
      } catch (deleteError) {}
    }
  }

  Api.sendMessage({
    chat_id: uid,
    text: messageText,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons
    }
  })
}

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: t.requirement,
      callback_data: "LEAD_REQUIREMENT"
    }
  ],
  [
    {
      text: t.back,
      callback_data: "LEAD_CONTACT"
    },
    {
      text: t.cancel,
      callback_data: "DEMO_LEAD"
    }
  ]
]

// ---------- SHOW SCREEN ----------
showBotService(text, buttons)
