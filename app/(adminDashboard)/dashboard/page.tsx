'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
const page = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/dashboard/profile')
  }, [])
  return (
    <>
      <Skeleton className='w-96 h-96' />
    </>
  )
}

export default page