import { useGameStateScreen } from '@Hooks/useGameStateStore';
import { LandingScreen } from '@Screens/Landing';
import { StartingScreen } from '@Screens/Starting';
import { GameScreen } from '@Screens/Game';
import { OvertimeScreen } from '@Screens/Overtime';
import { EndingScreen } from '@Screens/Ending';

const PageHandler: React.FC = () => {
    const screen = useGameStateScreen();

    switch (screen) {
        case 'landing': return <LandingScreen />;
        case 'starting': return <StartingScreen />;
        case 'game': return <GameScreen />;
        case 'overtime': return <OvertimeScreen />;
        case 'stopped': return <div>stopped</div>;
        case 'ending': return <EndingScreen />;
    }
};

export const App = () => (
    <PageHandler />
);
