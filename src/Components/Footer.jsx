import React, { useEffect } from 'react'
import buy0 from '../assets/01.png'
import buy1 from '../assets/02.png'
import axios from 'axios';
function Footer() {
 
  return <>
  <footer className='py-8'>
    <div className="container mx-auto p-5 text-white">
      <div className="flex w-full flex-wrap  ">
        <div className="col w-full mb-4  lg:w-2/4">
            <ul className='flex gap-5 mb-4 font-semibold text-[#d1d0cf] '>
                <li className='hover:text-red-700 duration-200 transition-all cursor-pointer'>Terms of Use</li>
                <li className='hover:text-red-700 duration-200 transition-all cursor-pointer'>Privacy-Policy</li>
                <li className='hover:text-red-700 duration-200 transition-all cursor-pointer'>FAQ</li>
                <li className='hover:text-red-700 duration-200 transition-all cursor-pointer'>Watch List</li>
            </ul>
            <p className='text-sm font-500'>
            This is Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, quo  tempore. <br /> Quasi rem rerum est in nulla atque quibusdam illo. this is footer and simple  tsesxij is writen jkd. <br /> fsek hello how are you. please like and subscribe. footer ends .
            </p>
        </div>
        <div className="col w-full mb-4 lg:w-1/4">
        <p className='font-semibold mb-3'>Follow Us:</p>
        <ul className='flex gap-5'>
            <li className='w-[50px] group h-[50px] bg-[#292929c2] rounded-full flex justify-center items-center'>
                <i className='fab fab fa-instagram group-hover:text-red-700 transition-all duration-200 fa-xl'></i>
            </li>
            <li className='w-[50px] group h-[50px] bg-[#292929c2] rounded-full flex justify-center items-center'>
                <i className='fab fa-facebook-f group-hover:text-red-700 transition-all duration-200 fa-xl'></i>
            </li>
            <li className='w-[50px] group h-[50px] bg-[#292929c2] rounded-full flex justify-center items-center'>
                <i className='fab fa-youtube group-hover:text-red-700 transition-all duration-200 fa-xl'></i>
            </li>
        </ul>
        </div>
        <div className="col w-full mb-3 lg:w-1/4">
            <p className='font-semibold mb-3'>NetFlix App</p>
           <div className="imgs flex gap-3">
           <img src={buy0} alt="" />
           <img src={buy1} alt="" />
           </div>
        </div>
      </div>
    </div>
  </footer>
  </>
}

export default Footer
