/*CMD
  command: LANG_ENGLISH
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
  command: LANG_ENGLISH
  need_reply: false
  folder: START
*/

// =====================================================
// 🇬🇧 EARNSTAR BOTCRAFT
// SCRIPT 3 — LANG_ENGLISH
// STEP 1.2
// =====================================================
// PURPOSE:
// ✅ English language selection
// ✅ User profile update
// ✅ Language preservation
// ✅ Joined date/time preservation
// ✅ Safe JSON storage
// ✅ Callback response
// ✅ Welcome caption update
// ✅ Main Menu connection
// =====================================================


// =====================================================
// ⚡ INSTANT CALLBACK RESPONSE
// =====================================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {

  try {

    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "🇬🇧 English selected!"
    })

  }

  catch (error) {
    // Callback response fail hone par flow continue rahega
  }

}


// =====================================================
// 👤 USER INFORMATION
// =====================================================

var userId = String(user.telegramid)

var userKey = "USER_" + userId

var fullName = user.first_name || "User"

if (user.last_name) {
  fullName += " " + user.last_name
}

var username = user.username
  ? "@" + user.username
  : "Not set"


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
// 💾 GET EXISTING USER DATA
// =====================================================

var userData = Bot.getProperty(userKey)


// =====================================================
// 🆕 CREATE USER DATA IF MISSING
// =====================================================

if (!userData || typeof userData !== "object") {

  var joinedInfo = getISTDateTime()

  userData = {
    id: userId,
    name: fullName,
    username: username,

    language: "english",

    joinedAt: joinedInfo.iso,
    joinedDate: joinedInfo.date,
    joinedTime: joinedInfo.time,

    source: "/start"
  }

}


// =====================================================
// 🔄 UPDATE EXISTING USER DATA
// =====================================================

else {

  // Current user information update
  userData.id = userId
  userData.name = fullName
  userData.username = username

  // Selected language
  userData.language = "english"

  // Original joined information preserve rahegi
  if (!userData.joinedAt) {

    var oldJoinedInfo = getISTDateTime()

    userData.joinedAt = oldJoinedInfo.iso
    userData.joinedDate = oldJoinedInfo.date
    userData.joinedTime = oldJoinedInfo.time

  }

  if (!userData.source) {
    userData.source = "/start"
  }

}


// =====================================================
// 🕒 LANGUAGE SELECTION TIME
// =====================================================

var languageSelectedInfo = getISTDateTime()

userData.languageSelectedAt = languageSelectedInfo.iso

userData.languageSelectedDate = languageSelectedInfo.date

userData.languageSelectedTime = languageSelectedInfo.time


// =====================================================
// 💾 SAVE USER DATA
// =====================================================

Bot.setProperty(
  userKey,
  userData,
  "json"
)


// =====================================================
// 📝 ENGLISH WELCOME CAPTION
// =====================================================

var caption =
  "🇬🇧 <b>English selected!</b>\n\n" +

  "👋 Welcome to <b>EarnStar 🤖 BOTCRAFT</b>!\n\n" +

  "🚀 We will now show you our services and options in English.\n\n" +

  "🏠 <b>Main Menu is opening...</b>"


// =====================================================
// ✏️ EDIT CURRENT PHOTO CAPTION
// =====================================================

if (
  typeof request !== "undefined" &&
  request &&
  request.message &&
  request.message.message_id
) {

  var chatId = userId

  if (
    request.message.chat &&
    request.message.chat.id
  ) {
    chatId = request.message.chat.id
  }

  try {

    Api.editMessageCaption({
      chat_id: chatId,
      message_id: request.message.message_id,
      caption: caption,
      parse_mode: "HTML"
    })

  }

  catch (error) {
    // Caption edit fail hone par Main Menu phir bhi open hoga
  }

}


// =====================================================
// 🏠 OPEN MAIN MENU
// =====================================================

Bot.runCommand("MAIN_MENU")
