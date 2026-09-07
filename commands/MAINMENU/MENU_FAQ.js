/*CMD
  command: MENU_FAQ
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

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 221 — UPDATED VERSION
// COMMAND NAME: MENU_FAQ
// STEP 8
// 📁 MENU_FAQ
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid

// ==========================================
// 👤 GET USER DATA
// ==========================================

var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

var text = ""
var buttons = []

// Support old and new language values
if (lang === "en") {
  lang = "english"
}

if (lang === "gu") {
  lang = "gujarati"
}

// ==========================================
// ❓ FAQ — HINGLISH
// ==========================================

if (lang === "hinglish") {

  text =
    "❓ <b>FREQUENTLY ASKED QUESTIONS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "EarnStar BOTCRAFT ke baare mein frequently asked questions ke answers yahan milenge.\n\n" +
    "🤖 <b>Bot Development</b>\n" +
    "Hum kis type ke Telegram bots bana sakte hain.\n\n" +
    "💰 <b>Pricing & Payment</b>\n" +
    "Bot ki price aur payment kaise decide hoti hai.\n\n" +
    "⏱️ <b>Delivery Time</b>\n" +
    "Project complete hone mein kitna time lag sakta hai.\n\n" +
    "🛠️ <b>Features & Customization</b>\n" +
    "Custom features aur business requirements ke according changes.\n\n" +
    "🔧 <b>Support & Revisions</b>\n" +
    "Development ke baad support aur revisions.\n\n" +
    "👇 <b>Apna question select karo:</b>"

  buttons = [
    [
      {
        text: "🤖 Bot mein kya-kya bana sakte ho?",
        callback_data: "FAQ_BOTS"
      }
    ],
    [
      {
        text: "💰 Price kaise decide hota hai?",
        callback_data: "FAQ_PRICING"
      }
    ],
    [
      {
        text: "⏱️ Delivery kitne time mein?",
        callback_data: "FAQ_DELIVERY"
      }
    ],
    [
      {
        text: "🛠️ Custom features add kar sakte ho?",
        callback_data: "FAQ_CUSTOM"
      }
    ],
    [
      {
        text: "🔧 Support / Revision kya hai?",
        callback_data: "FAQ_SUPPORT"
      }
    ],
    [
      {
        text: "📞 Aur koi question?",
        callback_data: "CONTACT_TEAM"
      }
    ],
    [
      {
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]

}

// ==========================================
// ❓ FAQ — ENGLISH
// ==========================================

else if (lang === "english") {

  text =
    "❓ <b>FREQUENTLY ASKED QUESTIONS</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Find answers to common questions about EarnStar BOTCRAFT.\n\n" +
    "🤖 <b>Bot Development</b>\n" +
    "Learn what types of Telegram bots we can build.\n\n" +
    "💰 <b>Pricing & Payment</b>\n" +
    "Understand how project pricing and payment are decided.\n\n" +
    "⏱️ <b>Delivery Time</b>\n" +
    "Learn how long a project may take to complete.\n\n" +
    "🛠️ <b>Features & Customization</b>\n" +
    "Ask about custom features and business-specific requirements.\n\n" +
    "🔧 <b>Support & Revisions</b>\n" +
    "Learn about support and revisions after development.\n\n" +
    "👇 <b>Choose your question below:</b>"

  buttons = [
    [
      {
        text: "🤖 What kind of bots can you build?",
        callback_data: "FAQ_BOTS"
      }
    ],
    [
      {
        text: "💰 How is the price decided?",
        callback_data: "FAQ_PRICING"
      }
    ],
    [
      {
        text: "⏱️ How long does delivery take?",
        callback_data: "FAQ_DELIVERY"
      }
    ],
    [
      {
        text: "🛠️ Can you add custom features?",
        callback_data: "FAQ_CUSTOM"
      }
    ],
    [
      {
        text: "🔧 What about support/revisions?",
        callback_data: "FAQ_SUPPORT"
      }
    ],
    [
      {
        text: "📞 Other question",
        callback_data: "CONTACT_TEAM"
      }
    ],
    [
      {
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]

}

// ==========================================
// ❓ FAQ — GUJARATI
// ==========================================

else if (lang === "gujarati") {

  text =
    "❓ <b>વારંવાર પૂછાતા પ્રશ્નો</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "EarnStar BOTCRAFT વિશે વારંવાર પૂછાતા પ્રશ્નોના જવાબ અહીં મળશે.\n\n" +
    "🤖 <b>Bot Development</b>\n" +
    "અમે કયા પ્રકારના Telegram bots બનાવી શકીએ છીએ.\n\n" +
    "💰 <b>Pricing અને Payment</b>\n" +
    "Bot ની કિંમત અને payment કેવી રીતે નક્કી થાય છે.\n\n" +
    "⏱️ <b>Delivery Time</b>\n" +
    "Project complete થવામાં કેટલો સમય લાગી શકે છે.\n\n" +
    "🛠️ <b>Features અને Customization</b>\n" +
    "Custom features અને business requirements પ્રમાણે changes.\n\n" +
    "🔧 <b>Support અને Revisions</b>\n" +
    "Development પછી support અને revisions વિશે માહિતી.\n\n" +
    "👇 <b>તમારો પ્રશ્ન પસંદ કરો:</b>"

  buttons = [
    [
      {
        text: "🤖 કયા પ્રકારના Bot બનાવી શકો?",
        callback_data: "FAQ_BOTS"
      }
    ],
    [
      {
        text: "💰 Price કેવી રીતે નક્કી થાય?",
        callback_data: "FAQ_PRICING"
      }
    ],
    [
      {
        text: "⏱️ Delivery કેટલા સમયમાં?",
        callback_data: "FAQ_DELIVERY"
      }
    ],
    [
      {
        text: "🛠️ Custom features ઉમેરી શકો?",
        callback_data: "FAQ_CUSTOM"
      }
    ],
    [
      {
        text: "🔧 Support / Revision મળે છે?",
        callback_data: "FAQ_SUPPORT"
      }
    ],
    [
      {
        text: "📞 બીજો કોઈ પ્રશ્ન?",
        callback_data: "CONTACT_TEAM"
      }
    ],
    [
      {
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]

}

// ==========================================
// 🔄 UNKNOWN LANGUAGE FALLBACK
// ==========================================

else {

  text =
    "❓ <b>FAQ</b>\n\n" +
    "Please choose your preferred language first."

  buttons = [
    [
      {
        text: "🌐 Change Language",
        callback_data: "CHANGE_LANGUAGE"
      }
    ],
    [
      {
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]

}

// ==========================================
// ✅ ANSWER CALLBACK
// ==========================================

if (typeof request !== "undefined" && request && request.id) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

// ==========================================
// 📤 SEND / EDIT FAQ MESSAGE
// ==========================================

function showMenu(messageText, keyboard) {

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
          inline_keyboard: keyboard
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
      inline_keyboard: keyboard
    }
  })

}

showMenu(text, buttons)
