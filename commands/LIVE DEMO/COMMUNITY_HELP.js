/*CMD
  command: COMMUNITY_HELP
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
// SCRIPT 136 — UPDATED VERSION
// COMMAND NAME: COMMUNITY_HELP
// STEP 5.3.9 — COMMUNITY HELP SYSTEM DEMO
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
function showCommunityHelp(text, buttons) {
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
    "🆘 <b>COMMUNITY HELP SYSTEM</b>\n\n" +
    "🤖 Members ko common problems ka quick solution dene ke liye help center.\n\n" +
    "📚 <b>Help Features:</b>\n" +
    "• Frequently asked questions\n" +
    "• Community rules guide\n" +
    "• Support request option\n" +
    "• Admin contact option\n" +
    "• Report problem option\n" +
    "• Quick help buttons\n" +
    "• Multilingual support\n" +
    "• Easy navigation\n\n" +
    "⚡ Members ko har basic information ek hi jagah milti hai.\n\n" +
    "💼 Custom help center bot ke liye order karein.",

  english:
    "🆘 <b>COMMUNITY HELP SYSTEM</b>\n\n" +
    "🤖 A help center that gives members quick solutions to common problems.\n\n" +
    "📚 <b>Help Features:</b>\n" +
    "• Frequently asked questions\n" +
    "• Community rules guide\n" +
    "• Support request option\n" +
    "• Admin contact option\n" +
    "• Report problem option\n" +
    "• Quick help buttons\n" +
    "• Multilingual support\n" +
    "• Easy navigation\n\n" +
    "⚡ Members can find basic information in one place.\n\n" +
    "💼 Order your custom help center bot.",

  gujarati:
    "🆘 <b>COMMUNITY HELP SYSTEM</b>\n\n" +
    "🤖 મેમ્બરને સામાન્ય સમસ્યાનો ઝડપી ઉકેલ આપવા માટે હેલ્પ સેન્ટર.\n\n" +
    "📚 <b>હેલ્પ ફીચર્સ:</b>\n" +
    "• વારંવાર પૂછાતા પ્રશ્નો\n" +
    "• કમ્યુનિટી નિયમોની ગાઇડ\n" +
    "• સપોર્ટ રિક્વેસ્ટ વિકલ્પ\n" +
    "• એડમિન કોન્ટેક્ટ વિકલ્પ\n" +
    "• સમસ્યાની રિપોર્ટ\n" +
    "• ક્વિક હેલ્પ બટન્સ\n" +
    "• મલ્ટીલેંગ્વેજ સપોર્ટ\n" +
    "• સરળ નેવિગેશન\n\n" +
    "⚡ મેમ્બરને બધી મૂળભૂત માહિતી એક જ જગ્યાએ મળે છે.\n\n" +
    "💼 તમારી કસ્ટમ હેલ્પ સેન્ટર બોટ માટે ઓર્ડર કરો."
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
      text: "💡 Suggestions",
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
      text: "📜 Community Rules",
      callback_data: "COMMUNITY_RULES"
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
showCommunityHelp(messageText, buttons)
