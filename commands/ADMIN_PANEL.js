/*CMD
  command: ADMIN_PANEL
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
  command: ADMIN_PANEL
  need_reply: false
  folder: ADMIN
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT 57 — ADMIN_PANEL
// STEP 9 — ADMIN CONTROL CENTER
// =====================================================
// FEATURES:
// - Owner + multi-admin access
// - EARNSTAR_ADMINS support
// - String/object admin ID support
// - Multilingual dashboard
// - Correct Build Enquiry count
// - Correct final Order count
// - Same-message edit
// - Delete fallback
// - Main Menu connection
// =====================================================


// =====================================================
// ⚙️ CONFIGURATION
// =====================================================

var OWNER_ID = "7897324623";
var ADMIN_PROPERTY = "EARNSTAR_ADMINS";
var uid = String(user.telegramid);


// =====================================================
// 🛡️ SAFE HTML ESCAPE
// =====================================================

function escapeHTML(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


// =====================================================
// ⚡ CALLBACK RESPONSE
// =====================================================

if (
  typeof request !== "undefined" &&
  request &&
  request.id
) {
  try {
    Api.answerCallbackQuery({
      callback_query_id: request.id
    });
  } catch (error) {}
}


// =====================================================
// 👥 ADMIN LIST
// =====================================================

function extractAdminId(item) {
  if (item && typeof item === "object") {
    return String(
      item.id ||
      item.telegramId ||
      item.userId ||
      ""
    ).trim();
  }

  return String(item || "").trim();
}

function getAdminList() {
  var savedAdmins =
    Bot.getProperty(ADMIN_PROPERTY, []);

  if (!Array.isArray(savedAdmins)) {
    savedAdmins = [savedAdmins];
  }

  var cleanAdmins = [];

  for (var i = 0; i < savedAdmins.length; i++) {
    var adminId = extractAdminId(savedAdmins[i]);

    if (
      adminId &&
      adminId !== "undefined" &&
      adminId !== "null" &&
      adminId !== "[object Object]" &&
      cleanAdmins.indexOf(adminId) === -1
    ) {
      cleanAdmins.push(adminId);
    }
  }

  if (cleanAdmins.indexOf(OWNER_ID) === -1) {
    cleanAdmins.unshift(OWNER_ID);
  }

  return cleanAdmins;
}

var ADMIN_IDS = getAdminList();
var isOwner = uid === OWNER_ID;
var isAdmin = ADMIN_IDS.indexOf(uid) !== -1;


// =====================================================
// 🔒 ACCESS DENIED
// =====================================================

if (!isAdmin) {
  Api.sendMessage({
    chat_id: uid,
    text:
      "🔒 <b>Admin Access Required</b>\n\n" +
      "⚠️ Yeh section sirf authorized admins ke liye available hai.",
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
  });

  return;
}


// =====================================================
// 👤 ADMIN INFORMATION
// =====================================================

var adminName = user.first_name || "Administrator";

if (user.last_name) {
  adminName += " " + user.last_name;
}

var safeAdminName = escapeHTML(adminName);
var safeUid = escapeHTML(uid);

var roleText = isOwner
  ? "👑 Owner"
  : "🔐 Admin";


// =====================================================
// 🌐 USER LANGUAGE
// =====================================================

var userData = Bot.getProperty("USER_" + uid);
var language = "hinglish";

if (
  userData &&
  typeof userData === "object" &&
  userData.language
) {
  language = userData.language;
}

if (
  language !== "hinglish" &&
  language !== "english" &&
  language !== "gujarati"
) {
  language = "hinglish";
}


// =====================================================
// 👥 USER COUNT
// =====================================================

var users = Bot.getProperty("BroadcastUsers", []);

if (!Array.isArray(users)) {
  users = [];
}

var uniqueUsers = [];

for (var u = 0; u < users.length; u++) {
  var userId = String(users[u] || "").trim();

  if (
    userId &&
    userId !== "undefined" &&
    userId !== "null" &&
    uniqueUsers.indexOf(userId) === -1
  ) {
    uniqueUsers.push(userId);
  }
}

var totalUsers = uniqueUsers.length;


// =====================================================
// 📋 BUILD ENQUIRY COUNT
// =====================================================
// IMPORTANT:
// Current system uses:
// BUILD_ENQUIRY_KEYS
// BUILD_ENQUIRY_<enquiryId>
// =====================================================

var enquiryKeys =
  Bot.getProperty("BUILD_ENQUIRY_KEYS", []);

if (!Array.isArray(enquiryKeys)) {
  enquiryKeys = [];
}

var totalEnquiries = 0;
var newEnquiries = 0;
var acceptedEnquiries = 0;
var closedEnquiries = 0;
var rejectedEnquiries = 0;

var countedEnquiries = [];

for (var e = 0; e < enquiryKeys.length; e++) {
  var enquiryId =
    String(enquiryKeys[e] || "").trim();

  if (
    !enquiryId ||
    enquiryId === "undefined" ||
    enquiryId === "null" ||
    countedEnquiries.indexOf(enquiryId) !== -1
  ) {
    continue;
  }

  var enquiry =
    Bot.getProperty("BUILD_ENQUIRY_" + enquiryId);

  if (
    !enquiry ||
    typeof enquiry !== "object"
  ) {
    continue;
  }

  countedEnquiries.push(enquiryId);
  totalEnquiries++;

  var enquiryStatus = String(
    enquiry.status ||
    enquiry.requestStatus ||
    enquiry.stage ||
    "new"
  ).trim().toLowerCase();

  if (
    enquiryStatus === "new" ||
    enquiryStatus === "pending" ||
    enquiryStatus === "submitted" ||
    enquiryStatus === "admin_review" ||
    enquiryStatus === "review"
  ) {
    newEnquiries++;
  }

  else if (
    enquiryStatus === "accepted" ||
    enquiryStatus === "approved" ||
    enquiryStatus === "quote_agreed" ||
    enquiryStatus === "order_created"
  ) {
    acceptedEnquiries++;
  }

  else if (
    enquiryStatus === "closed" ||
    enquiryStatus === "cancelled"
  ) {
    closedEnquiries++;
  }

  else if (
    enquiryStatus === "rejected"
  ) {
    rejectedEnquiries++;
  }
}


// =====================================================
// 📦 FINAL ORDER COUNT
// =====================================================

var orderKeys =
  Bot.getProperty("ORDER_KEYS", []);

if (!Array.isArray(orderKeys)) {
  orderKeys = [];
}

var totalOrders = 0;
var pendingOrders = 0;
var activeOrders = 0;
var completedOrders = 0;
var cancelledOrders = 0;

var countedOrders = [];

for (var o = 0; o < orderKeys.length; o++) {
  var orderId =
    String(orderKeys[o] || "").trim();

  if (
    !orderId ||
    orderId === "undefined" ||
    orderId === "null" ||
    countedOrders.indexOf(orderId) !== -1
  ) {
    continue;
  }

  var order =
    Bot.getProperty("ORDER_" + orderId);

  if (
    !order ||
    typeof order !== "object"
  ) {
    continue;
  }

  countedOrders.push(orderId);
  totalOrders++;

  var orderStatus = String(
    order.orderStatus ||
    order.requestStatus ||
    order.stage ||
    "pending_review"
  ).trim().toLowerCase();

  var stage = String(
    order.stage || ""
  ).trim().toLowerCase();

  var paymentStatus = String(
    order.paymentStatus || ""
  ).trim().toLowerCase();

  if (
    orderStatus === "completed" ||
    stage === "completed"
  ) {
    completedOrders++;
  }

  else if (
    orderStatus === "cancelled" ||
    orderStatus === "rejected" ||
    orderStatus === "closed" ||
    stage === "cancelled" ||
    stage === "rejected"
  ) {
    cancelledOrders++;
  }

  else if (
    orderStatus === "in_progress" ||
    orderStatus === "active" ||
    orderStatus === "accepted" ||
    orderStatus === "work_ready" ||
    orderStatus === "work_started" ||
    stage === "accepted" ||
    stage === "work_ready" ||
    stage === "work_started"
  ) {
    activeOrders++;
  }

  else if (
    orderStatus === "pending_review" ||
    orderStatus === "pending" ||
    orderStatus === "new" ||
    orderStatus === "payment_requested" ||
    orderStatus === "payment_verification" ||
    stage === "pending_review" ||
    stage === "payment_requested" ||
    stage === "payment_verification" ||
    paymentStatus === "proof_submitted"
  ) {
    pendingOrders++;
  }

  else {
    pendingOrders++;
  }
}


// =====================================================
// 👑 ADMIN COUNT
// =====================================================

var totalAdmins = ADMIN_IDS.length;


// =====================================================
// 📝 DASHBOARD TEXT
// =====================================================

var text = "";
var buttons = [];


// =====================================================
// 🇮🇳 HINGLISH
// =====================================================

if (language === "hinglish") {
  text =
    "👑 <b>EARNSTAR BOTCRAFT</b>\n" +
    "🛠️ <b>ADMIN CONTROL CENTER</b>\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "👤 <b>Admin:</b> " +
    safeAdminName +
    "\n" +

    "🆔 <b>Admin ID:</b> <code>" +
    safeUid +
    "</code>\n" +

    "🛡️ <b>Role:</b> " +
    roleText +
    "\n\n" +

    "📊 <b>Dashboard Overview</b>\n\n" +

    "👥 <b>Users:</b> " +
    totalUsers +
    "\n\n" +

    "📋 <b>Build Enquiries:</b> " +
    totalEnquiries +
    "\n" +

    "🟡 New: " +
    newEnquiries +
    "\n" +

    "🟢 Accepted: " +
    acceptedEnquiries +
    "\n" +

    "🔴 Closed: " +
    closedEnquiries +
    "\n" +

    "⛔ Rejected: " +
    rejectedEnquiries +
    "\n\n" +

    "📦 <b>Orders:</b> " +
    totalOrders +
    "\n" +

    "🟡 Pending: " +
    pendingOrders +
    "\n" +

    "🔵 Active: " +
    activeOrders +
    "\n" +

    "🟢 Completed: " +
    completedOrders +
    "\n" +

    "🔴 Cancelled: " +
    cancelledOrders +
    "\n\n" +

    "👑 <b>Total Admins:</b> " +
    totalAdmins +
    "\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "⚡ <b>Quick Actions</b>\n" +
    "👇 Neeche se option select karo:";

  buttons = [
    [
      {
        text: "📦 Orders (" + totalOrders + ")",
        callback_data: "ADMIN_ORDERS"
      },
      {
        text: "📢 Broadcast",
        callback_data: "ADMIN_BROADCAST"
      }
    ],
    [
      {
        text: "📋 Enquiries (" + totalEnquiries + ")",
        callback_data: "ADMIN_ENQUIRIES"
      },
      {
        text: "📊 Statistics",
        callback_data: "ADMIN_STATS"
      }
    ],
    [
      {
        text: "👥 Users (" + totalUsers + ")",
        callback_data: "ADMIN_USERS"
      },
      {
        text: "⚙️ Settings",
        callback_data: "ADMIN_SETTINGS"
      }
    ],
    [
      {
        text: "👑 Multi-Admin (" + totalAdmins + ")",
        callback_data: "ADMIN_MANAGEMENT"
      }
    ],
    [
      {
        text: "🔄 Refresh Dashboard",
        callback_data: "ADMIN_PANEL"
      }
    ],
    [
      {
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ];
}


// =====================================================
// 🇬🇧 ENGLISH
// =====================================================

else if (language === "english") {
  text =
    "👑 <b>EARNSTAR BOTCRAFT</b>\n" +
    "🛠️ <b>ADMIN CONTROL CENTER</b>\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "👤 <b>Admin:</b> " +
    safeAdminName +
    "\n" +

    "🆔 <b>Admin ID:</b> <code>" +
    safeUid +
    "</code>\n" +

    "🛡️ <b>Role:</b> " +
    roleText +
    "\n\n" +

    "📊 <b>Dashboard Overview</b>\n\n" +

    "👥 <b>Users:</b> " +
    totalUsers +
    "\n\n" +

    "📋 <b>Build Enquiries:</b> " +
    totalEnquiries +
    "\n" +

    "🟡 New: " +
    newEnquiries +
    "\n" +

    "🟢 Accepted: " +
    acceptedEnquiries +
    "\n" +

    "🔴 Closed: " +
    closedEnquiries +
    "\n" +

    "⛔ Rejected: " +
    rejectedEnquiries +
    "\n\n" +

    "📦 <b>Orders:</b> " +
    totalOrders +
    "\n" +

    "🟡 Pending: " +
    pendingOrders +
    "\n" +

    "🔵 Active: " +
    activeOrders +
    "\n" +

    "🟢 Completed: " +
    completedOrders +
    "\n" +

    "🔴 Cancelled: " +
    cancelledOrders +
    "\n\n" +

    "👑 <b>Total Admins:</b> " +
    totalAdmins +
    "\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "⚡ <b>Quick Actions</b>\n" +
    "👇 Select an option below:";

  buttons = [
    [
      {
        text: "📦 Orders (" + totalOrders + ")",
        callback_data: "ADMIN_ORDERS"
      },
      {
        text: "📢 Broadcast",
        callback_data: "ADMIN_BROADCAST"
      }
    ],
    [
      {
        text: "📋 Enquiries (" + totalEnquiries + ")",
        callback_data: "ADMIN_ENQUIRIES"
      },
      {
        text: "📊 Statistics",
        callback_data: "ADMIN_STATS"
      }
    ],
    [
      {
        text: "👥 Users (" + totalUsers + ")",
        callback_data: "ADMIN_USERS"
      },
      {
        text: "⚙️ Settings",
        callback_data: "ADMIN_SETTINGS"
      }
    ],
    [
      {
        text: "👑 Multi-Admin (" + totalAdmins + ")",
        callback_data: "ADMIN_MANAGEMENT"
      }
    ],
    [
      {
        text: "🔄 Refresh Dashboard",
        callback_data: "ADMIN_PANEL"
      }
    ],
    [
      {
        text: "🏠 Main Menu",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ];
}


// =====================================================
// 🇬🇺 GUJARATI
// =====================================================

else {
  text =
    "👑 <b>EARNSTAR BOTCRAFT</b>\n" +
    "🛠️ <b>એડમિન કંટ્રોલ સેન્ટર</b>\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "👤 <b>એડમિન:</b> " +
    safeAdminName +
    "\n" +

    "🆔 <b>એડમિન ID:</b> <code>" +
    safeUid +
    "</code>\n" +

    "🛡️ <b>ભૂમિકા:</b> " +
    roleText +
    "\n\n" +

    "📊 <b>ડેશબોર્ડ માહિતી</b>\n\n" +

    "👥 <b>યુઝર્સ:</b> " +
    totalUsers +
    "\n\n" +

    "📋 <b>બિલ્ડ પૂછપરછ:</b> " +
    totalEnquiries +
    "\n" +

    "🟡 નવી: " +
    newEnquiries +
    "\n" +

    "🟢 સ્વીકારેલી: " +
    acceptedEnquiries +
    "\n" +

    "🔴 બંધ: " +
    closedEnquiries +
    "\n" +

    "⛔ નકારેલી: " +
    rejectedEnquiries +
    "\n\n" +

    "📦 <b>ઓર્ડર્સ:</b> " +
    totalOrders +
    "\n" +

    "🟡 બાકી: " +
    pendingOrders +
    "\n" +

    "🔵 ચાલુ: " +
    activeOrders +
    "\n" +

    "🟢 પૂર્ણ: " +
    completedOrders +
    "\n" +

    "🔴 રદ: " +
    cancelledOrders +
    "\n\n" +

    "👑 <b>કુલ એડમિન:</b> " +
    totalAdmins +
    "\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "⚡ <b>ઝડપી વિકલ્પો</b>\n" +
    "👇 નીચેમાંથી વિકલ્પ પસંદ કરો:";

  buttons = [
    [
      {
        text: "📦 ઓર્ડર્સ (" + totalOrders + ")",
        callback_data: "ADMIN_ORDERS"
      },
      {
        text: "📢 બ્રોડકાસ્ટ",
        callback_data: "ADMIN_BROADCAST"
      }
    ],
    [
      {
        text: "📋 પૂછપરછ (" + totalEnquiries + ")",
        callback_data: "ADMIN_ENQUIRIES"
      },
      {
        text: "📊 આંકડા",
        callback_data: "ADMIN_STATS"
      }
    ],
    [
      {
        text: "👥 યુઝર્સ (" + totalUsers + ")",
        callback_data: "ADMIN_USERS"
      },
      {
        text: "⚙️ સેટિંગ્સ",
        callback_data: "ADMIN_SETTINGS"
      }
    ],
    [
      {
        text: "👑 મલ્ટી-એડમિન (" + totalAdmins + ")",
        callback_data: "ADMIN_MANAGEMENT"
      }
    ],
    [
      {
        text: "🔄 ડેશબોર્ડ રિફ્રેશ",
        callback_data: "ADMIN_PANEL"
      }
    ],
    [
      {
        text: "🏠 મેઈન મેનુ",
        callback_data: "BACK_MAIN_MENU"
      }
    ]
  ];
}


// =====================================================
// 📩 SAME MESSAGE EDIT + FALLBACK
// =====================================================

var oldMessageId = null;

if (
  typeof request !== "undefined" &&
  request &&
  request.message &&
  request.message.message_id
) {
  oldMessageId = request.message.message_id;
}

if (oldMessageId) {
  try {
    Api.editMessageText({
      chat_id: uid,
      message_id: oldMessageId,
      text: text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: buttons
      }
    });

    return;
  } catch (error) {
    try {
      Api.deleteMessage({
        chat_id: uid,
        message_id: oldMessageId
      });
    } catch (deleteError) {}
  }
}


// =====================================================
// 📤 SEND NEW DASHBOARD
// =====================================================

Api.sendMessage({
  chat_id: uid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: buttons
  }
});
