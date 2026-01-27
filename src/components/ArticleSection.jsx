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
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

function ArticleSection() {
  const navigate = useNavigate(); // 2. ประกาศ Hook

  // --- State สำหรับบทความหลัก (Grid) ---
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState("Highlight");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // --- State สำหรับ Search Dropdown ---
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]); // เก็บผลลัพธ์ที่จะโชว์ใน Dropdown

  const categories = ["Highlight", "Cat", "Inspiration", "General"];

  // -------------------------------------------
  // ส่วนที่ 1: โหลดบทความลง Grid (ตาม Category)
  // -------------------------------------------
  const fetchPosts = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const categoryParam = category === "Highlight" ? "" : category;
      const response = await axios.get(
        "https://blog-post-project-api.vercel.app/posts",
        {
          params: {
            page: page,
            limit: 6,
            category: categoryParam,
            // ❌ ไม่ส่ง title/keyword ไปตรงนี้ เพราะ Grid จะแสดงตามหมวดหมู่เท่านั้น
          },
        }
      );

      setPosts((prevPosts) => {
        if (page === 1) return response.data.posts;
        return [...prevPosts, ...response.data.posts];
      });

      if (response.data.currentPage >= response.data.totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect สำหรับโหลดบทความลง Grid
  useEffect(() => {
    if (page === 1) setPosts([]); // เคลียร์ของเก่าถ้าเริ่มหน้า 1 ใหม่
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category]);

  // Reset เมื่อเปลี่ยน Category
  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [category]);


  // -------------------------------------------
  // ส่วนที่ 2: ระบบค้นหา (Autocomplete Dropdown)
  // -------------------------------------------
  
  // useEffect สำหรับ Debounce Search (รอ user หยุดพิมพ์ 500ms)
  useEffect(() => {
    // ถ้าช่องว่าง ให้เคลียร์ผลลัพธ์แล้วจบ
    if (searchText.trim() === "") {
        setSearchResult([]);
        return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        // ยิง API ค้นหา (Limit น้อยๆ เช่น 5-10 ตัวก็พอสำหรับ Dropdown)
        const response = await axios.get("https://blog-post-project-api.vercel.app/posts", {
            params: {
                title: searchText, // หรือใช้ keyword/q ตามที่ API รองรับ
                limit: 5 
            }
        });
        setSearchResult(response.data.posts);
      } catch (error) {
        console.error("Search error:", error);
      }
    }, 500); // รอ 0.5 วินาที

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-[120px] py-10 space-y-8">
      <h1 className="text-headline-3 font-bold text-white">Latest articles</h1>
      
      <div className="bg-base-500/50 p-6 rounded-xl flex flex-col lg:flex-row items-center justify-between gap-6 border border-base-400">
        
        {/* Mobile Filter & Search */}
        <div className="w-full flex flex-col gap-4 lg:hidden relative z-50"> {/* เพิ่ม z-50 ให้ลอยทับ */}
           <div className="relative w-full">
            <Input 
                type="text" 
                placeholder="Search" 
                className="bg-base-100 text-black pl-4 pr-10" 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
            
            {/* --- 🔽 Dropdown List (Mobile) --- */}
            {searchResult.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white text-black shadow-xl rounded-b-xl overflow-hidden mt-1 border border-gray-200">
                    {searchResult.map((blog) => (
                        <div 
                            key={blog.id} 
                            className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 transition-colors"
                            onClick={() => navigate(`/viewpostpage/${blog.id}`)} // คลิกแล้วไปหน้ารายละเอียด
                        >
                            <h4 className="text-sm font-semibold line-clamp-1">{blog.title}</h4>
                            <p className="text-xs text-gray-500 line-clamp-1">{blog.description}</p>
                        </div>
                    ))}
                </div>
            )}
          </div>
          
          <div className="space-y-2">
            <p className="text-body-1 text-white">Category</p>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full bg-base-100 text-black">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((list) => (
                  <SelectItem key={list} value={list} className="cursor-pointer">
                    {list}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Desktop Filter */}
        <div className="hidden lg:flex items-center gap-2 p-1.5 rounded-lg">
          {categories.map((list) => (
            <button
              key={list}
              onClick={() => setCategory(list)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${category === list ? "bg-brand-primary text-base-600 shadow-md" : "text-base-100 hover:text-white hover:bg-white/10"}`}
            >
              {list}
            </button>
          ))}
        </div>
        
        {/* Desktop Search */}
        <div className="hidden lg:block w-[300px] relative z-50"> {/* Relative เพื่อให้ Dropdown อิงกับกล่องนี้ */}
            <Input 
                type="text" 
                placeholder="Search" 
                className="bg-base-100 text-black pl-4 pr-10 focus:ring-0 focus:border-brand-primary" 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />

            {/* --- 🔽 Dropdown List (Desktop) --- */}
            {searchResult.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white text-black shadow-xl rounded-b-xl overflow-hidden mt-1 border border-gray-200 max-h-[300px] overflow-y-auto">
                    {searchResult.map((blog) => (
                        <div 
                            key={blog.id} 
                            className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 transition-colors flex flex-col gap-1"
                            onClick={() => navigate(`/viewpostpage/${blog.id}`)}
                        >
                            <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{blog.title}</h4>
                            <p className="text-xs text-gray-500 line-clamp-1">{blog.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>

      {/* --- Blog Cards Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-0">
        {posts.map((post, index) => (
           <BlogCard key={`${post.id}-${index}`} {...post} />
        ))}
      </div>

      {/* --- Loading & View More --- */}
      {hasMore && posts.length > 0 && (
        <div className="text-center mt-8">
            <button 
                onClick={handleLoadMore}
                disabled={isLoading}
                className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all shadow-lg disabled:opacity-50"
            >
                {isLoading ? "Loading..." : "View More"}
            </button>
        </div>
      )}
      
      {isLoading && posts.length === 0 && (
          <div className="text-center text-white py-10">Loading...</div>
      )}
    </div>
  );
}

export default ArticleSection;