/*CMD
  command: ADMIN_DELIVER_ORDER_SAVE
  help: 
  need_reply: true
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
  command: ADMIN_DELIVER_ORDER_SAVE
  need_reply: true
  folder: ORDERS
*/

// =====================================================
// 🤖 EARNSTAR BOTCRAFT
// SCRIPT — ADMIN_DELIVER_ORDER_SAVE
//
// STEP: 2.2.1.3.7.8.1
// ADMIN → SEND FINAL DELIVERY TO CLIENT
//
// Connected with:
// ADMIN_DELIVER_ORDER
// ADMIN_VERIFY_REMAINING_PAYMENT
//
// Supports:
// Document, Photo, Video, Audio, Voice, Text
// =====================================================


// =====================================================
// 👤 ADMIN ID
// =====================================================

var adminId =
  String(user.telegramid || "");

if (!adminId) {
  return;
}


// =====================================================
// 🔐 ADMIN AUTHORIZATION
// =====================================================

var OWNER_ID = "7897324623";

var adminList =
  Bot.getProperty("EARNSTAR_ADMINS") || [];

if (!Array.isArray(adminList)) {
  adminList = [];
}

var isAdmin =
  adminId === OWNER_ID;

if (!isAdmin) {
  for (var i = 0; i < adminList.length; i++) {
    var item = adminList[i];
    var savedAdminId = "";

    if (
      typeof item === "object" &&
      item !== null
    ) {
      savedAdminId = String(
        item.id ||
        item.telegramId ||
        item.userId ||
        ""
      );
    } else {
      savedAdminId = String(item || "");
    }

    if (savedAdminId === adminId) {
      isAdmin = true;
      break;
    }
  }
}

if (!isAdmin) {
  Api.sendMessage({
    chat_id: adminId,
    text: "⛔ You are not authorized."
  });
  return;
}


// =====================================================
// 🧹 SAFE HTML
// =====================================================

