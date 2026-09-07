/*CMD
  command: BROADCAST_SAMPLE
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
// SCRIPT 124 — UPDATED VERSION
// COMMAND NAME: BROADCAST_SAMPLE
// STEP 5.3.1.1 — SAMPLE BROADCAST PREVIEW
// 📁 Live Demos → Broadcast Demo → Sample Message
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
    "📝 <b>SAMPLE BROADCAST MESSAGE</b>\n\n" +
    "🎉 <b>New Update Available!</b>\n\n" +
    "Hello everyone! 👋\n\n" +
    "We have an exciting new update for our community.\n\n" +
    "✨ New features have been added.\n" +
    "⚡ Improved performance and experience.\n" +
    "🔔 Stay connected for more updates.\n\n" +
    "Thank you for being part of our community. ❤️\n\n" +
    "━━━━━━━━━━━━━━━\n" +
    "📢 <b>Broadcast Preview</b>\n" +
    "👥 Audience: Registered Users\n" +
    "📨 Type: Announcement\n" +
    "🛡️ Status: Demo Preview\n" +
    "━━━━━━━━━━━━━━━\n\n" +
    "💡 This message is only a preview. No real broadcast will be sent."

} else if (lang == "gujarati") {
  text =
    "📝 <b>SAMPLE BROADCAST MESSAGE</b>\n\n" +
    "🎉 <b>New Update Available!</b>\n\n" +
    "નમસ્તે સૌને! 👋\n\n" +
    "અમારી community માટે એક નવું exciting update આવ્યું છે.\n\n" +
    "✨ નવા features ઉમેરવામાં આવ્યા છે.\n" +
    "⚡ Performance અને experience માં સુધારો.\n" +
    "🔔 વધુ updates માટે connected રહો.\n\n" +
    "અમારી community નો ભાગ બનવા બદલ આભાર. ❤️\n\n" +
    "━━━━━━━━━━━━━━━\n" +
    "📢 <b>Broadcast Preview</b>\n" +
    "👥 Audience: Registered Users\n" +
    "📨 Type: Announcement\n" +
    "🛡️ Status: Demo Preview\n" +
    "━━━━━━━━━━━━━━━\n\n" +
    "💡 આ માત્ર preview છે. કોઈ real broadcast મોકલવામાં આવશે નહીં."

} else {
  text =
    "📝 <b>SAMPLE BROADCAST MESSAGE</b>\n\n" +
    "🎉 <b>New Update Available!</b>\n\n" +
    "Hello everyone! 👋\n\n" +
    "Hamari community ke liye ek exciting new update aaya hai.\n\n" +
    "✨ New features add kiye gaye hain.\n" +
    "⚡ Performance aur experience improve hua hai.\n" +
    "🔔 Aur updates ke liye connected raho.\n\n" +
    "Hamari community ka part banne ke liye thank you. ❤️\n\n" +
    "━━━━━━━━━━━━━━━\n" +
    "📢 <b>Broadcast Preview</b>\n" +
    "👥 Audience: Registered Users\n" +
    "📨 Type: Announcement\n" +
    "🛡️ Status: Demo Preview\n" +
    "━━━━━━━━━━━━━━━\n\n" +
    "💡 Ye sirf preview hai. Koi real broadcast send nahi hoga."
}

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: "👥 User Management",
      callback_data: "BROADCAST_USERS"
    },
    {
      text: "📊 Statistics",
      callback_data: "BROADCAST_STATS"
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
function showBroadcastSample(text, buttons) {
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

// ---------- SHOW PREVIEW ----------
showBroadcastSample(text, buttons)
