import { useState } from "react";
import classes from "./Home.module.css";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../assets/icons/logo.svg";
import IconXBlack from "../../assets/icons/icon-x-black.svg";
import IconOBlack from "../../assets/icons/icon-o-black.svg";
import IconXGrey from "../../assets/icons/icon-x-grey.svg";
import IconOGrey from "../../assets/icons/icon-o-grey.svg";
import IconEllipsis from "../../assets/icons/ellipsis-v.svg";
import IconTimes from "../../assets/icons/times.svg";

const Home = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const variants = {
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "tween",
        delay: 0.4,
        duration: 0.5,
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
    close: {
      opacity: 0,
      scale: 0,
      transition: {
        type: "tween",
        delay: 0.4,
        duration: 0.5,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  return (
    <motion.div
      className={classes.home}
      variants={props.variants}
      initial="hide"
      animate="reveal"
      exit="hide"
    >
      <motion.div className={classes["menu"]}>
        <motion.div
          className={classes.icon}
          onClick={() => {
            setIsOpen((prev) => {
              return !prev;
            });
          }}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="times"
            >
              <path
                fill={props.theme === "dark" ? "#f0f0f0" : "#1f3641"}
                d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="ellipsis-v"
            >
              <path
                fill={props.theme === "dark" ? "#f0f0f0" : "#1f3641"}
                d="M12,7a2,2,0,1,0-2-2A2,2,0,0,0,12,7Zm0,10a2,2,0,1,0,2,2A2,2,0,0,0,12,17Zm0-7a2,2,0,1,0,2,2A2,2,0,0,0,12,10Z"
              ></path>
            </svg>
          )}
        </motion.div>
        {isOpen && (
          <motion.div
            className={classes.toggle__container}
          >
            <motion.div
              onClick={() => props.toggleTheme()}
              className={classes.toggle__box}
            >
              <motion.span
                className={`${
                  props.theme === "dark"
                    ? classes.overlay
                    : classes.overlay__light
                }`}
              ></motion.span>
              <motion.span
                className={`${
                  props.theme === "dark"
                    ? classes.toggle
                    : classes.toggle__light
                }`}
              ></motion.span>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
      <motion.div className={classes.logo}>
        <img src={Logo} alt="." />
      </motion.div>

      <motion.div
        className={`${classes.choice__box} card`}
        style={{
          boxShadow: `inset 0 -5px 0 ${
            props.theme === "dark" ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.2)"
          }`,
        }}
      >
        <header>PICK YOUR MARK</header>
        <motion.div className={classes.players}>
          <motion.span
            onClick={() => {
              props.onSetIsPlayerX(true);
            }}
            variants={props.variants}
            animate={{ scale: 1 }}
            whileTap="tap"
          >
            {props.theme === "dark" ? (
              <img src={!props.isPlayerX ? IconXGrey : IconXBlack} alt="." />
            ) : (
              <img src={props.isPlayerX ? IconXGrey : IconXBlack} alt="." />
            )}
          </motion.span>
          <motion.span
            onClick={() => {
              props.onSetIsPlayerX(false);
            }}
            variants={props.variants}
            animate={{ scale: 1 }}
            whileTap="tap"
          >
            {props.theme === "dark" ? (
              <img src={props.isPlayerX ? IconOGrey : IconOBlack} alt="." />
            ) : (
              <img src={!props.isPlayerX ? IconOGrey : IconOBlack} alt="." />
            )}
          </motion.span>
          <motion.span
            className={classes.active__bg}
            style={{
              transform: props.isPlayerX
                ? "translate(-98%, -50%)"
                : "translate(-2%, -50%)",
            }}
          ></motion.span>
        </motion.div>
        <motion.span className={classes.note}>
          REMEMBER: X GOES FIRST
        </motion.span>
      </motion.div>

      <motion.div className={classes.start__btns}>
        <motion.button
          className={`${classes.vs__ai} card`}
          style={{
            boxShadow: `inset 0 -5px 0 ${
              props.theme === "dark"
                ? "rgba(0, 0, 0, 0.3)"
                : "rgba(0, 0, 0, 0.2)"
            }`,
          }}
          onClick={() => props.onSelectMode("ai")}
          variants={props.variants}
          animate={{ scale: 1 }}
          whileTap="tap"
        >
          NEW GAME (VS AI)
        </motion.button>
        <motion.button
          className={`${classes.vs__human} card`}
          style={{
            boxShadow: `inset 0 -5px 0 ${
              props.theme === "dark"
                ? "rgba(0, 0, 0, 0.3)"
                : "rgba(0, 0, 0, 0.2)"
            }`,
          }}
          onClick={() => props.onSelectMode("human")}
          variants={props.variants}
          animate={{ scale: 1 }}
          whileTap="tap"
        >
          NEW GAME (VS PLAYER)
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Home;
