import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@Components/Button/Button';
import { Text } from '@Components/Text/Text';
import { TotalPoints } from '@Components/TotalPoints/TotalPoints';
import { PointHistory } from '@Components/PointHistory/PointHistory';
import { Icon } from '@Components/Icon/Icon';
import {
    useGameStateCurrentPlayer,
    useGameStatePlayer1Points,
    useGameStatePlayer2Points,
    useGameStatePlayer1PointHistory,
    useGameStatePlayer2PointHistory,
    useCurrentPlayerTurn,
    useGameStateCountdown,
} from '@Hooks/useGameStateStore';
import { useGameStateContext } from '@Hooks/useGameStateContext';
import clsx from 'clsx';

export const GameScreen: React.FC = () => {
    const { t } = useTranslation();
    const currentPlayer = useGameStateCurrentPlayer();
    const currentPlayerTurn = useCurrentPlayerTurn();
    const { addPoints, undoPoints, startTimer, pauseTimer, nextTurn, toggleNoDice } = useGameStateContext();
    const { value: seconds, paused } = useGameStateCountdown();
    const player1Points = useGameStatePlayer1Points();
    const player2Points = useGameStatePlayer2Points();
    const player1PointHistory = useGameStatePlayer1PointHistory();
    const player2PointHistory = useGameStatePlayer2PointHistory();

    return (
        <div className="-h-100vh">
            <div style={{ position: 'absolute', top: 0, width: '100%', zIndex: '9999' }}>
                <Button variant="normal" color="player2" fullWidth className="-t-r180dg" onClick={() => toggleNoDice('player2')}>
                    <Icon icon="dieDisabled" alt={t('noDice')} />
                    <Text color="text" size="s" weight="regular">
                        { t('noDice') }
                    </Text>
                </Button>
                {
                    currentPlayer === 'player1' && (
                        <div className="-t-r180dg">
                            <TotalPoints points={player2Points} player="player2" />
                        </div>
                    )
                }
            </div>
            <div
                style={{ position: 'relative', width: '100vw', height: '100vh' }}
                className={clsx(currentPlayer === 'player2' && '-t-r180dg')}
            >
                <div>
                    <div style={{ position: 'absolute', top: '23%', left: '10%' }}>
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
                            onClick={() => paused ? startTimer() : pauseTimer()}
                        >
                            { paused ? <Icon icon="play" alt="Play" /> : <Icon icon="pause" alt="Pause" /> }
                            <Text color="text" size="m" weight="regular">
                                { seconds.toString() }
                            </Text>
                        </Button>
                    </div>
                    <div style={
                        {
                            position: 'absolute',
                            top: '26%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100vw',
                            zIndex: '-1', // this is required because of width
                        }
                    }
                    >
                        <Text size="s" color="text" weight="regular">{ t('turn') }</Text>
                        <Text size="s" color="text" weight="regular">{ currentPlayerTurn }/24</Text>
                    </div>
                    <div style={{ position: 'absolute', top: '23%', right: '10%' }}>
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
                <div style={
                    {
                        position: 'absolute',
                        top: '45%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100vw',
                        justifyContent: 'space-around',
                    }
                }
                >
                    <TotalPoints points={currentPlayer === 'player1' ? player1Points : player2Points} player={currentPlayer} />
                    <PointHistory pointHistory={currentPlayer === 'player1' ? player1PointHistory : player2PointHistory} />
                    <Button height="medium" variant="rotated" color="default" borderOnly onClick={() => undoPoints(currentPlayer)}>
                        <Icon icon="annul" alt="Annul" />
                    </Button>
                </div>
                <div style={
                    {
                        position: 'absolute',
                        top: 'calc(60% + 20px)',
                        left: '15%',
                    }
                }
                >
                    <Button height="medium" variant="rotated" color={currentPlayer} onClick={() => addPoints(currentPlayer, 1)}>
                        <Text color="text" size="m" weight="regular">1</Text>
                    </Button>
                </div>
                <div style={
                    {
                        position: 'absolute',
                        top: 'calc(60% + 20px)',
                        left: '45%',
                    }
                }
                >
                    <Button height="medium" variant="rotated" color={currentPlayer} onClick={() => addPoints(currentPlayer, 3)}>
                        <Text color="text" size="m" weight="regular">3</Text>
                    </Button>
                </div>
                <div style={
                    {
                        position: 'absolute',
                        top: 'calc(60% + 20px)',
                        left: '75%',
                    }
                }
                >
                    <Button height="medium" variant="rotated" color={currentPlayer} onClick={() => addPoints(currentPlayer, 5)}>
                        <Text color="text" size="m" weight="regular">5</Text>
                    </Button>
                </div>
                <div style={
                    {
                        position: 'absolute',
                        top: 'calc(70% + 5px)',
                        left: 'calc(24% + 20px)',
                    }
                }
                >
                    <Button height="medium" variant="rotated" color={currentPlayer} onClick={() => addPoints(currentPlayer, 2)}>
                        <Text color="text" size="m" weight="regular">2</Text>
                    </Button>
                </div>
                <div style={
                    {
                        position: 'absolute',
                        top: 'calc(70% + 5px)',
                        right: 'calc(21% + 20px)',
                    }
                }
                >
                    <Button height="medium" variant="rotated" color={currentPlayer} onClick={() => addPoints(currentPlayer, 4)}>
                        <Text color="text" size="m" weight="regular">4</Text>
                    </Button>
                </div>
            </div>
            <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                {
                    currentPlayer === 'player2' && (
                        <TotalPoints points={player1Points} player="player1" />
                    )
                }
                <Button variant="normal" color="player1" fullWidth onClick={() => toggleNoDice('player1')}>
                    <Icon icon="dieDisabled" alt={t('noDice')} />
                    <Text color="text" size="s" weight="regular">
                        { t('noDice') }
                    </Text>
                </Button>
            </div>
        </div>
    );
};
