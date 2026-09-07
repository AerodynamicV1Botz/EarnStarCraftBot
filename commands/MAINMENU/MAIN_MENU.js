/*CMD
  command: MAIN_MENU
  help: 
  need_reply: false
  auto_retry_time: 
  folder: MAINMENU

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 5 — UPDATED VERSION
// COMMAND: MAIN_MENU
// STEP: 2
// 🌐 MULTI-LANGUAGE MAIN MENU
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================

// ==========================================
// ⚡ INSTANT CALLBACK RESPONSE
// ==========================================

if (typeof request !== "undefined" && request && request.id) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

// ==========================================
// ---------- ADMIN SETTINGS ----------
// ==========================================

let OWNER_ID = "7897324623"
let STAFF_PROPERTY = "STAFF_ADMINS"

let staffAdmins = Bot.getProperty(STAFF_PROPERTY) || []

if (!Array.isArray(staffAdmins)) {
  staffAdmins = []
}

staffAdmins = staffAdmins.map(function (id) {
  return String(id)
})

let ADMIN_IDS = [OWNER_ID]

for (let i = 0; i < staffAdmins.length; i++) {
  if (ADMIN_IDS.indexOf(staffAdmins[i]) === -1) {
    ADMIN_IDS.push(staffAdmins[i])
  }
}

let isAdmin = ADMIN_IDS.indexOf(String(user.telegramid)) !== -1

// ==========================================
// ---------- USER INFO ----------
// ==========================================

let userId = user.telegramid
let userKey = "USER_" + userId

let fullName =
  (user.first_name || "User") +
  (user.last_name ? " " + user.last_name : "")

let username = user.username
  ? "@" + user.username
  : "Not set"

// HTML SAFE NAME
fullName = fullName
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")

// ==========================================
// ---------- GET USER DATA ----------
// ==========================================

let userData = Bot.getProperty(userKey)

if (!userData) {
  userData = {
    id: userId,
    name: fullName,
    username: username,
    language: "hinglish"
  }
} else {
  userData.id = userId
  userData.name = fullName
  userData.username = username

  if (!userData.language) {
    userData.language = "hinglish"
  }
}

// ==========================================
// ---------- SAVE USER DATA ----------
// ==========================================

Bot.setProperty(
  userKey,
  userData,
  "json"
)

let language = userData.language || "hinglish"

// ==========================================
// 🧹 DELETE OLD MESSAGE IF OPENED BY BUTTON
// ==========================================

let oldMessageId = null

if (
  typeof request !== "undefined" &&
  request &&
  request.message &&
  request.message.message_id
) {
  oldMessageId = request.message.message_id
} else if (
  typeof request !== "undefined" &&
  request &&
  request.message_id
) {
  oldMessageId = request.message_id
}

if (oldMessageId) {
  try {
    Api.deleteMessage({
      chat_id: userId,
      message_id: oldMessageId
    })
  } catch (error) {
    // Old message already deleted ho toh ignore
  }
}

// ==========================================
// 📦 MENU VARIABLES
// ==========================================

let text = ""
let buttons = []

// ==========================================
// 👑 ADMIN BUTTON
// ==========================================

let adminButton = []

if (isAdmin) {
  adminButton = [
    {
      text: "👑 Admin Panel",
      callback_data: "ADMIN_PANEL"
    }
  ]
}

// ==========================================
// 🇮🇳 HINGLISH
// ==========================================

if (language == "hinglish") {

  text =
    "👋 <b>Welcome, " +
    fullName +
    "!</b>\n\n" +
    "🤖 <b>EarnStar BOTCRAFT</b>\n" +
    "Professional Telegram Bots &amp; Automation\n\n" +
    "🚀 Apni business ya community ko smart aur automated banao.\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "👇 <b>Choose an option:</b>"

  buttons = [
    [
      { text: "🛠️ Services", callback_data: "MENU_SERVICES" },
      { text: "💰 Pricing", callback_data: "MENU_PRICING" }
    ],
    [
      { text: "🎬 Live Demo", callback_data: "MENU_DEMO" },
      { text: "💼 Portfolio", callback_data: "MENU_PORTFOLIO" }
    ],
    [
      { text: "🚀 Build My Bot", callback_data: "MENU_BUILD" },
      { text: "📋 My Enquiry", callback_data: "MY_ENQUIRY" }
    ],
    [
      { text: "📦 My Orders", callback_data: "MY_ORDERS" }
    ],
    [
      { text: "❓ FAQ", callback_data: "MENU_FAQ" },
      { text: "📞 Contact", callback_data: "MENU_CONTACT" }
    ],
    adminButton,
    [
      { text: "🌐 Change Language", callback_data: "MENU_LANGUAGE" }
    ]
  ]

}

// ==========================================
// 🇬🇧 ENGLISH
// ==========================================

else if (language == "english") {

  text =
    "👋 <b>Welcome, " +
    fullName +
    "!</b>\n\n" +
    "🤖 <b>EarnStar BOTCRAFT</b>\n" +
    "Professional Telegram Bots &amp; Automation\n\n" +
    "🚀 Turn your business or community into a smarter, automated system.\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "👇 <b>Choose an option:</b>"

  buttons = [
    [
      { text: "🛠️ Services", callback_data: "MENU_SERVICES" },
      { text: "💰 Pricing", callback_data: "MENU_PRICING" }
    ],
    [
      { text: "🎬 Live Demo", callback_data: "MENU_DEMO" },
      { text: "💼 Portfolio", callback_data: "MENU_PORTFOLIO" }
    ],
    [
      { text: "🚀 Build My Bot", callback_data: "MENU_BUILD" },
      { text: "📋 My Enquiry", callback_data: "MY_ENQUIRY" }
    ],
    [
      { text: "📦 My Orders", callback_data: "MY_ORDERS" }
    ],
    [
      { text: "❓ FAQ", callback_data: "MENU_FAQ" },
      { text: "📞 Contact", callback_data: "MENU_CONTACT" }
    ],
    adminButton,
    [
      { text: "🌐 Change Language", callback_data: "MENU_LANGUAGE" }
    ]
  ]

}

// ==========================================
// 🇬🇺 GUJARATI
// ==========================================

else if (language == "gujarati") {

  text =
    "👋 <b>સ્વાગત છે, " +
    fullName +
    "!</b>\n\n" +
    "🤖 <b>EarnStar BOTCRAFT</b>\n" +
    "Professional Telegram Bots &amp; Automation\n\n" +
    "🚀 તમારા Business અથવા Community ને Smart અને Automated બનાવો.\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "👇 <b>એક Option પસંદ કરો:</b>"

  buttons = [
    [
      { text: "🛠️ Services", callback_data: "MENU_SERVICES" },
      { text: "💰 Pricing", callback_data: "MENU_PRICING" }
    ],
    [
      { text: "🎬 Live Demo", callback_data: "MENU_DEMO" },
      { text: "💼 Portfolio", callback_data: "MENU_PORTFOLIO" }
    ],
    [
      { text: "🚀 મારું Bot બનાવો", callback_data: "MENU_BUILD" },
      { text: "📋 મારી Enquiry", callback_data: "MY_ENQUIRY" }
    ],
    [
      { text: "📦 મારા Orders", callback_data: "MY_ORDERS" }
    ],
    [
      { text: "❓ FAQ", callback_data: "MENU_FAQ" },
      { text: "📞 Contact", callback_data: "MENU_CONTACT" }
    ],
    adminButton,
    [
      { text: "🌐 Language બદલો", callback_data: "MENU_LANGUAGE" }
    ]
  ]

}

// ==========================================
// 🧹 REMOVE EMPTY ADMIN ROW
// ==========================================

buttons = buttons.filter(function (row) {
  return row && row.length > 0
})

// ==========================================
// 📤 SEND MAIN MENU
// ==========================================

Api.sendMessage({
  chat_id: userId,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
})
