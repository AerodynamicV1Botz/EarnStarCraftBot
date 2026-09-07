/*CMD
  command: LEAD_START
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
// SCRIPT 146 — UPDATED VERSION
// COMMAND NAME: LEAD_START
// STEP 5.4.1 — START ENQUIRY DEMO
// 📁 Lead Collection → Enquiry Form
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

// ---------- TEXT ----------
var text = ""

if (lang == "english") {
  text =
    "📝 <b>START ENQUIRY DEMO</b>\n\n" +
    "Welcome to the customer enquiry form.\n\n" +
    "This demo collects basic customer information and forwards the enquiry to the admin.\n\n" +
    "📌 <b>Information collected:</b>\n" +
    "• Customer name\n" +
    "• Contact details\n" +
    "• Required service\n" +
    "• Customer requirement\n\n" +
    "👇 Choose an option to continue."
} else if (lang == "gujarati") {
  text =
    "📝 <b>પૂછપરછ ડેમો શરૂ કરો</b>\n\n" +
    "Customer enquiry form માં આપનું સ્વાગત છે.\n\n" +
    "આ ડેમો customer ની basic information collect કરીને admin ને મોકલે છે.\n\n" +
    "📌 <b>એકત્રિત થતી માહિતી:</b>\n" +
    "• Customer નું નામ\n" +
    "• Contact details\n" +
    "• જરૂરી સર્વિસ\n" +
    "• Customer ની જરૂરિયાત\n\n" +
    "👇 આગળ વધવા માટે વિકલ્પ પસંદ કરો."
} else {
  text =
    "📝 <b>START ENQUIRY DEMO</b>\n\n" +
    "Customer enquiry form mein aapka welcome hai.\n\n" +
    "Ye demo customer ki basic information collect karke admin ko bhejta hai.\n\n" +
    "📌 <b>Collect hone wali information:</b>\n" +
    "• Customer ka naam\n" +
    "• Contact details\n" +
    "• Required service\n" +
    "• Customer ki requirement\n\n" +
    "👇 Aage badhne ke liye option select karo."
}

// ---------- BUTTON TEXT ----------
var buttonText = {
  hinglish: {
    name: "👤 Enter Name",
    contact: "📱 Contact Details",
    service: "🎯 Select Service",
    requirement: "💬 Requirement",
    back: "🔙 Lead Demo",
    main: "🏠 Main Menu"
  },

  english: {
    name: "👤 Enter Name",
    contact: "📱 Contact Details",
    service: "🎯 Select Service",
    requirement: "💬 Requirement",
    back: "🔙 Lead Demo",
    main: "🏠 Main Menu"
  },

  gujarati: {
    name: "👤 નામ દાખલ કરો",
    contact: "📱 સંપર્ક વિગતો",
    service: "🎯 સર્વિસ પસંદ કરો",
    requirement: "💬 જરૂરિયાત",
    back: "🔙 લીડ ડેમો",
    main: "🏠 મુખ્ય મેનુ"
  }
}

var t = buttonText[lang] || buttonText.hinglish

// ---------- SAME MESSAGE EDIT ----------
function showLeadStart(messageText, buttons) {
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

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: t.name,
      callback_data: "LEAD_NAME"
    }
  ],
  [
    {
      text: t.contact,
      callback_data: "LEAD_CONTACTT"
    }
  ],
  [
    {
      text: t.service,
      callback_data: "LEAD_SERVICE"
    }
  ],
  [
    {
      text: t.requirement,
      callback_data: "LEAD_REQUIREMENT"
    }
  ],
  [
    {
      text: t.back,
      callback_data: "DEMO_LEAD"
    },
    {
      text: t.main,
      callback_data: "BACK_MAIN_MENU"
    }
  ]
]

// ---------- SHOW SCREEN ----------
showLeadStart(text, buttons)
