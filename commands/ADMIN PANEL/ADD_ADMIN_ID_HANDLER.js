/*CMD
  command: ADD_ADMIN_ID_HANDLER
  help: 
  need_reply: true
  auto_retry_time: 
  folder: ADMIN PANEL

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 232 — FINAL VERSION
// COMMAND NAME: ADD_ADMIN_ID_HANDLER
// STEP 9.3.1 — SAVE ADMIN ID
// 📁 Wait for Answer Handler
// 🇮🇳 Hinglish | 🇬🇧 English | 🇬🇺 Gujarati
// ==========================================

var uid = String(user.telegramid)
var ownerId = "7897324623"

// ==========================================
// 👑 OWNER CHECK
// ==========================================

if (uid !== ownerId) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "🔒 <b>Access Denied</b>",
    parse_mode: "HTML"
  })
  return
}

// ==========================================
// 📩 READ ADMIN ID
// ==========================================

var newAdminId = String(message || "").trim()

// ==========================================
// ❌ INVALID ID
// ==========================================

if (!/^[0-9]+$/.test(newAdminId)) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "❌ <b>Invalid Telegram ID</b>\n\n" +
      "Sirf numeric Telegram ID bhejo.\n\n" +
      "Example: <code>123456789</code>",
    parse_mode: "HTML"
  })
  return
}

// ==========================================
// 👑 OWNER PROTECTION
// ==========================================

if (newAdminId === ownerId) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "⚠️ Ye ID already owner ki hai.\n\n" +
      "Owner ko dobara add nahi kar sakte.",
    parse_mode: "HTML"
  })
  return
}

// ==========================================
// 📋 GET ADMIN LIST
// ==========================================

var adminList = Bot.getProperty("EARNSTAR_ADMINS") || []

if (!Array.isArray(adminList)) {
  adminList = []
}

// ==========================================
// 🔍 DUPLICATE CHECK
// ==========================================

for (var i = 0; i < adminList.length; i++) {
  if (String(adminList[i].id) === newAdminId) {
    Api.sendMessage({
      chat_id: uid,
      text:
        "⚠️ <b>Admin Already Exists</b>\n\n" +
        "Ye ID pehle se admin list mein hai.",
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "📋 Admin List",
              callback_data: "ADMIN_LIST"
            }
          ],
          [
            {
              text: "⬅️ Back",
              callback_data: "ADMIN_MANAGEMENT"
            }
          ]
        ]
      }
    })
    return
  }
}

// ==========================================
// 💾 SAVE ADMIN
// ==========================================

adminList.push({
  id: newAdminId,
  name: "Admin",
  addedAt: new Date().toISOString()
})

Bot.setProperty(
  "EARNSTAR_ADMINS",
  adminList,
  "json"
)

// ==========================================
// 🧹 CLEAR STATE
// ==========================================

Bot.setProperty(
  "ADMIN_ACTION_" + uid,
  {},
  "json"
)

// ==========================================
// ✅ SUCCESS
// ==========================================

Api.sendMessage({
  chat_id: uid,
  text:
    "✅ <b>Admin Added Successfully</b>\n\n" +
    "👤 Admin ID: <code>" + newAdminId + "</code>\n\n" +
    "🎉 Admin save ho gaya.",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📋 Admin List",
          callback_data: "ADMIN_LIST"
        }
      ],
      [
        {
          text: "➕ Add Another",
          callback_data: "ADD_ADMIN"
        }
      ],
      [
        {
          text: "⬅️ Back",
          callback_data: "ADMIN_MANAGEMENT"
        }
      ]
    ]
  }
})

return
