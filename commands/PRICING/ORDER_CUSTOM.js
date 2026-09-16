/*CMD
  command: ORDER_CUSTOM
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
  command: ORDER_CUSTOM
  need_reply: false
  folder: ORDERS
*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 48 — ORDER_CUSTOM FINAL
// STEP 4.4.1 — CUSTOM ORDER REQUEST
// ==========================================

// ==========================================
// ---------- CALLBACK RESPONSE ----------
// ==========================================

if (typeof request !== "undefined" && request && request.id) {
  try {
    Api.answerCallbackQuery({
      callback_query_id: request.id
    })
  } catch (error) {}
}

// ==========================================
// ---------- USER DETAILS ----------
// ==========================================

var uid = String(user.telegramid)

var userData = Bot.getProperty("USER_" + uid) || {}

if (!userData || typeof userData !== "object" || Array.isArray(userData)) {
  userData = {}
}

// ==========================================
// ---------- LANGUAGE ----------
// ==========================================

var language = userData.language || "hinglish"

if (
  language !== "hinglish" &&
  language !== "english" &&
  language !== "gujarati"
) {
  language = "hinglish"
}

// ==========================================
// ---------- TELEGRAM PROFILE ----------
// ==========================================

var fullName = String(user.first_name || "")

if (user.last_name) {
  fullName += " " + String(user.last_name)
}

fullName = fullName.trim() || "Telegram User"

var telegramUsername = ""

if (user.username) {
  telegramUsername = "@" + String(user.username)
}

var premiumStatus = user.is_premium === true ? "Active" : "Not Active"

// ==========================================
// ---------- CURRENT TIMESTAMP ----------
// ==========================================

var now = new Date().toISOString()

// ==========================================
// ---------- UPDATE USER ACTIVITY ----------
// ==========================================

userData.lastCommand = "ORDER_CUSTOM"
userData.lastVisitedAt = now
userData.updatedAt = now

Bot.setProperty("USER_" + uid, userData, "json")

// ==========================================
// ---------- CREATE CUSTOM ORDER DRAFT ----------
// ==========================================

var draft = {
  id: "",
  orderId: "",

  userId: uid,

  packageType: "custom",
  packageName: "Custom Package",
  packageStep: "4.4",
  packagePrice: "Custom Pricing",

  advanceAmount: "",
  remainingAmount: "",

  telegramProfile: {
    fullName: fullName,
    telegramId: uid,
    username: telegramUsername,
    isPremium: premiumStatus
  },

  clientInfo: {
    customName: ""
  },

  contacts: {
    telegram: "",
    otherNumber: "",
    instagram: "",
    whatsapp: "",
    email: ""
  },

  requirements: "",
  budget: "",
  extraDetails: "",

  stage: "client_name_input",

  requestStatus: "draft",
  orderStatus: "pending_review",
  paymentStatus: "not_requested",

  progress: 0,
  progressTitle: "Order Started",
  progressUpdate: "",

  adminId: "",
  adminNote: "",

  createdAt: now,
  updatedAt: now,

  acceptedAt: "",
  advanceRequestedAt: "",
  advancePaidAt: "",
  startedAt: "",
  completedAt: "",
  remainingRequestedAt: "",
  remainingPaidAt: "",
  deliveredAt: "",
  submittedAt: ""
}

// ==========================================
// ---------- SAVE ACTIVE DRAFT ----------
// ==========================================

Bot.setProperty("ORDER_" + uid, draft, "json")

// ==========================================
// ---------- CLEAR OLD TEMP DATA ----------
// ==========================================

Bot.setProperty("CUSTOM_MODE_" + uid, "", "string")

Bot.setProperty("ORDER_MODE_" + uid, "", "string")

Bot.setProperty("ORDER_PACKAGE_" + uid, "", "string")

// ==========================================
// ---------- LANGUAGE TEXT ----------
// ==========================================

var text = ""
var backText = ""

if (language == "english") {
  text =
    "💎 <b>Custom Package Order</b>\n\n" +
    "Let's start your custom project.\n\n" +
    "👤 <b>Step 1 of 3</b>\n" +
    "Please send the name you want to use for this project.\n\n" +
    "Example: <i>My Custom Bot</i>\n\n" +
    "📩 <b>Send your project/client name now.</b>"

  backText = "⬅️ Back to Pricing"
} else if (language == "gujarati") {
  text =
    "💎 <b>કસ્ટમ પેકેજ ઓર્ડર</b>\n\n" +
    "ચાલો તમારો કસ્ટમ પ્રોજેક્ટ શરૂ કરીએ.\n\n" +
    "👤 <b>સ્ટેપ 1 માંથી 3</b>\n" +
    "આ પ્રોજેક્ટ માટે જે નામ રાખવું છે તે મોકલો.\n\n" +
    "ઉદાહરણ: <i>My Custom Bot</i>\n\n" +
    "📩 <b>હવે તમારું project/client name મોકલો.</b>"

  backText = "⬅️ પ્રાઇસિંગ પર પાછા"
} else {
  text =
    "💎 <b>Custom Package Order</b>\n\n" +
    "Chalo aapka custom project start karte hain.\n\n" +
    "👤 <b>Step 1 of 3</b>\n" +
    "Is project ke liye jo naam rakhna hai, woh bhejo.\n\n" +
    "Example: <i>My Custom Bot</i>\n\n" +
    "📩 <b>Ab apna project/client name bhejo.</b>"

  backText = "⬅️ Pricing par wapas"
}

// ==========================================
// ---------- SEND MESSAGE ----------
// ==========================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: backText,
          callback_data: "ORDER_BACK_PRICING"
        }
      ]
    ]
  }
})

// ==========================================
// ---------- NEXT STEP ----------
// ==========================================

Bot.runCommand("ORDER_CLIENT_NAME_INPUT")

