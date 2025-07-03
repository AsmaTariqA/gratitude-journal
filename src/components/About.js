import React from 'react';
import { FiHeart, FiBookOpen } from 'react-icons/fi';
import Image from './image1.png';
import Image2 from './image.png';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center mb-6">
            <FiBookOpen className="text-[#8E7DBE] text-5xl mr-4" />
            <h1 className="text-5xl md:text-7xl font-bold text-[#5e548e] font-sans">
              About <span className="text-[#8E7DBE]">Gratitude Journal</span>
            </h1>
            <img src={Image2} alt="decorative" className="w-14 ml-4 animate-float" />
          </div>
          
          <p className="text-[#5e548e] text-2xl md:text-3xl mb-8 leading-relaxed max-w-4xl mx-auto">
            Discover the journey of embracing gratitude and mindfulness.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <img src={Image} alt="decorative" className="w-20" />
            <blockquote className="text-[#5e548e] text-xl md:text-2xl italic border-l-4 border-[#8E7DBE] pl-4">
              "The Prophet Muhammad (peace be upon him) said:
              <span className="block mt-2 text-lg md:text-xl">'Look at those below you and do not look at those above you...'</span>
              <span className="block text-base mt-3 text-[#6a5d8e]">(Hadith, — Sahih al-Bukhari 6490)</span>
            </blockquote>
          </div>
        </div>

        {/* Purpose Section */}
        <div className="bg-[#F4F8D3] rounded-3xl shadow-xl p-8 md:p-12 border-2 border-[#8E7DBE]/20 mb-16">
          <div className="flex items-center justify-center mb-8">
            <FiHeart className="text-[#8E7DBE] text-4xl mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#5e548e]">
              Our Purpose
            </h2>
          </div>
          
          <div className="space-y-6 text-[#5e548e] text-lg md:text-xl leading-relaxed">
            <p>
              The Gratitude Journal helps cultivate appreciation in today's fast-paced world.
            </p>
            <p>
              A warm space to reflect on life's blessings and track your thoughts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;