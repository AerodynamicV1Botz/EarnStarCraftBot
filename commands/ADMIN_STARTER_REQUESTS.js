/*CMD
  command: ADMIN_STARTER_REQUESTS
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
// SCRIPT 24 — NEW VERSION
// COMMAND NAME: ADMIN_STARTER_REQUESTS
// STEP 4.1.2.1.2.4 — ADMIN STARTER REQUESTS
// 📁 MAIN MENU → 📁 PRICING → STARTER PACKAGE → ADMIN VIEW
// 🌐 Language support included
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================


// ---------- SAFE CALLBACK RESPONSE ----------
if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  try {
    Api.answerCallbackQuery({
      callback_query_id: request.id
    })
  } catch (error) {
    // Ignore callback response error
  }
}


// ---------- USER AND CHAT INFO ----------
var userId = String(user.telegramid)

var chatId = userId
var messageId = null

if (
  typeof request !== "undefined" &&
  request &&
  request.message
) {
  if (
    request.message.chat &&
    request.message.chat.id
  ) {
    chatId = request.message.chat.id
  }

  if (request.message.message_id) {
    messageId = request.message.message_id
  }
}


// ---------- ADMIN ACCESS ----------
var ownerId = "7897324623"

var staffAdmins = Bot.getProperty(
  "STAFF_ADMINS",
  []
)

if (!Array.isArray(staffAdmins)) {
  staffAdmins = []
}

var isAdmin =
  String(userId) === String(ownerId) ||
  staffAdmins.map(String).includes(String(userId))

if (!isAdmin) {
  Api.sendMessage({
    chat_id: chatId,
    text:
      "❌ <b>Access Denied</b>\n\n" +
      "You are not authorized to access this panel.",
    parse_mode: "HTML"
  })

  return
}


// ---------- LANGUAGE ----------
var userData = Bot.getProperty(
  "USER_" + userId
)

var language = "hinglish"

if (
  userData &&
  userData.language
) {
  language = userData.language
}


// ---------- LOAD REQUEST IDS ----------
var requestKeys = Bot.getProperty(
  "STARTER_REQUEST_KEYS",
  []
)

if (!Array.isArray(requestKeys)) {
  requestKeys = []
}


// ---------- REMOVE DUPLICATE REQUEST IDS ----------
var uniqueKeys = []
var seenKeys = {}

for (var k = 0; k < requestKeys.length; k++) {
  var currentKey = String(requestKeys[k])

  if (!seenKeys[currentKey]) {
    seenKeys[currentKey] = true
    uniqueKeys.push(currentKey)
  }
}

requestKeys = uniqueKeys.slice().reverse()


// ---------- STATUS COUNTS ----------
var pendingCount = 0
var acceptedCount = 0
var rejectedCount = 0
var cancelledCount = 0
var closedCount = 0
var totalCount = 0

var requestButtons = []
var displayedCount = 0

// ---------- MAX REQUESTS ----------
var MAX_REQUESTS = 30


// ---------- BUILD REQUEST LIST ----------
for (
  var i = 0;
  i < requestKeys.length;
  i++
) {
  var requestId = String(requestKeys[i])

  if (!requestId) {
    continue
  }

  var requestData = Bot.getProperty(
    "STARTER_REQUEST_" + requestId
  )

  if (
    !requestData ||
    typeof requestData !== "object"
  ) {
    continue
  }

  totalCount++

  var status = String(
    requestData.status || "pending"
  ).toLowerCase()

  if (status === "pending") {
    pendingCount++
  }

  else if (status === "accepted") {
    acceptedCount++
  }

  else if (status === "rejected") {
    rejectedCount++
  }

  else if (status === "cancelled") {
    cancelledCount++
  }

  else if (status === "closed") {
    closedCount++
  }


  // ---------- STATUS ICON ----------
  var statusIcon = "🟡"

  if (status === "accepted") {
    statusIcon = "🟢"
  }

  else if (status === "rejected") {
    statusIcon = "🔴"
  }

  else if (status === "cancelled") {
    statusIcon = "⚫"
  }

  else if (status === "closed") {
    statusIcon = "🔵"
  }


  // ---------- CUSTOMER NAME ----------
  var customerName =
    requestData.fullName ||
    requestData.username ||
    requestData.name ||
    "Unknown User"

  customerName = String(customerName)
    .replace(/\n/g, " ")
    .trim()

  if (customerName.length > 28) {
    customerName =
      customerName.substring(0, 25) + "..."
  }


  // ---------- SERVICE NAME ----------
  var serviceName =
    requestData.service ||
    "Starter Package"

  serviceName = String(serviceName)
    .replace(/\n/g, " ")
    .trim()

  if (serviceName.length > 20) {
    serviceName =
      serviceName.substring(0, 17) + "..."
  }


  // ---------- BUTTON TEXT ----------
  var buttonText =
    statusIcon +
    " " +
    requestId +
    " • " +
    customerName +
    " • " +
    serviceName

  requestButtons.push([
    {
      text: buttonText,
      callback_data:
        "STARTER_ADMIN_VIEW " + requestId
    }
  ])

  displayedCount++

  if (displayedCount >= MAX_REQUESTS) {
    break
  }
}


// ---------- EMPTY LIST ----------
if (totalCount === 0) {

  var emptyText = ""

  if (language === "english") {
    emptyText =
      "📋 <b>Starter Requests</b>\n\n" +
      "No Starter Package requests found."
  }

  else if (language === "gujarati") {
    emptyText =
      "📋 <b>સ્ટાર્ટર રિક્વેસ્ટ્સ</b>\n\n" +
      "હાલમાં કોઈ Starter Package request મળી નથી."
  }

  else {
    emptyText =
      "📋 <b>Starter Requests</b>\n\n" +
      "Abhi tak koi Starter Package request nahi mili."
  }

  requestButtons.push([
    {
      text: "🔄 Refresh",
      callback_data: "ADMIN_STARTER_REQUESTS"
    }
  ])

  requestButtons.push([
    {
      text: "⬅️ Admin Panel",
      callback_data: "ADMIN_PANEL"
    }
  ])

  if (messageId) {
    try {
      Api.editMessageText({
        chat_id: chatId,
        message_id: messageId,
        text: emptyText,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: requestButtons
        }
      })

      return

    } catch (error) {
      // Continue with send fallback
    }
  }

  Api.sendMessage({
    chat_id: chatId,
    text: emptyText,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: requestButtons
    }
  })

  return
}


// ---------- HEADER TEXT ----------
var text = ""

if (language === "english") {

  text =
    "📋 <b>STARTER PACKAGE REQUESTS</b>\n\n" +
    "📊 <b>Total:</b> " + totalCount + "\n" +
    "🟡 <b>Pending:</b> " + pendingCount + "\n" +
    "🟢 <b>Accepted:</b> " + acceptedCount + "\n" +
    "🔴 <b>Rejected:</b> " + rejectedCount + "\n" +
    "⚫ <b>Cancelled:</b> " + cancelledCount + "\n" +
    "🔵 <b>Closed:</b> " + closedCount + "\n\n" +
    "📌 <b>Showing:</b> " +
    displayedCount +
    " latest requests\n\n" +
    "👇 Select a request to view details:"
}

else if (language === "gujarati") {

  text =
    "📋 <b>સ્ટાર્ટર પેકેજ રિક્વેસ્ટ્સ</b>\n\n" +
    "📊 <b>કુલ:</b> " + totalCount + "\n" +
    "🟡 <b>પેન્ડિંગ:</b> " + pendingCount + "\n" +
    "🟢 <b>સ્વીકારેલી:</b> " + acceptedCount + "\n" +
    "🔴 <b>નકારેલી:</b> " + rejectedCount + "\n" +
    "⚫ <b>રદ કરેલી:</b> " + cancelledCount + "\n" +
    "🔵 <b>બંધ:</b> " + closedCount + "\n\n" +
    "📌 <b>દેખાડેલી:</b> " +
    displayedCount +
    " નવીનતમ requests\n\n" +
    "👇 વિગતો જોવા માટે request પસંદ કરો:"
}

else {

  text =
    "📋 <b>STARTER PACKAGE REQUESTS</b>\n\n" +
    "📊 <b>Total:</b> " + totalCount + "\n" +
    "🟡 <b>Pending:</b> " + pendingCount + "\n" +
    "🟢 <b>Accepted:</b> " + acceptedCount + "\n" +
    "🔴 <b>Rejected:</b> " + rejectedCount + "\n" +
    "⚫ <b>Cancelled:</b> " + cancelledCount + "\n" +
    "🔵 <b>Closed:</b> " + closedCount + "\n\n" +
    "📌 <b>Showing:</b> " +
    displayedCount +
    " latest requests\n\n" +
    "👇 Details dekhne ke liye request select karo:"
}


// ---------- CONTROL BUTTONS ----------
requestButtons.push([
  {
    text: "🔄 Refresh",
    callback_data: "ADMIN_STARTER_REQUESTS"
  }
])

requestButtons.push([
  {
    text: "⬅️ Admin Panel",
    callback_data: "ADMIN_PANEL"
  }
])


// ---------- SAME MESSAGE EDIT ----------
if (messageId) {

  try {

    Api.editMessageText({
      chat_id: chatId,
      message_id: messageId,
      text: text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: requestButtons
      }
    })

    return

  } catch (error) {

    try {

      Api.deleteMessage({
        chat_id: chatId,
        message_id: messageId
      })

    } catch (deleteError) {
      // Ignore delete error
    }
  }
}


// ---------- SEND NEW MESSAGE ----------
Api.sendMessage({
  chat_id: chatId,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: requestButtons
  }
})
