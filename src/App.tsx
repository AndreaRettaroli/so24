import { useGameStateScreen } from '@Hooks/useGameStateStore';
import { LandingScreen } from '@Screens/Landing';
import { StartingScreen } from '@Screens/Starting';
import { GameScreen } from '@Screens/Game';
import { OvertimeScreen } from '@Screens/Overtime';
import { StoppedScreen } from '@Screens/Stopped';
import { EndingScreen } from '@Screens/Ending';
import { useEffect } from 'react';

const PageHandler: React.FC = () => {
    const screen = useGameStateScreen();

    switch (screen) {
        case 'landing':
            return <LandingScreen />;
        case 'starting':
            return <StartingScreen />;
        case 'game':
            return <GameScreen />;
        case 'overtime':
            return <OvertimeScreen />;
        case 'stopped':
            return <StoppedScreen />;
        case 'ending':
            return <EndingScreen />;
    }
};

export const App: React.FC = () => {
    // FIXED: prevent scroll that reload the page
    useEffect(() => {
        const handleTouchMove = (e: TouchEvent) => {
            if (window.scrollY === 0 && e.touches[0].clientY > 0) {
                e.preventDefault();
            }
        };

        // Use non-passive to allow preventDefault
        document.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            document.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    return <PageHandler />;
};
