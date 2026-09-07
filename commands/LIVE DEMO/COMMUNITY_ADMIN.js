/*CMD
  command: COMMUNITY_ADMIN
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
// SCRIPT 132 — UPDATED VERSION
// COMMAND NAME: COMMUNITY_ADMIN
// STEP 5.3.5 — COMMUNITY ADMIN FEATURES DEMO
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
function showCommunityAdmin(text, buttons) {
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
    "👑 <b>COMMUNITY ADMIN FEATURES</b>\n\n" +
    "🤖 EarnStar Botcraft ke powerful admin tools ka demo.\n\n" +
    "🛡️ <b>Admin Features:</b>\n" +
    "• Member management\n" +
    "• Welcome & goodbye control\n" +
    "• Rules and announcements\n" +
    "• Member request handling\n" +
    "• Warning and moderation system\n" +
    "• Admin activity logs\n" +
    "• Community settings\n" +
    "• Secure admin permissions\n\n" +
    "⚡ Aapki community ko organized, safe aur active rakhne ke liye.\n\n" +
    "💼 Custom community bot ke liye order karein.",

  english:
    "👑 <b>COMMUNITY ADMIN FEATURES</b>\n\n" +
    "🤖 Explore powerful admin tools from EarnStar Botcraft.\n\n" +
    "🛡️ <b>Admin Features:</b>\n" +
    "• Member management\n" +
    "• Welcome and goodbye controls\n" +
    "• Rules and announcements\n" +
    "• Member request handling\n" +
    "• Warning and moderation system\n" +
    "• Admin activity logs\n" +
    "• Community settings\n" +
    "• Secure admin permissions\n\n" +
    "⚡ Keep your community organized, safe and active.\n\n" +
    "💼 Order your custom community bot.",

  gujarati:
    "👑 <b>COMMUNITY ADMIN FEATURES</b>\n\n" +
    "🤖 EarnStar Botcraft ના શક્તિશાળી એડમિન ટૂલ્સનો ડેમો.\n\n" +
    "🛡️ <b>એડમિન ફીચર્સ:</b>\n" +
    "• મેમ્બર મેનેજમેન્ટ\n" +
    "• વેલકમ અને ગુડબાય કંટ્રોલ\n" +
    "• નિયમો અને જાહેરાતો\n" +
    "• મેમ્બર રિક્વેસ્ટ હેન્ડલિંગ\n" +
    "• વોર્નિંગ અને મોડરેશન સિસ્ટમ\n" +
    "• એડમિન એક્ટિવિટી લોગ્સ\n" +
    "• કમ્યુનિટી સેટિંગ્સ\n" +
    "• સુરક્ષિત એડમિન પરમિશન\n\n" +
    "⚡ તમારી કમ્યુનિટીને ઓર્ગેનાઇઝ્ડ, સેફ અને એક્ટિવ રાખો.\n\n" +
    "💼 તમારી કસ્ટમ કમ્યુનિટી બોટ માટે ઓર્ડર કરો."
}

var messageText = text[lang] || text.hinglish

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: "👋 Welcome System",
      callback_data: "COMMUNITY_WELCOME"
    }
  ],
  [
    {
      text: "📜 Rules & Info",
      callback_data: "COMMUNITY_RULES"
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
showCommunityAdmin(messageText, buttons)
