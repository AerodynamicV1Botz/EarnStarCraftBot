/*CMD
  command: REMOVE_ADMIN
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
// SCRIPT 232 — FINAL CORRECTED VERSION
// COMMAND NAME: REMOVE_ADMIN
// STEP 9.4 — REMOVE ADMIN
// 📁 Single Command Remove System
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================

var uid = user.telegramid
var ownerId = "7897324623"

// ==========================================
// 👑 OWNER CHECK
// ==========================================

if (String(uid) !== ownerId) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "🔒 <b>Access Denied</b>\n\n" +
      "Sirf bot owner admin remove kar sakta hai.",
    parse_mode: "HTML"
  })
  return
}

// ==========================================
// 📩 CALLBACK DATA
// ==========================================

var callbackData = ""

if (
  typeof request !== "undefined" &&
  request.data
) {
  callbackData = String(request.data)
}

// ==========================================
// 📋 GET ADMIN LIST
// ==========================================

var adminList = Bot.getProperty("EARNSTAR_ADMINS") || []

if (!Array.isArray(adminList)) {
  adminList = []
}

// ==========================================
// 🌐 LANGUAGE
// ==========================================

var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// ==========================================
// 🗑️ REMOVE SELECTED ADMIN
// ==========================================

// Callback format:
// REMOVE_ADMIN 123456789

var selectedId = ""

if (callbackData.indexOf("REMOVE_ADMIN ") === 0) {
  selectedId = callbackData.substring(13).trim()
}

// ==========================================
// 💾 DELETE ADMIN
// ==========================================

if (selectedId !== "") {

  var updatedList = []
  var removed = false

  for (var i = 0; i < adminList.length; i++) {

    if (String(adminList[i].id) === selectedId) {
      removed = true
    } else {
      updatedList.push(adminList[i])
    }

  }

  if (removed) {

    Bot.setProperty(
      "EARNSTAR_ADMINS",
      updatedList,
      "json"
    )

    adminList = updatedList

    if (
      typeof request !== "undefined" &&
      request.id
    ) {
      Api.answerCallbackQuery({
        callback_query_id: request.id,
        text: "Admin removed successfully"
      })
    }

  } else {

    if (
      typeof request !== "undefined" &&
      request.id
    ) {
      Api.answerCallbackQuery({
        callback_query_id: request.id,
        text: "Admin not found"
      })
    }

  }

}

// ==========================================
// 📝 TEXT
// ==========================================

var text = ""

if (lang === "english") {

  text =
    "➖ <b>Remove Admin</b>\n\n" +
    "Select the admin you want to remove:"

} else if (lang === "gujarati") {

  text =
    "➖ <b>એડમિન દૂર કરો</b>\n\n" +
    "જે એડમિનને દૂર કરવો છે તે પસંદ કરો:"

} else {

  text =
    "➖ <b>Remove Admin</b>\n\n" +
    "Jis admin ko remove karna hai, uske button par click karo:"

}

// ==========================================
// 📭 NO ADMIN
// ==========================================

if (adminList.length === 0) {

  if (lang === "english") {
    text += "\n\n📭 No additional admins added."
  } else if (lang === "gujarati") {
    text += "\n\n📭 કોઈ વધારાનો એડમિન ઉમેરાયેલ નથી."
  } else {
    text += "\n\n📭 Abhi koi additional admin added nahi hai."
  }

} else {

  if (lang === "english") {
    text += "\n\n👥 <b>Added Admins:</b>\n\n"
  } else if (lang === "gujarati") {
    text += "\n\n👥 <b>ઉમેરેલા એડમિન:</b>\n\n"
  } else {
    text += "\n\n👥 <b>Added Admins:</b>\n\n"
  }

}

// ==========================================
// 🔘 ADMIN BUTTONS
// ==========================================

var buttons = []

for (var j = 0; j < adminList.length; j++) {

  var admin = adminList[j]

  buttons.push([
    {
      text:
        "🗑️ " +
        (admin.name || "Admin") +
        " | " +
        admin.id,

      callback_data: "REMOVE_ADMIN " + admin.id
    }
  ])

}

buttons.push([
  {
    text: "⬅️ Back",
    callback_data: "ADMIN_MANAGEMENT"
  }
])

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
// 📩 SAME MESSAGE EDIT
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
