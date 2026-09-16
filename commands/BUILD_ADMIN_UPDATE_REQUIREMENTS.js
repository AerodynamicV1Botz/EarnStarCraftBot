/*CMD
  command: BUILD_ADMIN_UPDATE_REQUIREMENTS
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
  command: BUILD_ADMIN_UPDATE_REQUIREMENTS
  need_reply: false
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 199 — BUILD_ADMIN_UPDATE_REQUIREMENTS
//
// ADMIN → UPDATE FINAL REQUIREMENTS
//
// This command only opens the input prompt.
// Actual saving is handled by SCRIPT 200.
// =====================================================


// =====================================================
// ⚡ CALLBACK RESPONSE
// =====================================================

if (typeof request !== "undefined" && request && request.id) {
  try {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "Update final requirements..."
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
      "You are not authorized to update final requirements.",

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
      "⚠️ <b>Cannot Update Requirements</b>\n\n" +
      "🆔 <b>Enquiry ID:</b> " +
      safeText(enquiryId) +
      "\n\n" +
      "Current status: " +
      safeText(enquiry.status || "unknown") +
      "\n\n" +
      "Only accepted or discussion enquiries can be updated.",

    parse_mode: "HTML"
  })

  return
}


// =====================================================
// 🧾 SAVE ADMIN INPUT SESSION
// =====================================================

Bot.setProperty(
  "BUILD_ADMIN_REQUIREMENTS_TEMP_" + adminId,
  {
    adminId: adminId,
    enquiryId: enquiryId,
    createdAt: new Date().toISOString()
  },
  "json"
)


// =====================================================
// 📝 INPUT PROMPT
// =====================================================

var oldRequirements = String(
  enquiry.adminFinalRequirements || ""
)

var promptText =
  "📝 <b>Update Final Requirements</b>\n\n" +

  "🆔 <b>Enquiry ID:</b> " +
  safeText(enquiryId) +
  "\n\n" +

  "Enter the final/proposed requirements that " +
  "will be sent to the client.\n\n" +

  "You can include:\n" +
  "• Bot features\n" +
  "• Required automation\n" +
  "• Delivery details\n" +
  "• Limitations\n" +
  "• Project price\n\n" +

  "⚠️ Original user requirements will remain safe.\n" +
  "You can update this proposal multiple times."

if (oldRequirements) {
  promptText +=
    "\n\n📌 <b>Current Proposal:</b>\n" +
    "<blockquote>" +
    safeText(oldRequirements) +
    "</blockquote>"
}

promptText +=
  "\n\n✍️ <b>Send your updated proposal now.</b>"

Api.sendMessage({
  chat_id: adminId,

  text: promptText,

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "❌ Cancel",
          callback_data: "BUILD_ADMIN_VIEW " + enquiryId
        }
      ]
    ]
  }
})


// =====================================================
// ▶️ START INPUT SAVE COMMAND
// =====================================================

Bot.runCommand("BUILD_ADMIN_UPDATE_REQUIREMENTS_SAVE")
