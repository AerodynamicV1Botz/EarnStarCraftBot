/*CMD
  command: BUILD_BROADCAST
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
// SCRIPT 202 — UPDATED VERSION
// COMMAND NAME: BUILD_BROADCAST
// STEP 6.4 — BROADCAST SYSTEM ENQUIRY
// 📁 Broadcast Build Flow
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// Save build type
userData.enquiryType = "Broadcast System"
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
  "Broadcast System",
  "string"
)

// Multilingual text
var text = {
  hinglish:
    "📢 <b>BROADCAST SYSTEM</b>\n\n" +
    "Aapko kis type ka broadcast system chahiye?\n\n" +
    "Example:\n" +
    "• Sabhi users ko message bhejna\n" +
    "• Scheduled broadcasts\n" +
    "• Multi-language broadcast\n" +
    "• Admin broadcast panel\n" +
    "• Automatic user management\n\n" +
    "✍️ Apni requirements bhejo.",

  en:
    "📢 <b>BROADCAST SYSTEM</b>\n\n" +
    "What kind of broadcast system do you need?\n\n" +
    "Example:\n" +
    "• Send messages to all users\n" +
    "• Scheduled broadcasts\n" +
    "• Multi-language broadcast\n" +
    "• Admin broadcast panel\n" +
    "• Automatic user management\n\n" +
    "✍️ Send your requirements.",

  gu:
    "📢 <b>બ્રોડકાસ્ટ સિસ્ટમ</b>\n\n" +
    "તમારે કેવો બ્રોડકાસ્ટ સિસ્ટમ જોઈએ છે?\n\n" +
    "ઉદાહરણ:\n" +
    "• બધા users ને મેસેજ મોકલવો\n" +
    "• Scheduled broadcasts\n" +
    "• Multi-language broadcast\n" +
    "• Admin broadcast panel\n" +
    "• Automatic user management\n\n" +
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
function showBroadcastMessage(text, keyboard) {
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

showBroadcastMessage(messageText, buttons)

// Continue to requirements
Bot.runCommand("BUILD_REQUIREMENTS")
