/*CMD
  command: MENU_BUILD
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
// SCRIPT 194 — UPDATED VERSION
// COMMAND NAME: MENU_BUILD
// STEP 7 — BUILD MY BOT
// 📁 Build Menu
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid

var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

var text = ""
var buttons = []

// ==========================================
// 🇬🇧 ENGLISH
// ==========================================

if (lang == "english") {
  text =
    "🚀 <b>BUILD MY BOT</b>\n\n" +
    "💎 Ready to turn your idea into a Telegram bot?\n\n" +
    "Tell us what you need and our team will review your requirements.\n\n" +
    "✨ <b>We can build:</b>\n" +
    "• 🤖 Custom Telegram Bots\n" +
    "• ⚙️ Business Automation\n" +
    "• 💬 Customer Support Systems\n" +
    "• 📢 Broadcast Systems\n" +
    "• 👥 Community Management\n" +
    "• 📝 Lead Collection Systems\n" +
    "• 🛠️ Custom Solutions\n\n" +
    "📋 <b>What happens next?</b>\n" +
    "1️⃣ Choose your project type\n" +
    "2️⃣ Tell us your requirements\n" +
    "3️⃣ Our team reviews your request\n" +
    "4️⃣ We discuss features & pricing\n" +
    "5️⃣ Development starts after confirmation\n\n" +
    "🔐 Your enquiry will be handled professionally.\n\n" +
    "👇 Choose an option below."

  buttons = [
    [
      {
        text: "🤖 Custom Bot",
        callback_data: "BUILD_CUSTOM"
      },
      {
        text: "⚙️ Automation",
        callback_data: "BUILD_AUTOMATION"
      }
    ],
    [
      {
        text: "💬 Support Bot",
        callback_data: "BUILD_SUPPORT"
      },
      {
        text: "📢 Broadcast",
        callback_data: "BUILD_BROADCAST"
      }
    ],
    [
      {
        text: "👥 Community",
        callback_data: "BUILD_COMMUNITY"
      },
      {
        text: "📝 Lead System",
        callback_data: "BUILD_LEAD"
      }
    ],
    [
      {
        text: "💎 Custom Project",
        callback_data: "BUILD_PROJECT"
      }
    ],
    [
      {
        text: "💰 View Pricing",
        callback_data: "MENU_PRICING"
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
// 🇬🇺 GUJARATI
// ==========================================

} else if (lang == "gujarati") {
  text =
    "🚀 <b>BUILD MY BOT</b>\n\n" +
    "💎 તમારી idea ને Telegram bot માં convert કરવા ready છો?\n\n" +
    "તમારી requirements મોકલો અને અમારી team તેને review કરશે.\n\n" +
    "✨ <b>અમે બનાવી શકીએ છીએ:</b>\n" +
    "• 🤖 Custom Telegram Bots\n" +
    "• ⚙️ Business Automation\n" +
    "• 💬 Customer Support Systems\n" +
    "• 📢 Broadcast Systems\n" +
    "• 👥 Community Management\n" +
    "• 📝 Lead Collection Systems\n" +
    "• 🛠️ Custom Solutions\n\n" +
    "📋 <b>આગળ શું થશે?</b>\n" +
    "1️⃣ Project type પસંદ કરો\n" +
    "2️⃣ તમારી requirements જણાવો\n" +
    "3️⃣ અમારી team request review કરશે\n" +
    "4️⃣ Features અને pricing discuss થશે\n" +
    "5️⃣ Confirmation પછી development શરૂ થશે\n\n" +
    "🔐 તમારી enquiry professionally handle કરવામાં આવશે.\n\n" +
    "👇 નીચે option પસંદ કરો."

  buttons = [
    [
      {
        text: "🤖 Custom Bot",
        callback_data: "BUILD_CUSTOM"
      },
      {
        text: "⚙️ Automation",
        callback_data: "BUILD_AUTOMATION"
      }
    ],
    [
      {
        text: "💬 Support Bot",
        callback_data: "BUILD_SUPPORT"
      },
      {
        text: "📢 Broadcast",
        callback_data: "BUILD_BROADCAST"
      }
    ],
    [
      {
        text: "👥 Community",
        callback_data: "BUILD_COMMUNITY"
      },
      {
        text: "📝 Lead System",
        callback_data: "BUILD_LEAD"
      }
    ],
    [
      {
        text: "💎 Custom Project",
        callback_data: "BUILD_PROJECT"
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
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]

// ==========================================
// 🇮🇳 HINGLISH
// ==========================================

} else {
  text =
    "🚀 <b>BUILD MY BOT</b>\n\n" +
    "💎 Apni idea ko Telegram bot mein convert karne ke liye ready ho?\n\n" +
    "Apni requirements bhejo aur hamari team unhe review karegi.\n\n" +
    "✨ <b>Hum bana sakte hain:</b>\n" +
    "• 🤖 Custom Telegram Bots\n" +
    "• ⚙️ Business Automation\n" +
    "• 💬 Customer Support Systems\n" +
    "• 📢 Broadcast Systems\n" +
    "• 👥 Community Management\n" +
    "• 📝 Lead Collection Systems\n" +
    "• 🛠️ Custom Solutions\n\n" +
    "📋 <b>Next kya hoga?</b>\n" +
    "1️⃣ Project type choose karo\n" +
    "2️⃣ Apni requirements batao\n" +
    "3️⃣ Hamari team request review karegi\n" +
    "4️⃣ Features & pricing discuss hoga\n" +
    "5️⃣ Confirmation ke baad development start hoga\n\n" +
    "🔐 Aapki enquiry professionally handle ki jayegi.\n\n" +
    "👇 Neeche option choose karo."

  buttons = [
    [
      {
        text: "🤖 Custom Bot",
        callback_data: "BUILD_CUSTOM"
      },
      {
        text: "⚙️ Automation",
        callback_data: "BUILD_AUTOMATION"
      }
    ],
    [
      {
        text: "💬 Support Bot",
        callback_data: "BUILD_SUPPORT"
      },
      {
        text: "📢 Broadcast",
        callback_data: "BUILD_BROADCAST"
      }
    ],
    [
      {
        text: "👥 Community",
        callback_data: "BUILD_COMMUNITY"
      },
      {
        text: "📝 Lead System",
        callback_data: "BUILD_LEAD"
      }
    ],
    [
      {
        text: "💎 Custom Project",
        callback_data: "BUILD_PROJECT"
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
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ]
}

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
// 📤 SEND / EDIT BUILD MENU
// ==========================================

var replyMarkup = {
  inline_keyboard: buttons
}

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
      reply_markup: replyMarkup
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
  reply_markup: replyMarkup
})
