/*CMD
  command: BUILD_HISTORY_DELETE
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
// SCRIPT 210 — UPDATED VERSION
// COMMAND NAME: BUILD_HISTORY_DELETE
// STEP 5.3.5 — DELETE ENQUIRY HISTORY
// 📁 Enquiry History Delete
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
    title: "🗑️ <b>Delete Enquiry</b>",
    confirm:
      "Kya aap is enquiry ko delete karna chahte hain?\n\n" +
      "🔖 Reference: <code>",
    warning:
      "</code>\n\n⚠️ Delete karne ke baad history se yeh enquiry remove ho jayegi.",
    deleted:
      "✅ <b>Enquiry Deleted</b>\n\n" +
      "Aapki enquiry history se enquiry remove kar di gayi hai.",
    notFound: "⚠️ Enquiry nahi mili.",
    invalid: "⚠️ Valid enquiry reference select kijiye.",
    accessDenied: "⚠️ Yeh enquiry aapki nahi hai.",
    yes: "✅ Yes, Delete",
    no: "↩️ No, Go Back",
    history: "📋 Enquiry History",
    menu: "🏠 Main Menu"
  },

  en: {
    title: "🗑️ <b>Delete Enquiry</b>",
    confirm:
      "Do you want to delete this enquiry?\n\n" +
      "🔖 Reference: <code>",
    warning:
      "</code>\n\n⚠️ This enquiry will be removed from your history.",
    deleted:
      "✅ <b>Enquiry Deleted</b>\n\n" +
      "The enquiry has been removed from your history.",
    notFound: "⚠️ Enquiry was not found.",
    invalid: "⚠️ Please select a valid enquiry reference.",
    accessDenied: "⚠️ This enquiry does not belong to you.",
    yes: "✅ Yes, Delete",
    no: "↩️ No, Go Back",
    history: "📋 Enquiry History",
    menu: "🏠 Main Menu"
  },

  gu: {
    title: "🗑️ <b>પૂછપરછ ડિલીટ કરો</b>",
    confirm:
      "શું તમે આ પૂછપરછ ડિલીટ કરવા માંગો છો?\n\n" +
      "🔖 રેફરન્સ: <code>",
    warning:
      "</code>\n\n⚠️ આ પૂછપરછ તમારા ઇતિહાસમાંથી દૂર થઈ જશે.",
    deleted:
      "✅ <b>પૂછપરછ ડિલીટ થઈ</b>\n\n" +
      "પૂછપરછ તમારા ઇતિહાસમાંથી દૂર કરવામાં આવી છે.",
    notFound: "⚠️ પૂછપરછ મળી નથી.",
    invalid: "⚠️ માન્ય પૂછપરછ પસંદ કરો.",
    accessDenied: "⚠️ આ પૂછપરછ તમારી નથી.",
    yes: "✅ હા, ડિલીટ કરો",
    no: "↩️ પાછા જાઓ",
    history: "📋 પૂછપરછનો ઇતિહાસ",
    menu: "🏠 મુખ્ય મેનુ"
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

// ---------- VALIDATE REFERENCE ----------
if (!refId) {
  showMenu(
    t.title + "\n\n" + t.invalid,
    [
      [
        {
          text: t.history,
          callback_data: "BUILD_HISTORY"
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

// ---------- GET ENQUIRY ----------
var enquiry = Bot.getProperty("ENQUIRY_" + refId)

if (!enquiry) {
  showMenu(
    t.title + "\n\n" + t.notFound,
    [
      [
        {
          text: t.history,
          callback_data: "BUILD_HISTORY"
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

// ---------- SECURITY CHECK ----------
if (
  String(enquiry.userId) !== String(uid)
) {
  showMenu(
    t.title + "\n\n" + t.accessDenied,
    [
      [
        {
          text: t.history,
          callback_data: "BUILD_HISTORY"
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
var buttons = [
  [
    {
      text: t.yes,
      callback_data: "BUILD_HISTORY_DELETE_CONFIRM " + refId
    }
  ],
  [
    {
      text: t.no,
      callback_data: "BUILD_HISTORY"
    }
  ]
]

// ---------- CONFIRMATION MESSAGE ----------
showMenu(
  t.title +
    "\n\n" +
    t.confirm +
    refId +
    t.warning,
  buttons
)
