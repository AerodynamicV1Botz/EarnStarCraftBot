/*CMD
  command: COMMUNITY_SUGGESTION
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
// SCRIPT 138 — UPDATED VERSION
// COMMAND NAME: COMMUNITY_SUGGESTION
// STEP 5.3.11 — COMMUNITY SUGGESTION DEMO
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
function showCommunitySuggestion(text, buttons) {
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
    "💡 <b>COMMUNITY SUGGESTION SYSTEM</b>\n\n" +
    "🤖 Members apne ideas aur suggestions easily share kar sakte hain.\n\n" +
    "✨ <b>Suggestion Features:</b>\n" +
    "• New idea submit\n" +
    "• Improvement suggestion\n" +
    "• Feature request\n" +
    "• Admin notification\n" +
    "• Suggestion review\n" +
    "• Approved idea tracking\n" +
    "• Member feedback\n" +
    "• Organized suggestion history\n\n" +
    "🚀 Community ko better banane ke liye members ki opinion collect karein.\n\n" +
    "💼 Custom suggestion system ke liye order karein.",

  english:
    "💡 <b>COMMUNITY SUGGESTION SYSTEM</b>\n\n" +
    "🤖 Members can easily share their ideas and suggestions.\n\n" +
    "✨ <b>Suggestion Features:</b>\n" +
    "• Submit new ideas\n" +
    "• Improvement suggestions\n" +
    "• Feature requests\n" +
    "• Admin notifications\n" +
    "• Suggestion review\n" +
    "• Approved idea tracking\n" +
    "• Member feedback\n" +
    "• Organized suggestion history\n\n" +
    "🚀 Collect member opinions to improve your community.\n\n" +
    "💼 Order your custom suggestion system.",

  gujarati:
    "💡 <b>COMMUNITY SUGGESTION SYSTEM</b>\n\n" +
    "🤖 મેમ્બર પોતાના આઈડિયા અને સૂચનો સરળતાથી શેર કરી શકે છે.\n\n" +
    "✨ <b>સજેશન ફીચર્સ:</b>\n" +
    "• નવો આઈડિયા સબમિટ\n" +
    "• સુધારાના સૂચનો\n" +
    "• ફીચર રિક્વેસ્ટ\n" +
    "• એડમિન નોટિફિકેશન\n" +
    "• સજેશન રિવ્યૂ\n" +
    "• મંજૂર થયેલા આઈડિયાનું ટ્રેકિંગ\n" +
    "• મેમ્બર ફીડબેક\n" +
    "• ઓર્ગેનાઇઝ્ડ સજેશન હિસ્ટરી\n\n" +
    "🚀 કમ્યુનિટીને વધુ સારી બનાવવા માટે મેમ્બરના અભિપ્રાય મેળવો.\n\n" +
    "💼 તમારી કસ્ટમ સજેશન સિસ્ટમ માટે ઓર્ડર કરો."
}

var messageText = text[lang] || text.hinglish

// ---------- BUTTONS ----------
var buttons = [
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
      text: "🆘 Help Center",
      callback_data: "COMMUNITY_HELP"
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
showCommunitySuggestion(messageText, buttons)
