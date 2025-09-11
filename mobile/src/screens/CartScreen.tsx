import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../providers/CartProvider';
import { useTheme } from '../providers/ThemeProvider';

export function CartScreen() {
  const { items, total, itemCount } = useCart();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    icon: {
      marginBottom: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 24,
    },
    itemCount: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.primary,
      marginBottom: 8,
    },
    total: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 24,
    },
    checkoutButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 32,
      paddingVertical: 16,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkoutButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 8,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons 
          name="cart" 
          size={64} 
          color={colors.textSecondary} 
          style={styles.icon}
        />
        <Text style={styles.title}>Carrinho</Text>
        <Text style={styles.subtitle}>
          {itemCount > 0 
            ? `Você tem ${itemCount} item(s) no carrinho`
            : 'Seu carrinho está vazio'
          }
        </Text>
        
        {itemCount > 0 && (
          <>
            <Text style={styles.itemCount}>
              {itemCount} {itemCount === 1 ? 'item' : 'itens'}
            </Text>
            <Text style={styles.total}>
              Total: R$ {total.toLocaleString()}
            </Text>
            <TouchableOpacity style={styles.checkoutButton}>
              <Ionicons name="card" size={20} color="#ffffff" />
              <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}
