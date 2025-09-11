import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../providers/ThemeProvider';
import { useNotifications } from '../providers/NotificationProvider';
import { useSync } from '../providers/SyncProvider';

export function SettingsScreen() {
  const { colors, theme, toggleTheme, setTheme } = useTheme();
  const {
    isEnabled: notificationsEnabled,
    enableNotifications,
    disableNotifications,
    biometricAvailable,
    biometricEnabled,
    biometricTypes,
    enableBiometric,
    disableBiometric,
  } = useNotifications();
  
  const {
    isSyncing,
    lastSync,
    syncError,
    syncUserData,
    forceFullSync,
  } = useSync();

  const handleNotificationToggle = async (value: boolean) => {
    if (value) {
      await enableNotifications();
    } else {
      await disableNotifications();
    }
  };

  const handleBiometricToggle = async (value: boolean) => {
    if (value) {
      await enableBiometric();
    } else {
      await disableBiometric();
    }
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'cyber') => {
    setTheme(newTheme);
  };

  const handleSync = async () => {
    try {
      await syncUserData();
      Alert.alert('Sucesso', 'Dados sincronizados com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Falha na sincronização dos dados');
    }
  };

  const handleForceSync = async () => {
    Alert.alert(
      'Sincronização Completa',
      'Isso irá sobrescrever todos os dados locais com os dados do servidor. Continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Continuar',
          style: 'destructive',
          onPress: async () => {
            try {
              await forceFullSync();
              Alert.alert('Sucesso', 'Sincronização completa realizada!');
            } catch (error) {
              Alert.alert('Erro', 'Falha na sincronização completa');
            }
          },
        },
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: 20,
    },
    section: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      paddingHorizontal: 16,
      backgroundColor: colors.surface,
      borderRadius: 12,
      marginBottom: 12,
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    settingIcon: {
      marginRight: 12,
    },
    settingText: {
      flex: 1,
    },
    settingTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 2,
    },
    settingDescription: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    themeOption: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: colors.surface,
      borderRadius: 12,
      marginBottom: 8,
    },
    themeOptionSelected: {
      backgroundColor: colors.primary + '20',
      borderWidth: 1,
      borderColor: colors.primary,
    },
    themeOptionText: {
      fontSize: 16,
      color: colors.text,
      marginLeft: 12,
    },
    biometricInfo: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 4,
    },
    syncButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Notificações */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificações</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="notifications"
                size={24}
                color={colors.primary}
                style={styles.settingIcon}
              />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Notificações Push</Text>
                <Text style={styles.settingDescription}>
                  Receber alertas sobre promoções e atualizações
                </Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationToggle}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={notificationsEnabled ? '#ffffff' : colors.textSecondary}
            />
          </View>
        </View>

        {/* Segurança */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Segurança</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="finger-print"
                size={24}
                color={colors.primary}
                style={styles.settingIcon}
              />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Autenticação Biométrica</Text>
                <Text style={styles.settingDescription}>
                  {biometricAvailable 
                    ? `Usar ${biometricTypes.join(', ')} para login`
                    : 'Biometria não disponível neste dispositivo'
                  }
                </Text>
                {biometricAvailable && (
                  <Text style={styles.biometricInfo}>
                    Disponível: {biometricTypes.join(', ')}
                  </Text>
                )}
              </View>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={handleBiometricToggle}
              disabled={!biometricAvailable}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={biometricEnabled ? '#ffffff' : colors.textSecondary}
            />
          </View>
        </View>

        {/* Aparência */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aparência</Text>
          
          <TouchableOpacity
            style={[
              styles.themeOption,
              theme === 'light' && styles.themeOptionSelected,
            ]}
            onPress={() => handleThemeChange('light')}
          >
            <Ionicons
              name="sunny"
              size={20}
              color={theme === 'light' ? colors.primary : colors.textSecondary}
            />
            <Text
              style={[
                styles.themeOptionText,
                theme === 'light' && { color: colors.primary },
              ]}
            >
              Tema Claro
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.themeOption,
              theme === 'dark' && styles.themeOptionSelected,
            ]}
            onPress={() => handleThemeChange('dark')}
          >
            <Ionicons
              name="moon"
              size={20}
              color={theme === 'dark' ? colors.primary : colors.textSecondary}
            />
            <Text
              style={[
                styles.themeOptionText,
                theme === 'dark' && { color: colors.primary },
              ]}
            >
              Tema Escuro
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.themeOption,
              theme === 'cyber' && styles.themeOptionSelected,
            ]}
            onPress={() => handleThemeChange('cyber')}
          >
            <Ionicons
              name="flash"
              size={20}
              color={theme === 'cyber' ? colors.primary : colors.textSecondary}
            />
            <Text
              style={[
                styles.themeOptionText,
                theme === 'cyber' && { color: colors.primary },
              ]}
            >
              Tema Cyber
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sincronização */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sincronização</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="sync"
                size={24}
                color={colors.primary}
                style={styles.settingIcon}
              />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Sincronizar Dados</Text>
                <Text style={styles.settingDescription}>
                  {lastSync 
                    ? `Última sincronização: ${new Date(lastSync).toLocaleString()}`
                    : 'Nunca sincronizado'
                  }
                </Text>
                {syncError && (
                  <Text style={[styles.settingDescription, { color: colors.error }]}>
                    Erro: {syncError}
                  </Text>
                )}
              </View>
            </View>
            <TouchableOpacity
              onPress={handleSync}
              disabled={isSyncing}
              style={[
                styles.syncButton,
                { backgroundColor: isSyncing ? colors.textSecondary : colors.primary }
              ]}
            >
              <Ionicons 
                name={isSyncing ? "hourglass" : "sync"} 
                size={16} 
                color="#ffffff" 
              />
            </TouchableOpacity>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="refresh"
                size={24}
                color={colors.warning}
                style={styles.settingIcon}
              />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Sincronização Completa</Text>
                <Text style={styles.settingDescription}>
                  Força sincronização completa com o servidor
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleForceSync}
              disabled={isSyncing}
              style={[
                styles.syncButton,
                { backgroundColor: isSyncing ? colors.textSecondary : colors.warning }
              ]}
            >
              <Ionicons 
                name={isSyncing ? "hourglass" : "refresh"} 
                size={16} 
                color="#ffffff" 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sobre */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="information-circle"
                size={24}
                color={colors.primary}
                style={styles.settingIcon}
              />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Versão</Text>
                <Text style={styles.settingDescription}>1.0.0</Text>
              </View>
            </View>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="help-circle"
                size={24}
                color={colors.primary}
                style={styles.settingIcon}
              />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Ajuda e Suporte</Text>
                <Text style={styles.settingDescription}>Central de ajuda</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
