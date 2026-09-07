/*CMD
  command: COMMUNITY_RULES
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
// SCRIPT 129 — UPDATED VERSION
// COMMAND NAME: COMMUNITY_RULES
// STEP 5.4.2 — COMMUNITY RULES & INFO DEMO
// 📁 Live Demos → Community Demo → Rules & Info
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
    "📋 <b>COMMUNITY RULES & INFORMATION</b>\n\n" +
    "👋 Welcome to our community!\n\n" +
    "✨ <b>Community Rules:</b>\n" +
    "1️⃣ Respect all members.\n" +
    "2️⃣ No spam or unwanted promotions.\n" +
    "3️⃣ Do not share harmful or misleading content.\n" +
    "4️⃣ Keep conversations friendly and respectful.\n" +
    "5️⃣ Follow admin instructions.\n" +
    "6️⃣ Use the correct section for your requests.\n" +
    "7️⃣ Report problems to the admin team.\n\n" +
    "ℹ️ <b>Community Information:</b>\n" +
    "📢 Important announcements will be shared here.\n" +
    "💬 Members can ask questions and share ideas.\n" +
    "📝 Requests can be submitted through the bot.\n" +
    "🛡️ Admins are available for support.\n\n" +
    "💡 This is a showcase demo. Rules can be customized."

} else if (lang == "gujarati") {
  text =
    "📋 <b>COMMUNITY RULES & INFORMATION</b>\n\n" +
    "👋 અમારી community માં આપનું સ્વાગત છે!\n\n" +
    "✨ <b>Community Rules:</b>\n" +
    "1️⃣ બધા members નો આદર કરો.\n" +
    "2️⃣ Spam અથવા unwanted promotion ન કરો.\n" +
    "3️⃣ Harmful અથવા misleading content share ન કરો.\n" +
    "4️⃣ Conversation friendly અને respectful રાખો.\n" +
    "5️⃣ Admin ની instructions follow કરો.\n" +
    "6️⃣ Requests માટે યોગ્ય section નો ઉપયોગ કરો.\n" +
    "7️⃣ Problem હોય તો admin team ને જણાવો.\n\n" +
    "ℹ️ <b>Community Information:</b>\n" +
    "📢 Important announcements અહીં share થશે.\n" +
    "💬 Members questions અને ideas share કરી શકે છે.\n" +
    "📝 Bot દ્વારા requests submit કરી શકાય છે.\n" +
    "🛡️ Support માટે admins available છે.\n\n" +
    "💡 આ showcase demo છે. Rules customize કરી શકાય છે."

} else {
  text =
    "📋 <b>COMMUNITY RULES & INFORMATION</b>\n\n" +
    "👋 Hamari community mein aapka welcome hai!\n\n" +
    "✨ <b>Community Rules:</b>\n" +
    "1️⃣ Sabhi members ka respect karo.\n" +
    "2️⃣ Spam ya unwanted promotion mat karo.\n" +
    "3️⃣ Harmful ya misleading content share mat karo.\n" +
    "4️⃣ Conversation friendly aur respectful rakho.\n" +
    "5️⃣ Admin ki instructions follow karo.\n" +
    "6️⃣ Requests ke liye correct section use karo.\n" +
    "7️⃣ Problem ho toh admin team ko batao.\n\n" +
    "ℹ️ <b>Community Information:</b>\n" +
    "📢 Important announcements yahan share honge.\n" +
    "💬 Members questions aur ideas share kar sakte hain.\n" +
    "📝 Bot ke through requests submit kar sakte hain.\n" +
    "🛡️ Support ke liye admins available hain.\n\n" +
    "💡 Ye showcase demo hai. Rules customize kiye ja sakte hain."
}

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: "👋 Welcome Demo",
      callback_data: "COMMUNITY_WELCOME"
    }
  ],
  [
    {
      text: "📝 Member Request",
      callback_data: "COMMUNITY_REQUEST"
    },
    {
      text: "📢 Announcements",
      callback_data: "COMMUNITY_ANNOUNCE"
    }
  ],
  [
    {
      text: "🛡️ Admin Features",
      callback_data: "COMMUNITY_ADMIN"
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
function showCommunityRules(text, buttons) {
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

// ---------- SHOW RULES DEMO ----------
showCommunityRules(text, buttons)
