/*CMD
  command: COMMUNITY_QUESTION
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
// SCRIPT 137 — UPDATED VERSION
// COMMAND NAME: COMMUNITY_QUESTION
// STEP 5.3.10 — COMMUNITY QUESTION DEMO
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
function showCommunityQuestion(text, buttons) {
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
    "❓ <b>GENERAL QUESTION SYSTEM</b>\n\n" +
    "🤖 Members apne questions easily submit kar sakte hain.\n\n" +
    "💬 <b>Question Features:</b>\n" +
    "• Question category select\n" +
    "• Question submit option\n" +
    "• Admin notification\n" +
    "• Quick reply system\n" +
    "• Question status tracking\n" +
    "• Previous questions history\n" +
    "• Multilingual support\n" +
    "• Easy navigation\n\n" +
    "⚡ Har member ko help lene ka simple aur organized way milta hai.\n\n" +
    "💼 Custom question system ke liye order karein.",

  english:
    "❓ <b>GENERAL QUESTION SYSTEM</b>\n\n" +
    "🤖 Members can easily submit their questions.\n\n" +
    "💬 <b>Question Features:</b>\n" +
    "• Select question category\n" +
    "• Submit question option\n" +
    "• Admin notification\n" +
    "• Quick reply system\n" +
    "• Question status tracking\n" +
    "• Previous question history\n" +
    "• Multilingual support\n" +
    "• Easy navigation\n\n" +
    "⚡ Give every member a simple and organized way to get help.\n\n" +
    "💼 Order your custom question system.",

  gujarati:
    "❓ <b>GENERAL QUESTION SYSTEM</b>\n\n" +
    "🤖 મેમ્બર સરળતાથી પોતાના પ્રશ્નો સબમિટ કરી શકે છે.\n\n" +
    "💬 <b>પ્રશ્ન ફીચર્સ:</b>\n" +
    "• પ્રશ્નની કેટેગરી પસંદ કરવી\n" +
    "• પ્રશ્ન સબમિટ કરવાનો વિકલ્પ\n" +
    "• એડમિન નોટિફિકેશન\n" +
    "• ક્વિક રિપ્લાય સિસ્ટમ\n" +
    "• પ્રશ્ન સ્ટેટસ ટ્રેકિંગ\n" +
    "• અગાઉના પ્રશ્નોની હિસ્ટરી\n" +
    "• મલ્ટીલેંગ્વેજ સપોર્ટ\n" +
    "• સરળ નેવિગેશન\n\n" +
    "⚡ દરેક મેમ્બરને મદદ મેળવવાની સરળ અને ઓર્ગેનાઇઝ્ડ રીત મળે છે.\n\n" +
    "💼 તમારી કસ્ટમ પ્રશ્ન સિસ્ટમ માટે ઓર્ડર કરો."
}

var messageText = text[lang] || text.hinglish

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: "💡 Suggestion System",
      callback_data: "COMMUNITY_SUGGESTION"
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
showCommunityQuestion(messageText, buttons)
