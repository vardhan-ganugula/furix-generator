'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
const DashboardPage = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/dashboard/profile')
  }, [router])
  return (
    <>
      <Skeleton className='w-96 h-96' />
    </>
  )
}

export default DashboardPage