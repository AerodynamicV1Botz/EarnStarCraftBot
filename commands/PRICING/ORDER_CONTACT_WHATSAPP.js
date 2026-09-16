/*CMD
  command: ORDER_CONTACT_WHATSAPP
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
  command: ORDER_CONTACT_WHATSAPP
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 23 — ORDER_CONTACT_WHATSAPP
// STEP 2.2.1.3.4
// CLIENT → ASK WHATSAPP NUMBER
// UNIFIED CONTACT SYSTEM
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
// 🔀 ACTIVE CONTACT FLOW
// =====================================================

var activeContactFlow = User.getProperty("ACTIVE_CONTACT_FLOW")

if (activeContactFlow !== "BUILD" && activeContactFlow !== "ORDER") {
  activeContactFlow = "ORDER"
}

// =====================================================
// 📦 ACTIVE DRAFT KEY
// =====================================================

var activeDraftKey =
  activeContactFlow === "BUILD" ? "BUILD_ENQUIRY_" + uid : "ORDER_" + uid

// =====================================================
// 🌐 LANGUAGE
// =====================================================

var userData = Bot.getProperty("USER_" + uid)

if (!userData || typeof userData !== "object") {
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
// 📦 LOAD DRAFT
// =====================================================

var draft = Bot.getProperty(activeDraftKey)

if (!draft || typeof draft !== "object") {
  Api.sendMessage({
    chat_id: uid,
    text:
      language === "english"
        ? "❌ Contact draft not found. Please start again."
        : language === "gujarati"
        ? "❌ Contact draft મળ્યો નથી. કૃપા કરીને ફરીથી શરૂ કરો."
        : "❌ Contact draft nahi mila. Please dobara start karein."
  })

  User.setProperty("WAITING_WHATSAPP", "no", "string")

  return
}

// =====================================================
// 📞 CONTACT OBJECT
// =====================================================

if (!draft.contacts || typeof draft.contacts !== "object") {
  draft.contacts = {}
}

if (typeof draft.contacts.whatsapp !== "string") {
  draft.contacts.whatsapp = ""
}

// =====================================================
// 📊 STAGE
// IMPORTANT: PACKAGE STEP PRESERVED
// =====================================================

draft.stage = "whatsapp_contact"

if (!draft.userId) {
  draft.userId = uid
}

draft.updatedAt = new Date().toISOString()

// =====================================================
// 💾 SAVE DRAFT
// =====================================================

Bot.setProperty(activeDraftKey, draft, "json")

// =====================================================
// ⏳ WAITING STATE
// =====================================================

User.setProperty("WAITING_WHATSAPP", "yes", "string")

// =====================================================
// 🧹 OLD PROMPT CLEANUP
// =====================================================

var oldPromptId = User.getProperty("WHATSAPP_INPUT_MESSAGE_ID")

if (oldPromptId) {
  try {
    Api.deleteMessage({
      chat_id: uid,
      message_id: oldPromptId
    })
  } catch (error) {}
}

// =====================================================
// 🌐 TEXT
// =====================================================

var askText = ""

if (language === "english") {
  askText =
    "🟢 <b>Submit WhatsApp Number</b>\n\n" +
    "Enter your WhatsApp number with country code.\n\n" +
    "Examples:\n" +
    "<code>+919876543210</code>\n" +
    "<code>919876543210</code>\n" +
    "<code>9876543210</code>\n\n" +
    "Your number will be saved in international format."
} else if (language === "gujarati") {
  askText =
    "🟢 <b>WhatsApp Number Submit કરો</b>\n\n" +
    "તમારો WhatsApp number country code સાથે enter કરો.\n\n" +
    "Examples:\n" +
    "<code>+919876543210</code>\n" +
    "<code>919876543210</code>\n" +
    "<code>9876543210</code>\n\n" +
    "Number international format માં save થશે."
} else {
  askText =
    "🟢 <b>WhatsApp Number Submit Karein</b>\n\n" +
    "Apna WhatsApp number country code ke saath enter karein.\n\n" +
    "Examples:\n" +
    "<code>+919876543210</code>\n" +
    "<code>919876543210</code>\n" +
    "<code>9876543210</code>\n\n" +
    "Number international format mein save hoga."
}

// =====================================================
// 🔙 BACK BUTTON
// =====================================================

var backCallback =
  activeContactFlow === "BUILD" ? "BUILD_CONTACT_MENU" : "ORDER_CONTACT_MENU"

var backText = language === "gujarati" ? "🔙 પાછા" : "🔙 Back"

// =====================================================
// 📩 SEND PROMPT
// =====================================================

var sentMessage = Api.sendMessage({
  chat_id: uid,
  text: askText,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: backText,
          callback_data: backCallback
        }
      ]
    ]
  }
})

if (sentMessage && sentMessage.result && sentMessage.result.message_id) {
  User.setProperty(
    "WHATSAPP_INPUT_MESSAGE_ID",
    String(sentMessage.result.message_id),
    "string"
  )
}

// =====================================================
// ▶️ NEXT SCRIPT
// =====================================================

Bot.runCommand("ORDER_CONTACT_WHATSAPP_SAVE")

