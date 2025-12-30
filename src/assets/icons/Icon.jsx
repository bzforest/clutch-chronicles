import { Linkedin } from 'lucide-react';
import { Github } from 'lucide-react';
import { RectangleGoggles } from 'lucide-react';

export function LinkedinIcon () {
        return (
        <div className='fill-white bg-base-400 w-10 h-10 rounded-[999px] flex justify-center items-center scale-85'>
          <Linkedin />
        </div>
        );
};

export function GithubIcon () {
    return (
        <div className='fill-white bg-base-400 w-10 h-10 rounded-[999px] flex justify-center items-center scale-85'>
            <Github />
        </div>
    );
};

export function RectangleGogglesIcon () {
    return (
        <div className='fill-white bg-base-400 w-10 h-10 rounded-[999px] flex justify-center items-center scale-85'>
            <RectangleGoggles />
        </div>
    );
};