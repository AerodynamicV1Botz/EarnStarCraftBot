/*CMD
  command: COMMUNITY_WELCOME
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
// SCRIPT 128 — UPDATED VERSION
// COMMAND NAME: COMMUNITY_WELCOME
// STEP 5.4.1 — COMMUNITY WELCOME DEMO
// 📁 Live Demos → Community Demo → Welcome Demo
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
    "👋 <b>WELCOME SYSTEM DEMO</b>\n\n" +
    "🤖 A friendly welcome system for new community members.\n\n" +
    "✨ <b>Demo Welcome Message:</b>\n\n" +
    "🎉 Welcome to <b>EarnStar Community</b>!\n\n" +
    "We are happy to have you here. 👋\n\n" +
    "📋 Please check the community rules.\n" +
    "💬 Introduce yourself and connect with members.\n" +
    "📢 Stay updated with important announcements.\n" +
    "🛡️ Contact an admin if you need help.\n\n" +
    "🌟 Enjoy your time with our community!\n\n" +
    "━━━━━━━━━━━━━━━━━━\n" +
    "✨ <b>Automated Welcome Features</b>\n" +
    "• New member greeting\n" +
    "• Community information\n" +
    "• Rules button\n" +
    "• Admin contact button\n" +
    "• Custom welcome message\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "💡 This is a showcase demo. No real welcome message will be sent."

} else if (lang == "gujarati") {
  text =
    "👋 <b>WELCOME SYSTEM DEMO</b>\n\n" +
    "🤖 નવા community members માટે friendly welcome system.\n\n" +
    "✨ <b>Demo Welcome Message:</b>\n\n" +
    "🎉 <b>EarnStar Community</b> માં આપનું સ્વાગત છે!\n\n" +
    "અમને તમને અહીં જોઈને આનંદ થયો. 👋\n\n" +
    "📋 Community rules જરૂરથી જુઓ.\n" +
    "💬 પોતાનો પરિચય આપો અને members સાથે connect થાઓ.\n" +
    "📢 Important announcements માટે connected રહો.\n" +
    "🛡️ મદદ જોઈએ તો admin નો સંપર્ક કરો.\n\n" +
    "🌟 અમારી community સાથે તમારો સમય આનંદમય રહે!\n\n" +
    "━━━━━━━━━━━━━━━━━━\n" +
    "✨ <b>Automated Welcome Features</b>\n" +
    "• New member greeting\n" +
    "• Community information\n" +
    "• Rules button\n" +
    "• Admin contact button\n" +
    "• Custom welcome message\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "💡 આ showcase demo છે. કોઈ real welcome message મોકલવામાં આવશે નહીં."

} else {
  text =
    "👋 <b>WELCOME SYSTEM DEMO</b>\n\n" +
    "🤖 New community members ke liye friendly welcome system.\n\n" +
    "✨ <b>Demo Welcome Message:</b>\n\n" +
    "🎉 <b>EarnStar Community</b> mein aapka welcome hai!\n\n" +
    "Humein khushi hai ki aap yahan aaye ho. 👋\n\n" +
    "📋 Community rules zaroor check karo.\n" +
    "💬 Apna introduction do aur members se connect karo.\n" +
    "📢 Important announcements ke liye connected raho.\n" +
    "🛡️ Help chahiye toh admin se contact karo.\n\n" +
    "🌟 Hamari community ke saath apna time enjoy karo!\n\n" +
    "━━━━━━━━━━━━━━━━━━\n" +
    "✨ <b>Automated Welcome Features</b>\n" +
    "• New member greeting\n" +
    "• Community information\n" +
    "• Rules button\n" +
    "• Admin contact button\n" +
    "• Custom welcome message\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "💡 Ye showcase demo hai. Koi real welcome message send nahi hoga."
}

// ---------- BUTTONS ----------
var buttons = [
  [
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
function showCommunityWelcome(text, buttons) {
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

// ---------- SHOW WELCOME DEMO ----------
showCommunityWelcome(text, buttons)
