/*CMD
  command: BUILD_HISTORY_EXPORT
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
// SCRIPT 218 — UPDATED VERSION
// COMMAND NAME: BUILD_HISTORY_EXPORT
// STEP 5.2.3.1.1.3.1.17
// 📁 BUILD_HISTORY_EXPORT
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
var history = []

for (var i = 0; i < allKeys.length; i++) {
  var refId = allKeys[i]
  var enquiry = Bot.getProperty("ENQUIRY_" + refId)

  if (
    enquiry &&
    String(enquiry.userId) === String(uid) &&
    enquiry.historyDeleted !== true
  ) {
    history.push(enquiry)
  }
}

var text = {
  hinglish:
    "📄 <b>ENQUIRY HISTORY SUMMARY</b>\n\n" +
    "Aapki total enquiries: <b>" + history.length + "</b>\n\n",

  en:
    "📄 <b>ENQUIRY HISTORY SUMMARY</b>\n\n" +
    "Your total enquiries: <b>" + history.length + "</b>\n\n",

  gu:
    "📄 <b>Enquiry હિસ્ટ્રી સારાંશ</b>\n\n" +
    "તમારી કુલ enquiries: <b>" + history.length + "</b>\n\n"
}

if (history.length === 0) {
  text = {
    hinglish:
      "📭 <b>NO HISTORY FOUND</b>\n\n" +
      "Aapki koi enquiry history available nahi hai.",

    en:
      "📭 <b>NO HISTORY FOUND</b>\n\n" +
      "Your enquiry history is empty.",

    gu:
      "📭 <b>કોઈ હિસ્ટ્રી મળી નથી</b>\n\n" +
      "તમારી enquiry હિસ્ટ્રી ખાલી છે."
  }
} else {
  for (var j = 0; j < history.length; j++) {
    var item = history[j]

    var ref = item.refId || "N/A"
    var type = item.enquiryType || "Custom Project"
    var name = item.name || "Not provided"
    var contact = item.contact || "Not provided"
    var status = item.status || "Started"
    var requirements = item.requirements || "Not provided"
    var createdAt = item.createdAt || "Not available"

    text.hinglish +=
      "━━━━━━━━━━━━━━━━━━\n" +
      "🧾 <b>Reference:</b> <code>" + ref + "</code>\n" +
      "🛠️ <b>Project:</b> " + type + "\n" +
      "👤 <b>Name:</b> " + name + "\n" +
      "📞 <b>Contact:</b> " + contact + "\n" +
      "📌 <b>Status:</b> " + status + "\n" +
      "📝 <b>Requirements:</b> " + requirements + "\n" +
      "🕒 <b>Created:</b> " + createdAt + "\n"

    text.en +=
      "━━━━━━━━━━━━━━━━━━\n" +
      "🧾 <b>Reference:</b> <code>" + ref + "</code>\n" +
      "🛠️ <b>Project:</b> " + type + "\n" +
      "👤 <b>Name:</b> " + name + "\n" +
      "📞 <b>Contact:</b> " + contact + "\n" +
      "📌 <b>Status:</b> " + status + "\n" +
      "📝 <b>Requirements:</b> " + requirements + "\n" +
      "🕒 <b>Created:</b> " + createdAt + "\n"

    text.gu +=
      "━━━━━━━━━━━━━━━━━━\n" +
      "🧾 <b>રેફરન્સ:</b> <code>" + ref + "</code>\n" +
      "🛠️ <b>પ્રોજેક્ટ:</b> " + type + "\n" +
      "👤 <b>નામ:</b> " + name + "\n" +
      "📞 <b>કોન્ટેક્ટ:</b> " + contact + "\n" +
      "📌 <b>સ્ટેટસ:</b> " + status + "\n" +
      "📝 <b>જરૂરિયાત:</b> " + requirements + "\n" +
      "🕒 <b>બનાવ્યું:</b> " + createdAt + "\n"
  }
}

var buttons = []

if (lang === "en") {
  buttons = [
    [
      { text: "📋 View History", callback_data: "BUILD_HISTORY" }
    ],
    [
      { text: "🗂️ History Menu", callback_data: "BUILD_HISTORY_MENU" }
    ],
    [
      { text: "🛠️ New Build", callback_data: "MENU_BUILD" }
    ],
    [
      { text: "🏠 Main Menu", callback_data: "BACK_MAIN_MENU" }
    ]
  ]
} else if (lang === "gu") {
  buttons = [
    [
      { text: "📋 હિસ્ટ્રી જુઓ", callback_data: "BUILD_HISTORY" }
    ],
    [
      { text: "🗂️ હિસ્ટ્રી મેનુ", callback_data: "BUILD_HISTORY_MENU" }
    ],
    [
      { text: "🛠️ નવું બિલ્ડ", callback_data: "MENU_BUILD" }
    ],
    [
      { text: "🏠 મુખ્ય મેનુ", callback_data: "BACK_MAIN_MENU" }
    ]
  ]
} else {
  buttons = [
    [
      { text: "📋 History Dekho", callback_data: "BUILD_HISTORY" }
    ],
    [
      { text: "🗂️ History Menu", callback_data: "BUILD_HISTORY_MENU" }
    ],
    [
      { text: "🛠️ New Build", callback_data: "MENU_BUILD" }
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
