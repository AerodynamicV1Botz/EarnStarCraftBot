/*CMD
  command: LEAD_REQUIREMENT
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
// SCRIPT 152 — UPDATED VERSION
// COMMAND NAME: LEAD_REQUIREMENT
// STEP 5.4.1.6 — CUSTOMER REQUIREMENT
// 📁 Lead Collection → Requirement Input
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

// ---------- SAVE STEP ----------
Bot.setProperty(
  "LEAD_STEP_" + uid,
  "REQUIREMENT",
  "string"
)

userData.lead_step = "REQUIREMENT"

Bot.setProperty(
  "USER_" + uid,
  userData,
  "json"
)

// ---------- TEXT ----------
var text = ""

if (lang == "english") {
  text =
    "💬 <b>Your Requirement</b>\n\n" +
    "Please describe what you need.\n\n" +
    "You can mention:\n" +
    "• Bot type\n" +
    "• Required features\n" +
    "• Expected budget\n" +
    "• Delivery timeline\n" +
    "• Any special request\n\n" +
    "✍️ Example: I need a Telegram bot with referral system and admin panel."
} else if (lang == "gujarati") {
  text =
    "💬 <b>તમારી જરૂરિયાત</b>\n\n" +
    "કૃપા કરીને તમને શું જોઈએ છે તે જણાવો.\n\n" +
    "તમે આ માહિતી લખી શકો છો:\n" +
    "• બોટનો પ્રકાર\n" +
    "• જરૂરી ફીચર્સ\n" +
    "• અંદાજિત બજેટ\n" +
    "• ડિલિવરી સમય\n" +
    "• કોઈ ખાસ વિનંતી\n\n" +
    "✍️ ઉદાહરણ: મને referral system અને admin panel સાથે Telegram bot જોઈએ છે."
} else {
  text =
    "💬 <b>Aapki Requirement</b>\n\n" +
    "Aapko kya chahiye, woh detail mein likho.\n\n" +
    "Aap ye information mention kar sakte ho:\n" +
    "• Bot ka type\n" +
    "• Required features\n" +
    "• Expected budget\n" +
    "• Delivery timeline\n" +
    "• Koi special request\n\n" +
    "✍️ Example: Mujhe referral system aur admin panel wala Telegram bot chahiye."
}

// ---------- BUTTON TEXT ----------
var buttonText = {
  hinglish: {
    back: "🔙 Back",
    cancel: "❌ Cancel"
  },

  english: {
    back: "🔙 Back",
    cancel: "❌ Cancel"
  },

  gujarati: {
    back: "🔙 પાછા",
    cancel: "❌ રદ કરો"
  }
}

var t = buttonText[lang] || buttonText.hinglish

// ---------- SAME MESSAGE EDIT ----------
function showRequirement(messageText, buttons) {
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
      text: t.back,
      callback_data: "LEAD_SERVICE_BOT"
    },
    {
      text: t.cancel,
      callback_data: "DEMO_LEAD"
    }
  ]
]

// ---------- SHOW SCREEN ----------
showRequirement(text, buttons)
