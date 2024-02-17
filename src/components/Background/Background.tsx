import React from 'react';
import { Icon } from '@Components/Icon/Icon';

export const Background: React.FC = () => (
    <div style={
        {
            // TODO add to css
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
            top: '10%',
            zIndex: '-1',
        }
    }
    >
        <Icon icon="background" alt="So24 Background" className="-h-88vh -w-100vw" />
    </div>
);
