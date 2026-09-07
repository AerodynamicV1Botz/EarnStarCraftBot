/*CMD
  command: ADMIN_ENQUIRIES
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

// ==========================================
// 📋 GET ENQUIRY LIST
// ==========================================

var keys = Bot.getProperty("ENQUIRY_KEYS") || []

// ==========================================
// 📭 EMPTY STATE
// ==========================================

if (keys.length === 0) {

  Api.sendMessage({
    chat_id: uid,

    text:
      "📋 <b>ENQUIRIES</b>\n\n" +
      "No enquiries found yet.\n\n" +
      "New project enquiries will appear here automatically.",

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🔄 Refresh",
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
// 📋 ENQUIRY LIST
// ==========================================

var text =
  "📋 <b>RECENT ENQUIRIES</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n"

var buttons = []

var count = 0

// ==========================================
// 🔄 LOOP THROUGH ENQUIRIES
// ==========================================

for (
  var i = keys.length - 1;
  i >= 0 && count < 10;
  i--
) {

  var refId = keys[i]

  var enquiry = Bot.getProperty(
    "ENQUIRY_" + refId
  )

  if (!enquiry) {
    continue
  }

  // ========================================
  // 📊 STATUS
  // ========================================

  var status = enquiry.status || "new"

  var statusIcon = "🟡"

  if (status == "accepted") {
    statusIcon = "🟢"
  }

  if (status == "closed") {
    statusIcon = "🔴"
  }

  // ========================================
  // 📝 ENQUIRY TEXT
  // ========================================

  text +=
    statusIcon +
    " <b>" +
    (enquiry.name || "User") +
    "</b>\n" +

    "🆔 <code>" +
    refId +
    "</code>\n" +

    "📊 <b>" +
    status.toUpperCase() +
    "</b>\n\n"

  // ========================================
  // 👁 VIEW DETAILS BUTTON
  // ========================================

  buttons.push([
    {
      text: "👁 View " + refId,
      callback_data:
        "ADMIN_ENQUIRY " + refId
    }
  ])

  count++
}

// ==========================================
// 🔘 BOTTOM BUTTONS
// ==========================================
buttons.push([
  {
    text: "🔎 Search Enquiry",
    callback_data: "ADMIN_SEARCH_ENQUIRY"
  }
])

buttons.push([
  {
    text: "🔄 Refresh",
    callback_data: "ADMIN_ENQUIRIES"
  },
  {
    text: "👑 Admin Panel",
    callback_data: "ADMIN_PANEL"
  }
])

// ==========================================
// 📤 SEND ADMIN ENQUIRIES
// ==========================================

Api.sendMessage({
  chat_id: uid,

  text: text,

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: buttons
  }
})
