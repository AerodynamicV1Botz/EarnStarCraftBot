/*CMD
  command: BUILD_REQUIREMENTS
  help: 
  need_reply: true
  auto_retry_time: 
  folder: BUILD MY BOT
  answer: 📝 Apne bot ki requirements bhejo.

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 198 — UPDATED VERSION
// COMMAND NAME: BUILD_REQUIREMENTS
// STEP 6.1.3 — SUBMIT CUSTOM BOT ENQUIRY
// 📁 Custom Build Flow
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

var requirements = String(message || "").trim()

// Validate requirements
if (!requirements) {
  var invalidText = {
    hinglish: "⚠️ Please apne bot ki requirements describe kijiye.",
    en: "⚠️ Please describe your bot requirements.",
    gu: "⚠️ કૃપા કરીને તમારા બોટની જરૂરિયાતો જણાવો."
  }

  Bot.sendMessage(
    invalidText[lang] || invalidText.hinglish
  )

  Bot.runCommand("BUILD_REQUIREMENTS")
  return
}

// Generate reference ID
var refId =
  "ES" +
  Date.now()
    .toString()
    .slice(-8)

// Create enquiry
var enquiry = {
  refId: refId,
  userId: uid,

  name:
    userData.enquiryName ||
    userData.name ||
    user.first_name ||
    "User",

  contact:
    userData.enquiryContact ||
    userData.username ||
    (user.username ? "@" + user.username : "Not provided"),

  enquiryType: userData.enquiryType || "Custom Telegram Bot",
  requirements: requirements,
  status: "new",
  createdAt: new Date().toISOString()
}

// Save enquiry
Bot.setProperty(
  "ENQUIRY_" + refId,
  enquiry,
  "json"
)

// Save enquiry key
var enquiryKeys = Bot.getProperty("ENQUIRY_KEYS") || []

if (enquiryKeys.indexOf(refId) === -1) {
  enquiryKeys.push(refId)

  Bot.setProperty(
    "ENQUIRY_KEYS",
    enquiryKeys,
    "json"
  )
}

// Update user data
userData.enquiryRef = refId
userData.enquiryRequirements = requirements
userData.enquiryStatus = "new"
userData.enquiryStep = 4

Bot.setProperty(
  "USER_" + uid,
  userData,
  "json"
)

// Admin notification
var adminText =
  "🔔 <b>NEW PROJECT ENQUIRY</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "🆔 <b>Reference:</b>\n" +
  "<code>" + refId + "</code>\n\n" +
  "🤖 <b>Type:</b>\n" +
  enquiry.enquiryType + "\n\n" +
  "👤 <b>Name:</b>\n" +
  enquiry.name + "\n\n" +
  "🔗 <b>Contact:</b>\n" +
  enquiry.contact + "\n\n" +
  "📝 <b>Requirements:</b>\n" +
  requirements + "\n\n" +
  "📊 <b>Status:</b> 🟡 NEW\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "⚡ Review this enquiry using the buttons below."

Api.sendMessage({
  chat_id: "7897324623",
  text: adminText,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "👁 View Enquiry",
          callback_data: "ADMIN_ENQUIRY " + refId
        }
      ],
      [
        {
          text: "✅ Accept",
          callback_data: "LEAD_ACCEPT " + refId
        },
        {
          text: "💬 Contact",
          callback_data: "LEAD_CONTACT " + refId
        }
      ],
      [
        {
          text: "❌ Close",
          callback_data: "LEAD_CLOSE " + refId
        }
      ]
    ]
  }
})

// Multilingual client confirmation
var confirmationText = {
  hinglish:
    "🎉 <b>ENQUIRY SUBMITTED SUCCESSFULLY!</b>\n\n" +
    "Aapki project enquiry successfully receive ho gayi hai.\n\n" +
    "🆔 <b>Reference ID:</b>\n" +
    "<code>" + refId + "</code>\n\n" +
    "📊 <b>Status:</b> 🟡 New\n\n" +
    "Hamari team aapki requirements review karke aapse contact karegi.\n\n" +
    "💡 Apna Reference ID save kar lijiye.",

  en:
    "🎉 <b>ENQUIRY SUBMITTED SUCCESSFULLY!</b>\n\n" +
    "Your project enquiry has been received successfully.\n\n" +
    "🆔 <b>Reference ID:</b>\n" +
    "<code>" + refId + "</code>\n\n" +
    "📊 <b>Status:</b> 🟡 New\n\n" +
    "Our team will review your requirements and contact you.\n\n" +
    "💡 Please save your Reference ID.",

  gu:
    "🎉 <b>પૂછપરછ સફળતાપૂર્વક સબમિટ થઈ!</b>\n\n" +
    "તમારી પ્રોજેક્ટ પૂછપરછ સફળતાપૂર્વક મળી ગઈ છે.\n\n" +
    "🆔 <b>રેફરન્સ ID:</b>\n" +
    "<code>" + refId + "</code>\n\n" +
    "📊 <b>સ્ટેટસ:</b> 🟡 નવી\n\n" +
    "અમારી ટીમ તમારી જરૂરિયાતો તપાસીને તમારો સંપર્ક કરશે.\n\n" +
    "💡 તમારું રેફરન્સ ID સાચવી રાખો."
}

var clientButtons = [
  [
    {
      text:
        lang === "en"
          ? "💰 Pricing"
          : lang === "gu"
          ? "💰 કિંમત"
          : "💰 Pricing",
      callback_data: "MENU_PRICING"
    },
    {
      text:
        lang === "en"
          ? "🎬 Demo"
          : lang === "gu"
          ? "🎬 ડેમો"
          : "🎬 Demo",
      callback_data: "MENU_DEMO"
    }
  ],
  [
    {
      text:
        lang === "en"
          ? "📋 My Enquiry"
          : lang === "gu"
          ? "📋 મારી પૂછપરછ"
          : "📋 My Enquiry",
      callback_data: "MY_ENQUIRY"
    }
  ],
  [
    {
      text:
        lang === "en"
          ? "🏠 Main Menu"
          : lang === "gu"
          ? "🏠 મુખ્ય મેનુ"
          : "🏠 Main Menu",
      callback_data: "BACK_MAIN_MENU"
    }
  ]
]

// Same-message edit with delete fallback
function showConfirmation(text, buttons) {
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

// Answer callback safely
if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

showConfirmation(
  confirmationText[lang] || confirmationText.hinglish,
  clientButtons
)
