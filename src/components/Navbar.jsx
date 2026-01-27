import React from 'react';
import logoImage from '../assets/images/CC-logo-01.png';
import { Menu } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-base-500 border-b border-base-400 sticky top-0 z-50">
            <nav className="w-full h-[48px] md:h-[80px] bg-base-500 border-b border-base-400 flex items-center justify-between px-4 md:px-[120px]">

                <img className="h-8 w-auto md:h-12 object-contain scale-230 pl-2 md:pl-0 md:scale-350" src={logoImage} alt="Logo" onClick={() => navigate(`/`)}/> {/* LOGO คุง */}
                   
                    {/* Hamburger คุง */}
                <div className="flex md:hidden">
                <DropdownMenu>
                      {/* ส่วนปุ่มกด (Trigger) */}      {/* พอใส่ asChild มันจะรู้ว่าให้ใช้ button ข้างในเป็นตัวกด */}
                      <DropdownMenuTrigger asChild>
                          <button className="text-white hover:bg-base-400 p-2 rounded-md transition outline-none">
                             <Menu className="h-6 w-6" /> 
                          </button>
                      </DropdownMenuTrigger>

                      {/* ส่วนเนื้อหาที่เด้งออกมา (Content) */}
                      {/* align="end" คือให้เมนูชิดขวา ให้ตรงกับนิ้วโป้ง */}
                      <DropdownMenuContent align="end" className="w-[300px] bg-base-500 border border-base-400 p-4 mt-2 shadow-xl rounded-xl flex flex-col gap-3">
                          
                          {/* Item 1: Log in Button */}
                          <DropdownMenuItem className="p-0 focus:bg-transparent">
                              <button className="w-full h-12 bg-base-100 rounded-[999px] border-2 border-base-200 text-base-500 font-bold cursor-crosshair hover:scale-[1.02] transition">
                                Log in
                              </button>
                          </DropdownMenuItem>

                          {/* Item 2: Sign up Button */}
                          <DropdownMenuItem className="p-0 focus:bg-transparent">
                              <button className="w-full h-12 bg-black rounded-[999px] border-2 border-base-300 text-base-100 font-bold cursor-crosshair hover:scale-[1.02] transition">
                                Sign up
                              </button>
                          </DropdownMenuItem>

                      </DropdownMenuContent>
                   </DropdownMenu>
                </div>

                    {/* login&signup */}
                <div className='hidden md:flex gap-2.5'>
                    <button className='w-32 h-12 bg-base-100 rounded-[999px] border-2 border-base-200 text-base-500 font-bold cursor-crosshair hover:scale-103'>Log in</button>
                    <button className='w-32 h-12 bg-black rounded-[999px] border-2 border-base-300 text-base-100 font-bold cursor-crosshair hover:scale-103'>Sign up</button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar

