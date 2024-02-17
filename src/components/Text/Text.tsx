import React from 'react';
import clsx from 'clsx';

type FontWeight = 'semibold' | 'regular';

export type FontSize = 'xl' | 'l' | 'm' | 's' | 'xs';

type FontColor = 'text' | 'player1' | 'player2' | 'penalty';

interface TextProps {
    weight: FontWeight ;
    size: FontSize;
    color: FontColor;
}

export const Text: React.FC<React.PropsWithChildren<TextProps>> = ({ color, weight, size, children }) => (
    <span className={clsx(getFontColorClass(color), getFontWeightClass(weight), getFontSizeClass(size))}>{ children }</span>
);

function getFontWeightClass (fontWeight: FontWeight): string {
    switch (fontWeight) {
        case 'semibold': return '-fw-sb';
        case 'regular': return '-fw-r';
    }
}

function getFontSizeClass (fontSize: FontSize): string {
    switch (fontSize) {
        case 'xl': return '-fs-xl';
        case 'l': return '-fs-l';
        case 'm': return '-fs-m';
        case 's': return '-fs-s';
        case 'xs': return '-fs-xs';
    }
}

function getFontColorClass (fontColor: FontColor): string {
    switch (fontColor) {
        case 'text': return '-c-text';
        case 'player1': return '-c-player1-secondary';
        case 'player2': return '-c-player2-secondary';
        case 'penalty': return '-c-penalty';
    }
}
