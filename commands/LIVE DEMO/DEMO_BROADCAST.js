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

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 122 — UPDATED VERSION
// COMMAND NAME: DEMO_BROADCAST
// STEP 5.3 — BROADCAST & NOTIFICATION DEMO
// 📁 Live Demos → Broadcast Demo
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid
var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// ---------- CALLBACK ANSWER ----------
if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

// ---------- TEXT ----------
var text = ""

if (lang == "english") {
  text =
    "📢 <b>BROADCAST & NOTIFICATION BOT DEMO</b>\n\n" +
    "🤖 A business-focused notification system for sending updates and announcements to registered users.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 📢 Broadcast announcements\n" +
    "• 🔔 User notifications\n" +
    "• 👥 User list management\n" +
    "• 📊 Basic delivery statistics\n" +
    "• 🛡️ Admin-only controls\n" +
    "• 🚫 Automatic handling of blocked users\n" +
    "• 📝 Custom message support\n" +
    "• ⚡ Organized broadcast workflow\n\n" +
    "💡 <b>Best for:</b>\n" +
    "Businesses • Communities • Channels • Creators\n\n" +
    "🎯 This is a showcase demo. The actual system can be customized according to project requirements."

} else if (lang == "gujarati") {
  text =
    "📢 <b>BROADCAST & NOTIFICATION BOT DEMO</b>\n\n" +
    "🤖 Registered users ને updates અને announcements મોકલવા માટે business-focused notification system.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 📢 Broadcast announcements\n" +
    "• 🔔 User notifications\n" +
    "• 👥 User list management\n" +
    "• 📊 Basic delivery statistics\n" +
    "• 🛡️ Admin-only controls\n" +
    "• 🚫 Blocked users નું automatic handling\n" +
    "• 📝 Custom message support\n" +
    "• ⚡ Organized broadcast workflow\n\n" +
    "💡 <b>Best for:</b>\n" +
    "Businesses • Communities • Channels • Creators\n\n" +
    "🎯 આ showcase demo છે. Project requirements પ્રમાણે actual system customize કરી શકાય છે."

} else {
  text =
    "📢 <b>BROADCAST & NOTIFICATION BOT DEMO</b>\n\n" +
    "🤖 Registered users ko updates aur announcements bhejne ke liye business-focused notification system.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 📢 Broadcast announcements\n" +
    "• 🔔 User notifications\n" +
    "• 👥 User list management\n" +
    "• 📊 Basic delivery statistics\n" +
    "• 🛡️ Admin-only controls\n" +
    "• 🚫 Blocked users ka automatic handling\n" +
    "• 📝 Custom message support\n" +
    "• ⚡ Organized broadcast workflow\n\n" +
    "💡 <b>Best for:</b>\n" +
    "Businesses • Communities • Channels • Creators\n\n" +
    "🎯 Ye showcase demo hai. Actual system project requirements ke according customize kiya ja sakta hai."
}

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: "📢 Broadcast Demo",
      callback_data: "BROADCAST_TEST"
    }
  ],
  [
    {
      text: "👥 User Management",
      callback_data: "BROADCAST_USERS"
    },
    {
      text: "📊 Statistics",
      callback_data: "BROADCAST_STATSS"
    }
  ],
  [
    {
      text: "🚀 Build Similar Bot",
      callback_data: "ORDER_CUSTOM"
    }
  ],
  [
    {
      text: "🎬 All Demos",
      callback_data: "MENU_DEMO"
    },
    {
      text: "🏠 Main Menu",
      callback_data: "BACK_MAIN_MENU"
    }
  ]
]

// ---------- SAME MESSAGE EDIT ----------
function showBroadcastDemo(text, buttons) {
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

  Api.sendMessage({
    chat_id: uid,
    text: text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons
    }
  })
}

// ---------- SHOW DEMO ----------
showBroadcastDemo(text, buttons)
