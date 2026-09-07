/*CMD
  command: BUILD_LEAD
  help: 
  need_reply: false
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
// SCRIPT 204 — UPDATED VERSION
// COMMAND NAME: BUILD_LEAD
// STEP 6.6 — LEAD COLLECTION ENQUIRY
// 📁 Lead Build Flow
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// Save build type
userData.enquiryType = "Lead Collection System"
userData.enquiryStartedAt = new Date().toISOString()
userData.enquiryStep = 1
userData.enquiryStatus = "Started"

Bot.setProperty(
  "USER_" + uid,
  userData,
  "json"
)

Bot.setProperty(
  "BUILD_TYPE_" + uid,
  "Lead Collection System",
  "string"
)

// Multilingual text
var text = {
  hinglish:
    "📝 <b>LEAD COLLECTION SYSTEM</b>\n\n" +
    "Bot ko kaunsi information collect karni chahiye?\n\n" +
    "Example:\n" +
    "• Name aur phone number\n" +
    "• Customer enquiries\n" +
    "• Product requirements\n" +
    "• Google Sheet integration\n" +
    "• Admin notifications\n" +
    "• Lead follow-up system\n\n" +
    "✍️ Apni requirements bhejo.",

  en:
    "📝 <b>LEAD COLLECTION SYSTEM</b>\n\n" +
    "What information should the bot collect?\n\n" +
    "Example:\n" +
    "• Name and phone number\n" +
    "• Customer enquiries\n" +
    "• Product requirements\n" +
    "• Google Sheet integration\n" +
    "• Admin notifications\n" +
    "• Lead follow-up system\n\n" +
    "✍️ Send your requirements.",

  gu:
    "📝 <b>લીડ કલેક્શન સિસ્ટમ</b>\n\n" +
    "બોટ કઈ માહિતી કલેક્શન કરે?\n\n" +
    "ઉદાહરણ:\n" +
    "• નામ અને ફોન નંબર\n" +
    "• Customer enquiries\n" +
    "• Product requirements\n" +
    "• Google Sheet integration\n" +
    "• Admin notifications\n" +
    "• Lead follow-up system\n\n" +
    "✍️ તમારી જરૂરિયાતો મોકલો."
}

var messageText = text[lang] || text.hinglish

var buttons = [
  [
    {
      text:
        lang === "en"
          ? "❌ Cancel"
          : lang === "gu"
          ? "❌ રદ કરો"
          : "❌ Cancel",
      callback_data: "BUILD_CANCEL"
    }
  ]
]

// Same-message edit with delete fallback
function showLeadMessage(text, keyboard) {
  if (
    typeof request !== "undefined" &&
    request.message &&
    request.message.message_id
  ) {
    try {
      Api.editMessageText({
        chat_id: uid,
        message_id: request.message.message_id,
        text: text,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: keyboard
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
    text: text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: keyboard
    }
  })
}

// Answer callback safely
if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

showLeadMessage(messageText, buttons)

// Continue to requirements
Bot.runCommand("BUILD_REQUIREMENTS")
