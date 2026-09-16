/*CMD
  command: LANG_GUJARATI
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
  command: LANG_GUJARATI
  need_reply: false
  folder: START
*/

// =====================================================
// 🇬🇺 EARNSTAR BOTCRAFT
// SCRIPT 4 — LANG_GUJARATI
// STEP 1.3
// =====================================================
// PURPOSE:
// ✅ Gujarati language selection
// ✅ User profile update
// ✅ Language preservation
// ✅ Joined date/time preservation
// ✅ Safe JSON storage
// ✅ Callback response
// ✅ Gujarati welcome caption
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
      text: "🇬🇺 ગુજરાતી પસંદ કરવામાં આવી!"
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

    language: "gujarati",

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
  userData.language = "gujarati"

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
// 📝 GUJARATI WELCOME CAPTION
// =====================================================

var caption =
  "🇬🇺 <b>ભાષા પસંદ થઈ ગઈ!</b>\n\n" +

  "👋 <b>EarnStar 🤖 BOTCRAFT</b> માં આપનું સ્વાગત છે!\n\n" +

  "🚀 હવે તમને અમારી services અને options ગુજરાતી ભાષામાં બતાવવામાં આવશે.\n\n" +

  "🏠 <b>Main Menu ખોલાઈ રહ્યું છે...</b>"


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
