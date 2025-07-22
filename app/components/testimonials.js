"use client"
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import {Kavoon} from 'next/font/google';
const kavoon = Kavoon({
    weight: '400',
    subsets: ['latin'],
  });
import {Courgette} from 'next/font/google';
const courgette = Courgette({
    weight: '400',
    subsets: ['latin'],
  });

const TestimonialsSection = () => {
    // Sample testimonials data
    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            company: "TechStart Inc.",
            position: "CEO",
            profilePic: "/testimonial1.jpg",
            review: "Working with this team has been absolutely game-changing for our business. Their digital marketing strategies increased our online presence by 300% in just 6 months. The results speak for themselves!",
            rating: 5
        },
        {
            id: 2,
            name: "Michael Chen",
            company: "GrowthCorp",
            position: "Marketing Director",
            profilePic: "/testimonial2.jpg",
            review: "Exceptional service and incredible results. Our ROI improved dramatically, and the team was always available to answer questions and provide insights.",
            rating: 5
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            company: "StartupXYZ",
            position: "Founder",
            profilePic: "/testimonial3.jpg",
            review: "The SEO optimization work they did for us was phenomenal. We went from page 3 to ranking #1 for our main keywords. Highly recommend!",
            rating: 5
        },
        {
            id: 4,
            name: "David Wilson",
            company: "Enterprise Solutions",
            position: "VP Marketing",
            profilePic: "/testimonial4.jpg",
            review: "Professional, reliable, and results-driven. Our social media engagement increased by 500% and lead generation improved significantly.",
            rating: 5
        },
        {
            id: 5,
            name: "Lisa Thompson",
            company: "InnovateLab",
            position: "CMO",
            profilePic: "/testimonial5.jpg",
            review: "Their PPC campaigns generated more qualified leads than we've ever seen. The team understands our industry and delivers consistent results.",
            rating: 5
        },
        {
            id: 6,
            name: "James Parker",
            company: "DigitalFlow",
            position: "Owner",
            profilePic: "/testimonial6.jpg",
            review: "Outstanding content marketing strategy that positioned us as industry leaders. Our website traffic tripled and conversion rates doubled.",
            rating: 5
        }
    ]

    const [featuredTestimonial, setFeaturedTestimonial] = useState(testimonials[0])
    const [remainingTestimonials, setRemainingTestimonials] = useState(testimonials.slice(1))

    const featuredRef = useRef(null)
    const gridRef = useRef(null)

    // Handle testimonial swap with animation
    const handleTestimonialSwap = (clickedTestimonial) => {
        if (clickedTestimonial.id === featuredTestimonial.id) return

        // Create timeline for smooth transition
        const t3 = gsap.timeline()

        // Animate out the current featured testimonial
        t3.to(featuredRef.current, {
            opacity: 0,
            x: -50,
            duration: 0.3,
            ease: "power2.inOut"
        })

        // Update state in the middle of animation
        t3.call(() => {
            const newRemaining = remainingTestimonials.map(testimonial =>
                testimonial.id === clickedTestimonial.id ? featuredTestimonial : testimonial
            )
            setFeaturedTestimonial(clickedTestimonial)
            setRemainingTestimonials(newRemaining)
        })

        // Animate in the new featured testimonial
        t3.to(featuredRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.3,
            ease: "power2.inOut"
        })
    }

    // Render stars
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <span
                key={index}
                className={`text-xl ${index < rating ? 'text-orange-600' : 'text-gray-300'}`}
            >
                ★
            </span>
        ))
    }

    return (
        <div className="h-[100vh] w-full bg-gradient-to-br from-[#d0ecf5] via-[#8d9ed5] to-[#6d65ba]" id='testimonials'>
            <div className="container mx-auto">
                
                    {/* Section Header */}
                    <div className="text-center pt-[15vh]">
                        <h2 className={`text-7xl bg-clip-text text-transparent bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 mb-6 ${kavoon.className}`}>
                            What Our Clients Say
                        </h2>
                        <p className="text-gray-700 text-xl font-bold max-w-2xl mx-auto mb-10">
                            Don't just take our word for it. Here's what our satisfied clients have to say about working with us.
                        </p>
                    </div>

                    {/* Testimonials Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

                        {/* Featured Testimonial - Left Side (Large) */}
                        <div className="lg:col-span-2">
                            <div
                                ref={featuredRef}
                                className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 h-full relative overflow-hidden"
                            >
                                {/* Decorative Quote */}
                                <div className="absolute top-4 right-4 text-9xl text-orange-400 font-bold font-serif">
                                    "
                                </div>

                                <div className="relative z-10">
                                    {/* Profile Section */}
                                    <div className="flex items-center mb-6">
                                        <div className="relative w-20 h-20 rounded-full overflow-hidden mr-4 ring-4 ring-orange-200">
                                            <Image
                                                src={featuredTestimonial.profilePic}
                                                alt={featuredTestimonial.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-800">
                                                {featuredTestimonial.name}
                                            </h3>
                                            <p className="text-orange-600 font-semibold">
                                                {featuredTestimonial.position}
                                            </p>
                                            <p className="text-gray-600">
                                                {featuredTestimonial.company}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center mb-6 text-4xl">
                                        {renderStars(featuredTestimonial.rating)}
                                    </div>

                                    {/* Review Text */}
                                    <blockquote className={`text-gray-500 text-2xl leading-relaxed ${courgette.className}`}>
                                        "{featuredTestimonial.review}"
                                    </blockquote>
                                </div>
                            </div>
                        </div>

                        {/* Scrollable Reviews Grid - Right Side */}
                        <div className="lg:col-span-1">
                            <div
                                ref={gridRef}
                                className="space-y-4 md:max-h-[490px] max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-gray-100 pr-2"
                            >
                                {remainingTestimonials.map((testimonial, index) => (
                                    <div
                                        key={testimonial.id}
                                        onClick={() => handleTestimonialSwap(testimonial)}
                                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1"
                                    >
                                        {/* Profile */}
                                        <div className="flex items-center mb-4">
                                            <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3 ring-2 ring-gray-200">
                                                <Image
                                                    src={testimonial.profilePic}
                                                    alt={testimonial.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-800 text-sm">
                                                    {testimonial.name}
                                                </h4>
                                                <p className="text-orange-600 text-xs font-medium">
                                                    {testimonial.position}
                                                </p>
                                                <p className="text-gray-500 text-xs">
                                                    {testimonial.company}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Rating */}
                                        <div className="flex items-center mb-3">
                                            {renderStars(testimonial.rating)}
                                        </div>

                                        {/* Review Preview */}
                                        <p className={`text-gray-600 font-bold text-sm leading-relaxed line-clamp-2 ${courgette.className}`}>
                                            "{testimonial.review.substring(0, 100)}..."
                                        </p>

                                        {/* Click Indicator */}
                                        <div className="mt-3 text-orange-500 text-xs font-medium">
                                            Click to read more →
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Optional: Navigation Dots */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {testimonials.map((testimonial) => (
                            <button
                                key={testimonial.id}
                                onClick={() => handleTestimonialSwap(testimonial)}
                                className={`w-3 h-3 rounded-full transition-all ${testimonial.id === featuredTestimonial.id
                                        ? 'bg-orange-500'
                                        : 'bg-gray-300 hover:bg-orange-300'
                                    }`}
                            />
                        ))}
                    </div>
                {/* Custom Scrollbar Styles */}
                <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #fb923c;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #f97316;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
            </div>
        </div>
    )
}

export default TestimonialsSection
