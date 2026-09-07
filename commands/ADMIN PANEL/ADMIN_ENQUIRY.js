/*CMD
  command: ADMIN_ENQUIRY
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
// 🆔 GET REFERENCE ID
// ==========================================

var refId = params

if (!refId) {
  Bot.sendMessage("⚠️ Reference ID not found.")
  return
}

// ==========================================
// 📋 GET ENQUIRY
// ==========================================

var enquiry = Bot.getProperty("ENQUIRY_" + refId)

if (!enquiry) {
  Bot.sendMessage("❌ Enquiry not found.")
  return
}

// ==========================================
// 📊 STATUS
// ==========================================

var status = enquiry.status || "new"

var statusIcon = "🟡"

if (status == "accepted") {
  statusIcon = "🟢"
}

if (status == "closed") {
  statusIcon = "🔴"
}

// ==========================================
// 📤 SEND DETAILS
// ==========================================

Api.sendMessage({
  chat_id: uid,

  text:
    "📋 <b>ENQUIRY DETAILS</b>\n\n" +
    "🆔 <b>Reference ID:</b>\n" +
    "<code>" +
    refId +
    "</code>\n\n" +
    "👤 <b>Name:</b>\n" +
    (enquiry.name || "Not provided") +
    "\n\n" +
    "📱 <b>Username:</b>\n" +
    (enquiry.contact || "Not provided") +
    "\n\n" +
    "📊 <b>Status:</b> " +
    statusIcon +
    " " +
    status.toUpperCase() +
    "\n\n" +
    "📝 <b>Requirements:</b>\n" +
    (enquiry.requirements || "Not provided") +
    "\n\n━━━━━━━━━━━━━━━━━━",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "✅ Accept",
          callback_data: "LEAD_ACCEPT " + refId
        },
        {
          text: "💬 Contact",
          callback_data: "LEAD_CONTACT " + refId
        }
      ],
      [
        {
          text: "📦 Create Order",
          callback_data: "CREATE_ORDER " + refId
        }
      ],

      [
        {
          text: "❌ Close",
          callback_data: "LEAD_CLOSE " + refId
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

