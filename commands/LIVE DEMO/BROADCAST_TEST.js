/*CMD
  command: BROADCAST_TEST
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
// SCRIPT 123 — UPDATED VERSION
// COMMAND NAME: BROADCAST_TEST
// STEP 5.3.1 — BROADCAST DEMO
// 📁 Live Demos → Broadcast Demo → Broadcast Test
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
    "📢 <b>BROADCAST SYSTEM — LIVE DEMO</b>\n\n" +
    "🚀 This demo shows how an admin can send one message to multiple registered users.\n\n" +
    "✨ <b>Sample Workflow:</b>\n" +
    "1️⃣ Admin creates a message\n" +
    "2️⃣ Message is checked before sending\n" +
    "3️⃣ Broadcast starts in organized batches\n" +
    "4️⃣ Blocked users are automatically skipped\n" +
    "5️⃣ Delivery statistics are generated\n\n" +
    "📝 <b>Sample Broadcast:</b>\n" +
    "🎉 New update is available!\n" +
    "Thank you for being part of our community.\n\n" +
    "🛡️ Only authorized admins can use the actual broadcast controls.\n\n" +
    "💡 This is a showcase demo, not a real broadcast."
} else if (lang == "gujarati") {
  text =
    "📢 <b>BROADCAST SYSTEM — LIVE DEMO</b>\n\n" +
    "🚀 આ demo બતાવે છે કે admin એક message ઘણા registered users ને કેવી રીતે મોકલી શકે છે.\n\n" +
    "✨ <b>Sample Workflow:</b>\n" +
    "1️⃣ Admin message બનાવે છે\n" +
    "2️⃣ Message મોકલતા પહેલા check થાય છે\n" +
    "3️⃣ Broadcast batches માં શરૂ થાય છે\n" +
    "4️⃣ Blocked users automatic skip થાય છે\n" +
    "5️⃣ Delivery statistics તૈયાર થાય છે\n\n" +
    "📝 <b>Sample Broadcast:</b>\n" +
    "🎉 New update is available!\n" +
    "અમારી community નો ભાગ બનવા બદલ આભાર.\n\n" +
    "🛡️ Actual broadcast controls ફક્ત authorized admins માટે છે.\n\n" +
    "💡 આ showcase demo છે, real broadcast નથી."
} else {
  text =
    "📢 <b>BROADCAST SYSTEM — LIVE DEMO</b>\n\n" +
    "🚀 Ye demo dikhata hai ki admin ek message multiple registered users ko kaise bhej sakta hai.\n\n" +
    "✨ <b>Sample Workflow:</b>\n" +
    "1️⃣ Admin message create karta hai\n" +
    "2️⃣ Message bhejne se pehle check hota hai\n" +
    "3️⃣ Broadcast organized batches mein start hota hai\n" +
    "4️⃣ Blocked users automatic skip hote hain\n" +
    "5️⃣ Delivery statistics generate hoti hain\n\n" +
    "📝 <b>Sample Broadcast:</b>\n" +
    "🎉 New update is available!\n" +
    "Hamari community ka part banne ke liye thank you.\n\n" +
    "🛡️ Actual broadcast controls sirf authorized admins ke liye hain.\n\n" +
    "💡 Ye showcase demo hai, real broadcast nahi."
}

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: "📝 Sample Message",
      callback_data: "BROADCAST_SAMPLE"
    }
  ],
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
function showBroadcastTest(text, buttons) {
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
showBroadcastTest(text, buttons)
