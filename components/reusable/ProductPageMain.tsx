
import React from 'react'
import RenderCategories from '@/components/smallComponents/RenderCategories'

function ProductPageMain() {
  return (
    <section className='flex items-center flex-col py-10 min-h-screen bg-slate-50'>
        <h4 className='text-2xl font-bold mt-10 font-geist-mono'>🎉 Vardhan, So what exactly do you have in mind?
        </h4>
        <p className='mt-5 text-zinc-400 font-poppins'>Begin with selecting the content type from the option below</p>
    
        <div className='mt-10'>
            <div className='flex flex-wrap gap-5'>
                <RenderCategories/>
            </div>
        </div>
    
    </section>
  )
}

export default ProductPageMain