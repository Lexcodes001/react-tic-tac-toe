import classes from "./Modal.module.css";
import { motion, AnimatePresence } from "framer-motion";
import IconX from "../../assets/icons/icon-x.svg";
import IconO from "../../assets/icons/icon-o.svg";

const Modal = (props) => {
  return (
    <div className={`${classes.modal}`}>
      <div className={`${classes.backdrop}`}></div>
      <div className={`${classes["modal-box"]}`}>
        <label>
          {props.hasTied
            ? "NO WINNER!"
            : props.mode === "restart"
            ? "ARE YOU SURE?"
            : props.hasWon
            ? "YOU WON!"
            : "YOU LOSE!"}
        </label>
        <span className={`${classes.remark}`}>
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
        </span>
        <div className={`${classes.actions}`}>
          {props.mode === "result" ? (
            <>
              <button
                className={`card ${classes.grey}`}
                onClick={props.onQuitGame}
              >
                QUIT
              </button>
              <button
                className={`card ${classes.orange}`}
                onClick={props.goToNext}
              >
                NEXT ROUND
              </button>
            </>
          ) : (
            <>
              <button
                className={`card ${classes.grey}`}
                onClick={props.closeModal}
              >
                NO
              </button>
              <button
                className={`card ${classes.orange}`}
                onClick={props.restartGame}
              >
                YES
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
