"use client"
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
gsap.registerPlugin(ScrollTrigger)
import { Cookie } from 'next/font/google';
import { Montserrat_Alternates } from 'next/font/google';
import { Oswald } from 'next/font/google';
const cookie = Cookie({
  weight: '400',
  subsets: ['latin'],
});
const montserratAlternates = Montserrat_Alternates({
  weight: '700',
  subsets: ['latin'],
});
const oswald = Oswald({
  weight: '400',
  subsets: ['latin'],
});
const About = () => {
  const cards = [
    {
      title: 'Fast Results',
      desc: 'We deliver quickly without compromising quality.'
    },
    {
      title: 'Striking Designs',
      desc: 'Stand out with modern and eye-catching visuals.'
    },
    {
      title: 'Built-in SEO',
      desc: 'Rank higher with built-in SEO strategies.'
    },
    {
      title: 'Always Available',
      desc: 'We are always here to help you grow.'
    },
  ];


  const cardsRef = useRef([])
  const sectionRef = useRef(null)
  const [cardStyles, setCardStyles] = useState([])

  const getRandomRotation = (min, max) => {
    const angle = Math.floor(Math.random() * (max - min + 1)) + min;
    return Math.random() > 0.5 ? angle : -angle;
  }

  // Array of Tailwind 500-level color classes for the cards
  const cardColors = [
    'bg-red-400',
    'bg-blue-400',
    'bg-yellow-400',
    'bg-teal-400'
  ]

  // Assign colors sequentially to cards
  const getCardColor = (index) => {
    return cardColors[index % cardColors.length];
  }

  useEffect(() => {
    // Generate styles for each card on client side with unique colors
    const styles = cards.map((_, index) => ({
      transform: `rotate(${getRandomRotation(8, 15)}deg)`,
      colorClass: getCardColor(index)
    }))
    setCardStyles(styles)

    gsap.set('.card', { x: -200, opacity: 0 });

    const t2 = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=400%',
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      }
    });


    cardsRef.current.forEach((card, index) => {
      if (card) {
        t2.to(card, {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        }, index * 0.5);
      }
    });


    return () => {
      t2.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [])

  return (
    <div
      ref={sectionRef}
      className='bg-gradient-to-br from-amber-100 via-red-100 to-orange-100 h-[100vh] w-full flex items-center' id='about'
    >
      <div className='container mx-auto grid grid-cols-2'>
        <div className='flex justify-center items-center relative'>
          <Image src='/about.png' alt='about' width={600} height={600} id='image' />
          <div className="absolute bg-gradient-to-b from-orange-400 to-red-600 rounded-[40px] w-[55vh] h-[55vh] z-[-1] bottom-0 " />
        </div>
        <div className='flex justify-center items-center relative cards-container'>
          <div className='h-[70%] w-[50%] rounded-4xl mt-5 border-9 border-white bg-gradient-to-r from-[#f58c3b] to-[#f74e40] rotate-6'>
            <h1 className={`text-7xl pt-17 ps-12 text-white ${montserratAlternates.className}`}>Why Choose Us?</h1>
          </div>
          {cards.map((card, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className={`card h-[65%] w-[45%] rounded-4xl mt-5 border-9 border-white absolute box-shadow-2xl text-white ${cardStyles[i]?.colorClass || 'bg-gray-500'}`}
              style={{ transform: `rotate(${getRandomRotation(8, 15)}deg)` }}
            >
              <h2 className={`text-6xl ps-5 pt-7 ${montserratAlternates.className}`}>{card.title}</h2>
              <hr className='mt-5 border-[2px] border-white' />
              <p className={`text-4xl px-5 py-10 ${oswald.className}`}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
