/*CMD
  command: COMMUNITY_REQUEST
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
// SCRIPT 130 — UPDATED VERSION
// COMMAND NAME: COMMUNITY_REQUEST
// STEP 5.4.3 — COMMUNITY MEMBER REQUEST DEMO
// 📁 Live Demos → Community Demo → Member Request
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
    "📝 <b>MEMBER REQUEST DEMO</b>\n\n" +
    "🤖 A simple request system allows community members to submit their needs through the bot.\n\n" +
    "✨ <b>Request Types:</b>\n" +
    "• 🆘 Need help\n" +
    "• 💬 Ask a question\n" +
    "• 📢 Submit a suggestion\n" +
    "• 🛠️ Report a problem\n" +
    "• 👑 Contact an admin\n\n" +
    "📋 <b>Demo Request Flow:</b>\n" +
    "1️⃣ Member selects a request type\n" +
    "2️⃣ Bot collects the request details\n" +
    "3️⃣ Request is sent to the admin team\n" +
    "4️⃣ Admin reviews the request\n" +
    "5️⃣ Member receives a response\n\n" +
    "💡 This is a showcase demo. No real request will be submitted."

} else if (lang == "gujarati") {
  text =
    "📝 <b>MEMBER REQUEST DEMO</b>\n\n" +
    "🤖 Simple request system community members ને bot દ્વારા પોતાની જરૂરિયાત submit કરવાની સુવિધા આપે છે.\n\n" +
    "✨ <b>Request Types:</b>\n" +
    "• 🆘 મદદ જોઈએ\n" +
    "• 💬 પ્રશ્ન પૂછવો\n" +
    "• 📢 Suggestion આપવી\n" +
    "• 🛠️ Problem report કરવી\n" +
    "• 👑 Admin નો સંપર્ક કરવો\n\n" +
    "📋 <b>Demo Request Flow:</b>\n" +
    "1️⃣ Member request type પસંદ કરે છે\n" +
    "2️⃣ Bot request details લે છે\n" +
    "3️⃣ Request admin team ને મોકલાય છે\n" +
    "4️⃣ Admin request review કરે છે\n" +
    "5️⃣ Member ને response મળે છે\n\n" +
    "💡 આ showcase demo છે. કોઈ real request submit થશે નહીં."

} else {
  text =
    "📝 <b>MEMBER REQUEST DEMO</b>\n\n" +
    "🤖 Simple request system community members ko bot ke through apni need submit karne ki facility deta hai.\n\n" +
    "✨ <b>Request Types:</b>\n" +
    "• 🆘 Help chahiye\n" +
    "• 💬 Question poochna\n" +
    "• 📢 Suggestion dena\n" +
    "• 🛠️ Problem report karna\n" +
    "• 👑 Admin se contact karna\n\n" +
    "📋 <b>Demo Request Flow:</b>\n" +
    "1️⃣ Member request type select karta hai\n" +
    "2️⃣ Bot request details collect karta hai\n" +
    "3️⃣ Request admin team ko send hoti hai\n" +
    "4️⃣ Admin request review karta hai\n" +
    "5️⃣ Member ko response milta hai\n\n" +
    "💡 Ye showcase demo hai. Koi real request submit nahi hogi."
}

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: "🆘 Help Request",
      callback_data: "COMMUNITY_HELP"
    },
    {
      text: "💬 Ask Question",
      callback_data: "COMMUNITY_QUESTION"
    }
  ],
  [
    {
      text: "📢 Suggestion",
      callback_data: "COMMUNITY_SUGGESTION"
    },
    {
      text: "🛠️ Report Problem",
      callback_data: "COMMUNITY_REPORT"
    }
  ],
  [
    {
      text: "👑 Contact Admin",
      callback_data: "COMMUNITY_CONTACT"
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
      text: "👥 Community Menu",
      callback_data: "DEMO_COMMUNITY"
    },
    {
      text: "🎬 All Demos",
      callback_data: "MENU_DEMO"
    }
  ]
]

// ---------- SAME MESSAGE EDIT ----------
function showCommunityRequest(text, buttons) {
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

// ---------- SHOW REQUEST DEMO ----------
showCommunityRequest(text, buttons)
