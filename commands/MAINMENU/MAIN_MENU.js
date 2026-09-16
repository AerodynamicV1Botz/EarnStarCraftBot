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

/*CMD
  command: MAIN_MENU
  need_reply: false
  folder: MAIN_MENU
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 5 — MAIN_MENU
// STEP 2
// =====================================================
// FEATURES:
// ✅ Multi-language Main Menu
// ✅ Hinglish / English / Gujarati
// ✅ Owner + authorized admin access
// ✅ EARNSTAR_ADMINS support
// ✅ User profile update
// ✅ Joined date/time preservation
// ✅ Safe HTML text
// ✅ Safe callback response
// ✅ Existing menu buttons preserved
// ✅ Admin Panel connection
// =====================================================

// =====================================================
// ⚙️ CONFIGURATION
// =====================================================

var OWNER_ID = "7897324623"

var ADMIN_PROPERTY = "EARNSTAR_ADMINS"

// =====================================================
// ⚡ INSTANT CALLBACK RESPONSE
// =====================================================

if (typeof request !== "undefined" && request && request.id) {
  try {
    Api.answerCallbackQuery({
      callback_query_id: request.id
    })
  } catch (error) {
    // Callback response fail hone par menu continue rahega
  }
}

// =====================================================
// 🛡️ SAFE HTML ESCAPE
// =====================================================

function escapeHTML(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

// =====================================================
// 👥 GET AUTHORIZED ADMIN LIST
// Supports:
// ["123456"]
// [{id:"123456"}]
// [{telegramId:"123456"}]
// =====================================================

function getAdminList() {
  var savedAdmins = Bot.getProperty(ADMIN_PROPERTY)

  var adminList = []

  if (Array.isArray(savedAdmins)) {
    adminList = savedAdmins
  }

  var cleanAdmins = []

  for (var i = 0; i < adminList.length; i++) {
    var admin = adminList[i]
    var adminId = ""

    if (typeof admin === "object" && admin !== null) {
      if (admin.id) {
        adminId = String(admin.id)
      } else if (admin.telegramId) {
        adminId = String(admin.telegramId)
      }
    } else {
      adminId = String(admin)
    }

    if (
      adminId &&
      adminId !== "undefined" &&
      adminId !== "null" &&
      adminId !== "[object Object]"
    ) {
      if (!cleanAdmins.includes(adminId)) {
        cleanAdmins.push(adminId)
      }
    }
  }

  // Owner always included
  if (!cleanAdmins.includes(String(OWNER_ID))) {
    cleanAdmins.unshift(String(OWNER_ID))
  }

  return cleanAdmins
}

var ADMIN_IDS = getAdminList()

// =====================================================
// 👤 USER INFORMATION
// =====================================================

var userId = String(user.telegramid)

var userKey = "USER_" + userId

var fullName = user.first_name || "User"

if (user.last_name) {
  fullName += " " + user.last_name
}

var username = user.username ? "@" + user.username : "Not set"

var safeFullName = escapeHTML(fullName)

var safeUsername = escapeHTML(username)

// =====================================================
// 💾 GET USER DATA
// =====================================================

var userData = Bot.getProperty(userKey)

// =====================================================
// 🕒 IST DATE & TIME
// =====================================================

function getISTDateTime() {
  var now = new Date()

  var date = now.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  })

  var time = now.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  })

  return {
    date: date,
    time: time,
    iso: now.toISOString()
  }
}

// =====================================================
// 🆕 CREATE FALLBACK USER PROFILE
// =====================================================

if (!userData || typeof userData !== "object") {
  var joinedInfo = getISTDateTime()

  userData = {
    id: userId,
    name: fullName,
    username: username,

    // Existing language flow ke saath compatible
    language: null,

    joinedAt: joinedInfo.iso,
    joinedDate: joinedInfo.date,
    joinedTime: joinedInfo.time,

    source: "/start"
  }
}

// =====================================================
// 🔄 UPDATE EXISTING USER PROFILE
// =====================================================
else {
  userData.id = userId
  userData.name = fullName
  userData.username = username

  // Language missing ho toh null rahega.
  // Isse language selection flow bypass nahi hoga.
  if (typeof userData.language === "undefined") {
    userData.language = null
  }

  // Original joined information preserve rahegi
  if (!userData.joinedAt) {
    var missingJoinedInfo = getISTDateTime()

    userData.joinedAt = missingJoinedInfo.iso
    userData.joinedDate = missingJoinedInfo.date
    userData.joinedTime = missingJoinedInfo.time
  }

  if (!userData.source) {
    userData.source = "/start"
  }
}

// =====================================================
// 💾 SAVE USER DATA
// =====================================================

Bot.setProperty(userKey, userData, "json")

// =====================================================
// 🔐 ADMIN ACCESS CHECK
// =====================================================

var isAdmin = ADMIN_IDS.includes(userId)

// =====================================================
// 🌐 LANGUAGE
// =====================================================

var language = userData.language

// Safety fallback only for old/incomplete profiles
if (
  language !== "hinglish" &&
  language !== "english" &&
  language !== "gujarati"
) {
  language = "hinglish"
}

// =====================================================
// 📦 MENU VARIABLES
// =====================================================

var text = ""

var buttons = []

// =====================================================
// 👑 ADMIN BUTTON
// =====================================================

var adminButton = []

if (isAdmin) {
  adminButton = [
    {
      text: "👑 Admin Panel",
      callback_data: "ADMIN_PANEL"
    }
  ]
}

// =====================================================
// 🇮🇳 HINGLISH MENU
// =====================================================

if (language === "hinglish") {
  text =
    "👋 <b>Welcome, " +
    safeFullName +
    "!</b>\n\n" +
    "🤖 <b>EarnStar BOTCRAFT</b>\n" +
    "Professional Telegram Bots &amp; Automation\n\n" +
    "🚀 Apni business ya community ko smart aur automated banao.\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "👇 <b>Choose an option:</b>"

  buttons = [
    [
      {
        text: "🛠️ Services",
        callback_data: "MENU_SERVICES"
      },
      {
        text: "💰 Pricing",
        callback_data: "MENU_PRICING"
      }
    ],

    [
      {
        text: "🎬 Live Demo",
        callback_data: "MENU_DEMO"
      },
      {
        text: "💼 Portfolio",
        callback_data: "MENU_PORTFOLIO"
      }
    ],

    [
      {
        text: "🚀 Build My Bot",
        callback_data: "MENU_BUILD"
      },
      {
        text: "📋 My Enquiry",
        callback_data: "MY_ENQUIRY"
      }
    ],

    [
      {
        text: "📦 My Orders",
        callback_data: "MY_ORDERS"
      }
    ],

    [
      {
        text: "❓ FAQ",
        callback_data: "MENU_FAQ"
      },
      {
        text: "📞 Contact",
        callback_data: "MENU_CONTACT"
      }
    ],

    adminButton,

    [
      {
        text: "🌐 Change Language",
        callback_data: "MENU_LANGUAGE"
      }
    ]
  ]
}

// =====================================================
// 🇬🇧 ENGLISH MENU
// =====================================================
else if (language === "english") {
  text =
    "👋 <b>Welcome, " +
    safeFullName +
    "!</b>\n\n" +
    "🤖 <b>EarnStar BOTCRAFT</b>\n" +
    "Professional Telegram Bots &amp; Automation\n\n" +
    "🚀 Turn your business or community into a smarter, automated system.\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "👇 <b>Choose an option:</b>"

  buttons = [
    [
      {
        text: "🛠️ Services",
        callback_data: "MENU_SERVICES"
      },
      {
        text: "💰 Pricing",
        callback_data: "MENU_PRICING"
      }
    ],

    [
      {
        text: "🎬 Live Demo",
        callback_data: "MENU_DEMO"
      },
      {
        text: "💼 Portfolio",
        callback_data: "MENU_PORTFOLIO"
      }
    ],

    [
      {
        text: "🚀 Build My Bot",
        callback_data: "MENU_BUILD"
      },
      {
        text: "📋 My Enquiry",
        callback_data: "MY_ENQUIRY"
      }
    ],

    [
      {
        text: "📦 My Orders",
        callback_data: "MY_ORDERS"
      }
    ],

    [
      {
        text: "❓ FAQ",
        callback_data: "MENU_FAQ"
      },
      {
        text: "📞 Contact",
        callback_data: "MENU_CONTACT"
      }
    ],

    adminButton,

    [
      {
        text: "🌐 Change Language",
        callback_data: "MENU_LANGUAGE"
      }
    ]
  ]
}

// =====================================================
// 🇬🇺 GUJARATI MENU
// =====================================================
else if (language === "gujarati") {
  text =
    "👋 <b>સ્વાગત છે, " +
    safeFullName +
    "!</b>\n\n" +
    "🤖 <b>EarnStar BOTCRAFT</b>\n" +
    "Professional Telegram Bots &amp; Automation\n\n" +
    "🚀 તમારા Business અથવા Community ને Smart અને Automated બનાવો.\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "👇 <b>એક Option પસંદ કરો:</b>"

  buttons = [
    [
      {
        text: "🛠️ Services",
        callback_data: "MENU_SERVICES"
      },
      {
        text: "💰 Pricing",
        callback_data: "MENU_PRICING"
      }
    ],

    [
      {
        text: "🎬 Live Demo",
        callback_data: "MENU_DEMO"
      },
      {
        text: "💼 Portfolio",
        callback_data: "MENU_PORTFOLIO"
      }
    ],

    [
      {
        text: "🚀 મારું Bot બનાવો",
        callback_data: "MENU_BUILD"
      },
      {
        text: "📋 મારી Enquiry",
        callback_data: "MY_ENQUIRY"
      }
    ],

    [
      {
        text: "📦 મારા Orders",
        callback_data: "MY_ORDERS"
      }
    ],

    [
      {
        text: "❓ FAQ",
        callback_data: "MENU_FAQ"
      },
      {
        text: "📞 Contact",
        callback_data: "MENU_CONTACT"
      }
    ],

    adminButton,

    [
      {
        text: "🌐 Language બદલો",
        callback_data: "MENU_LANGUAGE"
      }
    ]
  ]
}

// =====================================================
// 🧹 REMOVE EMPTY BUTTON ROWS
// =====================================================

buttons = buttons.filter(function(row) {
  return Array.isArray(row) && row.length > 0
})

// =====================================================
// 📤 SHOW MAIN MENU
// SCRIPT 5 — EDIT / DELETE / SEND
// =====================================================
// ✅ Text message → EDIT
// ✅ Non-text message → DELETE → SEND
// ✅ Edit fail → DELETE → SEND
// ✅ Duplicate Main Menu avoid
// ✅ Package / Order messages untouched unless
//    they are the actual callback message
// =====================================================

var mainMenuShown = false
var currentMessageId = ""
var currentMessageHasText = false

// =====================================================
// 📩 GET CURRENT CALLBACK MESSAGE
// =====================================================

try {

  if (
    typeof request !== "undefined" &&
    request &&
    request.message
  ) {

    // Message ID
    if (request.message.message_id) {

      currentMessageId =
        String(request.message.message_id)

    } else if (request.message.messageId) {

      currentMessageId =
        String(request.message.messageId)
    }

    // =================================================
    // CHECK TEXT
    // =================================================

    if (
      typeof request.message.text !== "undefined" &&
      request.message.text !== null &&
      String(request.message.text).trim() !== ""
    ) {

      currentMessageHasText = true
    }
  }

} catch (error) {

  currentMessageId = ""
  currentMessageHasText = false

}

// =====================================================
// ✏️ STEP 1 — EDIT CURRENT TEXT MESSAGE
// =====================================================

if (
  currentMessageId &&
  currentMessageHasText
) {

  try {

    Api.editMessageText({

      chat_id: userId,

      message_id: currentMessageId,

      text: text,

      parse_mode: "HTML",

      reply_markup: {
        inline_keyboard: buttons
      }

    })

    mainMenuShown = true

  } catch (error) {

    mainMenuShown = false

  }
}

// =====================================================
// 🗑️ STEP 2 — IF EDIT FAILED OR MESSAGE HAS NO TEXT
// DELETE CURRENT MESSAGE
// =====================================================

if (
  !mainMenuShown &&
  currentMessageId
) {

  try {

    Api.deleteMessage({

      chat_id: userId,

      message_id: currentMessageId

    })

  } catch (error) {

    // Delete fail hone par bhi new menu try hoga
  }
}

// =====================================================
// 📩 STEP 3 — SEND ONE FRESH MAIN MENU
// =====================================================

if (!mainMenuShown) {

  try {

    Api.sendMessage({

      chat_id: userId,

      text: text,

      parse_mode: "HTML",

      reply_markup: {
        inline_keyboard: buttons
      }

    })

    mainMenuShown = true

  } catch (error) {

    mainMenuShown = false

  }
}
