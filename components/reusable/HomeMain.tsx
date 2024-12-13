'use server'
import React from 'react'
import { Button } from '../ui/button'
import Insta from '@/public/social/insragram.svg' 
import Linkedin from '@/public/social/linkedin.jpg';
import Threads from '@/public/social/threads.webp';
import Youtbe from '@/public/social/youtube.webp';
import Image from 'next/image';


function HomeMain() {
  return (
    <>
    
        <section className='mx-auto flex items-center justify-center py-32 flex-col gap-10 relative h-[80vh] w-full' style={{
            fontFamily: 'var(--font-geist-sans)',
            userSelect: 'none',
        }}>
                <h2 className='flex flex-col gap-3 text-center text-5xl font-semibold text-zinc-800' style={
                    {
                        fontFamily: 'Poppins',
                    }
                }> 
                    <span>Create <span className='text-furix-indigo'>high</span>-<span className='text-furix-lite-blue'>quality</span></span> 
                    <span> <span className='text-furix-red'>content</span> with AI </span> 
                </h2>


                <h4 className='text-zinc-700'>Let AI create creates content 10x more faster for you</h4>

                <Button className='capitalize rounded-full bg-furix-red hover:bg-red-400 py-5'>✍️ start for free</Button>

                {/* floating icons */}
                <div className='shadow-lg filter rounded bg-white rotate-[35deg] absolute top-10 lg:top-1/4 right-14 lg:right-1/4'>
                    <Image src={Insta} width={70} height={70} alt='instagram logo' className='aspect-square object-cover drag-none' />
                </div>
                <div className='shadow-lg filter rounded bg-white -rotate-[25deg] absolute top-10 lg:top-1/4 left-14 lg:left-1/4'>
                    <Image src={Youtbe} width={70} height={70} alt='instagram logo' className='aspect-square object-cover drag-none' />
                </div>
                <div className='shadow-lg p-1 filter rounded bg-white rotate-[-25deg] absolute top-3/4 right-14 lg:right-1/4'>
                    <Image src={Threads} width={70} height={70} alt='instagram logo' className='aspect-square object-cover drag-none' />
                </div>
                <div className='shadow-lg filter rounded bg-white -rotate-[25deg] absolute top-3/4 left-14 lg:left-1/4'>
                    <Image src={Linkedin} width={70} height={70} alt='instagram logo' className='aspect-square object-cover drag-none' />
                </div>

        </section>
    
    </>
  )
}

export default HomeMain