/*CMD
  command: BUILD_HISTORY_DELETE_CONFIRM
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
// SCRIPT 211 — UPDATED VERSION
// COMMAND NAME: BUILD_HISTORY_DELETE_CONFIRM
// STEP 5.3.6 — CONFIRM ENQUIRY DELETE
// 📁 Enquiry History Delete Confirmation
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

// ---------- GET REFERENCE ID ----------
var refId = ""

if (
  typeof params !== "undefined" &&
  params
) {
  refId = String(params).trim()
}

if (
  !refId &&
  typeof message !== "undefined" &&
  message
) {
  refId = String(message).trim()
}

if (
  !refId &&
  typeof request !== "undefined" &&
  request.data
) {
  var callbackParts = String(request.data).split(" ")
  refId = callbackParts[1] || ""
}

// ---------- LANGUAGE TEXT ----------
var text = {
  hinglish: {
    title: "🗑️ <b>Enquiry Deleted</b>",
    success:
      "Aapki enquiry history se remove kar di gayi hai.\n\n" +
      "Original enquiry record safe rahega.",
    invalid: "⚠️ Valid enquiry reference nahi mili.",
    notFound: "⚠️ Enquiry record nahi mila.",
    accessDenied: "⚠️ Yeh enquiry aapki nahi hai.",
    history: "📋 Enquiry History",
    menu: "🏠 Main Menu",
    newBuild: "🛠️ New Enquiry"
  },

  en: {
    title: "🗑️ <b>Enquiry Deleted</b>",
    success:
      "The enquiry has been removed from your history.\n\n" +
      "The original enquiry record will remain safe.",
    invalid: "⚠️ A valid enquiry reference was not found.",
    notFound: "⚠️ Enquiry record was not found.",
    accessDenied: "⚠️ This enquiry does not belong to you.",
    history: "📋 Enquiry History",
    menu: "🏠 Main Menu",
    newBuild: "🛠️ New Enquiry"
  },

  gu: {
    title: "🗑️ <b>પૂછપરછ ડિલીટ થઈ</b>",
    success:
      "પૂછપરછ તમારા ઇતિહાસમાંથી દૂર કરવામાં આવી છે.\n\n" +
      "મૂળ પૂછપરછનો રેકોર્ડ સુરક્ષિત રહેશે.",
    invalid: "⚠️ માન્ય પૂછપરછ રેફરન્સ મળ્યું નથી.",
    notFound: "⚠️ પૂછપરછનો રેકોર્ડ મળ્યો નથી.",
    accessDenied: "⚠️ આ પૂછપરછ તમારી નથી.",
    history: "📋 પૂછપરછનો ઇતિહાસ",
    menu: "🏠 મુખ્ય મેનુ",
    newBuild: "🛠️ નવી પૂછપરછ"
  }
}

var t = text[lang] || text.hinglish

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

// ---------- DEFAULT BUTTONS ----------
var defaultButtons = [
  [
    {
      text: t.history,
      callback_data: "BUILD_HISTORY"
    }
  ],
  [
    {
      text: t.newBuild,
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

// ---------- VALIDATE REFERENCE ----------
if (!refId) {
  showMenu(
    t.title + "\n\n" + t.invalid,
    defaultButtons
  )
  return
}

// ---------- GET ENQUIRY ----------
var enquiry = Bot.getProperty("ENQUIRY_" + refId)

if (!enquiry) {
  showMenu(
    t.title + "\n\n" + t.notFound,
    defaultButtons
  )
  return
}

// ---------- SECURITY CHECK ----------
if (
  String(enquiry.userId) !== String(uid)
) {
  showMenu(
    t.title + "\n\n" + t.accessDenied,
    defaultButtons
  )
  return
}

// ---------- REMOVE FROM HISTORY ----------
var enquiryKeys = Bot.getProperty("ENQUIRY_KEYS") || []

if (!Array.isArray(enquiryKeys)) {
  enquiryKeys = []
}

var updatedKeys = []

for (var i = 0; i < enquiryKeys.length; i++) {
  if (String(enquiryKeys[i]) !== String(refId)) {
    updatedKeys.push(enquiryKeys[i])
  }
}

Bot.setProperty(
  "ENQUIRY_KEYS",
  updatedKeys,
  "json"
)

// ---------- MARK RECORD AS HIDDEN ----------
enquiry.historyDeleted = true
enquiry.historyDeletedAt = new Date().toISOString()

Bot.setProperty(
  "ENQUIRY_" + refId,
  enquiry,
  "json"
)

// ---------- CLEAR CURRENT USER ENQUIRY IF SAME ----------
if (
  userData.enquiryRef &&
  String(userData.enquiryRef) === String(refId)
) {
  userData.enquiryRef = ""
  userData.enquiryStatus = ""
  userData.enquiryStep = 0

  Bot.setProperty(
    "USER_" + uid,
    userData,
    "json"
  )
}

// ---------- SUCCESS RESPONSE ----------
showMenu(
  t.title + "\n\n" + t.success,
  defaultButtons
)
