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

/*CMD
  command: MENU_BUILD
  need_reply: false
  folder: Build Menu
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 194 — MENU_BUILD
// STEP 7
// BUILD MY BOT INTRODUCTION MENU
// =====================================================


// =====================================================
// 👤 USER DATA
// =====================================================

var uid = String(user.telegramid);

var userData =
  Bot.getProperty("USER_" + uid) || {};

var lang =
  userData.language || "hinglish";


// =====================================================
// 🌐 TEXT
// =====================================================

var text = "";


// =====================================================
// 🇬🇧 ENGLISH
// =====================================================

if (lang == "english") {

  text =
    "🚀 <b>BUILD MY BOT</b>\n\n" +

    "💎 Have an idea for a Telegram bot?\n\n" +

    "We can help turn your idea into a custom Telegram bot according to your requirements.\n\n" +

    "🛠️ We can build different types of bots, including business automation, customer support, broadcast, community management, referral, booking, enquiry and other custom solutions.\n\n" +

    "💡 <b>Have a different or unique idea?</b>\n\n" +

    "No problem. You can explain your idea to us, even if you are not sure how it should work. Our team will understand your concept, suggest a suitable solution and discuss how it can be developed.\n\n" +

    "🔍 <b>Have an example or reference bot?</b>\n\n" +

    "You can share an example bot, screenshot, video or explain its working process. We can study it and create a similar or improved custom bot according to your needs.\n\n" +

    "📨 Start your enquiry and share your idea with our team. We will review it and contact you to discuss the next steps.\n\n" +

    "🔐 <b>Your enquiry will be handled professionally.</b>\n\n" +

    "👇 <b>Choose an option</b>";


// =====================================================
// 🇮🇳 HINGLISH
// =====================================================

} else if (lang == "hinglish") {

  text =
    "🚀 <b>BUILD MY BOT</b>\n\n" +

    "💎 Kya aapke paas Telegram bot banane ka koi idea hai?\n\n" +

    "Hum aapke idea ko aapki requirements ke according ek custom Telegram bot mein convert karne mein help kar sakte hain.\n\n" +

    "🛠️ Hum business automation, customer support, broadcast, community management, referral, booking, enquiry aur other custom solutions jaise alag-alag type ke bots bana sakte hain.\n\n" +

    "💡 <b>Aapke paas koi alag ya unique idea hai?</b>\n\n" +

    "Koi problem nahi. Agar aapko ye bhi clear nahi hai ki bot kaise work karega, toh bhi aap apna idea humein explain kar sakte ho. Hamari team aapka concept samjhegi, suitable solution suggest karegi aur discuss karegi ki usko kaise develop kiya ja sakta hai.\n\n" +

    "🔍 <b>Kya aapke paas example ya reference bot hai?</b>\n\n" +

    "Aap koi example bot, screenshot, video ya uska working process share kar sakte ho. Hum usko study karke aapki requirements ke according similar ya improved custom bot bana sakte hain.\n\n" +

    "📨 Apni enquiry start karo aur apna idea hamari team ke saath share karo. Hum usko review karke next steps discuss karne ke liye aapse contact karenge.\n\n" +

    "🔐 <b>Aapki enquiry professionally handle ki jayegi.</b>\n\n" +

    "👇 <b>Option choose karo</b>";


// =====================================================
// 🇮🇳 GUJARATI
// =====================================================

} else if (lang == "gujarati") {

  text =
    "🚀 <b>BUILD MY BOT</b>\n\n" +

    "💎 Shu tamari pase Telegram bot banavvano koi idea chhe?\n\n" +

    "Ame tamara idea ne tamari requirements pramane custom Telegram bot ma convert karvama madad kari shakiye chhiye.\n\n" +

    "🛠️ Ame business automation, customer support, broadcast, community management, referral, booking, enquiry ane other custom solutions jeva alag-alag prakaarna bots banavi shakiye chhiye.\n\n" +

    "💡 <b>Tamari pase koi alag athva unique idea chhe?</b>\n\n" +

    "Koi problem nathi. Jo tamne bot kevi rite work karse te clear na hoy, to pan tame tamaro idea amne explain kari shako cho. Amari team tamaro concept samjhi ne suitable solution suggest karse ane tene kevi rite develop kari shakay te discuss karse.\n\n" +

    "🔍 <b>Tamari pase example athva reference bot chhe?</b>\n\n" +

    "Tame koi example bot, screenshot, video athva tena working process share kari shako cho. Ame tene study kari ne tamari requirements pramane similar athva improved custom bot banavi shakiye chhiye.\n\n" +

    "📨 Tamari enquiry start karo ane tamaro idea amari team sathe share karo. Ame tene review kari ne next steps discuss karva mate tamaro contact karishu.\n\n" +

    "🔐 <b>Tamari enquiry professionally handle karvama aavshe.</b>\n\n" +

    "👇 <b>Option pasand karo</b>";


// =====================================================
// 🌐 FALLBACK
// =====================================================

} else {

  text =
    "🚀 <b>BUILD MY BOT</b>\n\n" +

    "💎 Kya aapke paas Telegram bot banane ka koi idea hai?\n\n" +

    "Hum aapke idea ko aapki requirements ke according ek custom Telegram bot mein convert karne mein help kar sakte hain.\n\n" +

    "🛠️ Hum business automation, customer support, broadcast, community management, referral, booking, enquiry aur other custom solutions jaise alag-alag type ke bots bana sakte hain.\n\n" +

    "💡 <b>Aapke paas koi alag ya unique idea hai?</b>\n\n" +

    "Koi problem nahi. Agar aapko ye bhi clear nahi hai ki bot kaise work karega, toh bhi aap apna idea humein explain kar sakte ho. Hamari team aapka concept samjhegi, suitable solution suggest karegi aur discuss karegi ki usko kaise develop kiya ja sakta hai.\n\n" +

    "🔍 <b>Kya aapke paas example ya reference bot hai?</b>\n\n" +

    "Aap koi example bot, screenshot, video ya uska working process share kar sakte ho. Hum usko study karke aapki requirements ke according similar ya improved custom bot bana sakte hain.\n\n" +

    "📨 Apni enquiry start karo aur apna idea hamari team ke saath share karo. Hum usko review karke next steps discuss karne ke liye aapse contact karenge.\n\n" +

    "🔐 <b>Aapki enquiry professionally handle ki jayegi.</b>\n\n" +

    "👇 <b>Option choose karo</b>";

}


// =====================================================
// 🔘 BUTTONS
// =====================================================

var buttons = [];

if (lang == "english") {

  buttons = [
    [
      {
        text: "📋 Start Enquiry",
        callback_data: "BUILD_ENQUIRY"
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
        callback_data: "MAIN_MENU"
      }
    ]
  ];

} else {

  buttons = [
    [
      {
        text: "📋 Enquiry Start Karo",
        callback_data: "BUILD_ENQUIRY"
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
        callback_data: "MAIN_MENU"
      }
    ]
  ];

}


// =====================================================
// 🔘 ANSWER CALLBACK
// =====================================================

if (request.message) {

  try {

    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "Build My Bot"
    });

  } catch (e) {}

}


// =====================================================
// ✏️ CURRENT MESSAGE ID
// =====================================================

var currentMessageId = null;

if (
  request.message &&
  request.message.message_id
) {

  currentMessageId =
    request.message.message_id;

} else if (
  request.message &&
  request.message.messageId
) {

  currentMessageId =
    request.message.messageId;

}


// =====================================================
// 🔄 EDIT EXISTING MESSAGE
// =====================================================

var edited = false;

if (currentMessageId) {

  try {

    Api.editMessageText({
      chat_id: uid,
      message_id: currentMessageId,
      text: text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: buttons
      }
    });

    edited = true;

  } catch (e) {

    edited = false;

  }

}


// =====================================================
// 🗑️ FALLBACK: DELETE OLD MESSAGE
// =====================================================

if (!edited && currentMessageId) {

  try {

    Api.deleteMessage({
      chat_id: uid,
      message_id: currentMessageId
    });

  } catch (e) {

    try {

      Bot.deleteMessage(currentMessageId);

    } catch (e2) {}

  }

}


// =====================================================
// 📩 FALLBACK: SEND NEW MESSAGE
// =====================================================

if (!edited) {

  Api.sendMessage({
    chat_id: uid,
    text: text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: buttons
    }
  });

}


// =====================================================
// ✅ END SCRIPT 194
// =====================================================
