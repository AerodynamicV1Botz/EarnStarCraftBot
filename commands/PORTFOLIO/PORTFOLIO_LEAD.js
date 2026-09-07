/*CMD
  command: PORTFOLIO_LEAD
  help: 
  need_reply: false
  auto_retry_time: 
  folder: PORTFOLIO

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 193 — UPDATED VERSION
// COMMAND NAME: PORTFOLIO_LEAD
// STEP 6.6 — LEAD COLLECTION SYSTEMS
// 📁 Portfolio → Lead Collection
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid

var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// ==========================================
// 🔔 CALLBACK ANSWER
// ==========================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

// ==========================================
// 📝 LANGUAGE TEXT
// ==========================================

var text = ""

if (lang == "english") {
  text =
    "🎯 <b>LEAD COLLECTION SYSTEMS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "A Telegram bot can collect potential customer information and enquiries in a structured workflow.\n\n" +
    "✨ <b>Example Features:</b>\n" +
    "• Lead capture forms\n" +
    "• Name & contact collection\n" +
    "• Service selection\n" +
    "• Requirement collection\n" +
    "• Automatic reference IDs\n" +
    "• Admin notifications\n" +
    "• Lead status tracking\n" +
    "• Search & management\n" +
    "• Custom enquiry workflows\n\n" +
    "🎯 <b>Best For:</b>\n" +
    "Businesses, freelancers, agencies, service providers and online projects.\n\n" +
    "💡 Automatically collecting leads can make follow-up and management easier for admins.\n\n" +
    "🚀 <b>Want a lead system?</b>\n" +
    "Share your requirements and start your project."
} else if (lang == "gujarati") {
  text =
    "🎯 <b>LEAD COLLECTION SYSTEMS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Telegram bot દ્વારા potential customers ની information અને enquiries ને structured રીતે collect કરી શકાય છે.\n\n" +
    "✨ <b>Example Features:</b>\n" +
    "• Lead capture forms\n" +
    "• Name & contact collection\n" +
    "• Service selection\n" +
    "• Requirement collection\n" +
    "• Automatic reference IDs\n" +
    "• Admin notifications\n" +
    "• Lead status tracking\n" +
    "• Search & management\n" +
    "• Custom enquiry workflows\n\n" +
    "🎯 <b>Best For:</b>\n" +
    "Businesses, freelancers, agencies, service providers અને online projects.\n\n" +
    "💡 Leads automatically collect કરીને admin માટે follow-up process ને organized બનાવી શકાય છે.\n\n" +
    "🚀 <b>Lead system જોઈએ છે?</b>\n" +
    "તમારી requirements share કરો અને project શરૂ કરો."
} else {
  text =
    "🎯 <b>LEAD COLLECTION SYSTEMS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Telegram bot ke through potential customers ki information aur enquiries ko structured way mein collect kiya ja sakta hai.\n\n" +
    "✨ <b>Example Features:</b>\n" +
    "• Lead capture forms\n" +
    "• Name & contact collection\n" +
    "• Service selection\n" +
    "• Requirement collection\n" +
    "• Automatic reference IDs\n" +
    "• Admin notifications\n" +
    "• Lead status tracking\n" +
    "• Search & management\n" +
    "• Custom enquiry workflows\n\n" +
    "🎯 <b>Best For:</b>\n" +
    "Businesses, freelancers, agencies, service providers aur online projects.\n\n" +
    "💡 Leads ko automatically collect karke admin ke liye follow-up process ko organized banaya ja sakta hai.\n\n" +
    "🚀 <b>Want a lead system?</b>\n" +
    "Apni requirements share karein aur project start karein."
}

// ==========================================
// 🔘 BUTTON TEXT
// ==========================================

var buildLead = "🚀 Build Lead System"
var viewDemos = "🎬 View Demos"
var pricing = "💰 Pricing"
var portfolio = "📁 Portfolio"
var mainMenu = "🏠 Main Menu"

if (lang == "gujarati") {
  buildLead = "🚀 Lead System બનાવો"
  viewDemos = "🎬 Demos જુઓ"
  pricing = "💰 Pricing"
  portfolio = "📁 Portfolio"
  mainMenu = "🏠 મુખ્ય મેનુ"
}

// ==========================================
// 🔘 INLINE BUTTONS
// ==========================================

var buttons = [
  [
    {
      text: buildLead,
      callback_data: "BUILD_LEAD"
    }
  ],
  [
    {
      text: viewDemos,
      callback_data: "MENU_DEMO"
    }
  ],
  [
    {
      text: pricing,
      callback_data: "MENU_PRICING"
    }
  ],
  [
    {
      text: portfolio,
      callback_data: "MENU_PORTFOLIO"
    }
  ],
  [
    {
      text: mainMenu,
      callback_data: "BACK_MAIN_MENU"
    }
  ]
]

// ==========================================
// ✏️ SAME MESSAGE EDIT + DELETE FALLBACK
// ==========================================

function showLeadPortfolio(messageText, inlineButtons) {
  if (
    typeof request !== "undefined" &&
    request.message &&
    request.message.message_id
  ) {
    try {
      Api.editMessageText({
        chat_id: uid,
        message_id: request.message.message_id,
        text: messageText,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: inlineButtons
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
    text: messageText,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: inlineButtons
    }
  })
}

// ==========================================
// 🚀 SHOW LEAD PORTFOLIO
// ==========================================

showLeadPortfolio(text, buttons)
