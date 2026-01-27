import React from 'react';
import { LinkedinIcon } from '@/assets/icons/Icon';
import { GithubIcon } from '@/assets/icons/Icon';
import { RectangleGogglesIcon } from '@/assets/icons/Icon';
import { useNavigate } from 'react-router-dom';

export function Footer () {

const navigate = useNavigate();    
    return (
    <>
        <div className='w-full bg-base-500 border-t border-base-400'>
            <footer className='w-full h-[152px] md:h-[144px] bg-base-500 border-b border-base-400 flex items-center justify-center flex-col gap-5 md:flex-row md:justify-between md:px-15'>
                <div className='flex flex-row items-center gap-2.5'>
                    <p className='text-body-1 pr-6'>Get in touch</p>
                    <LinkedinIcon />
                    <GithubIcon />
                    <RectangleGogglesIcon />
                </div>
                <button className='text-body-1 underline cursor-pointer hover:scale-103' onClick={() => navigate(`/`)}>Home page</button>    
            </footer>
        </div>    
    </>
    )
} 