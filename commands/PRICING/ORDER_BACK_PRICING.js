/*CMD
  command: ORDER_BACK_PRICING
  help: 
  need_reply: false
  auto_retry_time: 
  folder: PRICING

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/*CMD
  command: ORDER_BACK_PRICING
  need_reply: false
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT — ORDER_BACK_PRICING
// ORDER STARTER → BACK TO PRICING
// =====================================================
// PURPOSE:
// - Cancel current Starter order draft
// - Clear pending order temporary data
// - Delete client-name input message
// - Return user to MENU_PRICING
// - No order submission
// =====================================================

// =====================================================
// ⚡ CALLBACK RESPONSE
// =====================================================

if (typeof request !== "undefined" && request && request.id) {
  try {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "Returning to Pricing..."
    })
  } catch (error) {}
}

// =====================================================
// 👤 USER ID
// =====================================================

var uid = String(user.telegramid)

// =====================================================
// 🌐 USER LANGUAGE
// =====================================================

var userData = Bot.getProperty("USER_" + uid)

if (!userData || typeof userData !== "object") {
  userData = {}
}

var language = String(userData.language || "hinglish").toLowerCase()

if (
  language !== "hinglish" &&
  language !== "english" &&
  language !== "gujarati"
) {
  language = "hinglish"
}

// =====================================================
// 🗑️ GET CURRENT MESSAGE ID
// =====================================================

var currentMessageId = ""

try {
  if (typeof request !== "undefined" && request && request.message) {
    if (request.message.message_id) {
      currentMessageId = String(request.message.message_id)
    } else if (request.message.messageId) {
      currentMessageId = String(request.message.messageId)
    }
  }
} catch (error) {}

// =====================================================
// 🗑️ DELETE CLIENT NAME INPUT MESSAGE
// =====================================================

if (currentMessageId) {
  var deleted = false

  // ---------------------------------------------------
  // PRIMARY DELETE METHOD
  // ---------------------------------------------------

  try {
    Api.deleteMessage({
      chat_id: uid,

      message_id: currentMessageId
    })

    deleted = true
  } catch (error) {
    deleted = false
  }

  // ---------------------------------------------------
  // FALLBACK DELETE METHOD
  // ---------------------------------------------------

  if (!deleted) {
    try {
      Bot.deleteMessage(currentMessageId)
    } catch (error) {}
  }
}

// =====================================================
// 🧹 CLEAR ACTIVE ORDER DRAFT
// =====================================================

Bot.setProperty("ORDER_" + uid, "", "json")

// =====================================================
// 🧹 CLEAR ORDER MODE
// =====================================================

Bot.setProperty("ORDER_MODE_" + uid, "", "string")

// =====================================================
// 🧹 CLEAR SELECTED PACKAGE
// =====================================================

Bot.setProperty("ORDER_PACKAGE_" + uid, "", "string")

// =====================================================
// 🧹 CLEAR STARTER MODE
// =====================================================

Bot.setProperty("STARTER_MODE_" + uid, "", "string")

// =====================================================
// 🧹 CLEAR OTHER POSSIBLE TEMP DATA
// =====================================================

Bot.setProperty("ORDER_CLIENT_NAME_" + uid, "", "string")

Bot.setProperty("ORDER_REQUIREMENTS_" + uid, "", "string")

Bot.setProperty("ORDER_BUDGET_" + uid, "", "string")

Bot.setProperty("ORDER_CONTACT_" + uid, "", "json")

Bot.setProperty("ORDER_CONTACT_STEP_" + uid, "", "string")

// =====================================================
// 👤 UPDATE USER ACTIVITY
// =====================================================

userData.lastCommand = "ORDER_BACK_PRICING"

userData.lastVisitedAt = new Date().toISOString()

userData.updatedAt = new Date().toISOString()

Bot.setProperty("USER_" + uid, userData, "json")

// =====================================================
// ➡️ RETURN DIRECTLY TO PRICING MENU
// =====================================================

// No extra confirmation message.
// User directly returns to Pricing menu.

Bot.runCommand("MENU_PRICING")

