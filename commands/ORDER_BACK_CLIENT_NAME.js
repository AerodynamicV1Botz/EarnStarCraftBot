/*CMD
  command: ORDER_BACK_CLIENT_NAME
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

/*CMD
  command: ORDER_BACK_CLIENT_NAME
  need_reply: false
  folder: command folder
*/

// ---------- USER ----------
var uid = user.telegramid
var orderKey = "ORDER_" + uid

// ---------- LOAD ORDER ----------
var draft = Bot.getProperty(orderKey)

if (!draft) {
  Api.sendMessage({
    chat_id: uid,
    text: "⚠️ Active order nahi mila. Please package dobara select karein."
  })

  Bot.runCommand("MAIN_MENU")
  return
}

// ---------- ALLOW ONLY ACTIVE DRAFT ----------
var allowedStatus =
  draft.requestStatus === "draft" ||
  draft.requestStatus === "review" ||
  draft.requestStatus === "submitted"

if (!allowedStatus) {
  Api.sendMessage({
    chat_id: uid,
    text: "⚠️ Is order mein ab client details change nahi ki ja sakti."
  })

  Bot.runCommand("ORDER_TRACK")
  return
}

// ---------- RESET CLIENT DETAILS ----------
draft.clientInfo = draft.clientInfo || {}
draft.clientInfo.customName = ""

draft.contacts = {
  telegram: "",
  otherNumber: "",
  instagram: "",
  whatsapp: "",
  email: ""
}

draft.requirements = ""
draft.budget = ""
draft.extraDetails = ""

draft.stage = "client_name_input"
draft.requestStatus = "draft"
draft.orderStatus = "pending_review"
draft.paymentStatus = "not_requested"
draft.progress = 0
draft.progressTitle = "Order Started"
draft.progressUpdate = ""
draft.adminId = ""
draft.adminNote = ""

draft.acceptedAt = ""
draft.advanceRequestedAt = ""
draft.advancePaidAt = ""
draft.startedAt = ""
draft.completedAt = ""
draft.remainingRequestedAt = ""
draft.remainingPaidAt = ""
draft.deliveredAt = ""
draft.updatedAt = new Date().toISOString()

Bot.setProperty(orderKey, draft, "json")

// ---------- CLEAR WAITING STATES ----------
Bot.setProperty("ORDER_CONTACT_WAITING_" + uid, "", "string")
Bot.setProperty("ORDER_REQUIREMENT_WAITING_" + uid, "", "string")
Bot.setProperty("ORDER_BUDGET_WAITING_" + uid, "", "string")
Bot.setProperty("ORDER_CONTACT_MENU_WAITING_" + uid, "", "string")

// ---------- ASK CLIENT NAME ----------
Api.sendMessage({
  chat_id: uid,
  text:
    "🔄 *Client details dobara enter karein*\n\n" +
    "👤 Client ka naam ya business name bhejiye.\n\n" +
    "Example: `Rahul Sharma`",
  parse_mode: "Markdown"
})

Bot.runCommand("ORDER_CLIENT_NAME_INPUT")
