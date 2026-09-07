/*CMD
  command: CONTACT_TEAM
  help: 
  need_reply: false
  auto_retry_time: 
  folder: CONTACT

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 96 — UPDATED VERSION
// COMMAND NAME: CONTACT_TEAM
// STEP 5.2.3.1.1.3.1.13 — CONTACT TEAM
// 📁 MAIN MENU → 📁 SERVICES → 📁 SUPPORT
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid

var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

var username = "TeamEarnStar"

if (typeof request !== "undefined" && request && request.id) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

var text = ""
var buttons = [
  [
    {
      text: "💬 Contact @TeamEarnStar",
      url: "https://t.me/TeamEarnStar"
    }
  ],
  [
    {
      text: "🚀 Build My Bot",
      callback_data: "BUILD_CUSTOM"
    }
  ],
  [
    {
      text: "💰 Pricing",
      callback_data: "MENU_PRICING"
    }
  ],
  [
    {
      text: "❓ FAQ",
      callback_data: "MENU_FAQ"
    }
  ],
  [
    {
      text: "🏠 Main Menu",
      callback_data: "BACK_MAIN_MENU"
    }
  ]
]

// ==========================================
// 🇮🇳 HINGLISH
// ==========================================

if (lang === "hinglish") {
  text =
    "📞 <b>CONTACT EARNSTAR TEAM</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Aap directly hamari team se contact kar sakte hain.\n\n" +
    "💬 <b>Telegram:</b> @" + username + "\n\n" +
    "📋 <b>Aap kis liye contact kar sakte hain?</b>\n" +
    "• Bot development\n" +
    "• Custom project\n" +
    "• Pricing & quotation\n" +
    "• Existing project support\n" +
    "• Feature requests\n" +
    "• Business automation\n\n" +
    "⚡ <b>Quick Tip:</b>\n" +
    "Message mein apni requirement clearly likhein, taaki team aapko faster response de sake."
}

// ==========================================
// 🇬🇧 ENGLISH
// ==========================================

if (lang === "english") {
  text =
    "📞 <b>CONTACT EARNSTAR TEAM</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "You can contact our team directly for project-related assistance.\n\n" +
    "💬 <b>Telegram:</b> @" + username + "\n\n" +
    "📋 <b>You can contact us for:</b>\n" +
    "• Bot development\n" +
    "• Custom projects\n" +
    "• Pricing & quotations\n" +
    "• Existing project support\n" +
    "• Feature requests\n" +
    "• Business automation\n\n" +
    "⚡ <b>Quick Tip:</b>\n" +
    "Clearly describe your requirements in your message so our team can respond faster."
}

// ==========================================
// 🇮🇳 GUJARATI
// ==========================================

if (lang === "gujarati") {
  text =
    "📞 <b>EARNSTAR TEAM નો CONTACT</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Project અથવા bot સંબંધિત help માટે તમે અમારી team ને directly contact કરી શકો છો.\n\n" +
    "💬 <b>Telegram:</b> @" + username + "\n\n" +
    "📋 <b>તમે contact કરી શકો છો:</b>\n" +
    "• Bot development\n" +
    "• Custom project\n" +
    "• Pricing & quotation\n" +
    "• Existing project support\n" +
    "• Feature requests\n" +
    "• Business automation\n\n" +
    "⚡ <b>Quick Tip:</b>\n" +
    "તમારી requirement clearly message માં લખશો તો team તમને ઝડપથી response આપી શકશે."
}

// ==========================================
// 📩 SHOW CONTACT TEAM
// ==========================================

function showContactTeam() {
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

showContactTeam()
