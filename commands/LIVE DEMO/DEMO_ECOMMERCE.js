/*CMD
  command: DEMO_ECOMMERCE
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

/*CMD
  command: DEMO_ECOMMERCE
  need_reply: false
  folder: MAIN_MENU
*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 59 — DEMO E-COMMERCE
// STEP 5.1
// ==========================================

var uid = String(user.telegramid)

var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

// ==========================================
// ⚡ CALLBACK RESPONSE
// ==========================================

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

// ==========================================
// 🔧 SHOW MENU
// ==========================================

function showEcommerceMenu(text, buttons) {

  var messageId = ""

  if (
    typeof request !== "undefined" &&
    request &&
    request.message
  ) {
    if (request.message.message_id) {
      messageId = String(request.message.message_id)
    } else if (request.message.messageId) {
      messageId = String(request.message.messageId)
    }
  }

  if (messageId) {

    try {

      Api.editMessageText({
        chat_id: uid,
        message_id: messageId,
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
          message_id: messageId
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

// ==========================================
// 🎛️ ONLY NAVIGATION BUTTONS
// ==========================================

var demoButtons = [
  [
    {
      text: "🎬 All Demos",
      callback_data: "MENU_DEMO"
    },
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

  var text =
    "🛒 <b>E-COMMERCE BOT DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "✨ Telegram par ek complete online store bot aise work kar sakta hai.\n\n" +

    "📦 <b>Products</b>\n" +
    "Customers products browse kar sakte hain aur product details dekh sakte hain.\n\n" +

    "🛍️ <b>Orders</b>\n" +
    "Customer product select karke order request submit kar sakta hai.\n\n" +

    "👤 <b>Customer System</b>\n" +
    "Customer name, contact details aur order information collect ki ja sakti hai.\n\n" +

    "🔔 <b>Notifications</b>\n" +
    "Order confirmation aur important updates automatically send kiye ja sakte hain.\n\n" +

    "👑 <b>Admin Control</b>\n" +
    "Admin products, orders, customers aur order status manage kar sakta hai.\n\n" +

    "💡 <b>Use Case</b>\n" +
    "Clothing store, digital products, local business, services aur community-based selling ke liye useful.\n\n" +

    "🚀 <b>Custom Version</b>\n" +
    "Aapke business ke according complete custom E-Commerce Bot banaya ja sakta hai."
}

// ==========================================
// 🇬🇧 ENGLISH
// ==========================================

else if (lang === "english") {

  var text =
    "🛒 <b>E-COMMERCE BOT DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "✨ Explore how a complete online store bot can work inside Telegram.\n\n" +

    "📦 <b>Products</b>\n" +
    "Customers can browse products and view product details.\n\n" +

    "🛍️ <b>Orders</b>\n" +
    "Customers can select products and submit order requests.\n\n" +

    "👤 <b>Customer System</b>\n" +
    "Customer names, contact details and order information can be collected.\n\n" +

    "🔔 <b>Notifications</b>\n" +
    "Order confirmations and important updates can be sent automatically.\n\n" +

    "👑 <b>Admin Control</b>\n" +
    "Admins can manage products, orders, customers and order status.\n\n" +

    "💡 <b>Use Case</b>\n" +
    "Useful for clothing stores, digital products, local businesses, services and community-based selling.\n\n" +

    "🚀 <b>Custom Version</b>\n" +
    "A complete custom E-Commerce Bot can be built according to your business."
}

// ==========================================
// 🇬🇺 GUJARATI
// ==========================================

else {

  var text =
    "🛒 <b>E-COMMERCE BOT DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "✨ Telegram માં complete online store bot કેવી રીતે કામ કરી શકે તેનું demo.\n\n" +

    "📦 <b>Products</b>\n" +
    "Customers products browse કરી શકે છે અને details જોઈ શકે છે.\n\n" +

    "🛍️ <b>Orders</b>\n" +
    "Customer product select કરીને order request submit કરી શકે છે.\n\n" +

    "👤 <b>Customer System</b>\n" +
    "Customer name, contact details અને order information collect કરી શકાય છે.\n\n" +

    "🔔 <b>Notifications</b>\n" +
    "Order confirmation અને important updates automatically મોકલી શકાય છે.\n\n" +

    "👑 <b>Admin Control</b>\n" +
    "Admin products, orders, customers અને order status manage કરી શકે છે.\n\n" +

    "💡 <b>Use Case</b>\n" +
    "Clothing store, digital products, local business, services અને community selling માટે ઉપયોગી.\n\n" +

    "🚀 <b>Custom Version</b>\n" +
    "તમારા business પ્રમાણે complete custom E-Commerce Bot બનાવી શકાય છે."
  }

// ==========================================
// 📤 SHOW FINAL DEMO
// ==========================================

showEcommerceMenu(text, demoButtons)
