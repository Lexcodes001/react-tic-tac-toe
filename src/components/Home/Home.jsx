import { useState } from "react";
import classes from "./Home.module.css";
import Logo from "../../assets/icons/logo.svg";
import IconXBlack from "../../assets/icons/icon-x-black.svg";
import IconOBlack from "../../assets/icons/icon-o-black.svg";
import IconXGrey from "../../assets/icons/icon-x-grey.svg";
import IconOGrey from "../../assets/icons/icon-o-grey.svg";

const Home = (props) => {
  return (
    <div className={classes.home}>
      <div className={classes.toggle__container}>
        <div onClick={()=>props.toggleTheme()} className={classes.toggle__box}>
          <span className={`${props.theme === 'dark' ? classes.overlay : classes.overlay__light}`}></span>
          <span className={`${props.theme === 'dark' ? classes.toggle : classes.toggle__light}`}></span>
        </div>
      </div>
      <div className={classes.logo}>
        <img src={Logo} alt="." />
      </div>

      <div className={`${classes.choice__box} card`}>
        <header>PICK PLAYER 1's MARK</header>
        <div className={classes.players}>
          <span
            onClick={() => {
              props.onSetIsPlayerX(true);
            }}
          >
            {props.theme === 'dark' ? (
              <img src={!props.isPlayerX ? IconXGrey : IconXBlack} alt="." />
            ) : (
              <img src={props.isPlayerX ? IconXGrey : IconXBlack} alt="." />
            )}
          </span>
          <span
            onClick={() => {
              props.onSetIsPlayerX(false);
            }}
          >
            {props.theme === 'dark' ? (
              <img src={props.isPlayerX ? IconOGrey : IconOBlack} alt="." />
            ) : (
              <img src={!props.isPlayerX ? IconOGrey : IconOBlack} alt="." />
            )}
          </span>
          <span
            className={classes.active__bg}
            style={{
              transform: props.isPlayerX
                ? "translate(-98%, -50%)"
                : "translate(-2%, -50%)",
            }}
          ></span>
        </div>
        <span className={classes.note}>REMEMBER: X GOES FIRST</span>
      </div>

      <div className={classes.start__btns}>
        <button
          className={`${classes.vs__ai} card`}
          onClick={() => props.onSelectMode("ai")}
        >
          NEW GAME (VS AI)
        </button>
        <button
          className={`${classes.vs__human} card`}
          onClick={() => props.onSelectMode("human")}
        >
          NEW GAME (VS PLAYER)
        </button>
      </div>
    </div>
  );
};

export default Home;
