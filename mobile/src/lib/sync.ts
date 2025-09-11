import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './supabase';
import { NotificationService } from './notifications';

export class SyncService {
  private static readonly SYNC_KEYS = {
    LAST_SYNC: 'last_sync',
    CART_DATA: 'cart_data',
    USER_PREFERENCES: 'user_preferences',
    FAVORITES: 'favorites',
    PRICE_ALERTS: 'price_alerts',
  };

  // Sync user data with server
  static async syncUserData(userId: string) {
    try {
      const lastSync = await this.getLastSync();
      const now = new Date().toISOString();

      // Sync cart data
      await this.syncCartData(userId);
      
      // Sync user preferences
      await this.syncUserPreferences(userId);
      
      // Sync favorites
      await this.syncFavorites(userId);
      
      // Sync price alerts
      await this.syncPriceAlerts(userId);

      // Update last sync time
      await AsyncStorage.setItem(this.SYNC_KEYS.LAST_SYNC, now);
      
      return { success: true, lastSync: now };
    } catch (error) {
      console.error('Error syncing user data:', error);
      return { success: false, error };
    }
  }

  // Sync cart data
  static async syncCartData(userId: string) {
    try {
      // Get local cart data
      const localCart = await AsyncStorage.getItem(this.SYNC_KEYS.CART_DATA);
      const localCartData = localCart ? JSON.parse(localCart) : [];

      // Get server cart data
      const { data: serverCart, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      // Merge cart data (server takes precedence for conflicts)
      const mergedCart = this.mergeCartData(localCartData, serverCart || []);

      // Save merged data locally
      await AsyncStorage.setItem(this.SYNC_KEYS.CART_DATA, JSON.stringify(mergedCart));

      // Update server with merged data
      if (mergedCart.length > 0) {
        const { error: updateError } = await supabase
          .from('cart_items')
          .upsert(
            mergedCart.map(item => ({
              ...item,
              user_id: userId,
              updated_at: new Date().toISOString(),
            }))
          );

        if (updateError) throw updateError;
      }

      return { success: true, cartData: mergedCart };
    } catch (error) {
      console.error('Error syncing cart data:', error);
      return { success: false, error };
    }
  }

  // Sync user preferences
  static async syncUserPreferences(userId: string) {
    try {
      // Get local preferences
      const localPrefs = await AsyncStorage.getItem(this.SYNC_KEYS.USER_PREFERENCES);
      const localPreferences = localPrefs ? JSON.parse(localPrefs) : {};

      // Get server preferences
      const { data: user, error } = await supabase
        .from('users')
        .select('preferences')
        .eq('id', userId)
        .single();

      if (error) throw error;

      // Merge preferences (local takes precedence for UI preferences)
      const mergedPreferences = {
        ...user.preferences,
        ...localPreferences,
      };

      // Save merged preferences locally
      await AsyncStorage.setItem(this.SYNC_KEYS.USER_PREFERENCES, JSON.stringify(mergedPreferences));

      // Update server with merged preferences
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          preferences: mergedPreferences,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (updateError) throw updateError;

      return { success: true, preferences: mergedPreferences };
    } catch (error) {
      console.error('Error syncing user preferences:', error);
      return { success: false, error };
    }
  }

  // Sync favorites
  static async syncFavorites(userId: string) {
    try {
      // Get local favorites
      const localFavorites = await AsyncStorage.getItem(this.SYNC_KEYS.FAVORITES);
      const localFavoritesData = localFavorites ? JSON.parse(localFavorites) : [];

      // Get server favorites
      const { data: serverFavorites, error } = await supabase
        .from('wishlists')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      // Merge favorites data
      const mergedFavorites = this.mergeFavoritesData(localFavoritesData, serverFavorites || []);

      // Save merged data locally
      await AsyncStorage.setItem(this.SYNC_KEYS.FAVORITES, JSON.stringify(mergedFavorites));

      return { success: true, favorites: mergedFavorites };
    } catch (error) {
      console.error('Error syncing favorites:', error);
      return { success: false, error };
    }
  }

  // Sync price alerts
  static async syncPriceAlerts(userId: string) {
    try {
      // Get local price alerts
      const localAlerts = await AsyncStorage.getItem(this.SYNC_KEYS.PRICE_ALERTS);
      const localAlertsData = localAlerts ? JSON.parse(localAlerts) : [];

      // Get server price alerts
      const { data: serverAlerts, error } = await supabase
        .from('price_alerts')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      // Merge price alerts data
      const mergedAlerts = this.mergePriceAlertsData(localAlertsData, serverAlerts || []);

      // Save merged data locally
      await AsyncStorage.setItem(this.SYNC_KEYS.PRICE_ALERTS, JSON.stringify(mergedAlerts));

      // Check for triggered alerts and send notifications
      await this.checkTriggeredAlerts(mergedAlerts);

      return { success: true, alerts: mergedAlerts };
    } catch (error) {
      console.error('Error syncing price alerts:', error);
      return { success: false, error };
    }
  }

  // Merge cart data
  private static mergeCartData(localCart: any[], serverCart: any[]) {
    const merged = [...serverCart];
    
    localCart.forEach(localItem => {
      const existingIndex = merged.findIndex(item => item.product_id === localItem.product_id);
      
      if (existingIndex >= 0) {
        // Update existing item with latest timestamp
        if (new Date(localItem.updated_at) > new Date(merged[existingIndex].updated_at)) {
          merged[existingIndex] = localItem;
        }
      } else {
        // Add new item
        merged.push(localItem);
      }
    });

    return merged;
  }

  // Merge favorites data
  private static mergeFavoritesData(localFavorites: any[], serverFavorites: any[]) {
    const merged = [...serverFavorites];
    
    localFavorites.forEach(localFavorite => {
      const existingIndex = merged.findIndex(item => item.id === localFavorite.id);
      
      if (existingIndex >= 0) {
        // Update existing favorite
        if (new Date(localFavorite.updated_at) > new Date(merged[existingIndex].updated_at)) {
          merged[existingIndex] = localFavorite;
        }
      } else {
        // Add new favorite
        merged.push(localFavorite);
      }
    });

    return merged;
  }

  // Merge price alerts data
  private static mergePriceAlertsData(localAlerts: any[], serverAlerts: any[]) {
    const merged = [...serverAlerts];
    
    localAlerts.forEach(localAlert => {
      const existingIndex = merged.findIndex(item => item.id === localAlert.id);
      
      if (existingIndex >= 0) {
        // Update existing alert
        if (new Date(localAlert.updated_at) > new Date(merged[existingIndex].updated_at)) {
          merged[existingIndex] = localAlert;
        }
      } else {
        // Add new alert
        merged.push(localAlert);
      }
    });

    return merged;
  }

  // Check for triggered price alerts
  private static async checkTriggeredAlerts(alerts: any[]) {
    for (const alert of alerts) {
      if (alert.is_active && !alert.triggered_at) {
        // Get current product price
        const { data: product, error } = await supabase
          .from('products')
          .select('price, name')
          .eq('id', alert.product_id)
          .single();

        if (error) continue;

        // Check if price target is reached
        if (product.price <= alert.target_price) {
          // Send notification
          await NotificationService.schedulePriceAlert(
            product.name,
            alert.target_price,
            product.price
          );

          // Mark alert as triggered
          await supabase
            .from('price_alerts')
            .update({ 
              triggered_at: new Date().toISOString(),
              is_active: false,
            })
            .eq('id', alert.id);
        }
      }
    }
  }

  // Get last sync time
  static async getLastSync(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(this.SYNC_KEYS.LAST_SYNC);
    } catch (error) {
      console.error('Error getting last sync:', error);
      return null;
    }
  }

