/*CMD
  command: ORDER_SUBMIT
  help: 
  need_reply: false
  auto_retry_time: 
  folder: PRICING

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/*CMD
  command: ORDER_SUBMIT
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// ORDER_SUBMIT
//
// CONNECTED COMMANDS:
//
// DIRECT:
// ORDER_CONTACT_MENU
//       ↓
// ORDER_SUBMIT starter/business/pro
//
// CUSTOM BUILD:
// BUILD_USER_AGREE
//       ↓
// ORDER_SUBMIT ES-xxxx
//
// ADMIN NOTIFICATION:
// ADMIN_ACCEPT <orderId>
// ADMIN_REJECT <orderId>
// ADMIN_VIEW_ORDER <orderId>
// ADMIN_CONTACT <orderId>
// ADMIN_PANEL
// =====================================================

// =====================================================
// 1. CALLBACK HELPER
// =====================================================

function answerCallback(text, showAlert) {
  try {
    if (typeof request !== "undefined" && request && request.id) {
      Api.answerCallbackQuery({
        callback_query_id: request.id,
        text: String(text || ""),
        show_alert: showAlert === true
      })
    }
  } catch (error) {}
}

// =====================================================
// 2. HTML SAFE TEXT
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
// 3. OBJECT NORMALIZER
// =====================================================

function objectOrEmpty(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {}
  }

  return value
}

// =====================================================
// 4. BASIC USER DATA
// =====================================================

var uid = String(user.telegramid)

var fullName =
  String(user.first_name || "") +
  (user.last_name ? " " + String(user.last_name) : "")

fullName = fullName.trim()

if (!fullName) {
  fullName = "Telegram User"
}

var username = user.username ? "@" + String(user.username) : "Not provided"

var clientMention =
  '<a href="tg://user?id=' + safeText(uid) + '">' + safeText(fullName) + "</a>"

var paramsText = String(params || "").trim()

if (!paramsText) {
  answerCallback("Order details missing.", true)
  return
}

// =====================================================
// 3. IDENTIFY ORDER TYPE
// DIRECT PACKAGE + BUILD ENQUIRY
// Supports ES-xxxx and BE-xxxx enquiry IDs
// =====================================================

var isBuildOrder = false
var enquiryId = ""
var packageType = ""
var packageName = ""
var price = ""

var possibleBuildEnquiry = Bot.getProperty("BUILD_ENQUIRY_" + paramsText)

// =====================================================
// BUILD ENQUIRY DETECTION
// =====================================================

if (
  /^(ES|BE)-/i.test(paramsText) ||
  (possibleBuildEnquiry &&
    typeof possibleBuildEnquiry === "object" &&
    !Array.isArray(possibleBuildEnquiry))
) {
  isBuildOrder = true
  enquiryId = paramsText
}

// =====================================================
// DIRECT PACKAGE DETECTION
// =====================================================
else {
  packageType = paramsText.toLowerCase().trim()

  if (
    packageType !== "starter" &&
    packageType !== "business" &&
    packageType !== "pro"
  ) {
    answerCallback("Invalid package selected.", true)
    return
  }
}

// =====================================================
// 6. LOAD SOURCE DATA
// =====================================================

var enquiry = {}
var buildDraft = {}
var directDraft = {}

if (isBuildOrder) {
  enquiry = objectOrEmpty(Bot.getProperty("BUILD_ENQUIRY_" + enquiryId))

  buildDraft = objectOrEmpty(Bot.getProperty("BUILD_ORDER_DRAFT_" + uid))

  var enquiryOwnerId = String(
    enquiry.userId ||
      Bot.getProperty("BUILD_ENQUIRY_USER_" + enquiryId) ||
      buildDraft.userId ||
      ""
  ).trim()

  if (!enquiryOwnerId || enquiryOwnerId !== uid) {
    answerCallback("This enquiry does not belong to you.", true)
    return
  }

  if (enquiry.convertedOrderId && String(enquiry.convertedOrderId).trim()) {
    answerCallback("This enquiry is already converted into an order.", true)
    return
  }

  if (enquiry.orderId && String(enquiry.orderId).trim()) {
    answerCallback("This enquiry already has an order.", true)
    return
  }

  packageType = "custom"

  packageName =
    enquiry.packageName ||
    buildDraft.packageName ||
    enquiry.serviceName ||
    "Custom Bot Build"

  price =
    enquiry.price || enquiry.totalPrice || buildDraft.price || "To be decided"
} else {
  directDraft = objectOrEmpty(Bot.getProperty("ORDER_" + uid))

  if (directDraft.orderId && String(directDraft.orderId).trim()) {
    answerCallback("Your order is already submitted.", true)
    return
  }

  packageName =
    directDraft.packageName ||
    directDraft.package ||
    directDraft.selectedPackage ||
    ""

  if (!packageName) {
    if (packageType === "starter") {
      packageName = "Starter Bot"
    } else if (packageType === "business") {
      packageName = "Business Bot"
    } else {
      packageName = "Pro Bot"
    }
  }

  price =
    directDraft.price ||
    directDraft.packagePrice ||
    directDraft.amount ||
    "To be discussed"
}

// =====================================================
// 7. MERGE CORRECT SOURCE DATA
// =====================================================

var sourceData = {}

if (isBuildOrder) {
  sourceData = {}

  for (var ek in enquiry) {
    sourceData[ek] = enquiry[ek]
  }

  for (var bk in buildDraft) {
    if (
      sourceData[bk] === undefined ||
      sourceData[bk] === null ||
      sourceData[bk] === ""
    ) {
      sourceData[bk] = buildDraft[bk]
    }
  }
} else {
  sourceData = directDraft
}

// =====================================================
// 8. CONTACT DATA
// =====================================================

var contacts = objectOrEmpty(sourceData.contacts)

var savedContacts = objectOrEmpty(Bot.getProperty("USER_CONTACTS_" + uid))

var contactFields = [
  "telegram",
  "otherNumber",
  "instagram",
  "whatsapp",
  "email"
]

for (var ci = 0; ci < contactFields.length; ci++) {
  var contactField = contactFields[ci]

  contacts[contactField] = String(
    contacts[contactField] || savedContacts[contactField] || ""
  ).trim()
}

function contactValue(field) {
  return safeText(contacts[field] || "Not provided")
}

var contactBlock =
  "<b>📞 Contact Details</b>\n\n" +
  "Telegram: " +
  contactValue("telegram") +
  "\n" +
  "Other Number: " +
  contactValue("otherNumber") +
  "\n" +
  "Instagram: " +
  contactValue("instagram") +
  "\n" +
  "WhatsApp: " +
  contactValue("whatsapp") +
  "\n" +
  "Email: " +
  contactValue("email")

// =====================================================
// 9. REQUIREMENTS
// =====================================================

var originalRequirements = ""
var finalRequirements = ""
var requirements = ""

if (isBuildOrder) {
  originalRequirements = String(
    enquiry.userRequirements ||
      enquiry.originalRequirements ||
      buildDraft.originalRequirements ||
      buildDraft.userRequirements ||
      ""
  ).trim()

  finalRequirements = String(
    enquiry.adminFinalRequirements ||
      enquiry.finalRequirements ||
      buildDraft.finalRequirements ||
      ""
  ).trim()

  requirements = finalRequirements || originalRequirements
} else {
  requirements = String(
    sourceData.requirements ||
      sourceData.requirement ||
      sourceData.details ||
      ""
  ).trim()
}

// =====================================================
// 10. OTHER ORDER DATA
// =====================================================

var clientInfo = String(
  sourceData.clientInfo || sourceData.clientName || fullName
)

var budget = String(sourceData.budget || sourceData.priceRange || "")

var extraDetails = String(
  sourceData.extraDetails || sourceData.extra || sourceData.note || ""
)

var telegramProfile = String(sourceData.telegramProfile || username)

var now = new Date().toISOString()

// =====================================================
// 11. DUPLICATE CHECK
// =====================================================

var orderKeys = Bot.getProperty("ORDER_KEYS") || []

if (!Array.isArray(orderKeys)) {
  orderKeys = []
}

for (var di = 0; di < orderKeys.length; di++) {
  var oldOrderId = String(orderKeys[di])

  var oldOrder = objectOrEmpty(Bot.getProperty("ORDER_" + oldOrderId))

  if (String(oldOrder.userId || "") !== uid) {
    continue
  }

  if (
    String(oldOrder.requestStatus || "") === "rejected" ||
    String(oldOrder.orderStatus || "") === "completed"
  ) {
    continue
  }

  if (isBuildOrder && String(oldOrder.enquiryId || "") === enquiryId) {
    answerCallback("This enquiry is already converted into an order.", true)
    return
  }

  if (
    !isBuildOrder &&
    String(oldOrder.packageType || "") === packageType &&
    String(oldOrder.requestStatus || "") !== "rejected"
  ) {
    answerCallback("You already have a pending order for this package.", true)
    return
  }
}

// =====================================================
// 12. GENERATE ORDER ID
// =====================================================

var orderId = "ESO-" + new Date().getTime() + "-" + uid.slice(-4)

// =====================================================
// 13. FINAL ORDER OBJECT
// =====================================================

var finalOrder = {
  orderId: orderId,

  userId: uid,
  clientName: fullName,
  clientInfo: clientInfo,
  username: username,
  telegramProfile: telegramProfile,

  orderType: isBuildOrder ? "custom_build" : "package",

  packageType: packageType,
  packageName: packageName,
  price: price,

  enquiryId: isBuildOrder ? enquiryId : "",

  contacts: contacts,

  requirements: requirements,

  originalRequirements: isBuildOrder ? originalRequirements : "",

  finalRequirements: isBuildOrder ? finalRequirements : "",

  budget: budget,
  extraDetails: extraDetails,

  advanceAmount: "",
  remainingAmount: "",

  requestStatus: "pending",
  orderStatus: "pending",
  paymentStatus: "not_paid",

  stage: "admin_review",

  progress: 0,
  progressTitle: "Order Received",
  progressUpdate: "Your order is waiting for admin review.",

  adminId: "",
  adminNote: "",

  createdAt: now,
  updatedAt: now
}

// =====================================================
// 14. SAVE FINAL ORDER
// =====================================================

Bot.setProperty("ORDER_" + orderId, finalOrder, "json")

Bot.setProperty("ORDER_USER_" + orderId, uid, "string")

Bot.setProperty("ORDER_HISTORY_" + orderId, [finalOrder], "json")

if (orderKeys.indexOf(orderId) === -1) {
  orderKeys.push(orderId)
}

Bot.setProperty("ORDER_KEYS", orderKeys, "json")

// =====================================================
// 15. DIRECT PACKAGE REFERENCE
// =====================================================

if (!isBuildOrder) {
  Bot.setProperty(
    "DIRECT_ORDER_" + packageType.toUpperCase() + "_" + uid,
    orderId,
    "string"
  )
}

// =====================================================
// 16. UPDATE SOURCE
// =====================================================

if (isBuildOrder) {
  enquiry.orderId = orderId
  enquiry.convertedOrderId = orderId
  enquiry.convertedAt = now
  enquiry.orderStatus = "submitted"
  enquiry.requestStatus = "pending"
  enquiry.stage = "admin_review"
  enquiry.updatedAt = now

  Bot.setProperty("BUILD_ENQUIRY_" + enquiryId, enquiry, "json")

  buildDraft.orderId = orderId
  buildDraft.requestStatus = "pending"
  buildDraft.orderStatus = "submitted"
  buildDraft.updatedAt = now

  Bot.setProperty("BUILD_ORDER_DRAFT_" + uid, buildDraft, "json")
} else {
  directDraft.orderId = orderId
  directDraft.requestStatus = "pending"
  directDraft.orderStatus = "submitted"
  directDraft.updatedAt = now

  Bot.setProperty("ORDER_" + uid, directDraft, "json")
}

// =====================================================
// 17. ADMIN IDS
// =====================================================

var adminIds = ["7897324623"]

var configuredAdmins = Bot.getProperty("EARNSTAR_ADMINS")

if (Array.isArray(configuredAdmins)) {
  for (var ai = 0; ai < configuredAdmins.length; ai++) {
    var adminItem = configuredAdmins[ai]
    var adminId = ""

    if (typeof adminItem === "object" && adminItem !== null) {
      adminId = adminItem.id || adminItem.telegramId || adminItem.userId || ""
    } else {
      adminId = adminItem
    }

    adminId = String(adminId || "").trim()

    if (adminId && adminIds.indexOf(adminId) === -1) {
      adminIds.push(adminId)
    }
  }
}

// =====================================================
// 18. ADMIN MESSAGE
// =====================================================

var adminMessage = ""

if (isBuildOrder) {
  adminMessage =
    "<b>🔔 NEW CUSTOM BUILD ORDER</b>\n\n" +
    "<b>📦 Package Details</b>\n" +
    safeText(packageName) +
    "\n\n" +
    "<b>🆔 Previous Enquiry ID:</b> <code>" +
    safeText(enquiryId) +
    "</code>\n" +
    "<b>🆔 New Order ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n\n" +
    "<b>📋 Original User Requirements</b>\n" +
    safeText(originalRequirements || "Not provided") +
    "\n\n" +
    "<b>🛠️ Final Admin Requirements</b>\n" +
    safeText(finalRequirements || "Not provided") +
    "\n\n"
} else {
  adminMessage =
    "<b>🔔 NEW PACKAGE ORDER</b>\n\n" +
    "<b>📦 Package Details</b>\n" +
    safeText(packageName) +
    "\n\n" +
    "<b>🆔 Order ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n\n"
}

adminMessage +=
  "<b>👤 Client Details</b>\n" +
  "Client Name: " +
  clientMention +
  "\n" +
  "Username: " +
  safeText(username) +
  "\n" +
  "User ID: <code>" +
  safeText(uid) +
  "</code>\n\n" +
  contactBlock +
  "\n\n"

if (!isBuildOrder) {
  adminMessage +=
    "<b>📋 Requirements</b>\n" +
    safeText(requirements || "Not provided") +
    "\n\n"
}

adminMessage +=
  "<b>📌 Status:</b> Pending Admin Review\n" +
  "<b>📊 Progress:</b> 0%\n\n" +
  "⏳ Please review this package order."

// =====================================================
// 19. ADMIN BUTTONS
// =====================================================

var adminKeyboard = {
  inline_keyboard: [
    [
      {
        text: "✅ Accept Order",
        callback_data: "ADMIN_ACCEPT " + orderId
      },
      {
        text: "❌ Reject Order",
        callback_data: "ADMIN_REJECT " + orderId
      }
    ],
    [
      {
        text: "💬 Contact User",
        callback_data: "ADMIN_CONTACT " + orderId
      },
      {
        text: "👁 View Order",
        callback_data: "ADMIN_VIEW_ORDER " + orderId
      }
    ],
    [
      {
        text: "⚙️ Admin Panel",
        callback_data: "ADMIN_PANEL"
      }
    ]
  ]
}

// =====================================================
// 20. SEND ADMIN NOTIFICATION
// =====================================================

for (var ni = 0; ni < adminIds.length; ni++) {
  var targetAdminId = String(adminIds[ni])

  try {
    Api.sendMessage({
      chat_id: targetAdminId,
      text: adminMessage,
      parse_mode: "HTML",
      disable_web_page_preview: true,
      reply_markup: adminKeyboard
    })

    Bot.setProperty(
      "ADMIN_NOTIFY_SENT_" + orderId + "_" + targetAdminId,
      "yes",
      "string"
    )
  } catch (adminError) {
    Bot.setProperty(
      "ADMIN_NOTIFY_ERROR_" + orderId + "_" + targetAdminId,
      String(adminError),
      "string"
    )
  }
}

// =====================================================
// 21. USER CONFIRMATION
// =====================================================

var userConfirmation = ""

if (isBuildOrder) {
  userConfirmation =
    "<b>✅ Order Submitted Successfully</b>\n\n" +
    "<b>🆔 Enquiry ID:</b> <code>" +
    safeText(enquiryId) +
    "</code>\n" +
    "<b>🆔 Order ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n\n" +
    "Your custom build order has been submitted to the admin team.\n\n" +
    "<b>Status:</b> Pending Admin Review"
} else {
  userConfirmation =
    "<b>✅ Order Submitted Successfully</b>\n\n" +
    "<b>🆔 Order ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n\n" +
    "<b>Package:</b> " +
    safeText(packageName) +
    "\n\n" +
    "Your package order has been submitted to the admin team.\n\n" +
    "<b>Status:</b> Pending Admin Review"
}

var userKeyboard = {
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
        callback_data: "MAIN_MENU"
      }
    ]
  ]
}

// =====================================================
// 22. EDIT CURRENT USER MESSAGE
// =====================================================

var edited = false

try {
  if (
    typeof request !== "undefined" &&
    request &&
    request.message &&
    request.message.message_id
  ) {
    Api.editMessageText({
      chat_id: uid,
      message_id: request.message.message_id,
      text: userConfirmation,
      parse_mode: "HTML",
      disable_web_page_preview: true,
      reply_markup: userKeyboard
    })

    edited = true
  }
} catch (editError) {
  edited = false
}

if (!edited) {
  Api.sendMessage({
    chat_id: uid,
    text: userConfirmation,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_markup: userKeyboard
  })
}

// =====================================================
// 23. FINAL CALLBACK
// =====================================================

answerCallback("Order submitted successfully.", false)

