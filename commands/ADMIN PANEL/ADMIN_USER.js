/*CMD
  command: ADMIN_USER
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

// CMD: ADMIN_USER

var uid = user.telegramid;

// ==========================================
// 👑 ADMIN CHECK
// ==========================================

if (String(uid) !== "7897324623") {
  Api.sendMessage({
    chat_id: uid,
    text:
      "🔒 <b>Admin Access Required</b>\n\n" +
      "⚠️ Yeh section sirf authorized admin ke liye available hai.",
    parse_mode: "HTML"
  });

  return;
}

// ==========================================
// 🆔 GET TARGET USER
// ==========================================

var targetId = params;

if (!targetId) {
  Api.sendMessage({
    chat_id: uid,
    text: "⚠️ User ID not found.",
    parse_mode: "HTML"
  });

  return;
}

var userData = Bot.getProperty(
  "USER_" + targetId
) || {};

// ==========================================
// 📊 USER DATA
// ==========================================

var name = String(userData.name || "Not provided");
var username = String(userData.username || "Not provided");
var language = String(userData.language || "Not selected");
var joinedAt = String(userData.joinedAt || "Not available");
var enquiryRef = String(userData.enquiryRef || "No enquiry");

var blocked = userData.blocked || false;

var blockText = blocked
  ? "🔓 Unblock User"
  : "🚫 Block User";

// ==========================================
// 📋 USER ENQUIRY COUNT
// ==========================================

var enquiryKeys = Bot.getProperty("ENQUIRY_KEYS") || [];

if (!Array.isArray(enquiryKeys)) {
  enquiryKeys = [];
}

var userEnquiries = 0;

for (var i = 0; i < enquiryKeys.length; i++) {
  var enquiry = Bot.getProperty(
    "ENQUIRY_" + enquiryKeys[i]
  );

  if (
    enquiry &&
    String(enquiry.userId) === String(targetId)
  ) {
    userEnquiries++;
  }
}

// ==========================================
// 📦 USER ORDER COUNT
// ==========================================

var orderKeys = Bot.getProperty("ORDER_KEYS") || [];

if (!Array.isArray(orderKeys)) {
  orderKeys = [];
}

var userOrders = 0;

for (var j = 0; j < orderKeys.length; j++) {
  var order = Bot.getProperty(
    "ORDER_" + orderKeys[j]
  );

  if (
    order &&
    String(order.userId) === String(targetId)
  ) {
    userOrders++;
  }
}

// ==========================================
// 👤 USER DETAILS
// ==========================================

var text =
  "👤 <b>USER DETAILS</b>\n\n" +

  "━━━━━━━━━━━━━━━━━━\n\n" +

  "👤 <b>Name:</b>\n" +
  name + "\n\n" +

  "🆔 <b>User ID:</b>\n" +
  "<code>" + targetId + "</code>\n\n" +

  "🔗 <b>Username:</b>\n" +
  username + "\n\n" +

  "🌐 <b>Language:</b>\n" +
  language + "\n\n" +

  "📅 <b>Joined:</b>\n" +
  joinedAt + "\n\n" +

  "📋 <b>Latest Enquiry:</b>\n" +
  "<code>" + enquiryRef + "</code>\n\n" +

  "📊 <b>Total Enquiries:</b> " +
  userEnquiries + "\n" +

  "📦 <b>Total Orders:</b> " +
  userOrders + "\n\n" +

  "🛡️ <b>Access:</b> " +
  (blocked ? "🚫 Blocked" : "🟢 Active") +

  "\n\n━━━━━━━━━━━━━━━━━━";

// ==========================================
// 🔘 BUTTONS
// ==========================================

var buttons = [

  [
    {
      text: "💬 Contact User",
      url: "tg://user?id=" + targetId
    }
  ],

  [
    {
      text: blockText,
      callback_data:
        "ADMIN_TOGGLE_BLOCK " + targetId
    }
  ],

  [
    {
      text: "📋 View Enquiries",
      callback_data:
        "ADMIN_USER_ENQUIRIES " + targetId
    }
  ],

  [
    {
      text: "📦 View Orders",
      callback_data:
        "ADMIN_USER_ORDERS " + targetId
    }
  ],

  [
    {
      text: "🔄 Refresh",
      callback_data:
        "ADMIN_USER " + targetId
    }
  ],

  [
    {
      text: "👥 Users",
      callback_data: "ADMIN_USERS"
    },
    {
      text: "📋 Enquiries",
      callback_data: "ADMIN_ENQUIRIES"
    }
  ],

  [
    {
      text: "👑 Admin Panel",
      callback_data: "ADMIN_PANEL"
    }
  ]

];

// ==========================================
// 📩 SEND
// ==========================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
});
