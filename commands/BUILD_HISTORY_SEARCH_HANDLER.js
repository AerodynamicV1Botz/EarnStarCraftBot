/*CMD
  command: BUILD_HISTORY_SEARCH_HANDLER
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
// SCRIPT 220 — UPDATED VERSION
// COMMAND NAME: BUILD_HISTORY_SEARCH_HANDLER
// STEP 5.2.3.1.1.3.1.19
// 📁 BUILD_HISTORY_SEARCH_HANDLER
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

var searchId = ""

if (
  typeof message !== "undefined" &&
  message &&
  message.text
) {
  searchId = String(message.text).trim()
}

if (!searchId && typeof params !== "undefined" && params) {
  searchId = String(params).trim()
}

if (!searchId) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ Reference ID receive nahi hui.",
    parse_mode: "HTML"
  })
  return
}

searchId = searchId.toUpperCase()

var enquiry = Bot.getProperty("ENQUIRY_" + searchId)

var text = {
  hinglish: "",
  en: "",
  gu: ""
}

var buttons = []

if (!enquiry) {
  text.hinglish =
    "❌ <b>ENQUIRY NAHI MILI</b>\n\n" +
    "Reference ID galat hai ya enquiry available nahi hai."

  text.en =
    "❌ <b>ENQUIRY NOT FOUND</b>\n\n" +
    "The Reference ID is incorrect or the enquiry is unavailable."

  text.gu =
    "❌ <b>ENQUIRY મળી નથી</b>\n\n" +
    "Reference ID ખોટી છે અથવા enquiry ઉપલબ્ધ નથી."

  buttons = [
    [
      { text: "🔎 Search Again", callback_data: "BUILD_HISTORY_SEARCH" }
    ],
    [
      { text: "📋 View History", callback_data: "BUILD_HISTORY" }
    ],
    [
      { text: "🗂️ History Menu", callback_data: "BUILD_HISTORY_MENU" }
    ],
    [
      { text: "🏠 Main Menu", callback_data: "BACK_MAIN_MENU" }
    ]
  ]
} else if (
  String(enquiry.userId) !== String(uid) ||
  enquiry.historyDeleted === true
) {
  text.hinglish =
    "🔒 <b>ACCESS DENIED</b>\n\n" +
    "Yeh enquiry aapki history mein available nahi hai."

  text.en =
    "🔒 <b>ACCESS DENIED</b>\n\n" +
    "This enquiry is not available in your history."

  text.gu =
    "🔒 <b>ઍક્સેસ નકારવામાં આવ્યો</b>\n\n" +
    "આ enquiry તમારી હિસ્ટ્રીમાં ઉપલબ્ધ નથી."

  buttons = [
    [
      { text: "📋 View History", callback_data: "BUILD_HISTORY" }
    ],
    [
      { text: "🗂️ History Menu", callback_data: "BUILD_HISTORY_MENU" }
    ],
    [
      { text: "🏠 Main Menu", callback_data: "BACK_MAIN_MENU" }
    ]
  ]
} else {
  var refId = enquiry.refId || searchId
  var type = enquiry.enquiryType || "Custom Project"
  var name = enquiry.name || "Not provided"
  var contact = enquiry.contact || "Not provided"
  var requirements = enquiry.requirements || "Not provided"
  var status = enquiry.status || "Started"
  var createdAt = enquiry.createdAt || "Not available"

  text.hinglish =
    "🔎 <b>ENQUIRY FOUND</b>\n\n" +
    "🧾 <b>Reference:</b> <code>" + refId + "</code>\n" +
    "🛠️ <b>Project:</b> " + type + "\n" +
    "👤 <b>Name:</b> " + name + "\n" +
    "📞 <b>Contact:</b> " + contact + "\n" +
    "📌 <b>Status:</b> " + status + "\n" +
    "📝 <b>Requirements:</b> " + requirements + "\n" +
    "🕒 <b>Created:</b> " + createdAt

  text.en =
    "🔎 <b>ENQUIRY FOUND</b>\n\n" +
    "🧾 <b>Reference:</b> <code>" + refId + "</code>\n" +
    "🛠️ <b>Project:</b> " + type + "\n" +
    "👤 <b>Name:</b> " + name + "\n" +
    "📞 <b>Contact:</b> " + contact + "\n" +
    "📌 <b>Status:</b> " + status + "\n" +
    "📝 <b>Requirements:</b> " + requirements + "\n" +
    "🕒 <b>Created:</b> " + createdAt

  text.gu =
    "🔎 <b>ENQUIRY મળી છે</b>\n\n" +
    "🧾 <b>રેફરન્સ:</b> <code>" + refId + "</code>\n" +
    "🛠️ <b>પ્રોજેક્ટ:</b> " + type + "\n" +
    "👤 <b>નામ:</b> " + name + "\n" +
    "📞 <b>કોન્ટેક્ટ:</b> " + contact + "\n" +
    "📌 <b>સ્ટેટસ:</b> " + status + "\n" +
    "📝 <b>જરૂરિયાત:</b> " + requirements + "\n" +
    "🕒 <b>બનાવ્યું:</b> " + createdAt

  buttons = [
    [
      {
        text: "🧾 View Details",
        callback_data: "BUILD_HISTORY_DETAILS " + refId
      }
    ],
    [
      {
        text: "🗑️ Delete Enquiry",
        callback_data: "BUILD_HISTORY_DELETE " + refId
      }
    ],
    [
      { text: "🔎 Search Again", callback_data: "BUILD_HISTORY_SEARCH" }
    ],
    [
      { text: "📋 View History", callback_data: "BUILD_HISTORY" }
    ],
    [
      { text: "🗂️ History Menu", callback_data: "BUILD_HISTORY_MENU" }
    ],
    [
      { text: "🏠 Main Menu", callback_data: "BACK_MAIN_MENU" }
    ]
  ]
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
