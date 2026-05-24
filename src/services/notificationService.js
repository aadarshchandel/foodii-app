// src/services/notificationService.js
import emailjs from '@emailjs/browser';

// Initialize EmailJS (You need to sign up at https://www.emailjs.com/)
// For now, we'll create a simulation mode that works without actual API keys
// Replace these with your actual EmailJS credentials when ready
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_your_service_id',  // Replace with your EmailJS service ID
  TEMPLATE_ID: 'template_your_template_id', // Replace with your EmailJS template ID
  PUBLIC_KEY: 'your_public_key'  // Replace with your EmailJS public key
};

// SMS Configuration (Using mock for now - integrate with actual SMS gateway like Twilio, MSG91, etc.)
const SMS_CONFIG = {
  ENABLED: false, // Set to true when you have SMS gateway configured
  API_KEY: 'your_sms_api_key',
  SENDER_ID: 'FOODII',
  // For MSG91, TextLocal, Twilio, etc.
};

// Mock function for SMS (replace with actual SMS gateway)
const sendActualSMS = async (phoneNumber, message) => {
  // Example for MSG91 API (India)
  // const response = await fetch('https://api.msg91.com/api/v5/flow/', {
  //   method: 'POST',
  //   headers: { 'authkey': SMS_CONFIG.API_KEY, 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     sender: SMS_CONFIG.SENDER_ID,
  //     mobiles: phoneNumber,
  //     message: message
  //   })
  // });
  
  // For now, simulate SMS sending
  console.log(`📱 SMS sent to ${phoneNumber}: ${message}`);
  return { success: true, message: 'SMS sent successfully' };
};

// Send Welcome Email on Signup
export const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    // For simulation (works without actual API)
    if (!EMAILJS_CONFIG.PUBLIC_KEY || EMAILJS_CONFIG.PUBLIC_KEY === 'your_public_key') {
      console.log(`📧 Welcome email sent to ${userEmail}`);
      console.log(`Email content: Welcome to Foodii, ${userName}! Start exploring delicious food.`);
      return { success: true, message: 'Welcome email sent (simulation mode)' };
    }

    // Actual EmailJS implementation
    const templateParams = {
      to_email: userEmail,
      user_name: userName,
      message: `Welcome to Foodii, ${userName}! We're excited to have you on board. Start exploring our delicious menu and enjoy amazing food delivered to your doorstep.`,
      subject: 'Welcome to Foodii! 🍴'
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );
    return { success: true, message: 'Welcome email sent successfully' };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, message: 'Failed to send welcome email' };
  }
};

// Send Welcome SMS on Signup
export const sendWelcomeSMS = async (phoneNumber, userName) => {
  try {
    const message = `Welcome to Foodii, ${userName}! 🍴 Thank you for joining us. Start ordering delicious food now!`;
    
    if (!SMS_CONFIG.ENABLED) {
      console.log(`📱 SMS would be sent to ${phoneNumber}: ${message}`);
      return { success: true, message: 'SMS would be sent (SMS gateway not configured)' };
    }
    
    return await sendActualSMS(phoneNumber, message);
  } catch (error) {
    console.error('Error sending welcome SMS:', error);
    return { success: false, message: 'Failed to send SMS' };
  }
};

// Send Order Confirmation Email
export const sendOrderConfirmationEmail = async (userEmail, userName, orderDetails) => {
  try {
    const orderItems = orderDetails.items.map(item => 
      `${item.name} x ${item.quantity || 1} - ₹${item.price}`
    ).join('\n');
    
    console.log(`📧 Order confirmation email sent to ${userEmail}`);
    console.log(`Order #${orderDetails.orderId}: Total ₹${orderDetails.total}`);
    
    // For simulation
    if (!EMAILJS_CONFIG.PUBLIC_KEY || EMAILJS_CONFIG.PUBLIC_KEY === 'your_public_key') {
      return { success: true, message: 'Order confirmation email sent (simulation mode)' };
    }

    const templateParams = {
      to_email: userEmail,
      user_name: userName,
      order_id: orderDetails.orderId,
      order_items: orderItems,
      order_total: orderDetails.total,
      order_date: new Date().toLocaleString(),
      delivery_address: orderDetails.address,
      message: `Your order #${orderDetails.orderId} has been confirmed! Total amount: ₹${orderDetails.total}. Your food will be delivered soon.`
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );
    return { success: true, message: 'Order confirmation email sent' };
  } catch (error) {
    console.error('Error sending order email:', error);
    return { success: false, message: 'Failed to send order email' };
  }
};

// Send Order Confirmation SMS
export const sendOrderConfirmationSMS = async (phoneNumber, userName, orderDetails) => {
  try {
    const message = `🍴 Foodii: Order #${orderDetails.orderId} confirmed! Amount: ₹${orderDetails.total}. Your delicious food will arrive in 25-35 minutes. Track your order in the app. Thank you ${userName}!`;
    
    if (!SMS_CONFIG.ENABLED) {
      console.log(`📱 Order SMS would be sent to ${phoneNumber}: ${message}`);
      return { success: true, message: 'Order SMS would be sent (SMS gateway not configured)' };
    }
    
    return await sendActualSMS(phoneNumber, message);
  } catch (error) {
    console.error('Error sending order SMS:', error);
    return { success: false, message: 'Failed to send order SMS' };
  }
};

