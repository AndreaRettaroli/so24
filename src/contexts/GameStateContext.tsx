import React, { createContext, useMemo } from 'react';
import { gameStateStore } from '@Stores/gameState';

interface GameStateContextValues {
    newGame: typeof gameStateStore.newGame;
    nextTurn: typeof gameStateStore.nextTurn;
    changeScreen: typeof gameStateStore.changeScreen;
    addPoints: typeof gameStateStore.addPoints,
    addPenalty: typeof gameStateStore.addPenalty,
    undoPoints: typeof gameStateStore.undoPoints,
    startTimer: typeof gameStateStore.startTimer,
    pauseTimer: typeof gameStateStore.pauseTimer,
    calculateWinnerAndPoints: typeof gameStateStore.calculateWinnerAndPoints,
    toggleNoDice: typeof gameStateStore.toggleNoDice,
}

export const GameStateContext = createContext<GameStateContextValues>({
    newGame: () => console.warn('Context not set'),
    nextTurn: () => console.warn('Context not set'),
    changeScreen: () => console.warn('Context not set'),
    addPoints: () => console.warn('Context not set'),
    addPenalty: () => console.warn('Context not set'),
    undoPoints: () => console.warn('Context not set'),
    startTimer: () => console.warn('Context not set'),
    pauseTimer: () => console.warn('Context not set'),
    calculateWinnerAndPoints: () => {
        throw new Error('context not set');
    },
    toggleNoDice: () => console.warn('Context not set'),
});

export const GameStateContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const value: GameStateContextValues = useMemo(() => ({
        newGame: gameStateStore.newGame,
        nextTurn: gameStateStore.nextTurn,
        changeScreen: gameStateStore.changeScreen,
        addPoints: gameStateStore.addPoints,
        addPenalty: gameStateStore.addPenalty,
        undoPoints: gameStateStore.undoPoints,
        startTimer: gameStateStore.startTimer,
        pauseTimer: gameStateStore.pauseTimer,
        calculateWinnerAndPoints: gameStateStore.calculateWinnerAndPoints,
        toggleNoDice: gameStateStore.toggleNoDice,
    }), []);

    return (
        <GameStateContext.Provider value={value}>
            { children }
        </GameStateContext.Provider>
    );
};
