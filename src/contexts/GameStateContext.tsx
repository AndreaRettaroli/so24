import React, { createContext, useMemo } from "react";
import { gameStateStore } from "@Stores/gameState";

interface GameStateContextValues {
  newGame: typeof gameStateStore.newGame;
  nextTurn: typeof gameStateStore.nextTurn;
  addPoints: typeof gameStateStore.addPoints;
  addPenalty: typeof gameStateStore.addPenalty;
  undoPoints: typeof gameStateStore.undoPoints;
  stopGame: typeof gameStateStore.stopGame;
  resumeGame: typeof gameStateStore.resumeGame;
  calculateWinnerAndPoints: typeof gameStateStore.calculateWinnerAndPoints;
  toggleNoDice: typeof gameStateStore.toggleNoDice;
  startPreGameCountdown: typeof gameStateStore.startPreGameCountdown;
  pausePreGameCountdown: typeof gameStateStore.pausePreGameCountdown;
  resumePreGameCountdown: typeof gameStateStore.resumePreGameCountdown;
}

export const GameStateContext = createContext<GameStateContextValues>({
  newGame: () => console.warn("Context not set"),
  nextTurn: () => console.warn("Context not set"),
  addPoints: () => console.warn("Context not set"),
  addPenalty: () => console.warn("Context not set"),
  undoPoints: () => console.warn("Context not set"),
  stopGame: () => console.warn("Context not set"),
  resumeGame: () => console.warn("Context not set"),
  calculateWinnerAndPoints: () => {
    throw new Error("context not set");
  },
  toggleNoDice: () => console.warn("Context not set"),
  startPreGameCountdown: () => console.warn("Context not set"),
  pausePreGameCountdown: () => console.warn("Context not set"),
  resumePreGameCountdown: () => console.warn("Context not set"),
});

export const GameStateContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const value: GameStateContextValues = useMemo(
    () => ({
      newGame: gameStateStore.newGame,
      nextTurn: gameStateStore.nextTurn,
      addPoints: gameStateStore.addPoints,
      addPenalty: gameStateStore.addPenalty,
      undoPoints: gameStateStore.undoPoints,
      stopGame: gameStateStore.stopGame,
      resumeGame: gameStateStore.resumeGame,
      calculateWinnerAndPoints: gameStateStore.calculateWinnerAndPoints,
      toggleNoDice: gameStateStore.toggleNoDice,
      startPreGameCountdown: gameStateStore.startPreGameCountdown,
      pausePreGameCountdown: gameStateStore.pausePreGameCountdown,
      resumePreGameCountdown: gameStateStore.resumePreGameCountdown,
    }),
    []
  );

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};
