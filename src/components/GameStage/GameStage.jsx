import { useState, useEffect, useReducer } from "react";
import Modal from "../Modal/Modal";
import classes from "./GameStage.module.css";
import Logo from "../../assets/icons/logo.svg";
import IconX from "../../assets/icons/icon-x.svg";
import IconO from "../../assets/icons/icon-o.svg";
import RestartIcon from "../../assets/icons/icon-restart.png";
import UndoIcon from "../../assets/icons/icon-undo.png";
import loadingGif from "../../assets/loading.gif";
import IconXBlack from "../../assets/icons/icon-x-black.svg";
import IconOBlack from "../../assets/icons/icon-o-black.svg";
import IconXGrey from "../../assets/icons/icon-x-grey.svg";
import IconOGrey from "../../assets/icons/icon-o-grey.svg";

const gameCellsObj = [
  { id: 0, state: "empty" },
  { id: 1, state: "empty" },
  { id: 2, state: "empty" },
  { id: 3, state: "empty" },
  { id: 4, state: "empty" },
  { id: 5, state: "empty" },
  { id: 6, state: "empty" },
  { id: 7, state: "empty" },
  { id: 8, state: "empty" },
];

let updatedState, filteredState, randomIndex, randomId;

//Reducer function
const cellStateReducer = (state, action) => {
  if (action.type === "xHasWon") {
    updatedState = [...state];
    for (const obj of action.state) {
      updatedState[obj.id].state = "xHasWon";
    }
    return [...updatedState];
  } else if (action.type === "oHasWon") {
    updatedState = [...state];
    for (const obj of action.state) {
      updatedState[obj.id].state = "oHasWon";
    }
    return [...updatedState];
  } else if (action.type === "draw") {
    updatedState = [...state];
    return [...updatedState];
  } else if (action.type === "undo") {
    updatedState = [...state];
    updatedState[action.id].state = "empty";
    return [...updatedState];
  } else if (action.type === "restart") {
    updatedState = [...state];
    updatedState.forEach((obj) => {
      obj.state = "empty";
    });
    return [...updatedState];
  } else if (action.type === "quit") {
    updatedState = [...state];
    updatedState.forEach((obj) => {
      obj.state = "empty";
    });
    return [...updatedState];
  } else if (action.type === "runBotMove") {
    updatedState = [...state];
    updatedState[action.id].state = action.state ? "x" : "o";
    return [...updatedState];
  } else {
    if (typeof action.type === "boolean") {
      updatedState = [...state];
      updatedState[action.id].state = action.type ? "x" : "o";
      return [...updatedState];
    }
  }
};

const GameBoardCell = (props) => {
  const checkIcon = () => {
    if (props.state === "xHasWon") {
      return props.theme === "dark" ? IconXBlack : IconXGrey;
    } else if (props.state === "oHasWon") {
      return props.theme === "dark" ? IconOBlack : IconOGrey;
    } else if (props.state === "x") {
      return IconX;
    } else {
      return IconO;
    }
  };

  return (
    <button
      className={`${classes["game-board__cell"]} ${
        ((props.state !== "empty" || !props.isMyTurn) &&
          props.gameMode === "ai") ||
        (props.state !== "empty" && props.gameMode === "human") ? "disabled" : ''
      } ${
        props.state === "xHasWon"
          ? classes.xHasWon
          : props.state === "oHasWon"
          ? classes.oHasWon
          : classes.cell
      } card`}
      onClick={props.onClick}
    >
      {props.state === "empty" ? "" : <img src={checkIcon()} alt="." />}
    </button>
  );
};

