/*CMD
  command: BUILD_HISTORY_DETAILS
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

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 208 — UPDATED VERSION
// COMMAND NAME: BUILD_HISTORY_DETAILS
// STEP 5.3.3 — ENQUIRY HISTORY DETAILS
// 📁 Enquiry Details + Delete Button
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

// ---------- GET REFERENCE ID ----------
var refId = ""

if (
  typeof params !== "undefined" &&
  params
) {
  refId = String(params).trim()
}

if (
  !refId &&
  typeof message !== "undefined" &&
  message
) {
  refId = String(message).trim()
}

if (
  !refId &&
  typeof request !== "undefined" &&
  request.data
) {
  var parts = String(request.data).split(" ")
  refId = parts[1] || ""
}

// ---------- LANGUAGE TEXT ----------
var text = {
  hinglish: {
    title: "🧾 <b>Enquiry Details</b>",
    invalid: "⚠️ Valid enquiry reference select kijiye.",
    notFound: "⚠️ Enquiry details nahi mili.",
    accessDenied: "⚠️ Yeh enquiry aapki nahi hai.",
    reference: "Reference",
    name: "Customer Name",
    contact: "Contact",
    type: "Project Type",
    requirements: "Requirements",
    status: "Status",
    created: "Created At",
    updated: "Updated At",
    delete: "🗑️ Delete This Enquiry",
    history: "📋 Enquiry History",
    build: "🛠️ New Enquiry",
    menu: "🏠 Main Menu"
  },

  en: {
    title: "🧾 <b>Enquiry Details</b>",
    invalid: "⚠️ Please select a valid enquiry reference.",
    notFound: "⚠️ Enquiry details were not found.",
    accessDenied: "⚠️ This enquiry does not belong to you.",
    reference: "Reference",
    name: "Customer Name",
    contact: "Contact",
    type: "Project Type",
    requirements: "Requirements",
    status: "Status",
    created: "Created At",
    updated: "Updated At",
    delete: "🗑️ Delete This Enquiry",
    history: "📋 Enquiry History",
    build: "🛠️ New Enquiry",
    menu: "🏠 Main Menu"
  },

  gu: {
    title: "🧾 <b>પૂછપરછની વિગતો</b>",
    invalid: "⚠️ માન્ય પૂછપરછ પસંદ કરો.",
    notFound: "⚠️ પૂછપરછની વિગતો મળી નથી.",
    accessDenied: "⚠️ આ પૂછપરછ તમારી નથી.",
    reference: "રેફરન્સ",
    name: "ગ્રાહકનું નામ",
    contact: "સંપર્ક",
    type: "પ્રોજેક્ટ પ્રકાર",
    requirements: "જરૂરિયાતો",
    status: "સ્થિતિ",
    created: "બનાવ્યાની તારીખ",
    updated: "અપડેટ તારીખ",
    delete: "🗑️ આ પૂછપરછ ડિલીટ કરો",
    history: "📋 પૂછપરછનો ઇતિહાસ",
    build: "🛠️ નવી પૂછપરછ",
    menu: "🏠 મુખ્ય મેનુ"
  }
}

var t = text[lang] || text.hinglish

// ---------- SAME MESSAGE EDIT + FALLBACK ----------
function showMenu(text, buttons) {
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

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: t.delete,
      callback_data: "BUILD_HISTORY_DELETE " + refId
    }
  ],
  [
    {
      text: t.history,
      callback_data: "BUILD_HISTORY"
    }
  ],
  [
    {
      text: t.build,
      callback_data: "MENU_BUILD"
    }
  ],
  [
    {
      text: t.menu,
      callback_data: "BACK_MAIN_MENU"
    }
  ]
]

// ---------- VALIDATE REFERENCE ----------
if (!refId) {
  showMenu(t.title + "\n\n" + t.invalid, buttons)
  return
}

// ---------- GET ENQUIRY ----------
var enquiry = Bot.getProperty("ENQUIRY_" + refId)

if (!enquiry) {
  showMenu(t.title + "\n\n" + t.notFound, buttons)
  return
}

// ---------- SECURITY CHECK ----------
if (
  String(enquiry.userId) !== String(uid)
) {
  showMenu(t.title + "\n\n" + t.accessDenied, buttons)
  return
}

// ---------- DETAILS ----------
var status = enquiry.status || "Pending"
var name = enquiry.name || "N/A"
var contact = enquiry.contact || "N/A"
var enquiryType = enquiry.enquiryType || "N/A"
var requirements = enquiry.requirements || "N/A"
var createdAt = enquiry.createdAt || "N/A"
var updatedAt = enquiry.updatedAt || createdAt

var statusIcon = "🟡"

if (
  status === "Accepted" ||
  status === "In Progress" ||
  status === "Completed"
) {
  statusIcon = "🟢"
}

if (
  status === "Rejected" ||
  status === "Closed" ||
  status === "Cancelled"
) {
  statusIcon = "🔴"
}

// ---------- RESPONSE ----------
var responseText =
  t.title +
  "\n\n" +
  "🔖 <b>" + t.reference + ":</b> <code>" +
  refId +
  "</code>\n\n" +

  "👤 <b>" + t.name + ":</b> " +
  name +
  "\n" +

  "📞 <b>" + t.contact + ":</b> " +
  contact +
  "\n" +

  "🛠️ <b>" + t.type + ":</b> " +
  enquiryType +
  "\n\n" +

  statusIcon + " <b>" + t.status + ":</b> " +
  status +
  "\n\n" +

  "📝 <b>" + t.requirements + ":</b>\n" +
  requirements +
  "\n\n" +

  "📅 <b>" + t.created + ":</b> " +
  createdAt +
  "\n" +

  "🔄 <b>" + t.updated + ":</b> " +
  updatedAt

// ---------- SHOW DETAILS ----------
showMenu(responseText, buttons)
