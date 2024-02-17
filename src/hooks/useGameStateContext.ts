import { useContext } from 'react';
import { GameStateContext } from '@Contexts/GameStateContext';

export function useGameStateContext () {
    return useContext(GameStateContext);
}
