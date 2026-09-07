/*CMD
  command: COMMUNITY_POLL
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
// SCRIPT 141 — UPDATED VERSION
// COMMAND NAME: COMMUNITY_POLL
// STEP 5.3.14 — COMMUNITY POLL DEMO
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
function showCommunityPoll(text, buttons) {
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
    "🗳️ <b>COMMUNITY POLL SYSTEM</b>\n\n" +
    "🤖 Community mein voting aur public opinion collect karne ka smart system.\n\n" +
    "📊 <b>Poll Features:</b>\n" +
    "• Multiple voting options\n" +
    "• Yes/No poll\n" +
    "• Anonymous voting option\n" +
    "• Live vote count\n" +
    "• Poll result display\n" +
    "• Admin-controlled polls\n" +
    "• Duplicate vote protection\n" +
    "• Multilingual support\n\n" +
    "⚡ Community decisions ko transparent aur organized banayein.\n\n" +
    "💼 Custom poll system ke liye order karein.",

  english:
    "🗳️ <b>COMMUNITY POLL SYSTEM</b>\n\n" +
    "🤖 A smart system for voting and collecting public opinions in your community.\n\n" +
    "📊 <b>Poll Features:</b>\n" +
    "• Multiple voting options\n" +
    "• Yes/No polls\n" +
    "• Anonymous voting option\n" +
    "• Live vote count\n" +
    "• Poll result display\n" +
    "• Admin-controlled polls\n" +
    "• Duplicate vote protection\n" +
    "• Multilingual support\n\n" +
    "⚡ Make community decisions transparent and organized.\n\n" +
    "💼 Order your custom poll system.",

  gujarati:
    "🗳️ <b>COMMUNITY POLL SYSTEM</b>\n\n" +
    "🤖 કમ્યુનિટીમાં વોટિંગ અને લોકોના અભિપ્રાય મેળવવાની સ્માર્ટ સિસ્ટમ.\n\n" +
    "📊 <b>પોલ ફીચર્સ:</b>\n" +
    "• મલ્ટિપલ વોટિંગ વિકલ્પો\n" +
    "• હા/ના પોલ\n" +
    "• અનામિક વોટિંગ વિકલ્પ\n" +
    "• લાઇવ વોટ કાઉન્ટ\n" +
    "• પોલ રિઝલ્ટ ડિસ્પ્લે\n" +
    "• એડમિન કંટ્રોલ્ડ પોલ્સ\n" +
    "• ડુપ્લિકેટ વોટ પ્રોટેક્શન\n" +
    "• મલ્ટીલેંગ્વેજ સપોર્ટ\n\n" +
    "⚡ કમ્યુનિટી નિર્ણયો પારદર્શક અને ઓર્ગેનાઇઝ્ડ બનાવો.\n\n" +
    "💼 તમારી કસ્ટમ પોલ સિસ્ટમ માટે ઓર્ડર કરો."
}

var messageText = text[lang] || text.hinglish

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: "📊 Survey System",
      callback_data: "COMMUNITY_SURVEY"
    }
  ],
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
showCommunityPoll(messageText, buttons)
