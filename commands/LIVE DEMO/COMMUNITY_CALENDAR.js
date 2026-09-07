/*CMD
  command: COMMUNITY_CALENDAR
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
// SCRIPT 144 — UPDATED VERSION
// COMMAND NAME: COMMUNITY_CALENDAR
// STEP 5.3.17 — COMMUNITY DEMO FINAL
// 📁 Community Demo → Events Calendar
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

// ---------- MULTI LANGUAGE ----------
var text = {
  hinglish:
    "📅 <b>Community Events Calendar</b>\n\n" +
    "Community ke saare important events ek hi jagah manage karein.\n\n" +
    "✅ Upcoming events\n" +
    "✅ Event reminders\n" +
    "✅ Community activities\n" +
    "✅ Meeting schedule\n" +
    "✅ Special announcements\n\n" +
    "🚀 Members ko har important event ki information time par milti rahegi.",

  english:
    "📅 <b>Community Events Calendar</b>\n\n" +
    "Manage all important community events in one place.\n\n" +
    "✅ Upcoming events\n" +
    "✅ Event reminders\n" +
    "✅ Community activities\n" +
    "✅ Meeting schedules\n" +
    "✅ Special announcements\n\n" +
    "🚀 Members stay updated about every important event.",

  gujarati:
    "📅 <b>કમ્યુનિટી ઇવેન્ટ્સ કેલેન્ડર</b>\n\n" +
    "કમ્યુનિટીના બધા મહત્વપૂર્ણ ઇવેન્ટ્સ એક જ જગ્યાએ મેનેજ કરો.\n\n" +
    "✅ આવનારા ઇવેન્ટ્સ\n" +
    "✅ ઇવેન્ટ રિમાઇન્ડર્સ\n" +
    "✅ કમ્યુનિટી પ્રવૃત્તિઓ\n" +
    "✅ મીટિંગ શેડ્યૂલ\n" +
    "✅ ખાસ જાહેરાતો\n\n" +
    "🚀 સભ્યોને દરેક મહત્વપૂર્ણ ઇવેન્ટની માહિતી સમયસર મળે છે."
}

// ---------- BUTTON TEXT ----------
var buttonsText = {
  hinglish: {
    upcoming: "📅 Upcoming Events",
    reminder: "🔔 Event Reminders",
    activities: "🎯 Community Activities",
    demo: "🔙 Community Demo",
    lead: "👤 Lead Generation Demo",
    menu: "🏠 Main Menu"
  },

  english: {
    upcoming: "📅 Upcoming Events",
    reminder: "🔔 Event Reminders",
    activities: "🎯 Community Activities",
    demo: "🔙 Community Demo",
    lead: "👤 Lead Generation Demo",
    menu: "🏠 Main Menu"
  },

  gujarati: {
    upcoming: "📅 આવનારા ઇવેન્ટ્સ",
    reminder: "🔔 ઇવેન્ટ રિમાઇન્ડર્સ",
    activities: "🎯 કમ્યુનિટી પ્રવૃત્તિઓ",
    demo: "🔙 કમ્યુનિટી ડેમો",
    lead: "👤 લીડ જનરેશન ડેમો",
    menu: "🏠 મુખ્ય મેનુ"
  }
}

var t = buttonsText[lang] || buttonsText.hinglish

// ---------- SAME MESSAGE EDIT ----------
function showCalendar(text, buttons) {
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

// ---------- INLINE BUTTONS ----------
var buttons = [
  [
    {
      text: t.upcoming,
      callback_data: "COMMUNITY_EVENTS"
    }
  ],
  [
    {
      text: t.reminder,
      callback_data: "COMMUNITY_ANNOUNCE"
    }
  ],
  [
    {
      text: t.activities,
      callback_data: "COMMUNITY_POLL"
    }
  ],
  [
    {
      text: t.demo,
      callback_data: "DEMO_COMMUNITY"
    }
  ],
  [
    {
      text: t.lead,
      callback_data: "DEMO_LEAD"
    }
  ],
  [
    {
      text: t.menu,
      callback_data: "BACK_MAIN_MENU"
    }
  ]
]

// ---------- SHOW SCREEN ----------
showCalendar(text[lang] || text.hinglish, buttons)
