'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Header } from './header'
import { BottomNav } from './bottom-nav'
import { Footer } from './footer'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname()

  // Pages that should not show bottom navigation
  const hideBottomNav = [
    '/checkout',
    '/login',
    '/register',
    '/admin'
  ]

  // Pages that should not show footer
  const hideFooter = [
    '/checkout',
    '/login',
    '/register',
    '/admin'
  ]

  const shouldShowBottomNav = !hideBottomNav.some(path => pathname.startsWith(path))
  const shouldShowFooter = !hideFooter.some(path => pathname.startsWith(path))

  return (
    <>
      <Header />
      <main className={`min-h-screen ${shouldShowBottomNav ? 'pb-20' : ''}`}>
        {children}
      </main>
      {shouldShowFooter && <Footer />}
      {shouldShowBottomNav && <BottomNav currentPath={pathname} />}
    </>
  )
}
