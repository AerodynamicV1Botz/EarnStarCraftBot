/*CMD
  command: COMMUNITY_FEEDBACK
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
// SCRIPT 139 — UPDATED VERSION
// COMMAND NAME: COMMUNITY_FEEDBACK
// STEP 5.3.12 — COMMUNITY FEEDBACK DEMO
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
function showCommunityFeedback(text, buttons) {
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
    "⭐ <b>COMMUNITY FEEDBACK SYSTEM</b>\n\n" +
    "🤖 Members apna experience aur feedback share kar sakte hain.\n\n" +
    "📝 <b>Feedback Features:</b>\n" +
    "• Service rating\n" +
    "• Community experience feedback\n" +
    "• Admin service review\n" +
    "• Suggestion feedback\n" +
    "• Positive feedback collection\n" +
    "• Improvement feedback\n" +
    "• Feedback summary\n" +
    "• Multilingual support\n\n" +
    "📊 Feedback se community ki quality aur member experience improve hota hai.\n\n" +
    "💼 Custom feedback system ke liye order karein.",

  english:
    "⭐ <b>COMMUNITY FEEDBACK SYSTEM</b>\n\n" +
    "🤖 Members can share their experience and feedback.\n\n" +
    "📝 <b>Feedback Features:</b>\n" +
    "• Service rating\n" +
    "• Community experience feedback\n" +
    "• Admin service review\n" +
    "• Suggestion feedback\n" +
    "• Positive feedback collection\n" +
    "• Improvement feedback\n" +
    "• Feedback summary\n" +
    "• Multilingual support\n\n" +
    "📊 Feedback helps improve community quality and member experience.\n\n" +
    "💼 Order your custom feedback system.",

  gujarati:
    "⭐ <b>COMMUNITY FEEDBACK SYSTEM</b>\n\n" +
    "🤖 મેમ્બર પોતાનો અનુભવ અને ફીડબેક શેર કરી શકે છે.\n\n" +
    "📝 <b>ફીડબેક ફીચર્સ:</b>\n" +
    "• સર્વિસ રેટિંગ\n" +
    "• કમ્યુનિટી અનુભવ ફીડબેક\n" +
    "• એડમિન સર્વિસ રિવ્યૂ\n" +
    "• સજેશન ફીડબેક\n" +
    "• સારો ફીડબેક કલેક્ટ કરવો\n" +
    "• સુધારા માટે ફીડબેક\n" +
    "• ફીડબેક સમરી\n" +
    "• મલ્ટીલેંગ્વેજ સપોર્ટ\n\n" +
    "📊 ફીડબેકથી કમ્યુનિટીની ક્વોલિટી અને મેમ્બર અનુભવ સુધરે છે.\n\n" +
    "💼 તમારી કસ્ટમ ફીડબેક સિસ્ટમ માટે ઓર્ડર કરો."
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
showCommunityFeedback(messageText, buttons)
