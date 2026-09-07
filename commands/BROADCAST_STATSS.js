/*CMD
  command: BROADCAST_STATSS
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 126 — UPDATED VERSION
// COMMAND NAME: BROADCAST_STATSS
// STEP 5.3.3 — BROADCAST STATISTICS DEMO
// 📁 Live Demos → Broadcast Demo → Statistics
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

// ---------- DEMO STATISTICS ----------
var total = 1250
var sent = 1218
var skipped = 24
var failed = 8
var successRate = Math.round((sent / total) * 100)

// ---------- TEXT ----------
var text = ""

if (lang == "english") {
  text =
    "📊 <b>BROADCAST STATISTICS DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "👥 <b>Total Users:</b> " + total + "\n\n" +
    "📨 <b>Successfully Sent:</b> " + sent + "\n\n" +
    "🚫 <b>Blocked/Skipped:</b> " + skipped + "\n\n" +
    "⚠️ <b>Failed:</b> " + failed + "\n\n" +
    "📈 <b>Success Rate:</b> " + successRate + "%\n\n" +
    "🕐 <b>Last Broadcast:</b>\n" +
    "Today, 10:30 AM\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "💡 These are sample demo statistics. No real broadcast data is displayed."

} else if (lang == "gujarati") {
  text =
    "📊 <b>BROADCAST STATISTICS DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "👥 <b>Total Users:</b> " + total + "\n\n" +
    "📨 <b>Successfully Sent:</b> " + sent + "\n\n" +
    "🚫 <b>Blocked/Skipped:</b> " + skipped + "\n\n" +
    "⚠️ <b>Failed:</b> " + failed + "\n\n" +
    "📈 <b>Success Rate:</b> " + successRate + "%\n\n" +
    "🕐 <b>Last Broadcast:</b>\n" +
    "આજે, સવારે 10:30 વાગ્યે\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "💡 આ sample demo statistics છે. કોઈ real broadcast data બતાવવામાં આવતો નથી."

} else {
  text =
    "📊 <b>BROADCAST STATISTICS DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "👥 <b>Total Users:</b> " + total + "\n\n" +
    "📨 <b>Successfully Sent:</b> " + sent + "\n\n" +
    "🚫 <b>Blocked/Skipped:</b> " + skipped + "\n\n" +
    "⚠️ <b>Failed:</b> " + failed + "\n\n" +
    "📈 <b>Success Rate:</b> " + successRate + "%\n\n" +
    "🕐 <b>Last Broadcast:</b>\n" +
    "Aaj, subah 10:30 baje\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "💡 Ye sample demo statistics hain. Koi real broadcast data display nahi hota."
}

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: "👥 User Management",
      callback_data: "BROADCAST_USERS"
    }
  ],
  [
    {
      text: "📢 Broadcast Demo",
      callback_data: "BROADCAST_TEST"
    },
    {
      text: "📝 Sample Message",
      callback_data: "BROADCAST_SAMPLE"
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
function showBroadcastStats(text, buttons) {
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

// ---------- SHOW STATISTICS ----------
showBroadcastStats(text, buttons)
