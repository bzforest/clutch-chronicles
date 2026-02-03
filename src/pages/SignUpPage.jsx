import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function SignUpPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  // 1. เพิ่ม State เก็บ Error
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // ล้าง Error ของช่องนั้นทันทีที่เริ่มพิมพ์ใหม่
    if (errors[e.target.id]) {
        setErrors({ ...errors, [e.target.id]: "" });
    }
  };

  // 2. ฟังก์ชันตรวจสอบข้อมูล (Validation)
  const validateForm = () => {
    const newErrors = {};

    // เช็ค Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
        newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
        newErrors.email = "Email must be a valid email";
    } else if (formData.email === "moodeng.cute@gmail.com") { // จำลองเคส Email ซ้ำ
        newErrors.email = "Email is already taken. Please try another email.";
    }

    // เช็ค Password
    if (!formData.password) {
        newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    // ถ้าไม่มี Error เลย (Object ว่างเปล่า) ให้ return true
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 3. เรียกใช้ Validation ก่อน
    if (validateForm()) {
        console.log("Validation Passed!", formData);
        // ถ้าผ่านแล้วค่อยไปต่อ
        navigate("/signupsuccesspage")
    } else {
        console.log("Validation Failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-base-600 font-sans">
      <Navbar />
      
      <main className="flex-1 flex justify-center items-center py-10 px-4">
        <div className="w-full max-w-[550px] bg-base-100 rounded-3xl p-8 md:p-12 shadow-sm">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-base-500 tracking-tight">Sign up</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-600 font-medium">Name</Label>
              <Input id="name" placeholder="Full name" className="bg-white border-gray-200 h-12 rounded-lg focus-visible:ring-black text-base-600" onChange={handleChange} />
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-600 font-medium">Username</Label>
              <Input id="username" placeholder="Username" className="bg-white border-gray-200 h-12 rounded-lg focus-visible:ring-black text-base-600" onChange={handleChange} />
            </div>

            {/* Email (มี Error) */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-600 font-medium">Email</Label>
              <Input 
                id="email" 
                type="email" // เปลี่ยนเป็น text เพื่อให้เราคุม validate เองได้ง่ายขึ้น หรือใช้ email ตามเดิมก็ได้
                placeholder="Email" 
                // ถ้ามี error ให้เปลี่ยนสีขอบเป็นสีแดง
                className={`bg-white h-12 rounded-lg focus-visible:ring-black text-base-600 ${errors.email ? "border-red-500 focus-visible:ring-red-500 text-red-500" : "border-gray-200"}`}
                onChange={handleChange} 
              />
              {/* แสดงข้อความ Error ใต้ช่อง */}
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password (มี Error) */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-600 font-medium">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Password"
                className={`bg-white h-12 rounded-lg focus-visible:ring-black text-base-600 ${errors.password ? "border-red-500 focus-visible:ring-red-500 text-red-500" : "border-gray-200"}`}
                onChange={handleChange} 
              />
               {/* แสดงข้อความ Error ใต้ช่อง */}
               {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="pt-4">
                <Button type="submit" className="w-full md:w-[150px] mx-auto block bg-base-600 text-white hover:bg-base-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-base-200 cursor-crosshair rounded-full h-12 text-base font-medium">
                    Sign up
                </Button>
            </div>

          </form>
          
          <div className="mt-8 text-center">
            <p className="text-gray-500">
              Already have an account?{" "}
              <Link to="/loginpage" className="font-bold text-black underline decoration-1 underline-offset-4 hover:text-gray-700">
                Log in
              </Link>
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}

export default SignUpPage;