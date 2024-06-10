'use client';

import { SliderProps } from '@/types';
import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx'


const Slider: React.FC<SliderProps> = ({ announcements }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? announcements.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const lastSlide = currentIndex === announcements.length - 1;
        const newIndex = lastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex:number) =>{
        setCurrentIndex(slideIndex);
    };

    return (
        <div className='max-w-[14000px] h-[500px] w-full m-auto py-16 px-4 relative group '>
            <div style={{ backgroundImage: `url(${announcements[currentIndex].url})` }} className='w-full h-full rounded-2xl bg-center bg-cover duration-500'></div>
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 transform -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 transform -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            <div className='flex top-4 justify-center py-2'>
                {announcements.map((announce, announceIndex) => (
                    <div key={announceIndex} onClick={() => goToSlide(announceIndex)} className='text-2xl cursor-pointer'><RxDotFilled /></div>
                ))}

            </div>
        </div>
    );
};

export default Slider;
