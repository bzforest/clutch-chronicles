import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"; // 1. เรียกใช้ Sonner

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  // 2. State สำหรับ Error ขอบแดง
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // ล้าง Error ทันทีที่พิมพ์
    if (errors[e.target.id]) {
        setErrors({ ...errors, [e.target.id]: "" });
    }
  };

  // 3. ฟังก์ชันเช็คว่ากรอกครบไหม
  const validateForm = () => {
    const newErrors = {};
    if (!formData.identifier) newErrors.identifier = true; // แค่เช็คว่ามีค่าไหม
    if (!formData.password) newErrors.password = true;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. เช็คว่ากรอกครบไหม
    if (!validateForm()) {
        return; // ถ้าไม่ครบ จบการทำงาน (ขอบแดงจะขึ้นเองเพราะ state errors เปลี่ยน)
    }

    // 2. จำลองการเช็ค Login (Mockup Logic)
    // สมมติว่ารหัสผ่านที่ถูกต้องคือ "password" (ในของจริง Backend จะเช็คให้)
    if (formData.password !== "password") {
        
        // ❌ Login ไม่ผ่าน: แจ้งเตือนมุมขวาล่าง
        toast.error("Log in Failed", {
            description: "Your password is incorrect or this email doesn't exist",
            className: "bg-red-500 border-none text-white", // พื้นแดง ตัวขาว
            descriptionClassName: "text-white/90",
            duration: 3000,
        });

    } else {
        // ✅ Login ผ่าน: กลับหน้า Home
        console.log("Login Success");
        navigate("/"); 
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-base-600 font-sans">
      <Navbar />
      
      <main className="flex-1 flex justify-center items-center py-10 px-4">
        
        <div className="w-full max-w-[450px] bg-base-100 rounded-3xl p-8 md:p-12 shadow-sm">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-base-500 tracking-tight">
              Log in
            </h1>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            
            {/* Email/Username */}
            <div className="space-y-2">
              <Label htmlFor="identifier" className="text-gray-600 font-medium">Email</Label>
              <Input 
                id="identifier" 
                placeholder="Email" 
                // เพิ่ม text-black และ logic ขอบแดง
                className={`bg-white text-black h-12 rounded-lg focus-visible:ring-black ${errors.identifier ? "border-red-500 focus-visible:ring-red-500" : "border-gray-200"}`}
                required 
                onChange={handleChange} 
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-600 font-medium">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Password"
                // เพิ่ม text-black และ logic ขอบแดง
                className={`bg-white text-black h-12 rounded-lg focus-visible:ring-black ${errors.password ? "border-red-500 focus-visible:ring-red-500" : "border-gray-200"}`}
                required 
                onChange={handleChange} 
              />
            </div>

            <div className="pt-4">
                <Button 
                    type="submit" 
                    className="w-full md:w-[150px] mx-auto block bg-base-600 text-white hover:bg-base-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-base-200 cursor-crosshair rounded-full h-12 text-base font-medium"
                >
                    Log in
                </Button>
            </div>

          </form>
          
          <div className="mt-8 text-center">
            <p className="text-gray-500">
              Don't have an account?{" "}
              <Link to="/signuppage" className="font-bold text-black underline decoration-1 underline-offset-4 hover:text-gray-700">
                Sign up
              </Link>
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}

export default LoginPage;