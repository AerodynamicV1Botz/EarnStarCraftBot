/*CMD
  command: DEMO_LEAD
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
// SCRIPT 145 — UPDATED VERSION
// COMMAND NAME: DEMO_LEAD
// STEP 5.4 — LEAD COLLECTION BOT DEMO
// 📁 Lead Generation Demo
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

// ---------- DEMO TEXT ----------
var text = ""

if (lang == "english") {
  text =
    "📝 <b>LEAD COLLECTION BOT DEMO</b>\n\n" +
    "🎯 A Telegram bot designed to collect customer enquiries and organize potential leads.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 📝 Customer enquiry form\n" +
    "• 👤 Name & contact collection\n" +
    "• 🎯 Service selection\n" +
    "• 💬 Requirement collection\n" +
    "• 🔔 Instant admin notification\n" +
    "• 📋 Organized lead information\n" +
    "• 📊 Basic lead tracking\n" +
    "• 🛡️ Admin controls\n\n" +
    "💡 <b>Best for:</b>\n" +
    "Freelancers • Agencies • Businesses • Service Providers\n\n" +
    "🚀 Turn Telegram visitors into organized business enquiries.\n\n" +
    "🎯 This is a showcase demo. The exact form and workflow can be customized."
} else if (lang == "gujarati") {
  text =
    "📝 <b>લીડ કલેક્શન બોટ ડેમો</b>\n\n" +
    "🎯 Customer enquiries collect અને potential leads organize કરવા માટે Telegram bot.\n\n" +
    "✨ <b>ડેમો ફીચર્સ:</b>\n" +
    "• 📝 Customer enquiry form\n" +
    "• 👤 Name અને contact collection\n" +
    "• 🎯 Service selection\n" +
    "• 💬 Requirement collection\n" +
    "• 🔔 Instant admin notification\n" +
    "• 📋 Organized lead information\n" +
    "• 📊 Basic lead tracking\n" +
    "• 🛡️ Admin controls\n\n" +
    "💡 <b>કયા માટે ઉપયોગી:</b>\n" +
    "Freelancers • Agencies • Businesses • Service Providers\n\n" +
    "🚀 Telegram visitors ને organized business enquiries માં convert કરવામાં મદદ કરે છે.\n\n" +
    "🎯 આ showcase demo છે. Exact form અને workflow customize કરી શકાય છે."
} else {
  text =
    "📝 <b>LEAD COLLECTION BOT DEMO</b>\n\n" +
    "🎯 Customer enquiries collect karne aur potential leads ko organize karne ke liye Telegram bot.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 📝 Customer enquiry form\n" +
    "• 👤 Name & contact collection\n" +
    "• 🎯 Service selection\n" +
    "• 💬 Requirement collection\n" +
    "• 🔔 Instant admin notification\n" +
    "• 📋 Organized lead information\n" +
    "• 📊 Basic lead tracking\n" +
    "• 🛡️ Admin controls\n\n" +
    "💡 <b>Best for:</b>\n" +
    "Freelancers • Agencies • Businesses • Service Providers\n\n" +
    "🚀 Telegram visitors ko organized business enquiries mein convert karne mein help karta hai.\n\n" +
    "🎯 Ye showcase demo hai. Exact form aur workflow customize kiya ja sakta hai."
}

// ---------- BUTTON TEXT ----------
var buttonText = {
  hinglish: {
    start: "📝 Start Enquiry Demo",
    service: "🎯 Service Selection",
    tracking: "📊 Lead Tracking",
    admin: "🔔 Admin Notification",
    build: "🚀 Build Similar Bot",
    demos: "🎬 All Demos",
    main: "🏠 Main Menu"
  },

  english: {
    start: "📝 Start Enquiry Demo",
    service: "🎯 Service Selection",
    tracking: "📊 Lead Tracking",
    admin: "🔔 Admin Notification",
    build: "🚀 Build Similar Bot",
    demos: "🎬 All Demos",
    main: "🏠 Main Menu"
  },

  gujarati: {
    start: "📝 પૂછપરછ ડેમો શરૂ કરો",
    service: "🎯 સર્વિસ પસંદગી",
    tracking: "📊 લીડ ટ્રેકિંગ",
    admin: "🔔 એડમિન નોટિફિકેશન",
    build: "🚀 આવો જ બોટ બનાવો",
    demos: "🎬 બધા ડેમો",
    main: "🏠 મુખ્ય મેનુ"
  }
}

var t = buttonText[lang] || buttonText.hinglish

// ---------- SAME MESSAGE EDIT ----------
function showLeadDemo(messageText, buttons) {
  if (
    typeof request !== "undefined" &&
    request.message &&
    request.message.message_id
  ) {
    try {
      Api.editMessageText({
        chat_id: uid,
        message_id: request.message.message_id,
        text: messageText,
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
    text: messageText,
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
      text: t.start,
      callback_data: "LEAD_START"
    }
  ],
  [
    {
      text: t.service,
      callback_data: "LEAD_SERVICE"
    },
    {
      text: t.tracking,
      callback_data: "LEAD_TRACKING"
    }
  ],
  [
    {
      text: t.admin,
      callback_data: "LEAD_ADMIN"
    }
  ],
  [
    {
      text: t.build,
      callback_data: "ORDER_CUSTOM"
    }
  ],
  [
    {
      text: t.demos,
      callback_data: "MENU_DEMO"
    },
    {
      text: t.main,
      callback_data: "BACK_MAIN_MENU"
    }
  ]
]

// ---------- SHOW DEMO ----------
showLeadDemo(text, buttons)
