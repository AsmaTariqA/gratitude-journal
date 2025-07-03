import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#987D9A] text-white p-9">
     
       

     <div className='text-center text-white'>
            Connect with Asma Tariq Ansari on{' '}
            <a href="https://github.com/AsmaTariqA" target="_blank" rel="noopener noreferrer">
              <i class="fa-brands fa-github"></i>
            </a>{' '}
            to stay updated on the latest developments.
          </div>
      <div className=" border-gray-500 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} Gratitude Journal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
