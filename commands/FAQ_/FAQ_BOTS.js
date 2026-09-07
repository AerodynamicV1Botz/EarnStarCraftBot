/*CMD
  command: FAQ_BOTS
  help: 
  need_reply: false
  auto_retry_time: 
  folder: FAQ?

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 222 — UPDATED VERSION
// COMMAND NAME: FAQ_BOTS
// STEP 8.1
// 📁 FAQ_BOTS
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid

// ==========================================
// 👤 GET USER DATA
// ==========================================

var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// Support old language values
if (lang === "en") {
  lang = "english"
}

if (lang === "gu") {
  lang = "gujarati"
}

var text = ""
var buttons = []

// ==========================================
// 🤖 HINGLISH
// ==========================================

if (lang === "hinglish") {

  text =
    "🤖 <b>HUM KIS TYPE KE BOTS BANA SAKTE HAIN?</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🛒 <b>E-Commerce Bots</b>\n" +
    "Products, orders aur customer flow ke liye.\n\n" +

    "💬 <b>Customer Support Bots</b>\n" +
    "Automatic replies, FAQs aur support flow.\n\n" +

    "📢 <b>Broadcast Bots</b>\n" +
    "Users ko announcements aur updates bhejne ke liye.\n\n" +

    "👥 <b>Community Management</b>\n" +
    "Groups/channels ke management aur automation ke liye.\n\n" +

    "📝 <b>Lead Collection Bots</b>\n" +
    "Customer details aur enquiries collect karne ke liye.\n\n" +

    "⚙️ <b>Business Automation</b>\n" +
    "Forms, notifications, workflows aur custom automation.\n\n" +

    "✨ <b>Custom Bot</b>\n" +
    "Aapke exact requirements ke according custom solution bhi banaya ja sakta hai."

  buttons = [
    [
      {
        text: "🚀 Build My Bot",
        callback_data: "BUILD_CUSTOM"
      }
    ],
    [
      {
        text: "🎬 View Demos",
        callback_data: "MENU_DEMO"
      }
    ],
    [
      {
        text: "💰 View Pricing",
        callback_data: "MENU_PRICING"
      }
    ],
    [
      {
        text: "❓ More FAQs",
        callback_data: "MENU_FAQ"
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

// ==========================================
// 🇬🇧 ENGLISH
// ==========================================

else if (lang === "english") {

  text =
    "🤖 <b>WHAT KIND OF BOTS CAN WE BUILD?</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🛒 <b>E-Commerce Bots</b>\n" +
    "Product, order and customer-flow automation.\n\n" +

    "💬 <b>Customer Support Bots</b>\n" +
    "Automatic replies, FAQs and support workflows.\n\n" +

    "📢 <b>Broadcast Bots</b>\n" +
    "Announcements and updates for your users.\n\n" +

    "👥 <b>Community Management</b>\n" +
    "Group/channel management and automation.\n\n" +

    "📝 <b>Lead Collection Bots</b>\n" +
    "Collect customer details and enquiries.\n\n" +

    "⚙️ <b>Business Automation</b>\n" +
    "Forms, notifications, workflows and custom automation.\n\n" +

    "✨ <b>Custom Bots</b>\n" +
    "Custom solutions can be built according to your exact requirements."

  buttons = [
    [
      {
        text: "🚀 Build My Bot",
        callback_data: "BUILD_CUSTOM"
      }
    ],
    [
      {
        text: "🎬 View Demos",
        callback_data: "MENU_DEMO"
      }
    ],
    [
      {
        text: "💰 View Pricing",
        callback_data: "MENU_PRICING"
      }
    ],
    [
      {
        text: "❓ More FAQs",
        callback_data: "MENU_FAQ"
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

// ==========================================
// 🇮🇳 GUJARATI
// ==========================================

else if (lang === "gujarati") {

  text =
    "🤖 <b>અમે કયા પ્રકારના Bot બનાવી શકીએ?</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "🛒 <b>E-Commerce Bots</b>\n" +
    "Product, order અને customer flow માટે.\n\n" +

    "💬 <b>Customer Support Bots</b>\n" +
    "Automatic replies, FAQs અને support workflow માટે.\n\n" +

    "📢 <b>Broadcast Bots</b>\n" +
    "Users ને announcements અને updates મોકલવા માટે.\n\n" +

    "👥 <b>Community Management</b>\n" +
    "Groups/channels management અને automation માટે.\n\n" +

    "📝 <b>Lead Collection Bots</b>\n" +
    "Customer details અને enquiries collect કરવા માટે.\n\n" +

    "⚙️ <b>Business Automation</b>\n" +
    "Forms, notifications, workflows અને custom automation.\n\n" +

    "✨ <b>Custom Bot</b>\n" +
    "તમારી exact requirements પ્રમાણે custom solution બનાવી શકાય છે."

  buttons = [
    [
      {
        text: "🚀 મારું Bot બનાવો",
        callback_data: "BUILD_CUSTOM"
      }
    ],
    [
      {
        text: "🎬 Demos જુઓ",
        callback_data: "MENU_DEMO"
      }
    ],
    [
      {
        text: "💰 Pricing જુઓ",
        callback_data: "MENU_PRICING"
      }
    ],
    [
      {
        text: "❓ વધુ FAQs",
        callback_data: "MENU_FAQ"
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

// ==========================================
// 🔄 UNKNOWN LANGUAGE FALLBACK
// ==========================================

else {

  text =
    "🤖 <b>BOT DEVELOPMENT</b>\n\n" +
    "Please select your preferred language first."

  buttons = [
    [
      {
        text: "🌐 Change Language",
        callback_data: "CHANGE_LANGUAGE"
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

// ==========================================
// ✅ ANSWER CALLBACK
// ==========================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

// ==========================================
// 📤 SAME MESSAGE EDIT + DELETE FALLBACK
// ==========================================

function showMenu(messageText, keyboard) {

  if (
    typeof request !== "undefined" &&
    request.message &&
    request.message.message_id
  ) {

    try {

      Api.editMessageText({
        chat_id: uid,
        message_id: request.message.message_id,
        text: messageText,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: keyboard
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

  Api.sendMessage({
    chat_id: uid,
    text: messageText,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: keyboard
    }
  })

}

// ==========================================
// 🚀 SHOW FAQ BOTS
// ==========================================

showMenu(text, buttons)
