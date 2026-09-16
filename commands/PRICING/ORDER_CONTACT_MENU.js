/*CMD
  command: ORDER_CONTACT_MENU
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
  command: ORDER_CONTACT_MENU
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 18 — ORDER_CONTACT_MENU
// DIRECT PACKAGE CONTACT MENU
//
// FLOW:
// ORDER_STARTER / ORDER_BUSINESS / ORDER_PRO
//        ↓
// ORDER_CONTACT_MENU
//        ↓
// ORDER_SUBMIT starter / business / pro
//
// CUSTOM BUILD IS NOT HANDLED HERE.
// CUSTOM BUILD FLOW:
// BUILD_USER_AGREE → ORDER_SUBMIT ES-xxxx
// =====================================================

// =====================================================
// ⚡ CALLBACK RESPONSE
// =====================================================

if (typeof request !== "undefined" && request && request.id) {
  try {
    Api.answerCallbackQuery({
      callback_query_id: request.id
    })
  } catch (error) {}
}

// =====================================================
// 👤 USER ID
// =====================================================

var uid = String(user.telegramid)

// =====================================================
// 🔐 ACTIVE CONTACT FLOW
// =====================================================

User.setProperty("ACTIVE_CONTACT_FLOW", "ORDER", "string")

// =====================================================
// 🌐 USER DATA
// =====================================================

var userData = Bot.getProperty("USER_" + uid)

if (!userData || typeof userData !== "object" || Array.isArray(userData)) {
  userData = {}
}

var language = String(userData.language || "hinglish").toLowerCase()

if (
  language !== "hinglish" &&
  language !== "english" &&
  language !== "gujarati"
) {
  language = "hinglish"
}

// =====================================================
// 🛡️ HTML SAFE TEXT
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
// 📦 LOAD DIRECT PACKAGE DRAFT ONLY
// =====================================================

var orderKey = "ORDER_" + uid

var draft = Bot.getProperty(orderKey)

if (!draft || typeof draft !== "object" || Array.isArray(draft)) {
  Api.sendMessage({
    chat_id: uid,

    text:
      "❌ <b>Order draft was not found.</b>\n\n" +
      "Please select a package again.",

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "💰 Pricing",
            callback_data: "MENU_PRICING"
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
  })

  return
}

// =====================================================
// 📦 NORMALIZE PACKAGE DATA
// =====================================================

draft.userId = String(draft.userId || uid)

draft.packageType = String(draft.packageType || "")
  .toLowerCase()
  .trim()

draft.packageName = String(
  draft.packageName || draft.package || draft.selectedPackage || ""
)

draft.packagePrice = String(draft.packagePrice || "To be discussed")

// =====================================================
// 🚫 CUSTOM BUILD BLOCK
// =====================================================

if (
  draft.source === "BUILD_ENQUIRY" ||
  draft.orderSource === "BUILD_ENQUIRY" ||
  draft.enquiryId ||
  draft.sourceEnquiryId
) {
  Api.sendMessage({
    chat_id: uid,

    text:
      "⚠️ <b>Custom Build order detected.</b>\n\n" +
      "Custom Build ke liye contact menu ki zarurat nahi hai.\n" +
      "Please apne proposal se direct order submit karein.",

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🏠 Main Menu",
            callback_data: "MAIN_MENU"
          }
        ]
      ]
    }
  })

  return
}

// =====================================================
// 📦 VALIDATE DIRECT PACKAGE
// =====================================================

if (draft.packageType === "professional") {
  draft.packageType = "pro"
}

if (
  draft.packageType !== "starter" &&
  draft.packageType !== "business" &&
  draft.packageType !== "pro"
) {
  Api.sendMessage({
    chat_id: uid,

    text:
      "❌ <b>Invalid package order.</b>\n\n" +
      "Please Starter, Business ya Pro package dobara select karein.",

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "💰 Pricing",
            callback_data: "MENU_PRICING"
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
  })

  return
}

// =====================================================
// 📦 EXACT PACKAGE DETAILS
// =====================================================

var packageDetails = ""

if (draft.packageType === "starter") {
  packageDetails =
    "💰 <b>Starting Price:</b> ₹499\n" +
    "• Professional Welcome System\n" +
    "• Custom Inline Buttons\n" +
    "• Main Menu\n" +
    "• Information Pages\n" +
    "• Basic Auto Replies\n" +
    "• Contact Section\n" +
    "• About / FAQ Section\n" +
    "• Mobile-friendly Bot Flow\n" +
    "• <b>Delivery:</b> Requirement according\n" +
    "• <b>Revisions:</b> 1 minor revision\n" +
    "• <b>Complex features:</b> Additional cost"
} else if (draft.packageType === "business") {
  packageDetails =
    "💰 <b>Starting Price:</b> ₹1,499+\n" +
    "• Everything in Starter\n" +
    "• Advanced menu & navigation\n" +
    "• User management system\n" +
    "• Broadcast & notifications\n" +
    "• Admin controls\n" +
    "• Automated forms / lead collection\n" +
    "• Admin alerts\n" +
    "• Basic user statistics\n" +
    "• Custom business features\n" +
    "• Mobile-friendly bot flow\n" +
    "• <b>Delivery:</b> Based on requirements\n" +
    "• <b>Revisions:</b> 2 minor revisions\n" +
    "• <b>Advanced/complex features:</b> Additional charges may apply"
} else if (draft.packageType === "pro") {
  packageDetails =
    "💰 <b>Starting Price:</b> ₹2,999+\n" +
    "• Everything in Business\n" +
    "• Advanced automation\n" +
    "• Advanced user management\n" +
    "• Advanced statistics & tracking\n" +
    "• Smart broadcast system\n" +
    "• Custom forms & lead collection\n" +
    "• Automated admin notifications\n" +
    "• Admin & permission controls\n" +
    "• Custom workflows\n" +
    "• Data & user management\n" +
    "• Professional custom bot flow\n" +
    "• Custom features based on requirements\n" +
    "• <b>Delivery:</b> Depends on project requirements\n" +
    "• <b>Revisions:</b> 3 minor revisions\n" +
    "• <b>API/external/highly advanced features:</b> May cost extra"
}

// =====================================================
// 👤 CLIENT TELEGRAM MENTION
// =====================================================

var fullName = String(user.first_name || "")

if (user.last_name) {
  fullName += " " + String(user.last_name)
}

fullName = fullName.trim()

if (!fullName) {
  fullName = "Telegram User"
}

var mention =
  '<a href="tg://user?id=' + safeText(uid) + '">' + safeText(fullName) + "</a>"

// =====================================================
// 📞 ENSURE CONTACT OBJECT
// =====================================================

if (
  !draft.contacts ||
  typeof draft.contacts !== "object" ||
  Array.isArray(draft.contacts)
) {
  draft.contacts = {}
}

// =====================================================
// 💾 LOAD PERMANENT CONTACTS
// =====================================================

var savedContacts = Bot.getProperty("USER_CONTACTS_" + uid)

if (
  !savedContacts ||
  typeof savedContacts !== "object" ||
  Array.isArray(savedContacts)
) {
  savedContacts = {}
}

// =====================================================
// 📞 NORMALIZE CONTACT VALUES
// =====================================================

var contactFields = [
  "telegram",
  "otherNumber",
  "instagram",
  "whatsapp",
  "email"
]

for (var i = 0; i < contactFields.length; i++) {
  var field = contactFields[i]

  draft.contacts[field] = String(
    draft.contacts[field] || savedContacts[field] || ""
  )

  savedContacts[field] = String(savedContacts[field] || "")
}

// =====================================================
// 📊 COUNT MAIN CONTACTS
// Email does not count.
// =====================================================

var contactCount = 0

if (draft.contacts.telegram.trim()) {
  contactCount++
}

if (draft.contacts.otherNumber.trim()) {
  contactCount++
}

if (draft.contacts.instagram.trim()) {
  contactCount++
}

if (draft.contacts.whatsapp.trim()) {
  contactCount++
}

// =====================================================
// 💾 CURRENT ORDER STATE
// =====================================================
// =====================================================
// 💾 SAVE PACKAGE DETAILS INTO ORDER DRAFT
// =====================================================

draft.packageDetails = packageDetails

draft.packageDescription = packageDetails

draft.packageInfo = packageDetails

draft.stage = "contact_menu"

draft.requestStatus = draft.requestStatus || "draft"

draft.orderStatus = draft.orderStatus || "pending_review"

draft.paymentStatus = draft.paymentStatus || "not_requested"

draft.updatedAt = new Date().toISOString()

// =====================================================
// 💾 SAVE ACTIVE DRAFT
// =====================================================

Bot.setProperty(orderKey, draft, "json")

// =====================================================
// 📱 DISPLAY CONTACT VALUES
// =====================================================

var telegramDisplay = draft.contacts.telegram.trim()
  ? safeText(draft.contacts.telegram)
  : "➕ Add"

var numberDisplay = draft.contacts.otherNumber.trim()
  ? safeText(draft.contacts.otherNumber)
  : "➕ Add"

var instagramDisplay = draft.contacts.instagram.trim()
  ? safeText(draft.contacts.instagram)
  : "➕ Add"

var whatsappDisplay = draft.contacts.whatsapp.trim()
  ? safeText(draft.contacts.whatsapp)
  : "➕ Add"

var emailDisplay = draft.contacts.email.trim()
  ? safeText(draft.contacts.email)
  : "➕ Add"

// =====================================================
// 🌐 LANGUAGE LABELS
// =====================================================

var titleText = "📞 <b>Contact Details</b>"
var clientText = "👤 <b>Client:</b> "
var contactTitle = "📞 <b>Contact Details</b>"
var countText = "📊 <b>Main Contacts:</b> " + contactCount + "/4"

var continueText = "➡️ Continue"
var cancelText = "❌ Cancel Order"

if (language === "english") {
  titleText = "📞 <b>Contact Details</b>"
  clientText = "👤 <b>Client:</b> "
  contactTitle = "📞 <b>Contact Details</b>"
  continueText = "➡️ Continue"
  cancelText = "❌ Cancel Order"
} else if (language === "gujarati") {
  titleText = "📞 <b>Contact Details</b>"
  clientText = "👤 <b>Client:</b> "
  contactTitle = "📞 <b>Contact Details</b>"
  continueText = "➡️ Continue"
  cancelText = "❌ Order Cancel કરો"
}

// =====================================================
// 📝 FINAL TEXT
// =====================================================

var text =
  "📦 <b>" +
  safeText(draft.packageName) +
  "</b>\n\n" +
  "<blockquote>" +
  packageDetails +
  "</blockquote>\n\n" +
  clientText +
  mention +
  "\n\n" +
  contactTitle +
  "\n\n" +
  "📱 <b>Telegram:</b> " +
  telegramDisplay +
  "\n" +
  "☎️ <b>Other Number:</b> " +
  numberDisplay +
  "\n" +
  "📸 <b>Instagram:</b> " +
  instagramDisplay +
  "\n" +
  "🟢 <b>WhatsApp:</b> " +
  whatsappDisplay +
  "\n" +
  "📧 <b>Email:</b> " +
  emailDisplay +
  "\n\n" +
  countText

// =====================================================
// 🔘 DIRECT PACKAGE CALLBACK
// =====================================================

var continueCallback = "ORDER_SUBMIT " + draft.packageType

// =====================================================
// 🔘 CONTACT BUTTONS
// =====================================================

var buttons = [
  [
    {
      text: "📱 Telegram",
      callback_data: "ORDER_CONTACT_TELEGRAM"
    },
    {
      text: "☎️ Other Number",
      callback_data: "ORDER_CONTACT_NUMBER"
    }
  ],

  [
    {
      text: "📸 Instagram",
      callback_data: "ORDER_CONTACT_INSTAGRAM"
    },
    {
      text: "🟢 WhatsApp",
      callback_data: "ORDER_CONTACT_WHATSAPP"
    }
  ],

  [
    {
      text: "📧 Email",
      callback_data: "ORDER_CONTACT_EMAIL"
    }
  ],

  [
    {
      text: continueText,
      callback_data: continueCallback
    },
    {
      text: cancelText,
      callback_data: "ORDER_CANCEL_DRAFT"
    }
  ]
]

// =====================================================
// 📩 SEND CONTACT MENU
// =====================================================

var sentMessage = null

try {
  sentMessage = Api.sendMessage({
    chat_id: uid,
    text: text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: buttons
    }
  })
} catch (error) {
  sentMessage = null
}

// =====================================================
// 💾 SAVE CONTACT MENU MESSAGE ID
// =====================================================

if (sentMessage && sentMessage.message_id) {
  draft.contactMenuMessageId = String(sentMessage.message_id)

  draft.contactMenuChatId = uid

  draft.updatedAt = new Date().toISOString()

  Bot.setProperty(orderKey, draft, "json")
}

