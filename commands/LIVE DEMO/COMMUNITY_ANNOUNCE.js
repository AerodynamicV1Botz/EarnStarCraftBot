/*CMD
  command: COMMUNITY_ANNOUNCE
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
// SCRIPT 131 — UPDATED VERSION
// COMMAND NAME: COMMUNITY_ANNOUNCE
// STEP 5.4.4 — COMMUNITY ANNOUNCEMENTS DEMO
// 📁 Live Demos → Community Demo → Announcements
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
    "📢 <b>COMMUNITY ANNOUNCEMENTS DEMO</b>\n\n" +
    "🤖 A centralized announcement system helps admins share important updates with community members.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 📢 New announcements\n" +
    "• 🔔 Important notifications\n" +
    "• 📅 Scheduled updates\n" +
    "• 📌 Pinned information\n" +
    "• 👥 Targeted member updates\n" +
    "• 📝 Custom announcement messages\n" +
    "• 🛡️ Admin-only publishing\n\n" +
    "📰 <b>Sample Announcement:</b>\n\n" +
    "🎉 Community Update!\n" +
    "A new feature has been added to our community bot.\n" +
    "Please check the latest information and stay connected.\n\n" +
    "💡 This is a showcase demo. No real announcement will be sent."

} else if (lang == "gujarati") {
  text =
    "📢 <b>COMMUNITY ANNOUNCEMENTS DEMO</b>\n\n" +
    "🤖 Centralized announcement system admin ને community members સાથે important updates share કરવામાં મદદ કરે છે.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 📢 New announcements\n" +
    "• 🔔 Important notifications\n" +
    "• 📅 Scheduled updates\n" +
    "• 📌 Pinned information\n" +
    "• 👥 Targeted member updates\n" +
    "• 📝 Custom announcement messages\n" +
    "• 🛡️ Admin-only publishing\n\n" +
    "📰 <b>Sample Announcement:</b>\n\n" +
    "🎉 Community Update!\n" +
    "અમારી community bot માં એક નવું feature ઉમેરવામાં આવ્યું છે.\n" +
    "Latest information જુઓ અને connected રહો.\n\n" +
    "💡 આ showcase demo છે. કોઈ real announcement મોકલવામાં આવશે નહીં."

} else {
  text =
    "📢 <b>COMMUNITY ANNOUNCEMENTS DEMO</b>\n\n" +
    "🤖 Centralized announcement system admin ko community members ke saath important updates share karne mein help karta hai.\n\n" +
    "✨ <b>Demo Features:</b>\n" +
    "• 📢 New announcements\n" +
    "• 🔔 Important notifications\n" +
    "• 📅 Scheduled updates\n" +
    "• 📌 Pinned information\n" +
    "• 👥 Targeted member updates\n" +
    "• 📝 Custom announcement messages\n" +
    "• 🛡️ Admin-only publishing\n\n" +
    "📰 <b>Sample Announcement:</b>\n\n" +
    "🎉 Community Update!\n" +
    "Hamari community bot mein ek naya feature add hua hai.\n" +
    "Latest information check karo aur connected raho.\n\n" +
    "💡 Ye showcase demo hai. Koi real announcement send nahi hoga."
}

// ---------- BUTTONS ----------
var buttons = [
  [
    {
      text: "👋 Welcome Demo",
      callback_data: "COMMUNITY_WELCOME"
    },
    {
      text: "📋 Rules & Info",
      callback_data: "COMMUNITY_RULES"
    }
  ],
  [
    {
      text: "📝 Member Request",
      callback_data: "COMMUNITY_REQUEST"
    },
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
function showCommunityAnnounce(text, buttons) {
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

// ---------- SHOW ANNOUNCEMENT DEMO ----------
showCommunityAnnounce(text, buttons)
