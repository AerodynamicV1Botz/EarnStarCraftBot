/*CMD
  command: ADMIN_PANEL
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

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 228 — UPDATED VERSION
// COMMAND NAME: ADMIN_PANEL
// STEP 9 — ADMIN CONTROL CENTER
// 📁 Multi-Admin + Dashboard
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var ownerId = "7897324623"

// ==========================================
// 👑 MULTI-ADMIN ACCESS CHECK
// ==========================================

var adminList = Bot.getProperty("EARNSTAR_ADMINS") || []

if (!Array.isArray(adminList)) {
  adminList = []
}

var isOwner = String(uid) === ownerId
var isAdmin = false

for (var a = 0; a < adminList.length; a++) {
  if (String(adminList[a].id) === String(uid)) {
    isAdmin = true
    break
  }
}

if (!isOwner && !isAdmin) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "🔒 <b>Admin Access Required</b>\n\n" +
      "⚠️ Yeh section sirf authorized admins ke liye available hai.\n\n" +
      "🏠 Main Menu se available services use karein.",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🏠 Main Menu",
            callback_data: "BACK_MAIN_MENU"
          }
        ]
      ]
    }
  })

  return
}

// ==========================================
// 📊 USER COUNT
// ==========================================

var users = Bot.getProperty("BroadcastUsers") || []

if (!Array.isArray(users)) {
  users = []
}

var totalUsers = users.length

// ==========================================
// 📋 ENQUIRY COUNT
// ==========================================

var enquiryKeys = Bot.getProperty("ENQUIRY_KEYS") || []

if (!Array.isArray(enquiryKeys)) {
  enquiryKeys = []
}

var totalEnquiries = 0
var newEnquiries = 0
var acceptedEnquiries = 0
var closedEnquiries = 0

for (var i = 0; i < enquiryKeys.length; i++) {
  var enquiry = Bot.getProperty("ENQUIRY_" + enquiryKeys[i])

  if (!enquiry) continue

  totalEnquiries++

  var enquiryStatus = enquiry.status || "new"

  if (enquiryStatus === "new") {
    newEnquiries++
  }

  if (enquiryStatus === "accepted") {
    acceptedEnquiries++
  }

  if (enquiryStatus === "closed") {
    closedEnquiries++
  }
}

// ==========================================
// 📦 ORDER COUNT
// ==========================================

var orderKeys = Bot.getProperty("ORDER_KEYS") || []

if (!Array.isArray(orderKeys)) {
  orderKeys = []
}

var totalOrders = 0
var pendingOrders = 0
var activeOrders = 0
var completedOrders = 0
var cancelledOrders = 0

for (var j = 0; j < orderKeys.length; j++) {
  var order = Bot.getProperty("ORDER_" + orderKeys[j])

  if (!order) continue

  totalOrders++

  var orderStatus = order.status || "pending"

  if (orderStatus === "pending") {
    pendingOrders++
  }

  if (orderStatus === "active") {
    activeOrders++
  }

  if (orderStatus === "completed") {
    completedOrders++
  }

  if (orderStatus === "cancelled") {
    cancelledOrders++
  }
}

// ==========================================
// 👑 ADMIN COUNT
// ==========================================

var totalAdmins = adminList.length + 1

// ==========================================
// 👑 ADMIN DASHBOARD
// ==========================================

var text =
  "👑 <b>EARNSTAR BOTCRAFT</b>\n" +
  "🛠️ <b>ADMIN CONTROL CENTER</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "👤 <b>Admin:</b> " +
  (user.first_name || "Administrator") +
  "\n" +
  "🆔 <b>Admin ID:</b> " +
  uid +
  "\n" +
  "🛡️ <b>Role:</b> " +
  (isOwner ? "👑 Owner" : "🔐 Admin") +
  "\n\n" +
  "📊 <b>Dashboard Overview</b>\n\n" +
  "👥 <b>Users:</b> " +
  totalUsers +
  "\n\n" +
  "📋 <b>Enquiries:</b> " +
  totalEnquiries +
  "\n" +
  "🟡 New: " +
  newEnquiries +
  "\n" +
  "🟢 Accepted: " +
  acceptedEnquiries +
  "\n" +
  "🔴 Closed: " +
  closedEnquiries +
  "\n\n" +
  "📦 <b>Orders:</b> " +
  totalOrders +
  "\n" +
  "🟡 Pending: " +
  pendingOrders +
  "\n" +
  "🔵 Active: " +
  activeOrders +
  "\n" +
  "🟢 Completed: " +
  completedOrders +
  "\n" +
  "🔴 Cancelled: " +
  cancelledOrders +
  "\n\n" +
  "👑 <b>Total Admins:</b> " +
  totalAdmins +
  "\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "⚡ <b>Quick Actions</b>\n" +
  "Select an option below:"

// ==========================================
// 🔘 ADMIN BUTTONS
// ==========================================

var buttons = [
  [
    {
      text: "📦 Orders (" + totalOrders + ")",
      callback_data: "ADMIN_ORDERS"
    },
    {
      text: "📢 Broadcast",
      callback_data: "ADMIN_BROADCAST"
    }
  ],
  [
    {
      text: "📋 Enquiries (" + totalEnquiries + ")",
      callback_data: "ADMIN_ENQUIRIES"
    },
    {
      text: "📊 Statistics",
      callback_data: "ADMIN_STATS"
    }
  ],
  [
    {
      text: "👥 Users (" + totalUsers + ")",
      callback_data: "ADMIN_USERS"
    },
    {
      text: "⚙️ Settings",
      callback_data: "ADMIN_SETTINGS"
    }
  ],
  [
    {
      text: "👑 Multi-Admin (" + totalAdmins + ")",
      callback_data: "ADMIN_MANAGEMENT"
    }
  ],
  [
    {
      text: "🔄 Refresh Dashboard",
      callback_data: "ADMIN_PANEL"
    }
  ],
  [
    {
      text: "🏠 Main Menu",
      callback_data: "BACK_MAIN_MENU"
    }
  ]
]

// ==========================================
// 📩 SAME MESSAGE EDIT + DELETE FALLBACK
// ==========================================

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

// ==========================================
// 📤 SEND NEW MESSAGE
// ==========================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
})
