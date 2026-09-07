/*CMD
  command: ADMIN_PRO_REQUESTS
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
// SCRIPT 46 — NEW VERSION
// COMMAND NAME: ADMIN_PRO_REQUESTS
// STEP 4.3.2.1.2.3 — ALL PROFESSIONAL REQUESTS
// 📁 MAIN MENU → 📁 PRICING → PROFESSIONAL PACKAGE → MY REQUESTS → VIEW REQUEST → ADMIN VIEW → ALL REQUESTS
// 🌐 Language support included
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================


// ---------- SAFE CALLBACK RESPONSE ----------
if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}


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


// ---------- GET REQUEST KEYS ----------
var keys = Bot.getProperty("PRO_REQUEST_KEYS", [])

if (!Array.isArray(keys)) {
  keys = []
}

var allRequests = []

var pendingCount = 0
var acceptedCount = 0
var rejectedCount = 0
var cancelledCount = 0


// ---------- LOAD ALL REQUESTS ----------
for (var i = 0; i < keys.length; i++) {

  var requestData = Bot.getProperty(
    "PRO_REQUEST_" + keys[i]
  )

  if (!requestData) {
    continue
  }

  allRequests.push(requestData)

  var status = String(
    requestData.status || "pending"
  )

  if (status == "pending") {
    pendingCount++
  } else if (status == "accepted") {
    acceptedCount++
  } else if (status == "rejected") {
    rejectedCount++
  } else if (status == "cancelled") {
    cancelledCount++
  }

}


// ---------- EMPTY REQUESTS ----------
if (allRequests.length == 0) {

  return Bot.sendMessage(
    "📭 <b>No Professional Bot requests found.</b>\n\n" +
    "Abhi tak koi Professional request submit nahi hui hai.",
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🟣 Professional Package",
              callback_data: "PRICE_PRO"
            }
          ],
          [
            {
              text: "🛠 Admin Panel",
              callback_data: "ADMIN_PANEL"
            }
          ]
        ]
      }
    }
  )

}


// ---------- SORT LATEST FIRST ----------
allRequests.sort(function(a, b) {

  return new Date(b.createdAt) - new Date(a.createdAt)

})


// ---------- HEADER ----------
var text =
  "🟣 <b>All Professional Bot Requests</b>\n\n" +
  "📊 <b>Request Summary</b>\n" +
  "⏳ Pending: <b>" + pendingCount + "</b>\n" +
  "✅ Accepted: <b>" + acceptedCount + "</b>\n" +
  "❌ Rejected: <b>" + rejectedCount + "</b>\n" +
  "🚫 Cancelled: <b>" + cancelledCount + "</b>\n" +
  "📦 Total: <b>" + allRequests.length + "</b>\n\n"


var buttons = []

// ---------- SHOW LATEST 10 REQUESTS ----------
var limit = Math.min(allRequests.length, 10)

for (var j = 0; j < limit; j++) {

  var item = allRequests[j]

  var status = String(
    item.status || "pending"
  )

  var statusIcon = "⏳"

  if (status == "accepted") {
    statusIcon = "✅"
  } else if (status == "rejected") {
    statusIcon = "❌"
  } else if (status == "cancelled") {
    statusIcon = "🚫"
  }

  text +=
    statusIcon + " <b>" + item.requestId + "</b>\n" +
    "👤 " + (item.fullName || "Unknown User") + "\n" +
    "📌 " + status + "\n" +
    "📅 " + (item.createdAt || "Not available") + "\n\n"

  buttons.push([
    {
      text: "👁 View " + item.requestId,
      callback_data: "PRO_ADMIN_VIEW " + item.requestId
    }
  ])

}


// ---------- NAVIGATION BUTTONS ----------
buttons.push([
  {
    text: "🔄 Refresh",
    callback_data: "ADMIN_PRO_REQUESTS"
  },
  {
    text: "🟣 Professional Package",
    callback_data: "PRICE_PRO"
  }
])

buttons.push([
  {
    text: "🛠 Admin Panel",
    callback_data: "ADMIN_PANEL"
  }
])


// ---------- SEND REQUEST LIST ----------
Bot.sendMessage(text, {
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
})