// Send Order Status Update Email
export const sendOrderStatusEmail = async (userEmail, userName, orderId, status) => {
  try {
    console.log(`📧 Order status email sent to ${userEmail}: Order #${orderId} is now ${status}`);
    
    if (!EMAILJS_CONFIG.PUBLIC_KEY || EMAILJS_CONFIG.PUBLIC_KEY === 'your_public_key') {
      return { success: true, message: 'Order status email sent (simulation mode)' };
    }

    const templateParams = {
      to_email: userEmail,
      user_name: userName,
      order_id: orderId,
      order_status: status,
      message: `Your order #${orderId} status has been updated to ${status}.`
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );
    return { success: true, message: 'Order status email sent' };
  } catch (error) {
    console.error('Error sending order status email:', error);
    return { success: false, message: 'Failed to send order status email' };
  }
};

// Send Payment Confirmation Email
export const sendPaymentConfirmationEmail = async (userEmail, userName, paymentDetails) => {
  try {
    console.log(`📧 Payment confirmation email sent to ${userEmail}`);
    console.log(`Payment: ${paymentDetails.method} - ₹${paymentDetails.amount} for Order #${paymentDetails.orderId}`);
    
    if (!EMAILJS_CONFIG.PUBLIC_KEY || EMAILJS_CONFIG.PUBLIC_KEY === 'your_public_key') {
      return { success: true, message: 'Payment confirmation email sent (simulation mode)' };
    }

    const templateParams = {
      to_email: userEmail,
      user_name: userName,
      order_id: paymentDetails.orderId,
      payment_amount: paymentDetails.amount,
      payment_method: paymentDetails.method,
      message: `Payment of ₹${paymentDetails.amount} for order #${paymentDetails.orderId} has been successfully processed via ${paymentDetails.method}.`
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );
    return { success: true, message: 'Payment confirmation email sent' };
  } catch (error) {
    console.error('Error sending payment email:', error);
    return { success: false, message: 'Failed to send payment email' };
  }
};

// Send Payment Confirmation SMS
export const sendPaymentConfirmationSMS = async (phoneNumber, userName, paymentDetails) => {
  try {
    const message = `💳 Foodii: Payment of ₹${paymentDetails.amount} received for order #${paymentDetails.orderId} via ${paymentDetails.method}. Your order is now confirmed! Thank you ${userName}!`;
    
    if (!SMS_CONFIG.ENABLED) {
      console.log(`📱 Payment SMS would be sent to ${phoneNumber}: ${message}`);
      return { success: true, message: 'Payment SMS would be sent (SMS gateway not configured)' };
    }
    
    return await sendActualSMS(phoneNumber, message);
  } catch (error) {
    console.error('Error sending payment SMS:', error);
    return { success: false, message: 'Failed to send payment SMS' };
  }
};

// Send Login Notification Email
export const sendLoginNotificationEmail = async (userEmail, userName, loginTime) => {
  try {
    console.log(`📧 Login notification email sent to ${userEmail}`);
    console.log(`Login time: ${loginTime} from ${userName}`);
    
    if (!EMAILJS_CONFIG.PUBLIC_KEY || EMAILJS_CONFIG.PUBLIC_KEY === 'your_public_key') {
      return { success: true, message: 'Login notification email sent (simulation mode)' };
    }

    const templateParams = {
      to_email: userEmail,
      user_name: userName,
      login_time: loginTime,
      message: `Your Foodii account was accessed at ${loginTime}. If this wasn't you, please contact support immediately.`
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );
    return { success: true, message: 'Login notification email sent' };
  } catch (error) {
    console.error('Error sending login notification:', error);
    return { success: false, message: 'Failed to send login notification' };
  }
};

// Send Promotional SMS (Optional)
export const sendPromotionalSMS = async (phoneNumber, message) => {
  try {
    if (!SMS_CONFIG.ENABLED) {
      console.log(`📱 Promotional SMS would be sent to ${phoneNumber}: ${message}`);
      return { success: true, message: 'Promotional SMS would be sent (SMS gateway not configured)' };
    }
    return await sendActualSMS(phoneNumber, message);
  } catch (error) {
    console.error('Error sending promotional SMS:', error);
    return { success: false, message: 'Failed to send promotional SMS' };
  }
};

// Combined notification function for order placement
export const sendOrderNotifications = async (user, orderDetails) => {
  const notifications = [];
  
  // Send Email
  const emailResult = await sendOrderConfirmationEmail(
    user.email,
    user.name,
    orderDetails
  );
  notifications.push({ type: 'email', ...emailResult });
  
  // Send SMS if phone number exists
  if (user.phone) {
    const smsResult = await sendOrderConfirmationSMS(
      user.phone,
      user.name,
      orderDetails
    );
    notifications.push({ type: 'sms', ...smsResult });
  }
  
  return notifications;
};

// Combined notification for signup
export const sendWelcomeNotifications = async (user) => {
  const notifications = [];
  
  // Send Welcome Email
  const emailResult = await sendWelcomeEmail(user.email, user.name);
  notifications.push({ type: 'email', ...emailResult });
  
  // Send Welcome SMS if phone exists
  if (user.phone) {
    const smsResult = await sendWelcomeSMS(user.phone, user.name);
    notifications.push({ type: 'sms', ...smsResult });
  }
  
  return notifications;
};

// Combined notification for payment
export const sendPaymentNotifications = async (user, paymentDetails) => {
  const notifications = [];
  
  // Send Payment Email
  const emailResult = await sendPaymentConfirmationEmail(
    user.email,
    user.name,
    paymentDetails
  );
  notifications.push({ type: 'email', ...emailResult });
  
  // Send Payment SMS if phone exists
  if (user.phone) {
    const smsResult = await sendPaymentConfirmationSMS(
      user.phone,
      user.name,
      paymentDetails
    );
    notifications.push({ type: 'sms', ...smsResult });
  }
  
  return notifications;
};