const GameStage = (props) => {
  const [isXTurn, setIsXTurn] = useState(true);
  const [prevState, setPrevState] = useState([...gameCellsObj]);
  const [dispModal, setDispModal] = useState("");
  const [isPlayerX, setIsPlayerX] = useState(props.isPlayerX);
  const [isMyTurn, setIsMyTurn] = useState(isPlayerX === isXTurn);
  const [hasWon, setHasWon] = useState(null);
  const [xWon, setXWon] = useState(null);
  const [hasTied, setHasTied] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [ties, setTies] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [lastWin, setLastWin] = useState("");

  //useReducer declaration
  const [cellState, dispatchCellState] = useReducer(
    cellStateReducer,
    gameCellsObj
  );

  const updateScores = (type) => {
    if (type === "win") {
      setWins((prev) => ++prev);
    } else if (type === "lose") {
      setLosses((prev) => ++prev);
    } else {
      setTies((prev) => ++prev);
    }
  };

  //dispatch functions call
  const gameCheck = (mode) => {
    let copiedState = [...cellState];
    const hasX = copiedState.some((obj) => obj.state === "x");
    const hasO = copiedState.some((obj) => obj.state === "o");

    if (hasX && hasO) {
      let xCellState = copiedState.filter((cell) => cell.state === "x");
      let oCellState = copiedState.filter((cell) => cell.state === "o");

      const winningRows = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      const hasPlayerWon = (playerState, winningRow) => {
        let matchingObjects = [];
        return winningRow.every((rowId) =>
          playerState.some(
            (cell) => cell.id === rowId && cell.state === playerState[0].state
          )
        );
      };

      let xHasWon = false;
      let oHasWon = false;

      for (const winningRow of winningRows) {
        if (hasPlayerWon(xCellState, winningRow)) {
          xHasWon = true;
          break;
        }
        if (hasPlayerWon(oCellState, winningRow)) {
          oHasWon = true;
          break;
        }
      }

      const getMatchingCells = (playerState, winningRow) => {
        const matchingCells = [];

        for (const rowId of winningRow) {
          const cell = playerState.find(
            (cell) => cell.id === rowId && cell.state === playerState[0].state
          );
          if (cell) {
            matchingCells.push(cell);
          } else {
            break; // Not a complete winning row
          }
        }

        return matchingCells.length === winningRow.length ? matchingCells : [];
      };

      const getWinnerCells = (playerState) => {
        for (const winningRow of winningRows) {
          const matchingCells = getMatchingCells(playerState, winningRow);
          if (matchingCells.length > 0) {
            return matchingCells;
          }
        }
        return [];
      };

      const xWinnerCells = getWinnerCells(xCellState);
      const oWinnerCells = getWinnerCells(oCellState);
      let hasEmptyCell = copiedState.some((obj) => obj.state === "empty");
      let isADraw, myTurn;

      if (xHasWon) {
        isADraw = false;
        setXWon(true);
        setHasWon(isPlayerX);
        isPlayerX ? setLastWin("me") : setLastWin("ai");
        dispatchCellState({
          type: "xHasWon",
          id: null,
          state: xWinnerCells,
        });
        setTimeout(() => {
          isPlayerX ? updateScores("win") : updateScores("lose");
          setDispModal("result");
        }, 500);
      } else {
        isADraw = !oHasWon && !hasEmptyCell;
      }

      if (oHasWon) {
        isADraw = false;
        setXWon(false);
        setHasWon(!isPlayerX);
        isPlayerX ? setLastWin("ai") : setLastWin("me");
        dispatchCellState({
          type: "oHasWon",
          id: null,
          state: oWinnerCells,
        });
        setTimeout(() => {
          isPlayerX ? updateScores("lose") : updateScores("win");
          setDispModal("result");
        }, 500);
      } else {
        isADraw = !xHasWon && !hasEmptyCell;
      }

      if (isADraw && !hasTied) {
        setHasTied(true);
        dispatchCellState({
          type: "draw",
          id: null,
          state: null,
        });

        updateScores("tie");
        setDispModal("result");
      }

      return {
        isADraw: isADraw,
        xHasWon: xHasWon,
        oHasWon: oHasWon,
      };
    } else {
      return {
        isADraw: false,
        xHasWon: false,
        oHasWon: false,
      };
    }
  };

  const onDispatchCellState = (id, state) => {
    dispatchCellState({
      type: isXTurn,
      id: id,
      state: state,
    });

    setPrevState(id);
    setIsXTurn((prev) => !prev);
    props.gameMode === "ai" ? setIsMyTurn(false) : setIsMyTurn((prev) => !prev);
  };

  const undoLastMove = () => {
    dispatchCellState({
      type: "undo",
      id: prevState,
      state: null,
    });

    setIsXTurn((prev) => !prev);
    setIsMyTurn((prev) => !prev);
  };

  const restartGame = () => {
    dispatchCellState({
      type: "restart",
      id: null,
      state: null,
    });

    setDispModal("");

    let updatedIsXTurn;
    let newIsMyTurn;

    if (isPlayerX) {
      if (lastWin === "me") {
        updatedIsXTurn = false;
      } else {
        updatedIsXTurn = true;
      }
    } else {
      if (lastWin === "me") {
        updatedIsXTurn = true;
      } else if (lastWin === "") {
        updatedIsXTurn = true;
      } else {
        updatedIsXTurn = false;
      }
    }

    if (lastWin === "me") {
      newIsMyTurn = false;
    } else if (lastWin === "") {
      newIsMyTurn = isPlayerX ? true : false;
    } else {
      newIsMyTurn = true;
    }

    setIsXTurn(updatedIsXTurn);
    setIsMyTurn(newIsMyTurn);
    setPrevState([...gameCellsObj]);
    setHasWon(null);
    setXWon(null);
    setHasTied(false);
  };

  const runBotMove = () => {
    if (!isMyTurn) {
      const botMark = isPlayerX ? "o" : "x";
      updatedState = [...cellState];
      if (cellState !== gameCellsObj) {
        filteredState = updatedState.filter((obj) => obj.state === "empty");
        let filteredStateId = filteredState.map((obj) => obj.id);
        let botCellState = updatedState.filter((obj) => obj.state === botMark);
        let botCellStateId = botCellState.map((obj) => obj.id);
        let matchingIndexes = [],
          unMatchingIndexes = [], filteredId, botId;
        for (filteredId of filteredStateId) {
          for (botId of botCellStateId) {
            if (
              (filteredId - botId >= 1 && filteredId - botId <= 4) ||
              (botId - filteredId >= 1 && botId - filteredId <= 4)
            ) {
              matchingIndexes.push(filteredId);
            } else {
              unMatchingIndexes.push(filteredId);
            }
          }
        }

        let filteredStateRandomIndex;

        if (matchingIndexes.length !== 0) {
          filteredStateRandomIndex = Math.floor(
            Math.random() * matchingIndexes.length
          );
        } else {
          filteredStateRandomIndex = Math.floor(
            Math.random() * unMatchingIndexes.length
          );
        }
        randomId = filteredState[filteredStateRandomIndex].id;
      } else {
        randomIndex = Math.floor(Math.random() * updatedState.length);
        randomId = updatedState[randomIndex].id;
      }

      let randomTime = Math.floor(Math.random() * 4000);
      setTimeout(() => {
        if (cellState !== gameCellsObj) {
          setIsXTurn((prev) => !prev);
          setIsMyTurn((prev) => !prev);
        } else {
          setIsXTurn(false);
          setIsMyTurn(true);
        }

        dispatchCellState({
          type: "runBotMove",
          id: randomId,
          state: isXTurn,
          xWon: xWon,
        });
      }, randomTime);

      setPrevState(randomId);
    }
  };

  const goToNext = () => {
    dispatchCellState({
      type: "restart",
      id: null,
      state: null,
    });

    setDispModal("");
    // setIsXTurn(!xWon);
    // setIsMyTurn(!hasWon);
    if (lastWin === "me") {
      setIsXTurn(!isPlayerX);
      setIsMyTurn(false);
    } else if (lastWin === "ai") {
      setIsXTurn(isPlayerX);
      setIsMyTurn(true);
    } else {
      setIsXTurn(true);
      setIsMyTurn(isPlayerX);
    }
    setPrevState([...gameCellsObj]);
    setHasWon(null);
    setXWon(null);
    setHasTied(false);
    setHasMoved((prev) => !prev);
  };

  const quitGame = () => {
    dispatchCellState({
      type: "quit",
      id: null,
      state: null,
    });

    setIsXTurn(true);
    setIsMyTurn(isPlayerX === isXTurn);
    setDispModal("");
    setPrevState([...gameCellsObj]);
    setHasWon(null);
    setXWon(null);
    setHasTied(false);
    setWins(0);
    setLosses(0);
    setTies(0);
    setLastWin("");

    setTimeout(() => {
      props.onQuitGame();
    }, 100);
  };

  const checkAndRunBotMove = () => {
    let resultObj;
    resultObj = gameCheck();
    let { isADraw, xHasWon, oHasWon } = resultObj;

    console.log(
      `isADraw ${isADraw}, xHasWon ${xHasWon}, oHasWon ${oHasWon}, hasTied ${hasTied}`
    );

    if (
      !isADraw &&
      !xHasWon &&
      !oHasWon &&
      !isMyTurn &&
      props.gameMode === "ai"
    ) {
      runBotMove();
    }

    setIsDisabled(cellState === gameCellsObj);
  };

  useEffect(() => {
    checkAndRunBotMove();
  }, [isMyTurn, hasMoved]);

  return (
    <div className={classes["game-stage"]}>
      <div className={classes.header}>
        <span className={classes.logo}>
          <img src={Logo} alt="." />
        </span>

        <span className={`${classes.player__turn} card`}>
          <img
            src={
              isXTurn
                ? props.theme === "dark"
                  ? IconXGrey
                  : IconXBlack
                : props.theme === "dark"
                ? IconOGrey
                : IconOBlack
            }
            alt="."
          />
          TURN
        </span>

        <span className={classes.action__btns}>
          <button
            className={`card ${classes.undo} ${
              isDisabled && classes["btn__disabled"]
            }`}
            onClick={undoLastMove}
          >
            <img src={UndoIcon} alt="." />
          </button>
          <button
            className={`card ${classes.restart} ${
              isDisabled && classes["btn__disabled"]
            }`}
            onClick={() => setDispModal("restart")}
          >
            <img src={RestartIcon} alt="." />
          </button>
        </span>
      </div>

      <div className={`${classes.thinking}`}>
        <p>
          {isXTurn === isPlayerX
            ? "Weighing my options"
            : props.gameMode === "ai"
            ? "AI is thinking"
            : "Our buddy here is calculating"}
        </p>
        <img
          className={`${
            props.theme === "light" && classes["thinking__img__light"]
          }`}
          src={loadingGif}
          alt="."
        />
      </div>

      <div className={classes["game-board"]}>
        {cellState.map((cell) => (
          <GameBoardCell
            state={cell.state}
            id={cell.id}
            key={cell.id}
            gameMode={props.gameMode}
            isMyTurn={isXTurn === isPlayerX}
            theme={props.theme}
            onClick={() => onDispatchCellState(cell.id, cell.state)}
          />
        ))}
      </div>

      <div className={classes["game-scores"]}>
        <div className={`${classes["score-box"]} x`}>
          <label>X({isPlayerX ? "YOU" : "CPU"})</label>
          <b>{isPlayerX ? wins : losses}</b>
        </div>
        <div className={`${classes["score-box"]} ties`}>
          <label>TIES</label>
          <b>{ties}</b>
        </div>
        <div className={`${classes["score-box"]} o`}>
          <label>X({!isPlayerX ? "YOU" : "CPU"})</label>
          <b>{!isPlayerX ? wins : losses}</b>
        </div>
      </div>

      {dispModal !== "" && (
        <Modal
          mode={dispModal}
          closeModal={() => setDispModal("")}
          onQuitGame={() => quitGame()}
          goToNext={() => goToNext()}
          hasWon={hasWon}
          hasTied={hasTied}
          isPlayerX={isPlayerX}
          restartGame={restartGame}
        />
      )}
    </div>
  );
};

export default GameStage;
