import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react"; 

function SignUpSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-base-600 font-sans">
      <Navbar />
      
      <main className="flex-1 flex justify-center items-center px-4">
        
        {/* Card Container: ใช้สไตล์เดียวกับหน้า Sign Up */}
        <div className="w-full max-w-[550px] bg-base-100 rounded-3xl p-12 shadow-sm flex flex-col items-center gap-6 text-center">
            
            {/* Green Check Icon */}
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                <Check className="text-white w-10 h-10" strokeWidth={4} />
            </div>

            {/* Text */}
            <h1 className="text-3xl font-bold text-base-500 tracking-tight">
              Registration success
            </h1>

            {/* Button */}
             <Button 
                className="w-[150px] bg-base-600 text-white hover:bg-base-500 hover:scale-[1.02] hover:shadow-xl cursor-pointer rounded-full h-12 text-base font-medium mt-4"
                onClick={() => navigate("/loginpage")} // พอกด Continue ให้ไปหน้า Login
            >
                Continue
            </Button>

        </div>
      </main>
    </div>
  )
}

export default SignUpSuccessPage;