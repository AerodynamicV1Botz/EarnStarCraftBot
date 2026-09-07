/*CMD
  command: PRO_CONTACT
  help: 
  need_reply: false
  auto_retry_time: 
  folder: PRICING

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 43 — UPDATED VERSION
// COMMAND NAME: PRO_CONTACT
// STEP 4.3.2.1.2.1 — CONTACT PROFESSIONAL REQUEST USER
// 📁 MAIN MENU → 📁 PRICING → PROFESSIONAL PACKAGE → MY REQUESTS → VIEW REQUEST → ADMIN VIEW → CONTACT USER
// 🌐 Language support included
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================


// ---------- ADMIN / STAFF CHECK ----------
var ownerId = "7897324623"

var staffAdmins = Bot.getProperty("STAFF_ADMINS") || []

if (!Array.isArray(staffAdmins)) {
  staffAdmins = []
}

var currentUserId = String(user.telegramid)

var isAdmin = currentUserId == ownerId

for (var i = 0; i < staffAdmins.length; i++) {
  if (currentUserId == String(staffAdmins[i])) {
    isAdmin = true
    break
  }
}

if (!isAdmin) {
  return
}


// ---------- REQUEST ID ----------
var requestId = params

var requestData = Bot.getProperty(
  "PRO_REQUEST_" + requestId
)


// ---------- REQUEST NOT FOUND ----------
if (!requestData) {
  return Bot.sendMessage(
    "❌ <b>Professional request not found.</b>",
    {
      parse_mode: "HTML"
    }
  )
}


// ---------- USER DETAILS ----------
var fullName = requestData.fullName || "Not available"

var username = requestData.username || "Not available"

var targetUserId = requestData.userId


// ---------- CONTACT TEXT ----------
var text =
  "📩 <b>Professional Request Contact</b>\n\n" +
  "🆔 Request ID: <code>" + requestId + "</code>\n" +
  "👤 Name: " + fullName + "\n" +
  "🔗 Username: " + username + "\n" +
  "🆔 User ID: <code>" + targetUserId + "</code>\n\n" +
  "User ko contact karne ke liye neeche button use karein."


// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: "💬 Contact User",
      url: "tg://user?id=" + targetUserId
    }
  ],
  [
    {
      text: "👁 View Request",
      callback_data: "PRO_ADMIN_VIEW " + requestId
    }
  ],
  [
    {
      text: "📋 All Professional Requests",
      callback_data: "ADMIN_PRO_REQUESTS"
    }
  ],
  [
    {
      text: "🛠 Admin Panel",
      callback_data: "ADMIN_PANEL"
    }
  ]
]


// ---------- SEND CONTACT DETAILS ----------
Bot.sendMessage(text, {
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
})
