/*CMD
  command: COMMUNITY_VOTING
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
// SCRIPT 142 — UPDATED VERSION
// COMMAND NAME: COMMUNITY_VOTING
// STEP 5.3.15 — COMMUNITY VOTING DEMO
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
function showCommunityVoting(text, buttons) {
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
    "🗳️ <b>COMMUNITY VOTING SYSTEM</b>\n\n" +
    "🤖 Community decisions ke liye organized voting system ka demo.\n\n" +
    "⚙️ <b>Voting Features:</b>\n" +
    "• Voting options create karna\n" +
    "• Member vote submission\n" +
    "• One-member-one-vote control\n" +
    "• Voting deadline\n" +
    "• Live result tracking\n" +
    "• Admin voting management\n" +
    "• Result announcement\n" +
    "• Secure voting records\n\n" +
    "📊 Important community decisions ko simple aur transparent banayein.\n\n" +
    "💼 Custom voting system ke liye order karein.",

  english:
    "🗳️ <b>COMMUNITY VOTING SYSTEM</b>\n\n" +
    "🤖 Explore an organized voting system for community decisions.\n\n" +
    "⚙️ <b>Voting Features:</b>\n" +
    "• Create voting options\n" +
    "• Member vote submission\n" +
    "• One-member-one-vote control\n" +
    "• Voting deadline\n" +
    "• Live result tracking\n" +
    "• Admin voting management\n" +
    "• Result announcement\n" +
    "• Secure voting records\n\n" +
    "📊 Make important community decisions simple and transparent.\n\n" +
    "💼 Order your custom voting system.",

  gujarati:
    "🗳️ <b>COMMUNITY VOTING SYSTEM</b>\n\n" +
    "🤖 કમ્યુનિટી નિર્ણયો માટે ઓર્ગેનાઇઝ્ડ વોટિંગ સિસ્ટમનો ડેમો.\n\n" +
    "⚙️ <b>વોટિંગ ફીચર્સ:</b>\n" +
    "• વોટિંગ વિકલ્પો બનાવવું\n" +
    "• મેમ્બર વોટ સબમિશન\n" +
    "• એક મેમ્બર એક વોટ કંટ્રોલ\n" +
    "• વોટિંગ ડેડલાઇન\n" +
    "• લાઇવ રિઝલ્ટ ટ્રેકિંગ\n" +
    "• એડમિન વોટિંગ મેનેજમેન્ટ\n" +
    "• રિઝલ્ટ એનાઉન્સમેન્ટ\n" +
    "• સુરક્ષિત વોટિંગ રેકોર્ડ્સ\n\n" +
    "📊 મહત્વના કમ્યુનિટી નિર્ણયો સરળ અને પારદર્શક બનાવો.\n\n" +
    "💼 તમારી કસ્ટમ વોટિંગ સિસ્ટમ માટે ઓર્ડર કરો."
}

var messageText = text[lang] || text.hinglish

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: "🗳️ Poll System",
      callback_data: "COMMUNITY_POLL"
    }
  ],
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
      text: "👑 Admin Features",
      callback_data: "COMMUNITY_ADMIN"
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
showCommunityVoting(messageText, buttons)
