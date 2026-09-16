/*CMD
  command: /start
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
  command: /start
  need_reply: false
  folder: START
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 1 — /start
// STEP 1
// =====================================================
// FEATURES:
// ✅ User profile creation/update
// ✅ Clickable user mention
// ✅ Username and User ID
// ✅ Original joined date/time preservation
// ✅ Language preservation
// ✅ Safe JSON user data storage
// ✅ BroadcastUsers registration
// ✅ Owner + multi-admin notification
// ✅ Duplicate new-user notification protection
// ✅ Group notification
// ✅ View User Profile button
// ✅ Direct Open User Chat button
// ✅ EARNSTAR_ADMINS support
// =====================================================


// =====================================================
// ⚙️ CONFIGURATION
// =====================================================

var OWNER_ID = "7897324623"

// Fixed project-wide admin property
var ADMIN_PROPERTY = "EARNSTAR_ADMINS"

// Optional notification group
// Actual group ID yaha lagao
var GROUP_ID = "GROUP_ID_HERE"

// Welcome image
var WELCOME_IMAGE =
  "https://image.zaw-myo.workers.dev/image/547d5dd3-ffc4-4d98-af82-644b6d8ef419"


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
// 👥 GET SAFE ADMIN LIST
// Supports:
// ["123", "456"]
// [{id:"123"}]
// [{telegramId:"123"}]
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
      }

      else if (admin.telegramId) {
        adminId = String(admin.telegramId)
      }

    }

    else {
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

var fullName = user.first_name || "User"

if (user.last_name) {
  fullName += " " + user.last_name
}

var username = user.username
  ? "@" + user.username
  : "Not set"

var mention =
  "<a href='tg://user?id=" +
  userId +
  "'>" +
  escapeHTML(fullName) +
  "</a>"

var userKey = "USER_" + userId


// =====================================================
// 💾 GET EXISTING USER DATA
// =====================================================

var userData = Bot.getProperty(userKey)

var isNewUser = false
var joinedInfo = null


// =====================================================
// 🆕 NEW USER PROFILE
// =====================================================

if (!userData || typeof userData !== "object") {

  isNewUser = true

  joinedInfo = getISTDateTime()

  userData = {
    id: userId,
    name: fullName,
    username: username,
    language: null,

    joinedAt: joinedInfo.iso,
    joinedDate: joinedInfo.date,
    joinedTime: joinedInfo.time,

    source: "/start"
  }

}


// =====================================================
// 🔄 EXISTING USER PROFILE
// =====================================================

else {

  // Original joined date/time preserve rahega
  userData.id = userData.id || userId
  userData.name = fullName
  userData.username = username

  // Language preserve rahegi
  if (typeof userData.language === "undefined") {
    userData.language = null
  }

  // Agar purane profile mein joined data missing hai
  if (!userData.joinedAt) {

    joinedInfo = getISTDateTime()

    userData.joinedAt = joinedInfo.iso
    userData.joinedDate = joinedInfo.date
    userData.joinedTime = joinedInfo.time

  }

  if (!userData.source) {
    userData.source = "/start"
  }

}


// =====================================================
// 💾 SAVE USER PROFILE
// =====================================================

Bot.setProperty(
  userKey,
  userData,
  "json"
)


// =====================================================
// 📢 BROADCAST USERS
// =====================================================

var broadcastUsers = Bot.getProperty("BroadcastUsers")

if (!Array.isArray(broadcastUsers)) {
  broadcastUsers = []
}

var cleanBroadcastUsers = []

for (var b = 0; b < broadcastUsers.length; b++) {

  var broadcastId = String(broadcastUsers[b])

  if (
    broadcastId &&
    broadcastId !== "undefined" &&
    broadcastId !== "null" &&
    !cleanBroadcastUsers.includes(broadcastId)
  ) {
    cleanBroadcastUsers.push(broadcastId)
  }

}

if (!cleanBroadcastUsers.includes(userId)) {
  cleanBroadcastUsers.push(userId)
}

Bot.setProperty(
  "BroadcastUsers",
  cleanBroadcastUsers,
  "json"
)


// =====================================================
// 🌐 SAVED LANGUAGE
// =====================================================

var savedLanguage = userData.language


// =====================================================
// 🔘 LANGUAGE / MAIN MENU BUTTONS
// =====================================================

var buttons = []

if (savedLanguage) {

  buttons = [
    [
      {
        text: "🏠 MAIN MENU",
        callback_data: "MAIN_MENU"
      }
    ]
  ]

}

else {

  buttons = [
    [
      {
        text: "🇮🇳 Hinglish",
        callback_data: "LANG_HINGLISH"
      },
      {
        text: "🇬🇧 English",
        callback_data: "LANG_ENGLISH"
      }
    ],
    [
      {
        text: "🇬🇺 ગુજરાતી",
        callback_data: "LANG_GUJARATI"
      }
    ]
  ]

}


// =====================================================
// 📝 WELCOME TEXT
// =====================================================

var botName = "EarnStar 🤖 BOTCRAFT"

var text =
  "👋 <b>Welcome to " +
  botName +
  "!</b>\n\n" +

  "🚀 <b>Professional Telegram Bots & Automation</b>\n\n" +

  "🤖 Custom Telegram Bots\n" +
  "⚡ Business Automation\n" +
  "📊 Admin & Management Systems\n" +
  "💬 Customer Support Bots\n" +
  "📢 Broadcast & Notification Systems\n" +
  "🎯 Custom Bot Solutions\n\n" +

  "━━━━━━━━━━━━━━━━━━\n\n" +

  "💡 <b>Turn your idea into a powerful Telegram bot.</b>\n\n"

if (savedLanguage) {

  text +=
    "✅ <b>Your language is already selected.</b>\n\n" +
    "🏠 Tap below to open the Main Menu."

}

else {

  text +=
    "🌐 <b>Please select your preferred language:</b>\n\n" +
    "🇮🇳 Hinglish\n" +
    "🇬🇧 English\n" +
    "🇬🇺 Gujarati"

}


// =====================================================
// 🆕 NEW USER NOTIFICATION
// =====================================================

if (isNewUser) {

  var joinedDate =
    userData.joinedDate || "Not available"

  var joinedTime =
    userData.joinedTime || "Not available"

  var adminText =
    "🆕 <b>NEW USER JOINED</b>\n\n" +

    "👤 <b>Full Name:</b> " +
    escapeHTML(fullName) +
    "\n" +

    "🔵 <b>Mention:</b> " +
    mention +
    "\n" +

    "🔗 <b>Username:</b> " +
    escapeHTML(username) +
    "\n" +

    "🆔 <b>User ID:</b> <code>" +
    escapeHTML(userId) +
    "</code>\n" +

    "🌐 <b>Language:</b> " +
    escapeHTML(userData.language || "Not selected") +
    "\n" +

    "📅 <b>Joined Date:</b> " +
    escapeHTML(joinedDate) +
    "\n" +

    "🕒 <b>Joined Time:</b> " +
    escapeHTML(joinedTime) +
    " IST\n" +

    "📍 <b>Source:</b> " +
    escapeHTML(userData.source || "/start")


  var notificationButtons = {
    inline_keyboard: [
      [
        {
          text: "👁️ View User Profile",
          callback_data: "USER_PROFILE " + userId
        }
      ],
      [
        {
          text: "💬 Open User Chat",
          url: "tg://user?id=" + userId
        }
      ]
    ]
  }


  // ===================================================
  // 📢 SEND TO OWNER + AUTHORIZED ADMINS
  // ===================================================

  for (var a = 0; a < ADMIN_IDS.length; a++) {

    try {

      Api.sendMessage({
        chat_id: ADMIN_IDS[a],
        text: adminText,
        parse_mode: "HTML",
        reply_markup: notificationButtons
      })

    }

    catch (error) {

      // Invalid or blocked admin ko ignore karega
      // Main /start flow continue rahega

    }

  }


  // ===================================================
  // 📢 GROUP NOTIFICATION
  // ===================================================

  if (
    GROUP_ID &&
    GROUP_ID !== "GROUP_ID_HERE"
  ) {

    try {

      Api.sendMessage({
        chat_id: GROUP_ID,
        text: adminText,
        parse_mode: "HTML",
        reply_markup: notificationButtons
      })

    }

    catch (error) {

      // Group notification fail hone par user flow nahi rukega

    }

  }

}


// =====================================================
// 📸 SEND WELCOME MESSAGE
// =====================================================

Api.sendPhoto({

  photo: WELCOME_IMAGE,

  caption: text,

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: buttons
  }

})
