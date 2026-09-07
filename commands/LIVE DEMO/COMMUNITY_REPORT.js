/*CMD
  command: COMMUNITY_REPORT
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
// SCRIPT 134 — UPDATED VERSION
// COMMAND NAME: COMMUNITY_REPORT
// STEP 5.3.7 — COMMUNITY REPORT SYSTEM DEMO
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
function showCommunityReport(text, buttons) {
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
    "🚨 <b>COMMUNITY REPORT SYSTEM</b>\n\n" +
    "🤖 Members suspicious ya inappropriate content ko report kar sakte hain.\n\n" +
    "📩 <b>Report Features:</b>\n" +
    "• Spam report\n" +
    "• Fake account report\n" +
    "• Harassment report\n" +
    "• Unauthorized link report\n" +
    "• Inappropriate content report\n" +
    "• Admin notification\n" +
    "• Report status tracking\n" +
    "• Secure complaint handling\n\n" +
    "🛡️ Reports admins tak safely pahunchte hain.\n\n" +
    "💼 Custom report system ke liye order karein.",

  english:
    "🚨 <b>COMMUNITY REPORT SYSTEM</b>\n\n" +
    "🤖 Members can report suspicious or inappropriate content.\n\n" +
    "📩 <b>Report Features:</b>\n" +
    "• Spam reports\n" +
    "• Fake account reports\n" +
    "• Harassment reports\n" +
    "• Unauthorized link reports\n" +
    "• Inappropriate content reports\n" +
    "• Admin notifications\n" +
    "• Report status tracking\n" +
    "• Secure complaint handling\n\n" +
    "🛡️ Reports are safely delivered to admins.\n\n" +
    "💼 Order your custom report system.",

  gujarati:
    "🚨 <b>COMMUNITY REPORT SYSTEM</b>\n\n" +
    "🤖 મેમ્બર શંકાસ્પદ અથવા અયોગ્ય કન્ટેન્ટની રિપોર્ટ કરી શકે છે.\n\n" +
    "📩 <b>રિપોર્ટ ફીચર્સ:</b>\n" +
    "• સ્પામ રિપોર્ટ\n" +
    "• ફેક એકાઉન્ટ રિપોર્ટ\n" +
    "• હેરેસમેન્ટ રિપોર્ટ\n" +
    "• અનધિકૃત લિંક રિપોર્ટ\n" +
    "• અયોગ્ય કન્ટેન્ટ રિપોર્ટ\n" +
    "• એડમિન નોટિફિકેશન\n" +
    "• રિપોર્ટ સ્ટેટસ ટ્રેકિંગ\n" +
    "• સુરક્ષિત ફરિયાદ હેન્ડલિંગ\n\n" +
    "🛡️ રિપોર્ટ સુરક્ષિત રીતે એડમિન સુધી પહોંચે છે.\n\n" +
    "💼 તમારી કસ્ટમ રિપોર્ટ સિસ્ટમ માટે ઓર્ડર કરો."
}

var messageText = text[lang] || text.hinglish

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: "🛡️ Moderation Demo",
      callback_data: "COMMUNITY_MODERATION"
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
      text: "📩 Member Requests",
      callback_data: "COMMUNITY_REQUEST"
    }
  ],
  [
    {
      text: "📢 Announcements",
      callback_data: "COMMUNITY_ANNOUNCE"
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
showCommunityReport(messageText, buttons)
