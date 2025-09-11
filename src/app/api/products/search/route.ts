import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const category = searchParams.get('category')
    const brand = searchParams.get('brand')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const rating = searchParams.get('rating')
    const inStock = searchParams.get('inStock')
    const sortBy = searchParams.get('sortBy') || 'name'
    const sortOrder = searchParams.get('sortOrder') || 'asc'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const offset = (page - 1) * limit

    // Build the query
    let supabaseQuery = supabase
      .from('products')
      .select(`
        id,
        name,
        slug,
        description,
        price,
        original_price,
        images,
        brand,
        category,
        rating,
        review_count,
        stock_quantity,
        is_featured,
        is_new,
        created_at
      `)

    // Apply filters
    if (query) {
      supabaseQuery = supabaseQuery.or(`name.ilike.%${query}%,description.ilike.%${query}%,brand.ilike.%${query}%`)
    }

    if (category && category !== 'Todos') {
      supabaseQuery = supabaseQuery.eq('category', category)
    }

    if (brand && brand !== 'Todos') {
      supabaseQuery = supabaseQuery.eq('brand', brand)
    }

    if (minPrice) {
      supabaseQuery = supabaseQuery.gte('price', parseFloat(minPrice))
    }

    if (maxPrice) {
      supabaseQuery = supabaseQuery.lte('price', parseFloat(maxPrice))
    }

    if (rating) {
      const minRating = parseFloat(rating.replace('+', ''))
      supabaseQuery = supabaseQuery.gte('rating', minRating)
    }

    if (inStock === 'true') {
      supabaseQuery = supabaseQuery.gt('stock_quantity', 0)
    }

    // Apply sorting
    const sortColumn = sortBy === 'price' ? 'price' : 
                      sortBy === 'rating' ? 'rating' : 
                      sortBy === 'newest' ? 'created_at' : 'name'
    
    supabaseQuery = supabaseQuery.order(sortColumn, { ascending: sortOrder === 'asc' })

    // Get total count for pagination
    const { count } = await supabaseQuery

    // Apply pagination
    supabaseQuery = supabaseQuery.range(offset, offset + limit - 1)

    const { data: products, error } = await supabaseQuery

    if (error) {
      console.error('Error searching products:', error)
      return NextResponse.json(
        { error: 'Erro ao buscar produtos' },
        { status: 500 }
      )
    }

    // Format products
    const formattedProducts = products?.map(product => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      originalPrice: product.original_price,
      images: Array.isArray(product.images) ? product.images : [product.images],
      brand: product.brand,
      category: product.category,
      rating: product.rating,
      reviewCount: product.review_count,
      stockQuantity: product.stock_quantity,
      isFeatured: product.is_featured,
      isNew: product.is_new,
      createdAt: product.created_at,
      discount: product.original_price ? 
        Math.round(((product.original_price - product.price) / product.original_price) * 100) : 0
    })) || []

    return NextResponse.json({
      products: formattedProducts,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      },
      filters: {
        query,
        category,
        brand,
        minPrice,
        maxPrice,
        rating,
        inStock,
        sortBy,
        sortOrder
      }
    })
  } catch (error) {
    console.error('Error in search API:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
