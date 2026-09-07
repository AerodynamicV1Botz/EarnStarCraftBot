/*CMD
  command: SUPPORT_ADMIN_REQUESTS
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
// SCRIPT 100 — UPDATED VERSION
// COMMAND NAME: SUPPORT_ADMIN_REQUESTS
// STEP 5.2.3.1.1.2.1.6
// 📁 Admin Support Requests List
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

// ---------- ADMIN CHECK ----------
var uid = user.telegramid

if (String(uid) !== "7897324623") {
  if (
    typeof request !== "undefined" &&
    request &&
    request.id
  ) {
    try {
      Api.answerCallbackQuery({
        callback_query_id: request.id,
        text: "❌ Admin access required"
      })
    } catch (error) {}
  }

  return
}

// ---------- CALLBACK ANSWER ----------
if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  try {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "📂 Requests loaded"
    })
  } catch (error) {}
}

// ---------- LANGUAGE ----------
var adminData = Bot.getProperty(
  "USER_" + uid
) || {}

var lang = adminData.language || "hinglish"

// ---------- LANGUAGE TEXT ----------
var langText = {
  hinglish: {
    title: "📂 <b>Support Requests</b>",
    total: "📊 <b>Total:</b>",
    newText: "🟡 New",
    accepted: "🟢 Accepted",
    rejected: "🔴 Rejected",
    closed: "⚫ Closed",
    cancelled: "⚪ Cancelled",
    filter: "🔎 <b>Filter:</b>",
    page: "📄 <b>Page:</b>",
    empty: "📭 Is filter mein koi request nahi mili.",
    unknown: "Unknown User",
    subject: "Support Request",
    view: "📄 View",
    all: "📋 All",
    previous: "⬅️ Previous",
    next: "Next ➡️",
    refresh: "🔄 Refresh"
  },

  en: {
    title: "📂 <b>Support Requests</b>",
    total: "📊 <b>Total:</b>",
    newText: "🟡 New",
    accepted: "🟢 Accepted",
    rejected: "🔴 Rejected",
    closed: "⚫ Closed",
    cancelled: "⚪ Cancelled",
    filter: "🔎 <b>Filter:</b>",
    page: "📄 <b>Page:</b>",
    empty: "📭 No requests found in this filter.",
    unknown: "Unknown User",
    subject: "Support Request",
    view: "📄 View",
    all: "📋 All",
    previous: "⬅️ Previous",
    next: "Next ➡️",
    refresh: "🔄 Refresh"
  },

  gu: {
    title: "📂 <b>સપોર્ટ રિક્વેસ્ટ્સ</b>",
    total: "📊 <b>કુલ:</b>",
    newText: "🟡 નવી",
    accepted: "🟢 સ્વીકારેલી",
    rejected: "🔴 નામંજૂર",
    closed: "⚫ બંધ",
    cancelled: "⚪ રદ",
    filter: "🔎 <b>ફિલ્ટર:</b>",
    page: "📄 <b>પેજ:</b>",
    empty: "📭 આ ફિલ્ટરમાં કોઈ રિક્વેસ્ટ મળી નથી.",
    unknown: "અજાણ્યો યુઝર",
    subject: "સપોર્ટ રિક્વેસ્ટ",
    view: "📄 જુઓ",
    all: "📋 બધી",
    previous: "⬅️ અગાઉનું",
    next: "આગળ ➡️",
    refresh: "🔄 રિફ્રેશ"
  }
}

var t = langText[lang] || langText.hinglish

// ---------- PARAMETERS ----------
var rawParams = String(
  params || ""
).trim()

var filter = "ALL"
var page = 1

var parts = rawParams
  ? rawParams.split(/\s+/)
  : []

for (
  var p = 0;
  p < parts.length;
  p++
) {
  var part = parts[p]

  if (
    part === "ALL" ||
    part === "NEW" ||
    part === "ACCEPTED" ||
    part === "REJECTED" ||
    part === "CLOSED" ||
    part === "CANCELLED"
  ) {
    filter = part
  }

  if (
    part.indexOf("PAGE=") === 0
  ) {
    page = parseInt(
      part.replace("PAGE=", ""),
      10
    )
  }
}

if (
  isNaN(page) ||
  page < 1
) {
  page = 1
}

// ---------- HTML ESCAPE ----------
function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

// ---------- STATUS TEXT ----------
function getStatusText(status) {
  if (status === "ACCEPTED") {
    return t.accepted
  }

  if (status === "REJECTED") {
    return t.rejected
  }

  if (status === "CLOSED") {
    return t.closed
  }

  if (status === "CANCELLED") {
    return t.cancelled
  }

  return t.newText
}

// ---------- LOAD REQUEST KEYS ----------
var allKeys = Bot.getProperty(
  "SUPPORT_REQUEST_KEYS"
) || []

var allRequests = []

var counts = {
  ALL: 0,
  NEW: 0,
  ACCEPTED: 0,
  REJECTED: 0,
  CLOSED: 0,
  CANCELLED: 0
}

// ---------- READ ALL REQUESTS ----------
for (
  var i = 0;
  i < allKeys.length;
  i++
) {
  var refId = String(allKeys[i])

  var requestData = Bot.getProperty(
    "SUPPORT_REQUEST_" + refId
  )

  if (
    !requestData ||
    typeof requestData !== "object"
  ) {
    continue
  }

  var status = String(
    requestData.status || "NEW"
  ).toUpperCase()

  if (
    status !== "NEW" &&
    status !== "ACCEPTED" &&
    status !== "REJECTED" &&
    status !== "CLOSED" &&
    status !== "CANCELLED"
  ) {
    status = "NEW"
  }

  counts.ALL++
  counts[status]++

  if (
    filter === "ALL" ||
    filter === status
  ) {
    allRequests.push({
      refId: refId,
      data: requestData,
      status: status
    })
  }
}

// ---------- PAGINATION ----------
var perPage = 5

var totalPages = Math.max(
  1,
  Math.ceil(
    allRequests.length / perPage
  )
)

if (page > totalPages) {
  page = totalPages
}

var startIndex =
  (page - 1) * perPage

var endIndex = Math.min(
  startIndex + perPage,
  allRequests.length
)

// ---------- MAIN TEXT ----------
var text =
  t.title + "\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  t.total + " " + counts.ALL + "\n" +
  t.newText + ": " + counts.NEW + "\n" +
  t.accepted + ": " + counts.ACCEPTED + "\n" +
  t.rejected + ": " + counts.REJECTED + "\n" +
  t.closed + ": " + counts.CLOSED + "\n" +
  t.cancelled + ": " + counts.CANCELLED + "\n\n" +
  t.filter + " " +
  escapeHtml(filter) + "\n" +
  t.page + " " +
  page + "/" + totalPages + "\n\n"

// ---------- BUTTONS ----------
var buttons = []

// ---------- EMPTY RESULT ----------
if (
  allRequests.length === 0
) {
  text +=
    "📭 " +
    t.empty + "\n"
} else {

  // ---------- REQUEST LIST ----------
  for (
    var j = startIndex;
    j < endIndex;
    j++
  ) {
    var item = allRequests[j]
    var data = item.data

    var subject =
      data.subject ||
      data.title ||
      t.subject

    var name =
      data.name ||
      data.full_name ||
      data.fullName ||
      t.unknown

    subject = String(subject)
      .replace(/\n/g, " ")

    name = String(name)
      .replace(/\n/g, " ")

    if (subject.length > 25) {
      subject =
        subject.substring(0, 25) + "..."
    }

    if (name.length > 20) {
      name =
        name.substring(0, 20) + "..."
    }

    text +=
      "🆔 <code>" +
      escapeHtml(item.refId) +
      "</code>\n" +
      "👤 " +
      escapeHtml(name) +
      "\n" +
      "📝 " +
      escapeHtml(subject) +
      "\n" +
      "📌 " +
      getStatusText(item.status) +
      "\n\n"

    buttons.push([
      {
        text:
          t.view + " " + item.refId,

        callback_data:
          "SUPPORT_ADMIN_REQUEST " +
          item.refId
      }
    ])
  }
}

// ---------- FILTER BUTTONS ----------
buttons.push([
  {
    text:
      t.all + " (" + counts.ALL + ")",

    callback_data:
      "SUPPORT_ADMIN_REQUESTS ALL"
  },
  {
    text:
      t.newText + " (" + counts.NEW + ")",

    callback_data:
      "SUPPORT_ADMIN_REQUESTS NEW"
  }
])

buttons.push([
  {
    text:
      t.accepted + " (" +
      counts.ACCEPTED + ")",

    callback_data:
      "SUPPORT_ADMIN_REQUESTS ACCEPTED"
  },
  {
    text:
      t.rejected + " (" +
      counts.REJECTED + ")",

    callback_data:
      "SUPPORT_ADMIN_REQUESTS REJECTED"
  }
])

buttons.push([
  {
    text:
      t.closed + " (" +
      counts.CLOSED + ")",

    callback_data:
      "SUPPORT_ADMIN_REQUESTS CLOSED"
  },
  {
    text:
      t.cancelled + " (" +
      counts.CANCELLED + ")",

    callback_data:
      "SUPPORT_ADMIN_REQUESTS CANCELLED"
  }
])

// ---------- NAVIGATION ----------
var navigation = []

if (page > 1) {
  navigation.push({
    text: t.previous,

    callback_data:
      "SUPPORT_ADMIN_REQUESTS " +
      filter +
      " PAGE=" +
      (page - 1)
  })
}

if (page < totalPages) {
  navigation.push({
    text: t.next,

    callback_data:
      "SUPPORT_ADMIN_REQUESTS " +
      filter +
      " PAGE=" +
      (page + 1)
  })
}

if (
  navigation.length > 0
) {
  buttons.push(navigation)
}

// ---------- REFRESH ----------
buttons.push([
  {
    text: t.refresh,

    callback_data:
      "SUPPORT_ADMIN_REQUESTS " +
      filter +
      " PAGE=" +
      page
  }
])

// ---------- SAME MESSAGE EDIT + DELETE FALLBACK ----------
function showRequests(
  messageText,
  inlineButtons
) {
  if (
    typeof request !== "undefined" &&
    request &&
    request.message &&
    request.message.message_id
  ) {
    try {
      Api.editMessageText({
        chat_id: uid,
        message_id:
          request.message.message_id,
        text: messageText,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard:
            inlineButtons
        }
      })

      return
    } catch (error) {
      try {
        Api.deleteMessage({
          chat_id: uid,
          message_id:
            request.message.message_id
        })
      } catch (deleteError) {}
    }
  }

  Api.sendMessage({
    chat_id: uid,
    text: messageText,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard:
        inlineButtons
    }
  })
}

// ---------- SHOW REQUESTS ----------
showRequests(
  text,
  buttons
)
