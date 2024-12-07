
import React from 'react'
import Link from 'next/link'

import socials from '@/constants/socials';
import { socialData } from '@/types/customTypes';


function Footer() {
  return (
    <footer className='w-full py-3 flex justify-around bg-black text-white'>
        <div className='flex gap-3'>
            {
                socials.map((social:socialData) => (
                    <Link key={social.url} href={social.url}>
                        {React.createElement(social.icon, { size: 24 })}
                        </Link>))
            }
        </div>
        <div>
            <p>© {new Date().getFullYear()} Furix. All rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer