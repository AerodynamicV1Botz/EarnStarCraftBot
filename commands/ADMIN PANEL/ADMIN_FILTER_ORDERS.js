/*CMD
  command: ADMIN_FILTER_ORDERS
  help: 
  need_reply: false
  auto_retry_time: 
  folder: ADMIN PANEL

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var uid = user.telegramid

// ==========================================
// 👑 ADMIN CHECK
// ==========================================

if (String(uid) !== "7897324623") {
  return
}

// ==========================================
// 📊 FILTER MENU
// ==========================================

Api.sendMessage({

  chat_id: uid,

  text:
    "📊 <b>ORDER FILTER</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "Select an order status to view:",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [

      [
        {
          text: "🟡 Pending",
          callback_data:
            "ADMIN_FILTER_STATUS pending"
        }
      ],

      [
        {
          text: "🔵 Active",
          callback_data:
            "ADMIN_FILTER_STATUS active"
        }
      ],

      [
        {
          text: "🟢 Completed",
          callback_data:
            "ADMIN_FILTER_STATUS completed"
        }
      ],

      [
        {
          text: "🔴 Cancelled",
          callback_data:
            "ADMIN_FILTER_STATUS cancelled"
        }
      ],

      [
        {
          text: "📦 All Orders",
          callback_data:
            "ADMIN_ORDERS"
        }
      ],

      [
        {
          text: "👑 Admin Panel",
          callback_data:
            "ADMIN_PANEL"
        }
      ]

    ]
  }
})
