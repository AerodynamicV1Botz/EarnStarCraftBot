/*CMD
  command: LEAD_SUBMIT
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
// SCRIPT 154 — UPDATED VERSION
// COMMAND NAME: LEAD_SUBMIT
// STEP 5.4.1.6 — SAVE LEAD & ADMIN NOTIFICATION
// 📁 Lead Management / Lead Submit
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

// ---------- ADMIN ID ----------
var ADMIN_ID = "7897324623"

// ---------- USER ID ----------
var uid = user.telegramid

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

// ---------- USER DATA ----------
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// ---------- CHECK REQUIRED DETAILS ----------
var leadName =
  userData.lead_name ||
  userData.name ||
  ""

var leadContact =
  userData.lead_contact ||
  userData.contact ||
  ""

var leadService =
  userData.lead_service ||
  userData.service ||
  ""

var leadRequirement =
  userData.lead_requirement ||
  userData.requirement ||
  "Not provided"

if (!leadName || !leadContact || !leadService) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ <b>Lead details incomplete.</b>\n\n" +
      "Please complete all required steps first.",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "⬅️ Start Again",
            callback_data: "LEAD_START"
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
  return
}

// ---------- UNIQUE LEAD ID ----------
var leadId = "LEAD-" + uid + "-" + Date.now()

// ---------- CREATED TIME ----------
var createdAt = new Date().toISOString()

// ---------- LEAD DATA ----------
var leadData = {
  lead_id: leadId,
  user_id: uid,
  telegramid: uid,

  name: leadName,
  full_name: leadName,

  contact: leadContact,
  mobile: leadContact,

  service: leadService,
  lead_service: leadService,

  requirement: leadRequirement,
  lead_requirement: leadRequirement,

  status: "New",

  created_at: createdAt,
  created_by: uid
}

// ---------- SAVE LEAD ----------
Bot.setProperty(
  "LEAD_" + leadId,
  leadData,
  "json"
)

// ---------- SAVE LEAD INDEX ----------
var leadIndex = Bot.getProperty("LEAD_INDEX") || []

if (!Array.isArray(leadIndex)) {
  leadIndex = []
}

if (leadIndex.indexOf(leadId) == -1) {
  leadIndex.push(leadId)
}

Bot.setProperty(
  "LEAD_INDEX",
  leadIndex,
  "json"
)

// ---------- UPDATE USER DATA ----------
userData.lead_id = leadId
userData.leadStatus = "New"
userData.leadSubmitted = true
userData.leadSubmittedAt = createdAt

Bot.setProperty(
  "USER_" + uid,
  userData,
  "json"
)

// ---------- ADMIN TEXT ----------
var adminText =
  "🚨 <b>NEW LEAD RECEIVED</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━━━\n" +
  "🆔 <b>Lead ID:</b> <code>" +
  leadId +
  "</code>\n" +
  "👤 <b>Name:</b> " +
  leadName +
  "\n" +
  "📱 <b>Contact:</b> " +
  leadContact +
  "\n" +
  "🛠️ <b>Service:</b> " +
  leadService +
  "\n" +
  "📝 <b>Requirement:</b> " +
  leadRequirement +
  "\n" +
  "👤 <b>User ID:</b> <code>" +
  uid +
  "</code>\n" +
  "📌 <b>Status:</b> New\n" +
  "🕒 <b>Created:</b> " +
  createdAt +
  "\n" +
  "━━━━━━━━━━━━━━━━━━━━"

// ---------- ADMIN BUTTONS ----------
var adminButtons = [
  [
    {
      text: "👁️ View Lead",
      callback_data: "LEAD_VIEW_" + leadId
    }
  ],
  [
    {
      text: "✅ Accept",
      callback_data: "LEAD_ACCEPT_" + leadId
    },
    {
      text: "❌ Reject",
      callback_data: "LEAD_REJECT_" + leadId
    }
  ],
  [
    {
      text: "📌 Update Status",
      callback_data: "LEAD_STATUS_" + leadId
    }
  ],
  [
    {
      text: "🏠 Admin Panel",
      callback_data: "ADMIN_PANEL"
    }
  ]
]

// ---------- SEND TO ADMIN ----------
Api.sendMessage({
  chat_id: ADMIN_ID,
  text: adminText,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: adminButtons
  }
})

// ---------- USER LANGUAGE TEXT ----------
var successTitle = ""
var successMessage = ""
var leadIdText = ""
var statusText = ""
var menuText = ""

if (lang == "english") {
  successTitle = "✅ <b>LEAD SUBMITTED SUCCESSFULLY</b>"
  successMessage =
    "Your enquiry has been received. Our team will contact you soon."
  leadIdText = "Lead ID"
  statusText = "Status"
  menuText = "🏠 Main Menu"
} else if (lang == "gujarati") {
  successTitle = "✅ <b>લીડ સફળતાપૂર્વક સબમિટ થઈ</b>"
  successMessage =
    "તમારી પૂછપરછ મળી ગઈ છે. અમારી ટીમ ટૂંક સમયમાં તમારો સંપર્ક કરશે."
  leadIdText = "લીડ ID"
  statusText = "સ્ટેટસ"
  menuText = "🏠 મુખ્ય મેનુ"
} else {
  successTitle = "✅ <b>LEAD SUCCESSFULLY SUBMITTED</b>"
  successMessage =
    "Aapki enquiry receive ho gayi hai. Hamari team jaldi contact karegi."
  leadIdText = "Lead ID"
  statusText = "Status"
  menuText = "🏠 Main Menu"
}

// ---------- USER SUCCESS TEXT ----------
var userText =
  successTitle +
  "\n\n━━━━━━━━━━━━━━━━━━━━\n" +
  "🎉 " +
  successMessage +
  "\n\n" +
  "🆔 <b>" +
  leadIdText +
  ":</b> <code>" +
  leadId +
  "</code>\n" +
  "📌 <b>" +
  statusText +
  ":</b> New\n" +
  "━━━━━━━━━━━━━━━━━━━━\n\n" +
  "💡 Please save your Lead ID for future reference."

// ---------- USER BUTTONS ----------
var userButtons = [
  [
    {
      text: "👁️ View My Lead",
      callback_data: "LEAD_VIEW_USER_" + leadId
    }
  ],
  [
    {
      text: menuText,
      callback_data: "BACK_MAIN_MENU"
    }
  ]
]

// ---------- CLEAR LEAD SESSION ----------
Bot.setProperty(
  "LEAD_STEP_" + uid,
  "COMPLETED",
  "string"
)

// ---------- SEND USER CONFIRMATION ----------
Api.sendMessage({
  chat_id: uid,
  text: userText,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: userButtons
  }
})
