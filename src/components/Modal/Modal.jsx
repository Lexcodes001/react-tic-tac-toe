import classes from "./Modal.module.css";
import { motion, AnimatePresence } from "framer-motion";
import IconX from "../../assets/icons/icon-x.svg";
import IconO from "../../assets/icons/icon-o.svg";

const Modal = (props) => {
  return (
    <motion.div className={`${classes.modal}`}>
      <motion.div
        className={`${classes.backdrop}`}
        variants={props.variants}
        initial="opacityHide"
        animate="opacityReveal"
        exit="opacityHide"
      ></motion.div>
      <motion.div
        className={`${classes["modal-box"]}`}
        variants={props.variants}
        initial="leftClosed"
        animate="leftOpened"
        exit="leftClosed"
      >
        <label>
          {props.hasTied
            ? "NO WINNER!"
            : props.mode === "restart"
            ? "ARE YOU SURE?"
            : props.hasWon
            ? "YOU WON!"
            : "YOU LOSE!"}
        </label>
        <motion.span className={`${classes.remark}`}>
          {props.mode === "result" && !props.hasTied && (
            <img
              src={props.hasWon && props.isPlayerX ? IconX : IconO}
              alt="."
            />
          )}
          <b>
            {props.hasTied
              ? "IT IS A TIE"
              : props.mode === "result"
              ? "TAKES THE ROUND"
              : "DO YOU WANT TO RESTART THE GAME?"}
          </b>
        </motion.span>
        <motion.div className={`${classes.actions}`}>
          {props.mode === "result" ? (
            <>
              <motion.button
                className={`card ${classes.grey}`}
                style={{
                  boxShadow: `inset 0 -5px 0 ${
                    props.theme === "dark"
                      ? "rgba(0, 0, 0, 0.3)"
                      : "rgba(0, 0, 0, 0.2)"
                  }`,
                }}
                onClick={props.onQuitGame}
              >
                QUIT
              </motion.button>
              <motion.button
                className={`card ${classes.orange}`}
                style={{
                  boxShadow: `inset 0 -5px 0 ${
                    props.theme === "dark"
                      ? "rgba(0, 0, 0, 0.3)"
                      : "rgba(0, 0, 0, 0.2)"
                  }`,
                }}
                onClick={props.goToNext}
              >
                NEXT ROUND
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                className={`card ${classes.grey}`}
                style={{
                  boxShadow: `inset 0 -5px 0 ${
                    props.theme === "dark"
                      ? "rgba(0, 0, 0, 0.3)"
                      : "rgba(0, 0, 0, 0.2)"
                  }`,
                }}
                onClick={props.closeModal}
              >
                NO
              </motion.button>
              <motion.button
                className={`card ${classes.orange}`}
                style={{
                  boxShadow: `inset 0 -5px 0 ${
                    props.theme === "dark"
                      ? "rgba(0, 0, 0, 0.3)"
                      : "rgba(0, 0, 0, 0.2)"
                  }`,
                }}
                onClick={props.restartGame}
              >
                YES
              </motion.button>
            </>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
