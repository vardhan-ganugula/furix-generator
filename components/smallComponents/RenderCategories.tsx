'use client'
import React from 'react'
import {categories} from '@/constants/constats'
import { useFurix } from '@/hooks/furixContext'
function RenderCategories() {

    const {category, setCategory} = useFurix();
  return (
    <div className='flex gap-2 flex-wrap justify-center text-md '>
        {categories.map((ctgry, index) => (
                <button key={index} className={`${category === ctgry ? 'bg-furix-red text-white' : 'bg-white text-zinc-500'} border  font-poppins py-1 px-4 rounded-full`}
                onClick={() => setCategory(ctgry)}
                >{ctgry}</button>
        ))}
    </div>
  )
}

export default RenderCategories