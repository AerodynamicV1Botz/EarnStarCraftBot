/*CMD
  command: ORDER_REQUEST_TEXT
  help: 
  need_reply: true
  auto_retry_time: 
  folder: PRICING

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 16
// COMMAND NAME: ORDER_REQUEST_TEXT
// STEP 4.1.2 — UNIVERSAL ORDER REQUEST CREATE
// ==========================================

/*CMD
  command: ORDER_REQUEST_TEXT
  need_reply: true
  folder: ORDERS
*/

// ==========================================
// 👤 USER DATA
// ==========================================

var uid = String(user.telegramid)

var userData = Bot.getProperty(
  "USER_" + uid
) || {}

var language = userData.language || "hinglish"

// ==========================================
// 🛡️ HTML ESCAPE
// ==========================================

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

// ==========================================
// 📝 READ USER MESSAGE
// ==========================================

var requirementText = ""

// Main Telegram message
if (
  typeof message !== "undefined" &&
  message &&
  typeof message.text !== "undefined"
) {
  requirementText = String(message.text).trim()
}

// Fallback: message itself may be text
if (
  !requirementText &&
  typeof message !== "undefined" &&
  typeof message === "string"
) {
  requirementText = String(message).trim()
}

// Fallback: request message
if (
  !requirementText &&
  typeof request !== "undefined" &&
  request &&
  request.message &&
  request.message.text
) {
  requirementText = String(
    request.message.text
  ).trim()
}

// Fallback: request text
if (
  !requirementText &&
  typeof request !== "undefined" &&
  request &&
  request.text
) {
  requirementText = String(
    request.text
  ).trim()
}

// ==========================================
// ❌ EMPTY MESSAGE
// ==========================================

if (!requirementText) {

  var emptyText = ""

  if (language === "english") {

    emptyText =
      "❌ Please send your requirements in a text message."

  } else if (language === "gujarati") {

    emptyText =
      "❌ કૃપા કરીને તમારી requirements text message માં મોકલો."

  } else {

    emptyText =
      "❌ Please apni requirements text message mein bhejo."
  }

  Api.sendMessage({
    chat_id: uid,
    text: emptyText
  })

  return
}

// ==========================================
// 📦 GET SELECTED PACKAGE
// ==========================================

var packageData = Bot.getProperty(
  "ORDER_PACKAGE_" + uid
) || {}

var packageType = String(
  packageData.type || "starter"
)

var packageName = String(
  packageData.packageName ||
  (
    packageType === "business"
      ? "Business Package"
      : "Starter Package"
  )
)

// ==========================================
// 🆔 GENERATE ORDER ID
// ==========================================

var orderId =
  "ORD" +
  String(Date.now()).slice(-8)

// ==========================================
// 👤 USER INFORMATION
// ==========================================

var fullName =
  String(user.first_name || "") +
  (
    user.last_name
      ? " " + String(user.last_name)
      : ""
  )

if (!fullName.trim()) {
  fullName = "Telegram User"
}

var username = ""

if (user.username) {
  username = String(user.username)
}

// ==========================================
// 🕒 TIME
// ==========================================

var createdAt = new Date().toISOString()

// ==========================================
// 📦 UNIVERSAL ORDER RECORD
// ==========================================

var order = {

  orderId: orderId,
  userId: uid,

  userName: fullName,
  username: username,

  type: packageType,
  packageName: packageName,

  requirements: requirementText,

  status: "pending",

  totalPrice: 0,
  advanceAmount: 0,
  remainingAmount: 0,

  advanceStatus: "not_required",
  finalPaymentStatus: "not_required",

  projectStatus: "not_started",

  cancelAllowed: true,

  createdAt: createdAt,

  acceptedAt: null,
  rejectedAt: null,
  cancelledAt: null,

  advancePaidAt: null,
  projectStartedAt: null,
  completedAt: null,
  finalPaidAt: null,

  acceptedBy: null,
  rejectedBy: null,

  actionHistory: [
    {
      action: "created",
      by: uid,
      at: createdAt
    }
  ]
}

// ==========================================
// 💾 SAVE ORDER
// ==========================================

Bot.setProperty(
  "ORDER_" + orderId,
  order,
  "json"
)

// ==========================================
// 📚 SAVE GLOBAL ORDER KEY
// ==========================================

var orderKeys = Bot.getProperty(
  "ORDER_KEYS"
) || []

if (!Array.isArray(orderKeys)) {
  orderKeys = []
}

if (orderKeys.indexOf(orderId) === -1) {

  orderKeys.push(orderId)

  Bot.setProperty(
    "ORDER_KEYS",
    orderKeys,
    "json"
  )
}

// ==========================================
// 👤 SAVE USER ORDER KEY
// ==========================================

