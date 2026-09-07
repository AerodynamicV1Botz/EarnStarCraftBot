/*CMD
  command: COMMUNITY_MODERATION
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
// SCRIPT 133 — UPDATED VERSION
// COMMAND NAME: COMMUNITY_MODERATION
// STEP 5.3.6 — COMMUNITY MODERATION DEMO
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
function showModeration(text, buttons) {
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
    "🛡️ <b>COMMUNITY MODERATION</b>\n\n" +
    "🤖 Smart moderation system ka demo.\n\n" +
    "⚙️ <b>Moderation Features:</b>\n" +
    "• Spam message control\n" +
    "• Warning system\n" +
    "• Mute aur restrict members\n" +
    "• Unauthorized links control\n" +
    "• Bad words filter\n" +
    "• Report message system\n" +
    "• Admin-only actions\n" +
    "• Member activity monitoring\n\n" +
    "🔐 Community ko clean, safe aur properly managed rakhein.\n\n" +
    "💼 Custom moderation bot banwane ke liye order karein.",

  english:
    "🛡️ <b>COMMUNITY MODERATION</b>\n\n" +
    "🤖 Explore our smart moderation system demo.\n\n" +
    "⚙️ <b>Moderation Features:</b>\n" +
    "• Spam message control\n" +
    "• Warning system\n" +
    "• Mute and restrict members\n" +
    "• Unauthorized link control\n" +
    "• Bad words filter\n" +
    "• Report message system\n" +
    "• Admin-only actions\n" +
    "• Member activity monitoring\n\n" +
    "🔐 Keep your community clean, safe and well managed.\n\n" +
    "💼 Order your custom moderation bot.",

  gujarati:
    "🛡️ <b>COMMUNITY MODERATION</b>\n\n" +
    "🤖 સ્માર્ટ મોડરેશન સિસ્ટમનો ડેમો.\n\n" +
    "⚙️ <b>મોડરેશન ફીચર્સ:</b>\n" +
    "• સ્પામ મેસેજ કંટ્રોલ\n" +
    "• વોર્નિંગ સિસ્ટમ\n" +
    "• મેમ્બર મ્યૂટ અને રિસ્ટ્રિક્ટ\n" +
    "• અનધિકૃત લિંક કંટ્રોલ\n" +
    "• ખરાબ શબ્દોનું ફિલ્ટર\n" +
    "• રિપોર્ટ મેસેજ સિસ્ટમ\n" +
    "• ફક્ત એડમિન એક્શન\n" +
    "• મેમ્બર એક્ટિવિટી મોનિટરિંગ\n\n" +
    "🔐 કમ્યુનિટીને ક્લીન, સેફ અને સારી રીતે મેનેજ રાખો.\n\n" +
    "💼 તમારી કસ્ટમ મોડરેશન બોટ માટે ઓર્ડર કરો."
}

var messageText = text[lang] || text.hinglish

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: "👑 Admin Features",
      callback_data: "COMMUNITY_ADMIN"
    }
  ],
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
showModeration(messageText, buttons)
