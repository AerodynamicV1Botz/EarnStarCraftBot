/*CMD
  command: MY_ENQUIRY
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/*CMD
  command: MY_ENQUIRY
  need_reply: false
  folder: CUSTOM_BUILD
*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 199 — UPDATED VERSION
// COMMAND NAME: MY_ENQUIRY
// STEP 6.1.4 — VIEW MY ENQUIRY
// 📁 Custom Build Flow
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ One-Page Enquiry View
// ✅ Safe HTML Text
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

var refId =
  userData.enquiryRef || ""


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
// SAFE HTML HELPER
// ==========================================

function safeText(value) {

  if (
    value === null ||
    typeof value === "undefined"
  ) {
    return ""
  }

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}


// ==========================================
// MULTILINGUAL TEXT
// ==========================================

var texts = {

  hinglish: {

    noEnquiry:
      "📋 <b>MY ENQUIRY</b>\n\n" +
      "❌ Aapki koi active enquiry nahi mili.\n\n" +
      "🚀 Apna project submit karne ke liye <b>Build My Bot</b> par click karein.",

    notFound:
      "📋 <b>MY ENQUIRY</b>\n\n" +
      "❌ Enquiry record nahi mila.\n\n" +
      "Aap new enquiry submit kar sakte hain.",

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
    progressStatus: "🔵 IN PROGRESS",

    newMessage:
      "Aapki enquiry receive ho gayi hai aur team ke review ka wait kar rahi hai.",

    acceptedMessage:
      "Hamari team ne aapki enquiry accept kar li hai. Project ke baare mein aapse discuss kiya jayega.",

    progressMessage:
      "Aapka project process mein hai. Team aapko next update degi.",

    closedMessage:
      "Ye enquiry close ho gayi hai. Aap kabhi bhi new enquiry submit kar sakte hain."

  },

  english: {

    noEnquiry:
      "📋 <b>MY ENQUIRY</b>\n\n" +
      "❌ No active enquiry was found.\n\n" +
      "🚀 Click <b>Build My Bot</b> to submit your project.",

    notFound:
      "📋 <b>MY ENQUIRY</b>\n\n" +
      "❌ Enquiry record not found.\n\n" +
      "You can submit a new enquiry.",

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
    progressStatus: "🔵 IN PROGRESS",

    newMessage:
      "Your enquiry has been received and is waiting for our team to review it.",

    acceptedMessage:
      "Our team has accepted your enquiry and will discuss the project with you.",

    progressMessage:
      "Your project is currently in progress. Our team will provide the next update.",

    closedMessage:
      "This enquiry has been closed. You can submit a new enquiry anytime."

  },

  en: {

    noEnquiry:
      "📋 <b>MY ENQUIRY</b>\n\n" +
      "❌ No active enquiry was found.\n\n" +
      "🚀 Click <b>Build My Bot</b> to submit your project.",

    notFound:
      "📋 <b>MY ENQUIRY</b>\n\n" +
      "❌ Enquiry record not found.\n\n" +
      "You can submit a new enquiry.",

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
    progressStatus: "🔵 IN PROGRESS",

    newMessage:
      "Your enquiry has been received and is waiting for our team to review it.",

    acceptedMessage:
      "Our team has accepted your enquiry and will discuss the project with you.",

    progressMessage:
      "Your project is currently in progress. Our team will provide the next update.",

    closedMessage:
      "This enquiry has been closed. You can submit a new enquiry anytime."

  },

  gujarati: {

    noEnquiry:
      "📋 <b>મારી પૂછપરછ</b>\n\n" +
      "❌ તમારી કોઈ સક્રિય પૂછપરછ મળી નથી.\n\n" +
      "🚀 પ્રોજેક્ટ સબમિટ કરવા માટે <b>Build My Bot</b> પર ક્લિક કરો.",

    notFound:
      "📋 <b>મારી પૂછપરછ</b>\n\n" +
      "❌ પૂછપરછનો રેકોર્ડ મળ્યો નથી.\n\n" +
      "તમે નવી પૂછપરછ સબમિટ કરી શકો છો.",

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
    progressStatus: "🔵 ચાલુ પ્રક્રિયામાં",

    newMessage:
      "તમારી પૂછપરછ મળી ગઈ છે અને અમારી ટીમના રિવ્યૂની રાહ જોઈ રહી છે.",

    acceptedMessage:
      "અમારી ટીમે તમારી પૂછપરછ સ્વીકારી છે અને પ્રોજેક્ટ વિશે તમારી સાથે ચર્ચા કરશે.",

    progressMessage:
      "તમારો પ્રોજેક્ટ હાલમાં પ્રક્રિયામાં છે. અમારી ટીમ તમને આગળનું અપડેટ આપશે.",

    closedMessage:
      "આ પૂછપરછ બંધ થઈ ગઈ છે. તમે ક્યારેય પણ નવી પૂછપરછ સબમિટ કરી શકો છો."

  },

  gu: {

    noEnquiry:
      "📋 <b>મારી પૂછપરછ</b>\n\n" +
      "❌ તમારી કોઈ સક્રિય પૂછપરછ મળી નથી.\n\n" +
      "🚀 પ્રોજેક્ટ સબમિટ કરવા માટે <b>Build My Bot</b> પર ક્લિક કરો.",

    notFound:
      "📋 <b>મારી પૂછપરછ</b>\n\n" +
      "❌ પૂછપરછનો રેકોર્ડ મળ્યો નથી.\n\n" +
      "તમે નવી પૂછપરછ સબમિટ કરી શકો છો.",

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
    progressStatus: "🔵 ચાલુ પ્રક્રિયામાં",

    newMessage:
      "તમારી પૂછપરછ મળી ગઈ છે અને અમારી ટીમના રિવ્યૂની રાહ જોઈ રહી છે.",

    acceptedMessage:
      "અમારી ટીમે તમારી પૂછપરછ સ્વીકારી છે અને પ્રોજેક્ટ વિશે તમારી સાથે ચર્ચા કરશે.",

    progressMessage:
      "તમારો પ્રોજેક્ટ હાલમાં પ્રક્રિયામાં છે. અમારી ટીમ તમને આગળનું અપડેટ આપશે.",

    closedMessage:
      "આ પૂછપરછ બંધ થઈ ગઈ છે. તમે ક્યારેય પણ નવી પૂછપરછ સબમિટ કરી શકો છો."

  }

}

var t =
  texts[lang] ||
  texts.hinglish


// ==========================================
// SAME MESSAGE EDIT + DELETE FALLBACK
// ==========================================

function showEnquiry(messageText, buttons) {

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
// NO ENQUIRY FOUND
// ==========================================

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
        callback_data: "MAIN_MENU"
      }
    ]
  ]

  showEnquiry(
    t.noEnquiry,
    noEnquiryButtons
  )

  return
}


// ==========================================
// GET ENQUIRY RECORD
// ==========================================

var enquiry =
  Bot.getProperty("ENQUIRY_" + refId)

if (!enquiry) {

  var missingButtons = [
    [
      {
        text: t.build,
        callback_data: "MENU_BUILD"
      }
    ],
    [
      {
        text: t.mainMenu,
        callback_data: "MAIN_MENU"
      }
    ]
  ]

  showEnquiry(
    t.notFound,
    missingButtons
  )

  return
}


// ==========================================
// STATUS SETUP
// ==========================================

var status =
  String(
    enquiry.status ||
    enquiry.requestStatus ||
    enquiry.stage ||
    "new"
  ).toLowerCase()

var statusText =
  t.newStatus

var statusMessage =
  t.newMessage

if (
  status == "accepted" ||
  status == "approved" ||
  status == "confirmed"
) {

  statusText =
    t.acceptedStatus

  statusMessage =
    t.acceptedMessage

} else if (
  status == "in_progress" ||
  status == "in progress" ||
  status == "processing" ||
  status == "started"
) {

  statusText =
    t.progressStatus

  statusMessage =
    t.progressMessage

} else if (
  status == "closed" ||
  status == "cancelled" ||
  status == "canceled" ||
  status == "completed"
) {

  statusText =
    t.closedStatus

  statusMessage =
    t.closedMessage
}


// ==========================================
// ENQUIRY DATA
// ==========================================

var displayName =
  enquiry.name ||
  enquiry.clientName ||
  enquiry.fullName ||
  "Not provided"

var requirements =
  enquiry.requirements ||
  enquiry.description ||
  enquiry.projectDetails ||
  "Not provided"


// ==========================================
// ENQUIRY MESSAGE
// ==========================================

var enquiryText =

  t.title + "\n\n" +

  t.reference + "\n" +
  "<code>" +
  safeText(refId) +
  "</code>\n\n" +

  t.name + " " +
  safeText(displayName) +
  "\n" +

  t.status + " " +
  statusText +
  "\n\n" +

  t.requirements + "\n" +
  safeText(requirements) +
  "\n\n" +

  "💬 " +
  statusMessage


// ==========================================
// ENQUIRY BUTTONS
// ==========================================

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
      callback_data: "MAIN_MENU"
    }
  ]
]


// ==========================================
// SHOW ENQUIRY
// ==========================================

showEnquiry(
  enquiryText,
  enquiryButtons
)
