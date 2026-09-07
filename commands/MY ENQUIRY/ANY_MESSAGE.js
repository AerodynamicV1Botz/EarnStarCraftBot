/*CMD
  command: ANY_MESSAGE
  help: 
  need_reply: false
  auto_retry_time: 
  folder: MY ENQUIRY

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var uid = user.telegramid
var userData = Bot.getProperty("USER_" + uid) || {}

var step = userData.enquiryStep || ""

// Active enquiry check
if (
  step === 1 ||
  step === 2 ||
  step === 3
) {
  Bot.runCommand("ENQUIRY_HANDLER")
  return
}

// Normal message
var lang = userData.language || "hinglish"

Api.sendMessage({
  text:
    lang === "en"
      ? "👋 Please use the menu below to continue."
      : lang === "gu"
      ? "👋 Aagal vadhva mate niche nu menu use karo."
      : "👋 Aage continue karne ke liye niche menu use karo.",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🏠 Main Menu",
          callback_data: "BACK_MAIN_MENU"
        }
      ]
    ]
  }
})
