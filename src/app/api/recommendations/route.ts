import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const productId = searchParams.get('productId')
    const type = searchParams.get('type') || 'general'
    const limit = parseInt(searchParams.get('limit') || '10')

    let recommendations: any[] = []

    switch (type) {
      case 'user-based':
        recommendations = await getUserBasedRecommendations(userId, limit)
        break
      case 'product-based':
        recommendations = await getProductBasedRecommendations(productId, limit)
        break
      case 'trending':
        recommendations = await getTrendingRecommendations(limit)
        break
      case 'similar':
        recommendations = await getSimilarProducts(productId, limit)
        break
      default:
        recommendations = await getGeneralRecommendations(limit)
    }

    return NextResponse.json({
      recommendations,
      type,
      count: recommendations.length
    })
  } catch (error) {
    console.error('Error getting recommendations:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function getUserBasedRecommendations(userId: string | null, limit: number) {
  if (!userId) {
    return await getGeneralRecommendations(limit)
  }

  try {
    // Get user's order history
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select(`
        order_items (
          product_id,
          products (
            id,
            name,
            category,
            brand,
            price,
            images,
            rating
          )
        )
      `)
      .eq('user_id', userId)
      .eq('status', 'delivered')

    if (ordersError) throw ordersError

    // Get user's wishlist
    const { data: wishlist, error: wishlistError } = await supabase
      .from('wishlist')
      .select(`
        product_id,
        products (
          id,
          name,
          category,
          brand,
          price,
          images,
          rating
        )
      `)
      .eq('user_id', userId)

    if (wishlistError) throw wishlistError

    // Extract categories and brands from user preferences
    const categories = new Set<string>()
    const brands = new Set<string>()

    orders?.forEach(order => {
      order.order_items?.forEach((item: any) => {
        if (item.products) {
          categories.add(item.products.category)
          brands.add(item.products.brand)
        }
      })
    })

    wishlist?.forEach((item: any) => {
      if (item.products) {
        categories.add(item.products.category)
        brands.add(item.products.brand)
      }
    })

    // Get recommended products based on user preferences
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .in('category', Array.from(categories))
      .in('brand', Array.from(brands))
      .neq('user_id', userId) // Exclude products user already has
      .order('rating', { ascending: false })
      .limit(limit)

    if (productsError) throw productsError

    return products || []
  } catch (error) {
    console.error('Error in user-based recommendations:', error)
    return await getGeneralRecommendations(limit)
  }
}

async function getProductBasedRecommendations(productId: string | null, limit: number) {
  if (!productId) {
    return await getGeneralRecommendations(limit)
  }

  try {
    // Get the product details
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single()

    if (productError || !product) {
      return await getGeneralRecommendations(limit)
    }

    // Get similar products by category and brand
    const { data: similarProducts, error: similarError } = await supabase
      .from('products')
      .select('*')
      .or(`category.eq.${product.category},brand.eq.${product.brand}`)
      .neq('id', productId)
      .order('rating', { ascending: false })
      .limit(limit)

    if (similarError) throw similarError

    return similarProducts || []
  } catch (error) {
    console.error('Error in product-based recommendations:', error)
    return await getGeneralRecommendations(limit)
  }
}

async function getTrendingRecommendations(limit: number) {
  try {
    // Get products with high sales and ratings
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .gte('rating', 4.0)
      .gte('review_count', 10)
      .order('review_count', { ascending: false })
      .order('rating', { ascending: false })
      .limit(limit)

    if (error) throw error

    return products || []
  } catch (error) {
    console.error('Error in trending recommendations:', error)
    return await getGeneralRecommendations(limit)
  }
}

async function getSimilarProducts(productId: string | null, limit: number) {
  if (!productId) {
    return await getGeneralRecommendations(limit)
  }

  try {
    // Get the product details
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single()

    if (productError || !product) {
      return await getGeneralRecommendations(limit)
    }

    // Get products with similar price range (±20%)
    const priceMin = product.price * 0.8
    const priceMax = product.price * 1.2

    const { data: similarProducts, error: similarError } = await supabase
      .from('products')
      .select('*')
      .eq('category', product.category)
      .gte('price', priceMin)
      .lte('price', priceMax)
      .neq('id', productId)
      .order('rating', { ascending: false })
      .limit(limit)

    if (similarError) throw similarError

    return similarProducts || []
  } catch (error) {
    console.error('Error in similar products:', error)
    return await getGeneralRecommendations(limit)
  }
}

async function getGeneralRecommendations(limit: number) {
  try {
    // Get featured and highly rated products
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .or('is_featured.eq.true,rating.gte.4.5')
      .order('rating', { ascending: false })
      .order('review_count', { ascending: false })
      .limit(limit)

    if (error) throw error

    return products || []
  } catch (error) {
    console.error('Error in general recommendations:', error)
    return []
  }
}
