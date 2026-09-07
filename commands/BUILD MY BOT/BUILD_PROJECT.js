/*CMD
  command: BUILD_PROJECT
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
// SCRIPT 205 — UPDATED VERSION
// COMMAND NAME: BUILD_PROJECT
// STEP 6.7 — CUSTOM PROJECT ENQUIRY
// 📁 Project Build Flow
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// Save build type
userData.enquiryType = "Custom Project"
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
  "Custom Project",
  "string"
)

// Multilingual text
var text = {
  hinglish:
    "💎 <b>CUSTOM PROJECT</b>\n\n" +
    "Apni complete bot idea batao.\n\n" +
    "Please include:\n" +
    "• Bot kya karega?\n" +
    "• Kaun use karega?\n" +
    "• Required features\n" +
    "• Admin requirements\n" +
    "• Koi reference bot ya example\n\n" +
    "✍️ Apni complete project details bhejo.",

  en:
    "💎 <b>CUSTOM PROJECT</b>\n\n" +
    "Describe your complete bot idea.\n\n" +
    "Please include:\n" +
    "• What should the bot do?\n" +
    "• Who will use it?\n" +
    "• Required features\n" +
    "• Admin requirements\n" +
    "• Any reference bot or example\n\n" +
    "✍️ Send your complete project details.",

  gu:
    "💎 <b>કસ્ટમ પ્રોજેક્ટ</b>\n\n" +
    "તમારી સંપૂર્ણ બોટ આઈડિયા જણાવો.\n\n" +
    "આ માહિતી આપો:\n" +
    "• બોટ શું કરશે?\n" +
    "• કોણ તેનો ઉપયોગ કરશે?\n" +
    "• Required features\n" +
    "• Admin requirements\n" +
    "• કોઈ reference bot અથવા example\n\n" +
    "✍️ તમારી સંપૂર્ણ પ્રોજેક્ટ વિગતો મોકલો."
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
function showProjectMessage(text, keyboard) {
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

showProjectMessage(messageText, buttons)

// Continue to requirements
Bot.runCommand("BUILD_REQUIREMENTS")
