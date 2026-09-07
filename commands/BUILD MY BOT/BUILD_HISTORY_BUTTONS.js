/*CMD
  command: BUILD_HISTORY_BUTTONS
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
// SCRIPT 209 — UPDATED VERSION
// COMMAND NAME: BUILD_HISTORY_BUTTONS
// STEP 5.3.4 — ENQUIRY HISTORY BUTTONS
// 📁 Enquiry History Button Generator
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
    title: "📋 <b>Enquiry Selection</b>",
    empty: "⚠️ Koi enquiry available nahi hai.",
    view: "🧾 View Details",
    history: "📋 Enquiry History",
    build: "🛠️ New Enquiry",
    menu: "🏠 Main Menu"
  },

  en: {
    title: "📋 <b>Enquiry Selection</b>",
    empty: "⚠️ No enquiry is available.",
    view: "🧾 View Details",
    history: "📋 Enquiry History",
    build: "🛠️ New Enquiry",
    menu: "🏠 Main Menu"
  },

  gu: {
    title: "📋 <b>પૂછપરછ પસંદ કરો</b>",
    empty: "⚠️ કોઈ પૂછપરછ ઉપલબ્ધ નથી.",
    view: "🧾 વિગતો જુઓ",
    history: "📋 પૂછપરછનો ઇતિહાસ",
    build: "🛠️ નવી પૂછપરછ",
    menu: "🏠 મુખ્ય મેનુ"
  }
}

var t = text[lang] || text.hinglish

// ---------- GET USER ENQUIRIES ----------
var enquiryKeys = Bot.getProperty("ENQUIRY_KEYS") || []

if (!Array.isArray(enquiryKeys)) {
  enquiryKeys = []
}

var userEnquiries = []

for (var i = enquiryKeys.length - 1; i >= 0; i--) {
  var refId = enquiryKeys[i]
  var enquiry = Bot.getProperty("ENQUIRY_" + refId)

  if (
    enquiry &&
    String(enquiry.userId) === String(uid)
  ) {
    userEnquiries.push(enquiry)
  }
}

// ---------- CREATE BUTTONS ----------
var buttons = []

if (userEnquiries.length === 0) {
  buttons.push([
    {
      text: t.build,
      callback_data: "MENU_BUILD"
    }
  ])
} else {
  for (var j = 0; j < userEnquiries.length; j++) {
    var item = userEnquiries[j]
    var reference = item.refId || ""

    if (reference) {
      buttons.push([
        {
          text: t.view + " #" + reference,
          callback_data: "BUILD_HISTORY_DETAILS " + reference
        }
      ])
    }
  }

  buttons.push([
    {
      text: t.history,
      callback_data: "BUILD_HISTORY"
    }
  ])

  buttons.push([
    {
      text: t.build,
      callback_data: "MENU_BUILD"
    }
  ])
}

buttons.push([
  {
    text: t.menu,
    callback_data: "BACK_MAIN_MENU"
  }
])

// ---------- RESPONSE ----------
var responseText = t.title + "\n\n"

if (userEnquiries.length === 0) {
  responseText += t.empty
} else {
  responseText +=
    "👇 Apni enquiry ki details dekhne ke liye button select kijiye."
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

// ---------- SHOW BUTTONS ----------
showMenu(
  responseText,
  buttons
)
