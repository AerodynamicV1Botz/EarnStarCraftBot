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

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 1 — UPDATED VERSION
// COMMAND: /start
// STEP 1
// 🌐 LANGUAGE SUPPORT INCLUDED
// ==========================================
// FEATURES:
// ✅ Full Name
// ✅ Clickable Mention
// ✅ Username
// ✅ User ID
// ✅ Original Joined Date & Time
// ✅ Language Preservation
// ✅ Safe User Data Saving
// ✅ Duplicate New-User Notification Protection
// ✅ Owner + Multi-Admin Notification
// ✅ Group Notification
// ✅ View User Profile Button
// ✅ Direct Open User Chat Button
// ✅ Separate Staff Data Storage
// ==========================================


// ==========================================
// ⚙️ CONFIGURATION
// ==========================================

// 👑 OWNER ADMIN
var OWNER_ID = "7897324623"

// 👨‍💼 STAFF ADMINS
// Abhi empty hai.
// Staff add karne ke baad IDs yaha automatically save hongi.

var STAFF_PROPERTY = "STAFF_ADMINS"

// 📢 GROUP CHAT ID
// Actual group ID yaha lagao.
// Example: "-1001234567890"

var GROUP_ID = "GROUP_ID_HERE"


// ==========================================
// 🛡️ SAFE HTML ESCAPE
// ==========================================

function escapeHTML(value) {

  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")

}


// ==========================================
// 🕒 IST DATE & TIME
// ==========================================

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


// ==========================================
// 👥 GET SAFE ADMIN LIST
// ==========================================

function getAdminList() {

  var savedStaff = Bot.getProperty(STAFF_PROPERTY)

  var staffList = []

  if (Array.isArray(savedStaff)) {
    staffList = savedStaff
  }

  // Convert IDs to strings.
  staffList = staffList.map(function(id) {
    return String(id)
  })

  // Remove duplicate IDs.
  staffList = staffList.filter(function(id, index) {
    return staffList.indexOf(id) === index
  })

  // Owner must always remain included.
  if (!staffList.includes(String(OWNER_ID))) {
    staffList.unshift(String(OWNER_ID))
  }

  return staffList

}

var ADMIN_IDS = getAdminList()


// ==========================================
// 👤 USER INFORMATION
// ==========================================

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


// ==========================================
// 💾 GET EXISTING USER DATA
// ==========================================

var userData = Bot.getProperty(userKey)

var isNewUser = false

var joinedInfo


// ==========================================
// 🆕 NEW USER
// ==========================================

if (!userData) {

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


// ==========================================
// 🔄 EXISTING USER
// ==========================================

else {

  // Current information update.
  // Original joined date/time change nahi hoga.

  userData.id = userData.id || userId
  userData.name = fullName
  userData.username = username

  // Language preserve rahegi.
  if (typeof userData.language === "undefined") {
    userData.language = null
  }

  // Purane users ke liye missing joining information.
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


// ==========================================
// 💾 SAFE USER DATA SAVE
// ==========================================

Bot.setProperty(
  userKey,
  userData,
  "json"
)


// ==========================================
// 📢 BROADCAST USERS
// ==========================================

var broadcastUsers = Bot.getProperty("BroadcastUsers")

if (!Array.isArray(broadcastUsers)) {
  broadcastUsers = []
}

// Keep IDs consistent as strings.
broadcastUsers = broadcastUsers.map(function(id) {
  return String(id)
})

if (!broadcastUsers.includes(userId)) {

  broadcastUsers.push(userId)

  Bot.setProperty(
    "BroadcastUsers",
    broadcastUsers,
    "json"
  )

}


// ==========================================
// 🌐 SAVED LANGUAGE
// ==========================================

var savedLanguage = userData.language


// ==========================================
// 🔘 LANGUAGE BUTTONS
// ==========================================

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


// ==========================================
// 📝 WELCOME TEXT
// ==========================================

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


// ==========================================
// 🆕 NEW USER NOTIFICATION
// ==========================================

if (isNewUser) {

  var joinedDate = userData.joinedDate || "Not available"
  var joinedTime = userData.joinedTime || "Not available"

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


  // ========================================
  // 📢 SEND TO OWNER + ALL STAFF
  // ========================================

  for (var i = 0; i < ADMIN_IDS.length; i++) {

    Api.sendMessage({
      chat_id: ADMIN_IDS[i],
      text: adminText,
      parse_mode: "HTML",
      reply_markup: notificationButtons
    })

  }


  // ========================================
  // 📢 GROUP NOTIFICATION
  // ========================================

  if (
    GROUP_ID &&
    GROUP_ID !== "GROUP_ID_HERE"
  ) {

    Api.sendMessage({
      chat_id: GROUP_ID,
      text: adminText,
      parse_mode: "HTML",
      reply_markup: notificationButtons
    })

  }

}


// ==========================================
// 📸 SEND WELCOME MESSAGE
// ==========================================

Api.sendPhoto({
  photo:
    "https://image.zaw-myo.workers.dev/image/547d5dd3-ffc4-4d98-af82-644b6d8ef419",

  caption: text,

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: buttons
  }
})
