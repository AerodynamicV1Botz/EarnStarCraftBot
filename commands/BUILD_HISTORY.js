/*CMD
  command: BUILD_HISTORY
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
// SCRIPT 207 — UPDATED VERSION
// COMMAND NAME: BUILD_HISTORY
// STEP 5.3.2 — CUSTOMER ENQUIRY HISTORY
// 📁 Enquiry History + View Details
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

// ---------- LANGUAGE TEXT ----------
var text = {
  hinglish: {
    title: "📋 <b>My Enquiry History</b>",
    empty:
      "Aapne abhi tak koi enquiry submit nahi ki hai.\n\n" +
      "Nayi enquiry submit karne ke liye neeche button dabaiye.",
    total: "Total Enquiries",
    enquiry: "Enquiry",
    reference: "Reference",
    type: "Type",
    status: "Status",
    date: "Date",
    view: "🧾 View Details",
    newBuild: "🛠️ New Enquiry",
    mainMenu: "🏠 Main Menu",
    refresh: "🔄 Refresh"
  },

  en: {
    title: "📋 <b>My Enquiry History</b>",
    empty:
      "You have not submitted any enquiry yet.\n\n" +
      "Tap the button below to submit a new enquiry.",
    total: "Total Enquiries",
    enquiry: "Enquiry",
    reference: "Reference",
    type: "Type",
    status: "Status",
    date: "Date",
    view: "🧾 View Details",
    newBuild: "🛠️ New Enquiry",
    mainMenu: "🏠 Main Menu",
    refresh: "🔄 Refresh"
  },

  gu: {
    title: "📋 <b>મારી પૂછપરછનો ઇતિહાસ</b>",
    empty:
      "તમે હજુ સુધી કોઈ પૂછપરછ મોકલી નથી.\n\n" +
      "નવી પૂછપરછ મોકલવા માટે નીચેનું બટન દબાવો.",
    total: "કુલ પૂછપરછ",
    enquiry: "પૂછપરછ",
    reference: "રેફરન્સ",
    type: "પ્રકાર",
    status: "સ્થિતિ",
    date: "તારીખ",
    view: "🧾 વિગતો જુઓ",
    newBuild: "🛠️ નવી પૂછપરછ",
    mainMenu: "🏠 મુખ્ય મેનુ",
    refresh: "🔄 રિફ્રેશ"
  }
}

var t = text[lang] || text.hinglish

// ---------- GET ENQUIRY HISTORY ----------
var enquiryKeys = Bot.getProperty("ENQUIRY_KEYS") || []

if (!Array.isArray(enquiryKeys)) {
  enquiryKeys = []
}

var userEnquiries = []

for (var i = enquiryKeys.length - 1; i >= 0; i--) {
  var refId = enquiryKeys[i]
  var enquiry = Bot.getProperty("ENQUIRY_" + refId)

  if (
    enquiry &&
    String(enquiry.userId) === String(uid)
  ) {
    userEnquiries.push(enquiry)
  }
}

// ---------- BUTTONS ----------
var buttons = []

if (userEnquiries.length === 0) {
  buttons.push([
    {
      text: t.newBuild,
      callback_data: "MENU_BUILD"
    }
  ])
} else {
  buttons.push([
    {
      text: t.refresh,
      callback_data: "BUILD_HISTORY"
    }
  ])

  // ---------- VIEW DETAILS BUTTONS ----------
  for (var b = 0; b < userEnquiries.length; b++) {
    var buttonEnquiry = userEnquiries[b]
    var buttonRefId = buttonEnquiry.refId || ""

    if (buttonRefId) {
      buttons.push([
        {
          text: t.view + " #" + buttonRefId,
          callback_data: "BUILD_HISTORY_DETAILS " + buttonRefId
        }
      ])
    }
  }

  buttons.push([
    {
      text: t.newBuild,
      callback_data: "MENU_BUILD"
    }
  ])
}

buttons.push([
  {
    text: t.mainMenu,
    callback_data: "BACK_MAIN_MENU"
  }
])

// ---------- BUILD RESPONSE ----------
var responseText = t.title + "\n\n"

if (userEnquiries.length === 0) {
  responseText += t.empty
} else {
  responseText +=
    "📊 <b>" +
    t.total +
    ":</b> " +
    userEnquiries.length +
    "\n\n"

  for (var j = 0; j < userEnquiries.length; j++) {
    var item = userEnquiries[j]

    var status = item.status || "Pending"
    var enquiryType = item.enquiryType || "Custom Project"
    var reference = item.refId || "N/A"
    var createdAt = item.createdAt || "N/A"

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

    responseText +=
      "━━━━━━━━━━━━━━━━━━\n" +
      "🧾 <b>" +
      t.enquiry +
      " " +
      (j + 1) +
      "</b>\n\n" +

      "🔖 <b>" +
      t.reference +
      ":</b> <code>" +
      reference +
      "</code>\n" +

      "🛠️ <b>" +
      t.type +
      ":</b> " +
      enquiryType +
      "\n" +

      statusIcon +
      " <b>" +
      t.status +
      ":</b> " +
      status +
      "\n" +

      "📅 <b>" +
      t.date +
      ":</b> " +
      createdAt +
      "\n"
  }

  responseText +=
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "💡 Neeche apni enquiry ka <b>View Details</b> button dabaiye."
}

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

// ---------- SEND RESPONSE ----------
showMenu(
  responseText,
  buttons
)
