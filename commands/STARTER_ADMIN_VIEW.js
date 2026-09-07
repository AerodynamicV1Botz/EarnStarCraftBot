/*CMD
  command: STARTER_ADMIN_VIEW
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
// SCRIPT 20 — NEW COMMAND
// COMMAND NAME: STARTER_ADMIN_VIEW
// STEP 4.1.2.1.2 — ADMIN VIEW STARTER REQUEST
// 📁 MAIN MENU → 📁 PRICING → STARTER PACKAGE → MY REQUESTS → VIEW
// 🌐 Language support included
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================

// ==========================================
// ⚡ INSTANT CALLBACK RESPONSE
// ==========================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

// ==========================================
// 🛡️ SAFE HTML ESCAPE
// ==========================================

function escapeHTML(value) {
  if (value === null || value === undefined) {
    return ""
  }

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

// ==========================================
// 👑 ADMIN ACCESS CHECK
// ==========================================

var uid = String(user.telegramid)

var ownerId = "7897324623"

var staffAdmins =
  Bot.getProperty("STAFF_ADMINS") || []

var isAdmin = uid === ownerId

if (!isAdmin && Array.isArray(staffAdmins)) {

  for (var a = 0; a < staffAdmins.length; a++) {

    if (
      String(staffAdmins[a]) === uid
    ) {
      isAdmin = true
      break
    }

  }

}

if (!isAdmin) {

  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>Access Denied</b>\n\n" +
      "Sirf admin is request ko dekh sakta hai.",
    parse_mode: "HTML"
  })

  return
}

// ==========================================
// 📌 GET REQUEST ID
// ==========================================

var requestId = String(params || "").trim()

if (!requestId) {

  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>Request ID missing.</b>\n\n" +
      "Please valid request select karo.",
    parse_mode: "HTML"
  })

  return
}

// ==========================================
// 📦 GET REQUEST DATA
// ==========================================

var starterRequest = Bot.getProperty(
  "STARTER_REQUEST_" + requestId
)

if (!starterRequest) {

  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>Starter request nahi mili.</b>\n\n" +
      "🆔 Request ID: <code>" +
      escapeHTML(requestId) +
      "</code>",
    parse_mode: "HTML"
  })

  return
}

// ==========================================
// 👤 USER DETAILS
// ==========================================

var requestUserId = String(
  starterRequest.userId || ""
)

var requestUser = Bot.getProperty(
  "USER_" + requestUserId
)

var fullName = ""

if (requestUser) {

  fullName =
    requestUser.firstName ||
    requestUser.name ||
    ""

  if (
    requestUser.lastName
  ) {
    fullName +=
      " " + requestUser.lastName
  }

}

if (!fullName) {
  fullName = "Unknown User"
}

var username =
  requestUser && requestUser.username
    ? "@" + requestUser.username
    : "Not available"

// ==========================================
// 📌 STATUS
// ==========================================

var status = String(
  starterRequest.status || "pending"
).toLowerCase()

var statusIcon = "🟡"

if (status === "accepted") {
  statusIcon = "🟢"
}

if (status === "rejected") {
  statusIcon = "🔴"
}

if (status === "cancelled") {
  statusIcon = "⚫"
}

if (status === "completed") {
  statusIcon = "✅"
}

var displayStatus =
  statusIcon + " " + status.toUpperCase()

// ==========================================
// 📝 REQUEST DETAILS
// ==========================================

var text =
  "👑 <b>ADMIN — STARTER REQUEST</b>\n\n" +
  "🆔 Request ID: <code>" +
  escapeHTML(
    starterRequest.requestId || requestId
  ) +
  "</code>\n" +
  "🤖 Service: <b>" +
  escapeHTML(
    starterRequest.service || "Starter Bot"
  ) +
  "</b>\n" +
  "📌 Status: <b>" +
  escapeHTML(displayStatus) +
  "</b>\n" +
  "📅 Created: " +
  escapeHTML(
    starterRequest.createdAt || "N/A"
  ) +
  "\n\n" +
  "👤 <b>User Details</b>\n" +
  "🆔 User ID: <code>" +
  escapeHTML(requestUserId) +
  "</code>\n" +
  "👤 Name: " +
  escapeHTML(fullName) +
  "\n" +
  "🔗 Username: " +
  escapeHTML(username) +
  "\n\n" +
  "📝 <b>User Requirements</b>\n" +
  escapeHTML(
    starterRequest.requirements || "Not provided"
  )

if (starterRequest.cancelledAt) {

  text +=
    "\n\n❌ <b>Cancelled At:</b> " +
    escapeHTML(
      starterRequest.cancelledAt
    )

}

// ==========================================
// 🔘 ADMIN BUTTONS
// ==========================================

var buttons = []

if (
  status !== "accepted" &&
  status !== "rejected" &&
  status !== "cancelled" &&
  status !== "completed"
) {

  buttons.push([
    {
      text: "🟢 Accept Request",
      callback_data:
        "STARTER_ACCEPT " + requestId
    },
    {
      text: "🔴 Reject Request",
      callback_data:
        "STARTER_REJECT " + requestId
    }
  ])

}

buttons.push([
  {
    text: "💬 Contact User",
    callback_data:
      "STARTER_CONTACT " + requestId
  }
])

buttons.push([
  {
    text: "📋 All Starter Requests",
    callback_data: "ADMIN_STARTER_REQUESTS"
  }
])

buttons.push([
  {
    text: "🏠 Admin Panel",
    callback_data: "ADMIN_PANEL"
  }
])

// ==========================================
// 📤 SEND ADMIN DETAILS
// ==========================================

Api.sendMessage({
  chat_id: uid,

  text: text,

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: buttons
  }
})
