import React from 'react';
import HeadImage from '../assets/images/reporter-01.png';

function HeroSection() {
    return (
        <div className='w-full max-w-[1440px] mx-auto px-4 md:px-[120px] pt-3 md:py-16 flex flex-col xl:flex-row items-center justify-between gap-10 xl:gap-10'>
            <div className="order-1 flex flex-col w-full h-auto gap-6 text-center items-center py-10 md:py-24 px-4 xl:text-right xl:items-end">
                <h1 className='text-headline-2 text-white font-bold text-center max-w-[343px] md:max-w-3xl h-auto xl:text-right'>Stay Informed, Stay Inspired</h1>
                <p className='text-base-100 text-body-1'>Discover a World of Knowledge at Your Fingertips. Your Daily Dose of Inspiration and Information.</p>
            </div>

            <div className='order-2 flex-none'>
                <img className=' flex items-center rounded-[16px] w-[343px] h-[470px] justify-center shadow-base-200 shadow-lg' src={HeadImage} alt="Header Image"></img>
            </div>

            <div className='order-3 flex flex-col px-1 gap-2'>
                <p className='text-brand-primary text-body-3'>-Author</p>
                <h3 className='text-headline-3 font-semibold text-white'>Sakditat S.</h3>
                <p className='text-base-100 text-body-1 pt-4'>I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness. </p>
                <p className='text-base-100 text-body-1 pt-5'>When i’m not writing, I spends time volunteering at my local animal shelter, helping cats find loving homes.</p>
            </div>
        </div>
    )
}

export default HeroSection