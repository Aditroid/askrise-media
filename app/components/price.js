"use client"
import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Hanuman } from "next/font/google"
const hanuman = Hanuman({
    weight: '400',
    subsets: ['latin'],
  });

// Custom hook for media queries
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = () => setMatches(media.matches)
    media.addListener(listener)

    return () => media.removeListener(listener)
  }, [query])

  return matches
}

const PricingSection = () => {
  // Pricing plans data
  const pricingPlans = [
    {
      id: 1,
      name: "Starter",
      price: "$99",
      period: "/month",
      description: "Perfect for small businesses getting started",
      features: [
        "Basic SEO optimization",
        "Social media account setup",
        "Monthly content creation (8 posts)",
        "Performance reporting",
        "Email support",
        "1 website audit"
      ],
      popular: false,
      color: "from-blue-400 to-blue-600"
    },
    {
      id: 2,
      name: "Growth",
      price: "$299",
      period: "/month",
      description: "Ideal for businesses ready to scale",
      features: [
        "Comprehensive SEO strategy",
        "PPC campaign management",
        "Advanced social media marketing",
        "Email marketing automation",
        "Weekly strategy calls",
        "Conversion rate optimization",
        "Priority support",
        "Detailed analytics dashboard"
      ],
      popular: true,
      color: "from-orange-400 to-red-500"
    },
    {
      id: 3,
      name: "Enterprise",
      price: "$699",
      period: "/month",
      description: "For established businesses seeking market dominance",
      features: [
        "Full-service digital marketing",
        "Dedicated account manager",
        "Advanced analytics & reporting",
        "Custom strategy development",
        "Unlimited revisions",
        "24/7 priority support",
        "Monthly performance reviews",
        "Competitor analysis",
        "Brand positioning strategy"
      ],
      popular: false,
      color: "from-purple-500 to-indigo-600"
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(1) // Start with middle card (Growth)
  const [isMounted, setIsMounted] = useState(false)
  const cardsRef = useRef([])
  const containerRef = useRef(null)

  // Check if mobile
  const isMobile = useMediaQuery('(max-width: 767px)')

  // Mount check to prevent hydration issues
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Update card positions with sliding animation for mobile
  const updateCardPositions = (newIndex) => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return

      if (isMobile) {
        // Mobile: Smooth sliding animation
        const position = index - newIndex
        const translateX = position * 100 // Slide by 100% width

        gsap.to(card, {
          x: `${translateX}%`,
          opacity: position === 0 ? 1 : 0.3,
          scale: position === 0 ? 1 : 0.85,
          zIndex: position === 0 ? 10 : 1,
          duration: 0.6,
          ease: "power3.inOut"
        })
      } else {
        // Desktop: Original opacity-based positioning
        let position = index - newIndex
        let opacity = 1
        let scale = 1
        let zIndex = 1

        if (position === 0) {
          opacity = 1
          scale = 1
          zIndex = 3
        } else if (Math.abs(position) === 1) {
          opacity = 0.4
          scale = 0.9
          zIndex = 2
        } else {
          opacity = 0.2
          scale = 0.8
          zIndex = 1
        }

        const xPosition = position * 280
        gsap.to(card, {
          x: xPosition,
          opacity: opacity,
          scale: scale,
          zIndex: zIndex,
          duration: 0.5,
          ease: "power2.out"
        })
      }
    })
  }

  // Navigate to next/previous card with infinite loop
  const navigateToCard = (direction) => {
    let newIndex

    if (direction === 'next') {
      newIndex = currentIndex === pricingPlans.length - 1 ? 0 : currentIndex + 1
    } else {
      newIndex = currentIndex === 0 ? pricingPlans.length - 1 : currentIndex - 1
    }

    setCurrentIndex(newIndex)
    updateCardPositions(newIndex)
  }

  // Initialize positions on mount and when screen size changes
  useEffect(() => {
    if (isMounted) {
      updateCardPositions(currentIndex)
    }
  }, [currentIndex, isMobile, isMounted])

  // Add swipe gesture support for mobile
  useEffect(() => {
    if (!isMobile || !containerRef.current || !isMounted) return

    let startX = 0
    let isDragging = false

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX
      isDragging = true
    }

    const handleTouchEnd = (e) => {
      if (!isDragging) return

      const endX = e.changedTouches[0].clientX
      const diff = startX - endX
      const threshold = 50

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          navigateToCard('next') // Swipe left - next card
        } else {
          navigateToCard('prev') // Swipe right - previous card
        }
      }

      isDragging = false
    }

    const container = containerRef.current
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isMobile, isMounted])

  // Don't render until mounted to prevent hydration issues
  if (!isMounted) {
    return <div className="py-16 bg-gradient-to-br from-gray-50 via-white to-orange-50 h-96"></div>
  }

  return (
    <div className="bg-gradient-to-br from-gray-200 via-pink-200 to-orange-300 overflow-hidden h-[100vh]" id='price'>
      <div className="container mx-auto mt-25">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-15">
          <h2 className={`text-3xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-fuchsia-500 to-sky-500 ${hanuman.className}`}>
            Choose Your Growth Plan
          </h2>
          {/* <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto px-4">
            Flexible pricing options designed to scale with your business needs
          </p> */}
        </div>

        {/* Pricing Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Cards Container */}
          <div
            ref={containerRef}
            className={`relative ${isMobile
                ? 'h-[580px] overflow-hidden px-4'
                : 'h-[600px] flex items-center justify-center'
              }`}
          >
            <div className={`${isMobile
                ? 'flex items-center justify-center w-full h-full'
                : 'contents'
              }`}>
              {pricingPlans.map((plan, index) => (
                <div
                  key={plan.id}
                  ref={el => cardsRef.current[index] = el}
                  className={`${isMobile
                      ? 'absolute w-full max-w-sm left-1/2 transform -translate-x-1/2'
                      : 'absolute w-72'
                    } h-[65vh] bg-white rounded-3xl shadow-2xl border-2 ${plan.popular ? 'border-orange-300' : 'border-gray-100'
                    } p-6 md:p-8 transform-gpu`}
                  style={{
                    willChange: 'transform'
                  }}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div className={`w-14 md:w-16 h-14 md:h-16 rounded-full bg-gradient-to-r ${plan.color} mx-auto mb-4 flex items-center justify-center`}>
                      <span className="text-white text-xl md:text-2xl font-bold">
                        {plan.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {plan.description}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-6">
                    <span className="text-3xl md:text-4xl font-bold text-gray-800">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 text-base md:text-lg">
                      {plan.period}
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="mb-6 md:mb-8 flex-1">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-0.5 flex-shrink-0">✓</span>
                        <span className="text-gray-700 text-xs md:text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}

                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => navigateToCard('prev')}
            className={`absolute ${isMobile ? 'left-2' : 'left-4'
              } top-1/2 transform -translate-y-1/2 w-10 md:w-12 h-10 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all z-20 group`}
          >
            <span className="text-gray-600 group-hover:text-orange-500 transition-colors text-lg md:text-xl">
              &#8249;
            </span>
          </button>

          <button
            onClick={() => navigateToCard('next')}
            className={`absolute ${isMobile ? 'right-2' : 'right-4'
              } top-1/2 transform -translate-y-1/2 w-10 md:w-12 h-10 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all z-20 group`}
          >
            <span className="text-gray-600 group-hover:text-orange-500 transition-colors text-lg md:text-xl">
              &#8250;
            </span>
          </button>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-6 md:mt-8 space-x-2">
            {pricingPlans.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  updateCardPositions(index)
                }}
                className={`w-2.5 md:w-3 h-2.5 md:h-3 rounded-full transition-all ${currentIndex === index
                    ? 'bg-orange-500'
                    : 'bg-gray-300 hover:bg-orange-300'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8 md:mt-12">
          <p className="text-gray-700 font-bold mb-4 text-sm md:text-base">
            All plans include free setup and 30-day money-back guarantee
          </p>
          <div className="flex flex-col md:flex-row justify-center mb-10 md:space-x-8 space-y-2 md:space-y-0 text-xs md:text-sm text-gray-700 font-bold ">
            <span className="flex items-center justify-center">
              <span className="text-green-500 mr-1">✓</span>
              No setup fees
            </span>
            <span className="flex items-center justify-center">
              <span className="text-green-500 mr-1">✓</span>
              Cancel anytime
            </span>
            <span className="flex items-center justify-center">
              <span className="text-green-500 mr-1">✓</span>
              24/7 support
            </span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PricingSection
