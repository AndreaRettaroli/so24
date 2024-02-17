import { useSyncExternalStore } from 'react';
import { gameStateStore } from '@Stores/gameState';

export function useGameStateScreen () {
    return useSyncExternalStore(gameStateStore.createSubscriber('screen'), () => gameStateStore.getStateSnapshot().screen);
}

export function useGameStateCurrentPlayer () {
    return useSyncExternalStore(gameStateStore.createSubscriber('currentPlayer'), () => gameStateStore.getStateSnapshot().currentPlayer);
}

export function useGameStateCountdown () {
    return useSyncExternalStore(gameStateStore.createSubscriber('countdown'), () => gameStateStore.getStateSnapshot().countdown);
}

export function useGameStateCurrentPlayerTurn () {
    return useSyncExternalStore(gameStateStore.createSubscriber('currentPlayer', 'players'), () => {
        const snapshot = gameStateStore.getStateSnapshot();

        return snapshot[snapshot.currentPlayer].turn;
    });
}

export function useGameStatePlayer1 () {
    return useSyncExternalStore(
        gameStateStore.createSubscriber('currentPlayer', 'players'),
        () => gameStateStore.getStateSnapshot().player1,
    );
}

export function useGameStatePlayer2 () {
    return useSyncExternalStore(
        gameStateStore.createSubscriber('currentPlayer', 'players'),
        () => gameStateStore.getStateSnapshot().player2,
    );
}
