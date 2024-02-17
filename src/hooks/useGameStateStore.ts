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

export function useCurrentPlayerTurn () {
    return useSyncExternalStore(gameStateStore.createSubscriber('currentPlayer', 'players'), () => {
        const snapshot = gameStateStore.getStateSnapshot();

        return snapshot[snapshot.currentPlayer].turn;
    });
}

export function useGameStatePlayer1Points () {
    return useSyncExternalStore(gameStateStore.createSubscriber('players'), () => {
        const snapshot = gameStateStore.getStateSnapshot().player1;

        return snapshot.points - snapshot.penalty;
    });
}

export function useGameStatePlayer1PointHistory () {
    return useSyncExternalStore(gameStateStore.createSubscriber('players'), () => gameStateStore.getStateSnapshot().player1.pointHistory);
}

export function useGameStatePlayer2Points () {
    return useSyncExternalStore(gameStateStore.createSubscriber('players'), () => {
        const snapshot = gameStateStore.getStateSnapshot().player2;

        return snapshot.points - snapshot.penalty;
    });
}

export function useGameStatePlayer2PointHistory () {
    return useSyncExternalStore(gameStateStore.createSubscriber('players'), () => gameStateStore.getStateSnapshot().player2.pointHistory);
}
