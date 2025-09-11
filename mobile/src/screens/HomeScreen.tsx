import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../providers/ThemeProvider';
import { useCart } from '../providers/CartProvider';

const { width } = Dimensions.get('window');

interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  discount?: number;
  images: string[];
  rating: number;
  review_count: number;
  brand: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  product_count: number;
}

export function HomeScreen() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const { colors } = useTheme();
  const { addItem } = useCart();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      setFeaturedProducts([
        {
          id: '1',
          name: 'MacBook Pro M3',
          price: 12999,
          original_price: 14999,
          discount: 13,
          images: ['https://via.placeholder.com/300x200'],
          rating: 4.8,
          review_count: 124,
          brand: 'Apple',
        },
        {
          id: '2',
          name: 'iPhone 15 Pro',
          price: 8999,
          original_price: 9999,
          discount: 10,
          images: ['https://via.placeholder.com/300x200'],
          rating: 4.9,
          review_count: 89,
          brand: 'Apple',
        },
        {
          id: '3',
          name: 'Samsung Galaxy S24',
          price: 7999,
          original_price: 8999,
          discount: 11,
          images: ['https://via.placeholder.com/300x200'],
          rating: 4.7,
          review_count: 156,
          brand: 'Samsung',
        },
      ]);

      setCategories([
        {
          id: '1',
          name: 'Laptops',
          icon: 'laptop',
          image: 'https://via.placeholder.com/150x100',
          product_count: 45,
        },
        {
          id: '2',
          name: 'Smartphones',
          icon: 'phone-portrait',
          image: 'https://via.placeholder.com/150x100',
          product_count: 32,
        },
        {
          id: '3',
          name: 'Gaming',
          icon: 'game-controller',
          image: 'https://via.placeholder.com/150x100',
          product_count: 28,
        },
        {
          id: '4',
          name: 'Áudio',
          icon: 'headset',
          image: 'https://via.placeholder.com/150x100',
          product_count: 19,
        },
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail' as never, { product } as never);
  };

  const handleCategoryPress = (category: Category) => {
    navigation.navigate('Category' as never, { category } as never);
  };

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={[styles.productCard, { backgroundColor: colors.surface }]}
      onPress={() => handleProductPress(item)}
    >
      <Image source={{ uri: item.images[0] }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={[styles.productBrand, { color: colors.textSecondary }]}>
          {item.brand}
        </Text>
        <Text style={[styles.productName, { color: colors.text }]} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.productRating}>
          <Ionicons name="star" size={16} color="#fbbf24" />
          <Text style={[styles.ratingText, { color: colors.textSecondary }]}>
            {item.rating} ({item.review_count})
          </Text>
        </View>
        <View style={styles.productPrice}>
          {item.original_price && (
            <Text style={[styles.originalPrice, { color: colors.textSecondary }]}>
              R$ {item.original_price.toLocaleString()}
            </Text>
          )}
          <Text style={[styles.currentPrice, { color: colors.primary }]}>
            R$ {item.price.toLocaleString()}
          </Text>
          {item.discount && (
            <Text style={[styles.discount, { color: colors.accent }]}>
              -{item.discount}%
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={[styles.addToCartButton, { backgroundColor: colors.primary }]}
          onPress={() => handleAddToCart(item)}
        >
          <Ionicons name="cart" size={16} color="#ffffff" />
          <Text style={styles.addToCartText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[styles.categoryCard, { backgroundColor: colors.surface }]}
      onPress={() => handleCategoryPress(item)}
    >
      <View style={styles.categoryIcon}>
        <Ionicons name={item.icon as any} size={32} color={colors.primary} />
      </View>
      <Text style={[styles.categoryName, { color: colors.text }]}>
        {item.name}
      </Text>
      <Text style={[styles.categoryCount, { color: colors.textSecondary }]}>
        {item.product_count} produtos
      </Text>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logo: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.primary,
      marginLeft: 8,
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    content: {
      flex: 1,
    },
    section: {
      marginBottom: 24,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    seeAllButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    seeAllText: {
      fontSize: 14,
      color: colors.primary,
      marginRight: 4,
    },
    categoriesList: {
      paddingLeft: 20,
    },
    categoryCard: {
      alignItems: 'center',
      padding: 16,
      marginRight: 16,
      borderRadius: 12,
      width: 100,
    },
    categoryIcon: {
      marginBottom: 8,
    },
    categoryName: {
      fontSize: 14,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 4,
    },
    categoryCount: {
      fontSize: 12,
      textAlign: 'center',
    },
    productsList: {
      paddingHorizontal: 20,
    },
    productCard: {
      width: (width - 60) / 2,
      marginRight: 20,
      marginBottom: 20,
      borderRadius: 12,
      overflow: 'hidden',
    },
    productImage: {
      width: '100%',
      height: 120,
      resizeMode: 'cover',
    },
    productInfo: {
      padding: 12,
    },
    productBrand: {
      fontSize: 12,
      fontWeight: '500',
      marginBottom: 4,
    },
    productName: {
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 8,
      lineHeight: 18,
    },
    productRating: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    ratingText: {
      fontSize: 12,
      marginLeft: 4,
    },
    productPrice: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      flexWrap: 'wrap',
    },
    originalPrice: {
      fontSize: 12,
      textDecorationLine: 'line-through',
      marginRight: 8,
    },
    currentPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      marginRight: 8,
    },
    discount: {
      fontSize: 12,
      fontWeight: '600',
    },
    addToCartButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      borderRadius: 8,
    },
    addToCartText: {
      color: '#ffffff',
      fontSize: 12,
      fontWeight: '600',
      marginLeft: 4,
    },
  });

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.text }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="flash" size={24} color={colors.primary} />
          <Text style={styles.logo}>ECOMIFY</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categorias</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Ver todas</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Produtos em Destaque</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Ver todos</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        </View>
      </ScrollView>
    </View>
  );
}
