/*CMD
  command: BUILD_AUTOMATION
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
// SCRIPT 200 — UPDATED VERSION
// COMMAND NAME: BUILD_AUTOMATION
// STEP 6.2 — BUSINESS AUTOMATION ENQUIRY
// 📁 Automation Build Flow
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// Save build type
userData.enquiryType = "Business Automation"
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
  "Business Automation",
  "string"
)

// Multilingual text
var text = {
  hinglish:
    "⚙️ <b>BUSINESS AUTOMATION</b>\n\n" +
    "Aapko kaunsa process automate karvana hai?\n\n" +
    "Example:\n" +
    "• Order management\n" +
    "• Payment system\n" +
    "• Customer management\n" +
    "• Automatic notifications\n" +
    "• Admin panel\n\n" +
    "✍️ Apni requirements bhejo.",

  en:
    "⚙️ <b>BUSINESS AUTOMATION</b>\n\n" +
    "Tell us what process you want to automate.\n\n" +
    "Example:\n" +
    "• Order management\n" +
    "• Payment system\n" +
    "• Customer management\n" +
    "• Automatic notifications\n" +
    "• Admin panel\n\n" +
    "✍️ Please send your requirements.",

  gu:
    "⚙️ <b>બિઝનેસ ઓટોમેશન</b>\n\n" +
    "તમારે કઈ પ્રક્રિયા ઓટોમેટ કરાવવી છે તે જણાવો.\n\n" +
    "ઉદાહરણ:\n" +
    "• Order management\n" +
    "• Payment system\n" +
    "• Customer management\n" +
    "• Automatic notifications\n" +
    "• Admin panel\n\n" +
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
function showAutomationMessage(text, keyboard) {
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

showAutomationMessage(messageText, buttons)

// Continue to requirements
Bot.runCommand("BUILD_REQUIREMENTS")