  // Force full sync
  static async forceFullSync(userId: string) {
    try {
      // Clear local data
      await AsyncStorage.multiRemove([
        this.SYNC_KEYS.CART_DATA,
        this.SYNC_KEYS.USER_PREFERENCES,
        this.SYNC_KEYS.FAVORITES,
        this.SYNC_KEYS.PRICE_ALERTS,
        this.SYNC_KEYS.LAST_SYNC,
      ]);

      // Perform full sync
      return await this.syncUserData(userId);
    } catch (error) {
      console.error('Error in force full sync:', error);
      return { success: false, error };
    }
  }

  // Check if sync is needed
  static async isSyncNeeded(): Promise<boolean> {
    try {
      const lastSync = await this.getLastSync();
      if (!lastSync) return true;

      const lastSyncTime = new Date(lastSync);
      const now = new Date();
      const diffInMinutes = (now.getTime() - lastSyncTime.getTime()) / (1000 * 60);

      // Sync if more than 5 minutes have passed
      return diffInMinutes > 5;
    } catch (error) {
      console.error('Error checking sync status:', error);
      return true;
    }
  }

  // Sync in background
  static async backgroundSync(userId: string) {
    try {
      const syncNeeded = await this.isSyncNeeded();
      if (syncNeeded) {
        return await this.syncUserData(userId);
      }
      return { success: true, message: 'Sync not needed' };
    } catch (error) {
      console.error('Error in background sync:', error);
      return { success: false, error };
    }
  }
}
