"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Sansation } from 'next/font/google';
import { gsap } from 'gsap';


const sansation = Sansation({
  weight: '700',
  subsets: ['latin'],
});

const navbar = () => {
  useEffect(() => {
    // Only animate TO visible state (no gsap.set needed)
    gsap.to('#navbar', {
      duration: 1,
      opacity: 1,
      y: 0,
      ease: 'power3.out',
      // stagger: 1, // Small delay to ensure DOM is ready
    });
  }, []);

  return (
    <nav className={`fixed top-0 pb-2 z-150 w-full bg-white/50 backdrop-blur-md ${sansation.className}`} id='navbar'>
      <div className='container mx-auto flex items-center justify-between'>
        <Image src='/navbar.png' alt='logo' width={120} height={120} />
        <div className='flex gap-10 me-5 ' style={{opacity: 0, transform: 'translateY(-20px)'}} id='navbar'>
          <Link href='#' className='navbarLink text-xl font-bold text-[#113d53] hover:text-[#E38C29] hover:scale-110 transition-all duration-300'>
            Home
          </Link>
          <Link href='#about' className='navbarLink text-xl font-bold text-[#113d53] hover:text-[#E38C29] hover:scale-110 transition-all duration-300'>
            About
          </Link>
          <Link href='#services' className='navbarLink text-xl font-bold text-[#113d53] hover:text-[#E38C29] hover:scale-110 transition-all duration-300'>
            Services
          </Link>
          <Link href='#testimonials' className='navbarLink text-xl font-bold text-[#113d53] hover:text-[#E38C29] hover:scale-110 transition-all duration-300'>
            Testimonials
          </Link>
          <Link href='#price' className='navbarLink text-xl font-bold text-[#113d53] hover:text-[#E38C29] hover:scale-110 transition-all duration-300'>
            Pricing
          </Link>
          <Link href='#contact' className='navbarLink text-xl font-bold text-[#113d53] hover:text-[#e38c29] hover:scale-110 transition-all duration-300'>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default navbar
