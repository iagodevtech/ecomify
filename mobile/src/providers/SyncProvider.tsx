import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useAuth } from './AuthProvider';
import { SyncService } from '../lib/sync';

interface SyncContextType {
  isSyncing: boolean;
  lastSync: string | null;
  syncError: string | null;
  syncUserData: () => Promise<void>;
  forceFullSync: () => Promise<void>;
  backgroundSync: () => Promise<void>;
}

const SyncContext = createContext<SyncContextType | undefined>(undefined);

export function useSync() {
  const context = useContext(SyncContext);
  if (context === undefined) {
    throw new Error('useSync must be used within a SyncProvider');
  }
  return context;
}

export function SyncProvider({ children }: { children: React.ReactNode }) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);
  
  const { user } = useAuth();

  useEffect(() => {
    // Load last sync time on mount
    loadLastSync();
  }, []);

  useEffect(() => {
    // Sync when user changes
    if (user) {
      syncUserData();
    }
  }, [user]);

  useEffect(() => {
    // Set up app state listener for background sync
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active' && user) {
        backgroundSync();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, [user]);

  const loadLastSync = async () => {
    try {
      const lastSyncTime = await SyncService.getLastSync();
      setLastSync(lastSyncTime);
    } catch (error) {
      console.error('Error loading last sync:', error);
    }
  };

  const syncUserData = async () => {
    if (!user || isSyncing) return;

    setIsSyncing(true);
    setSyncError(null);

    try {
      const result = await SyncService.syncUserData(user.id);
      
      if (result.success) {
        setLastSync(result.lastSync);
      } else {
        setSyncError('Erro na sincronização');
      }
    } catch (error) {
      console.error('Error syncing user data:', error);
      setSyncError('Erro na sincronização');
    } finally {
      setIsSyncing(false);
    }
  };

  const forceFullSync = async () => {
    if (!user || isSyncing) return;

    setIsSyncing(true);
    setSyncError(null);

    try {
      const result = await SyncService.forceFullSync(user.id);
      
      if (result.success) {
        setLastSync(result.lastSync);
      } else {
        setSyncError('Erro na sincronização completa');
      }
    } catch (error) {
      console.error('Error in force full sync:', error);
      setSyncError('Erro na sincronização completa');
    } finally {
      setIsSyncing(false);
    }
  };

  const backgroundSync = async () => {
    if (!user || isSyncing) return;

    try {
      const result = await SyncService.backgroundSync(user.id);
      
      if (result.success && result.lastSync) {
        setLastSync(result.lastSync);
      }
    } catch (error) {
      console.error('Error in background sync:', error);
    }
  };

  const value = {
    isSyncing,
    lastSync,
    syncError,
    syncUserData,
    forceFullSync,
    backgroundSync,
  };

  return (
    <SyncContext.Provider value={value}>
      {children}
    </SyncContext.Provider>
  );
}
