/*CMD
  command: ORDER_CUSTOM
  help: 
  need_reply: false
  auto_retry_time: 
  folder: PRICING

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 48 — UPDATED VERSION
// COMMAND NAME: ORDER_CUSTOM
// STEP 4.4.1 — CUSTOM ORDER REQUEST
// 📁 MAIN MENU → 📁 PRICING → CUSTOM PACKAGE → ORDER
// 🌐 Language support included
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================

// ---------- CALLBACK RESPONSE ----------
if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

// ---------- USER DATA ----------
var uid = user.telegramid
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// ---------- SAVE CUSTOM MODE ----------
Bot.setProperty(
  "CUSTOM_MODE_" + uid,
  "waiting",
  "string"
)

// ---------- TEXT ----------
var text = ""

if (lang == "english") {
  text =
    "💎 <b>Custom Bot Request</b>\n\n" +
    "Please send your complete bot idea and requirements in one message.\n\n" +
    "📝 <b>Tell us:</b>\n" +
    "• What type of bot do you need?\n" +
    "• Which features do you want?\n" +
    "• Any API or external integrations?\n" +
    "• Do you have a budget or deadline?\n\n" +
    "💡 You can also send a complete project description.\n\n" +
    "⚠️ Please send your requirements in your next message."

} else if (lang == "gujarati") {
  text =
    "💎 <b>કસ્ટમ બોટ રિક્વેસ્ટ</b>\n\n" +
    "તમારી complete bot idea અને requirements એક જ મેસેજમાં મોકલો.\n\n" +
    "📝 <b>જણાવો:</b>\n" +
    "• કયા પ્રકારનો બોટ જોઈએ છે?\n" +
    "• કયા features જોઈએ છે?\n" +
    "• કોઈ API અથવા external integrations?\n" +
    "• Budget અથવા deadline નક્કી છે?\n\n" +
    "💡 તમે complete project description પણ મોકલી શકો છો.\n\n" +
    "⚠️ તમારી requirements હવેના મેસેજમાં મોકલો."

} else {
  text =
    "💎 <b>Custom Bot Request</b>\n\n" +
    "Apni complete bot idea aur requirements ek hi message mein bhejo.\n\n" +
    "📝 <b>Batao:</b>\n" +
    "• Kis type ka bot chahiye?\n" +
    "• Kaunse features chahiye?\n" +
    "• Koi API ya external integrations?\n" +
    "• Budget ya deadline decide hai?\n\n" +
    "💡 Complete project description bhi bhej sakte ho.\n\n" +
    "⚠️ Apni requirements ab next message mein bhejo."
}

// ---------- MESSAGE ID ----------
var messageId = null

if (
  typeof request !== "undefined" &&
  request &&
  request.message &&
  request.message.message_id
) {
  messageId = request.message.message_id
}

// ---------- INLINE KEYBOARD ----------
var keyboard = {
  inline_keyboard: [
    [
      {
        text: lang == "english"
          ? "❌ Cancel"
          : lang == "gujarati"
          ? "❌ રદ કરો"
          : "❌ Cancel",
        callback_data: "PRICE_CUSTOM"
      }
    ],
    [
      {
        text: lang == "english"
          ? "🏠 Main Menu"
          : lang == "gujarati"
          ? "🏠 મુખ્ય મેનુ"
          : "🏠 Main Menu",
        callback_data: "MAIN_MENU"
      }
    ]
  ]
}

// ---------- EDIT OR SEND ----------
if (messageId) {
  try {
    Api.editMessageText({
      chat_id: uid,
      message_id: messageId,
      text: text,
      parse_mode: "HTML",
      reply_markup: keyboard
    })
  } catch (e) {
    try {
      Api.deleteMessage({
        chat_id: uid,
        message_id: messageId
      })
    } catch (deleteError) {}

    Api.sendMessage({
      chat_id: uid,
      text: text,
      parse_mode: "HTML",
      reply_markup: keyboard
    })
  }
} else {
  Api.sendMessage({
    chat_id: uid,
    text: text,
    parse_mode: "HTML",
    reply_markup: keyboard
  })
}

// ---------- NEXT STEP ----------
Bot.runCommand("CUSTOM_REQUEST_TEXT")
