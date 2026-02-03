import "./App.css";
import { Route , Routes , BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ViewPostPage from "./pages/ViewPostPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { Toaster } from "@/components/ui/sonner";
import SignUpSuccessPage from "./pages/SignUpSuccessPage";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/viewpostpage/:id" element={<ViewPostPage />}/>
        <Route path="/loginpage" element={<LoginPage />}/>
        <Route path="/signuppage" element={<SignUpPage />}/>
        <Route path="*" element={<NotFoundPage />}/>
        <Route path="/signupsuccesspage" element={<SignUpSuccessPage />}/>
      </Routes>
    </BrowserRouter>
    <Toaster />
  </div>
  );
}

export default App;
