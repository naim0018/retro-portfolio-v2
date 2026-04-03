import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/common/Preloader";

function App() {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    // Force a minimum boot time for the "cool" effect
    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 3800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        {isBooting && <Preloader key="boot-loader" />}
      </AnimatePresence>
      
      {!isBooting && (
        <div className="w-full h-full">
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default App
