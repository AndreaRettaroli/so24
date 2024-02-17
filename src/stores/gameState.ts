type Listener = () => void;

interface Listeners {
    players: Listener[];
    currentPlayer: Listener[];
    screen: Listener[];
    countdown: Listener[];
}

type ListenerKeys = keyof Listeners;

const listeners: Listeners = {
    players: [],
    currentPlayer: [],
    screen: [],
    countdown: [],
};

type Screen = 'landing' | 'starting' | 'game' | 'overtime' |'stopped' | 'ending';

type Player = 'player1' | 'player2';

type CountdownType = 'starting' | 'game';

const maxTurns = 24 as const;

interface PlayerState {
    points: number,
    turn: number,
    penalty: number,
    pointHistory: number[],
    noDice: boolean;
    endTurn: number;
}

interface CountdownState {
    type: CountdownType;
    startingValue: 5 | 30;
    value: number;
    valueMs: number;
    progress: number,
    paused: boolean;
}

interface GameState {
    player1: PlayerState;
    player2: PlayerState;
    screen: Screen;
    currentPlayer: Player;
    countdown: CountdownState;
}

interface PointsAndWinnerPlayer {
    totalPoints: number,
    penalty: number,
    points: number,
}

interface PointsAndWinner {
    player1: PointsAndWinnerPlayer,
    player2: PointsAndWinnerPlayer,
    winner: Player;
}

function createPlayerState (turn: 0 | 1): PlayerState {
    return {
        points: 0,
        turn,
        penalty: 0,
        pointHistory: [],
        noDice: false,
        endTurn: 0,
    };
}

function createCountdownState (type: CountdownType, paused: boolean): CountdownState {
    const value = type === 'starting' ? 5 : 30;

    return {
        type,
        startingValue: value,
        value,
        valueMs: value * 1000,
        progress: 100,
        paused,
    };
}

const gameState: GameState = {
    player1: createPlayerState(1),
    player2: createPlayerState(0),
    screen: 'landing', // change to landing
    currentPlayer: 'player1',
    countdown: createCountdownState('starting', true),
};

let intervalId: NodeJS.Timeout | null = null;

