import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { useAuth } from './AuthProvider';
import { NotificationService } from '../lib/notifications';
import { BiometricService } from '../lib/biometrics';

interface NotificationContextType {
  isEnabled: boolean;
  pushToken: string | null;
  enableNotifications: () => Promise<void>;
  disableNotifications: () => Promise<void>;
  schedulePriceAlert: (productName: string, targetPrice: number, currentPrice: number) => Promise<void>;
  scheduleOrderUpdate: (orderNumber: string, status: string) => Promise<void>;
  schedulePromotion: (title: string, description: string, discount: number) => Promise<void>;
  biometricAvailable: boolean;
  biometricEnabled: boolean;
  biometricTypes: string[];
  enableBiometric: () => Promise<void>;
  disableBiometric: () => Promise<void>;
  authenticateWithBiometric: (reason?: string) => Promise<boolean>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [pushToken, setPushToken] = useState<string | null>(null);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [biometricTypes, setBiometricTypes] = useState<string[]>([]);
  
  const { user } = useAuth();

  useEffect(() => {
    initializeNotifications();
    initializeBiometrics();
  }, []);

  useEffect(() => {
    if (user && pushToken) {
      savePushToken();
    }
  }, [user, pushToken]);

  const initializeNotifications = async () => {
    try {
      const status = await NotificationService.getNotificationPermissions();
      setIsEnabled(status === 'granted');

      if (status === 'granted') {
        const token = await NotificationService.registerForPushNotificationsAsync();
        if (token) {
          setPushToken(token);
        }
      }
    } catch (error) {
      console.error('Error initializing notifications:', error);
    }
  };

  const initializeBiometrics = async () => {
    try {
      const available = await BiometricService.isAvailable();
      setBiometricAvailable(available);

      if (available) {
        const types = await BiometricService.getAvailableBiometricTypes();
        setBiometricTypes(types);

        const enabled = await BiometricService.isBiometricEnabled();
        setBiometricEnabled(enabled);
      }
    } catch (error) {
      console.error('Error initializing biometrics:', error);
    }
  };

  const savePushToken = async () => {
    if (user && pushToken) {
      try {
        await NotificationService.savePushToken(user.id, pushToken);
      } catch (error) {
        console.error('Error saving push token:', error);
      }
    }
  };

  const enableNotifications = async () => {
    try {
      const status = await NotificationService.requestNotificationPermissions();
      
      if (status === 'granted') {
        setIsEnabled(true);
        const token = await NotificationService.registerForPushNotificationsAsync();
        if (token) {
          setPushToken(token);
          if (user) {
            await NotificationService.savePushToken(user.id, token);
          }
        }
        
        Alert.alert(
          'Notificações Habilitadas',
          'Você receberá alertas sobre promoções, atualizações de pedidos e alertas de preço.'
        );
      } else {
        Alert.alert(
          'Permissão Negada',
          'Para receber notificações, você precisa habilitar as permissões nas configurações do dispositivo.'
        );
      }
    } catch (error) {
      console.error('Error enabling notifications:', error);
      Alert.alert('Erro', 'Não foi possível habilitar as notificações.');
    }
  };

  const disableNotifications = async () => {
    try {
      setIsEnabled(false);
      setPushToken(null);
      
      if (user) {
        // Remove push token from server
        await NotificationService.savePushToken(user.id, '');
      }
      
      Alert.alert('Notificações Desabilitadas', 'Você não receberá mais notificações.');
    } catch (error) {
      console.error('Error disabling notifications:', error);
    }
  };

  const schedulePriceAlert = async (productName: string, targetPrice: number, currentPrice: number) => {
    try {
      await NotificationService.schedulePriceAlert(productName, targetPrice, currentPrice);
    } catch (error) {
      console.error('Error scheduling price alert:', error);
    }
  };

  const scheduleOrderUpdate = async (orderNumber: string, status: string) => {
    try {
      await NotificationService.scheduleOrderUpdate(orderNumber, status);
    } catch (error) {
      console.error('Error scheduling order update:', error);
    }
  };

  const schedulePromotion = async (title: string, description: string, discount: number) => {
    try {
      await NotificationService.schedulePromotionNotification(title, description, discount);
    } catch (error) {
      console.error('Error scheduling promotion:', error);
    }
  };

  const enableBiometric = async () => {
    try {
      const success = await BiometricService.enableBiometric();
      if (success) {
        setBiometricEnabled(true);
        Alert.alert(
          'Biometria Habilitada',
          'A autenticação biométrica foi habilitada com sucesso.'
        );
      } else {
        Alert.alert(
          'Falha na Autenticação',
          'Não foi possível habilitar a biometria. Tente novamente.'
        );
      }
    } catch (error) {
      console.error('Error enabling biometric:', error);
      Alert.alert('Erro', 'Não foi possível habilitar a biometria.');
    }
  };

  const disableBiometric = async () => {
    try {
      const success = await BiometricService.disableBiometric();
      if (success) {
        setBiometricEnabled(false);
        Alert.alert(
          'Biometria Desabilitada',
          'A autenticação biométrica foi desabilitada.'
        );
      }
    } catch (error) {
      console.error('Error disabling biometric:', error);
      Alert.alert('Erro', 'Não foi possível desabilitar a biometria.');
    }
  };

  const authenticateWithBiometric = async (reason?: string): Promise<boolean> => {
    try {
      if (!biometricAvailable || !biometricEnabled) {
        return false;
      }

      const success = await BiometricService.authenticate(reason);
      return success;
    } catch (error) {
      console.error('Error authenticating with biometric:', error);
      return false;
    }
  };

  const value = {
    isEnabled,
    pushToken,
    enableNotifications,
    disableNotifications,
    schedulePriceAlert,
    scheduleOrderUpdate,
    schedulePromotion,
    biometricAvailable,
    biometricEnabled,
    biometricTypes,
    enableBiometric,
    disableBiometric,
    authenticateWithBiometric,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
