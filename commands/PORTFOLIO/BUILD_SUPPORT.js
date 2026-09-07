/*CMD
  command: BUILD_SUPPORT
  help: 
  need_reply: false
  auto_retry_time: 
  folder: PORTFOLIO

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 201 — UPDATED VERSION
// COMMAND NAME: BUILD_SUPPORT
// STEP 6.3 — SUPPORT BOT ENQUIRY
// 📁 Support Build Flow
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// Save support mode
userData.enquiryType = "Support Bot"
userData.enquiryStartedAt = new Date().toISOString()
userData.enquiryStep = 1
userData.enquiryStatus = "Started"

Bot.setProperty(
  "USER_" + uid,
  userData,
  "json"
)

Bot.setProperty(
  "SUPPORT_MODE_" + uid,
  "waiting",
  "string"
)

// Multilingual text
var text = {
  hinglish:
    "🛟 <b>SUPPORT BOT REQUEST</b>\n\n" +
    "Apni support bot requirements ek hi message mein bhejo.\n\n" +
    "📝 <b>Batao:</b>\n" +
    "• Kis type ka support bot chahiye?\n" +
    "• FAQ, tickets ya admin chat?\n" +
    "• Kaunse features chahiye?\n" +
    "• Koi custom workflow ya integrations?\n\n" +
    "💡 Complete project description bhi bhej sakte ho.",

  en:
    "🛟 <b>SUPPORT BOT REQUEST</b>\n\n" +
    "Please send your support bot requirements in one message.\n\n" +
    "📝 <b>Tell us:</b>\n" +
    "• What type of support bot do you need?\n" +
    "• FAQ, tickets or admin chat?\n" +
    "• Which features do you want?\n" +
    "• Any custom workflow or integrations?\n\n" +
    "💡 You can also send a complete project description.",

  gu:
    "🛟 <b>સપોર્ટ બોટ રિક્વેસ્ટ</b>\n\n" +
    "તમારી સપોર્ટ બોટની જરૂરિયાતો એક જ મેસેજમાં મોકલો.\n\n" +
    "📝 <b>જણાવો:</b>\n" +
    "• કયા પ્રકારનો સપોર્ટ બોટ જોઈએ છે?\n" +
    "• FAQ, tickets અથવા admin chat?\n" +
    "• કયા features જોઈએ છે?\n" +
    "• કોઈ custom workflow અથવા integrations?\n\n" +
    "💡 તમે સંપૂર્ણ પ્રોજેક્ટ વર્ણન પણ મોકલી શકો છો."
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
function showSupportMessage(text, keyboard) {
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

showSupportMessage(messageText, buttons)

// Continue to support request text
Bot.runCommand("SUPPORT_REQUEST_TEXT")
