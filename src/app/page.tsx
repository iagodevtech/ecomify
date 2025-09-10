'use client'

import { Suspense } from 'react'
import { Header } from '@/components/layout/header'
import { HeroSection } from '@/components/sections/hero-section'
import { FeaturedProducts } from '@/components/sections/featured-products'
import { CategoriesSection } from '@/components/sections/categories-section'
import { TechShowcase } from '@/components/sections/tech-showcase'
import { NewsletterSection } from '@/components/sections/newsletter-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { StatsSection } from '@/components/sections/stats-section'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 lg:pt-20">
        <Suspense fallback={<LoadingSpinner />}>
          <HeroSection />
          <StatsSection />
          <CategoriesSection />
          <FeaturedProducts />
          <TechShowcase />
          <TestimonialsSection />
          <NewsletterSection />
        </Suspense>
      </main>
    </>
  )
}
