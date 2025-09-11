'use client'

import { Suspense } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
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
    <AppLayout>
      <div className="pt-16 lg:pt-20">
        <Suspense fallback={<LoadingSpinner />}>
          <HeroSection />
          <StatsSection />
          <CategoriesSection />
          <FeaturedProducts />
          <TechShowcase />
          <TestimonialsSection />
          <NewsletterSection />
        </Suspense>
      </div>
    </AppLayout>
  )
}
