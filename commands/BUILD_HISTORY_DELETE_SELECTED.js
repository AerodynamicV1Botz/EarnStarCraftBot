/*CMD
  command: BUILD_HISTORY_DELETE_SELECTED
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
// SCRIPT 217 — UPDATED VERSION
// COMMAND NAME: BUILD_HISTORY_DELETE_SELECTED
// STEP 5.2.3.1.1.3.1.16
// 📁 BUILD_HISTORY_DELETE_SELECTED
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

if (typeof request !== "undefined" && request && request.id) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

var allKeys = Bot.getProperty("ENQUIRY_KEYS") || []
var userKeys = []

for (var i = 0; i < allKeys.length; i++) {
  var refId = allKeys[i]
  var enquiry = Bot.getProperty("ENQUIRY_" + refId)

  if (
    enquiry &&
    String(enquiry.userId) === String(uid) &&
    enquiry.historyDeleted !== true
  ) {
    userKeys.push(refId)
  }
}

var text = {
  hinglish:
    "🗑️ <b>SELECTED HISTORY DELETE</b>\n\n" +
    "Jis enquiry ko delete karna hai, uska button select karo.\n\n" +
    "⚠️ Delete karne ke baad history mein nahi dikhegi.",

  en:
    "🗑️ <b>DELETE SELECTED HISTORY</b>\n\n" +
    "Select the enquiry you want to delete.\n\n" +
    "⚠️ Deleted history will no longer appear.",

  gu:
    "🗑️ <b>પસંદ કરેલી હિસ્ટ્રી ડિલીટ</b>\n\n" +
    "જે enquiry ડિલીટ કરવી છે તે પસંદ કરો.\n\n" +
    "⚠️ ડિલીટ કર્યા પછી હિસ્ટ્રીમાં દેખાશે નહીં."
}

var buttons = []

if (userKeys.length === 0) {
  text = {
    hinglish:
      "📭 <b>KOI HISTORY NAHI MILI</b>\n\n" +
      "Delete karne ke liye koi enquiry available nahi hai.",

    en:
      "📭 <b>NO HISTORY FOUND</b>\n\n" +
      "There are no enquiries available to delete.",

    gu:
      "📭 <b>કોઈ હિસ્ટ્રી મળી નથી</b>\n\n" +
      "ડિલીટ કરવા માટે કોઈ enquiry ઉપલબ્ધ નથી."
  }

  buttons = [
    [
      { text: "📋 History", callback_data: "BUILD_HISTORY" }
    ],
    [
      { text: "🛠️ New Build", callback_data: "MENU_BUILD" }
    ],
    [
      { text: "🏠 Main Menu", callback_data: "BACK_MAIN_MENU" }
    ]
  ]
} else {
  for (var j = 0; j < userKeys.length; j++) {
    var currentRef = userKeys[j]
    var currentEnquiry = Bot.getProperty("ENQUIRY_" + currentRef) || {}

    var type = currentEnquiry.enquiryType || "Custom Project"
    var status = currentEnquiry.status || "Started"

    buttons.push([
      {
        text: "🗑️ " + currentRef + " • " + type + " • " + status,
        callback_data: "BUILD_HISTORY_DELETE " + currentRef
      }
    ])
  }

  if (lang === "en") {
    buttons.push([
      { text: "📋 View History", callback_data: "BUILD_HISTORY" }
    ])
    buttons.push([
      { text: "🧹 Delete All", callback_data: "BUILD_HISTORY_DELETE_ALL" }
    ])
    buttons.push([
      { text: "🏠 Main Menu", callback_data: "BACK_MAIN_MENU" }
    ])
  } else if (lang === "gu") {
    buttons.push([
      { text: "📋 હિસ્ટ્રી જુઓ", callback_data: "BUILD_HISTORY" }
    ])
    buttons.push([
      { text: "🧹 બધી ડિલીટ", callback_data: "BUILD_HISTORY_DELETE_ALL" }
    ])
    buttons.push([
      { text: "🏠 મુખ્ય મેનુ", callback_data: "BACK_MAIN_MENU" }
    ])
  } else {
    buttons.push([
      { text: "📋 History Dekho", callback_data: "BUILD_HISTORY" }
    ])
    buttons.push([
      { text: "🧹 Puri History Delete", callback_data: "BUILD_HISTORY_DELETE_ALL" }
    ])
    buttons.push([
      { text: "🏠 Main Menu", callback_data: "BACK_MAIN_MENU" }
    ])
  }
}

function showMenu(messageText, keyboard) {
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
    text: messageText,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: keyboard
    }
  })
}

showMenu(text[lang] || text.hinglish, buttons)
