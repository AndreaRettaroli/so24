import React from 'react';
import { useTranslation } from 'react-i18next';
import { Background } from '@Components/Background/Background';
import { Button } from '@Components/Button/Button';
import { Text } from '@Components/Text/Text';
import { Icon } from '@Components/Icon/Icon';
import { useGameStateContext } from '@Hooks/useGameStateContext';
import { useGameStateCountdown } from '@Hooks/useGameStateStore';

export const StartingScreen: React.FC = () => {
    const { t } = useTranslation();
    const { startPreGameCountdown, pausePreGameCountdown, resumePreGameCountdown } = useGameStateContext();
    const { progress, paused, value: seconds } = useGameStateCountdown();

    return (
        <div className="-df -dcol -j-spb -h-100vh" style={{ alignItems: 'center' }}>
            <Button variant="normal" color="player2" fullWidth className="-t-r180dg" disabled>
                <Text color="text" size="s" weight="regular">
                    { t('player', { player: 2 }) }
                </Text>
            </Button>
            {
                (progress === 100 && paused) && (
                    <div style={{ top: 'calc(25% - 12px)', position: 'absolute', width: '80vw', textAlign: 'center' }}>
                        <Text color="text" size="m" weight="regular">
                            { t('position') }
                        </Text>
                    </div>
                )
            }
            {
                (progress === 100 && paused) && (
                    <Button
                        variant="rotated"
                        color="gradient"
                        borderOnly
                        onClick={() => startPreGameCountdown()}
                    >
                        <Text color="text" size="m" weight="semibold">
                            { t('start') }
                        </Text>
                    </Button>
                )
            }
            {
                (progress < 100 || !paused) && (
                    <Button
                        variant="rotated"
                        color="gradient"
                        borderOnly
                        onClick={() => paused ? resumePreGameCountdown() : pausePreGameCountdown()}
                    >
                        { paused ? <Icon icon="play" alt="Play" /> : <Icon icon="pause" alt="Pause" /> }
                        <Text color="text" size="m" weight="regular">
                            { seconds.toString() }
                        </Text>
                    </Button>
                )
            }
            <Button variant="normal" color="player1" fullWidth disabled>
                <Text color="text" size="s" weight="regular">
                    { t('player', { player: 1 }) }
                </Text>
            </Button>
            <Background />
        </div>
    );
};
