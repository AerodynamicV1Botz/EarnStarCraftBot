/*CMD
  command: ECOM_ADMIN
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
// SCRIPT 64 — UPDATED VERSION
// COMMAND NAME: ECOM_ADMIN
// STEP 5.1.5 — E-COMMERCE ADMIN DEMO
// 📁 MAIN MENU → 📁 LIVE DEMOS → 📁 E-COMMERCE
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ✅ Same Message Edit + Delete Fallback
// ==========================================

var uid = user.telegramid

var userData = Bot.getProperty("USER_" + uid) || {}
var lang = userData.language || "hinglish"

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  Api.answerCallbackQuery({
    callback_query_id: request.id
  })
}

var text = ""

if (lang === "english") {

  text =
    "👑 <b>E-COMMERCE ADMIN DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "A dedicated admin system can give the business owner control over the complete bot workflow.\n\n" +
    "📦 <b>Order Management</b>\n" +
    "• View new orders\n" +
    "• Update order status\n" +
    "• Track order history\n\n" +
    "🛍️ <b>Product Management</b>\n" +
    "• Add products\n" +
    "• Update prices\n" +
    "• Manage catalogue\n\n" +
    "👥 <b>Customer Management</b>\n" +
    "• View customers\n" +
    "• Search customer records\n" +
    "• Review enquiries\n\n" +
    "📊 <b>Business Overview</b>\n" +
    "• Orders statistics\n" +
    "• Customer activity\n" +
    "• Enquiry tracking\n\n" +
    "📢 <b>Communication</b>\n" +
    "• Send announcements\n" +
    "• Customer notifications\n" +
    "• Business updates\n\n" +
    "🔐 <b>Admin Controls</b>\n" +
    "Access permissions and management features can be configured according to the project.\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "✨ This is a showcase demo. The actual admin panel is customized for each business."

} else if (lang === "gujarati") {

  text =
    "👑 <b>E-COMMERCE ADMIN DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Dedicated admin system દ્વારા business owner complete bot workflow control કરી શકે છે.\n\n" +
    "📦 <b>Order Management</b>\n" +
    "• New orders જુઓ\n" +
    "• Order status update કરો\n" +
    "• Order history track કરો\n\n" +
    "🛍️ <b>Product Management</b>\n" +
    "• Products add કરો\n" +
    "• Prices update કરો\n" +
    "• Catalogue manage કરો\n\n" +
    "👥 <b>Customer Management</b>\n" +
    "• Customers જુઓ\n" +
    "• Customer records search કરો\n" +
    "• Enquiries review કરો\n\n" +
    "📊 <b>Business Overview</b>\n" +
    "• Orders statistics\n" +
    "• Customer activity\n" +
    "• Enquiry tracking\n\n" +
    "📢 <b>Communication</b>\n" +
    "• Announcements મોકલો\n" +
    "• Customer notifications\n" +
    "• Business updates\n\n" +
    "🔐 <b>Admin Controls</b>\n" +
    "Access permissions અને management features project પ્રમાણે configure કરી શકાય છે.\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "✨ આ showcase demo છે. Actual admin panel દરેક business માટે customize કરી શકાય છે."

} else {

  text =
    "👑 <b>E-COMMERCE ADMIN DEMO</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Dedicated admin system se business owner complete bot workflow control kar sakta hai.\n\n" +
    "📦 <b>Order Management</b>\n" +
    "• New orders view karna\n" +
    "• Order status update karna\n" +
    "• Order history track karna\n\n" +
    "🛍️ <b>Product Management</b>\n" +
    "• Products add karna\n" +
    "• Prices update karna\n" +
    "• Catalogue manage karna\n\n" +
    "👥 <b>Customer Management</b>\n" +
    "• Customers view karna\n" +
    "• Customer records search karna\n" +
    "• Enquiries review karna\n\n" +
    "📊 <b>Business Overview</b>\n" +
    "• Orders statistics\n" +
    "• Customer activity\n" +
    "• Enquiry tracking\n\n" +
    "📢 <b>Communication</b>\n" +
    "• Announcements send karna\n" +
    "• Customer notifications\n" +
    "• Business updates\n\n" +
    "🔐 <b>Admin Controls</b>\n" +
    "Access permissions aur management features project ke according configure kiye ja sakte hain.\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "✨ Ye showcase demo hai. Actual admin panel har business ke according customize kiya jayega."
}

var buttons = [

  [
    {
      text: lang === "english"
        ? "📦 Order Flow"
        : lang === "gujarati"
        ? "📦 ઓર્ડર ફ્લો"
        : "📦 Order Flow",
      callback_data: "ECOM_ORDER_FLOW"
    },
    {
      text: lang === "english"
        ? "👤 Customer"
        : lang === "gujarati"
        ? "👤 ગ્રાહક"
        : "👤 Customer",
      callback_data: "ECOM_CUSTOMER"
    }
  ],

  [
    {
      text: lang === "english"
        ? "🔔 Notifications"
        : lang === "gujarati"
        ? "🔔 નોટિફિકેશન"
        : "🔔 Notifications",
      callback_data: "ECOM_NOTIFICATIONS"
    }
  ],

  [
    {
      text: lang === "english"
        ? "🚀 Build Similar Bot"
        : lang === "gujarati"
        ? "🚀 આવો બોટ બનાવો"
        : "🚀 Build Similar Bot",
      callback_data: "BUILD_CUSTOM"
    }
  ],

  [
    {
      text: lang === "english"
        ? "🛒 Products"
        : lang === "gujarati"
        ? "🛒 પ્રોડક્ટ્સ"
        : "🛒 Products",
      callback_data: "ECOM_PRODUCTS"
    },
    {
      text: lang === "english"
        ? "🎬 E-Commerce Demo"
        : lang === "gujarati"
        ? "🎬 ઈ-કોમર્સ ડેમો"
        : "🎬 E-Commerce Demo",
      callback_data: "DEMO_ECOMMERCE"
    }
  ],

  [
    {
      text: lang === "english"
        ? "💰 Pricing"
        : lang === "gujarati"
        ? "💰 કિંમત"
        : "💰 Pricing",
      callback_data: "MENU_PRICING"
    }
  ],

  [
    {
      text: lang === "english"
        ? "🎬 All Demos"
        : lang === "gujarati"
        ? "🎬 બધા ડેમો"
        : "🎬 All Demos",
      callback_data: "MENU_DEMO"
    },
    {
      text: lang === "english"
        ? "🏠 Main Menu"
        : lang === "gujarati"
        ? "🏠 મુખ્ય મેનુ"
        : "🏠 Main Menu",
      callback_data: "BACK_MAIN_MENU"
    }
  ]

]

function showAdminMenu() {

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

showAdminMenu()
