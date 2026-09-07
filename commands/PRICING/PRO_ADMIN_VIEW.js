/*CMD
  command: PRO_ADMIN_VIEW
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
// SCRIPT 42 — NEW VERSION
// COMMAND NAME: PRO_ADMIN_VIEW
// STEP 4.3.2.1.2 — PROFESSIONAL ADMIN REQUEST VIEW
// 📁 MAIN MENU → 📁 PRICING → PROFESSIONAL PACKAGE → MY REQUESTS → VIEW REQUEST → ADMIN VIEW
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


// ---------- ADMIN CHECK ----------
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


// ---------- STATUS ----------
var status = String(
  requestData.status || "pending"
)

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


// ---------- ADMIN TEXT ----------
var text =
  "🟣 <b>Professional Bot Request</b>\n\n" +
  "🆔 Request ID: <code>" + requestData.requestId + "</code>\n" +
  "👤 Name: " + (requestData.fullName || "Not available") + "\n" +
  "🔗 Username: " + (requestData.username || "Not available") + "\n" +
  "🆔 User ID: <code>" + requestData.userId + "</code>\n" +
  "🤖 Service: <b>" + (requestData.service || "Professional Bot") + "</b>\n" +
  "📦 Package: <b>" + (requestData.package || "Professional") + "</b>\n" +
  "💰 Price: <b>" + (requestData.price || "₹2,999+") + "</b>\n" +
  "📌 Status: <b>" + statusText + "</b>\n" +
  "📅 Created: " + (requestData.createdAt || "Not available") + "\n\n" +
  "📝 <b>Requirements:</b>\n" +
  (requestData.requirements || "Not available")


// ---------- BUTTONS ----------
var buttons = []

if (status == "pending") {

  buttons.push([
    {
      text: "✅ Accept",
      callback_data: "PRO_ACCEPT " + requestId
    },
    {
      text: "❌ Reject",
      callback_data: "PRO_REJECT " + requestId
    }
  ])

}

buttons.push([
  {
    text: "💬 Contact User",
    callback_data: "PRO_CONTACT " + requestId
  }
])

buttons.push([
  {
    text: "📋 All Professional Requests",
    callback_data: "ADMIN_PRO_REQUESTS"
  }
])

buttons.push([
  {
    text: "🛠 Admin Panel",
    callback_data: "ADMIN_PANEL"
  }
])


// ---------- MESSAGE ID ----------
var messageId = null

if (
  typeof request !== "undefined" &&
  request &&
  request.message &&
  request.message.message_id
) {
  messageId = request.message.message_id
}


// ---------- EDIT EXISTING MESSAGE ----------
if (messageId) {

  try {

    Api.editMessageText({
      chat_id: user.telegramid,
      message_id: messageId,
      text: text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: buttons
      }
    })

  } catch (error) {

    Bot.sendMessage(text, {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: buttons
      }
    })

  }

} else {

  Bot.sendMessage(text, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons
    }
  })

}
