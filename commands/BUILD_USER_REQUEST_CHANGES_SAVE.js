/*CMD
  command: BUILD_USER_REQUEST_CHANGES_SAVE
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/*CMD
  command: BUILD_USER_REQUEST_CHANGES_SAVE
  need_reply: true
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 203 — BUILD_USER_REQUEST_CHANGES_SAVE
//
// USER → SAVE REQUESTED CHANGES
// Sends requested changes to admin.
// =====================================================


// =====================================================
// 👤 USER ID
// =====================================================

var uid = String(user.telegramid)


// =====================================================
// 🔐 HTML SAFE TEXT
// =====================================================

function safeText(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}


// =====================================================
// 📩 READ MESSAGE SAFELY
// =====================================================

var messageText = ""

if (
  typeof message !== "undefined" &&
  typeof message === "string"
) {
  messageText = message.trim()
}

if (
  !messageText &&
  typeof message !== "undefined" &&
  message &&
  typeof message === "object" &&
  message.text
) {
  messageText = String(message.text).trim()
}

if (
  !messageText &&
  typeof request !== "undefined" &&
  request
) {
  if (typeof request === "string") {
    messageText = request.trim()
  } else if (request.text) {
    messageText = String(request.text).trim()
  }
}

if (
  !messageText &&
  typeof request !== "undefined" &&
  request &&
  request.message &&
  request.message.text
) {
  messageText = String(
    request.message.text
  ).trim()
}


// =====================================================
// ⛔ EMPTY INPUT
// =====================================================

if (!messageText) {
  Api.sendMessage({
    chat_id: uid,

    text:
      "⚠️ <b>Empty Changes</b>\n\n" +
      "Please write the changes you want to request.",

    parse_mode: "HTML"
  })

  return
}


// =====================================================
// 📦 LOAD TEMP SESSION
// =====================================================

var tempKey =
  "BUILD_USER_CHANGES_TEMP_" + uid

var tempSession = Bot.getProperty(tempKey)

if (
  !tempSession ||
  typeof tempSession !== "object" ||
  !tempSession.enquiryId
) {
  Api.sendMessage({
    chat_id: uid,

    text:
      "❌ <b>Session Expired</b>\n\n" +
      "Please open the proposal and press " +
      "✏️ Request Changes again.",

    parse_mode: "HTML"
  })

  return
}

var enquiryId = String(
  tempSession.enquiryId
).trim()


// =====================================================
// 📦 LOAD ENQUIRY
// =====================================================

var enquiry = Bot.getProperty(
  "BUILD_ENQUIRY_" + enquiryId
)

if (!enquiry || typeof enquiry !== "object") {
  Bot.setProperty(tempKey, "", "string")

  Api.sendMessage({
    chat_id: uid,

    text:
      "❌ <b>Enquiry Not Found</b>",

    parse_mode: "HTML"
  })

  return
}


// =====================================================
// 👤 CLIENT CHECK
// =====================================================

var clientId = String(
  enquiry.userId ||
  Bot.getProperty("BUILD_ENQUIRY_USER_" + enquiryId) ||
  ""
).trim()

if (clientId !== uid) {
  Bot.setProperty(tempKey, "", "string")

  Api.sendMessage({
    chat_id: uid,

    text:
      "⛔ <b>Access Denied</b>",

    parse_mode: "HTML"
  })

  return
}


// =====================================================
// 🕐 TIMESTAMP
// =====================================================

var updatedAt = new Date().toISOString()


// =====================================================
// 🧱 INITIALIZE ARRAYS
// =====================================================

if (!Array.isArray(enquiry.additionalRequirements)) {
  enquiry.additionalRequirements = []
}

if (!Array.isArray(enquiry.discussionHistory)) {
  enquiry.discussionHistory = []
}

if (!Array.isArray(enquiry.history)) {
  enquiry.history = []
}


// =====================================================
// 💾 SAVE REQUESTED CHANGES
// =====================================================

enquiry.additionalRequirements.push({
  userId: uid,
  message: messageText,
  timestamp: updatedAt
})

enquiry.discussionHistory.push({
  action: "changes_requested",
  userId: uid,
  timestamp: updatedAt,
  message: messageText
})

enquiry.history.push({
  action: "changes_requested",
  userId: uid,
  timestamp: updatedAt,
  note: messageText
})

enquiry.status = "discussion"

enquiry.stage = "discussion"

enquiry.packageStep = "changes_requested"

enquiry.progress = 25

enquiry.progressTitle = "Changes Requested"

enquiry.progressUpdate =
  "The client requested changes to the final proposal."

enquiry.updatedAt = updatedAt

enquiry.lastChangesRequestedAt = updatedAt

enquiry.userAgreement = false


// =====================================================
// 💾 SAVE ACTIVE ENQUIRY
// =====================================================

Bot.setProperty(
  "BUILD_ENQUIRY_" + uid,
  enquiry,
  "json"
)


// =====================================================
// 💾 SAVE ENQUIRY BY ID
// =====================================================

Bot.setProperty(
  "BUILD_ENQUIRY_" + enquiryId,
  enquiry,
  "json"
)


// =====================================================
// 👤 SAVE MAPPING
// =====================================================

Bot.setProperty(
  "BUILD_ENQUIRY_USER_" + enquiryId,
  uid,
  "string"
)


// =====================================================
// 🧹 CLEAR TEMP SESSION
// =====================================================

Bot.setProperty(
  tempKey,
  "",
  "string"
)


// =====================================================
// 👑 ADMIN RECIPIENTS
// =====================================================

var ownerId = "7897324623"

var adminList = Bot.getProperty("EARNSTAR_ADMINS") || []

if (!Array.isArray(adminList)) {
  adminList = []
}

var recipients = [ownerId]

for (var i = 0; i < adminList.length; i++) {
  var allowedId = ""

  if (
    typeof adminList[i] === "object" &&
    adminList[i] !== null
  ) {
    allowedId = String(
      adminList[i].id ||
      adminList[i].telegramId ||
      ""
    )
  } else {
    allowedId = String(adminList[i] || "")
  }

  if (
    allowedId &&
    recipients.indexOf(allowedId) === -1
  ) {
    recipients.push(allowedId)
  }
}


// =====================================================
// 👤 CLIENT NAME
// =====================================================

var clientName = String(
  enquiry.userName ||
  enquiry.fullName ||
  "Telegram User"
)


// =====================================================
// 📩 ADMIN MESSAGE
// =====================================================

var adminText =
  "✏️ <b>CLIENT REQUESTED CHANGES</b>\n\n" +

  "🆔 <b>Enquiry ID:</b> " +
  safeText(enquiryId) +
  "\n\n" +

  "👤 <b>Client:</b> " +
  '<a href="tg://user?id=' +
  safeText(uid) +
  '">' +
  safeText(clientName) +
  "</a>" +
  "\n" +

  "🆔 <b>Telegram ID:</b> " +
  safeText(uid) +
  "\n\n" +

  "━━━━━━━━━━━━━━━━━━\n" +

  "📋 <b>Requested Changes</b>\n" +
  "<blockquote>" +
  safeText(messageText) +
  "</blockquote>\n\n" +

  "📌 <b>Status:</b> Discussion\n" +
  "📝 <b>Next Step:</b> Update the final proposal " +
  "and send it to the client again."


// =====================================================
// 🔘 ADMIN BUTTONS
// =====================================================

var adminButtons = [
  [
    {
      text: "📝 Update Final Requirements",
      callback_data:
        "BUILD_ADMIN_UPDATE_REQUIREMENTS " + enquiryId
    }
  ],

  [
    {
      text: "📤 Send Updated Proposal",
      callback_data:
        "BUILD_ADMIN_SEND_PROPOSAL " + enquiryId
    }
  ],

  [
    {
      text: "🔎 View Enquiry",
      callback_data:
        "BUILD_ADMIN_VIEW " + enquiryId
    }
  ]
]


// =====================================================
// 📩 SEND TO ADMINS
// =====================================================

for (var j = 0; j < recipients.length; j++) {
  try {
    Api.sendMessage({
      chat_id: recipients[j],

      text: adminText,

      parse_mode: "HTML",

      reply_markup: {
        inline_keyboard: adminButtons
      }
    })
  } catch (error) {}
}


// =====================================================
// 📩 USER CONFIRMATION
// =====================================================

Api.sendMessage({
  chat_id: uid,

  text:
    "✅ <b>Changes Sent Successfully</b>\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(enquiryId) +
    "\n\n" +

    "Aapke requested changes admin team ko bhej diye gaye hain.\n\n" +

    "Admin proposal update karke aapko dobara bhejega.\n\n" +

    "⏳ <b>Status:</b> Discussion",

  parse_mode: "HTML"
})


// =====================================================
// ✅ END
// =====================================================
