// import React from 'react'
// import Carousel from './carousel'
// const Services = () => {
//     return (
//         <div className='h-[100vh] w-full bg-[#e38c29]'>
//             <div className='container mx-auto'>
//                 <div>
//                     <Carousel />
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default Services
"use client"
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import {Kalnia_Glaze} from 'next/font/google';
const kalniaGlaze = Kalnia_Glaze({
    weight: '400',
    subsets: ['latin'],
  });

import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const ServiceCarousel = () => {
  // Temporary 7 cards data
  const cards = [
    { title: 'Search Engine Optimization (SEO)', desc: 'Rank higher on Google with on-page, off-page, and technical SEO strategies', icon: '/seo.png' },
    { title: 'Social Media Marketing', desc: 'Boost engagement and build a loyal community on Instagram, Facebook, and more', icon: '/socialservices.png' },
    { title: 'Pay-Per-Click (PPC) Ads', desc: 'Drive instant traffic with Google Ads and ROI-focused paid campaigns', icon: '/ppc.png' },
    { title: 'Content Marketing', desc: 'Deliver value with blogs, videos, and content that builds trust and converts', icon: '/content.png' },
    { title: 'Website Design & Development', desc: 'Modern, responsive websites optimized for speed, SEO, and conversions', icon: '/website.png' },
    { title: 'Email Marketing', desc: 'Nurture leads and boost sales with high-converting email campaigns', icon: '/email.png' },
    { title: 'Brand Strategy & Consulting', desc: 'Craft a powerful brand identity that resonates with your target audience', icon: '/business.png' }
  ]

  const containerRef = useRef(null)
  const cardsRef = useRef([])
  const autoScrollTween = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [displayCards, setDisplayCards] = useState([])
  const [isPaused, setIsPaused] = useState(false)
  const animationFrameId = useRef(null)
  const scrollPosition = useRef(0)
  const direction = useRef(1)
  const speed = 2 // pixels per frame

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Auto-scroll animation
    const startAutoScroll = () => {
      const container = containerRef.current
      if (!container) return

      // Duplicate cards for infinite effect
      const containerWidth = container.clientWidth
      const cardWidth = 320 // Width of each card (w-80 = 20rem = 320px)
      const gap = 24 // gap-6 = 1.5rem = 24px
      
      // Clone cards for infinite scroll
      const cardsToClone = [...cards, ...cards, ...cards]
      setDisplayCards(cardsToClone)

      // Calculate total scroll distance
      const totalWidth = (cardWidth + gap) * cardsToClone.length - gap
      const maxScroll = (cardWidth + gap) * cards.length
      
      // Reset scroll position
      container.scrollLeft = maxScroll
      scrollPosition.current = maxScroll

      // Animation function
      const animate = () => {
        if (!container) return
        
        scrollPosition.current += direction.current * speed
        
        // When reaching the end, reset to middle section for infinite effect
        if (scrollPosition.current >= maxScroll * 2) {
          scrollPosition.current = maxScroll
          container.scrollLeft = maxScroll
        } else if (scrollPosition.current <= 0) {
          scrollPosition.current = maxScroll
          container.scrollLeft = maxScroll
        } else {
          container.scrollLeft = scrollPosition.current
        }
        
        if (!isPaused) {
          animationFrameId.current = requestAnimationFrame(animate)
        }
      }
      
      // Start animation
      if (!animationFrameId.current) {
        animationFrameId.current = requestAnimationFrame(animate)
      }
      
      // Pause on hover
      const handleMouseEnter = () => {
        setIsPaused(true)
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current)
          animationFrameId.current = null
        }
      }
      
      const handleMouseLeave = () => {
        setIsPaused(false)
        if (!animationFrameId.current) {
          animationFrameId.current = requestAnimationFrame(animate)
        }
      }
      
      container.addEventListener('mouseenter', handleMouseEnter)
      container.addEventListener('mouseleave', handleMouseLeave)
      
      // Cleanup function
      return () => {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current)
          animationFrameId.current = null
        }
        container.removeEventListener('mouseenter', handleMouseEnter)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }

    // Opacity fade effect based on position
    const updateCardOpacity = () => {
      const container = containerRef.current
      if (!container) return

      const containerRect = container.getBoundingClientRect()
      const containerCenter = containerRect.left + containerRect.width / 2

      cardsRef.current.forEach((card, index) => {
        if (!card) return

        const cardRect = card.getBoundingClientRect()
        const cardCenter = cardRect.left + cardRect.width / 2
        const distanceFromCenter = Math.abs(cardCenter - containerCenter)
        
        // Calculate opacity based on distance from center
        let opacity
        const cardWidth = cardRect.width
        const fadeDistance = isMobile ? cardWidth * 0.8 : cardWidth * 1.5

        if (isMobile) {
          // Mobile: Only center card is fully visible
          opacity = distanceFromCenter < cardWidth / 2 ? 1 : 
                   distanceFromCenter < fadeDistance ? 0.3 : 0.1
        } else {
          // Desktop: Center 3 cards are visible
          opacity = distanceFromCenter < cardWidth * 1.2 ? 1 : 
                   distanceFromCenter < fadeDistance ? 0.4 : 0.15
        }

        gsap.to(card, {
          opacity: opacity,
          duration: 0.3,
          ease: "power2.out"
        })
      })
    }

    // Initialize
    const timer = setTimeout(() => {
      startAutoScroll()
      updateCardOpacity()

      // Update opacity on scroll
      const container = containerRef.current
      if (container) {
        container.addEventListener('scroll', updateCardOpacity)
      }
    }, 100)
    const container = containerRef.current
    if (container) {
      container.addEventListener('mouseenter', () => {
        if (autoScrollTween.current) {
          autoScrollTween.current.pause()
        }
      })
  
      container.addEventListener('mouseleave', () => {
        if (autoScrollTween.current) {
          autoScrollTween.current.resume()
        }
      })
    }

    // Cleanup
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', checkMobile)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
        animationFrameId.current = null
      }
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', updateCardOpacity)
      }
      ScrollTrigger.killAll()
    }
  }, [isMobile])

  return (
    <div className="py-16 bg-gradient-to-br from-pink-100 via-violet-200 to-fuchsia-300 h-[100vh]" id='services'>
      <div className="container mx-auto">
        <div className="text-center mt-20 mb-10">
          <h2 className={`text-7xl font-bold mb-7 ${kalniaGlaze.className}`}>
            Our Digital Services
          </h2>
          <p className="text-zinc-700 text-2xl font-bold shadow-xl">
            Discover what we can do for your Business
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <div
            ref={containerRef}
            className="flex overflow-x-auto scrollbar-hide space-x-6 px-8 py-8"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {displayCards.map((card, index) => (
              <div
                key={index}
                ref={el => cardsRef.current[index] = el}
                className="flex-shrink-0 w-80 md:w-96 bg-white rounded-2xl p-5 shadow-lg border border-gray-100 transition-transform hover:scale-105"
              >
                <div className='flex flex-col items-center h-[40vh]'>
                    <div className=' h-[20vh] w-[20vh] mx-auto mb-5'>
                        <Image src={card.icon} alt="icon" width={200} height={200} />
                    </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 leading-normal font-bold mb-6">
                    {card.desc}
                  </p>
                </div>
                <div className='flex justify-center'>
                  <button className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optional: Scroll Indicators */}
        {/* <div className="flex justify-center mt-8 space-x-2">
          {cards.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-gray-300 opacity-50"
            />
          ))}
        </div> */}
      </div>

      {/* Hide scrollbar CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default ServiceCarousel
