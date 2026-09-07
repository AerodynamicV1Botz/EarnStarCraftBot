/*CMD
  command: STARTER_CONTACT
  help: 
  need_reply: false
  auto_retry_time: 
  folder: PRICING

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 21 — UPDATED VERSION
// COMMAND NAME: STARTER_CONTACT
// STEP 4.1.2.1.2.1 — CONTACT USER
// 📁 MAIN MENU → 📁 PRICING → STARTER PACKAGE → MY REQUESTS → ADMIN VIEW
// 🌐 Language support included
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================

// ==========================================
// ⚡ INSTANT CALLBACK RESPONSE
// ==========================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

// ==========================================
// 🛡️ SAFE HTML ESCAPE
// ==========================================

function escapeHTML(value) {
  if (value === null || value === undefined) {
    return ""
  }

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

// ==========================================
// 👤 ADMIN ACCESS CHECK
// ==========================================

var uid = String(user.telegramid)

var ownerId = "7897324623"

var staffAdmins =
  Bot.getProperty("STAFF_ADMINS") || []

var isAdmin = uid === ownerId

if (!isAdmin && Array.isArray(staffAdmins)) {

  for (var a = 0; a < staffAdmins.length; a++) {

    if (
      String(staffAdmins[a]) === uid
    ) {
      isAdmin = true
      break
    }

  }

}

if (!isAdmin) {

  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>Access Denied</b>\n\n" +
      "Sirf admin user ko contact kar sakta hai.",
    parse_mode: "HTML"
  })

  return
}

// ==========================================
// 📌 GET REQUEST ID
// ==========================================

var requestId = String(params || "").trim()

if (!requestId) {

  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>Request ID missing.</b>\n\n" +
      "Please valid request select karo.",
    parse_mode: "HTML"
  })

  return
}

// ==========================================
// 📦 GET STARTER REQUEST
// ==========================================

var starterRequest = Bot.getProperty(
  "STARTER_REQUEST_" + requestId
)

if (!starterRequest) {

  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>Starter request nahi mili.</b>\n\n" +
      "🆔 Request ID: <code>" +
      escapeHTML(requestId) +
      "</code>",
    parse_mode: "HTML"
  })

  return
}

// ==========================================
// 👤 GET USER DETAILS
// ==========================================

var requestUserId = String(
  starterRequest.userId || ""
)

if (!requestUserId) {

  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>User ID missing.</b>\n\n" +
      "Is request ke saath user ID saved nahi hai.",
    parse_mode: "HTML"
  })

  return
}

var requestUser = Bot.getProperty(
  "USER_" + requestUserId
)

var fullName = ""

if (requestUser) {

  fullName =
    requestUser.firstName ||
    requestUser.name ||
    ""

  if (requestUser.lastName) {
    fullName +=
      " " + requestUser.lastName
  }

}

if (!fullName) {
  fullName = "Unknown User"
}

var username =
  requestUser && requestUser.username
    ? "@" + requestUser.username
    : "Not available"

// ==========================================
// 🔗 DIRECT TELEGRAM USER LINK
// ==========================================

var userProfileUrl =
  "tg://user?id=" + requestUserId

// ==========================================
// 🌐 LANGUAGE TEXT
// ==========================================

var title = ""
var instruction = ""
var openChat = ""
var viewRequest = ""
var adminPanel = ""

if (language === "english") {

  title = "💬 <b>CONTACT USER</b>"
  instruction =
    "Use the button below to open the user's Telegram profile and send a message."
  openChat = "💬 Open User Chat"
  viewRequest = "📦 View Request"
  adminPanel = "👑 Admin Panel"

} else if (language === "gujarati") {

  title = "💬 <b>યુઝરનો સંપર્ક કરો</b>"
  instruction =
    "નીચેના બટનથી યુઝરની Telegram profile ખોલીને message મોકલો."
  openChat = "💬 યુઝર ચેટ ખોલો"
  viewRequest = "📦 Request જુઓ"
  adminPanel = "👑 એડમિન પેનલ"

} else {

  title = "💬 <b>CONTACT USER</b>"
  instruction =
    "Neeche button se user ki Telegram profile open karke message bhejo."
  openChat = "💬 Open User Chat"
  viewRequest = "📦 View Request"
  adminPanel = "👑 Admin Panel"

}

// ==========================================
// 📝 CONTACT DETAILS
// ==========================================

var text =
  title +
  "\n\n" +
  "🆔 Request ID: <code>" +
  escapeHTML(requestId) +
  "</code>\n" +
  "👤 Name: <b>" +
  escapeHTML(fullName) +
  "</b>\n" +
  "🆔 User ID: <code>" +
  escapeHTML(requestUserId) +
  "</code>\n" +
  "🔗 Username: " +
  escapeHTML(username) +
  "\n\n" +
  "👇 " +
  instruction

// ==========================================
// 🔘 BUTTONS
// ==========================================

var buttons = [
  [
    {
      text: openChat,
      url: userProfileUrl
    }
  ],
  [
    {
      text: viewRequest,
      callback_data:
        "STARTER_ADMIN_VIEW " + requestId
    }
  ],
  [
    {
      text: adminPanel,
      callback_data: "ADMIN_PANEL"
    }
  ]
]

// ==========================================
// 📤 SEND CONTACT DETAILS
// ==========================================

Api.sendMessage({
  chat_id: uid,

  text: text,

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: buttons
  }
})
