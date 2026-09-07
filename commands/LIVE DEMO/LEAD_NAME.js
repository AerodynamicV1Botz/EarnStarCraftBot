/*CMD
  command: LEAD_NAME
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
// SCRIPT 147 — UPDATED VERSION
// COMMAND NAME: LEAD_NAME
// STEP 5.4.1.1 — CUSTOMER NAME
// 📁 Lead Collection → Name Input
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
    "👤 <b>Customer Name</b>\n\n" +
    "Please enter your full name.\n\n" +
    "Example: Rahul Sharma"
} else if (lang == "gujarati") {
  text =
    "👤 <b>Customer નું નામ</b>\n\n" +
    "કૃપા કરીને તમારું પૂરું નામ દાખલ કરો.\n\n" +
    "ઉદાહરણ: Rahul Sharma"
} else {
  text =
    "👤 <b>Customer Ka Naam</b>\n\n" +
    "Apna full name enter karo.\n\n" +
    "Example: Rahul Sharma"
}

// ---------- SAVE STEP ----------
Bot.setProperty(
  "LEAD_STEP_" + uid,
  "NAME",
  "string"
)

// ---------- BUTTON TEXT ----------
var backText = "🔙 Back"
var cancelText = "❌ Cancel"

if (lang == "english") {
  backText = "🔙 Back"
  cancelText = "❌ Cancel"
} else if (lang == "gujarati") {
  backText = "🔙 પાછા"
  cancelText = "❌ રદ કરો"
}

// ---------- SAME MESSAGE EDIT ----------
function showLeadName(messageText, buttons) {
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
showLeadName(text, buttons)
