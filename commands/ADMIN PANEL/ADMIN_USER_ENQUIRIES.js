/*CMD
  command: ADMIN_USER_ENQUIRIES
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

// CMD: ADMIN_USER_ENQUIRIES

var uid = String(user.telegramid);

// ==========================================
// 👑 ADMIN CHECK
// ==========================================

if (uid !== "7897324623") {
  return;
}

// ==========================================
// 🆔 GET TARGET USER
// ==========================================

var targetId = String(params || "");

if (!targetId) {
  Api.sendMessage({
    chat_id: uid,
    text: "⚠️ User ID not found."
  });
  return;
}

// ==========================================
// 📋 GET ENQUIRY KEYS
// ==========================================

var enquiryKeys = Bot.getProperty("ENQUIRY_KEYS") || [];

if (!Array.isArray(enquiryKeys)) {
  enquiryKeys = [];
}

var text =
  "📋 <b>USER ENQUIRIES</b>\n\n" +
  "🆔 User ID: <code>" + targetId + "</code>\n\n" +
  "━━━━━━━━━━━━━━━━━━\n\n";

var buttons = [];
var count = 0;

// ==========================================
// 🔎 FILTER USER ENQUIRIES
// ==========================================

for (var i = enquiryKeys.length - 1; i >= 0; i--) {

  var enquiryId = enquiryKeys[i];

  var enquiry = Bot.getProperty(
    "ENQUIRY_" + enquiryId
  );

  if (!enquiry) {
    continue;
  }

  if (
    String(enquiry.userId) !== String(targetId)
  ) {
    continue;
  }

  count++;

  var projectType = String(
    enquiry.projectType ||
    enquiry.type ||
    "Custom Project"
  );

  var status = String(
    enquiry.status || "Pending"
  );

  var createdAt = String(
    enquiry.createdAt ||
    enquiry.joinedAt ||
    "Not available"
  );

  var requirements = String(
    enquiry.requirements ||
    enquiry.message ||
    "No requirements"
  );

  text +=
    "📩 <b>Enquiry #" + count + "</b>\n\n" +
    "🛠️ <b>Project:</b> " + projectType + "\n" +
    "📌 <b>Status:</b> " + status + "\n" +
    "📅 <b>Date:</b> " + createdAt + "\n" +
    "📝 <b>Requirements:</b>\n" +
    requirements + "\n\n" +
    "🆔 <code>" + enquiryId + "</code>\n" +
    "━━━━━━━━━━━━━━━━━━\n\n";

  buttons.push([
    {
      text: "📩 View Enquiry #" + count,
      callback_data: "ADMIN_ENQUIRY " + enquiryId
    }
  ]);
}

// ==========================================
// 📊 NO ENQUIRIES
// ==========================================

if (count === 0) {
  text += "ℹ️ Is user ki koi enquiry nahi mili.\n\n";
}

// ==========================================
// 🔘 NAVIGATION
// ==========================================

buttons.push([
  {
    text: "👤 Back to User",
    callback_data: "ADMIN_USER " + targetId
  }
]);

buttons.push([
  {
    text: "👥 Users",
    callback_data: "ADMIN_USERS"
  },
  {
    text: "📋 All Enquiries",
    callback_data: "ADMIN_ENQUIRIES"
  }
]);

buttons.push([
  {
    text: "👑 Admin Panel",
    callback_data: "ADMIN_PANEL"
  }
]);

// ==========================================
// 📤 SEND
// ==========================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
});
