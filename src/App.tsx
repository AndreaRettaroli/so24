import { useGameStateScreen } from '@Hooks/useGameStateStore';
import { LandingScreen } from '@Screens/Landing';
import { StartingScreen } from '@Screens/Starting';
import { GameScreen } from '@Screens/Game';
import { OvertimeScreen } from '@Screens/Overtime';
import { StoppedScreen } from '@Screens/Stopped';
import { EndingScreen } from '@Screens/Ending';

const PageHandler: React.FC = () => {
    const screen = useGameStateScreen();

    switch (screen) {
        case 'landing': return <LandingScreen />;
        case 'starting': return <StartingScreen />;
        case 'game': return <GameScreen />;
        case 'overtime': return <OvertimeScreen />;
        case 'stopped': return <StoppedScreen />;
        case 'ending': return <EndingScreen />;
    }
};

export const App = () => (
    <PageHandler />
);
