/*CMD
  command: ADMIN_USER
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
  command: ADMIN_USER
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT — ADMIN_USER
// ADMIN → VIEW SINGLE USER DETAILS
// =====================================================

// =====================================================
// 👤 CURRENT ADMIN ID
// =====================================================

var uid = String(user.telegramid)

// =====================================================
// 🔐 HTML SAFE TEXT
// =====================================================

function safeText(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

// =====================================================
// 👑 ADMIN AUTHENTICATION
// =====================================================

var ownerId = "7897324623"
var isAdmin = uid === ownerId

// Optional permanent owner property
var configuredOwner = Bot.getProperty("OWNER_ID")

if (!isAdmin && configuredOwner && String(configuredOwner) === uid) {
  isAdmin = true
}

// Multi-admin list
var adminList = Bot.getProperty("EARNSTAR_ADMINS") || []

if (!Array.isArray(adminList)) {
  adminList = []
}

for (var a = 0; a < adminList.length; a++) {
  var adminItem = adminList[a]
  var adminId = ""

  if (typeof adminItem === "object" && adminItem !== null) {
    adminId =
      adminItem.id ||
      adminItem.telegramId ||
      adminItem.telegramid ||
      adminItem.userId ||
      ""
  } else {
    adminId = adminItem
  }

  if (String(adminId) === uid) {
    isAdmin = true
    break
  }
}

if (!isAdmin) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "🔒 <b>Admin Access Required</b>\n\n" +
      "⚠️ Yeh section sirf authorized admin ke liye available hai.",
    parse_mode: "HTML"
  })

  return
}

// =====================================================
// 🆔 GET TARGET USER ID
// =====================================================

var targetId = String(params || "").trim()

if (!targetId) {
  Api.sendMessage({
    chat_id: uid,
    text: "⚠️ User ID not found.",
    parse_mode: "HTML"
  })

  return
}

// =====================================================
// 👤 GET USER DATA
// =====================================================

var userData = Bot.getProperty("USER_" + targetId) || {}

// =====================================================
// 📊 USER DATA
// =====================================================

var name =
  userData.name ||
  userData.firstName ||
  userData.first_name ||
  userData.username ||
  "Not provided"

var username = userData.username || userData.userName || "Not provided"

var language = userData.language || "Not selected"

var joinedAt =
  userData.joinedAt ||
  userData.createdAt ||
  userData.registeredAt ||
  "Not available"

var enquiryRef = userData.enquiryRef || userData.latestEnquiryId || "No enquiry"

var blocked = userData.blocked === true

var blockText = blocked ? "🔓 Unblock User" : "🚫 Block User"

// =====================================================
// 📋 USER ENQUIRY COUNT
// =====================================================

var enquiryKeys = Bot.getProperty("BUILD_ENQUIRY_KEYS") || []

if (!Array.isArray(enquiryKeys)) {
  enquiryKeys = []
}

var userEnquiries = 0
var countedEnquiries = {}

for (var i = 0; i < enquiryKeys.length; i++) {
  var enquiryId = String(enquiryKeys[i] || "").trim()

  if (!enquiryId || countedEnquiries[enquiryId]) {
    continue
  }

  countedEnquiries[enquiryId] = true

  var enquiry = Bot.getProperty("BUILD_ENQUIRY_" + enquiryId)

  if (!enquiry) {
    continue
  }

  var enquiryUserId =
    enquiry.userId || enquiry.telegramId || enquiry.telegramid || ""

  if (String(enquiryUserId) === targetId) {
    userEnquiries++
  }
}

// =====================================================
// 📦 USER ORDER COUNT
// =====================================================

var orderKeys = Bot.getProperty("ORDER_KEYS") || []

if (!Array.isArray(orderKeys)) {
  orderKeys = []
}

var userOrders = 0
var countedOrders = {}

for (var j = 0; j < orderKeys.length; j++) {
  var orderId = String(orderKeys[j] || "").trim()

  if (!orderId || countedOrders[orderId]) {
    continue
  }

  countedOrders[orderId] = true

  var order = Bot.getProperty("ORDER_" + orderId)

  if (!order) {
    continue
  }

  var orderUserId = order.userId || order.telegramId || order.telegramid || ""

  if (String(orderUserId) === targetId) {
    userOrders++
  }
}

// =====================================================
// 👤 USER DETAILS TEXT
// =====================================================

var text =
  "👤 <b>USER DETAILS</b>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "👤 <b>Name:</b>\n" +
  safeText(name) +
  "\n\n" +
  "🆔 <b>User ID:</b>\n" +
  "<code>" +
  safeText(targetId) +
  "</code>\n\n" +
  "🔗 <b>Username:</b>\n" +
  safeText(username) +
  "\n\n" +
  "🌐 <b>Language:</b>\n" +
  safeText(language) +
  "\n\n" +
  "📅 <b>Joined:</b>\n" +
  safeText(joinedAt) +
  "\n\n" +
  "📋 <b>Latest Enquiry:</b>\n" +
  "<code>" +
  safeText(enquiryRef) +
  "</code>\n\n" +
  "📊 <b>Total Enquiries:</b> " +
  userEnquiries +
  "\n" +
  "📦 <b>Total Orders:</b> " +
  userOrders +
  "\n\n" +
  "🛡️ <b>Access:</b> " +
  (blocked ? "🚫 Blocked" : "🟢 Active") +
  "\n\n━━━━━━━━━━━━━━━━━━"

// =====================================================
// 🔘 BUTTONS
// =====================================================

var buttons = [
  [
    {
      text: "💬 Contact User",
      url: "tg://user?id=" + targetId
    }
  ],
  [
    {
      text: "📞 Contact Details",
      callback_data: "ADMIN_USER_CONTACTS " + targetId
    }
  ],
  [
    {
      text: blockText,
      callback_data: "ADMIN_TOGGLE_BLOCK " + targetId
    }
  ],

  [
    {
      text: "📋 View Enquiries",
      callback_data: "ADMIN_USER_ENQUIRIES " + targetId
    }
  ],

  [
    {
      text: "📦 View Orders",
      callback_data: "ADMIN_USER_ORDERS " + targetId
    }
  ],

  [
    {
      text: "🔄 Refresh",
      callback_data: "ADMIN_USER " + targetId
    }
  ],

  [
    {
      text: "👥 Users",
      callback_data: "ADMIN_USERS"
    },
    {
      text: "📋 Enquiries",
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

// =====================================================
// 📩 SEND USER DETAILS
// =====================================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
})

