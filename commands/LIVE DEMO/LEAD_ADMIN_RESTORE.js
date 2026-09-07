/*CMD
  command: LEAD_ADMIN_RESTORE
  help: 
  need_reply: false
  auto_retry_time: 
  folder: LIVE DEMO

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 177 — UPDATED VERSION
// COMMAND NAME: LEAD_ADMIN_RESTORE
// STEP 5.4.1.31 — RESTORE REJECTED LEAD
// 📁 Lead Management / Admin Restore
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

// ---------- ADMIN CHECK ----------
var ADMIN_ID = "7897324623"
var uid = user.telegramid

if (String(uid) !== ADMIN_ID) {
  Api.sendMessage({
    chat_id: uid,
    text: "⛔ <b>Admin access only.</b>",
    parse_mode: "HTML"
  })
  return
}

// ---------- CALLBACK ANSWER ----------
if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

// ---------- CALLBACK DATA ----------
var callbackData = ""

if (
  typeof request !== "undefined" &&
  request &&
  request.data
) {
  callbackData = String(request.data)
}

// ---------- LEAD ID ----------
var prefix = "LEAD_ADMIN_RESTORE_"
var leadId = callbackData.replace(prefix, "")

if (!leadId || leadId == callbackData) {
  Api.sendMessage({
    chat_id: uid,
    text: "⚠️ <b>Invalid Lead ID.</b>",
    parse_mode: "HTML"
  })
  return
}

// ---------- LOAD LEAD ----------
var lead = Bot.getProperty("LEAD_" + leadId)

if (!lead) {
  Api.sendMessage({
    chat_id: uid,
    text: "❌ <b>Lead not found.</b>",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "⬅️ Rejected Leads",
            callback_data: "LEAD_ADMIN_REJECTED"
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

// ---------- LANGUAGE ----------
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// ---------- TEXT ----------
var title = ""
var successText = ""
var invalidText = ""
var allText = ""
var activeText = ""
var panelText = ""

if (lang == "english") {
  title = "♻️ <b>LEAD RESTORED</b>"
  successText = "The lead has been restored successfully."
  invalidText = "Only rejected leads can be restored."
  allText = "📋 All Leads"
  activeText = "📥 Active Requests"
  panelText = "🏠 Admin Panel"
} else if (lang == "gujarati") {
  title = "♻️ <b>લીડ પુનઃસ્થાપિત</b>"
  successText = "લીડ સફળતાપૂર્વક પુનઃસ્થાપિત થઈ છે."
  invalidText = "ફક્ત રિજેક્ટ થયેલી લીડ્સ પુનઃસ્થાપિત કરી શકાય છે."
  allText = "📋 બધી લીડ્સ"
  activeText = "📥 ચાલુ રિક્વેસ્ટ્સ"
  panelText = "🏠 એડમિન પેનલ"
} else {
  title = "♻️ <b>LEAD RESTORED</b>"
  successText = "Lead successfully restore ho gayi hai."
  invalidText = "Sirf rejected leads restore ho sakti hain."
  allText = "📋 All Leads"
  activeText = "📥 Active Requests"
  panelText = "🏠 Admin Panel"
}

// ---------- STATUS CHECK ----------
var oldStatus = String(lead.status || "").toLowerCase()

if (oldStatus != "rejected") {
  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>" +
      invalidText +
      "</b>\n\n" +
      "🆔 Lead ID: <code>" +
      leadId +
      "</code>\n" +
      "📌 Current Status: " +
      (lead.status || "New"),
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "👁️ View Lead",
            callback_data: "LEAD_VIEW_" + leadId
          }
        ],
        [
          {
            text: allText,
            callback_data: "LEAD_ADMIN"
          }
        ]
      ]
    }
  })

  return
}

// ---------- RESTORE LEAD ----------
lead.status = "Pending"
lead.restored_at = Date.now()
lead.restored_by = uid

Bot.setProperty(
  "LEAD_" + leadId,
  lead,
  "json"
)

// ---------- UPDATE CLIENT STATUS ----------
var clientId =
  lead.user_id ||
  lead.userid ||
  lead.telegramid ||
  lead.userId

if (clientId) {
  var clientData =
    Bot.getProperty("USER_" + clientId) || {}

  clientData.leadStatus = "pending"

  Bot.setProperty(
    "USER_" + clientId,
    clientData,
    "json"
  )

  Api.sendMessage({
    chat_id: clientId,
    text:
      "♻️ <b>Your Lead Has Been Restored</b>\n\n" +
      "🆔 Lead ID: <code>" +
      leadId +
      "</code>\n" +
      "📌 Status: <b>Pending</b>\n\n" +
      "Our team will review your request again.",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "👁️ View Lead",
            callback_data: "LEAD_VIEW_USER_" + leadId
          }
        ],
        [
          {
            text: "🏠 Main Menu",
            callback_data: "BACK_MAIN_MENU"
          }
        ]
      ]
    }
  })
}

// ---------- SAME MESSAGE EDIT ----------
function showRestored(text, buttons) {
  if (
    typeof request !== "undefined" &&
    request.message &&
    request.message.message_id
  ) {
    try {
      Api.editMessageText({
        chat_id: uid,
        message_id: request.message.message_id,
        text: text,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: buttons
        }
      })
      return
    } catch (error) {
      try {
        Api.deleteMessage({
          chat_id: uid,
          message_id: request.message.message_id
        })
      } catch (deleteError) {}
    }
  }

  Api.sendMessage({
    chat_id: uid,
    text: text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons
    }
  })
}

// ---------- SUCCESS SCREEN ----------
showRestored(
  title +
    "\n\n━━━━━━━━━━━━━━━━━━━━\n" +
    "✅ " +
    successText +
    "\n\n" +
    "🆔 <b>Lead ID:</b> <code>" +
    leadId +
    "</code>\n" +
    "📌 <b>New Status:</b> Pending\n" +
    "━━━━━━━━━━━━━━━━━━━━",
  [
    [
      {
        text: activeText,
        callback_data: "LEAD_ADMIN_REQUESTS"
      },
      {
        text: allText,
        callback_data: "LEAD_ADMIN"
      }
    ],
    [
      {
        text: panelText,
        callback_data: "ADMIN_PANEL"
      }
    ]
  ]
)
