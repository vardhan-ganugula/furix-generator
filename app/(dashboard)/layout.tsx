import Footer from '@/components/reusable/Footer'
import DashboardHeader from '@/components/reusable/DashboardHeader'
import React from 'react'
import {FurixProvider} from '@/hooks/furixContext'

function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <FurixProvider>

      <DashboardHeader />
          {children}
      <Footer />

    </FurixProvider>
  )
}

export default RootLayout