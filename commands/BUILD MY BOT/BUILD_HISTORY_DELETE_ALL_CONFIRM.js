/*CMD
  command: BUILD_HISTORY_DELETE_ALL_CONFIRM
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
// SCRIPT 213 — UPDATED VERSION
// COMMAND NAME: BUILD_HISTORY_DELETE_ALL_CONFIRM
// STEP 5.3.8 — CONFIRM DELETE ALL HISTORY
// 📁 Enquiry History Delete All Confirmation
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
    title: "✅ <b>History Cleared</b>",
    success:
      "Aapki saari enquiry history clear kar di gayi hai.\n\n" +
      "Original enquiry records safe rahenge.",
    history: "📋 Enquiry History",
    newBuild: "🛠️ New Enquiry",
    menu: "🏠 Main Menu"
  },

  en: {
    title: "✅ <b>History Cleared</b>",
    success:
      "Your entire enquiry history has been cleared.\n\n" +
      "Original enquiry records will remain safe.",
    history: "📋 Enquiry History",
    newBuild: "🛠️ New Enquiry",
    menu: "🏠 Main Menu"
  },

  gu: {
    title: "✅ <b>ઇતિહાસ સાફ થઈ ગયો</b>",
    success:
      "તમારો આખો પૂછપરછનો ઇતિહાસ સાફ કરવામાં આવ્યો છે.\n\n" +
      "મૂળ પૂછપરછના રેકોર્ડ સુરક્ષિત રહેશે.",
    history: "📋 પૂછપરછનો ઇતિહાસ",
    newBuild: "🛠️ નવી પૂછપરછ",
    menu: "🏠 મુખ્ય મેનુ"
  }
}

var t = text[lang] || text.hinglish

// ---------- GET HISTORY ----------
var enquiryKeys = Bot.getProperty("ENQUIRY_KEYS") || []

if (!Array.isArray(enquiryKeys)) {
  enquiryKeys = []
}

// ---------- MARK USER ENQUIRIES AS HIDDEN ----------
for (var i = 0; i < enquiryKeys.length; i++) {
  var refId = enquiryKeys[i]
  var enquiry = Bot.getProperty("ENQUIRY_" + refId)

  if (
    enquiry &&
    String(enquiry.userId) === String(uid)
  ) {
    enquiry.historyDeleted = true
    enquiry.historyDeletedAt = new Date().toISOString()

    Bot.setProperty(
      "ENQUIRY_" + refId,
      enquiry,
      "json"
    )
  }
}

// ---------- REMOVE USER ENQUIRIES FROM INDEX ----------
var updatedKeys = []

for (var j = 0; j < enquiryKeys.length; j++) {
  var currentRef = enquiryKeys[j]
  var currentEnquiry = Bot.getProperty(
    "ENQUIRY_" + currentRef
  )

  if (
    !currentEnquiry ||
    String(currentEnquiry.userId) !== String(uid)
  ) {
    updatedKeys.push(currentRef)
  }
}

Bot.setProperty(
  "ENQUIRY_KEYS",
  updatedKeys,
  "json"
)

// ---------- CLEAR CURRENT ENQUIRY ----------
userData.enquiryRef = ""
userData.enquiryStatus = ""
userData.enquiryStep = 0

Bot.setProperty(
  "USER_" + uid,
  userData,
  "json"
)

// ---------- BUTTONS ----------
var buttons = [
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

// ---------- SUCCESS RESPONSE ----------
showMenu(
  t.title + "\n\n" + t.success,
  buttons
)
