import "./App.css";
import DesignSystem from "./components/DesignSystem";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import { Footer } from "./components/Footer";
import ArticleSection from "./components/ArticleSection";

function App() {
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
  );
}

export default App;
