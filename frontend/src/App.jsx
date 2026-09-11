import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BlogPost from "./pages/BlogPost";
import Blog from "./pages/Blog";
import Gallery from "./pages/Gallery";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Faceimage from "./assets/Faceimage.png"
import ProjectDetail from "./pages/ProjectDetail";
import DesignDetail from "./pages/DesignDetail";
import PixelBg from "./components/PixelBg";

function App() {
  return (
    <BrowserRouter>
    
      <div className="min-h-screen bg-bg flex flex-col">
        <Navbar />
       
        <main className="flex-1">
       
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/about" element={<About image={Faceimage}/>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:slug" element={<DesignDetail />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
          </Routes>
          
        </main>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
