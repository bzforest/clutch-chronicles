import React from 'react';
import logoImage from '../assets/images/CC-logo-01.png';
import { Menu } from "lucide-react";

function Navbar() {

    return (
        <div className="w-full bg-base-500 border-b border-base-400 sticky top-0">
            <nav className="w-full h-[48px] md:h-[80px] bg-base-500 border-b border-base-400 flex items-center justify-between px-4 md:px-[120px]">

                <img className="h-8 w-auto md:h-12 object-contain scale-230 pl-2 md:pl-0 md:scale-350" src={logoImage} alt="Logo" /> {/* LOGO คุง */}

                <div className="flex md:hidden">   {/* Hamburger คุง */}
                    <button className="rounded-md text-white hover:bg-base-400 transition md:pr-3">
                    <Menu className="h-5 w-4" /> 
                    </button>
                </div>
                
                <div className='hidden md:flex gap-2.5'> {/* login&signup */}
                    <button className='w-32 h-12 bg-base-100 rounded-[999px] border-2 border-base-200 text-base-500 font-bold cursor-crosshair hover:scale-103'>Log in</button>
                    <button className='w-32 h-12 bg-black rounded-[999px] border-2 border-base-300 text-base-100 font-bold cursor-crosshair hover:scale-103'>Sign up</button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar

