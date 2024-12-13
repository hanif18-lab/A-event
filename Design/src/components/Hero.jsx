import React from "react";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-purple-50">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-purp/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-32 pb-20 md:pt-40 md:pb-28">
          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left space-y-8">
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold">
                <span className="block text-Purp text-5xl lg:text-7xl">Campus Events</span>
                <span className="block mt-2 text-black">Made Simple</span>
              </h1>
              
              <p className="text- md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                Join a vibrant community of students exploring opportunities to learn, 
                connect, and create memorable experiences.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/events"
                  className="inline-flex items-center bg-Purp justify-center px-8 py-4 text-lg font-medium text-white rounded-xl hover:bg-purp/90 transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-purp/25"
                >
                  Explore Events
                </Link>              
              </div>
            </div>
 
            {/* Right Column - Replace stats with animated image */}
            <div className="relative">
              <motion.img 
                src="https://res.cloudinary.com/dvfmse8he/image/upload/v1734097837/B7_eqpivv.png"
                alt="Campus Events"
                className="w-full h-auto hidden md:flex md:flex-block"
                animate={{ 
                  y: [0, -10, 0] 
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Keep decorative elements */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-purp/5 rounded-full blur-xl" />
              <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-purple-200/20 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
