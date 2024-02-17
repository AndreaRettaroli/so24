import React from 'react';
import { Player } from '@Types/types';
import { Text } from '@Components/Text/Text';

interface TotalPointsProps {
    points: number;
    player: Player;
}

export const TotalPoints: React.FC<TotalPointsProps> = ({ points, player }) => (
    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', width: '50px' }}>
        <Text color={player} size="xs" weight="regular">Total</Text>
        <Text color={points < 0 ? 'penalty' : 'text'} size="s" weight="regular">{ points }</Text>
    </div>
);
