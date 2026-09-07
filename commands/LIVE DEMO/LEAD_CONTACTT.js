/*CMD
  command: LEAD_CONTACTT
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
// SCRIPT 149 — UPDATED VERSION
// COMMAND NAME: LEAD_CONTACT
// STEP 5.4.1.3 — CONTACT DETAILS
// 📁 Lead Collection → Contact Input
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

// ---------- TEXT ----------
var text = ""

if (lang == "english") {
  text =
    "📱 <b>Contact Details</b>\n\n" +
    "Please enter your mobile number or contact details.\n\n" +
    "Example: 9876543210"
} else if (lang == "gujarati") {
  text =
    "📱 <b>સંપર્ક વિગતો</b>\n\n" +
    "કૃપા કરીને તમારો મોબાઇલ નંબર અથવા સંપર્ક વિગતો દાખલ કરો.\n\n" +
    "ઉદાહરણ: 9876543210"
} else {
  text =
    "📱 <b>Contact Details</b>\n\n" +
    "Apna mobile number ya contact details enter karo.\n\n" +
    "Example: 9876543210"
}

// ---------- SAVE STEP ----------
Bot.setProperty(
  "LEAD_STEP_" + uid,
  "CONTACT",
  "string"
)

// ---------- BUTTON TEXT ----------
var backText = "🔙 Back"
var cancelText = "❌ Cancel"

if (lang == "gujarati") {
  backText = "🔙 પાછા"
  cancelText = "❌ રદ કરો"
}

// ---------- SAME MESSAGE EDIT ----------
function showLeadContact(messageText, buttons) {
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
      text: backText,
      callback_data: "LEAD_START"
    },
    {
      text: cancelText,
      callback_data: "DEMO_LEAD"
    }
  ]
]

// ---------- SHOW SCREEN ----------
showLeadContact(text, buttons)
