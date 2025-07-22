"use client"
import React from 'react'
import Image from 'next/image'
import { Enriqueta } from 'next/font/google';
import { gsap } from 'gsap';
import { useEffect } from 'react';
const enriqueta = Enriqueta({
  weight: '400',
  subsets: ['latin'],
});
const Hero = () => {
 useEffect(() => {
      let t6 = gsap.timeline()
      t6.to('#heroimage', {
        duration: 0.5,
        opacity: 1,
        y: 0,
        ease: 'none',
        stagger: 0.2, // Small elay to ensure DOM is ready
      });
      t6.to('#youtube, #instagram, #facebook, #whatsapp', {
        duration: 0.6,
        opacity: 1,
        x: 0, y: 0,
        ease: 'power3.out',
        stagger: 0.2, // Small elay to ensure DOM is ready
      });
  }, []);
  return (
    <div className='h-[85vh] w-full'>
      <div className='mt-[15vh] container mx-auto'>
        <div className='h-[60vh]'>
          <div className='grid grid-cols-2'>
            <div>
              <h1 className={`text-9xl leading-[10vh] tracking-tighter ${enriqueta.className}`}>Want&nbsp;to Grow&nbsp;Your Business?<span className={`font-bold leading-[15vh] text-9xl tracking-normal`}>Let's&nbsp;<span className='text-[#f78d14]'>Talk</span></span></h1>
              <p className='text-2xl my-5'>AskRise Media is your one-stop digital marketing agency for social media management, SEO, website development & domain services. Grow online—start today!</p>
              <input type="text" placeholder='Enter Email Id' className={`px-5 py-2 border-black rounded-full me-2 ${enriqueta.className} w-1/3`} />
              <button className='bg-gradient-to-r from-orange-400 to-red-400 tracking-tighter rounded-full text-white font-bold text-lg mt-5 px-4 py-1.5 hover:font-bold hover:from-red-400 hover:to-orange-400 hover:cursor-pointer transition-all duration-500 active:scale-90'>Get in Touch</button>
            </div>
            <div className="flex justify-center relative">
              <div className="h-[50vh] w-[50vh] bg-[#A259FF] z-[100] rounded-full absolute bottom-20 right-27" />
              <div className="h-[25vh] w-[50vh] bg-gradient-to-b from-[#A259FF] to-[#6C00FF] rounded-b-[60px] z-[100] absolute bottom-20 right-27" />
              <Image src='/hero.png' alt='hero' width={600} height={600} className='absolute z-101' id='heroimage' style={{opacity: 0, transform: 'translateY(100px)'}}/>
              <Image src='/youtube.png' alt='hero' width={100} height={100} className='absolute z-[-1] bottom-53 left-21' id='youtube'style={{opacity: 0, transform: 'translateY(-50px) translateX(100px)'}} />
              <Image src='/instagram.png' alt='hero' width={125} height={125} className='absolute bottom-30 left-10' id='instagram' style={{opacity: 0, transform: 'translateY(-50px) translateX(100px)'}} />
              <Image src='/facebook.png' alt='hero' width={115} height={115} className='absolute bottom-2 left-17' id='facebook' style={{opacity: 0, transform: 'translateY(-50px) translateX(100px)'}} />
              <Image src='/whatsapp.png' alt='hero' width={125} height={125} className='absolute bottom-[-65] left-40' id='whatsapp' style={{opacity: 0, transform: 'translateY(-50px) translateX(100px)'}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero