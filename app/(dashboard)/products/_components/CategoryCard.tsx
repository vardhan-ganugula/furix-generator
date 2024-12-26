import React from 'react'
function CategoryCard({
  title,
  description,
  color,
  icon
}: {
  title:string,
  description:string,
  color:string,
  icon: React.ElementType
}) {

  return (
        <div style={{
          backgroundColor: color
        }} className={`flex gap-4 items-center h-full my-5 p-4 rounded-lg shadow-md w-auto lg:w-[350px]`}>
          <div className='bg-white p-4 rounded-full shadow-md'>
            {
              React.createElement(icon, {
                color: color, size: 20
              })
            }
          </div>
          <div>
            <h4 className='text-white font-bold md:text-lg text-md font-geist-sans'>{title}</h4>
            <p className='mt-2 text-zinc-200 font-geist-mono text-sm hidden lg:block'>{description}</p>
          </div>
        </div>

  )
}

export default CategoryCard