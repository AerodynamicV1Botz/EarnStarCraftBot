/*CMD
  command: BROADCAST_USERS
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
// SCRIPT 125 — UPDATED VERSION
// COMMAND NAME: BROADCAST_USERS
// STEP 5.3.2 — USER MANAGEMENT DEMO
// 📁 Live Demos → Broadcast Demo → User Management
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
    "👥 <b>USER MANAGEMENT DEMO</b>\n\n" +
    "🤖 A simple user management system helps admins organize registered users.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 👤 View registered users\n" +
    "• 🆔 Store Telegram user IDs\n" +
    "• 🌐 Save selected language\n" +
    "• 📅 Track registration details\n" +
    "• 🚫 Identify blocked users\n" +
    "• 🧹 Clean inactive users\n" +
    "• 🔔 Manage notification audience\n" +
    "• 🛡️ Admin-only access\n\n" +
    "📊 <b>Sample User Record:</b>\n" +
    "👤 Name: Demo User\n" +
    "🆔 Telegram ID: ********\n" +
    "🌐 Language: English\n" +
    "📅 Status: Registered\n\n" +
    "💡 This is a showcase preview. No real user data is displayed."

} else if (lang == "gujarati") {
  text =
    "👥 <b>USER MANAGEMENT DEMO</b>\n\n" +
    "🤖 Simple user management system admin ને registered users ને organize કરવામાં મદદ કરે છે.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 👤 Registered users જોવું\n" +
    "• 🆔 Telegram user IDs save કરવી\n" +
    "• 🌐 Selected language save કરવી\n" +
    "• 📅 Registration details track કરવી\n" +
    "• 🚫 Blocked users ઓળખવા\n" +
    "• 🧹 Inactive users clean કરવા\n" +
    "• 🔔 Notification audience manage કરવી\n" +
    "• 🛡️ Admin-only access\n\n" +
    "📊 <b>Sample User Record:</b>\n" +
    "👤 Name: Demo User\n" +
    "🆔 Telegram ID: ********\n" +
    "🌐 Language: Gujarati\n" +
    "📅 Status: Registered\n\n" +
    "💡 આ showcase preview છે. કોઈ real user data બતાવવામાં આવતો નથી."

} else {
  text =
    "👥 <b>USER MANAGEMENT DEMO</b>\n\n" +
    "🤖 Simple user management system admin ko registered users organize karne mein help karta hai.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 👤 Registered users dekhna\n" +
    "• 🆔 Telegram user IDs save karna\n" +
    "• 🌐 Selected language save karna\n" +
    "• 📅 Registration details track karna\n" +
    "• 🚫 Blocked users identify karna\n" +
    "• 🧹 Inactive users clean karna\n" +
    "• 🔔 Notification audience manage karna\n" +
    "• 🛡️ Admin-only access\n\n" +
    "📊 <b>Sample User Record:</b>\n" +
    "👤 Name: Demo User\n" +
    "🆔 Telegram ID: ********\n" +
    "🌐 Language: Hinglish\n" +
    "📅 Status: Registered\n\n" +
    "💡 Ye showcase preview hai. Koi real user data display nahi hota."
}

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: "📊 Statistics",
      callback_data: "BROADCAST_STATS"
    }
  ],
  [
    {
      text: "📝 Sample Message",
      callback_data: "BROADCAST_SAMPLE"
    },
    {
      text: "📢 Broadcast Demo",
      callback_data: "BROADCAST_TEST"
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
      text: "📢 Broadcast Menu",
      callback_data: "DEMO_BROADCAST"
    },
    {
      text: "🎬 All Demos",
      callback_data: "MENU_DEMO"
    }
  ]
]

// ---------- SAME MESSAGE EDIT ----------
function showBroadcastUsers(text, buttons) {
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

// ---------- SHOW USER MANAGEMENT ----------
showBroadcastUsers(text, buttons)
