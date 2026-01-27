import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { Footer } from "@/components/Footer";
import ArticleSection from "@/components/ArticleSection";
import { Route , Routes , BrowserRouter } from "react-router-dom";

function HomePage () {
    return (
        <>
        <div className="min-h-screen flex flex-col">
          {/* <DesignSystem /> */}
          <Navbar />
        <main className="flex-1 bg-base-600"> 
          <HeroSection />
          <ArticleSection />
        </main>
          <Footer />
        </div>
      </>
    )
}

export default HomePage