/*CMD
  command: MY_CUSTOM_REQUESTS
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
// SCRIPT 50 — UPDATED VERSION
// COMMAND NAME: MY_CUSTOM_REQUESTS
// STEP 4.4.2 — MY CUSTOM REQUESTS
// 📁 MAIN MENU → 📁 PRICING → CUSTOM PACKAGE → MY REQUESTS
// 🌐 Language support included
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================

// ---------- CALLBACK RESPONSE ----------
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

// ---------- REQUEST KEYS ----------
var keys = Bot.getProperty("CUSTOM_REQUEST_KEYS", [])
var myRequests = []

if (!Array.isArray(keys)) {
  keys = []
}

// ---------- FIND USER REQUESTS ----------
for (var i = 0; i < keys.length; i++) {
  var item = Bot.getProperty("CUSTOM_REQUEST_" + keys[i])

  if (
    item &&
    String(item.userId) == String(uid)
  ) {
    myRequests.push(item)
  }
}

// ---------- EMPTY REQUESTS ----------
if (myRequests.length == 0) {
  var emptyText = ""

  if (lang == "english") {
    emptyText =
      "📭 <b>No Custom Bot requests found.</b>\n\n" +
      "You have not submitted any custom request yet."
  } else if (lang == "gujarati") {
    emptyText =
      "📭 <b>કોઈ Custom Bot request મળી નથી.</b>\n\n" +
      "તમે હજુ સુધી કોઈ custom request submit કરી નથી."
  } else {
    emptyText =
      "📭 <b>Aapki koi Custom Bot request nahi hai.</b>\n\n" +
      "Aapne abhi tak koi custom request submit nahi ki."
  }

  Api.sendMessage({
    chat_id: uid,
    text: emptyText,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: lang == "english"
              ? "💎 Custom Package"
              : lang == "gujarati"
              ? "💎 Custom Package"
              : "💎 Custom Package",
            callback_data: "PRICE_CUSTOM"
          }
        ],
        [
          {
            text: lang == "english"
              ? "🏠 Main Menu"
              : lang == "gujarati"
              ? "🏠 મુખ્ય મેનુ"
              : "🏠 Main Menu",
            callback_data: "MAIN_MENU"
          }
        ]
      ]
    }
  })

  return
}

// ---------- SORT LATEST FIRST ----------
myRequests.sort(function(a, b) {
  return new Date(b.createdAt) - new Date(a.createdAt)
})

// ---------- LIMIT REQUESTS ----------
var visibleRequests = myRequests.slice(0, 10)

// ---------- HEADER ----------
var text = ""

if (lang == "english") {
  text = "📋 <b>My Custom Bot Requests</b>\n\n"
} else if (lang == "gujarati") {
  text = "📋 <b>મારી Custom Bot Requests</b>\n\n"
} else {
  text = "📋 <b>Meri Custom Bot Requests</b>\n\n"
}

// ---------- REQUEST LIST ----------
var buttons = []

for (var j = 0; j < visibleRequests.length; j++) {
  var item = visibleRequests[j]

  var status = String(item.status || "pending")
  var statusText = status

  if (status == "pending") {
    statusText = lang == "english"
      ? "⏳ Pending"
      : lang == "gujarati"
      ? "⏳ બાકી"
      : "⏳ Pending"
  } else if (status == "accepted") {
    statusText = lang == "english"
      ? "✅ Accepted"
      : lang == "gujarati"
      ? "✅ સ્વીકારેલ"
      : "✅ Accepted"
  } else if (status == "rejected") {
    statusText = lang == "english"
      ? "❌ Rejected"
      : lang == "gujarati"
      ? "❌ નકારેલ"
      : "❌ Rejected"
  } else if (status == "cancelled") {
    statusText = lang == "english"
      ? "🚫 Cancelled"
      : lang == "gujarati"
      ? "🚫 રદ કરેલ"
      : "🚫 Cancelled"
  }

  text +=
    "🆔 <code>" + item.requestId + "</code>\n" +
    "📌 Status: <b>" + statusText + "</b>\n" +
    "📅 " + (item.createdAt || "N/A") + "\n\n"

  buttons.push([
    {
      text: lang == "english"
        ? "🔎 View " + item.requestId
        : lang == "gujarati"
        ? "🔎 જુઓ " + item.requestId
        : "🔎 View " + item.requestId,
      callback_data: "CUSTOM_REQUEST_VIEW " + item.requestId
    }
  ])
}

// ---------- ACTION BUTTONS ----------
buttons.push([
  {
    text: lang == "english"
      ? "➕ New Custom Request"
      : lang == "gujarati"
      ? "➕ નવી Custom Request"
      : "➕ New Custom Request",
    callback_data: "ORDER_CUSTOM"
  }
])

buttons.push([
  {
    text: lang == "english"
      ? "🔄 Refresh"
      : lang == "gujarati"
      ? "🔄 ફરી લોડ કરો"
      : "🔄 Refresh",
    callback_data: "MY_CUSTOM_REQUESTS"
  },
  {
    text: lang == "english"
      ? "💎 Custom Package"
      : lang == "gujarati"
      ? "💎 Custom Package"
      : "💎 Custom Package",
    callback_data: "PRICE_CUSTOM"
  }
])

buttons.push([
  {
    text: lang == "english"
      ? "🏠 Main Menu"
      : lang == "gujarati"
      ? "🏠 મુખ્ય મેનુ"
      : "🏠 Main Menu",
    callback_data: "MAIN_MENU"
  }
])

// ---------- SEND MESSAGE ----------
Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
})
