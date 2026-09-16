/*CMD
  command: BUILD_ADMIN_UPDATE_REQUIREMENTS_SAVE
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
  command: BUILD_ADMIN_UPDATE_REQUIREMENTS_SAVE
  need_reply: true
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 200 — BUILD_ADMIN_UPDATE_REQUIREMENTS_SAVE
//
// ADMIN → SAVE FINAL REQUIREMENTS
//
// Saves admin's latest proposed requirements.
// This can be repeated until the user agrees.
// =====================================================


// =====================================================
// 👤 ADMIN ID
// =====================================================

var adminId = String(user.telegramid)


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
// 📩 READ MESSAGE TEXT
// =====================================================

var messageText = ""

// =====================================================
// 📩 READ INCOMING ADMIN MESSAGE SAFELY
// =====================================================

// Case 1: message direct string ho
if (
  typeof message !== "undefined" &&
  typeof message === "string"
) {
  messageText = message.trim()
}

// Case 2: message object ho
if (
  !messageText &&
  typeof message !== "undefined" &&
  message &&
  typeof message === "object"
) {
  if (message.text) {
    messageText = String(message.text).trim()
  }
}

// Case 3: request direct text ho
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

// Case 4: request.message.text ho
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
    chat_id: adminId,

    text:
      "⚠️ <b>Empty Requirements</b>\n\n" +
      "Please send the final proposed requirements again.",

    parse_mode: "HTML"
  })

  return
}


// =====================================================
// 📦 LOAD ADMIN SESSION
// =====================================================

var tempKey =
  "BUILD_ADMIN_REQUIREMENTS_TEMP_" + adminId

var tempSession = Bot.getProperty(tempKey)

if (
  !tempSession ||
  typeof tempSession !== "object" ||
  !tempSession.enquiryId
) {
  Api.sendMessage({
    chat_id: adminId,

    text:
      "❌ <b>Update Session Expired</b>\n\n" +
      "Please open the enquiry and press " +
      "📝 Update Final Requirements again.",

    parse_mode: "HTML"
  })

  return
}


var enquiryId = String(
  tempSession.enquiryId
).trim()


// =====================================================
// 👑 OWNER + ADMIN LIST
// =====================================================

var ownerId = "7897324623"

var adminList = Bot.getProperty("EARNSTAR_ADMINS") || []

if (!Array.isArray(adminList)) {
  adminList = []
}


// =====================================================
// 🔐 ADMIN AUTHORIZATION
// =====================================================

var isAuthorized = adminId === ownerId

if (!isAuthorized) {
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

    if (allowedId === adminId) {
      isAuthorized = true
      break
    }
  }
}

if (!isAuthorized) {
  Api.sendMessage({
    chat_id: adminId,

    text:
      "⛔ <b>Access Denied</b>",

    parse_mode: "HTML"
  })

  return
}


// =====================================================
// 📦 LOAD ENQUIRY
// =====================================================

var enquiryKey = "BUILD_ENQUIRY_" + enquiryId

var enquiry = Bot.getProperty(enquiryKey)

if (!enquiry || typeof enquiry !== "object") {
  Bot.setProperty(tempKey, "", "string")

  Api.sendMessage({
    chat_id: adminId,

    text:
      "❌ <b>Enquiry Not Found</b>\n\n" +
      "🆔 <b>Enquiry ID:</b> " +
      safeText(enquiryId),

    parse_mode: "HTML"
  })

  return
}


// =====================================================
// 🛑 STATUS CHECK
// =====================================================

var status = String(
  enquiry.status || ""
).toLowerCase()

if (
  status !== "accepted" &&
  status !== "discussion"
) {
  Bot.setProperty(tempKey, "", "string")

  Api.sendMessage({
    chat_id: adminId,

    text:
      "⚠️ <b>Cannot Update Requirements</b>\n\n" +
      "This enquiry is no longer in discussion stage.",

    parse_mode: "HTML"
  })

  return
}


// =====================================================
// 🕐 TIMESTAMP
// =====================================================

var updatedAt = new Date().toISOString()


// =====================================================
// 🧱 INITIALIZE FIELDS
// =====================================================

if (!enquiry.userRequirements) {
  enquiry.userRequirements =
    enquiry.requirements ||
    enquiry.originalRequirements ||
    ""
}

if (!Array.isArray(enquiry.discussionHistory)) {
  enquiry.discussionHistory = []
}

if (!Array.isArray(enquiry.history)) {
  enquiry.history = []
}

if (!Array.isArray(enquiry.additionalRequirements)) {
  enquiry.additionalRequirements = []
}


// =====================================================
// 💾 SAVE ADMIN FINAL REQUIREMENTS
// =====================================================

// Original user requirements are not changed.

enquiry.adminFinalRequirements = messageText

enquiry.adminDiscussion = messageText

enquiry.status = "discussion"

enquiry.stage = "discussion"

enquiry.packageStep = "proposal_ready"

enquiry.progress = 20

enquiry.progressTitle = "Final Proposal Updated"

enquiry.progressUpdate =
  "Admin updated the final proposed requirements. " +
  "The proposal can now be sent to the client."

enquiry.updatedAt = updatedAt

enquiry.lastProposalUpdatedAt = updatedAt

enquiry.lastProposalUpdatedBy = adminId

enquiry.userAgreement = false


// =====================================================
// 📝 HISTORY
// =====================================================

enquiry.history.push({
  action: "final_requirements_updated",

  adminId: adminId,

  timestamp: updatedAt,

  note:
    "Admin updated the final proposed requirements."
})

enquiry.discussionHistory.push({
  action: "proposal_updated",

  adminId: adminId,

  timestamp: updatedAt,

  message: messageText
})


// =====================================================
// 💾 SAVE ACTIVE ENQUIRY
// =====================================================

var clientId = String(
  enquiry.userId ||
  Bot.getProperty("BUILD_ENQUIRY_USER_" + enquiryId) ||
  ""
).trim()

if (clientId) {
  Bot.setProperty(
    "BUILD_ENQUIRY_" + clientId,
    enquiry,
    "json"
  )
}


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

if (clientId) {
  Bot.setProperty(
    "BUILD_ENQUIRY_USER_" + enquiryId,
    clientId,
    "string"
  )
}


// =====================================================
// 🧹 CLEAR TEMP SESSION
// =====================================================

Bot.setProperty(
  tempKey,
  "",
  "string"
)


// =====================================================
// 🔘 ADMIN BUTTONS
// =====================================================

var adminButtons = [
  [
    {
      text: "📤 Send Proposal to User",
      callback_data: "BUILD_ADMIN_SEND_PROPOSAL " + enquiryId
    }
  ],

  [
    {
      text: "📝 Update Again",
      callback_data: "BUILD_ADMIN_UPDATE_REQUIREMENTS " + enquiryId
    }
  ],

  [
    {
      text: "🔎 View Enquiry",
      callback_data: "BUILD_ADMIN_VIEW " + enquiryId
    }
  ]
]


// =====================================================
// 📩 ADMIN SUCCESS MESSAGE
// =====================================================

var adminText =
  "✅ <b>Final Requirements Updated</b>\n\n" +

  "🆔 <b>Enquiry ID:</b> " +
  safeText(enquiryId) +
  "\n\n" +

  "📌 <b>Status:</b> Discussion\n" +
  "📝 <b>Proposal:</b> Updated\n" +
  "📈 <b>Progress:</b> 20%\n\n" +

  "📋 <b>Admin Final Requirements</b>\n" +
  "<blockquote>" +
  safeText(messageText) +
  "</blockquote>\n\n" +

  "The proposal is saved. You can send it to the user now " +
  "or update it again."

Api.sendMessage({
  chat_id: adminId,

  text: adminText,

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: adminButtons
  }
})


// =====================================================
// 👤 USER NOTIFICATION
// =====================================================

// Important: user is not notified here.
// Admin must press Send Proposal to User.
// =====================================================


// =====================================================
// ✅ END
// =====================================================
