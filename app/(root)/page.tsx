import React from 'react'
import HomeMain from '@/components/ui/reusable/HomeMain'
import HomeDescription from '@/components/ui/reusable/HomeDescription'

function page() {
  return (
    <main className='min-h-screen w-full'>
        <HomeMain />
        <HomeDescription/>
    </main>
  )
}

export default page