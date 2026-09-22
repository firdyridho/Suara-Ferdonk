import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Schedule from './pages/Schedule';
import Contact from './pages/Contact';
import { useNetworkStatus } from './hooks/useNetworkStatus';

function AppRoutes() {
  const networkStatus = useNetworkStatus();
  return (
    <Routes>
      <Route path="/" element={<Home networkStatus={networkStatus} />} />
      <Route path="/about" element={<About />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}
