/*CMD
  command: BUILD_USER_REQUEST_CHANGES
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
  command: BUILD_USER_REQUEST_CHANGES
  need_reply: false
  folder: BUILD ENQUIRY
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 202 — BUILD_USER_REQUEST_CHANGES
//
// USER → REQUEST CHANGES
// Opens input for proposal changes.
// Actual saving handled by SCRIPT 203.
// =====================================================


// =====================================================
// ⚡ CALLBACK RESPONSE
// =====================================================

if (typeof request !== "undefined" && request && request.id) {
  try {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "Request changes..."
    })
  } catch (error) {}
}


// =====================================================
// 👤 USER ID
// =====================================================

var uid = String(user.telegramid)


// =====================================================
// 🆔 READ ENQUIRY ID
// =====================================================

var enquiryId = String(params || "").trim()

if (!enquiryId) {
  Api.sendMessage({
    chat_id: uid,

    text:
      "❌ <b>Invalid Enquiry ID</b>\n\n" +
      "Please open your enquiry again.",

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
    chat_id: uid,

    text:
      "❌ <b>Enquiry Not Found</b>\n\n" +
      "Please open your enquiry again.",

    parse_mode: "HTML"
  })

  return
}


// =====================================================
// 👤 OWNER CHECK
// =====================================================

var clientId = String(
  enquiry.userId ||
  Bot.getProperty("BUILD_ENQUIRY_USER_" + enquiryId) ||
  ""
).trim()

if (clientId !== uid) {
  Api.sendMessage({
    chat_id: uid,

    text:
      "⛔ <b>Access Denied</b>\n\n" +
      "This enquiry does not belong to you.",

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
  status !== "proposal_sent" &&
  status !== "discussion"
) {
  Api.sendMessage({
    chat_id: uid,

    text:
      "⚠️ <b>Changes Cannot Be Requested</b>\n\n" +
      "This enquiry is not currently waiting for proposal changes.",

    parse_mode: "HTML"
  })

  return
}


// =====================================================
// 🧾 SAVE USER INPUT SESSION
// =====================================================

Bot.setProperty(
  "BUILD_USER_CHANGES_TEMP_" + uid,
  {
    userId: uid,
    enquiryId: enquiryId,
    createdAt: new Date().toISOString()
  },
  "json"
)


// =====================================================
// 📝 INPUT PROMPT
// =====================================================

var promptText =
  "✏️ <b>Request Changes</b>\n\n" +

  "🆔 <b>Enquiry ID:</b> " +
  safeText(enquiryId) +
  "\n\n" +

  "Aapko admin ke final proposal mein kya " +
  "change ya add karwana hai?\n\n" +

  "Aap features, requirements, price, delivery " +
  "ya kisi bhi detail ke baare mein changes likh sakte ho.\n\n" +

  "✍️ <b>Apne changes abhi send karein.</b>"

Api.sendMessage({
  chat_id: uid,

  text: promptText,

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "❌ Cancel",
          callback_data: "BUILD_ENQUIRY_VIEW " + enquiryId
        }
      ]
    ]
  }
})


// =====================================================
// ▶️ START SAVE COMMAND
// =====================================================

Bot.runCommand(
  "BUILD_USER_REQUEST_CHANGES_SAVE"
)
