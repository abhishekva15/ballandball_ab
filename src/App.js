import { useEffect, useState } from "react";
import "./App.css";
import { SoundProvider } from "./context/SoundContext";
import Home from "./home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import rotate from "../src/assets/4.webp";

function App() {
  const [shouldShowRotateImage, setShouldShowRotateImage] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isLandscapeOrientation = window.innerHeight < window.innerWidth;
      const isHeightLessThan550 = window.innerHeight <= 500;

      // Show the rotate image only if the device height is <= 550px and it's in landscape orientation
      setShouldShowRotateImage(isLandscapeOrientation && isHeightLessThan550);
    };

    // Initial check on mount
    handleResize();

    // Add event listener for screen resize and orientation change
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return (
    <>
      {shouldShowRotateImage ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#000",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <img
            src={rotate}
            alt="Rotate your phone"
            style={{ width: "50%", marginBottom: "1rem" }}
          />
          <p>Please rotate your phone to portrait mode to continue.</p>
        </div>
      ) : (
        <SoundProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </SoundProvider>
      )}
    </>
  );
}

export default App;
