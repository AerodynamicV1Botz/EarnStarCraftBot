/*CMD
  command: ADMIN_SEARCH_USER_INPUT
  help: 
  need_reply: true
  auto_retry_time: 
  folder: ADMIN PANEL
  answer: Send me User 🆔/ Username 

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var uid = user.telegramid

// ==========================================
// 👑 ADMIN CHECK
// ==========================================

if (String(uid) !== "7897324623") {
  return
}

var query = message

if (!query) {
  Bot.sendMessage("⚠️ Please enter a search value.")
  return
}

query = String(query).toLowerCase().trim()

// ==========================================
// 👥 GET USERS
// ==========================================

var users = Bot.getProperty("BroadcastUsers") || []

var found = []

// ==========================================
// 🔎 SEARCH USERS
// ==========================================

for (var i = users.length - 1; i >= 0; i--) {

  var userId = users[i]

  var userData = Bot.getProperty(
    "USER_" + userId
  )

  if (!userData) {
    continue
  }

  var name =
    String(userData.name || "").toLowerCase()

  var username =
    String(userData.username || "").toLowerCase()

  var id =
    String(userId).toLowerCase()

  if (
    name.indexOf(query) !== -1 ||
    username.indexOf(query) !== -1 ||
    id.indexOf(query) !== -1
  ) {
    found.push(userId)
  }

  if (found.length >= 10) {
    break
  }
}

// ==========================================
// ❌ NO RESULT
// ==========================================

if (found.length === 0) {

  Api.sendMessage({
    chat_id: uid,

    text:
      "🔎 <b>USER SEARCH</b>\n\n" +
      "❌ No user found for:\n" +
      "<code>" + query + "</code>",

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🔎 Search Again",
            callback_data: "ADMIN_SEARCH_USER"
          }
        ],
        [
          {
            text: "👥 Users",
            callback_data: "ADMIN_USERS"
          }
        ],
        [
          {
            text: "👑 Admin Panel",
            callback_data: "ADMIN_PANEL"
          }
        ]
      ]
    }
  })

  return
}

// ==========================================
// 📋 RESULTS
// ==========================================

var text =
  "🔎 <b>USER SEARCH RESULTS</b>\n\n" +
  "Found: <b>" + found.length + "</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n"

var buttons = []

for (var j = 0; j < found.length; j++) {

  var targetId = found[j]

  var data = Bot.getProperty(
    "USER_" + targetId
  )

  text +=
    "👤 <b>" +
    (data.name || "User") +
    "</b>\n" +
    "🆔 <code>" + targetId + "</code>\n" +
    "🔗 @" +
    (data.username || "no_username") +
    "\n\n"

  buttons.push([
    {
      text: "👁 View User",
      callback_data: "ADMIN_USER " + targetId
    }
  ])
}

// ==========================================
// 🔘 NAVIGATION
// ==========================================

buttons.push([
  {
    text: "🔎 Search Again",
    callback_data: "ADMIN_SEARCH_USER"
  }
])

buttons.push([
  {
    text: "👥 Users",
    callback_data: "ADMIN_USERS"
  },
  {
    text: "👑 Admin Panel",
    callback_data: "ADMIN_PANEL"
  }
])

// ==========================================
// 📤 SEND RESULTS
// ==========================================

Api.sendMessage({
  chat_id: uid,

  text: text,

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: buttons
  }
})
