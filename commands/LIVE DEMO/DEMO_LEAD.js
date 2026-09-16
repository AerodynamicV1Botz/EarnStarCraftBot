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

/*CMD
  command: DEMO_LEAD
  need_reply: false
  folder: DEMOS
*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 145 — UPDATED VERSION
// COMMAND NAME: DEMO_LEAD
// STEP 5.4 — LEAD COLLECTION BOT DEMO
// 📁 Live Demos → Lead Generation Demo
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ One-Page Demo
// ✅ Same Message Edit + Delete Fallback
// ==========================================


// ==========================================
// 👤 USER DATA
// ==========================================

var uid = String(user.telegramid)

var userData =
  Bot.getProperty("USER_" + uid) || {}

var lang =
  userData.language || "hinglish"


// ==========================================
// CALLBACK ANSWER
// ==========================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}


// ==========================================
// DEMO TEXT
// ==========================================

var text = ""

if (lang == "english") {

  text =
    "📝 <b>LEAD COLLECTION BOT DEMO</b>\n\n" +

    "🎯 A Telegram bot designed to collect customer enquiries and organize potential leads in one place.\n\n" +

    "✨ <b>Demo Features</b>\n" +
    "• 📝 Customer enquiry form\n" +
    "• 👤 Name and contact collection\n" +
    "• 🎯 Service selection\n" +
    "• 💬 Requirement collection\n" +
    "• 🔔 Instant admin notification\n" +
    "• 📋 Organized lead information\n" +
    "• 📊 Basic lead tracking\n" +
    "• 🛡️ Admin controls\n\n" +

    "💡 <b>Best For</b>\n" +
    "Freelancers • Agencies • Businesses • Service Providers • Consultants\n\n" +

    "🔄 <b>Example Workflow</b>\n" +
    "Visitor starts the bot → selects a service → submits contact details → explains requirements → admin receives the enquiry → lead is followed up.\n\n" +

    "🚀 <b>Business Benefit</b>\n" +
    "Helps convert Telegram visitors into organized business enquiries and reduces manual lead collection.\n\n" +

    "🎯 This is a showcase demo. The exact form, fields and workflow can be customized."

} else if (lang == "gujarati") {

  text =
    "📝 <b>લીડ કલેક્શન બોટ ડેમો</b>\n\n" +

    "🎯 Customer enquiries collect કરવા અને potential leads ને એક જ જગ્યાએ organize કરવા માટે Telegram bot.\n\n" +

    "✨ <b>ડેમો ફીચર્સ</b>\n" +
    "• 📝 Customer enquiry form\n" +
    "• 👤 Name અને contact collection\n" +
    "• 🎯 Service selection\n" +
    "• 💬 Requirement collection\n" +
    "• 🔔 Instant admin notification\n" +
    "• 📋 Organized lead information\n" +
    "• 📊 Basic lead tracking\n" +
    "• 🛡️ Admin controls\n\n" +

    "💡 <b>કયા માટે ઉપયોગી</b>\n" +
    "Freelancers • Agencies • Businesses • Service Providers • Consultants\n\n" +

    "🔄 <b>Example Workflow</b>\n" +
    "Visitor bot શરૂ કરે → service પસંદ કરે → contact details આપે → requirement લખે → admin ને enquiry મળે → lead પર follow-up થાય.\n\n" +

    "🚀 <b>Business Benefit</b>\n" +
    "Telegram visitors ને organized business enquiries માં convert કરવામાં અને manual lead collection ઘટાડવામાં મદદ કરે છે.\n\n" +

    "🎯 આ showcase demo છે. Exact form, fields અને workflow customize કરી શકાય છે."

} else {

  text =
    "📝 <b>LEAD COLLECTION BOT DEMO</b>\n\n" +

    "🎯 Customer enquiries collect karne aur potential leads ko ek hi jagah organize karne ke liye Telegram bot.\n\n" +

    "✨ <b>Demo Features</b>\n" +
    "• 📝 Customer enquiry form\n" +
    "• 👤 Name aur contact collection\n" +
    "• 🎯 Service selection\n" +
    "• 💬 Requirement collection\n" +
    "• 🔔 Instant admin notification\n" +
    "• 📋 Organized lead information\n" +
    "• 📊 Basic lead tracking\n" +
    "• 🛡️ Admin controls\n\n" +

    "💡 <b>Best For</b>\n" +
    "Freelancers • Agencies • Businesses • Service Providers • Consultants\n\n" +

    "🔄 <b>Example Workflow</b>\n" +
    "Visitor bot start karta hai → service select karta hai → contact details submit karta hai → requirement batata hai → admin ko enquiry milti hai → lead par follow-up hota hai.\n\n" +

    "🚀 <b>Business Benefit</b>\n" +
    "Telegram visitors ko organized business enquiries mein convert karne aur manual lead collection kam karne mein help karta hai.\n\n" +

    "🎯 Ye showcase demo hai. Exact form, fields aur workflow customize kiya ja sakta hai."
}


// ==========================================
// BUTTON TEXT
// ==========================================

var buttonText = {

  hinglish: {
    demos: "🎬 All Demos",
    main: "🏠 Main Menu"
  },

  english: {
    demos: "🎬 All Demos",
    main: "🏠 Main Menu"
  },

  gujarati: {
    demos: "🎬 બધા ડેમો",
    main: "🏠 મુખ્ય મેનુ"
  }

}

var t =
  buttonText[lang] ||
  buttonText.hinglish


// ==========================================
// BUTTONS
// ==========================================
// Inner feature buttons removed.
// All lead collection information is shown on one page.

var buttons = [
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


// ==========================================
// SAME MESSAGE EDIT
// ==========================================

function showLeadDemo(messageText, buttons) {

  if (
    typeof request !== "undefined" &&
    request &&
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


// ==========================================
// SHOW LEAD DEMO
// ==========================================

showLeadDemo(text, buttons)
