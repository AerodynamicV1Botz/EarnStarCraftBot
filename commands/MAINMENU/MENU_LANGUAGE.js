/*CMD
  command: MENU_LANGUAGE
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

// CMD: MENU_LANGUAGE

var uid = user.telegramid;
var userKey = "USER_" + uid;

var userData = Bot.getProperty(userKey) || {};

var currentLanguage = userData.language || "hinglish";

var text =
  "🌐 <b>Change Language</b>\n\n" +
  "Please select your preferred language.\n" +
  "अपनी पसंदीदा भाषा चुनें।\n" +
  "તમારી પસંદગીની ભાષા પસંદ કરો.\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  "Current language: " +
  (currentLanguage == "hinglish"
    ? "🇮🇳 Hinglish"
    : currentLanguage == "english"
    ? "🇬🇧 English"
    : "🇬🇺 Gujarati");

var buttons = [
  [
    {
      text: "🇮🇳 Hinglish",
      callback_data: "LANG_HINGLISH"
    }
  ],
  [
    {
      text: "🇬🇧 English",
      callback_data: "LANG_ENGLISH"
    }
  ],
  [
    {
      text: "🇬🇺 Gujarati",
      callback_data: "LANG_GUJARATI"
    }
  ],
  [
    {
      text: "🏠 Main Menu",
      callback_data: "BACK_MAIN_MENU"
    }
  ]
];

Api.sendMessage({
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
});
