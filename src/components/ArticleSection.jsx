import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function ArticleSection() {
  // 1. สร้าง State เพื่อจำว่า User เลือกหมวดหมู่ไหนอยู่ (ค่าเริ่มต้น 'Highlight')
  const [category, setCategory] = useState("Latest News");

  // 2. รายชื่อหมวดหมู่ (จะได้ไม่ต้องเขียนซ้ำหลายรอบ)
  const categories = ["Latest News", "E-Sports", "Reviews", "Hardware"];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-[120px] py-10 space-y-8">

      <h1 className="text-headline-3 font-bold text-white">Latest articles</h1>

      {/* --- Filter Bar Container (กรอบสีเทาจางๆ) --- */}
      <div className="bg-base-500/50 p-6 rounded-xl flex flex-col lg:flex-row items-center justify-between gap-6 border border-base-400">

        {/* =========================================
            📱 PART 1: MOBILE VIEW (Search บน + Select ล่าง)
            (จะซ่อนเมื่อจอเป็น lg ขึ้นไป -> lg:hidden)
           ========================================= */}
        <div className="w-full flex flex-col gap-4 lg:hidden">
          
          {/* 1.1 Mobile Search */}
          <div className="relative w-full">
            <Input 
              type="text" 
              placeholder="Search" 
              className="bg-base-100 text-black placeholder:text-gray-500 pl-4 pr-10" 
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>

          {/* 1.2 Mobile Select (Dropdown) */}
          <div className="space-y-2">
            <p className="text-body-1 text-white">Category</p>
            <Select 
              value={category} 
              onValueChange={setCategory} // เมื่อเลือกใหม่ ให้ update state
            >
              <SelectTrigger className="w-full bg-base-100 text-black">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((list) => (
                  <SelectItem key={list} value={list}>
                    {list}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>


        {/* =========================================
            💻 PART 2: DESKTOP VIEW (Tabs ซ้าย + Search ขวา)
            (จะซ่อนในมือถือ -> hidden lg:flex)
           ========================================= */}
        
        {/* 2.1 Desktop Tabs (ซ้าย) */}
        <div className="hidden lg:flex items-center gap-2 p-1.5 rounded-lg">
          {categories.map((list) => (
            <button
              key={list}
              onClick={() => setCategory(list)} // กดปุ่มไหน ให้ set ค่าหมวดหมู่นั้น
              className={`
                px-6 py-2 rounded-md text-sm font-medium transition-all duration-200
                ${category === list 
                  ? "bg-brand-primary text-base-600 shadow-md"   // สไตล์ตอนถูกเลือก (Active)
                  : "text-base-100 hover:text-white hover:bg-white/10" // สไตล์ตอนปกติ (Inactive)
                }
              `}
            >
              {list}
            </button>
          ))}
        </div>

        {/* 2.2 Desktop Search (ขวา) */}
        <div className="hidden lg:block w-[300px] relative">
           <Input 
              type="text" 
              placeholder="Search" 
              className="bg-base-100 text-black placeholder:text-gray-500 pl-4 pr-10" 
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
        </div>

      </div>

      {/* --- พื้นที่สำหรับใส่ Card บทความในอนาคต --- */}
      {/* <div className="text-white text-center py-10 border border-dashed border-base-400 rounded-lg">
         Displaying Content for Category: <span className="text-brand-primary font-bold">{category}</span>
      </div> */}

    </div>
  );
}

export default ArticleSection;