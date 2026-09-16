/*CMD
  command: MENU_PRICING
  help: 
  need_reply: false
  auto_retry_time: 
  folder: MAINMENU

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/*CMD
  command: MENU_PRICING
  need_reply: false
  folder: MAIN_MENU
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 13 — MENU_PRICING
// STEP 2.2 — PRICING MENU
// PURPOSE: Show all available bot packages and pricing
// CONNECTIONS: MAIN_MENU / SERVICE PAGES → MENU_PRICING
// NEXT: PRICE_STARTER / PRICE_BUSINESS / PRICE_PRO / PRICE_CUSTOM
// =====================================================


// =====================================================
// ⚡ CALLBACK RESPONSE
// =====================================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  try {
    Api.answerCallbackQuery({
      callback_query_id: request.id
    })
  } catch (error) {}
}


// =====================================================
// 👤 USER DATA
// =====================================================

var userId = String(user.telegramid)

var userData = Bot.getProperty(
  "USER_" + userId
)

if (
  !userData ||
  typeof userData !== "object" ||
  Array.isArray(userData)
) {
  userData = {}
}


// =====================================================
// 🌐 LANGUAGE
// =====================================================

var language = userData.language || "hinglish"

if (
  language !== "hinglish" &&
  language !== "english" &&
  language !== "gujarati"
) {
  language = "hinglish"
}


// =====================================================
// 📝 USER ACTIVITY
// =====================================================

var now = new Date().toISOString()

userData.lastCommand = "MENU_PRICING"
userData.lastVisitedAt = now
userData.updatedAt = now

Bot.setProperty(
  "USER_" + userId,
  userData,
  "json"
)


// =====================================================
// 💬 CHAT + MESSAGE ID
// =====================================================

var chatId = userId
var messageId = null

if (
  typeof request !== "undefined" &&
  request &&
  request.message &&
  request.message.chat &&
  request.message.chat.id
) {
  chatId = request.message.chat.id
}

if (
  typeof request !== "undefined" &&
  request &&
  request.message &&
  request.message.message_id
) {
  messageId = request.message.message_id
}


// =====================================================
// 📝 TEXT + BUTTONS
// =====================================================

var text = ""
var buttons = []


// =====================================================
// 🇮🇳 HINGLISH
// =====================================================

if (language === "hinglish") {

  text =
    "💰 <b>EarnStar BOTCRAFT — Pricing</b>\n\n" +
    "Aapki requirement ke according package choose karo.\n\n" +

    "🟢 <b>STARTER — ₹499+</b>\n" +
    "• Basic Telegram Bot\n" +
    "• Welcome System\n" +
    "• Custom Buttons\n" +
    "• Basic Menu\n" +
    "• Basic Auto Reply\n\n" +

    "🔵 <b>BUSINESS — ₹1,499+</b>\n" +
    "• Everything in Starter\n" +
    "• Advanced Menus\n" +
    "• User Management\n" +
    "• Broadcast System\n" +
    "• Admin Controls\n" +
    "• Notifications\n" +
    "• Automated Forms\n\n" +

    "🟣 <b>PROFESSIONAL — ₹2,999+</b>\n" +
    "• Everything in Business\n" +
    "• Advanced Automation\n" +
    "• Referral System\n" +
    "• Membership / Access System\n" +
    "• Advanced Admin Features\n" +
    "• API / Webhook Integration\n" +
    "• Custom Workflows\n\n" +

    "💎 <b>CUSTOM — QUOTE</b>\n" +
    "• Unique Requirements\n" +
    "• Complex Automation\n" +
    "• Custom Integrations\n" +
    "• Advanced Business Solutions\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "📌 <b>Final price</b> features aur project complexity ke according confirm hota hai.\n\n" +

    "🚀 <b>Not sure which package you need?</b>\n" +
    "Build My Bot par apni requirement submit karo."

  buttons = [
    [
      {
        text: "🟢 Starter",
        callback_data: "PRICE_STARTER"
      },
      {
        text: "🔵 Business",
        callback_data: "PRICE_BUSINESS"
      }
    ],
    [
      {
        text: "🟣 Professional",
        callback_data: "PRICE_PRO"
      },
      {
        text: "💎 Custom",
        callback_data: "PRICE_CUSTOM"
      }
    ],
    [
      {
        text: "🚀 Build My Bot",
        callback_data: "MENU_BUILD"
      }
    ],
    [
      {
        text: "⬅️ Main Menu",
        callback_data: "MAIN_MENU"
      }
    ]
  ]
}


// =====================================================
// 🇬🇧 ENGLISH
// =====================================================

else if (language === "english") {

  text =
    "💰 <b>EarnStar BOTCRAFT — Pricing</b>\n\n" +
    "Choose a package based on your requirements.\n\n" +

    "🟢 <b>STARTER — ₹499+</b>\n" +
    "• Basic Telegram Bot\n" +
    "• Welcome System\n" +
    "• Custom Buttons\n" +
    "• Basic Menu\n" +
    "• Basic Auto Reply\n\n" +

    "🔵 <b>BUSINESS — ₹1,499+</b>\n" +
    "• Everything in Starter\n" +
    "• Advanced Menus\n" +
    "• User Management\n" +
    "• Broadcast System\n" +
    "• Admin Controls\n" +
    "• Notifications\n" +
    "• Automated Forms\n\n" +

    "🟣 <b>PROFESSIONAL — ₹2,999+</b>\n" +
    "• Everything in Business\n" +
    "• Advanced Automation\n" +
    "• Referral System\n" +
    "• Membership / Access System\n" +
    "• Advanced Admin Features\n" +
    "• API / Webhook Integration\n" +
    "• Custom Workflows\n\n" +

    "💎 <b>CUSTOM — QUOTE</b>\n" +
    "• Unique Requirements\n" +
    "• Complex Automation\n" +
    "• Custom Integrations\n" +
    "• Advanced Business Solutions\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "📌 <b>Final pricing</b> is confirmed according to features and project complexity.\n\n" +

    "🚀 <b>Not sure which package you need?</b>\n" +
    "Submit your requirements through Build My Bot."

  buttons = [
    [
      {
        text: "🟢 Starter",
        callback_data: "PRICE_STARTER"
      },
      {
        text: "🔵 Business",
        callback_data: "PRICE_BUSINESS"
      }
    ],
    [
      {
        text: "🟣 Professional",
        callback_data: "PRICE_PRO"
      },
      {
        text: "💎 Custom",
        callback_data: "PRICE_CUSTOM"
      }
    ],
    [
      {
        text: "🚀 Build My Bot",
        callback_data: "MENU_BUILD"
      }
    ],
    [
      {
        text: "⬅️ Main Menu",
        callback_data: "MAIN_MENU"
      }
    ]
  ]
}


// =====================================================
// 🇬🇺 GUJARATI
// =====================================================

else if (language === "gujarati") {

  text =
    "💰 <b>EarnStar BOTCRAFT — Pricing</b>\n\n" +
    "તમારી Requirement પ્રમાણે Package પસંદ કરો.\n\n" +

    "🟢 <b>STARTER — ₹499+</b>\n" +
    "• Basic Telegram Bot\n" +
    "• Welcome System\n" +
    "• Custom Buttons\n" +
    "• Basic Menu\n" +
    "• Basic Auto Reply\n\n" +

    "🔵 <b>BUSINESS — ₹1,499+</b>\n" +
    "• Starter ની બધી Features\n" +
    "• Advanced Menus\n" +
    "• User Management\n" +
    "• Broadcast System\n" +
    "• Admin Controls\n" +
    "• Notifications\n" +
    "• Automated Forms\n\n" +

    "🟣 <b>PROFESSIONAL — ₹2,999+</b>\n" +
    "• Business ની બધી Features\n" +
    "• Advanced Automation\n" +
    "• Referral System\n" +
    "• Membership / Access System\n" +
    "• Advanced Admin Features\n" +
    "• API / Webhook Integration\n" +
    "• Custom Workflows\n\n" +

    "💎 <b>CUSTOM — QUOTE</b>\n" +
    "• Unique Requirements\n" +
    "• Complex Automation\n" +
    "• Custom Integrations\n" +
    "• Advanced Business Solutions\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "📌 <b>Final price</b> features અને project complexity પ્રમાણે confirm થશે.\n\n" +

    "🚀 <b>કયો Package લેવો તે સમજાતું નથી?</b>\n" +
    "Build My Bot દ્વારા તમારી Requirement મોકલો."

  buttons = [
    [
      {
        text: "🟢 Starter",
        callback_data: "PRICE_STARTER"
      },
      {
        text: "🔵 Business",
        callback_data: "PRICE_BUSINESS"
      }
    ],
    [
      {
        text: "🟣 Professional",
        callback_data: "PRICE_PRO"
      },
      {
        text: "💎 Custom",
        callback_data: "PRICE_CUSTOM"
      }
    ],
    [
      {
        text: "🚀 મારું Bot બનાવો",
        callback_data: "MENU_BUILD"
      }
    ],
    [
      {
        text: "⬅️ Main Menu",
        callback_data: "MAIN_MENU"
      }
    ]
  ]
}


// =====================================================
// 🔄 SAME MESSAGE EDIT SYSTEM
// =====================================================

if (messageId) {

  try {

    Api.editMessageText({
      chat_id: chatId,
      message_id: messageId,
      text: text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: buttons
      }
    })

  } catch (error) {

    try {

      Api.deleteMessage({
        chat_id: chatId,
        message_id: messageId
      })

    } catch (deleteError) {}

    Api.sendMessage({
      chat_id: chatId,
      text: text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: buttons
      }
    })
  }

}


// =====================================================
// 📩 DIRECT COMMAND MESSAGE
// =====================================================

else {

  Api.sendMessage({
    chat_id: chatId,
    text: text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons
    }
  })

}