export const gameStateStore = {
    startTimer () {
        if (intervalId !== null) {
            console.error('Timer already started');

            return;
        }

        gameState.countdown.paused = false;

        intervalId = setInterval(() => {
            gameState.countdown.valueMs -= 100;
            gameState.countdown.value = Math.ceil(gameState.countdown.valueMs / 1000);
            gameState.countdown.progress = gameState.countdown.valueMs * 100 / (gameState.countdown.startingValue * 1000);

            if (gameState.countdown.valueMs === 0) {
                gameState.countdown.paused = true;

                if (gameState.countdown.type === 'starting') {
                    gameState.screen = 'game';
                    gameState.countdown = createCountdownState('game', false);
                    emitChange('screen', 'screen');

                    return;
                }

                gameState.screen = 'overtime';
                gameState[gameState.currentPlayer].penalty += 1;
                emitChange('screen');
            }

            gameState.countdown = { ...gameState.countdown };
            emitChange('countdown');
        }, 100);
    },
    pauseTimer () {
        if (intervalId === null) {
            return;
        }

        gameState.countdown.paused = true;
        clearInterval(intervalId);
        intervalId = null;
        gameState.countdown = { ...gameState.countdown };
        emitChange('countdown');
    },
    newGame () {
        gameState.player1 = createPlayerState(1);
        gameState.player2 = createPlayerState(0);
        gameState.countdown = createCountdownState('starting', true);
        gameState.screen = 'starting';
        gameState.currentPlayer = 'player1';
        emitChange('players', 'screen', 'currentPlayer');
    },
    nextTurn () {
        gameState[gameState.currentPlayer].pointHistory = [];

        if (oppositePlayerHasDie(gameState.currentPlayer)) {
            gameState.currentPlayer = gameState.currentPlayer === 'player1' ? 'player2' : 'player1';
        }

        const previousCountdownPauseState = gameState.countdown.paused;

        gameState.countdown = createCountdownState('game', false);
        gameState.screen = 'game';

        if (gameState[gameState.currentPlayer].turn < maxTurns) {
            // handle this better
            gameState[gameState.currentPlayer].turn++;
        }

        if (previousCountdownPauseState) {
            gameStateStore.startTimer();
        }

        emitChange('countdown', 'players', 'currentPlayer', 'screen');
    },
    changeScreen (screen: Screen) {
        gameState.screen = screen;
        emitChange('screen');
    },
    addPoints (player: Player, points: number) {
        gameState[player].points += points;
        gameState[player].pointHistory = [...gameState[player].pointHistory, points];

        emitChange('players');
    },
    undoPoints (player: Player) {
        const lastPointEntry = gameState[player].pointHistory.pop();

        if (!lastPointEntry) {
            return;
        }

        gameState[player].points -= lastPointEntry;
        gameState[player].pointHistory = [...gameState[player].pointHistory];

        emitChange('players');
    },
    addPenalty (player: Player, penalty: number) {
        gameState[player].penalty += penalty;
        emitChange('players');
    },
    toggleNoDice (player: Player) {
        gameState[player].noDice = !gameState[player].noDice;
        gameState[player].endTurn = gameState[player].noDice ? gameState[player].turn : 0;

        if (gameState.player1.noDice && gameState.player2.noDice) {
            gameStateStore.endGame();

            return;
        }

        emitChange('players');
    },
    endGame () {
        if (gameState.player1.endTurn === 0) {
            gameState.player1.endTurn = gameState.player1.turn;
        }

        if (gameState.player2.endTurn === 0) {
            gameState.player2.endTurn = gameState.player2.turn;
        }

        gameState.screen = 'ending';
        emitChange('screen');
    },
    createSubscriber (...listenerKeys: ListenerKeys[]) {
        return (listener: Listener) => {
            const unsubscribeFns: (() => void)[] = [];

            for (const listenerKey of listenerKeys) {
                unsubscribeFns.push(this.subscribe(listenerKey, listener));
            }

            return () => unsubscribeFns.forEach((fn) => fn());
        };
    },
    calculateWinnerAndPoints (): PointsAndWinner {
        const player1Penalty = gameState.player1.penalty + getPlayerTurnPenalty(gameState.player2, gameState.player1);
        const player2Penalty = gameState.player2.penalty + getPlayerTurnPenalty(gameState.player1, gameState.player2);
        const player1AdjustedPoints = gameState.player1.points - player1Penalty;
        const player2AdjustedPoints = gameState.player2.points - player2Penalty;

        return {
            player1: {
                points: gameState.player1.points,
                penalty: player1Penalty,
                totalPoints: player1AdjustedPoints,
            },
            player2: {
                points: gameState.player2.points,
                penalty: player2Penalty,
                totalPoints: player2AdjustedPoints,
            },
            winner: player1AdjustedPoints > player2AdjustedPoints ? 'player1' : 'player2',
        };
    },
    subscribe (listenerKey: ListenerKeys, listener: Listener) {
        listeners[listenerKey] = [...listeners[listenerKey], listener];

        return () => {
            listeners[listenerKey] = listeners[listenerKey].filter((l) => l !== listener);
        };
    },
    getStateSnapshot (): GameState {
        return gameState;
    },
};

function emitChange (...listenerKeys: ListenerKeys[]) {
    for (const listenerKey of listenerKeys) {
        for (const listener of listeners[listenerKey]) {
            listener();
        }
    }
}

// test this;
function getPlayerTurnPenalty (a: PlayerState, b: PlayerState) {
    if (a.endTurn === 0 || b.turn <= a.endTurn) {
        return 0;
    }

    return (b.turn - a.endTurn) * 2 - 1;
}

function oppositePlayerHasDie (currentPlayer: Player): boolean {
    const oppositePlayer: Player = currentPlayer === 'player1' ? 'player2' : 'player1';

    return !gameState[oppositePlayer].noDice;
}
