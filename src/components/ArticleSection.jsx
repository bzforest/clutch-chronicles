import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BlogCard from "./BlogCard";
import axios from 'axios';

function ArticleSection() {
  // --- 1. State  ---
  const [posts, setPosts] = useState([]);       // เก็บข้อมูลบทความ (เปลี่ยนจาก blogs เป็น posts)
  const [category, setCategory] = useState("Highlight");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // เช็คว่ามีหน้าเหลือมั้ย
  const [isLoading, setIsLoading] = useState(false);

  const categories = ["Highlight", "Cat", "Inspiration", "General"];

  // --- 2. ฟังก์ชันโหลดข้อมูล ---
  const fetchPosts = async () => {
    // ป้องกันการโหลดซ้ำถ้ายังโหลดไม่เสร็จ
    if (isLoading) return;

    setIsLoading(true);
    try {
      // แปลง Highlight เป็นค่าว่าง ""
      const categoryParam = category === "Highlight" ? "" : category;

      // ใช้ axios params (สะอาดกว่าการต่อ String เอง)
      const response = await axios.get(
        "https://blog-post-project-api.vercel.app/posts",
        {
          params: {
            page: page,
            limit: 6,
            category: categoryParam,
          },
        }
      );

      // รวมโพสต์เดิม (prevPosts) กับโพสต์ใหม่ (response.data.posts)
      setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);

      // ตรวจสอบว่าถึงหน้าสุดท้ายหรือยัง
      if (response.data.currentPage >= response.data.totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- 3. useEffect ตัวที่ 1: โหลดของเมื่อ page หรือ category เปลี่ยน ---
  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category]);

  // --- 4. useEffect ตัวที่ 2: รีเซ็ตค่าเมื่อเปลี่ยนหมวด ---
  useEffect(() => {
    setPosts([]);     // ล้างข้อมูลเก่า
    setPage(1);       // กลับไปหน้า 1
    setHasMore(true); // เปิดให้ปุ่มกดได้ใหม่
  }, [category]);

  // --- 5. ฟังก์ชันกดปุ่ม View More ---
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };


  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-[120px] py-10 space-y-8">

      <h1 className="text-headline-3 font-bold text-white">Latest articles</h1>
      
      {/* --- Filter & Search Section (UI เดิมของคุณ) --- */}
      <div className="bg-base-500/50 p-6 rounded-xl flex flex-col lg:flex-row items-center justify-between gap-6 border border-base-400">
        
        {/* Mobile View */}
        <div className="w-full flex flex-col gap-4 lg:hidden">
           <div className="relative w-full">
            <Input type="text" placeholder="Search" className="bg-base-100 text-black pl-4 pr-10" />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>
          <div className="space-y-2">
            <p className="text-body-1 text-white">Category</p>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full bg-base-100 text-black">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((list) => (
                  <SelectItem key={list} value={list} className="cursor-pointer data-[state=checked]:bg-base-600 data-[state=checked]:text-brand-primary">
                    {list}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:flex items-center gap-2 p-1.5 rounded-lg">
          {categories.map((list) => (
            <button
              key={list}
              onClick={() => setCategory(list)} // ตรงนี้ setCategory อย่างเดียวพอ เดี๋ยว useEffect จัดการรีเซ็ตให้
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${category === list ? "bg-brand-primary text-base-600 shadow-md" : "text-base-100 hover:text-white hover:bg-white/10"}`}
            >
              {list}
            </button>
          ))}
        </div>
        
        <div className="hidden lg:block w-[300px] relative">
            <Input type="text" placeholder="Search" className="bg-base-100 text-black pl-4 pr-10" />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
        </div>
      </div>

      {/* --- Blog Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post, index) => (
            // ใช้ key แบบนี้เผื่อ API ส่ง id ซ้ำมา
            <BlogCard key={`${post.id}-${index}`} {...post} />
        ))}
      </div>

      {/* --- Loading & View More Button (แบบเดียวกับเฉลย) --- */}
      {hasMore && (
        <div className="text-center mt-8">
            <button 
                onClick={handleLoadMore}
                disabled={isLoading}
                className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? "Loading..." : "View More"}
            </button>
        </div>
      )}
      
      {/* กรณีไม่เจอข้อมูล */}
      {!isLoading && posts.length === 0 && (
         <div className="text-center text-gray-400 py-10">
            No articles found in {category}
         </div>
      )}
      
    </div>
  );
}

export default ArticleSection;