/*CMD
  command: ADMIN_MANAGEMENT
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
// SCRIPT 229 — UPDATED VERSION
// COMMAND NAME: ADMIN_MANAGEMENT
// STEP 9.1 — MULTI-ADMIN MENU
// 📁 Add / Remove / List Admins
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var ownerId = "7897324623"

// ==========================================
// 👑 ADMIN ACCESS CHECK
// ==========================================

var adminList = Bot.getProperty("EARNSTAR_ADMINS") || []

if (!Array.isArray(adminList)) {
  adminList = []
}

var isOwner = String(uid) === ownerId
var isAdmin = false

for (var i = 0; i < adminList.length; i++) {
  if (String(adminList[i].id) === String(uid)) {
    isAdmin = true
    break
  }
}

if (!isOwner && !isAdmin) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "🔒 <b>Access Denied</b>\n\n" +
      "⚠️ Sirf authorized admins is section ko access kar sakte hain.",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🏠 Main Menu",
            callback_data: "BACK_MAIN_MENU"
          }
        ]
      ]
    }
  })

  return
}

// ==========================================
// 👑 ADMIN COUNT
// ==========================================

var totalAdmins = adminList.length + 1

// ==========================================
// 🌐 LANGUAGE
// ==========================================

var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

var text = ""

if (lang === "english") {
  text =
    "👑 <b>Multi-Admin Management</b>\n\n" +
    "Manage your authorized admins from here.\n\n" +
    "👑 Total Admins: <b>" + totalAdmins + "</b>\n\n" +
    "Select an option below:"
} else if (lang === "gujarati") {
  text =
    "👑 <b>મલ્ટી-એડમિન મેનેજમેન્ટ</b>\n\n" +
    "અહીંથી તમારા અધિકૃત એડમિન મેનેજ કરો.\n\n" +
    "👑 કુલ એડમિન: <b>" + totalAdmins + "</b>\n\n" +
    "નીચેનો વિકલ્પ પસંદ કરો:"
} else {
  text =
    "👑 <b>Multi-Admin Management</b>\n\n" +
    "Yahan se aap authorized admins manage kar sakte ho.\n\n" +
    "👑 Total Admins: <b>" + totalAdmins + "</b>\n\n" +
    "Neeche se option select karo:"
}

// ==========================================
// 🔘 BUTTONS
// ==========================================

var buttons = [
  [
    {
      text: "📋 Admin List",
      callback_data: "ADMIN_LIST"
    }
  ],
  [
    {
      text: "➕ Add Admin",
      callback_data: "ADD_ADMIN"
    },
    {
      text: "➖ Remove Admin",
      callback_data: "REMOVE_ADMIN"
    }
  ],
  [
    {
      text: "🔄 Refresh",
      callback_data: "ADMIN_MANAGEMENT"
    }
  ],
  [
    {
      text: "⬅️ Back to Admin Panel",
      callback_data: "ADMIN_PANEL"
    }
  ]
]

// ==========================================
// 📩 CALLBACK ANSWER
// ==========================================

if (
  typeof request !== "undefined" &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

// ==========================================
// 📩 SAME MESSAGE EDIT + DELETE FALLBACK
// ==========================================

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

// ==========================================
// 📤 SEND NEW MESSAGE
// ==========================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
})
