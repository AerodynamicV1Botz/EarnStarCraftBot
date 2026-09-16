/*CMD
  command: DEMO_SUPPORT
  help: 
  need_reply: false
  auto_retry_time: 
  folder: LIVE DEMO

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/*CMD
  command: DEMO_SUPPORT
  need_reply: false
  folder: MAIN_MENU
*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 65 — UPDATED VERSION
// COMMAND NAME: DEMO_SUPPORT
// STEP 5.2 — CUSTOMER SUPPORT BOT DEMO
// 📁 MAIN MENU → 📁 LIVE DEMOS → 📁 SUPPORT
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================
// ✅ Complete support information on one page
// ✅ Removed FAQ Demo button
// ✅ Removed Contact Support button
// ✅ Removed Support Request button
// ✅ Removed Notifications button
// ✅ Removed Admin Features button
// ✅ Removed Build Similar Bot button
// ✅ Removed Pricing button
// ✅ Only All Demos + Main Menu navigation
// ✅ Same Message Edit + Delete Fallback
// ==========================================

// ==========================================
// 👤 USER DATA
// ==========================================

var uid = String(user.telegramid)

var userData = Bot.getProperty("USER_" + uid) || {}

var lang = userData.language || "hinglish"

// ==========================================
// ⚡ INSTANT CALLBACK RESPONSE
// ==========================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  try {
    Api.answerCallbackQuery({
      callback_query_id: request.id
    })
  } catch (error) {}
}

// ==========================================
// 🌐 LANGUAGE BUTTON TEXT
// ==========================================

var allDemosText =
  lang === "english"
    ? "🎬 All Demos"
    : lang === "gujarati"
    ? "🎬 બધા ડેમો"
    : "🎬 All Demos"

var mainMenuText =
  lang === "english"
    ? "🏠 Main Menu"
    : lang === "gujarati"
    ? "🏠 મુખ્ય મેનુ"
    : "🏠 Main Menu"

// ==========================================
// 🎛️ ONLY NAVIGATION BUTTONS
// ==========================================

var buttons = [
  [
    {
      text: allDemosText,
      callback_data: "MENU_DEMO"
    },
    {
      text: mainMenuText,
      callback_data: "BACK_MAIN_MENU"
    }
  ]
]

// ==========================================
// 📝 DEMO TEXT
// ==========================================

var text = ""

// ==========================================
// 🇬🇧 ENGLISH
// ==========================================

if (lang === "english") {

  text =
    "🛟 <b>CUSTOMER SUPPORT BOT DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "✨ A Customer Support Bot can handle common customer questions and route important requests to the right team.\n\n" +

    "❓ <b>FAQ System</b>\n" +
    "Frequently asked questions can be answered automatically, helping customers get quick information.\n\n" +

    "💬 <b>Contact Support</b>\n" +
    "Customers can send their questions directly through the bot and receive assistance.\n\n" +

    "🎫 <b>Support Requests</b>\n" +
    "Customer requests can be collected, organized and forwarded to the support team.\n\n" +

    "🔔 <b>Notifications</b>\n" +
    "Customers can receive updates about their requests, replies and support status.\n\n" +

    "👑 <b>Admin Management</b>\n" +
    "Admins can review customer requests and manage support workflows from one place.\n\n" +

    "💡 <b>Use Cases</b>\n" +
    "Useful for online stores, service businesses, communities, agencies and customer-care teams.\n\n" +

    "🚀 <b>Custom Version</b>\n" +
    "A complete Support Bot can be built according to your business requirements.\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "👇 <b>Explore more demo categories below:</b>"

}

// ==========================================
// 🇬🇺 GUJARATI
// ==========================================

else if (lang === "gujarati") {

  text =
    "🛟 <b>CUSTOMER SUPPORT BOT DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "✨ Customer Support Bot common customer questions handle કરી શકે છે અને important requests યોગ્ય team સુધી પહોંચાડી શકે છે.\n\n" +

    "❓ <b>FAQ System</b>\n" +
    "Frequently asked questions automatically answer કરી શકાય છે, જેથી customers ને ઝડપથી information મળી શકે.\n\n" +

    "💬 <b>Contact Support</b>\n" +
    "Customers bot દ્વારા સીધા questions મોકલી શકે છે અને assistance મેળવી શકે છે.\n\n" +

    "🎫 <b>Support Requests</b>\n" +
    "Customer requests collect, organize અને support team સુધી forward કરી શકાય છે.\n\n" +

    "🔔 <b>Notifications</b>\n" +
    "Customers ને requests, replies અને support status ના updates મળી શકે છે.\n\n" +

    "👑 <b>Admin Management</b>\n" +
    "Admins customer requests review કરી શકે છે અને support workflows manage કરી શકે છે.\n\n" +

    "💡 <b>Use Cases</b>\n" +
    "Online stores, service businesses, communities, agencies અને customer-care teams માટે ઉપયોગી.\n\n" +

    "🚀 <b>Custom Version</b>\n" +
    "તમારા business requirements પ્રમાણે complete Support Bot બનાવી શકાય છે.\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "👇 <b>નીચે વધુ demo categories explore કરો:</b>"

}

// ==========================================
// 🇮🇳 HINGLISH
// ==========================================

else {

  text =
    "🛟 <b>CUSTOMER SUPPORT BOT DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "✨ Customer Support Bot common customer questions handle kar sakta hai aur important requests ko right team tak route kar sakta hai.\n\n" +

    "❓ <b>FAQ System</b>\n" +
    "Frequently asked questions automatically answer kiye ja sakte hain, jisse customers ko quick information milti hai.\n\n" +

    "💬 <b>Contact Support</b>\n" +
    "Customers bot ke through directly questions bhej sakte hain aur assistance receive kar sakte hain.\n\n" +

    "🎫 <b>Support Requests</b>\n" +
    "Customer requests collect, organize aur support team tak forward ki ja sakti hain.\n\n" +

    "🔔 <b>Notifications</b>\n" +
    "Customers ko requests, replies aur support status ke updates mil sakte hain.\n\n" +

    "👑 <b>Admin Management</b>\n" +
    "Admins customer requests review kar sakte hain aur support workflows manage kar sakte hain.\n\n" +

    "💡 <b>Use Cases</b>\n" +
    "Online stores, service businesses, communities, agencies aur customer-care teams ke liye useful.\n\n" +

    "🚀 <b>Custom Version</b>\n" +
    "Aapke business requirements ke according complete Support Bot banaya ja sakta hai.\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "👇 <b>Neeche aur demo categories explore karein:</b>"

}

// ==========================================
// 🔧 SHOW SUPPORT DEMO
// ==========================================

function showSupportMenu() {

  var messageId = ""

  if (
    typeof request !== "undefined" &&
    request &&
    request.message
  ) {

    if (request.message.message_id) {

      messageId = String(request.message.message_id)

    } else if (request.message.messageId) {

      messageId = String(request.message.messageId)

    }
  }

  // ========================================
  // ✏️ TRY EDIT CURRENT MESSAGE
  // ========================================

  if (messageId) {

    try {

      Api.editMessageText({

        chat_id: uid,

        message_id: messageId,

        text: text,

        parse_mode: "HTML",

        reply_markup: {
          inline_keyboard: buttons
        }

      })

      return

    } catch (error) {

      // Edit fail hone par delete fallback
    }

    // ======================================
    // 🗑️ DELETE OLD MESSAGE
    // ======================================

    try {

      Api.deleteMessage({

        chat_id: uid,

        message_id: messageId

      })

    } catch (deleteError) {}

  }

  // ========================================
  // 📩 SEND NEW MESSAGE
  // ========================================

  Api.sendMessage({

    chat_id: uid,

    text: text,

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: buttons
    }

  })

}

// ==========================================
// ▶️ RUN
// ==========================================

showSupportMenu()
