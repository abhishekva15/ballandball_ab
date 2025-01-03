import React, { createContext, useState, useEffect } from "react";
import { playSound, pauseSound } from "../utility/gameSettings";
export const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [sound, setSound] = useState(0);

  useEffect(() => {
    if (sound) {
      playSound();
    } else {
      pauseSound();
    }
  }, [sound]);

  return (
    <SoundContext.Provider value={{ sound, setSound }}>
      {children}
    </SoundContext.Provider>
  );
};