function safeText(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


// =====================================================
// 🌐 LANGUAGE
// =====================================================

var profile =
  Bot.getProperty("USER_" + adminId) || {};

var language =
  String(profile.language || "hinglish")
    .toLowerCase();


// =====================================================
// 📚 TRANSLATIONS
// =====================================================

var text = {
  hinglish: {
    noWaiting:
      "⚠️ Koi delivery request pending nahi hai.\n\nOrder open karke Deliver Order select karein.",

    cancelled:
      "❌ Final delivery cancel kar di gayi hai.",

    orderNotFound:
      "❌ Order nahi mila.",

    clientNotFound:
      "❌ Client ID nahi mili.",

    paymentNotVerified:
      "⚠️ Delivery abhi send nahi ho sakti.\n\nRemaining payment verify nahi hui hai.",

    alreadyDelivered:
      "⚠️ Ye order already delivered hai.",

    noMessage:
      "❌ Koi delivery message nahi mila. Dobara try karein.",

    unsupported:
      "❌ Unsupported delivery type.\n\nDocument, photo, video, audio, voice ya text bhejein.",

    sendFailed:
      "❌ Delivery client ko send nahi ho saki. Order status update nahi kiya gaya.",

    success:
      "✅ Final delivery client ko successfully send kar di gayi hai.",

    userTitle:
      "🎉 Order Successfully Completed!",

    userDelivery:
      "✅ Final delivery aapko send kar di gayi hai.",

    thankYou:
      "Thank you for choosing EarnStar.",

    support:
      "⭐ Changes ya support ke liye admin se contact karein.",

    deliveryMessage:
      "📝 Delivery Message"
  },

  english: {
    noWaiting:
      "⚠️ No delivery request is waiting.\n\nOpen the order and select Deliver Order.",

    cancelled:
      "❌ Final delivery has been cancelled.",

    orderNotFound:
      "❌ Order not found.",

    clientNotFound:
      "❌ Client ID not found.",

    paymentNotVerified:
      "⚠️ Delivery cannot be sent yet.\n\nRemaining payment has not been verified.",

    alreadyDelivered:
      "⚠️ This order has already been delivered.",

    noMessage:
      "❌ No delivery message found. Please try again.",

    unsupported:
      "❌ Unsupported delivery type.\n\nSend a document, photo, video, audio, voice or text.",

    sendFailed:
      "❌ Delivery could not be sent to the client. Order status was not updated.",

    success:
      "✅ Final delivery was sent successfully to the client.",

    userTitle:
      "🎉 Order Successfully Completed!",

    userDelivery:
      "✅ Final delivery has been sent to you.",

    thankYou:
      "Thank you for choosing EarnStar.",

    support:
      "⭐ Contact admin if you need changes or support.",

    deliveryMessage:
      "📝 Delivery Message"
  },

  gujarati: {
    noWaiting:
      "⚠️ કોઈ ડિલિવરી રિક્વેસ્ટ પેન્ડિંગ નથી.\n\nઓર્ડર ખોલીને Deliver Order પસંદ કરો.",

    cancelled:
      "❌ ફાઇનલ ડિલિવરી કેન્સલ કરવામાં આવી છે.",

    orderNotFound:
      "❌ ઓર્ડર મળ્યો નથી.",

    clientNotFound:
      "❌ ક્લાયન્ટ ID મળી નથી.",

    paymentNotVerified:
      "⚠️ હાલમાં ડિલિવરી મોકલી શકાતી નથી.\n\nબાકી પેમેન્ટ વેરિફાઇ થયું નથી.",

    alreadyDelivered:
      "⚠️ આ ઓર્ડર પહેલેથી જ ડિલિવર થઈ ગયો છે.",

    noMessage:
      "❌ કોઈ ડિલિવરી મેસેજ મળ્યો નથી. ફરી પ્રયાસ કરો.",

    unsupported:
      "❌ આ પ્રકારની ફાઇલ સપોર્ટેડ નથી.\n\nડોક્યુમેન્ટ, ફોટો, વીડિયો, ઓડિયો, વોઇસ અથવા ટેક્સ્ટ મોકલો.",

    sendFailed:
      "❌ ક્લાયન્ટને ડિલિવરી મોકલી શકાઈ નથી. ઓર્ડર સ્ટેટસ અપડેટ થયો નથી.",

    success:
      "✅ ફાઇનલ ડિલિવરી ક્લાયન્ટને સફળતાપૂર્વક મોકલવામાં આવી છે.",

    userTitle:
      "🎉 ઓર્ડર સફળતાપૂર્વક પૂર્ણ થયો!",

    userDelivery:
      "✅ ફાઇનલ ડિલિવરી તમને મોકલી દેવામાં આવી છે.",

    thankYou:
      "EarnStar પસંદ કરવા બદલ આભાર.",

    support:
      "⭐ ફેરફાર અથવા સપોર્ટ માટે એડમિનનો સંપર્ક કરો.",

    deliveryMessage:
      "📝 ડિલિવરી મેસેજ"
  }
};

var lang =
  text[language] ?
  language :
  "hinglish";

var t =
  text[lang];


// =====================================================
// ⏳ LOAD WAITING ORDER
// =====================================================

var orderId =
  Bot.getProperty(
    "DELIVERY_WAITING_" + adminId
  );

if (!orderId) {
  Api.sendMessage({
    chat_id: adminId,
    text: t.noWaiting
  });
  return;
}

orderId =
  String(orderId).trim();


// =====================================================
// 🧹 TEMP STATE CLEAR FUNCTION
// =====================================================

function clearDeliveryWaiting() {
  Bot.setProperty(
    "DELIVERY_WAITING_" + adminId,
    "",
    "string"
  );

  Bot.setProperty(
    "DELIVERY_ORDER_" + adminId,
    "",
    "string"
  );
}


// =====================================================
// ❌ CANCEL
// =====================================================

var incomingText = "";

try {
  if (
    typeof message !== "undefined" &&
    message
  ) {
    if (typeof message === "string") {
      incomingText =
        String(message).trim().toLowerCase();
    } else {
      incomingText =
        String(message.text || "")
          .trim()
          .toLowerCase();
    }
  }
} catch (e) {
  incomingText = "";
}

if (
  incomingText === "/cancel" ||
  incomingText === "❌ cancel" ||
  incomingText === "❌ cancel delivery"
) {
  clearDeliveryWaiting();

  Api.sendMessage({
    chat_id: adminId,
    text: t.cancelled
  });

  return;
}


// =====================================================
// 📦 LOAD ORDER
// =====================================================

var order =
  Bot.getProperty("ORDER_" + orderId);

if (
  !order ||
  typeof order !== "object"
) {
  clearDeliveryWaiting();

  Api.sendMessage({
    chat_id: adminId,
    text:
      t.orderNotFound +
      "\n\n🆔 <code>" +
      safeText(orderId) +
      "</code>",
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 👤 CLIENT ID
// =====================================================

var clientId = String(
  order.userId ||
  order.telegramId ||
  (
    order.telegramProfile &&
    (
      order.telegramProfile.telegramId ||
      order.telegramProfile.userId ||
      order.telegramProfile.id
    )
  ) ||
  Bot.getProperty("ORDER_USER_" + orderId) ||
  ""
).trim();

if (!clientId) {
  clearDeliveryWaiting();

  Api.sendMessage({
    chat_id: adminId,
    text: t.clientNotFound
  });

  return;
}


// =====================================================
// 🛑 DUPLICATE DELIVERY CHECK
// =====================================================

if (
  order.stage === "delivered" ||
  order.deliveryStatus === "delivered" ||
  order.paymentStatus === "fully_paid" ||
  order.orderStatus === "delivered"
) {
  clearDeliveryWaiting();

  Api.sendMessage({
    chat_id: adminId,
    text:
      t.alreadyDelivered +
      "\n\n🆔 <code>" +
      safeText(orderId) +
      "</code>",
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 💳 PAYMENT CHECK
// =====================================================

if (
  order.paymentStatus !== "remaining_paid"
) {
  Api.sendMessage({
    chat_id: adminId,
    text:
      t.paymentNotVerified +
      "\n\n🆔 <code>" +
      safeText(orderId) +
      "</code>\n" +
      "📌 Current Status: " +
      safeText(order.paymentStatus || "unknown"),
    parse_mode: "HTML"
  });

  return;
}


// =====================================================
// 📨 MESSAGE CHECK
// =====================================================

if (
  typeof message === "undefined" ||
  !message
) {
  Api.sendMessage({
    chat_id: adminId,
    text: t.noMessage
  });

  return;
}


// =====================================================
// 📦 DELIVERY CAPTION
// =====================================================

var packageName =
  order.packageName ||
  order.packageType ||
  "Custom Order";

var deliveryCaption =
  "📦 <b>Final Delivery</b>\n\n" +
  "🆔 <b>Order ID:</b> <code>" +
  safeText(orderId) +
  "</code>\n" +
  "📦 <b>Package:</b> " +
  safeText(packageName) +
  "\n\n" +
  "✅ " +
  safeText(t.userDelivery) +
  "\n" +
  safeText(t.thankYou);


// =====================================================
// 📤 SEND DELIVERY
// =====================================================

var sent = false;

try {

  // ---------- DOCUMENT ----------
  if (
    message.document &&
    message.document.file_id
  ) {
    Api.sendDocument({
      chat_id: clientId,
      document: message.document.file_id,
      caption: deliveryCaption,
      parse_mode: "HTML"
    });

    sent = true;
  }

  // ---------- PHOTO ----------
  else if (
    message.photo &&
    message.photo.length > 0
  ) {
    var photo =
      message.photo[
        message.photo.length - 1
      ];

    Api.sendPhoto({
      chat_id: clientId,
      photo: photo.file_id,
      caption: deliveryCaption,
      parse_mode: "HTML"
    });

    sent = true;
  }

  // ---------- VIDEO ----------
  else if (
    message.video &&
    message.video.file_id
  ) {
    Api.sendVideo({
      chat_id: clientId,
      video: message.video.file_id,
      caption: deliveryCaption,
      parse_mode: "HTML"
    });

    sent = true;
  }

  // ---------- AUDIO ----------
  else if (
    message.audio &&
    message.audio.file_id
  ) {
    Api.sendAudio({
      chat_id: clientId,
      audio: message.audio.file_id,
      caption: deliveryCaption,
      parse_mode: "HTML"
    });

    sent = true;
  }

  // ---------- VOICE ----------
  else if (
    message.voice &&
    message.voice.file_id
  ) {
    Api.sendVoice({
      chat_id: clientId,
      voice: message.voice.file_id
    });

    Api.sendMessage({
      chat_id: clientId,
      text: deliveryCaption,
      parse_mode: "HTML"
    });

    sent = true;
  }

  // ---------- TEXT ----------
  else if (
    message.text &&
    String(message.text).trim() !== ""
  ) {
    Api.sendMessage({
      chat_id: clientId,
      text:
        deliveryCaption +
        "\n\n<b>" +
        safeText(t.deliveryMessage) +
        ":</b>\n" +
        safeText(message.text),
      parse_mode: "HTML"
    });

    sent = true;
  }

} catch (error) {
  sent = false;
}


// =====================================================
// ❌ DELIVERY FAILED
// =====================================================

if (!sent) {
  Api.sendMessage({
    chat_id: adminId,
    text: t.unsupported
  });

  return;
}


// =====================================================
// 🕐 UPDATE ORDER
// =====================================================

var now =
  new Date().toISOString();

order.stage =
  "delivered";

order.packageStep =
  "delivered";

order.requestStatus =
  "accepted";

order.orderStatus =
  "completed";

order.paymentStatus =
  "fully_paid";

order.paymentVerificationStatus =
  "verified";

order.remainingPaymentVerificationStatus =
  "verified";

order.deliveryStatus =
  "delivered";

order.workStatus =
  "completed";

order.progress =
  100;

order.progressTitle =
  "Final Delivery Sent";

order.progressUpdate =
  "Completed work delivered to client.";

order.deliveredAt =
  now;

order.deliverySentAt =
  now;

order.deliverySentBy =
  adminId;

order.updatedAt =
  now;

order.adminId =
  adminId;

order.userId =
  clientId;


// =====================================================
// 💾 SAVE FINAL ORDER ONLY
// =====================================================

Bot.setProperty(
  "ORDER_" + orderId,
  order,
  "json"
);

Bot.setProperty(
  "ORDER_USER_" + orderId,
  clientId,
  "string"
);


// =====================================================
// 🧾 UPDATE ORDER HISTORY
// =====================================================

var historyKey =
  "ORDER_HISTORY_" + orderId;

var history =
  Bot.getProperty(historyKey) || [];

if (!Array.isArray(history)) {
  history = [];
}

history.push({
  action: "final_delivery_sent",
  stage: "delivered",
  orderStatus: "completed",
  paymentStatus: "fully_paid",
  deliveryStatus: "delivered",
  adminId: adminId,
  clientId: clientId,
  timestamp: now
});

Bot.setProperty(
  historyKey,
  history,
  "json"
);


// =====================================================
// 🧹 CLEAR WAITING STATE
// =====================================================

clearDeliveryWaiting();


// =====================================================
// 📩 USER FINAL MESSAGE
// =====================================================

try {
  Api.sendMessage({
    chat_id: clientId,

    text:
      "🎉 <b>" +
      safeText(t.userTitle) +
      "</b>\n\n" +

      "🆔 <b>Order ID:</b> <code>" +
      safeText(orderId) +
      "</code>\n" +

      "📦 <b>Package:</b> " +
      safeText(packageName) +
      "\n\n" +

      safeText(t.userDelivery) +
      "\n" +

      safeText(t.thankYou) +
      "\n\n" +

      safeText(t.support),

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📦 View Order",
            callback_data:
              "ORDER_TRACK " + orderId
          }
        ],
        [
          {
            text: "💬 Contact Admin",
            callback_data:
              "ORDER_CONTACT_ADMIN " + orderId
          }
        ],
        [
          {
            text: "🏠 Main Menu",
            callback_data: "MAIN_MENU"
          }
        ]
      ]
    }
  });
} catch (error) {
  Bot.setProperty(
    "CLIENT_NOTIFY_ERROR_" + orderId,
    {
      orderId: orderId,
      clientId: clientId,
      error: String(error),
      timestamp: now
    },
    "json"
  );
}


// =====================================================
// ✅ ADMIN CONFIRMATION
// =====================================================

Api.sendMessage({
  chat_id: adminId,

  text:
    "✅ <b>Final delivery sent successfully.</b>\n\n" +

    "🆔 <b>Order ID:</b> <code>" +
    safeText(orderId) +
    "</code>\n" +

    "👤 <b>Client ID:</b> <code>" +
    safeText(clientId) +
    "</code>\n\n" +

    "📦 Order status: <b>Delivered</b>\n" +
    "💳 Payment status: <b>Fully Paid</b>",

  parse_mode: "HTML"
});
