/*CMD
  command: BUILD_CUSTOM
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
// SCRIPT 195 — UPDATED VERSION
// COMMAND NAME: BUILD_CUSTOM
// STEP 6.1 — CUSTOM BOT BUILD ENQUIRY
// 📁 Custom Build Flow
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var userData = Bot.getProperty("USER_" + uid) || {}

var lang = userData.language || "hinglish"

// Save enquiry details
userData.enquiryType = "Custom Telegram Bot"
userData.enquiryStartedAt = new Date().toISOString()
userData.enquiryStatus = "Started"

Bot.setProperty(
  "USER_" + uid,
  userData,
  "json"
)

// Multilingual text
var text = {
  hinglish:
    "🤖 <b>Custom Telegram Bot</b>\n\n" +
    "Aapke custom bot project ke liye enquiry start ho gayi hai.\n\n" +
    "📝 Sabse pehle apna <b>naam</b> bhejiye.\n\n" +
    "Example: <i>Vrajesh</i>",

  en:
    "🤖 <b>Custom Telegram Bot</b>\n\n" +
    "Your custom bot project enquiry has started.\n\n" +
    "📝 First, please send your <b>name</b>.\n\n" +
    "Example: <i>John</i>",

  gu:
    "🤖 <b>કસ્ટમ ટેલિગ્રામ બોટ</b>\n\n" +
    "તમારા કસ્ટમ બોટ પ્રોજેક્ટની પૂછપરછ શરૂ થઈ ગઈ છે.\n\n" +
    "📝 સૌપ્રથમ તમારું <b>નામ</b> મોકલો.\n\n" +
    "ઉદાહરણ: <i>Vrajesh</i>"
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
function showBuildMessage(message, keyboard) {
  if (
    typeof request !== "undefined" &&
    request.message &&
    request.message.message_id
  ) {
    try {
      Api.editMessageText({
        chat_id: uid,
        message_id: request.message.message_id,
        text: message,
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
    text: message,
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

showBuildMessage(messageText, buttons)

// Start waiting for user's name
Bot.runCommand("BUILD_NAME")
