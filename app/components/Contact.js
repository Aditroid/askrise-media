"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaWhatsapp, FaFacebook, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; // fa = Font Awesome

const Footer = () => {
  // Contact information
  const contactInfo = {
    companyName: "AskRise Media",
    email: "askrisemedia@gmail.com",
    phone: "+91-9354715005",
    address: "New Delhi, India",
    logo: "/logo.png" // Replace with your logo path
  }

  // Pre-formatted messages for social media
  const whatsappMessage = encodeURIComponent("Hi! I want to talk about my business and explore your digital marketing services.")
  const facebookMessage = encodeURIComponent("I'm interested in your digital marketing services for my business.")

  // Social media and contact links
  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebook />,
      url: `https://m.me/Ask-Rise-Media?text=${facebookMessage}`,
      bgColor: "bg-blue-00 hover:text-blue-700"
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      url: `https://wa.me/9354715005?text=${whatsappMessage}`, // Replace with your WhatsApp number
      bgColor: "bg-green-00 hover:text-green-700"
    },
    {
      name: "Email",
      icon: <FaEnvelope />,
      url: `mailto:${contactInfo.email}?subject=Business Inquiry&body=Hi, I want to talk about my business.`,
      bgColor: "bg-red-00 hover:text-red-700"
    },
    {
      name: "Phone",
      icon: <FaPhone style={{ transform: 'scaleX(-1)' }} />,
      url: `tel:${contactInfo.phone}`,
      bgColor: "bg-purple-00 hover:text-purple-700"
    }
  ]

  // Quick navigation links
  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Pricing", href: "#price" },
    // { name: "Contact", href: ".contact" }
  ]

  // Services links
  const services = [
    "SEO Optimization",
    "Social Media Marketing",
    "PPC Advertising",
    "Content Marketing",
    "Web Development",
    "Email Marketing"
  ]

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8" id='contact'>
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Company Info Column */}
          <div className="lg:col-span-1">
            {/* Logo and Company Name */}
            <div className="flex items-center mb-6">
              <div className="relative w-12 h-12 mr-3">
                <Image
                  src={contactInfo.logo}
                  alt={`${contactInfo.companyName} Logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-white">
                {contactInfo.companyName}
              </h3>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              We help businesses grow through strategic digital marketing solutions. 
              From SEO to social media, we&apos;ve got your digital presence covered.
            </p>

            {/* Social Media Contact Buttons */}
            <div className="flex gap-15">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target={social.name === 'Email' || social.name === 'Phone' ? '_self' : '_blank'}
                  rel={social.name === 'Email' || social.name === 'Phone' ? '' : 'noopener noreferrer'}
                  className={`${social.bgColor} text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                >
                  <span className="text-3xl">{social.icon}</span>
                  {/* <span>{social.name}</span> */}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-orange-400">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-orange-400">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-gray-300 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-orange-400">
              Contact Info
            </h4>
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start space-x-3">
                <span className="text-orange-400 mt-1"><FaEnvelope /></span>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-gray-300 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-3">
                <span className="text-orange-400 mt-1"><FaPhone style={{ transform: 'scaleX(-1)' }} /></span>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-gray-300 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-3">
                <span className="text-orange-400 mt-1"><FaMapMarkerAlt /></span>
                <div>
                  <p className="text-gray-400 text-sm">Address</p>
                  <a
                    href="www.google.com/maps?q=New+Delhi"
                    className="text-gray-300 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {contactInfo.address}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        {/* <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="bg-gray-800 rounded-2xl p-8 text-center">
            <h4 className="text-2xl font-bold mb-4">Stay Updated</h4>
            <p className="text-gray-300 mb-6">
              Get the latest digital marketing tips and insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-orange-400 focus:outline-none"
              />
              <button className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div> */}

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
          {/* <div className="flex items-center space-x-6"> */}
            <p className="text-gray-400 text-sm">
              © 2025 {contactInfo.companyName}. All rights reserved.
            </p>
          {/* </div> */}
          
          {/* <div className="flex items-center space-x-6">
            <Link href="/privacy" className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-300">
              Cookie Policy
            </Link>
          </div> */}
        </div>
      </div>

      {/* Floating Action Buttons for Mobile */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 md:hidden z-50">
        <a
          href={`https://wa.me/9354715005?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
        >
          <span className="text-2xl"><FaWhatsapp /></span>
        </a>
        <a
          href={`tel:${contactInfo.phone}`}
          className="bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
        >
          <span className="text-2xl"><FaPhone style={{ transform: 'scaleX(-1)' }} /></span>
        </a>
      </div>
    </footer>
  )
}

export default Footer
