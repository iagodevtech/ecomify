import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export class BiometricService {
  // Check if biometric authentication is available
  static async isAvailable(): Promise<boolean> {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      return compatible && enrolled;
    } catch (error) {
      console.error('Error checking biometric availability:', error);
      return false;
    }
  }

  // Get available biometric types
  static async getAvailableTypes(): Promise<LocalAuthentication.AuthenticationType[]> {
    try {
      return await LocalAuthentication.supportedAuthenticationTypesAsync();
    } catch (error) {
      console.error('Error getting biometric types:', error);
      return [];
    }
  }

  // Authenticate with biometrics
  static async authenticate(reason: string = 'Autentique-se para continuar'): Promise<boolean> {
    try {
      const isAvailable = await this.isAvailable();
      if (!isAvailable) {
        throw new Error('Biometric authentication not available');
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: reason,
        fallbackLabel: 'Usar senha',
        disableDeviceFallback: false,
        cancelLabel: 'Cancelar',
      });

      return result.success;
    } catch (error) {
      console.error('Error during biometric authentication:', error);
      return false;
    }
  }

  // Save credentials securely with biometric protection
  static async saveCredentialsSecurely(key: string, credentials: any): Promise<boolean> {
    try {
      const isAvailable = await this.isAvailable();
      if (!isAvailable) {
        // Fallback to regular secure store
        await SecureStore.setItemAsync(key, JSON.stringify(credentials));
        return true;
      }

      // Use biometric authentication to save
      const authenticated = await this.authenticate('Autentique-se para salvar suas credenciais');
      if (authenticated) {
        await SecureStore.setItemAsync(key, JSON.stringify(credentials));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error saving credentials securely:', error);
      return false;
    }
  }

  // Retrieve credentials with biometric authentication
  static async getCredentialsSecurely(key: string): Promise<any | null> {
    try {
      const isAvailable = await this.isAvailable();
      if (!isAvailable) {
        // Fallback to regular secure store
        const credentials = await SecureStore.getItemAsync(key);
        return credentials ? JSON.parse(credentials) : null;
      }

      // Use biometric authentication to retrieve
      const authenticated = await this.authenticate('Autentique-se para acessar suas credenciais');
      if (authenticated) {
        const credentials = await SecureStore.getItemAsync(key);
        return credentials ? JSON.parse(credentials) : null;
      }
      
      return null;
    } catch (error) {
      console.error('Error retrieving credentials securely:', error);
      return null;
    }
  }

  // Delete credentials
  static async deleteCredentials(key: string): Promise<boolean> {
    try {
      await SecureStore.deleteItemAsync(key);
      return true;
    } catch (error) {
      console.error('Error deleting credentials:', error);
      return false;
    }
  }

  // Save user session with biometric protection
  static async saveUserSession(userData: any): Promise<boolean> {
    return await this.saveCredentialsSecurely('user_session', userData);
  }

  // Get user session with biometric authentication
  static async getUserSession(): Promise<any | null> {
    return await this.getCredentialsSecurely('user_session');
  }

  // Save payment methods with biometric protection
  static async savePaymentMethod(paymentData: any): Promise<boolean> {
    return await this.saveCredentialsSecurely('payment_methods', paymentData);
  }

  // Get payment methods with biometric authentication
  static async getPaymentMethods(): Promise<any | null> {
    return await this.getCredentialsSecurely('payment_methods');
  }

  // Check if biometric is enabled for the app
  static async isBiometricEnabled(): Promise<boolean> {
    try {
      const enabled = await SecureStore.getItemAsync('biometric_enabled');
      return enabled === 'true';
    } catch (error) {
      console.error('Error checking biometric enabled status:', error);
      return false;
    }
  }

  // Enable biometric authentication
  static async enableBiometric(): Promise<boolean> {
    try {
      const isAvailable = await this.isAvailable();
      if (!isAvailable) {
        throw new Error('Biometric authentication not available');
      }

      const authenticated = await this.authenticate('Autentique-se para habilitar a biometria');
      if (authenticated) {
        await SecureStore.setItemAsync('biometric_enabled', 'true');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error enabling biometric:', error);
      return false;
    }
  }

  // Disable biometric authentication
  static async disableBiometric(): Promise<boolean> {
    try {
      await SecureStore.deleteItemAsync('biometric_enabled');
      return true;
    } catch (error) {
      console.error('Error disabling biometric:', error);
      return false;
    }
  }

  // Get biometric type name
  static getBiometricTypeName(type: LocalAuthentication.AuthenticationType): string {
    switch (type) {
      case LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION:
        return 'Reconhecimento Facial';
      case LocalAuthentication.AuthenticationType.FINGERPRINT:
        return 'Impressão Digital';
      case LocalAuthentication.AuthenticationType.IRIS:
        return 'Reconhecimento de Íris';
      default:
        return 'Biometria';
    }
  }

  // Get all available biometric types as strings
  static async getAvailableBiometricTypes(): Promise<string[]> {
    try {
      const types = await this.getAvailableTypes();
      return types.map(type => this.getBiometricTypeName(type));
    } catch (error) {
      console.error('Error getting biometric types:', error);
      return [];
    }
  }
}
