/*CMD
  command: COMMUNITY_CONTACT
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
// SCRIPT 135 — UPDATED VERSION
// COMMAND NAME: COMMUNITY_CONTACT
// STEP 5.3.8 — COMMUNITY CONTACT SYSTEM DEMO
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
function showCommunityContact(text, buttons) {
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
    "📞 <b>COMMUNITY CONTACT SYSTEM</b>\n\n" +
    "🤖 Members ke liye easy contact aur help system.\n\n" +
    "💬 <b>Contact Features:</b>\n" +
    "• Admin se direct contact\n" +
    "• Support request submit\n" +
    "• General question option\n" +
    "• Suggestion submit\n" +
    "• Problem report\n" +
    "• Important contact details\n" +
    "• Quick reply system\n" +
    "• Secure communication\n\n" +
    "⚡ Members ko help lene mein easy aur fast experience milta hai.\n\n" +
    "💼 Custom contact system ke liye order karein.",

  english:
    "📞 <b>COMMUNITY CONTACT SYSTEM</b>\n\n" +
    "🤖 An easy contact and help system for community members.\n\n" +
    "💬 <b>Contact Features:</b>\n" +
    "• Direct admin contact\n" +
    "• Submit support requests\n" +
    "• General question option\n" +
    "• Submit suggestions\n" +
    "• Report problems\n" +
    "• Important contact details\n" +
    "• Quick reply system\n" +
    "• Secure communication\n\n" +
    "⚡ Give members a simple and fast way to get help.\n\n" +
    "💼 Order your custom contact system.",

  gujarati:
    "📞 <b>COMMUNITY CONTACT SYSTEM</b>\n\n" +
    "🤖 કમ્યુનિટી મેમ્બર માટે સરળ કોન્ટેક્ટ અને હેલ્પ સિસ્ટમ.\n\n" +
    "💬 <b>કોન્ટેક્ટ ફીચર્સ:</b>\n" +
    "• એડમિન સાથે સીધો સંપર્ક\n" +
    "• સપોર્ટ રિક્વેસ્ટ સબમિટ\n" +
    "• સામાન્ય પ્રશ્નનો વિકલ્પ\n" +
    "• સૂચન સબમિટ\n" +
    "• સમસ્યાની રિપોર્ટ\n" +
    "• મહત્વની કોન્ટેક્ટ વિગતો\n" +
    "• ક્વિક રિપ્લાય સિસ્ટમ\n" +
    "• સુરક્ષિત કમ્યુનિકેશન\n\n" +
    "⚡ મેમ્બરને મદદ મેળવવાનો સરળ અને ઝડપી અનુભવ મળે છે.\n\n" +
    "💼 તમારી કસ્ટમ કોન્ટેક્ટ સિસ્ટમ માટે ઓર્ડર કરો."
}

var messageText = text[lang] || text.hinglish

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: "📩 Member Requests",
      callback_data: "COMMUNITY_REQUEST"
    }
  ],
  [
    {
      text: "🚨 Report System",
      callback_data: "COMMUNITY_REPORT"
    }
  ],
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
showCommunityContact(messageText, buttons)
