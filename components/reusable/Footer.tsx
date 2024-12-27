'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'

import socials from '@/constants/socials';
import { socialData } from '@/types/customTypes';


function Footer() {
    const [size, setSize] = React.useState(window.innerWidth < 768 ? 15 : 24); 
    useEffect(() => {
        function handleResize() {
            setSize(window.innerWidth < 768 ? 10 : 24);
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }
    , [size])
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
            <p className='text-xs md:text-md'>© {new Date().getFullYear()} Furix. All rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer