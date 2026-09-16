/*CMD
  command: DEMO_BROADCAST
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
  command: DEMO_BROADCAST
  need_reply: false
  folder: MAIN_MENU
*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 122 — UPDATED VERSION
// COMMAND NAME: DEMO_BROADCAST
// STEP 5.3 — BROADCAST & NOTIFICATION DEMO
// 📁 MAIN MENU → LIVE DEMOS → BROADCAST
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================
// ✅ Complete information on one page
// ✅ Removed Broadcast Demo button
// ✅ Removed User Management button
// ✅ Removed Statistics button
// ✅ Removed Build Similar Bot button
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
// ⚡ CALLBACK ANSWER
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
// 🌐 NAVIGATION BUTTON TEXT
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
// 📝 TEXT
// ==========================================

var text = ""

// ==========================================
// 🇬🇧 ENGLISH
// ==========================================

if (lang === "english") {

  text =
    "📢 <b>BROADCAST &amp; NOTIFICATION BOT DEMO</b>\n\n" +

    "🤖 A business-focused notification system for sending updates and announcements to registered users.\n\n" +

    "✨ <b>System Features</b>\n" +
    "• 📢 Broadcast announcements to registered users.\n" +
    "• 🔔 Send individual user notifications.\n" +
    "• 👥 Maintain and manage a registered user list.\n" +
    "• 📊 Track basic delivery statistics.\n" +
    "• 🛡️ Keep broadcast controls restricted to admins.\n" +
    "• 🚫 Handle blocked or unavailable users automatically.\n" +
    "• 📝 Support custom messages and announcements.\n" +
    "• ⚡ Maintain an organized broadcast workflow.\n\n" +

    "💡 <b>Best For</b>\n" +
    "Businesses, communities, channels, creators and service providers.\n\n" +

    "🚀 <b>Custom Version</b>\n" +
    "The complete system can be customized according to your project requirements.\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "👇 <b>Explore more demo categories below:</b>"

}

// ==========================================
// 🇬🇺 GUJARATI
// ==========================================

else if (lang === "gujarati") {

  text =
    "📢 <b>BROADCAST &amp; NOTIFICATION BOT DEMO</b>\n\n" +

    "🤖 Registered users ને updates અને announcements મોકલવા માટે business-focused notification system.\n\n" +

    "✨ <b>System Features</b>\n" +
    "• 📢 Registered users ને broadcast announcements મોકલી શકાય છે.\n" +
    "• 🔔 Individual user notifications મોકલી શકાય છે.\n" +
    "• 👥 Registered users ની list manage કરી શકાય છે.\n" +
    "• 📊 Basic delivery statistics track કરી શકાય છે.\n" +
    "• 🛡️ Broadcast controls ફક્ત admins માટે રાખી શકાય છે.\n" +
    "• 🚫 Blocked અથવા unavailable users નું automatic handling કરી શકાય છે.\n" +
    "• 📝 Custom messages અને announcements support કરી શકાય છે.\n" +
    "• ⚡ Organized broadcast workflow રાખી શકાય છે.\n\n" +

    "💡 <b>Best For</b>\n" +
    "Businesses, communities, channels, creators અને service providers માટે ઉપયોગી.\n\n" +

    "🚀 <b>Custom Version</b>\n" +
    "Project requirements પ્રમાણે complete system customize કરી શકાય છે.\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "👇 <b>નીચે વધુ demo categories explore કરો:</b>"

}

// ==========================================
// 🇮🇳 HINGLISH
// ==========================================

else {

  text =
    "📢 <b>BROADCAST &amp; NOTIFICATION BOT DEMO</b>\n\n" +

    "🤖 Registered users ko updates aur announcements bhejne ke liye business-focused notification system.\n\n" +

    "✨ <b>System Features</b>\n" +
    "• 📢 Registered users ko broadcast announcements bheje ja sakte hain.\n" +
    "• 🔔 Individual users ko notifications bheji ja sakti hain.\n" +
    "• 👥 Registered users ki list manage ki ja sakti hai.\n" +
    "• 📊 Basic delivery statistics track ki ja sakti hain.\n" +
    "• 🛡️ Broadcast controls sirf admins ke liye rakhe ja sakte hain.\n" +
    "• 🚫 Blocked ya unavailable users ka automatic handling ho sakta hai.\n" +
    "• 📝 Custom messages aur announcements support kiye ja sakte hain.\n" +
    "• ⚡ Organized broadcast workflow maintain kiya ja sakta hai.\n\n" +

    "💡 <b>Best For</b>\n" +
    "Businesses, communities, channels, creators aur service providers ke liye useful.\n\n" +

    "🚀 <b>Custom Version</b>\n" +
    "Complete system ko aapke project requirements ke according customize kiya ja sakta hai.\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "👇 <b>Neeche aur demo categories explore karein:</b>"

}

// ==========================================
// 🔧 SHOW BROADCAST DEMO
// ==========================================

function showBroadcastDemo() {

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

showBroadcastDemo()
