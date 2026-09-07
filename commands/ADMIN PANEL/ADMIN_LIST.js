/*CMD
  command: ADMIN_LIST
  help: 
  need_reply: false
  auto_retry_time: 
  folder: ADMIN PANEL

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 230 — UPDATED VERSION
// COMMAND NAME: ADMIN_LIST
// STEP 9.2 — SHOW ADDED ADMINS
// 📁 Admin List
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
// 🌐 LANGUAGE
// ==========================================

var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// ==========================================
// 📝 ADMIN LIST TEXT
// ==========================================

var text = ""

if (lang === "english") {
  text =
    "📋 <b>Admin List</b>\n\n" +
    "👑 Owner ID: <code>" + ownerId + "</code>\n\n"
} else if (lang === "gujarati") {
  text =
    "📋 <b>એડમિન લિસ્ટ</b>\n\n" +
    "👑 ઓનર ID: <code>" + ownerId + "</code>\n\n"
} else {
  text =
    "📋 <b>Admin List</b>\n\n" +
    "👑 Owner ID: <code>" + ownerId + "</code>\n\n"
}

// ==========================================
// 📋 ADDED ADMINS
// ==========================================

if (adminList.length === 0) {
  if (lang === "english") {
    text += "➕ No additional admins added yet."
  } else if (lang === "gujarati") {
    text += "➕ હજુ સુધી કોઈ વધારાનો એડમિન ઉમેરાયો નથી."
  } else {
    text += "➕ Abhi tak koi additional admin add nahi hai."
  }
} else {
  if (lang === "english") {
    text += "👥 <b>Added Admins:</b>\n\n"
  } else if (lang === "gujarati") {
    text += "👥 <b>ઉમેરેલા એડમિન:</b>\n\n"
  } else {
    text += "👥 <b>Added Admins:</b>\n\n"
  }

  for (var i = 0; i < adminList.length; i++) {
    var admin = adminList[i]

    text +=
      (i + 1) +
      ". 👤 <b>" +
      (admin.name || "Admin") +
      "</b>\n" +
      "🆔 ID: <code>" +
      admin.id +
      "</code>\n\n"
  }
}

// ==========================================
// 🔘 BUTTONS
// ==========================================

var buttons = [
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
      callback_data: "ADMIN_LIST"
    }
  ],
  [
    {
      text: "⬅️ Back",
      callback_data: "ADMIN_MANAGEMENT"
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
