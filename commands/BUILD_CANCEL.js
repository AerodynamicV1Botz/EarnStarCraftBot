/*CMD
  command: BUILD_CANCEL
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
// SCRIPT 206 — UPDATED VERSION
// COMMAND NAME: BUILD_CANCEL
// STEP 5.3.1
// 📁 Enquiry Cancellation Handler
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

// ---------- LANGUAGE TEXT ----------
var text = {
  hinglish: {
    title: "❌ <b>Enquiry Cancelled</b>",
    body:
      "Aapki current enquiry successfully cancel kar di gayi hai.\n\n" +
      "Aap jab chahein nayi enquiry submit kar sakte hain.",
    menu: "🏠 Main Menu",
    build: "🛠️ New Enquiry"
  },

  en: {
    title: "❌ <b>Enquiry Cancelled</b>",
    body:
      "Your current enquiry has been cancelled successfully.\n\n" +
      "You can submit a new enquiry whenever you want.",
    menu: "🏠 Main Menu",
    build: "🛠️ New Enquiry"
  },

  gu: {
    title: "❌ <b>પૂછપરછ રદ થઈ</b>",
    body:
      "તમારી હાલની પૂછપરછ સફળતાપૂર્વક રદ કરવામાં આવી છે.\n\n" +
      "તમે જ્યારે ઇચ્છો ત્યારે નવી પૂછપરછ મોકલી શકો છો.",
    menu: "🏠 મુખ્ય મેનુ",
    build: "🛠️ નવી પૂછપરછ"
  }
}

var t = text[lang] || text.hinglish

// ---------- CLEAR ACTIVE ENQUIRY ----------
userData.enquiryType = ""
userData.enquiryStartedAt = ""
userData.enquiryStatus = ""
userData.enquiryStep = 0
userData.enquiryName = ""
userData.enquiryContact = ""
userData.enquiryRequirements = ""
userData.enquiryRef = ""

Bot.setProperty(
  "USER_" + uid,
  userData,
  "json"
)

// ---------- CLEAR TEMPORARY DATA ----------
Bot.setProperty("BUILD_TYPE_" + uid, "", "string")
Bot.setProperty("SUPPORT_MODE_" + uid, "", "string")
Bot.setProperty("BUILD_NAME_" + uid, "", "string")
Bot.setProperty("BUILD_CONTACT_" + uid, "", "string")
Bot.setProperty("BUILD_REQUIREMENTS_" + uid, "", "string")

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: t.build,
      callback_data: "MENU_BUILD"
    }
  ],
  [
    {
      text: t.menu,
      callback_data: "BACK_MAIN_MENU"
    }
  ]
]

// ---------- SAME MESSAGE EDIT + FALLBACK ----------
function showMenu(text, buttons) {
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
    text: text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons
    }
  })
}

// ---------- FINAL RESPONSE ----------
showMenu(
  t.title + "\n\n" + t.body,
  buttons
)
