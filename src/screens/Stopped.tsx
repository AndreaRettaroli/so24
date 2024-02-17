import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@Components/Button/Button';
import { Text } from '@Components/Text/Text';
import { Icon } from '@Components/Icon/Icon';
import {
    useGameStateCurrentPlayer,
    useGameStatePlayer1,
    useGameStatePlayer2,
    useGameStateCurrentPlayerTurn,
    useGameStateCountdown,
} from '@Hooks/useGameStateStore';
import { useGameStateContext } from '@Hooks/useGameStateContext';
import clsx from 'clsx';

export const StoppedScreen: React.FC = () => {
    const { t } = useTranslation();
    const currentPlayer = useGameStateCurrentPlayer();
    const currentPlayerTurn = useGameStateCurrentPlayerTurn();
    const { newGame, resumeGame, toggleNoDice } = useGameStateContext();
    const { value: seconds, paused } = useGameStateCountdown();
    const player1 = useGameStatePlayer1();
    const player2 = useGameStatePlayer2();

    return (
        <div className="-h-100vh">
            <div style={{ position: 'absolute', top: 0, width: '100%', zIndex: '9999' }}>
                <Button variant="normal" color="player2" fullWidth className="-t-r180dg" onClick={() => toggleNoDice('player2')}>
                    {
                        player2.noDice
                            ? <Icon icon="die" alt={t('noDice')} width="24px" height="24px" />
                            : <Icon icon="dieDisabled" alt={t('noDice')} width="24px" height="24px" />
                    }
                    <Text color="text" size="s" weight="regular">
                        { player2.noDice ? t('haveDice') : t('noDice') }
                    </Text>
                </Button>
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
                            onClick={() => resumeGame()}
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
                            className="-bg-disabled"
                            style={
                                { position: 'absolute', right: 'calc(0% - 10vw)', top: 'calc(47% + 1px)', width: '10vw', height: '3px' }
                            }
                        />
                        <Button
                            variant="rotated"
                            color="disabled"
                            borderOnly
                            disabled
                        />
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
                    <Button variant="normal" color="gradient" borderOnly onClick={() => newGame()}>
                        <Icon icon="plus" alt={t('newGame')} />
                        <Text color="text" size="xs" weight="regular">{ t('newGame') }</Text>
                    </Button>
                </div>
            </div>
            <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <Button variant="normal" color="player1" fullWidth onClick={() => toggleNoDice('player1')}>
                    {
                        player1.noDice
                            ? <Icon icon="die" alt={t('noDice')} width="24px" height="24px" />
                            : <Icon icon="dieDisabled" alt={t('noDice')} width="24px" height="24px" />
                    }
                    <Text color="text" size="s" weight="regular">
                        { player1.noDice ? t('haveDice') : t('noDice') }
                    </Text>
                </Button>
            </div>
        </div>
    );
};
