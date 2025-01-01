'use client'
import React, { useEffect, memo } from 'react'
import Link from 'next/link'

import socials from '@/constants/socials';
import { socialData } from '@/types/customTypes';
import appName from '@/constants/settings';

function Footer() {
    const [size, setSize] = React.useState(24); 
    useEffect(() => {
        function handleResize() {
            setSize(window.innerWidth < 768 ? 15 : 24);
        }
        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }
    , [])
  return (
    <footer className='w-full py-3 flex justify-around bg-black text-white'>
        <div className='flex gap-3'>
            {
                socials.map((social:socialData) => (
                    <Link key={social.url} href={social.url}>
                        {React.createElement(social.icon, { size })}
                        </Link>))
            }
        </div>
        <div>
            <p className='text-xs md:text-md'>© {new Date().getFullYear()} {appName} All rights reserved.</p>
        </div>
    </footer>
  )
}

export default memo(Footer)