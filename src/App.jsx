import { useState, useEffect } from "react";
import classes from "./App.module.css";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./components/Home/Home";
import GameStage from "./components/GameStage/GameStage";

function App() {
  const [isStart, setIsStart] = useState(false);
  const [gameMode, setGameMode] = useState("");
  const [isPlayerX, setIsPlayerX] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    const handleThemeChange = (matches) => {
      const selectedTheme = matches ? "dark" : "light";
      setTheme(selectedTheme);
      alert(selectedTheme);
      localStorage.setItem("theme", selectedTheme);
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (event) => {
      handleThemeChange(event.matches);
    };

    mediaQuery.addEventListener("change", listener);

    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
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
  };

  const variants = {
    leftOpened: {
      opacity: 1,
      x: 0,
      y: "-50%",
      transition: {
        type: "tween",
        delay: 0.4,
        duration: 0.5,
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
    leftClosed: {
      opacity: 0,
      x: "-100%",
      y: "-50%",
      transition: {
        type: "tween",
        delay: 0.4,
        duration: 0.5,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    topOpened: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.5,
        ease: 'easeInOut'
      },
    },
    topClosed: {
      opacity: 0,
      y: "-200%",
      transition: {
        type: "tween",
        duration: 0.5,
        ease: 'easeInOut'
      },
    },
    opacityReveal: {
      opacity: 1,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.7,
      },
    },
    opacityHide: {
      opacity: 0,
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.5,
      },
    },
    desktopUsersOpened: {
      opacity: 1,
      x: -257,
      y: 48,
      zIndex: 0,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.5,
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
    desktopUsersClosed: {
      opacity: 0,
      x: -50,
      y: "-200%",
      zIndex: 0,
      scale: 0.5,
      transition: {
        type: "spring",
        bounce: 0.5,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    reveal: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.5,
        duration: 0.5,
      },
    },
    hide: {
      scale: 0.8,
      opacity: 0,
      transition: {
        type: "spring",
        bounce: 0.5,
        duration: 0.5,
      },
    },
    tap: {
        scale: 0.9,
        transition: {
          type: "spring",
          bounce: 0.5,
        },
      }
  };

  return (
    <motion.div className={classes.app}>
      <AnimatePresence>
        {!isStart ? (
          <Home
            variants={variants}
            isPlayerX={isPlayerX}
            theme={theme}
            toggleTheme={toggleTheme}
            onSetIsPlayerX={(e) => {
              setIsPlayerX(e);
            }}
            onSelectMode={(e) => {
              setGameMode(e);
              setIsStart(true);
            }}
          />
        ) : (
          <GameStage
            variants={variants}
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
    </motion.div>
  );
}

export default App;
