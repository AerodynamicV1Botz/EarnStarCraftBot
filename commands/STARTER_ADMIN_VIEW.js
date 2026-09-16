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
// SCRIPT 20 — FINAL UPDATED VERSION
// COMMAND NAME: STARTER_ADMIN_VIEW
// STEP 4.1.2.1.2 — ADMIN VIEW STARTER REQUEST
// 📁 MAIN MENU → PRICING → STARTER PACKAGE → MY REQUESTS → VIEW
// 🌐 Hinglish | English | Gujarati
// ==========================================


// ==========================================
// ⚡ INSTANT CALLBACK RESPONSE
// ==========================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  try {
    Api.answerCallbackQuery({
      callback_query_id: request.id
    })
  } catch (error) {}
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

var chatId = uid
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

var ownerId = "7897324623"

var staffAdmins =
  Bot.getProperty("STAFF_ADMINS") || []

var isAdmin =
  uid === ownerId

if (
  !isAdmin &&
  Array.isArray(staffAdmins)
) {

  for (
    var a = 0;
    a < staffAdmins.length;
    a++
  ) {

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
    chat_id: chatId,
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

var requestId =
  String(params || "").trim()

if (!requestId) {

  Api.sendMessage({
    chat_id: chatId,
    text:
      "❌ <b>Request ID missing.</b>\n\n" +
      "Please valid request select karo.",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📋 All Starter Requests",
            callback_data: "ADMIN_STARTER_REQUESTS"
          }
        ],
        [
          {
            text: "🏠 Admin Panel",
            callback_data: "ADMIN_PANEL"
          }
        ]
      ]
    }
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
    chat_id: chatId,
    text:
      "❌ <b>Starter request nahi mili.</b>\n\n" +
      "🆔 Request ID: <code>" +
      escapeHTML(requestId) +
      "</code>",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📋 All Starter Requests",
            callback_data: "ADMIN_STARTER_REQUESTS"
          }
        ],
        [
          {
            text: "🏠 Admin Panel",
            callback_data: "ADMIN_PANEL"
          }
        ]
      ]
    }
  })

  return
}


// ==========================================
// 👤 USER DETAILS
// ==========================================

var requestUserId =
  String(starterRequest.userId || "")

var requestUser = Bot.getProperty(
  "USER_" + requestUserId
)

var fullName = ""

if (requestUser) {

  fullName =
    requestUser.firstName ||
    requestUser.first_name ||
    requestUser.name ||
    ""

  if (
    requestUser.lastName ||
    requestUser.last_name
  ) {

    fullName +=
      " " +
      (
        requestUser.lastName ||
        requestUser.last_name
      )

  }

}

if (!fullName) {
  fullName = "Unknown User"
}

var username = "Not available"

if (
  requestUser &&
  (
    requestUser.username ||
    requestUser.userName
  )
) {

  username =
    "@" +
    (
      requestUser.username ||
      requestUser.userName
    )

}


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

if (
  status === "in_progress" ||
  status === "in progress"
) {
  statusIcon = "🔵"
}

var displayStatus =
  statusIcon + " " + status.toUpperCase()


// ==========================================
// 📝 REQUEST DETAILS
// ==========================================

var savedRequestId =
  starterRequest.requestId || requestId

var savedService =
  starterRequest.service || "Starter Bot"

var savedCreatedAt =
  starterRequest.createdAt || "N/A"

var savedRequirements =
  starterRequest.requirements || "Not provided"

var text =
  "👑 <b>ADMIN — STARTER REQUEST</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +

  "🆔 <b>Request ID:</b> <code>" +
  escapeHTML(savedRequestId) +
  "</code>\n" +

  "🤖 Service: <b>" +
  escapeHTML(savedService) +
  "</b>\n" +

  "📌 Status: <b>" +
  escapeHTML(displayStatus) +
  "</b>\n" +

  "📅 Created: " +
  escapeHTML(savedCreatedAt) +

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
  escapeHTML(savedRequirements)


// ==========================================
// 📌 EXTRA STATUS DETAILS
// ==========================================

if (starterRequest.acceptedAt) {

  text +=
    "\n\n🟢 <b>Accepted At:</b> " +
    escapeHTML(
      starterRequest.acceptedAt
    )

}

if (starterRequest.rejectedAt) {

  text +=
    "\n\n🔴 <b>Rejected At:</b> " +
    escapeHTML(
      starterRequest.rejectedAt
    )

}

if (starterRequest.cancelledAt) {

  text +=
    "\n\n⚫ <b>Cancelled At:</b> " +
    escapeHTML(
      starterRequest.cancelledAt
    )

}

if (starterRequest.completedAt) {

  text +=
    "\n\n✅ <b>Completed At:</b> " +
    escapeHTML(
      starterRequest.completedAt
    )

}

if (starterRequest.adminResponse) {

  text +=
    "\n\n💬 <b>Admin Response:</b>\n" +
    escapeHTML(
      starterRequest.adminResponse
    )

}


// ==========================================
// 🔘 ADMIN BUTTONS
// ==========================================

var buttons = []

var isClosed =
  status === "accepted" ||
  status === "rejected" ||
  status === "cancelled" ||
  status === "completed"

if (!isClosed) {

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
    callback_data:
      "ADMIN_STARTER_REQUESTS"
  }
])

buttons.push([
  {
    text: "🏠 Admin Panel",
    callback_data:
      "ADMIN_PANEL"
  }
])


// ==========================================
// ✏️ EDIT OR SEND ADMIN DETAILS
// ==========================================

if (messageId) {

  try {

    Api.editMessageText({
      chat_id: chatId,
      message_id: messageId,
      text: text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: buttons
      }
    })

  } catch (error) {

    try {
      Api.deleteMessage({
        chat_id: chatId,
        message_id: messageId
      })
    } catch (deleteError) {}

    Api.sendMessage({
      chat_id: chatId,
      text: text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: buttons
      }
    })

  }

} else {

  Api.sendMessage({
    chat_id: chatId,
    text: text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons
    }
  })

}
