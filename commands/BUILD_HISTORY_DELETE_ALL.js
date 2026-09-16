/*CMD
  command: BUILD_HISTORY_DELETE_ALL
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
// SCRIPT 212 — UPDATED VERSION
// COMMAND NAME: BUILD_HISTORY_DELETE_ALL
// STEP 5.3.7 — DELETE ALL ENQUIRY HISTORY
// 📁 Enquiry History Delete All
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
    title: "🗑️ <b>Delete All History</b>",
    confirm:
      "⚠️ Kya aap apni <b>saari enquiry history</b> clear karna chahte hain?\n\n" +
      "Original enquiry records safe rahenge.",
    success:
      "✅ <b>History Cleared</b>\n\n" +
      "Aapki saari enquiry history clear kar di gayi hai.",
    empty: "📭 Aapki enquiry history pehle se empty hai.",
    yes: "✅ Yes, Clear All",
    no: "↩️ No, Go Back",
    history: "📋 Enquiry History",
    menu: "🏠 Main Menu",
    newBuild: "🛠️ New Enquiry"
  },

  en: {
    title: "🗑️ <b>Delete All History</b>",
    confirm:
      "⚠️ Do you want to clear your <b>entire enquiry history</b>?\n\n" +
      "Original enquiry records will remain safe.",
    success:
      "✅ <b>History Cleared</b>\n\n" +
      "Your entire enquiry history has been cleared.",
    empty: "📭 Your enquiry history is already empty.",
    yes: "✅ Yes, Clear All",
    no: "↩️ No, Go Back",
    history: "📋 Enquiry History",
    menu: "🏠 Main Menu",
    newBuild: "🛠️ New Enquiry"
  },

  gu: {
    title: "🗑️ <b>બધો ઇતિહાસ ડિલીટ કરો</b>",
    confirm:
      "⚠️ શું તમે તમારો <b>આખો પૂછપરછનો ઇતિહાસ</b> સાફ કરવા માંગો છો?\n\n" +
      "મૂળ પૂછપરછના રેકોર્ડ સુરક્ષિત રહેશે.",
    success:
      "✅ <b>ઇતિહાસ સાફ થઈ ગયો</b>\n\n" +
      "તમારો આખો પૂછપરછનો ઇતિહાસ સાફ કરવામાં આવ્યો છે.",
    empty: "📭 તમારો પૂછપરછનો ઇતિહાસ પહેલેથી ખાલી છે.",
    yes: "✅ હા, બધું સાફ કરો",
    no: "↩️ પાછા જાઓ",
    history: "📋 પૂછપરછનો ઇતિહાસ",
    menu: "🏠 મુખ્ય મેનુ",
    newBuild: "🛠️ નવી પૂછપરછ"
  }
}

var t = text[lang] || text.hinglish

// ---------- GET ENQUIRY HISTORY ----------
var enquiryKeys = Bot.getProperty("ENQUIRY_KEYS") || []

if (!Array.isArray(enquiryKeys)) {
  enquiryKeys = []
}

var userEnquiries = []

for (var i = 0; i < enquiryKeys.length; i++) {
  var refId = enquiryKeys[i]
  var enquiry = Bot.getProperty("ENQUIRY_" + refId)

  if (
    enquiry &&
    String(enquiry.userId) === String(uid)
  ) {
    userEnquiries.push(refId)
  }
}

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

// ---------- EMPTY HISTORY ----------
if (userEnquiries.length === 0) {
  showMenu(
    t.title + "\n\n" + t.empty,
    [
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
  )
  return
}

// ---------- CONFIRMATION BUTTONS ----------
var confirmButtons = [
  [
    {
      text: t.yes,
      callback_data: "BUILD_HISTORY_DELETE_ALL_CONFIRM"
    }
  ],
  [
    {
      text: t.no,
      callback_data: "BUILD_HISTORY"
    }
  ]
]

// ---------- SHOW CONFIRMATION ----------
showMenu(
  t.title + "\n\n" + t.confirm,
  confirmButtons
)
