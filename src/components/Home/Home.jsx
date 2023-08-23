import { useState } from "react";
import classes from "./Home.module.css";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../assets/icons/logo.svg";
import IconXBlack from "../../assets/icons/icon-x-black.svg";
import IconOBlack from "../../assets/icons/icon-o-black.svg";
import IconXGrey from "../../assets/icons/icon-x-grey.svg";
import IconOGrey from "../../assets/icons/icon-o-grey.svg";

const Home = (props) => {
  return (
    <motion.div
      className={classes.home}
      variants={props.variants}
      initial="hide"
      animate="reveal"
      exit="hide"
    >
      <div className={classes.toggle__container}>
        <div
          onClick={() => props.toggleTheme()}
          className={classes.toggle__box}
        >
          <span
            className={`${
              props.theme === "dark" ? classes.overlay : classes.overlay__light
            }`}
          ></span>
          <span
            className={`${
              props.theme === "dark" ? classes.toggle : classes.toggle__light
            }`}
          ></span>
        </div>
      </div>
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
