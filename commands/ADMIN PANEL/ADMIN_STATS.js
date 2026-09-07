/*CMD
  command: ADMIN_STATS
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

// ADMIN CHECK
if (String(uid) !== "7897324623") {
  return
}

// USERS
var users = Bot.getProperty("BroadcastUsers") || []
var totalUsers = users.length

// ENQUIRIES
var enquiryKeys = Bot.getProperty("ENQUIRY_KEYS") || []

var totalEnquiries = enquiryKeys.length
var newEnquiries = 0
var acceptedEnquiries = 0
var closedEnquiries = 0

for (var i = 0; i < enquiryKeys.length; i++) {

  var refId = enquiryKeys[i]
  var enquiry = Bot.getProperty("ENQUIRY_" + refId)

  if (!enquiry) {
    continue
  }

  var status = enquiry.status || "new"

  if (status == "new") {
    newEnquiries++
  }

  if (status == "accepted") {
    acceptedEnquiries++
  }

  if (status == "closed") {
    closedEnquiries++
  }
}

Api.sendMessage({
  text:
    "📊 <b>EARNSTAR BOTCRAFT — STATISTICS</b>\n\n" +

    "👥 <b>Users</b>\n" +
    "Total Users: <b>" + totalUsers + "</b>\n\n" +

    "📋 <b>Enquiries</b>\n" +
    "Total: <b>" + totalEnquiries + "</b>\n" +
    "🟡 New: <b>" + newEnquiries + "</b>\n" +
    "🟢 Accepted: <b>" + acceptedEnquiries + "</b>\n" +
    "🔴 Closed: <b>" + closedEnquiries + "</b>\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +
    "📈 <b>System Status:</b> 🟢 Online",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🔄 Refresh",
          callback_data: "ADMIN_STATS"
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
