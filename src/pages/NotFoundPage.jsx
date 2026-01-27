import Navbar from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { CircleAlert } from 'lucide-react';
import { useNavigate } from "react-router-dom";

function NotFoundPage () {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-base-600 text-white">
            <Navbar />
                <div className="flex-1 w-full h-full flex flex-col justify-center items-center gap-8">
                    <CircleAlert size={64}/>
                    <h1 className="font-bold text-3xl">Page Not Found</h1>
                    <button className="bg-base-500 w-[200px] h-[50px] rounded-full hover:border hover:border-base-200 cursor-pointer" onClick={() => navigate(`/`)}>Go to Homepage</button>
                </div>
            <Footer />
        </div>
    )
}

export default NotFoundPage