var userOrderKeys = Bot.getProperty(
  "USER_ORDER_KEYS_" + uid
) || []

if (!Array.isArray(userOrderKeys)) {
  userOrderKeys = []
}

if (userOrderKeys.indexOf(orderId) === -1) {

  userOrderKeys.push(orderId)

  Bot.setProperty(
    "USER_ORDER_KEYS_" + uid,
    userOrderKeys,
    "json"
  )
}

// ==========================================
// 🧹 CLEAR ORDER MODE
// ==========================================

Bot.setProperty(
  "ORDER_MODE_" + uid,
  "idle",
  "string"
)

Bot.setProperty(
  "ORDER_PACKAGE_" + uid,
  {},
  "json"
)

// ==========================================
// 👤 USER CONFIRMATION
// ==========================================

var userText = ""

if (language === "english") {

  userText =
    "✅ <b>ORDER REQUEST SUBMITTED</b>\n\n" +
    "📦 Package: <b>" +
    escapeHtml(packageName) +
    "</b>\n" +
    "🆔 Order ID: <code>" +
    orderId +
    "</code>\n\n" +
    "📌 Status: <b>Pending Review</b>\n\n" +
    "Our admin will review your request and contact you with the price and next steps."

} else if (language === "gujarati") {

  userText =
    "✅ <b>ઓર્ડર રિક્વેસ્ટ સબમિટ થઈ ગઈ</b>\n\n" +
    "📦 પેકેજ: <b>" +
    escapeHtml(packageName) +
    "</b>\n" +
    "🆔 Order ID: <code>" +
    orderId +
    "</code>\n\n" +
    "📌 સ્ટેટસ: <b>Pending Review</b>\n\n" +
    "અમારી admin team તમારી request review કરીને price અને next steps માટે contact કરશે."

} else {

  userText =
    "✅ <b>ORDER REQUEST SUBMIT HO GAYI</b>\n\n" +
    "📦 Package: <b>" +
    escapeHtml(packageName) +
    "</b>\n" +
    "🆔 Order ID: <code>" +
    orderId +
    "</code>\n\n" +
    "📌 Status: <b>Pending Review</b>\n\n" +
    "Admin aapki request review karke price aur next steps ke liye contact karega."
}

// ==========================================
// 📤 SEND USER CONFIRMATION
// ==========================================

Api.sendMessage({
  chat_id: uid,
  text: userText,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📦 My Orders",
          callback_data: "MY_ORDERS"
        }
      ],
      [
        {
          text: "🏠 Main Menu",
          callback_data: "BACK_MAIN_MENU"
        }
      ]
    ]
  }
})

// ==========================================
// 👑 ADMIN CONFIGURATION
// ==========================================

var ownerId = "7897324623"

var staffAdmins =
  Bot.getProperty("STAFF_ADMINS") || []

var adminIds = [ownerId]

if (Array.isArray(staffAdmins)) {

  for (var i = 0; i < staffAdmins.length; i++) {

    var staffId = String(
      staffAdmins[i]
    )

    if (adminIds.indexOf(staffId) === -1) {
      adminIds.push(staffId)
    }
  }
}

// ==========================================
// 📨 ADMIN MESSAGE
// ==========================================

var adminText =
  "📦 <b>NEW ORDER REQUEST</b>\n\n" +

  "🆔 Order ID: <code>" +
  orderId +
  "</code>\n" +

  "📦 Package: <b>" +
  escapeHtml(packageName) +
  "</b>\n" +

  "📌 Status: <b>Pending</b>\n\n" +

  "👤 User: <a href='tg://user?id=" +
  uid +
  "'>" +
  escapeHtml(fullName) +
  "</a>\n" +

  "🆔 User ID: <code>" +
  uid +
  "</code>\n" +

  (
    username
      ? "🔗 Username: @" +
        escapeHtml(username) +
        "\n"
      : ""
  ) +

  "\n📝 <b>Requirements:</b>\n" +
  escapeHtml(requirementText)

var adminKeyboard = {
  inline_keyboard: [
    [
      {
        text: "👁️ View Order",
        callback_data:
          "ADMIN_ORDER_VIEW " + orderId
      }
    ],
    [
      {
        text: "📦 All Orders",
        callback_data: "ADMIN_ORDERS"
      }
    ]
  ]
}

// ==========================================
// 📤 SEND ADMIN NOTIFICATION
// ==========================================

for (var j = 0; j < adminIds.length; j++) {

  try {

    Api.sendMessage({
      chat_id: adminIds[j],
      text: adminText,
      parse_mode: "HTML",
      reply_markup: adminKeyboard
    })

  } catch (error) {}
}

// ==========================================
// 🧾 SAVE LAST ORDER
// ==========================================

Bot.setProperty(
  "LAST_ORDER_ID",
  orderId,
  "string"
)
