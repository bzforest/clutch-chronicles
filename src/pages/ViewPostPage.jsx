import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import ReactMarkdown from "react-markdown";
import { Footer } from "@/components/Footer";
import HeadImage from '../assets/images/reporter-01.png';
import { LinkedinIcon2, FacebookIcon, TwitterIcon } from '@/assets/icons/Icon';
import { Copy, Smile , X } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
  import { Button } from "@/components/ui/button";
  import { toast } from "sonner"

function ViewPostPage() {

    const navigate = useNavigate();
    const params = useParams();
    const [post, setPost] = useState(null);
    const [status, setStatus] = useState("Loading...")
    const [showAuthAlert, setShowAuthAlert] = useState(false);

    const getViewPost = async () => {
        try {
            setStatus("Loading...");
            const respons = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/posts/${params.id}`)
            // const respons = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/posts/${params.id}`);
            setPost(respons.data.data)
            console.log(respons.data)
            setStatus("")
        } catch (error) {
            setStatus("Error")
            console.error("Error fetching post:", error);
        }
    }

    useEffect(() => {
        if (params.id) {
            getViewPost();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id])


    const handleAuthRequired = (actionType) => {
        // ลองเปลี่ยนเป็น true เพื่อเทสว่ากดไลค์ติดไหม
        const isLoggedIn = false; 

        if (isLoggedIn) {
            // ✅ ถ้าล็อกอินผ่านแล้ว ให้เช็คว่า user จะทำอะไร
            if (actionType === 'like') {
                addLikePost(); // <--- เรียกฟังก์ชันไลค์ตรงนี้ครับ!
            } 
            else if (actionType === 'comment') {
                console.log("อนุญาตให้คอมเมนต์ได้");
                // logic ส่งคอมเมนต์จะอยู่ตรงนี้
            }
        } else {
            // ❌ ถ้ายังไม่ล็อกอิน เปิด Alert
            setShowAuthAlert(true);
        }
    };

    const formatDate = (isoString) => {
        const dateObj = new Date(isoString);
        return dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    if (status === "Loading...") {
        return (
            <div className="min-h-screen bg-base-600 flex justify-center items-center text-white">
                <h1 className="text-2xl animate-pulse">Loading Post...</h1>
            </div>
        );
    }

    if (status === "Error" || !post) {
        return (
            <div>
            <Navbar />
            <div className="min-h-screen bg-base-600 flex flex-col items-center justify-center text-white gap-4">
                <h1 className="text-2xl">Post Not Found</h1>
                <button onClick={() => navigate(-1)} className="text-brand-primary underline cursor-pointer">Go Back</button>
            </div>
            <Footer />
            </div>
        );
    }

    const addLikePost = () => {
        setPost({...post,likes: (post.likes || 0) + 1});
    };

    const handleCopyLink = () => {
        // คำสั่ง Copy URL ปัจจุบันลง Clipboard
        navigator.clipboard.writeText(window.location.href);
        
        // เรียก Sonner ให้เด้งขึ้นมา
        toast("Copied!", {
            description: "This article has been copied to your clipboard.",
            className: "bg-base-300 border-none text-white",
            descriptionClassName: "text-white/90",
            action: {
                label: "X",
                onClick: () => console.log("Undo"),
            },
            actionButtonStyle: {
                backgroundColor: "white",
                color: "black" // สีเขียว green-500
            }
        });
    };

    return (
        <div className="min-h-screen flex flex-col bg-base-600 xl:items-center">
            <Navbar />
            
            <main className="flex-1 flex flex-col w-full py-10 max-w-[1200px] mx-auto">
                
                {/* รูปภาพ Cover */}
                <div className="w-full h-[240px] md:h-[400px] mb-8 overflow-hidden xl:rounded-2xl flex justify-center items-center px-0 xl:px-0">
                    <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col lg:flex-row gap-10 lg:items-start w-full">

                    {/* --- LEFT COLUMN --- */}
                    <article className="w-full lg:max-w-[800px] flex flex-col">

                        {/* Meta */}
                        <div className="flex items-center gap-4 mb-4 px-4 xl:px-0">
                            <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                                {post.category_name}
                            </span>
                            <span className="text-gray-400 text-sm">
                                {formatDate(post.date)}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-semibold text-white mb-8 leading-tight px-4 xl:px-0">
                            {post.title}
                        </h1>

                        {/* Content */}
                        <div className="text-gray-300 leading-relaxed space-y-6 px-4 xl:px-0">
                            <ReactMarkdown 
                                components={{
                                    h1: ({node, ...props}) => <h2 className="text-2xl font-bold text-white mt-8 mb-4" {...props} />,
                                    h2: ({node, ...props}) => <h2 className="text-xl font-bold text-white mt-8 mb-4" {...props} />,
                                    p: ({node, ...props}) => <p className="mb-4 text-lg" {...props} />,
                                    ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4" {...props} />,
                                    ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4" {...props} />,
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </div>

                        {/* Mobile Author */}
                        <div className="px-4 lg:hidden mt-8">
                            <div className="pt-8 border-b border-black bg-base-500 flex flex-col justify-center p-4 rounded-2xl pb-8">
                                <div className="flex border-b border-base-300 h-[80px]">
                                    <img className='flex items-center rounded-[999px] w-[44px] h-[44px] justify-center' src={HeadImage} alt="Header Image"></img>
                                    <div className="flex flex-col pl-5">
                                        <p className='text-brand-primary text-body-3'>-Author</p>
                                        <p className="text-white font-semibold">{post.user_id}</p>
                                    </div>
                                </div>
                                <div className="pt-8">
                                    <p>I am a pet enthusiast and freelance writer who specializes in animal behavior and care.</p>
                                    <br />
                                    <p>When i’m not writing, I spends time volunteering at my local animal shelter.</p>
                                </div>
                            </div>
                        </div>

                        {/* Like & Comment */}
                        <div className="mt-8 flex flex-col gap-6 bg-base-500 w-full px-4 py-6 border-b xl:rounded-2xl items-center xl:px-6 xl:flex-row">
                            <button className="md:w-full md:h-auto bg-base-400 pt-[12px] pr-[40px] pb-[12px] pl-[40px] rounded-full border border-base-300 cursor-crosshair hover:scale-[1.02] flex justify-center gap-3 w-full text-white font-semibold xl:w-[150px]"
                            onClick={() => handleAuthRequired('like')}>
                                <Smile />{post.likes}
                            </button>
                            <div className="flex justify-between gap-3 items-center w-full xl:justify-end">
                                <button className="bg-base-400 rounded-full py-[12px] px-[24px] flex gap-2 border border-base-300 items-center cursor-pointer hover:scale-[1.01] hover:bg-base-500 text-white" onClick={handleCopyLink}>
                                    <Copy size={18}/>Copy link
                                </button>
                                <div className="flex scale-125 px-5 gap-1">
                                <a href="https://www.facebook.com/sakditat.thoumsaeng/" target="_blank" rel="noopener noreferrer"><FacebookIcon /></a>
                                <a href="https://www.linkedin.com/sharing/share-offsite/?url=<ลิงก์ที่ต้องการแชร์>" target="_blank" rel="noopener noreferrer"><LinkedinIcon2 /></a>
                                <a href="https://www.twitter.com/share?&url=<ลิงก์ที่ต้องการแชร์>" target="_blank" rel="noopener noreferrer"><TwitterIcon /></a>
                                </div>
                            </div>
                        </div>

                        <div className="comment flex flex-col p-4 mt-3 gap-4 justify-start items-start w-full xl:px-0">
                            <p className="text-white font-semibold">Comment</p>
                            <textarea className="bg-base-600 rounded-xl p-4 font-semibold border border-base-400 text-white w-full" rows={3} placeholder="What are your thoughts?" onClick={() => handleAuthRequired('comment')}/>
                            <div className="flex xl:justify-end w-full">
                                <button className="bg-base-300 pt-[12px] pr-[40px] pb-[12px] pl-[40px] rounded-full border border-base-200 cursor-pointer hover:scale-[1.01] hover:bg-base-100 hover:text-base-500 text-white font-bold">
                                    Send
                                </button>
                            </div>
                        </div>

                    </article>


                    {/* --- RIGHT COLUMN (Sidebar) --- */}
                    <aside className="hidden lg:flex w-[340px] shrink-0 sticky top-24 flex-col">
                        <div className="pt-8 border-b border-black bg-base-500 flex flex-col justify-center p-6 rounded-2xl pb-8 shadow-lg">
                            <div className="flex border-b border-base-300 pb-6 mb-6 items-center">
                                <img className='rounded-full w-[60px] h-[60px] object-cover' src={HeadImage} alt="Header Image"></img>
                                <div className="flex flex-col pl-5">
                                    <p className='text-brand-primary text-xs uppercase font-bold mb-1'>Author</p>
                                    <h3 className="text-white text-xl font-bold">{post.author}</h3>
                                </div>
                            </div>
                            
                            <div className="text-gray-300 leading-relaxed space-y-4">
                                <p>I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.</p>
                                <p>When i’m not writing, I spends time volunteering at my local animal shelter, helping cats find loving homes.</p>
                            </div>
                        </div>
                    </aside>
                </div>
                {/* --- 5. ALERT DIALOG SECTION --- */}
            <AlertDialog open={showAuthAlert} onOpenChange={setShowAuthAlert}>
                <AlertDialogContent className="bg-base-100 rounded-3xl max-w-[343px] p-8 border-none text-center">
                    
                    {/* ปุ่มปิด X (ปิด Alert เฉยๆ ถูกแล้ว) */}
                    <div className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 cursor-pointer" onClick={()=>setShowAuthAlert(false)}>
                        <X className="h-6 w-6 text-black" />
                    </div>

                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-bold text-black mb-2 text-center">
                            Create an account to continue
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-500 text-center hidden">
                           Please log in to perform this action.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="flex flex-col gap-4 mt-4 w-full">
                        {/* ปุ่ม Create Account -> ไปหน้า Register */}
                        <Button 
                            className="w-full bg-black text-white hover:bg-base-200 rounded-full h-12 text-lg font-bold hover:text-base-400 hover:border hover:border-brand-primary hover:scale-[1.03] cursor-pointer" 
                            onClick={() => navigate('/register')} 
                        >
                            Create account
                        </Button>
                        
                        {/* ปุ่ม Log in -> ไปหน้า Login */}
                        <div className="text-sm text-center text-gray-600">
                            Already have an account?{' '}
                            <span 
                                className="font-bold text-black underline cursor-pointer hover:text-base-400" 
                                onClick={() => navigate('/login')}
                            >
                                Log in
                            </span>
                        </div>
                    </div>
                    
                </AlertDialogContent>
            </AlertDialog>
            </main>
            
            <Footer />
        </div>
    )
}

export default ViewPostPage;