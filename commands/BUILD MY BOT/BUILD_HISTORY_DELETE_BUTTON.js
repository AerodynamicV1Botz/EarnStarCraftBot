/*CMD
  command: BUILD_HISTORY_DELETE_BUTTON
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
// SCRIPT 214 — UPDATED VERSION
// COMMAND NAME: BUILD_HISTORY_DELETE_BUTTON
// STEP 5.3.9 — ENQUIRY DELETE BUTTON
// 📁 Enquiry History Delete Button
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
    title: "🧾 <b>Enquiry Details</b>",
    notFound: "⚠️ Enquiry details nahi mili.",
    invalid: "⚠️ Valid enquiry reference select kijiye.",
    delete: "🗑️ Delete This Enquiry",
    history: "📋 Enquiry History",
    build: "🛠️ New Enquiry",
    menu: "🏠 Main Menu"
  },

  en: {
    title: "🧾 <b>Enquiry Details</b>",
    notFound: "⚠️ Enquiry details were not found.",
    invalid: "⚠️ Please select a valid enquiry reference.",
    delete: "🗑️ Delete This Enquiry",
    history: "📋 Enquiry History",
    build: "🛠️ New Enquiry",
    menu: "🏠 Main Menu"
  },

  gu: {
    title: "🧾 <b>પૂછપરછની વિગતો</b>",
    notFound: "⚠️ પૂછપરછની વિગતો મળી નથી.",
    invalid: "⚠️ માન્ય પૂછપરછ પસંદ કરો.",
    delete: "🗑️ આ પૂછપરછ ડિલીટ કરો",
    history: "📋 પૂછપરછનો ઇતિહાસ",
    build: "🛠️ નવી પૂછપરછ",
    menu: "🏠 મુખ્ય મેનુ"
  }
}

var t = text[lang] || text.hinglish

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: t.delete,
      callback_data: "BUILD_HISTORY_DELETE " + refId
    }
  ],
  [
    {
      text: t.history,
      callback_data: "BUILD_HISTORY"
    }
  ],
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

// ---------- VALIDATE REFERENCE ----------
if (!refId) {
  showMenu(
    t.title + "\n\n" + t.invalid,
    buttons
  )
  return
}

// ---------- GET ENQUIRY ----------
var enquiry = Bot.getProperty("ENQUIRY_" + refId)

if (!enquiry) {
  showMenu(
    t.title + "\n\n" + t.notFound,
    buttons
  )
  return
}

// ---------- SECURITY CHECK ----------
if (
  String(enquiry.userId) !== String(uid)
) {
  showMenu(
    t.title + "\n\n" + t.notFound,
    buttons
  )
  return
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

// ---------- SHOW DETAILS WITH DELETE BUTTON ----------
showMenu(
  t.title +
    "\n\n" +
    "🔖 <b>Reference:</b> <code>" +
    refId +
    "</code>\n\n" +
    "👇 Neeche se action select kijiye.",
  buttons
)
