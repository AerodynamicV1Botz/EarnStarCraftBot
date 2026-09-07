/*CMD
  command: MY_PRO_REQUESTS
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
// SCRIPT 39 — UPDATED VERSION
// COMMAND NAME: MY_PRO_REQUESTS
// STEP 4.3.2 — MY PROFESSIONAL REQUESTS
// 📁 MAIN MENU → 📁 PRICING → PROFESSIONAL PACKAGE → MY REQUESTS
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


// ---------- USER DATA ----------
var uid = user.telegramid

var userData = Bot.getProperty("USER_" + uid) || {}

var lang = userData.language || "hinglish"


// ---------- GET REQUEST KEYS ----------
var keys = Bot.getProperty("PRO_REQUEST_KEYS", [])

if (!Array.isArray(keys)) {
  keys = []
}

var myRequests = []


// ---------- FIND USER REQUESTS ----------
for (var i = 0; i < keys.length; i++) {

  var requestData = Bot.getProperty(
    "PRO_REQUEST_" + keys[i]
  )

  if (
    requestData &&
    String(requestData.userId) == String(uid)
  ) {
    myRequests.push(requestData)
  }

}


// ---------- EMPTY REQUESTS ----------
if (myRequests.length == 0) {

  var emptyText = ""

  if (lang == "english") {

    emptyText =
      "📭 <b>No Professional Bot requests found.</b>\n\n" +
      "You have not submitted any Professional Bot request yet."

  } else if (lang == "gujarati") {

    emptyText =
      "📭 <b>કોઈ Professional Bot request મળી નથી.</b>\n\n" +
      "તમે હજુ સુધી કોઈ Professional Bot request submit કરી નથી."

  } else {

    emptyText =
      "📭 <b>Apki koi Professional Bot request nahi hai.</b>\n\n" +
      "Aapne abhi tak Professional Bot ki koi request submit nahi ki."

  }

  return Bot.sendMessage(emptyText, {
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
            text: "🏠 Main Menu",
            callback_data: "MAIN_MENU"
          }
        ]
      ]
    }
  })

}


// ---------- SORT LATEST FIRST ----------
myRequests.sort(function(a, b) {

  return new Date(b.createdAt) - new Date(a.createdAt)

})


// ---------- REQUEST LIST TEXT ----------
var text = ""

if (lang == "english") {

  text =
    "📋 <b>My Professional Bot Requests</b>\n\n" +
    "Here are your submitted requests:\n\n"

} else if (lang == "gujarati") {

  text =
    "📋 <b>મારી Professional Bot Requests</b>\n\n" +
    "તમારી submit કરેલી requests અહીં છે:\n\n"

} else {

  text =
    "📋 <b>Meri Professional Bot Requests</b>\n\n" +
    "Apki submit ki hui requests yahan hain:\n\n"

}

var buttons = []


// ---------- SHOW MAX 10 REQUESTS ----------
var limit = Math.min(myRequests.length, 10)

for (var j = 0; j < limit; j++) {

  var item = myRequests[j]

  var status = String(item.status || "pending")

  var statusText = status

  if (status == "pending") {
    statusText = "⏳ Pending"
  } else if (status == "accepted") {
    statusText = "✅ Accepted"
  } else if (status == "rejected") {
    statusText = "❌ Rejected"
  } else if (status == "cancelled") {
    statusText = "🚫 Cancelled"
  }

  text +=
    "🆔 <code>" + item.requestId + "</code>\n" +
    "📌 Status: <b>" + statusText + "</b>\n" +
    "📅 " + item.createdAt + "\n\n"

  buttons.push([
    {
      text: "🔎 View " + item.requestId,
      callback_data: "PRO_REQUEST_VIEW " + item.requestId
    }
  ])

}


// ---------- EXTRA BUTTONS ----------
buttons.push([
  {
    text: "🔄 Refresh",
    callback_data: "MY_PRO_REQUESTS"
  },
  {
    text: "➕ New Request",
    callback_data: "ORDER_PRO"
  }
])

buttons.push([
  {
    text: "🟣 Professional Package",
    callback_data: "PRICE_PRO"
  },
  {
    text: "🏠 Main Menu",
    callback_data: "MAIN_MENU"
  }
])


// ---------- SEND REQUEST LIST ----------
Bot.sendMessage(text, {
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
})
