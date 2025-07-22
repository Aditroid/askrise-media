
import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { useRef } from 'react';
import Image from 'next/image';
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import About from "./components/about";
import ServiceCarousel from "./components/services";
import Testimonials from "./components/testimonials";
import PricingSection from "./components/price";
import Contact from "./components/Contact";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const logoRef = useRef(null);



  // useEffect(() => {
  //   let tl = gsap.timeline();
  //   tl.to(logoRef.current, {
  //     rotationY: 360,
  //     duration: 1,
  //     repeat: 2,
  //     ease: 'power5.out',
  //     onComplete: () => {
  //       gsap.to(logoRef.current, {
  //         opacity: 0,
  //         duration: 0.3,
  //         ease: 'power1.out',
  //         onComplete: () => {
  //           setIsLoading(false);
  //         }
  //       });
  //     }
  //   });
  // }, []);
    // const checkReady = () => {
    //   if (document.readyState === "complete") {
    // gsap.to(logoRef.current, {
    //   opacity: 0,
    //   duration: 0.3,
    //   ease: 'power1.out',
    //   onComplete: () => {
    //     setIsLoading(false); // Hide loader completely
    //   },
    // })
    //   }
    // }
    // if (document.readyState === "complete") {
    //   checkReady();
    // } else {
    //   document.addEventListener("readystatechange", checkReady);
    // }
    // return () => document.removeEventListener("readystatechange", checkReady);
  
  return (
    <>
      {/* {isLoading ? (
        <Image
        ref={logoRef}
        src="/logo.png"
        alt="Logo"
        width={100}
        height={100}
        priority
        className="absolute top-1/2 left-1/2 "
      />
      ) : ( */}
        
        <Navbar />
        <Hero />
        <About />
        <ServiceCarousel />
        <Testimonials />
        <PricingSection />
        <Contact />
      
      {/* )} */}
    </>
  )
}

export default Page
