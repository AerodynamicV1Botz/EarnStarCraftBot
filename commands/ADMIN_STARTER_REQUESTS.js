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
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}


// ---------- ADMIN ACCESS ----------
let userId = user.telegramid

let ownerId = "7897324623"

let staffAdmins = Bot.getProperty("STAFF_ADMINS", [])

if (!Array.isArray(staffAdmins)) {
  staffAdmins = []
}

let isAdmin =
  String(userId) === String(ownerId) ||
  staffAdmins.map(String).includes(String(userId))

if (!isAdmin) {
  Api.sendMessage({
    chat_id: userId,
    text: "❌ <b>Access Denied</b>\n\nYou are not authorized to access this panel.",
    parse_mode: "HTML"
  })

  return
}


// ---------- LANGUAGE ----------
let userData = Bot.getProperty("USER_" + userId)

let language =
  userData && userData.language
    ? userData.language
    : "hinglish"


// ---------- LOAD REQUEST IDS ----------
let requestKeys = Bot.getProperty("STARTER_REQUEST_KEYS", [])

if (!Array.isArray(requestKeys)) {
  requestKeys = []
}


// ---------- STATUS COUNTS ----------
let pendingCount = 0
let acceptedCount = 0
let rejectedCount = 0
let cancelledCount = 0
let totalCount = 0

let requestButtons = []

// Latest requests first
requestKeys = requestKeys.slice().reverse()


// ---------- BUILD REQUEST LIST ----------
for (let i = 0; i < requestKeys.length; i++) {

  let requestId = requestKeys[i]

  let requestData = Bot.getProperty(
    "STARTER_REQUEST_" + requestId
  )

  if (!requestData) {
    continue
  }

  totalCount++

  let status = requestData.status || "pending"

  if (status === "pending") {
    pendingCount++
  }

  if (status === "accepted") {
    acceptedCount++
  }

  if (status === "rejected") {
    rejectedCount++
  }

  if (status === "cancelled") {
    cancelledCount++
  }

  let statusIcon = "🟡"

  if (status === "accepted") {
    statusIcon = "🟢"
  }

  if (status === "rejected") {
    statusIcon = "🔴"
  }

  if (status === "cancelled") {
    statusIcon = "⚫"
  }

  let customerName =
    requestData.fullName ||
    requestData.username ||
    "Unknown User"

  let serviceName =
    requestData.service ||
    "Starter Package"

  let buttonText =
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
      callback_data: "STARTER_ADMIN_VIEW " + requestId
    }
  ])

  // Show maximum 30 requests in one message
  if (requestButtons.length >= 30) {
    break
  }
}


// ---------- EMPTY LIST ----------
if (totalCount === 0) {

  let emptyText = ""

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

  Api.sendMessage({
    chat_id: userId,
    text: emptyText,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: requestButtons
    }
  })

  return
}


// ---------- HEADER TEXT ----------
let text = ""

if (language === "english") {

  text =
    "📋 <b>STARTER PACKAGE REQUESTS</b>\n\n" +
    "📊 <b>Total:</b> " + totalCount + "\n" +
    "🟡 <b>Pending:</b> " + pendingCount + "\n" +
    "🟢 <b>Accepted:</b> " + acceptedCount + "\n" +
    "🔴 <b>Rejected:</b> " + rejectedCount + "\n" +
    "⚫ <b>Cancelled:</b> " + cancelledCount + "\n\n" +
    "👇 Select a request to view details:"
}

else if (language === "gujarati") {

  text =
    "📋 <b>સ્ટાર્ટર પેકેજ રિક્વેસ્ટ્સ</b>\n\n" +
    "📊 <b>કુલ:</b> " + totalCount + "\n" +
    "🟡 <b>પેન્ડિંગ:</b> " + pendingCount + "\n" +
    "🟢 <b>સ્વીકારેલી:</b> " + acceptedCount + "\n" +
    "🔴 <b>નકારેલી:</b> " + rejectedCount + "\n" +
    "⚫ <b>રદ કરેલી:</b> " + cancelledCount + "\n\n" +
    "👇 વિગતો જોવા માટે request પસંદ કરો:"
}

else {

  text =
    "📋 <b>STARTER PACKAGE REQUESTS</b>\n\n" +
    "📊 <b>Total:</b> " + totalCount + "\n" +
    "🟡 <b>Pending:</b> " + pendingCount + "\n" +
    "🟢 <b>Accepted:</b> " + acceptedCount + "\n" +
    "🔴 <b>Rejected:</b> " + rejectedCount + "\n" +
    "⚫ <b>Cancelled:</b> " + cancelledCount + "\n\n" +
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


// ---------- MESSAGE ID ----------
let messageId = null

if (
  typeof request !== "undefined" &&
  request &&
  request.message &&
  request.message.message_id
) {
  messageId = request.message.message_id
}


// ---------- SAME MESSAGE EDIT ----------
if (messageId) {

  try {

    Api.editMessageText({
      chat_id: userId,
      message_id: messageId,
      text: text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: requestButtons
      }
    })

  } catch (error) {

    try {

      Api.deleteMessage({
        chat_id: userId,
        message_id: messageId
      })

    } catch (deleteError) {
      // Ignore delete error
    }

    Api.sendMessage({
      chat_id: userId,
      text: text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: requestButtons
      }
    })

  }

} else {

  Api.sendMessage({
    chat_id: userId,
    text: text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: requestButtons
    }
  })

}
