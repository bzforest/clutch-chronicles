import { Linkedin } from 'lucide-react';
import { Github } from 'lucide-react';
import { RectangleGoggles } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { Twitter } from 'lucide-react';

export function LinkedinIcon () {
        return (
        <div className='fill-white bg-base-400 w-10 h-10 rounded-[999px] flex justify-center items-center scale-85 hover:scale-[1.01] cursor-pointer hover:shadow-md shadow-base-200'>
          <Linkedin />
        </div>
        );
};

export function GithubIcon () {
    return (
        <div className='fill-white bg-base-400 w-10 h-10 rounded-[999px] flex justify-center items-center scale-85 hover:scale-[1.01] cursor-pointer hover:shadow-md shadow-base-200'>
            <Github />
        </div>
    );
};

export function RectangleGogglesIcon () {
    return (
        <div className='fill-white bg-base-400 w-10 h-10 rounded-[999px] flex justify-center items-center scale-85 hover:scale-[1.01] cursor-pointer hover:shadow-md shadow-base-200'>
            <RectangleGoggles />
        </div>
    );
};

export function FacebookIcon () {
    return (
        <div className='fill-white bg-[#1877F2] w-10 h-10 rounded-[999px] flex justify-center items-center scale-85 hover:scale-[1.01] cursor-pointer hover:shadow-md shadow-base-200'>
            <Facebook />
        </div>
    );
};

export function TwitterIcon () {
    return (
        <div className='fill-white bg-[#55ACEE] w-10 h-10 rounded-[999px] flex justify-center items-center scale-85 hover:scale-[1.01] cursor-pointer hover:shadow-md shadow-base-200'>
            <Twitter />
        </div>
    );
};

export function LinkedinIcon2 () {
    return (
    <div className='fill-white bg-[#0077B5] w-10 h-10 rounded-[999px] flex justify-center items-center scale-85 hover:scale-[1.01] cursor-pointer hover:shadow-md shadow-base-200'>
      <Linkedin />
    </div>
    );
};