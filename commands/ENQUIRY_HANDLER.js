/*CMD
  command: ENQUIRY_HANDLER
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

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
var text = message || ""

// ---------- CHECK ----------
if (!text || text.trim().length === 0) {
  return
}

// ---------- ROUTING ----------
if (step === 1) {
  // Name received
  Bot.runCommand("BUILD_NAME")

  return
}

if (step === 2) {
  // Contact received
  Bot.runCommand("BUILD_CONTACT")

  return
}

if (step === 3) {
  // Requirements received
  Bot.runCommand("BUILD_REQUIREMENTS")

  return
}

// ---------- NO ACTIVE ENQUIRY ----------
if (!step || step === "completed") {
  var lang = userData.language || "hinglish"

  var textMessage = {
    hinglish:
      "👋 <b>Welcome back!</b>\n\n" + "Main menu se koi option select karo.",

    en:
      "👋 <b>Welcome back!</b>\n\n" +
      "Please select an option from the main menu.",

    gu:
      "👋 <b>Welcome back!</b>\n\n" + "Main menu mathi koi option select karo."
  }

  Api.sendMessage({
    text: textMessage[lang] || textMessage.hinglish,
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

  return
}

