/*CMD
  command: COMMUNITY_EVENTS
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
// SCRIPT 143 — UPDATED VERSION
// COMMAND NAME: COMMUNITY_EVENTS
// STEP 5.3.16 — COMMUNITY EVENTS DEMO
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
function showCommunityEvents(text, buttons) {
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
    "📅 <b>COMMUNITY EVENTS SYSTEM</b>\n\n" +
    "🤖 Community ke events aur activities manage karne ka smart system.\n\n" +
    "🎉 <b>Event Features:</b>\n" +
    "• New event create karna\n" +
    "• Event date aur time\n" +
    "• Event details display\n" +
    "• Member registration\n" +
    "• Reminder notifications\n" +
    "• Event updates\n" +
    "• Participant list\n" +
    "• Event cancellation notice\n\n" +
    "⚡ Community events ko organized aur engaging banayein.\n\n" +
    "💼 Custom event management bot ke liye order karein.",

  english:
    "📅 <b>COMMUNITY EVENTS SYSTEM</b>\n\n" +
    "🤖 A smart system for managing community events and activities.\n\n" +
    "🎉 <b>Event Features:</b>\n" +
    "• Create new events\n" +
    "• Event date and time\n" +
    "• Event details display\n" +
    "• Member registration\n" +
    "• Reminder notifications\n" +
    "• Event updates\n" +
    "• Participant list\n" +
    "• Event cancellation notices\n\n" +
    "⚡ Keep community events organized and engaging.\n\n" +
    "💼 Order your custom event management bot.",

  gujarati:
    "📅 <b>COMMUNITY EVENTS SYSTEM</b>\n\n" +
    "🤖 કમ્યુનિટીના ઇવેન્ટ્સ અને એક્ટિવિટી મેનેજ કરવાની સ્માર્ટ સિસ્ટમ.\n\n" +
    "🎉 <b>ઇવેન્ટ ફીચર્સ:</b>\n" +
    "• નવો ઇવેન્ટ બનાવવો\n" +
    "• ઇવેન્ટની તારીખ અને સમય\n" +
    "• ઇવેન્ટની વિગતો દર્શાવવી\n" +
    "• મેમ્બર રજિસ્ટ્રેશન\n" +
    "• રિમાઇન્ડર નોટિફિકેશન\n" +
    "• ઇવેન્ટ અપડેટ્સ\n" +
    "• પાર્ટિસિપન્ટ લિસ્ટ\n" +
    "• ઇવેન્ટ કેન્સલેશન નોટિસ\n\n" +
    "⚡ કમ્યુનિટી ઇવેન્ટ્સને ઓર્ગેનાઇઝ્ડ અને ઇંગેજિંગ બનાવો.\n\n" +
    "💼 તમારી કસ્ટમ ઇવેન્ટ મેનેજમેન્ટ બોટ માટે ઓર્ડર કરો."
}

var messageText = text[lang] || text.hinglish

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: "🗳️ Voting System",
      callback_data: "COMMUNITY_VOTING"
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
showCommunityEvents(messageText, buttons)
