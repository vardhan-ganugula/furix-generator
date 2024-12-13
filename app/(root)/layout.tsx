import Footer from '@/components/reusable/Footer'
import Header from '@/components/reusable/Header'
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