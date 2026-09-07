/*CMD
  command: MY_ENQUIRY
  help: 
  need_reply: false
  auto_retry_time: 
  folder: MY ENQUIRY

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 199 — UPDATED VERSION
// COMMAND NAME: MY_ENQUIRY
// STEP 6.1.4 — VIEW MY ENQUIRY
// 📁 Custom Build Flow
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"
var refId = userData.enquiryRef

// Callback answer
if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

// Multilingual helper
var texts = {
  hinglish: {
    noEnquiry:
      "📋 <b>MY ENQUIRY</b>\n\n" +
      "❌ Aapki koi active enquiry nahi mili.\n\n" +
      "🚀 Apna project submit karne ke liye <b>Build My Bot</b> par click karein.",

    notFound:
      "❌ Enquiry record nahi mila.",

    title: "📋 <b>MY ENQUIRY</b>",
    reference: "🆔 <b>Reference ID:</b>",
    name: "👤 <b>Name:</b>",
    status: "📊 <b>Status:</b>",
    requirements: "📝 <b>Requirements:</b>",
    refresh: "🔄 Refresh Status",
    build: "🚀 Build My Bot",
    mainMenu: "🏠 Main Menu",

    newStatus: "🟡 NEW",
    acceptedStatus: "🟢 ACCEPTED",
    closedStatus: "🔴 CLOSED",

    newMessage:
      "Aapki enquiry receive ho gayi hai aur team ke review ka wait kar rahi hai.",

    acceptedMessage:
      "Hamari team ne aapki enquiry accept kar li hai. Project ke baare mein aapse discuss kiya jayega.",

    closedMessage:
      "Ye enquiry close ho gayi hai. Aap kabhi bhi new enquiry submit kar sakte hain."
  },

  en: {
    noEnquiry:
      "📋 <b>MY ENQUIRY</b>\n\n" +
      "❌ No active enquiry was found.\n\n" +
      "🚀 Click <b>Build My Bot</b> to submit your project.",

    notFound:
      "❌ Enquiry record not found.",

    title: "📋 <b>MY ENQUIRY</b>",
    reference: "🆔 <b>Reference ID:</b>",
    name: "👤 <b>Name:</b>",
    status: "📊 <b>Status:</b>",
    requirements: "📝 <b>Requirements:</b>",
    refresh: "🔄 Refresh Status",
    build: "🚀 Build My Bot",
    mainMenu: "🏠 Main Menu",

    newStatus: "🟡 NEW",
    acceptedStatus: "🟢 ACCEPTED",
    closedStatus: "🔴 CLOSED",

    newMessage:
      "Your enquiry has been received and is waiting for our team to review it.",

    acceptedMessage:
      "Our team has accepted your enquiry and will discuss the project with you.",

    closedMessage:
      "This enquiry has been closed. You can submit a new enquiry anytime."
  },

  gu: {
    noEnquiry:
      "📋 <b>મારી પૂછપરછ</b>\n\n" +
      "❌ તમારી કોઈ સક્રિય પૂછપરછ મળી નથી.\n\n" +
      "🚀 પ્રોજેક્ટ સબમિટ કરવા માટે <b>Build My Bot</b> પર ક્લિક કરો.",

    notFound:
      "❌ પૂછપરછનો રેકોર્ડ મળ્યો નથી.",

    title: "📋 <b>મારી પૂછપરછ</b>",
    reference: "🆔 <b>રેફરન્સ ID:</b>",
    name: "👤 <b>નામ:</b>",
    status: "📊 <b>સ્ટેટસ:</b>",
    requirements: "📝 <b>જરૂરિયાતો:</b>",
    refresh: "🔄 સ્ટેટસ રિફ્રેશ",
    build: "🚀 બોટ બનાવો",
    mainMenu: "🏠 મુખ્ય મેનુ",

    newStatus: "🟡 નવી",
    acceptedStatus: "🟢 સ્વીકારેલી",
    closedStatus: "🔴 બંધ",

    newMessage:
      "તમારી પૂછપરછ મળી ગઈ છે અને અમારી ટીમના રિવ્યૂની રાહ જોઈ રહી છે.",

    acceptedMessage:
      "અમારી ટીમે તમારી પૂછપરછ સ્વીકારી છે અને પ્રોજેક્ટ વિશે તમારી સાથે ચર્ચા કરશે.",

    closedMessage:
      "આ પૂછપરછ બંધ થઈ ગઈ છે. તમે ક્યારેય પણ નવી પૂછપરછ સબમિટ કરી શકો છો."
  }
}

var t = texts[lang] || texts.hinglish

// No enquiry found
if (!refId) {
  var noEnquiryButtons = [
    [
      {
        text: t.build,
        callback_data: "MENU_BUILD"
      }
    ],
    [
      {
        text: t.mainMenu,
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]

  function showNoEnquiry(text, buttons) {
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

  showNoEnquiry(t.noEnquiry, noEnquiryButtons)
  return
}

// Get enquiry record
var enquiry = Bot.getProperty("ENQUIRY_" + refId)

if (!enquiry) {
  Bot.sendMessage(t.notFound)
  return
}

// Status setup
var status = enquiry.status || "new"
var statusText = t.newStatus
var statusMessage = t.newMessage

if (status == "accepted") {
  statusText = t.acceptedStatus
  statusMessage = t.acceptedMessage
}

if (status == "closed") {
  statusText = t.closedStatus
  statusMessage = t.closedMessage
}

// Enquiry message
var enquiryText =
  t.title + "\n\n" +
  t.reference + "\n" +
  "<code>" + refId + "</code>\n\n" +
  t.name + " " +
  (enquiry.name || "Not provided") + "\n" +
  t.status + " " +
  statusText + "\n\n" +
  t.requirements + "\n" +
  (enquiry.requirements || "Not provided") + "\n\n" +
  "💬 " + statusMessage

var enquiryButtons = [
  [
    {
      text: t.refresh,
      callback_data: "MY_ENQUIRY"
    }
  ],
  [
    {
      text: t.mainMenu,
      callback_data: "BACK_MAIN_MENU"
    }
  ]
]

// Same-message edit with delete fallback
function showEnquiry(text, buttons) {
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

showEnquiry(enquiryText, enquiryButtons)
