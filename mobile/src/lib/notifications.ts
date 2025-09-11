import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { supabase } from './supabase';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export class NotificationService {
  // Register for push notifications
  static async registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#00f5ff',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }
      
      try {
        const projectId = Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;
        if (!projectId) {
          throw new Error('Project ID not found');
        }
        
        token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
        console.log('Push token:', token);
      } catch (error) {
        console.error('Error getting push token:', error);
        return;
      }
    } else {
      console.log('Must use physical device for Push Notifications');
    }

    return token;
  }

  // Save push token to Supabase
  static async savePushToken(userId: string, token: string) {
    try {
      const { error } = await supabase
        .from('user_tokens')
        .upsert({
          user_id: userId,
          push_token: token,
          platform: Platform.OS,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error saving push token:', error);
      return { success: false, error };
    }
  }

  // Schedule local notification
  static async scheduleLocalNotification(title: string, body: string, data?: any) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
          sound: 'default',
        },
        trigger: null, // Show immediately
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  }

  // Schedule price alert notification
  static async schedulePriceAlert(productName: string, targetPrice: number, currentPrice: number) {
    const title = '🎯 Alerta de Preço!';
    const body = `${productName} atingiu o preço desejado de R$ ${targetPrice.toLocaleString()}. Preço atual: R$ ${currentPrice.toLocaleString()}`;
    
    await this.scheduleLocalNotification(title, body, {
      type: 'price_alert',
      productName,
      targetPrice,
      currentPrice,
    });
  }

  // Schedule order update notification
  static async scheduleOrderUpdate(orderNumber: string, status: string) {
    const title = '📦 Atualização do Pedido';
    const body = `Seu pedido #${orderNumber} foi atualizado para: ${status}`;
    
    await this.scheduleLocalNotification(title, body, {
      type: 'order_update',
      orderNumber,
      status,
    });
  }

  // Schedule promotion notification
  static async schedulePromotionNotification(title: string, description: string, discount: number) {
    const notificationTitle = '🎉 Promoção Especial!';
    const body = `${title} - ${description} (${discount}% OFF)`;
    
    await this.scheduleLocalNotification(notificationTitle, body, {
      type: 'promotion',
      title,
      description,
      discount,
    });
  }

  // Get notification permissions status
  static async getNotificationPermissions() {
    const { status } = await Notifications.getPermissionsAsync();
    return status;
  }

  // Request notification permissions
  static async requestNotificationPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    return status;
  }

  // Cancel all scheduled notifications
  static async cancelAllScheduledNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  // Get all scheduled notifications
  static async getAllScheduledNotifications() {
    return await Notifications.getAllScheduledNotificationsAsync();
  }

  // Add notification listener
  static addNotificationListener(listener: (notification: Notifications.Notification) => void) {
    return Notifications.addNotificationReceivedListener(listener);
  }

  // Add notification response listener
  static addNotificationResponseListener(listener: (response: Notifications.NotificationResponse) => void) {
    return Notifications.addNotificationResponseReceivedListener(listener);
  }

  // Remove notification listener
  static removeNotificationListener(subscription: Notifications.Subscription) {
    Notifications.removeNotificationSubscription(subscription);
  }
}
