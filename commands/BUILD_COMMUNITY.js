/*CMD
  command: BUILD_COMMUNITY
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 203 — UPDATED VERSION
// COMMAND NAME: BUILD_COMMUNITY
// STEP 6.5 — COMMUNITY MANAGEMENT ENQUIRY
// 📁 Community Build Flow
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// Save build type
userData.enquiryType = "Community Management"
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
  "Community Management",
  "string"
)

// Multilingual text
var text = {
  hinglish:
    "👥 <b>COMMUNITY MANAGEMENT</b>\n\n" +
    "Aapko kis type ka community system chahiye?\n\n" +
    "Example:\n" +
    "• Group management\n" +
    "• Force subscribe\n" +
    "• Welcome system\n" +
    "• Anti-spam system\n" +
    "• Member verification\n" +
    "• Admin tools\n\n" +
    "✍️ Apni requirements bhejo.",

  en:
    "👥 <b>COMMUNITY MANAGEMENT</b>\n\n" +
    "What type of community system do you need?\n\n" +
    "Example:\n" +
    "• Group management\n" +
    "• Force subscribe\n" +
    "• Welcome system\n" +
    "• Anti-spam system\n" +
    "• Member verification\n" +
    "• Admin tools\n\n" +
    "✍️ Send your requirements.",

  gu:
    "👥 <b>કોમ્યુનિટી મેનેજમેન્ટ</b>\n\n" +
    "તમારે કેવો કોમ્યુનિટી સિસ્ટમ જોઈએ છે?\n\n" +
    "ઉદાહરણ:\n" +
    "• Group management\n" +
    "• Force subscribe\n" +
    "• Welcome system\n" +
    "• Anti-spam system\n" +
    "• Member verification\n" +
    "• Admin tools\n\n" +
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
function showCommunityMessage(text, keyboard) {
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

showCommunityMessage(messageText, buttons)

// Continue to requirements
Bot.runCommand("BUILD_REQUIREMENTS")
