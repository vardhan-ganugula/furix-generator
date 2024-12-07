import Footer from '@/components/ui/reusable/Footer'
import Header from '@/components/ui/reusable/Header'
import React from 'react'

function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <>
    <Header />
        {children}
    <Footer />
    </>
  )
}

export default RootLayout