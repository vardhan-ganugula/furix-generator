'use client'
import React from 'react'
import {categories} from '@/constants/constats'
function RenderCategories() {
    const [selectedIndex, setSelectedIndex] = React.useState(0)

  return (
    <div className='flex gap-2'>
        {categories.map((category, index) => (
                <button key={index} className={`${index === selectedIndex ? 'bg-furix-red text-white' : 'bg-white text-zinc-500'} border  font-poppins py-1 px-4 rounded-full`}
                onClick={() => setSelectedIndex(index)}
                >{category}</button>
        ))}
    </div>
  )
}

export default RenderCategories