import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@Components/Button/Button';
import { Text } from '@Components/Text/Text';
import { TotalPoints } from '@Components/TotalPoints/TotalPoints';
import { Icon } from '@Components/Icon/Icon';
import {
    useGameStateCurrentPlayer,
    useGameStatePlayer1Points,
    useGameStatePlayer2Points,
    useCurrentPlayerTurn,
} from '@Hooks/useGameStateStore';
import { useGameStateContext } from '@Hooks/useGameStateContext';
import clsx from 'clsx';

export const OvertimeScreen: React.FC = () => {
    const { t } = useTranslation();
    const currentPlayer = useGameStateCurrentPlayer();
    const currentPlayerTurn = useCurrentPlayerTurn();
    const { nextTurn } = useGameStateContext();
    const player1Points = useGameStatePlayer1Points();
    const player2Points = useGameStatePlayer2Points();

    return (
        <div className="-h-100vh -w-100vw" style={{ position: 'relative' }}>
            <div
                className="-t-r180dg"
                style={
                    {
                        position: 'absolute',
                        top: '30%',
                        left: '28%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100vw',
                        justifyContent: 'space-around',
                    }
                }
            >
                <TotalPoints points={player2Points} player="player2" />
            </div>
            <div
                style={{ position: 'relative', width: '100vw', height: '100vh' }}
                className={clsx(currentPlayer === 'player2' && '-t-r180dg')}
            >
                <div>
                    <div style={{ position: 'absolute', top: '43%', left: '10%' }}>
                        <div
                            className={clsx(currentPlayer === 'player1' ? '-bg-player1' : '-bg-player2')}
                            style={
                                { position: 'absolute', left: 'calc(-0% - 10vw)', top: 'calc(47% + 1px)', width: '10vw', height: '3px' }
                            }
                        />
                        <Button
                            variant="rotated"
                            color={currentPlayer}
                            borderOnly
                            disabled
                        >
                            <Icon icon="pause" alt="Pause" />
                        </Button>
                    </div>
                    <div style={
                        {
                            position: 'absolute',
                            top: '46%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100vw',
                            zIndex: '-1',
                        }
                    }
                    >
                        <Text size="s" color="text" weight="regular">{ t('turn') }</Text>
                        <Text size="s" color="text" weight="regular">{ currentPlayerTurn }/24</Text>
                    </div>
                    <div style={{ position: 'absolute', top: '43%', right: '10%' }}>
                        <div
                            className={clsx(currentPlayer === 'player1' ? '-bg-player1' : '-bg-player2')}
                            style={
                                { position: 'absolute', right: 'calc(0% - 10vw)', top: 'calc(47% + 1px)', width: '10vw', height: '3px' }
                            }
                        />
                        <Button
                            variant="rotated"
                            color={currentPlayer}
                            borderOnly
                            onClick={() => nextTurn()}
                        >
                            <Text color="text" size="m" weight="regular">
                                { t('pass') }
                            </Text>
                        </Button>
                    </div>
                </div>
            </div>
            <div style={
                {
                    position: 'absolute',
                    top: '63%',
                    right: '28%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100vw',
                    justifyContent: 'space-around',
                }
            }
            >
                <TotalPoints points={player1Points} player="player1" />
            </div>
        </div>
    );
};
