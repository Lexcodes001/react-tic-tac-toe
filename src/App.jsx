import { useState, useEffect } from "react";
import classes from "./App.module.css";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./components/Home/Home";
import GameStage from "./components/GameStage/GameStage";

function App() {
  const [isStart, setIsStart] = useState(false);
  const [gameMode, setGameMode] = useState("");
  const [isPlayerX, setIsPlayerX] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || 'dark');

  useEffect(() => {
    const handleThemeChange = (matches) => {
      const selectedTheme = matches ? "dark" : "light";
      setTheme(selectedTheme);
      alert(selectedTheme);
      localStorage.setItem("theme", selectedTheme);
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (event) => {
      handleThemeChange(event.matches);
    }

    mediaQuery.addEventListener("change", listener);

    return () => {
      mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  useEffect(() => {
    const applyTheme = (selected) => {
      document.documentElement.setAttribute("data-theme", selected);
      localStorage.setItem("theme", selected);
    };
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  return (
    <div className={classes.app}>
      <AnimatePresence mode="popLayout">
        {!isStart ? (
          <Home
            isPlayerX={isPlayerX}
            onSetIsPlayerX={(e) => {
              setIsPlayerX(e);
            }}
            onSelectMode={(e) => {
              setGameMode(e);
              setIsStart(true);
            }}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        ) : (
          <GameStage
            isPlayerX={isPlayerX}
            theme={theme}
            gameMode={gameMode}
            onQuitGame={() => {
              setIsStart(false);
              setGameMode("");
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;