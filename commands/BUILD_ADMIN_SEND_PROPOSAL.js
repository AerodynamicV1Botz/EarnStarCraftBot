/*CMD
  command: BUILD_ADMIN_SEND_PROPOSAL
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

/*CMD
  command: BUILD_ADMIN_SEND_PROPOSAL
  need_reply: false
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 201 — BUILD_ADMIN_SEND_PROPOSAL
//
// ADMIN → SEND FINAL PROPOSAL TO USER
//
// FLOW:
// BUILD_ADMIN_UPDATE_REQUIREMENTS_SAVE
//        ↓
// BUILD_ADMIN_SEND_PROPOSAL
//        ↓
// USER REVIEW
//        ↓
// AGREE / REQUEST CHANGES / CONTINUE DISCUSSION
//
// IMPORTANT:
// - Admin only
// - Original user requirements remain unchanged
// - Admin final requirements are sent to user
// - No order is created here
// - No payment is requested here
// =====================================================


// =====================================================
// ⚡ CALLBACK RESPONSE
// =====================================================

if (typeof request !== "undefined" && request && request.id) {
  try {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "Sending proposal to user..."
    })
  } catch (error) {}
}


// =====================================================
// 👤 ADMIN ID
// =====================================================

var adminId = String(user.telegramid)


// =====================================================
// 🆔 READ ENQUIRY ID
// =====================================================

var enquiryId = String(params || "").trim()

if (!enquiryId) {
  Api.sendMessage({
    chat_id: adminId,

    text:
      "❌ <b>Invalid Enquiry ID</b>\n\n" +
      "Please open the enquiry again.",

    parse_mode: "HTML"
  })

  return
}


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


// =====================================================
// ⛔ ACCESS DENIED
// =====================================================

if (!isAuthorized) {
  Api.sendMessage({
    chat_id: adminId,

    text:
      "⛔ <b>Access Denied</b>\n\n" +
      "You are not authorized to send proposals.",

    parse_mode: "HTML"
  })

  return
}


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
// 📦 LOAD ENQUIRY
// =====================================================

var enquiry = Bot.getProperty(
  "BUILD_ENQUIRY_" + enquiryId
)

if (!enquiry || typeof enquiry !== "object") {
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
// 👤 CLIENT ID
// =====================================================

var clientId = String(
  enquiry.userId ||
  Bot.getProperty("BUILD_ENQUIRY_USER_" + enquiryId) ||
  ""
).trim()

if (!clientId) {
  Api.sendMessage({
    chat_id: adminId,

    text:
      "❌ <b>Client ID Missing</b>\n\n" +
      "The client Telegram ID could not be found.",

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
  Api.sendMessage({
    chat_id: adminId,

    text:
      "⚠️ <b>Cannot Send Proposal</b>\n\n" +
      "Current status: " +
      safeText(enquiry.status || "unknown") +
      "\n\n" +
      "The enquiry must be in discussion stage.",

    parse_mode: "HTML"
  })

  return
}


// =====================================================
// 📋 REQUIREMENTS CHECK
// =====================================================

var originalRequirements = String(
  enquiry.userRequirements ||
  enquiry.requirements ||
  enquiry.originalRequirements ||
  ""
).trim()

var finalRequirements = String(
  enquiry.adminFinalRequirements || ""
).trim()

if (!finalRequirements) {
  Api.sendMessage({
    chat_id: adminId,

    text:
      "⚠️ <b>Final Requirements Missing</b>\n\n" +
      "Please update the final requirements first.",

    parse_mode: "HTML"
  })

  return
}


// =====================================================
// 🕐 TIMESTAMP
// =====================================================

var updatedAt = new Date().toISOString()


// =====================================================
// 🧱 INITIALIZE HISTORY
// =====================================================

if (!Array.isArray(enquiry.history)) {
  enquiry.history = []
}

if (!Array.isArray(enquiry.discussionHistory)) {
  enquiry.discussionHistory = []
}


// =====================================================
// 🟢 UPDATE PROPOSAL STATUS
// =====================================================

enquiry.status = "proposal_sent"

enquiry.stage = "discussion"

enquiry.packageStep = "proposal_sent"

enquiry.progress = 30

enquiry.progressTitle = "Final Proposal Sent"

enquiry.progressUpdate =
  "The final proposal has been sent to the client for review."

enquiry.proposalSentAt = updatedAt

enquiry.proposalSentBy = adminId

enquiry.updatedAt = updatedAt

enquiry.userAgreement = false


// =====================================================
// 📝 SAVE HISTORY
// =====================================================

enquiry.history.push({
  action: "proposal_sent",
  adminId: adminId,
  timestamp: updatedAt,
  note:
    "Final proposed requirements sent to client."
})

enquiry.discussionHistory.push({
  action: "proposal_sent",
  adminId: adminId,
  timestamp: updatedAt,
  message: finalRequirements
})


// =====================================================
// 💾 SAVE ACTIVE ENQUIRY
// =====================================================

Bot.setProperty(
  "BUILD_ENQUIRY_" + clientId,
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
  clientId,
  "string"
)


// =====================================================
// 👤 USER LANGUAGE
// =====================================================

var clientUserData = Bot.getProperty(
  "USER_" + clientId
)

if (
  !clientUserData ||
  typeof clientUserData !== "object"
) {
  clientUserData = {}
}

var language = String(
  clientUserData.language ||
  enquiry.language ||
  "hinglish"
).toLowerCase()

if (
  language !== "hinglish" &&
  language !== "english" &&
  language !== "gujarati"
) {
  language = "hinglish"
}


// =====================================================
// 🔘 USER BUTTONS
// =====================================================

var userButtons = [
  [
    {
      text: "✅ Agree & Continue",
      callback_data: "BUILD_USER_AGREE " + enquiryId
    }
  ],

  [
    {
      text: "✏️ Request Changes",
      callback_data: "BUILD_USER_REQUEST_CHANGES " + enquiryId
    }
  ],

  [
    {
      text: "💬 Continue Discussion",
      callback_data: "BUILD_USER_DISCUSSION " + enquiryId
    }
  ]
]


// =====================================================
// 👤 USER MESSAGE
// =====================================================

var userText = ""

if (language === "english") {
  userText =
    "🛠️ <b>Final Custom Bot Proposal</b>\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(enquiryId) +
    "\n\n" +

    "━━━━━━━━━━━━━━━━━━\n" +

    "📋 <b>Your Original Requirements</b>\n" +
    "<blockquote>" +
    safeText(originalRequirements || "Not available") +
    "</blockquote>\n\n" +

    "━━━━━━━━━━━━━━━━━━\n" +

    "📝 <b>Admin's Final Proposed Requirements</b>\n" +
    "<blockquote>" +
    safeText(finalRequirements) +
    "</blockquote>\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "Please review the final proposal.\n\n" +

    "You can agree, request changes, or " +
    "continue the discussion with the admin.\n\n" +

    "⚠️ <b>The order will be created only after " +
    "you agree to the final proposal.</b>"

} else if (language === "gujarati") {
  userText =
    "🛠️ <b>Final Custom Bot Proposal</b>\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(enquiryId) +
    "\n\n" +

    "━━━━━━━━━━━━━━━━━━\n" +

    "📋 <b>તમારી Original Requirements</b>\n" +
    "<blockquote>" +
    safeText(originalRequirements || "Not available") +
    "</blockquote>\n\n" +

    "━━━━━━━━━━━━━━━━━━\n" +

    "📝 <b>Admin ની Final Proposed Requirements</b>\n" +
    "<blockquote>" +
    safeText(finalRequirements) +
    "</blockquote>\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "કૃપા કરીને final proposal review કરો.\n\n" +

    "તમે agree કરી શકો છો, changes request કરી શકો છો " +
    "અથવા admin સાથે discussion continue કરી શકો છો.\n\n" +

    "⚠️ <b>તમારા agree કર્યા પછી જ order બનાવવામાં આવશે.</b>"

} else {
  userText =
    "🛠️ <b>Final Custom Bot Proposal</b>\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(enquiryId) +
    "\n\n" +

    "━━━━━━━━━━━━━━━━━━\n" +

    "📋 <b>Aapki Original Requirements</b>\n" +
    "<blockquote>" +
    safeText(originalRequirements || "Not available") +
    "</blockquote>\n\n" +

    "━━━━━━━━━━━━━━━━━━\n" +

    "📝 <b>Admin ki Final Proposed Requirements</b>\n" +
    "<blockquote>" +
    safeText(finalRequirements) +
    "</blockquote>\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "Please final proposal check karein.\n\n" +

    "Aap agree kar sakte ho, changes request kar sakte ho, " +
    "ya admin ke saath discussion continue kar sakte ho.\n\n" +

    "⚠️ <b>Aapke final agreement ke baad hi order create hoga.</b>"
}


// =====================================================
// 📩 SEND PROPOSAL TO USER
// =====================================================

try {
  Api.sendMessage({
    chat_id: clientId,

    text: userText,

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: userButtons
    }
  })
} catch (error) {
  Api.sendMessage({
    chat_id: adminId,

    text:
      "⚠️ <b>Proposal Saved But Message Failed</b>\n\n" +
      "The proposal was saved, but Telegram could not send " +
      "the message to the user.",

    parse_mode: "HTML"
  })

  return
}

// =====================================================
// 🔘 ADMIN DISCUSSION BUTTON
// =====================================================

var adminConfirmationButtons = [
  [
    {
      text: "💬 Discuss with User",
      callback_data: "BUILD_ADMIN_DISCUSSION " + enquiryId
    }
  ],
  [
    {
      text: "🔎 View Enquiry",
      callback_data: "BUILD_ADMIN_VIEW " + enquiryId
    }
  ]
];


// =====================================================
// 📩 ADMIN CONFIRMATION
// =====================================================

Api.sendMessage({
  chat_id: adminId,

  text:
    "✅ <b>Proposal Sent Successfully</b>\n\n" +

    "🆔 <b>Enquiry ID:</b> " +
    safeText(enquiryId) +
    "\n\n" +

    "👤 <b>Client ID:</b> " +
    safeText(clientId) +
    "\n\n" +

    "📋 <b>Status:</b> Proposal Sent\n" +
    "📊 <b>Progress:</b> 30%\n\n" +

    "The client has received the final proposal and can now " +
    "agree, request changes, or continue discussion.\n\n" +

    "💬 <b>Next Step:</b> You can discuss the proposal directly " +
    "with the client.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: adminConfirmationButtons
  }
});
