/*CMD
  command: COMMUNITY_SURVEY
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
// SCRIPT 140 — UPDATED VERSION
// COMMAND NAME: COMMUNITY_SURVEY
// STEP 5.3.13 — COMMUNITY SURVEY DEMO
// 📁 Community Management Showcase
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

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

// ---------- SAME MESSAGE EDIT ----------
function showCommunitySurvey(text, buttons) {
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

// ---------- LANGUAGE TEXT ----------
var text = {
  hinglish:
    "📊 <b>COMMUNITY SURVEY SYSTEM</b>\n\n" +
    "🤖 Community members se important opinions collect karne ka smart system.\n\n" +
    "📝 <b>Survey Features:</b>\n" +
    "• Multiple-choice questions\n" +
    "• Yes/No questions\n" +
    "• Member opinion collection\n" +
    "• Anonymous survey option\n" +
    "• Survey result summary\n" +
    "• Admin-controlled surveys\n" +
    "• Feedback analysis\n" +
    "• Multilingual support\n\n" +
    "📈 Survey results se better decisions lene mein help milti hai.\n\n" +
    "💼 Custom survey system ke liye order karein.",

  english:
    "📊 <b>COMMUNITY SURVEY SYSTEM</b>\n\n" +
    "🤖 A smart system for collecting important opinions from community members.\n\n" +
    "📝 <b>Survey Features:</b>\n" +
    "• Multiple-choice questions\n" +
    "• Yes/No questions\n" +
    "• Member opinion collection\n" +
    "• Anonymous survey option\n" +
    "• Survey result summary\n" +
    "• Admin-controlled surveys\n" +
    "• Feedback analysis\n" +
    "• Multilingual support\n\n" +
    "📈 Survey results help admins make better decisions.\n\n" +
    "💼 Order your custom survey system.",

  gujarati:
    "📊 <b>COMMUNITY SURVEY SYSTEM</b>\n\n" +
    "🤖 કમ્યુનિટી મેમ્બર પાસેથી મહત્વના અભિપ્રાય મેળવવાની સ્માર્ટ સિસ્ટમ.\n\n" +
    "📝 <b>સર્વે ફીચર્સ:</b>\n" +
    "• મલ્ટિપલ ચોઇસ પ્રશ્નો\n" +
    "• હા/ના પ્રશ્નો\n" +
    "• મેમ્બર ઓપિનિયન કલેકશન\n" +
    "• અનામિક સર્વે વિકલ્પ\n" +
    "• સર્વે રિઝલ્ટ સમરી\n" +
    "• એડમિન કંટ્રોલ્ડ સર્વે\n" +
    "• ફીડબેક એનાલિસિસ\n" +
    "• મલ્ટીલેંગ્વેજ સપોર્ટ\n\n" +
    "📈 સર્વે રિઝલ્ટથી એડમિનને સારા નિર્ણયો લેવામાં મદદ મળે છે.\n\n" +
    "💼 તમારી કસ્ટમ સર્વે સિસ્ટમ માટે ઓર્ડર કરો."
}

var messageText = text[lang] || text.hinglish

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: "⭐ Feedback System",
      callback_data: "COMMUNITY_FEEDBACK"
    }
  ],
  [
    {
      text: "💡 Suggestion System",
      callback_data: "COMMUNITY_SUGGESTION"
    }
  ],
  [
    {
      text: "❓ General Questions",
      callback_data: "COMMUNITY_QUESTION"
    }
  ],
  [
    {
      text: "🚨 Report Problem",
      callback_data: "COMMUNITY_REPORT"
    }
  ],
  [
    {
      text: "📞 Contact Admin",
      callback_data: "COMMUNITY_CONTACT"
    }
  ],
  [
    {
      text: "💼 Order Custom Bot",
      callback_data: "ORDER_CUSTOM"
    }
  ],
  [
    {
      text: "🔙 Community Demo",
      callback_data: "DEMO_COMMUNITY"
    },
    {
      text: "🏠 Main Menu",
      callback_data: "MENU_DEMO"
    }
  ]
]

// ---------- SHOW MENU ----------
showCommunitySurvey(messageText, buttons)
