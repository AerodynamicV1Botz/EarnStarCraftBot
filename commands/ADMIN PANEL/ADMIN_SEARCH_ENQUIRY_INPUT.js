/*CMD
  command: ADMIN_SEARCH_ENQUIRY_INPUT
  help: 
  need_reply: false
  auto_retry_time: 
  folder: ADMIN PANEL

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var uid = user.telegramid

// ==========================================
// 👑 ADMIN CHECK
// ==========================================

if (String(uid) !== "7897324623") {
  return
}

var query = message

if (!query) {
  Bot.sendMessage("⚠️ Please enter a search value.")
  return
}

query = String(query).toLowerCase().trim()

// ==========================================
// 📋 GET ENQUIRIES
// ==========================================

var keys = Bot.getProperty("ENQUIRY_KEYS") || []

var results = []

// ==========================================
// 🔎 SEARCH
// ==========================================

for (var i = keys.length - 1; i >= 0; i--) {

  var refId = keys[i]

  var enquiry = Bot.getProperty(
    "ENQUIRY_" + refId
  )

  if (!enquiry) {
    continue
  }

  var name =
    String(enquiry.name || "").toLowerCase()

  var contact =
    String(enquiry.contact || "").toLowerCase()

  var reference =
    String(refId || "").toLowerCase()

  if (
    name.indexOf(query) !== -1 ||
    contact.indexOf(query) !== -1 ||
    reference.indexOf(query) !== -1
  ) {
    results.push({
      refId: refId,
      enquiry: enquiry
    })
  }

  if (results.length >= 10) {
    break
  }
}

// ==========================================
// ❌ NO RESULTS
// ==========================================

if (results.length === 0) {

  Api.sendMessage({
    chat_id: uid,

    text:
      "🔎 <b>SEARCH RESULT</b>\n\n" +
      "❌ No enquiry found for:\n" +
      "<code>" + query + "</code>",

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🔎 Search Again",
            callback_data: "ADMIN_SEARCH_ENQUIRY"
          }
        ],
        [
          {
            text: "📋 All Enquiries",
            callback_data: "ADMIN_ENQUIRIES"
          }
        ],
        [
          {
            text: "👑 Admin Panel",
            callback_data: "ADMIN_PANEL"
          }
        ]
      ]
    }
  })

  return
}

// ==========================================
// 📋 RESULTS
// ==========================================

var text =
  "🔎 <b>SEARCH RESULTS</b>\n\n" +
  "Found: <b>" + results.length + "</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n"

var buttons = []

for (var j = 0; j < results.length; j++) {

  var item = results[j]

  var enquiry = item.enquiry

  var status = enquiry.status || "new"

  var statusIcon = "🟡"

  if (status == "accepted") {
    statusIcon = "🟢"
  }

  if (status == "closed") {
    statusIcon = "🔴"
  }

  text +=
    statusIcon +
    " <b>" +
    (enquiry.name || "User") +
    "</b>\n" +

    "🆔 <code>" +
    item.refId +
    "</code>\n" +

    "📊 " +
    status.toUpperCase() +
    "\n\n"

  buttons.push([
    {
      text: "👁 View " + item.refId,
      callback_data:
        "ADMIN_ENQUIRY " + item.refId
    }
  ])
}

// ==========================================
// 🔘 NAVIGATION
// ==========================================

buttons.push([
  {
    text: "🔎 Search Again",
    callback_data: "ADMIN_SEARCH_ENQUIRY"
  }
])

buttons.push([
  {
    text: "📋 All Enquiries",
    callback_data: "ADMIN_ENQUIRIES"
  },
  {
    text: "👑 Admin Panel",
    callback_data: "ADMIN_PANEL"
  }
])

// ==========================================
// 📤 SEND RESULTS
// ==========================================

Api.sendMessage({
  chat_id: uid,

  text: text,

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: buttons
  }
})
