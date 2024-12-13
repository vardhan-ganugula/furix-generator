import Footer from '@/components/reusable/Footer'
import DashboardHeader from '@/components/reusable/DashboardHeader'
import React from 'react'

function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <>
    <DashboardHeader />
        {children}
    <Footer />
    </>
  )
}

export default RootLayout